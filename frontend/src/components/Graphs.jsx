'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
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

const MONTH_ORDER = ['ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে'];

const CHART_TYPES = [
  { id: 'bar',   label: 'বার',    icon: '▌▌▌' },
  { id: 'line',  label: 'লাইন',   icon: '〜' },
  { id: 'area',  label: 'এরিয়া',  icon: '◿' },
  { id: 'radar', label: 'রেডার',  icon: '⬡' },
  { id: 'pie',   label: 'পাই',    icon: '◔' },
];

// ── Custom hook: track viewport width ────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

// ── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(10,10,10,0.97)',
      border: '1px solid rgba(229,9,20,0.4)',
      borderRadius: '12px',
      padding: '10px 14px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
      backdropFilter: 'blur(12px)',
      maxWidth: '220px',
      fontSize: 12,
    }}>
      <p style={{ color: '#E50914', fontWeight: 700, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 3 }}>
          <span style={{ color: p.color }}>{p.name}</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>{p.value?.toLocaleString()}</span>
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
      padding: '10px 14px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
      fontSize: 12,
    }}>
      <p style={{ color: payload[0].fill, fontWeight: 700, marginBottom: 4 }}>{name}</p>
      <p style={{ color: '#fff' }}>মামলা: <b>{value}</b></p>
      <p style={{ color: '#aaa' }}>মোটের {((value / total) * 100).toFixed(1)}%</p>
    </div>
  );
};

// ── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, delta, color, compact }) {
  const isPositive = delta > 0;
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(15,15,15,0.95) 100%)',
      border: `1px solid ${color}33`,
      borderRadius: compact ? 12 : 16,
      padding: compact ? '12px 14px' : '18px 22px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${color}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <p style={{ color: '#888', fontSize: compact ? 10 : 12, marginBottom: compact ? 4 : 6, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3 }}>{label}</p>
      <p style={{ color: '#fff', fontSize: compact ? 22 : 28, fontWeight: 800, lineHeight: 1, marginBottom: compact ? 4 : 8 }}>{value?.toLocaleString()}</p>
      {delta !== undefined && (
        <p style={{ color: isPositive ? '#ef5350' : '#66bb6a', fontSize: 11, fontWeight: 600 }}>
          {isPositive ? '▲' : '▼'} {Math.abs(delta).toLocaleString()} আগের মাস
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
        padding: '5px 10px',
        borderRadius: 20,
        border: `1px solid ${selected ? cat.color : 'rgba(255,255,255,0.1)'}`,
        background: selected ? `${cat.color}22` : 'transparent',
        color: selected ? cat.color : '#666',
        fontSize: 11,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: selected ? cat.color : '#444', marginRight: 5 }} />
      {cat.label}
    </button>
  );
}

