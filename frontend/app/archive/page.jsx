import { Suspense } from 'react';
import NewsArchive from '../../src/components/NewsArchive';

const SITE_URL = 'https://oporadhnama.info';

export const metadata = {
  title: 'সংবাদ আর্কাইভ | অপরাধনামা',
  description:
    'অপরাধনামা সংবাদ আর্কাইভ — অতীতের সকল অপরাধ সংবাদ ও প্রতিবেদন খুঁজে পান এখানে।',
  keywords: [
    'অপরাধ সংবাদ আর্কাইভ',
    'crime news archive bangladesh',
    'পুরানো সংবাদ',
    'অপরাধনামা আর্কাইভ',
  ],
  alternates: { canonical: `${SITE_URL}/archive` },
  openGraph: {
    title: 'সংবাদ আর্কাইভ | অপরাধনামা',
    description:
      'অপরাধনামা সংবাদ আর্কাইভ — অতীতের সকল অপরাধ সংবাদ ও প্রতিবেদন খুঁজে পান এখানে।',
    url: `${SITE_URL}/archive`,
    type: 'website',
    siteName: 'অপরাধনামা',
    locale: 'bn_BD',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'অপরাধনামা সংবাদ আর্কাইভ' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oporadhnama',
    title: 'সংবাদ আর্কাইভ | অপরাধনামা',
    description:
      'অপরাধনামা সংবাদ আর্কাইভ — অতীতের সকল অপরাধ সংবাদ এখানে পান।',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export const dynamic = 'force-dynamic';

export default function ArchivePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'সংবাদ আর্কাইভ', item: `${SITE_URL}/archive` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
        <NewsArchive />
      </Suspense>
    </>
  );
}
