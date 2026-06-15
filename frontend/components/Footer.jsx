'use client';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black/95 px-6 py-8 text-center text-sm text-neutral-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="text-white font-bold">অপরাধ</span>
          <span className="text-[#E50914] font-bold">নামা</span> সংবাদের স্বচ্ছতা ও সত্যের জন্য।
        </p>
        <p>(c) {new Date().getFullYear()} অপরাধনামা</p>
      </div>
    </footer>
  );
}
