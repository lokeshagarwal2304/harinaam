# Harinaam — Architecture Verification & Testing Guide

This guide outlines how to inspect and verify the Harinaam project structure, database migrations, models, services, API contracts, and frontend setup.

---

## 1. Directory Structure Verification

Verify that all essential modules are present in both frontend and backend directories:

```text
harinaam/
├── frontend/
│   ├── app/ (routes: select-naam, select-mala, write, history, settings)
│   ├── components/ (ui, writing, naam, mala, history)
│   ├── hooks/ (useDrawing, useSession, useOfflineQueue, useConnectivity)
│   ├── lib/ (api, storage, sync, utils)
│   └── types/ (index.ts)
│
├── backend/
│   ├── app/Models/ (User, Device, Naam, Session, Mala, NaamEntry)
│   ├── app/Http/Controllers/Api/V1/
│   ├── app/Services/ (SessionService, NaamEntryService, SyncService)
│   ├── database/migrations/
│   └── routes/api.php
│
└── docs/ (ARCHITECTURE, DATABASE_SCHEMA, API_CONTRACTS, etc.)
```

---

## 2. Backend Migration & Database Verification

When ready to test the Laravel database layer:

1. **Configure Environment**:
   Copy `.env.example` to `.env` in `backend/` and set MySQL credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=harinaam_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

2. **Verify Migration Files**:
   Ensure all 6 migrations execute in strict order:
   - `000001_create_users_table`
   - `000002_create_devices_table`
   - `000003_create_naams_table`
   - `000004_create_sessions_table`
   - `000005_create_malas_table`
   - `000006_create_naam_entries_table`

3. **Verify Constraints & Indexes**:
   - `client_entry_id` has a `UNIQUE` index in `naam_entries`.
   - `device_uuid` has a `UNIQUE` index in `devices`.
   - `malas` has compound unique key `(session_id, mala_number)`.

---

## 3. API Contract Testing Scenarios

| Test Case | Method & Endpoint | Payload / Params | Expected Result |
|---|---|---|---|
| **1. Fetch Naams** | `GET /api/v1/naams` | None | Returns list with राम, सीता, ॐ नमः शिवाय, जय श्री श्याम |
| **2. Create Session** | `POST /api/v1/sessions` | `{"naam_id":1, "target_malas":3}` | Returns session object with `324` target entries and Mala #1 initialized |
| **3. Record Entry** | `POST /api/v1/sessions/{id}/entries` | `{"client_entry_id":"uuid-1", "stroke_data":{...}}` | Progress increments from `0/108` to `1/108` |
| **4. Duplicate Entry Test** | `POST /api/v1/sessions/{id}/entries` | Same `client_entry_id` | Returns `200 OK`, count does NOT increment |
| **5. Batch Sync** | `POST /api/v1/sessions/{id}/sync` | `{"entries": [entry1, entry2]}` | Bulk updates session count and returns processed stats |

---

## 4. Frontend Gesture & Touch Filter Verification

| Test Scenario | User Action | Expected Engine Behavior |
|---|---|---|
| **A. Accidental Tap** | Taps screen once without dragging | Rejected (Point count < 12, length < 50px). Count unchanged. |
| **B. Multi-stroke Word** | Draws 'र', pauses 300ms, draws 'ा', draws 'म', draws top line | Strokes combined into 1 Naam entry after 650ms silence timer. Progress increments 1. |
| **C. Network Offline Simulation** | Disconnect Wi-Fi, write 5 Naams | Entries saved in IndexedDB `pending_sync_queue`. UI shows 5/108. |
| **D. Network Reconnection** | Reconnect Wi-Fi | Sync manager auto-flushes pending queue to backend API. |
