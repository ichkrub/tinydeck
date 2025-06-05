'use client';

import { Download } from 'lucide-react';

interface FileStatsProps {
  originalSize: number;
  compressedSize: number;
  downloadUrl: string;
  filename: string;
}

export function FileStats({ originalSize, compressedSize, downloadUrl, filename }: FileStatsProps) {
  const reduction = ((originalSize - compressedSize) / originalSize) * 100;
  
  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="bg-[#141921]/80 backdrop-blur-sm rounded-xl border border-gray-800 divide-y divide-gray-800">
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-white">Compression Results</h3>
          
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#1E2430] p-6 rounded-lg">
                <div className="text-base text-indigo-400 font-medium">Original Size</div>
                <div className="mt-2 text-3xl font-bold text-white">
                  {(originalSize / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
              
              <div className="bg-[#1E2430] p-6 rounded-lg">
                <div className="text-base text-indigo-400 font-medium">Compressed Size</div>
                <div className="mt-2 text-3xl font-bold text-white">
                  {(compressedSize / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E2430] p-6 rounded-lg text-center">
              <div className="text-base text-indigo-400 font-medium">Size Reduction</div>
              <div className="mt-2 text-4xl font-bold text-white">
                {reduction.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <a
            href={downloadUrl}
            download={filename}
            className="flex items-center justify-center w-full px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-medium"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Compressed PDF
          </a>
          <p className="mt-4 text-sm text-center text-gray-500 font-medium">
            Your file will be automatically deleted after 1 hour
          </p>
        </div>
      </div>
    </div>
  );
}
