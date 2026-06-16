const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://oporadhnama.onrender.com';
export const API_BASE = rawApiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');

async function fetchJson(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export async function fetchPublicStats() {
  return fetchJson('/api/public-stats/');
}

export async function fetchCategories() {
  const data = await fetchJson('/api/categories/');
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function fetchPosts(params = '') {
  const suffix = params ? `?${params}` : '';
  const data = await fetchJson(`/api/posts/${suffix}`);
  if (Array.isArray(data)) {
    return { results: data, count: data.length, next: null, previous: null };
  }
  if (data && typeof data === 'object' && Array.isArray(data.results)) {
    return {
      results: data.results,
      count: data.count || 0,
      next: data.next || null,
      previous: data.previous || null,
    };
  }
  return { results: [], count: 0, next: null, previous: null };
}

export async function fetchPostBySlug(slug) {
  return fetchJson(`/api/posts/${slug}/`);
}

// Backward-compatible alias
export const fetchPostById = fetchPostBySlug;

