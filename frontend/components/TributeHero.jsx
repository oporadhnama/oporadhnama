'use client';
import React from 'react';

export default function TributeHero({ campaign }) {
  if (!campaign || !campaign.active) return null;

  const day = campaign.day;
  // If no day is set, provide fallbacks
  const title = campaign.title || "অবিস্মরণীয় জুলাই";
  const dayNumber = day?.day_number || 1;
  const videoUrl = day?.video_url;
  const imageUrl = day?.image_url;
  const summaryText = day?.summary_text || "প্রতিদিনের রক্তক্ষয়া, সাহস, প্রতিরোধ ও ত্যাগের দলিল। জুলাইয়ের প্রতিটি দিন, আমরা বিশ্লেষণ করি, স্মরণ করি, এবং ইতিহাস সংরক্ষণ করি।";
  const readMoreLink = day?.read_more_link || "#";

  return (
    <div className="w-full bg-black text-white py-12 px-4 md:px-8 border-b border-red-900 shadow-[0_0_50px_rgba(255,0,0,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side: Media Player */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden border border-red-900 shadow-[0_0_30px_rgba(229,9,20,0.3)] bg-zinc-900 flex items-center justify-center">
            {videoUrl ? (
              <iframe
                src={videoUrl.replace("watch?v=", "embed/")}
                className="absolute inset-0 w-full h-full object-cover"
                allowFullScreen
                title="Tribute Video"
              />
            ) : imageUrl ? (
              <img src={imageUrl} alt={`Day ${dayNumber}`} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6">
                <span className="text-red-500 font-semibold mb-2 block">Day {dayNumber} Media</span>
                <span className="text-zinc-500 text-sm">Add a video or image via the Admin Panel</span>
              </div>
            )}
            {/* Overlay Gradient for moody effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-6 text-left">
          
          <div className="space-y-1">
            <h3 className="text-red-600 font-bold tracking-wider text-sm md:text-base">জুলাই '২৪</h3>
            <p className="text-zinc-400 text-sm md:text-base">জনতার অভ্যুত্থানের ৩৬ দিন</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]" style={{ textShadow: '2px 2px 10px rgba(229,9,20,0.6)' }}>
            {title.split(' ')[0]}<br />
            <span className="text-red-600">{title.split(' ').slice(1).join(' ')}</span>
          </h1>

          <div className="border border-red-600 rounded-xl px-8 py-4 bg-red-950/20 shadow-[0_0_20px_rgba(229,9,20,0.2)]">
            <h2 className="text-4xl md:text-5xl font-black text-red-500 text-center drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
              {dayNumber} <span className="text-2xl text-red-700">/ ৩৬ দিন</span>
            </h2>
            <p className="text-zinc-300 text-center mt-2 font-medium">চলছে সংগ্রাম, বেঁচে আছে স্মৃতি</p>
          </div>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
            {summaryText}
          </p>

          <a
            href={readMoreLink}
            className="inline-block mt-4 px-8 py-3 bg-transparent border border-red-800 text-red-500 hover:bg-red-900/40 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] transition-all duration-300 font-semibold rounded-md"
          >
            আজকের বিশ্লেষণ পড়ুন &rarr;
          </a>

        </div>
      </div>
    </div>
  );
}
