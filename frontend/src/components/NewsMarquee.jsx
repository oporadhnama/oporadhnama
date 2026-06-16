'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchPosts } from '../api';

export default function NewsMarquee({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  const containerRef = useRef(null);
  const isPaused = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  // ── Fetch posts ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (initialPosts.length > 0) {
      setPosts(initialPosts);
      setLoading(false);
      return;
    }
    fetchPosts()
      .then(items => {
        const postsResult = Array.isArray(items) ? items : items.results || [];
        const sorted = postsResult
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 10);
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [initialPosts]);

  // ── Auto-scroll animation ────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let lastTime = 0;

    const animate = (time) => {
      if (!isPaused.current) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;
        container.scrollLeft += 0.06 * delta;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [loading, posts.length]);

  // ── Wheel: non-passive listener so preventDefault() actually works ───────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      // Capture the scroll — prevent the page from scrolling at all
      e.preventDefault();
      e.stopPropagation();
      // Use deltaY for vertical wheel, deltaX for horizontal (trackpad)
      container.scrollLeft += e.deltaY || e.deltaX;
    };

    // { passive: false } is essential — React synthetic events are passive by
    // default, which means e.preventDefault() is silently ignored there.
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [loading]);

  if (!loading && posts.length === 0) return null;

  const scrollPosts = [...posts, ...posts];

  const handleMouseEnter = () => { isPaused.current = true; };
  const handleMouseLeave = () => { isPaused.current = false; };

  // ── Touch handlers ───────────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    isPaused.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    // Prevent vertical page scroll while dragging the marquee horizontally
    e.preventDefault();
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => { isPaused.current = false; };

  return (
    <section className="mt-6 md:mt-16 w-full relative z-10">
      {/* ── Section Title Bar ── */}
      <div className="bg-white/95 py-3 px-8 flex items-center gap-3 border-y-2 border-[#E50914]/30 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse inline-block shadow-sm shadow-[#E50914]/50 flex-shrink-0" />
        <h2 className="font-bold text-xl tracking-wide">
          <span className="text-neutral-900">সাম্প্রতিক </span><span className="text-[#E50914]">খবর</span>
        </h2>
      </div>

      {/* ── Marquee Track ── */}
      <div className="relative">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="overflow-x-auto whitespace-nowrap bg-neutral-950/50 border-b border-neutral-800 py-5"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            // Allow only horizontal touch-drag on this element;
            // vertical panning is handled by the touch handlers above.
            touchAction: 'pan-x',
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
