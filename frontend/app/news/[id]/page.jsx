import { notFound } from 'next/navigation';
import { API_BASE, fetchPostById } from '../../../lib/api';

export const dynamic = 'force-dynamic';

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

// 🛡️ অ্যাডভান্সড ফলব্যাক ফেচিং লজিক (যেটি ক্লড মিস করেছিল)
async function getPostResiliently(id) {
  try {
    // প্রথম চেষ্টা: সরাসরি আইডি দিয়ে ফেচ করা
    const post = await fetchPostById(id);
    if (post && post.title) return post;
  } catch (error) {
    console.warn(`Direct fetch failed for ID ${id}, attempting fallback...`);
  }

  // দ্বিতীয় চেষ্টা (Fallback): পুরো লিস্ট ফেচ করে সেখান থেকে আইডি ম্যাচ করা
  try {
    const listRes = await fetch('https://oporadhnama.onrender.com/api/posts/', {
      next: { revalidate: 60 } // ক্যাশ করে রাখছি যাতে স্পিড বাড়ে
    });

    if (!listRes.ok) return null;

    const data = await listRes.json();
    const newsList = Array.isArray(data) ? data : (data.results || []);

    // লিস্ট থেকে স্পেসিফিক আইডিটি খুঁজে বের করা
    const post = newsList.find(item => String(item.id) === String(id));
    return post || null;
  } catch (fallbackError) {
    console.error('Fallback fetch also failed:', fallbackError);
    return null;
  }
}

// SEO মেটাডেটা জেনারেটর
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPostResiliently(id);

  if (!post) {
    return { title: 'সংবাদ পাওয়া যায়নি | অপরাধনামা' };
  }

  const imageUrl = resolveImageUrl(post.image);
  const description = post.description?.slice(0, 160) || 'অপরাধনামার সংবাদ';

  return {
    title: `${post.title} | অপরাধনামা`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

// মূল পেজ কম্পোনেন্ট
export default async function NewsDetailPage({ params }) {
  const { id } = await params;
  // নতুন রেজিলিয়েন্ট ফাংশন দিয়ে ডেটা কল করা হচ্ছে
  const post = await getPostResiliently(id);

  // যদি প্রথম ফেচ এবং ফলব্যাক—দুটোই ফেইল করে, শুধুমাত্র তখনই 404 দেখাবে
  if (!post) {
    notFound();
  }

  const embedUrl = post.show_video !== false ? getEmbedUrl(post.video_url) : null;
  const imageUrl = resolveImageUrl(post.image);

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 w-full max-w-4xl mx-auto pb-16">
      <a href="/all-news" className="text-neutral-500 hover:text-[#E50914] text-sm mb-6 inline-block transition-colors">
        ← সকল সংবাদে ফিরে যান
      </a>

      <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-8 pb-6 border-b border-neutral-800">
        <span>📅 {post.date}</span>
        <span>📂 {post.category_name}</span>
        <span>📍 {post.division}</span>
        {post.location_text ? <span>🏷️ {post.location_text}</span> : null}
      </div>

      {embedUrl ? (
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-800">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title="Video"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}

      <div className="text-neutral-300 text-base leading-relaxed whitespace-pre-line mb-8">
        {post.description}
      </div>

      {imageUrl ? (
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-800">
          <img src={imageUrl} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      ) : null}

      {post.source_link ? (
        <a
          href={post.source_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[#E50914] text-sm font-medium hover:underline"
        >
          সোর্স লিংক দেখুন →
        </a>
      ) : null}
    </div>
  );
}


