export const revalidate = 86400; // Revalidate at most once per day

const SITE_URL = 'https://oporadhnama.info';
const API_BASE = 'https://oporadhnama.onrender.com';

export default async function sitemap() {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/all-news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  try {
    // ── Fetch news articles from the correct endpoint: /api/posts/ ─────────
    const response = await fetch(`${API_BASE}/api/posts/?limit=1000`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.error(`Sitemap fetch failed: ${response.status}`);
      return staticRoutes;
    }

    const data = await response.json();
    // DRF may return paginated { results: [...] } or a plain array
    const articles = Array.isArray(data) ? data : (data.results || []);

    // ── Dynamic routes: use slug if available, else fall back to id ────────
    const newsRoutes = articles.map((article) => {
      // 1. Safely handle dates (prevent 500 errors from "Invalid Date")
      let lastModDate;
      try {
        lastModDate = new Date(article.created_at || article.date || new Date());
        if (isNaN(lastModDate.getTime())) {
          lastModDate = new Date();
        }
      } catch (e) {
        lastModDate = new Date();
      }

      // 2. URI Encode the URL to safely handle non-ASCII Bengali characters in slugs
      const rawUrl = `${SITE_URL}/news/${article.slug || article.id}`;
      
      return {
        url: encodeURI(rawUrl),
        lastModified: lastModDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    });

    return [...staticRoutes, ...newsRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticRoutes;
  }
}