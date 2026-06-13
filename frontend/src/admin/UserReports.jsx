import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ChevronRight, Trash2 } from 'lucide-react';
import { fetchUserReports, deleteUserReport } from '../api';

export default function UserReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isSuperAdmin = user.is_superuser;

  useEffect(() => {
    setLoading(true);
    fetchUserReports()
      .then(data => {
        setReports(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openReport = (reportId) => {
    navigate(`/admin/dashboard/user-reports/${reportId}`);
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setDeletingId(pendingDelete.id);
    try {
      await deleteUserReport(pendingDelete.id);
      setReports((prev) => prev.filter((item) => item.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      setError(err.message || 'রিপোর্ট মুছতে সমস্যা হয়েছে');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">ব্যবহারকারী প্রতিবেদন</h1>
          <p className="text-neutral-500 text-sm mt-2">
            দেখানো হচ্ছে 1 থেকে {reports.length} পর্যন্ত প্রতিবেদন ({reports.length} টি মোট)
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center py-10">{error}</p>
      ) : reports.length === 0 ? (
        <p className="text-neutral-500 text-center py-10">কোনো প্রতিবেদন পাওয়া যায়নি।</p>
      ) : (
        <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4">#</th>
                <th className="text-left px-6 py-4">শিরোনাম</th>
                <th className="text-left px-6 py-4">বর্ণনা</th>
                <th className="text-left px-6 py-4">লোকেশন</th>
                <th className="text-left px-6 py-4">তারিখ</th>
                <th className="text-left px-6 py-4">সোর্স</th>
                <th className="text-right px-6 py-4">একশন</th>
                <th className="text-right px-6 py-4">দেখুন</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={report.id}
                  onClick={() => openReport(report.id)}
                  className="cursor-pointer border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-neutral-500">{index + 1}</td>
                  <td className="px-6 py-4 text-white font-medium max-w-sm truncate">{report.title}</td>
                  <td className="px-6 py-4 text-neutral-400 max-w-xl truncate">{report.description || 'N/A'}</td>
                  <td className="px-6 py-4 text-neutral-400">{report.location_text || 'N/A'}</td>
                  <td className="px-6 py-4 text-neutral-500">{report.date}</td>
                  <td className="px-6 py-4 text-neutral-400">
                    {report.source_link ? (
                      <a
                        href={report.source_link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        লিংক <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </a>
                    ) : (
                      <span className="text-neutral-600">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                     {isSuperAdmin && (
                       <button
                         type="button"
                         onClick={(e) => {
                           e.stopPropagation();
                           setPendingDelete(report);
                         }}
                         className="inline-flex items-center gap-2 rounded-lg border border-red-700 bg-red-900/30 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-800 transition"
                       >
                         <Trash2 className="w-4 h-4" strokeWidth={2} />
                         {deletingId === report.id ? 'মুছছে...' : 'মুছুন'}
                       </button>
                     )}
                  </td>
                  <td className="px-6 py-4 text-right text-neutral-500">
                    <ChevronRight className="inline-block w-4 h-4" strokeWidth={2} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              "{pendingDelete.title}"
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingId === pendingDelete.id}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {deletingId === pendingDelete.id ? 'মুছছে...' : 'হ্যাঁ, মুছুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
