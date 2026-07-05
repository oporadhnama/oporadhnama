import React, { useState } from 'react';
import { Bot, Sparkles, Copy, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function AIAssistant() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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
      const response = await fetch('https://unipy.onrender.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer freellmapi-0c47628416d31611c280f7b5db7d9d21315ff1008dc9f363'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'তুমি একজন "অপরাধনামা নিউজ এক্সপার্ট"। তোমার কাজ হলো সাধারণ নিউজ থেকে কপিরাইট মুক্ত, আকর্ষণীয় এবং নির্দিষ্ট ফরম্যাটে নিউজ লেখা। তোমাকে অপরাধের ধরন, স্থান, এবং নতুন একটি শিরোনাম লিখতে হবে। লেখায় অবশ্যই এই HTML ট্যাগগুলো ব্যবহার করবে: "এখানে নরমাল <b>এখানে লেখা বোল্ড</b> <i>এখানে লেখা ইটালিক</i> <h3>এখানে বিস্তারিত এর মাঝে ছোট শিরোনাম</h3> <blockquote>এখানে উক্তি</blockquote> <span class=\\"highlight\\">এখানে হাইলাইট</span>"। লেখাটি এমন হতে হবে যেন অন্য নিউজ থেকে কপি করা না বোঝায় (কপিরাইট মুক্ত)।'
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
      const generatedText = data.choices[0].message.content;
      setResult(generatedText);
    } catch (err) {
      console.error(err);
      setError('দুঃখিত, নিউজ জেনারেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
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
            যেকোনো খবর দিন, AI সেটি অপরাধনামা স্টাইলে লিখে দেবে।
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
          <button
            onClick={generateNews}
            disabled={loading}
            className="mt-4 w-full bg-[#E50914] hover:bg-[#E50914]/90 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                জেনারেট হচ্ছে...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                নিউজ তৈরি করুন
              </>
            )}
          </button>
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
                className="text-neutral-200 text-sm whitespace-pre-wrap font-mono"
              >
                {result}
              </div>
            )}
          </div>
          
          {result && (
            <div className="h-1/3 overflow-y-auto text-xs text-neutral-500 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <p className="font-medium text-neutral-400 mb-2 sticky top-0 bg-neutral-950 pb-1 border-b border-neutral-800">প্রিভিউ:</p>
              <div 
                className="prose prose-invert max-w-none preview-content"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .preview-content h3 { font-size: 1.1rem; font-weight: 600; color: white; margin-top: 1rem; margin-bottom: 0.5rem; }
        .preview-content b { font-weight: 700; color: white; }
        .preview-content i { font-style: italic; color: #a3a3a3; }
        .preview-content blockquote { border-left: 3px solid #E50914; padding-left: 1rem; margin: 1rem 0; color: #d4d4d4; font-style: italic; }
        .preview-content .highlight { background-color: rgba(229, 9, 20, 0.2); color: #ff8f95; padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-weight: 500; }
      `}} />
    </div>
  );
}
