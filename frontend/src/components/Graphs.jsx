'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

/* ─── Raw Data ────────────────────────────────────────────────────────────── */
const RAW_DATA = [
  { month: 'ফেব্র', year: 2026, dacoity: 3, robbery: 22, murder: 16, speedy_trial: 4, rape: 37, other_violence_women_children: 59, kidnapping: 12, burglary: 42, vehicle_theft: 27, other_theft: 57, road_accident: 23, arms_act: 23, explosives: 4, smuggling: 5, narcotics: 358, other_cases: 349, total: 1041 },
  { month: 'মার্চ', year: 2026, dacoity: 5, robbery: 25, murder: 24, speedy_trial: 7, rape: 56, other_violence_women_children: 55, kidnapping: 20, burglary: 62, vehicle_theft: 40, other_theft: 59, road_accident: 31, arms_act: 10, explosives: 1, smuggling: 7, narcotics: 455, other_cases: 448, total: 1305 },
  { month: 'এপ্রিল', year: 2026, dacoity: 3, robbery: 25, murder: 17, speedy_trial: 8, rape: 70, other_violence_women_children: 98, kidnapping: 21, burglary: 44, vehicle_theft: 39, other_theft: 61, road_accident: 32, arms_act: 13, explosives: 1, smuggling: 16, narcotics: 563, other_cases: 477, total: 1488 },
  { month: 'মে', year: 2026, dacoity: 2, robbery: 33, murder: 16, speedy_trial: 4, rape: 92, other_violence_women_children: 82, kidnapping: 13, burglary: 31, vehicle_theft: 33, other_theft: 59, road_accident: 27, arms_act: 10, explosives: 4, smuggling: 4, narcotics: 485, other_cases: 510, total: 1365 },
];

/* Full month names for display */
const MONTH_FULL = { 'ফেব্র': 'ফেব্রুয়ারি', 'মার্চ': 'মার্চ', 'এপ্রিল': 'এপ্রিল', 'মে': 'মে' };

