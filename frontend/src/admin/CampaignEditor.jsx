'use client';

import React, { useState, useEffect } from 'react';
import { fetchAdminCampaigns, createAdminCampaign, updateAdminCampaign, createAdminCampaignDay, updateAdminCampaignDay, deleteAdminCampaignDay } from '../api';
import { Save, Plus, Edit, Trash2, Power } from 'lucide-react';

export default function CampaignEditor() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modals / forms state
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [editingDay, setEditingDay] = useState(null);

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      const campaigns = await fetchAdminCampaigns();
      if (campaigns.length > 0) {
        setCampaign(campaigns[0]); // For now, we only use the first campaign
      } else {
        // Auto-create a campaign if it doesn't exist
        const newCampaign = await createAdminCampaign({ title: 'অবিস্মরণীয় জুলাই', is_active: false });
        setCampaign(newCampaign);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaign = async () => {
    if (!campaign) return;
    try {
      const updated = await updateAdminCampaign(campaign.id, { is_active: !campaign.is_active });
      setCampaign(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveCampaign = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      start_date: formData.get('start_date') || null,
      end_date: formData.get('end_date') || null,
    };
    try {
      const updated = await updateAdminCampaign(campaign.id, data);
      setCampaign(updated);
      setIsEditingCampaign(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveDay = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('campaign', campaign.id);
    
    // Cleanup empty file fields
    if (formData.get('image')?.size === 0) {
        formData.delete('image');
    }

    try {
      if (editingDay.id) {
        await updateAdminCampaignDay(editingDay.id, formData);
      } else {
        await createAdminCampaignDay(formData);
      }
      setEditingDay(null);
      loadCampaign(); // reload to get new days
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteDay = async (id) => {
    if (!window.confirm("আপনি কি নিশ্চিত?")) return;
    try {
      await deleteAdminCampaignDay(id);
      loadCampaign();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!campaign) return null;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">ইভেন্ট প্যানেল</h1>
        <button
          onClick={toggleCampaign}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
            campaign.is_active 
              ? 'bg-red-600/20 text-red-500 border border-red-600/50 hover:bg-red-600/30' 
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
          }`}
        >
          <Power className="w-5 h-5" />
          {campaign.is_active ? 'ক্যাম্পেইন চলছে' : 'ক্যাম্পেইন বন্ধ'}
        </button>
      </div>

      {/* Campaign Details */}
      <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">ক্যাম্পেইন সেটিংস</h2>
          <button onClick={() => setIsEditingCampaign(!isEditingCampaign)} className="text-[#E50914] hover:text-red-400">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        
        {isEditingCampaign ? (
          <form onSubmit={handleSaveCampaign} className="space-y-4">
            <div>
              <label className="block text-neutral-400 text-sm mb-1">শিরোনাম</label>
              <input name="title" defaultValue={campaign.title} className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white" required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-neutral-400 text-sm mb-1">শুরুর তারিখ</label>
                <input name="start_date" type="date" defaultValue={campaign.start_date || ''} className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white" />
              </div>
              <div className="flex-1">
                <label className="block text-neutral-400 text-sm mb-1">শেষের তারিখ</label>
                <input name="end_date" type="date" defaultValue={campaign.end_date || ''} className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white" />
              </div>
            </div>
            <button type="submit" className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded">
              <Save className="w-4 h-4" /> সংরক্ষণ করুন
            </button>
          </form>
        ) : (
          <div className="text-neutral-300">
            <p><span className="text-neutral-500 w-32 inline-block">শিরোনাম:</span> <span className="font-bold">{campaign.title}</span></p>
            <p><span className="text-neutral-500 w-32 inline-block">শুরুর তারিখ:</span> {campaign.start_date || 'N/A'}</p>
            <p><span className="text-neutral-500 w-32 inline-block">শেষের তারিখ:</span> {campaign.end_date || 'N/A'}</p>
          </div>
        )}
      </div>

      {/* Days List */}
      <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">দিনসমূহ ({campaign.days?.length || 0}/36)</h2>
          <button 
            onClick={() => setEditingDay({})} 
            className="flex items-center gap-1 bg-[#E50914]/20 text-[#E50914] hover:bg-[#E50914]/30 px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> নতুন দিন যোগ করুন
          </button>
        </div>

        <div className="space-y-3">
          {campaign.days?.map((day) => (
            <div key={day.id} className="flex items-center justify-between bg-neutral-800/30 p-4 rounded-xl border border-neutral-800">
              <div>
                <h3 className="text-white font-bold">দিন {day.day_number}</h3>
                <p className="text-neutral-400 text-sm">{day.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setEditingDay(day)} className="text-neutral-400 hover:text-white">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteDay(day.id)} className="text-neutral-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {(!campaign.days || campaign.days.length === 0) && (
             <p className="text-neutral-500 text-center py-4">কোন দিন যোগ করা হয়নি।</p>
          )}
        </div>
      </div>

      {/* Day Edit Modal */}
      {editingDay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl text-white font-bold mb-4">{editingDay.id ? 'দিন সম্পাদনা করুন' : 'নতুন দিন যোগ করুন'}</h3>
            <form onSubmit={handleSaveDay} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-neutral-400 text-sm mb-1">দিনের নম্বর (যেমন 15)</label>
                  <input name="day_number" type="number" defaultValue={editingDay.day_number || ''} className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white" required />
                </div>
                <div className="flex-1">
                  <label className="block text-neutral-400 text-sm mb-1">তারিখ</label>
                  <input name="date" type="date" defaultValue={editingDay.date || ''} className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white" required />
                </div>
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-1">ইউটিউব/ফেসবুক ভিডিও লিঙ্ক</label>
                <input name="video_url" type="url" defaultValue={editingDay.video_url || ''} className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-1">বা ছবি আপলোড করুন</label>
                <input name="image" type="file" accept="image/*" className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white" />
                {editingDay.image && <p className="text-xs text-neutral-500 mt-1">বর্তমান ছবি সংরক্ষিত আছে।</p>}
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-1">বিবরণ</label>
                <textarea name="summary_text" defaultValue={editingDay.summary_text || ''} rows="3" className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white"></textarea>
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-1">বিস্তারিত লিংঙ্ক</label>
                <input name="read_more_link" type="url" defaultValue={editingDay.read_more_link || ''} className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-white" />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button type="button" onClick={() => setEditingDay(null)} className="px-4 py-2 rounded text-neutral-400 hover:text-white">বাতিল</button>
                <button type="submit" className="bg-[#E50914] text-white px-4 py-2 rounded font-bold hover:bg-red-600">সংরক্ষণ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
