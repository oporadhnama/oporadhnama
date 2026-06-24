import React from 'react';

export const metadata = {
  title: 'জুলাই পরিসংখ্যান - অপরাধনামা',
  description: 'অবিস্মরণীয় জুলাই ইভেন্টের পরিসংখ্যান',
};

export default function JulyStatsPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white pt-[100px] pb-20 px-4 md:px-8 font-['Noto_Sans_Bengali','Inter',sans-serif]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            অবিস্মরণীয় <span className="text-[#E50914]">জুলাই</span>
          </h1>
          <div className="inline-block px-6 py-2 bg-white/5 rounded-full border border-white/10">
            <p className="text-gray-300 font-semibold tracking-wide">জুলাই পরিসংখ্যান</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1e0f0f] to-[#0f0a0a] border border-[#ff4500]/50 rounded-2xl p-8 text-center shadow-[0_8px_32px_-8px_rgba(255,69,0,0.3)] relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff4500] to-transparent"></div>
            <p className="text-gray-300 text-lg font-bold mb-4">শহিদের সংখ্যা</p>
            <p className="text-white text-4xl md:text-5xl font-black drop-shadow-[0_2px_15px_rgba(255,69,0,0.6)]">১৪০০ জন</p>
          </div>

          <div className="bg-gradient-to-br from-[#1e0f0f] to-[#0f0a0a] border border-[#ff8c00]/50 rounded-2xl p-8 text-center shadow-[0_8px_32px_-8px_rgba(255,140,0,0.3)] relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff8c00] to-transparent"></div>
            <p className="text-gray-300 text-lg font-bold mb-4">আহতের সংখ্যা</p>
            <p className="text-white text-4xl md:text-5xl font-black drop-shadow-[0_2px_15px_rgba(255,140,0,0.6)]">১৩৮১১ জন</p>
          </div>

          <div className="bg-gradient-to-br from-[#1e0f0f] to-[#0f0a0a] border border-[#E50914]/50 rounded-2xl p-8 text-center shadow-[0_8px_32px_-8px_rgba(229,9,20,0.3)] relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent"></div>
            <p className="text-gray-300 text-lg font-bold mb-4">গ্রেফতারের সংখ্যা</p>
            <p className="text-white text-4xl md:text-5xl font-black drop-shadow-[0_2px_15px_rgba(229,9,20,0.6)]">প্রায় ৩৫ হাজারের ও বেশি</p>
          </div>
        </div>
      </div>
    </div>
  );
}
