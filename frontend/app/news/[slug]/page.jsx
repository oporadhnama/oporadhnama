import { notFound } from 'next/navigation';
import Link from 'next/link';
import SensitiveImage from '../../../src/components/SensitiveImage';
import { API_BASE, fetchPosts } from '../../../lib/api';

const SITE_URL = 'https://oporadhnama.info';

// ভিডিও এমবেড ইউআরএল জেনারেটর
function getEmbedUrl(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
  }
  return null;
}

// ইমেজ ইউআরএল জেনারেটর
function resolveImageUrl(image) {
  if (!image) return null;
  return image.startsWith('http') ? image : `${API_BASE}${image}`;
}

/**
 * Resilient fetch: tries by slug first, falls back to numeric ID if slug is all-digits.
 * This ensures backward-compatibility with old /news/42 links.
 */
async function getPost(slug) {
  const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '').replace(/\/$/, '')
    || 'https://oporadhnama.onrender.com';

  // Try slug-based endpoint first
  try {
    const res = await fetch(`${API}/api/posts/${slug}/`, { next: { revalidate: 300 } });
    if (res.ok) {
      const post = await res.json();
      if (post && post.title) return post;
    }
  } catch (_) {
    // fall through
  }

  // Fallback: if slug looks like a numeric ID, try /api/posts/{id}/
  if (/^\d+$/.test(slug)) {
    try {
      const res = await fetch(`${API}/api/posts/${slug}/`, { next: { revalidate: 300 } });
      if (res.ok) {
        const post = await res.json();
        if (post && post.title) return post;
      }
    } catch (_) {
      // fall through
    }
  }

  // Last resort: scan the list
  try {
    const listRes = await fetch(`${API}/api/posts/`, { next: { revalidate: 60 } });
    if (listRes.ok) {
      const data = await listRes.json();
      const list = Array.isArray(data) ? data : (data.results || []);
      return list.find(
        (item) => item.slug === slug || String(item.id) === String(slug)
      ) || null;
    }
  } catch (_) {
    // all attempts failed
  }

  return null;
}

// ────────────────────────────────────────────────
// SEO metadata — dynamic per article
// ────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'সংবাদ পাওয়া যায়নি | অপরাধনামা' };
  }

  const imageUrl = resolveImageUrl(post.image);
  // Rich description: first 155 chars + ellipsis
  const rawDesc = (post.description || '').trim();
  const description = rawDesc.length > 155 ? rawDesc.slice(0, 155) + '…' : rawDesc || 'অপরাধনামার সংবাদ';
  const canonicalSlug = post.slug || slug;
  const canonicalUrl = `${SITE_URL}/news/${canonicalSlug}`;

  return {
    title: `${post.title} | অপরাধনামা`,
    description,
    keywords: [
      post.category_name,
      post.division,
      post.location_text,
      'অপরাধনামা',
      'বাংলাদেশ সংবাদ',
      'বাংলাদেশ অপরাধ সংবাদ',
      'crime news bangladesh',
      'bangladesh news',
      'oporadhnama',
    ].filter(Boolean),
    authors: [{ name: post.author_name || 'অপরাধনামা' }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'অপরাধনামা',
      locale: 'bn_BD',
      publishedTime: post.created_at || post.date,
      modifiedTime: post.updated_at || post.created_at || post.date,
      section: post.category_name || 'সংবাদ',
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
        : [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'অপরাধনামা' }],
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      site: '@oporadhnama',
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : [`${SITE_URL}/og-image.jpg`],
    },
  };
}

