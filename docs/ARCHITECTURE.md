# Harinaam — Production Architecture & System Design

## 1. System Architecture Overview

Harinaam is designed as a decoupled, multi-tier client-server architecture prioritizing:
1. **Zero-Distraction Writing UX**: Instant, lag-free vector stroke rendering on the client.
2. **Offline-First Resilience**: Full autonomous operation without active network connection.
3. **Strict Separation of Concerns**: Zero business logic on client; Laravel acts as the single source of truth for session calculations, statistics, validations, and storage.
4. **Hardware Agnostic**: Readily adaptable to mobile browsers, desktop tablets, and dedicated E-Ink / digital-paper writing hardware.

---

## 2. Layered Architecture

```text
+-----------------------------------------------------------------------+
|                           CLIENT TIER                                 |
|                       (Next.js App Router)                            |
|                                                                       |
|  [UI Views] ──► [Zen Canvas Engine] ──► [Stroke Validator]            |
|       │                                        │                      |
|       ▼                                        ▼                      |
|  [React State / Context] ◄────────────── [Local IndexedDB]            |
|       │                                        │                      |
|       ▼                                        ▼                      |
|  [Sync Manager] ────────────────────────► [Network Queue]             |
+---------------------------------------------------|-------------------+
                                                    │ HTTPS / JSON
                                                    ▼
+-----------------------------------------------------------------------+
|                          API ROUTING TIER                             |
|                        (Laravel 11 Routing)                           |
|                                                                       |
|                 /api/v1/*  (Rate Limiting & CORS)                     |
+-----------------------------------|-----------------------------------+
                                    │
                                    ▼
+-----------------------------------------------------------------------+
|                         APPLICATION LAYER                             |
|                                                                       |
|   ┌───────────────────────────┐      ┌───────────────────────────┐    |
|   │     API Controllers       │ ───► │   Form Request Validator  │    |
|   └─────────────┬─────────────┘      └───────────────────────────┘    |
|                 ▼                                                     |
|   ┌───────────────────────────┐      ┌───────────────────────────┐    |
|   │      Domain Services      │ ───► │     Business Rules        │    |
|   │  - SessionService         │      │  - 108 Mala Increment     │    |
|   │  - NaamEntryService       │      │  - Idempotent dedupe      │    |
|   │  - SyncService            │      │  - Vector stroke schema   │    |
|   └─────────────┬─────────────┘      └───────────────────────────┘    |
|                 ▼                                                     |
|   ┌───────────────────────────┐                                       |
|   │    Eloquent ORM Models    │                                       |
|   └─────────────┬─────────────┘                                       |
+-----------------|-----------------------------------------------------+
                  │ PDO
                  ▼
+-----------------------------------------------------------------------+
|                            DATA TIER                                  |
|                            MySQL 8.0                                  |
+-----------------------------------------------------------------------+
```

---

## 3. Frontend Architecture Principles (Next.js)

### Client Responsibilities:
- **Presentation & Canvas Lifecycle**: Capturing pointer events at 60-120fps with sub-millisecond stroke latency.
- **Accidental Touch Filter**: Real-time bounding box and path length calculation to reject stray taps.
- **Local Persistence**: Storing every stroke immediately to IndexedDB before any network request is initiated.
- **Queue Synchronization**: Managing background retries with exponential backoff when offline or on poor network conditions.

### Strict Non-Responsibilities:
- **No Business Logic on Client**: Client does not calculate session completion percentages, global stats, or historical aggregates. It simply sends entries and renders server-calculated state.

---

## 4. Backend Architecture Principles (Laravel)

### Clean Architecture Pattern:
```text
Routes (routes/api.php)
  │
  ▼
Controllers (app/Http/Controllers/Api/V1/*)
  │  Responsible only for HTTP request parsing, response formatting & status codes.
  ▼
Form Requests (app/Http/Requests/*)
  │  Responsible for input validation, schema verification & authorization.
  ▼
Domain Services (app/Services/*)
  │  Contains all business logic (Mala progression, session state machines, sync algorithms).
  ▼
Eloquent Models (app/Models/*)
  │  Data persistence, relationships, casting, scopes, and query helpers.
  ▼
Database (MySQL)
```

---

## 5. Security & Idempotency Strategy

1. **Client-Generated UUIDs**: Every `naam_entry` generated by the frontend is assigned a UUIDv4 `client_entry_id` before entering the offline queue.
2. **Idempotent REST APIs**: Repeated sync payloads with identical `client_entry_id` will update or safely no-op without creating duplicates.
3. **Sanitization**: Vector stroke payloads are validated against strict JSON schema to prevent injection or malicious data bloating.
4. **Device Identification**: Anonymous sessions are keyed by `device_uuid` header (`X-Device-UUID`), allowing seamless transition to full authenticated user accounts in future releases.
