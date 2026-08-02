import React from 'react';

export const metadata = {
  title: 'ব্যবহারের শর্তাবলী (Terms of Service) | অপরাধনামা',
  description: 'অপরাধনামা-এর ব্যবহারের শর্তাবলী এবং সম্পাদনা নীতিমালা। স্বত্বাধিকার, মন্তব্য ও কন্টেন্ট ব্যবহার সম্পর্কিত নির্দেশিকা।',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 md:px-8 max-w-4xl mx-auto w-full pb-20">
      <h1 className="text-3xl md:text-5xl font-black text-white mb-6 border-b border-neutral-800 pb-4">
        ব্যবহারের শর্তাবলী ও সম্পাদনা নীতি
      </h1>

      <div className="space-y-8 text-neutral-300 text-sm md:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ১. শর্তাবলীর সম্মতি
          </h2>
          <p>
            অপরাধনামা (oporadhnama.info) ওয়েবসাইটে প্রবেশ এবং ব্যবহার করার মাধ্যমে আপনি নিম্নলিখিত শর্তাবলী মেনে নিতে সম্মত হচ্ছেন।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ২. বুদ্ধিবৃত্তিক সম্পত্তি ও সর্বস্বত্ব
          </h2>
          <p>
            অপরাধনামায় প্রকাশিত সকল প্রতিবেদন, বিশ্লেষণ, অডিও, গ্রাফ ও ভিজ্যুয়াল কন্টেন্টের সর্বস্বত্ব অপরাধনামা কর্তৃক সংরক্ষিত।
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
            <li>অনুমতি ছাড়া বাণিজ্যিকভাবে আমাদের কন্টেন্ট হুবহু কপি বা রিপ্রিন্ট করা সম্পূর্ণ নিষিদ্ধ।</li>
            <li>সংবাদ বা শিক্ষার উদ্দেশ্যে যথাযথ কৃতিত্ব (Credit & Backlink) প্রদানপূর্বক অংশবিশেষ উদ্ধৃত করা যাবে।</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ৩. তথ্য সাবমিশন নির্দেশিকা
          </h2>
          <p>
            ‘তথ্য দিন’ ফরমে প্রেরিত যেকোনো তথ্য আমরা অনুসন্ধানের উদ্দেশ্যে যাচাই করার পূর্ণ অধিকার রাখি। উদ্দেশ্যপ্রণোদিত মিথ্যা, বিভ্রান্তিকর বা হিংসাত্মক তথ্য প্রদান আইনত দণ্ডনীয়।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ৪. দায়মুক্তি (Disclaimer)
          </h2>
          <p>
            অপরাধনামা সর্বোচ্চ সততার সাথে নির্ভুল তথ্য প্রকাশের চেষ্টা করে। তবে যেকোনো তথ্য বা লিংকের কারণে পরোক্ষ কোনো ক্ষতির জন্য কর্তৃপক্ষ দায়বদ্ধ থাকবে না।
          </p>
        </section>
      </div>
    </div>
  );
}
