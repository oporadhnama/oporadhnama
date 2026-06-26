 🔍 SEO Audit & Suggestions — অপরাধনামা (oporadhnama.info)

> **Codebase**: Next.js 16 App Router · Django REST backend · Deployed on Vercel + Render  
> **Audit Date**: June 2026  
> **Language**: Bangla (bn-BD) primary, mixed Bengali/English keywords

---

## ✅ What's Already Good

| Area | Status | Notes |
|---|---|---|
| `metadataBase` set | ✅ | Correctly set to `https://oporadhnama.info` in `layout.jsx` |
| `<html lang="bn">` | ✅ | Correct locale declaration |
| Open Graph tags | ✅ | OG title, description, image, locale, type all present |
| Twitter Card | ✅ | `summary_large_image` card set |
| Canonical URLs | ✅ | Set on layout and per-article pages |
| robots.js | ✅ | Allows all crawlers, references sitemap |
| Sitemap (dynamic) | ✅ | `/sitemaps-v2.xml` route generates XML with articles |
| JSON-LD on articles | ✅ | `NewsArticle` schema with headline, publisher, dates |
| `generateMetadata` per article | ✅ | Dynamic per-slug title, description, OG image |
| Sitemap redirect | ✅ | `/sitemap.xml` → `/sitemaps-v2.xml` permanent redirect |
| Cloudinary CDN | ✅ | Auto format + quality transforms on article images |
| `rel="noopener noreferrer"` | ✅ | Applied to external source links |

---

## 🔴 Critical Issues (Fix Immediately)

### 1. Missing `og:image` File in `/public`

**File**: `frontend/public/`  
**Problem**: `layout.jsx` and all article pages reference `/og-image.jpg`, but the `public/` directory only contains `favicon.png` and `icons.svg`. The OG image **does not exist**.  
When shared on Facebook, Twitter/X, WhatsApp, or LinkedIn, no preview image will render — crippling social traffic.

**Fix**: Create and place a proper OG image:
- Dimensions: **1200 × 630 px**
- File: `frontend/public/og-image.jpg`
- Content: Site logo + site name "অপরাধনামা" + tagline, on a dark/red background
- Keep file size under **200 KB** (compress with Squoosh or TinyPNG)

---

### 2. Favicon is Oversized (1 MB PNG)

**File**: `frontend/public/favicon.png` (1,006,918 bytes ≈ **1 MB**)  
**Problem**: A 1 MB favicon is loaded on every page. Browsers will download it on first visit, wasting bandwidth and impacting Core Web Vitals (LCP, FID). Google uses Core Web Vitals as a ranking signal.

**Fix**:
- Compress to under **10 KB** using a PNG optimizer
- Add a proper `<link rel="icon">` in `layout.jsx` with the correct MIME type
- Add an `apple-touch-icon` (180×180 px) for iOS bookmarks

```jsx
// In layout.jsx metadata export
icons: {
  icon: '/favicon.png',
  apple: '/apple-touch-icon.png',
},
```

---

### 3. `about/page.jsx` Has Incomplete Metadata

**File**: `frontend/app/about/page.jsx`  
**Problem**: Only `title` is set — no `description`, no `openGraph`, no `canonical`.

```jsx
// Current (incomplete)
export const metadata = {
  title: 'আমাদের সম্পর্কে | অপরাধনামা',
};
```

**Fix**:
```jsx
export const metadata = {
  title: 'আমাদের সম্পর্কে | অপরাধনামা',
  description: 'অপরাধনামা সম্পর্কে জানুন — বাংলাদেশের অপরাধভিত্তিক সংবাদের বিশ্বস্ত প্ল্যাটফর্ম।',
  alternates: { canonical: 'https://oporadhnama.info/about' },
  openGraph: {
    title: 'আমাদের সম্পর্কে | অপরাধনামা',
    description: 'অপরাধনামা সম্পর্কে জানুন — বাংলাদেশের অপরাধভিত্তিক সংবাদের বিশ্বস্ত প্ল্যাটফর্ম।',
    url: 'https://oporadhnama.info/about',
    type: 'website',
  },
};
```

---

### 4. Home Page Has No Per-Page `metadata` Export

**File**: `frontend/app/page.jsx`  
**Problem**: The home page (`/`) has no per-page metadata export. It inherits only the root layout's default metadata, which means it gets no `<link rel="canonical">` override or a page-specific OG `url`.

**Fix**: Add to `page.jsx`:
```jsx
export const metadata = {
  alternates: { canonical: 'https://oporadhnama.info' },
  openGraph: {
    url: 'https://oporadhnama.info',
    type: 'website',
  },
};
```

---

