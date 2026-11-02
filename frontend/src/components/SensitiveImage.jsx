'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function SensitiveImage({
  src,
  alt,
  className,
  isSensitive,
  isCloudinaryImage,
  width,
  height,
  priority,
  sizes,
  showDownload = false,
}) {
  const [isRevealed, setIsRevealed] = useState(!isSensitive);
  const [downloading, setDownloading] = useState(false);

  const handleClick = (e) => {
    if (!isRevealed) {
      e.preventDefault();
      setIsRevealed(true);
    }
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    if (!src || downloading) return;
    setDownloading(true);
    try {
      const response = await fetch(src, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      const safeTitle = (alt || 'oporadhnama-news')
        .replace(/[^\u0980-\u09FFa-zA-Z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
      a.download = `${safeTitle || 'oporadhnama-news'}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (_) {
      window.open(src, '_blank', 'noopener,noreferrer');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className={`relative group ${className || ''}`}
      onClick={handleClick}
      style={!isRevealed ? { cursor: 'pointer' } : {}}
    >
      <div
        className={`w-full h-full transition-all duration-500 ${
          !isRevealed ? 'filter blur-2xl scale-110' : ''
        }`}
      >
        {isCloudinaryImage ? (
          <Image
            src={src}
            alt={alt || ''}
            width={width}
            height={height}
            className="w-full h-full object-cover"
            priority={priority}
            sizes={sizes}
            unoptimized={true}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ''}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {isRevealed && showDownload && src && src !== '/og-image.jpg' && (
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          title="ওয়াটারমার্কসহ ছবি ডাউনলোড করুন"
          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-[#D62828] text-white text-xs font-bold border border-white/15 backdrop-blur-md shadow-lg opacity-85 group-hover:opacity-100 transition-all"
        >
          <span>{downloading ? '⏳' : '📥'}</span>
          <span>{downloading ? 'ডাউনলোড হচ্ছে...' : 'ছবি ডাউনলোড'}</span>
        </button>
      )}

      {!isRevealed && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-center">
          <div className="bg-neutral-900/80 border border-neutral-700 px-6 py-4 rounded-xl shadow-2xl">
            <svg
              className="w-8 h-8 text-amber-500 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-white font-bold text-lg mb-1">স্পর্শকাতর ছবি</h3>
            <p className="text-neutral-300 text-sm">দেখতে এখানে ক্লিক করুন</p>
          </div>
        </div>
      )}
    </div>
  );
}
