import React from 'react';

const MISSION_PILLARS = [
  {
    icon: '🔍',
    title: 'অপরাধ বিশ্লেষণ',
    description: 'দেশের প্রতিটি কোণে ঘটে যাওয়া অপরাধমূলক কর্মকাণ্ডের নির্মোহ তদন্ত ও তথ্যভিত্তিক সংরক্ষণ।',
    color: '#E50914',
  },
  {
    icon: '🎙️',
    title: 'পডকাস্ট',
    description: 'গভীর অনুসন্ধান ও বিশ্লেষণমূলক অডিও কন্টেন্ট — সত্যের কণ্ঠস্বর সরাসরি আপনার কানে।',
    color: '#F59E0B',
  },
  {
    icon: '🌍',
    title: 'আন্তর্জাতিক কূটনীতি',
    description: 'বাংলাদেশের ভূ-রাজনৈতিক অবস্থান, বন্ধু-শত্রু চিহ্নিতকরণ এবং কূটনৈতিক সম্পর্কের বিশ্লেষণ।',
    color: '#3B82F6',
  },
  {
    icon: '📰',
    title: 'বিশেষ সংবাদ',
    description: 'এক্সক্লুসিভ প্রতিবেদন, অনুসন্ধানী রিপোর্ট এবং জাতীয় গুরুত্বপূর্ণ বিষয়ে বিশেষ সংবাদ।',
    color: '#10B981',
  },
  {
    icon: '🇧🇩',
    title: 'বাংলাদেশের অগ্রযাত্রা',
    description: 'দেশের উন্নয়ন, সাফল্য এবং সার্বভৌমত্ব রক্ষার প্রতিটি পদক্ষেপের ইতিবাচক সংবাদ।',
    color: '#006A4E',
  },
];

const TIMELINE = [
  { year: '২০২৪', title: 'যাত্রা শুরু', desc: 'বাংলাদেশের অপরাধভিত্তিক সংবাদ আর্কাইভ হিসেবে অপরাধনামার জন্ম।' },
  { year: '২০২৫', title: 'বিস্তৃত কভারেজ', desc: 'অপরাধ সংবাদের পাশাপাশি বিশ্লেষণ, আন্তর্জাতিক কূটনীতি ও বিশেষ প্রতিবেদন যোগ।' },
  { year: '২০২৬', title: 'নতুন যুগ', desc: 'পডকাস্ট, প্রো-বাংলাদেশ সংবাদ এবং সম্পূর্ণ সংবাদমাধ্যম হিসেবে নতুন পথচলা।' },
];

