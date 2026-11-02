'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Send, BarChart2, Info, Phone, Newspaper, Sun, Moon, Archive, X } from 'lucide-react';

const HINT_COOLDOWN_MS = 1000 * 60 * 60 * 18; // Show once every ~18 hours if not permanently toggled

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [showDarkHint, setShowDarkHint] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('oporadhnama_theme');
      const resolvedTheme = savedTheme === 'dark' ? 'dark' : 'light';
      setTheme(resolvedTheme);

      if (resolvedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
      }

      // Show elegant Dark Mode instruction callout on first visit or once in a while in Light Mode
      if (resolvedTheme === 'light') {
        const lastShown = Number(localStorage.getItem('oporadhnama_dark_hint_ts') || '0');
        const now = Date.now();
        if (!lastShown || now - lastShown > HINT_COOLDOWN_MS) {
          const timer = setTimeout(() => {
            setShowDarkHint(true);
            try {
              localStorage.setItem('oporadhnama_dark_hint_ts', String(Date.now()));
            } catch (_) {}
          }, 900);

          const autoHide = setTimeout(() => {
            setShowDarkHint(false);
          }, 11500);

          return () => {
            clearTimeout(timer);
            clearTimeout(autoHide);
          };
        }
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setShowDarkHint(false);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    try {
      localStorage.setItem('oporadhnama_theme', nextTheme);
      localStorage.setItem('oporadhnama_dark_hint_ts', String(Date.now()));
    } catch (_) {}
  };

  const links = [
    { label: 'সকল সংবাদ', path: '/all-news', icon: Newspaper },
    { label: 'আর্কাইভ', path: '/archive', icon: Archive },
    { label: 'গ্রাফ', path: '/graphs', icon: BarChart2 },
    { label: 'তথ্য দিন', path: '/submit', icon: Send },
    { label: 'আমাদের সম্পর্কে', path: '/about', icon: Info },
    { label: 'যোগাযোগ', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-lg transition-colors duration-300">
      {/* Subtle Top Crimson Editorial Accent Rule */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D62828] to-transparent opacity-85" />

      <nav className="flex items-center justify-between px-4 md:px-8 py-3 max-w-7xl mx-auto w-full bg-transparent">
        {/* Main Logo with public/favicon.svg */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-2xl md:text-3xl font-black tracking-wide select-none group"
            aria-label="অপরাধনামা হোমপেজ"
          >
            <img
              src="/favicon.svg"
              alt="অপরাধনামা লোগো"
              className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex items-center">
              <span className="text-white font-extrabold">অপরাধ</span>
              <span className="text-[#D62828] font-black">নামা</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-5">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.path}
                className={`font-semibold transition-colors duration-200 text-sm cursor-pointer px-2.5 py-1.5 border-b-2 flex items-center gap-1.5 ${
                  isActive(link.path)
                    ? 'text-[#D62828] border-[#D62828]'
                    : 'text-neutral-200 hover:text-[#D62828] border-transparent hover:border-[#D62828]/40'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action icons (Search, Theme, Hamburger) */}
        <div className="flex items-center gap-2.5 relative">
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
            aria-label="সংবাদ অনুসন্ধান করুন"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle + Floating Dark Mode Instruction Box */}
          <div className="relative flex items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showDarkHint
                  ? 'text-[#D62828] ring-2 ring-[#D62828]/50 bg-[#D62828]/10'
                  : 'text-neutral-300 hover:text-amber-500 hover:bg-neutral-800/60'
              }`}
              aria-label="থিম পরিবর্তন করুন"
              title={theme === 'dark' ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Elegant Dark Mode Instruction Callout (Mobile & Desktop) */}
            {showDarkHint && theme === 'light' && (
              <div
                role="status"
                className="keep-white absolute top-full right-0 mt-3 w-64 sm:w-72 rounded-xl bg-[#111318] border border-neutral-700/80 p-3.5 shadow-[0_14px_34px_rgba(0,0,0,0.45)] z-50 animate-[slideDown_0.25s_ease-out]"
              >
                {/* Upward pointer arrow aligned with the Moon button */}
                <div className="absolute -top-1.5 right-3.5 w-3 h-3 rotate-45 bg-[#111318] border-l border-t border-neutral-700/80" />

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D62828]/20 border border-[#D62828]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Moon className="w-4 h-4 text-[#ff4d55]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold tracking-wide text-white">
                        ডার্ক মোড (Dark Mode)
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowDarkHint(false)}
                        className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors"
                        aria-label="বন্ধ করুন"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] leading-relaxed text-neutral-300 mt-1">
                      রাতে বা কম আলোতে আরামদায়কভাবে সংবাদ পড়তে উপরের 🌙 আইকনে ক্লিক করে ডার্ক মোড চালু করতে পারেন।
                    </p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="px-2.5 py-1 rounded-md bg-[#D62828] hover:bg-[#b81f1f] text-white text-[11px] font-bold transition-colors"
                      >
                        ডার্ক মোড চালু করুন
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDarkHint(false)}
                        className="px-2 py-1 rounded-md text-neutral-400 hover:text-white text-[11px] font-medium transition-colors"
                      >
                        ঠিক আছে
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={buttonRef}
            className="lg:hidden p-2 rounded-lg text-white focus:outline-none hover:bg-neutral-800/60"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="নেভিগেশন মেনু"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Expandable Quick Search Bar */}
      {isSearchOpen && (
        <div className="bg-neutral-900 border-t border-b border-neutral-800 px-4 py-3 animate-fadeIn">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/all-news?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="max-w-3xl mx-auto flex items-center gap-2"
          >
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সংবাদ, ঘটনা বা স্থান খুঁজুন..."
              className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm md:text-base px-2 py-1"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#D62828] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-[#b01e1e] transition-colors"
            >
              খুঁজুন
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={menuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-neutral-950 border-b border-neutral-800 z-40 shadow-2xl animate-[slideDown_0.2s_ease-out]"
          >
            <ul className="flex flex-col py-3 px-4 gap-1">
              {links.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <li key={idx}>
                    <Link
                      href={link.path}
                      className={`flex items-center gap-3 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                        isActive(link.path)
                          ? 'text-[#D62828] bg-[#D62828]/10 font-bold'
                          : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
