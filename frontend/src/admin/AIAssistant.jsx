'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Sparkles,
  Copy,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Send,
  Link2,
  Wand2,
} from 'lucide-react';
import { fetchCategories } from '../api';

const QUICK_INSTRUCTIONS = [
  'অনুসন্ধানী ও বিশ্লেষণধর্মী ভঙ্গিতে বিস্তারিত লিখুন',
  'অপরাধের আইনি দিক ও পুলিশি পদক্ষেপ হাইলাইট করুন',
  'রাজনৈতিক প্রেক্ষাপট ও নেপথ্যের ঘটনা ফোকাস করুন',
  'সংক্ষিপ্ত ও ব্রেকিং নিউজ ফরম্যাটে লিখুন',
];

export default function AIAssistant() {
  const [inputText, setInputText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [customInstruction, setCustomInstruction] = useState('');
  const [scrapedImagePayload, setScrapedImagePayload] = useState(null);
  const [fetchingUrl, setFetchingUrl] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isAutoDrafting, setIsAutoDrafting] = useState(false);
  const [draftStep, setDraftStep] = useState('');
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(console.error);

    // Check if prefilled from Citizen Report (UserReportDetail)
    try {
      const prefillStr = sessionStorage.getItem('aiAssistantPrefill');
      if (prefillStr) {
        const prefill = JSON.parse(prefillStr);
        if (prefill.text) setInputText(prefill.text);
        if (prefill.source_link) setSourceUrl(prefill.source_link);
        sessionStorage.removeItem('aiAssistantPrefill');
      }
    } catch (_) {}
  }, []);

  const handleFetchFromUrl = async () => {
    const trimmedUrl = sourceUrl.trim();
    if (!trimmedUrl) {
      setError('দয়া করে একটি সংবাদের লিংক দিন।');
      return;
    }
    setFetchingUrl(true);
    setError(null);
    try {
      const res = await fetch('/api/news-radar/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmedUrl }),
      });
      if (!res.ok) throw new Error('লিংক থেকে তথ্য আনা যায়নি');
      const data = await res.json();
      const combined = [data.title, data.content].filter(Boolean).join('\n\n');
      if (combined) {
        setInputText(combined);
      }
      if (data.imageDataUrl || data.imageUrl) {
        setScrapedImagePayload({
          image_data_url: data.imageDataUrl || null,
          image_mime_type: data.imageMimeType || 'image/jpeg',
          external_image_url: data.imageUrl || null,
        });
      }
    } catch (err) {
      console.error(err);
      setError('এই লিংক থেকে সরাসরি টেক্সট আনা যায়নি। অনুগ্রহ করে টেক্সট কপি করে পেস্ট করুন।');
    } finally {
      setFetchingUrl(false);
    }
  };

  const generateNews = async () => {
    if (!inputText.trim()) {
      setError('দয়া করে কিছু টেক্সট দিন বা লিংক থেকে ফেচ করুন।');
      return;
    }

    setLoading(true);
    setError(null);
    setResult('');
    setCopied(false);

    const instructionNote = customInstruction.trim()
      ? `\n\n[বিশেষ এককালীন নির্দেশনা (অবশ্যই অনুসরণ করবে): ${customInstruction.trim()}]`
      : '';

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'auto',
          messages: [
            {
              role: 'system',
              content: `তুমি একজন "অপরাধনামা নিউজ এক্সপার্ট"। তোমার কাজ হলো সাধারণ নিউজ থেকে কপিরাইট মুক্ত, আকর্ষণীয় এবং নির্দিষ্ট ফরম্যাটে নিউজ লেখা। তোমাকে অপরাধের ধরন, স্থান, এবং নতুন একটি শিরোনাম লিখতে হবে। লেখায় অবশ্যই নিচের ট্যাগগুলোকে ইন্ডিকেটর হিসেবে ব্যবহার করবে (এগুলো একচুয়াল HTML হিসেবে নয়, বরং নিউজ এডিটরে ফরম্যাটিং ইন্ডিকেটর হিসেবে কাজ করবে):
- সাধারণ লেখার জন্য কোনো ট্যাগ লাগবে না
- বোল্ড করার জন্য: <b>এখানে লেখা</b>
- ইটালিক করার জন্য: <i>এখানে লেখা</i>
- সাব-হেডিং বা ছোট শিরোনামের জন্য: <h3>এখানে শিরোনাম</h3>
- কোনো উক্তির জন্য: <blockquote>এখানে উক্তি</blockquote>
- হাইলাইট করার জন্য: <span class="highlight">এখানে লেখা</span>
লেখাটি এমন হতে হবে যেন অন্য নিউজ থেকে হুবহু কপি করা না বোঝায় (কপিরাইট মুক্ত)।${instructionNote}`,
            },
            {
              role: 'user',
              content: `নিচের নিউজটি বিস্তারিত পড়ে অপরাধনামা নিউজ এক্সপার্ট হিসেবে নির্দিষ্ট ফরম্যাটে লেখো:\n\n${inputText}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const generatedText = data?.choices?.[0]?.message?.content;
      if (!generatedText) throw new Error('Invalid API response structure');
      setResult(generatedText);
    } catch (err) {
      console.error(err);
      setError('দুঃখিত, নিউজ জেনারেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const generateAutoDraft = async () => {
    if (!inputText.trim() && !sourceUrl.trim()) {
      setError('দয়া করে কিছু টেক্সট বা সংবাদের লিংক দিন।');
      return;
    }

    setIsAutoDrafting(true);
    setError(null);
    setResult('');
    setCopied(false);

    try {
      let textToProcess = inputText.trim();
      let imageInfo = scrapedImagePayload;

      // If only URL was pasted and text wasn't fetched yet, scrape it first automatically!
      if (!textToProcess && sourceUrl.trim()) {
        setDraftStep('লিংক থেকে মূল সংবাদ ও ছবি সংগ্রহ করা হচ্ছে...');
        const scrapeRes = await fetch('/api/news-radar/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: sourceUrl.trim() }),
        });
        if (scrapeRes.ok) {
          const scraped = await scrapeRes.json();
          textToProcess = [scraped.title, scraped.content].filter(Boolean).join('\n\n');
          if (scraped.imageDataUrl || scraped.imageUrl) {
            imageInfo = {
              image_data_url: scraped.imageDataUrl || null,
              image_mime_type: scraped.imageMimeType || 'image/jpeg',
              external_image_url: scraped.imageUrl || null,
            };
          }
        }
      }

      if (!textToProcess) {
        throw new Error('সংবাদের টেক্সট পাওয়া যায়নি।');
      }

      setDraftStep('AI প্রসেস করছে...');

      const catNames = categories.map((c) => c.name).join(', ');
      const instructionNote = customInstruction.trim()
        ? `\n\n[বিশেষ এককালীন নির্দেশনা (অবশ্যই অনুসরণ করবে): ${customInstruction.trim()}]`
        : '';

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'auto',
          messages: [
            {
              role: 'system',
              content: `তুমি একজন "অপরাধনামা নিউজ এক্সপার্ট" ও বুদ্ধিমান সাংবাদিক। তোমার কাজ হলো সাধারণ নিউজ থেকে সম্পূর্ণ একটি নিউজ অবজেক্ট JSON ফরম্যাটে তৈরি করা। JSON এ নিচের ফিল্ডগুলো থাকতে হবে:
- "title": একটি আকর্ষণীয় শিরোনাম
- "description": কপিরাইট মুক্ত, আকর্ষণীয় নিউজ বিবরণ। লেখায় অবশ্যই HTML ট্যাগ (<b>, <i>, <h3>, <blockquote>, <span class="highlight">) ইন্ডিকেটর হিসেবে ব্যবহার করবে। কোনো অবস্থাতেই <p> ট্যাগ ব্যবহার করবে না, প্যারাগ্রাফের জন্য শুধু নতুন লাইন (\\n\\n) ব্যবহার করবে।
- "category_name": নিচের লিস্ট থেকে সবচেয়ে উপযুক্ত ক্যাটেগরিটি হুবহু বেছে নাও: [${catNames}]। যদি কোনোটিই আংশিক বা পুরোপুরি না মেলে তবেই নতুন একটি ছোট ও প্রাসঙ্গিক ক্যাটেগরির নাম দাও।
- "location_text": ঘটনার স্থান
- "division": বিভাগ (ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর, ময়মনসিংহ, বা আন্তর্জাতিক)
- "seo_keywords": কমা দিয়ে আলাদা করা কিছু গুরুত্বপূর্ণ কিওয়ার্ড (ইংরেজিতে)${instructionNote}`,
            },
            {
              role: 'user',
              content: `নিচের নিউজটি বিস্তারিত পড়ে নির্দিষ্ট JSON ফরম্যাটে নিউজ তৈরি করো:\n\n${textToProcess}`,
            },
          ],
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API Timeout or Server Error (non-JSON response)');
      }

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error('TIMEOUT');
        }
        throw new Error('API request failed');
      }

      setDraftStep('ডেটা পার্স করছে...');

      const data = await response.json();
      let generatedText = data?.choices?.[0]?.message?.content;
      if (!generatedText) throw new Error('Invalid API response structure');

      generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(generatedText);

      if (sourceUrl.trim()) {
        parsedData.source_link = sourceUrl.trim();
      }
      if (imageInfo) {
        Object.assign(parsedData, imageInfo);
      }

      sessionStorage.setItem('aiGeneratedNews', JSON.stringify(parsedData));
      router.push('/admin/dashboard/add-news');
    } catch (err) {
      console.error(err);
      if (err.message === 'TIMEOUT') {
        setError('AI সার্ভার সময়মতো সাড়া দেয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } else {
        setError('অটো ড্রাফট তৈরি করতে সমস্যা হয়েছে: ' + err.message);
      }
    } finally {
      setIsAutoDrafting(false);
      setDraftStep('');
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#E50914]/15 flex items-center justify-center">
            <Bot className="w-6 h-6 text-[#E50914]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI নিউজ অ্যাসিস্ট্যান্ট</h1>
            <p className="text-neutral-400 text-sm mt-1">
              যেকোনো খবরের লিংক বা টেক্সট দিন, AI সেটি অপরাধনামা স্টাইলে লিখে দেবে।
            </p>
          </div>
        </div>
      </div>

      {/* ── Optional URL Scraper + One-Time Custom Instruction Bar ────────── */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
        {/* URL Fetch Row */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-300 mb-2">
            <Link2 className="w-3.5 h-3.5 text-blue-400" />
            সরাসরি সংবাদের লিংক থেকে টেক্সট ও ছবি আনুন (ঐচ্ছিক)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://www.prothomalo.com/... (যেকোনো সংবাদের লিংক পেস্ট করুন)"
              className="flex-grow bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
            <button
              type="button"
              onClick={handleFetchFromUrl}
              disabled={fetchingUrl || !sourceUrl.trim()}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold border border-neutral-700 transition-all disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
            >
              {fetchingUrl ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  আনছে...
                </>
              ) : (
                'টেক্সট ও ছবি আনুন'
              )}
            </button>
          </div>
          {scrapedImagePayload && (
            <p className="text-xs text-emerald-400 mt-1.5">
              ✓ লিংক থেকে মূল সংবাদের ছবি সংযুক্ত হয়েছে (ড্রাফটে স্বয়ংক্রিয়ভাবে যুক্ত হবে)।
            </p>
          )}
        </div>

        {/* One-time Custom Instruction Row */}
        <div className="pt-3 border-t border-neutral-800/80">
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-300 mb-2">
            <Wand2 className="w-3.5 h-3.5 text-[#E50914]" />
            এককালীন কাস্টম নির্দেশনা / ফোকাস (ঐচ্ছিক — না দিলেও স্বয়ংক্রিয়ভাবে কাজ করবে)
          </label>
          <input
            type="text"
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
            placeholder="যেমন: 'দুর্নীতির এঙ্গেল থেকে লিখুন' বা 'ভুক্তভোগীর বক্তব্য হাইলাইট করুন'..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {QUICK_INSTRUCTIONS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  setCustomInstruction((prev) => (prev === preset ? '' : preset))
                }
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                  customInstruction === preset
                    ? 'bg-[#E50914]/20 border-[#E50914] text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col h-[560px]">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            মূল খবর ইনপুট
          </h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="এখানে খবরের বিস্তারিত পেস্ট করুন (অথবা উপরে লিংক দিয়ে ফেচ করুন)..."
            className="flex-grow w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]/50 focus:ring-1 focus:ring-[#E50914]/50 resize-none transition-all"
          />
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          <div className="flex gap-3 mt-4">
            <button
              onClick={generateNews}
              disabled={loading || isAutoDrafting}
              className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  লিখছে...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  সাধারণ নিউজ
                </>
              )}
            </button>
            <button
              onClick={generateAutoDraft}
              disabled={loading || isAutoDrafting}
              className="flex-[2] bg-[#E50914] hover:bg-[#E50914]/90 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#E50914]/20"
            >
              {isAutoDrafting ? (
                <div className="flex flex-col items-center gap-0.5">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    ম্যাজিক ড্রাফট হচ্ছে...
                  </span>
                  {draftStep && (
                    <span className="text-xs opacity-70">{draftStep}</span>
                  )}
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  ওয়ান-ক্লিক অটো ড্রাফট
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col h-[560px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              AI জেনারেটেড নিউজ
            </h2>
            <button
              onClick={copyToClipboard}
              disabled={!result}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  কপি হয়েছে
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  কপি করুন
                </>
              )}
            </button>
          </div>

          <div className="flex-grow w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 overflow-y-auto relative mb-4">
            {!result && !loading && (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-500 flex-col gap-2">
                <Bot className="w-10 h-10 opacity-20" />
                <p className="text-sm">এখানে AI এর লেখা নিউজ দেখা যাবে</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 flex-col gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-[#E50914]" />
                <p className="text-sm font-medium animate-pulse">AI লিখছে...</p>
              </div>
            )}
            {result && (
              <div className="text-neutral-200 text-sm whitespace-pre-wrap font-mono select-all">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
