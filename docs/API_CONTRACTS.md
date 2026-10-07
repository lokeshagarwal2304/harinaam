# Harinaam — REST API Contracts (v1)

Base URL: `http://localhost:8000/api/v1`

All responses follow the unified envelope structure:
```json
{
  "success": true,
  "data": {},
  "message": null
}
```

Error responses:
```json
{
  "success": false,
  "data": null,
  "message": "Human readable error description",
  "errors": {
    "field_name": ["Specific validation error"]
  }
}
```

---

## 1. Naam Management

### `GET /api/v1/naams`
Retrieves list of active holy names available for practice.

**Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ram",
      "display_name": "राम",
      "language": "hi",
      "slug": "ram",
      "description": "Taraka Mantra of Lord Rama",
      "sort_order": 1
    },
    {
      "id": 2,
      "name": "Sita",
      "display_name": "सीता",
      "language": "hi",
      "slug": "sita",
      "description": "Divine Mother Sita",
      "sort_order": 2
    },
    {
      "id": 3,
      "name": "Om Namah Shivaya",
      "display_name": "ॐ नमः शिवाय",
      "language": "hi",
      "slug": "om-namah-shivaya",
      "description": "Panchakshari Shiva Mantra",
      "sort_order": 3
    },
    {
      "id": 4,
      "name": "Jai Shree Shyam",
      "display_name": "जय श्री श्याम",
      "language": "hi",
      "slug": "jai-shree-shyam",
      "description": "Khatu Shyam Ji Mahamantra",
      "sort_order": 4
    }
  ],
  "message": "Active Naams retrieved successfully."
}
```

---

## 2. Session Management

### `POST /api/v1/sessions`
Initializes a new Naam Lekhan writing session.

**Headers**:
- `X-Device-UUID`: `3f4a9a08-27b3-4f99-9b5a-7ec0a4714f36` (Optional / Recommended)

**Request Body**:
```json
{
  "session_uuid": "e64903ba-5e0a-4835-9cbe-79ce32cf05d6",
  "naam_id": 1,
  "target_malas": 3,
  "device_uuid": "3f4a9a08-27b3-4f99-9b5a-7ec0a4714f36",
  "device_type": "web"
}
```

**Response `201 Created`**:
```json
{
  "success": true,
  "data": {
    "session_uuid": "e64903ba-5e0a-4835-9cbe-79ce32cf05d6",
    "naam": {
      "id": 1,
      "name": "Ram",
      "display_name": "राम"
    },
    "target_malas": 3,
    "completed_malas": 0,
    "target_entries": 324,
    "completed_entries": 0,
    "status": "in_progress",
    "started_at": "2026-10-07T12:00:00.000Z",
    "current_mala": {
      "id": 101,
      "mala_number": 1,
      "target_entries": 108,
      "completed_entries": 0,
      "status": "in_progress"
    }
  },
  "message": "Session created successfully."
}
```

---

### `GET /api/v1/sessions/{session_uuid}`
Fetches real-time status and Mala breakdown of a specific session.

**Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "session_uuid": "e64903ba-5e0a-4835-9cbe-79ce32cf05d6",
    "naam": {
      "id": 1,
      "display_name": "राम"
    },
    "target_malas": 3,
    "completed_malas": 1,
    "target_entries": 324,
    "completed_entries": 142,
    "status": "in_progress",
    "current_mala": {
      "id": 102,
      "mala_number": 2,
      "target_entries": 108,
      "completed_entries": 34,
      "status": "in_progress"
    }
  },
  "message": "Session state retrieved."
}
```

---

## 3. Naam Entry & Single Recording

### `POST /api/v1/sessions/{session_uuid}/entries`
Records a single completed written Naam entry.

**Request Body**:
```json
{
  "client_entry_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "mala_number": 1,
  "entry_number": 38,
  "written_at": "2026-10-07T12:04:15.120Z",
  "stroke_count": 2,
  "point_count": 48,
  "duration_ms": 1450,
  "stroke_data": {
    "version": 1,
    "canvas_dimensions": { "width": 800, "height": 600 },
    "strokes": [
      {
        "stroke_id": 1,
        "color": "#1A1A1A",
        "brush_size": 4,
        "points": [
          { "x": 120, "y": 250, "pressure": 0.8, "time": 1728290000100 },
          { "x": 128, "y": 257, "pressure": 0.9, "time": 1728290000140 }
        ]
      }
    ]
  }
}
```

**Response `201 Created` / `200 OK (Idempotent)`**:
```json
{
  "success": true,
  "data": {
    "client_entry_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "session_uuid": "e64903ba-5e0a-4835-9cbe-79ce32cf05d6",
    "current_mala": {
      "mala_number": 1,
      "completed_entries": 38,
      "target_entries": 108,
      "is_mala_completed": false
    },
    "session_summary": {
      "completed_entries": 38,
      "target_entries": 324,
      "completed_malas": 0,
      "target_malas": 3,
      "is_session_completed": false
    }
  },
  "message": "Naam entry saved successfully."
}
```

---

## 4. Offline Batch Synchronization

### `POST /api/v1/sessions/{session_uuid}/sync`
Submits buffered offline entries in bulk with guaranteed idempotency.

**Request Body**:
```json
{
  "entries": [
    {
      "client_entry_id": "a1111111-2222-3333-4444-555555555555",
      "mala_number": 1,
      "entry_number": 39,
      "written_at": "2026-10-07T12:05:00.000Z",
      "stroke_count": 2,
      "point_count": 52,
      "duration_ms": 1300,
      "stroke_data": { "strokes": [] }
    },
    {
      "client_entry_id": "b2222222-3333-4444-5555-666666666666",
      "mala_number": 1,
      "entry_number": 40,
      "written_at": "2026-10-07T12:05:03.000Z",
      "stroke_count": 2,
      "point_count": 61,
      "duration_ms": 1420,
      "stroke_data": { "strokes": [] }
    }
  ]
}
```

**Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "processed_count": 2,
    "inserted_count": 2,
    "duplicate_count": 0,
    "session_summary": {
      "completed_entries": 40,
      "target_entries": 324,
      "completed_malas": 0,
      "target_malas": 3,
      "status": "in_progress"
    }
  },
  "message": "Batch synchronization completed successfully."
}
```

---

## 5. History & Device Registration

### `GET /api/v1/history?device_uuid={uuid}`
Returns past completed and active sessions for a device or authenticated user.

### `POST /api/v1/devices/register`
Registers or updates device information.

### `GET /api/v1/devices/{device_uuid}`
Fetches registered device details.

