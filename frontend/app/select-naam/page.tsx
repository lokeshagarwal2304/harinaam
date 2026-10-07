'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Naam } from '@/types';
import { HarinaamApi } from '@/lib/api/client';
import { useLanguage, LanguageCode } from '@/lib/i18n/languageContext';

export default function SelectNaamPage() {
  const router = useRouter();
  const { language, setLanguage, languages, t } = useLanguage();
  const [allNaams, setAllNaams] = useState<Naam[]>([]);
  const [selectedNaam, setSelectedNaam] = useState<Naam | null>(null);
  const [devoteeName, setDevoteeName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harinaam_devotee_name');
      if (saved) setDevoteeName(saved);
    }

    HarinaamApi.getNaams()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setAllNaams(res.data);
          const initial = res.data.find((n) => n.language === language) || res.data[0];
          setSelectedNaam(initial || null);
        }
      })
      .finally(() => setLoading(false));
  }, [language]);

  const filteredNaams = allNaams.filter((n) => n.language === language);

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
    const firstInLang = allNaams.find((n) => n.language === langCode);
    if (firstInLang) {
      setSelectedNaam(firstInLang);
    }
  };

  const handleProceed = () => {
    if (!selectedNaam) return;
    router.push(
      `/select-mala?naam_id=${selectedNaam.id}&display_name=${encodeURIComponent(
        selectedNaam.display_name
      )}&language=${language}`
    );
  };

  return (
    <div className="flex-1 max-w-xl mx-auto w-full p-6 flex flex-col justify-between scrollable">
      <div className="space-y-6">
        {/* Navigation Step Header */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 px-3 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToHome}</span>
          </Link>
          <span className="text-xs uppercase tracking-wider text-[#8C8275] font-semibold">
            {t.step1Of2}
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          {devoteeName && (
            <div className="text-xs text-[#E06D1A] font-semibold">
              {t.greetingDevotee}, {devoteeName} 🙏
            </div>
          )}
          <h1 className="text-3xl font-bold text-[#23201D] font-devanagari">
            {t.selectNaamTitle}
          </h1>
          <p className="text-xs text-[#8C8275]">
            {t.selectNaamSubtitle}
          </p>
        </div>

        {/* Multi-Language Filter Tabs */}
        <div
          role="tablist"
          aria-label="Language selection"
          className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#E06D1A] text-white shadow-xs'
                    : 'bg-white/80 text-[#8C8275] border border-[#EADDCF] hover:bg-white hover:text-[#23201D]'
                }`}
              >
                {lang.nativeName}
              </button>
            );
          })}
        </div>

        {/* Naam Cards Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm text-[#8C8275]">
            पवित्र नाम लोड हो रहे हैं...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5" role="radiogroup" aria-label={t.selectNaamTitle}>
            {filteredNaams.map((naam) => {
              const isSelected = selectedNaam?.id === naam.id;
              return (
                <button
                  key={naam.id}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedNaam(naam)}
                  className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1.5 focus:outline-hidden ${
                    isSelected
                      ? 'border-[#E06D1A] bg-[#E06D1A]/10 shadow-xs ring-2 ring-[#E06D1A]/40'
                      : 'border-[#EADDCF] bg-white/80 hover:bg-white hover:border-[#EADDCF]/80'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-bold text-[#23201D] font-devanagari">
                    {naam.display_name}
                  </span>
                  <span className="text-xs text-[#8C8275] line-clamp-1 font-medium">
                    {naam.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-6">
        <button
          onClick={handleProceed}
          disabled={!selectedNaam}
          className="w-full py-4 px-6 bg-[#E06D1A] hover:bg-[#c95d13] disabled:opacity-50 text-white font-semibold rounded-2xl text-base shadow-sm transition flex items-center justify-center space-x-2 active:scale-[0.99]"
        >
          <span>{t.nextStep}</span>
        </button>
      </div>
    </div>
  );
}
