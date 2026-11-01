'use client';

import React, { useState, useEffect } from 'react';

const REACTIONS = [
  { key: 'important', emoji: '🔥', label: 'গুরুত্বপূর্ণ' },
  { key: 'justice', emoji: '⚖️', label: 'বিচার চাই' },
  { key: 'shocking', emoji: '😮', label: 'চাঞ্চল্যকর' },
  { key: 'sad', emoji: '😢', label: 'দুঃখজনক' },
];

export default function ArticleShareAndReactions({ title, description, slug }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const articleUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://oporadhnama.info/news/${slug}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`oporadhnama_react_${slug}`);
      if (saved) setSelectedReaction(saved);
    } catch (_) {}
  }, [slug]);

  const handleReact = (key) => {
    const next = selectedReaction === key ? null : key;
    setSelectedReaction(next);
    try {
      if (next) {
        localStorage.setItem(`oporadhnama_react_${slug}`, next);
      } else {
        localStorage.removeItem(`oporadhnama_react_${slug}`);
      }
    } catch (_) {}
  };

  // Reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate reading time
  const wordCount = (description || '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .split(/\s+/).length;
  const readTimeMins = Math.max(1, Math.ceil(wordCount / 150));
  const bengaliReadTime = `${readTimeMins.toLocaleString('bn-BD')} মিনিটের পড়া`;

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-800">
        <div
          className="h-full bg-gradient-to-r from-[#D62828] to-amber-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Reading Time & Reactions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md w-fit">
          <span>⏱️</span>
          <span>{bengaliReadTime}</span>
        </div>

        {/* Reader Reactions */}
        <div className="flex flex-wrap items-center gap-1.5">
          {REACTIONS.map((r) => {
            const active = selectedReaction === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => handleReact(r.key)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? 'bg-[#D62828]/20 border-[#D62828] text-white scale-105'
                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{r.emoji}</span>
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Social Share Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-y border-neutral-800">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
          শেয়ার ও সংরক্ষণ:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white text-xs font-bold transition-all"
          >
            Facebook
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — ${articleUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-bold transition-all"
          >
            WhatsApp
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-all"
          >
            Twitter / X
          </a>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#D62828] text-neutral-200 hover:text-white text-xs font-bold transition-all relative"
          >
            {copied ? '✓ লিংক কপি হয়েছে!' : '🔗 কপি করুন'}
          </button>

          {/* Print / Save PDF */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-all"
            title="প্রিন্ট বা PDF হিসেবে সংরক্ষণ করুন"
          >
            🖨️ প্রিন্ট / PDF
          </button>
        </div>
      </div>
    </>
  );
}
