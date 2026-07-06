'use client';

import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-24 md:pt-28 px-4 w-full max-w-5xl mx-auto mb-2 md:mb-4 overflow-hidden">
      {/* ── Background Mesh Gradient ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Large green orb */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#006A4E]/8 rounded-full blur-[128px] animate-float" />
        {/* Red orb */}
        <div className="absolute top-20 -right-20 w-72 h-72 bg-[#E50914]/5 rounded-full blur-[100px]" style={{ animationDelay: '3s' }} />
        {/* Navy orb */}
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#1E40AF]/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Platform Badge ── */}
      <div className="animate-fade-in-up mb-4">
        <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full bg-[#006A4E]/10 border border-[#006A4E]/25 text-[#00A676]">
          <span className="w-2 h-2 rounded-full bg-[#00A676] animate-pulse" />
          বাংলাদেশের বিশ্বস্ত সংবাদমাধ্যম
        </span>
      </div>

      {/* ── Main Headline ── */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        সত্য প্রকাশে{' '}
        <span className="animate-gradient-text" style={{
          backgroundImage: 'linear-gradient(90deg, #00A676, #006A4E, #E50914, #006A4E, #00A676)',
        }}>
          আপসহীন
        </span>
        ,{' '}
        <br className="hidden md:block" />
        বাংলাদেশের পক্ষে{' '}
        <span className="text-[#006A4E]">অবিচল</span>
      </h1>

      {/* ── Sub-headline ── */}
      <p className="text-[#94A3B8] text-xs md:text-base mt-2 md:mt-3 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        অপরাধ বিশ্লেষণ • আন্তর্জাতিক কূটনীতি • পডকাস্ট • বিশেষ প্রতিবেদন — বাংলাদেশের সকল সত্য এক প্ল্যাটফর্মে
      </p>

      {/* ── Search Bar ── */}
      <div className="animate-fade-in-up w-full mt-4 md:mt-6" style={{ animationDelay: '0.3s' }}>
        <SearchBar />
      </div>

      {/* ── CTA Buttons ── */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <Link
          href="/all-news"
          className="text-xs md:text-sm text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 bg-neutral-900/40 hover:bg-neutral-800/60 rounded-full px-5 py-2 transition-all duration-200 font-medium"
        >
          সকল সংবাদ দেখুন →
        </Link>
        <Link
          href="/submit"
          className="text-xs md:text-sm text-white bg-[#E50914] hover:bg-[#c40812] rounded-full px-5 py-2 transition-all duration-200 font-semibold shadow-lg shadow-[#E50914]/20 hover:shadow-[#E50914]/30"
        >
          তথ্য পাঠান
        </Link>
      </div>
    </section>
  );
}
