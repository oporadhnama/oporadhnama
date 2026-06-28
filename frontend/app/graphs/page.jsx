import Graphs from '../../src/components/Graphs';

const SITE_URL = 'https://oporadhnama.info';

export const metadata = {
  title: 'অপরাধ পরিসংখ্যান ও গ্রাফ | অপরাধনামা',
  description:
    'বাংলাদেশের অপরাধের বিভিন্ন পরিসংখ্যান ও গ্রাফিক্যাল বিশ্লেষণ — বিভাগ, ধরন ও সময় অনুযায়ী অপরাধের চিত্র দেখুন অপরাধনামায়।',
  keywords: [
    'অপরাধ পরিসংখ্যান',
    'বাংলাদেশ অপরাধ গ্রাফ',
    'crime statistics bangladesh',
    'অপরাধনামা গ্রাফ',
    'অপরাধ বিশ্লেষণ',
  ],
  alternates: { canonical: `${SITE_URL}/graphs` },
  openGraph: {
    title: 'অপরাধ পরিসংখ্যান ও গ্রাফ | অপরাধনামা',
    description:
      'বাংলাদেশের অপরাধের বিভিন্ন পরিসংখ্যান ও গ্রাফিক্যাল বিশ্লেষণ — বিভাগ, ধরন ও সময় অনুযায়ী অপরাধের চিত্র দেখুন।',
    url: `${SITE_URL}/graphs`,
    type: 'website',
    siteName: 'অপরাধনামা',
    locale: 'bn_BD',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'অপরাধনামা পরিসংখ্যান গ্রাফ' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oporadhnama',
    title: 'অপরাধ পরিসংখ্যান ও গ্রাফ | অপরাধনামা',
    description:
      'বাংলাদেশের অপরাধের বিভিন্ন পরিসংখ্যান ও গ্রাফিক্যাল বিশ্লেষণ দেখুন অপরাধনামায়।',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function GraphsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'অপরাধ পরিসংখ্যান ও গ্রাফ',
    description:
      'বাংলাদেশের অপরাধের বিভিন্ন পরিসংখ্যান ও গ্রাফিক্যাল বিশ্লেষণ।',
    url: `${SITE_URL}/graphs`,
    inLanguage: 'bn',
    isPartOf: {
      '@type': 'WebSite',
      name: 'অপরাধনামা',
      url: SITE_URL,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'হোম', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'পরিসংখ্যান ও গ্রাফ', item: `${SITE_URL}/graphs` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Graphs />
    </>
  );
}
