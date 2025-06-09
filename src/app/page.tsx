'use client';

import { useState, useEffect } from 'react';
import { FileUp } from 'lucide-react';
import { UploadCard } from '@/components/UploadCard';
import { FileStats } from '@/components/FileStats';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function Home() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [remainingTries, setRemainingTries] = useState(3);
  const loadingMessages = [
    "Starting up the compression engine...",
    "Hold tight, optimizing your images...",
    "Almost there, preserving quality...",
    "Final touches, hang in there...",
    "Just a few more moments..."
  ];
  
  // Rotate through messages during processing
  useEffect(() => {
    if (processing) {
      const interval = setInterval(() => {
        setMessageIndex((current) => (current + 1) % loadingMessages.length);
      }, 3000); // Change message every 3 seconds
      return () => clearInterval(interval);
    } else {
      setMessageIndex(0);
    }
  }, [processing]);

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
        const text = await response.text();
        let errorMessage = 'Failed to compress PDF';
        try {
          const data = JSON.parse(text);
          errorMessage = data.error || errorMessage;
        } catch (e) {
          // If the response is not valid JSON, use the text as is
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Update remaining tries from response headers
      const remaining = parseInt(response.headers.get('X-Remaining-Tries') || '0');
      setRemainingTries(remaining);

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
    <div className="min-h-screen bg-[#0D1117] text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="checker-background" />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8 min-h-screen flex flex-col relative">
        <div className="max-w-4xl mx-auto w-full flex-1">
          {/* Header */}
          <div className="mb-16">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="space-y-6 text-center max-w-3xl">
                <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight tracking-tight">
                  Compress Your Presentation PDFs Instantly.
                </h1>
                <h2 className="text-xl sm:text-2xl text-gray-400 font-normal leading-relaxed">
                  TinyDeck is a fast, secure, and free PDF compressor built for presentations. Upload your pitch decks, client slides, or lecture PDFs — and get a smaller file in seconds.
                </h2>
                <p className="text-base text-gray-500 tracking-wide">
                  Free: 3 decks/day • Max 25MB • No sign-up required
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="w-full max-w-2xl mx-auto">
              {processing ? (
                <div className="bg-[#141921]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center transform transition-all duration-300">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#1E2430] rounded-full p-6">
                      <FileUp className="w-12 h-12 text-indigo-400 animate-bounce" />
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold text-white">Processing your PDF...</h2>
                    <div className="mt-8 w-full max-w-sm">
                      <div className="h-1.5 w-full bg-[#1E2430] rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 animate-[progress_8s_ease-out_forwards]" />
                      </div>
                    </div>
                    <div className="h-8 mt-6">
                      <p className="text-base text-gray-400 animate-[messages_3s_ease-in-out]">
                        {loadingMessages[messageIndex]}
                      </p>
                    </div>
                  </div>
                </div>
              ) : compressionResult ? (
                <FileStats 
                  {...compressionResult}
                  remainingTries={remainingTries}
                  onReset={() => {
                    setCompressionResult(null);
                    URL.revokeObjectURL(compressionResult.downloadUrl);
                  }} 
                />
              ) : (
                <UploadCard 
                  onFileAccepted={handleFileUpload}
                  remainingTries={remainingTries}
                />
              )}
            </div>

            {error && (
              <div className="animate-fade-in bg-red-900/20 border border-red-800 text-red-400 rounded-xl p-6 text-center max-w-xl mx-auto">
                <p className="text-base font-medium">{error}</p>
              </div>
            )}

            {/* Use Case Description */}
            <div className="space-y-6 text-center">
              <p className="text-sm text-gray-400 mt-6 max-w-2xl mx-auto">
                TinyDeck helps founders, consultants, and students easily compress PDF presentations — whether it's a pitch deck or lecture slides.
              </p>
              <p className="text-base text-gray-500 tracking-wide">
                Files are automatically deleted after 1 hour • No registration required
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
