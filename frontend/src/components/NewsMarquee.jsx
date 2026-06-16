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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let lastTime = 0;
    const scrollSpeed = 1;

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
  }, [loading, posts.length]);

  if (!loading && posts.length === 0) return null;

  const scrollPosts = [...posts, ...posts];

  const handleMouseEnter = () => { isPaused.current = true; };
  const handleMouseLeave = () => { isPaused.current = false; };

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
      <div className="bg-gradient-to-r from-[#E50914] via-[#b00710] to-neutral-900 py-3 px-8 flex items-center gap-3 border-y border-[#E50914]/40 shadow-lg shadow-[#E50914]/10">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse inline-block shadow-sm shadow-white/50" />
          <span className="text-white/90 font-extrabold text-xs uppercase tracking-widest drop-shadow">সরাসরি</span>
        </span>
        <div className="w-px h-5 bg-white/30 mx-1" />
        <h2 className="text-white font-bold text-xl tracking-wide drop-shadow">
          লাইভ <span className="text-yellow-300 font-extrabold">সাম্প্রতিক খবর</span>
        </h2>
      </div>

      {/* ── Marquee Track ── */}
      <div className="relative">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

        <div
          className="overflow-x-auto whitespace-nowrap bg-neutral-950/50 border-b border-neutral-800 py-5 scrollbar-hide"
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
            touchAction: 'pan-y pinch-zoom'
          }}
        >
          {loading ? (
            <div className="flex justify-center py-4" role="status" aria-label="লোড হচ্ছে...">
              <div className="w-6 h-6 border-2 border-neutral-700 border-t-[#E50914] rounded-full animate-spin" />
              <span className="sr-only">লোড হচ্ছে...</span>
            </div>
          ) : (
            <div className="gap-5 flex px-8">
              {scrollPosts.map((post, index) => (
                <Link
                  key={`marquee-${index}`}
                  href={`/news/${post.slug || post.id}`}
                  className="inline-block w-72 flex-shrink-0 bg-neutral-900 border border-neutral-800 hover:border-[#E50914]/40 rounded-lg p-5 shadow-md hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
                  aria-label={`সংবাদ পড়ুন: ${post.title || ''}`}
                >
                  {/* Category badge */}
                  {post.category_name && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded mb-3">
                      {post.category_name}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 whitespace-normal leading-snug line-clamp-2">
                    {post.title || ''}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-3 whitespace-normal leading-relaxed">
                    {post.description || ''}
                  </p>

                  {/* Action Link */}
                  <span className="text-[#E50914] font-semibold text-sm hover:underline transition-all duration-200 inline-block">
                    বিস্তারিত পড়ুন →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
