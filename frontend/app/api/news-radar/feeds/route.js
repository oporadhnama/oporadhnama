import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

// Exact 10 feeds provided by the user
const DEFAULT_FEEDS = [
  {
    id: 'prothom-alo',
    name: 'প্রথম আলো (Prothom Alo)',
    category: 'জাতীয় ও রাজনীতি',
    url: 'https://www.prothomalo.com/stories.rss',
  },
  {
    id: 'samakal',
    name: 'সমকাল (Samakal)',
    category: 'জাতীয় ও রাজনীতি',
    url: 'https://samakal.com/rss',
  },
  {
    id: 'jagonews24',
    name: 'জাগো নিউজ ২৪ (JagoNews24)',
    category: 'জাতীয় ও অপরাধ',
    url: 'https://www.jagonews24.com/rss/rss.xml',
  },
  {
    id: 'bdpratidin',
    name: 'বাংলাদেশ প্রতিদিন (BD Pratidin)',
    category: 'জাতীয় ও অপরাধ',
    url: 'https://bdpratidin.net/rss/latest-posts',
  },
  {
    id: 'sunnews24x7',
    name: 'সান নিউজ ২৪x৭ (SunNews24x7)',
    category: 'জাতীয় ও অপরাধ',
    url: 'https://www.sunnews24x7.com/feeds',
  },
  {
    id: 'amarbanglabd',
    name: 'আমার বাংলা বিডি (AmarBanglaBD)',
    category: 'জাতীয় ও রাজনীতি',
    url: 'https://www.amarbanglabd.com/',
  },
  {
    id: 'bd24live',
    name: 'BD24Live',
    category: 'জাতীয় ও রাজনীতি',
    url: 'https://www.bd24live.com/feed/',
  },
  {
    id: 'thedailystar',
    name: 'The Daily Star',
    category: 'অপরাধ ও বিচার',
    url: 'https://www.thedailystar.net/taxonomy/term/107/rss.xml',
  },
  {
    id: 'aljazeera',
    name: 'Al Jazeera (আন্তর্জাতিক)',
    category: 'আন্তর্জাতিক',
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
  },
  {
    id: 'middleeasteye',
    name: 'Middle East Eye (মধ্যপ্রাচ্য)',
    category: 'আন্তর্জাতিক',
    url: 'https://www.middleeasteye.net/rss',
  },
];

// High-seriousness keywords (Bengali + English for Daily Star, BD24Live, Al Jazeera, Middle East Eye)
const CRITICAL_CRIME_KEYWORDS = [
  'হত্যা', 'খুন', 'লাশ', 'মরদেহ', 'ধর্ষণ', 'গণধর্ষণ', 'নির্যাতন', 'অপহরণ', 'ডাকাতি',
  'ছিনতাই', 'গুলি', 'বন্দুকযুদ্ধ', 'অস্ত্র', 'বিস্ফোরক', 'বোমা', 'মাদক', 'ইয়াবা',
  'ফেনসিডিল', 'চোরাচালান', 'গ্রেফতার', 'গ্রেপ্তার', 'আটক', 'মামলা', 'রিমান্ড',
  'কারাদণ্ড', 'মৃত্যুদণ্ড', 'ফাঁসি', 'হামলা', 'সংঘর্ষ', 'নিহত', 'আহত', 'সন্ত্রাসী',
  'কিশোর গ্যাং', 'চাঁদাবাজি', 'র‍্যাব', 'পুলিশ', 'ডিবি', 'সিআইডি', 'যৌথ বাহিনী',
  'আত্মসমর্পণ', 'চরমপন্থী', 'জঙ্গি', 'আগুন', 'ধ্বংস',
  'murder', 'killed', 'dead', 'death', 'rape', 'assault', 'molester', 'arrest', 'arrested',
  'robbery', 'abducted', 'kidnap', 'firearms', 'narcotics', 'shot', 'shooting', 'attack',
  'clash', 'police', 'crime', 'prison', 'jail', 'genocide', 'massacre', 'torture', 'mossad'
];

