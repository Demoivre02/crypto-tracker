import Link from 'next/link';
import { SITE_CONFIG } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {SITE_CONFIG.name}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {SITE_CONFIG.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

