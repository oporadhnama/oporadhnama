'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchPosts } from '../../lib/api'; // or wherever fetchPosts is. Wait, in SiteShell we don't have api. Let me use fetch directly or the existing api.js

export default function BreakingNewsTicker() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest news to use as breaking news ticker
    fetch('https://oporadhnama.onrender.com/api/news/?limit=5')
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results || [];
        setNewsItems(results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || newsItems.length === 0) return null;

  return (
    <div className="w-full bg-[#111] border-b border-neutral-800 flex items-center overflow-hidden relative z-40 h-10">
      {/* Label Box */}
      <div className="bg-[#E50914] text-white font-bold px-4 h-full flex items-center shrink-0 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
        <span className="flex items-center gap-2 text-sm whitespace-nowrap">
          <span className="w-2 h-2 bg-white rounded-full animate-ping" />
          ব্রেকিং নিউজ
        </span>
      </div>

      {/* Marquee Wrapper */}
      <div className="flex-1 overflow-hidden h-full flex items-center relative group">
        <div className="animate-marquee whitespace-nowrap flex items-center pl-4 group-hover:[animation-play-state:paused]">
          {newsItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <Link 
                href={`/news/${item.slug || item.id}`}
                className="text-neutral-200 hover:text-white hover:underline text-sm font-medium transition-colors"
              >
                {item.title}
              </Link>
              <span className="text-[#E50914] mx-4">||</span>
            </React.Fragment>
          ))}
          {/* Duplicate for seamless infinite scrolling */}
          {newsItems.map((item, idx) => (
            <React.Fragment key={`dup-${item.id}`}>
              <Link 
                href={`/news/${item.slug || item.id}`}
                className="text-neutral-200 hover:text-white hover:underline text-sm font-medium transition-colors"
              >
                {item.title}
              </Link>
              <span className="text-[#E50914] mx-4">||</span>
            </React.Fragment>
          ))}
        </div>
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#111] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
