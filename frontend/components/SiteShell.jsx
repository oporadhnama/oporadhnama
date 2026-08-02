'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import BreakingNewsTicker from '../src/components/BreakingNewsTicker';
import ScrollToTop from '../src/components/ScrollToTop';

// ── SiteShell ─────────────────────────────────────────────────────────────────
export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 flex flex-col justify-between overflow-x-hidden relative">
      <Navbar />
      
      {/* Ticker on Home Page Only, or all pages? Usually news sites have it on all public pages. */}
      {!isAdminRoute && <BreakingNewsTicker />}

      <main className="flex-grow flex flex-col items-center justify-start pb-16 w-full max-w-full">
        {children}
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
}

