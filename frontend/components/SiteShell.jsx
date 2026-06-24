'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// ── Campaign Context ──────────────────────────────────────────────────────────
export const CampaignContext = createContext({ active: false });

export function useCampaign() {
  return useContext(CampaignContext);
}

// ── SiteShell ─────────────────────────────────────────────────────────────────
export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  const [campaign, setCampaign] = useState({ active: false });

  useEffect(() => {
    if (isAdminRoute) return;
    const rawApiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      'https://oporadhnama.onrender.com';
    const apiBase = rawApiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');

    fetch(`${apiBase}/api/campaign/active/`)
      .then((res) => (res.ok ? res.json() : { active: false }))
      .then((data) => setCampaign(data || { active: false }))
      .catch(() => setCampaign({ active: false }));
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <CampaignContext.Provider value={campaign}>
      <div className="min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden">
        <Navbar campaignActive={campaign?.active} />
        <main className="flex-grow flex flex-col items-center justify-start pb-16 w-full max-w-full">
          {children}
        </main>
        <Footer campaignActive={campaign?.active} />
      </div>
    </CampaignContext.Provider>
  );
}
