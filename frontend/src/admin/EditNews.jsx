'use client';

import React, { useState, useEffect, useRef } from 'react';
import { fetchCategories, updatePost, createCategory, fetchPostById } from '../api';
import API_BASE from '../api';

export default function EditNews({ postId }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    is_sensitive_image: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef(null);

  const insertFormatting = (startTag, endTag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.description;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const newText = `${before}${startTag}${selected}${endTag}${after}`;
    setForm({ ...form, description: newText });

    setTimeout(() => {
      textarea.focus();
      if (selected) {
        textarea.setSelectionRange(start, start + startTag.length + selected.length + endTag.length);
      } else {
        textarea.setSelectionRange(start + startTag.length, start + startTag.length);
      }
    }, 0);
  };

  const divisions = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা',
    'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
  ];

  useEffect(() => {
    Promise.all([fetchCategories(), fetchPostById(postId)])
      .then(([cats, postData]) => {
        setCategories(Array.isArray(cats) ? cats : []);
        if (postData) {
          setForm({
            title: postData.title || '',
            description: postData.description || '',
            category: postData.category || '',
            location_text: postData.location_text || '',
            date: postData.date || new Date().toISOString().split('T')[0],
            division: postData.division || '',
            source_link: postData.source_link || '',
            video_url: postData.video_url || '',
            show_video: postData.show_video !== false,
            is_sensitive_image: postData.is_sensitive_image || false,
          });
          if (postData.image) {
            setCurrentImage(postData.image.startsWith('http') ? postData.image : `${API_BASE}${postData.image}`);
          }
        }
      })
      .catch((err) => setError('তথ্য লোড করতে সমস্যা হয়েছে'))
      .finally(() => setLoading(false));
  }, [postId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    let finalCategoryId = form.category;

    if (form.category === 'new_custom') {
      const trimmedName = newCategoryName.trim();
      if (!trimmedName) {
        setError('নতুন ক্যাটেগরির নাম লিখুন।');
        setSaving(false);
        return;
      }
      try {
        const newCat = await createCategory(trimmedName);
        finalCategoryId = newCat.id;
        setCategories(prev => [...prev, newCat]);
      } catch (err) {
        setError(err.message);
        setSaving(false);
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
    formData.append('is_sensitive_image', form.is_sensitive_image);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await updatePost(postId, formData);
      setSuccess('সংবাদ সফলভাবে সম্পাদনা করা হয়েছে!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600";

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-8">সংবাদ সম্পাদনা করুন</h1>

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
          
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap gap-2 mb-2 p-2 bg-neutral-800 rounded-lg border border-neutral-700">
            <button type="button" onClick={() => insertFormatting('<b>', '</b>')} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm font-bold text-white transition-colors" title="Bold">B</button>
            <button type="button" onClick={() => insertFormatting('<i>', '</i>')} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm italic text-white transition-colors" title="Italic">I</button>
            <button type="button" onClick={() => insertFormatting('<u>', '</u>')} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm underline text-white transition-colors" title="Underline">U</button>
            <button type="button" onClick={() => insertFormatting('<h3>', '</h3>')} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm font-bold text-white transition-colors" title="Heading">H3</button>
            <button type="button" onClick={() => insertFormatting('<blockquote>', '</blockquote>')} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm text-white transition-colors" title="Quote">""</button>
            <button type="button" onClick={() => insertFormatting('<span class="highlight">', '</span>')} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm font-medium text-[#ff4d55] transition-colors" title="Highlight">HL</button>
          </div>

          <textarea 
            ref={textareaRef}
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            required 
            rows={8} 
            placeholder="সংবাদের বিবরণ লিখুন (উপরের টুলবার ব্যবহার করে টেক্সট ডিজাইন করতে পারেন)" 
            className={inputClass + ' resize-y'} 
          />
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
            <label className="block text-neutral-400 text-xs font-medium mb-2">বিভাগ (ঐচ্ছিক)</label>
            <select name="division" value={form.division} onChange={handleChange} className={inputClass + ' cursor-pointer'}>
              <option value="">বিভাগ নির্বাচন করুন (ঐচ্ছিক)</option>
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

        {/* Image Upload Drag & Drop */}
        <div>
          <label className="block text-neutral-400 text-xs font-medium mb-2">স্থির চিত্র (ছবি আপলোড)</label>
          {currentImage && !imageFile && (
             <div className="mb-4">
               <span className="text-neutral-500 text-xs mb-2 block">বর্তমান ছবি:</span>
               <img src={currentImage} alt="Current" className="w-48 h-auto rounded-lg border border-neutral-700" />
             </div>
          )}
          <div 
            className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-[#E50914] bg-[#E50914]/10' : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-500 hover:bg-neutral-800'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setImageFile(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => document.getElementById('imageUploadInput').click()}
          >
            {imageFile ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-green-400 text-sm">✅ নতুন ছবি নির্বাচন করা হয়েছে</span>
                <span className="text-neutral-400 text-xs">{imageFile.name}</span>
                <button type="button" onClick={(e) => { e.stopPropagation(); setImageFile(null); }} className="text-[#E50914] text-xs hover:underline mt-2">নতুন ছবি বাতিল করুন</button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center mb-2">
                  <span className="text-2xl text-neutral-400">+</span>
                </div>
                <span className="text-neutral-300 text-sm font-medium">নতুন ছবি টেনে আনুন (Drag & Drop)</span>
                <span className="text-neutral-500 text-xs">অথবা ক্লিক করে ফাইল সিলেক্ট করুন</span>
              </div>
            )}
            <input
              id="imageUploadInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0] || null)}
            />
          </div>
          {/* Sensitive Image Toggle */}
          <div className="flex items-center justify-between mt-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
            <div>
              <span className="text-white text-sm font-bold block mb-1">স্পর্শকাতর ছবি (Sensitive Image)</span>
              <span className="text-neutral-500 text-xs">এটি চালু করলে ছবিতে ব্লার ইফেক্ট ও সতর্কবার্তা যোগ হবে</span>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, is_sensitive_image: !form.is_sensitive_image })}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                form.is_sensitive_image ? 'bg-[#E50914]' : 'bg-neutral-700'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${
                  form.is_sensitive_image ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
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

        <button type="submit" disabled={saving} className="w-full bg-[#E50914] hover:bg-[#c40812] text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 text-sm">
          {saving ? 'সংরক্ষণ করা হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
        </button>
      </form>
    </div>
  );
}
