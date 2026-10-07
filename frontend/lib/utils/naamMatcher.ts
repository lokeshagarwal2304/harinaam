import { Stroke } from '@/types';

export interface WordStructureProfile {
  minPathDistance: number;
  minPoints: number;
  minDurationMs: number;
  minAspectRatio: number; // width / height
  minBboxArea: number;
}

/**
 * Calculates dynamic structural requirement based on the target holy Naam.
 * Prevents partial characters (e.g. only 'र' or only 'रा' when target is 'राम') from being counted.
 */
export function getWordStructureProfile(targetNaam: string = 'राम'): WordStructureProfile {
  const cleanNaam = targetNaam.trim();
  const charLength = Array.from(cleanNaam).length;

  // Short 1-2 char words (e.g. राम, सीता, Ram)
  if (charLength <= 3) {
    return {
      minPathDistance: 110,     // Full Devanagari/Indic word requires ~120px+ stroke length
      minPoints: 16,            // At least 16 points across all strokes
      minDurationMs: 250,       // Human writing takes at least 250ms for a word
      minAspectRatio: 0.75,     // Single letter like 'र' is tall & narrow (0.4-0.6); full 'राम' is wider (>=0.8)
      minBboxArea: 900,         // Minimum 30x30 bounding box area
    };
  }

  // Medium words (e.g. राधे राधे, जय श्री श्याम)
  if (charLength <= 8) {
    return {
      minPathDistance: 180,
      minPoints: 24,
      minDurationMs: 400,
      minAspectRatio: 1.1,
      minBboxArea: 1800,
    };
  }

  // Long mantras (e.g. ॐ नमः शिवाय, हरे कृष्ण)
  return {
    minPathDistance: 240,
    minPoints: 32,
    minDurationMs: 600,
    minAspectRatio: 1.3,
    minBboxArea: 2500,
  };
}

export interface MatchResult {
  isValid: boolean;
  reason?: string;
  metrics: {
    totalPoints: number;
    totalDistance: number;
    aspectRatio: number;
    bboxArea: number;
    durationMs: number;
  };
}

/**
 * Validates whether the captured strokes represent a complete word matching the target Naam structure.
 */
export function validateNaamStructure(
  strokes: Stroke[],
  targetNaam: string = 'राम'
): MatchResult {
  if (!strokes || strokes.length === 0) {
    return {
      isValid: false,
      reason: 'कोई रेखा नहीं खींची गई',
      metrics: { totalPoints: 0, totalDistance: 0, aspectRatio: 0, bboxArea: 0, durationMs: 0 },
    };
  }

  const profile = getWordStructureProfile(targetNaam);

  let totalPoints = 0;
  let totalDistance = 0;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let startTime = Infinity;
  let endTime = -Infinity;

  for (const stroke of strokes) {
    const points = stroke.points;
    totalPoints += points.length;

    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
      if (pt.time < startTime) startTime = pt.time;
      if (pt.time > endTime) endTime = pt.time;

      if (i > 0) {
        const prev = points[i - 1];
        const dx = pt.x - prev.x;
        const dy = pt.y - prev.y;
        totalDistance += Math.sqrt(dx * dx + dy * dy);
      }
    }
  }

  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const bboxArea = width * height;
  const aspectRatio = Math.round((width / height) * 100) / 100;
  const durationMs = Math.max(0, endTime - startTime);

  const metrics = {
    totalPoints,
    totalDistance: Math.round(totalDistance),
    aspectRatio,
    bboxArea: Math.round(bboxArea),
    durationMs,
  };

  // 1. Check points density
  if (totalPoints < profile.minPoints) {
    return {
      isValid: false,
      reason: `अधूरा अक्षर (कम बिंदु: ${totalPoints} < ${profile.minPoints})`,
      metrics,
    };
  }

  // 2. Check total path length (prevents single partial letters)
  if (metrics.totalDistance < profile.minPathDistance) {
    return {
      isValid: false,
      reason: `अधूरा शब्द (कम लंबाई: ${metrics.totalDistance}px < ${profile.minPathDistance}px)`,
      metrics,
    };
  }

  // 3. Check bounding area
  if (bboxArea < profile.minBboxArea) {
    return {
      isValid: false,
      reason: `बहुत छोटा आकार (${bboxArea}px² < ${profile.minBboxArea}px²)`,
      metrics,
    };
  }

  // 4. Check aspect ratio (prevents single vertical stroke when full word is expected)
  if (aspectRatio < profile.minAspectRatio && width < 60) {
    return {
      isValid: false,
      reason: `केवल एक अक्षर लिखा गया (${aspectRatio} < ${profile.minAspectRatio})`,
      metrics,
    };
  }

  return { isValid: true, metrics };
}