// ────────────────────────────────────────────────
// Page component
// ────────────────────────────────────────────────
export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Fetch related/other posts for interlinking
  let relatedPosts = [];
  try {
    if (post.category) {
      const categoryPostsRes = await fetchPosts(`category=${post.category}&limit=10`, { next: { revalidate: 60 } });
      relatedPosts = (categoryPostsRes.results || [])
        .filter(p => String(p.id) !== String(post.id) && p.slug !== post.slug);
    }
  } catch (err) {
    console.error('Failed to fetch category posts:', err);
  }

  if (relatedPosts.length < 4) {
    try {
      const latestPostsRes = await fetchPosts('limit=10', { next: { revalidate: 60 } });
      const additional = (latestPostsRes.results || [])
        .filter(p => String(p.id) !== String(post.id) && p.slug !== post.slug && !relatedPosts.some(r => r.id === p.id));
      relatedPosts = [...relatedPosts, ...additional];
    } catch (err) {
      console.error('Failed to fetch fallback posts:', err);
    }
  }
  relatedPosts = relatedPosts.slice(0, 4);

  const embedUrl = post.show_video !== false ? getEmbedUrl(post.video_url) : null;
  const rawImageUrl = resolveImageUrl(post.image);

  // Feature 3: Cloudinary CDN optimisation — inject transformation params
  // w_1200  → resize to 1200 px wide (max detail width)
  // f_auto  → serve WebP/AVIF where the browser supports it
  // q_auto  → Cloudinary picks the optimal quality level automatically
  // Non-Cloudinary URLs (local dev, legacy S3) are returned unchanged.
  function applyCloudinaryTransform(url, transform = 'w_1200,f_auto,q_auto') {
    if (!url || !url.includes('res.cloudinary.com')) return url;
    const marker = '/upload/';
    const idx = url.indexOf(marker);
    if (idx === -1) return url;
    const after = url.slice(idx + marker.length);
    if (/^(w_|h_|f_|q_|c_)/.test(after)) return url; // already transformed
    return url.slice(0, idx + marker.length) + transform + '/' + after;
  }

  const imageUrl = applyCloudinaryTransform(rawImageUrl);
  const isCloudinaryImage = rawImageUrl && rawImageUrl.includes('res.cloudinary.com');

  // Feature 5: Enhanced JSON-LD — NewsArticle schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/news/${post.slug || slug}`,
    },
    headline: post.title,
    description: (post.description || '').slice(0, 155),
    datePublished: post.created_at || post.date,
    dateModified: post.updated_at || post.created_at || post.date,
    url: `${SITE_URL}/news/${post.slug || slug}`,
    image: imageUrl ? [imageUrl] : [`${SITE_URL}/og-image.jpg`],
    keywords: [
      post.category_name,
      post.division,
      post.location_text,
      'অপরাধনামা',
      'বাংলাদেশ সংবাদ',
      'বাংলাদেশ অপরাধ সংবাদ',
      'crime news bangladesh',
      'bangladesh news',
    ]
      .filter(Boolean)
      .join(', '),
    author: {
      '@type': 'Person',
      name: post.author_name || 'অপরাধনামা',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'অপরাধনামা',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-publisher.png`,
        width: 600,
        height: 60,
      },
    },
    articleSection: post.category_name || 'সংবাদ',
    inLanguage: 'bn',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'হোম',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'সকল সংবাদ',
        item: `${SITE_URL}/all-news`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/news/${post.slug || slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 w-full max-w-4xl mx-auto pb-16">
      {/* Back link */}
      <Link href="/all-news" className="text-neutral-500 hover:text-[#E50914] text-sm mb-6 inline-block transition-colors">
        ← সকল সংবাদে ফিরে যান
      </Link>

      {/* Article heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
        {post.title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-8 pb-6 border-b border-neutral-800">
        <span>✍️ {post.author_name || 'অপরাধনামা'}</span>
        <span>📅 {post.date}</span>
        <span>📂 {post.category_name}</span>
        {post.division ? <span>📍 {post.division}</span> : null}
        {post.location_text ? <span>🏷️ {post.location_text}</span> : null}
      </div>

      {/* Feature 3: Featured image — Next.js <Image> for Cloudinary, plain <img> fallback */}
      {imageUrl ? (
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-800 relative">
          <SensitiveImage
            src={imageUrl}
            alt={post.title}
            isSensitive={post.is_sensitive_image}
            isCloudinaryImage={isCloudinaryImage}
            width={1200}
            height={630}
            className="w-full h-auto"
            priority={true}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      ) : null}

      {/* Embedded video */}
      {embedUrl ? (
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-800">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title={`ভিডিও: ${post.title}`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}

      {/* Article body */}
      <div 
        className="text-neutral-300 text-base leading-relaxed whitespace-pre-line mb-8 article-body"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />

      {/* Source link */}
      {post.source_link ? (
        <div className="mb-6">
          <a
            href={post.source_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#E50914] text-sm font-medium hover:underline"
          >
            সোর্স লিংক দেখুন →
          </a>
        </div>
      ) : null}

      {/* Interlinking Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="mt-8 pt-6 border-t border-neutral-800">
          <h3 className="text-lg font-bold text-gray-300 mb-3">আরও পড়ুন:</h3>
          <ul className="space-y-2">
            {relatedPosts.map((rPost) => (
              <li key={rPost.id} className="list-disc list-inside text-neutral-400">
                <Link
                  href={`/news/${rPost.slug || rPost.id}`}
                  className="text-blue-500 hover:text-blue-400 hover:underline text-base font-medium transition-colors inline"
                >
                  {rPost.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Feature 5: Enhanced JSON-LD structured data for Google News */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