const POLITICAL_SERIOUS_KEYWORDS = [
  'দুর্নীতি', 'লুটপাট', 'অর্থপাচার', 'সিন্ডিকেট', 'দুদক', 'ট্রাইব্যুনাল', 'গণহত্যা',
  'জুলাই', 'শহীদ', 'ফ্যাসিস্ট', 'আওয়ামী', 'বিএনপি', 'জামায়াত', 'অন্তর্বর্তী',
  'প্রধানমন্ত্রী', 'উপদেষ্টা', 'মন্ত্রী', 'নির্বাচন', 'সংসদ', 'সংবিধান', 'হাইকোর্ট',
  'সুপ্রিম কোর্ট', 'বিচারপতি', 'সেনাবাহিনী', 'বিজিবি', 'সীমান্ত', 'বিএসএফ', 'কূটনীতি',
  'যুদ্ধ', 'হামাস', 'ইসরায়েল', 'ফিলিস্তিন', 'গাজা', 'লেবানন', 'ইরান', 'রাশিয়া',
  'ইউক্রেন', 'যুক্তরাষ্ট্র', 'ভারত', 'পাকিস্তান', 'মিয়ানমার', 'আরাকান', 'রোহিঙ্গা',
  'বিক্ষোভ', 'অবরোধ', 'ধর্মঘট', 'সংস্কার', 'সচিবালয়',
  'corruption', 'tribunal', 'supreme court', 'government', 'prime minister', 'minister',
  'election', 'protest', 'rally', 'opposition', 'border', 'diplomacy', 'israel', 'iran',
  'gaza', 'palestine', 'hamas', 'lebanon', 'hezbollah', 'war', 'strike', 'military',
  'sanctions', 'un ', 'united nations', 'rohingya', 'india', 'pakistan', 'china', 'us '
];

// Exclude trivial/non-serious news (sports, showbiz, horoscopes, recipes)
const EXCLUDE_KEYWORDS = [
  'রাশিফল', 'রেসিপি', 'রান্না', 'রূপচর্চা', 'বলিউড', 'টলিউড', 'হলিউড', 'অভিনেত্রী',
  'অভিনেতা', 'গান', 'নাটক', 'সিনেমা', 'ক্রিকেট', 'ফুটবল', 'আইপিএল', 'বিপিএল',
  'টি-টোয়েন্টি', 'টি-টোয়েন্টি', 'উইকেট', 'সেঞ্চুরি', 'হাফ-সেঞ্চুরি', 'ব্যাটিং', 'বোলার',
  'কিউই', 'প্যাভিলিয়ন', 'তারকা', 'প্রেম', 'বিয়ে করলেন',
  'cricket', 'football', 'bollywood', 'recipe', 'horoscope', 't20', 'wicket', 'tournament'
];

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
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function stripTags(html = '') {
  return decodeEntities(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTagContent(xml, tagName) {
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? decodeEntities(match[1].trim()) : '';
}

function extractImageFromItem(itemXml) {
  // 1. Check <media:content url="..."> or <media:thumbnail url="..."> or <enclosure url="...">
  const mediaMatch = itemXml.match(/<(?:media:content|media:thumbnail|enclosure)[^>]+url=["']([^"']+)["']/i);
  if (mediaMatch && mediaMatch[1]) return decodeEntities(mediaMatch[1]);

  // 2. Check <img src="..."> inside description/content/summary
  const imgMatch = itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1]) {
    return decodeEntities(imgMatch[1]);
  }
  return null;
}

