import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_BASE, { fetchPostById } from '../api';

function getEmbedUrl(url) {
  if (!url) return null;
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
  }
  return null;
}

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPostById(id)
      .then(data => { setPost(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-28">
        <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#E50914] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-28 gap-4">
        <p className="text-red-400 text-lg">{error}</p>
        <Link to="/all-news" className="text-[#E50914] hover:underline text-sm">← সকল সংবাদে ফিরে যান</Link>
      </div>
    );
  }

  const embedUrl = post.show_video !== false ? getEmbedUrl(post.video_url) : null;
  const imageUrl = post.image ? (post.image.startsWith('http') ? post.image : `${API_BASE}${post.image}`) : null;

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 w-full max-w-4xl mx-auto pb-16">
      <Link to="/all-news" className="text-neutral-500 hover:text-[#E50914] text-sm mb-6 inline-block transition-colors">
        ← সকল সংবাদে ফিরে যান
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-8 pb-6 border-b border-neutral-800">
        <span>📅 {post.date}</span>
        <span>📂 {post.category_name}</span>
        <span>📍 {post.division}</span>
        {post.location_text && <span>🏷️ {post.location_text}</span>}
      </div>

      {embedUrl && (
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
      )}

      <div className="text-neutral-300 text-base leading-relaxed whitespace-pre-line mb-8">
        {post.description}
      </div>

      {imageUrl && (
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-800">
          <img src={imageUrl} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      )}

      {post.source_link && (
        <a href={post.source_link} target="_blank" rel="noopener noreferrer" className="inline-block text-[#E50914] text-sm font-medium hover:underline">
          সোর্স লিংক দেখুন →
        </a>
      )}
    </div>
  );
}
