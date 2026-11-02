const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://oporadhnama.onrender.com';
export const API_BASE = rawApiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');

const CLOUDINARY_WATERMARK_TRANSFORM =
  'l_oporadhnama_watermark,w_0.24,fl_relative/fl_layer_apply,g_south_east,x_0.02,y_0.025,fl_relative,o_95';

export function injectCloudinaryWatermark(url) {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  if (
    url.includes('l_oporadhnama_watermark') ||
    /[-_]wm(\.[a-zA-Z0-9]+)?($|\?)/.test(url)
  ) {
    return url;
  }
  const marker = '/upload/';
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const before = url.slice(0, idx + marker.length);
  const after = url.slice(idx + marker.length);
  return `${before}${CLOUDINARY_WATERMARK_TRANSFORM}/${after}`;
}

export function resolveImageUrl(image) {
  if (!image) return null;
  if (typeof image !== 'string') return null;
  const clean = image.trim();
  if (!clean) return null;

  // Full URL (Cloudinary, S3, or external)
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return injectCloudinaryWatermark(clean);
  }

  // Cloudinary relative path (e.g. image/upload/... or /image/upload/...)
  if (clean.startsWith('image/upload/') || clean.startsWith('/image/upload/')) {
    const rel = clean.startsWith('/') ? clean : `/${clean}`;
    return injectCloudinaryWatermark(`https://res.cloudinary.com${rel}`);
  }

  // Standard media relative path (e.g. /media/posts/... or posts/...)
  const path = clean.startsWith('/') ? clean : `/${clean}`;
  if (!path.startsWith('/media/')) {
    return `${API_BASE}/media${path}`;
  }
  return `${API_BASE}${path}`;
}

export function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

async function fetchJson(path, options = {}) {
  const defaultCache = (options.cache || (options.next && options.next.revalidate !== undefined)) ? undefined : 'no-store';
  const res = await fetch(`${API_BASE}${path}`, {
    ...(defaultCache ? { cache: defaultCache } : {}),
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export async function fetchPublicStats(options = {}) {
  return fetchJson('/api/public-stats/', options);
}

export async function fetchCategories(options = {}) {
  const data = await fetchJson('/api/categories/', options);
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function fetchPosts(params = '', options = {}) {
  const suffix = params ? `?${params}` : '';
  const data = await fetchJson(`/api/posts/${suffix}`, options);
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

export async function fetchPostBySlug(slug, options = {}) {
  return fetchJson(`/api/posts/${slug}/`, options);
}

export const fetchPostById = fetchPostBySlug;

export async function fetchActiveCampaign(options = {}) {
  try {
    const data = await fetchJson('/api/campaign/active/', options);
    return data;
  } catch (err) {
    console.error('Failed to fetch active campaign:', err);
    return { active: false };
  }
}
