import './globals.css';
import SiteShell from '../components/SiteShell';

export const metadata = {
  title: 'অপরাধনামা',
  description: 'বাংলাদেশের অপরাধভিত্তিক সংবাদ ও বিশ্লেষণ প্ল্যাটফর্ম',
  openGraph: {
    title: 'অপরাধনামা',
    description: 'বাংলাদেশের অপরাধভিত্তিক সংবাদ ও বিশ্লেষণ প্ল্যাটফর্ম',
    url: 'https://oporadhnama.vercel.app',
    siteName: 'Oporadhnama',
    images: [
      {
        url: 'https://oporadhnama.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oporadhnama - বাংলাদেশের অপরাধভিত্তিক সংবাদ',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'অপরাধনামা',
    description: 'বাংলাদেশের অপরাধভিত্তিক সংবাদ ও বিশ্লেষণ প্ল্যাটফর্ম',
    images: ['https://oporadhnama.vercel.app/twitter-image.jpg'],
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
