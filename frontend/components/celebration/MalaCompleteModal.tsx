'use client';

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/languageContext';

interface MalaCompleteModalProps {
  malaNumber: number;
  totalMalas: number;
  targetNaam: string;
  devoteeName?: string;
  onContinue: () => void;
}

export function MalaCompleteModal({
  malaNumber,
  totalMalas,
  targetNaam,
  devoteeName,
  onContinue,
}: MalaCompleteModalProps) {
  const { t } = useLanguage();
  const isFinalMala = malaNumber >= totalMalas;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mala-complete-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300"
    >
      <div className="bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Divine Golden Rays Background */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#E06D1A]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Sacred Mala 108 Bead Ring Illustration */}
        <div className="relative my-4 flex justify-center items-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full animate-spin-slow"
              aria-label="108 bead Mala ring"
            >
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#EADDCF"
                strokeWidth="2"
                strokeDasharray="4 6"
              />
              {Array.from({ length: 27 }).map((_, i) => {
                const angle = (i * 360) / 27;
                const rad = (angle * Math.PI) / 180;
                const cx = 100 + 82 * Math.cos(rad);
                const cy = 100 + 82 * Math.sin(rad);
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#D4AF37"
                    stroke="#800020"
                    strokeWidth="1"
                  />
                );
              })}
              {/* Sumeru Bead */}
              <circle cx="100" cy="18" r="7" fill="#E06D1A" stroke="#D4AF37" strokeWidth="2" />
              {/* Tassel */}
              <path d="M100 25 L95 42 L105 42 Z" fill="#800020" />
            </svg>

            {/* Central Badge */}
            <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-tr from-[#E06D1A] to-[#D4AF37] flex flex-col items-center justify-center text-white shadow-lg border-2 border-white">
              <span className="text-2xl font-bold font-devanagari">{targetNaam}</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">108 {t.naamUnit}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 mt-2">
          {devoteeName && (
            <div className="text-xs text-[#E06D1A] font-semibold tracking-wide">
              {t.greetingDevotee} {devoteeName} 🙏
            </div>
          )}
          <h3 id="mala-complete-title" className="text-2xl font-bold text-[#23201D] font-devanagari">
            {t.mala} {malaNumber} पूर्ण हुई! 🎉
          </h3>
          <p className="text-xs text-[#8C8275] leading-relaxed">
            आपने पवित्र <strong className="text-[#23201D] font-semibold">{targetNaam}</strong> के 108 पावन नाम सफलतापूर्वक लिख लिए हैं।
          </p>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#D4AF37]/15 rounded-full text-xs text-[#800020] font-medium mt-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>॥ शुभम् भवतु • मंगलम् भवतु ॥</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-2">
          <button
            onClick={onContinue}
            className="w-full py-3.5 px-6 bg-[#E06D1A] hover:bg-[#c95d13] text-white font-semibold rounded-2xl shadow-md transition flex items-center justify-center space-x-2 text-base active:scale-[0.99]"
          >
            <span>{isFinalMala ? 'दर्शन एवं आशीर्वाद प्राप्त करें ✨' : 'अगली माला शुरू करें →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
