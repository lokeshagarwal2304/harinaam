# Harinaam — Offline-First Persistence & Sync Engine

## 1. Storage Architecture

To provide continuous, zero-friction spiritual writing even in temples or locations without internet connectivity, Harinaam uses **IndexedDB** as its primary client-side write target.

```text
               [Canvas Gesture Committed]
                            │
                            ▼
              ┌───────────────────────────┐
              │ IndexedDB: 'harinaam_db'  │
              │  - 'sessions'             │
              │  - 'entries'              │
              │  - 'pending_sync_queue'   │
              └─────────────┬─────────────┘
                            │
               ┌────────────┴────────────┐
               │                         │
          [ONLINE]                   [OFFLINE]
               │                         │
               ▼                         ▼
   Send via API Immediately     Keep in 'pending_sync_queue'
               │                         │
               ▼                         ▼
   Mark 'synced' in IndexedDB   Listen for 'online' event / Reconnect
                                         │
                                         ▼
                               Flush via POST /api/v1/sessions/{id}/sync
```

---

## 2. IndexedDB Object Stores

Database Name: `harinaam_local_v1`

### Object Store 1: `sessions`
- **KeyPath**: `session_uuid` (string)
- **Indexes**: `status`, `created_at`
- **Payload**: Full session metadata, target malas, completed count.

### Object Store 2: `entries`
- **KeyPath**: `client_entry_id` (string UUIDv4)
- **Indexes**: `session_uuid`, `mala_number`, `sync_status`
- **Payload**: Vector stroke data, timestamps, point counts.

### Object Store 3: `pending_sync_queue`
- **KeyPath**: `id` (Auto-increment integer)
- **Indexes**: `session_uuid`, `client_entry_id`, `created_at`

---

## 3. Sync Protocol & Idempotency Rules

1. **UUID Generation on Client**: Prior to drawing write-commit, the client creates a RFC4122 UUIDv4 `client_entry_id`.
2. **Queueing**: If `navigator.onLine === false` or API request fails with network error, the entry is pushed to `pending_sync_queue`.
3. **Reconnection Hook**: A global network listener (`window.addEventListener('online')`) triggers a sync cycle.
4. **Backend Deduplication**: In Laravel:
   ```php
   NaamEntry::firstOrCreate(
       ['client_entry_id' => $validated['client_entry_id']],
       $entryAttributes
   );
   ```
   If the record already exists, Laravel increments no counters and returns the existing entry gracefully.
