import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { fetchPublicStats, fetchCategories } from '../api';

export default function StatsCounter() {
  const [counts, setCounts] = useState({});
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Promise.all ব্যবহার করে দুটি API-এর ডেটা একসাথে লোড করা হচ্ছে
    Promise.all([
      fetchPublicStats(),
      fetchCategories()
    ])
    .then(([statsData, categoriesData]) => {
      // স্ট্যাটস সেট করা
      setCounts(statsData || {});

      // ক্যাটাগরি ম্যাপ সেট করা
      const map = {};
      // categoriesData যদি Array হয়, তবেই লুপ চলবে (এরর এড়ানোর জন্য)
      if (Array.isArray(categoriesData)) {
        categoriesData.forEach(category => {
          if (category && category.name) {
            map[category.name] = category.id;
          }
        });
      }
      setCategoryMap(map);
    })
    .catch((error) => {
      console.error("Error fetching stats:", error);
    })
    .finally(() => {
      // দুটি API কল সম্পূর্ণ শেষ হওয়ার পরেই লোডিং ফলস হবে
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
      </div>
    );
  }

  // স্ট্রিং বা অন্য কোনো ডেটা টাইপ আসলে যেন ক্র্যাশ না করে সেজন্য Number() ব্যবহার করা হয়েছে
  const totalNews = Number(counts.total) || Object.values(counts).reduce((a, b) => a + (Number(b) || 0), 0);
  const murderCount = Number(counts['খুন']) || 0;
  const rapeCount = Number(counts['ধর্ষণ']) || 0;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-10 px-4 flex justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 bg-black text-white px-10 py-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-neutral-900 w-full md:w-auto">
        
        {/* ১. খুন */}
        <div className="text-center w-full md:w-auto border-b md:border-b-0 md:border-r border-neutral-800 pb-6 md:pb-0 md:pr-10">
          {categoryMap['খুন'] ? (
            <Link to={`/all-news?category=${categoryMap['খুন']}`} className="block cursor-pointer group">
              <h3 className="text-5xl md:text-6xl font-bold font-sans tracking-tight text-white group-hover:text-[#E50914] transition-colors duration-300">
                <CountUp start={0} end={murderCount} duration={2.5} separator="," />+
              </h3>
              <p className="text-[#E50914] mt-2 text-xl font-semibold group-hover:text-white transition-colors duration-300">
                খুন
              </p>
            </Link>
          ) : (
             <div className="block">
              <h3 className="text-5xl md:text-6xl font-bold font-sans tracking-tight text-white">
                <CountUp start={0} end={murderCount} duration={2.5} separator="," />+
              </h3>
              <p className="text-[#E50914] mt-2 text-xl font-semibold">
                খুন
              </p>
            </div>
          )}
        </div>

        {/* ২. ধর্ষণ */}
        <div className="text-center w-full md:w-auto border-b md:border-b-0 md:border-r border-neutral-800 pb-6 md:pb-0 md:pr-10">
          {categoryMap['ধর্ষণ'] ? (
            <Link to={`/all-news?category=${categoryMap['ধর্ষণ']}`} className="block cursor-pointer group">
              <h3 className="text-5xl md:text-6xl font-bold font-sans tracking-tight text-white group-hover:text-[#E50914] transition-colors duration-300">
                <CountUp start={0} end={rapeCount} duration={2.5} separator="," />+
              </h3>
              <p className="text-[#E50914] mt-2 text-xl font-semibold group-hover:text-white transition-colors duration-300">
                ধর্ষণ
              </p>
            </Link>
          ) : (
             <div className="block">
              <h3 className="text-5xl md:text-6xl font-bold font-sans tracking-tight text-white">
                <CountUp start={0} end={rapeCount} duration={2.5} separator="," />+
              </h3>
              <p className="text-[#E50914] mt-2 text-xl font-semibold">
                ধর্ষণ
              </p>
            </div>
          )}
        </div>

        {/* ৩. মোট সংবাদ আর্কাইভ */}
        <div className="text-center w-full md:w-auto">
          <Link to="/all-news" className="block cursor-pointer group">
            <h3 className="text-5xl md:text-6xl font-bold font-sans tracking-tight text-white group-hover:text-[#E50914] transition-colors duration-300">
              <CountUp start={0} end={totalNews} duration={2.5} separator="," />+
            </h3>
            <p className="text-neutral-300 mt-2 text-xl font-semibold group-hover:text-white transition-colors duration-300">
              সংবাদ আর্কাইভ
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
}