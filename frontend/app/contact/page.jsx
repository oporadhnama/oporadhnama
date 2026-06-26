import Contact from '../../src/components/Contact';

export const metadata = {
  title: 'যোগাযোগ | অপরাধনামা',
  description: 'অপরাধনামা কর্তৃপক্ষের সাথে যোগাযোগ করুন। আপনার কোন মতামত, অভিযোগ বা সংবাদ থাকলে আমাদের জানান।',
  alternates: { canonical: 'https://oporadhnama.info/contact' },
  openGraph: {
    title: 'যোগাযোগ | অপরাধনামা',
    description: 'অপরাধনামা Authorities-এর সাথে যোগাযোগ করুন।',
    url: 'https://oporadhnama.info/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <Contact />;
}