// ── Chart Tab Button ─────────────────────────────────────────────────────────
function ChartTabBtn({ type, active, onClick, compact }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: compact ? '7px 11px' : '8px 16px',
        borderRadius: 10,
        border: 'none',
        background: active ? '#E50914' : 'rgba(255,255,255,0.05)',
        color: active ? '#fff' : '#888',
        fontSize: compact ? 11 : 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 4 : 6,
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: compact ? 10 : 11 }}>{type.icon}</span>
      <span>{type.label}</span>
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
  const windowWidth = useWindowWidth();

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024;

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

  const kpis = useMemo(() => {
    const months = RAW_DATA.filter(d => selectedMonths.has(d.month));
    const last = months[months.length - 1];
    const prev = months.length > 1 ? months[months.length - 2] : null;
    return [
      { label: 'মোট মামলা', value: months.reduce((s, d) => s + d.total, 0), delta: prev ? last.total - prev.total : undefined, color: '#E50914' },
      { label: 'মাদক', value: months.reduce((s, d) => s + d.narcotics, 0), delta: prev ? last.narcotics - prev.narcotics : undefined, color: '#ab47bc' },
      { label: 'খুন', value: months.reduce((s, d) => s + d.murder, 0), delta: prev ? last.murder - prev.murder : undefined, color: '#ff4500' },
      { label: 'ধর্ষণ', value: months.reduce((s, d) => s + d.rape, 0), delta: prev ? last.rape - prev.rape : undefined, color: '#ffa500' },
      { label: 'নারী ও শিশু', value: months.reduce((s, d) => s + d.other_violence_women_children, 0), delta: prev ? last.other_violence_women_children - prev.other_violence_women_children : undefined, color: '#ffd700' },
      { label: 'অপহরণ', value: months.reduce((s, d) => s + d.kidnapping, 0), delta: prev ? last.kidnapping - prev.kidnapping : undefined, color: '#9370db' },
    ];
  }, [selectedMonths]);

  const activeCats = CATEGORIES.filter(c => selectedCategories.has(c.key));

  // Responsive chart heights
  const chartHeight = isMobile ? 260 : isTablet ? 320 : 380;
  const smallChartHeight = isMobile ? 200 : 220;

  // Responsive radar outer radius
  const radarOuterRadius = isMobile ? 80 : isTablet ? 110 : 140;
  const pieOuterRadius = isMobile ? 90 : isTablet ? 120 : 150;
  const pieInnerRadius = isMobile ? 45 : isTablet ? 60 : 80;

  const renderChart = () => {
    const gridColor = 'rgba(255,255,255,0.05)';
    const axisColor = '#555';
    const axisFontSize = isMobile ? 11 : 13;
    const commonProps = {
      data: chartData,
      margin: isMobile
        ? { top: 8, right: 8, left: -20, bottom: 5 }
        : { top: 10, right: 20, left: 0, bottom: 5 },
    };

    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
              innerRadius={pieInnerRadius} outerRadius={pieOuterRadius} paddingAngle={3} stroke="none">
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
            {!isMobile && (
              <Legend
                formatter={(value) => <span style={{ color: '#ccc', fontSize: 11 }}>{value}</span>}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'radar') {
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={radarOuterRadius}>
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="category" tick={{ fill: '#aaa', fontSize: isMobile ? 9 : 11 }} />
            <PolarRadiusAxis tick={{ fill: '#555', fontSize: isMobile ? 8 : 10 }} />
            <Radar dataKey="value" stroke="#E50914" fill="#E50914" fillOpacity={0.25} dot={{ fill: '#E50914', r: isMobile ? 3 : 4 }} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: axisFontSize }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} width={isMobile ? 30 : 40} />
            <Tooltip content={<CustomTooltip />} />
            {!isMobile && <Legend formatter={v => <span style={{ color: '#ccc', fontSize: 11 }}>{v}</span>} />}
            {activeCats.map(c => (
              <Line key={c.key} type="monotone" dataKey={c.label} stroke={c.color}
                strokeWidth={highlightKey === c.key ? 3 : 2}
                dot={{ fill: c.color, r: isMobile ? 3 : 4 }}
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
        <ResponsiveContainer width="100%" height={chartHeight}>
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
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: axisFontSize }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} width={isMobile ? 30 : 40} />
            <Tooltip content={<CustomTooltip />} />
            {!isMobile && <Legend formatter={v => <span style={{ color: '#ccc', fontSize: 11 }}>{v}</span>} />}
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
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart {...commonProps} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: axisFontSize }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: axisColor, fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} width={isMobile ? 30 : 40} />
          <Tooltip content={<CustomTooltip />} />
          {!isMobile && <Legend formatter={v => <span style={{ color: '#ccc', fontSize: 11 }}>{v}</span>} />}
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
      paddingTop: isMobile ? 80 : 100,
      paddingBottom: 60,
      fontFamily: "'Noto Sans Bengali', 'Inter', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 12px' : '0 20px' }}>

        {/* ── Page Header ── */}
        <div style={{ marginBottom: isMobile ? 24 : 40, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: isMobile ? 8 : 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.25)' }}>
            <span style={{ color: '#E50914', fontSize: isMobile ? 10 : 12, fontWeight: 700, letterSpacing: '0.06em' }}>ঢাকা মেট্রোপলিটন পুলিশ • ফেব্রুয়ারি–মে ২০২৬</span>
          </div>
          <h1 style={{ fontSize: isMobile ? '1.8rem' : 'clamp(24px, 5vw, 44px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 8 }}>
            গ্রাফ ও <span style={{ color: '#E50914' }}>পরিসংখ্যান</span>
          </h1>
          <p style={{ color: '#666', fontSize: isMobile ? 13 : 15, maxWidth: 540, margin: '0 auto', padding: isMobile ? '0 8px' : 0 }}>
            ঢাকায় নথিভুক্ত অপরাধের ইন্টারেক্টিভ বিশ্লেষণ ড্যাশবোর্ড
          </p>
        </div>

        {/* ── KPI Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : isTablet
              ? 'repeat(3, 1fr)'
              : 'repeat(6, 1fr)',
          gap: isMobile ? 10 : 14,
          marginBottom: isMobile ? 20 : 36,
        }}>
          {kpis.map((k, i) => <KpiCard key={i} {...k} compact={isMobile} />)}
        </div>

        {/* ── Month Filter ── */}
        <div style={{ marginBottom: isMobile ? 16 : 28 }}>
          <span style={{ color: '#555', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>মাস ফিল্টার:</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MONTH_ORDER.map(month => (
              <button key={month} onClick={() => toggleMonth(month)} style={{
                padding: isMobile ? '5px 14px' : '6px 16px',
                borderRadius: 20,
                border: `1px solid ${selectedMonths.has(month) ? '#E50914' : 'rgba(255,255,255,0.1)'}`,
                background: selectedMonths.has(month) ? 'rgba(229,9,20,0.15)' : 'transparent',
                color: selectedMonths.has(month) ? '#E50914' : '#666',
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}>
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main Chart Panel ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(12,12,12,0.98) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: isMobile ? 16 : 20,
          padding: isMobile ? '16px 12px' : '28px 24px',
          marginBottom: isMobile ? 16 : 28,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, #E50914, transparent 60%)' }} />

          {/* Chart type tabs — horizontal scroll on mobile */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: isMobile ? 16 : 24,
            overflowX: 'auto',
            paddingBottom: 4,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            {CHART_TYPES.map(t => (
              <ChartTabBtn key={t.id} type={t} active={chartType === t.id} onClick={() => setChartType(t.id)} compact={isMobile} />
            ))}
          </div>

          {renderChart()}

          {/* Mobile legend — shown below chart for bar/line/area */}
          {isMobile && !['pie', 'radar'].includes(chartType) && (
            <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {activeCats.map(c => (
                <span key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#aaa' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, display: 'inline-block', flexShrink: 0 }} />
                  {c.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Category Toggles ── */}
        <div style={{
          background: 'rgba(15,15,15,0.9)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: isMobile ? 12 : 16,
          padding: isMobile ? '14px 12px' : '20px 22px',
          marginBottom: isMobile ? 16 : 28,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ color: '#aaa', fontSize: isMobile ? 12 : 13, fontWeight: 700 }}>অপরাধ বিভাগ</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setSelectedCategories(new Set(CATEGORIES.map(c => c.key)))}
                style={{ padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#888', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent' }}>
                সব
              </button>
              <button onClick={() => setSelectedCategories(new Set(['murder']))}
                style={{ padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(229,9,20,0.3)', background: 'transparent', color: '#E50914', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent' }}>
                রিসেট
              </button>
            </div>
          </div>
          {/* Horizontally scrollable chips on mobile */}
          <div style={{
            display: 'flex',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            gap: 8,
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: isMobile ? 4 : 0,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            {CATEGORIES.map(cat => (
              <CategoryChip key={cat.key} cat={cat} selected={selectedCategories.has(cat.key)} onToggle={toggleCategory} />
            ))}
          </div>
        </div>

        {/* ── Two-column: Trend + Breakdown ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? 16 : 20,
          marginBottom: isMobile ? 16 : 28,
        }}>
          {/* Monthly Total Trend */}
          <div style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: isMobile ? 12 : 16, padding: isMobile ? '14px 12px' : '22px 20px' }}>
            <h2 style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: '#ddd', marginBottom: isMobile ? 12 : 18 }}>মাসিক মোট মামলার প্রবণতা</h2>
            <ResponsiveContainer width="100%" height={smallChartHeight}>
              <AreaChart data={RAW_DATA.filter(d => selectedMonths.has(d.month))} margin={{ top: 5, right: 8, left: isMobile ? -20 : 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E50914" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#555', fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#555', fontSize: isMobile ? 9 : 11 }} axisLine={false} tickLine={false} width={isMobile ? 30 : 45} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="total" name="মোট মামলা" stroke="#E50914" fill="url(#totalGrad)" strokeWidth={2.5} dot={{ fill: '#E50914', r: isMobile ? 3 : 5, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Breakdown Pie */}
          <div style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: isMobile ? 12 : 16, padding: isMobile ? '14px 12px' : '22px 20px' }}>
            <h2 style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: '#ddd', marginBottom: isMobile ? 12 : 18 }}>অপরাধ বিভাজন (নির্বাচিত)</h2>
            <ResponsiveContainer width="100%" height={smallChartHeight}>
              <PieChart>
                <Pie data={pieData.slice(0, 8)} dataKey="value" nameKey="name"
                  cx={isMobile ? '50%' : '40%'} cy="50%"
                  outerRadius={isMobile ? 70 : 80}
                  innerRadius={isMobile ? 35 : 45}
                  paddingAngle={3} stroke="none">
                  {pieData.slice(0, 8).map((entry, i) => (
                    <Cell key={i} fill={entry.color}
                      style={{ cursor: 'pointer', filter: highlightKey === entry.name ? `drop-shadow(0 0 6px ${entry.color})` : 'none', transition: 'all 0.2s' }}
                      onMouseEnter={() => setHighlightKey(entry.name)}
                      onMouseLeave={() => setHighlightKey(null)}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                {!isMobile && (
                  <Legend layout="vertical" align="right" verticalAlign="middle"
                    formatter={v => <span style={{ color: '#bbb', fontSize: 11 }}>{v}</span>}
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
            {/* Mobile pie legend */}
            {isMobile && (
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {pieData.slice(0, 8).map((entry, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#aaa' }}>
                    <span style={{ width: 7, height: 7, borderRadius: 2, background: entry.color, display: 'inline-block' }} />
                    {entry.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Detailed Data Table ── */}
        <div style={{
          background: 'rgba(15,15,15,0.9)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: isMobile ? 12 : 16,
          padding: isMobile ? '14px 0' : '22px 20px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          <h2 style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: '#ddd', marginBottom: isMobile ? 12 : 18, padding: isMobile ? '0 12px' : 0 }}>বিস্তারিত তথ্য সারণি</h2>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: isMobile ? 480 : 'auto', borderCollapse: 'collapse', fontSize: isMobile ? 12 : 13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: isMobile ? '8px 12px' : '10px 14px', color: '#E50914', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap', position: 'sticky', left: 0, background: '#111', zIndex: 1 }}>অপরাধ বিভাগ</th>
                  {RAW_DATA.map(d => (
                    <th key={d.month} style={{ textAlign: 'center', padding: isMobile ? '8px 10px' : '10px 14px', color: '#E50914', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>{d.month}</th>
                  ))}
                  <th style={{ textAlign: 'center', padding: isMobile ? '8px 10px' : '10px 14px', color: '#aaa', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>মোট</th>
                  <th style={{ textAlign: 'center', padding: isMobile ? '8px 10px' : '10px 14px', color: '#aaa', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>পরিবর্তন</th>
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
                      <td style={{ padding: isMobile ? '8px 12px' : '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'sticky', left: 0, background: idx % 2 === 0 ? '#111' : '#0a0a0a', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
                          <span style={{ color: '#ddd', whiteSpace: 'nowrap', fontSize: isMobile ? 11 : 13 }}>{cat.label}</span>
                        </div>
                      </td>
                      {values.map((v, i) => (
                        <td key={i} style={{ textAlign: 'center', padding: isMobile ? '8px 10px' : '10px 14px', color: '#bbb', borderBottom: '1px solid rgba(255,255,255,0.04)', fontVariantNumeric: 'tabular-nums' }}>
                          {v}
                        </td>
                      ))}
                      <td style={{ textAlign: 'center', padding: isMobile ? '8px 10px' : '10px 14px', color: '#fff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{total}</td>
                      <td style={{ textAlign: 'center', padding: isMobile ? '8px 10px' : '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ color: change > 0 ? '#ef5350' : change < 0 ? '#66bb6a' : '#888', fontWeight: 600 }}>
                          {change > 0 ? '+' : ''}{change}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {/* Total Row */}
                <tr style={{ background: 'rgba(229,9,20,0.08)' }}>
                  <td style={{ padding: isMobile ? '10px 12px' : '12px 14px', fontWeight: 700, color: '#E50914', position: 'sticky', left: 0, background: 'rgba(229,9,20,0.12)', zIndex: 1, fontSize: isMobile ? 11 : 13 }}>সর্বমোট</td>
                  {RAW_DATA.map(d => (
                    <td key={d.month} style={{ textAlign: 'center', padding: isMobile ? '10px 10px' : '12px 14px', color: '#E50914', fontWeight: 700 }}>{d.total}</td>
                  ))}
                  <td style={{ textAlign: 'center', padding: isMobile ? '10px 10px' : '12px 14px', color: '#E50914', fontWeight: 800 }}>
                    {RAW_DATA.reduce((s, d) => s + d.total, 0)}
                  </td>
                  <td style={{ textAlign: 'center', padding: isMobile ? '10px 10px' : '12px 14px', color: '#E50914', fontWeight: 700 }}>
                    {RAW_DATA[RAW_DATA.length - 1].total - RAW_DATA[0].total > 0 ? '+' : ''}{RAW_DATA[RAW_DATA.length - 1].total - RAW_DATA[0].total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Footer note ── */}
        <p style={{ textAlign: 'center', color: '#333', fontSize: 12, marginTop: 24, lineHeight: 1.7 }}>
          তথ্যসূত্র: ঢাকা মেট্রোপলিটন পুলিশ — ফেব্রুয়ারি থেকে মে ২০২৬<br />
          এই তথ্যগুলি সাংবাদিকতা ও জনস্বার্থ বিশ্লেষণের উদ্দেশ্যে উপস্থাপিত।
        </p>
      </div>
    </div>
  );
}
