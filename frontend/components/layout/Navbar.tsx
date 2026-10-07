'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/languageContext';

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [devoteeName, setDevoteeName] = useState('');

  // Hide global navbar on full-screen writing slate for maximum zen focus
  const isWritingScreen = pathname === '/write';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harinaam_devotee_name');
      if (saved) setDevoteeName(saved);
    }
  }, [pathname]);

  if (isWritingScreen) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EADDCF]/60 bg-[#FAF8F5]/90 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-[#23201D] hover:opacity-90 transition group focus:outline-hidden"
          aria-label={t.appName}
        >
          <span className="text-2xl filter drop-shadow-xs group-hover:scale-105 transition-transform" aria-hidden="true">
            🪷
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-wide text-[#23201D]">
              {t.appName}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#8C8275] font-semibold -mt-0.5">
              {t.appSubName}
            </span>
          </div>
        </Link>

        {/* Right Actions: Devotee Name, Globe Switcher, Settings */}
        <div className="flex items-center space-x-2.5">
          {devoteeName && (
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1 bg-[#E06D1A]/10 text-[#E06D1A] rounded-full text-xs font-semibold hover:bg-[#E06D1A]/15 transition border border-[#E06D1A]/20"
              title={`${t.devoteeBadge}: ${devoteeName}`}
            >
              <span>🙏</span>
              <span className="max-w-[90px] truncate">{devoteeName}</span>
            </Link>
          )}

          {/* Globe Icon Language Switcher */}
          <LanguageSwitcher />

          <Link
            href="/settings"
            className="p-2 rounded-full text-[#8C8275] hover:text-[#23201D] hover:bg-white/80 border border-transparent hover:border-[#EADDCF] transition focus:outline-hidden"
            aria-label={t.settings}
            title={t.settings}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
