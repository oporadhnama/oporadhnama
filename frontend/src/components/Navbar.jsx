'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ campaignActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showJulyStats, setShowJulyStats] = useState(false);
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
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    // If campaignActive is passed as prop, use it; else fetch
    if (campaignActive !== undefined) {
      setShowJulyStats(!!campaignActive);
      return;
    }
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://oporadhnama.onrender.com';
    const apiBase = apiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');

    fetch(`${apiBase}/api/campaign/active/`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data && data.active) setShowJulyStats(true);
      })
      .catch((err) => console.error('Failed to fetch active campaign:', err));
  }, [campaignActive]);

  const baseLinks = [
    { label: 'সকল সংবাদ', path: '/all-news' },
    { label: 'গ্রাফ', path: '/graphs' },
    { label: 'তথ্য দিন', path: '/submit' },
    { label: 'আমাদের সম্পর্কে', path: '/about' },
    { label: 'যোগাযোগ', path: '/contact' },
  ];

  const links = showJulyStats
    ? [
        ...baseLinks.slice(0, 3),
        { label: 'জুলাই পরিসংখ্যান', path: '/july-stats' },
        ...baseLinks.slice(3),
      ]
    : baseLinks;

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-black/80 backdrop-blur-md border-b border-neutral-900">
      {/* Logo + July Badge */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold md:font-black tracking-wider select-none"
        >
          <span className="text-white">অপরাধ</span>
          <span className="text-[#E50914]">নামা</span>
        </Link>

        {/* July Campaign Badge */}
        {showJulyStats && (
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-red-950/60 border border-red-800/70 text-red-400 text-xs font-bold px-2.5 py-1 rounded-full animate-[julyBadgePulse_2s_ease-in-out_infinite]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            জুলাই '২৪
          </span>
        )}
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.path}
              className={`font-semibold transition-colors duration-200 text-base cursor-pointer px-3 py-2 border-b-2 ${
                link.path === '/july-stats'
                  ? isActive(link.path)
                    ? 'text-red-400 border-red-500'
                    : 'text-red-500 border-red-700/50 hover:text-red-300 hover:border-red-500 animate-[julyLinkGlow_2s_ease-in-out_infinite]'
                  : isActive(link.path)
                  ? 'text-[#E50914] border-[#E50914]'
                  : 'text-gray-100 hover:text-[#E50914] border-transparent hover:border-[#E50914]/40'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        ref={buttonRef}
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="নেভিগেশন মেনু"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
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

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-menu"
            ref={menuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-neutral-900 z-40 animate-[slideDown_0.2s_ease-out]"
          >
            {/* Mobile July badge */}
            {showJulyStats && (
              <div className="flex items-center justify-center gap-2 py-2 bg-red-950/30 border-b border-red-900/40">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-xs font-bold tracking-wider">জুলাই '২৪ — অবিস্মরণীয় অভ্যুত্থান</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
            )}
            <ul className="flex flex-col items-center py-4 gap-2">
              {links.map((link, idx) => (
                <li key={idx} className="w-full text-center">
                  <Link
                    href={link.path}
                    className={`block py-3 px-4 font-medium transition-colors duration-200 text-sm cursor-pointer ${
                      link.path === '/july-stats'
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-950/30'
                        : isActive(link.path)
                        ? 'text-[#E50914] bg-[#E50914]/10'
                        : 'text-gray-300 hover:text-[#E50914] hover:bg-neutral-900/60'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes julyBadgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(229, 9, 20, 0); }
          50% { box-shadow: 0 0 8px 2px rgba(229, 9, 20, 0.3); }
        }
        @keyframes julyLinkGlow {
          0%, 100% { text-shadow: none; }
          50% { text-shadow: 0 0 8px rgba(229, 9, 20, 0.6); }
        }
      `}</style>
    </nav>
  );
}
