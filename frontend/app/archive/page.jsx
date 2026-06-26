import { Suspense } from 'react';
import NewsArchive from '../../src/components/NewsArchive';

export const metadata = {
  title: 'সংবাদ আর্কাইভ | অপরাধনামা',
  description: 'অপরাধনামা সংবাদ আর্কাইভ — অতীতের সকল অপরাধ সংবাদ ও প্রতিবেদন খুঁজে পান এখানে।',
  alternates: { canonical: 'https://oporadhnama.info/archive' },
  openGraph: {
    title: 'সংবাদ আর্কাইভ | অপরাধনামা',
    description: 'অপরাধনামা সংবাদ আর্কাইভ — অতীতের সকল অপরাধ সংবাদ ও প্রতিবেদন খুঁজে পান এখানে।',
    url: 'https://oporadhnama.info/archive',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function ArchivePage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <NewsArchive />
    </Suspense>
  );
}
