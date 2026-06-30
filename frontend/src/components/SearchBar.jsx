'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories } from '../api';

const DIVISIONS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা',
  'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ', 'আন্তর্জাতিক',
];

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('search', keyword.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedDivision) params.set('division', selectedDivision);

    const qs = params.toString();
    router.push(qs ? `/all-news?${qs}` : '/all-news');
  }, [keyword, selectedCategory, selectedDivision, router]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      {/* ── Input row ── */}
      <div className="flex items-center shadow-lg shadow-black/50">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="শিরোনাম, বর্ণনা বা এলাকা অনুসারে তথ্য খুঁজুন..."
          className="bg-neutral-800 text-white placeholder-neutral-500 rounded-l-md px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all duration-200"
        />
        <button
          onClick={handleSearch}
          className="bg-[#E50914] hover:bg-[#b8070f] px-6 py-[13.5px] rounded-r-md transition-colors duration-200 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* ── Filter dropdowns row ── */}
      <div className="flex flex-row gap-3 mt-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-neutral-800 text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors w-1/2 md:w-auto md:min-w-[160px] cursor-pointer"
        >
          <option value="">সব ক্যাটেগরি</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="bg-neutral-800 text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors w-1/2 md:w-auto md:min-w-[140px] cursor-pointer"
        >
          <option value="">সকল বিভাগ</option>
          {DIVISIONS.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
