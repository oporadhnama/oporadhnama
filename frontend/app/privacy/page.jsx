import React from 'react';

export const metadata = {
  title: 'গোপনীয়তা নীতি (Privacy Policy) | অপরাধনামা',
  description: 'অপরাধনামা-এর অফিসিয়াল গোপনীয়তা নীতি। ব্যবহারকারীর তথ্যের নিরাপত্তা, সুরক্ষা ও গোপনীয়তা রক্ষা সংক্রান্ত নীতিমালা।',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 md:px-8 max-w-4xl mx-auto w-full pb-20">
      <h1 className="text-3xl md:text-5xl font-black text-white mb-6 border-b border-neutral-800 pb-4">
        গোপনীয়তা নীতি (Privacy Policy)
      </h1>

      <div className="space-y-8 text-neutral-300 text-sm md:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ১. নীতিমালার ভূমিকা
          </h2>
          <p>
            অপরাধনামা (oporadhnama.info) অনুসন্ধানী সাংবাদিকতা এবং সত্য তথ্য পরিবেশনে প্রতিশ্রুতিবদ্ধ। ব্যবহারকারীর তথ্যের গোপনীয়তা রক্ষা করা আমাদের অন্যতম প্রধান দায়িত্ব। আমরা কীভাবে তথ্য সংগ্রহ, ব্যবহার এবং সংরক্ষণ করি তা এই নীতিমালায় বর্ণিত হলো।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ২. তথ্য সংগ্রহের নীতি (তথ্য প্রদানকারী/সোর্স)
          </h2>
          <p>
            আমাদের ‘তথ্য দিন’ (Tip Submission) ফরমের মাধ্যমে ব্যবহারকারীরা সম্পূর্ণ বেনামে বা ঐচ্ছিকভাবে তথ্য পাঠাতে পারেন।
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
            <li>আমরা কোনো সোর্সের আইপি এড্রেস বা ব্যক্তিগত শনাক্তকারী তথ্য বাধ্যতামূলকভাবে সংরক্ষণ করি না।</li>
            <li>সংবেদনশীল নথিপত্র এবং তথ্যের সুরক্ষায় আধুনিক এনক্রিপশন ব্যবহৃত হয়।</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ৩. কুকিজ ও ব্রাউজিং তথ্য
          </h2>
          <p>
            ওয়েবসাইট পারফরম্যান্স উন্নত করতে এবং ব্যবহারকারীর অভিজ্ঞতার সুবিধার্থে আমরা সাধারণ প্রযুক্তিগত কুকিজ এবং স্ট্যান্ডার্ড ওয়েব এনালিটিক্স ব্যবহার করতে পারি। এটি ব্যবহারকারীর ব্যক্তিগত পরিচয় বা পাসওয়ার্ড সংগ্রহ করে না।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ৪. তথ্যের সুরক্ষা ও তৃতীয় পক্ষ
          </h2>
          <p>
            আমরা কোনো অবস্থাতেই পাঠকদের তথ্য বা ইমেইল তৃতীয় পক্ষের কাছে বিক্রি বা হস্তান্তর করি না। আইনি বাধ্যবাধকতা ব্যতীত কোনো তথ্য প্রকাশ করা হয় না।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 text-[#D62828]">
            ৫. যোগাযোগ
          </h2>
          <p>
            গোপনীয়তা নীতি সংক্রান্ত যেকোনো প্রশ্ন বা পরামর্শের জন্য আমাদের সম্পাদনা টিমের সাথে যোগাযোগ করুন:
            <br />
            ইমেইল: <a href="mailto:editor@oporadhnama.info" className="text-[#D62828] hover:underline">editor@oporadhnama.info</a>
          </p>
        </section>
      </div>
    </div>
  );
}
