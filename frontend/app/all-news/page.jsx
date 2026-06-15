import { Suspense } from 'react';
import AllNews from '../../src/components/AllNews';

export const metadata = {
  title: 'সকল সংবাদ | অপরাধনামা',
};

export const dynamic = 'force-dynamic';

export default function AllNewsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <AllNews />
    </Suspense>
  );
}
