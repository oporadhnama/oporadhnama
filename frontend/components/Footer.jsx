'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-2xl font-black tracking-wide select-none">
              <img src="/favicon.svg" alt="অপরাধনামা" className="w-8 h-8 object-contain" />
              <div>
                <span className="text-white font-extrabold">অপরাধ</span>
                <span className="text-[#D62828] font-black">নামা</span>
              </div>
            </Link>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-md">
              অপরাধনামা — দেশ ও দশের সংবাদ। সত্যের সন্ধান, নির্ভীক অনুসন্ধান এবং নিরপেক্ষ সাংবাদিকতার ডিজিটাল প্ল্যাটফর্ম।
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              <span>🇧🇩 Made with ❤️ for Bangladesh</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-[#D62828] pb-1.5 w-fit">
              দ্রুত লিঙ্ক
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link href="/all-news" className="hover:text-[#D62828] transition-colors">
                  সকল সংবাদ
                </Link>
              </li>
              <li>
                <Link href="/graphs" className="hover:text-[#D62828] transition-colors">
                  অপরাধ গ্রাফ ও বিশ্লেষণ
                </Link>
              </li>

              <li>
                <Link href="/submit" className="hover:text-[#D62828] transition-colors">
                  তথ্য ও রিপোর্ট দিন (গোপনীয়)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D62828] transition-colors">
                  আমাদের সম্পর্কে
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy, Legal & Social */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-[#D62828] pb-1.5 w-fit">
              নীতিমালা ও যোগাযোগ
            </h4>
            <ul className="space-y-2 text-xs md:text-sm mb-4">
              <li>
                <Link href="/privacy" className="hover:text-[#D62828] transition-colors">
                  গোপনীয়তা নীতি (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D62828] transition-colors">
                  ব্যবহারের শর্তাবলী (Terms of Service)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D62828] transition-colors">
                  যোগাযোগ ও তথ্য সরবরাহ
                </Link>
              </li>
            </ul>
            <div className="text-xs text-neutral-400">
              <p>ইমেইল: <a href="mailto:editor@oporadhnama.info" className="text-neutral-200 hover:underline">editor@oporadhnama.info</a></p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
          <p>© {currentYear} অপরাধনামা. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D62828] transition-colors">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D62828] transition-colors">
              Twitter / X
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D62828] transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
