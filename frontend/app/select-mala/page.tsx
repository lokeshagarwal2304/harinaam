'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { HarinaamApi } from '@/lib/api/client';
import { useLanguage } from '@/lib/i18n/languageContext';

function SelectMalaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const naamId = Number(searchParams.get('naam_id')) || 1;
  const displayName = searchParams.get('display_name') || 'राम';
  const language = searchParams.get('language') || 'hi';

  const [selectedMalas, setSelectedMalas] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MALA_OPTIONS = [
    { malas: 1, count: 108 },
    { malas: 3, count: 324 },
    { malas: 5, count: 540 },
    { malas: 11, count: 1188 },
    { malas: 21, count: 2268 },
  ];

  const handleStartSession = async () => {
    setIsSubmitting(true);
    const sessionUuid = crypto.randomUUID();

    const devoteeName =
      typeof window !== 'undefined'
        ? localStorage.getItem('harinaam_devotee_name') || ''
        : '';

    try {
      await HarinaamApi.createSession({
        session_uuid: sessionUuid,
        naam_id: naamId,
        target_malas: selectedMalas,
        user_name: devoteeName || undefined,
        devotee_name: devoteeName || undefined,
      });
    } catch {
      // Continue locally even if server is offline
    }

    router.push(
      `/write?session_uuid=${sessionUuid}&naam_id=${naamId}&display_name=${encodeURIComponent(
        displayName
      )}&target_malas=${selectedMalas}&devotee_name=${encodeURIComponent(devoteeName)}`
    );
  };

  return (
    <div className="flex-1 max-w-xl mx-auto w-full p-6 flex flex-col justify-between scrollable">
      <div className="space-y-6">
        {/* Navigation Step Header */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/select-naam"
            className="inline-flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 px-3 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.prevStep}</span>
          </Link>
          <span className="text-xs uppercase tracking-wider text-[#8C8275] font-semibold">
            {t.step2Of2}
          </span>
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          <div className="inline-block px-3.5 py-1 bg-[#E06D1A]/10 text-[#E06D1A] rounded-full text-xs font-semibold mb-1 border border-[#E06D1A]/20">
            {displayName}
          </div>
          <h1 className="text-3xl font-bold text-[#23201D] font-devanagari">
            {t.selectMalaTitle}
          </h1>
          <p className="text-xs text-[#8C8275]">
            {t.selectMalaSubtitle}
          </p>
        </div>

        {/* Mala Options Radio List */}
        <div className="space-y-2.5" role="radiogroup" aria-label={t.selectMalaTitle}>
          {MALA_OPTIONS.map((opt) => {
            const isSelected = selectedMalas === opt.malas;
            return (
              <button
                key={opt.malas}
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedMalas(opt.malas)}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between transition focus:outline-hidden ${
                  isSelected
                    ? 'border-[#E06D1A] bg-[#E06D1A]/10 shadow-xs ring-2 ring-[#E06D1A]/30'
                    : 'border-[#EADDCF] bg-white/80 hover:bg-white hover:border-[#EADDCF]/80'
                }`}
              >
                <div className="text-left">
                  <div className="font-bold text-lg text-[#23201D]">
                    {opt.malas} {t.malaUnit}
                  </div>
                  <div className="text-xs text-[#8C8275] font-medium">
                    {opt.count} {t.naamUnit}
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                    isSelected
                      ? 'border-[#E06D1A] bg-[#E06D1A] text-white'
                      : 'border-[#EADDCF] bg-white'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6">
        <button
          onClick={handleStartSession}
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#E06D1A] hover:bg-[#c95d13] disabled:opacity-50 text-white font-semibold rounded-2xl text-lg shadow-sm transition active:scale-[0.99]"
        >
          {isSubmitting ? 'प्रारंभ हो रहा है...' : t.startSadhana}
        </button>
      </div>
    </div>
  );
}

export default function SelectMalaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 max-w-xl mx-auto w-full p-6 text-center text-[#8C8275]">
          लोड हो रहा है...
        </div>
      }
    >
      <SelectMalaContent />
    </Suspense>
  );
}
