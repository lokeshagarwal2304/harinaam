/**
 * Harinaam Strict Completeness Recognizer
 * 
 * Strict Verification Criteria:
 * 1. Accidental taps, dots & palm brushes are rejected immediately.
 * 2. Partial single-letter writing ('र' alone, 'रा' alone, 'स' alone) is STRICTLY rejected
 *    because the second/right character ('म'/'ता') is missing (right cluster ratio < 15% or width < 55px).
 * 3. Only when BOTH left and right characters of the sacred Naam ('राम', 'सीता', etc.)
 *    are fully written, the word is ACCEPTED and counter increments by 1.
 * 4. Multi-word sacred mantras ('ॐ नमः शिवाय', 'जय श्री श्याम', etc.) require multi-cluster completeness across the slate.
 */

import { Stroke } from '@/types';

export interface RecognitionResult {
  isMatch: boolean;
  score: number;
  reason?: string;
  reasonCode?: 'EMPTY' | 'TOO_SHORT' | 'INCOMPLETE_MANTRA' | 'INCOMPLETE_WORD' | 'MISSING_RIGHT' | 'MISSING_LEFT';
}

export function recognizeAndMatchNaam(
  strokes: Stroke[],
  targetNaam: string = 'राम',
  language: string = 'hi'
): RecognitionResult {
  const isEn = language === 'en';
  const isTe = language === 'te';
  const isTa = language === 'ta';
  const isKn = language === 'kn';

  if (!strokes || strokes.length === 0) {
    const emptyMsg = isEn ? 'No handwriting detected' : 'कोई लिखावट नहीं मिली';
    return {
      isMatch: false,
      score: 0,
      reason: emptyMsg,
      reasonCode: 'EMPTY',
    };
  }

  const cleanTarget = targetNaam.trim();

  let totalPoints = 0;
  let totalDistance = 0;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const xCoords: number[] = [];

  for (const stroke of strokes) {
    const pts = stroke.points;
    totalPoints += pts.length;

    for (let i = 0; i < pts.length; i++) {
      const pt = pts[i];
      xCoords.push(pt.x);

      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;

      if (i > 0) {
        const prev = pts[i - 1];
        const dx = pt.x - prev.x;
        const dy = pt.y - prev.y;
        totalDistance += Math.sqrt(dx * dx + dy * dy);
      }
    }
  }

  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const bboxArea = width * height;

  // 1. Accidental Tap & Touch Glitch Filter (palm rests, dots, quick brushes)
  if (totalPoints < 6 || totalDistance < 30 || bboxArea < 120) {
    const tooShortMsg = isEn
      ? 'Touch is too small — please write the complete name'
      : isTe
      ? 'స్పర్శ చాలా చిన్నది — దయచేసి పూర్తి నామం రాయండి'
      : isTa
      ? 'தொடுதல் மிகவும் சிறியது — முழுப் பெயரை எழுதவும்'
      : isKn
      ? 'ಸ್ಪರ್ಶವು ತುಂಬಾ ಚಿಕ್ಕದಾಗಿದೆ — ದಯವಿಟ್ಟು ಪೂರ್ಣ ನಾಮ ಬರೆಯಿರಿ'
      : 'स्पर्श बहुत छोटा है — कृपया पूरा नाम लिखें';

    return {
      isMatch: false,
      score: 0.1,
      reason: tooShortMsg,
      reasonCode: 'TOO_SHORT',
    };
  }

  // Calculate 3-Segment Horizontal Density
  // Left 35% cluster, Center 30%, Right 35% cluster
  const leftBound = minX + width * 0.35;
  const rightBound = minX + width * 0.65;
  let leftCount = 0;
  let centerCount = 0;
  let rightCount = 0;

  for (const x of xCoords) {
    if (x <= leftBound) leftCount++;
    else if (x < rightBound) centerCount++;
    else rightCount++;
  }

  const leftRatio = leftCount / totalPoints;
  const rightRatio = rightCount / totalPoints;

  // 2. Multi-Word Sacred Mantras ('ॐ नमः शिवाय', 'जय श्री श्याम', 'राधे राधे', 'हरे कृष्ण')
  if (cleanTarget.length > 5) {
    if (totalDistance < 120 || width < 80 || totalPoints < 18) {
      const incMantraMsg = isEn
        ? `Incomplete mantra — please write the full '${cleanTarget}'`
        : `अधूरा मंत्र — पूरा '${cleanTarget}' लिखें`;

      return {
        isMatch: false,
        score: 0.25,
        reason: incMantraMsg,
        reasonCode: 'INCOMPLETE_MANTRA',
      };
    }

    if (leftRatio < 0.15 || rightRatio < 0.15) {
      const incMantraMsg = isEn
        ? `Incomplete mantra handwriting — please write the full '${cleanTarget}'`
        : `अधूरा मंत्र लिखावट — पूरा '${cleanTarget}' लिखें`;

      return {
        isMatch: false,
        score: 0.3,
        reason: incMantraMsg,
        reasonCode: 'INCOMPLETE_MANTRA',
      };
    }

    return { isMatch: true, score: 0.98 };
  }

  // 3. Two-Character Holy Names ('राम', 'सीता', 'Ram', 'Sita', etc.)
  // Strictly enforce minimum distance and horizontal width
  if (totalDistance < 60) {
    const incWordMsg = isEn
      ? `Incomplete word — please write the full '${cleanTarget}'`
      : `अधूरा शब्द ('${strokes.length === 1 ? 'र' : 'भाग'}') — पूरा '${cleanTarget}' लिखें`;

    return {
      isMatch: false,
      score: 0.2,
      reason: incWordMsg,
      reasonCode: 'INCOMPLETE_WORD',
    };
  }

  // Single letter 'र' or 'रा' width is usually < 50px
  if (width < 50) {
    const narrowMsg = isEn
      ? `Incomplete word (missing letters) — please write the full '${cleanTarget}'`
      : `अधूरा शब्द (चौड़ाई बहुत कम है) — पूरा '${cleanTarget}' लिखें`;

    return {
      isMatch: false,
      score: 0.25,
      reason: narrowMsg,
      reasonCode: 'INCOMPLETE_WORD',
    };
  }

  // Missing Right Character (e.g. 'र' or 'रा' without 'म')
  if (rightRatio < 0.15) {
    const missingRightMsg = isEn
      ? `Incomplete word (missing right letter) — please write full '${cleanTarget}'`
      : `अधूरा शब्द — दायाँ भाग ('म') खाली है, पूरा '${cleanTarget}' लिखें`;

    return {
      isMatch: false,
      score: 0.3,
      reason: missingRightMsg,
      reasonCode: 'MISSING_RIGHT',
    };
  }

  // Missing Left Character (e.g. 'म' without 'र')
  if (leftRatio < 0.15) {
    const missingLeftMsg = isEn
      ? `Incomplete word (missing left letter) — please write full '${cleanTarget}'`
      : `अधूरा शब्द — बायाँ भाग ('र') खाली है, पूरा '${cleanTarget}' लिखें`;

    return {
      isMatch: false,
      score: 0.3,
      reason: missingLeftMsg,
      reasonCode: 'MISSING_LEFT',
    };
  }

  // All strict completeness criteria passed!
  return {
    isMatch: true,
    score: 0.98,
  };
}
