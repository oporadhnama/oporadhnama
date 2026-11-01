import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

function decodeEntities(str = '') {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

function stripHtmlTags(html = '') {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMetaContent(html, attrValue) {
  const regex1 = new RegExp(
    `<meta[^>]+(?:property|name)=["']${attrValue}["'][^>]+content=["']([^"']+)["']`,
    'i'
  );
  const m1 = html.match(regex1);
  if (m1 && m1[1]) return decodeEntities(m1[1].trim());

  const regex2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${attrValue}["']`,
    'i'
  );
  const m2 = html.match(regex2);
  if (m2 && m2[1]) return decodeEntities(m2[1].trim());

  return '';
}

function extractJsonLdArticle(html) {
  const scriptRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let bodyText = '';
  let imageUrl = '';

  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const candidates = Array.isArray(parsed)
        ? parsed
        : parsed['@graph'] && Array.isArray(parsed['@graph'])
        ? parsed['@graph']
        : [parsed];

      for (const item of candidates) {
        if (!item || typeof item !== 'object') continue;
        if (item.articleBody && typeof item.articleBody === 'string' && item.articleBody.length > bodyText.length) {
          bodyText = decodeEntities(item.articleBody.trim());
        }
        if (!imageUrl && item.image) {
          if (typeof item.image === 'string') {
            imageUrl = item.image;
          } else if (Array.isArray(item.image) && item.image[0]) {
            imageUrl = typeof item.image[0] === 'string' ? item.image[0] : item.image[0]?.url || '';
          } else if (typeof item.image === 'object' && item.image.url) {
            imageUrl = item.image.url;
          }
        }
      }
    } catch (_) {}
  }

  return { bodyText, imageUrl };
}

function extractParagraphs(html) {
  // Prefer inside <article> or <main> if present
  const articleMatch = html.match(/<article[\s\S]*?<\/article>/i) || html.match(/<main[\s\S]*?<\/main>/i);
  const targetHtml = articleMatch ? articleMatch[0] : html;

  const pRegex = /<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi;
  const paragraphs = [];
  let match;

  while ((match = pRegex.exec(targetHtml)) !== null) {
    const clean = stripHtmlTags(match[1]);
    // Keep meaningful sentences
    if (clean.length >= 35 && !clean.includes('সর্বস্বত্ব সংরক্ষিত') && !clean.includes('All rights reserved')) {
      paragraphs.push(clean);
    }
  }

  return paragraphs.join('\n\n');
}

async function resolvePublisherUrlIfGoogleNews(url, fallbackTitle) {
  if (!url) return { resolvedUrl: url, bingImage: null };

  // Check if Bing redirect URL
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('bing.com') && parsed.searchParams.get('url')) {
      return { resolvedUrl: parsed.searchParams.get('url'), bingImage: null };
    }
  } catch (_) {}

  // If it's an obfuscated news.google.com/rss/articles/... link, look up the exact headline on Bing News RSS
  // which gives the direct publisher URL + high-res News:Image!
  if (url.includes('news.google.com/') && fallbackTitle) {
    try {
      const q = encodeURIComponent(fallbackTitle.slice(0, 90));
      const bingRes = await fetch(`https://www.bing.com/news/search?q=${q}&format=rss`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      if (bingRes.ok) {
        const xml = await bingRes.text();
        const linkMatch = xml.match(/<item>[\s\S]*?<link>([\s\S]*?)<\/link>[\s\S]*?<\/item>/i);
        const imgMatch = xml.match(/<News:Image>([\s\S]*?)<\/News:Image>/i);
        const bingImage = imgMatch ? decodeEntities(imgMatch[1].trim()) : null;
        if (linkMatch && linkMatch[1]) {
          const rawLink = decodeEntities(linkMatch[1].trim());
          const parsedBing = new URL(rawLink);
          const directUrl = parsedBing.searchParams.get('url') || rawLink;
          return { resolvedUrl: directUrl, bingImage };
        }
      }
    } catch (_) {}
  }

  return { resolvedUrl: url, bingImage: null };
}

