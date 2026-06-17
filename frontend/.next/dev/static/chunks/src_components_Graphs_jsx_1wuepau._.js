(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Graphs.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Graphs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarRadiusAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
/* ─── Raw Data ────────────────────────────────────────────────────────────── */ const RAW_DATA = [
    {
        month: 'ফেব্র',
        year: 2026,
        dacoity: 3,
        robbery: 22,
        murder: 16,
        speedy_trial: 4,
        rape: 37,
        other_violence_women_children: 59,
        kidnapping: 12,
        burglary: 42,
        vehicle_theft: 27,
        other_theft: 57,
        road_accident: 23,
        arms_act: 23,
        explosives: 4,
        smuggling: 5,
        narcotics: 358,
        other_cases: 349,
        total: 1041
    },
    {
        month: 'মার্চ',
        year: 2026,
        dacoity: 5,
        robbery: 25,
        murder: 24,
        speedy_trial: 7,
        rape: 56,
        other_violence_women_children: 55,
        kidnapping: 20,
        burglary: 62,
        vehicle_theft: 40,
        other_theft: 59,
        road_accident: 31,
        arms_act: 10,
        explosives: 1,
        smuggling: 7,
        narcotics: 455,
        other_cases: 448,
        total: 1305
    },
    {
        month: 'এপ্রিল',
        year: 2026,
        dacoity: 3,
        robbery: 25,
        murder: 17,
        speedy_trial: 8,
        rape: 70,
        other_violence_women_children: 98,
        kidnapping: 21,
        burglary: 44,
        vehicle_theft: 39,
        other_theft: 61,
        road_accident: 32,
        arms_act: 13,
        explosives: 1,
        smuggling: 16,
        narcotics: 563,
        other_cases: 477,
        total: 1488
    },
    {
        month: 'মে',
        year: 2026,
        dacoity: 2,
        robbery: 33,
        murder: 16,
        speedy_trial: 4,
        rape: 92,
        other_violence_women_children: 82,
        kidnapping: 13,
        burglary: 31,
        vehicle_theft: 33,
        other_theft: 59,
        road_accident: 27,
        arms_act: 10,
        explosives: 4,
        smuggling: 4,
        narcotics: 485,
        other_cases: 510,
        total: 1365
    }
];
const MONTH_FULL = {
    'ফেব্র': 'ফেব্রুয়ারি',
    'মার্চ': 'মার্চ',
    'এপ্রিল': 'এপ্রিল',
    'মে': 'মে'
};
/* ─── Categories ─────────────────────────────────────────────────────────── */ const CATEGORIES = [
    {
        key: 'dacoity',
        label: 'ডাকাতি',
        color: '#E50914'
    },
    {
        key: 'robbery',
        label: 'রাহাজানি',
        color: '#ff6b6b'
    },
    {
        key: 'murder',
        label: 'খুন',
        color: '#ff4500'
    },
    {
        key: 'speedy_trial',
        label: 'দ্রুত বিচার',
        color: '#ff8c00'
    },
    {
        key: 'rape',
        label: 'ধর্ষণ',
        color: '#ffa500'
    },
    {
        key: 'other_violence_women_children',
        label: 'নারী-শিশু নির্যাতন',
        color: '#ffd700'
    },
    {
        key: 'kidnapping',
        label: 'অপহরণ',
        color: '#9370db'
    },
    {
        key: 'burglary',
        label: 'সিঁদেল চুরি',
        color: '#7b68ee'
    },
    {
        key: 'vehicle_theft',
        label: 'গাড়ি চুরি',
        color: '#4169e1'
    },
    {
        key: 'other_theft',
        label: 'অন্য চুরি',
        color: '#00bcd4'
    },
    {
        key: 'road_accident',
        label: 'সড়ক দুর্ঘটনা',
        color: '#26c6da'
    },
    {
        key: 'arms_act',
        label: 'অস্ত্র আইন',
        color: '#66bb6a'
    },
    {
        key: 'explosives',
        label: 'বিস্ফোরক',
        color: '#ffee58'
    },
    {
        key: 'smuggling',
        label: 'চোরাচালান',
        color: '#ef9a9a'
    },
    {
        key: 'narcotics',
        label: 'মাদক',
        color: '#ab47bc'
    },
    {
        key: 'other_cases',
        label: 'অন্যান্য',
        color: '#78909c'
    }
];
const MONTH_ORDER = RAW_DATA.map(_c = (d)=>d.month);
_c1 = MONTH_ORDER;
const CHART_TYPES = [
    {
        id: 'bar',
        label: 'বার',
        icon: '▌▌'
    },
    {
        id: 'area',
        label: 'এরিয়া',
        icon: '◿'
    },
    {
        id: 'line',
        label: 'লাইন',
        icon: '〜'
    },
    {
        id: 'radar',
        label: 'রেডার',
        icon: '⬡'
    },
    {
        id: 'pie',
        label: 'পাই',
        icon: '◔'
    }
];
/* ─── useIsMobile ────────────────────────────────────────────────────────── */ function useIsMobile() {
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsMobile.useEffect": ()=>{
            const check = {
                "useIsMobile.useEffect.check": ()=>setIsMobile(window.innerWidth < 768)
            }["useIsMobile.useEffect.check"];
            check();
            window.addEventListener('resize', check);
            return ({
                "useIsMobile.useEffect": ()=>window.removeEventListener('resize', check)
            })["useIsMobile.useEffect"];
        }
    }["useIsMobile.useEffect"], []);
    return isMobile;
}
_s(useIsMobile, "0VTTNJATKABQPGLm9RVT0tKGUgU=");
function useIsSmallMobile() {
    _s1();
    const [isSmall, setIsSmall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsSmallMobile.useEffect": ()=>{
            const check = {
                "useIsSmallMobile.useEffect.check": ()=>setIsSmall(window.innerWidth < 380)
            }["useIsSmallMobile.useEffect.check"];
            check();
            window.addEventListener('resize', check);
            return ({
                "useIsSmallMobile.useEffect": ()=>window.removeEventListener('resize', check)
            })["useIsSmallMobile.useEffect"];
        }
    }["useIsSmallMobile.useEffect"], []);
    return isSmall;
}
_s1(useIsSmallMobile, "q4PdLbX/HS/0x21roilAt+jxB7M=");
/* ─── Tooltips ───────────────────────────────────────────────────────────── */ const CustomTooltip = ({ active, payload, label })=>{
    if (!active || !payload?.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'rgba(15,15,15,0.97)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(229,9,20,0.5)',
            borderRadius: 10,
            padding: '10px 14px',
            maxWidth: 220,
            fontSize: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: '#E50914',
                    fontWeight: 800,
                    marginBottom: 6,
                    fontSize: 13,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: 4
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            payload.slice(0, 8).map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 12,
                        marginBottom: 4
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: p.color,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: 130,
                                fontSize: 11
                            },
                            children: p.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: '#fff',
                                fontWeight: 700,
                                flexShrink: 0,
                                fontSize: 11
                            },
                            children: p.value?.toLocaleString()
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))),
            payload.length > 8 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: '#888',
                    fontSize: 10,
                    marginTop: 6,
                    textAlign: 'center',
                    fontStyle: 'italic'
                },
                children: [
                    "+ আরও ",
                    payload.length - 8
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 87,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Graphs.jsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = CustomTooltip;
const PieTooltip = ({ active, payload })=>{
    if (!active || !payload?.length) return null;
    const { name, value, payload: p } = payload[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'rgba(15,15,15,0.97)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(229,9,20,0.5)',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: payload[0].fill,
                    fontWeight: 800,
                    marginBottom: 4
                },
                children: name
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: '#fff'
                },
                children: [
                    "মামলা: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 99,
                        columnNumber: 43
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 99,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: '#aaa'
                },
                children: [
                    "মোট: ",
                    (value / p.total * 100).toFixed(1),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 100,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Graphs.jsx",
        lineNumber: 97,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = PieTooltip;
/* ─── UI Components ──────────────────────────────────────────────────────── */ function Card({ children, style = {} }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'rgba(15, 15, 18, 0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 14,
            padding: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            ...style
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/Graphs.jsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_c4 = Card;
const scrollRow = {
    display: 'flex',
    gap: 10,
    overflowX: 'auto',
    paddingBottom: 8,
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch'
};
/* Small fade hint shown at the trailing edge of horizontally-scrollable rows
   on mobile, so people realize there's more content off-screen. */ function EdgeFade({ side = 'right' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        style: {
            position: 'absolute',
            top: 0,
            bottom: 8,
            [side]: 0,
            width: 28,
            pointerEvents: 'none',
            background: side === 'right' ? 'linear-gradient(90deg, transparent, #08080a 85%)' : 'linear-gradient(270deg, transparent, #08080a 85%)'
        }
    }, void 0, false, {
        fileName: "[project]/src/components/Graphs.jsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_c5 = EdgeFade;
function Graphs() {
    _s2();
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chartType, setChartType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('bar');
    const [selCats, setSelCats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set([
        'murder',
        'rape',
        'dacoity'
    ]));
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [hl, setHl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeMobileData, setActiveMobileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [catsOpen, setCatsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Graphs.useEffect": ()=>{
            setActiveMobileData(null);
        }
    }["Graphs.useEffect"], [
        chartType,
        selCats,
        selectedMonth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Graphs.useEffect": ()=>{
            setMounted(true);
        }
    }["Graphs.useEffect"], []);
    const toggleCat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Graphs.useCallback[toggleCat]": (key)=>{
            setSelCats({
                "Graphs.useCallback[toggleCat]": (prev)=>{
                    const n = new Set(prev);
                    if (n.has(key)) {
                        if (n.size > 1) n.delete(key);
                    } else n.add(key);
                    return n;
                }
            }["Graphs.useCallback[toggleCat]"]);
        }
    }["Graphs.useCallback[toggleCat]"], []);
    const selMonths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Graphs.useMemo[selMonths]": ()=>{
            if (selectedMonth === 'all') return new Set(MONTH_ORDER);
            return new Set([
                selectedMonth
            ]);
        }
    }["Graphs.useMemo[selMonths]"], [
        selectedMonth
    ]);
    const activeCats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Graphs.useMemo[activeCats]": ()=>CATEGORIES.filter({
                "Graphs.useMemo[activeCats]": (c)=>selCats.has(c.key)
            }["Graphs.useMemo[activeCats]"])
    }["Graphs.useMemo[activeCats]"], [
        selCats
    ]);
    const chartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Graphs.useMemo[chartData]": ()=>RAW_DATA.filter({
                "Graphs.useMemo[chartData]": (d)=>selMonths.has(d.month)
            }["Graphs.useMemo[chartData]"]).map({
                "Graphs.useMemo[chartData]": (d)=>{
                    const row = {
                        month: d.month
                    };
                    CATEGORIES.forEach({
                        "Graphs.useMemo[chartData]": (c)=>{
                            if (selCats.has(c.key)) row[c.label] = d[c.key];
                        }
                    }["Graphs.useMemo[chartData]"]);
                    row.total = d.total;
                    return row;
                }
            }["Graphs.useMemo[chartData]"])
    }["Graphs.useMemo[chartData]"], [
        selCats,
        selMonths
    ]);
    const radarData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Graphs.useMemo[radarData]": ()=>{
            const filtered = RAW_DATA.filter({
                "Graphs.useMemo[radarData].filtered": (d)=>selMonths.has(d.month)
            }["Graphs.useMemo[radarData].filtered"]);
            return CATEGORIES.filter({
                "Graphs.useMemo[radarData]": (c)=>selCats.has(c.key)
            }["Graphs.useMemo[radarData]"]).map({
                "Graphs.useMemo[radarData]": (c)=>({
                        subject: c.label,
                        value: Math.round(filtered.reduce({
                            "Graphs.useMemo[radarData]": (s, d)=>s + d[c.key]
                        }["Graphs.useMemo[radarData]"], 0) / filtered.length),
                        color: c.color
                    })
            }["Graphs.useMemo[radarData]"]);
        }
    }["Graphs.useMemo[radarData]"], [
        selCats,
        selMonths
    ]);
    const pieData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Graphs.useMemo[pieData]": ()=>{
            const filtered = RAW_DATA.filter({
                "Graphs.useMemo[pieData].filtered": (d)=>selMonths.has(d.month)
            }["Graphs.useMemo[pieData].filtered"]);
            const total = filtered.reduce({
                "Graphs.useMemo[pieData].total": (s, d)=>s + d.total
            }["Graphs.useMemo[pieData].total"], 0);
            return CATEGORIES.filter({
                "Graphs.useMemo[pieData]": (c)=>selCats.has(c.key)
            }["Graphs.useMemo[pieData]"]).map({
                "Graphs.useMemo[pieData]": (c)=>({
                        name: c.label,
                        color: c.color,
                        total,
                        value: filtered.reduce({
                            "Graphs.useMemo[pieData]": (s, d)=>s + d[c.key]
                        }["Graphs.useMemo[pieData]"], 0)
                    })
            }["Graphs.useMemo[pieData]"]).sort({
                "Graphs.useMemo[pieData]": (a, b)=>b.value - a.value
            }["Graphs.useMemo[pieData]"]);
        }
    }["Graphs.useMemo[pieData]"], [
        selCats,
        selMonths
    ]);
    const kpis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Graphs.useMemo[kpis]": ()=>{
            const months = RAW_DATA.filter({
                "Graphs.useMemo[kpis].months": (d)=>selMonths.has(d.month)
            }["Graphs.useMemo[kpis].months"]);
            const last = months[months.length - 1];
            const prev = months.length > 1 ? months[months.length - 2] : null;
            return [
                {
                    label: 'মোট মামলা',
                    color: '#E50914',
                    value: months.reduce({
                        "Graphs.useMemo[kpis]": (s, d)=>s + d.total
                    }["Graphs.useMemo[kpis]"], 0),
                    delta: prev ? last.total - prev.total : undefined
                },
                {
                    label: 'মাদক',
                    color: '#ab47bc',
                    value: months.reduce({
                        "Graphs.useMemo[kpis]": (s, d)=>s + d.narcotics
                    }["Graphs.useMemo[kpis]"], 0),
                    delta: prev ? last.narcotics - prev.narcotics : undefined
                },
                {
                    label: 'খুন',
                    color: '#ff4500',
                    value: months.reduce({
                        "Graphs.useMemo[kpis]": (s, d)=>s + d.murder
                    }["Graphs.useMemo[kpis]"], 0),
                    delta: prev ? last.murder - prev.murder : undefined
                },
                {
                    label: 'ধর্ষণ',
                    color: '#ffa500',
                    value: months.reduce({
                        "Graphs.useMemo[kpis]": (s, d)=>s + d.rape
                    }["Graphs.useMemo[kpis]"], 0),
                    delta: prev ? last.rape - prev.rape : undefined
                },
                {
                    label: 'নারী-শিশু',
                    color: '#ffd700',
                    value: months.reduce({
                        "Graphs.useMemo[kpis]": (s, d)=>s + d.other_violence_women_children
                    }["Graphs.useMemo[kpis]"], 0),
                    delta: prev ? last.other_violence_women_children - prev.other_violence_women_children : undefined
                },
                {
                    label: 'অপহরণ',
                    color: '#9370db',
                    value: months.reduce({
                        "Graphs.useMemo[kpis]": (s, d)=>s + d.kidnapping
                    }["Graphs.useMemo[kpis]"], 0),
                    delta: prev ? last.kidnapping - prev.kidnapping : undefined
                }
            ];
        }
    }["Graphs.useMemo[kpis]"], [
        selMonths
    ]);
    const singleMonthData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Graphs.useMemo[singleMonthData]": ()=>{
            if (selectedMonth === 'all') return [];
            const row = RAW_DATA.find({
                "Graphs.useMemo[singleMonthData].row": (d)=>d.month === selectedMonth
            }["Graphs.useMemo[singleMonthData].row"]);
            return CATEGORIES.filter({
                "Graphs.useMemo[singleMonthData]": (c)=>selCats.has(c.key)
            }["Graphs.useMemo[singleMonthData]"]).map({
                "Graphs.useMemo[singleMonthData]": (c)=>({
                        name: c.label,
                        value: row ? row[c.key] : 0,
                        color: c.color
                    })
            }["Graphs.useMemo[singleMonthData]"]).sort({
                "Graphs.useMemo[singleMonthData]": (a, b)=>b.value - a.value
            }["Graphs.useMemo[singleMonthData]"]);
        }
    }["Graphs.useMemo[singleMonthData]"], [
        selectedMonth,
        selCats
    ]);
    /* Chart layout configs */ const G = 'rgba(255,255,255,0.03)';
    const AX = '#666';
    const CH = isMobile ? isSmallMobile ? 300 : 320 : 380;
    const margin = isMobile ? {
        top: 10,
        right: 10,
        left: 2,
        bottom: 4
    } : {
        top: 15,
        right: 25,
        left: 0,
        bottom: 5
    };
    const axFs = isMobile ? 10.5 : 12;
    const handleMobileClick = (e)=>{
        if (isMobile && e?.activePayload) {
            setActiveMobileData(e.activePayload[0].payload);
        }
    };
    /* ─── Sub-components ───────────────────────────────────────────────────── */ // Mobile now respects the user's chart-type choice instead of being locked to 'bar'.
    const activeChartType = chartType;
    const MobileBottomSheet = ()=>{
        if (!isMobile || !activeMobileData || activeChartType === 'pie' || selectedMonth !== 'all') return null;
        const isRadarRow = activeChartType === 'radar';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            role: "dialog",
            "aria-label": "বিস্তারিত তথ্য",
            style: {
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
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
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 36,
                        height: 4,
                        borderRadius: 2,
                        background: 'rgba(255,255,255,0.2)',
                        margin: '0 auto 12px'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 14,
                        flexShrink: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                fontSize: 17,
                                fontWeight: 800,
                                color: '#fff'
                            },
                            children: isRadarRow ? activeMobileData.subject : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    activeMobileData.month,
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#E50914'
                                        },
                                        children: "২০২৬"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 292,
                                        columnNumber: 42
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveMobileData(null),
                            "aria-label": "বন্ধ করুন",
                            style: {
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: 36,
                                height: 36,
                                color: '#fff',
                                fontSize: 16,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 289,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        overflowY: 'auto',
                        WebkitOverflowScrolling: 'touch'
                    },
                    children: isRadarRow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 14px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.05)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    background: activeMobileData.color,
                                    flexShrink: 0,
                                    boxShadow: `0 0 8px ${activeMobileData.color}88`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 305,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#fff',
                                    fontWeight: 800,
                                    fontSize: 20
                                },
                                children: activeMobileData.value
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 306,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#888',
                                    fontSize: 12
                                },
                                children: "গড় মাসিক মামলা"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 307,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 304,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 10
                        },
                        children: activeCats.map((cat)=>{
                            const val = activeMobileData[cat.label];
                            if (val === undefined) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '8px 12px',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: 12,
                                    border: '1px solid rgba(255,255,255,0.05)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            background: cat.color,
                                            flexShrink: 0,
                                            boxShadow: `0 0 8px ${cat.color}88`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 316,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1,
                                            overflow: 'hidden'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#aaa',
                                                    fontSize: 11,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                },
                                                children: cat.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 318,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#fff',
                                                    fontWeight: 800,
                                                    fontSize: 14
                                                },
                                                children: val
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 319,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 317,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, cat.key, true, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 315,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 310,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Graphs.jsx",
            lineNumber: 267,
            columnNumber: 7
        }, this);
    };
    const renderChart = ()=>{
        if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: CH,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: '#444',
                    fontSize: 14
                },
                children: "লোড হচ্ছে..."
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 332,
                columnNumber: 119
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Graphs.jsx",
            lineNumber: 332,
            columnNumber: 26
        }, this);
        if (activeChartType === 'pie') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: CH,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                data: pieData,
                                dataKey: "value",
                                nameKey: "name",
                                cx: "50%",
                                cy: "50%",
                                innerRadius: isMobile ? 50 : 90,
                                outerRadius: isMobile ? 95 : 140,
                                paddingAngle: 2,
                                stroke: "none",
                                cornerRadius: 4,
                                children: pieData.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: e.color,
                                        opacity: hl === null || hl === e.name ? 1 : 0.3,
                                        style: {
                                            cursor: 'pointer',
                                            transition: 'opacity 0.2s',
                                            filter: `drop-shadow(0 4px 12px ${e.color}44)`
                                        },
                                        onMouseEnter: ()=>!isMobile && setHl(e.name),
                                        onMouseLeave: ()=>!isMobile && setHl(null),
                                        onClick: ()=>setHl(hl === e.name ? null : e.name)
                                    }, i, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 342,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 339,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PieTooltip, {}, void 0, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 351,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 351,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 338,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 337,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 336,
                columnNumber: 9
            }, this);
        }
        if (activeChartType === 'radar') {
            // Mobile: true radar charts are unreadable below ~400px wide (label collision,
            // tiny touch targets). Swap to a horizontal bar of the same averaged data so the
            // chart type stays usable and selectable instead of being a dead end.
            if (isMobile) {
                const sortedRadar = [
                    ...radarData
                ].sort((a, b)=>b.value - a.value);
                const rh = Math.max(220, sortedRadar.length * 42 + 30);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: '100%',
                        overflow: 'hidden'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: rh,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                layout: "vertical",
                                data: sortedRadar,
                                margin: {
                                    top: 5,
                                    right: 16,
                                    left: 4,
                                    bottom: 5
                                },
                                onClick: (e)=>e?.activePayload && setActiveMobileData(e.activePayload[0].payload),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        strokeDasharray: "3 3",
                                        stroke: G,
                                        horizontal: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 370,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                        type: "number",
                                        tick: {
                                            fill: AX,
                                            fontSize: axFs
                                        },
                                        axisLine: false,
                                        tickLine: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 371,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                        type: "category",
                                        dataKey: "subject",
                                        tick: {
                                            fill: '#ccc',
                                            fontSize: 11
                                        },
                                        axisLine: false,
                                        tickLine: false,
                                        width: 100
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 372,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        content: ({ active, payload })=>{
                                            if (!active || !payload?.length) return null;
                                            const d = payload[0].payload;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: 'rgba(15,15,15,0.97)',
                                                    border: '1px solid rgba(229,9,20,0.5)',
                                                    borderRadius: 10,
                                                    padding: '8px 12px',
                                                    fontSize: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: d.color,
                                                            fontWeight: 800
                                                        },
                                                        children: d.subject
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 378,
                                                        columnNumber: 23
                                                    }, this),
                                                    ": ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        style: {
                                                            color: '#fff'
                                                        },
                                                        children: d.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 378,
                                                        columnNumber: 93
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 377,
                                                columnNumber: 21
                                            }, this);
                                        },
                                        cursor: {
                                            fill: 'rgba(255,255,255,0.05)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                        dataKey: "value",
                                        maxBarSize: 22,
                                        radius: [
                                            0,
                                            6,
                                            6,
                                            0
                                        ],
                                        children: sortedRadar.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                fill: e.color
                                            }, i, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 383,
                                                columnNumber: 46
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 382,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 368,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                textAlign: 'center',
                                fontSize: 11,
                                color: '#555',
                                marginTop: 8
                            },
                            children: "গড় মাসিক মামলার ভিত্তিতে সাজানো (রেডার দৃশ্য ডেস্কটপে উপলভ্য)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 387,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 366,
                    columnNumber: 11
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: CH,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                        data: radarData,
                        cx: "50%",
                        cy: "50%",
                        outerRadius: 140,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {
                                stroke: G
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 397,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                dataKey: "subject",
                                tick: {
                                    fill: '#888',
                                    fontSize: 12
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 398,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarRadiusAxis"], {
                                tick: {
                                    fill: '#444',
                                    fontSize: 10
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 399,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                dataKey: "value",
                                stroke: "#E50914",
                                fill: "#E50914",
                                fillOpacity: 0.25,
                                dot: {
                                    fill: '#E50914',
                                    r: 4
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 400,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 401,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 401,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 396,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 395,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 394,
                columnNumber: 9
            }, this);
        }
        if (selectedMonth !== 'all' && [
            'line',
            'area'
        ].includes(activeChartType)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: CH,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666',
                    fontSize: 13,
                    gap: 12,
                    textAlign: 'center',
                    padding: '0 20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: '📊 এই মাসের ট্রেন্ড দেখার জন্য অনুগ্রহ করে "সব মাস" নির্বাচন করুন।'
                    }, void 0, false, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectedMonth('all'),
                        style: {
                            padding: '10px 20px',
                            borderRadius: 24,
                            background: '#E50914',
                            color: '#fff',
                            border: 'none',
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            boxShadow: '0 4px 12px rgba(229,9,20,0.4)',
                            minHeight: 44
                        },
                        children: "সব মাস দেখুন"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 412,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 410,
                columnNumber: 9
            }, this);
        }
        if (selectedMonth !== 'all' && activeChartType === 'bar') {
            const singleH = Math.max(isMobile ? 260 : CH, activeCats.length * 44 + 40);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: singleH,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                        layout: "vertical",
                        data: singleMonthData,
                        margin: {
                            top: 5,
                            right: 16,
                            left: isMobile ? 4 : 0,
                            bottom: 5
                        },
                        onClick: isMobile ? (e)=>e?.activePayload && setActiveMobileData(e.activePayload[0].payload) : undefined,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: G,
                                horizontal: false
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 426,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                type: "number",
                                tick: {
                                    fill: AX,
                                    fontSize: axFs
                                },
                                axisLine: false,
                                tickLine: false
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 427,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                type: "category",
                                dataKey: "name",
                                tick: {
                                    fill: '#ccc',
                                    fontSize: isMobile ? 10.5 : 11
                                },
                                axisLine: false,
                                tickLine: false,
                                width: isMobile ? 92 : 120
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 428,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                content: ({ active, payload })=>{
                                    if (!active || !payload?.length) return null;
                                    const d = payload[0].payload;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'rgba(15,15,15,0.97)',
                                            border: '1px solid rgba(229,9,20,0.5)',
                                            borderRadius: 10,
                                            padding: '8px 12px',
                                            fontSize: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: d.color,
                                                    fontWeight: 800
                                                },
                                                children: d.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 434,
                                                columnNumber: 21
                                            }, this),
                                            ": ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                style: {
                                                    color: '#fff'
                                                },
                                                children: d.value
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 434,
                                                columnNumber: 88
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 433,
                                        columnNumber: 19
                                    }, this);
                                },
                                cursor: {
                                    fill: 'rgba(255,255,255,0.05)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 429,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "value",
                                fill: "#E50914",
                                maxBarSize: isMobile ? 20 : 26,
                                radius: [
                                    0,
                                    6,
                                    6,
                                    0
                                ],
                                children: singleMonthData.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: e.color
                                    }, i, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 440,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 438,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 424,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 423,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 422,
                columnNumber: 9
            }, this);
        }
        const common = {
            data: chartData,
            margin
        };
        if (activeChartType === 'line') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: CH,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                        ...common,
                        onClick: handleMobileClick,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: G,
                                vertical: false
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 456,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "month",
                                tick: {
                                    fill: AX,
                                    fontSize: axFs
                                },
                                axisLine: false,
                                tickLine: false,
                                padding: {
                                    left: isMobile ? 8 : 15,
                                    right: isMobile ? 8 : 15
                                },
                                height: 32
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 457,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fill: AX,
                                    fontSize: axFs
                                },
                                axisLine: false,
                                tickLine: false,
                                width: isMobile ? 32 : 40
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 458,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 459,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 459,
                                columnNumber: 15
                            }, this),
                            activeCats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: c.label,
                                    stroke: c.color,
                                    strokeWidth: hl === c.key ? 4 : 2,
                                    dot: {
                                        fill: '#111',
                                        stroke: c.color,
                                        strokeWidth: 2,
                                        r: isMobile ? 4 : 5
                                    },
                                    activeDot: {
                                        r: 7,
                                        fill: c.color,
                                        stroke: '#fff'
                                    },
                                    opacity: hl === null || hl === c.key ? 1 : 0.15,
                                    onMouseEnter: ()=>!isMobile && setHl(c.key),
                                    onMouseLeave: ()=>!isMobile && setHl(null)
                                }, c.key, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 461,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 455,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 454,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 453,
                columnNumber: 9
            }, this);
        }
        if (activeChartType === 'area') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: CH,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                        ...common,
                        onClick: handleMobileClick,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: activeCats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                        id: `ag-${c.key}`,
                                        x1: "0",
                                        y1: "0",
                                        x2: "0",
                                        y2: "1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "5%",
                                                stopColor: c.color,
                                                stopOpacity: 0.5
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 481,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "95%",
                                                stopColor: c.color,
                                                stopOpacity: 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 482,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, c.key, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 480,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 478,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: G,
                                vertical: false
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 486,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "month",
                                tick: {
                                    fill: AX,
                                    fontSize: axFs
                                },
                                axisLine: false,
                                tickLine: false,
                                padding: {
                                    left: isMobile ? 8 : 15,
                                    right: isMobile ? 8 : 15
                                },
                                height: 32
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 487,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fill: AX,
                                    fontSize: axFs
                                },
                                axisLine: false,
                                tickLine: false,
                                width: isMobile ? 32 : 40
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 488,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 489,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 489,
                                columnNumber: 15
                            }, this),
                            activeCats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                    type: "monotone",
                                    dataKey: c.label,
                                    stroke: c.color,
                                    fill: `url(#ag-${c.key})`,
                                    strokeWidth: hl === c.key ? 3 : 2,
                                    opacity: hl === null || hl === c.key ? 1 : 0.15,
                                    onMouseEnter: ()=>!isMobile && setHl(c.key),
                                    onMouseLeave: ()=>!isMobile && setHl(null)
                                }, c.key, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 491,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 477,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 476,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 475,
                columnNumber: 9
            }, this);
        }
        // bar (stacked on mobile for better UX / fewer overlapping tiny bars)
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                overflow: 'hidden'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: CH,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    ...common,
                    barCategoryGap: "20%",
                    onClick: handleMobileClick,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            stroke: G,
                            vertical: false
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 508,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "month",
                            tick: {
                                fill: AX,
                                fontSize: axFs
                            },
                            axisLine: false,
                            tickLine: false,
                            height: 32
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 509,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            tick: {
                                fill: AX,
                                fontSize: axFs
                            },
                            axisLine: false,
                            tickLine: false,
                            width: isMobile ? 32 : 40
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 510,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 511,
                                columnNumber: 31
                            }, this),
                            cursor: {
                                fill: 'rgba(255,255,255,0.03)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 511,
                            columnNumber: 13
                        }, this),
                        activeCats.map((c, i)=>{
                            const isTop = i === activeCats.length - 1;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: c.label,
                                fill: c.color,
                                stackId: isMobile ? "mobile-stack" : undefined,
                                maxBarSize: isMobile ? 32 : 45,
                                radius: isMobile ? isTop ? [
                                    4,
                                    4,
                                    0,
                                    0
                                ] : [
                                    0,
                                    0,
                                    0,
                                    0
                                ] : [
                                    4,
                                    4,
                                    0,
                                    0
                                ],
                                opacity: hl === null || hl === c.key ? 1 : 0.15,
                                onMouseEnter: ()=>!isMobile && setHl(c.key),
                                onMouseLeave: ()=>!isMobile && setHl(null)
                            }, c.key, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 515,
                                columnNumber: 17
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Graphs.jsx",
                    lineNumber: 507,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 506,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Graphs.jsx",
            lineNumber: 505,
            columnNumber: 7
        }, this);
    };
    /* ── JSX ──────────────────────────────────────────────────────────────── */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            background: '#08080a',
            color: '#fff',
            paddingTop: isMobile ? 'max(80px, env(safe-area-inset-top, 80px))' : 80,
            paddingBottom: isMobile ? activeMobileData ? 240 : 56 : 60,
            fontFamily: "'Noto Sans Bengali','Inter',sans-serif",
            overflowX: 'hidden',
            transition: 'padding-bottom 0.2s'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 546,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: isMobile ? '0 16px' : '0 24px',
                    width: '100%',
                    boxSizing: 'border-box'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginBottom: isMobile ? 16 : 40
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    marginBottom: 8,
                                    padding: '5px 12px',
                                    borderRadius: 30,
                                    background: 'rgba(229,9,20,0.1)',
                                    border: '1px solid rgba(229,9,20,0.2)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#E50914',
                                        fontSize: isMobile ? 10 : 12,
                                        fontWeight: 800,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase'
                                    },
                                    children: "ঢাকা মেট্রোপলিটন পুলিশ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 572,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: isMobile ? '1.4rem' : '2.8rem',
                                    fontWeight: 900,
                                    lineHeight: 1.15,
                                    margin: '0 0 4px',
                                    letterSpacing: '-0.02em'
                                },
                                children: [
                                    "অপরাধ ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#E50914'
                                        },
                                        children: "পরিসংখ্যান"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 577,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 576,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#888',
                                    fontSize: isMobile ? 12 : 15,
                                    maxWidth: 500,
                                    margin: '0 auto',
                                    fontWeight: 500
                                },
                                children: "ইন্টারেক্টিভ বিশ্লেষণ ও তথ্যাবলি • ২০২৬"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 570,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: isMobile ? 14 : 36
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(160px, 1fr))',
                                gap: isMobile ? 8 : 20
                            },
                            children: kpis.map((k, i)=>{
                                const up = k.delta > 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'linear-gradient(145deg, rgba(20,20,24,0.8), rgba(12,12,15,0.9))',
                                        border: `1px solid ${k.color}40`,
                                        borderRadius: isMobile ? 12 : 16,
                                        padding: isMobile ? '10px 12px' : '16px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: `0 6px 20px -6px ${k.color}33`,
                                        animation: `fadeIn 0.3s ease-out ${i * 0.05}s both`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: 3,
                                                background: `linear-gradient(90deg, transparent, ${k.color}, transparent)`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 604,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: '#aaa',
                                                fontSize: isMobile ? 10.5 : 12,
                                                marginBottom: 4,
                                                fontWeight: 600,
                                                letterSpacing: '0.05em',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            },
                                            children: k.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 605,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: '#fff',
                                                fontSize: isMobile ? 18 : 24,
                                                fontWeight: 900,
                                                lineHeight: 1,
                                                marginBottom: 6
                                            },
                                            children: k.value?.toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 606,
                                            columnNumber: 19
                                        }, this),
                                        k.delta !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 4,
                                                background: up ? 'rgba(239,83,80,0.1)' : 'rgba(102,187,106,0.1)',
                                                width: 'fit-content',
                                                padding: '2px 6px',
                                                borderRadius: 6
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: up ? '#ef5350' : '#66bb6a',
                                                    fontSize: isMobile ? 10 : 11,
                                                    fontWeight: 800
                                                },
                                                children: [
                                                    up ? '↑' : '↓',
                                                    " ",
                                                    Math.abs(k.delta)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 609,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 608,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 594,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 586,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 585,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: isMobile ? 12 : 36
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexWrap: isMobile ? 'wrap' : 'nowrap',
                                gap: isMobile ? 6 : 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedMonth('all'),
                                    style: {
                                        padding: isMobile ? '7px 14px' : '8px 20px',
                                        borderRadius: 30,
                                        border: `1px solid ${selectedMonth === 'all' ? '#E50914' : 'rgba(255,255,255,0.1)'}`,
                                        background: selectedMonth === 'all' ? '#E50914' : 'rgba(20,20,24,0.6)',
                                        color: selectedMonth === 'all' ? '#fff' : '#888',
                                        fontSize: isMobile ? 12.5 : 13,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        flexShrink: 0,
                                        transition: 'all 0.2s',
                                        boxShadow: selectedMonth === 'all' ? '0 4px 16px rgba(229,9,20,0.4)' : 'none',
                                        minHeight: isMobile ? 36 : 40
                                    },
                                    children: "সব মাস"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Graphs.jsx",
                                    lineNumber: 625,
                                    columnNumber: 13
                                }, this),
                                MONTH_ORDER.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedMonth(m),
                                        style: {
                                            padding: isMobile ? '7px 14px' : '8px 20px',
                                            borderRadius: 30,
                                            border: `1px solid ${selectedMonth === m ? '#fff' : 'rgba(255,255,255,0.1)'}`,
                                            background: selectedMonth === m ? '#fff' : 'rgba(20,20,24,0.6)',
                                            color: selectedMonth === m ? '#000' : '#888',
                                            fontSize: isMobile ? 12.5 : 13,
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            flexShrink: 0,
                                            transition: 'all 0.2s',
                                            minHeight: isMobile ? 36 : 40
                                        },
                                        children: MONTH_FULL[m] || m
                                    }, m, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 641,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Graphs.jsx",
                            lineNumber: 620,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 619,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                        style: {
                            marginBottom: isMobile ? 12 : 36,
                            padding: isMobile ? '12px' : '24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: isMobile ? 'stretch' : 'center',
                                    gap: isMobile ? 10 : 0,
                                    marginBottom: isMobile ? 10 : 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: isMobile ? 15 : 18,
                                            fontWeight: 800,
                                            color: '#fff',
                                            margin: 0
                                        },
                                        children: "প্রধান রেখাচিত্র"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 664,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(5, auto)',
                                            gap: isMobile ? 4 : 6,
                                            background: 'rgba(255,255,255,0.04)',
                                            borderRadius: 10,
                                            padding: 3
                                        },
                                        children: CHART_TYPES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setChartType(t.id),
                                                style: {
                                                    padding: isMobile ? '7px 0' : '6px 14px',
                                                    borderRadius: 8,
                                                    border: 'none',
                                                    background: chartType === t.id ? '#E50914' : 'transparent',
                                                    color: chartType === t.id ? '#fff' : '#777',
                                                    fontSize: isMobile ? 11.5 : 13,
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 3,
                                                    fontFamily: 'inherit',
                                                    transition: 'all 0.2s',
                                                    minHeight: isMobile ? 34 : 'auto',
                                                    whiteSpace: 'nowrap'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            opacity: 0.8,
                                                            fontSize: isMobile ? 12 : 14
                                                        },
                                                        children: t.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 688,
                                                        columnNumber: 19
                                                    }, this),
                                                    (!isMobile || isSmallMobile === false) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 689,
                                                        columnNumber: 62
                                                    }, this)
                                                ]
                                            }, t.id, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 675,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 667,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: isMobile ? 8 : 14
                                },
                                children: [
                                    isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setCatsOpen((o)=>!o),
                                        style: {
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            borderRadius: 10,
                                            padding: '8px 12px',
                                            color: '#ccc',
                                            fontSize: 12,
                                            fontWeight: 700,
                                            fontFamily: 'inherit',
                                            cursor: 'pointer',
                                            minHeight: 40
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "বিভাগ (",
                                                    activeCats.length,
                                                    "/",
                                                    CATEGORIES.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 707,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 3
                                                        },
                                                        children: [
                                                            activeCats.slice(0, 5).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        width: 7,
                                                                        height: 7,
                                                                        borderRadius: '50%',
                                                                        background: c.color,
                                                                        boxShadow: `0 0 4px ${c.color}88`
                                                                    }
                                                                }, c.key, false, {
                                                                    fileName: "[project]/src/components/Graphs.jsx",
                                                                    lineNumber: 711,
                                                                    columnNumber: 23
                                                                }, this)),
                                                            activeCats.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: '#666',
                                                                    fontSize: 10
                                                                },
                                                                children: [
                                                                    "+",
                                                                    activeCats.length - 5
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Graphs.jsx",
                                                                lineNumber: 713,
                                                                columnNumber: 47
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 709,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            transform: catsOpen ? 'rotate(180deg)' : 'none',
                                                            transition: 'transform 0.2s',
                                                            fontSize: 10,
                                                            color: '#888'
                                                        },
                                                        children: "▼"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 715,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 708,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 698,
                                        columnNumber: 15
                                    }, this),
                                    (!isMobile || catsOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: isMobile ? 8 : 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: isMobile ? 'stretch' : 'flex-end',
                                                    gap: 6,
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSelCats(new Set(CATEGORIES.map((c)=>c.key))),
                                                        style: {
                                                            flex: isMobile ? 1 : 'none',
                                                            padding: isMobile ? '6px 10px' : '6px 14px',
                                                            borderRadius: isMobile ? 8 : 24,
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            color: '#fff',
                                                            fontSize: isMobile ? 11.5 : 12,
                                                            fontWeight: 700,
                                                            cursor: 'pointer',
                                                            fontFamily: 'inherit',
                                                            minHeight: isMobile ? 34 : 'auto'
                                                        },
                                                        children: "সব নির্বাচন"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 724,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSelCats(new Set([
                                                                'murder'
                                                            ])),
                                                        style: {
                                                            flex: isMobile ? 1 : 'none',
                                                            padding: isMobile ? '6px 10px' : '6px 14px',
                                                            borderRadius: isMobile ? 8 : 24,
                                                            border: '1px solid rgba(229,9,20,0.3)',
                                                            background: 'rgba(229,9,20,0.1)',
                                                            color: '#E50914',
                                                            fontSize: isMobile ? 11.5 : 12,
                                                            fontWeight: 700,
                                                            cursor: 'pointer',
                                                            fontFamily: 'inherit',
                                                            minHeight: isMobile ? 34 : 'auto'
                                                        },
                                                        children: "রিসেট"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 728,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 723,
                                                columnNumber: 17
                                            }, this),
                                            isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 6
                                                },
                                                children: CATEGORIES.map((cat)=>{
                                                    const selected = selCats.has(cat.key);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleCat(cat.key),
                                                        style: {
                                                            padding: '5px 10px',
                                                            borderRadius: 20,
                                                            border: `1px solid ${selected ? cat.color : 'rgba(255,255,255,0.06)'}`,
                                                            background: selected ? `${cat.color}18` : 'rgba(0,0,0,0.3)',
                                                            color: selected ? '#fff' : '#666',
                                                            fontSize: 11,
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                            whiteSpace: 'nowrap',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 4,
                                                            fontFamily: 'inherit',
                                                            transition: 'all 0.15s',
                                                            minHeight: 30
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    width: 6,
                                                                    height: 6,
                                                                    borderRadius: '50%',
                                                                    background: selected ? cat.color : '#444',
                                                                    boxShadow: selected ? `0 0 4px ${cat.color}` : 'none',
                                                                    flexShrink: 0
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Graphs.jsx",
                                                                lineNumber: 755,
                                                                columnNumber: 27
                                                            }, this),
                                                            cat.label
                                                        ]
                                                    }, cat.key, true, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 741,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 735,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: 'relative'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "no-scrollbar",
                                                    style: {
                                                        display: 'flex',
                                                        gap: 8,
                                                        overflowX: 'auto',
                                                        padding: '0 0 4px'
                                                    },
                                                    children: CATEGORIES.map((cat)=>{
                                                        const selected = selCats.has(cat.key);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>toggleCat(cat.key),
                                                            style: {
                                                                padding: '8px 16px',
                                                                borderRadius: 30,
                                                                border: `1px solid ${selected ? cat.color : 'rgba(255,255,255,0.05)'}`,
                                                                background: selected ? `${cat.color}15` : 'rgba(0,0,0,0.3)',
                                                                color: selected ? '#fff' : '#888',
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                whiteSpace: 'nowrap',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 6,
                                                                fontFamily: 'inherit',
                                                                transition: 'all 0.2s',
                                                                flexShrink: 0,
                                                                minHeight: 38
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        width: 8,
                                                                        height: 8,
                                                                        borderRadius: '50%',
                                                                        background: selected ? cat.color : '#444',
                                                                        boxShadow: selected ? `0 0 6px ${cat.color}` : 'none'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Graphs.jsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 29
                                                                }, this),
                                                                cat.label
                                                            ]
                                                        }, cat.key, true, {
                                                            fileName: "[project]/src/components/Graphs.jsx",
                                                            lineNumber: 770,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Graphs.jsx",
                                                    lineNumber: 763,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 762,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 721,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 696,
                                columnNumber: 11
                            }, this),
                            renderChart(),
                            isMobile && ![
                                'pie'
                            ].includes(activeChartType) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '4px 10px',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    padding: '8px 0 4px',
                                    borderTop: '1px solid rgba(255,255,255,0.04)'
                                },
                                children: activeCats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            fontSize: 10.5,
                                            color: '#999',
                                            fontWeight: 600
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: 7,
                                                    height: 7,
                                                    borderRadius: '50%',
                                                    background: c.color,
                                                    display: 'inline-block',
                                                    boxShadow: `0 0 3px ${c.color}66`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 806,
                                                columnNumber: 19
                                            }, this),
                                            c.label
                                        ]
                                    }, c.key, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 805,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 799,
                                columnNumber: 13
                            }, this),
                            isMobile && ![
                                'pie',
                                'radar'
                            ].includes(activeChartType) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    textAlign: 'center',
                                    fontSize: 10.5,
                                    color: '#555',
                                    marginTop: 6,
                                    fontWeight: 500
                                },
                                children: "ট্যাপ করে বিস্তারিত দেখুন"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 814,
                                columnNumber: 13
                            }, this),
                            isMobile && activeChartType === 'pie' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    textAlign: 'center',
                                    fontSize: 10.5,
                                    color: '#555',
                                    marginTop: 6,
                                    fontWeight: 500
                                },
                                children: "হাইলাইট করতে ট্যাপ করুন"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 820,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 661,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: isMobile ? 10 : 24,
                            marginBottom: 40
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                style: {
                                    padding: isMobile ? '12px' : '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: isMobile ? 10 : 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#fff',
                                                    fontSize: isMobile ? 13.5 : 16,
                                                    fontWeight: 800,
                                                    margin: 0
                                                },
                                                children: "মোট মামলা (মাসিক)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 830,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: 'rgba(229,9,20,0.1)',
                                                    color: '#E50914',
                                                    fontSize: 10,
                                                    padding: '3px 8px',
                                                    borderRadius: 8,
                                                    fontWeight: 700
                                                },
                                                children: "TREND"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 831,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 829,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '100%',
                                            overflow: 'hidden'
                                        },
                                        children: mounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: isMobile ? 150 : 180,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                                data: RAW_DATA.filter((d)=>selMonths.has(d.month)),
                                                margin: {
                                                    top: 5,
                                                    right: 8,
                                                    left: 0,
                                                    bottom: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                            id: "tg-mini",
                                                            x1: "0",
                                                            y1: "0",
                                                            x2: "0",
                                                            y2: "1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                    offset: "5%",
                                                                    stopColor: "#E50914",
                                                                    stopOpacity: 0.4
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Graphs.jsx",
                                                                    lineNumber: 839,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                    offset: "95%",
                                                                    stopColor: "#E50914",
                                                                    stopOpacity: 0
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Graphs.jsx",
                                                                    lineNumber: 840,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Graphs.jsx",
                                                            lineNumber: 838,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 837,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3",
                                                        stroke: "rgba(255,255,255,0.02)",
                                                        vertical: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 843,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "month",
                                                        tick: {
                                                            fill: '#777',
                                                            fontSize: isMobile ? 10.5 : 12
                                                        },
                                                        axisLine: false,
                                                        tickLine: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 844,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        tick: {
                                                            fill: '#777',
                                                            fontSize: isMobile ? 10.5 : 12
                                                        },
                                                        axisLine: false,
                                                        tickLine: false,
                                                        width: isMobile ? 30 : undefined
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 845,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomTooltip, {}, void 0, false, {
                                                            fileName: "[project]/src/components/Graphs.jsx",
                                                            lineNumber: 846,
                                                            columnNumber: 39
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 846,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                        type: "monotone",
                                                        dataKey: "total",
                                                        stroke: "#E50914",
                                                        fill: "url(#tg-mini)",
                                                        strokeWidth: 2.5,
                                                        dot: {
                                                            fill: '#000',
                                                            stroke: '#E50914',
                                                            strokeWidth: 2,
                                                            r: 3.5
                                                        },
                                                        activeDot: {
                                                            r: 5
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 847,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 836,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 835,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                height: isMobile ? 150 : 180
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 850,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 833,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 828,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                style: {
                                    padding: isMobile ? '12px' : '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: isMobile ? 10 : 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#fff',
                                                    fontSize: isMobile ? 13.5 : 16,
                                                    fontWeight: 800,
                                                    margin: 0
                                                },
                                                children: "অপরাধ বিভাজন"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 856,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: 'rgba(255,255,255,0.05)',
                                                    color: '#aaa',
                                                    fontSize: 10,
                                                    padding: '3px 8px',
                                                    borderRadius: 8,
                                                    fontWeight: 700
                                                },
                                                children: "TOP 6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 857,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 855,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '100%',
                                            overflow: 'hidden'
                                        },
                                        children: mounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: isMobile ? 160 : 200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                        data: pieData.slice(0, 6),
                                                        dataKey: "value",
                                                        nameKey: "name",
                                                        cx: "50%",
                                                        cy: "50%",
                                                        innerRadius: isMobile ? 38 : 50,
                                                        outerRadius: isMobile ? 65 : 80,
                                                        paddingAngle: 2,
                                                        stroke: "none",
                                                        cornerRadius: 4,
                                                        children: pieData.slice(0, 6).map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: e.color
                                                            }, i, false, {
                                                                fileName: "[project]/src/components/Graphs.jsx",
                                                                lineNumber: 866,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 863,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PieTooltip, {}, void 0, false, {
                                                            fileName: "[project]/src/components/Graphs.jsx",
                                                            lineNumber: 869,
                                                            columnNumber: 39
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 869,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 862,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 861,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                height: isMobile ? 160 : 200
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Graphs.jsx",
                                            lineNumber: 872,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 859,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            gap: isMobile ? '4px 6px' : 8,
                                            justifyItems: isMobile ? 'start' : 'center',
                                            marginTop: isMobile ? 4 : 0
                                        },
                                        children: pieData.slice(0, 6).map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                    fontSize: isMobile ? 10 : 11,
                                                    color: '#888',
                                                    fontWeight: 600
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 7,
                                                            height: 7,
                                                            borderRadius: '50%',
                                                            background: e.color,
                                                            display: 'inline-block',
                                                            flexShrink: 0
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 877,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        },
                                                        children: e.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Graphs.jsx",
                                                        lineNumber: 878,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/Graphs.jsx",
                                                lineNumber: 876,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Graphs.jsx",
                                        lineNumber: 874,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Graphs.jsx",
                                lineNumber: 854,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Graphs.jsx",
                        lineNumber: 827,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 561,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileBottomSheet, {}, void 0, false, {
                fileName: "[project]/src/components/Graphs.jsx",
                lineNumber: 887,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Graphs.jsx",
        lineNumber: 536,
        columnNumber: 5
    }, this);
}
_s2(Graphs, "pBKcvFjEwPloJRaEglyOhDg1srY=", false, function() {
    return [
        useIsMobile,
        useIsSmallMobile
    ];
});
_c6 = Graphs;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "MONTH_ORDER$RAW_DATA.map");
__turbopack_context__.k.register(_c1, "MONTH_ORDER");
__turbopack_context__.k.register(_c2, "CustomTooltip");
__turbopack_context__.k.register(_c3, "PieTooltip");
__turbopack_context__.k.register(_c4, "Card");
__turbopack_context__.k.register(_c5, "EdgeFade");
__turbopack_context__.k.register(_c6, "Graphs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_Graphs_jsx_1wuepau._.js.map