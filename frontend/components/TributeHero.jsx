'use client';
import React, { useState, useEffect } from 'react';

const JULY_QUOTES = [
  { text: "জান দেবো, জুলাই দেবো না", author: "শরীফ ওসমান হাদী" },
  { text: "ঘাস খেয়ে হলেও অস্ত্র বানাও বাংলাদেশ", author: "হাদী" },
  { text: "ফ্যাসিস্টের বিচার ছাড়া বিশ্রাম নেই", author: "শরীফ ওসমান হাদী" },
  { text: "রক্ত দিয়ে কেনা স্বাধীনতা, বিক্রি হবে না", author: "জুলাই বিপ্লব" },
  { text: "গণহত্যাকারী আওয়ামীলীগের বিচার চাই", author: "শরীফ ওসমান হাদী" },
  { text: "জুলাই শহীদের রক্ত বৃথা যেতে দেবো না", author: "হাদী" },
];

export default function TributeHero({ campaign }) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % JULY_QUOTES.length);
        setFadeIn(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!campaign || !campaign.active) return null;

  const day = campaign.day;
  const title = campaign.title || 'অবিস্মরণীয় জুলাই';
  const dayNumber = day?.day_number || 1;
  const videoUrl = day?.video_url;
  const imageUrl = day?.image_url;
  const summaryText =
    day?.summary_text ||
    'প্রতিদিনের রক্তক্ষয়া সাহস, প্রতিরোধ ও ত্যাগের দলিল। জুলাইয়ের প্রতিটি দিন, আমরা বিশ্লেষণ করি, স্মরণ করি, এবং ইতিহাস সংরক্ষণ করি।';
  const readMoreLink = day?.read_more_link || '#';

  const currentQuote = JULY_QUOTES[quoteIdx];

  return (
    <div className="w-full bg-black text-white border-b border-red-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(229,9,20,0.08)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(229,9,20,0.06)_0%,transparent_60%)]" />
      </div>

      {/* Rotating quote bar at top */}
      <div className="relative z-10 bg-red-950/40 border-b border-red-900/50 py-2 px-4 flex items-center justify-center gap-3">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
        <p
          className="text-sm md:text-base text-center font-semibold transition-opacity duration-500"
          style={{ opacity: fadeIn ? 1 : 0 }}
        >
          <span className="text-red-400 italic">"{currentQuote.text}"</span>
          <span className="text-neutral-500 ml-2 text-xs">— {currentQuote.author}</span>
        </p>
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10 px-4 md:px-8">

        {/* Left Side: Media */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {videoUrl ? (
            /* Video: fixed portrait ratio */
            <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden border border-red-900 shadow-[0_0_30px_rgba(229,9,20,0.35)] bg-zinc-900">
              <iframe
                src={videoUrl.replace('watch?v=', 'embed/')}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                title="Tribute Video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : imageUrl ? (
            /* Image: natural size — no forced aspect ratio */
            <div className="relative rounded-2xl overflow-hidden border border-red-900 shadow-[0_0_30px_rgba(229,9,20,0.35)] inline-flex">
              <img
                src={imageUrl}
                alt={`জুলাই দিন ${dayNumber}`}
                loading="eager"
                fetchPriority="high"
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain block"
                style={{ display: 'block' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            /* Placeholder */
            <div className="w-full max-w-[340px] aspect-[9/16] rounded-2xl border border-red-900/50 bg-zinc-900/60 flex flex-col items-center justify-center gap-3 shadow-[0_0_20px_rgba(229,9,20,0.15)]">
              <span className="text-6xl">🔥</span>
              <span className="text-red-500 font-semibold text-center px-4">দিন {dayNumber} — মিডিয়া যোগ করুন</span>
              <span className="text-zinc-500 text-sm text-center px-6">অ্যাডমিন প্যানেল থেকে ভিডিও বা ছবি আপলোড করুন</span>
            </div>
          )}
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-5 text-left">

          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-500 font-bold tracking-widest text-xs md:text-sm uppercase">
              জুলাই '২৪ • জনতার অভ্যুত্থান
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
            style={{ textShadow: '0 0 30px rgba(229,9,20,0.5)' }}
          >
            {title.split(' ')[0]}
            <br />
            <span className="text-red-600">{title.split(' ').slice(1).join(' ')}</span>
          </h1>

          {/* Day counter */}
          <div className="border border-red-700 rounded-xl px-6 py-4 bg-red-950/25 shadow-[0_0_20px_rgba(229,9,20,0.2)] w-full max-w-xs">
            <h2 className="text-4xl md:text-5xl font-black text-red-500 text-center" style={{ textShadow: '0 0 15px rgba(255,0,0,0.5)' }}>
              {dayNumber}{' '}
              <span className="text-xl text-red-700">/ ৩৬ দিন</span>
            </h2>
            <p className="text-zinc-400 text-center mt-1 text-sm font-medium">চলছে সংগ্রাম, বেঁচে আছে স্মৃতি</p>
          </div>

          {/* Summary */}
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-lg">{summaryText}</p>

          {/* Quote block — animated */}
          <div
            className="border-l-4 border-red-600 pl-4 py-1 transition-opacity duration-500"
            style={{ opacity: fadeIn ? 1 : 0 }}
          >
            <p className="text-red-300 italic text-base md:text-lg font-medium leading-snug">
              "{currentQuote.text}"
            </p>
            <p className="text-neutral-500 text-xs mt-1">— {currentQuote.author}</p>
          </div>

          {/* CTA */}
          <a
            href={readMoreLink}
            className="inline-block mt-2 px-7 py-3 bg-transparent border border-red-800 text-red-400 hover:bg-red-900/40 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300 font-semibold rounded-lg text-sm"
          >
            আজকের বিশ্লেষণ পড়ুন →
          </a>
        </div>
      </div>
    </div>
  );
}
