import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NewsEntryPage({ searchParams }) {
  const { id, slug } = await searchParams;


  if (id) {
    redirect(`/news/${id}`);
  }

  if (slug) {
    redirect(`/news/${slug}`);
  }

  notFound();
}

