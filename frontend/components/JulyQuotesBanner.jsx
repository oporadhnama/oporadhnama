'use client';

import React from 'react';

const QUOTES = [
  "জান দেবো, জুলাই দেবো না — শরীফ ওসমান হাদী",
  "ঘাস খেয়ে হলেও অস্ত্র বানাও বাংলাদেশ — হাদী",
  "গণহত্যাকারী আওয়ামীলীগ (জাতিসংঘ ঘোষিত) — বিচার চাই",
  "ফ্যাসিস্টের বিচার ছাড়া বিশ্রাম নেই — শরীফ ওসমান হাদী",
  "রক্ত দিয়ে কেনা স্বাধীনতা, বিক্রি হবে না",
  "জুলাই শহীদদের রক্ত বৃথা যেতে দেবো না — হাদী",
  "এই দেশ শহীদের, ফ্যাসিস্টের নয়",
  "জুলাই বিপ্লব — অমর হোক, অমর থাকুক",
  "প্রতিটি রক্তবিন্দু ইতিহাস লিখছে",
  "আমরা ভুলিনি, ভুলবো না — জুলাই '২৪",
];

export default function JulyQuotesBanner() {
  // Duplicate for seamless loop
  const items = [...QUOTES, ...QUOTES];

  return (
    <div className="w-full overflow-hidden bg-red-950/20 border-y border-red-900/40 relative py-2.5 select-none">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'julyMarquee 40s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((quote, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 text-sm md:text-base font-semibold"
          >
            <span
              className="text-red-400"
              style={{ textShadow: '0 0 8px rgba(229,9,20,0.6)' }}
            >
              {quote}
            </span>
            <span className="text-red-700 text-lg">✦</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes julyMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
