import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function NewsEntryPage({ searchParams }) {
  const id = searchParams?.id;
  const slug = searchParams?.slug;

  if (id) {
    redirect(`/news/${id}`);
  }

  if (slug) {
    redirect(`/news/${slug}`);
  }

  notFound();
}
