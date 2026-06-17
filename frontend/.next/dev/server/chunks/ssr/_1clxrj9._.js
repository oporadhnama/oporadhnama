module.exports = [
"[project]/src/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
// Use environment variable for API base URL.
// Accept either a bare backend URL or one that accidentally ends in /api.
const rawApiUrl = ("TURBOPACK compile-time value", "http://localhost:8000") || process.env.API_URL || 'https://oporadhnama.onrender.com';
const API_BASE = rawApiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
const isBrowser = ("TURBOPACK compile-time value", "undefined") !== 'undefined';
/**
 * Core fetch wrapper that injects JWT auth header when available.
 */ async function apiFetch(endpoint, options = {}) {
    const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
    const headers = {
        ...options.headers || {}
    };
    // Don't set Content-Type for FormData — browser does it with boundary
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }
    // Only set Authorization header if token exists and is valid
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        delete headers['Authorization'];
    }
    let res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });
    // --- NEW FIX: Handle Expired/Dead Tokens ---
    // যদি টোকেন এক্সপায়ার হয়ে যায় (401 Unauthorized), ব্রাউজার থেকে ডিলিট করে দাও
    if (res.status === 401) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
}),
"[project]/src/components/SearchBar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const DIVISIONS = [
    'ঢাকা',
    'চট্টগ্রাম',
    'রাজশাহী',
    'খুলনা',
    'বরিশাল',
    'সিলেট',
    'রংপুর',
    'ময়মনসিংহ'
];
function SearchBar() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedDivision, setSelectedDivision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCategories"])().then(setCategories).catch(()=>setCategories([]));
    }, []);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const params = new URLSearchParams();
        if (keyword.trim()) params.set('search', keyword.trim());
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedDivision) params.set('division', selectedDivision);
        const qs = params.toString();
        router.push(qs ? `/all-news?${qs}` : '/all-news');
    }, [
        keyword,
        selectedCategory,
        selectedDivision,
        router
    ]);
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') handleSearch();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-3xl mx-auto mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center shadow-lg shadow-black/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: keyword,
                        onChange: (e)=>setKeyword(e.target.value),
                        onKeyDown: handleKeyDown,
                        placeholder: "শিরোনাম, বর্ণনা বা এলাকা অনুসারে তথ্য খুঁজুন...",
                        className: "bg-neutral-800 text-white placeholder-neutral-500 rounded-l-md px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#E50914] transition-all duration-200"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBar.jsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSearch,
                        className: "bg-[#E50914] hover:bg-[#b8070f] px-6 py-[13.5px] rounded-r-md transition-colors duration-200 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-5 h-5 text-white",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2.5",
                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBar.jsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchBar.jsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBar.jsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBar.jsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-row gap-3 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedCategory,
                        onChange: (e)=>setSelectedCategory(e.target.value),
                        className: "bg-neutral-800 text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors w-1/2 md:w-auto md:min-w-[160px] cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "সব ক্যাটেগরি"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBar.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: cat.id,
                                    children: cat.name
                                }, cat.id, false, {
                                    fileName: "[project]/src/components/SearchBar.jsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBar.jsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedDivision,
                        onChange: (e)=>setSelectedDivision(e.target.value),
                        className: "bg-neutral-800 text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#E50914] transition-colors w-1/2 md:w-auto md:min-w-[140px] cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "সকল বিভাগ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBar.jsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            DIVISIONS.map((div)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: div,
                                    children: div
                                }, div, false, {
                                    fileName: "[project]/src/components/SearchBar.jsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBar.jsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBar.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SearchBar.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/HeroSection.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchBar.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function HeroSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex flex-col items-center justify-center text-center pt-24 md:mt-12 px-4 w-full max-w-4xl mx-auto mb-6 md:mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl md:text-5xl font-extrabold text-white leading-tight",
                children: [
                    "অন্যায়ের ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[#E50914]",
                        children: "প্রতিবাদ"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroSection.jsx",
                        lineNumber: 12,
                        columnNumber: 19
                    }, this),
                    ", সত্যের সংরক্ষণ"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroSection.jsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-neutral-300 text-sm md:text-lg mt-2 max-w-2xl leading-relaxed",
                children: "বাংলাদেশের সকল রাজনৈতিক, সামাজিক ও রাষ্ট্রীয় অপরাধের নির্মোহ এবং স্থায়ী তথ্যভাণ্ডার।"
            }, void 0, false, {
                fileName: "[project]/src/components/HeroSection.jsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/HeroSection.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-center gap-4 mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/all-news",
                        className: "text-sm text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 bg-neutral-900/40 hover:bg-neutral-800/60 rounded-full px-6 py-2.5 transition-all duration-200 font-medium",
                        children: "সকল সংবাদ দেখুন →"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroSection.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/submit",
                        className: "text-sm text-white bg-[#E50914] hover:bg-[#c40812] rounded-full px-6 py-2.5 transition-all duration-200 font-semibold shadow-lg shadow-[#E50914]/20 hover:shadow-[#E50914]/30",
                        children: "তথ্য পাঠান"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroSection.jsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroSection.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HeroSection.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/HeroSection.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HeroSection.jsx [app-ssr] (ecmascript)");
'use client';
;
}),
"[project]/components/HeroSection.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroSection$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/HeroSection.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HeroSection.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/components/StatsCounter.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatsCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-countup/build/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function toSafeNumber(value) {
    const num = Number(value);
    return Number.isFinite(num) && num >= 0 ? num : 0;
}
function normalizeStats(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return {};
    }
    return Object.fromEntries(Object.entries(data).map(([key, value])=>[
            key,
            toSafeNumber(value)
        ]));
}
function buildCategoryMap(categories) {
    if (!Array.isArray(categories)) {
        return {};
    }
    return categories.reduce((acc, category)=>{
        if (!category || typeof category !== 'object') {
            return acc;
        }
        const name = typeof category.name === 'string' ? category.name.trim() : '';
        const id = category.id;
        if (name && (typeof id === 'string' || typeof id === 'number')) {
            acc[name] = id;
        }
        return acc;
    }, {});
}
function AnimatedCount({ value, className }) {
    const mounted = ("TURBOPACK compile-time value", "undefined") !== 'undefined';
    const spanRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const safeValue = toSafeNumber(value);
    const { start, update, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCountUp"])({
        ref: spanRef,
        start: 0,
        end: safeValue,
        duration: 2.5,
        separator: ',',
        startOnMount: false,
        enableReinitialize: false,
        useEasing: true,
        useGrouping: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
    }, [
        mounted,
        safeValue,
        start,
        update
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            reset();
        };
    }, [
        reset
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: spanRef,
        className: className,
        suppressHydrationWarning: true,
        children: safeValue.toLocaleString('en-US')
    }, void 0, false, {
        fileName: "[project]/src/components/StatsCounter.jsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
function StatCard({ label, value, linkTo, hasLink }) {
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-3xl sm:text-4xl md:text-6xl font-bold font-sans tracking-tight text-white group-hover:text-[#E50914] transition-colors duration-300 leading-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedCount, {
                        value: value,
                        className: "inline-block tabular-nums min-w-[2ch]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatsCounter.jsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    "+"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StatsCounter.jsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[#E50914] mt-1 text-sm sm:text-base md:text-xl font-semibold group-hover:text-white transition-colors duration-300",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/StatsCounter.jsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
    if (hasLink && linkTo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: linkTo,
            className: "block cursor-pointer group",
            children: content
        }, void 0, false, {
            fileName: "[project]/src/components/StatsCounter.jsx",
            lineNumber: 107,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "block",
        children: content
    }, void 0, false, {
        fileName: "[project]/src/components/StatsCounter.jsx",
        lineNumber: 113,
        columnNumber: 10
    }, this);
}
function StatsCounterContent({ initialCounts = {}, initialCategories = [] }) {
    const [counts, setCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCounts);
    const [categoryMap, setCategoryMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(buildCategoryMap(initialCategories));
    const hasInitialData = initialCounts && Object.keys(initialCounts).length > 0 || Array.isArray(initialCategories) && initialCategories.length > 0;
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!hasInitialData);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const mounted = ("TURBOPACK compile-time value", "undefined") !== 'undefined';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hasInitialData) {
            setLoading(false);
            return;
        }
        let active = true;
        const load = async ()=>{
            const [statsResult, categoriesResult] = await Promise.allSettled([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPublicStats"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCategories"])()
            ]);
            if (!active) {
                return;
            }
            if (statsResult.status === 'fulfilled') {
                setCounts(normalizeStats(statsResult.value));
            } else {
                setCounts({});
                console.error('Error fetching public stats:', statsResult.reason);
            }
            if (categoriesResult.status === 'fulfilled') {
                setCategoryMap(buildCategoryMap(categoriesResult.value));
            } else {
                setCategoryMap({});
                console.error('Error fetching categories:', categoriesResult.reason);
            }
            if (statsResult.status === 'rejected' || categoriesResult.status === 'rejected') {
                setErrorMessage('পরিসংখ্যান সাময়িক অনুপলব্ধ।');
            } else {
                setErrorMessage('');
            }
            setLoading(false);
        };
        load().catch((err)=>{
            if (!active) {
                return;
            }
            console.error('Unexpected StatsCounter failure:', err);
            setCounts({});
            setCategoryMap({});
            setErrorMessage('পরিসংখ্যান সাময়িক অনুপলব্ধ।');
            setLoading(false);
        });
        return ()=>{
            active = false;
        };
    }, [
        hasInitialData,
        initialCounts,
        initialCategories
    ]);
    const totalNews = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (Object.prototype.hasOwnProperty.call(counts, 'total_posts')) {
            return toSafeNumber(counts.total_posts);
        }
        if (Object.prototype.hasOwnProperty.call(counts, 'total')) {
            return toSafeNumber(counts.total);
        }
        // Fallback: sum up only category counts, excluding metadata keys
        return Object.entries(counts).reduce((sum, [key, value])=>{
            if ([
                'total_posts',
                'total_categories',
                'total',
                'counts'
            ].includes(key)) {
                return sum;
            }
            return sum + toSafeNumber(value);
        }, 0);
    }, [
        counts
    ]);
    const murderCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>toSafeNumber(counts['খুন']), [
        counts
    ]);
    const rapeCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>toSafeNumber(counts['ধর্ষণ']), [
        counts
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center py-6 md:py-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-8 md:h-10 md:w-10 animate-spin rounded-full border-4 border-neutral-700 border-t-[#E50914]"
            }, void 0, false, {
                fileName: "[project]/src/components/StatsCounter.jsx",
                lineNumber: 207,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/StatsCounter.jsx",
            lineNumber: 206,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto mt-3 md:mt-10 px-3 md:px-4 flex justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 bg-black text-white px-4 py-4 md:px-10 md:py-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-neutral-900 w-full md:w-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center w-full md:w-auto border-b md:border-b-0 md:border-r border-neutral-800 pb-3 md:pb-0 md:pr-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "খুন",
                            value: murderCount,
                            linkTo: categoryMap['খুন'] ? `/all-news?category=${categoryMap['খুন']}` : '',
                            hasLink: Boolean(categoryMap['খুন']) && mounted
                        }, void 0, false, {
                            fileName: "[project]/src/components/StatsCounter.jsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatsCounter.jsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center w-full md:w-auto border-b md:border-b-0 md:border-r border-neutral-800 pb-3 md:pb-0 md:pr-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "ধর্ষণ",
                            value: rapeCount,
                            linkTo: categoryMap['ধর্ষণ'] ? `/all-news?category=${categoryMap['ধর্ষণ']}` : '',
                            hasLink: Boolean(categoryMap['ধর্ষণ']) && mounted
                        }, void 0, false, {
                            fileName: "[project]/src/components/StatsCounter.jsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatsCounter.jsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center w-full md:w-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/all-news",
                            className: "block cursor-pointer group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-3xl sm:text-4xl md:text-6xl font-bold font-sans tracking-tight text-white group-hover:text-[#E50914] transition-colors duration-300 leading-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedCount, {
                                            value: totalNews,
                                            className: "inline-block tabular-nums min-w-[2ch]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/StatsCounter.jsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this),
                                        "+"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/StatsCounter.jsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-neutral-300 mt-1 text-sm sm:text-base md:text-xl font-semibold group-hover:text-white transition-colors duration-300",
                                    children: "সংবাদ আর্কাইভ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StatsCounter.jsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/StatsCounter.jsx",
                            lineNumber: 234,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatsCounter.jsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StatsCounter.jsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                "aria-live": "polite",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/components/StatsCounter.jsx",
                lineNumber: 250,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/StatsCounter.jsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
class StatsCounterBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }
    componentDidCatch(error, info) {
        console.error('StatsCounter boundary caught an error:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-4xl mx-auto mt-3 md:mt-10 px-3 md:px-4 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 bg-black text-white px-4 py-4 md:px-10 md:py-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-neutral-900 w-full md:w-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl sm:text-4xl md:text-6xl font-bold font-sans tracking-tight text-white leading-none",
                                children: "0+"
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatsCounter.jsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-neutral-300 mt-1 text-sm sm:text-base md:text-xl font-semibold",
                                children: "পরিসংখ্যান সাময়িক অনুপলব্ধ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatsCounter.jsx",
                                lineNumber: 281,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/StatsCounter.jsx",
                        lineNumber: 277,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/StatsCounter.jsx",
                    lineNumber: 276,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/StatsCounter.jsx",
                lineNumber: 275,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
function StatsCounter(props = {}) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsCounterBoundary, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsCounterContent, {
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/StatsCounter.jsx",
            lineNumber: 297,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/StatsCounter.jsx",
        lineNumber: 296,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/StatsCounter.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatsCounter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/StatsCounter.jsx [app-ssr] (ecmascript)");
'use client';
;
}),
"[project]/components/StatsCounter.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatsCounter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatsCounter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/StatsCounter.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatsCounter$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/StatsCounter.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/components/NewsMarquee.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewsMarquee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NewsMarquee({ initialPosts = [] }) {
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialPosts);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialPosts.length === 0);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isPaused = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const startX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const scrollLeftRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // ── Fetch posts ──────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialPosts.length > 0) {
            setPosts(initialPosts.slice(0, 12));
            setLoading(false);
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPosts"])('limit=12').then((items)=>{
            const postsResult = Array.isArray(items) ? items : items.results || [];
            const sorted = postsResult.sort((a, b)=>new Date(b.created_at) - new Date(a.created_at)).slice(0, 12);
            setPosts(sorted);
            setLoading(false);
        }).catch(()=>setLoading(false));
    }, [
        initialPosts
    ]);
    // ── Auto-scroll animation ────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = containerRef.current;
        if (!container) return;
        let animationId;
        let lastTime = 0;
        const animate = (time)=>{
            if (!isPaused.current) {
                if (!lastTime) lastTime = time;
                const delta = time - lastTime;
                container.scrollLeft += 0.06 * delta;
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }
            lastTime = time;
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return ()=>cancelAnimationFrame(animationId);
    }, [
        loading,
        posts.length
    ]);
    // ── Wheel: non-passive listener so preventDefault() actually works ───────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = containerRef.current;
        if (!container) return;
        const onWheel = (e)=>{
            // Capture the scroll — prevent the page from scrolling at all
            e.preventDefault();
            e.stopPropagation();
            // Use deltaY for vertical wheel, deltaX for horizontal (trackpad)
            container.scrollLeft += e.deltaY || e.deltaX;
        };
        // { passive: false } is essential — React synthetic events are passive by
        // default, which means e.preventDefault() is silently ignored there.
        container.addEventListener('wheel', onWheel, {
            passive: false
        });
        return ()=>container.removeEventListener('wheel', onWheel);
    }, [
        loading
    ]);
    if (!loading && posts.length === 0) return null;
    const scrollPosts = [
        ...posts,
        ...posts
    ];
    const handleMouseEnter = ()=>{
        isPaused.current = true;
    };
    const handleMouseLeave = ()=>{
        isPaused.current = false;
    };
    // ── Touch handlers ───────────────────────────────────────────────────────
    const handleTouchStart = (e)=>{
        if (!containerRef.current) return;
        isPaused.current = true;
        startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
        scrollLeftRef.current = containerRef.current.scrollLeft;
    };
    const handleTouchMove = (e)=>{
        if (!containerRef.current) return;
        // Prevent vertical page scroll while dragging the marquee horizontally
        e.preventDefault();
        const x = e.touches[0].pageX - containerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    };
    const handleTouchEnd = ()=>{
        isPaused.current = false;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-6 md:mt-16 w-full relative z-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/95 py-3 px-8 flex items-center gap-3 border-y-2 border-[#E50914]/30 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse inline-block shadow-sm shadow-[#E50914]/50 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NewsMarquee.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold text-xl tracking-wide",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-neutral-900",
                                children: "সাম্প্রতিক "
                            }, void 0, false, {
                                fileName: "[project]/src/components/NewsMarquee.jsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#E50914]",
                                children: "খবর"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NewsMarquee.jsx",
                                lineNumber: 111,
                                columnNumber: 64
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NewsMarquee.jsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NewsMarquee.jsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NewsMarquee.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NewsMarquee.jsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        className: "overflow-x-auto whitespace-nowrap bg-neutral-950/50 border-b border-neutral-800 py-5",
                        onMouseEnter: handleMouseEnter,
                        onMouseLeave: handleMouseLeave,
                        onTouchStart: handleTouchStart,
                        onTouchMove: handleTouchMove,
                        onTouchEnd: handleTouchEnd,
                        style: {
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                            // Allow only horizontal touch-drag on this element;
                            // vertical panning is handled by the touch handlers above.
                            touchAction: 'pan-x'
                        },
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center py-4",
                            role: "status",
                            "aria-label": "লোড হচ্ছে...",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-6 h-6 border-2 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NewsMarquee.jsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sr-only",
                                    children: "লোড হচ্ছে..."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NewsMarquee.jsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/NewsMarquee.jsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gap-5 flex px-8",
                            children: scrollPosts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/news/${post.slug || post.id}`,
                                    className: "inline-block w-72 flex-shrink-0 bg-neutral-900 border border-neutral-800 hover:border-[#E50914]/40 rounded-lg p-5 shadow-md hover:shadow-xl hover:shadow-black/40 transition-all duration-300",
                                    "aria-label": `সংবাদ পড়ুন: ${post.title || ''}`,
                                    children: [
                                        post.category_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block text-[10px] font-bold uppercase tracking-wider text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded mb-3",
                                            children: post.category_name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NewsMarquee.jsx",
                                            lineNumber: 155,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-base font-bold text-white mb-2 whitespace-normal leading-snug line-clamp-2",
                                            children: post.title || ''
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NewsMarquee.jsx",
                                            lineNumber: 161,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-neutral-400 line-clamp-2 mb-3 whitespace-normal leading-relaxed",
                                            children: post.description || ''
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NewsMarquee.jsx",
                                            lineNumber: 166,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#E50914] font-semibold text-sm hover:underline transition-all duration-200 inline-block",
                                            children: "বিস্তারিত পড়ুন →"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NewsMarquee.jsx",
                                            lineNumber: 171,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `marquee-${index}`, true, {
                                    fileName: "[project]/src/components/NewsMarquee.jsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/NewsMarquee.jsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/NewsMarquee.jsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NewsMarquee.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NewsMarquee.jsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/NewsMarquee.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NewsMarquee$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NewsMarquee.jsx [app-ssr] (ecmascript)");
'use client';
;
}),
"[project]/components/NewsMarquee.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NewsMarquee$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NewsMarquee$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/NewsMarquee.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NewsMarquee$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NewsMarquee.jsx [app-ssr] (ecmascript)");
}),
"[project]/node_modules/countup.js/dist/countUp.umd.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

!function(t, e) {
    ("TURBOPACK compile-time truthy", 1) ? e(exports) : "TURBOPACK unreachable";
}(/*TURBOPACK member replacement*/ __turbopack_context__.e, function(t) {
    "use strict";
    var e = function() {
        return e = Object.assign || function(t) {
            for(var e, i = 1, s = arguments.length; i < s; i++)for(var n in e = arguments[i])Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t;
        }, e.apply(this, arguments);
    }, i = function() {
        function t(t, i, s) {
            var n = this;
            this.endVal = i, this.options = s, this.version = "2.10.0", this.defaults = {
                startVal: 0,
                decimalPlaces: 0,
                duration: 2,
                useEasing: !0,
                useGrouping: !0,
                useIndianSeparators: !1,
                smartEasingThreshold: 999,
                smartEasingAmount: 333,
                separator: ",",
                decimal: ".",
                prefix: "",
                suffix: "",
                autoAnimate: !1,
                autoAnimateDelay: 200,
                autoAnimateOnce: !1
            }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.once = !1, this.count = function(t) {
                n.startTime || (n.startTime = t);
                var e = t - n.startTime;
                n.remaining = n.duration - e, n.useEasing ? n.countDown ? n.frameVal = n.startVal - n.easingFn(e, 0, n.startVal - n.endVal, n.duration) : n.frameVal = n.easingFn(e, n.startVal, n.endVal - n.startVal, n.duration) : n.frameVal = n.startVal + (n.endVal - n.startVal) * (e / n.duration);
                var i = n.countDown ? n.frameVal < n.endVal : n.frameVal > n.endVal;
                n.frameVal = i ? n.endVal : n.frameVal, n.frameVal = Number(n.frameVal.toFixed(n.options.decimalPlaces)), n.printValue(n.frameVal), e < n.duration ? n.rAF = requestAnimationFrame(n.count) : null !== n.finalEndVal ? n.update(n.finalEndVal) : n.options.onCompleteCallback && n.options.onCompleteCallback();
            }, this.formatNumber = function(t) {
                var e, i, s, a, o = t < 0 ? "-" : "";
                e = Math.abs(t).toFixed(n.options.decimalPlaces);
                var r = (e += "").split(".");
                if (i = r[0], s = r.length > 1 ? n.options.decimal + r[1] : "", n.options.useGrouping) {
                    a = "";
                    for(var l = 3, u = 0, h = 0, p = i.length; h < p; ++h)n.options.useIndianSeparators && 4 === h && (l = 2, u = 1), 0 !== h && u % l == 0 && (a = n.options.separator + a), u++, a = i[p - h - 1] + a;
                    i = a;
                }
                return n.options.numerals && n.options.numerals.length && (i = i.replace(/[0-9]/g, function(t) {
                    return n.options.numerals[+t];
                }), s = s.replace(/[0-9]/g, function(t) {
                    return n.options.numerals[+t];
                })), o + n.options.prefix + i + s + n.options.suffix;
            }, this.easeOutExpo = function(t, e, i, s) {
                return i * (1 - Math.pow(2, -10 * t / s)) * 1024 / 1023 + e;
            }, this.options = e(e({}, this.defaults), s), this.options.enableScrollSpy && (this.options.autoAnimate = !0), void 0 !== this.options.scrollSpyDelay && (this.options.autoAnimateDelay = this.options.scrollSpyDelay), this.options.scrollSpyOnce && (this.options.autoAnimateOnce = !0), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.el = "string" == typeof t ? document.getElementById(t) : t, i = null == i ? this.parse(this.el.innerHTML) : i, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = !1), this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined", "undefined" != ("TURBOPACK compile-time value", "undefined") && this.options.autoAnimate && (this.error || "undefined" == typeof IntersectionObserver ? this.error ? console.error(this.error, t) : console.error("IntersectionObserver is not supported by this browser") : this.setupObserver());
        }
        return t.prototype.setupObserver = function() {
            var e = this, i = t.observedElements.get(this.el);
            i && i.unobserve(), t.observedElements.set(this.el, this), this.observer = new IntersectionObserver(function(t) {
                for(var i = 0, s = t; i < s.length; i++){
                    var n = s[i];
                    n.isIntersecting && e.paused && !e.once ? (e.paused = !1, e.autoAnimateTimeout = setTimeout(function() {
                        return e.start();
                    }, e.options.autoAnimateDelay), e.options.autoAnimateOnce && (e.once = !0, e.observer.disconnect())) : n.isIntersecting || e.paused || (clearTimeout(e.autoAnimateTimeout), e.reset());
                }
            }, {
                threshold: 0
            }), this.observer.observe(this.el);
        }, t.prototype.unobserve = function() {
            var e;
            clearTimeout(this.autoAnimateTimeout), null === (e = this.observer) || void 0 === e || e.disconnect(), t.observedElements.delete(this.el);
        }, t.prototype.onDestroy = function() {
            clearTimeout(this.autoAnimateTimeout), cancelAnimationFrame(this.rAF), this.paused = !0, this.unobserve(), this.options.onCompleteCallback = null, this.options.onStartCallback = null;
        }, t.prototype.determineDirectionAndSmartEasing = function() {
            var t = this.finalEndVal ? this.finalEndVal : this.endVal;
            this.countDown = this.startVal > t;
            var e = t - this.startVal;
            if (Math.abs(e) > this.options.smartEasingThreshold && this.options.useEasing) {
                this.finalEndVal = t;
                var i = this.countDown ? 1 : -1;
                this.endVal = t + i * this.options.smartEasingAmount, this.duration = this.duration / 2;
            } else this.endVal = t, this.finalEndVal = null;
            null !== this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing;
        }, t.prototype.start = function(t) {
            this.error || (this.options.onStartCallback && this.options.onStartCallback(), t && (this.options.onCompleteCallback = t), this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal));
        }, t.prototype.pauseResume = function() {
            this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused;
        }, t.prototype.reset = function() {
            clearTimeout(this.autoAnimateTimeout), cancelAnimationFrame(this.rAF), this.paused = !0, this.once = !1, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal);
        }, t.prototype.update = function(t) {
            cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), this.endVal !== this.frameVal && (this.startVal = this.frameVal, null == this.finalEndVal && this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count));
        }, t.prototype.printValue = function(t) {
            var e;
            if (this.el) {
                var i = this.formattingFn(t);
                if (null === (e = this.options.plugin) || void 0 === e ? void 0 : e.render) this.options.plugin.render(this.el, i);
                else if ("INPUT" === this.el.tagName) this.el.value = i;
                else "text" === this.el.tagName || "tspan" === this.el.tagName ? this.el.textContent = i : this.el.innerHTML = i;
            }
        }, t.prototype.ensureNumber = function(t) {
            return "number" == typeof t && !isNaN(t);
        }, t.prototype.validateValue = function(t) {
            var e = Number(t);
            return this.ensureNumber(e) ? e : (this.error = "[CountUp] invalid start or end value: ".concat(t), null);
        }, t.prototype.resetDuration = function() {
            this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration;
        }, t.prototype.parse = function(t) {
            var e = function(t) {
                return t.replace(/([.,'  ])/g, "\\$1");
            }, i = e(this.options.separator), s = e(this.options.decimal), n = t.replace(new RegExp(i, "g"), "").replace(new RegExp(s, "g"), ".");
            return parseFloat(n);
        }, t.observedElements = new WeakMap, t;
    }();
    t.CountUp = i;
});
}),
"[project]/node_modules/react-countup/build/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var countup_js = __turbopack_context__.r("[project]/node_modules/countup.js/dist/countUp.umd.js [app-ssr] (ecmascript)");
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _extends() {
    _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable";
    return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
/**
 * Silence SSR Warnings.
 * Borrowed from Formik v2.1.1, Licensed MIT.
 *
 * https://github.com/formium/formik/blob/9316a864478f8fcd4fa99a0735b1d37afdf507dc/LICENSE
 */ var useIsomorphicLayoutEffect = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : React.useEffect;
/* eslint-disable @typescript-eslint/no-explicit-any */ /**
 * Create a stable reference to a callback which is updated after each render is committed.
 * Typed version borrowed from Formik v2.2.1. Licensed MIT.
 *
 * https://github.com/formium/formik/blob/9316a864478f8fcd4fa99a0735b1d37afdf507dc/LICENSE
 */ function useEventCallback(fn) {
    var ref = React.useRef(fn);
    // we copy a ref to the callback scoped to the current state/props on each render
    useIsomorphicLayoutEffect(function() {
        ref.current = fn;
    });
    return React.useCallback(function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return ref.current.apply(void 0, args);
    }, []);
}
var createCountUpInstance = function createCountUpInstance(el, props) {
    var decimal = props.decimal, decimals = props.decimals, duration = props.duration, easingFn = props.easingFn, end = props.end, formattingFn = props.formattingFn, numerals = props.numerals, prefix = props.prefix, separator = props.separator, start = props.start, suffix = props.suffix, useEasing = props.useEasing, useGrouping = props.useGrouping, useIndianSeparators = props.useIndianSeparators, enableScrollSpy = props.enableScrollSpy, scrollSpyDelay = props.scrollSpyDelay, scrollSpyOnce = props.scrollSpyOnce, plugin = props.plugin;
    return new countup_js.CountUp(el, end, {
        startVal: start,
        duration: duration,
        decimal: decimal,
        decimalPlaces: decimals,
        easingFn: easingFn,
        formattingFn: formattingFn,
        numerals: numerals,
        separator: separator,
        prefix: prefix,
        suffix: suffix,
        plugin: plugin,
        useEasing: useEasing,
        useIndianSeparators: useIndianSeparators,
        useGrouping: useGrouping,
        enableScrollSpy: enableScrollSpy,
        scrollSpyDelay: scrollSpyDelay,
        scrollSpyOnce: scrollSpyOnce
    });
};
var _excluded$1 = [
    "ref",
    "startOnMount",
    "enableReinitialize",
    "delay",
    "onEnd",
    "onStart",
    "onPauseResume",
    "onReset",
    "onUpdate"
];
var DEFAULTS = {
    decimal: '.',
    separator: ',',
    delay: null,
    prefix: '',
    suffix: '',
    duration: 2,
    start: 0,
    decimals: 0,
    startOnMount: true,
    enableReinitialize: true,
    useEasing: true,
    useGrouping: true,
    useIndianSeparators: false
};
var useCountUp = function useCountUp(props) {
    var filteredProps = Object.fromEntries(Object.entries(props).filter(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), value = _ref2[1];
        return value !== undefined;
    }));
    var _useMemo = React.useMemo(function() {
        return _objectSpread2(_objectSpread2({}, DEFAULTS), filteredProps);
    }, [
        props
    ]), ref = _useMemo.ref, startOnMount = _useMemo.startOnMount, enableReinitialize = _useMemo.enableReinitialize, delay = _useMemo.delay, onEnd = _useMemo.onEnd, onStart = _useMemo.onStart, onPauseResume = _useMemo.onPauseResume, onReset = _useMemo.onReset, onUpdate = _useMemo.onUpdate, instanceProps = _objectWithoutProperties(_useMemo, _excluded$1);
    var countUpRef = React.useRef();
    var timerRef = React.useRef();
    var isInitializedRef = React.useRef(false);
    var createInstance = useEventCallback(function() {
        return createCountUpInstance(typeof ref === 'string' ? ref : ref.current, instanceProps);
    });
    var getCountUp = useEventCallback(function(recreate) {
        var countUp = countUpRef.current;
        if (countUp && !recreate) {
            return countUp;
        }
        var newCountUp = createInstance();
        countUpRef.current = newCountUp;
        return newCountUp;
    });
    var start = useEventCallback(function() {
        var run = function run() {
            return getCountUp(true).start(function() {
                onEnd === null || onEnd === void 0 || onEnd({
                    pauseResume: pauseResume,
                    reset: reset,
                    start: restart,
                    update: update
                });
            });
        };
        if (delay && delay > 0) {
            timerRef.current = setTimeout(run, delay * 1000);
        } else {
            run();
        }
        onStart === null || onStart === void 0 || onStart({
            pauseResume: pauseResume,
            reset: reset,
            update: update
        });
    });
    var pauseResume = useEventCallback(function() {
        getCountUp().pauseResume();
        onPauseResume === null || onPauseResume === void 0 || onPauseResume({
            reset: reset,
            start: restart,
            update: update
        });
    });
    var reset = useEventCallback(function() {
        // Quick fix for https://github.com/glennreyes/react-countup/issues/736 - should be investigated
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (getCountUp().el) {
            timerRef.current && clearTimeout(timerRef.current);
            getCountUp().reset();
            onReset === null || onReset === void 0 || onReset({
                pauseResume: pauseResume,
                start: restart,
                update: update
            });
        }
    });
    var update = useEventCallback(function(newEnd) {
        getCountUp().update(newEnd);
        onUpdate === null || onUpdate === void 0 || onUpdate({
            pauseResume: pauseResume,
            reset: reset,
            start: restart
        });
    });
    var restart = useEventCallback(function() {
        reset();
        start();
    });
    var maybeInitialize = useEventCallback(function(shouldReset) {
        if (startOnMount) {
            if (shouldReset) {
                reset();
            }
            start();
        }
    });
    React.useEffect(function() {
        if (!isInitializedRef.current) {
            isInitializedRef.current = true;
            maybeInitialize();
        } else if (enableReinitialize) {
            maybeInitialize(true);
        }
    }, [
        enableReinitialize,
        isInitializedRef,
        maybeInitialize,
        delay,
        props.start,
        props.suffix,
        props.prefix,
        props.duration,
        props.separator,
        props.decimals,
        props.decimal,
        props.formattingFn
    ]);
    React.useEffect(function() {
        return function() {
            reset();
        };
    }, [
        reset
    ]);
    return {
        start: restart,
        pauseResume: pauseResume,
        reset: reset,
        update: update,
        getCountUp: getCountUp
    };
};
var _excluded = [
    "className",
    "redraw",
    "containerProps",
    "children",
    "style"
];
var CountUp = function CountUp(props) {
    var className = props.className, redraw = props.redraw, containerProps = props.containerProps, children = props.children, style = props.style, useCountUpProps = _objectWithoutProperties(props, _excluded);
    var containerRef = React.useRef(null);
    var isInitializedRef = React.useRef(false);
    var _useCountUp = useCountUp(_objectSpread2(_objectSpread2({}, useCountUpProps), {}, {
        ref: containerRef,
        startOnMount: typeof children !== 'function' || props.delay === 0,
        // component manually restarts
        enableReinitialize: false
    })), start = _useCountUp.start, reset = _useCountUp.reset, updateCountUp = _useCountUp.update, pauseResume = _useCountUp.pauseResume, getCountUp = _useCountUp.getCountUp;
    var restart = useEventCallback(function() {
        start();
    });
    var update = useEventCallback(function(end) {
        if (!props.preserveValue) {
            reset();
        }
        updateCountUp(end);
    });
    var initializeOnMount = useEventCallback(function() {
        if (typeof props.children === 'function') {
            // Warn when user didn't use containerRef at all
            if (!(containerRef.current instanceof Element)) {
                console.error("Couldn't find attached element to hook the CountUp instance into! Try to attach \"containerRef\" from the render prop to a an Element, eg. <span ref={containerRef} />.");
                return;
            }
        }
        // unlike the hook, the CountUp component initializes on mount
        getCountUp();
    });
    React.useEffect(function() {
        initializeOnMount();
    }, [
        initializeOnMount
    ]);
    React.useEffect(function() {
        if (isInitializedRef.current) {
            update(props.end);
        }
    }, [
        props.end,
        update
    ]);
    var redrawDependencies = redraw && props;
    // if props.redraw, call this effect on every props change
    React.useEffect(function() {
        if (redraw && isInitializedRef.current) {
            restart();
        }
    }, [
        restart,
        redraw,
        redrawDependencies
    ]);
    // if not props.redraw, call this effect only when certain props are changed
    React.useEffect(function() {
        if (!redraw && isInitializedRef.current) {
            restart();
        }
    }, [
        restart,
        redraw,
        props.start,
        props.suffix,
        props.prefix,
        props.duration,
        props.separator,
        props.decimals,
        props.decimal,
        props.className,
        props.formattingFn
    ]);
    React.useEffect(function() {
        isInitializedRef.current = true;
    }, []);
    if (typeof children === 'function') {
        // TypeScript forces functional components to return JSX.Element | null.
        return children({
            countUpRef: containerRef,
            start: start,
            reset: reset,
            update: updateCountUp,
            pauseResume: pauseResume,
            getCountUp: getCountUp
        });
    }
    return /*#__PURE__*/ React.createElement("span", _extends({
        className: className,
        ref: containerRef,
        style: style
    }, containerProps), typeof props.start !== 'undefined' ? getCountUp().formattingFn(props.start) : '');
};
exports.default = CountUp;
exports.useCountUp = useCountUp;
}),
];

//# sourceMappingURL=_1clxrj9._.js.map