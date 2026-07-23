'use client';

import React, { useState, useEffect } from 'react';

export default function MaintenanceWall() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    setLastChecked(new Date().toLocaleTimeString('bn-BD'));
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col justify-between items-center relative overflow-hidden font-sans selection:bg-red-600/30 selection:text-white">
      {/* Dynamic Animated Background Grid & Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Ambient Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-red-900/20 rounded-full blur-[130px]"></div>

        {/* Subtle Newspaper & Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        ></div>
        
        {/* Subtle Horizontal Scanlines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none"></div>
      </div>

      {/* Top Header Section */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/40 border border-red-500/30">
            <span className="text-white font-black text-xl tracking-tighter">অ</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wide text-white flex items-center gap-2">
              অপরাধনামা
              <span className="text-xs font-mono font-normal text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/50">
                OFFLINE
              </span>
            </h1>
            <p className="text-[11px] text-gray-400 font-medium">দেশ ও দশের সংবাদ</p>
          </div>
        </div>

        {/* Maintenance Live Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium backdrop-blur-md shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span>রক্ষণাবেক্ষণ চলছে</span>
        </div>
      </header>

      {/* Main Content Wall */}
      <main className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center text-center z-10 my-auto">
        
        {/* Maintenance Shield Icon Card */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600 via-amber-600 to-red-700 opacity-40 blur-xl group-hover:opacity-70 transition duration-1000"></div>
          
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-[#121318] border border-red-500/30 flex items-center justify-center shadow-2xl shadow-black/80 backdrop-blur-xl">
            {/* Animated Gear/Wrench SVG Icon */}
            <svg 
              className="w-14 h-14 md:w-16 md:h-16 text-red-500 animate-pulse" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42rem 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.654-4.654m0 0a6.241 6.241 0 01.766-1.208l3.03-2.496m-3.796 3.704l-3.03 2.496a6.241 6.241 0 01-1.208-.766M15.17 11.42l5.83-5.83A2.652 2.652 0 0017.25 1.83l-5.83 5.83m0 0l-3.03 2.496a6.241 6.241 0 01-.766 1.208m0 0l-5.653-4.655a2.548 2.548 0 113.586-3.586l4.654 5.654" />
            </svg>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          ওয়েবসাইট সাময়িকভাবে{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">
            রক্ষণাবেক্ষণাধীন রয়েছে
          </span>
        </h2>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          সম্মানিত পাঠক, অপরাধনামা পোর্টালটিকে আরও দ্রুত, নিরাপদ ও উন্নত করতে আমাদের সিস্টেমে জরুরি আপডেট এবং রক্ষণাবেক্ষণের কাজ চলছে। আমরা খুব শীঘ্রই সম্পূর্ণ নতুন অভিজ্ঞতায় অনলাইনে ফিরে আসব।
        </p>

        {/* Details & Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10 text-left">
          
          <div className="p-4 rounded-2xl bg-[#14161d]/80 border border-white/10 hover:border-red-500/30 transition-all backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">কাজের ধরণ</h3>
            <p className="text-xs text-gray-400 leading-relaxed">ডাটাবেজ ও সার্ভার সিকিউরিটি সিস্টেম আপগ্রেড।</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14161d]/80 border border-white/10 hover:border-red-500/30 transition-all backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">আনুমানিক সময়</h3>
            <p className="text-xs text-gray-400 leading-relaxed">খুব শীঘ্রই পুনঃসূচনা করা হবে।</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14161d]/80 border border-white/10 hover:border-red-500/30 transition-all backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">তথ্য সুরক্ষা</h3>
            <p className="text-xs text-gray-400 leading-relaxed">আপনার সমস্ত ডেটা ও রেকর্ড সম্পূর্ণ সুরক্ষিত।</p>
          </div>

        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-xl shadow-red-900/30 hover:shadow-red-800/50 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg 
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? 'রিফ্রেশ হচ্ছে...' : 'পুনরায় চেষ্টা করুন (Refresh)'}
          </button>

          <a
            href="mailto:contact@oporadhnama.info"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#14161d] hover:bg-[#1c1f2a] border border-white/15 text-gray-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            জরুরি প্রয়োজনে ইমেইল করুন
          </a>
        </div>

        {lastChecked && (
          <p className="text-[11px] text-gray-500 mt-6 font-mono">
            সর্বশেষ পরিদর্শনের সময়: {lastChecked}
          </p>
        )}

      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 text-center text-xs text-gray-500 z-10">
        <p>© ২০২৪-২০২৬ অপরাধনামা। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
}
