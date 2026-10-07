'use client';

import { useState, useCallback } from 'react';
import { Session, StrokeData, NaamEntry } from '@/types';
import { saveLocalEntry, queuePendingSync } from '@/lib/storage/indexedDb';
import { HarinaamApi } from '@/lib/api/client';

export function useSession(initialSession?: Session | null) {
  const [session, setSession] = useState<Session | null>(initialSession || null);
  const [justCompletedMala, setJustCompletedMala] = useState<number | null>(null);

  const handleNaamCompleted = useCallback(
    async (strokeData: StrokeData) => {
      if (!session) return;

      const currentMalaNumber = session.current_mala?.mala_number || 1;
      const targetPerMala = session.current_mala?.target_entries || 108;
      const currentMalaCount = (session.current_mala?.completed_entries || 0) + 1;
      const nextTotal = session.completed_entries + 1;

      const isMalaComplete = currentMalaCount >= targetPerMala;
      const isSessionComplete = nextTotal >= session.target_entries;

      const clientEntryId = crypto.randomUUID();

      const newEntry: NaamEntry = {
        client_entry_id: clientEntryId,
        session_uuid: session.session_uuid,
        mala_number: currentMalaNumber,
        naam_id: session.naam_id,
        entry_number: nextTotal,
        stroke_data: strokeData,
        stroke_count: strokeData.strokes.length,
        point_count: strokeData.metrics?.total_points || 0,
        duration_ms: strokeData.metrics?.duration_ms || 0,
        written_at: new Date().toISOString(),
        sync_status: 'pending',
      };

      // 1. Local-First: Immediate UI state update
      setSession((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          completed_entries: nextTotal,
          completed_malas: isMalaComplete ? prev.completed_malas + 1 : prev.completed_malas,
          status: isSessionComplete ? 'completed' : 'in_progress',
          current_mala: {
            mala_number: currentMalaNumber,
            target_entries: targetPerMala,
            completed_entries: currentMalaCount,
            status: isMalaComplete ? 'completed' : 'in_progress',
          },
        };
      });

      if (isMalaComplete) {
        setJustCompletedMala(currentMalaNumber);
      }

      // 2. Persist locally to IndexedDB
      try {
        await saveLocalEntry(newEntry);
      } catch (e) {
        console.error('IndexedDB save failed:', e);
      }

      // 3. Asynchronous non-blocking background API sync
      try {
        const response = await HarinaamApi.recordEntry(session.session_uuid, newEntry);
        if (!response.success) {
          await queuePendingSync(newEntry);
        }
      } catch {
        await queuePendingSync(newEntry);
      }
    },
    [session]
  );

  const startNextMala = useCallback(() => {
    setJustCompletedMala(null);
    setSession((prev) => {
      if (!prev) return null;
      const nextMalaNum = (prev.current_mala?.mala_number || 1) + 1;
      return {
        ...prev,
        current_mala: {
          mala_number: nextMalaNum,
          target_entries: prev.current_mala?.target_entries || 108,
          completed_entries: 0,
          status: 'in_progress',
        },
      };
    });
  }, []);

  return {
    session,
    setSession,
    handleNaamCompleted,
    justCompletedMala,
    startNextMala,
    setJustCompletedMala,
  };
}
