import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { RateLimiter } from '@/utils/rate-limiter';

const execAsync = promisify(exec);

export const maxDuration = 30; // Set max duration to 30 seconds
export const dynamic = 'force-dynamic';

async function compressPDF(inputPath: string, outputPath: string): Promise<void> {
  const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;
  await execAsync(gsCommand);
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                 request.headers.get('x-real-ip') || 
                 'anonymous';
    const rateLimiter = RateLimiter.getInstance();
    const { success, remaining, limit } = await rateLimiter.isAllowed(ip);

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again tomorrow.',
          limit,
          remaining: 0,
          resetTime: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': (Date.now() + 24 * 60 * 60 * 1000).toString()
          }
        }
      );
    }

    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size (25MB limit)
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 25MB' },
        { status: 400 }
      );
    }

    // Create temp directory if it doesn't exist
    const tempDir = join(process.cwd(), 'temp');
    await mkdir(tempDir, { recursive: true });

    // Generate unique filenames
    const timestamp = Date.now();
    const inputPath = join(tempDir, `input-${timestamp}.pdf`);
    const outputPath = join(tempDir, `output-${timestamp}.pdf`);

    try {
      // Write input file
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(inputPath, buffer);

      // Compress PDF
      try {
        await compressPDF(inputPath, outputPath);
      } catch (error) {
        console.error('GhostScript error:', error);
        throw new Error('Failed to compress PDF. The file might be corrupted or password-protected.');
      }

      // Read compressed file
      const compressedFile = await readFile(outputPath);

      // Clean up temp files
      await Promise.all([
        unlink(inputPath),
        unlink(outputPath),
      ]);

      // Return the compressed file with original and compressed sizes
      return new NextResponse(compressedFile, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="compressed-${file.name}"`,
          'X-Original-Size': file.size.toString(),
          'X-Compressed-Size': compressedFile.length.toString(),
          'X-Remaining-Tries': remaining.toString(),
        },
      });
    } catch (error) {
      // Clean up temp files in case of error
      await Promise.all([
        unlink(inputPath).catch(() => {}),
        unlink(outputPath).catch(() => {}),
      ]);
      throw error;
    }
  } catch (error: any) {
    console.error('Error compressing PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Error compressing PDF. Please try again.' },
      { status: 500 }
    );
  }
}
