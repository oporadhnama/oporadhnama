'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
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
  { id: 'area', label: 'এরিয়া', icon: '◿' },
  { id: 'line', label: 'লাইন', icon: '〜' },
  { id: 'radar', label: 'রেডার', icon: '⬡' },
  { id: 'pie', label: 'পাই', icon: '◔' },
];

/* ─── useIsMobile ────────────────────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function useIsSmallMobile() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 380);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isSmall;
}

/* ─── Tooltips ───────────────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(10px)', border: '1px solid rgba(229,9,20,0.5)', borderRadius: 10, padding: '10px 14px', maxWidth: 220, fontSize: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
      <p style={{ color: '#E50914', fontWeight: 800, marginBottom: 6, fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 4 }}>{label}</p>
      {payload.slice(0, 8).map((p, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
          <span style={{ color: p.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 130, fontSize: 11 }}>{p.name}</span>
          <span style={{ color: '#fff', fontWeight: 700, flexShrink: 0, fontSize: 11 }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
      {payload.length > 8 && (
        <p style={{ color: '#888', fontSize: 10, marginTop: 6, textAlign: 'center', fontStyle: 'italic' }}>+ আরও {payload.length - 8}</p>
      )}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  return (
    <div style={{ background: 'rgba(15,15,15,0.97)', backdropFilter: 'blur(10px)', border: '1px solid rgba(229,9,20,0.5)', borderRadius: 10, padding: '10px 14px', fontSize: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
      <p style={{ color: payload[0].fill, fontWeight: 800, marginBottom: 4 }}>{name}</p>
      <p style={{ color: '#fff' }}>মামলা: <b>{value}</b></p>
      <p style={{ color: '#aaa' }}>মোট: {((value / p.total) * 100).toFixed(1)}%</p>
    </div>
  );
};

/* ─── UI Components ──────────────────────────────────────────────────────── */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'rgba(15, 15, 18, 0.65)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 14,
      padding: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      ...style,
    }}>
      {children}
    </div>
  );
}

const scrollRow = {
  display: 'flex',
  gap: 10,
  overflowX: 'auto',
  paddingBottom: 8,
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
};

/* Small fade hint shown at the trailing edge of horizontally-scrollable rows
   on mobile, so people realize there's more content off-screen. */
function EdgeFade({ side = 'right' }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        bottom: 8,
        [side]: 0,
        width: 28,
        pointerEvents: 'none',
        background: side === 'right'
          ? 'linear-gradient(90deg, transparent, #08080a 85%)'
          : 'linear-gradient(270deg, transparent, #08080a 85%)',
      }}
    />
  );
}

