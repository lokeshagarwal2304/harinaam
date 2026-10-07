# Harinaam — Writing Engine & Gesture Detection Specification

## 1. Engine Philosophy

The writing interaction in **Harinaam** is designed to mimic physical ink on paper or a slate (पाटी).
The user must not be forced to tap any UI buttons to advance their count.

```text
User writes on Canvas
        ↓
Pointer Down ──► Pointer Move (Captures Coordinates) ──► Pointer Up
        ↓
Multi-stroke Pause Timer (Default: 650ms debounce)
        ↓
[Accidental Touch & Stroke Validation]
        ├── Invalid (e.g. accidental dot/tap) ──► Flash soft warning / Clear canvas
        └── Valid ───────────────────────────► Encode Vector JSON
                                                      ↓
                                              Commit to IndexedDB
                                                      ↓
                                              Increment Mala Progress UI
                                                      ↓
                                              Clear Canvas for next Naam
```

---

## 2. Pointer Events Lifecycle

We use the W3C **Pointer Events API** (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`, `pointerleave`) because:
1. Unified handling of **Touch**, **Stylus/Pen** (with pressure sensitivity), and **Mouse**.
2. Prevents mouse emulation delays on mobile devices.
3. Native support for `pointerId` locking via `setPointerCapture`.

### Event Loop:
```typescript
interface Point {
  x: number;
  y: number;
  pressure: number;
  time: number; // Date.now()
}

interface Stroke {
  stroke_id: number;
  points: Point[];
  color: string;
  brush_size: number;
}
```

---

## 3. Accidental Touch Protection Algorithms

To prevent accidental palm rests, table brushes, or unintentional taps from counting as a completed Naam, the engine executes four configurable heuristic checks before accepting a completed Naam:

### Check 1: Minimum Point Count ($N_{points}$)
A legitimate Hindi or Sanskrit character requires multiple inflection points.
$$\text{Total Points} \ge \text{CONFIG.MIN\_POINTS} \quad (\text{Default: } 12)$$

### Check 2: Total Stroke Path Distance ($D_{total}$)
Computes the Euclidean distance summed across all consecutive points:
$$D = \sum_{i=1}^{n-1} \sqrt{(x_{i+1} - x_i)^2 + (y_{i+1} - y_i)^2} \ge \text{CONFIG.MIN\_DISTANCE\_PX} \quad (\text{Default: } 50\text{px})$$

### Check 3: Bounding Box Diagonal ($\text{BBox}$)
Ensures the written glyph occupies sufficient canvas area:
$$\Delta X = X_{max} - X_{min}, \quad \Delta Y = Y_{max} - Y_{min}$$
$$\text{Area} = \Delta X \times \Delta Y \ge \text{CONFIG.MIN\_BBOX\_AREA} \quad (\text{Default: } 400\text{px}^2)$$

### Check 4: Minimum Writing Duration ($T_{ms}$)
Filters out high-velocity accidental swipe gestures:
$$T_{end} - T_{start} \ge \text{CONFIG.MIN\_DURATION\_MS} \quad (\text{Default: } 250\text{ms})$$

---

## 4. Multi-Stroke Combination & Auto-Advance Timer

Spiritual names often require multiple separate strokes (e.g., in Devanagari, drawing the vertical bar, curve, and top horizontal *Shirorekha* line):

1. When `pointerup` occurs, the stroke is added to the active `current_strokes` buffer.
2. A silence timer of $T_{silence} = 650\text{ms}$ is started.
3. If the user touches down again within $650\text{ms}$, the timer is cancelled and the new stroke is appended to the same Naam.
4. When the timer expires with no new touches, all buffered strokes are merged, validated, committed as 1 Naam, and the canvas resets smoothly.

---

## 5. Vector Stroke Storage JSON Schema

```json
{
  "version": 1,
  "canvas_dimensions": {
    "width": 1024,
    "height": 768
  },
  "metrics": {
    "total_strokes": 2,
    "total_points": 86,
    "duration_ms": 1320,
    "bounding_box": {
      "x": 210,
      "y": 140,
      "width": 260,
      "height": 180
    }
  },
  "strokes": [
    {
      "stroke_id": 1,
      "brush": "ink",
      "color": "#18181B",
      "size": 4.5,
      "points": [
        { "x": 210.4, "y": 142.1, "p": 0.65, "t": 0 },
        { "x": 215.8, "y": 150.3, "p": 0.72, "t": 18 }
      ]
    }
  ]
}
```
