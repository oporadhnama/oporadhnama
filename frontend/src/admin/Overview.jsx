'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Newspaper, FolderOpen, Users, TrendingUp } from 'lucide-react';
import { fetchDashboardStats, fetchPosts } from '../api';

function useAnimatedCount(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (target <= 0) { setCount(0); return; }

    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };

    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return count;
}

function StatCard({ card }) {
  const Icon = card.icon;
  const displayValue = useAnimatedCount(card.value || 0);

  return (
    <div className="bg-neutral-900/60 rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 group hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: card.color + '12' }}
        >
          <Icon className="w-5 h-5" style={{ color: card.color }} strokeWidth={1.8} />
        </div>
        <span
          className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
          style={{ color: card.color, background: card.color + '12' }}
        >
          Live
        </span>
      </div>
      <p className="text-4xl font-extrabold text-white mb-1 group-hover:scale-105 transition-transform origin-left tabular-nums">
        {displayValue}
      </p>
      <p className="text-neutral-500 text-sm">{card.label}</p>
    </div>
  );
}

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchDashboardStats(),
      fetchPosts('limit=5'),
    ])
      .then(([statsData, postsData]) => {
        setStats(statsData);
        setRecentPosts(Array.isArray(postsData) ? postsData : postsData.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'মোট সংবাদ', value: stats.total_posts, icon: Newspaper, color: '#E50914' },
    { label: 'সক্রিয় ক্যাটেগরি', value: stats.total_categories, icon: FolderOpen, color: '#3B82F6' },
    { label: 'মোট মডারেটর', value: stats.total_moderators, icon: Users, color: '#10B981' },
  ] : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">ড্যাশবোর্ড ওভারভিউ</h1>
        <div className="flex items-center gap-2 text-neutral-500 text-xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>লাইভ ডেটা</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {cards.map((card, idx) => (
              <StatCard key={idx} card={card} />
            ))}
          </div>

          {/* Recent Posts Table */}
          {recentPosts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">সাম্প্রতিক সংবাদ</h2>
              <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3">শিরোনাম</th>
                      <th className="text-left px-6 py-3">ক্যাটেগরি</th>
                      <th className="text-left px-6 py-3">বিভাগ</th>
                      <th className="text-left px-6 py-3">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map(post => (
                      <tr key={post.id} className="border-b border-neutral-800/30 hover:bg-neutral-800/20 transition-colors">
                        <td className="px-6 py-3 text-white font-medium max-w-xs truncate">{post.title}</td>
                        <td className="px-6 py-3">
                          <span className="text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded text-[10px] font-bold">
                            {post.category_name}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-neutral-400">{post.division || '-'}</td>
                        <td className="px-6 py-3 text-neutral-500">{post.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
