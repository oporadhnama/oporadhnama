import HeroSection from '../components/HeroSection';
import TributeHero from '../components/TributeHero';
import JulyQuotesBanner from '../components/JulyQuotesBanner';
import StatsCounter from '../components/StatsCounter';
import NewsMarquee from '../components/NewsMarquee';
import { fetchCategories, fetchPosts, fetchPublicStats, fetchActiveCampaign } from '../lib/api';

export const revalidate = 60;

export const metadata = {
  alternates: { canonical: 'https://oporadhnama.info' },
  openGraph: {
    url: 'https://oporadhnama.info',
    type: 'website',
  },
};

function normalizeStats(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, Number.isFinite(Number(value)) ? Number(value) : 0])
  );
}

export default async function HomePage() {
  const [statsResult, categoriesResult, postsResult, campaignResult] = await Promise.allSettled([
    fetchPublicStats({ next: { revalidate: 60 } }),
    fetchCategories({ next: { revalidate: 60 } }),
    fetchPosts('limit=12', { next: { revalidate: 60 } }),
    fetchActiveCampaign({ next: { revalidate: 60 } }),
  ]);

  const initialStats = statsResult.status === 'fulfilled' ? normalizeStats(statsResult.value) : {};
  const initialCategories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
  const initialPosts = postsResult.status === 'fulfilled' ? postsResult.value.results || [] : [];
  const activeCampaign = campaignResult.status === 'fulfilled' ? campaignResult.value : { active: false };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'অপরাধনামা',
    alternateName: ['Oporadhnama', 'অপরাধনামা নিউজ', 'দেশ ও দশের সংবাদ'],
    url: 'https://oporadhnama.info',
    description: 'অপরাধনামা — দেশ ও দশের সংবাদ। বাংলাদেশের রাজনীতি, অপরাধ, বিশ্লেষণ ও অনুসন্ধানী সাংবাদিকতার বিশ্বস্ত ডিজিটাল প্ল্যাটফর্ম।',
    inLanguage: 'bn',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://oporadhnama.info/all-news?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {activeCampaign?.active ? (
        <>
          <TributeHero campaign={activeCampaign} />
          <JulyQuotesBanner />
        </>
      ) : (
        <HeroSection />
      )}
      <StatsCounter
        initialCounts={initialStats}
        initialCategories={initialCategories}
      />
      <NewsMarquee initialPosts={initialPosts} />
    </>
  );
}