function scoreItemSeriousness(title, snippet, feedCategory, link = '') {
  const combined = `${title} ${snippet}`.toLowerCase();
  const lowerLink = (link || '').toLowerCase();

  // Exclude sports/entertainment URL paths directly
  if (
    lowerLink.includes('/sports/') ||
    lowerLink.includes('/entertainment/') ||
    lowerLink.includes('/lifestyle/') ||
    lowerLink.includes('/showbiz/')
  ) {
    return { score: -10, tag: 'বিনোদন/খেলা', level: 'LOW', matchedKeywords: [] };
  }

  for (const ex of EXCLUDE_KEYWORDS) {
    if (combined.includes(ex.toLowerCase())) {
      return { score: -10, tag: 'বিনোদন/খেলা', level: 'LOW', matchedKeywords: [] };
    }
  }

  let crimeHits = 0;
  let politicalHits = 0;
  const matchedKeywords = [];

  for (const kw of CRITICAL_CRIME_KEYWORDS) {
    if (combined.includes(kw.toLowerCase())) {
      crimeHits += 1;
      if (matchedKeywords.length < 4) matchedKeywords.push(kw.trim());
    }
  }

  for (const kw of POLITICAL_SERIOUS_KEYWORDS) {
    if (combined.includes(kw.toLowerCase())) {
      politicalHits += 1;
      if (matchedKeywords.length < 4) matchedKeywords.push(kw.trim());
    }
  }

  const isIntlFeed = feedCategory === 'আন্তর্জাতিক';
  const totalScore =
    crimeHits * 3 +
    politicalHits * 2 +
    (lowerLink.includes('/crime') || lowerLink.includes('/politics') || lowerLink.includes('/national') ? 2 : 0) +
    (isIntlFeed && (crimeHits > 0 || politicalHits > 0) ? 2 : 0);

  let tag = feedCategory || 'জাতীয়';
  if (isIntlFeed) {
    tag = 'আন্তর্জাতিক';
  } else if (crimeHits >= 1 && crimeHits >= politicalHits) {
    tag = 'অপরাধ ও অনুসন্ধান';
  } else if (politicalHits >= 1) {
    tag = 'রাজনীতি ও বিচার';
  }

  let level = 'MEDIUM';
  if (totalScore >= 5 || crimeHits >= 2) {
    level = 'CRITICAL';
  } else if (totalScore >= 2) {
    level = 'HIGH';
  }

  return {
    score: totalScore,
    tag,
    level,
    matchedKeywords,
  };
}

function parseHtmlHomepage(html, feedMeta) {
  const items = [];
  const baseOrigin = new URL(feedMeta.url).origin;
  // Match <a ... href="/category/slug">...<h2|h3>Title</h2|h3>...</a>
  const anchorRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  const seenLinks = new Set();

  while ((match = anchorRegex.exec(html)) !== null && items.length < 30) {
    const rawHref = match[1].trim();
    const innerHtml = match[2];

    // Must contain a heading <h1>, <h2>, <h3>, or <h4>
    const headingMatch = innerHtml.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
    if (!headingMatch) continue;

    const title = stripTags(headingMatch[1]);
    if (!title || title.length < 12) continue;

    const link = rawHref.startsWith('http')
      ? rawHref
      : `${baseOrigin}${rawHref.startsWith('/') ? '' : '/'}${rawHref}`;

    if (seenLinks.has(link)) continue;
    seenLinks.add(link);

    const pMatch = innerHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const snippet = pMatch ? stripTags(pMatch[1]).slice(0, 280) : '';

    const imgMatch = innerHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    let image = imgMatch ? decodeEntities(imgMatch[1]) : null;
    if (image && image.startsWith('/')) {
      image = `${baseOrigin}${image}`;
    }

    const evaluation = scoreItemSeriousness(title, snippet, feedMeta.category, link);
    if (evaluation.score < 0) continue;

    items.push({
      id: Buffer.from(link).toString('base64').slice(0, 32),
      title,
      link,
      snippet,
      pubDate: new Date().toISOString(),
      source: feedMeta.name,
      feedId: feedMeta.id,
      image,
      seriousnessScore: Math.max(1, evaluation.score),
      seriousnessLevel: evaluation.level,
      categoryTag: evaluation.tag,
      matchedKeywords: evaluation.matchedKeywords,
    });
  }

  return items;
}

