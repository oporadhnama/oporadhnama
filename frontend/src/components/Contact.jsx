import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  const platforms = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/oporadhnamabd',
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 mb-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      hoverColor: 'hover:border-[#1877F2]'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/oporadhnama',
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 mb-4 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      hoverColor: 'hover:border-[#E1306C]'
    },
    {
      name: 'Telegram',
      url: 'https://t.me/oporadhnama',
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8 mb-4 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0011.944 0zm6.67 7.051l-2.14 10.082c-.15.688-.563.856-1.135.535l-3.136-2.312-1.513 1.457c-.167.167-.308.307-.63.307l.225-3.197 5.819-5.258c.253-.226-.056-.352-.393-.127L7.5 12.871l-3.093-.967c-.672-.211-.686-.673.14-.997l12.096-4.665c.561-.208 1.053.125.864 1.06z"/>
        </svg>
      ),
      hoverColor: 'hover:border-[#0088cc]'
    },
    {
      name: 'Email',
      url: 'mailto:oporadhnamabd@gmail.com',
      icon: (
        <Mail className="w-6 h-6 md:w-8 md:h-8 mb-4 text-[#EA4335]" />
      ),
      hoverColor: 'hover:border-[#EA4335]'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/message/37AG7T7GWEKFO1',
      icon: (
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 mb-4 text-[#25D366]" />
      ),
      hoverColor: 'hover:border-[#25D366]'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24 px-4 w-full">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
          যোগাযোগ করুন
        </h1>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
          আপনার যেকোনো অভিযোগ, তথ্য বা পরামর্শ আমাদের জানাতে নিচের প্ল্যাটফর্মগুলোতে যুক্ত হোন। আমরা আপনাদের পাশে আছি।
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:flex-nowrap md:gap-6">
          {platforms.map((platform, idx) => (
            <a
              key={idx}
              href={platform.url}
              target={platform.name === 'Email' ? '_self' : '_blank'}
              rel={platform.name === 'Email' ? '' : 'noopener noreferrer'}
              /* মোবাইলে ২টা করে কার্ড দেখানোর জন্য width ঠিক করা হয়েছে এবং ডেস্কটপে flex-1 করা হয়েছে */
              className={`w-[calc(50%-6px)] md:flex-1 group flex flex-col items-center justify-center p-4 md:p-8 bg-neutral-900/40 rounded-2xl border border-neutral-800 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:bg-neutral-800/60 ${platform.hoverColor}`}
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {platform.icon}
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-200 group-hover:text-white transition-colors">
                {platform.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