### 5. Article `dateModified` Is Same as `datePublished`

**File**: `frontend/app/news/[slug]/page.jsx` line 163  
**Problem**: The JSON-LD structured data sets `dateModified` to the same value as `datePublished`. If articles are ever updated, Google won't know — potentially missing updated content in freshness-ranked results.

```js
// Current (incorrect)
dateModified: post.created_at || post.date,
```

**Fix**: Use an `updated_at` field from the API if available:
```js
dateModified: post.updated_at || post.created_at || post.date,
```
> Also expose `updated_at` from the Django REST serializer if not already done.

---

## 🟡 Important Improvements

### 6. Add JSON-LD to the Home Page

**File**: `frontend/app/page.jsx`  
**Problem**: The home page has no structured data. Google can use `WebSite` + `SearchAction` schemas to enable **Google Sitelinks Search Box**.

**Fix**: Add a `<script type="application/ld+json">` in the home page:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "অপরাধনামা",
  "url": "https://oporadhnama.info",
  "description": "বাংলাদেশের অপরাধভিত্তিক সংবাদ, বিশ্লেষণ ও তথ্যচিত্রের বিশ্বস্ত প্ল্যাটফর্ম।",
  "inLanguage": "bn",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://oporadhnama.info/all-news?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

### 7. Publisher Logo in JSON-LD Is Wrong Dimensions

**File**: `frontend/app/news/[slug]/page.jsx` lines 178-183  
**Problem**: Google's rich result guidelines require the publisher logo to be:
- Max **600 × 60 px**
- Aspect ratio must be usable as a logo (landscape, rectangular)

The current logo is `og-image.jpg` at `1200 × 630` — this will **fail Google's Rich Results Test** and prevent the article from appearing as a rich result in Google News.

```js
// Current (wrong)
logo: {
  '@type': 'ImageObject',
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
},
```

**Fix**: Create a dedicated logo image (`/logo-publisher.png`, ~600×60 px) and reference it:
```js
logo: {
  '@type': 'ImageObject',
  url: `${SITE_URL}/logo-publisher.png`,
  width: 600,
  height: 60,
},
```

---

### 8. Sitemap Missing `<image:image>` Tags for Articles

**File**: `frontend/app/sitemaps-v2.xml/route.js`  
**Problem**: The sitemap does not include image metadata. Adding `<image:image>` entries inside article `<url>` nodes helps Google Image Search index article images, driving additional traffic.

**Fix**: Extend the sitemap XML generation:
```xml
<url>
  <loc>https://oporadhnama.info/news/some-slug</loc>
  <lastmod>2026-06-20T00:00:00Z</lastmod>
  <image:image>
    <image:loc>https://res.cloudinary.com/...</image:loc>
    <image:title>Article Title</image:title>
  </image:image>
</url>
```
Also add the image namespace to `<urlset>`:
```xml
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
```

---

### 9. Expand Root-Level Keyword List

**File**: `frontend/app/layout.jsx` lines 13-21  
**Problem**: The current keyword list is very short (7 terms). While `keywords` meta is not a direct Google ranking signal, it remains useful for Bing and DuckDuckGo.

**Suggested keywords to add**:
```
'চট্টগ্রাম অপরাধ', 'রাজশাহী অপরাধ', 'ঢাকা অপরাধ',
'হত্যা মামলা', 'ডাকাতি সংবাদ', 'মাদক সংবাদ',
'জুলাই বিপ্লব', 'শহীদ স্মরণ', 'গণহত্যা বিচার',
'bangladesh crime report', 'latest crime news bangladesh',
'oporadhnama news'
```

---

### 10. `all-news` and `archive` Pages Need Full Metadata

**Files**: `frontend/app/all-news/`, `frontend/app/archive/`  
**Problem**: These are high-traffic listing pages that likely receive most organic hits, but they have no dedicated metadata confirmed in the codebase.

**Fix**: Each should export a `metadata` object:

```jsx
// app/all-news/page.jsx
export const metadata = {
  title: 'সকল সংবাদ | অপরাধনামা',
  description: 'বাংলাদেশের সর্বশেষ অপরাধ সংবাদ একসাথে। হত্যা, ডাকাতি, মাদক, দুর্নীতি সহ সকল অপরাধের খবর।',
  alternates: { canonical: 'https://oporadhnama.info/all-news' },
  openGraph: {
    title: 'সকল সংবাদ | অপরাধনামা',
    url: 'https://oporadhnama.info/all-news',
    type: 'website',
  },
};
```

---

### 11. `contact` and `submit` Pages Need Metadata

