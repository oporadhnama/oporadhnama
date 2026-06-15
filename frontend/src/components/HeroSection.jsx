'use client';

import React from 'react';
import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-24 md:mt-12 px-4 w-full max-w-4xl mx-auto mb-6 md:mb-8">
      {/* Main Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
        অন্যায়ের <span className="text-[#E50914]">প্রতিবাদ</span>, সত্যের সংরক্ষণ
      </h1>

      {/* Sub-title */}
      <p className="text-neutral-300 text-sm md:text-lg mt-2 max-w-2xl leading-relaxed">
        বাংলাদেশের সকল রাজনৈতিক, সামাজিক ও রাষ্ট্রীয় অপরাধের নির্মোহ এবং স্থায়ী তথ্যভাণ্ডার।
      </p>

      {/* Search Bar */}
      <SearchBar />
    </section>
  );
}
