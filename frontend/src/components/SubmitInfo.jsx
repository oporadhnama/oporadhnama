'use client';

import React, { useState, useEffect } from 'react';
import { submitPublicTip, fetchCategories } from '../api';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

export default function SubmitInfo() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    source_link: '',
    location_text: '',
    contact_email: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setCategories(list.filter((category) => category.name !== 'জনসাধারণের তথ্য'));
      })
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSubmissionReceipt(null);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('source_link', form.source_link);
    formData.append('location_text', form.location_text);
    if (form.category) {
      formData.append('category', form.category);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await submitPublicTip(formData);
      const trackingId = `OPR-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionReceipt(trackingId);
      setForm({ title: '', category: '', description: '', source_link: '', location_text: '', contact_email: '' });
      setImageFile(null);
    } catch (err) {
      setError(err.message || 'তথ্য পাঠাতে সমস্যা হয়েছে।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 md:px-6 w-full max-w-3xl mx-auto pb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-black mb-3">
          তথ্য <span className="text-[#D62828]">দিন</span>
        </h1>
        <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
          আপনার চারপাশের অনিয়ম, দুর্নীতি ও অপরাধমূলক কর্মকাণ্ডের তথ্য শতভাগ গোপনীয়তার সাথে আমাদের কাছে পাঠান।
        </p>
      </div>

      {/* Tor & Signal Security Trust Banner */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 mb-8 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#D62828]/10 text-[#D62828]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">১০০% শতভাগ গোপনীয়তা ও নিরাপত্তা নিশ্চিত</h3>
            <p className="text-neutral-400 text-xs">আমরা সোর্সের পরিচয় কখনো প্রকাশ করি না।</p>
          </div>
        </div>
        <p className="text-neutral-400 text-xs leading-relaxed border-t border-neutral-800/80 pt-3">
          💡 অত্যন্ত সংবেদনশীল তথ্যের ক্ষেত্রে আপনি <strong>Tor Browser</strong> ব্যবহার করতে পারেন। কোনো ব্যক্তিগত আইডি বা ফোন নম্বর ছাড়াই আপনি ফাইল জমা দিতে পারবেন।
        </p>
      </div>

      {/* Submission Receipt Confirmation Modal / Receipt */}
      {submissionReceipt && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 mb-8 text-center space-y-3 animate-fadeIn shadow-2xl">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">তথ্য সফলভাবে গৃহীত হয়েছে!</h3>
          <p className="text-neutral-300 text-sm">
            আপনার তথ্য নিরাপদ ডেক্সে পাঠানো হয়েছে। আপনার ট্র্যাকিং রসিদ নম্বর:
          </p>
          <div className="inline-block bg-neutral-900 border border-emerald-500/50 px-5 py-2 rounded-xl text-emerald-400 font-mono font-bold text-lg tracking-wider select-all">
            {submissionReceipt}
          </div>
          <p className="text-xs text-neutral-500">সংবাদ অনুসন্ধানে সমর্থনের জন্য ধন্যবাদ।</p>
        </div>
      )}

      {error && (
        <div className="bg-red-950/40 border border-red-500/40 text-red-400 rounded-2xl p-4 mb-8 flex items-center gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/40 p-6 md:p-8 rounded-2xl border border-neutral-800 shadow-2xl">
        <div>
          <label className="block text-neutral-200 text-sm font-bold mb-2">ঘটনার শিরোনাম *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={255}
            placeholder="সংক্ষিপ্ত ও স্পষ্ট শিরোনাম দিন"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D62828] transition-colors placeholder-neutral-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-200 text-sm font-bold mb-2">ক্যাটেগরি</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D62828] transition-colors cursor-pointer"
            >
              <option value="">ক্যাটেগরি নির্বাচন করুন</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-neutral-200 text-sm font-bold mb-2">ঘটনার স্থান / লোকেশন</label>
            <input
              type="text"
              name="location_text"
              value={form.location_text}
              onChange={handleChange}
              placeholder="যেমন: ধানমন্ডি, ঢাকা"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D62828] transition-colors placeholder-neutral-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-neutral-200 text-sm font-bold mb-2">ঘটনার বিবরণ</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="ঘটনার পূর্ণাঙ্গ বর্ণনা দিন..."
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D62828] transition-colors placeholder-neutral-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-neutral-200 text-sm font-bold mb-2">সোর্স বা প্রমাণ লিংক (ঐচ্ছিক)</label>
          <input
            type="url"
            name="source_link"
            value={form.source_link}
            onChange={handleChange}
            placeholder="https://example.com/evidence"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D62828] transition-colors placeholder-neutral-500"
          />
        </div>

        <div>
          <label className="block text-neutral-200 text-sm font-bold mb-2">প্রমাণস্বরূপ ছবি (File)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0] || null)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D62828] file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#D62828] file:text-white hover:file:bg-[#b01e1e] file:cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-neutral-200 text-sm font-bold mb-2">যোগাযোগের ইমেইল (ঐচ্ছিক - গোপন থাকবে)</label>
          <input
            type="email"
            name="contact_email"
            value={form.contact_email}
            onChange={handleChange}
            placeholder="প্রয়োজনে যোগাযোগের জন্য (অপশনাল)"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D62828] transition-colors placeholder-neutral-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#D62828] hover:bg-[#b01e1e] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D62828]/20"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'তথ্য জমা হচ্ছে...' : 'নিরাপদে তথ্য জমা দিন'}</span>
        </button>
      </form>
    </div>
  );
}
