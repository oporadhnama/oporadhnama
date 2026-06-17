'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid,
  Legend, ResponsiveContainer,
} from 'recharts';

// ── Raw Data ────────────────────────────────────────────────────────────────
const RAW_DATA = [
  { month: 'ফেব্রুয়ারি', year: 2026, dacoity: 3, robbery: 22, murder: 16, speedy_trial: 4, rape: 37, other_violence_women_children: 59, kidnapping: 12, burglary: 42, vehicle_theft: 27, other_theft: 57, road_accident: 23, arms_act: 23, explosives: 4, smuggling: 5, narcotics: 358, other_cases: 349, total: 1041 },
  { month: 'মার্চ',       year: 2026, dacoity: 5, robbery: 25, murder: 24, speedy_trial: 7, rape: 56, other_violence_women_children: 55, kidnapping: 20, burglary: 62, vehicle_theft: 40, other_theft: 59, road_accident: 31, arms_act: 10, explosives: 1, smuggling: 7, narcotics: 455, other_cases: 448, total: 1305 },
  { month: 'এপ্রিল',     year: 2026, dacoity: 3, robbery: 25, murder: 17, speedy_trial: 8, rape: 70, other_violence_women_children: 98, kidnapping: 21, burglary: 44, vehicle_theft: 39, other_theft: 61, road_accident: 32, arms_act: 13, explosives: 1, smuggling: 16, narcotics: 563, other_cases: 477, total: 1488 },
  { month: 'মে',          year: 2026, dacoity: 2, robbery: 33, murder: 16, speedy_trial: 4, rape: 92, other_violence_women_children: 82, kidnapping: 13, burglary: 31, vehicle_theft: 33, other_theft: 59, road_accident: 27, arms_act: 10, explosives: 4, smuggling: 4, narcotics: 485, other_cases: 510, total: 1365 },
];

// ── Category Definitions ────────────────────────────────────────────────────
const CATEGORIES = [
  { key: 'dacoity',                     label: 'ডাকাতি',                color: '#E50914' },
  { key: 'robbery',                     label: 'রাহাজানি',              color: '#ff6b6b' },
  { key: 'murder',                      label: 'খুন',                    color: '#ff4500' },
  { key: 'speedy_trial',                label: 'দ্রুত বিচার',           color: '#ff8c00' },
  { key: 'rape',                        label: 'ধর্ষণ',                 color: '#ffa500' },
  { key: 'other_violence_women_children', label: 'নারী ও শিশু নির্যাতন', color: '#ffd700' },
  { key: 'kidnapping',                  label: 'অপহরণ',                 color: '#9370db' },
  { key: 'burglary',                    label: 'সিঁদেল চুরি',           color: '#7b68ee' },
  { key: 'vehicle_theft',               label: 'গাড়ি চুরি',             color: '#4169e1' },
  { key: 'other_theft',                 label: 'অন্যান্য চুরি',         color: '#00bcd4' },
  { key: 'road_accident',               label: 'সড়ক দুর্ঘটনা',         color: '#26c6da' },
  { key: 'arms_act',                    label: 'অস্ত্র আইন',            color: '#66bb6a' },
  { key: 'explosives',                  label: 'বিস্ফোরক',              color: '#ffee58' },
  { key: 'smuggling',                   label: 'চোরাচালান',             color: '#ef9a9a' },
  { key: 'narcotics',                   label: 'মাদক',                  color: '#ab47bc' },
  { key: 'other_cases',                 label: 'অন্যান্য',              color: '#78909c' },
];

const MONTH_ORDER = ['ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে'];

const CHART_TYPES = [
  { id: 'bar',    label: 'বার চার্ট',   icon: '▌▌▌' },
  { id: 'line',   label: 'লাইন চার্ট',  icon: '〜' },
  { id: 'area',   label: 'এরিয়া চার্ট', icon: '◿' },
  { id: 'radar',  label: 'রেডার চার্ট', icon: '⬡' },
  { id: 'pie',    label: 'পাই চার্ট',   icon: '◔' },
];

// ── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(10,10,10,0.97)',
      border: '1px solid rgba(229,9,20,0.4)',
      borderRadius: '12px',
      padding: '12px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
      backdropFilter: 'blur(12px)',
      maxWidth: '260px',
    }}>
      <p style={{ color: '#E50914', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
          <span style={{ color: p.color, fontSize: 13 }}>{p.name}</span>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

// ── Pie Tooltip ──────────────────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  const total = p.total;
  return (
    <div style={{
      background: 'rgba(10,10,10,0.97)',
      border: '1px solid rgba(229,9,20,0.4)',
      borderRadius: '12px',
      padding: '12px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
    }}>
      <p style={{ color: payload[0].fill, fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{name}</p>
      <p style={{ color: '#fff', fontSize: 13 }}>মামলা: <b>{value}</b></p>
      <p style={{ color: '#aaa', fontSize: 12 }}>মোটের {((value / total) * 100).toFixed(1)}%</p>
    </div>
  );
};

// ── Summary KPI Card ─────────────────────────────────────────────────────────
function KpiCard({ label, value, delta, color }) {
  const isPositive = delta > 0;
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(15,15,15,0.95) 100%)',
      border: `1px solid ${color}33`,
      borderRadius: 16,
      padding: '18px 22px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Glow accent top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <p style={{ color: '#888', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1, marginBottom: 8 }}>{value?.toLocaleString()}</p>
      {delta !== undefined && (
        <p style={{ color: isPositive ? '#ef5350' : '#66bb6a', fontSize: 12, fontWeight: 600 }}>
          {isPositive ? '▲' : '▼'} {Math.abs(delta).toLocaleString()} আগের মাস থেকে
        </p>
      )}
    </div>
  );
}

// ── Category Toggle Chip ─────────────────────────────────────────────────────
function CategoryChip({ cat, selected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(cat.key)}
      style={{
        padding: '5px 12px',
        borderRadius: 20,
        border: `1px solid ${selected ? cat.color : 'rgba(255,255,255,0.1)'}`,
        background: selected ? `${cat.color}22` : 'transparent',
        color: selected ? cat.color : '#666',
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        fontFamily: 'inherit',
      }}
    >
      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: selected ? cat.color : '#444', marginRight: 6 }} />
      {cat.label}
    </button>
  );
}

