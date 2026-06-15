'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchPosts } from '../api';

export default function NewsMarquee({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);
  
  const containerRef = useRef(null);
  const isPaused = useRef(false);
  const isWheelScrolling = useRef(false);
  
  // আগের কোডে এই দুটি লাইন মিসিং ছিল, যা আমি যোগ করে দিয়েছি
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (initialPosts.length > 0) {
      setPosts(initialPosts);
      setLoading(false);
      return;
    }

    fetchPosts()
      .then(items => {
        const postsResult = Array.isArray(items) ? items : items.results || [];
        const sortedPosts = postsResult.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        ).slice(0, 10);
        setPosts(sortedPosts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [initialPosts]);

  // 🚨 ফিক্স: অ্যানিমেশনের useEffect-টি অবশ্যই early return-এর ওপরে থাকতে হবে!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let lastTime = 0;
    const scrollSpeed = 1; // pixels per frame

    const animate = (time) => {
      if (isPaused.current || isWheelScrolling.current) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      container.scrollLeft += scrollSpeed * deltaTime * 0.06;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [loading, posts.length]); // ডিপেন্ডেন্সি যোগ করা হয়েছে

  // React-এর নিয়ম অনুযায়ী সব Hook শেষে এটি থাকবে
  if (!loading && posts.length === 0) return null;

  // Duplicate once for seamless infinite loop
  const scrollPosts = [...posts, ...posts];

  // Hover pause functionality
  const handleMouseEnter = () => { isPaused.current = true; };
  const handleMouseLeave = () => { isPaused.current = false; };

  // Mouse wheel scrolling
  const handleWheel = (e) => {
    if (!containerRef.current) return;
    isWheelScrolling.current = true;
    e.preventDefault();
    containerRef.current.scrollLeft += e.deltaY;
    if (e.deltaX) {
      containerRef.current.scrollLeft += e.deltaX;
    }
    setTimeout(() => { isWheelScrolling.current = false; }, 100);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    isPaused.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isPaused.current = false;
  };

  return (
    <section className="mt-6 md:mt-16 w-full relative z-10">
      {/* ── Section Title Bar ── */}
      <div className="bg-white py-3 px-8 flex items-center gap-3 border-y border-neutral-200">
        <span className="text-[#E50914] font-extrabold text-lg">●</span>
        <h2 className="text-black font-bold text-xl tracking-wide">
          সাম্প্রতিক <span className="text-[#E50914]">খবর</span>
        </h2>
      </div>

      {/* ── Marquee Track ── */}
      <div
        className="overflow-x-auto whitespace-nowrap bg-neutral-950/50 border-b border-neutral-800 py-5"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y pinch-zoom' // মোবাইলে ভার্টিকাল স্ক্রল যেন ব্লক না হয়
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="gap-6 flex px-4">
            {scrollPosts.map((post, index) => (
              <Link
                key={`marquee-${index}`}
                href={`/news/${post.id}`}
                className="inline-block w-72 flex-shrink-0 bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Title */}
                <h3 className="text-lg font-bold text-black mb-2 whitespace-normal leading-snug line-clamp-2">
                  {post.title || ''}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 whitespace-normal leading-relaxed">
                  {post.description || ''}
                </p>

                {/* Action Link */}
                <span className="text-red-600 font-semibold text-sm hover:underline transition-all duration-200 inline-block">
                  বিস্তারিত পড়ুন →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
