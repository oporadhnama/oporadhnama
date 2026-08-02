'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Radio, Send, BarChart2, Info, Phone, Newspaper, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

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
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  const links = [
    { label: 'সকল সংবাদ', path: '/all-news', icon: Newspaper },
    { label: 'গ্রাফ', path: '/graphs', icon: BarChart2 },
    { label: 'পডকাস্ট', path: '/podcast', icon: Radio },
    { label: 'তথ্য দিন', path: '/submit', icon: Send },
    { label: 'আমাদের সম্পর্কে', path: '/about', icon: Info },
    { label: 'যোগাযোগ', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 max-w-7xl mx-auto w-full">
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
              <span className="text-gray-900 font-extrabold">অপরাধ</span>
              <span className="text-[#D62828] font-black">নামা</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.path}
                className={`font-semibold transition-colors duration-200 text-sm md:text-base cursor-pointer px-3 py-1.5 border-b-2 flex items-center gap-1.5 ${
                  isActive(link.path)
                    ? 'text-[#D62828] border-[#D62828]'
                    : 'text-gray-600 hover:text-[#D62828] border-transparent hover:border-[#D62828]/40'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action icons (Search, Theme, Hamburger) */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="সংবাদ অনুসন্ধান করুন"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:text-amber-500 hover:bg-gray-100 transition-colors"
            aria-label="থিম পরিবর্তন করুন"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Hamburger */}
          <button
            ref={buttonRef}
            className="md:hidden p-2 rounded-lg text-gray-900 focus:outline-none hover:bg-gray-100"
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
        <div className="bg-gray-50 border-t border-b border-gray-200 px-4 py-3 animate-fadeIn">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/all-news?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="max-w-3xl mx-auto flex items-center gap-2"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সংবাদ, ঘটনা বা স্থান খুঁজুন..."
              className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-base px-2 py-1"
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
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={menuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-xl animate-[slideDown_0.2s_ease-out]"
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
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
