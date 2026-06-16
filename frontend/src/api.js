// Use environment variable for API base URL.
// Accept either a bare backend URL or one that accidentally ends in /api.
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://oporadhnama.onrender.com';
const API_BASE = rawApiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
const isBrowser = typeof window !== 'undefined';

/**
 * Core fetch wrapper that injects JWT auth header when available.
 */
async function apiFetch(endpoint, options = {}) {
  const token = isBrowser ? window.localStorage.getItem('access_token') : '';

  const headers = {
    ...(options.headers || {}),
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
    headers,
  });

  // --- NEW FIX: Handle Expired/Dead Tokens ---
  // যদি টোকেন এক্সপায়ার হয়ে যায় (401 Unauthorized), ব্রাউজার থেকে ডিলিট করে দাও
  if (res.status === 401) {
    if (isBrowser) {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('refresh_token');
    }
    
    // শুধুমাত্র ডেটা দেখার (GET) রিকোয়েস্ট হলে, টোকেন ছাড়াই আবার চেষ্টা করো
    if (!options.method || options.method === 'GET') {
      delete headers['Authorization'];
      res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });
    }
  }

  return res;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchPosts(params = '') {
  const res = await apiFetch(`/api/posts/${params ? '?' + params : ''}`);
  if (!res.ok) throw new Error('সংবাদ লোড করতে সমস্যা হয়েছে');
  const data = await res.json();
  
  if (data && typeof data === 'object' && Array.isArray(data.results)) {
    return {
      results: data.results,
      count: data.count || 0,
      next: data.next || null,
      previous: data.previous || null,
    };
  }
  
  if (Array.isArray(data)) {
    return { results: data, count: data.length, next: null, previous: null };
  }
  
  return { results: [], count: 0, next: null, previous: null };
}

export async function fetchPostById(id) {
  const res = await apiFetch(`/api/posts/${id}/`);
  if (!res.ok) throw new Error('সংবাদটি পাওয়া যায়নি');
  return res.json();
}

export async function fetchCategories() {
  const res = await apiFetch('/api/categories/');
  if (!res.ok) throw new Error('ক্যাটেগরি লোড করতে সমস্যা হয়েছে');
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function createCategory(name) {
  const res = await apiFetch('/api/categories/', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.name?.[0] || 'ক্যাটেগরি তৈরি করতে সমস্যা হয়েছে');
  }
  return res.json();
}

export async function submitPublicTip(formData) {
  const res = await apiFetch('/api/submit/', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || JSON.stringify(data));
  }
  return res.json();
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export async function loginAdmin(username, password) {
  const res = await fetch(`${API_BASE}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'লগইন ব্যর্থ হয়েছে');
  return data;
}

export async function registerModerator(userData) {
  const res = await apiFetch('/api/auth/register-moderator/', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
  return data;
}

export async function fetchModerators() {
  const res = await apiFetch('/api/auth/moderators/');
  if (!res.ok) throw new Error('মডারেটর তালিকা লোড করতে সমস্যা হয়েছে');
  return res.json();
}

// ─── Dashboard API ────────────────────────────────────────────────────────────

export async function fetchDashboardStats() {
  const res = await apiFetch('/api/stats/');
  if (!res.ok) throw new Error('পরিসংখ্যান লোড করতে সমস্যা হয়েছে');
  return res.json();
}

export async function createPost(formData) {
  const res = await apiFetch('/api/posts/', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || JSON.stringify(data));
  }
  return res.json();
}

export async function fetchUserReports() {
  const res = await apiFetch('/api/user-reports/');
  if (!res.ok) throw new Error('ব্যবহারকারী প্রতিবেদন লোড করতে সমস্যা হয়েছে');
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function fetchUserReportById(id) {
  const res = await apiFetch(`/api/user-reports/${id}/`);
  if (!res.ok) throw new Error('রিপোর্ট পাওয়া যায়নি');
  return res.json();
}

export async function deleteUserReport(id) {
  const res = await apiFetch(`/api/user-reports/${id}/`, {
    method: 'DELETE',
  });
  if (res.status === 204 || res.ok) {
    return true;
  }
  try {
    const data = await res.json();
    throw new Error(data.detail || JSON.stringify(data));
  } catch {
    throw new Error('রিপোর্ট মুছতে সমস্যা হয়েছে');
  }
}

export async function deletePost(id) {
  const res = await apiFetch(`/api/posts/${id}/`, {
    method: 'DELETE',
  });
  if (res.status === 204 || res.ok) {
    return true;
  }
  try {
    const data = await res.json();
    throw new Error(data.detail || JSON.stringify(data));
  } catch {
    throw new Error('সংবাদ মুছতে সমস্যা হয়েছে');
  }
}

export async function updatePost(id, formData) {
  const res = await apiFetch(`/api/posts/${id}/`, {
    method: 'PATCH',
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || JSON.stringify(data));
  }
  return res.json();
}

export async function fetchPublicStats() {
  const res = await apiFetch('/api/public-stats/');
  if (!res.ok) throw new Error('পরিসংখ্যান লোড করতে সমস্যা হয়েছে');
  return res.json();
}

export async function deleteModerator(id) {
  const res = await apiFetch(`/api/auth/moderators/${id}/`, {
    method: 'DELETE',
  });
  if (res.status === 204 || res.ok) {
    return true;
  }
  try {
    const data = await res.json();
    throw new Error(data.error || 'মডারেটর মুছতে সমস্যা হয়েছে');
  } catch {
    throw new Error('মডারেটর মুছতে সমস্যা হয়েছে');
  }
}

export async function fetchActivityLogs() {
  const res = await apiFetch('/api/activity-logs/');
  if (!res.ok) throw new Error('অ্যাক্টিভিটি লগ লোড করতে সমস্যা হয়েছে');
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function clearActivityLogs() {
  const res = await apiFetch('/api/activity-logs/', {
    method: 'DELETE',
  });
  if (res.status === 204 || res.ok) {
    return true;
  }
  try {
    const data = await res.json();
    throw new Error(data.detail || 'অ্যাক্টিভিটি লগ মুছতে সমস্যা হয়েছে');
  } catch {
    throw new Error('অ্যাক্টিভিটি লগ মুছতে সমস্যা হয়েছে');
  }
}

export default API_BASE;
