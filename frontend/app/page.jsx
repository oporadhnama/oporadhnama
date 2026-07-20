import HeroSection from '../components/HeroSection';
import NewsFeed from '../components/NewsFeed';
import { fetchCategories, fetchPosts } from '../lib/api';

export const revalidate = 60;

export const metadata = {
  alternates: { canonical: 'https://oporadhnama.info' },
  openGraph: {
    url: 'https://oporadhnama.info',
    type: 'website',
  },
};

export default async function HomePage() {
  const [categoriesResult, postsResult] = await Promise.allSettled([
    fetchCategories({ next: { revalidate: 60 } }),
    fetchPosts('limit=13', { next: { revalidate: 60 } }),
  ]);

  const initialCategories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
  const initialPosts = postsResult.status === 'fulfilled' ? postsResult.value.results || [] : [];

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
      <HeroSection />
      <NewsFeed
        initialPosts={initialPosts}
        initialCategories={initialCategories}
      />
    </>
  );
}
