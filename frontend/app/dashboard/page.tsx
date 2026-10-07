'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  Calendar,
  Clock,
  Sparkles,
  Download,
  Trash2,
  RefreshCw,
  User,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { HarinaamApi } from '@/lib/api/client';
import { getAllLocalEntries } from '@/lib/storage/indexedDb';
import { useLanguage } from '@/lib/i18n/languageContext';

interface DashboardStats {
  total_sessions: number;
  completed_sessions: number;
  total_malas: number;
  total_entries: number;
  total_minutes: number;
  naam_breakdown: Array<{
    name: string;
    display_name: string;
    total_entries: string | number;
    total_malas: string | number;
    total_sessions: number;
  }>;
  devotees: Array<{
    devotee_name: string;
    sessions_count: number;
    total_entries: string | number;
    total_malas: string | number;
    last_active: string;
  }>;
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const [devoteeName, setDevoteeName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [localCount, setLocalCount] = useState(0);

  const loadData = async (name?: string) => {
    setLoading(true);
    const filterName = name !== undefined ? name : devoteeName;

    try {
      // 1. Fetch aggregated stats from backend
      const statsRes = await HarinaamApi.getDashboardStats({
        devotee_name: filterName || undefined,
      });
      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      // 2. Fetch recent session ledger
      const historyRes = await HarinaamApi.getHistory({
        devotee_name: filterName || undefined,
      });
      if (historyRes.success && historyRes.data) {
        const list = Array.isArray(historyRes.data)
          ? historyRes.data
          : historyRes.data.data || [];
        setRecentSessions(list);
      }

      // 3. Count IndexedDB local entries for offline APK verification
      try {
        const localEntries = await getAllLocalEntries();
        setLocalCount(localEntries.length);
      } catch {
        // Fallback
      }
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harinaam_devotee_name') || '';
      setDevoteeName(saved);
      setTempName(saved);
      loadData(saved);
    }
  }, []);

