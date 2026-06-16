'use client';

import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-24 md:mt-12 px-4 w-full max-w-4xl mx-auto mb-6 md:mb-8">
      {/* Main Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
        অন্যায়ের <span className="text-[#E50914]">প্রতিবাদ</span>, সত্যের সংরক্ষণ
      </h1>

      {/* Sub-title */}
      <p className="text-neutral-300 text-sm md:text-lg mt-2 max-w-2xl leading-relaxed">
        বাংলাদেশের সকল রাজনৈতিক, সামাজিক ও রাষ্ট্রীয় অপরাধের নির্মোহ এবং স্থায়ী তথ্যভাণ্ডার।
      </p>

      {/* Search Bar */}
      <SearchBar />

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        <Link
          href="/all-news"
          className="text-sm text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 bg-neutral-900/40 hover:bg-neutral-800/60 rounded-full px-6 py-2.5 transition-all duration-200 font-medium"
        >
          সকল সংবাদ দেখুন →
        </Link>
        <Link
          href="/submit"
          className="text-sm text-white bg-[#E50914] hover:bg-[#c40812] rounded-full px-6 py-2.5 transition-all duration-200 font-semibold shadow-lg shadow-[#E50914]/20 hover:shadow-[#E50914]/30"
        >
          তথ্য পাঠান
        </Link>
      </div>
    </section>
  );
}
