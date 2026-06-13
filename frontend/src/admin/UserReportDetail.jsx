import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Trash2 } from 'lucide-react';
import { fetchUserReportById, deleteUserReport } from '../api';
import AddNews from './AddNews';

export default function UserReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isSuperAdmin = user.is_superuser;

  useEffect(() => {
    setLoading(true);
    fetchUserReportById(id)
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={() => navigate('/admin/dashboard/user-reports')}
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            ফিরে যান
          </button>
           {isSuperAdmin && (
             <button
               type="button"
               onClick={() => setPendingDelete(true)}
               className="inline-flex items-center gap-2 rounded-full border border-red-700 bg-red-900/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-500 hover:text-red-200"
             >
               <Trash2 className="w-4 h-4" strokeWidth={2} />
               প্রতিবেদন মুছুন
             </button>
           )}
        </div>
        <button
          onClick={() => setShowSplitScreen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/70 px-4 py-2 text-sm font-medium text-white transition hover:border-[#E50914] hover:text-[#E50914]"
        >
          {showSplitScreen ? 'এক কলাম মোড' : 'স্প্লিট স্ক্রিন'}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center py-10">{error}</p>
      ) : !report ? (
        <p className="text-neutral-500 text-center py-10">রিপোর্ট পাওয়া যায়নি।</p>
      ) : (
        <div className="space-y-6">
          {showSplitScreen ? (
            <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
              <div className="space-y-6">
                <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-8">
                  <h1 className="text-3xl font-bold text-white mb-4">{report.title}</h1>
                  <div className="flex flex-wrap gap-3 text-sm text-neutral-400 mb-6">
                    <span className="bg-neutral-800/70 px-3 py-2 rounded-full">তারিখ: {report.date}</span>
                    <span className="bg-neutral-800/70 px-3 py-2 rounded-full">লোকেশন: {report.location_text || 'অজানা'}</span>
                    <span className="bg-neutral-800/70 px-3 py-2 rounded-full">ক্যাটেগরি: {report.category_name || 'জনসাধারণ'}</span>
                  </div>
                  <div className="text-neutral-300 leading-relaxed whitespace-pre-line">
                    {report.description || 'কোনো বর্ণনা নেই।'}
                  </div>
                  {report.source_link && (
                    <div className="mt-6">
                      <a
                        href={report.source_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                      >
                        সোর্স লিংক দেখুন <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
                      </a>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-6">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">রিপোর্ট আইডি</h2>
                    <p className="text-white font-semibold">{report.id}</p>
                  </div>
                  <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-6">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">অবস্থা</h2>
                    <p className="text-white font-semibold">ব্যবহারকারী প্রতিবেদন</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-2">রিপোর্ট থেকে সংবাদ তৈরি করুন</h2>
                  <p className="text-neutral-400 text-sm">
                    ডানে সংবাদ ফরম খুলে রেখে প্রতিবেদন দেখে দ্রুত নতুন সংবাদ তৈরি করতে পারেন।
                  </p>
                </div>
                <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-6">
                  <AddNews />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-8">
                <h1 className="text-3xl font-bold text-white mb-4">{report.title}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-neutral-400 mb-6">
                  <span className="bg-neutral-800/70 px-3 py-2 rounded-full">তারিখ: {report.date}</span>
                  <span className="bg-neutral-800/70 px-3 py-2 rounded-full">লোকেশন: {report.location_text || 'অজানা'}</span>
                  <span className="bg-neutral-800/70 px-3 py-2 rounded-full">ক্যাটেগরি: {report.category_name || 'জনসাধারণ'}</span>
                </div>
                <div className="text-neutral-300 leading-relaxed whitespace-pre-line">
                  {report.description || 'কোনো বর্ণনা নেই।'}
                </div>
                {report.source_link && (
                  <div className="mt-6">
                    <a
                      href={report.source_link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      সোর্স লিংক দেখুন <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
                    </a>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-6">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">রিপোর্ট আইডি</h2>
                  <p className="text-white font-semibold">{report.id}</p>
                </div>
                <div className="bg-neutral-900/40 rounded-3xl border border-neutral-800 p-6">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">অবস্থা</h2>
                  <p className="text-white font-semibold">ব্যবহারকারী প্রতিবেদন</p>
                </div>
              </div>
            </div>
          )}

      {pendingDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] modal-backdrop">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl modal-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-lg">আপনি কি প্রতিবেদনটি মুছে ফেলতে চান?</h3>
            </div>
            <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
              আপনি কি অপরাধনামা ব্যবহারকারীর এই প্রতিবেদনটি ডিলিট করতে চাইছেন?
            </p>
            <p className="text-white text-sm font-medium bg-neutral-800/60 px-4 py-3 rounded-lg mb-6 line-clamp-3">
              "{report.title}"
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(false)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={async () => {
                  setDeleting(true);
                  try {
                    await deleteUserReport(id);
                    navigate('/admin/dashboard/user-reports');
                  } catch (err) {
                    setError(err.message || 'রিপোর্ট মুছতে সমস্যা হয়েছে');
                  } finally {
                    setDeleting(false);
                  }
                }}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {deleting ? 'মুছছে...' : 'হ্যাঁ, মুছুন'}
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
}
