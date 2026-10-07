'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

export default function HomePage() {
  const { language, t } = useLanguage();
  const [devoteeName, setDevoteeName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harinaam_devotee_name');
      if (saved) setDevoteeName(saved);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDevoteeName(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('harinaam_devotee_name', val);
    }
  };

  const isHindi = language === 'hi';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none scrollable max-w-xl mx-auto w-full">
      <div className="w-full flex flex-col items-center space-y-7">
        {/* Sacred Brand Header */}
        <div className="space-y-3">
          <span className="text-5xl filter drop-shadow-sm animate-pulse" aria-hidden="true">
            🪷
          </span>
          <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight text-[#23201D] ${isHindi ? 'font-devanagari' : 'font-sans'}`}>
            {t.appName}
          </h1>
          <p className="text-[#8C8275] text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
            {t.appTagline}
          </p>
        </div>

        {/* Devotee Name Card */}
        <div className="w-full bg-white/80 backdrop-blur-xs p-5 rounded-3xl border border-[#EADDCF] shadow-2xs space-y-2 text-left">
          <label
            htmlFor="devotee-name-input"
            className="block text-xs font-semibold text-[#8C8275] uppercase tracking-wider"
          >
            {t.devoteeNameLabel}
          </label>
          <input
            id="devotee-name-input"
            type="text"
            value={devoteeName}
            onChange={handleNameChange}
            placeholder={t.devoteeNamePlaceholder}
            aria-label={t.devoteeNameLabel}
            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EADDCF] rounded-2xl text-sm text-[#23201D] font-medium placeholder-[#8C8275]/60 focus:outline-hidden focus:ring-2 focus:ring-[#E06D1A]/30 focus:border-[#E06D1A] transition"
          />
          {devoteeName && (
            <p className="text-[11px] text-[#E06D1A] font-medium pt-0.5">
              {t.greetingDevotee}, {devoteeName} 🙏
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3.5 pt-1">
          <Link
            href="/select-naam"
            className="w-full py-4 px-6 bg-[#E06D1A] hover:bg-[#c95d13] text-white font-semibold rounded-2xl shadow-sm hover:shadow transition text-lg flex items-center justify-center space-x-2 active:scale-[0.99]"
            aria-label={t.startWriting}
          >
            <span>{t.startWriting}</span>
          </Link>

          <Link
            href="/dashboard"
            className="w-full py-3.5 px-6 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#800020] font-semibold rounded-2xl transition text-sm flex items-center justify-center space-x-2 shadow-2xs"
            aria-label={t.dashboard}
          >
            <BarChart3 className="w-4 h-4 text-[#800020]" aria-hidden="true" />
            <span>{t.dashboard}</span>
          </Link>

          <Link
            href="/history"
            className="w-full py-3 px-6 bg-white/80 hover:bg-white border border-[#EADDCF] text-[#3A3530] font-medium rounded-2xl transition text-sm flex items-center justify-center space-x-2"
            aria-label={t.history}
          >
            <Clock className="w-4 h-4 text-[#8C8275]" aria-hidden="true" />
            <span>{t.history}</span>
          </Link>
        </div>

        {/* Subtle Sacred Languages Footer list */}
        <div className="pt-2 text-xs text-[#8C8275] flex items-center justify-center space-x-2" aria-hidden="true">
          <span>हिन्दी</span>
          <span>•</span>
          <span>English</span>
          <span>•</span>
          <span>తెలుగు</span>
          <span>•</span>
          <span>தமிழ்</span>
          <span>•</span>
          <span>ಕನ್ನಡ</span>
        </div>
      </div>
    </div>
  );
}
