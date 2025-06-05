import type { Metadata } from "next";
import { GeistSans } from 'geist/font';
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyDeck.me - PDF Compression",
  description: "Compress your PDF files quickly and easily",
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
      <body className="antialiased bg-gradient-to-br from-indigo-50 via-white to-gray-50 text-gray-900 selection:bg-indigo-100">
        {children}
      </body>
    </html>
  );
}
