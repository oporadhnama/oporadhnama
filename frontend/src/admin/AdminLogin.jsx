'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../api';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginAdmin(username, password);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('access_token', data.access);
        // Feature 2: refresh_token is now stored in an HttpOnly cookie by the
        // backend — do NOT store it in localStorage (XSS protection).
        window.localStorage.setItem('user', JSON.stringify(data.user));
      }
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-wider">
            <span className="text-white">অপরাধ</span>
            <span className="text-[#E50914]">নামা</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-2">অ্যাডমিন প্যানেল</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-6 text-center">লগইন করুন</h2>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 rounded-lg p-3 mb-5 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-neutral-400 text-xs font-medium mb-2">ইউজারনেম</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-neutral-400 text-xs font-medium mb-2">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E50914] hover:bg-[#c40812] text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? 'প্রবেশ করা হচ্ছে...' : 'প্রবেশ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