Similar to the above — confirm these pages have full `metadata` exports:
- `/contact` → title, description, canonical, OG
- `/submit` → title (e.g., "সংবাদ পাঠান"), description ("আপনার এলাকার অপরাধ সংবাদ আমাদের কাছে পাঠান")

---

### 12. Add `twitter:site` and `twitter:creator`

**File**: `frontend/app/layout.jsx`  
**Problem**: The Twitter card metadata is missing `site` and `creator` handles. Without them, Twitter/X won't attribute content to your account.

**Fix**:
```jsx
twitter: {
  card: 'summary_large_image',
  site: '@oporadhnama',       // your Twitter handle
  creator: '@oporadhnama',
  title: '...',
  description: '...',
  images: ['/og-image.jpg'],
},
```

---

## 🟢 Performance & Technical SEO

### 13. Remove `force-dynamic` from Home Page

**File**: `frontend/app/page.jsx` line 8  
**Problem**: `export const dynamic = 'force-dynamic'` disables all caching on the home page. Every visitor triggers a fresh API call to the Render backend, which has **cold-start latency of up to 30 seconds** on the free tier. This severely hurts **TTFB (Time to First Byte)**, a Core Web Vitals metric and ranking signal.

**Recommendation**:
- Switch to `export const revalidate = 60` (ISR — regenerate every 60 seconds)
- Or use `fetch(..., { next: { revalidate: 60 } })` per-fetch
- Reserve `force-dynamic` only for pages that truly need real-time data (e.g., admin)

---

### 14. `cache: 'no-store'` on Article Fetch

**File**: `frontend/app/news/[slug]/page.jsx` line 35  
**Problem**: `{ cache: 'no-store' }` on every article fetch means no caching at all. Each Googlebot crawl of every article makes a live API call.

**Fix**: Use ISR for articles:
```js
const res = await fetch(`${API}/api/posts/${slug}/`, {
  next: { revalidate: 300 }, // refresh every 5 minutes
});
```
This dramatically improves crawl speed and reduces Render cold-start load.

---

### 15. Article Back Link Uses `<a>` Instead of `<Link>`

**File**: `frontend/app/news/[slug]/page.jsx` line 192  
**Problem**: Using a plain `<a>` tag for internal navigation bypasses Next.js's client-side routing (prefetching, instant navigation), resulting in a full page reload.

**Fix**:
```jsx
import Link from 'next/link';
// ...
<Link href="/all-news" className="...">
  ← সকল সংবাদে ফিরে যান
</Link>
```

---

### 16. `TributeHero` Campaign Image Missing Fetch Priority

**File**: `frontend/components/TributeHero.jsx` line 84  
**Problem**: The campaign hero image uses a plain `<img>` tag without `fetchpriority`. Above-the-fold images need `fetchpriority="high"` to avoid LCP penalty.

**Fix**:
```jsx
<img
  src={imageUrl}
  alt={`জুলাই দিন ${dayNumber}`}
  loading="eager"
  fetchpriority="high"
  className="max-w-full max-h-[70vh] w-auto h-auto object-contain block"
/>
```

---

### 17. Add `viewport` Export to Layout

**File**: `frontend/app/layout.jsx`  
**Problem**: No `viewport` meta is explicitly exported. Next.js 13+ separates viewport from metadata — explicitly exporting it ensures mobile-friendliness signals are properly sent.

**Fix**:
```jsx
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
```

---

### 18. Footer Has No Semantic HTML (`<address>`, copyright)

**File**: `frontend/components/Footer.jsx`  
**Problem**: The footer copyright and site name are in plain `<p>` tags. Using `<small>` for copyright and `<address>` for contact info improves semantic HTML signals.

**Fix**:
```jsx
<small>© {new Date().getFullYear()} অপরাধনামা. সর্বস্বত্ব সংরক্ষিত।</small>
```

---

## 📊 Google Search Console & Publisher Tools

### 19. Submit Sitemap to Google Search Console

If not already done:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `https://oporadhnama.info`
3. Submit `https://oporadhnama.info/sitemaps-v2.xml`
4. Request indexing for key pages manually

### 20. Apply for Google News (Publisher Center)

