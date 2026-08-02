import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        {/* Logo emblem with public/favicon.svg */}
        <div className="flex justify-center mb-2">
          <img src="/favicon.svg" alt="অপরাধনামা" className="w-16 h-16 object-contain" />
        </div>

        <h1 className="text-7xl font-black text-[#D62828] tracking-widest">404</h1>

        <h2 className="text-2xl font-bold text-white">
          সংবাদটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="text-neutral-400 text-sm leading-relaxed">
          আপনি যে পাতাটি খুঁজছেন তা মুছে ফেলা হয়েছে, স্থানান্তরিত হয়েছে অথবা লিংকটি ভুল লেখা হয়েছে।
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#D62828] text-white font-bold text-sm hover:bg-[#b01e1e] transition-colors shadow-lg shadow-[#D62828]/20"
          >
            হোমপেজে ফিরে যান
          </Link>
          <Link
            href="/all-news"
            className="px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 font-bold text-sm hover:bg-neutral-800 transition-colors"
          >
            সকল সংবাদ দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}
