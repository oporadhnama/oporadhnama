import { Suspense } from 'react';
import NewsArchive from '../../src/components/NewsArchive';

const SITE_URL = 'https://oporadhnama.info';

export const metadata = {
  title: 'সংবাদ আর্কাইভ | অপরাধনামা',
  description:
    'অপরাধনামা সংবাদ আর্কাইভ — বাংলাদেশের অপরাধ, রাজনীতি ও জাতীয় বিষয়ে অতীতের সকল প্রতিবেদন ও বিশ্লেষণ খুঁজে পান এখানে।',
  keywords: [
    'সংবাদ আর্কাইভ',
    'অপরাধ সংবাদ আর্কাইভ',
    'crime news archive bangladesh',
    'bangladesh news archive',
    'পুরানো সংবাদ',
    'অপরাধনামা আর্কাইভ',
    'বাংলাদেশ সংবাদের ইতিহাস',
    'old news bangladesh',
  ],
  alternates: { canonical: `${SITE_URL}/archive` },
  openGraph: {
    title: 'সংবাদ আর্কাইভ | অপরাধনামা',
    description:
      'অপরাধনামা সংবাদ আর্কাইভ — অতীতের সকল অপরাধ, রাজনীতি ও সংবাদ প্রতিবেদন খুঁজে পান এখানে।',
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
      'অপরাধনামা — দেশ ও দশের সংবাদ। বাংলাদেশের সংবাদ আর্কাইভ এখানে পান।',
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