Since this is a Bengali-language news site covering Bangladesh:
1. Apply at [Google Publisher Center](https://publishercenter.google.com/)
2. Ensure your JSON-LD uses `@type: "NewsArticle"` (already done ✅)
3. Ensure `inLanguage: "bn"` is set (already done ✅)
4. Fix the publisher logo dimensions (see Issue #7 above) before applying

### 21. Register with Bing Webmaster Tools

- Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Bing powers DuckDuckGo — relevant for diaspora readers outside Bangladesh

---

## 🌐 Structured Data Enhancements

### 22. Add BreadcrumbList Schema on Article Pages

Breadcrumbs appear in Google search results and improve CTR:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "হোম", "item": "https://oporadhnama.info" },
    { "@type": "ListItem", "position": 2, "name": "সকল সংবাদ", "item": "https://oporadhnama.info/all-news" },
    { "@type": "ListItem", "position": 3, "name": "Article Title", "item": "https://oporadhnama.info/news/slug" }
  ]
}
```

### 23. Add `Organization` Schema to Root Layout

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "অপরাধনামা",
  "url": "https://oporadhnama.info",
  "logo": "https://oporadhnama.info/logo-publisher.png",
  "sameAs": [
    "https://www.facebook.com/oporadhnama",
    "https://twitter.com/oporadhnama"
  ]
}
```

---

## 🗺️ URL & Slug Quality

### 24. Bengali Slugs in Sitemap Are Percent-Encoded

**File**: `frontend/app/sitemaps-v2.xml/route.js` lines 108-113  
**Problem**: The sitemap properly encodes Bengali URLs (e.g., `/news/%E0%A6%B6%E0%A6%B0%E0%A7%80%E0%A6%AB`), which is technically correct. However, **Google recommends ASCII slugs** for news articles for maximum compatibility and shareability.

**Recommendation**: At the Django backend level, transliterate Bengali article titles to ASCII slugs using `python-slugify` with `allow_unicode=False`. Example:
- **Current**: `/news/৭৬-শরীফ-ওসমান`
- **Better**: `/news/76-sharif-osman-hadi-news`

---

### 25. Add `hreflang` if English Content is Added in Future

If any English-language content is published:
```jsx
alternates: {
  canonical: 'https://oporadhnama.info/news/slug-bn',
  languages: {
    'bn-BD': 'https://oporadhnama.info/news/slug-bn',
    'en': 'https://oporadhnama.info/en/news/slug-en',
  },
},
```

---

## 📋 Priority Action Checklist

| Priority | Task | File(s) Affected |
|---|---|---|
| 🔴 P1 | Create `/public/og-image.jpg` (1200×630 px) | `public/` |
| 🔴 P1 | Fix publisher logo dimensions in JSON-LD (600×60) | `news/[slug]/page.jsx` |
| 🔴 P1 | Compress `favicon.png` from 1 MB → <10 KB | `public/favicon.png` |
| 🔴 P1 | Add full metadata to `about/page.jsx` | `app/about/page.jsx` |
| 🔴 P1 | Use `updated_at` for `dateModified` in JSON-LD | `news/[slug]/page.jsx` |
| 🟡 P2 | Add `WebSite` + `SearchAction` JSON-LD to home | `app/page.jsx` |
| 🟡 P2 | Switch article fetch from `no-store` to ISR (5 min) | `news/[slug]/page.jsx` |
| 🟡 P2 | Switch home from `force-dynamic` to ISR (60 s) | `app/page.jsx` |
| 🟡 P2 | Add full metadata to `all-news`, `archive`, `contact`, `submit` | respective `page.jsx` |
| 🟡 P2 | Add `twitter:site` and `twitter:creator` handles | `app/layout.jsx` |
| 🟡 P2 | Add `<image:image>` entries to sitemap | `sitemaps-v2.xml/route.js` |
| 🟢 P3 | Add `BreadcrumbList` JSON-LD on article pages | `news/[slug]/page.jsx` |
| 🟢 P3 | Add `Organization` JSON-LD to layout | `app/layout.jsx` |
| 🟢 P3 | Replace `<a>` with `<Link>` for internal nav | `news/[slug]/page.jsx` |
| 🟢 P3 | Add `fetchpriority="high"` to campaign hero image | `TributeHero.jsx` |
| 🟢 P3 | Export `viewport` metadata in layout | `app/layout.jsx` |
| 🟢 P3 | Improve footer semantic HTML | `Footer.jsx` |
| 🟢 P3 | Submit sitemap to Google Search Console | External |
| 🟢 P3 | Apply for Google Publisher Center (Google News) | External |
| 🟢 P3 | Register with Bing Webmaster Tools | External |

---

## 🔧 Quick Wins (Under 30 Minutes Each)

1. **Create `og-image.jpg`** → unlocks social media preview cards on all platforms
2. **Compress favicon** → saves 1 MB per page load, improves Core Web Vitals
3. **Fix publisher logo** → enables Google News rich results
4. **Switch articles to ISR** → dramatically improves crawl budget efficiency
5. **Add `about` page full metadata** → currently nearly invisible to search engines

---

*Generated by code audit of `d:\oporadhnama\frontend` — Next.js 16 App Router project.*
