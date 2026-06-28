import Contact from '../../src/components/Contact';

const SITE_URL = 'https://oporadhnama.info';

export const metadata = {
  title: 'যোগাযোগ | অপরাধনামা',
  description:
    'অপরাধনামা কর্তৃপক্ষের সাথে যোগাযোগ করুন। আপনার কোন মতামত, অভিযোগ বা সংবাদ থাকলে আমাদের জানান।',
  keywords: ['অপরাধনামা যোগাযোগ', 'contact oporadhnama', 'সংবাদ পাঠান'],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'যোগাযোগ | অপরাধনামা',
    description:
      'অপরাধনামা কর্তৃপক্ষের সাথে যোগাযোগ করুন। আপনার কোন মতামত, অভিযোগ বা সংবাদ থাকলে আমাদের জানান।',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'অপরাধনামা',
    locale: 'bn_BD',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'অপরাধনামা যোগাযোগ' }],
  },
  twitter: {
    card: 'summary',
    site: '@oporadhnama',
    title: 'যোগাযোগ | অপরাধনামা',
    description:
      'অপরাধনামা কর্তৃপক্ষের সাথে যোগাযোগ করুন। আপনার কোন মতামত, অভিযোগ বা সংবাদ থাকলে আমাদের জানান।',
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'হোম', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'যোগাযোগ', item: `${SITE_URL}/contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Contact />
    </>
  );
}
