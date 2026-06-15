'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, UserPlus, Shield, Clock } from 'lucide-react';
import { fetchModerators, registerModerator, deleteModerator } from '../api';

export default function Moderators() {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadModerators = () => {
    setLoading(true);
    fetchModerators()
      .then(data => {
        setModerators(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadModerators();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await registerModerator(form);
      setSuccess('মডারেটর সফলভাবে যোগ করা হয়েছে!');
      setForm({ username: '', email: '', password: '' });
      setShowForm(false);
      loadModerators();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteModerator(deleteTarget.id);
      setModerators(prev => prev.filter(m => m.id !== deleteTarget.id));
      setDeleteTarget(null);
      setSuccess('মডারেটর সফলভাবে অপসারণ করা হয়েছে।');
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const inputClass = "w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">মডারেটর ব্যবস্থাপনা</h1>
        <button
          onClick={() => { setShowForm(!showForm); setError(''); setSuccess(''); }}
          className="flex items-center gap-2 bg-[#E50914] hover:bg-[#c40812] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all"
        >
          {showForm ? (
            <><span>✕</span> বন্ধ করুন</>
          ) : (
            <><UserPlus className="w-4 h-4" strokeWidth={1.8} /> নতুন মডারেটর</>
          )}
        </button>
      </div>

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

      {/* Add Moderator Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-800 mb-8 space-y-4">
          <h3 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#E50914]" strokeWidth={1.8} />
            নতুন মডারেটর তৈরি করুন
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-neutral-400 text-xs font-medium mb-2">ইউজারনেম *</label>
              <input type="text" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required placeholder="username" className={inputClass} />
            </div>
            <div>
              <label className="block text-neutral-400 text-xs font-medium mb-2">ইমেইল</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-neutral-400 text-xs font-medium mb-2">পাসওয়ার্ড *</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} placeholder="••••••" className={inputClass} />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="bg-[#E50914] hover:bg-[#c40812] text-white font-bold py-2.5 px-6 rounded-lg transition-all disabled:opacity-50 text-sm">
            {submitting ? 'তৈরি হচ্ছে...' : 'মডারেটর তৈরি করুন'}
          </button>
        </form>
      )}

      {/* Moderators List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
        </div>
      ) : moderators.length === 0 ? (
        <p className="text-neutral-500 text-center py-10">কোনো মডারেটর নেই।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moderators.map(mod => (
            <div key={mod.id} className="bg-neutral-900/60 rounded-xl p-5 border border-neutral-800 hover:border-neutral-700 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    mod.is_superuser
                      ? 'bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-400/30'
                      : 'bg-[#E50914]/20 text-[#E50914]'
                  }`}>
                    {mod.username[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{mod.username}</p>
                    <p className="text-neutral-500 text-xs">{mod.email || 'ইমেইল নেই'}</p>
                  </div>
                </div>

                {/* Delete button — only show for non-superusers */}
                {!mod.is_superuser && (
                  <button
                    onClick={() => setDeleteTarget(mod)}
                    className="opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-red-400 transition-all p-1.5 rounded-lg hover:bg-red-500/5"
                    title="অপসারণ করুন"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${
                  mod.is_superuser
                    ? 'text-yellow-400 bg-yellow-400/10'
                    : 'text-blue-400 bg-blue-400/10'
                }`}>
                  {mod.is_superuser && <Shield className="w-3 h-3" />}
                  {mod.role}
                </span>
                <span className="text-neutral-600 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(mod.date_joined).toLocaleDateString('bn-BD')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] modal-backdrop">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl modal-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-lg">মডারেটর অপসারণ?</h3>
            </div>

            <p className="text-neutral-400 text-sm mb-2 leading-relaxed">
              এই মডারেটরকে স্থায়ীভাবে মুছে ফেলা হবে এবং তিনি আর লগইন করতে পারবেন না:
            </p>
            <div className="flex items-center gap-3 bg-neutral-800/60 px-4 py-3 rounded-lg mb-6">
              <div className="w-8 h-8 rounded-full bg-[#E50914]/20 flex items-center justify-center text-[#E50914] font-bold text-sm">
                {deleteTarget.username[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{deleteTarget.username}</p>
                <p className="text-neutral-500 text-[10px]">{deleteTarget.email || 'ইমেইল নেই'}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {deleting ? 'অপসারণ হচ্ছে...' : 'হ্যাঁ, অপসারণ করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
