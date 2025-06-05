'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, File as FileIcon, X } from 'lucide-react';
import classNames from 'classnames';

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadCardProps {
  onFileAccepted: (file: File) => void;
  remainingTries?: number;
}

export function UploadCard({ onFileAccepted, remainingTries = 3 }: UploadCardProps) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);
    
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    // Check file size (25MB limit)
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError('File size must be less than 25MB');
      return;
    }

    // Check file type
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setFile(selectedFile);
    onFileAccepted(selectedFile);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {}
  });

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        {...getRootProps()}
        className={classNames(
          'flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-2xl backdrop-blur-sm transition-all duration-300',
          {
            'border-indigo-400 bg-[#1E2430] shadow-indigo-900/50': isDragActive,
            'border-gray-800 hover:border-indigo-500 hover:bg-[#1E2430]/50': !isDragActive,
            'bg-[#141921]/80': !isDragActive && !file
          }
        )}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center gap-6 py-2">
            <div className="bg-[#1E2430] rounded-lg p-2">
              <FileIcon size={32} className="text-indigo-400" />
            </div>
            <span className="text-base font-medium text-gray-300">{file.name}</span>
            <button
              type="button"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                removeFile();
              }}
              className="p-2 hover:bg-[#1E2430] rounded-full transition-colors duration-200"
            >
              <X size={20} className="text-gray-500 hover:text-gray-400" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-6">
            <div className={classNames(
              'rounded-full p-6 transition-colors duration-300',
              isDragActive ? 'bg-[#1E2430]' : 'bg-[#1E2430]/50'
            )}>
              <Upload 
                size={40} 
                className={classNames(
                  'transition-colors duration-300',
                  isDragActive ? 'text-indigo-400' : 'text-gray-500'
                )} 
              />
            </div>
            <div className="space-y-2">
              <p className="text-base text-gray-400">
                Drop your PDF here, or{' '}
                <span className="text-indigo-400 hover:text-indigo-300 font-medium underline decoration-1 underline-offset-2 cursor-pointer">
                  browse
                </span>
              </p>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  PDF up to 25MB
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-indigo-400">{remainingTries}</span> compressions remaining today
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-4 text-sm text-red-400 bg-red-900/20 border border-red-800 px-4 py-2 rounded-lg animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}
