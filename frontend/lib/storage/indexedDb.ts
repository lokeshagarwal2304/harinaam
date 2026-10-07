import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { NaamEntry, Session } from '@/types';

interface HarinaamDB extends DBSchema {
  sessions: {
    key: string;
    value: Session;
    indexes: { 'by-status': string; 'by-date': string };
  };
  entries: {
    key: string;
    value: NaamEntry;
    indexes: { 'by-session': string; 'by-sync-status': string };
  };
  pending_sync_queue: {
    key: number;
    value: {
      id?: number;
      session_uuid: string;
      entry: NaamEntry;
      queued_at: number;
    };
    indexes: { 'by-session': string; 'by-entry-id': string };
  };
}

const DB_NAME = 'harinaam_local_v1';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<HarinaamDB>> | null = null;

export function getDatabase(): Promise<IDBPDatabase<HarinaamDB>> {
  if (!dbPromise) {
    dbPromise = openDB<HarinaamDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'session_uuid' });
          sessionStore.createIndex('by-status', 'status');
          sessionStore.createIndex('by-date', 'started_at');
        }

        if (!db.objectStoreNames.contains('entries')) {
          const entryStore = db.createObjectStore('entries', { keyPath: 'client_entry_id' });
          entryStore.createIndex('by-session', 'session_uuid');
          entryStore.createIndex('by-sync-status', 'sync_status');
        }

        if (!db.objectStoreNames.contains('pending_sync_queue')) {
          const queueStore = db.createObjectStore('pending_sync_queue', {
            keyPath: 'id',
            autoIncrement: true,
          });
          queueStore.createIndex('by-session', 'session_uuid');
          queueStore.createIndex('by-entry-id', 'entry.client_entry_id');
        }
      },
    });
  }
  return dbPromise;
}

export async function saveLocalEntry(entry: NaamEntry): Promise<void> {
  const db = await getDatabase();
  await db.put('entries', entry);
}

export async function queuePendingSync(entry: NaamEntry): Promise<void> {
  const db = await getDatabase();
  await db.add('pending_sync_queue', {
    session_uuid: entry.session_uuid,
    entry,
    queued_at: Date.now(),
  });
}

export async function getPendingSyncEntries(sessionUuid?: string) {
  const db = await getDatabase();
  if (sessionUuid) {
    return db.getAllFromIndex('pending_sync_queue', 'by-session', sessionUuid);
  }
  return db.getAll('pending_sync_queue');
}

export async function clearPendingQueueItem(queueId: number): Promise<void> {
  const db = await getDatabase();
  await db.delete('pending_sync_queue', queueId);
}
