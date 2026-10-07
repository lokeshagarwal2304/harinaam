'use client';

import React from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, ArrowLeft, Database } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

export default function CookiesPage() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full p-6 space-y-6 scrollable">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 px-3 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.backToHome}</span>
        </Link>
        <span className="text-[11px] font-semibold text-[#E06D1A] uppercase tracking-wider">
          Storage & Privacy
        </span>
      </div>

      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#23201D]">
          {t.cookiesPolicy}
        </h1>
        <p className="text-xs text-[#8C8275]">
          {isEn ? 'Last updated: October 2026' : 'अंतिम नवीनीकरण: अक्टूबर 2026'}
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-start space-x-3 text-sky-950 text-xs shadow-2xs">
        <Cookie className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sm block">
            {isEn ? 'Essential Local Storage Only (Zero Tracking Cookies)' : 'केवल आवश्यक स्थानीय भंडारण (Essential Storage Only)'}
          </span>
          <p className="text-sky-900/90 leading-relaxed">
            {isEn
              ? 'Harinaam does NOT use advertising cookies, marketing trackers, or cross-site profiling. We only utilize local browser storage to retain your language preferences and save your offline handwriting entries.'
              : 'हरिनाम किसी भी प्रकार की विज्ञापन या तृतीय-पक्ष ट्रैकिंग कुकीज़ का उपयोग नहीं करता है। हम केवल आपकी साधना को सहज बनाने के लिए ब्राउज़र के लोकल स्टोरेज का उपयोग करते हैं।'}
          </p>
        </div>
      </div>

      {/* Storage Breakdown Table */}
      <section className="bg-white/80 border border-[#EADDCF] rounded-2xl p-5 space-y-4 shadow-2xs text-xs text-[#3A3530]">
        <h2 className="text-sm font-bold text-[#23201D] flex items-center space-x-2">
          <Database className="w-4 h-4 text-[#E06D1A]" />
          <span>{isEn ? 'What We Store Locally' : 'हम क्या और क्यों स्टोर करते हैं (Client-Side Storage)'}</span>
        </h2>

        <div className="space-y-3">
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EADDCF]/60">
            <div className="flex items-center justify-between font-bold text-[#23201D] mb-1">
              <span>{isEn ? '1. Language Preference' : '1. भाषा प्राथमिकता (Language Preference)'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                {isEn ? 'Essential' : 'आवश्यक'}
              </span>
            </div>
            <p className="text-[#8C8275] text-[11px]">
              <code>harinaam_user_language</code>: {isEn ? 'Stores your preferred display language (Hindi, English, Telugu, Tamil, Kannada).' : 'आपके द्वारा चुनी गई भाषा को याद रखने के लिए।'}
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EADDCF]/60">
            <div className="flex items-center justify-between font-bold text-[#23201D] mb-1">
              <span>{isEn ? '2. Devotee Name' : '2. साधक का नाम (Devotee Identity)'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                {isEn ? 'Optional' : 'वैकल्पिक'}
              </span>
            </div>
            <p className="text-[#8C8275] text-[11px]">
              <code>harinaam_devotee_name</code>: {isEn ? 'Stores your devotee name to personalize your sadhana certificates and session ledger.' : 'आपके नाम लेखन सत्रों पर आपका नाम दर्शाने के लिए।'}
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EADDCF]/60">
            <div className="flex items-center justify-between font-bold text-[#23201D] mb-1">
              <span>{isEn ? '3. Writing Slate Speed & Delay' : '3. लेखन गति एवं संवेदनशीलता (Writing Preferences)'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                {isEn ? 'Essential' : 'आवश्यक'}
              </span>
            </div>
            <p className="text-[#8C8275] text-[11px]">
              <code>harinaam_auto_commit_ms</code>: {isEn ? 'Saves your customized auto-commit pause duration (e.g. 750ms).' : 'स्लेट साफ़ होने का समय (उदा. 750ms)।'}
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EADDCF]/60">
            <div className="flex items-center justify-between font-bold text-[#23201D] mb-1">
              <span>{isEn ? '4. Offline Handwriting Strokes' : '4. ऑफलाइन साधना स्ट्रोक्स (IndexedDB Persistence)'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                {isEn ? 'Offline Data' : 'ऑफ़लाइन बैकअप'}
              </span>
            </div>
            <p className="text-[#8C8275] text-[11px]">
              <code>harinaam_local_v1</code>: {isEn ? 'Stores vector handwriting coordinates offline so you can write without internet connectivity.' : 'इंटरनेट न होने पर आपकी साधना के हस्तलेखन स्ट्रोक्स को डिवाइस में सुरक्षित रखने के लिए।'}
            </p>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="pt-2">
        <Link
          href="/"
          className="block w-full py-3.5 px-6 bg-white border border-[#EADDCF] hover:bg-[#FAF8F5] text-[#23201D] font-semibold rounded-2xl text-center text-xs shadow-2xs transition"
        >
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
