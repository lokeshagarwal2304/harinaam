'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Clock, CheckCircle2, PenTool } from 'lucide-react';
import { HarinaamApi } from '@/lib/api/client';
import { useLanguage } from '@/lib/i18n/languageContext';

interface HistorySession {
  id: number;
  session_uuid: string;
  devotee_name?: string;
  naam?: { display_name: string; name: string };
  target_malas: number;
  completed_malas: number;
  target_entries: number;
  completed_entries: number;
  status: string;
  started_at: string;
  completed_at?: string;
}

export default function HistoryPage() {
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<HistorySession[]>([]);
  const [devoteeName, setDevoteeName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harinaam_devotee_name') || '';
      setDevoteeName(saved);
    }

    HarinaamApi.getHistory()
      .then((res) => {
        if (res.success && res.data) {
          const items = res.data.data || res.data;
          setSessions(Array.isArray(items) ? items : []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 max-w-xl mx-auto w-full p-6 flex flex-col justify-between scrollable">
      <div className="space-y-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 px-3 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToHome}</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-[#E06D1A] hover:underline flex items-center space-x-1"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.dashboard}</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="space-y-1">
          {devoteeName && (
            <div className="text-xs font-semibold text-[#E06D1A]">
              भक्त {devoteeName} का साधना खाता 🙏
            </div>
          )}
          <h1 className="text-3xl font-bold text-[#23201D] font-devanagari">
            {t.history}
          </h1>
          <p className="text-xs text-[#8C8275]">
            आपके पिछले नाम लेखन सत्र (Sadhana Session Ledger)
          </p>
        </div>

        {/* Sessions List */}
        {loading ? (
          <div className="py-12 text-center text-sm text-[#8C8275]">
            इतिहास लोड हो रहा है...
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-8 border border-dashed border-[#EADDCF] rounded-3xl text-center space-y-3 bg-white/50">
            <span className="text-4xl">📜</span>
            <p className="text-sm text-[#3A3530] font-semibold">{t.noSessionsFound}</p>
            <p className="text-xs text-[#8C8275] max-w-xs mx-auto">
              जब आप नाम लेखन सत्र पूर्ण करेंगे, आपका इतिहास यहाँ सुरक्षित रहेगा।
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => {
              const isCompleted = s.status === 'completed' || s.completed_entries >= s.target_entries;
              return (
                <div
                  key={s.session_uuid || s.id}
                  className="p-5 rounded-3xl border border-[#EADDCF] bg-white/80 flex items-center justify-between shadow-2xs hover:bg-white transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-2xl text-[#23201D] font-devanagari">
                        {s.naam?.display_name || 'राम'}
                      </span>
                      {s.devotee_name && (
                        <span className="px-2 py-0.5 bg-[#E06D1A]/10 text-[#E06D1A] rounded-full text-[10px] font-semibold">
                          {s.devotee_name}
                        </span>
                      )}
                      {isCompleted && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-semibold flex items-center space-x-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>पूर्ण</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#8C8275]">
                      {new Date(s.started_at).toLocaleDateString('hi-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <div className="text-base font-bold text-[#E06D1A]">
                      {s.completed_entries} / {s.target_entries} {t.naamUnit}
                    </div>
                    <div className="text-xs text-[#8C8275]">
                      {s.completed_malas} / {s.target_malas} {t.malaUnit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Links */}
      <div className="pt-6 space-y-3">
        <Link
          href="/dashboard"
          className="block text-center w-full py-3.5 px-6 bg-white border border-[#EADDCF] hover:bg-[#FAF8F5] text-[#23201D] font-semibold rounded-2xl text-xs shadow-2xs transition"
        >
          {t.dashboard} खोलें 📊
        </Link>
        <Link
          href="/select-naam"
          className="block text-center w-full py-4 px-6 bg-[#E06D1A] hover:bg-[#c95d13] text-white font-semibold rounded-2xl text-base shadow-sm transition"
        >
          {t.startWriting}
        </Link>
      </div>
    </div>
  );
}
