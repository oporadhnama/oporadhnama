'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import MaintenanceWall from './MaintenanceWall';

// ── SiteShell ─────────────────────────────────────────────────────────────────
export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Maintenance mode active unless NEXT_PUBLIC_MAINTENANCE_MODE is explicitly set to 'false'
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'false';

  if (isMaintenanceMode && !isAdminRoute) {
    return <MaintenanceWall />;
  }

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-start pb-16 w-full max-w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}

