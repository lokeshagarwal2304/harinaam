'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, LanguageCode } from '@/lib/i18n/languageContext';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t.languageSelector}
        className={`flex items-center space-x-1.5 rounded-full border border-[#EADDCF] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#3A3530] backdrop-blur-xs transition hover:bg-white hover:border-[#E06D1A]/50 focus:outline-hidden focus:ring-2 focus:ring-[#E06D1A]/30 shadow-2xs ${
          compact ? 'px-2 py-1' : ''
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-[#E06D1A]" aria-hidden="true" />
        <span className="font-devanagari">{currentLang.nativeName}</span>
        <ChevronDown className="w-3 h-3 text-[#8C8275]" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label={t.languageSelector}
          className="absolute right-0 mt-1.5 w-44 origin-top-right rounded-2xl bg-white/95 p-1.5 shadow-lg ring-1 ring-black/5 backdrop-blur-md z-50 animate-fade-in border border-[#EADDCF]"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C8275] border-b border-[#EADDCF]/40 mb-1">
            {t.languageSelector}
          </div>
          {languages.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                role="menuitem"
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center justify-between px-3 py-2 text-xs rounded-xl transition ${
                  isSelected
                    ? 'bg-[#E06D1A]/10 text-[#E06D1A] font-bold'
                    : 'text-[#3A3530] hover:bg-[#FAF8F5] font-medium'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="font-devanagari">{item.nativeName}</span>
                  <span className="text-[10px] text-[#8C8275]">{item.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#E06D1A]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
