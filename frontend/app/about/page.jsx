import About from '../../src/components/About';

export const metadata = {
  title: 'আমাদের সম্পর্কে | অপরাধনামা',
  description: 'অপরাধনামা সম্পর্কে জানুন — বাংলাদেশের অপরাধভিত্তিক সংবাদের বিশ্বস্ত প্ল্যাটফর্ম।',
  alternates: { canonical: 'https://oporadhnama.info/about' },
  openGraph: {
    title: 'আমাদের সম্পর্কে | অপরাধনামা',
    description: 'অপরাধনামা সম্পর্কে জানুন — বাংলাদেশের অপরাধভিত্তিক সংবাদের বিশ্বস্ত প্ল্যাটফর্ম।',
    url: 'https://oporadhnama.info/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <About />;
}
