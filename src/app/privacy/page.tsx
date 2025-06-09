'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white relative overflow-hidden">
      <div className="checker-background" />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p>
                TinyDeck ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.
                This privacy policy explains how we collect, use, and safeguard your information when you use our PDF compression service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <p>We collect and process the following information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>PDF files you upload for compression</li>
                  <li>Usage data (compression counts, file sizes)</li>
                  {/* If user is logged in */}
                  <li>Email address (for registered users)</li>
                  <li>Authentication data from third-party providers (GitHub, Google)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <div className="space-y-4">
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide our PDF compression service</li>
                  <li>Maintain usage limits (3 compressions per day)</li>
                  <li>Improve our service and user experience</li>
                  <li>Communicate with you about your account (if registered)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Storage and Security</h2>
              <div className="space-y-4">
                <p>
                  Your files are stored temporarily and securely using Supabase Storage.
                  All uploaded files are automatically deleted after 24 hours.
                </p>
                <p>
                  We implement appropriate security measures to protect your data,
                  including encryption and secure file storage practices.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Uploaded PDFs are automatically deleted after 24 hours</li>
                  <li>Compressed PDFs are automatically deleted after 24 hours</li>
                  <li>Usage data is retained for 30 days</li>
                  <li>Account information is retained until account deletion</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
              <div className="space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Delete your account and associated data</li>
                  <li>Request information about how your data is processed</li>
                  <li>Object to our use of your data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices,
                please contact us through our GitHub repository.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify
                you of any changes by posting the new privacy policy on this page.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Last updated: June 9, 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
