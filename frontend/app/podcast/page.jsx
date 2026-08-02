import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'অপরাধনামা পডকাস্ট | সত্যের অডিও অনুসন্ধানী প্রতিবেদন',
  description: 'অপরাধনামা পডকাস্ট — অপরাধ, রাজনীতি ও জটিল অপরাধ অনুসন্ধানের বিশেষ অডিও এপিসোড। শুনুন সরাসরি ব্রাউজারে।',
};

const EPISODES = [
  {
    id: 1,
    title: 'এপিসোড ০১: জুলাই গণহত্যার পেছনের অন্ধকার অধ্যায়',
    date: '১ আগস্ট, ২০২৪',
    duration: '২৮ মিনিট',
    summary: 'জুলাই আন্দোলনকালীন সময়ে সংঘটিত হামলা, নথিপত্র গায়েব ও ডিজিটাল মনিটরিং সিন্ডিকেটের নেপথ্য অনুসন্ধানী অডিও প্রতিবেদন।',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    spotifyUrl: 'https://spotify.com',
    appleUrl: 'https://podcasts.apple.com',
  },
  {
    id: 2,
    title: 'এপিসোড ০২: সীমান্ত অঞ্চলে অবৈধ ড্রাগ সিন্ডিকেট ও প্রভাবশালী নেটওয়ার্ক',
    date: '১৫ জুলাই, ২০২৪',
    duration: '৩৫ মিনিট',
    summary: 'দক্ষিণ-পশ্চিমাঞ্চলীয় সীমান্ত দিয়ে রুট পরিবর্তন করে মাদক প্রবেশের চাঞ্চল্যকর তদন্ত।',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    spotifyUrl: 'https://spotify.com',
    appleUrl: 'https://podcasts.apple.com',
  },
  {
    id: 3,
    title: 'এপিসোড ০৩: সাইবার ক্রাইম ও ডিজিটাল ব্যাংকিং জালিয়াতি',
    date: '২ জুন, ২০২৪',
    duration: '২২ মিনিট',
    summary: 'মোবাইল ব্যাংকিং অ্যাকাউন্ট হ্যাকিং এবং গ্রাহকের অর্থ আত্মসাতের আধুনিক পদ্ধতি প্রকাশ।',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    spotifyUrl: 'https://spotify.com',
    appleUrl: 'https://podcasts.apple.com',
  },
];

export default function PodcastPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 md:px-8 max-w-5xl mx-auto w-full pb-20">
      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#D62828]/20 border border-neutral-800 mb-12 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#D62828] bg-[#D62828]/10 border border-[#D62828]/30 px-3 py-1 rounded-full mb-4">
            🎙️ অপরাধনামা অডিও
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            অপরাধনামা পডকাস্ট
          </h1>
          <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
            সত্য ঘটনা, গোপন নথিপত্র এবং গভীর অনুসন্ধানের অডিও ধারাভাষ্য। শুনুন আমাদের বিশেষ অডিও এপিসোডগুলো সরাসরি ব্রাউজারে অথবা আপনার প্রিয় প্ল্যাটফর্মে।
          </p>
        </div>
      </div>

      {/* Episodes List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#D62828] rounded-full inline-block"></span>
          সকল এপিসোড ({EPISODES.length})
        </h2>

        {EPISODES.map((ep) => (
          <div
            key={ep.id}
            className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group"
          >
            <div className="space-y-2 flex-grow max-w-3xl">
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="text-[#D62828] font-bold">📅 {ep.date}</span>
                <span>•</span>
                <span>⏱️ {ep.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#D62828] transition-colors leading-snug">
                {ep.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {ep.summary}
              </p>

              {/* In-browser Audio Player */}
              <div className="pt-3">
                <audio controls className="w-full max-w-md h-9 rounded-lg bg-neutral-800 accent-[#D62828]">
                  <source src={ep.audioUrl} type="audio/mpeg" />
                  আপনার ব্রাউজারে অডিও সমর্থিত নয়।
                </audio>
              </div>
            </div>

            {/* External Platform Links */}
            <div className="flex flex-row md:flex-col gap-2 flex-shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-neutral-800">
              <a
                href={ep.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial text-center px-4 py-2 rounded-lg bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-black text-xs font-bold transition-all"
              >
                Spotify-এ শুনুন 🎧
              </a>
              <a
                href={ep.appleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial text-center px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white text-xs font-bold transition-all"
              >
                Apple Podcasts 
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