/* ═══ Main Component ════════════════════════════════════════════════════════ */
export default function Graphs() {
  const isMobile = useIsMobile();
  const isSmallMobile = useIsSmallMobile();
  const [mounted, setMounted] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [selCats, setSelCats] = useState(
    new Set(['murder', 'rape', 'dacoity'])
  );
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [hl, setHl] = useState(null);
  const [activeMobileData, setActiveMobileData] = useState(null);
  const [catsOpen, setCatsOpen] = useState(false);

  useEffect(() => {
    setActiveMobileData(null);
  }, [chartType, selCats, selectedMonth]);

  useEffect(() => {
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

  /* Chart layout configs */
  const G = 'rgba(255,255,255,0.03)';
  const AX = '#666';
  const CH = isMobile ? (isSmallMobile ? 300 : 320) : 380;
  const margin = isMobile
    ? { top: 10, right: 10, left: 2, bottom: 4 }
    : { top: 15, right: 25, left: 0, bottom: 5 };
  const axFs = isMobile ? 10.5 : 12;

  const handleMobileClick = (e) => {
    if (isMobile && e?.activePayload) {
      setActiveMobileData(e.activePayload[0].payload);
    }
  };

  /* ─── Sub-components ───────────────────────────────────────────────────── */
  // Mobile now respects the user's chart-type choice instead of being locked to 'bar'.
  const activeChartType = chartType;

  const MobileBottomSheet = () => {
    if (!isMobile || !activeMobileData || activeChartType === 'pie' || selectedMonth !== 'all') return null;
    const isRadarRow = activeChartType === 'radar';
    return (
      <div
        role="dialog"
        aria-label="বিস্তারিত তথ্য"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          background: 'rgba(15, 15, 18, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(229,9,20,0.3)',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: '12px 16px max(16px, env(safe-area-inset-bottom))',
          zIndex: 1000,
          boxShadow: '0 -10px 40px rgba(0,0,0,0.6)',
          animation: 'slideUp 0.25s ease-out',
          maxHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)', margin: '0 auto 12px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexShrink: 0 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#fff' }}>
            {isRadarRow ? activeMobileData.subject : (
              <>{activeMobileData.month} <span style={{ color: '#E50914' }}>২০২৬</span></>
            )}
          </h3>
          <button
            onClick={() => setActiveMobileData(null)}
            aria-label="বন্ধ করুন"
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >✕</button>
        </div>

        <div style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {isRadarRow ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: activeMobileData.color, flexShrink: 0, boxShadow: `0 0 8px ${activeMobileData.color}88` }} />
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>{activeMobileData.value}</span>
              <span style={{ color: '#888', fontSize: 12 }}>গড় মাসিক মামলা</span>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {activeCats.map(cat => {
                const val = activeMobileData[cat.label];
                if (val === undefined) return null;
                return (
                  <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, flexShrink: 0, boxShadow: `0 0 8px ${cat.color}88` }} />
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                      <span style={{ color: '#aaa', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.label}</span>
                      <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>{val}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    if (!mounted) return <div style={{ height: CH, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#444', fontSize: 14 }}>লোড হচ্ছে...</span></div>;

    if (activeChartType === 'pie') {
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={CH}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                innerRadius={isMobile ? 50 : 90} outerRadius={isMobile ? 95 : 140} paddingAngle={2} stroke="none" cornerRadius={4}>
                {pieData.map((e, i) => (
                  <Cell key={i} fill={e.color}
                    opacity={hl === null || hl === e.name ? 1 : 0.3}
                    style={{ cursor: 'pointer', transition: 'opacity 0.2s', filter: `drop-shadow(0 4px 12px ${e.color}44)` }}
                    onMouseEnter={() => !isMobile && setHl(e.name)}
                    onMouseLeave={() => !isMobile && setHl(null)}
                    onClick={() => setHl(hl === e.name ? null : e.name)}
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (activeChartType === 'radar') {
      // Mobile: true radar charts are unreadable below ~400px wide (label collision,
      // tiny touch targets). Swap to a horizontal bar of the same averaged data so the
      // chart type stays usable and selectable instead of being a dead end.
      if (isMobile) {
        const sortedRadar = [...radarData].sort((a, b) => b.value - a.value);
        const rh = Math.max(220, sortedRadar.length * 42 + 30);
        return (
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <ResponsiveContainer width="100%" height={rh}>
              <BarChart layout="vertical" data={sortedRadar} margin={{ top: 5, right: 16, left: 4, bottom: 5 }}
                onClick={(e) => e?.activePayload && setActiveMobileData(e.activePayload[0].payload)}>
                <CartesianGrid strokeDasharray="3 3" stroke={G} horizontal={false} />
                <XAxis type="number" tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="subject" tick={{ fill: '#ccc', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{ background: 'rgba(15,15,15,0.97)', border: '1px solid rgba(229,9,20,0.5)', borderRadius: 10, padding: '8px 12px', fontSize: 12 }}>
                      <span style={{ color: d.color, fontWeight: 800 }}>{d.subject}</span>: <b style={{ color: '#fff' }}>{d.value}</b>
                    </div>
                  );
                }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="value" maxBarSize={22} radius={[0, 6, 6, 0]}>
                  {sortedRadar.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#555', marginTop: 8 }}>
              গড় মাসিক মামলার ভিত্তিতে সাজানো (রেডার দৃশ্য ডেস্কটপে উপলভ্য)
            </p>
          </div>
        );
      }
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={CH}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={140}>
              <PolarGrid stroke={G} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: '#444', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#E50914" fill="#E50914" fillOpacity={0.25} dot={{ fill: '#E50914', r: 4 }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (selectedMonth !== 'all' && ['line', 'area'].includes(activeChartType)) {
      return (
        <div style={{ height: CH, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 13, gap: 12, textAlign: 'center', padding: '0 20px' }}>
          <span>📊 এই মাসের ট্রেন্ড দেখার জন্য অনুগ্রহ করে "সব মাস" নির্বাচন করুন।</span>
          <button onClick={() => setSelectedMonth('all')} style={{ padding: '10px 20px', borderRadius: 24, background: '#E50914', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(229,9,20,0.4)', minHeight: 44 }}>
            সব মাস দেখুন
          </button>
        </div>
      );
    }

    if (selectedMonth !== 'all' && activeChartType === 'bar') {
      const singleH = Math.max(isMobile ? 260 : CH, activeCats.length * 44 + 40);
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={singleH}>
            <BarChart layout="vertical" data={singleMonthData} margin={{ top: 5, right: 16, left: isMobile ? 4 : 0, bottom: 5 }}
              onClick={isMobile ? (e) => e?.activePayload && setActiveMobileData(e.activePayload[0].payload) : undefined}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} horizontal={false} />
              <XAxis type="number" tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#ccc', fontSize: isMobile ? 10.5 : 11 }} axisLine={false} tickLine={false} width={isMobile ? 92 : 120} />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div style={{ background: 'rgba(15,15,15,0.97)', border: '1px solid rgba(229,9,20,0.5)', borderRadius: 10, padding: '8px 12px', fontSize: 12 }}>
                    <span style={{ color: d.color, fontWeight: 800 }}>{d.name}</span>: <b style={{ color: '#fff' }}>{d.value}</b>
                  </div>
                );
              }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar dataKey="value" fill="#E50914" maxBarSize={isMobile ? 20 : 26} radius={[0, 6, 6, 0]}>
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

    if (activeChartType === 'line') {
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={CH}>
            <LineChart {...common} onClick={handleMobileClick}>
              <CartesianGrid strokeDasharray="3 3" stroke={G} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} padding={{ left: isMobile ? 8 : 15, right: isMobile ? 8 : 15 }} height={32} />
              <YAxis tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} width={isMobile ? 32 : 40} />
              <Tooltip content={<CustomTooltip />} />
              {activeCats.map(c => (
                <Line key={c.key} type="monotone" dataKey={c.label} stroke={c.color}
                  strokeWidth={hl === c.key ? 4 : 2} dot={{ fill: '#111', stroke: c.color, strokeWidth: 2, r: isMobile ? 4 : 5 }}
                  activeDot={{ r: 7, fill: c.color, stroke: '#fff' }}
                  opacity={hl === null || hl === c.key ? 1 : 0.15}
                  onMouseEnter={() => !isMobile && setHl(c.key)} onMouseLeave={() => !isMobile && setHl(null)} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (activeChartType === 'area') {
      return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <ResponsiveContainer width="100%" height={CH}>
            <AreaChart {...common} onClick={handleMobileClick}>
              <defs>
                {activeCats.map(c => (
                  <linearGradient key={c.key} id={`ag-${c.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c.color} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={c.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={G} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} padding={{ left: isMobile ? 8 : 15, right: isMobile ? 8 : 15 }} height={32} />
              <YAxis tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} width={isMobile ? 32 : 40} />
              <Tooltip content={<CustomTooltip />} />
              {activeCats.map(c => (
                <Area key={c.key} type="monotone" dataKey={c.label}
                  stroke={c.color} fill={`url(#ag-${c.key})`}
                  strokeWidth={hl === c.key ? 3 : 2}
                  opacity={hl === null || hl === c.key ? 1 : 0.15}
                  onMouseEnter={() => !isMobile && setHl(c.key)} onMouseLeave={() => !isMobile && setHl(null)} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // bar (stacked on mobile for better UX / fewer overlapping tiny bars)
    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <ResponsiveContainer width="100%" height={CH}>
          <BarChart {...common} barCategoryGap="20%" onClick={handleMobileClick}>
            <CartesianGrid strokeDasharray="3 3" stroke={G} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} height={32} />
            <YAxis tick={{ fill: AX, fontSize: axFs }} axisLine={false} tickLine={false} width={isMobile ? 32 : 40} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            {activeCats.map((c, i) => {
              const isTop = i === activeCats.length - 1;
              return (
                <Bar
                  key={c.key}
                  dataKey={c.label}
                  fill={c.color}
                  stackId={isMobile ? "mobile-stack" : undefined}
                  maxBarSize={isMobile ? 32 : 45}
                  radius={isMobile ? (isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]) : [4, 4, 0, 0]}
                  opacity={hl === null || hl === c.key ? 1 : 0.15}
                  onMouseEnter={() => !isMobile && setHl(c.key)}
                  onMouseLeave={() => !isMobile && setHl(null)}
                />
              )
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  /* ── JSX ──────────────────────────────────────────────────────────────── */
  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080a',
      color: '#fff',
      paddingTop: isMobile ? 'max(80px, env(safe-area-inset-top, 80px))' : 80,
      paddingBottom: isMobile ? (activeMobileData ? 240 : 56) : 60,
      fontFamily: "'Noto Sans Bengali','Inter',sans-serif",
      overflowX: 'hidden',
      transition: 'padding-bottom 0.2s',
    }}>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display:none }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          button { -webkit-tap-highlight-color: transparent; }
        }
      `}</style>

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 24px',
        width: '100%',
        boxSizing: 'border-box',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 16 : 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8, padding: '5px 12px', borderRadius: 30, background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.2)' }}>
            <span style={{ color: '#E50914', fontSize: isMobile ? 10 : 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ঢাকা মেট্রোপলিটন পুলিশ
            </span>
          </div>
          <h1 style={{ fontSize: isMobile ? '1.4rem' : '2.8rem', fontWeight: 900, lineHeight: 1.15, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            অপরাধ <span style={{ color: '#E50914' }}>পরিসংখ্যান</span>
          </h1>
          <p style={{ color: '#888', fontSize: isMobile ? 12 : 15, maxWidth: 500, margin: '0 auto', fontWeight: 500 }}>
            ইন্টারেক্টিভ বিশ্লেষণ ও তথ্যাবলি • ২০২৬
          </p>
        </div>



        {/* KPI Grid — 2-column on mobile for full visibility without scrolling */}
        <div style={{ marginBottom: isMobile ? 14 : 36 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: isMobile ? 8 : 20,
          }}>
            {kpis.map((k, i) => {
              const up = k.delta > 0;
              return (
                <div key={i} style={{
                  background: 'linear-gradient(145deg, rgba(20,20,24,0.8), rgba(12,12,15,0.9))',
                  border: `1px solid ${k.color}40`,
                  borderRadius: isMobile ? 12 : 16,
                  padding: isMobile ? '10px 12px' : '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 6px 20px -6px ${k.color}33`,
                  animation: `fadeIn 0.3s ease-out ${i * 0.05}s both`,
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${k.color}, transparent)` }} />
                  <p style={{ color: '#aaa', fontSize: isMobile ? 10.5 : 12, marginBottom: 4, fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.label}</p>
                  <p style={{ color: '#fff', fontSize: isMobile ? 18 : 24, fontWeight: 900, lineHeight: 1, marginBottom: 6 }}>{k.value?.toLocaleString()}</p>
                  {k.delta !== undefined && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: up ? 'rgba(239,83,80,0.1)' : 'rgba(102,187,106,0.1)', width: 'fit-content', padding: '2px 6px', borderRadius: 6 }}>
                      <span style={{ color: up ? '#ef5350' : '#66bb6a', fontSize: isMobile ? 10 : 11, fontWeight: 800 }}>{up ? '↑' : '↓'} {Math.abs(k.delta)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Month Filter Pills — wrap on mobile so all months are visible */}
        <div style={{ marginBottom: isMobile ? 12 : 36 }}>
          <div style={{
            display: 'flex',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? 6 : 10,
          }}>
            <button
              onClick={() => setSelectedMonth('all')}
              style={{
                padding: isMobile ? '7px 14px' : '8px 20px', borderRadius: 30,
                border: `1px solid ${selectedMonth === 'all' ? '#E50914' : 'rgba(255,255,255,0.1)'}`,
                background: selectedMonth === 'all' ? '#E50914' : 'rgba(20,20,24,0.6)',
                color: selectedMonth === 'all' ? '#fff' : '#888',
                fontSize: isMobile ? 12.5 : 13, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', flexShrink: 0, transition: 'all 0.2s',
                boxShadow: selectedMonth === 'all' ? '0 4px 16px rgba(229,9,20,0.4)' : 'none',
                minHeight: isMobile ? 36 : 40,
              }}
            >
              সব মাস
            </button>
            {MONTH_ORDER.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                style={{
                  padding: isMobile ? '7px 14px' : '8px 20px', borderRadius: 30,
                  border: `1px solid ${selectedMonth === m ? '#fff' : 'rgba(255,255,255,0.1)'}`,
                  background: selectedMonth === m ? '#fff' : 'rgba(20,20,24,0.6)',
                  color: selectedMonth === m ? '#000' : '#888',
                  fontSize: isMobile ? 12.5 : 13, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit', flexShrink: 0, transition: 'all 0.2s',
                  minHeight: isMobile ? 36 : 40,
                }}
              >
                {MONTH_FULL[m] || m}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chart Card */}
        <Card style={{ marginBottom: isMobile ? 12 : 36, padding: isMobile ? '12px' : '24px' }}>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: isMobile ? 10 : 0, marginBottom: isMobile ? 10 : 16 }}>
            <h2 style={{ fontSize: isMobile ? 15 : 18, fontWeight: 800, color: '#fff', margin: 0 }}>প্রধান রেখাচিত্র</h2>

            {/* Chart-type switcher: full-width grid on mobile for easy tapping */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(5, auto)',
              gap: isMobile ? 4 : 6,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10, padding: 3,
            }}>
              {CHART_TYPES.map(t => (
                <button
                  key={t.id} onClick={() => setChartType(t.id)}
                  style={{
                    padding: isMobile ? '7px 0' : '6px 14px', borderRadius: 8, border: 'none',
                    background: chartType === t.id ? '#E50914' : 'transparent',
                    color: chartType === t.id ? '#fff' : '#777',
                    fontSize: isMobile ? 11.5 : 13, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
                    fontFamily: 'inherit', transition: 'all 0.2s',
                    minHeight: isMobile ? 34 : 'auto',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ opacity: 0.8, fontSize: isMobile ? 12 : 14 }}>{t.icon}</span>
                  {(!isMobile || isSmallMobile === false) && <span>{t.label}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Category toggles — collapsible on mobile with wrapping chip grid */}
          <div style={{ marginBottom: isMobile ? 8 : 14 }}>
            {isMobile && (
              <button
                onClick={() => setCatsOpen(o => !o)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, padding: '8px 12px', color: '#ccc', fontSize: 12, fontWeight: 700,
                  fontFamily: 'inherit', cursor: 'pointer', minHeight: 40,
                }}
              >
                <span>বিভাগ ({activeCats.length}/{CATEGORIES.length})</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'flex', gap: 3 }}>
                    {activeCats.slice(0, 5).map(c => (
                      <span key={c.key} style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, boxShadow: `0 0 4px ${c.color}88` }} />
                    ))}
                    {activeCats.length > 5 && <span style={{ color: '#666', fontSize: 10 }}>+{activeCats.length - 5}</span>}
                  </span>
                  <span style={{ transform: catsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', fontSize: 10, color: '#888' }}>▼</span>
                </span>
              </button>
            )}

            {(!isMobile || catsOpen) && (
              <div style={{ marginTop: isMobile ? 8 : 0 }}>
                {/* Select all / Reset */}
                <div style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'flex-end', gap: 6, marginBottom: 8 }}>
                  <button onClick={() => setSelCats(new Set(CATEGORIES.map(c => c.key)))}
                    style={{ flex: isMobile ? 1 : 'none', padding: isMobile ? '6px 10px' : '6px 14px', borderRadius: isMobile ? 8 : 24, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: isMobile ? 11.5 : 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minHeight: isMobile ? 34 : 'auto' }}>
                    সব নির্বাচন
                  </button>
                  <button onClick={() => setSelCats(new Set(['murder']))}
                    style={{ flex: isMobile ? 1 : 'none', padding: isMobile ? '6px 10px' : '6px 14px', borderRadius: isMobile ? 8 : 24, border: '1px solid rgba(229,9,20,0.3)', background: 'rgba(229,9,20,0.1)', color: '#E50914', fontSize: isMobile ? 11.5 : 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minHeight: isMobile ? 34 : 'auto' }}>
                    রিসেট
                  </button>
                </div>
                {/* Category chips — wrapping grid on mobile, scrollable on desktop */}
                {isMobile ? (
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 6,
                  }}>
                    {CATEGORIES.map(cat => {
                      const selected = selCats.has(cat.key);
                      return (
                        <button
                          key={cat.key}
                          onClick={() => toggleCat(cat.key)}
                          style={{
                            padding: '5px 10px', borderRadius: 20,
                            border: `1px solid ${selected ? cat.color : 'rgba(255,255,255,0.06)'}`,
                            background: selected ? `${cat.color}18` : 'rgba(0,0,0,0.3)',
                            color: selected ? '#fff' : '#666',
                            fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                            display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit',
                            transition: 'all 0.15s',
                            minHeight: 30,
                          }}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: selected ? cat.color : '#444', boxShadow: selected ? `0 0 4px ${cat.color}` : 'none', flexShrink: 0 }} />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <div className="no-scrollbar" style={{
                      display: 'flex', gap: 8, overflowX: 'auto',
                      padding: '0 0 4px',
                    }}>
                      {CATEGORIES.map(cat => {
                        const selected = selCats.has(cat.key);
                        return (
                          <button
                            key={cat.key}
                            onClick={() => toggleCat(cat.key)}
                            style={{
                              padding: '8px 16px', borderRadius: 30,
                              border: `1px solid ${selected ? cat.color : 'rgba(255,255,255,0.05)'}`,
                              background: selected ? `${cat.color}15` : 'rgba(0,0,0,0.3)',
                              color: selected ? '#fff' : '#888',
                              fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                              display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', transition: 'all 0.2s',
                              flexShrink: 0, minHeight: 38,
                            }}
                          >
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: selected ? cat.color : '#444', boxShadow: selected ? `0 0 6px ${cat.color}` : 'none' }} />
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {renderChart()}

          {/* Mobile legend — shows selected categories below chart for context */}
          {isMobile && !['pie'].includes(activeChartType) && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '4px 10px',
              justifyContent: 'center', marginTop: 10, padding: '8px 0 4px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
            }}>
              {activeCats.map(c => (
                <span key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: '#999', fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, display: 'inline-block', boxShadow: `0 0 3px ${c.color}66` }} />
                  {c.label}
                </span>
              ))}
            </div>
          )}

          {isMobile && !['pie', 'radar'].includes(activeChartType) && (
            <p style={{ textAlign: 'center', fontSize: 10.5, color: '#555', marginTop: 6, fontWeight: 500 }}>
              ট্যাপ করে বিস্তারিত দেখুন
            </p>
          )}

          {isMobile && activeChartType === 'pie' && (
            <p style={{ textAlign: 'center', fontSize: 10.5, color: '#555', marginTop: 6, fontWeight: 500 }}>
              হাইলাইট করতে ট্যাপ করুন
            </p>
          )}
        </Card>

        {/* Mini Analytics Widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 10 : 24, marginBottom: 40 }}>
          <Card style={{ padding: isMobile ? '12px' : '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 10 : 16 }}>
              <p style={{ color: '#fff', fontSize: isMobile ? 13.5 : 16, fontWeight: 800, margin: 0 }}>মোট মামলা (মাসিক)</p>
              <span style={{ background: 'rgba(229,9,20,0.1)', color: '#E50914', fontSize: 10, padding: '3px 8px', borderRadius: 8, fontWeight: 700 }}>TREND</span>
            </div>
            <div style={{ width: '100%', overflow: 'hidden' }}>
              {mounted ? (
                <ResponsiveContainer width="100%" height={isMobile ? 150 : 180}>
                  <AreaChart data={RAW_DATA.filter(d => selMonths.has(d.month))} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tg-mini" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E50914" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#E50914" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#777', fontSize: isMobile ? 10.5 : 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#777', fontSize: isMobile ? 10.5 : 12 }} axisLine={false} tickLine={false} width={isMobile ? 30 : undefined} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="total" stroke="#E50914" fill="url(#tg-mini)" strokeWidth={2.5} dot={{ fill: '#000', stroke: '#E50914', strokeWidth: 2, r: 3.5 }} activeDot={{ r: 5 }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : <div style={{ height: isMobile ? 150 : 180 }} />}
            </div>
          </Card>

          <Card style={{ padding: isMobile ? '12px' : '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 10 : 16 }}>
              <p style={{ color: '#fff', fontSize: isMobile ? 13.5 : 16, fontWeight: 800, margin: 0 }}>অপরাধ বিভাজন</p>
              <span style={{ background: 'rgba(255,255,255,0.05)', color: '#aaa', fontSize: 10, padding: '3px 8px', borderRadius: 8, fontWeight: 700 }}>TOP 6</span>
            </div>
            <div style={{ width: '100%', overflow: 'hidden' }}>
              {mounted ? (
                <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
                  <PieChart>
                    <Pie data={pieData.slice(0, 6)} dataKey="value" nameKey="name"
                      cx="50%" cy="50%" innerRadius={isMobile ? 38 : 50} outerRadius={isMobile ? 65 : 80} paddingAngle={2} stroke="none" cornerRadius={4}>
                      {pieData.slice(0, 6).map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <div style={{ height: isMobile ? 160 : 200 }} />}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? '4px 6px' : 8, justifyItems: isMobile ? 'start' : 'center', marginTop: isMobile ? 4 : 0 }}>
              {pieData.slice(0, 6).map((e, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: isMobile ? 10 : 11, color: '#888', fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: e.color, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
                </span>
              ))}
            </div>
          </Card>
        </div>

      </div>

      <MobileBottomSheet />
    </div>
  );
}