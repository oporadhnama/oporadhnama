(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearActivityLogs",
    ()=>clearActivityLogs,
    "createCategory",
    ()=>createCategory,
    "createPost",
    ()=>createPost,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteModerator",
    ()=>deleteModerator,
    "deletePost",
    ()=>deletePost,
    "deleteUserReport",
    ()=>deleteUserReport,
    "fetchActivityLogs",
    ()=>fetchActivityLogs,
    "fetchCategories",
    ()=>fetchCategories,
    "fetchDashboardStats",
    ()=>fetchDashboardStats,
    "fetchModerators",
    ()=>fetchModerators,
    "fetchPostById",
    ()=>fetchPostById,
    "fetchPosts",
    ()=>fetchPosts,
    "fetchPublicStats",
    ()=>fetchPublicStats,
    "fetchUserReportById",
    ()=>fetchUserReportById,
    "fetchUserReports",
    ()=>fetchUserReports,
    "loginAdmin",
    ()=>loginAdmin,
    "registerModerator",
    ()=>registerModerator,
    "submitPublicTip",
    ()=>submitPublicTip,
    "updatePost",
    ()=>updatePost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Use environment variable for API base URL.
// Accept either a bare backend URL or one that accidentally ends in /api.
const rawApiUrl = ("TURBOPACK compile-time value", "http://localhost:8000") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_URL || 'https://oporadhnama.onrender.com';
const API_BASE = rawApiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
const isBrowser = ("TURBOPACK compile-time value", "object") !== 'undefined';
/**
 * Core fetch wrapper that injects JWT auth header when available.
 */ async function apiFetch(endpoint, options = {}) {
    const token = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('access_token') : "TURBOPACK unreachable";
    const headers = {
        ...options.headers || {}
    };
    // Don't set Content-Type for FormData — browser does it with boundary
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }
    // Only set Authorization header if token exists and is valid
    if (token && token !== 'null' && token !== 'undefined' && token !== '') {
        headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete headers['Authorization'];
    }
    let res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });
    // --- NEW FIX: Handle Expired/Dead Tokens ---
    // যদি টোকেন এক্সপায়ার হয়ে যায় (401 Unauthorized), ব্রাউজার থেকে ডিলিট করে দাও
    if (res.status === 401) {
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('refresh_token');
        }
        // শুধুমাত্র ডেটা দেখার (GET) রিকোয়েস্ট হলে, টোকেন ছাড়াই আবার চেষ্টা করো
        if (!options.method || options.method === 'GET') {
            delete headers['Authorization'];
            res = await fetch(`${API_BASE}${endpoint}`, {
                ...options,
                headers
            });
        }
    }
    return res;
}
async function fetchPosts(params = '') {
    const res = await apiFetch(`/api/posts/${params ? '?' + params : ''}`);
    if (!res.ok) throw new Error('সংবাদ লোড করতে সমস্যা হয়েছে');
    const data = await res.json();
    if (data && typeof data === 'object' && Array.isArray(data.results)) {
        return {
            results: data.results,
            count: data.count || 0,
            next: data.next || null,
            previous: data.previous || null
        };
    }
    if (Array.isArray(data)) {
        return {
            results: data,
            count: data.length,
            next: null,
            previous: null
        };
    }
    return {
        results: [],
        count: 0,
        next: null,
        previous: null
    };
}
async function fetchPostById(id) {
    const res = await apiFetch(`/api/posts/${id}/`);
    if (!res.ok) throw new Error('সংবাদটি পাওয়া যায়নি');
    return res.json();
}
async function fetchCategories() {
    const res = await apiFetch('/api/categories/');
    if (!res.ok) throw new Error('ক্যাটেগরি লোড করতে সমস্যা হয়েছে');
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.results)) return data.results;
    return [];
}
async function createCategory(name) {
    const res = await apiFetch('/api/categories/', {
        method: 'POST',
        body: JSON.stringify({
            name
        })
    });
    if (!res.ok) {
        const data = await res.json().catch(()=>({}));
        throw new Error(data.detail || data.name?.[0] || 'ক্যাটেগরি তৈরি করতে সমস্যা হয়েছে');
    }
    return res.json();
}
async function submitPublicTip(formData) {
    const res = await apiFetch('/api/submit/', {
        method: 'POST',
        body: formData
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || JSON.stringify(data));
    }
    return res.json();
}
async function loginAdmin(username, password) {
    const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Feature 2: credentials:'include' is required so the browser stores
        // and forwards the HttpOnly refresh_token cookie set by the backend.
        credentials: 'include',
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'লগইন ব্যর্থ হয়েছে');
    // Note: data.refresh is no longer sent by the server (it's in the cookie).
    return data;
}
async function registerModerator(userData) {
    const res = await apiFetch('/api/auth/register-moderator/', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
    return data;
}
async function fetchModerators() {
    const res = await apiFetch('/api/auth/moderators/');
    if (!res.ok) throw new Error('মডারেটর তালিকা লোড করতে সমস্যা হয়েছে');
    return res.json();
}
async function fetchDashboardStats() {
    const res = await apiFetch('/api/stats/');
    if (!res.ok) throw new Error('পরিসংখ্যান লোড করতে সমস্যা হয়েছে');
    return res.json();
}
async function createPost(formData) {
    const res = await apiFetch('/api/posts/', {
        method: 'POST',
        body: formData
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || JSON.stringify(data));
    }
    return res.json();
}
async function fetchUserReports() {
    const res = await apiFetch('/api/user-reports/');
    if (!res.ok) throw new Error('ব্যবহারকারী প্রতিবেদন লোড করতে সমস্যা হয়েছে');
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.results)) return data.results;
    return [];
}
async function fetchUserReportById(id) {
    const res = await apiFetch(`/api/user-reports/${id}/`);
    if (!res.ok) throw new Error('রিপোর্ট পাওয়া যায়নি');
    return res.json();
}
async function deleteUserReport(id) {
    const res = await apiFetch(`/api/user-reports/${id}/`, {
        method: 'DELETE'
    });
    if (res.status === 204 || res.ok) {
        return true;
    }
    try {
        const data = await res.json();
        throw new Error(data.detail || JSON.stringify(data));
    } catch  {
        throw new Error('রিপোর্ট মুছতে সমস্যা হয়েছে');
    }
}
async function deletePost(id) {
    const res = await apiFetch(`/api/posts/${id}/`, {
        method: 'DELETE'
    });
    if (res.status === 204 || res.ok) {
        return true;
    }
    try {
        const data = await res.json();
        throw new Error(data.detail || JSON.stringify(data));
    } catch  {
        throw new Error('সংবাদ মুছতে সমস্যা হয়েছে');
    }
}
async function updatePost(id, formData) {
    const res = await apiFetch(`/api/posts/${id}/`, {
        method: 'PATCH',
        body: formData
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || JSON.stringify(data));
    }
    return res.json();
}
async function fetchPublicStats() {
    const res = await apiFetch('/api/public-stats/');
    if (!res.ok) throw new Error('পরিসংখ্যান লোড করতে সমস্যা হয়েছে');
    return res.json();
}
async function deleteModerator(id) {
    const res = await apiFetch(`/api/auth/moderators/${id}/`, {
        method: 'DELETE'
    });
    if (res.status === 204 || res.ok) {
        return true;
    }
    try {
        const data = await res.json();
        throw new Error(data.error || 'মডারেটর মুছতে সমস্যা হয়েছে');
    } catch  {
        throw new Error('মডারেটর মুছতে সমস্যা হয়েছে');
    }
}
async function fetchActivityLogs() {
    const res = await apiFetch('/api/activity-logs/');
    if (!res.ok) throw new Error('অ্যাক্টিভিটি লগ লোড করতে সমস্যা হয়েছে');
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.results)) return data.results;
    return [];
}
async function clearActivityLogs() {
    const res = await apiFetch('/api/activity-logs/', {
        method: 'DELETE'
    });
    if (res.status === 204 || res.ok) {
        return true;
    }
    try {
        const data = await res.json();
        throw new Error(data.detail || 'অ্যাক্টিভিটি লগ মুছতে সমস্যা হয়েছে');
    } catch  {
        throw new Error('অ্যাক্টিভিটি লগ মুছতে সমস্যা হয়েছে');
    }
}
const __TURBOPACK__default__export__ = API_BASE;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/admin/Overview.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Overview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/newspaper.mjs [app-client] (ecmascript) <export default as Newspaper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.mjs [app-client] (ecmascript) <export default as FolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
function useAnimatedCount(target, duration = 1000) {
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnimatedCount.useEffect": ()=>{
            if (target <= 0) {
                setCount(0);
                return;
            }
            const startTime = performance.now();
            const animate = {
                "useAnimatedCount.useEffect.animate": (now)=>{
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setCount(Math.round(eased * target));
                    if (progress < 1) {
                        ref.current = requestAnimationFrame(animate);
                    }
                }
            }["useAnimatedCount.useEffect.animate"];
            ref.current = requestAnimationFrame(animate);
            return ({
                "useAnimatedCount.useEffect": ()=>cancelAnimationFrame(ref.current)
            })["useAnimatedCount.useEffect"];
        }
    }["useAnimatedCount.useEffect"], [
        target,
        duration
    ]);
    return count;
}
_s(useAnimatedCount, "wgDSH1POmZEidm8lqLungl40j2E=");
function StatCard({ card }) {
    _s1();
    const Icon = card.icon;
    const displayValue = useAnimatedCount(card.value || 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-neutral-900/60 rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 group hover:shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-11 h-11 rounded-xl flex items-center justify-center",
                        style: {
                            background: card.color + '12'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "w-5 h-5",
                            style: {
                                color: card.color
                            },
                            strokeWidth: 1.8
                        }, void 0, false, {
                            fileName: "[project]/src/admin/Overview.jsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/admin/Overview.jsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full",
                        style: {
                            color: card.color,
                            background: card.color + '12'
                        },
                        children: "Live"
                    }, void 0, false, {
                        fileName: "[project]/src/admin/Overview.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/admin/Overview.jsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-4xl font-extrabold text-white mb-1 group-hover:scale-105 transition-transform origin-left tabular-nums",
                children: displayValue
            }, void 0, false, {
                fileName: "[project]/src/admin/Overview.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-neutral-500 text-sm",
                children: card.label
            }, void 0, false, {
                fileName: "[project]/src/admin/Overview.jsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/admin/Overview.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s1(StatCard, "Xb5L4QWrz8YeMHlBA4iesav+DOc=", false, function() {
    return [
        useAnimatedCount
    ];
});
_c = StatCard;
function Overview() {
    _s2();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [recentPosts, setRecentPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Overview.useEffect": ()=>{
            Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchDashboardStats"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPosts"])('limit=5')
            ]).then({
                "Overview.useEffect": ([statsData, postsData])=>{
                    setStats(statsData);
                    setRecentPosts(Array.isArray(postsData) ? postsData : postsData.results || []);
                    setLoading(false);
                }
            }["Overview.useEffect"]).catch({
                "Overview.useEffect": ()=>setLoading(false)
            }["Overview.useEffect"]);
        }
    }["Overview.useEffect"], []);
    const cards = stats ? [
        {
            label: 'মোট সংবাদ',
            value: stats.total_posts,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__["Newspaper"],
            color: '#E50914'
        },
        {
            label: 'সক্রিয় ক্যাটেগরি',
            value: stats.total_categories,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"],
            color: '#3B82F6'
        },
        {
            label: 'মোট মডারেটর',
            value: stats.total_moderators,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            color: '#10B981'
        }
    ] : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-white",
                        children: "ড্যাশবোর্ড ওভারভিউ"
                    }, void 0, false, {
                        fileName: "[project]/src/admin/Overview.jsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-neutral-500 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/admin/Overview.jsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "লাইভ ডেটা"
                            }, void 0, false, {
                                fileName: "[project]/src/admin/Overview.jsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/admin/Overview.jsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/admin/Overview.jsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/admin/Overview.jsx",
                    lineNumber: 97,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/admin/Overview.jsx",
                lineNumber: 96,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10",
                        children: cards.map((card, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                card: card
                            }, idx, false, {
                                fileName: "[project]/src/admin/Overview.jsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/admin/Overview.jsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    recentPosts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-white mb-4",
                                children: "সাম্প্রতিক সংবাদ"
                            }, void 0, false, {
                                fileName: "[project]/src/admin/Overview.jsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-neutral-900/40 rounded-2xl border border-neutral-800 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left px-6 py-3",
                                                        children: "শিরোনাম"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/admin/Overview.jsx",
                                                        lineNumber: 116,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left px-6 py-3",
                                                        children: "ক্যাটেগরি"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/admin/Overview.jsx",
                                                        lineNumber: 117,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left px-6 py-3",
                                                        children: "বিভাগ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/admin/Overview.jsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "text-left px-6 py-3",
                                                        children: "তারিখ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/admin/Overview.jsx",
                                                        lineNumber: 119,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/admin/Overview.jsx",
                                                lineNumber: 115,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/admin/Overview.jsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: recentPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-neutral-800/30 hover:bg-neutral-800/20 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3 text-white font-medium max-w-xs truncate",
                                                            children: post.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/admin/Overview.jsx",
                                                            lineNumber: 125,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded text-[10px] font-bold",
                                                                children: post.category_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/admin/Overview.jsx",
                                                                lineNumber: 127,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/admin/Overview.jsx",
                                                            lineNumber: 126,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3 text-neutral-400",
                                                            children: post.division
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/admin/Overview.jsx",
                                                            lineNumber: 131,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-6 py-3 text-neutral-500",
                                                            children: post.date
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/admin/Overview.jsx",
                                                            lineNumber: 132,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, post.id, true, {
                                                    fileName: "[project]/src/admin/Overview.jsx",
                                                    lineNumber: 124,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/admin/Overview.jsx",
                                            lineNumber: 122,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/admin/Overview.jsx",
                                    lineNumber: 113,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/admin/Overview.jsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/admin/Overview.jsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/admin/Overview.jsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s2(Overview, "0qCUPPnE3Qe9es98GdWLjpQWwNI=");
_c1 = Overview;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "Overview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TrendingUp
]);
/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 7h6v6",
            key: "box55l"
        }
    ],
    [
        "path",
        {
            d: "m22 7-8.5 8.5-5-5L2 17",
            key: "1t1m79"
        }
    ]
];
const TrendingUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trending-up", __iconNode);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-client] (ecmascript) <export default as TrendingUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendingUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_011l0ec._.js.map