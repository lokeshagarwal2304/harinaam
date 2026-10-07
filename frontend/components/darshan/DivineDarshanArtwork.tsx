'use client';

import React from 'react';

interface DivineDarshanArtworkProps {
  targetNaam: string;
  className?: string;
}

export function DivineDarshanArtwork({ targetNaam, className = '' }: DivineDarshanArtworkProps) {
  const naamLower = targetNaam.toLowerCase();

  // 1. Lord Shiva (ॐ नमः शिवाय)
  if (naamLower.includes('शिव') || naamLower.includes('shiva') || naamLower.includes('శ్రీ శివ') || naamLower.includes('சிவா')) {
    return (
      <div
        role="img"
        aria-label="भगवान शिव शंकर का पावन दिव्य स्वरूप, त्रिशूल, डमरू और चंद्र दर्शन"
        className={`relative flex flex-col items-center justify-center p-6 ${className}`}
      >
        {/* Divine Golden & Blue Aura */}
        <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-sky-400/20 via-amber-300/30 to-amber-500/20 blur-2xl animate-pulse" />

        {/* Sacred Shiva Yantra / Lingam / Trishul Vector Art */}
        <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-b from-[#FAF8F5] to-amber-50/80 border-2 border-[#D4AF37] p-4 flex flex-col items-center justify-center shadow-lg">
          <span className="text-6xl filter drop-shadow-md select-none" aria-hidden="true">
            🔱
          </span>
          <span className="text-xl font-bold font-devanagari text-[#23201D] mt-1 tracking-wider">
            ॐ नमः शिवाय
          </span>
          <span className="text-[10px] text-[#8C8275] font-semibold">
            हर हर महादेव
          </span>
        </div>

        {/* Lotus Base */}
        <div className="text-2xl -mt-3 z-10 text-amber-600" aria-hidden="true">
          🪷 🪷 🪷
        </div>
      </div>
    );
  }

  // 2. Khatu Shyam Ji (जय श्री श्याम)
  if (naamLower.includes('श्याम') || naamLower.includes('shyam') || naamLower.includes('శ్యామ్') || naamLower.includes('ஷியாம்')) {
    return (
      <div
        role="img"
        aria-label="खाटू श्याम जी महाराज का पावन मोरछड़ी स्वरूप और दिव्य दर्शन"
        className={`relative flex flex-col items-center justify-center p-6 ${className}`}
      >
        {/* Divine Peacock Feather Aura */}
        <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-emerald-400/20 via-amber-400/30 to-rose-400/20 blur-2xl animate-pulse" />

        <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-b from-[#FAF8F5] to-amber-50/80 border-2 border-[#D4AF37] p-4 flex flex-col items-center justify-center shadow-lg">
          <span className="text-6xl filter drop-shadow-md select-none" aria-hidden="true">
            🦚
          </span>
          <span className="text-xl font-bold font-devanagari text-[#800020] mt-1 tracking-wider">
            जय श्री श्याम
          </span>
          <span className="text-[10px] text-[#8C8275] font-semibold">
            हारे का सहारा • बाबा श्याम हमारा
          </span>
        </div>

        <div className="text-2xl -mt-3 z-10 text-amber-600" aria-hidden="true">
          🪷 🪷 🪷
        </div>
      </div>
    );
  }

  // 3. Radha Krishna (राधे राधे / हरे कृष्ण)
  if (
    naamLower.includes('राधे') ||
    naamLower.includes('कृष्ण') ||
    naamLower.includes('radhe') ||
    naamLower.includes('krishna') ||
    naamLower.includes('కృష్ణ') ||
    naamLower.includes('கிருஷ்ண')
  ) {
    return (
      <div
        role="img"
        aria-label="श्री राधा-कृष्ण दिव्य युगल सरकार का पावन स्वरूप, बांसुरी और मोरपंख"
        className={`relative flex flex-col items-center justify-center p-6 ${className}`}
      >
        <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-amber-400/25 via-pink-400/25 to-sky-400/25 blur-2xl animate-pulse" />

        <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-b from-[#FAF8F5] to-amber-50/80 border-2 border-[#D4AF37] p-4 flex flex-col items-center justify-center shadow-lg">
          <div className="flex items-center space-x-1">
            <span className="text-5xl filter drop-shadow-md select-none" aria-hidden="true">
              🪈
            </span>
            <span className="text-4xl filter drop-shadow-md select-none" aria-hidden="true">
              🦚
            </span>
          </div>
          <span className="text-xl font-bold font-devanagari text-[#23201D] mt-1 tracking-wider">
            राधे कृष्ण
          </span>
          <span className="text-[10px] text-[#8C8275] font-semibold">
            श्री वृंदावन बिहारी
          </span>
        </div>

        <div className="text-2xl -mt-3 z-10 text-amber-600" aria-hidden="true">
          🪷 🪷 🪷
        </div>
      </div>
    );
  }

  // 4. Default: Lord Rama & Mata Sita (श्री राम दरबार)
  return (
    <div
      role="img"
      aria-label="प्रभु श्री राम एवं माता जानकी का पावन दिव्य दर्शन"
      className={`relative flex flex-col items-center justify-center p-6 ${className}`}
    >
      {/* Saffron and Divine Gold Radiance */}
      <div className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-[#E06D1A]/20 via-[#D4AF37]/35 to-amber-200/30 blur-2xl animate-pulse" />

      <div className="relative z-10 w-44 h-44 rounded-full bg-gradient-to-b from-[#FAF8F5] to-amber-50/90 border-2 border-[#D4AF37] p-4 flex flex-col items-center justify-center shadow-xl">
        <div className="flex items-center justify-center space-x-1">
          <span className="text-5xl filter drop-shadow-md select-none" aria-hidden="true">
            🏹
          </span>
          <span className="text-4xl filter drop-shadow-md select-none" aria-hidden="true">
            👑
          </span>
        </div>
        <span className="text-2xl font-bold font-serif text-[#800020] mt-1 tracking-wide">
          {targetNaam}
        </span>
        <span className="text-[10px] font-bold text-[#E06D1A] tracking-wider uppercase mt-0.5">
          सियावर रामचंद्र की जय
        </span>
      </div>

      <div className="text-2xl -mt-3 z-10 text-amber-600" aria-hidden="true">
        🪷 🪷 🪷
      </div>
    </div>
  );
}
