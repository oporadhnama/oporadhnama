import SubmitInfo from '../../src/components/SubmitInfo';

export const metadata = {
  title: 'তথ্য দিন | অপরাধনামা',
  description: 'অপরাধ বা অনিয়মের তথ্য ও সংবাদ আমাদের পাঠান। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।',
  alternates: { canonical: 'https://oporadhnama.info/submit' },
  openGraph: {
    title: 'তথ্য দিন | অপরাধনামা',
    description: 'অপরাধ বা অনিয়মের তথ্য ও সংবাদ আমাদের পাঠান। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।',
    url: 'https://oporadhnama.info/submit',
    type: 'website',
  },
};

export default function SubmitPage() {
  return <SubmitInfo />;
}
