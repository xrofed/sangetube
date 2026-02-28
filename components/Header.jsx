'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header({ siteName = 'VideoSite' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || 'dark';
    setTheme(current);
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  }

  return (
    <header className="sticky top-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-display font-bold text-sm group-hover:bg-brand-500 transition-colors">
              V
            </span>
            <span className="font-display text-xl text-white">{siteName}</span>
          </Link>

          {/* Search */}
          <form action="/search" method="get" className="hidden md:flex flex-1 max-w-md">
            <input
              type="text"
              name="q"
              placeholder="Cari video, tag, kategori..."
              className="w-full h-10 rounded-lg bg-dark-800 border border-dark-700 px-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-brand-600"
            />
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 shrink-0">
            <Link href="/" className="btn-ghost">Beranda</Link>
            <Link href="/category" className="btn-ghost">Kategori</Link>
            <Link href="/tags" className="btn-ghost">Tag</Link>
          </nav>

          <button
            type="button"
            className="hidden md:inline-flex theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
            title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.79A9 9 0 1 1 11.21 3c0 5 4.06 9 9.07 9 .24 0 .48-.01.72-.04z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
              </svg>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-dark-700 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden py-3 pb-4 border-t border-dark-700 flex flex-col gap-2">
            <form action="/search" method="get" className="mb-1">
              <input
                type="text"
                name="q"
                placeholder="Cari video..."
                className="w-full h-10 rounded-lg bg-dark-800 border border-dark-700 px-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-brand-600"
              />
            </form>
            <nav className="flex flex-col gap-1">
              <Link href="/" className="btn-ghost w-full" onClick={() => setMenuOpen(false)}>Beranda</Link>
              <Link href="/category" className="btn-ghost w-full" onClick={() => setMenuOpen(false)}>Kategori</Link>
              <Link href="/tags" className="btn-ghost w-full" onClick={() => setMenuOpen(false)}>Tag</Link>
              <button
                type="button"
                className="theme-toggle w-full"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
              >
                {theme === 'light' ? 'Pakai Mode Gelap' : 'Pakai Mode Terang'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
