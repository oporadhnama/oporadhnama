import { Suspense } from 'react';
import AllNews from '../../src/components/AllNews';

export const metadata = {
  title: 'সকল সংবাদ | অপরাধনামা',
  description: 'অপরাধনামা সকল সংবাদ — বাংলাদেশের সর্বশেষ অপরাধ সংবাদ, তদন্ত এবং বিশেষ প্রতিবেদনগুলো একসাথে এখানে পান।',
  alternates: { canonical: 'https://oporadhnama.info/all-news' },
  openGraph: {
    title: 'সকল সংবাদ | অপরাধনামা',
    description: 'অপরাধনামা সকল সংবাদ — বাংলাদেশের সর্বশেষ অপরাধ সংবাদ, তদন্ত এবং বিশেষ প্রতিবেদনগুলো একসাথে এখানে পান।',
    url: 'https://oporadhnama.info/all-news',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function AllNewsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <AllNews />
    </Suspense>
  );
}
