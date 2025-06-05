'use client';

import { useState } from 'react';
import { FileUp } from 'lucide-react';
import { UploadCard } from '@/components/UploadCard';
import { FileStats } from '@/components/FileStats';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressionResult, setCompressionResult] = useState<{
    originalSize: number;
    compressedSize: number;
    downloadUrl: string;
    filename: string;
  } | null>(null);

  const handleFileUpload = async (file: File) => {
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
        const data = await response.json();
        throw new Error(data.error || 'Failed to compress PDF');
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      setCompressionResult({
        originalSize: parseInt(response.headers.get('X-Original-Size') || '0'),
        compressedSize: parseInt(response.headers.get('X-Compressed-Size') || '0'),
        downloadUrl,
        filename: `compressed-${file.name}`,
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred while compressing the PDF');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] text-white relative overflow-hidden">
      <div className="checker-background" />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8 min-h-screen flex flex-col relative">
        <div className="max-w-4xl mx-auto w-full flex-1">
          {/* Header */}
          <div className="space-y-12 mb-16">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="space-y-6 text-center max-w-3xl">
                <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight tracking-tight">
                  Your deck.
                  <br />
                  Just lighter.
                </h1>
                <p className="text-xl sm:text-2xl text-gray-400 font-normal leading-relaxed">
                  Fast, high-quality PDF compression for presentations
                </p>
                <p className="text-base text-gray-500 tracking-wide">
                  Free: 3 decks/day • Max 25MB • No sign-up required
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {processing ? (
              <div className="bg-[#141921]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-12 text-center transform transition-all duration-300">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-[#1E2430] rounded-full p-6">
                    <FileUp className="w-12 h-12 text-indigo-400 animate-bounce" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-white">Processing your PDF...</h2>
                  <p className="mt-3 text-base text-gray-400">This usually takes less than 5 seconds</p>
                </div>
              </div>
            ) : (
              <UploadCard onFileAccepted={handleFileUpload} />
            )}

            {error && (
              <div className="animate-fade-in bg-red-900/20 border border-red-800 text-red-400 rounded-xl p-6 text-center max-w-xl mx-auto">
                <p className="text-base font-medium">{error}</p>
              </div>
            )}

            {compressionResult && !processing && (
              <FileStats {...compressionResult} />
            )}
          </div>

          {/* Footer */}
          <footer className="mt-auto pt-16 pb-8 text-center">
            <p className="text-base text-gray-500 tracking-wide">
              Files are automatically deleted after 1 hour • No registration required
            </p>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
