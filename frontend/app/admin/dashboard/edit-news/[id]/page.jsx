import EditNews from '../../../../src/admin/EditNews';

export default async function EditNewsPage({ params }) {
  const { id } = await params;
  return <EditNews postId={id} />;
}