const VALUES = [
  { icon: '⚖️', label: 'নিরপেক্ষতা', desc: 'কোনো দল বা মতাদর্শের প্রতি পক্ষপাতিত্ব ছাড়াই সত্য প্রকাশ।' },
  { icon: '🛡️', label: 'সত্যের প্রতি দায়বদ্ধ', desc: 'প্রতিটি তথ্যের পুঙ্খানুপুঙ্খ ফ্যাক্ট-চেক এবং যাচাই।' },
  { icon: '🇧🇩', label: 'সার্বভৌমত্ব রক্ষা', desc: 'বাংলাদেশের স্বাধীনতা ও সার্বভৌমত্বের পক্ষে সবসময় দৃঢ়।' },
  { icon: '👥', label: 'জনগণের কণ্ঠস্বর', desc: 'সাধারণ মানুষের অধিকার ও সুরক্ষার জন্য সোচ্চার।' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white flex flex-col items-center justify-start pt-28 md:pt-32 px-4 md:px-6 w-full">
      <div className="max-w-4xl w-full">

        {/* ── Header ── */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[#006A4E]/10 border border-[#006A4E]/25 text-[#00A676] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00A676] animate-pulse" />
            আমাদের পরিচিতি
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            আমাদের{' '}
            <span className="animate-gradient-text" style={{
              backgroundImage: 'linear-gradient(90deg, #00A676, #006A4E, #E50914, #006A4E, #00A676)',
            }}>
              সম্পর্কে
            </span>
          </h1>
        </div>

        {/* ── Quote Banner ── */}
        <div className="glass-card rounded-2xl p-8 md:p-10 mb-12 text-center animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#006A4E]/5 to-transparent" />
          <blockquote className="relative z-10">
            <p className="text-xl md:text-2xl font-semibold text-[#F1F5F9] italic leading-relaxed">
              &ldquo;সত্য যখন আপসহীন, অপরাধ তখন দিশেহারা।&rdquo;
            </p>
            <footer className="mt-4 text-[#006A4E] font-medium text-sm">— অপরাধনামা</footer>
          </blockquote>
        </div>

        {/* ── Main Description ── */}
        <div className="glass-card rounded-2xl p-8 md:p-10 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="text-[#94A3B8] leading-relaxed space-y-5 text-base md:text-lg">
            <p>
              <strong className="text-white">অপরাধনামা</strong> কেবল একটি সংবাদমাধ্যম বা ওয়েবসাইট নয়, এটি একটি আপসহীন প্রতিবাদী প্ল্যাটফর্ম। একটি নিরাপদ, সার্বভৌম ও ন্যায়বিচারের বাংলাদেশ গড়ার প্রত্যয়ে আমরা প্রতিনিয়ত কাজ করে যাচ্ছি।
            </p>
            <p>
              অপরাধের তথ্যভাণ্ডার হিসেবে যাত্রা শুরু করলেও আজ আমরা আরও অনেক বিস্তৃত। বাংলাদেশের আন্তর্জাতিক কূটনীতি, ভূ-রাজনৈতিক বিশ্লেষণ, গভীর অনুসন্ধানী পডকাস্ট এবং দেশের সার্বভৌমত্ব রক্ষায় প্রো-বাংলাদেশ সংবাদ — সবকিছু এখন এক ছাদের নিচে।
            </p>
            <p>
              আমাদের কোনো নির্দিষ্ট রাজনৈতিক আদর্শ বা পক্ষপাতিত্ব নেই; আমাদের একমাত্র দায়বদ্ধতা <span className="text-[#006A4E] font-semibold">সত্য, ন্যায় ও বাংলাদেশ</span>-এর প্রতি। আপনাদের চারপাশে ঘটে যাওয়া যেকোনো তথ্য নির্দ্বিধায় আমাদের দিন — আমরা সম্পূর্ণ স্বাধীনভাবে, চরম নিরপেক্ষতার সাথে রিপোর্ট করে তা জনসমক্ষে তুলে ধরবো।
            </p>
          </div>
        </div>

        {/* ── Mission Pillars ── */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 inline-flex items-center gap-3 w-full justify-center">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#006A4E]" />
            আমাদের কভারেজ
            <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#006A4E]" />
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {MISSION_PILLARS.map((pillar, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-xl p-6 group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${pillar.color}12, transparent 70%)` }}
                />
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3">{pillar.icon}</div>
                  <h3 className="font-bold text-white text-lg mb-2">{pillar.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{pillar.description}</p>
                </div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: pillar.color }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 inline-flex items-center gap-3 w-full justify-center">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#006A4E]" />
            আমাদের পথচলা
            <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#006A4E]" />
          </h2>
          
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#006A4E] via-[#006A4E]/40 to-transparent md:-translate-x-px" />
            
            <div className="space-y-8">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className={`relative flex items-start gap-6 md:gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-1 w-[14px] h-[14px] rounded-full bg-[#006A4E] border-[3px] border-[#0B0F14] z-10 shadow-lg shadow-[#006A4E]/30" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'}`}>
                    <span className="text-[#006A4E] font-bold text-sm">{item.year}</span>
                    <h3 className="font-bold text-white text-lg mt-1">{item.title}</h3>
                    <p className="text-[#94A3B8] text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 inline-flex items-center gap-3 w-full justify-center">
            <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#006A4E]" />
            আমাদের মূল্যবোধ
            <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#006A4E]" />
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
            {VALUES.map((val, idx) => (
              <div key={idx} className="glass-card rounded-xl p-5 text-center group hover:scale-[1.03] transition-all duration-300">
                <div className="text-3xl mb-3 group-hover:animate-float">{val.icon}</div>
                <h3 className="font-bold text-white text-sm mb-1">{val.label}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
