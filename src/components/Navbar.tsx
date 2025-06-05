import Link from 'next/link';
import { Logo } from './Logo';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0D13]/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <div className="hidden md:block ml-10 space-x-8">
              <Link href="/pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documentation</Link>
              <Link href="/blog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Blog</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign in</Link>
            <Link 
              href="/signup" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
