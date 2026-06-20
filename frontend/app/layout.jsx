import './globals.css';
import SiteShell from '../components/SiteShell';

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
    'dhaka crime',
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
    title: 'অপরাধনামা | বাংলাদেশের অপরাধ সংবাদ',
    description:
      'অপরাধনামা — বাংলাদেশের অপরাধভিত্তিক সংবাদ, বিশ্লেষণ ও তথ্যচিত্রের বিশ্বস্ত প্ল্যাটফর্ম।',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