async function fetchImageAsDataUrl(imageUrl, refererUrl) {
  if (!imageUrl) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        ...(refererUrl ? { Referer: refererUrl } : {}),
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) return null;

    const arrayBuffer = await res.arrayBuffer();
    // Skip tiny tracking pixels (< 2KB) or huge files (> 8MB)
    if (arrayBuffer.byteLength < 2048 || arrayBuffer.byteLength > 8 * 1024 * 1024) {
      return null;
    }

    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return {
      dataUrl: `data:${contentType.split(';')[0]};base64,${base64}`,
      mimeType: contentType.split(';')[0],
    };
  } catch (_) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, fallbackTitle = '', fallbackSnippet = '', fallbackImage = '' } = body;

    if (!url) {
      return NextResponse.json({ error: 'লিংক প্রদান করা হয়নি।' }, { status: 400 });
    }

    const { resolvedUrl, bingImage } = await resolvePublisherUrlIfGoogleNews(url, fallbackTitle);

    let html = '';
    let finalUrl = resolvedUrl;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(resolvedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'bn-BD,bn;q=0.9,en-US;q=0.8,en;q=0.7',
        },
        redirect: 'follow',
        signal: controller.signal,
      });
      if (response.ok) {
        finalUrl = response.url || resolvedUrl;
        html = await response.text();
      }
    } catch (_) {
      // Fallback to RSS title + snippet if target site blocks direct scrape
    } finally {
      clearTimeout(timer);
    }

    let extractedTitle = fallbackTitle;
    let extractedText = '';
    let candidateImageUrl = '';

    if (html) {
      const ogTitle = extractMetaContent(html, 'og:title') || extractMetaContent(html, 'twitter:title');
      if (ogTitle) extractedTitle = ogTitle;

      const ogDesc = extractMetaContent(html, 'og:description') || extractMetaContent(html, 'description');
      const ogImage =
        extractMetaContent(html, 'og:image') ||
        extractMetaContent(html, 'twitter:image') ||
        extractMetaContent(html, 'twitter:image:src');

      const { bodyText: jsonLdBody, imageUrl: jsonLdImage } = extractJsonLdArticle(html);
      const paragraphText = extractParagraphs(html);

      // Combine the richest available text
      if (jsonLdBody && jsonLdBody.length > paragraphText.length) {
        extractedText = jsonLdBody;
      } else if (paragraphText.length > 100) {
        extractedText = paragraphText;
      } else if (ogDesc) {
        extractedText = `${ogDesc}\n\n${paragraphText}`.trim();
      }

      candidateImageUrl = ogImage || jsonLdImage || '';
      if (candidateImageUrl && candidateImageUrl.startsWith('/')) {
        try {
          candidateImageUrl = new URL(candidateImageUrl, finalUrl).href;
        } catch (_) {}
      }
    }

    if (!extractedText || extractedText.length < 60) {
      extractedText = [fallbackTitle, fallbackSnippet].filter(Boolean).join('\n\n');
    }

    // Pick best image URL: scraped og:image -> bingImage -> RSS fallbackImage
    const bestImageUrl = candidateImageUrl || bingImage || fallbackImage || '';
    let imagePayload = null;
    if (bestImageUrl) {
      imagePayload = await fetchImageAsDataUrl(bestImageUrl, finalUrl);
    }

    return NextResponse.json({
      sourceUrl: finalUrl,
      title: extractedTitle,
      content: extractedText.slice(0, 8000),
      imageUrl: bestImageUrl,
      imageDataUrl: imagePayload?.dataUrl || null,
      imageMimeType: imagePayload?.mimeType || null,
    });
  } catch (error) {
    console.error('News Scrape Error:', error);
    return NextResponse.json(
      { error: 'লিংক থেকে সংবাদ সংগ্রহ করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}

