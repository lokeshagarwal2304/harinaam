'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PenTool, BarChart3, Clock, Settings } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hide on full-screen writing canvas
  if (pathname === '/write') return null;

  const navItems = [
    { href: '/', label: t.navHome, icon: Home, exact: true },
    { href: '/select-naam', label: t.navWrite, icon: PenTool, highlight: true },
    { href: '/dashboard', label: t.navDashboard, icon: BarChart3 },
    { href: '/history', label: t.navHistory, icon: Clock },
    { href: '/settings', label: t.navSettings, icon: Settings },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EADDCF] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4 focus:outline-hidden"
                aria-label={item.label}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-[#c95d13] text-white ring-4 ring-[#E06D1A]/20'
                      : 'bg-[#E06D1A] text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#E06D1A] mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
                isActive ? 'text-[#E06D1A]' : 'text-[#8C8275] hover:text-[#23201D]'
              }`}
              aria-label={item.label}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span
                className={`text-[10px] mt-1 ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
