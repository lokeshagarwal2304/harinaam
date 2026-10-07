# Harinaam (हरिनाम) — Digital Naam Lekhan Architecture

> **A Peaceful, Digital Spiritual Writing Experience**  
> Digitize the traditional spiritual practice of *Naam Lekhan* (नाम लेखन) with zero distraction, vector stroke capture, offline-first reliability, and seamless progress tracking.

---

## 📖 Table of Contents

1. [Product Overview & Philosophy](#-product-overview--philosophy)
2. [High-Level Architecture](#-high-level-architecture)
3. [Technology Stack](#-technology-stack)
4. [Folder Structure](#-folder-structure)
5. [Core Entities & Concepts](#-core-entities--concepts)
6. [Writing Engine & Vector Stroke Representation](#-writing-engine--vector-stroke-representation)
7. [Offline-First Sync & Idempotency](#-offline-first-sync--idempotency)
8. [Documentation Index](#-documentation-index)
9. [Development Conventions & Workflow](#-development-conventions--workflow)

---

## 🌸 Product Overview & Philosophy

Traditionally, devotees and spiritual practitioners write the name of the Divine (such as **राम**, **सीता**, **ॐ नमः शिवाय**, **जय श्री श्याम**, **राधे राधे**) repeatedly in physical notebooks or on slates. Each Mala represents **108 Naam entries**.

**Harinaam** digitizes this sacred practice while preserving its serene, meditative essence:
- **No Friction**: No "Submit", "Save", "Next", or "Count" buttons during writing. Writing itself is the trigger.
- **Natural Writing Feel**: High-frequency Pointer Events capturing fluid vector strokes.
- **Vector Strokes, Not Images**: Saves raw coordinate strokes (x, y, timestamp, pressure) instead of heavy PNG images, enabling replay, smooth scaling, minimal payload size (~1-2 KB per entry), and future hardware integration.
- **Offline First**: Works anywhere—even in remote temples or offline settings—storing entries locally in IndexedDB and synchronizing seamlessly with the Laravel API.
- **Accidental Touch Protection**: Configurable minimum stroke distance, points, and bounding box area to prevent accidental palm or brush triggers.

---

## 🏛 High-Level Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                            │
│                        Next.js 14+ (App Router)                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  /select-naam  │  /select-mala  │  /write (Canvas)  │  /history │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│                     ┌──────────────┴──────────────┐                     │
│                     ▼                             ▼                     │
│         [HTML5 Vector Canvas]            [IndexedDB Local DB]           │
│         Pointer Events Engine            Offline Queue & Persistence    │
└─────────────────────┬─────────────────────────────┬─────────────────────┘
                      │                             │
                      │ (Auto Sync via Axios/Fetch) │ (UUID Idempotency)
                      ▼                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION LAYER                             │
│                           Laravel 11 REST API                           │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ Routes (v1) ➔ Form Requests ➔ Services (Domain) ➔ Eloquent Models│   │
│   └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                             DATA LAYER                                  │
│                              MySQL 8.0                                  │
│   ┌───────────────┬───────────────┬────────────────┬────────────────┐   │
│   │     users     │    devices    │     naams      │    sessions    │   │
│   ├───────────────┼───────────────┼────────────────┼────────────────┤   │
│   │     malas     │ naam_entries  │   sync_logs    │                │   │
│   └───────────────┴───────────────┴────────────────┴────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js (App Router), React, TypeScript | Fast, type-safe, PWA-ready client interface |
| **Styling & UI** | Tailwind CSS | Minimalist, serene, peaceful spiritual aesthetics |
| **Drawing Engine** | HTML5 Canvas + Pointer Events API | High-precision vector stroke capturing |
| **Client Storage** | IndexedDB (`idb` wrapper) | Zero data-loss offline buffer & local session history |
| **Backend Framework**| Laravel 11 (PHP 8.2+) | Versioned REST API, validation, domain services |
| **Database** | MySQL 8.0+ | Relational integrity, JSON stroke storage, migrations |
| **API Protocol** | JSON REST (v1) | Standardized `{ success, data, message }` responses |

---

## 📁 Folder Structure

```text
harinaam/
├── README.md                          # Master Project Overview & Architecture Guide
├── docs/                              # Deep-dive Architecture Documentation
│   ├── ARCHITECTURE.md                # System Architecture & Design Principles
│   ├── DATABASE_SCHEMA.md             # Complete MySQL Entity-Relationship & Schema
│   ├── API_CONTRACTS.md               # v1 REST API Endpoints & Request/Response Payloads
│   ├── WRITING_ENGINE_SPEC.md         # Canvas Engine, Gestures & Touch Protection
│   ├── OFFLINE_SYNC_SPEC.md           # IndexedDB, Idempotency & Sync Queue Spec
│   └── TESTING_GUIDE.md               # Step-by-Step Verification & Testing Guide
│
├── frontend/                          # Next.js App Router Client Application
│   ├── package.json                   # Dependencies specification
│   ├── tsconfig.json                  # TypeScript compiler options
│   ├── tailwind.config.ts             # Tailwind CSS tokens & color palette
│   ├── next.config.mjs                # Next.js configuration
│   ├── .env.example                   # Client environment variables template
│   ├── app/                           # App Router routes
│   │   ├── layout.tsx                 # Root layout with fonts & metadata
│   │   ├── page.tsx                   # Welcome / Start screen
│   │   ├── select-naam/page.tsx       # Naam selection screen
│   │   ├── select-mala/page.tsx       # Mala target configuration screen
│   │   ├── write/page.tsx             # Full-screen Zen Writing Canvas
│   │   ├── history/page.tsx           # Past sessions & statistics
│   │   └── settings/page.tsx          # Writing thresholds & preferences
│   ├── components/                    # Modular React components
│   │   ├── ui/                        # Reusable primitives (Buttons, Modals, Badges)
│   │   ├── writing/                   # Canvas, StrokeRenderer, ProgressCounter
│   │   ├── naam/                      # NaamCard, NaamGrid
│   │   ├── mala/                      # MalaPicker, MalaProgressRing
│   │   └── history/                   # SessionList, SessionDetailModal
│   ├── hooks/                         # Custom React Hooks
│   │   ├── useDrawing.ts              # Canvas pointer tracking & stroke collection
│   │   ├── useSession.ts              # Active session, mala tracking & entry commits
│   │   ├── useOfflineQueue.ts         # IndexedDB sync queue management
│   │   └── useConnectivity.ts        # Online/Offline network state listener
│   ├── lib/                           # Core utilities and clients
│   │   ├── api/client.ts              # Axios/Fetch API client with error handling
│   │   ├── storage/indexedDb.ts       # IndexedDB database initialization & CRUD
│   │   ├── sync/syncManager.ts        # Bidirectional sync orchestrator
│   │   └── utils/strokeValidator.ts   # Accidental touch protection algorithms
│   └── types/                         # Shared TypeScript definitions
│       └── index.ts                   # Domain entities, API responses & stroke types
│
└── backend/                           # Laravel 11 REST API Application
    ├── composer.json                  # PHP Dependencies & Autoloading
    ├── .env.example                   # Backend environment configuration template
    ├── app/
    │   ├── Models/                    # Eloquent Entities
    │   │   ├── User.php
    │   │   ├── Device.php
    │   │   ├── Naam.php
    │   │   ├── Session.php
    │   │   ├── Mala.php
    │   │   └── NaamEntry.php
    │   ├── Http/
    │   │   ├── Controllers/Api/V1/    # Version 1 API Controllers
    │   │   │   ├── NaamController.php
    │   │   │   ├── SessionController.php
    │   │   │   ├── NaamEntryController.php
    │   │   │   ├── SyncController.php
    │   │   │   ├── HistoryController.php
    │   │   │   └── DeviceController.php
    │   │   └── Requests/              # Validated Form Request classes
    │   │       ├── CreateSessionRequest.php
    │   │       ├── StoreNaamEntryRequest.php
    │   │       └── BatchSyncRequest.php
    │   └── Services/                  # Domain Business Logic
    │       ├── SessionService.php     # Session lifecycle & Mala management
    │       ├── NaamEntryService.php   # Stroke validation & entry persistence
    │       └── SyncService.php        # Idempotent batch synchronization
    ├── database/
    │   └── migrations/                # Database Migrations
    │       ├── 2026_10_07_000001_create_users_table.php
    │       ├── 2026_10_07_000002_create_devices_table.php
    │       ├── 2026_10_07_000003_create_naams_table.php
    │       ├── 2026_10_07_000004_create_sessions_table.php
    │       ├── 2026_10_07_000005_create_malas_table.php
    │       └── 2026_10_07_000006_create_naam_entries_table.php
    └── routes/
        ├── api.php                    # REST API Route Definitions (v1)
        └── web.php                    # Health check & Fallback routes
```

---

## 📿 Core Entities & Concepts

1. **Naam (नाम)**: The holy name being written (e.g., `राम`, `सीता`, `ॐ नमः शिवाय`, `जय श्री श्याम`).
2. **Mala (माला)**: A spiritual set of exactly **108 Naam entries** (Customizable target per mala if configured).
3. **Session (सत्र)**: A single continuous writing sitting (e.g., Target: 3 Malas = 324 entries).
4. **Naam Entry (प्रविष्टि)**: An individual completed written Naam containing vector stroke data, timestamp, Mala association, and a client UUID (`client_entry_id`).
5. **Device (उपकरण)**: Hardware identity (Browser UUID or future dedicated electronic paper book).

---

## ✍️ Writing Engine & Vector Stroke Representation

Handwritten entries are stored as structured vector JSON:
```json
{
  "client_entry_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "stroke_data": {
    "version": 1,
    "canvas_dimensions": { "width": 800, "height": 600 },
    "strokes": [
      {
        "stroke_id": 1,
        "color": "#1A1A1A",
        "brush_size": 4,
        "points": [
          { "x": 120.5, "y": 250.2, "pressure": 0.8, "time": 1728290000100 },
          { "x": 124.1, "y": 253.6, "pressure": 0.85, "time": 1728290000120 },
          { "x": 128.0, "y": 257.0, "pressure": 0.9, "time": 1728290000140 }
        ]
      }
    ]
  }
}
```

### Accidental Touch Protection Rules:
- **Minimum Point Count**: $\ge 8$ captured pointer coordinates.
- **Minimum Stroke Length**: Total accumulated path distance $\ge 45\text{px}$.
- **Minimum Bounding Box Area**: Width $\times$ Height $\ge 20\text{px} \times 20\text{px}$.
- **Auto-Commit Silence Window**: $600\text{ms} - 800\text{ms}$ configurable pause after pointer release before committing and clearing canvas.

---

## 🔄 Offline-First Sync & Idempotency

- Every Naam Entry is assigned a client-side UUIDv4 (`client_entry_id`) prior to writing to IndexedDB.
- When network connectivity is active, entries stream seamlessly to `POST /api/v1/sessions/{session}/entries`.
- If offline, entries buffer inside the local IndexedDB `pending_sync_queue`.
- Upon reconnection, `POST /api/v1/sessions/{session}/sync` flushes the queue in bulk.
- The backend leverages unique database constraints on `client_entry_id` (`UNIQUE KEY`) and upsert logic to ensure zero duplicate entries even under unreliable mobile network retries.

---

## 📚 Documentation Index

For in-depth specifications, refer to:
- 📑 [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — Architectural patterns, layers & separation of concerns.
- 🗄 [`docs/DATABASE_SCHEMA.md`](./docs/DATABASE_SCHEMA.md) — MySQL database schema, migrations & indexes.
- 🔌 [`docs/API_CONTRACTS.md`](./docs/API_CONTRACTS.md) — Complete REST API v1 endpoints with JSON schemas.
- ✏️ [`docs/WRITING_ENGINE_SPEC.md`](./docs/WRITING_ENGINE_SPEC.md) — Canvas Pointer Events, vector encoding & auto-advance algorithms.
- 📦 [`docs/OFFLINE_SYNC_SPEC.md`](./docs/OFFLINE_SYNC_SPEC.md) — IndexedDB schema & sync engine.
- 🧪 [`docs/TESTING_GUIDE.md`](./docs/TESTING_GUIDE.md) — Step-by-step verification and QA testing guide.

---

## ⚙️ Next Steps & Implementation Roadmap

1. **Architecture & Schema Approval** (Current Phase)
2. **Phase 1: Backend Database Migrations & Seeders**
3. **Phase 2: Backend Domain Services & REST APIs**
4. **Phase 3: Frontend Next.js Canvas Writing Engine & Touch Filter**
5. **Phase 4: Frontend State Management, Mala Progress & IndexedDB**
6. **Phase 5: Bidirectional Synchronization Engine & History Views**