// ── Chart Tab Button ─────────────────────────────────────────────────────────
function ChartTabBtn({ type, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: 10,
        border: 'none',
        background: active ? '#E50914' : 'rgba(255,255,255,0.05)',
        color: active ? '#fff' : '#888',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'inherit',
      }}
    >
      <span style={{ fontSize: 11 }}>{type.icon}</span>
      <span className="hidden sm:inline">{type.label}</span>
    </button>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function Graphs() {
  const [chartType, setChartType] = useState('bar');
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(['murder', 'rape', 'narcotics', 'other_cases', 'other_violence_women_children'])
  );
  const [selectedMonths, setSelectedMonths] = useState(new Set(MONTH_ORDER));
  const [highlightKey, setHighlightKey] = useState(null);

  const toggleCategory = useCallback((key) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) { if (next.size > 1) next.delete(key); }
      else next.add(key);
      return next;
    });
  }, []);

  const toggleMonth = useCallback((month) => {
    setSelectedMonths(prev => {
      const next = new Set(prev);
      if (next.has(month)) { if (next.size > 1) next.delete(month); }
      else next.add(month);
      return next;
    });
  }, []);

  // Filtered chart data
  const chartData = useMemo(() =>
    RAW_DATA
      .filter(d => selectedMonths.has(d.month))
      .map(d => {
        const row = { month: d.month };
        CATEGORIES.forEach(c => { if (selectedCategories.has(c.key)) row[c.label] = d[c.key]; });
        row.total = d.total;
        return row;
      }),
    [selectedCategories, selectedMonths]
  );

  // Radar data (average across filtered months)
  const radarData = useMemo(() => {
    const filtered = RAW_DATA.filter(d => selectedMonths.has(d.month));
    return CATEGORIES
      .filter(c => selectedCategories.has(c.key))
      .map(c => ({
        category: c.label,
        value: Math.round(filtered.reduce((sum, d) => sum + d[c.key], 0) / filtered.length),
        color: c.color,
      }));
  }, [selectedCategories, selectedMonths]);

  // Pie data (sum across filtered months)
  const pieData = useMemo(() => {
    const filtered = RAW_DATA.filter(d => selectedMonths.has(d.month));
    const total = filtered.reduce((sum, d) => sum + d.total, 0);
    return CATEGORIES
      .filter(c => selectedCategories.has(c.key))
      .map(c => ({
        name: c.label,
        value: filtered.reduce((sum, d) => sum + d[c.key], 0),
        color: c.color,
        total,
      }))
      .sort((a, b) => b.value - a.value);
  }, [selectedCategories, selectedMonths]);

  // KPI summary
  const kpis = useMemo(() => {
    const months = RAW_DATA.filter(d => selectedMonths.has(d.month));
    const last = months[months.length - 1];
    const prev = months.length > 1 ? months[months.length - 2] : null;
    return [
      { label: 'মোট মামলা', value: months.reduce((s, d) => s + d.total, 0), delta: prev ? last.total - prev.total : undefined, color: '#E50914' },
      { label: 'মাদক মামলা', value: months.reduce((s, d) => s + d.narcotics, 0), delta: prev ? last.narcotics - prev.narcotics : undefined, color: '#ab47bc' },
      { label: 'খুন', value: months.reduce((s, d) => s + d.murder, 0), delta: prev ? last.murder - prev.murder : undefined, color: '#ff4500' },
      { label: 'ধর্ষণ', value: months.reduce((s, d) => s + d.rape, 0), delta: prev ? last.rape - prev.rape : undefined, color: '#ffa500' },
      { label: 'নারী ও শিশু নির্যাতন', value: months.reduce((s, d) => s + d.other_violence_women_children, 0), delta: prev ? last.other_violence_women_children - prev.other_violence_women_children : undefined, color: '#ffd700' },
      { label: 'অপহরণ', value: months.reduce((s, d) => s + d.kidnapping, 0), delta: prev ? last.kidnapping - prev.kidnapping : undefined, color: '#9370db' },
    ];
  }, [selectedMonths]);

  const activeCats = CATEGORIES.filter(c => selectedCategories.has(c.key));

  const renderChart = () => {
    const gridColor = 'rgba(255,255,255,0.05)';
    const axisColor = '#555';
    const commonProps = {
      data: chartData,
      margin: { top: 10, right: 20, left: 0, bottom: 5 },
    };

    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
              innerRadius={80} outerRadius={150} paddingAngle={3} stroke="none">
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color}
                  opacity={highlightKey === null || highlightKey === entry.name ? 1 : 0.25}
                  style={{ cursor: 'pointer', filter: highlightKey === entry.name ? `drop-shadow(0 0 8px ${entry.color})` : 'none', transition: 'all 0.2s' }}
                  onMouseEnter={() => setHighlightKey(entry.name)}
                  onMouseLeave={() => setHighlightKey(null)}
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              formatter={(value) => <span style={{ color: '#ccc', fontSize: 12 }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'radar') {
      return (
        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={140}>
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="category" tick={{ fill: '#aaa', fontSize: 11 }} />
            <PolarRadiusAxis tick={{ fill: '#555', fontSize: 10 }} />
            <Radar dataKey="value" stroke="#E50914" fill="#E50914" fillOpacity={0.25} dot={{ fill: '#E50914', r: 4 }} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={380}>
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 13 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={v => <span style={{ color: '#ccc', fontSize: 12 }}>{v}</span>} />
            {activeCats.map(c => (
              <Line key={c.key} type="monotone" dataKey={c.label} stroke={c.color}
                strokeWidth={highlightKey === c.key ? 3 : 2}
                dot={{ fill: c.color, r: 4 }}
                opacity={highlightKey === null || highlightKey === c.key ? 1 : 0.2}
                onMouseEnter={() => setHighlightKey(c.key)}
                onMouseLeave={() => setHighlightKey(null)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart {...commonProps}>
            <defs>
              {activeCats.map(c => (
                <linearGradient key={c.key} id={`grad-${c.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c.color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={c.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 13 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={v => <span style={{ color: '#ccc', fontSize: 12 }}>{v}</span>} />
            {activeCats.map(c => (
              <Area key={c.key} type="monotone" dataKey={c.label}
                stroke={c.color} fill={`url(#grad-${c.key})`}
                strokeWidth={highlightKey === c.key ? 3 : 2}
                opacity={highlightKey === null || highlightKey === c.key ? 1 : 0.2}
                onMouseEnter={() => setHighlightKey(c.key)}
                onMouseLeave={() => setHighlightKey(null)}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    // default: bar
    return (
      <ResponsiveContainer width="100%" height={380}>
        <BarChart {...commonProps} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 13 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={v => <span style={{ color: '#ccc', fontSize: 12 }}>{v}</span>} />
          {activeCats.map(c => (
            <Bar key={c.key} dataKey={c.label} fill={c.color} radius={[4, 4, 0, 0]}
              opacity={highlightKey === null || highlightKey === c.key ? 1 : 0.2}
              onMouseEnter={() => setHighlightKey(c.key)}
              onMouseLeave={() => setHighlightKey(null)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      paddingTop: 100,
      paddingBottom: 60,
      fontFamily: "'Noto Sans Bengali', 'Inter', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* ── Page Header ── */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '6px 16px', borderRadius: 20, background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.25)' }}>
            <span style={{ color: '#E50914', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>ঢাকা মেট্রোপলিটন পুলিশ • ফেব্রুয়ারি–মে ২০২৬</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 44px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 10 }}>
            গ্রাফ ও <span style={{ color: '#E50914' }}>পরিসংখ্যান</span>
          </h1>
          <p style={{ color: '#666', fontSize: 15, maxWidth: 540, margin: '0 auto' }}>
            ঢাকায় নথিভুক্ত অপরাধের ইন্টারেক্টিভ বিশ্লেষণ ড্যাশবোর্ড
          </p>
        </div>

        {/* ── KPI Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 36 }}>
          {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
        </div>

        {/* ── Month Filter ── */}
        <div style={{ marginBottom: 28, display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <span style={{ color: '#555', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', marginRight: 4 }}>মাস ফিল্টার:</span>
          {MONTH_ORDER.map(month => (
            <button key={month} onClick={() => toggleMonth(month)} style={{
              padding: '6px 16px', borderRadius: 20, border: `1px solid ${selectedMonths.has(month) ? '#E50914' : 'rgba(255,255,255,0.1)'}`,
              background: selectedMonths.has(month) ? 'rgba(229,9,20,0.15)' : 'transparent',
              color: selectedMonths.has(month) ? '#E50914' : '#666',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
            }}>
              {month}
            </button>
          ))}
        </div>

        {/* ── Main Chart Panel ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(12,12,12,0.98) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          padding: '28px 24px',
          marginBottom: 28,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* subtle red corner accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, #E50914, transparent 60%)' }} />

          {/* Chart type tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {CHART_TYPES.map(t => (
              <ChartTabBtn key={t.id} type={t} active={chartType === t.id} onClick={() => setChartType(t.id)} />
            ))}
          </div>

          {renderChart()}
        </div>

        {/* ── Category Toggles ── */}
        <div style={{
          background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: '20px 22px', marginBottom: 28,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ color: '#aaa', fontSize: 13, fontWeight: 700 }}>অপরাধ বিভাগ</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setSelectedCategories(new Set(CATEGORIES.map(c => c.key)))}
                style={{ padding: '4px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#888', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                সব
              </button>
              <button onClick={() => setSelectedCategories(new Set(['murder']))}
                style={{ padding: '4px 12px', borderRadius: 8, border: '1px solid rgba(229,9,20,0.3)', background: 'transparent', color: '#E50914', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                রিসেট
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map(cat => (
              <CategoryChip key={cat.key} cat={cat} selected={selectedCategories.has(cat.key)} onToggle={toggleCategory} />
            ))}
          </div>
        </div>

        {/* ── Two-column: Trend + Breakdown ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 28 }}>

          {/* Monthly Total Trend */}
          <div style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '22px 20px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#ddd', marginBottom: 18 }}>মাসিক মোট মামলার প্রবণতা</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={RAW_DATA.filter(d => selectedMonths.has(d.month))} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E50914" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="total" name="মোট মামলা" stroke="#E50914" fill="url(#totalGrad)" strokeWidth={2.5} dot={{ fill: '#E50914', r: 5, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top 5 Breakdown Pie */}
          <div style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '22px 20px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#ddd', marginBottom: 18 }}>অপরাধ বিভাজন (নির্বাচিত)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData.slice(0, 8)} dataKey="value" nameKey="name" cx="40%" cy="50%"
                  outerRadius={80} innerRadius={45} paddingAngle={3} stroke="none">
                  {pieData.slice(0, 8).map((entry, i) => (
                    <Cell key={i} fill={entry.color}
                      style={{ cursor: 'pointer', filter: highlightKey === entry.name ? `drop-shadow(0 0 6px ${entry.color})` : 'none', transition: 'all 0.2s' }}
                      onMouseEnter={() => setHighlightKey(entry.name)}
                      onMouseLeave={() => setHighlightKey(null)}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend layout="vertical" align="right" verticalAlign="middle"
                  formatter={v => <span style={{ color: '#bbb', fontSize: 11 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Detailed Data Table ── */}
        <div style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '22px 20px', overflowX: 'auto' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#ddd', marginBottom: 18 }}>বিস্তারিত তথ্য সারণি</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 14px', color: '#E50914', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>অপরাধ বিভাগ</th>
                {RAW_DATA.map(d => (
                  <th key={d.month} style={{ textAlign: 'center', padding: '10px 14px', color: '#E50914', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>{d.month}</th>
                ))}
                <th style={{ textAlign: 'center', padding: '10px 14px', color: '#aaa', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>মোট</th>
                <th style={{ textAlign: 'center', padding: '10px 14px', color: '#aaa', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>পরিবর্তন</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat, idx) => {
                const values = RAW_DATA.map(d => d[cat.key]);
                const total = values.reduce((s, v) => s + v, 0);
                const lastVal = values[values.length - 1];
                const firstVal = values[0];
                const change = lastVal - firstVal;
                return (
                  <tr key={cat.key}
                    style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(229,9,20,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}
                  >
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
                        <span style={{ color: '#ddd', whiteSpace: 'nowrap' }}>{cat.label}</span>
                      </div>
                    </td>
                    {values.map((v, i) => (
                      <td key={i} style={{ textAlign: 'center', padding: '10px 14px', color: '#bbb', borderBottom: '1px solid rgba(255,255,255,0.04)', fontVariantNumeric: 'tabular-nums' }}>
                        {v}
                      </td>
                    ))}
                    <td style={{ textAlign: 'center', padding: '10px 14px', color: '#fff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{total}</td>
                    <td style={{ textAlign: 'center', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: change > 0 ? '#ef5350' : change < 0 ? '#66bb6a' : '#888', fontWeight: 600 }}>
                        {change > 0 ? '+' : ''}{change}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {/* Total Row */}
              <tr style={{ background: 'rgba(229,9,20,0.08)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#E50914' }}>সর্বমোট</td>
                {RAW_DATA.map(d => (
                  <td key={d.month} style={{ textAlign: 'center', padding: '12px 14px', color: '#E50914', fontWeight: 700 }}>{d.total}</td>
                ))}
                <td style={{ textAlign: 'center', padding: '12px 14px', color: '#E50914', fontWeight: 800 }}>
                  {RAW_DATA.reduce((s, d) => s + d.total, 0)}
                </td>
                <td style={{ textAlign: 'center', padding: '12px 14px', color: '#E50914', fontWeight: 700 }}>
                  {RAW_DATA[RAW_DATA.length - 1].total - RAW_DATA[0].total > 0 ? '+' : ''}{RAW_DATA[RAW_DATA.length - 1].total - RAW_DATA[0].total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Footer note ── */}
        <p style={{ textAlign: 'center', color: '#333', fontSize: 12, marginTop: 28, lineHeight: 1.7 }}>
          তথ্যসূত্র: ঢাকা মেট্রোপলিটন পুলিশ — ফেব্রুয়ারি থেকে মে ২০২৬<br />
          এই তথ্যগুলি সাংবাদিকতা ও জনস্বার্থ বিশ্লেষণের উদ্দেশ্যে উপস্থাপিত।
        </p>
      </div>
    </div>
  );
}
