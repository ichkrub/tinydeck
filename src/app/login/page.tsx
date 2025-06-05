'use client';

import { Auth } from '@/components/Auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white relative overflow-hidden">
      <div className="checker-background" />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8 min-h-screen">
        <Auth />
      </main>
    </div>
  );
}
