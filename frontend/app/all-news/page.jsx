import { Suspense } from 'react';
import AllNews from '../../src/components/AllNews';

const SITE_URL = 'https://oporadhnama.info';

export const metadata = {
  title: 'সকল সংবাদ | অপরাধনামা',
  description:
    'অপরাধনামা সকল সংবাদ — বাংলাদেশের সর্বশেষ অপরাধ সংবাদ, তদন্ত এবং বিশেষ প্রতিবেদনগুলো একসাথে এখানে পান।',
  keywords: [
    'বাংলাদেশ অপরাধ সংবাদ',
    'সকল সংবাদ',
    'latest crime news bangladesh',
    'অপরাধনামা সংবাদ',
    'all news oporadhnama',
  ],
  alternates: { canonical: `${SITE_URL}/all-news` },
  openGraph: {
    title: 'সকল সংবাদ | অপরাধনামা',
    description:
      'অপরাধনামা সকল সংবাদ — বাংলাদেশের সর্বশেষ অপরাধ সংবাদ, তদন্ত এবং বিশেষ প্রতিবেদনগুলো একসাথে এখানে পান।',
    url: `${SITE_URL}/all-news`,
    type: 'website',
    siteName: 'অপরাধনামা',
    locale: 'bn_BD',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'অপরাধনামা সকল সংবাদ' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oporadhnama',
    title: 'সকল সংবাদ | অপরাধনামা',
    description:
      'অপরাধনামা সকল সংবাদ — বাংলাদেশের সর্বশেষ অপরাধ সংবাদ এখানে পান।',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export const dynamic = 'force-dynamic';

export default function AllNewsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'সকল সংবাদ', item: `${SITE_URL}/all-news` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
        <AllNews />
      </Suspense>
    </>
  );
}
