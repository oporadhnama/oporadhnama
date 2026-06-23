import HeroSection from '../components/HeroSection';
import TributeHero from '../components/TributeHero';
import StatsCounter from '../components/StatsCounter';
import NewsMarquee from '../components/NewsMarquee';
import { fetchCategories, fetchPosts, fetchPublicStats, fetchActiveCampaign } from '../lib/api';

export const dynamic = 'force-dynamic';

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
    fetchPublicStats(),
    fetchCategories(),
    fetchPosts('limit=12'),
    fetchActiveCampaign(),
  ]);

  const initialStats = statsResult.status === 'fulfilled' ? normalizeStats(statsResult.value) : {};
  const initialCategories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
  const initialPosts = postsResult.status === 'fulfilled' ? postsResult.value.results || [] : [];
  const activeCampaign = campaignResult.status === 'fulfilled' ? campaignResult.value : { active: false };

  return (
    <>
      {activeCampaign?.active ? (
        <TributeHero campaign={activeCampaign} />
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
