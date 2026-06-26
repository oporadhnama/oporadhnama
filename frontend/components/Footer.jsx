'use client';

import React, { useState, useEffect } from 'react';

const FOOTER_QUOTES = [
  '"জান দেবো, জুলাই দেবো না" — শরীফ ওসমান হাদী',
  '"রক্ত দিয়ে কেনা স্বাধীনতা, বিক্রি হবে না"',
  '"জুলাই বিপ্লব — অমর হোক, অমর থাকুক"',
  '"এই দেশ শহীদের, ফ্যাসিস্টের নয়"',
];

export default function Footer({ campaignActive }) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!campaignActive) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % FOOTER_QUOTES.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, [campaignActive]);

  return (
    <footer className="border-t border-neutral-900 bg-black/95 text-sm text-neutral-500">
      {/* July tribute bar — only when campaign is active */}
      {campaignActive && (
        <div className="border-b border-red-900/40 bg-red-950/20 py-4 px-6">
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: tribute text */}
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xl select-none">🩸</span>
              <div>
                <p className="text-red-400 font-bold text-sm">জুলাই '২৪ শহীদদের প্রতি শ্রদ্ধা</p>
                <p className="text-neutral-500 text-xs">গণহত্যাকারী আওয়ামীলীগের বিচারের দাবিতে আমরা অবিচল</p>
              </div>
            </div>

            {/* Right: rotating quote */}
            <p
              className="text-red-300 italic text-sm font-medium text-center md:text-right max-w-xs transition-opacity duration-400"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {FOOTER_QUOTES[quoteIdx]}
            </p>
          </div>
        </div>
      )}

      {/* Main footer content */}
      <div className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="text-white font-bold">অপরাধ</span>
            <span className="text-[#E50914] font-bold">নামা</span> সংবাদের স্বচ্ছতা ও সত্যের জন্য।
          </p>
          <small>© {new Date().getFullYear()} অপরাধনামা. সর্বস্বত্ব সংরক্ষিত।</small>
        </div>
      </div>
    </footer>
  );
}