function parseRssOrAtomXml(text, feedMeta) {
  // If response is an HTML page (like amarbanglabd.com), use the HTML card extractor
  if (
    !text.includes('<item') &&
    !text.includes('<entry') &&
    (text.includes('<!DOCTYPE html') || text.includes('<html'))
  ) {
    return parseHtmlHomepage(text, feedMeta);
  }

  const items = [];
  const itemRegex = /<(?:item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/(?:item|entry)>/gi;
  let match;

  while ((match = itemRegex.exec(text)) !== null && items.length < 35) {
    const block = match[1];
    const title = stripTags(extractTagContent(block, 'title'));

    let link = extractTagContent(block, 'link');
    if (!link || link.startsWith('<')) {
      const atomLink = block.match(/<link[^>]+href=["']([^"']+)["']/i);
      if (atomLink) link = decodeEntities(atomLink[1]);
    }
    if (!link) {
      const guid = extractTagContent(block, 'id') || extractTagContent(block, 'guid');
      if (guid && guid.startsWith('http')) link = guid;
    }

    const rawDesc =
      extractTagContent(block, 'description') ||
      extractTagContent(block, 'summary') ||
      extractTagContent(block, 'content:encoded') ||
      extractTagContent(block, 'content');
    const fullPlainText = stripTags(rawDesc);
    const snippet = fullPlainText.slice(0, 320);

    const pubDate =
      extractTagContent(block, 'pubDate') ||
      extractTagContent(block, 'published') ||
      extractTagContent(block, 'updated') ||
      extractTagContent(block, 'atom:updated');

    const mediaKeywords = stripTags(extractTagContent(block, 'media:keywords'));
    const image = extractImageFromItem(block);

    if (!title || !link) continue;

    const evaluation = scoreItemSeriousness(
      title,
      `${snippet} ${mediaKeywords}`,
      feedMeta.category,
      link
    );
    if (evaluation.score < 0) continue;

    items.push({
      id: Buffer.from(link).toString('base64').slice(0, 32),
      title,
      link,
      snippet: snippet !== title ? snippet : '',
      fullFeedContent: fullPlainText.length > 120 ? fullPlainText : '',
      pubDate: pubDate || new Date().toISOString(),
      source: feedMeta.name,
      feedId: feedMeta.id,
      image,
      seriousnessScore: evaluation.score,
      seriousnessLevel: evaluation.level,
      categoryTag: evaluation.tag,
      matchedKeywords: evaluation.matchedKeywords,
    });
  }

  return items;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { customQuery = '', customFeeds = [], onlySerious = true } = body;

    const feedsToFetch = [...DEFAULT_FEEDS, ...customFeeds];

    const results = await Promise.allSettled(
      feedsToFetch.map(async (feed) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 14000);
        try {
          const res = await fetch(feed.url, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
              Accept:
                'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html, */*',
            },
            signal: controller.signal,
            cache: 'no-store',
          });
          if (!res.ok) return [];
          const text = await res.text();
          return parseRssOrAtomXml(text, feed);
        } finally {
          clearTimeout(timer);
        }
      })
    );

    const allItems = [];
    const seenLinks = new Set();
    const seenTitles = new Set();
    const queryLower = customQuery.trim().toLowerCase();

    for (const r of results) {
      if (r.status === 'fulfilled' && Array.isArray(r.value)) {
        for (const item of r.value) {
          const normTitle = item.title.slice(0, 45).toLowerCase();
          if (seenLinks.has(item.link) || seenTitles.has(normTitle)) continue;

          if (queryLower) {
            const hay = `${item.title} ${item.snippet} ${item.source}`.toLowerCase();
            if (!hay.includes(queryLower)) continue;
          } else if (onlySerious && item.seriousnessScore < 1) {
            continue;
          }

          seenLinks.add(item.link);
          seenTitles.add(normTitle);
          allItems.push(item);
        }
      }
    }

    // Sort by seriousness score first, then newest pubDate
    allItems.sort((a, b) => {
      if (b.seriousnessScore !== a.seriousnessScore) {
        return b.seriousnessScore - a.seriousnessScore;
      }
      const tB = new Date(b.pubDate).getTime() || 0;
      const tA = new Date(a.pubDate).getTime() || 0;
      return tB - tA;
    });

    return NextResponse.json({
      items: allItems.slice(0, 90),
      totalScanned: seenTitles.size,
      scannedAt: new Date().toISOString(),
      feeds: DEFAULT_FEEDS.map(({ id, name, category, url }) => ({ id, name, category, url })),
    });
  } catch (error) {
    console.error('News Radar RSS Error:', error);
    return NextResponse.json(
      { error: 'RSS ফিড স্ক্যান করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}
