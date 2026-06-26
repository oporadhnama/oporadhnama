import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour so Google always gets a fresh sitemap

const SITE_URL = 'https://oporadhnama.info';
const API_BASE = 'https://oporadhnama.onrender.com';

function formatSitemapDate(dateInput) {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    return d.toISOString().replace(/\.\d+Z$/, 'Z');
  } catch (_) {
    return new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  }
}

async function getSitemapData() {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: formatSitemapDate(new Date()),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/all-news`,
      lastModified: formatSitemapDate(new Date()),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified: formatSitemapDate(new Date()),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: formatSitemapDate(new Date()),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: formatSitemapDate(new Date()),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/submit`,
      lastModified: formatSitemapDate(new Date()),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  try {
    // ── Fetch news articles with a 5-second timeout ────────────────────────
    // (Render free tier sleeps — a slow wake-up will cause Googlebot to
    //  give up; we fall back to static routes gracefully instead.)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    let response;
    try {
      response = await fetch(`${API_BASE}/api/posts/?limit=1000`, {
        next: { revalidate: 3600 },
        signal: controller.signal,
      });
    } catch (fetchErr) {
      // Timed out or network error — return static routes so sitemap is still valid
      console.error('Sitemap API fetch failed (timeout or network):', fetchErr);
      return staticRoutes;
    } finally {
      clearTimeout(timeoutId);
    }

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

      // 2. Normalise the slug: first decode any existing percent-encoding so we
      //    never double-encode (e.g. API may already return "76-%E0%A6%B8...")
      //    then re-encode cleanly so raw Bengali chars become valid ASCII URLs.
      const rawSlug = String(article.slug || article.id);
      let slug;
      try {
        slug = encodeURIComponent(decodeURIComponent(rawSlug));
      } catch (_) {
        // decodeURIComponent throws on malformed sequences — fall back to raw
        slug = encodeURIComponent(rawSlug);
      }
      const url = `${SITE_URL}/news/${slug}`;

      let image = null;
      if (article.image) {
        const rawImageUrl = article.image.startsWith('http') ? article.image : `${API_BASE}${article.image}`;
        image = {
          loc: rawImageUrl,
          title: article.title || '',
        };
      }

      return {
        url,
        lastModified: formatSitemapDate(lastModDate),
        changeFrequency: 'weekly',
        priority: 0.7,
        image,
      };
    });

    return [...staticRoutes, ...newsRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticRoutes;
  }
}

export async function GET() {
  const routes = await getSitemapData();

  const xmlItems = routes
    .map(
      (route) => `  <url>
    <loc>${route.url}</loc>
    ${route.lastModified ? `<lastmod>${route.lastModified}</lastmod>` : ''}
    ${route.changeFrequency ? `<changefreq>${route.changeFrequency}</changefreq>` : ''}
    ${route.priority !== undefined ? `<priority>${route.priority.toFixed(1)}</priority>` : ''}
    ${route.image && route.image.loc ? `    <image:image>
      <image:loc>${route.image.loc.replace(/&/g, '&amp;')}</image:loc>
      ${route.image.title ? `<image:title>${route.image.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</image:title>` : ''}
    </image:image>` : ''}
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${xmlItems}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
