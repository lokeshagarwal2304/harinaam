'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Trophy, RotateCcw, BarChart3, Heart, Download } from 'lucide-react';
import { DivineDarshanArtwork } from '@/components/darshan/DivineDarshanArtwork';
import { useLanguage } from '@/lib/i18n/languageContext';

interface DivineDarshanScreenProps {
  targetNaam: string;
  totalEntries: number;
  totalMalas: number;
  devoteeName?: string;
  durationSeconds?: number;
  onRestart: () => void;
}

interface DeityTheme {
  title: string;
  subtitle: string;
  mantra: string;
  blessing: string;
}

export function DivineDarshanScreen({
  targetNaam,
  totalEntries,
  totalMalas,
  devoteeName,
  durationSeconds = 0,
  onRestart,
}: DivineDarshanScreenProps) {
  const { t } = useLanguage();
  const clean = targetNaam.trim();

  const getDeityTheme = (): DeityTheme => {
    const naamLower = clean.toLowerCase();
    if (naamLower.includes('शिव') || naamLower.includes('shiv') || naamLower.includes('శివ') || naamLower.includes('சிவ') || naamLower.includes('ಶಿವ')) {
      return {
        title: 'देवाधिदेव महादेव शिव दर्शन',
        subtitle: 'भगवान शिव एवं माता पार्वती का मंगलमय आशीर्वाद',
        mantra: '॥ ॐ नमः शिवाय ॥',
        blessing: 'महादेव शिव की कृपा से आपकी समस्त बाधाएं दूर हों और आध्यात्मिक चेतना जागृत हो।',
      };
    }

    if (naamLower.includes('श्याम') || naamLower.includes('shyam') || naamLower.includes('శ్యామ్') || naamLower.includes('ஷியாம்') || naamLower.includes('ಶ್ಯಾಮ್')) {
      return {
        title: 'खाटू नरेश श्री श्याम दर्शन',
        subtitle: 'हारे का सहारा — तीन बाण धारी का आशीर्वाद',
        mantra: '॥ ॐ श्री श्याम देवाय नमः ॥',
        blessing: 'लखदातार बाबा श्याम आपकी सभी मनोकामनाएं पूर्ण करें एवं आपकी झोली खुशियों से भरें।',
      };
    }

    if (
      naamLower.includes('राधे') ||
      naamLower.includes('कृष्ण') ||
      naamLower.includes('radhe') ||
      naamLower.includes('krishna') ||
      naamLower.includes('కృష్ణ') ||
      naamLower.includes('கிருஷ்ண')
    ) {
      return {
        title: 'श्री राधा-माधव दिव्य दर्शन',
        subtitle: 'परम पावन युगल सरकार का मंगलमय आशीर्वाद',
        mantra: '॥ राधे राधे - हरे कृष्ण ॥',
        blessing: 'श्री राधा-कृष्ण का पावन प्रेम एवं असीम कृपा आपके हृदय में नित्य वास करे।',
      };
    }

    // Default: Lord Rama
    return {
      title: 'श्री राम दरबार दर्शन',
      subtitle: 'मर्यादा पुरुषोत्तम प्रभु श्री राम एवं माता जानकी का आशीर्वाद',
      mantra: '॥ श्री राम जय राम जय जय राम ॥',
      blessing: 'प्रभु श्री राम, माता सीता, लक्ष्मण जी एवं पवनपुत्र हनुमान जी की असीम कृपा आपके जीवन में सुख, शांति एवं धर्म का प्रकाश फैलाए।',
    };
  };

  const theme = getDeityTheme();

  return (
    <div className="flex-1 max-w-xl mx-auto w-full p-6 flex flex-col justify-between scrollable animate-in fade-in zoom-in-95 duration-500">
      <div className="space-y-6 pt-2">
        {/* Divine Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-xs font-bold text-[#800020]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span>साधना पूर्णम् • दिव्य आशीर्वाद</span>
          </div>
          <h2 className="text-3xl font-bold text-[#23201D] font-devanagari">{theme.title}</h2>
          <p className="text-xs text-[#8C8275]">{theme.subtitle}</p>
        </div>

        {/* Sacred Deity Artwork with Alt Tag and Aura */}
        <DivineDarshanArtwork targetNaam={clean} />

        {/* Devotee Recognition & Sloka */}
        <div className="bg-white/80 border border-[#EADDCF] rounded-3xl p-5 text-center shadow-xs space-y-2.5">
          {devoteeName && (
            <div className="text-xs font-bold text-[#E06D1A]">
              {t.greetingDevotee}, {devoteeName} 🙏
            </div>
          )}
          <div className="font-devanagari text-lg font-bold text-[#800020]">
            {theme.mantra}
          </div>
          <p className="text-xs text-[#3A3530] leading-relaxed italic">
            &quot;{theme.blessing}&quot;
          </p>
        </div>

        {/* Sadhana Summary Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/80 border border-[#EADDCF] p-3 rounded-2xl text-center shadow-2xs">
            <span className="text-xs text-[#8C8275] block">{t.totalNaam}</span>
            <span className="text-xl font-bold text-[#E06D1A]">{totalEntries}</span>
          </div>
          <div className="bg-white/80 border border-[#EADDCF] p-3 rounded-2xl text-center shadow-2xs">
            <span className="text-xs text-[#8C8275] block">{t.completedMalas}</span>
            <span className="text-xl font-bold text-[#23201D]">{totalMalas}</span>
          </div>
          <div className="bg-white/80 border border-[#EADDCF] p-3 rounded-2xl text-center shadow-2xs">
            <span className="text-xs text-[#8C8275] block">पवित्र नाम</span>
            <span className="text-xl font-bold text-[#800020] font-devanagari">{clean}</span>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-6 space-y-3">
        <Link
          href="/dashboard"
          className="w-full py-4 px-6 bg-[#E06D1A] hover:bg-[#c95d13] text-white font-semibold rounded-2xl text-center block shadow-sm transition"
        >
          {t.dashboard} खोलें 📊
        </Link>
        <button
          onClick={onRestart}
          className="w-full py-3.5 px-6 bg-white border border-[#EADDCF] hover:bg-[#FAF8F5] text-[#23201D] font-semibold rounded-2xl text-center transition flex items-center justify-center space-x-2 text-xs shadow-2xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#8C8275]" />
          <span>{t.darshanRestart}</span>
        </button>
      </div>
    </div>
  );
}
