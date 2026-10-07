import { Stroke } from '@/types';
import { WRITING_CONFIG } from '@/lib/config/writingConfig';

export interface ValidationResult {
  isValid: boolean;
  reason?: string;
  metrics: {
    totalPoints: number;
    totalDistance: number;
    bboxArea: number;
    durationMs: number;
  };
}

export function validateStrokes(
  strokes: Stroke[],
  config: typeof WRITING_CONFIG = WRITING_CONFIG
): ValidationResult {
  if (!strokes || strokes.length === 0) {
    return {
      isValid: false,
      reason: 'No strokes captured',
      metrics: { totalPoints: 0, totalDistance: 0, bboxArea: 0, durationMs: 0 },
    };
  }

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

  const width = Math.max(0, maxX - minX);
  const height = Math.max(0, maxY - minY);
  const bboxArea = width * height;
  const durationMs = Math.max(0, endTime - startTime);

  const metrics = {
    totalPoints,
    totalDistance: Math.round(totalDistance),
    bboxArea: Math.round(bboxArea),
    durationMs,
  };

  if (totalPoints < config.minPoints) {
    return {
      isValid: false,
      reason: `Too few points (${totalPoints} < ${config.minPoints})`,
      metrics,
    };
  }

  if (totalDistance < config.minDistance) {
    return {
      isValid: false,
      reason: `Stroke length too short (${metrics.totalDistance}px < ${config.minDistance}px)`,
      metrics,
    };
  }

  if (bboxArea < config.minBboxArea) {
    return {
      isValid: false,
      reason: `Drawing area too small (${metrics.bboxArea}px² < ${config.minBboxArea}px²)`,
      metrics,
    };
  }

  if (durationMs < config.minDurationMs) {
    return {
      isValid: false,
      reason: `Stroke duration too short (${durationMs}ms < ${config.minDurationMs}ms)`,
      metrics,
    };
  }

  return { isValid: true, metrics };
}
