import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0B0D13]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link 
            href="/privacy" 
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <a 
            href="https://github.com/yourusername/tiny-deck-me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
        </div>
        <div className="mt-4 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} TinyDeck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
