'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  const [yearly] = useState(false);
  const router = useRouter();

  const features = {
    free: [
      { name: '3 files per day', included: true },
      { name: 'Up to 25MB files', included: true },
      { name: 'Compression history', included: false },
      { name: 'Batch processing', included: false },
      { name: 'Cloud storage', included: false },
    ],
    pro: [
      { name: 'Unlimited files', included: true },
      { name: 'Up to 200MB files', included: true },
      { name: 'Compression history', included: true },
      { name: 'Batch processing', included: true },
      { name: 'Cloud storage', included: true },
    ],
  };

  const faqs = [
    {
      question: 'How does the free plan work?',
      answer: 'The free plan allows you to compress up to 3 PDF files per day, with a maximum file size of 25MB per file. Your files are automatically deleted after 24 hours.',
    },
    {
      question: 'Can I cancel my Pro subscription?',
      answer: 'Yes, you can cancel your Pro subscription at any time. You will continue to have access to Pro features until the end of your billing period.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use encryption for all file transfers and storage. Your files are automatically deleted after 24 hours, and we never access or analyze your PDF contents.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards and PayPal. Payments are processed securely through Stripe.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-white relative overflow-hidden">
      <div className="checker-background" />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
            Go Pro. Compress More, Worry Less.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for you. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="relative bg-[#141921]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Free</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold">$0</span>
                  <span className="text-gray-400 ml-1">/forever</span>
                </div>
                <p className="text-gray-400 mt-4">Perfect for occasional use</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="h-6 w-6 text-gray-600 mr-3 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 text-center text-white bg-[#1E2430] rounded-lg hover:bg-[#262f3d] transition-colors duration-200"
              >
                Try for Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-indigo-900/20 backdrop-blur-sm rounded-2xl border border-indigo-800/50 p-8">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                <div className="bg-indigo-500 text-white text-sm px-3 py-1 rounded-full">
                  Popular
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Pro</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold">$9</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <p className="text-gray-400 mt-4">For power users & teams</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature.name}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => router.push('/signup')}
                className="w-full px-6 py-3 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#141921]/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-400">
            Cancel anytime. No questions asked.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
