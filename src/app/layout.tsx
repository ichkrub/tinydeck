import type { Metadata } from "next";
import { GeistSans } from 'geist/font';
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Compress PDF Presentations Online | TinyDeck",
  description: "Fast, free PDF compressor for pitch decks and slides. Shrink presentation PDFs online without losing quality. No login required.",
  keywords: "pdf compressor, compress pdf, reduce pdf size, presentation pdf, pitch deck compressor, slide pdf smaller, free pdf compressor online, pdf compression tool",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="antialiased bg-[#0E1117] min-h-screen">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
