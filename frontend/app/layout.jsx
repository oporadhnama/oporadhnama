import './globals.css';
import SiteShell from '../components/SiteShell';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  // metadataBase is required so Next.js can resolve relative OG image URLs
  metadataBase: new URL('https://oporadhnama.info'),
  title: {
    default: 'অপরাধনামা | বাংলাদেশের অপরাধ সংবাদ',
    template: '%s | অপরাধনামা',
  },
  description:
    'অপরাধনামা — বাংলাদেশের অপরাধভিত্তিক সংবাদ, বিশ্লেষণ ও তথ্যচিত্রের বিশ্বস্ত প্ল্যাটফর্ম।',
  keywords: [
    'অপরাধনামা',
    'বাংলাদেশ অপরাধ সংবাদ',
    'crime news bangladesh',
    'bangla crime news',
    'অপরাধ বার্তা',
    'বাংলাদেশ সংবাদ',
    'আন্তর্জাতিক',
    'dhaka crime',
    'চট্টগ্রাম অপরাধ',
    'রাজশাহী অপরাধ',
    'ঢাকা অপরাধ',
    'হত্যা মামলা',
    'ডাকাতি সংবাদ',
    'মাদক সংবাদ',
    'জুলাই বিপ্লব',
    'শহীদ স্মরণ',
    'গণহত্যা বিচার',
    'bangladesh crime report',
    'latest crime news bangladesh',
    'oporadhnama news',
  ],
  authors: [{ name: 'অপরাধনামা', url: 'https://oporadhnama.info' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://oporadhnama.info',
  },
  openGraph: {
    title: 'অপরাধনামা | বাংলাদেশের অপরাধ সংবাদ',
    description:
      'অপরাধনামা — বাংলাদেশের অপরাধভিত্তিক সংবাদ, বিশ্লেষণ ও তথ্যচিত্রের বিশ্বস্ত প্ল্যাটফর্ম।',
    url: 'https://oporadhnama.info',
    siteName: 'অপরাধনামা',
    images: [
      {
        url: '/og-image.jpg',   // resolved relative to metadataBase
        width: 1200,
        height: 630,
        alt: 'অপরাধনামা - বাংলাদেশের অপরাধভিত্তিক সংবাদ',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oporadhnama',
    creator: '@oporadhnama',
    title: 'অপরাধনামা | বাংলাদেশের অপরাধ সংবাদ',
    description:
      'অপরাধনামা — বাংলাদেশের অপরাধভিত্তিক সংবাদ, বিশ্লেষণ ও তথ্যচিত্রের বিশ্বস্ত প্ল্যাটফর্ম।',
    images: ['/og-image.jpg'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'অপরাধনামা',
    alternateName: 'Oporadhnama',
    url: 'https://oporadhnama.info',
    logo: {
      '@type': 'ImageObject',
      url: 'https://oporadhnama.info/logo-publisher.png',
      width: 600,
      height: 60,
    },
    description: 'বাংলাদেশের অপরাধভিত্তিক সংবাদ, বিশ্লেষণ ও তথ্যচিত্রের বিশ্বস্ত প্ল্যাটফর্ম।',
    inLanguage: 'bn',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'editorial',
      url: 'https://oporadhnama.info/contact',
    },
    sameAs: [
      'https://www.facebook.com/oporadhnama',
      'https://twitter.com/oporadhnama',
    ],
  };

  return (
    <html lang="bn">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
