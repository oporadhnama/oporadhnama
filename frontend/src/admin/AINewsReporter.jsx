'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Radio,
  Sparkles,
  Play,
  Square,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  Search,
  Sliders,
  Plus,
  Trash2,
  Flame,
  ShieldAlert,
  Clock,
  Image as ImageIcon,
  Wand2,
  Filter,
} from 'lucide-react';
import { fetchCategories } from '../api';

const PRESET_INSTRUCTIONS = [
  'অনুসন্ধানী ও বিশ্লেষণধর্মী ভঙ্গিতে বিস্তারিত লিখুন',
  'অপরাধের মূল কারণ, নেপথ্যের সিন্ডিকেট ও পুলিশি পদক্ষেপ হাইলাইট করুন',
  'রাজনৈতিক প্রেক্ষাপট ও জনমনে এর প্রভাব বিশ্লেষণ করে লিখুন',
  'সংক্ষিপ্ত, তীক্ষ্ণ এবং ব্রেকিং নিউজ ফরম্যাটে লিখুন',
];

export default function AINewsReporter() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [availableFeeds, setAvailableFeeds] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [aiFiltering, setAiFiltering] = useState(false);
  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const [loopIntervalSec, setLoopIntervalSec] = useState(180); // 3 minutes default
  const [countdown, setCountdown] = useState(0);
  const [lastScannedAt, setLastScannedAt] = useState(null);
  const [error, setError] = useState(null);

  // Filters & Custom Inputs
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('ALL');
  const [onlySerious, setOnlySerious] = useState(true);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [customInstruction, setCustomInstruction] = useState('');
  const [customFeedUrl, setCustomFeedUrl] = useState('');
  const [customFeeds, setCustomFeeds] = useState([]);
  const [showCustomFeedBox, setShowCustomFeedBox] = useState(false);

  // Active card processing state
  const [processingId, setProcessingId] = useState(null);
  const [processingStep, setProcessingStep] = useState('');

  const loopTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error);

    try {
      const saved = localStorage.getItem('oporadhnama_custom_rss');
      if (saved) setCustomFeeds(JSON.parse(saved));
    } catch (_) {}
  }, []);

  const addCustomFeed = () => {
    const trimmed = customFeedUrl.trim();
    if (!trimmed || !trimmed.startsWith('http')) return;
    try {
      const newFeed = {
        id: `custom-${Date.now()}`,
        name: new URL(trimmed).hostname.replace('www.', ''),
        category: 'কাস্টম ফিড',
        url: trimmed,
      };
      const updated = [...customFeeds, newFeed];
      setCustomFeeds(updated);
      setCustomFeedUrl('');
      localStorage.setItem('oporadhnama_custom_rss', JSON.stringify(updated));
    } catch (_) {}
  };

  const removeCustomFeed = (id) => {
    const updated = customFeeds.filter((f) => f.id !== id);
    setCustomFeeds(updated);
    try {
      localStorage.setItem('oporadhnama_custom_rss', JSON.stringify(updated));
    } catch (_) {}
  };

  const scanFeeds = useCallback(
    async (queryOverride, seriousOverride) => {
      setScanning(true);
      setError(null);
      try {
        const res = await fetch('/api/news-radar/feeds', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customQuery: queryOverride !== undefined ? queryOverride : customSearchQuery,
            customFeeds,
            onlySerious: seriousOverride !== undefined ? seriousOverride : onlySerious,
          }),
        });
        if (!res.ok) throw new Error('RSS ফিড স্ক্যান ব্যর্থ হয়েছে');
        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
        if (Array.isArray(data.feeds)) setAvailableFeeds(data.feeds);
        setLastScannedAt(new Date());
      } catch (err) {
        console.error(err);
        setError('সংবাদ রাডার স্ক্যান করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } finally {
        setScanning(false);
      }
    },
    [customSearchQuery, customFeeds, onlySerious]
  );

  // Auto-scan once on mount
  useEffect(() => {
    scanFeeds('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manage the continuous radar loop
  useEffect(() => {
    if (!isLoopRunning) {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      setCountdown(0);
      return;
    }

    setCountdown(loopIntervalSec);

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return loopIntervalSec;
        }
        return prev - 1;
      });
    }, 1000);

    loopTimerRef.current = setInterval(() => {
      scanFeeds();
    }, loopIntervalSec * 1000);

    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [isLoopRunning, loopIntervalSec, scanFeeds]);

  // AI Deep Ranking / Seriousness Curation
  const runAiSeriousnessFilter = async () => {
    if (items.length === 0) return;
    setAiFiltering(true);
    setError(null);
    try {
      const topCandidates = items.slice(0, 35).map((it, idx) => ({
        idx,
        title: it.title,
        source: it.source,
      }));

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'auto',
          messages: [
            {
              role: 'system',
              content:
                'তুমি "অপরাধনামা" (Oporadhnama) এর প্রধান সম্পাদক। নিচের সংবাদের তালিকা থেকে শুধুমাত্র সবচেয়ে গুরুত্বপূর্ণ, চাঞ্চল্যকর অপরাধ, বড় রাজনৈতিক ঘটনা, দুর্নীতি, বিচার, মধ্যপ্রাচ্য/আন্তর্জাতিক সংকট এবং জাতীয় নিরাপত্তার সাথে জড়িত সংবাদগুলোর idx নম্বর এবং কেন এটি গুরুত্বপূর্ণ তার ১ লাইনের বাংলা নোট JSON অ্যারে হিসেবে দাও। ফরম্যাট: [{"idx": 0, "reason": "গুরুত্বপূর্ণ রাজনৈতিক/অপরাধ বিশ্লেষণ"}]। শুধুমাত্র JSON রিটার্ন করবে।',
            },
            {
              role: 'user',
              content: JSON.stringify(topCandidates),
            },
          ],
        }),
      });

      if (!res.ok) throw new Error('AI বিশ্লেষণ ব্যর্থ হয়েছে');
      const data = await res.json();
      let raw = data?.choices?.[0]?.message?.content || '';
      raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const picks = JSON.parse(raw);

      if (Array.isArray(picks) && picks.length > 0) {
        const pickMap = new Map(picks.map((p) => [Number(p.idx), p.reason]));
        const updated = items.map((item, idx) => {
          if (pickMap.has(idx)) {
            return {
              ...item,
              aiRecommended: true,
              aiReason: pickMap.get(idx),
              seriousnessScore: item.seriousnessScore + 20,
              seriousnessLevel: 'CRITICAL',
            };
          }
          return item;
        });
        updated.sort((a, b) => b.seriousnessScore - a.seriousnessScore);
        setItems(updated);
      }
    } catch (err) {
      console.error(err);
      setError('AI বাছাইকরণে সমস্যা হয়েছে, তবে সাধারণ সিরিয়াসনেস র‍্যাংকিং সক্রিয় আছে।');
    } finally {
      setAiFiltering(false);
    }
  };

  // Click card -> Scrape full article text & image -> Rewrite via AI -> Open AddNews
  const handleSelectAndDraft = async (item) => {
    setProcessingId(item.id);
    setError(null);
    setProcessingStep('লিংক থেকে মূল খবর ও ছবি সংগ্রহ করা হচ্ছে...');

    try {
      // 1. Scrape full article text and image from publisher link
      const scrapeRes = await fetch('/api/news-radar/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: item.link,
          fallbackTitle: item.title,
          fallbackSnippet: item.fullFeedContent || item.snippet,
          fallbackImage: item.image,
        }),
      });

      const scraped = scrapeRes.ok ? await scrapeRes.json() : {};
      const bestBody =
        scraped.content && scraped.content.length > (item.fullFeedContent || '').length
          ? scraped.content
          : item.fullFeedContent || scraped.content || item.snippet || '';

      const fullArticleText = `${scraped.title || item.title}\n\n${bestBody}`.trim();

      setProcessingStep('AI অপরাধনামা স্টাইলে বাংলায় সংবাদটি নতুনভাবে লিখছে...');

      const catNames = categories.map((c) => c.name).join(', ');
      const trimmedInstruction = customInstruction.trim();
      const instructionBlock = trimmedInstruction
        ? `\n\n[বিশেষ এককালীন নির্দেশনা (অবশ্যই অনুসরণ করবে): ${trimmedInstruction}]`
        : '';

      // 2. Rewrite with AI into structured JSON (auto-translating English sources like Al Jazeera / Middle East Eye / Daily Star / BD24Live into Bengali)
      const aiRes = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'auto',
          messages: [
            {
              role: 'system',
              content: `তুমি একজন "অপরাধনামা নিউজ এক্সপার্ট" ও অনুসন্ধানী সাংবাদিক। তোমার কাজ হলো প্রদত্ত সোর্স নিউজ থেকে কপিরাইট মুক্ত, গভীর, নিরপেক্ষ ও আকর্ষণীয় একটি নতুন বাংলা নিউজ অবজেক্ট JSON ফরম্যাটে তৈরি করা। (যদি সোর্স নিউজটি ইংরেজিতে থাকে—যেমন Al Jazeera, Middle East Eye, The Daily Star, BD24Live—তবে তা নির্ভুল ও প্রাঞ্জল বাংলায় অনুবাদ ও রূপান্তর করে লিখবে)। JSON এ নিচের ফিল্ডগুলো থাকতে হবে:
- "title": একটি শক্তিশালী, আকর্ষণীয় ও ইউনিক বাংলা শিরোনাম
- "description": কপিরাইট মুক্ত, বিস্তারিত ও প্রাঞ্জল বাংলা নিউজ বিবরণ। লেখায় অবশ্যই প্রয়োজন অনুযায়ী HTML ট্যাগ (<b>, <i>, <h3>, <blockquote>, <span class="highlight">) ইন্ডিকেটর হিসেবে ব্যবহার করবে। কোনো অবস্থাতেই <p> ট্যাগ ব্যবহার করবে না, প্যারাগ্রাফের জন্য শুধু নতুন লাইন (\\n\\n) ব্যবহার করবে।
- "category_name": নিচের লিস্ট থেকে সবচেয়ে উপযুক্ত ক্যাটেগরিটি হুবহু বেছে নাও: [${catNames}]। যদি কোনোটিই না মেলে তবে নতুন একটি প্রাসঙ্গিক বাংলা ক্যাটেগরির নাম দাও।
- "location_text": ঘটনার স্থান (বাংলায়, যেমন: মিরপুর, ঢাকা বা গাজা, ফিলিস্তিন)
- "division": বিভাগ (ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর, ময়মনসিংহ, বা আন্তর্জাতিক)
- "seo_keywords": কমা দিয়ে আলাদা করা ৩-৫টি গুরুত্বপূর্ণ ইংরেজি কিওয়ার্ড (যেমন: murder, arrest, dhaka, police)${instructionBlock}`,
            },
            {
              role: 'user',
              content: `নিচের সোর্স নিউজটি বিস্তারিত পড়ে অপরাধনামার নিজস্ব অনুসন্ধানী ধাঁচে নির্দিষ্ট JSON ফরম্যাটে নতুন বাংলা নিউজ তৈরি করো:\n\nসোর্স: ${item.source}\nমূল সংবাদ:\n${fullArticleText}`,
            },
          ],
        }),
      });

      if (!aiRes.ok) {
        throw new Error('AI সার্ভার থেকে সাড়া পাওয়া যায়নি। আবার চেষ্টা করুন।');
      }

      const aiData = await aiRes.json();
      let generatedText = aiData?.choices?.[0]?.message?.content || '';
      if (!generatedText) throw new Error('AI থেকে সঠিক উত্তর পাওয়া যায়নি।');

      generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(generatedText);

      // Attach scraped source link and image so AddNews pre-fills both!
      parsedData.source_link = scraped.sourceUrl || item.link;
      if (scraped.imageDataUrl) {
        parsedData.image_data_url = scraped.imageDataUrl;
        parsedData.image_mime_type = scraped.imageMimeType || 'image/jpeg';
      } else if (scraped.imageUrl || item.image) {
        parsedData.external_image_url = scraped.imageUrl || item.image;
      }

      sessionStorage.setItem('aiGeneratedNews', JSON.stringify(parsedData));
      router.push('/admin/dashboard/add-news');
    } catch (err) {
      console.error(err);
      setError(`ড্রাফট তৈরিতে সমস্যা হয়েছে: ${err.message}`);
    } finally {
      setProcessingId(null);
      setProcessingStep('');
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedSourceFilter !== 'ALL' && item.feedId !== selectedSourceFilter) {
      return false;
    }
    if (selectedCategoryFilter === 'ALL') return true;
    if (selectedCategoryFilter === 'AI_PICKS') return Boolean(item.aiRecommended);
    return item.categoryTag === selectedCategoryFilter;
  });

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    try {
      const diffMins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
      if (isNaN(diffMins) || diffMins < 0) return 'সদ্য প্রাপ্ত';
      if (diffMins < 1) return 'এইমাত্র';
      if (diffMins < 60) return `${diffMins.toLocaleString('bn-BD')} মিনিট আগে`;
      const hours = Math.floor(diffMins / 60);
      if (hours < 24) return `${hours.toLocaleString('bn-BD')} ঘণ্টা আগে`;
      return `${Math.floor(hours / 24).toLocaleString('bn-BD')} দিন আগে`;
    } catch {
      return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ── Header & Radar Loop Controls ───────────────────────────────────── */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-red-950/20 border border-neutral-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center flex-shrink-0 relative">
              <Radio className={`w-6 h-6 text-[#E50914] ${isLoopRunning ? 'animate-pulse' : ''}`} />
              {isLoopRunning && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-500/20 animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-extrabold text-white">AI অনুসন্ধানী নিউজ রিপোর্টার</h1>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30">
                  10 Integrated Feeds
                </span>
              </div>
              <p className="text-neutral-400 text-sm mt-1">
                প্রথম আলো, সমকাল, জাগোনিউজ, বাংলাদেশ প্রতিদিন, সান নিউজ, আমার বাংলা, BD24Live, Daily Star, Al Jazeera ও Middle East Eye থেকে গুরুত্বপূর্ণ অপরাধ ও রাজনীতির খবর খুঁজে বের করে।
              </p>
            </div>
          </div>

          {/* Loop Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={loopIntervalSec}
              onChange={(e) => setLoopIntervalSec(Number(e.target.value))}
              className="bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#E50914]"
              title="লুপ ইন্টারভ্যাল"
            >
              <option value={120}>প্রতি ২ মিনিট লুপ</option>
              <option value={180}>প্রতি ৩ মিনিট লুপ</option>
              <option value={300}>প্রতি ৫ মিনিট লুপ</option>
              <option value={600}>প্রতি ১০ মিনিট লুপ</option>
            </select>

            <button
              onClick={() => setIsLoopRunning((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isLoopRunning
                  ? 'bg-green-600/20 border-green-500/40 text-green-400 hover:bg-red-600/20 hover:border-red-500/40 hover:text-red-400'
                  : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-white'
              }`}
            >
              {isLoopRunning ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  লুপ চালু আছে ({countdown}s) — থামান
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-[#E50914]" />
                  অটো-লুপ চালু করুন
                </>
              )}
            </button>

            <button
              onClick={() => scanFeeds()}
              disabled={scanning}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#E50914] hover:bg-[#c40812] text-white transition-all shadow-lg shadow-[#E50914]/20 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'স্ক্যান হচ্ছে...' : 'এখনই স্ক্যান করুন'}
            </button>

            <button
              onClick={runAiSeriousnessFilter}
              disabled={aiFiltering || scanning || items.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 transition-all disabled:opacity-50"
              title="AI দিয়ে সবচেয়ে সিরিয়াস ও গুরুত্বপূর্ণ খবরগুলো উপরে নিয়ে আসুন"
            >
              <Sparkles className={`w-3.5 h-3.5 ${aiFiltering ? 'animate-spin' : ''}`} />
              {aiFiltering ? 'AI বাছাই করছে...' : 'AI সেরা খবর বাছাই'}
            </button>
          </div>
        </div>

        {/* ── One-Time Custom Instruction Bar ──────────────────────────────── */}
        <div className="mt-5 pt-5 border-t border-neutral-800/80 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-neutral-300 mb-2">
              <Wand2 className="w-3.5 h-3.5 text-[#E50914]" />
              এককালীন কাস্টম নির্দেশনা (ঐচ্ছিক — না দিলেও স্বয়ংক্রিয়ভাবে অপরাধনামা স্টাইলে লিখবে)
            </label>
            <input
              type="text"
              value={customInstruction}
              onChange={(e) => setCustomInstruction(e.target.value)}
              placeholder="যেমন: 'রাজনৈতিক সিন্ডিকেটের দিকটি ফোকাস করুন' অথবা 'পুলিশের বক্তব্য বোল্ড করে হাইলাইট করুন'..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESET_INSTRUCTIONS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setCustomInstruction((prev) => (prev === preset ? '' : preset))
                  }
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    customInstruction === preset
                      ? 'bg-[#E50914]/20 border-[#E50914] text-white'
                      : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Search & Custom RSS Toggle */}
          <div className="flex flex-col gap-2 min-w-[290px]">
            <label className="text-xs font-bold text-neutral-300">
              ফিডের ভেতর কিওয়ার্ড ফিল্টার
            </label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customSearchQuery}
                  onChange={(e) => setCustomSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && scanFeeds()}
                  placeholder="যেমন: হত্যা, দুদক, গাজা, পুলিশ..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
                />
              </div>
              <button
                type="button"
                onClick={() => scanFeeds()}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold"
              >
                ফিল্টার
              </button>
              <button
                type="button"
                onClick={() => setShowCustomFeedBox((p) => !p)}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl"
                title="ফিড তালিকা ও কাস্টম RSS"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Optional Custom RSS Manager */}
        {showCustomFeedBox && (
          <div className="mt-4 pt-4 border-t border-neutral-800/80 bg-neutral-950/60 rounded-xl p-4 space-y-3">
            <div>
              <h3 className="text-xs font-bold text-neutral-300 mb-2">
                সংযুক্ত ১০টি মূল সংবাদ সোর্স:
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {availableFeeds.map((f) => (
                  <span
                    key={f.id}
                    className="text-[11px] bg-neutral-900 border border-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full"
                  >
                    ✓ {f.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-300 mb-2">
                অতিরিক্ত কাস্টম RSS লিংক যোগ করুন:
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={customFeedUrl}
                  onChange={(e) => setCustomFeedUrl(e.target.value)}
                  placeholder="https://example.com/feed/rss.xml"
                  className="flex-grow bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
                <button
                  type="button"
                  onClick={addCustomFeed}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#E50914] text-white rounded-lg text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5" /> যোগ করুন
                </button>
              </div>
              {customFeeds.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {customFeeds.map((cf) => (
                    <span
                      key={cf.id}
                      className="inline-flex items-center gap-2 text-xs bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300"
                    >
                      {cf.name}
                      <button
                        onClick={() => removeCustomFeed(cf.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Filter Tabs, Source Selector & Seriousness Toggle ──────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: 'ALL', label: `সব খবর (${filteredItems.length})` },
            { key: 'অপরাধ ও অনুসন্ধান', label: '🚨 অপরাধ ও অনুসন্ধান' },
            { key: 'রাজনীতি ও বিচার', label: '⚖️ রাজনীতি ও বিচার' },
            { key: 'আন্তর্জাতিক', label: '🌍 আন্তর্জাতিক ও মধ্যপ্রাচ্য' },
            ...(items.some((i) => i.aiRecommended)
              ? [{ key: 'AI_PICKS', label: '✨ AI বাছাইকৃত সেরা খবর' }]
              : []),
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategoryFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategoryFilter === tab.key
                  ? 'bg-[#E50914] border-[#E50914] text-white shadow-md shadow-[#E50914]/20'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Source Selector */}
          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="bg-transparent text-xs text-neutral-200 focus:outline-none"
            >
              <option value="ALL" className="bg-neutral-900">সব সংবাদমাধ্যম (১০টি ফিড)</option>
              {availableFeeds.map((f) => (
                <option key={f.id} value={f.id} className="bg-neutral-900">
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Serious Only vs All Feed News */}
          <button
            type="button"
            onClick={() => {
              const next = !onlySerious;
              setOnlySerious(next);
              scanFeeds(customSearchQuery, next);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlySerious
                ? 'bg-red-950/40 border-red-800/50 text-red-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}
          >
            {onlySerious ? '🎯 মোড: শুধু সিরিয়াস খবর' : '📰 মোড: ফিডের সব খবর'}
          </button>

          {lastScannedAt && (
            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {lastScannedAt.toLocaleTimeString('bn-BD')}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Active Processing Overlay Modal ────────────────────────────────── */}
      {processingId && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-[#E50914]/40 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center mx-auto">
              <RefreshCw className="w-7 h-7 text-[#E50914] animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-white">AI রিপোর্টার কাজ করছে...</h3>
            <p className="text-sm text-neutral-300 animate-pulse">{processingStep}</p>
            <p className="text-xs text-neutral-500">
              মূল সংবাদের টেক্সট, ছবি ও তথ্য বিশ্লেষণ করে অপরাধনামার নিজস্ব ফরম্যাটে সাজানো হচ্ছে।
            </p>
          </div>
        </div>
      )}

      {/* ── News Radar Cards Grid ──────────────────────────────────────────── */}
      {scanning && items.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 h-64 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-4 bg-neutral-800 rounded w-1/3" />
                <div className="h-6 bg-neutral-800 rounded w-full" />
                <div className="h-6 bg-neutral-800 rounded w-4/5" />
                <div className="h-14 bg-neutral-800/60 rounded w-full" />
              </div>
              <div className="h-10 bg-neutral-800 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-12 text-center">
          <Radio className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-400 text-sm">
            এই ফিল্টারে কোনো সংবাদ পাওয়া যায়নি। অন্য ট্যাব নির্বাচন করুন বা &ldquo;এখনই স্ক্যান করুন&rdquo; বাটনে ক্লিক করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isCritical = item.seriousnessLevel === 'CRITICAL';
            return (
              <div
                key={item.id}
                className={`group bg-neutral-900/80 hover:bg-neutral-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                  item.aiRecommended
                    ? 'border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.08)]'
                    : isCritical
                    ? 'border-[#E50914]/40 shadow-[0_0_20px_rgba(229,9,20,0.06)]'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  {/* Card Thumbnail if present in RSS */}
                  {item.image && (
                    <div className="relative h-40 w-full bg-neutral-950 overflow-hidden border-b border-neutral-800/80">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                        <ImageIcon className="w-3 h-3" /> ছবিসহ
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.aiRecommended && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <Sparkles className="w-3 h-3" /> AI সেরা পছন্দ
                          </span>
                        )}
                        {isCritical ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E50914]/20 text-[#ff4d55] border border-[#E50914]/40">
                            <Flame className="w-3 h-3" /> অতীব গুরুত্বপূর্ণ
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                            <ShieldAlert className="w-3 h-3 text-amber-400" /> {item.categoryTag}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-neutral-500 font-medium">
                        {formatTimeAgo(item.pubDate)}
                      </span>
                    </div>

                    {/* Source */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span className="font-semibold text-neutral-300 truncate max-w-[200px]">
                        📰 {item.source}
                      </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-500 hover:text-white text-[11px]"
                        title="মূল সংবাদটি নতুন ট্যাবে দেখুন"
                      >
                        মূল লিংক <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white leading-snug mb-2.5 group-hover:text-[#ff4d55] transition-colors">
                      {item.title}
                    </h3>

                    {/* AI recommendation reason if available */}
                    {item.aiReason && (
                      <p className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5 mb-2.5">
                        💡 {item.aiReason}
                      </p>
                    )}

                    {/* Snippet */}
                    {item.snippet && (
                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-3">
                        {item.snippet}
                      </p>
                    )}

                    {/* Matched Seriousness Keywords */}
                    {item.matchedKeywords && item.matchedKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.matchedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-400"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectAndDraft(item)}
                    disabled={Boolean(processingId)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#E50914] hover:bg-[#c40812] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#E50914]/15 disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    টেক্সট ও ছবিসহ রি-রাইট করে ড্রাফটে নিন
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
