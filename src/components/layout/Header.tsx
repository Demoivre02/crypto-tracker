'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Crypto Tracker
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/markets" className="text-muted-foreground hover:text-foreground transition-colors">
              Markets
            </Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-accent"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-foreground" />
              ) : (
                <MoonIcon className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
