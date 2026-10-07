'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hide on full-screen writing canvas
  if (pathname === '/write') return null;

  return (
    <footer className="w-full border-t border-[#EADDCF]/60 bg-[#FAF8F5]/90 py-8 px-4 text-center text-xs text-[#8C8275] mb-16 sm:mb-0">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Spiritual Tagline */}
        <div className="flex items-center justify-center space-x-1.5 text-xs text-[#3A3530] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
          <span>{t.footerTagline}</span>
        </div>

        {/* Legal & Policy Navigation Links */}
        <nav aria-label="Legal and Policy Links" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium">
          <Link
            href="/privacy"
            className="text-[#8C8275] hover:text-[#E06D1A] transition underline underline-offset-4"
          >
            {t.privacyPolicy}
          </Link>
          <span aria-hidden="true">•</span>
          <Link
            href="/terms"
            className="text-[#8C8275] hover:text-[#E06D1A] transition underline underline-offset-4"
          >
            {t.termsAndConditions}
          </Link>
          <span aria-hidden="true">•</span>
          <Link
            href="/cookies"
            className="text-[#8C8275] hover:text-[#E06D1A] transition underline underline-offset-4"
          >
            {t.cookiesPolicy}
          </Link>
        </nav>

        {/* Transparent Disclaimer Box (Refund Policy N/A & Zero 3rd Party Trackers) */}
        <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#EADDCF] text-xs text-[#8C8275] space-y-1.5 text-center shadow-2xs">
          <div className="flex items-center justify-center space-x-1.5 font-bold text-xs text-[#23201D]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>{t.nonCommercialTitle}</span>
          </div>
          <p className="text-[11px] text-[#3A3530] leading-relaxed">
            {t.refundNotice}
          </p>
          <p className="text-[10px] text-[#8C8275]">
            {t.noTrackingDetails}
          </p>
        </div>

        {/* Dynamic Copyright */}
        <div className="text-[11px] text-[#8C8275]/80 pt-1">
          {t.copyrightText}
        </div>
      </div>
    </footer>
  );
}
