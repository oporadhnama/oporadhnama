'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { fetchPosts, fetchCategories, resolveImageUrl, stripHtml } from '../api';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatBengaliDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('bn-BD', { dateStyle: 'long' }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function getBengaliError(err) {
  const msg = typeof err === 'string' ? err : err?.message || '';
  if (!msg || msg.toLowerCase().includes('network') || msg.toLowerCase().includes('failed to fetch')) {
    return 'নেটওয়ার্ক সংযোগে সমস্যা। অনুগ্রহ করে আবার চেষ্টা করুন।';
  }
  if (msg.includes('500')) return 'সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।';
  if (msg.includes('404')) return 'তথ্য খুঁজে পাওয়া যায়নি।';
  if (msg.includes('403') || msg.includes('401')) return 'এই তথ্য দেখার অনুমতি নেই।';
  return 'তথ্য আনতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
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

// ── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl p-6 border border-gray-100 flex flex-col justify-between min-h-[200px]">
      <div>
        <div className="h-3 w-16 bg-gray-200 rounded mb-3" />
        <div className="h-5 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-4/5 bg-gray-200 rounded mb-1" />
        <div className="h-4 w-3/5 bg-gray-200 rounded mb-4" />
      </div>
      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ onClear, hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4 select-none" aria-hidden="true">🔍</span>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">কোনো সংবাদ পাওয়া যায়নি</h3>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
        {hasFilters
          ? 'আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন, অথবা সব ফিল্টার মুছুন।'
          : 'এই মুহূর্তে কোনো সংবাদ নেই।'}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          className="mt-6 text-[#E50914] text-sm font-medium hover:underline transition-all"
        >
          সব ফিল্টার মুছুন →
        </button>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AllNews() {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20); // Default to desktop limit
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const division = searchParams.get('division') || '';
  const date = searchParams.get('date') || '';
  const categoryId = searchParams.get('category') || '';

  const hasFilters = !!(division || date || categoryId);

  const divisions = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা',
    'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ', 'আন্তর্জাতিক'
  ];

  // Detect device size on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setLimit(isMobile ? 12 : 20);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // Reset page to 1 when filters (searchParams) change
  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  // Fetch posts when searchParams, page, limit, or refreshTrigger changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams(searchParams.toString());
    const offset = (page - 1) * limit;
    params.set('limit', limit);
    params.set('offset', offset);

    fetchPosts(params.toString())
      .then(data => {
        setPosts(data.results || []);
        setTotalCount(data.count || 0);
        setLoading(false);
      })
      .catch(err => {
        setError(getBengaliError(err));
        setLoading(false);
      });
  }, [searchParams, page, limit, refreshTrigger]);

  const updateSearchParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const clearFilters = () => router.push(pathname);

  const totalPages = Math.ceil(totalCount / limit) || 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first
      pages.push(1);
      
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);
      
      if (page <= 3) {
        end = 4;
      }
      if (page >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 pt-28 px-6 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        সকল <span className="text-[#E50914]">সংবাদ</span>
      </h1>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-xs font-medium">ক্যাটেগরি</label>
          <select
            value={categoryId}
            onChange={(e) => updateSearchParam('category', e.target.value)}
            className="bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors min-w-[180px] cursor-pointer"
          >
            <option value="">সব ক্যাটেগরি</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-xs font-medium">বিভাগ</label>
          <select
            value={division}
            onChange={(e) => updateSearchParam('division', e.target.value)}
            className="bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors min-w-[180px] cursor-pointer"
          >
            <option value="">সকল বিভাগ</option>
            {divisions.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-xs font-medium">তারিখ</label>
          <input
            type="date"
            value={date}
            onChange={(e) => updateSearchParam('date', e.target.value)}
            className="bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors min-w-[180px] cursor-pointer"
          />
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="mt-auto bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30 rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#E50914]/20 transition-colors"
          >
            ফিল্টার মুছুন
          </button>
        )}
      </div>

      {/* Results count */}
      {!loading && !error && posts.length > 0 && (
        <p className="text-gray-500 text-sm mb-6 text-center">
          {totalCount.toLocaleString('bn-BD')}টি সংবাদ পাওয়া গেছে
        </p>
      )}

      {/* Skeleton loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-5xl mb-4 select-none" aria-hidden="true">⚠️</span>
          <p className="text-red-400 text-base mb-4">{error}</p>
          <button
            onClick={() => setRefreshTrigger(prev => prev + 1)}
            className="bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30 rounded-lg px-5 py-2 text-sm font-medium hover:bg-[#E50914]/20 transition-colors"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <EmptyState onClear={clearFilters} hasFilters={hasFilters} />
      )}

      {/* News grid */}
      {!loading && !error && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => {
              const palette = getCategoryPalette(post.category_name, index);
              const imgUrl = resolveImageUrl(post.image);
              return (
              <Link
                key={post.id}
                href={`/news/${post.slug || post.id}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group"
                aria-label={`সংবাদ পড়ুন: ${post.title}`}
                style={{
                  borderLeft: `4px solid ${palette.border}`,
                }}
              >
                {imgUrl ? (
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={imgUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                ) : null}

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    {post.category_name && (
                      <span 
                        className="self-start text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded mb-3 inline-block"
                        style={{ color: palette.color, backgroundColor: palette.bg }}
                      >
                        {post.category_name}
                      </span>
                    )}

                    <h3 className="text-gray-900 font-bold text-base leading-snug line-clamp-2 mb-2 group-hover:text-[#D62828] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                      {stripHtml(post.description)}
                    </p>
                  </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">{formatBengaliDate(post.date)}</span>
                    <span className="text-gray-400 text-[10px]">{(post.location_text || post.division) && `স্থান: ${[post.location_text, post.division].filter(Boolean).join(', ')}`}</span>
                  </div>
                  <span className="text-xs font-bold hover:underline transition-all duration-200" style={{ color: palette.color }}>
                    বিস্তারিত পড়ুন →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-12 py-8 select-none">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-white border border-gray-200 hover:border-gray-400 disabled:opacity-40 disabled:hover:border-gray-200 disabled:cursor-not-allowed text-gray-700 hover:text-gray-900 transition-all duration-200"
            >
              ← পূর্ববর্তী
            </button>

            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === '...') {
                return (
                  <span key={`ellipse-${idx}`} className="px-3 py-2 text-gray-500 select-none">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 text-sm font-bold rounded-lg transition-all duration-200 ${
                    page === pageNum
                      ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/25'
                      : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {pageNum.toLocaleString('bn-BD', { useGrouping: false })}
                </button>
              );
            })}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-white border border-gray-200 hover:border-gray-400 disabled:opacity-40 disabled:hover:border-gray-200 disabled:cursor-not-allowed text-gray-700 hover:text-gray-900 transition-all duration-200"
            >
              পরবর্তী →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
