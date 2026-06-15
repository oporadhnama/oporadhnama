'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Activity,
  FolderOpen,
} from 'lucide-react';
import { readStoredJSON } from '../storage';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = readStoredJSON('user', {});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('refresh_token');
      window.localStorage.removeItem('user');
    }
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'ওভারভিউ', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'সংবাদ ব্যবস্থাপনা', path: '/admin/dashboard/manage-news', icon: Newspaper },
    { label: 'ব্যবহারকারী প্রতিবেদন', path: '/admin/dashboard/user-reports', icon: FolderOpen },
    { label: 'সংবাদ যোগ করুন', path: '/admin/dashboard/add-news', icon: PlusCircle },
  ];

  // Only show Moderators + Activity Log for Super Admin
  if (user.is_superuser) {
    navItems.push({ label: 'মডারেটর', path: '/admin/dashboard/moderators', icon: Users });
    navItems.push({ label: 'অ্যাক্টিভিটি লগ', path: '/admin/dashboard/activity-logs', icon: Activity });
  }

  navItems.push({ label: 'সেটিংস', path: '/admin/dashboard/settings', icon: Settings });

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? 'bg-[#E50914]/15 text-[#E50914] border border-[#E50914]/30 shadow-[0_0_12px_rgba(229,9,20,0.08)]'
        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
    }`;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-neutral-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E50914]/15 flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#E50914]" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-wider leading-none">
              <span className="text-white">অপরাধ</span>
              <span className="text-[#E50914]">নামা</span>
            </h1>
            <p className="text-neutral-600 text-[9px] mt-0.5 uppercase tracking-[0.2em] font-semibold">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={linkClass(item.path)}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="px-4 py-4 border-t border-neutral-800/60">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E50914]/30 to-[#E50914]/10 flex items-center justify-center text-[#E50914] text-sm font-bold ring-1 ring-[#E50914]/20">
            {(user.username || 'A')[0].toUpperCase()}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user.username}</p>
            <p className="text-neutral-500 text-[10px]">{user.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-neutral-500 hover:text-red-400 text-xs py-2.5 rounded-lg hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.8} />
          লগ আউট
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-neutral-400 hover:text-white transition-colors"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — Desktop: always visible, Mobile: slide-in */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-neutral-900/90 border-r border-neutral-800/60 flex flex-col backdrop-blur-xl z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 flex-grow p-6 lg:p-8 min-h-screen pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
