'use client';

import React, { useState, useEffect } from 'react';

export default function ArticleShareAndReactions({ title, description, slug }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [reactions, setReactions] = useState({
    important: 12,
    angry: 5,
    sad: 3,
    viral: 18,
  });
  const [userReaction, setUserReaction] = useState(null);

  const articleUrl = typeof window !== 'undefined' ? window.location.href : `https://oporadhnama.info/news/${slug}`;

  // Reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate reading time
  const wordCount = (description || '').replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  const readTimeMins = Math.max(1, Math.ceil(wordCount / 150));
  const bengaliReadTime = `${readTimeMins.toLocaleString('bn-BD')} মিনিটের পড়া`;

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReaction = (key) => {
    if (userReaction === key) return;
    setReactions((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
      ...(userReaction ? { [userReaction]: Math.max(0, prev[userReaction] - 1) } : {}),
    }));
    setUserReaction(key);
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

      {/* Reading Time Badge */}
      <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium mb-4 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md w-fit">
        <span>⏱️</span>
        <span>{bengaliReadTime}</span>
      </div>

      {/* Social Share Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-y border-neutral-800">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
          শেয়ার করুন:
        </span>
        <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Reader Reactions Section */}
      <div className="my-8 p-6 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <h4 className="text-sm font-bold text-neutral-300 mb-4 text-center">
          এই প্রতিবেদন সম্পর্কে আপনার মতামত দিন:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => handleReaction('important')}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-bold transition-all ${
              userReaction === 'important'
                ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                : 'bg-neutral-800/60 border-neutral-700/60 hover:border-blue-500/50 text-neutral-300'
            }`}
          >
            <span>👍 গুরুত্বপূর্ণ</span>
            <span className="text-neutral-400">({reactions.important})</span>
          </button>

          <button
            onClick={() => handleReaction('angry')}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-bold transition-all ${
              userReaction === 'angry'
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : 'bg-neutral-800/60 border-neutral-700/60 hover:border-red-500/50 text-neutral-300'
            }`}
          >
            <span>😡 ক্ষুব্ধ</span>
            <span className="text-neutral-400">({reactions.angry})</span>
          </button>

          <button
            onClick={() => handleReaction('sad')}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-bold transition-all ${
              userReaction === 'sad'
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-neutral-800/60 border-neutral-700/60 hover:border-amber-500/50 text-neutral-300'
            }`}
          >
            <span>😢 দুঃখজনক</span>
            <span className="text-neutral-400">({reactions.sad})</span>
          </button>

          <button
            onClick={() => handleReaction('viral')}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-bold transition-all ${
              userReaction === 'viral'
                ? 'bg-[#D62828]/20 border-[#D62828] text-[#D62828]'
                : 'bg-neutral-800/60 border-neutral-700/60 hover:border-[#D62828]/50 text-neutral-300'
            }`}
          >
            <span>🔥 ভাইরাল</span>
            <span className="text-neutral-400">({reactions.viral})</span>
          </button>
        </div>
      </div>
    </>
  );
}
