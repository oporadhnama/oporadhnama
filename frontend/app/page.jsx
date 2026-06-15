import { notFound } from 'next/navigation';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const API_BASE = 'https://oporadhnama.onrender.com/api/news';

// ─── Resilient data fetcher ───────────────────────────────────────────────────
// 1. Try the detail endpoint first  → /api/news/{id}/
// 2. On any failure, fall back to   → /api/news/  and find the article by id
// 3. Return null only when both strategies are exhausted
async function fetchArticle(id) {
  // ── Primary: detail endpoint ──────────────────────────────────────────────
  try {
    const res = await fetch(`${API_BASE}/${id}/`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      // Guard against an empty-but-200 response
      if (data && (data.id || data.title)) return data;
    }
  } catch (_primaryErr) {
    // network / parsing error → fall through to list fallback
  }

  // ── Fallback: scan the full list ──────────────────────────────────────────
  try {
    const res = await fetch(`${API_BASE}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const payload = await res.json();

    // DRF can return a plain array or a paginated object { results: [] }
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.results)
      ? payload.results
      : [];

    // Loose equality so "42" == 42 works across string/number id mismatches
    return list.find((article) => article.id == id) ?? null;
  } catch (_fallbackErr) {
    return null;
  }
}

// ─── generateMetadata (same resilient logic) ─────────────────────────────────
export async function generateMetadata({ params }) {
  const article = await fetchArticle(params.id);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title ?? 'News Article',
    description: article.summary ?? article.content?.slice(0, 160) ?? '',
    openGraph: {
      title: article.title ?? 'News Article',
      description: article.summary ?? article.content?.slice(0, 160) ?? '',
      ...(article.image ? { images: [{ url: article.image }] } : {}),
    },
  };
}

// ─── Page component ───────────────────────────────────────────────────────────
export default async function NewsDetailPage({ params }) {
  const article = await fetchArticle(params.id);

  if (!article) notFound();

  const {
    title,
    content,
    summary,
    image,
    author,
    published_at,
    created_at,
    category,
    tags,
  } = article;

  const publishDate = published_at ?? created_at;
  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero / header ───────────────────────────────────────────────── */}
      <header className="mx-auto max-w-3xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        {category && (
          <span className="mb-4 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-700">
            {category}
          </span>
        )}

        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>

        {summary && (
          <p className="mt-4 text-lg leading-relaxed text-gray-500">{summary}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
          {author && (
            <span>
              By <strong className="text-gray-700">{author}</strong>
            </span>
          )}
          {formattedDate && <time dateTime={publishDate}>{formattedDate}</time>}
        </div>
      </header>

      {/* ── Cover image ─────────────────────────────────────────────────── */}
      {image && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md">
            <Image
              src={image}
              alt={title ?? 'Article cover image'}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {content ? (
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-red-600 hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-gray-500 italic">No content available for this article.</p>
        )}

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        {Array.isArray(tags) && tags.length > 0 && (
          <footer className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </footer>
        )}
      </article>
    </main>
  );
}
