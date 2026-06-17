'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  PlusCircle, Trash2, Edit3, Save, X, BarChart2,
  TrendingUp, TrendingDown, ChevronDown, ChevronUp,
  AlertTriangle, CheckCircle, Info,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// ── Default crime categories ──────────────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { key: 'dacoity',                       label: 'ডাকাতি',                color: '#E50914' },
  { key: 'robbery',                       label: 'রাহাজানি',              color: '#ff6b6b' },
  { key: 'murder',                        label: 'খুন',                    color: '#ff4500' },
  { key: 'speedy_trial',                  label: 'দ্রুত বিচার',           color: '#ff8c00' },
  { key: 'rape',                          label: 'ধর্ষণ',                 color: '#ffa500' },
  { key: 'other_violence_women_children', label: 'নারী ও শিশু নির্যাতন', color: '#ffd700' },
  { key: 'kidnapping',                    label: 'অপহরণ',                 color: '#9370db' },
  { key: 'burglary',                      label: 'সিঁদেল চুরি',           color: '#7b68ee' },
  { key: 'vehicle_theft',                 label: 'গাড়ি চুরি',             color: '#4169e1' },
  { key: 'other_theft',                   label: 'অন্যান্য চুরি',         color: '#00bcd4' },
  { key: 'road_accident',                 label: 'সড়ক দুর্ঘটনা',         color: '#26c6da' },
  { key: 'arms_act',                      label: 'অস্ত্র আইন',            color: '#66bb6a' },
  { key: 'explosives',                    label: 'বিস্ফোরক',              color: '#ffee58' },
  { key: 'smuggling',                     label: 'চোরাচালান',             color: '#ef9a9a' },
  { key: 'narcotics',                     label: 'মাদক',                  color: '#ab47bc' },
  { key: 'other_cases',                   label: 'অন্যান্য',              color: '#78909c' },
];

// ── Default data (mirrors public Graphs.jsx) ──────────────────────────────────
const DEFAULT_DATA = [
  { id: 1, month: 'ফেব্রুয়ারি', year: 2026, dacoity: 3, robbery: 22, murder: 16, speedy_trial: 4, rape: 37, other_violence_women_children: 59, kidnapping: 12, burglary: 42, vehicle_theft: 27, other_theft: 57, road_accident: 23, arms_act: 23, explosives: 4, smuggling: 5, narcotics: 358, other_cases: 349 },
  { id: 2, month: 'মার্চ',       year: 2026, dacoity: 5, robbery: 25, murder: 24, speedy_trial: 7, rape: 56, other_violence_women_children: 55, kidnapping: 20, burglary: 62, vehicle_theft: 40, other_theft: 59, road_accident: 31, arms_act: 10, explosives: 1, smuggling: 7, narcotics: 455, other_cases: 448 },
  { id: 3, month: 'এপ্রিল',     year: 2026, dacoity: 3, robbery: 25, murder: 17, speedy_trial: 8, rape: 70, other_violence_women_children: 98, kidnapping: 21, burglary: 44, vehicle_theft: 39, other_theft: 61, road_accident: 32, arms_act: 13, explosives: 1, smuggling: 16, narcotics: 563, other_cases: 477 },
  { id: 4, month: 'মে',          year: 2026, dacoity: 2, robbery: 33, murder: 16, speedy_trial: 4, rape: 92, other_violence_women_children: 82, kidnapping: 13, burglary: 31, vehicle_theft: 33, other_theft: 59, road_accident: 27, arms_act: 10, explosives: 4, smuggling: 4, narcotics: 485, other_cases: 510 },
];

const calcTotal = (row) =>
  DEFAULT_CATEGORIES.reduce((sum, c) => sum + (Number(row[c.key]) || 0), 0);

const emptyRow = (id) => {
  const row = { id, month: '', year: new Date().getFullYear() };
  DEFAULT_CATEGORIES.forEach(c => { row[c.key] = 0; });
  return row;
};

