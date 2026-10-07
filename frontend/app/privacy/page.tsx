'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Database, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();

  const isEn = language === 'en';
  const isTe = language === 'te';
  const isTa = language === 'ta';
  const isKn = language === 'kn';

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
          Compliance & Trust
        </span>
      </div>

      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#23201D]">
          {t.privacyPolicy}
        </h1>
        <p className="text-xs text-[#8C8275]">
          {isEn ? 'Last updated: October 2026' : 'अंतिम नवीनीकरण: अक्टूबर 2026'}
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start space-x-3 text-emerald-900 text-xs shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sm block">
            {isEn ? '100% Privacy & Zero-Tracking Guarantee' : '100% निजता एवं शून्य ट्रैकिंग नीति (Zero-Tracking)'}
          </span>
          <p className="text-emerald-800/90 leading-relaxed">
            {isEn
              ? 'Harinaam is a sacred spiritual application. We do NOT use advertising networks, third-party tracking scripts, or analytics cookies. Your devotion remains private and uninterrupted.'
              : 'हरिनाम (Harinaam) एक पवित्र आध्यात्मिक साधना उपकरण है। हम कोई भी विज्ञापन, तृतीय-पक्ष ट्रैकर (No 3rd Party Embeds), या व्यक्तिगत जासूसी स्क्रिप्ट का उपयोग नहीं करते हैं।'}
          </p>
        </div>
      </div>

      {/* Section 1: Information Collection */}
      <section className="bg-white/80 border border-[#EADDCF] rounded-2xl p-5 space-y-3 shadow-2xs">
        <div className="flex items-center space-x-2 text-sm font-bold text-[#23201D]">
          <Database className="w-4 h-4 text-[#E06D1A]" />
          <h2>{isEn ? '1. Information We Collect' : '1. हम क्या जानकारी एकत्र करते हैं (Data Collection)'}</h2>
        </div>
        <div className="text-xs text-[#3A3530] space-y-2 leading-relaxed">
          <p>
            <strong>{isEn ? 'Devotee Name:' : 'साधक का नाम (Devotee Name):'}</strong>{' '}
            {isEn
              ? 'Optionally stored on your local browser to personalize your sacred writing sessions and sadhana ledger.'
              : 'यह केवल आपकी स्थानीय डिवाइस पर आपकी साधना को वैयक्तिकृत करने के लिए वैकल्पिक रूप से सुरक्षित किया जाता है।'}
          </p>
          <p>
            <strong>{isEn ? 'Handwriting Vector Strokes:' : 'हस्तलेखन स्ट्रोक डेटा (Handwriting Vector Strokes):'}</strong>{' '}
            {isEn
              ? 'When writing sacred names, coordinate points (X, Y) are processed purely on-device to detect completed letters and calculate your 108 Mala count. We do NOT capture camera, biometric, or microphone data.'
              : 'जब आप नाम लिखते हैं, तो स्क्रीन पर बने स्ट्रोक निर्देशांक केवल आपकी साधना संख्या गिनने और स्थानीय IndexedDB में सुरक्षित करने के लिए प्रोसेस होते हैं। हम कोई कैमरा या बायोमेट्रिक डेटा नहीं लेते।'}
          </p>
        </div>
      </section>

      {/* Section 2: No 3rd Party Embeds */}
      <section className="bg-white/80 border border-[#EADDCF] rounded-2xl p-5 space-y-3 shadow-2xs">
        <div className="flex items-center space-x-2 text-sm font-bold text-[#23201D]">
          <EyeOff className="w-4 h-4 text-[#800020]" />
          <h2>{isEn ? '2. Zero Third-Party Embeds' : '2. शून्य तृतीय-पक्ष एम्बेड (No 3rd-Party Embeds / Trackers)'}</h2>
        </div>
        <div className="text-xs text-[#3A3530] space-y-2 leading-relaxed">
          <p>
            {isEn
              ? 'Our platform is strictly clean and self-contained. There are no Google Analytics, Facebook Pixels, marketing widgets, or third-party ads embedded on any page.'
              : 'हमारी वेबसाइट और ऐप में कोई भी बाहरी विज्ञापन नेटवर्क, ट्रैकिंग पिक्सेल, Google Analytics या सोशल मीडिया ट्रैकर एम्बेड नहीं हैं। आपका साधना अनुभव पूर्णतया शांत और निजी है।'}
          </p>
        </div>
      </section>

      {/* Section 3: Data Storage & Offline Security */}
      <section className="bg-white/80 border border-[#EADDCF] rounded-2xl p-5 space-y-3 shadow-2xs">
        <div className="flex items-center space-x-2 text-sm font-bold text-[#23201D]">
          <Lock className="w-4 h-4 text-[#D4AF37]" />
          <h2>{isEn ? '3. Offline-First Storage & Data Ownership' : '3. ऑफलाइन सुरक्षा एवं स्थानीय भंडारण (Local-First Storage)'}</h2>
        </div>
        <div className="text-xs text-[#3A3530] space-y-2 leading-relaxed">
          <p>
            {isEn
              ? 'Harinaam is built with Local-First architecture. Your handwriting entries and Malas are saved immediately into local IndexedDB storage. You can export a complete JSON backup of your sadhana at any time from the dashboard.'
              : 'हरिनाम Offline-First तकनीक पर आधारित है। आपकी लिखी गई मालाएं और नाम आपकी डिवाइस के IndexedDB में तुरंत सुरक्षित हो जाते हैं। आप किसी भी समय डैशबोर्ड से अपना संपूर्ण साधना डेटा JSON प्रारूप में डाउनलोड कर सकते हैं।'}
          </p>
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
