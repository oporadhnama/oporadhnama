'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchPosts } from '../api';

function formatBengaliDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('bn-BD', { dateStyle: 'long' }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

const CATEGORY_PALETTES = {
  'হত্যাকান্ড': { color: '#FF4D55', bg: 'rgba(255, 77, 85, 0.15)', border: '#FF4D55' },
  'ধর্ষণ': { color: '#FF7682', bg: 'rgba(255, 118, 130, 0.15)', border: '#FF7682' },
  'ডাকাতি': { color: '#FF9800', bg: 'rgba(255, 152, 0, 0.15)', border: '#FF9800' },
  'মাদক': { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', border: '#F59E0B' },
  'জাতীয়': { color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981' },
  'আন্তর্জাতিক': { color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.15)', border: '#38BDF8' },
  'বিশ্লেষণ': { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.15)', border: '#A78BFA' },
  'পডকাস্ট': { color: '#FCD34D', bg: 'rgba(252, 211, 77, 0.15)', border: '#FCD34D' },
  'কূটনীতি': { color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.15)', border: '#0EA5E9' },
  'মধ্যপ্রাচ্য সংকট': { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.15)', border: '#06B6D4' },
  'অন্যান্য': { color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.15)', border: '#94A3B8' },
};

const DEFAULT_PALETTES = [
  { color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981' },
  { color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.15)', border: '#38BDF8' },
  { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.15)', border: '#A78BFA' },
  { color: '#F43F5E', bg: 'rgba(244, 63, 94, 0.15)', border: '#F43F5E' },
  { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', border: '#F59E0B' },
];

function getCategoryPalette(categoryName, index) {
  if (categoryName && CATEGORY_PALETTES[categoryName]) {
    return CATEGORY_PALETTES[categoryName];
  }
  return DEFAULT_PALETTES[index % DEFAULT_PALETTES.length];
}

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
      setPosts(initialPosts.slice(0, 12));
      setLoading(false);
      return;
    }
    fetchPosts('limit=12')
      .then(items => {
        const postsResult = Array.isArray(items) ? items : items.results || [];
        const sorted = postsResult
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 12);
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
      e.preventDefault();
      e.stopPropagation();
      container.scrollLeft += e.deltaY || e.deltaX;
    };

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
              {scrollPosts.map((post, index) => {
                const palette = getCategoryPalette(post.category_name, index);
                return (
                  <Link
                    key={`marquee-${index}`}
                    href={`/news/${post.slug || post.id}`}
                    className="inline-flex flex-col w-72 flex-shrink-0 bg-neutral-900 rounded-lg p-5 shadow-md hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
                    aria-label={`সংবাদ পড়ুন: ${post.title || ''}`}
                    style={{
                      borderLeft: `4px solid ${palette.border}`,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      borderRight: '1px solid rgba(255,255,255,0.08)',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Category badge */}
                    {post.category_name && (
                      <span 
                        className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded mb-3 w-fit"
                        style={{ color: palette.color, backgroundColor: palette.bg }}
                      >
                        {post.category_name}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-base font-bold text-white mb-2 whitespace-normal leading-snug line-clamp-2 hover:text-neutral-200 transition-colors">
                      {post.title || ''}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-300 line-clamp-2 mb-3 whitespace-normal leading-relaxed flex-grow">
                      {post.description || ''}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-800">
                      <div className="flex flex-col">
                        <span className="text-neutral-400 text-xs">{formatBengaliDate(post.date)}</span>
                        {(post.location_text || post.division) && (
                          <span className="text-neutral-500 text-[11px]">
                            {`স্থান: ${[post.location_text, post.division].filter(Boolean).join(', ')}`}
                          </span>
                        )}
                      </div>
                      {/* Action Link */}
                      <span className="font-semibold text-sm hover:underline transition-all duration-200 inline-block" style={{ color: palette.color }}>
                        বিস্তারিত পড়ুন →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
