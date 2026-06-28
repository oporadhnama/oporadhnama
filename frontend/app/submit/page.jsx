import SubmitInfo from '../../src/components/SubmitInfo';

const SITE_URL = 'https://oporadhnama.info';

export const metadata = {
  title: 'তথ্য দিন | অপরাধনামা',
  description:
    'অপরাধ বা অনিয়মের তথ্য ও সংবাদ আমাদের পাঠান। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।',
  keywords: ['তথ্য দিন', 'সংবাদ পাঠান', 'অপরাধ তথ্য', 'submit news bangladesh', 'whistleblower bangladesh'],
  alternates: { canonical: `${SITE_URL}/submit` },
  openGraph: {
    title: 'তথ্য দিন | অপরাধনামা',
    description:
      'অপরাধ বা অনিয়মের তথ্য ও সংবাদ আমাদের পাঠান। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।',
    url: `${SITE_URL}/submit`,
    type: 'website',
    siteName: 'অপরাধনামা',
    locale: 'bn_BD',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'অপরাধনামা তথ্য দিন' }],
  },
  twitter: {
    card: 'summary',
    site: '@oporadhnama',
    title: 'তথ্য দিন | অপরাধনামা',
    description:
      'অপরাধ বা অনিয়মের তথ্য ও সংবাদ আমাদের পাঠান। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।',
  },
};

export default function SubmitPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'তথ্য দিন', item: `${SITE_URL}/submit` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SubmitInfo />
    </>
  );
}
