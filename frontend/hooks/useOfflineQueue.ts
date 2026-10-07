'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPendingSyncEntries, clearPendingQueueItem } from '@/lib/storage/indexedDb';
import { HarinaamApi } from '@/lib/api/client';
import { useConnectivity } from './useConnectivity';

export function useOfflineQueue(sessionUuid?: string) {
  const { isOnline } = useConnectivity();
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const refreshPendingCount = useCallback(async () => {
    try {
      const items = await getPendingSyncEntries(sessionUuid);
      setPendingCount(items.length);
    } catch {
      setPendingCount(0);
    }
  }, [sessionUuid]);

  const flushQueue = useCallback(async () => {
    if (!isOnline || isSyncing) return;

    try {
      setIsSyncing(true);
      const pendingItems = await getPendingSyncEntries(sessionUuid);

      if (pendingItems.length === 0) {
        setIsSyncing(false);
        return;
      }

      // Group items by session
      const grouped: Record<string, typeof pendingItems> = {};
      for (const item of pendingItems) {
        if (!grouped[item.session_uuid]) grouped[item.session_uuid] = [];
        grouped[item.session_uuid].push(item);
      }

      for (const [targetSessionUuid, items] of Object.entries(grouped)) {
        const entriesPayload = items.map((i) => i.entry);
        const res = await HarinaamApi.syncBatch(targetSessionUuid, entriesPayload);

        if (res.success) {
          for (const item of items) {
            if (item.id) await clearPendingQueueItem(item.id);
          }
        }
      }

      await refreshPendingCount();
    } catch (e) {
      console.error('Queue flush failed:', e);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isSyncing, sessionUuid, refreshPendingCount]);

  useEffect(() => {
    refreshPendingCount();
  }, [refreshPendingCount]);

  useEffect(() => {
    if (isOnline) {
      flushQueue();
    }
  }, [isOnline, flushQueue]);

  return {
    pendingCount,
    isSyncing,
    flushQueue,
    refreshPendingCount,
  };
}
