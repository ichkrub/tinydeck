'use client';

import { FileText } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 hover:opacity-90 transition-opacity ${className || ''}`}>
      <div className="text-indigo-400">
        <FileText size={28} />
      </div>
      <span className="text-xl font-bold text-white tracking-tight">
        TinyDeck
      </span>
    </Link>
  );
}
