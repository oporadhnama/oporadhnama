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
"[project]/src/admin/AdminLogin.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLogin
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
function AdminLogin() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginAdmin"])(username, password);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            router.push('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-neutral-950 flex items-center justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-extrabold tracking-wider",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white",
                                    children: "অপরাধ"
                                }, void 0, false, {
                                    fileName: "[project]/src/admin/AdminLogin.jsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[#E50914]",
                                    children: "নামা"
                                }, void 0, false, {
                                    fileName: "[project]/src/admin/AdminLogin.jsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/admin/AdminLogin.jsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-neutral-500 text-sm mt-2",
                            children: "অ্যাডমিন প্যানেল"
                        }, void 0, false, {
                            fileName: "[project]/src/admin/AdminLogin.jsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/admin/AdminLogin.jsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "bg-neutral-900/70 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-white mb-6 text-center",
                            children: "লগইন করুন"
                        }, void 0, false, {
                            fileName: "[project]/src/admin/AdminLogin.jsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-900/30 border border-red-700 text-red-400 rounded-lg p-3 mb-5 text-sm text-center",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/admin/AdminLogin.jsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-neutral-400 text-xs font-medium mb-2",
                                    children: "ইউজারনেম"
                                }, void 0, false, {
                                    fileName: "[project]/src/admin/AdminLogin.jsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: username,
                                    onChange: (e)=>setUsername(e.target.value),
                                    required: true,
                                    placeholder: "admin",
                                    className: "w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/admin/AdminLogin.jsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/admin/AdminLogin.jsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-neutral-400 text-xs font-medium mb-2",
                                    children: "পাসওয়ার্ড"
                                }, void 0, false, {
                                    fileName: "[project]/src/admin/AdminLogin.jsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    required: true,
                                    placeholder: "••••••••",
                                    className: "w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-neutral-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/admin/AdminLogin.jsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/admin/AdminLogin.jsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full bg-[#E50914] hover:bg-[#c40812] text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm",
                            children: loading ? 'প্রবেশ করা হচ্ছে...' : 'প্রবেশ করুন'
                        }, void 0, false, {
                            fileName: "[project]/src/admin/AdminLogin.jsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/admin/AdminLogin.jsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/admin/AdminLogin.jsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/admin/AdminLogin.jsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_1y8kbu7._.js.map