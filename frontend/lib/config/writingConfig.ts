/**
 * Harinaam Writing Engine Configuration
 * Centralized constants for touch detection, multi-stroke debounce, and stroke validation.
 */
export const WRITING_CONFIG = {
  // Timing
  autoCommitDelayMs: 750,    // Time to wait after lifting finger before committing complete Naam
  minDurationMs: 80,         // Minimum time spent writing to reject micro-glitches

  // Validation thresholds to prevent accidental touches & tiny dots
  minPoints: 8,              // Minimum captured coordinates across all combined strokes
  minDistance: 35,           // Minimum cumulative path length in pixels
  minBboxArea: 250,          // Minimum bounding box area (width * height in px²)

  // Canvas & Ink Aesthetics
  brushColor: '#23201D',     // Sacred deep carbon ink
  brushSize: 4.5,            // Natural fluid stylus/finger stroke width
  minBrushSize: 3.0,         // Minimum brush size at lowest pressure
  maxBrushSize: 6.0,         // Maximum brush size at highest pressure
  lineCap: 'round' as CanvasLineCap,
  lineJoin: 'round' as CanvasLineJoin,
};

export type WritingConfig = typeof WRITING_CONFIG;
