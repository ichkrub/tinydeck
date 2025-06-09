'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UploadCard } from './UploadCard';
import { FileStats } from './FileStats';

export function FileUploadWrapper() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingTries, setRemainingTries] = useState(3);
  const [compressionResult, setCompressionResult] = useState<{
    originalSize: number;
    compressedSize: number;
    downloadUrl: string;
    filename: string;
  } | null>(null);

  const supabase = createClientComponentClient();
  
  const handleFileAccepted = async (file: File) => {
    try {
      setProcessing(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Failed to compress PDF';
        let retryAfter = null;
        
        try {
          const data = JSON.parse(text);
          errorMessage = data.error || errorMessage;
          
          // If it's a rate limit error, show when they can try again
          if (response.status === 429) {
            const hours = Math.ceil((Date.now() + 24 * 60 * 60 * 1000 - Date.now()) / (60 * 60 * 1000));
            errorMessage = `Daily limit reached. You can compress more PDFs in ${hours} hours.`;
          }
        } catch (e) {
          errorMessage = text || errorMessage;
        }
        
        setProcessing(false);
        setError(errorMessage);
        return;
      }

      // Update remaining tries
      const remaining = parseInt(response.headers.get('X-Remaining-Tries') || '0');
      setRemainingTries(remaining);

      const blob = await response.blob();
      const originalSize = parseInt(response.headers.get('X-Original-Size') || '0');
      const compressedSize = parseInt(response.headers.get('X-Compressed-Size') || '0');
      const filename = `compressed-${file.name}`;

      // Try to create bucket if it doesn't exist (will fail if no permission, which is fine)
      await supabase.storage.createBucket('pdfs', {
        public: false,
        fileSizeLimit: 50000000 // 50MB
      }).catch(() => {
        // Ignore error - bucket might already exist
      });

      // Upload to Supabase Storage
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (!userId) {
        throw new Error('You must be logged in to upload files');
      }

      const uploadPath = `${userId}/${Date.now()}-${filename}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(uploadPath, blob, {
          contentType: 'application/pdf',
          upsert: true // Allow overwriting in case of retries
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Failed to save PDF: ${uploadError.message}`);
      }

      // Get the public URL with a long expiry
      const { data: urlData, error: signedUrlError } = await supabase.storage
        .from('pdfs')
        .createSignedUrl(uploadData.path, 24 * 60 * 60); // 24 hour expiry

      if (signedUrlError || !urlData) {
        throw new Error('Failed to generate download URL');
      }

      const signedUrl = urlData.signedUrl;

      // Save metadata to database
      const { data: insertData, error: dbError } = await supabase
        .from('pdfs')
        .insert({
          filename: file.name,
          original_size: originalSize,
          compressed_size: compressedSize,
          compression_ratio: (1 - (compressedSize / originalSize)),
          original_url: '', // Original file is not stored
          compressed_url: signedUrl,
          status: 'completed',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          user_id: userId
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Failed to save PDF metadata: ${dbError.message}`);
      }

      setCompressionResult({
        originalSize,
        compressedSize,
        downloadUrl: signedUrl,
        filename
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      setError(error.message || 'Failed to process PDF');
    } finally {
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div className="bg-[#141921]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-sm space-y-4">
            <p className="text-lg font-medium text-white">Processing your PDF...</p>
            <div className="h-1.5 w-full bg-[#1E2430] rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 animate-[progress_8s_ease-out_forwards]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (compressionResult) {
    return (
      <FileStats
        {...compressionResult}
        remainingTries={remainingTries}
        onReset={() => {
          setCompressionResult(null);
          window.location.reload(); // Refresh to show updated list
        }}
      />
    );
  }

  return (
    <UploadCard 
      onFileAccepted={handleFileAccepted}
      remainingTries={remainingTries}
    />
  );
}
