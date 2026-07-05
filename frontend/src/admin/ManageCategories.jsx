'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, AlertTriangle, PlusCircle } from 'lucide-react';
import { fetchCategories, deleteCategory, createCategory } from '../api';
import { readStoredJSON } from '../storage';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [creating, setCreating] = useState(false);
  
  const user = readStoredJSON('user', {});
  const isSuperAdmin = user.is_superuser;

  const loadCategories = () => {
    setLoading(true);
    fetchCategories()
      .then(data => {
        setCategories(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCategory(deleteTarget.id);
      setCategories(prev => prev.filter(c => c.id !== deleteTarget.id));
      setDeleteTarget(null);
      alert('ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে এবং এর সংবাদগুলো "অন্যান্য" ক্যাটাগরিতে শিফট হয়েছে।');
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setCreating(true);
    try {
      const newCat = await createCategory(newCatName.trim());
      setCategories(prev => [...prev, newCat].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCatName('');
    } catch (err) {
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">ক্যাটাগরি ব্যবস্থাপনা</h1>
          <p className="text-neutral-400 text-sm">ক্যাটাগরি মুছে ফেলা হলে তার ভেতরের সংবাদগুলো "অন্যান্য" ক্যাটাগরিতে শিফট হবে।</p>
        </div>
        
        {isSuperAdmin && (
          <form onSubmit={handleCreate} className="flex items-center gap-2">
            <input 
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="নতুন ক্যাটাগরির নাম"
              className="bg-neutral-900 border border-neutral-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#E50914] w-48"
              disabled={creating}
            />
            <button
              type="submit"
              disabled={creating || !newCatName.trim()}
              className="bg-[#E50914] hover:bg-[#c40812] disabled:opacity-50 text-white p-2.5 rounded-lg transition-all flex items-center justify-center"
              title="নতুন ক্যাটাগরি তৈরি করুন"
            >
              {creating ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <PlusCircle className="w-5 h-5" />
              )}
            </button>
          </form>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
        </div>
      ) : categories.length === 0 ? (
        <p className="text-neutral-500 text-center py-10">কোনো ক্যাটাগরি নেই।</p>
      ) : (
        <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4 w-20">ID</th>
                <th className="text-left px-6 py-4">নাম</th>
                <th className="text-left px-6 py-4 w-32">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                  <td className="px-6 py-4 text-neutral-500">{category.id}</td>
                  <td className="px-6 py-4">
                    <span className="text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded text-xs font-bold inline-block">
                      {category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {isSuperAdmin && category.name !== 'অন্যান্য' && (
                        <button
                          onClick={() => setDeleteTarget(category)}
                          className="text-neutral-500 hover:text-red-400 transition-colors bg-neutral-800/50 hover:bg-red-500/10 p-2 rounded-lg"
                          title="মুছুন"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                        </button>
                      )}
                      {category.name === 'অন্যান্য' && (
                        <span className="text-neutral-600 text-[10px] uppercase font-bold tracking-wider">
                          Locked
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-lg">ক্যাটাগরি মুছে ফেলবেন?</h3>
            </div>

            <p className="text-neutral-400 text-sm mb-2 leading-relaxed">
              আপনি নিশ্চিত? এই ক্যাটাগরির সমস্ত সংবাদ স্বয়ংক্রিয়ভাবে <strong className="text-white">"অন্যান্য"</strong> ক্যাটাগরিতে স্থানান্তরিত হবে:
            </p>
            <p className="text-white text-sm font-medium bg-neutral-800/60 px-4 py-3 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-[#E50914] font-bold">{deleteTarget.name}</span>
            </p>

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
                className="flex-1 bg-[#E50914] hover:bg-[#c40812] text-white font-medium py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>মুছে ফেলা হচ্ছে...</span>
                  </>
                ) : (
                  'হ্যাঁ, মুছে ফেলুন'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