  const handleSaveDevoteeName = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      localStorage.setItem('harinaam_devotee_name', trimmed);
      setDevoteeName(trimmed);
      setIsEditingName(false);
      loadData(trimmed);
    }
  };

  const handleExportJson = async () => {
    try {
      const localEntries = await getAllLocalEntries();
      const exportData = {
        devotee_name: devoteeName || 'Anonymous Devotee',
        exported_at: new Date().toISOString(),
        stats,
        recent_sessions: recentSessions,
        local_stroke_entries_count: localEntries.length,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `harinaam_sadhana_record_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('निर्यात करने में त्रुटि हुई');
    }
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full p-6 flex flex-col space-y-6 scrollable">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#23201D] bg-white/80 px-3 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.backToHome}</span>
        </Link>
        <button
          onClick={() => loadData()}
          className="flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#E06D1A] bg-white/80 px-3 py-1.5 rounded-full border border-[#EADDCF] transition shadow-2xs"
          aria-label="Refresh Sadhana Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>रिफ्रेश</span>
        </button>
      </div>

      {/* Devotee Profile Banner with Warm Pastel Glow */}
      <div className="bg-gradient-to-r from-[#E06D1A]/10 via-[#D4AF37]/10 to-transparent border border-[#EADDCF] rounded-3xl p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#E06D1A] uppercase tracking-wider block">
              {t.dashboard}
            </span>
            {isEditingName ? (
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="अपना नाम दर्ज करें"
                  className="px-3 py-1.5 bg-white border border-[#E06D1A] rounded-xl text-sm font-bold text-[#23201D] focus:outline-hidden"
                />
                <button
                  onClick={handleSaveDevoteeName}
                  className="px-3 py-1.5 bg-[#E06D1A] text-white text-xs font-semibold rounded-xl"
                >
                  सुरक्षित करें
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-[#23201D]">
                  {devoteeName ? `भक्त ${devoteeName}` : 'साधक / भक्त'} 🙏
                </h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-[#8C8275] hover:text-[#E06D1A] underline cursor-pointer"
                >
                  बदलें
                </button>
              </div>
            )}
            <p className="text-xs text-[#8C8275]">
              हरिनाम डिजिटल नाम-लेखन साधना रिकॉर्ड (Device / Offline Sync Ready)
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#E06D1A]/15 border border-[#E06D1A]/30 flex items-center justify-center text-[#E06D1A]">
            <Trophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white/80 border border-[#EADDCF] rounded-2xl p-4 text-center shadow-2xs">
          <span className="text-xs text-[#8C8275] block">{t.totalNaamWritten}</span>
          <span className="text-2xl font-bold text-[#E06D1A]">
            {stats?.total_entries || 0}
          </span>
          <span className="text-[10px] text-[#8C8275] block mt-0.5">Naam Entries</span>
        </div>

        <div className="bg-white/80 border border-[#EADDCF] rounded-2xl p-4 text-center shadow-2xs">
          <span className="text-xs text-[#8C8275] block">{t.completedMalas}</span>
          <span className="text-2xl font-bold text-[#23201D]">
            {stats?.total_malas || 0}
          </span>
          <span className="text-[10px] text-[#8C8275] block mt-0.5">Malas (108 each)</span>
        </div>

        <div className="bg-white/80 border border-[#EADDCF] rounded-2xl p-4 text-center shadow-2xs">
          <span className="text-xs text-[#8C8275] block">{t.totalSessions}</span>
          <span className="text-2xl font-bold text-[#800020]">
            {stats?.total_sessions || 0}
          </span>
          <span className="text-[10px] text-[#8C8275] block mt-0.5">Sessions</span>
        </div>

        <div className="bg-white/80 border border-[#EADDCF] rounded-2xl p-4 text-center shadow-2xs">
          <span className="text-xs text-[#8C8275] block">{t.offlineSaved}</span>
          <span className="text-2xl font-bold text-[#3A3530]">
            {localCount > 0 ? localCount : stats?.total_entries || 0}
          </span>
          <span className="text-[10px] text-[#8C8275] block mt-0.5">Local Saved</span>
        </div>
      </div>

      {/* Sacred Naam Breakdown */}
      {stats?.naam_breakdown && stats.naam_breakdown.length > 0 && (
        <div className="bg-white/80 border border-[#EADDCF] rounded-2xl p-5 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-[#23201D] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>पवित्र नाम अनुसार विवरण (Naam Breakdown)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {stats.naam_breakdown.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#EADDCF] rounded-xl p-3.5 flex items-center justify-between"
              >
                <div>
                  <span className="text-lg font-bold font-devanagari text-[#23201D] block">
                    {item.display_name}
                  </span>
                  <span className="text-xs text-[#8C8275]">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#E06D1A] block">
                    {item.total_entries} {t.naamUnit}
                  </span>
                  <span className="text-[11px] text-[#8C8275]">
                    {item.total_malas} {t.malaUnit} • {item.total_sessions} सत्र
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session History Ledger with Devotee Identity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#23201D] flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#8C8275]" />
            <span>{t.recentSessions}</span>
          </h3>
          <span className="text-xs text-[#8C8275]">
            {recentSessions.length} सत्र उपलब्ध
          </span>
        </div>

        {recentSessions.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#8C8275] bg-white/50 rounded-2xl border border-dashed border-[#EADDCF]">
            {t.noSessionsFound}
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentSessions.slice(0, 8).map((session, index) => {
              const dt = new Date(session.started_at);
              const formattedDate = dt.toLocaleDateString('hi-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });
              const formattedTime = dt.toLocaleTimeString('hi-IN', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={session.id || index}
                  className="p-4 rounded-2xl border border-[#EADDCF] bg-white/80 hover:bg-white transition flex items-center justify-between shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-[#23201D] font-devanagari">
                        {session.naam?.display_name || 'राम'}
                      </span>
                      {session.devotee_name && (
                        <span className="px-2 py-0.5 bg-[#E06D1A]/10 text-[#E06D1A] rounded-full text-[10px] font-semibold">
                          {session.devotee_name}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#8C8275] block">
                      {formattedDate}, {formattedTime}
                    </span>
                  </div>

                  <div className="text-right space-y-0.5">
                    <div className="text-base font-bold text-[#E06D1A]">
                      {session.completed_entries} / {session.target_entries} {t.naamUnit}
                    </div>
                    <div className="text-xs text-[#8C8275]">
                      {session.completed_malas} / {session.target_malas} {t.malaUnit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Record Export and Action Links */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleExportJson}
          className="flex-1 py-3.5 px-4 bg-white border border-[#EADDCF] hover:bg-[#FAF8F5] text-[#23201D] font-semibold rounded-2xl text-xs flex items-center justify-center space-x-2 transition shadow-2xs cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#8C8275]" />
          <span>{t.downloadBackup}</span>
        </button>

        <Link
          href="/select-naam"
          className="flex-1 py-3.5 px-4 bg-[#E06D1A] hover:bg-[#c95d13] text-white font-semibold rounded-2xl text-xs flex items-center justify-center space-x-2 transition shadow-xs text-center"
        >
          <span>{t.startWriting}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
