import { Suspense } from 'react';
import NewsArchive from '../../src/components/NewsArchive';

export const metadata = {
  title: 'সংবাদ আর্কাইভ | অপরাধনামা',
};

export const dynamic = 'force-dynamic';

export default function ArchivePage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <NewsArchive />
    </Suspense>
  );
}
