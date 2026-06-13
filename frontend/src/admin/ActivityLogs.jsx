import React, { useState, useEffect } from 'react';
import {
  Activity,
  PlusCircle,
  Trash2,
  Pencil,
  UserPlus,
  UserMinus,
  LogIn,
  Clock,
} from 'lucide-react';
import { fetchActivityLogs, clearActivityLogs } from '../api';

const ACTION_ICONS = {
  post_created: { icon: PlusCircle, color: '#10B981', bg: 'bg-emerald-500/10' },
  post_deleted: { icon: Trash2, color: '#EF4444', bg: 'bg-red-500/10' },
  post_updated: { icon: Pencil, color: '#3B82F6', bg: 'bg-blue-500/10' },
  moderator_added: { icon: UserPlus, color: '#8B5CF6', bg: 'bg-violet-500/10' },
  moderator_removed: { icon: UserMinus, color: '#F59E0B', bg: 'bg-amber-500/10' },
  login: { icon: LogIn, color: '#6B7280', bg: 'bg-neutral-500/10' },
};

function formatTime(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);

  if (diff < 60) return 'এইমাত্র';
  if (diff < 3600) return `${Math.floor(diff / 60)} মিনিট আগে`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ঘন্টা আগে`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} দিন আগে`;

  return d.toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [pendingClear, setPendingClear] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchActivityLogs()
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredLogs = filter === 'all'
    ? logs
    : logs.filter(l => l.action === filter);

  const filterButtons = [
    { key: 'all', label: 'সকল' },
    { key: 'post_created', label: 'তৈরি' },
    { key: 'post_deleted', label: 'মুছে ফেলা' },
    { key: 'moderator_added', label: 'মডা. যোগ' },
    { key: 'moderator_removed', label: 'মডা. অপসারণ' },
    { key: 'login', label: 'লগইন' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#E50914]" strokeWidth={1.8} />
          <h1 className="text-2xl font-bold text-white">অ্যাক্টিভিটি লগ</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-neutral-500 text-xs">মোট {logs.length}টি এন্ট্রি</span>
          <button
            type="button"
            onClick={() => setPendingClear(true)}
            disabled={clearing || logs.length === 0}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-red-500 text-red-300 bg-red-900/20 hover:bg-red-900/40 transition-colors disabled:opacity-50"
          >
            {clearing ? 'মুছছে...' : 'সকল মুছুন'}
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterButtons.map(fb => (
          <button
            key={fb.key}
            onClick={() => setFilter(fb.key)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              filter === fb.key
                ? 'border-[#E50914]/40 bg-[#E50914]/10 text-[#E50914]'
                : 'border-neutral-800 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300'
            }`}
          >
            {fb.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
        </div>
      ) : filteredLogs.length === 0 ? (
        <p className="text-neutral-500 text-center py-10">কোনো অ্যাক্টিভিটি নেই।</p>
      ) : (
        <div className="space-y-1">
          {filteredLogs.map(log => {
            const actionMeta = ACTION_ICONS[log.action] || ACTION_ICONS.login;
            const Icon = actionMeta.icon;

            return (
              <div
                key={log.id}
                className="flex items-start gap-4 py-4 px-5 rounded-xl bg-neutral-900/30 border border-neutral-800/40 hover:bg-neutral-900/60 transition-all"
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-lg ${actionMeta.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" style={{ color: actionMeta.color }} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-semibold">{log.username}</span>
                    <span className="text-neutral-600 text-xs">•</span>
                    <span className="text-neutral-400 text-xs">{log.action_display}</span>
                  </div>

                  {log.target_label && (
                    <p className="text-neutral-300 text-sm truncate">
                      {log.target_label}
                    </p>
                  )}

                  {log.details && (
                    <p className="text-neutral-600 text-xs mt-0.5">{log.details}</p>
                  )}
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-1 text-neutral-600 text-[11px] flex-shrink-0 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(log.created_at)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pendingClear && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] modal-backdrop">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl modal-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-lg">আপনি কি সকল লগ মুছে ফেলতে চান?</h3>
            </div>

            <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
              আপনি কি নিশ্চিত যে আপনি সব অ্যাক্টিভিটি লগ মুছে ফেলবেন? এটি অপরিবর্তনীয়।
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPendingClear(false)}
                disabled={clearing}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={async () => {
                  setClearing(true);
                  try {
                    await clearActivityLogs();
                    setLogs([]);
                    setPendingClear(false);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setClearing(false);
                  }
                }}
                disabled={clearing}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {clearing ? 'মুছছে...' : 'হ্যাঁ, মুছুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
