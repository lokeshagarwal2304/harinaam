'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle, ArrowLeft, Ban } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

export default function TermsPage() {
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
          Terms & Ethics
        </span>
      </div>

      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#23201D]">
          {t.termsAndConditions}
        </h1>
        <p className="text-xs text-[#8C8275]">
          {isEn ? 'Last updated: October 2026' : 'अंतिम नवीनीकरण: अक्टूबर 2026'}
        </p>
      </div>

      {/* Refund Policy Declaration Card */}
      <div className="p-4 bg-amber-50/90 border border-amber-200/80 rounded-2xl flex items-start space-x-3 text-amber-950 text-xs shadow-2xs">
        <Ban className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sm block">
            {isEn ? 'Refund Policy: Not Applicable' : 'रिफंड नीति: लागू नहीं (Refund Policy: Not Applicable)'}
          </span>
          <p className="text-amber-900/90 leading-relaxed">
            {isEn
              ? 'Harinaam is a 100% free, non-commercial, and selfless spiritual platform. We do not sell subscriptions, paid features, or in-app items. Because there are zero monetary transactions, a refund policy is not applicable.'
              : 'हरिनाम (Harinaam) एक पूर्णतया निःशुल्क, गैर-व्यावसायिक (Non-Commercial) और निस्वार्थ आध्यात्मिक डिजिटल सेवा है। हम किसी भी सेवा, माला या ऐप फीचर के लिए कोई शुल्क स्वीकार नहीं करते। अतः रिफंड नीति लागू नहीं होती है।'}
          </p>
        </div>
      </div>

      {/* Terms Content */}
      <section className="bg-white/80 border border-[#EADDCF] rounded-2xl p-5 space-y-4 shadow-2xs text-xs text-[#3A3530]">
        <div className="space-y-1.5">
          <h2 className="text-sm font-bold text-[#23201D] flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? '1. Spiritual & Mindfulness Purpose' : '1. आध्यात्मिक उद्देश्य एवं निष्ठा (Spiritual Purpose)'}</span>
          </h2>
          <p className="leading-relaxed">
            {isEn
              ? 'Harinaam is designed to facilitate digital holy name writing (Naam Lekhan) and mantra repetition for peace of mind, focus, and devotion.'
              : 'हरिनाम का उद्देश्य साधकों को पवित्र नाम लेखन (जैसे राम, सीता, ॐ नमः शिवाय, जय श्री श्याम, राधे राधे, हरे कृष्ण) के माध्यम से आध्यात्मिक शांति, ध्यान और एकाग्रता प्रदान करना है।'}
          </p>
        </div>

        <div className="space-y-1.5 border-t border-[#EADDCF]/40 pt-3">
          <h2 className="text-sm font-bold text-[#23201D] flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? '2. No False Claims or Guarantees' : '2. कोई भ्रामक दावे नहीं (No False Claims)'}</span>
          </h2>
          <p className="leading-relaxed">
            {isEn
              ? 'We make no superstitious or commercial claims. This application is an honest, serene writing slate provided for personal devotion.'
              : 'हम किसी भी प्रकार का अंधविश्वास, चमत्कारी दावा या झूठे वादे नहीं करते। नाम लेखन व्यक्तिगत भक्ति और मानसिक शांति का माध्यम है।'}
          </p>
        </div>

        <div className="space-y-1.5 border-t border-[#EADDCF]/40 pt-3">
          <h2 className="text-sm font-bold text-[#23201D] flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? '3. Open Access for All Devotees' : '3. खुला एवं निःशुल्क उपयोग (Open Access)'}</span>
          </h2>
          <p className="leading-relaxed">
            {isEn
              ? 'Harinaam is freely accessible on web and standalone Android tablet devices for devotees worldwide.'
              : 'हरिनाम का प्लेटफॉर्म सभी भक्तों और साधकों के लिए सदैव खुला और निःशुल्क रहेगा।'}
          </p>
        </div>

        <div className="space-y-1.5 border-t border-[#EADDCF]/40 pt-3">
          <h2 className="text-sm font-bold text-[#23201D] flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-[#8C8275]" />
            <span>{isEn ? '4. Limitation of Liability' : '4. दायित्व की सीमा (Limitation of Liability)'}</span>
          </h2>
          <p className="leading-relaxed">
            {isEn
              ? 'The service is provided on an "as-is" basis for personal meditative and spiritual practice.'
              : 'यह ऐप "जैसा है" (As-Is) आधार पर आध्यात्मिक उपयोग के लिए प्रदान किया जाता है।'}
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
