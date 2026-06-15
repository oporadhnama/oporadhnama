'use client';

import React, { useState, useEffect } from 'react';
import { submitPublicTip, fetchCategories } from '../api';

export default function SubmitInfo() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    source_link: '',
    location_text: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);

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
      setSuccess(true);
      setForm({ title: '', category: '', description: '', source_link: '', location_text: '' });
      setImageFile(null);
    } catch (err) {
      setError(err.message || 'তথ্য পাঠাতে সমস্যা হয়েছে।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 w-full max-w-2xl mx-auto pb-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        তথ্য <span className="text-[#E50914]">দিন</span>
      </h1>
      <p className="text-neutral-400 text-center mb-10 text-sm">
        আপনার চারপাশে ঘটে যাওয়া অপরাধমূলক কর্মকাণ্ডের তথ্য নির্দ্বিধায় আমাদের পাঠান।
      </p>

      {success && (
        <div className="bg-green-900/30 border border-green-700 text-green-400 rounded-xl p-4 mb-6 text-center text-sm">
          ✅ তথ্য সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!
        </div>
      )}
      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-400 rounded-xl p-4 mb-6 text-center text-sm">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800">
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">শিরোনাম *</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required maxLength={255} placeholder="ঘটনার শিরোনাম লিখুন" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600" />
        </div>
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">ক্যাটেগরি</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors cursor-pointer">
            <option value="">ক্যাটেগরি নির্বাচন করুন</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">বর্ণনা</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="ঘটনার বিস্তারিত বর্ণনা দিন" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600 resize-none" />
        </div>
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">সোর্স লিংক</label>
          <input type="url" name="source_link" value={form.source_link} onChange={handleChange} placeholder="https://example.com/news-link" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600" />
        </div>
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">স্থির চিত্র (ছবি)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0] || null)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#E50914] file:text-white hover:file:bg-[#c40812] file:cursor-pointer" />
        </div>
        <div>
          <label className="block text-neutral-300 text-sm font-medium mb-2">লোকেশন</label>
          <input type="text" name="location_text" value={form.location_text} onChange={handleChange} placeholder="ঘটনার স্থান (যেমন: মিরপুর, ঢাকা)" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600" />
        </div>
        <button type="submit" disabled={submitting} className="w-full bg-[#E50914] hover:bg-[#c40812] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
          {submitting ? 'পাঠানো হচ্ছে...' : 'তথ্য পাঠান'}
        </button>
      </form>
    </div>
  );
}
