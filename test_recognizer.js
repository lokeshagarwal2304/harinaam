// Strict Recognizer Unit Test

function recognizeAndMatchNaam(strokes, targetNaam = 'राम', language = 'hi') {
  if (!strokes || strokes.length === 0) {
    return { isMatch: false, score: 0, reason: 'कोई लिखावट नहीं मिली' };
  }

  const cleanTarget = targetNaam.trim();

  let totalPoints = 0;
  let totalDistance = 0;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const xCoords = [];

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

  // 1. Accidental Tap & Touch Filter
  if (totalPoints < 6 || totalDistance < 30 || bboxArea < 120) {
    return {
      isMatch: false,
      score: 0.1,
      reason: 'स्पर्श बहुत छोटा है — कृपया पूरा नाम लिखें',
    };
  }

  // Calculate 3-Segment Horizontal Density
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

  // 2. Multi-Word Sacred Mantras
  if (cleanTarget.length > 5) {
    if (totalDistance < 120 || width < 80 || totalPoints < 18) {
      return {
        isMatch: false,
        score: 0.25,
        reason: `अधूरा मंत्र — पूरा '${cleanTarget}' लिखें`,
      };
    }

    if (leftRatio < 0.15 || rightRatio < 0.15) {
      return {
        isMatch: false,
        score: 0.3,
        reason: `अधूरा मंत्र लिखावट — पूरा '${cleanTarget}' लिखें`,
      };
    }

    return { isMatch: true, score: 0.98 };
  }

  // 3. Two-Character Holy Names ('राम', 'सीता')
  if (totalDistance < 60) {
    return {
      isMatch: false,
      score: 0.2,
      reason: `अधूरा शब्द ('${strokes.length === 1 ? 'र' : 'भाग'}') — पूरा '${cleanTarget}' लिखें`,
    };
  }

  if (width < 50) {
    return {
      isMatch: false,
      score: 0.25,
      reason: `अधूरा शब्द (चौड़ाई बहुत कम है) — पूरा '${cleanTarget}' लिखें`,
    };
  }

  // Missing Right Character (e.g. 'र' or 'रा' without 'म')
  if (rightRatio < 0.15) {
    return {
      isMatch: false,
      score: 0.3,
      reason: `अधूरा शब्द — दायाँ भाग ('म') खाली है, पूरा '${cleanTarget}' लिखें`,
    };
  }

  // Missing Left Character (e.g. 'म' without 'र')
  if (leftRatio < 0.15) {
    return {
      isMatch: false,
      score: 0.3,
      reason: `अधूरा शब्द — बायाँ भाग ('र') खाली है, पूरा '${cleanTarget}' लिखें`,
    };
  }

  return { isMatch: true, score: 0.98 };
}

// Test Cases
const tests = [
  {
    name: "Accidental single dot / tap",
    strokes: [{ points: [{ x: 50, y: 50 }, { x: 51, y: 51 }] }],
    target: "राम",
    expectedMatch: false
  },
  {
    name: "Only 'र' written (left alone, no 'म')",
    strokes: [{
      points: [
        { x: 50, y: 50 }, { x: 55, y: 55 }, { x: 58, y: 65 }, { x: 52, y: 75 },
        { x: 48, y: 85 }, { x: 58, y: 95 }, { x: 65, y: 105 }
      ]
    }],
    target: "राम",
    expectedMatch: false
  },
  {
    name: "Only 'रा' written ('र' + matra, still missing 'म')",
    strokes: [
      { points: [{ x: 50, y: 50 }, { x: 55, y: 55 }, { x: 60, y: 75 }, { x: 65, y: 95 }] },
      { points: [{ x: 75, y: 50 }, { x: 75, y: 95 }] }
    ],
    target: "राम",
    expectedMatch: false
  },
  {
    name: "Complete 'राम' (multi-stroke: 'र' + 'ा' + 'म' + shirorekha)",
    strokes: [
      // Shirorekha
      { points: [{ x: 50, y: 50 }, { x: 75, y: 50 }, { x: 100, y: 50 }, { x: 125, y: 50 }, { x: 150, y: 50 }] },
      // 'र'
      { points: [{ x: 55, y: 55 }, { x: 65, y: 65 }, { x: 60, y: 75 }, { x: 70, y: 95 }] },
      // 'ा'
      { points: [{ x: 90, y: 55 }, { x: 90, y: 95 }] },
      // 'म'
      { points: [{ x: 120, y: 55 }, { x: 120, y: 80 }, { x: 135, y: 80 }, { x: 140, y: 55 }, { x: 140, y: 95 }] }
    ],
    target: "राम",
    expectedMatch: true
  },
  {
    name: "Only 'स' written (incomplete 'सीता')",
    strokes: [{
      points: [
        { x: 50, y: 50 }, { x: 55, y: 60 }, { x: 50, y: 70 }, { x: 58, y: 85 },
        { x: 60, y: 70 }, { x: 68, y: 70 }, { x: 68, y: 90 }
      ]
    }],
    target: "सीता",
    expectedMatch: false
  },
  {
    name: "Complete 'सीता' ('सी' left + 'ता' right)",
    strokes: [
      { points: [{ x: 50, y: 50 }, { x: 80, y: 50 }, { x: 110, y: 50 }, { x: 140, y: 50 }, { x: 170, y: 50 }] },
      { points: [{ x: 60, y: 60 }, { x: 65, y: 70 }, { x: 75, y: 70 }, { x: 75, y: 95 }] },
      { points: [{ x: 60, y: 50 }, { x: 75, y: 40 }, { x: 90, y: 50 }, { x: 90, y: 95 }] },
      { points: [{ x: 130, y: 55 }, { x: 130, y: 75 }, { x: 145, y: 75 }, { x: 145, y: 95 }, { x: 160, y: 55 }, { x: 160, y: 95 }] }
    ],
    target: "सीता",
    expectedMatch: true
  },
  {
    name: "Complete 'ॐ नमः शिवाय' mantra",
    strokes: [
      { points: [{ x: 50, y: 50 }, { x: 100, y: 50 }, { x: 150, y: 50 }, { x: 200, y: 50 }, { x: 250, y: 50 }] },
      { points: [{ x: 60, y: 60 }, { x: 70, y: 75 }, { x: 80, y: 95 }] },
      { points: [{ x: 110, y: 55 }, { x: 110, y: 95 }, { x: 130, y: 75 }] },
      { points: [{ x: 170, y: 55 }, { x: 170, y: 95 }, { x: 185, y: 75 }] },
      { points: [{ x: 210, y: 55 }, { x: 210, y: 95 }, { x: 235, y: 75 }, { x: 235, y: 95 }] }
    ],
    target: "ॐ नमः शिवाय",
    expectedMatch: true
  }
];

let allPassed = true;
console.log("=== Running Strict Recognizer Test Suite ===");
tests.forEach((t, i) => {
  const result = recognizeAndMatchNaam(t.strokes, t.target);
  const pass = result.isMatch === t.expectedMatch;
  if (!pass) allPassed = false;
  console.log(`${i + 1}. [${pass ? 'PASS' : 'FAIL'}] ${t.name}: isMatch=${result.isMatch} (expected: ${t.expectedMatch}) - reason: ${result.reason || 'None'}`);
});

console.log(`\nOverall Result: ${allPassed ? 'ALL STRICT TESTS PASSED' : 'SOME TESTS FAILED'}`);
