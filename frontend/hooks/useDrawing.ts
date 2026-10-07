'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Stroke, StrokeData } from '@/types';
import { recognizeAndMatchNaam, RecognitionResult } from '@/lib/utils/glyphRecognizer';
import { WRITING_CONFIG } from '@/lib/config/writingConfig';
import { soundEngine } from '@/lib/utils/soundEngine';

export type WritingState = 'idle' | 'writing' | 'waiting_for_next_stroke' | 'committing';

interface UseDrawingProps {
  onNaamCompleted: (strokeData: StrokeData) => void;
  targetNaam?: string;
  language?: string;
  config?: Partial<typeof WRITING_CONFIG>;
}

export function useDrawing({
  onNaamCompleted,
  targetNaam = 'राम',
  language = 'hi',
  config,
}: UseDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [writingState, setWritingState] = useState<WritingState>('idle');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Synchronous ref storage for immediate, deterministic access
  const allStrokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const autoCommitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSoundTimeRef = useRef<number>(0);

  const mergedConfig = { ...WRITING_CONFIG, ...config };

  const getDpr = useCallback(() => {
    return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  }, []);

  const showFeedback = useCallback((msg: string) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedbackMessage(msg);
    feedbackTimerRef.current = setTimeout(() => {
      setFeedbackMessage(null);
    }, 2400);
  }, []);

  /**
   * Render smooth strokes on high-DPI canvas
   */
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = getDpr();
    const rect = canvas.getBoundingClientRect();

    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const allStrokes = currentStrokeRef.current
      ? [...allStrokesRef.current, currentStrokeRef.current]
      : allStrokesRef.current;

    for (const stroke of allStrokes) {
      const points = stroke.points;
      if (!points || points.length === 0) continue;

      ctx.strokeStyle = stroke.color || mergedConfig.brushColor;
      ctx.fillStyle = stroke.color || mergedConfig.brushColor;
      ctx.lineCap = mergedConfig.lineCap;
      ctx.lineJoin = mergedConfig.lineJoin;

      if (points.length === 1) {
        // Single point dot
        const pt = points[0];
        const radius = (stroke.brush_size || mergedConfig.brushSize) / 2;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (points.length === 2) {
        // Line segment
        ctx.beginPath();
        ctx.lineWidth = stroke.brush_size || mergedConfig.brushSize;
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.stroke();
      } else {
        // Smooth quadratic bezier curves
        ctx.beginPath();
        ctx.lineWidth = stroke.brush_size || mergedConfig.brushSize;
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }

        const last = points[points.length - 1];
        const prev = points[points.length - 2];
        ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y);
        ctx.stroke();
      }
    }

    ctx.restore();
  }, [getDpr, mergedConfig]);

  /**
   * Final commit: called ONLY after the autoCommitDelayMs timeout expires without any new strokes.
   */
  const commitCompleteNaam = useCallback(() => {
    setWritingState('committing');

    const collectedStrokes = [...allStrokesRef.current];

    if (collectedStrokes.length > 0) {
      // Validate complete Naam with active language
      const recognition: RecognitionResult = recognizeAndMatchNaam(
        collectedStrokes,
        targetNaam,
        language
      );

      if (recognition.isMatch) {
        const canvas = canvasRef.current;
        const rect = canvas?.getBoundingClientRect();

        const strokeData: StrokeData = {
          version: 1,
          canvas_dimensions: {
            width: Math.round(rect?.width || 800),
            height: Math.round(rect?.height || 600),
          },
          metrics: {
            total_strokes: collectedStrokes.length,
            total_points: collectedStrokes.reduce((acc, s) => acc + s.points.length, 0),
            duration_ms: 600,
          },
          strokes: collectedStrokes,
        };

        // Notify session hook to increment count exactly ONCE
        onNaamCompleted(strokeData);

        // Play gentle sacred harmonic chime + haptic vibration
        soundEngine.playNaamCommitSound();
      } else {
        // Rejection haptic feedback and gentle localized guidance message
        soundEngine.triggerHaptic('reject');
        if (recognition.reason) {
          showFeedback(recognition.reason);
        }
      }
    }

    // Clean slate reset
    allStrokesRef.current = [];
    currentStrokeRef.current = null;
    setStrokes([]);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const dpr = getDpr();
      ctx?.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }

    setWritingState('idle');
  }, [targetNaam, language, onNaamCompleted, getDpr, showFeedback]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      // 1. Cancel pending auto-commit timer to allow multi-stroke writing
      if (autoCommitTimerRef.current) {
        clearTimeout(autoCommitTimerRef.current);
        autoCommitTimerRef.current = null;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }

      soundEngine.triggerHaptic('touch');

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pressure = e.pressure && e.pressure > 0 ? e.pressure : 0.5;
      const brushSize =
        mergedConfig.minBrushSize +
        pressure * (mergedConfig.maxBrushSize - mergedConfig.minBrushSize);

      const newStroke: Stroke = {
        stroke_id: allStrokesRef.current.length + 1,
        color: mergedConfig.brushColor,
        brush_size: Math.round(brushSize * 10) / 10,
        points: [{ x, y, pressure, time: Date.now() }],
      };

      currentStrokeRef.current = newStroke;
      setWritingState('writing');
      redrawCanvas();
    },
    [mergedConfig, redrawCanvas]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!currentStrokeRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pressure = e.pressure && e.pressure > 0 ? e.pressure : 0.5;

      currentStrokeRef.current.points.push({
        x,
        y,
        pressure,
        time: Date.now(),
      });

      // Subtle friction sound throttled
      const now = Date.now();
      if (now - lastSoundTimeRef.current > 70) {
        soundEngine.playStrokeFriction();
        lastSoundTimeRef.current = now;
      }

      redrawCanvas();
    },
    [redrawCanvas]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!currentStrokeRef.current) return;

      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Safe fallback
      }

      const completedStroke = currentStrokeRef.current;
      currentStrokeRef.current = null;

      // Append stroke to synchronous ref store
      allStrokesRef.current.push(completedStroke);
      setStrokes([...allStrokesRef.current]);
      setWritingState('waiting_for_next_stroke');

      // Start the debounce window for next stroke (750ms)
      if (autoCommitTimerRef.current) {
        clearTimeout(autoCommitTimerRef.current);
      }
      autoCommitTimerRef.current = setTimeout(() => {
        commitCompleteNaam();
      }, mergedConfig.autoCommitDelayMs);
    },
    [commitCompleteNaam, mergedConfig.autoCommitDelayMs]
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (currentStrokeRef.current) {
        handlePointerUp(e);
      }
    },
    [handlePointerUp]
  );

  const clearCanvas = useCallback(() => {
    if (autoCommitTimerRef.current) {
      clearTimeout(autoCommitTimerRef.current);
      autoCommitTimerRef.current = null;
    }
    allStrokesRef.current = [];
    currentStrokeRef.current = null;
    setStrokes([]);
    setWritingState('idle');

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const dpr = getDpr();
      ctx?.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
  }, [getDpr]);

  useEffect(() => {
    redrawCanvas();
  }, [strokes, redrawCanvas]);

  return {
    canvasRef,
    writingState,
    feedbackMessage,
    isIdle: writingState === 'idle' && allStrokesRef.current.length === 0 && !currentStrokeRef.current,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    clearCanvas,
  };
}
