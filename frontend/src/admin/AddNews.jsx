'use client';

import React, { useState, useEffect } from 'react';
import { fetchCategories, createPost, createCategory } from '../api';

export default function AddNews() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location_text: '',
    date: new Date().toISOString().split('T')[0],
    division: '',
    source_link: '',
    video_url: '',
    show_video: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const divisions = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা',
    'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
  ];

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    let finalCategoryId = form.category;

    if (form.category === 'new_custom') {
      const trimmedName = newCategoryName.trim();
      if (!trimmedName) {
        setError('নতুন ক্যাটেগরির নাম লিখুন।');
        setLoading(false);
        return;
      }
      try {
        const newCat = await createCategory(trimmedName);
        finalCategoryId = newCat.id;
        setCategories(prev => [...prev, newCat]);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    if (finalCategoryId && finalCategoryId !== 'new_custom') {
      formData.append('category', finalCategoryId);
    }
    formData.append('location_text', form.location_text);
    if (form.date) {
      formData.append('date', form.date);
    }
    if (form.division) {
      formData.append('division', form.division);
    }
    formData.append('source_link', form.source_link);
    formData.append('video_url', form.video_url);
    formData.append('show_video', form.show_video);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await createPost(formData);
      setSuccess('সংবাদ সফলভাবে যোগ করা হয়েছে!');
      setForm({
        title: '', description: '', category: '', location_text: '',
        date: new Date().toISOString().split('T')[0], division: '',
        source_link: '', video_url: '', show_video: true,
      });
      setImageFile(null);
      setNewCategoryName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600";

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-8">নতুন সংবাদ যোগ করুন</h1>

      {success && (
        <div className="bg-green-900/30 border border-green-700 text-green-400 rounded-xl p-4 mb-6 text-sm">
          ✅ {success}
        </div>
      )}
      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-400 rounded-xl p-4 mb-6 text-sm">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800">
        {/* Title */}
        <div>
          <label className="block text-neutral-400 text-xs font-medium mb-2">শিরোনাম *</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required maxLength={255} placeholder="সংবাদের শিরোনাম" className={inputClass} />
        </div>

        {/* Description */}
        <div>
          <label className="block text-neutral-400 text-xs font-medium mb-2">বিস্তারিত বিবরণ *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="সংবাদের বিবরণ লিখুন" className={inputClass + ' resize-none'} />
        </div>

        {/* Category + Division row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-neutral-400 text-xs font-medium mb-2">ক্যাটেগরি</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass + ' cursor-pointer'}>
              <option value="">ক্যাটেগরি নির্বাচন করুন</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
              <option value="new_custom">+ নতুন ক্যাটেগরি যোগ করুন</option>
            </select>
            {form.category === 'new_custom' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  placeholder="নতুন ক্যাটেগরির নাম লিখুন"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-neutral-400 text-xs font-medium mb-2">বিভাগ *</label>
            <select name="division" value={form.division} onChange={handleChange} required className={inputClass + ' cursor-pointer'}>
              <option value="">বিভাগ নির্বাচন করুন</option>
              {divisions.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date + Location row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-neutral-400 text-xs font-medium mb-2">তারিখ</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass + ' cursor-pointer'} />
          </div>
          <div>
            <label className="block text-neutral-400 text-xs font-medium mb-2">স্থান</label>
            <input type="text" name="location_text" value={form.location_text} onChange={handleChange} placeholder="ঘটনার স্থান" className={inputClass} />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-neutral-400 text-xs font-medium mb-2">স্থির চিত্র (ছবি আপলোড)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0] || null)}
            className={inputClass + ' file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#E50914] file:text-white hover:file:bg-[#c40812] file:cursor-pointer'}
          />
        </div>

        {/* Video URL + Toggle */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-neutral-400 text-xs font-medium">ইউটিউব বা ফেসবুক ভিডিও লিংক</label>
            {/* On/Off Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-medium">
                {form.show_video ? 'দৃশ্যমান' : 'লুকানো'}
              </span>
              <button
                type="button"
                onClick={() => setForm({ ...form, show_video: !form.show_video })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                  form.show_video ? 'bg-[#E50914]' : 'bg-neutral-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    form.show_video ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          <input type="url" name="video_url" value={form.video_url} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
          <p className="text-neutral-600 text-[10px] mt-1">
            টগল চালু থাকলে ভিডিওটি বিস্তারিত পেজে শিরোনামের নিচে দেখানো হবে। বন্ধ থাকলে ভিডিও লুকানো থাকবে।
          </p>
        </div>

        {/* Source Link */}
        <div>
          <label className="block text-neutral-400 text-xs font-medium mb-2">সোর্স লিংক</label>
          <input type="url" name="source_link" value={form.source_link} onChange={handleChange} placeholder="https://..." className={inputClass} />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#E50914] hover:bg-[#c40812] text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 text-sm">
          {loading ? 'আপলোড হচ্ছে...' : 'সংবাদ প্রকাশ করুন'}
        </button>
      </form>
    </div>
  );
}