/* ─── Categories ─────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { key: 'dacoity', label: 'ডাকাতি', color: '#E50914' },
  { key: 'robbery', label: 'রাহাজানি', color: '#ff6b6b' },
  { key: 'murder', label: 'খুন', color: '#ff4500' },
  { key: 'speedy_trial', label: 'দ্রুত বিচার', color: '#ff8c00' },
  { key: 'rape', label: 'ধর্ষণ', color: '#ffa500' },
  { key: 'other_violence_women_children', label: 'নারী-শিশু নির্যাতন', color: '#ffd700' },
  { key: 'kidnapping', label: 'অপহরণ', color: '#9370db' },
  { key: 'burglary', label: 'সিঁদেল চুরি', color: '#7b68ee' },
  { key: 'vehicle_theft', label: 'গাড়ি চুরি', color: '#4169e1' },
  { key: 'other_theft', label: 'অন্য চুরি', color: '#00bcd4' },
  { key: 'road_accident', label: 'সড়ক দুর্ঘটনা', color: '#26c6da' },
  { key: 'arms_act', label: 'অস্ত্র আইন', color: '#66bb6a' },
  { key: 'explosives', label: 'বিস্ফোরক', color: '#ffee58' },
  { key: 'smuggling', label: 'চোরাচালান', color: '#ef9a9a' },
  { key: 'narcotics', label: 'মাদক', color: '#ab47bc' },
  { key: 'other_cases', label: 'অন্যান্য', color: '#78909c' },
];

const MONTH_ORDER = RAW_DATA.map(d => d.month);

const CHART_TYPES = [
  { id: 'bar', label: 'বার', icon: '▌▌' },
  { id: 'line', label: 'লাইন', icon: '〜' },
  { id: 'area', label: 'এরিয়া', icon: '◿' },
  { id: 'radar', label: 'রেডার', icon: '⬡' },
  { id: 'pie', label: 'পাই', icon: '◔' },
];

/* ─── useIsMobile: SSR-safe, avoids hydration mismatch ───────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ─── Tooltips ───────────────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(10,10,10,0.98)', border: '1px solid rgba(229,9,20,0.4)', borderRadius: 10, padding: '8px 12px', maxWidth: 180, fontSize: 11 }}>
      <p style={{ color: '#E50914', fontWeight: 700, marginBottom: 4 }}>{label}</p>
      {payload.slice(0, 6).map((p, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 2 }}>
          <span style={{ color: p.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 100 }}>{p.name}</span>
          <span style={{ color: '#fff', fontWeight: 600, flexShrink: 0 }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
      {payload.length > 6 && (
        <p style={{ color: '#888', fontSize: 10, marginTop: 4, textAlign: 'center' }}>+ আরও {payload.length - 6}</p>
      )}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  return (
    <div style={{ background: 'rgba(10,10,10,0.98)', border: '1px solid rgba(229,9,20,0.4)', borderRadius: 10, padding: '8px 12px', fontSize: 11 }}>
      <p style={{ color: payload[0].fill, fontWeight: 700, marginBottom: 3 }}>{name}</p>
      <p style={{ color: '#fff' }}>মামলা: <b>{value}</b></p>
      <p style={{ color: '#aaa' }}>মোট: {((value / p.total) * 100).toFixed(1)}%</p>
    </div>
  );
};

/* ─── KPI Card ───────────────────────────────────────────────────────────── */
function KpiCard({ label, value, delta, color }) {
  const up = delta > 0;
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(20,20,20,0.95),rgba(12,12,12,0.98))',
      border: `1px solid ${color}33`,
      borderRadius: 12,
      padding: '10px 12px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${color},transparent)` }} />
      <p style={{ color: '#777', fontSize: 9, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>{label}</p>
      <p style={{ color: '#fff', fontSize: 20, fontWeight: 800, lineHeight: 1, marginBottom: 3 }}>{value?.toLocaleString()}</p>
      {delta !== undefined && (
        <p style={{ color: up ? '#ef5350' : '#66bb6a', fontSize: 10, fontWeight: 600 }}>
          {up ? '▲' : '▼'} {Math.abs(delta)}
        </p>
      )}
    </div>
  );
}

/* ─── Category Chip ──────────────────────────────────────────────────────── */
function Chip({ cat, selected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(cat.key)}
      style={{
        padding: '4px 9px',
        borderRadius: 20,
        border: `1px solid ${selected ? cat.color : 'rgba(255,255,255,0.1)'}`,
        background: selected ? `${cat.color}22` : 'transparent',
        color: selected ? cat.color : '#555',
        fontSize: 11,
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        flexShrink: 0,
      }}
    >
      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: selected ? cat.color : '#444', marginRight: 4 }} />
      {cat.label}
    </button>
  );
}

/* ─── Chart Tab ──────────────────────────────────────────────────────────── */
function Tab({ type, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 10px',
        borderRadius: 8,
        border: 'none',
        background: active ? '#E50914' : 'rgba(255,255,255,0.06)',
        color: active ? '#fff' : '#777',
        fontSize: 11,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 10 }}>{type.icon}</span>
      {type.label}
    </button>
  );
}

/* ─── Section Card wrapper ───────────────────────────────────────────────── */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'rgba(15,15,15,0.92)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 14,
      padding: '14px',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Scrollable row (hides scrollbar) ──────────────────────────────────── */
const scrollRow = {
  display: 'flex',
  gap: 8,
  overflowX: 'auto',
  paddingBottom: 4,
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
};

