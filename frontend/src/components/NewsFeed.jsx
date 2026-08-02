'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchPosts, fetchCategories, resolveImageUrl, stripHtml } from '../api';
import NewsFeedSkeleton from './NewsFeedSkeleton';

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatBengaliDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('bn-BD', { dateStyle: 'long' }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return '';
  try {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'এইমাত্র';
    if (diffMins < 60) return `${diffMins} মিনিট আগে`;
    if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
    if (diffDays < 7) return `${diffDays} দিন আগে`;
    return formatBengaliDate(dateStr);
  } catch {
    return dateStr;
  }
}

// ── Category color mapping ─────────────────────────────────────────────────────

const CATEGORY_PALETTES = {
  'হত্যাকান্ড': { color: '#FF4D55', bg: 'rgba(255, 77, 85, 0.15)', border: '#FF4D55' },
  'ধর্ষণ': { color: '#FF7682', bg: 'rgba(255, 118, 130, 0.15)', border: '#FF7682' },
  'ডাকাতি': { color: '#FF9800', bg: 'rgba(255, 152, 0, 0.15)', border: '#FF9800' },
  'মাদক': { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', border: '#F59E0B' },
  'জাতীয়': { color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981' },
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

function getCategoryPalette(categoryName, index = 0) {
  if (categoryName && CATEGORY_PALETTES[categoryName]) {
    return CATEGORY_PALETTES[categoryName];
  }
  return DEFAULT_PALETTES[index % DEFAULT_PALETTES.length];
}

// ── Category Ribbon ────────────────────────────────────────────────────────────

function CategoryRibbon({ categories }) {
  const ribbonRef = useRef(null);

  if (!categories || categories.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

      <div
        ref={ribbonRef}
        className="category-ribbon flex items-center gap-2.5 overflow-x-auto px-6 py-4"
      >
        {/* "সকল" (All) pill */}
        <Link
          href="/all-news"
          className="category-pill flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] hover:bg-[#E50914] hover:text-white"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          সকল
        </Link>

        {categories.map((cat, idx) => {
          const palette = getCategoryPalette(cat.name, idx);
          return (
            <Link
              key={cat.id}
              href={`/all-news?category=${cat.id}`}
              className="category-pill flex-shrink-0 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
              style={{
                color: palette.color,
                backgroundColor: palette.bg,
                borderColor: `${palette.border}33`,
              }}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ── Featured Card (Large) ──────────────────────────────────────────────────────

function FeaturedCard({ post }) {
  if (!post) return null;
  const palette = getCategoryPalette(post.category_name);

  return (
    <Link
      href={`/news/${post.slug || post.id}`}
      className="group block h-full"
      aria-label={`পড়ুন: ${post.title || ''}`}
    >
      <article className="news-card h-full flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Image area */}
        {resolveImageUrl(post.image) ? (
          <div className="relative overflow-hidden aspect-[16/9]">
            <img
              src={resolveImageUrl(post.image)}
              alt={post.title || ''}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {post.category_name && (
              <span
                className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm"
                style={{ color: palette.color, backgroundColor: `${palette.bg}`, border: `1px solid ${palette.border}44` }}
              >
                {post.category_name}
              </span>
            )}
            {/* Time badge */}
            <span className="absolute bottom-4 left-4 text-[11px] text-white font-medium shadow-sm">
              {formatRelativeTime(post.date || post.created_at)}
            </span>
          </div>
        ) : (
          <div className="relative aspect-[16/9] bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {post.category_name && (
              <span
                className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ color: palette.color, backgroundColor: palette.bg }}
              >
                {post.category_name}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-grow p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#D62828] transition-colors duration-200 line-clamp-3">
            {post.title || ''}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-grow">
            {stripHtml(post.description || '')}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-500 text-xs">
                {formatBengaliDate(post.date || post.created_at)}
              </span>
              {(post.location_text || post.division) && (
                <span className="text-neutral-600 text-[11px]">
                  📍 {[post.location_text, post.division].filter(Boolean).join(', ')}
                </span>
              )}
            </div>
            <span
              className="text-sm font-semibold group-hover:underline transition-all"
              style={{ color: palette.color }}
            >
              বিস্তারিত →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Side Story Card (Small) ────────────────────────────────────────────────────

function SideCard({ post, index }) {
  if (!post) return null;
  const palette = getCategoryPalette(post.category_name, index);
  const imgUrl = resolveImageUrl(post.image);

  return (
    <Link
      href={`/news/${post.slug || post.id}`}
      className="group block"
      aria-label={`পড়ুন: ${post.title || ''}`}
    >
      <article className="news-card flex gap-4 p-4 rounded-lg bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm">
        {/* Thumbnail */}
        {imgUrl ? (
          <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-20 rounded-lg overflow-hidden">
            <img
              src={imgUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-20 rounded-lg bg-gray-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col flex-grow min-w-0 justify-center">
          {post.category_name && (
            <span
              className="text-[10px] font-bold uppercase tracking-wider mb-1.5 inline-block w-fit"
              style={{ color: palette.color }}
            >
              {post.category_name}
            </span>
          )}
          <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#D62828] transition-colors">
            {post.title || ''}
          </h4>
          <span className="text-[11px] text-gray-500 mt-1.5">
            {formatRelativeTime(post.date || post.created_at)}
          </span>
        </div>
      </article>
    </Link>
  );
}

// ── Grid Card (Medium) ─────────────────────────────────────────────────────────

function GridCard({ post, index }) {
  if (!post) return null;
  const palette = getCategoryPalette(post.category_name, index);

  return (
    <Link
      href={`/news/${post.slug || post.id}`}
      className="group block h-full"
      aria-label={`পড়ুন: ${post.title || ''}`}
    >
      <article className="news-card h-full flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md">
        {/* Thumbnail */}
        {post.image ? (
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={post.image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {post.category_name && (
              <span
                className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-sm"
                style={{ color: palette.color, backgroundColor: palette.bg, border: `1px solid ${palette.border}33` }}
              >
                {post.category_name}
              </span>
            )}
          </div>
        ) : (
          <div className="relative aspect-[16/10] bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {post.category_name && (
              <span
                className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                style={{ color: palette.color, backgroundColor: palette.bg }}
              >
                {post.category_name}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          <h4 className="text-sm md:text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#D62828] transition-colors">
            {post.title || ''}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-grow leading-relaxed">
            {stripHtml(post.description || '')}
          </p>
          <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
            <span className="text-[11px] text-gray-500">
              {formatRelativeTime(post.date || post.created_at)}
            </span>
            <span
              className="text-xs font-semibold group-hover:underline"
              style={{ color: palette.color }}
            >
              পড়ুন →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Main NewsFeed Component ────────────────────────────────────────────────────

export default function NewsFeed({ initialPosts = [], initialCategories = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    if (initialPosts.length > 0) {
      setPosts(initialPosts.slice(0, 13));
      setLoading(false);
    } else {
      fetchPosts('limit=13')
        .then((data) => {
          const results = Array.isArray(data) ? data : data.results || [];
          setPosts(results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 13));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [initialPosts]);

  useEffect(() => {
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
    } else {
      fetchCategories()
        .then(setCategories)
        .catch(() => setCategories([]));
    }
  }, [initialCategories]);

  if (loading) {
    return <NewsFeedSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center py-16 w-full">
        <p className="text-gray-500 text-sm">কোনো সংবাদ পাওয়া যায়নি।</p>
      </div>
    );
  }

  // Split posts: 1 featured, 3 side, rest grid
  const featuredPost = posts[0];
  const sidePosts = posts.slice(1, 4);
  const gridPosts = posts.slice(4, 13);

  return (
    <section className="newspaper-bg w-full mt-0 relative z-10">
      {/* ── Newspaper Divider ── */}
      <div className="newspaper-divider mx-auto max-w-6xl" />

      {/* ── Category Ribbon ── */}
      <div className="max-w-6xl mx-auto">
        <CategoryRibbon categories={categories} />
      </div>

      {/* ── Thin Rule ── */}
      <div className="thin-rule mx-auto max-w-6xl" />

      {/* ── Featured Section ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
          <h2 className="section-headline font-bold text-lg md:text-xl tracking-wide">
            <span className="text-gray-900">প্রধান </span>
            <span className="text-[#E50914]">সংবাদ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main featured story */}
          <div className="lg:col-span-3 column-rule">
            <FeaturedCard post={featuredPost} />
          </div>

          {/* Side stories */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {sidePosts.map((post, idx) => (
              <SideCard key={post.id || idx} post={post} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="newspaper-divider mx-auto max-w-6xl" />

      {/* ── Latest News Grid ── */}
      {gridPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E50914]" />
              <h2 className="section-headline font-bold text-lg md:text-xl tracking-wide">
                <span className="text-gray-900">সর্বশেষ </span>
                <span className="text-[#E50914]">সংবাদ</span>
              </h2>
            </div>
            <Link
              href="/all-news"
              className="text-xs md:text-sm text-gray-500 hover:text-[#E50914] font-medium transition-colors duration-200 flex items-center gap-1"
            >
              সব দেখুন
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 news-grid-stagger">
            {gridPosts.map((post, idx) => (
              <GridCard key={post.id || idx} post={post} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom CTA ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-8 pt-2 flex justify-center">
        <Link
          href="/all-news"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:text-[#E50914] hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          সকল সংবাদ দেখুন
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
