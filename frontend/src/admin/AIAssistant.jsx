'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Sparkles, Copy, CheckCircle, AlertCircle, RefreshCw, Send } from 'lucide-react';

export default function AIAssistant() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isAutoDrafting, setIsAutoDrafting] = useState(false);
  const router = useRouter();

  const generateNews = async () => {
    if (!inputText.trim()) {
      setError('দয়া করে কিছু টেক্সট দিন।');
      return;
    }

    setLoading(true);
    setError(null);
    setResult('');
    setCopied(false);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'auto',
          messages: [
            {
              role: 'system',
              content: 'তুমি একজন "অপরাধনামা নিউজ এক্সপার্ট"। তোমার কাজ হলো সাধারণ নিউজ থেকে কপিরাইট মুক্ত, আকর্ষণীয় এবং নির্দিষ্ট ফরম্যাটে নিউজ লেখা। তোমাকে অপরাধের ধরন, স্থান, এবং নতুন একটি শিরোনাম লিখতে হবে। লেখায় অবশ্যই নিচের ট্যাগগুলোকে ইন্ডিকেটর হিসেবে ব্যবহার করবে (এগুলো একচুয়াল HTML হিসেবে নয়, বরং নিউজ এডিটরে ফরম্যাটিং ইন্ডিকেটর হিসেবে কাজ করবে):\n- সাধারণ লেখার জন্য কোনো ট্যাগ লাগবে না\n- বোল্ড করার জন্য: <b>এখানে লেখা</b>\n- ইটালিক করার জন্য: <i>এখানে লেখা</i>\n- সাব-হেডিং বা ছোট শিরোনামের জন্য: <h3>এখানে শিরোনাম</h3>\n- কোনো উক্তির জন্য: <blockquote>এখানে উক্তি</blockquote>\n- হাইলাইট করার জন্য: <span class="highlight">এখানে লেখা</span>\nলেখাটি এমন হতে হবে যেন অন্য নিউজ থেকে হুবহু কপি করা না বোঝায় (কপিরাইট মুক্ত)।'
            },
            {
              role: 'user',
              content: `নিচের নিউজটি বিস্তারিত পড়ে অপরাধনামা নিউজ এক্সপার্ট হিসেবে নির্দিষ্ট ফরম্যাটে লেখো:\n\n${inputText}`
            }
          ]
        })
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
    if (!inputText.trim()) {
      setError('দয়া করে কিছু টেক্সট দিন।');
      return;
    }

    setIsAutoDrafting(true);
    setError(null);
    setResult('');
    setCopied(false);

    try {
      const catNames = categories.map(c => c.name).join(', ');
      
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'auto',
          messages: [
            {
              role: 'system',
              content: `তুমি একজন "অপরাধনামা নিউজ এক্সপার্ট" ও বুদ্ধিমান সাংবাদিক। তোমার কাজ হলো সাধারণ নিউজ থেকে সম্পূর্ণ একটি নিউজ অবজেক্ট JSON ফরম্যাটে তৈরি করা। JSON এ নিচের ফিল্ডগুলো থাকতে হবে:\n- "title": একটি আকর্ষণীয় শিরোনাম\n- "description": কপিরাইট মুক্ত, আকর্ষণীয় নিউজ বিবরণ। লেখায় অবশ্যই HTML ট্যাগ (<b>, <i>, <h3>, <blockquote>, <span class="highlight">) ইন্ডিকেটর হিসেবে ব্যবহার করবে।\n- "category_name": নিচের লিস্ট থেকে সবচেয়ে উপযুক্ত ক্যাটেগরিটি হুবহু বেছে নাও: [${catNames}]। যদি কোনোটিই আংশিক বা পুরোপুরি না মেলে তবেই নতুন একটি ছোট ও প্রাসঙ্গিক ক্যাটেগরির নাম দাও।\n- "location_text": ঘটনার স্থান\n- "division": বিভাগ (ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর, ময়মনসিংহ, বা আন্তর্জাতিক)\n- "seo_keywords": কমা দিয়ে আলাদা করা কিছু গুরুত্বপূর্ণ কিওয়ার্ড (ইংরেজিতে)`
            },
            {
              role: 'user',
              content: `নিচের নিউজটি বিস্তারিত পড়ে নির্দিষ্ট JSON ফরম্যাটে নিউজ তৈরি করো:\n\n${inputText}`
            }
          ]
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API Timeout or Server Error (non-JSON response)');
      }

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      let generatedText = data?.choices?.[0]?.message?.content;
      if (!generatedText) throw new Error('Invalid API response structure');
      
      generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(generatedText);
      
      sessionStorage.setItem('aiGeneratedNews', JSON.stringify(parsedData));
      router.push('/admin/dashboard/add-news');
    } catch (err) {
      console.error(err);
      setError('দুঃখিত, অটো ড্রাফট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsAutoDrafting(false);
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
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#E50914]/15 flex items-center justify-center">
          <Bot className="w-6 h-6 text-[#E50914]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI নিউজ অ্যাসিস্ট্যান্ট</h1>
          <p className="text-neutral-400 text-sm mt-1">
            যেকোনো খবর দিন, AI সেটি অপরাধনামা স্টাইলে লিখে দেবে (ইন্ডিকেটর ট্যাগ সহ)।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col h-[600px]">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            মূল খবর ইনপুট
          </h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="এখানে খবরের বিস্তারিত পেস্ট করুন..."
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
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  ম্যাজিক ড্রাফট হচ্ছে...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  ওয়ান-ক্লিক অটো ড্রাফট
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col h-[600px]">
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
              <div 
                className="text-neutral-200 text-sm whitespace-pre-wrap font-mono select-all"
              >
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
