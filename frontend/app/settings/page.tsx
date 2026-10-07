'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Clock, Sliders } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

export default function SettingsPage() {
  const { t } = useLanguage();
  const [autoCommitDelay, setAutoCommitDelay] = useState<number>(750);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDelay = localStorage.getItem('harinaam_auto_commit_ms');
      if (savedDelay) setAutoCommitDelay(Number(savedDelay));
    }
  }, []);

  const handleDelayChange = (delay: number) => {
    setAutoCommitDelay(delay);
    if (typeof window !== 'undefined') {
      localStorage.setItem('harinaam_auto_commit_ms', delay.toString());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="flex-1 max-w-xl mx-auto w-full p-6 flex flex-col justify-between scrollable">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 px-3 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToHome}</span>
          </Link>
          <span className="text-xs uppercase tracking-wider text-[#8C8275] font-semibold">
            {t.settings}
          </span>
        </div>

        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#23201D] font-devanagari">
            {t.settings}
          </h1>
          <p className="text-xs text-[#8C8275]">
            डिजिटल स्लेट स्पर्श संवेदनशीलता एवं स्वतः साफ़ समय
          </p>
        </div>

        {savedSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-2xl text-center font-medium flex items-center justify-center space-x-1.5 animate-fade-in"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{t.saveSuccess}</span>
          </div>
        )}

        <div className="space-y-4 bg-white/80 p-5 rounded-3xl border border-[#EADDCF] shadow-2xs">
          {/* Auto-Commit Delay Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-[#23201D] flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#E06D1A]" />
                <span>{t.autoCommitDelay}</span>
              </div>
              <span className="text-xs font-bold text-[#E06D1A] bg-[#E06D1A]/10 px-2.5 py-0.5 rounded-full border border-[#E06D1A]/20">
                {autoCommitDelay} ms
              </span>
            </div>
            <p className="text-xs text-[#8C8275] leading-relaxed">
              नाम पूरा लिखने के बाद कैनवास साफ़ होकर अगला नाम शुरू होने का विराम समय।
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1" role="radiogroup" aria-label={t.autoCommitDelay}>
              {[
                { label: 'तेज़ (550ms)', val: 550 },
                { label: 'सहज (750ms)', val: 750 },
                { label: 'धीमा (1000ms)', val: 1000 },
              ].map((item) => (
                <button
                  key={item.val}
                  role="radio"
                  aria-checked={autoCommitDelay === item.val}
                  onClick={() => handleDelayChange(item.val)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition focus:outline-hidden ${
                    autoCommitDelay === item.val
                      ? 'bg-[#E06D1A] text-white border-[#E06D1A] shadow-xs'
                      : 'bg-white/80 text-[#3A3530] border-[#EADDCF] hover:bg-white hover:border-[#EADDCF]/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[#EADDCF]/60" />

          {/* Accidental Touch Protection */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-sm text-[#23201D] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>आकस्मिक स्पर्श सुरक्षा (Palm Rejection)</span>
              </div>
              <div className="text-[11px] text-[#8C8275]">
                अनजाने में हुए हल्के स्पर्श या डॉट को खारिज करना
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              सक्रिय (Active)
            </span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-6">
        <Link
          href="/"
          className="block text-center w-full py-3.5 px-6 bg-white border border-[#EADDCF] text-[#3A3530] font-semibold rounded-2xl transition text-xs shadow-2xs hover:bg-[#FAF8F5]"
        >
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
