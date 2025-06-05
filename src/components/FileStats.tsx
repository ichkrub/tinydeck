'use client';

import { Download, FileUp } from 'lucide-react';

interface FileStatsProps {
  originalSize: number;
  compressedSize: number;
  downloadUrl: string;
  filename: string;
  onReset: () => void;
  remainingTries?: number;
}

export function FileStats({ originalSize, compressedSize, downloadUrl, filename, onReset, remainingTries }: FileStatsProps) {
  const reduction = ((originalSize - compressedSize) / originalSize) * 100;
  
  return (
    <div className="bg-[#141921]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-12 text-center">
      <h3 className="text-2xl font-semibold text-white mb-8">Compression Complete!</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1E2430] p-6 rounded-lg">
          <div className="text-sm text-indigo-400 font-medium">Original</div>
          <div className="mt-1 text-2xl font-bold text-white">
            {(originalSize / (1024 * 1024)).toFixed(2)} MB
          </div>
        </div>
        
        <div className="bg-[#1E2430] p-6 rounded-lg">
          <div className="text-sm text-indigo-400 font-medium">Compressed</div>
          <div className="mt-1 text-2xl font-bold text-white">
            {(compressedSize / (1024 * 1024)).toFixed(2)} MB
          </div>
        </div>
        
        <div className="bg-[#1E2430] p-6 rounded-lg">
          <div className="text-sm text-indigo-400 font-medium">Reduction</div>
          <div className="mt-1 text-2xl font-bold text-white">
            {reduction.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <a
          href={downloadUrl}
          download={filename}
          className="flex items-center justify-center w-full px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-medium"
        >
          <Download className="w-6 h-6 mr-3" />
          Download Compressed PDF
        </a>

        <button
          onClick={onReset}
          className="flex items-center justify-center w-full px-8 py-4 bg-[#1E2430] text-white rounded-lg hover:bg-[#262f3d] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-medium"
        >
          <FileUp className="w-6 h-6 mr-3" />
          Compress Another PDF
        </button>

        <p className="text-sm text-gray-500 font-medium">
          Your file will be automatically deleted after 1 hour
          {remainingTries !== undefined && (
            <span className="block mt-1">
              You have <span className="text-indigo-400">{remainingTries}</span> compressions remaining today
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
