'use client';

import React from 'react';
import { User, Shield, Clock, Globe } from 'lucide-react';
import API_BASE from '../api';
import { hasStoredToken, readStoredJSON } from '../storage';

export default function AdminSettings() {
  const user = readStoredJSON('user', {});

  const infoItems = [
    { label: 'ইউজারনেম', value: user.username || '—', icon: User },
    { label: 'ইমেইল', value: user.email || 'সেট করা হয়নি', icon: Globe },
    { label: 'ভূমিকা', value: user.role || 'User', icon: Shield },
    { label: 'যোগদানের তারিখ', value: user.date_joined ? new Date(user.date_joined).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : '—', icon: Clock },
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-8">সেটিংস</h1>

      {/* User Info Card */}
      <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-8 mb-6">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-neutral-800/60">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E50914]/30 to-[#E50914]/10 flex items-center justify-center text-[#E50914] text-xl font-bold ring-2 ring-[#E50914]/20">
            {(user.username || 'A')[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-white text-lg font-bold">{user.username}</h2>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              user.is_superuser
                ? 'text-yellow-400 bg-yellow-400/10'
                : 'text-blue-400 bg-blue-400/10'
            }`}>
              {user.role}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4 py-3 px-4 rounded-xl bg-neutral-800/30 border border-neutral-800/40">
                <Icon className="w-4 h-4 text-neutral-500 flex-shrink-0" strokeWidth={1.8} />
                <div className="flex-grow min-w-0">
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-white text-sm font-medium truncate">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* API Info */}
      <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6">
        <h3 className="text-white font-semibold text-sm mb-4">সিস্টেম তথ্য</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-2 border-b border-neutral-800/40">
            <span className="text-neutral-500">API Base URL</span>
            <span className="text-neutral-300 font-mono">{API_BASE}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-800/40">
            <span className="text-neutral-500">Frontend Version</span>
            <span className="text-neutral-300 font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-neutral-500">JWT Status</span>
            <span className={`font-medium ${hasStoredToken() ? 'text-green-400' : 'text-red-400'}`}>
              {hasStoredToken() ? '● সক্রিয়' : '● নিষ্ক্রিয়'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
