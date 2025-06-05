import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link></li>
              <li><Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900">Documentation</Link></li>
              <li><Link href="/changelog" className="text-sm text-gray-600 hover:text-gray-900">Changelog</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="/careers" className="text-sm text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><Link href="/security" className="text-sm text-gray-600 hover:text-gray-900">Security</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Connect</h3>
            <ul className="space-y-3">
              <li><Link href="https://twitter.com/tinydeck" className="text-sm text-gray-600 hover:text-gray-900">Twitter</Link></li>
              <li><Link href="https://github.com/tinydeck" className="text-sm text-gray-600 hover:text-gray-900">GitHub</Link></li>
              <li><Link href="https://discord.gg/tinydeck" className="text-sm text-gray-600 hover:text-gray-900">Discord</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-600">© 2025 TinyDeck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
