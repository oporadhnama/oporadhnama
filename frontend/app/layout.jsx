import './globals.css';
import SiteShell from '../components/SiteShell';

export const metadata = {
  title: 'অপরাধনামা',
  description: 'বাংলাদেশের অপরাধভিত্তিক সংবাদ ও বিশ্লেষণ প্ল্যাটফর্ম',
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