// ── Toast Notification ────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  const colors = {
    success: { bg: 'rgba(16,185,129,0.15)', border: '#10b981', icon: CheckCircle, text: '#10b981' },
    error:   { bg: 'rgba(229,9,20,0.15)',   border: '#E50914',  icon: AlertTriangle, text: '#E50914' },
    info:    { bg: 'rgba(59,130,246,0.15)', border: '#3b82f6',  icon: Info,           text: '#3b82f6' },
  };
  const c = colors[type] || colors.info;
  const Icon = c.icon;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 12, padding: '12px 18px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(12px)',
      animation: 'slideIn 0.3s ease',
      maxWidth: 340,
    }}>
      <Icon style={{ color: c.text, flexShrink: 0 }} size={18} />
      <span style={{ color: '#fff', fontSize: 13, flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 2 }}>
        <X size={14} />
      </button>
    </div>
  );
}

// ── Inline Edit Field ─────────────────────────────────────────────────────────
function EditField({ value, onChange, type = 'number', label, small }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {label && <label style={{ color: '#666', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        min={0}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          padding: small ? '5px 8px' : '8px 12px',
          color: '#fff',
          fontSize: small ? 12 : 14,
          width: '100%',
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#E50914'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  );
}

// ── Month Data Row (Expandable) ───────────────────────────────────────────────
function MonthRow({ row, onSave, onDelete, index }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...row });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const total = calcTotal(draft);

  const handleSave = () => {
    onSave({ ...draft, total });
    setEditing(false);
    setExpanded(false);
  };

  const handleCancel = () => {
    setDraft({ ...row });
    setEditing(false);
  };

  const setField = (key, val) => setDraft(prev => ({ ...prev, [key]: val }));

  const isEven = index % 2 === 0;

  return (
    <div style={{
      background: isEven ? 'rgba(255,255,255,0.02)' : 'transparent',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 12,
      marginBottom: 8,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Row Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        cursor: 'pointer',
      }}
        onClick={() => !editing && setExpanded(e => !e)}
      >
        {/* Month/Year badge */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 90 }}>
          {editing ? (
            <input
              type="text"
              value={draft.month}
              onChange={e => setField('month', e.target.value)}
              onClick={e => e.stopPropagation()}
              placeholder="মাসের নাম"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(229,9,20,0.4)',
                borderRadius: 6, padding: '4px 8px', color: '#fff',
                fontSize: 13, fontFamily: 'inherit', outline: 'none',
              }}
            />
          ) : (
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{row.month}</span>
          )}
          {editing ? (
            <input
              type="number"
              value={draft.year}
              onChange={e => setField('year', Number(e.target.value))}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6, padding: '3px 8px', color: '#aaa',
                fontSize: 11, fontFamily: 'inherit', outline: 'none', marginTop: 4, width: 80,
              }}
            />
          ) : (
            <span style={{ color: '#555', fontSize: 11, marginTop: 2 }}>{row.year}</span>
          )}
        </div>

        {/* Total pill */}
        <div style={{
          background: 'rgba(229,9,20,0.12)',
          border: '1px solid rgba(229,9,20,0.25)',
          borderRadius: 20, padding: '3px 12px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: '#E50914', fontSize: 11, fontWeight: 600 }}>মোট:</span>
          <span style={{ color: '#E50914', fontSize: 14, fontWeight: 800 }}>{total.toLocaleString()}</span>
        </div>

        {/* Mini bar preview */}
        <div style={{ flex: 1, display: 'flex', gap: 2, alignItems: 'flex-end', height: 24, overflow: 'hidden' }}>
          {DEFAULT_CATEGORIES.slice(0, 8).map(cat => {
            const val = Number(draft[cat.key]) || 0;
            const max = Math.max(...DEFAULT_CATEGORIES.map(c => Number(draft[c.key]) || 0), 1);
            const pct = (val / max) * 100;
            return (
              <div key={cat.key} title={`${cat.label}: ${val}`} style={{
                flex: 1, height: `${pct}%`, minHeight: 2,
                background: cat.color, borderRadius: 2, opacity: 0.7,
              }} />
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
          {editing ? (
            <>
              <button onClick={handleSave} style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: 8, padding: '5px 12px', color: '#10b981', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Save size={13} /> সংরক্ষণ
              </button>
              <button onClick={handleCancel} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 10px', color: '#888', fontSize: 12, cursor: 'pointer' }}>
                <X size={13} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { setEditing(true); setExpanded(true); }}
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '5px 10px', color: '#3b82f6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Edit3 size={13} />
              </button>
              {confirmDelete ? (
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => onDelete(row.id)}
                    style={{ background: 'rgba(229,9,20,0.2)', border: '1px solid #E50914', borderRadius: 8, padding: '5px 10px', color: '#E50914', fontSize: 11, cursor: 'pointer' }}>
                    নিশ্চিত করুন
                  </button>
                  <button onClick={() => setConfirmDelete(false)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 8px', color: '#888', fontSize: 12, cursor: 'pointer' }}>
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(true)}
                  style={{ background: 'rgba(229,9,20,0.08)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: 8, padding: '5px 10px', color: '#E50914', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Trash2 size={13} />
                </button>
              )}
              <button onClick={() => setExpanded(e => !e)}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '5px 10px', color: '#666', fontSize: 12, cursor: 'pointer' }}>
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expanded Edit Grid */}
      {expanded && (
        <div style={{ padding: '4px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p style={{ color: '#555', fontSize: 11, marginBottom: 12, marginTop: 8 }}>সকল ক্ষেত্র সম্পাদনা করুন:</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10,
          }}>
            {DEFAULT_CATEGORIES.map(cat => (
              <div key={cat.key} style={{ position: 'relative' }}>
                <label style={{
                  color: cat.color,
                  fontSize: 10, fontWeight: 700,
                  display: 'block', marginBottom: 3,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: cat.color, marginRight: 4, verticalAlign: 'middle' }} />
                  {cat.label}
                </label>
                <input
                  type="number"
                  min={0}
                  value={editing ? draft[cat.key] : row[cat.key]}
                  onChange={e => editing && setField(cat.key, Number(e.target.value))}
                  readOnly={!editing}
                  style={{
                    background: editing ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${editing ? `${cat.color}44` : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 8, padding: '7px 10px',
                    color: editing ? '#fff' : '#666',
                    fontSize: 13, width: '100%',
                    fontFamily: 'inherit', outline: 'none',
                    cursor: editing ? 'text' : 'default',
                    transition: 'all 0.2s',
                  }}
                  onFocus={e => editing && (e.target.style.borderColor = cat.color)}
                  onBlur={e => editing && (e.target.style.borderColor = `${cat.color}44`)}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(229,9,20,0.06)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: 12 }}>স্বয়ংক্রিয় মোট:</span>
            <span style={{ color: '#E50914', fontWeight: 800, fontSize: 16 }}>{total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Add Month Modal ───────────────────────────────────────────────────────────
function AddMonthModal({ onAdd, onClose }) {
  const [draft, setDraft] = useState(emptyRow(Date.now()));
  const setField = (key, val) => setDraft(prev => ({ ...prev, [key]: val }));
  const total = calcTotal(draft);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: '#111', border: '1px solid rgba(229,9,20,0.3)',
        borderRadius: 20, width: '100%', maxWidth: 700,
        maxHeight: '90vh', overflowY: 'auto',
        padding: '28px 24px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>নতুন মাস যোগ করুন</h3>
            <p style={{ color: '#555', fontSize: 12 }}>সকল ক্ষেত্র পূরণ করুন</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 8, color: '#666', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Month + Year */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <EditField label="মাসের নাম (বাংলায়)" value={draft.month} onChange={v => setField('month', v)} type="text" />
          <EditField label="বছর" value={draft.year} onChange={v => setField('year', v)} type="number" />
        </div>

        {/* Category inputs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 10, marginBottom: 20,
        }}>
          {DEFAULT_CATEGORIES.map(cat => (
            <div key={cat.key}>
              <label style={{ color: cat.color, fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: cat.color, marginRight: 4, verticalAlign: 'middle' }} />
                {cat.label}
              </label>
              <input
                type="number"
                min={0}
                value={draft[cat.key]}
                onChange={e => setField(cat.key, Number(e.target.value))}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: `1px solid ${cat.color}33`,
                  borderRadius: 8, padding: '7px 10px',
                  color: '#fff', fontSize: 13, width: '100%',
                  fontFamily: 'inherit', outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = cat.color}
                onBlur={e => e.target.style.borderColor = `${cat.color}33`}
              />
            </div>
          ))}
        </div>

        {/* Total + Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ padding: '10px 16px', background: 'rgba(229,9,20,0.08)', borderRadius: 10, border: '1px solid rgba(229,9,20,0.2)' }}>
            <span style={{ color: '#666', fontSize: 12 }}>স্বয়ংক্রিয় মোট: </span>
            <span style={{ color: '#E50914', fontWeight: 800, fontSize: 18 }}>{total.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#888', fontSize: 13, cursor: 'pointer' }}>
              বাতিল
            </button>
            <button
              onClick={() => { if (draft.month.trim()) { onAdd({ ...draft, total }); onClose(); } }}
              disabled={!draft.month.trim()}
              style={{
                padding: '10px 24px', borderRadius: 10, border: 'none',
                background: draft.month.trim() ? '#E50914' : '#333',
                color: draft.month.trim() ? '#fff' : '#666',
                fontSize: 13, fontWeight: 700, cursor: draft.month.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <PlusCircle size={15} /> যোগ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Live Preview Chart ────────────────────────────────────────────────────────
function LivePreview({ data }) {
  const chartData = data.map(row => ({
    month: row.month,
    খুন: row.murder,
    ধর্ষণ: row.rape,
    মাদক: row.narcotics,
    মোট: calcTotal(row),
  }));

  return (
    <div style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '20px' }}>
      <h3 style={{ color: '#ddd', fontSize: 14, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <BarChart2 size={16} style={{ color: '#E50914' }} /> লাইভ প্রিভিউ (নির্বাচিত বিভাগ)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
          <Tooltip
            contentStyle={{ background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(229,9,20,0.4)', borderRadius: 10, fontSize: 12 }}
            labelStyle={{ color: '#E50914', fontWeight: 700 }}
            itemStyle={{ color: '#ccc' }}
          />
          <Legend formatter={v => <span style={{ color: '#aaa', fontSize: 11 }}>{v}</span>} />
          <Bar dataKey="খুন" fill="#ff4500" radius={[3, 3, 0, 0]} />
          <Bar dataKey="ধর্ষণ" fill="#ffa500" radius={[3, 3, 0, 0]} />
          <Bar dataKey="মাদক" fill="#ab47bc" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Summary Stats Bar ─────────────────────────────────────────────────────────
function SummaryBar({ data }) {
  const totals = data.map(r => calcTotal(r));
  const grandTotal = totals.reduce((a, b) => a + b, 0);
  const maxTotal = Math.max(...totals, 1);
  const lastTwo = totals.length >= 2 ? totals[totals.length - 1] - totals[totals.length - 2] : 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
      {[
        { label: 'মোট এন্ট্রি', value: data.length, color: '#3b82f6', unit: 'টি মাস' },
        { label: 'সর্বমোট মামলা', value: grandTotal, color: '#E50914', unit: '' },
        { label: 'সর্বোচ্চ মাস', value: maxTotal, color: '#ffa500', unit: '' },
        { label: 'সাম্প্রতিক পরিবর্তন', value: lastTwo, color: lastTwo > 0 ? '#ef5350' : '#66bb6a', unit: '', showSign: true },
      ].map((s, i) => (
        <div key={i} style={{
          background: 'rgba(15,15,15,0.8)',
          border: `1px solid ${s.color}22`,
          borderRadius: 12, padding: '14px 16px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
          <p style={{ color: '#666', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</p>
          <p style={{ color: s.color, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
            {s.showSign && lastTwo > 0 ? '+' : ''}{s.value.toLocaleString()}
          </p>
          {s.unit && <p style={{ color: '#444', fontSize: 10, marginTop: 2 }}>{s.unit}</p>}
        </div>
      ))}
    </div>
  );
}

// ── Main ManageGraphs Component ───────────────────────────────────────────────
export default function ManageGraphs() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const nextId = useRef(100);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = useCallback((updated) => {
    setData(prev => prev.map(r => r.id === updated.id ? updated : r));
    showToast(`"${updated.month}" এর ডেটা সংরক্ষিত হয়েছে ✓`);
  }, []);

  const handleDelete = useCallback((id) => {
    const row = data.find(r => r.id === id);
    setData(prev => prev.filter(r => r.id !== id));
    showToast(`"${row?.month}" এর ডেটা মুছে ফেলা হয়েছে`, 'info');
  }, [data]);

  const handleAdd = useCallback((newRow) => {
    const id = nextId.current++;
    setData(prev => [...prev, { ...newRow, id }]);
    showToast(`"${newRow.month}" যোগ করা হয়েছে ✓`);
  }, []);

  const handleExport = () => {
    const exportData = data.map(r => ({ ...r, total: calcTotal(r) }));
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `graph_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ডেটা এক্সপোর্ট হয়েছে', 'info');
  };

  const handleReset = () => {
    if (window.confirm('সকল পরিবর্তন মুছে ডিফল্ট ডেটা পুনরুদ্ধার করবেন?')) {
      setData(DEFAULT_DATA);
      showToast('ডিফল্ট ডেটা পুনরুদ্ধার করা হয়েছে', 'info');
    }
  };

  return (
    <div style={{ fontFamily: "'Noto Sans Bengali', 'Inter', sans-serif" }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { opacity: 0.4; }
      `}</style>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart2 style={{ color: '#E50914' }} size={22} />
            গ্রাফ ডেটা ব্যবস্থাপনা
          </h1>
          <p style={{ color: '#555', fontSize: 13 }}>
            মাসিক অপরাধ পরিসংখ্যান যোগ করুন, সম্পাদনা করুন ও মুছুন।
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => setShowPreview(p => !p)}
            style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: showPreview ? 'rgba(255,255,255,0.05)' : 'transparent', color: showPreview ? '#ccc' : '#555', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <BarChart2 size={14} /> {showPreview ? 'প্রিভিউ লুকান' : 'প্রিভিউ দেখুন'}
          </button>
          <button onClick={handleExport}
            style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)', color: '#3b82f6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingUp size={14} /> এক্সপোর্ট
          </button>
          <button onClick={handleReset}
            style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#666', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingDown size={14} /> রিসেট
          </button>
          <button onClick={() => setShowAddModal(true)}
            style={{ padding: '8px 18px', borderRadius: 10, border: 'none', background: '#E50914', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 16px rgba(229,9,20,0.3)' }}>
            <PlusCircle size={15} /> নতুন মাস
          </button>
        </div>
      </div>

      {/* ── Summary ── */}
      <SummaryBar data={data} />

      {/* ── Live Preview ── */}
      {showPreview && (
        <div style={{ marginBottom: 24 }}>
          <LivePreview data={data} />
        </div>
      )}

      {/* ── Info Banner ── */}
      <div style={{
        background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: 12, padding: '12px 16px',
        display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20,
      }}>
        <Info size={16} style={{ color: '#3b82f6', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ color: '#3b82f6', fontSize: 12, fontWeight: 600, marginBottom: 2 }}>কিভাবে ব্যবহার করবেন</p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.6 }}>
            প্রতিটি মাসের পাশের সম্পাদনা বাটনে ক্লিক করে ডেটা পরিবর্তন করুন। বিস্তারিত দেখতে <strong style={{ color: '#666' }}>↕</strong> চিহ্নে ক্লিক করুন।
            মোট সংখ্যা স্বয়ংক্রিয়ভাবে হিসেব হয়।
          </p>
        </div>
      </div>

      {/* ── Month Rows ── */}
      {data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: '#333' }}>
          <BarChart2 size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
          <p style={{ fontSize: 14 }}>কোনো ডেটা নেই। নতুন মাস যোগ করুন।</p>
        </div>
      ) : (
        data.map((row, i) => (
          <MonthRow
            key={row.id}
            row={row}
            index={i}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))
      )}

      {/* ── Add Modal ── */}
      {showAddModal && (
        <AddMonthModal onAdd={handleAdd} onClose={() => setShowAddModal(false)} />
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
