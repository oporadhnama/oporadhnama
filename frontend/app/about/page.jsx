import About from '../../src/components/About';

const SITE_URL = 'https://oporadhnama.info';

export const metadata = {
  title: 'আমাদের সম্পর্কে | অপরাধনামা',
  description:
    'অপরাধনামা সম্পর্কে জানুন — বাংলাদেশের অপরাধভিত্তিক সংবাদের বিশ্বস্ত প্ল্যাটফর্ম।',
  keywords: ['অপরাধনামা সম্পর্কে', 'about oporadhnama', 'অপরাধনামা প্রসঙ্গ'],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'আমাদের সম্পর্কে | অপরাধনামা',
    description:
      'অপরাধনামা সম্পর্কে জানুন — বাংলাদেশের অপরাধভিত্তিক সংবাদের বিশ্বস্ত প্ল্যাটফর্ম।',
    url: `${SITE_URL}/about`,
    type: 'website',
    siteName: 'অপরাধনামা',
    locale: 'bn_BD',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'অপরাধনামা - সম্পর্কে' }],
  },
  twitter: {
    card: 'summary',
    site: '@oporadhnama',
    title: 'আমাদের সম্পর্কে | অপরাধনামা',
    description:
      'অপরাধনামা সম্পর্কে জানুন — বাংলাদেশের অপরাধভিত্তিক সংবাদের বিশ্বস্ত প্ল্যাটফর্ম।',
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'আমাদের সম্পর্কে', item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <About />
    </>
  );
}
