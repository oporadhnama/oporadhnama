'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ExternalLink, AlertTriangle } from 'lucide-react';
import { fetchPosts, deletePost } from '../api';
import { readStoredJSON } from '../storage';

export default function ManageNews() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const user = readStoredJSON('user', {});
  const isSuperAdmin = user.is_superuser;

  const loadPosts = () => {
    setLoading(true);
    fetchPosts()
      .then(data => {
        setPosts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deletePost(deleteTarget.id);
      setPosts(prev => prev.filter(p => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">সংবাদ ব্যবস্থাপনা</h1>
        <Link
          href="/admin/dashboard/add-news"
          className="bg-[#E50914] hover:bg-[#c40812] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all"
        >
          + নতুন সংবাদ
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-neutral-500 text-center py-10">কোনো সংবাদ নেই।</p>
      ) : (
        <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4">ID</th>
                <th className="text-left px-6 py-4">শিরোনাম</th>
                <th className="text-left px-6 py-4">ক্যাটেগরি</th>
                <th className="text-left px-6 py-4">বিভাগ</th>
                <th className="text-left px-6 py-4">তারিখ</th>
                <th className="text-left px-6 py-4">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                  <td className="px-6 py-4 text-neutral-500">{posts.length - index}</td>
                  <td className="px-6 py-4 text-white font-medium max-w-xs truncate">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded text-[10px] font-bold">
                      {post.category_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">{post.division}</td>
                  <td className="px-6 py-4 text-neutral-500">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/news/${post.id}`}
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="দেখুন"
                      >
                        <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
                      </Link>
                      {isSuperAdmin && (
                        <button
                          onClick={() => setDeleteTarget(post)}
                          className="text-neutral-500 hover:text-red-400 transition-colors"
                          title="মুছুন"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                        </button>
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] modal-backdrop">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl modal-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-lg">সংবাদ মুছে ফেলবেন?</h3>
            </div>

            <p className="text-neutral-400 text-sm mb-2 leading-relaxed">
              এই সংবাদটি স্থায়ীভাবে মুছে ফেলা হবে এবং পুনরুদ্ধার করা যাবে না:
            </p>
            <p className="text-white text-sm font-medium bg-neutral-800/60 px-4 py-3 rounded-lg mb-6 line-clamp-2">
              "{deleteTarget.title}"
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
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {deleting ? 'মুছে ফেলা হচ্ছে...' : 'হ্যাঁ, মুছে ফেলুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