/* ═══ Main Component ════════════════════════════════════════════════════════ */
export default function Graphs() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [selCats, setSelCats] = useState(
    new Set(['murder', 'rape', 'narcotics', 'other_cases', 'other_violence_women_children'])
  );
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [hl, setHl] = useState(null);
  const [activeMobileData, setActiveMobileData] = useState(null);

  // Reset mobile data when chart type or active categories change
  useEffect(() => {
    setActiveMobileData(null);
  }, [chartType, selCats, selectedMonth]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleCat = useCallback((key) => {
    setSelCats(prev => {
      const n = new Set(prev);
      if (n.has(key)) { if (n.size > 1) n.delete(key); }
      else n.add(key);
      return n;
    });
  }, []);

  const selMonths = useMemo(() => {
    if (selectedMonth === 'all') return new Set(MONTH_ORDER);
    return new Set([selectedMonth]);
  }, [selectedMonth]);

  /* derived data */
  const activeCats = useMemo(() => CATEGORIES.filter(c => selCats.has(c.key)), [selCats]);

  const chartData = useMemo(() =>
    RAW_DATA.filter(d => selMonths.has(d.month)).map(d => {
      const row = { month: d.month };
      CATEGORIES.forEach(c => { if (selCats.has(c.key)) row[c.label] = d[c.key]; });
      row.total = d.total;
      return row;
    }),
    [selCats, selMonths]
  );

  const radarData = useMemo(() => {
    const filtered = RAW_DATA.filter(d => selMonths.has(d.month));
    return CATEGORIES.filter(c => selCats.has(c.key)).map(c => ({
      subject: c.label,
      value: Math.round(filtered.reduce((s, d) => s + d[c.key], 0) / filtered.length),
      color: c.color,
    }));
  }, [selCats, selMonths]);

  const pieData = useMemo(() => {
    const filtered = RAW_DATA.filter(d => selMonths.has(d.month));
    const total = filtered.reduce((s, d) => s + d.total, 0);
    return CATEGORIES.filter(c => selCats.has(c.key)).map(c => ({
      name: c.label, color: c.color, total,
      value: filtered.reduce((s, d) => s + d[c.key], 0),
    })).sort((a, b) => b.value - a.value);
  }, [selCats, selMonths]);

  const kpis = useMemo(() => {
    const months = RAW_DATA.filter(d => selMonths.has(d.month));
    const last = months[months.length - 1];
    const prev = months.length > 1 ? months[months.length - 2] : null;
    return [
      { label: 'মোট মামলা', color: '#E50914', value: months.reduce((s, d) => s + d.total, 0), delta: prev ? last.total - prev.total : undefined },
      { label: 'মাদক', color: '#ab47bc', value: months.reduce((s, d) => s + d.narcotics, 0), delta: prev ? last.narcotics - prev.narcotics : undefined },
      { label: 'খুন', color: '#ff4500', value: months.reduce((s, d) => s + d.murder, 0), delta: prev ? last.murder - prev.murder : undefined },
      { label: 'ধর্ষণ', color: '#ffa500', value: months.reduce((s, d) => s + d.rape, 0), delta: prev ? last.rape - prev.rape : undefined },
      { label: 'নারী-শিশু', color: '#ffd700', value: months.reduce((s, d) => s + d.other_violence_women_children, 0), delta: prev ? last.other_violence_women_children - prev.other_violence_women_children : undefined },
      { label: 'অপহরণ', color: '#9370db', value: months.reduce((s, d) => s + d.kidnapping, 0), delta: prev ? last.kidnapping - prev.kidnapping : undefined },
    ];
  }, [selMonths]);

  const singleMonthData = useMemo(() => {
    if (selectedMonth === 'all') return [];
    const row = RAW_DATA.find(d => d.month === selectedMonth);
    return CATEGORIES.filter(c => selCats.has(c.key)).map(c => ({
      name: c.label,
      value: row ? row[c.key] : 0,
      color: c.color,
    })).sort((a, b) => b.value - a.value);
  }, [selectedMonth, selCats]);

  /* chart rendering constants */
  const G = 'rgba(255,255,255,0.05)';
  const AX = '#555';
  const CH = isMobile ? 240 : 340;
  // Adjusted margins to prevent right-edge clipping
  const margin = isMobile
    ? { top: 15, right: 15, left: 5, bottom: 5 }
    : { top: 10, right: 20, left: 0, bottom: 5 };
  const axFs = isMobile ? 10 : 12;
  const dotR = isMobile ? 3 : 4;

  const getMobileMinWidth = () => {
    if (!isMobile) return '100%';
    if (chartType === 'bar') {
      // 25px per bar, plus some padding
      return Math.max(window.innerWidth - 40, selMonths.size * activeCats.length * 25 + 60);
    }
    // For line/area charts, base width on number of months
    return Math.max(window.innerWidth - 40, selMonths.size * 80);
  };

  const getSingleMonthHeight = () => {
    if (!isMobile) return CH;
    // Dynamic height: 40px per bar, plus padding
    return Math.max(260, activeCats.length * 40 + 40);
  };

  const renderMobileScrollWrapper = (children) => {
    if (!isMobile) return children;
    const minW = getMobileMinWidth();
    return (
      <div className="gr-scroll" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {/* Height must be explicitly 100% so it wraps the ResponsiveContainer tightly */}
        <div style={{ minWidth: minW, height: '100%', paddingBottom: 10 }}>
          {children}
        </div>
      </div>
    );
  };

  const MobileDetailsCard = () => {
    if (!isMobile || ['pie', 'radar'].includes(chartType) || selectedMonth !== 'all') return null;
    return (
      <div style={{
        marginTop: 15,
        padding: 15,
        background: 'rgba(20, 20, 20, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}>
        {!activeMobileData ? (
          <p style={{ color: '#888', fontSize: 13, textAlign: 'center', margin: 0 }}>
            বিস্তারিত দেখতে গ্রাফের যেকোনো অংশে ট্যাপ করুন
          </p>
        ) : (
          <div>
            <p style={{ color: '#ccc', fontSize: 13, marginBottom: 10, fontWeight: 700 }}>{activeMobileData.month}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {activeCats.map(cat => {
                const val = activeMobileData[cat.label];
                if (val === undefined) return null;
                return (
                  <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                    <span style={{ color: '#aaa', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.label}</span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderChart = () => {
    if (!mounted) return <div style={{ height: CH, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#333' }}>লোড হচ্ছে...</span></div>;

    if (chartType === 'pie') {
      const oR = isMobile ? 80 : 130;
      const iR = isMobile ? 38 : 60;
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={CH}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                innerRadius={iR} outerRadius={oR} paddingAngle={3} stroke="none">
                {pieData.map((e, i) => (
                  <Cell key={i} fill={e.color}
                    opacity={hl === null || hl === e.name ? 1 : 0.2}
                    style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseEnter={() => setHl(e.name)}
                    onMouseLeave={() => setHl(null)}
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (chartType === 'radar') {
      const oR = isMobile ? 75 : 120;
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={CH}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={oR}>
              <PolarGrid stroke={G} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: isMobile ? 8 : 10 }} />
              <PolarRadiusAxis tick={{ fill: '#444', fontSize: isMobile ? 7 : 9 }} />
              <Radar dataKey="value" stroke="#E50914" fill="#E50914" fillOpacity={0.2} dot={{ fill: '#E50914', r: dotR }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (selectedMonth !== 'all' && ['line', 'area'].includes(chartType)) {
      return (
        <div style={{ height: CH, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 13, gap: 10, textAlign: 'center', padding: '0 20px' }}>
          <span>📊 এই মাসের ট্রেন্ড দেখার জন্য অনুগ্রহ করে "সব মাস" নির্বাচন করুন।</span>
          <button onClick={() => setSelectedMonth('all')} style={{ padding: '6px 14px', borderRadius: 8, background: '#E50914', color: '#fff', border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            সব মাস দেখুন
          </button>
        </div>
      );
    }

    if (selectedMonth !== 'all' && chartType === 'bar') {
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={getSingleMonthHeight()}>
            <BarChart layout="vertical" data={singleMonthData} margin={{ top: 5, right: 20, left: isMobile ? 5 : 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} horizontal={false} />
              <XAxis type="number" tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} />
              {/* Increased YAxis width to ensure Bengali labels do not truncate */}
              <YAxis type="category" dataKey="name" tick={{ fill: '#ccc', fontSize: isMobile ? 10 : 10 }} axisLine={false} tickLine={false} width={isMobile ? 110 : 110} />
              {!isMobile && <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />}
              <Bar dataKey="value" fill="#E50914" maxBarSize={isMobile ? 20 : 40} radius={[0, 4, 4, 0]}>
                {singleMonthData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    const common = { data: chartData, margin };

    if (chartType === 'line') {
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          {renderMobileScrollWrapper(
            <ResponsiveContainer width="100%" height={isMobile ? 260 : CH}>
              <LineChart {...common} onClick={(e) => { if (isMobile && e?.activePayload) setActiveMobileData(e.activePayload[0].payload); }}>
                <CartesianGrid strokeDasharray="3 3" stroke={G} />
                <XAxis dataKey="month" tick={{ fill: AX, fontSize: axFs, angle: isMobile ? -45 : 0 }} textAnchor={isMobile ? 'end' : 'middle'} axisLine={false} tickLine={false} padding={{ left: 10, right: 10 }} height={isMobile ? 40 : 30} />
                <YAxis tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} width={isMobile ? 28 : 38} />
                {!isMobile && <Tooltip content={<CustomTooltip />} />}
                {activeCats.map(c => (
                  <Line key={c.key} type="monotone" dataKey={c.label} stroke={c.color}
                    strokeWidth={hl === c.key ? 3 : 2} dot={{ fill: c.color, r: dotR }}
                    opacity={hl === null || hl === c.key ? 1 : 0.15}
                    onMouseEnter={() => setHl(c.key)} onMouseLeave={() => setHl(null)} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      );
    }

    if (chartType === 'area') {
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          {renderMobileScrollWrapper(
            <ResponsiveContainer width="100%" height={isMobile ? 260 : CH}>
              <AreaChart {...common} onClick={(e) => { if (isMobile && e?.activePayload) setActiveMobileData(e.activePayload[0].payload); }}>
                <defs>
                  {activeCats.map(c => (
                    <linearGradient key={c.key} id={`ag-${c.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={c.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={c.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={G} />
                <XAxis dataKey="month" tick={{ fill: AX, fontSize: axFs, angle: isMobile ? -45 : 0 }} textAnchor={isMobile ? 'end' : 'middle'} axisLine={false} tickLine={false} padding={{ left: 10, right: 10 }} height={isMobile ? 40 : 30} />
                <YAxis tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} width={isMobile ? 28 : 38} />
                {!isMobile && <Tooltip content={<CustomTooltip />} />}
                {activeCats.map(c => (
                  <Area key={c.key} type="monotone" dataKey={c.label}
                    stroke={c.color} fill={`url(#ag-${c.key})`}
                    strokeWidth={hl === c.key ? 3 : 2}
                    opacity={hl === null || hl === c.key ? 1 : 0.15}
                    onMouseEnter={() => setHl(c.key)} onMouseLeave={() => setHl(null)} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      );
    }

    // bar (default)
    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        {renderMobileScrollWrapper(
          <ResponsiveContainer width="100%" height={isMobile ? 260 : CH}>
            <BarChart {...common} barCategoryGap={isMobile ? "10%" : "18%"} onClick={(e) => { if (isMobile && e?.activePayload) setActiveMobileData(e.activePayload[0].payload); }}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: AX, fontSize: axFs, angle: isMobile ? -45 : 0 }} textAnchor={isMobile ? 'end' : 'middle'} axisLine={false} tickLine={false} height={isMobile ? 40 : 30} />
              <YAxis tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} width={isMobile ? 28 : 38} />
              {!isMobile && <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />}
              {/* Added maxBarSize here to fix massive overlapping bars */}
              {activeCats.map(c => (
                <Bar
                  key={c.key}
                  dataKey={c.label}
                  fill={c.color}
                  stackId={isMobile ? "a" : undefined}
                  maxBarSize={isMobile ? 35 : 55}
                  radius={isMobile ? undefined : [3, 3, 0, 0]}
                  opacity={hl === null || hl === c.key ? 1 : 0.15}
                  onMouseEnter={() => setHl(c.key)}
                  onMouseLeave={() => setHl(null)}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  };

  /* ── JSX ──────────────────────────────────────────────────────────────── */
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      paddingTop: isMobile ? 72 : 96,
      paddingBottom: 48,
      fontFamily: "'Noto Sans Bengali','Inter',sans-serif",
      overflowX: 'hidden',
      boxSizing: 'border-box',
    }}>
      <style>{`
        .gr-scroll::-webkit-scrollbar { display:none }
        @media (max-width:639px) {
          .gr-table-wrap { -webkit-overflow-scrolling: touch; }
        }
      `}</style>

      <div style={{
        maxWidth: 1160,
        margin: '0 auto',
        padding: isMobile ? '0 10px' : '0 20px',
        boxSizing: 'border-box',
        width: '100%',
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 10, padding: '4px 12px', borderRadius: 20, background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.25)' }}>
            <span style={{ color: '#E50914', fontSize: isMobile ? 9 : 11, fontWeight: 700, letterSpacing: '0.06em' }}>
              ঢাকা মেট্রোপলিটন পুলিশ • ফেব্রুয়ারি–মে ২০২৬
            </span>
          </div>
          <h1 style={{ fontSize: isMobile ? '1.55rem' : 'clamp(26px,5vw,44px)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 8px' }}>
            গ্রাফ ও <span style={{ color: '#E50914' }}>পরিসংখ্যান</span>
          </h1>
          <p style={{ color: '#666', fontSize: isMobile ? 12 : 14, maxWidth: 480, margin: '0 auto' }}>
            ঢাকায় নথিভুক্ত অপরাধের ইন্টারেক্টিভ বিশ্লেষণ
          </p>
        </div>

        {/* ── KPI Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
          gap: isMobile ? 8 : 12,
          marginBottom: isMobile ? 16 : 28,
        }}>
          {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
        </div>

        {/* ── Month filter ── */}
        <div style={{ marginBottom: isMobile ? 12 : 22 }}>
          <p style={{ color: '#555', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>মাস ফিল্টার:</p>
          {isMobile ? (
            <div style={{ position: 'relative', width: '100%' }}>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(20,20,20,0.95)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  fontFamily: 'inherit',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <option value="all">সব মাস (একত্রে)</option>
                {MONTH_ORDER.map(m => (
                  <option key={m} value={m}>{MONTH_FULL[m] || m}</option>
                ))}
              </select>
              <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#888', fontSize: 10 }}>▼</div>
            </div>
          ) : (
            <div className="gr-scroll" style={scrollRow}>
              <button
                onClick={() => setSelectedMonth('all')}
                style={{
                  padding: '5px 14px',
                  borderRadius: 20,
                  border: `1px solid ${selectedMonth === 'all' ? '#E50914' : 'rgba(255,255,255,0.1)'}`,
                  background: selectedMonth === 'all' ? 'rgba(229,9,20,0.15)' : 'transparent',
                  color: selectedMonth === 'all' ? '#E50914' : '#555',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', flexShrink: 0,
                }}
              >
                সব মাস
              </button>
              {MONTH_ORDER.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  style={{
                    padding: '5px 14px',
                    borderRadius: 20,
                    border: `1px solid ${selectedMonth === m ? '#E50914' : 'rgba(255,255,255,0.1)'}`,
                    background: selectedMonth === m ? 'rgba(229,9,20,0.15)' : 'transparent',
                    color: selectedMonth === m ? '#E50914' : '#555',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'inherit', flexShrink: 0,
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                  }}
                >
                  {MONTH_FULL[m] || m}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Main Chart Panel ── */}
        <Card style={{
          marginBottom: isMobile ? 12 : 20,
          position: 'relative',
          background: 'linear-gradient(135deg,rgba(18,18,18,0.97),rgba(10,10,10,0.99))',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,#E50914,transparent 60%)' }} />

          {/* Chart type tabs */}
          <div className="gr-scroll" style={{ ...scrollRow, marginBottom: 14 }}>
            {CHART_TYPES.map(t => (
              <Tab key={t.id} type={t} active={chartType === t.id} onClick={() => setChartType(t.id)} />
            ))}
          </div>

          {renderChart()}

          <MobileDetailsCard />

          {/* Mobile legend strip below chart */}
          {isMobile && !['pie', 'radar'].includes(chartType) && (
            <div className="gr-scroll" style={{ ...scrollRow, marginTop: 10 }}>
              {activeCats.map(c => (
                <span key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#888', flexShrink: 0 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: c.color, display: 'inline-block' }} />
                  {c.label}
                </span>
              ))}
            </div>
          )}

          {/* Mobile pie legend */}
          {isMobile && chartType === 'pie' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {pieData.map((e, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#888' }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: e.color, display: 'inline-block' }} />
                  {e.name}
                </span>
              ))}
            </div>
          )}
        </Card>

        {/* ── Category Toggles ── */}
        <Card style={{ marginBottom: isMobile ? 12 : 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: '#aaa', fontSize: 12, fontWeight: 700 }}>অপরাধ বিভাগ</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setSelCats(new Set(CATEGORIES.map(c => c.key)))}
                style={{ padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#777', fontSize: 10, cursor: 'pointer', fontFamily: 'inherit' }}>
                সব
              </button>
              <button onClick={() => setSelCats(new Set(['murder']))}
                style={{ padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(229,9,20,0.3)', background: 'transparent', color: '#E50914', fontSize: 10, cursor: 'pointer', fontFamily: 'inherit' }}>
                রিসেট
              </button>
            </div>
          </div>
          {/* Scrollable row of chips */}
          <div className="gr-scroll" style={scrollRow}>
            {CATEGORIES.map(cat => (
              <Chip key={cat.key} cat={cat} selected={selCats.has(cat.key)} onToggle={toggleCat} />
            ))}
          </div>
        </Card>

        {/* ── Two mini charts ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 12 : 16,
          marginBottom: isMobile ? 12 : 20,
        }}>
          {/* Trend */}
          <Card>
            <p style={{ color: '#bbb', fontSize: 12, fontWeight: 700, marginBottom: 10 }}>মাসিক মোট মামলার প্রবণতা</p>
            <div style={{ width: '100%', overflow: 'hidden' }}>
              {mounted ? (
                <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
                  <AreaChart data={RAW_DATA.filter(d => selMonths.has(d.month))} margin={{ top: 4, right: 15, left: isMobile ? -25 : 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E50914" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: '#555', fontSize: axFs }} axisLine={false} tickLine={false} padding={{ left: 10, right: 10 }} />
                    <YAxis tick={{ fill: '#555', fontSize: axFs }} axisLine={false} tickLine={false} width={isMobile ? 28 : 40} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="total" name="মোট" stroke="#E50914" fill="url(#tg)" strokeWidth={2} dot={{ fill: '#E50914', r: dotR }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: isMobile ? 160 : 200 }} />
              )}
            </div>
          </Card>

          {/* Breakdown pie */}
          <Card>
            <p style={{ color: '#bbb', fontSize: 12, fontWeight: 700, marginBottom: 10 }}>অপরাধ বিভাজন</p>
            <div style={{ width: '100%', overflow: 'hidden' }}>
              {mounted ? (
                <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
                  <PieChart>
                    <Pie data={pieData.slice(0, 7)} dataKey="value" nameKey="name"
                      cx="50%" cy="50%"
                      outerRadius={isMobile ? 60 : 75}
                      innerRadius={isMobile ? 28 : 38}
                      paddingAngle={3} stroke="none">
                      {pieData.slice(0, 7).map((e, i) => (
                        <Cell key={i} fill={e.color}
                          onMouseEnter={() => setHl(e.name)} onMouseLeave={() => setHl(null)} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: isMobile ? 160 : 200 }} />
              )}
            </div>
            {/* compact legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
              {pieData.slice(0, 7).map((e, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 9, color: '#666' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 1, background: e.color, display: 'inline-block' }} />
                  {e.name}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Data Table (scrollable) ── */}
        <Card style={{ padding: '14px 0' }}>
          <p style={{ color: '#bbb', fontSize: 12, fontWeight: 700, marginBottom: 12, padding: '0 14px' }}>বিস্তারিত তথ্য সারণি</p>
          <div className="gr-table-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: 460, borderCollapse: 'separate', borderSpacing: 0, fontSize: isMobile ? 11 : 13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '7px 12px', color: '#E50914', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap', position: 'sticky', left: 0, background: '#111', zIndex: 2 }}>
                    বিভাগ
                  </th>
                  {RAW_DATA.map(d => (
                    <th key={d.month} style={{ textAlign: 'center', padding: '7px 10px', color: '#E50914', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' }}>
                      {d.month}
                    </th>
                  ))}
                  <th style={{ textAlign: 'center', padding: '7px 10px', color: '#999', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>মোট</th>
                  <th style={{ textAlign: 'center', padding: '7px 10px', color: '#999', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' }}>±</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((cat, idx) => {
                  const vals = RAW_DATA.map(d => d[cat.key]);
                  const total = vals.reduce((s, v) => s + v, 0);
                  const change = vals[vals.length - 1] - vals[0];
                  const rowBg = idx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent';
                  return (
                    <tr key={cat.key} style={{ background: rowBg }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(229,9,20,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = rowBg}
                    >
                      <td style={{ padding: '7px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'sticky', left: 0, background: idx % 2 === 0 ? '#0f0f0f' : '#0a0a0a', zIndex: 1 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 7, height: 7, borderRadius: '50%', background: cat.color, display: 'inline-block', flexShrink: 0 }} />
                          <span style={{ color: '#ccc', whiteSpace: 'nowrap' }}>{cat.label}</span>
                        </span>
                      </td>
                      {vals.map((v, i) => (
                        <td key={i} style={{ textAlign: 'center', padding: '7px 10px', color: '#aaa', borderBottom: '1px solid rgba(255,255,255,0.04)', fontVariantNumeric: 'tabular-nums' }}>{v}</td>
                      ))}
                      <td style={{ textAlign: 'center', padding: '7px 10px', color: '#fff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{total}</td>
                      <td style={{ textAlign: 'center', padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ color: change > 0 ? '#ef5350' : change < 0 ? '#66bb6a' : '#666', fontWeight: 600 }}>
                          {change > 0 ? '+' : ''}{change}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ background: 'rgba(229,9,20,0.07)' }}>
                  <td style={{ padding: '9px 12px', color: '#E50914', fontWeight: 800, position: 'sticky', left: 0, background: 'rgba(229,9,20,0.1)', zIndex: 1 }}>সর্বমোট</td>
                  {RAW_DATA.map(d => (
                    <td key={d.month} style={{ textAlign: 'center', padding: '9px 10px', color: '#E50914', fontWeight: 700 }}>{d.total}</td>
                  ))}
                  <td style={{ textAlign: 'center', padding: '9px 10px', color: '#E50914', fontWeight: 800 }}>
                    {RAW_DATA.reduce((s, d) => s + d.total, 0)}
                  </td>
                  <td style={{ textAlign: 'center', padding: '9px 10px', color: '#E50914', fontWeight: 700 }}>
                    {(() => { const ch = RAW_DATA[RAW_DATA.length - 1].total - RAW_DATA[0].total; return (ch > 0 ? '+' : '') + ch; })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── Footer ── */}
        <p style={{ textAlign: 'center', color: '#2a2a2a', fontSize: 11, marginTop: 20, lineHeight: 1.7 }}>
          তথ্যসূত্র: ঢাকা মেট্রোপলিটন পুলিশ — ফেব্রুয়ারি থেকে মে ২০২৬<br />
          এই তথ্যগুলি সাংবাদিকতা ও জনস্বার্থ বিশ্লেষণের উদ্দেশ্যে উপস্থাপিত।
        </p>
      </div>
    </div>
  );
}