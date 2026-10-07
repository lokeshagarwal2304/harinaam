'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Volume2, VolumeX, ArrowLeft, RotateCcw, Eraser } from 'lucide-react';
import { useDrawing } from '@/hooks/useDrawing';
import { useSession } from '@/hooks/useSession';
import { useOfflineQueue } from '@/hooks/useOfflineQueue';
import { useConnectivity } from '@/hooks/useConnectivity';
import { soundEngine } from '@/lib/utils/soundEngine';
import { MalaCompleteModal } from '@/components/celebration/MalaCompleteModal';
import { DivineDarshanScreen } from '@/components/celebration/DivineDarshanScreen';
import { useWakeLock } from '@/hooks/useWakeLock';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/languageContext';

function WritingCanvasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();

  useWakeLock(true);

  const sessionUuid = searchParams.get('session_uuid') || crypto.randomUUID();
  const naamId = Number(searchParams.get('naam_id')) || 1;
  const displayName = searchParams.get('display_name') || 'राम';
  const targetMalas = Number(searchParams.get('target_malas')) || 1;
  const initialDevoteeName = searchParams.get('devotee_name') || '';

  const { isOnline } = useConnectivity();
  const { pendingCount } = useOfflineQueue(sessionUuid);
  const [isMuted, setIsMuted] = useState(false);
  const [devoteeName, setDevoteeName] = useState(initialDevoteeName);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harinaam_devotee_name');
      if (saved) setDevoteeName(saved);
    }
  }, []);

  const toggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const {
    session,
    handleNaamCompleted,
    justCompletedMala,
    startNextMala,
  } = useSession({
    session_uuid: sessionUuid,
    naam_id: naamId,
    target_malas: targetMalas,
    completed_malas: 0,
    target_entries: targetMalas * 108,
    completed_entries: 0,
    status: 'in_progress',
    started_at: new Date().toISOString(),
    duration_seconds: 0,
    devotee_name: devoteeName,
    current_mala: {
      mala_number: 1,
      target_entries: 108,
      completed_entries: 0,
      status: 'in_progress',
    },
  });

  const {
    canvasRef,
    writingState,
    feedbackMessage,
    isIdle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    clearCanvas,
  } = useDrawing({
    onNaamCompleted: handleNaamCompleted,
    targetNaam: displayName,
    language,
  });

  // Fit canvas accurately to screen size with DPR backing buffer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(parent.clientWidth * dpr);
        canvas.height = Math.round(parent.clientHeight * dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef]);

  const currentMalaNum = session?.current_mala?.mala_number || 1;
  const currentMalaProgress = session?.current_mala?.completed_entries || 0;
  const targetPerMala = session?.current_mala?.target_entries || 108;
  const totalCompleted = session?.completed_entries || 0;
  const totalTarget = session?.target_entries || 108;
  const isSessionFinished = session?.status === 'completed' && totalCompleted >= totalTarget;
  const isMalaJustDone = justCompletedMala !== null && !isSessionFinished;

  return (
    <div className="fixed inset-0 bg-[#FAF8F5] flex flex-col justify-between overflow-hidden select-none touch-none z-50">
      {/* Top Header: Sacred, Serene & Functional */}
      <header className="px-3 sm:px-6 pt-3 pb-2 flex items-center justify-between z-10 border-b border-[#EADDCF]/40 bg-[#FAF8F5]/90 backdrop-blur-xs">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <Link
            href="/"
            className="text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 px-2.5 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs flex items-center space-x-1"
            aria-label={t.backToHome}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.backToHome}</span>
          </Link>

          <button
            onClick={toggleAudio}
            className="text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 p-2 rounded-full border border-[#EADDCF] transition shadow-2xs"
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E06D1A]" />}
          </button>

          {/* Quick Clear / साफ़ करें Button on Top Header */}
          <button
            onClick={clearCanvas}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-white/90 hover:bg-white text-[#23201D] border border-[#EADDCF] rounded-full text-xs font-semibold shadow-2xs active:scale-95 transition"
            aria-label={t.clearCanvas}
            title={t.clearCanvas}
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E06D1A]" />
            <span className="text-[11px]">{t.clearCanvas}</span>
          </button>

          {!isOnline && (
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold">
              {t.offlineBadge}
            </span>
          )}
        </div>

        {/* Center: Selected Naam & Mala Progress Header */}
        <div className="text-center flex-1 mx-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-[#23201D] tracking-wide font-devanagari">
            {displayName}
          </h1>
          <div className="text-[11px] text-[#8C8275] font-semibold mt-0.5">
            {t.mala} {currentMalaNum} / {targetMalas} •{' '}
            <span className="text-[#E06D1A] font-bold text-sm">
              {currentMalaProgress} / {targetPerMala}
            </span>
          </div>
        </div>

        {/* Right Actions: Globe Switcher & Total Counter */}
        <div className="flex items-center space-x-2">
          <div className="text-right text-xs text-[#8C8275] hidden sm:block">
            <div className="text-[10px]">{t.totalNaam}</div>
            <div className="font-bold text-[#23201D] text-sm">{totalCompleted}</div>
          </div>
          <LanguageSwitcher compact />
        </div>
      </header>

      {/* Main Full-Screen Writing Slate */}
      <main className="flex-1 relative w-full h-full bg-[#FAF8F5] overflow-hidden">
        {/* Subtle Spiritual Dotted Placeholder */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200 ${
            isIdle && !isMalaJustDone && !isSessionFinished
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-sm w-full space-y-3">
            {/* Top Dotted Guide: · · · · · · · · · */}
            <div className="w-56 tracking-[0.4em] text-center text-xs text-[#8C8275]/35 select-none font-mono">
              · · · · · · · · · · ·
            </div>

            {/* Subtle Placeholder Text */}
            <div className="py-2">
              <span className="text-2xl sm:text-3xl font-semibold text-[#8C8275]/30 select-none font-devanagari tracking-wide">
                {displayName} {t.writeHere}
              </span>
            </div>

            {/* Bottom Dotted Guide: · · · · · · · · · */}
            <div className="w-56 tracking-[0.4em] text-center text-xs text-[#8C8275]/35 select-none font-mono">
              · · · · · · · · · · ·
            </div>
          </div>
        </div>

        {/* 1 Mala Complete Celebration Modal (108 Beads) */}
        {isMalaJustDone && justCompletedMala && (
          <MalaCompleteModal
            malaNumber={justCompletedMala}
            totalMalas={targetMalas}
            targetNaam={displayName}
            devoteeName={devoteeName}
            onContinue={startNextMala}
          />
        )}

        {/* Final Session Complete Divine Darshan & Blessings Screen */}
        {isSessionFinished && (
          <div className="absolute inset-0 z-40 bg-[#FAF8F5]">
            <DivineDarshanScreen
              targetNaam={displayName}
              totalEntries={totalCompleted}
              totalMalas={targetMalas}
              devoteeName={devoteeName}
              durationSeconds={session?.duration_seconds || 0}
              onRestart={() => router.push('/select-naam')}
            />
          </div>
        )}

        {/* Gentle Feedback Notification Banner */}
        {feedbackMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="absolute bottom-4 inset-x-0 mx-auto w-fit max-w-sm px-4 py-2 bg-[#23201D]/90 text-[#FAF8F5] text-xs font-medium rounded-full shadow-md backdrop-blur-xs flex items-center space-x-2 z-30 animate-fade-in pointer-events-none"
          >
            <span>⚠️</span>
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Interactive Vector Writing Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerCancel}
          aria-label={`${displayName} ${t.writeHere}`}
          className="w-full h-full cursor-crosshair touch-none"
        />
      </main>

      {/* Touch-Friendly Bottom Bar with Mobile Clear Button */}
      <footer className="px-4 sm:px-6 py-2.5 flex items-center justify-between border-t border-[#EADDCF]/40 text-xs text-[#8C8275] z-10 bg-[#FAF8F5]/90 backdrop-blur-xs">
        <div>
          {t.target}: <span className="text-[#23201D] font-bold">{totalTarget} {t.naamUnit}</span>
        </div>
        <button
          onClick={clearCanvas}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-[#EADDCF] hover:bg-[#FAF8F5] text-[#23201D] font-semibold rounded-full text-xs shadow-2xs active:scale-95 transition"
          aria-label={t.clearCanvas}
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#E06D1A]" />
          <span>{t.clearCanvas}</span>
        </button>
      </footer>
    </div>
  );
}

export default function WritingPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-[#FAF8F5] text-[#8C8275]">
          Loading...
        </div>
      }
    >
      <WritingCanvasContent />
    </Suspense>
  );
}
