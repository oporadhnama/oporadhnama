'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target) &&
          buttonRef.current && !buttonRef.current.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  const links = [
    { label: "সংবাদ আর্কাইভ", path: "/archive" },
    { label: "সকল সংবাদ", path: "/all-news" },
    { label: "গ্রাফ", path: "/graphs" },
    { label: "তথ্য দিন", path: "/submit" },
    { label: "আমাদের সম্পর্কে", path: "/about" },
    { label: "যোগাযোগ", path: "/contact" }
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-md border-b border-neutral-900">
      {/* Logo */}
      <Link href="/" className="text-2xl md:text-3xl font-extrabold md:font-black tracking-wider select-none">
        <span className="text-white">অপরাধ</span>
        <span className="text-[#E50914]">নামা</span>
      </Link>

      {/* Navigation Links - Hidden on mobile */}
      <ul className="hidden md:flex items-center gap-10">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.path}
              className={`font-semibold transition-colors duration-200 text-lg cursor-pointer px-4 py-2 border-b-2 ${
                isActive(link.path)
                  ? 'text-[#E50914] border-[#E50914]'
                  : 'text-gray-100 hover:text-[#E50914] border-transparent hover:border-[#E50914]/40'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger Menu - Visible on mobile */}
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

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-menu"
            ref={menuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-neutral-900 z-40 animate-[slideDown_0.2s_ease-out]"
          >
            <ul className="flex flex-col items-center py-4 gap-2">
              {links.map((link, idx) => (
                <li key={idx} className="w-full text-center">
                  <Link
                    href={link.path}
                    className={`block py-3 px-4 font-medium transition-colors duration-200 text-sm cursor-pointer ${
                      isActive(link.path)
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
    </nav>
  );
}
