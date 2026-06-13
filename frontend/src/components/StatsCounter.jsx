import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, AlertOctagon, HandCoins, Gavel, LayoutList } from 'lucide-react';
import { fetchPublicStats, fetchCategories } from '../api';

function StatCard({ stat, value, categoryId }) {
  const IconComponent = stat.icon;
  // এখান থেকে সাইজের ক্লাসগুলো মুছে ফেলা হয়েছে, যাতে বাইরের বক্স কন্ট্রোল করতে পারে
  return (
    <div className="w-full h-full">
      {categoryId ? (
        <Link to={`/all-news?category=${categoryId}`} className="block h-full">
          <StatContent IconComponent={IconComponent} stat={stat} value={value} />
        </Link>
      ) : (
        <StatContent IconComponent={IconComponent} stat={stat} value={value} />
      )}
    </div>
  );
}

function StatContent({ IconComponent, stat, value }) {
  return (
    <div className="h-full border border-[#E50914]/40 bg-neutral-950/50 rounded-xl flex flex-col items-center justify-center p-6 transition-all duration-300 hover:bg-[#E50914] hover:shadow-[0_0_20px_rgba(229,9,20,0.12)] hover:border-[#E50914] group backdrop-blur-sm active:bg-[#E50914] active:shadow-[0_0_20px_rgba(229,9,20,0.12)] active:border-[#E50914]">
      <IconComponent
        className="w-8 h-8 text-[#E50914] mb-3 group-hover:text-white group-active:text-white transition-all duration-300"
        strokeWidth={1.8}
      />
      <span className="text-3xl font-extrabold text-white tracking-wide tabular-nums">
        {value}
      </span>
      <span className="text-neutral-400 text-xs mt-2 font-medium tracking-wide">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  const [counts, setCounts] = useState({});
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);

  const statsList = [
    { key: 'খুন',       label: 'খুন',       icon: ShieldAlert },
    { key: 'ধর্ষণ',     label: 'ধর্ষণ',     icon: AlertOctagon },
    { key: 'চাঁদাবাজি',  label: 'চাঁদাবাজি',  icon: HandCoins },
    { key: 'দুর্নীতি',   label: 'দুর্নীতি',   icon: Gavel },
    { key: 'অন্যান্য',   label: 'অন্যান্য',   icon: LayoutList },
  ];

  useEffect(() => {
    fetchPublicStats()
      .then(data => {
        setCounts(data || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetchCategories()
      .then(categories => {
        const map = {};
        categories.forEach(category => {
          if (category && category.name) {
            map[category.name] = category.id;
          }
        });
        setCategoryMap(map);
      })
      .catch(() => setCategoryMap({}));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-4 md:mt-8 px-4">
      {/* একদম ফ্রেশ এবং ক্লিন স্ক্রল কন্টেইনার */}
      <div 
        className="flex w-full overflow-x-auto gap-4 pb-4 pt-2"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x', /* এটি ব্রাউজারকে সোয়াইপ করতে বাধ্য করবে */
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {statsList.map((stat, index) => (
          <div 
            key={index} 
            className="shrink-0 w-[140px] md:w-[calc(20%-13px)]" /* ডেস্কটপে অটোমেটিক ৫টা গ্রিড হয়ে যাবে */
          >
            <StatCard
              stat={stat}
              value={counts[stat.key] || 0}
              categoryId={categoryMap[stat.key]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}