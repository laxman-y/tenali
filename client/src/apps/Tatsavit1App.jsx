import React, { useEffect, useState } from 'react'
import { QuizLayout } from '../components/QuizLayout.jsx'
import { ResultsTable } from '../components/ResultsTable.jsx'

const TATSAVIT1_QUESTIONS = [
  // ───── Page 67-68: Algebraic expressions & walls (Q1–3) ─────────
  {
    section: 'Expressions (Q1)', prompt: '1a. For a number n, write an expression for the sum of the number and 12.',
    options: ['n + 12', '12n', '12 − n', 'n − 12'], correctIndex: 0,
    explanation: 'Solution: n + 12\nStep 1: "Sum" means addition.\nStep 2: Add 12 to the number n, giving n + 12.'
  },
  {
    section: 'Expressions (Q1)', prompt: '1b. Write an expression for twice the number minus four.',
    options: ['2n − 4', '2(n − 4)', '4 − 2n', '4n − 2'], correctIndex: 0,
    explanation: 'Solution: 2n − 4\nStep 1: "Twice the number" is 2n.\nStep 2: "Minus four" subtracts 4, giving 2n − 4.'
  },
  {
    section: 'Expressions (Q1)', prompt: '1c. Write an expression for: the number multiplied by x and then squared.',
    options: ['(nx)²  (i.e. n²x²)', 'nx²', '2nx', 'n + x²'], correctIndex: 0,
    explanation: 'Solution: (nx)² = n²x²\nStep 1: "Multiplied by x" gives nx.\nStep 2: "Then squared" squares the whole expression: (nx)² = n²x².'
  },
  {
    section: 'Expressions (Q1)', prompt: '1d. Write an expression for: the square of the number cubed.',
    options: ['n⁶', 'n⁵', 'n⁸', '3n²'], correctIndex: 0,
    explanation: 'Solution: n⁶\nStep 1: The square of n is n².\nStep 2: Cubing n² gives (n²)³ = n^(2×3) = n⁶.'
  },

  {
    section: 'Odd/Even (Q2)', prompt: '2a. If n is any positive integer, write an expression that is an even number for all n.',
    options: ['2n', 'n + 1', '2n + 1', 'n²'], correctIndex: 0,
    explanation: 'Solution: 2n\nStep 1: Every multiple of 2 is even.\nStep 2: 2n is a multiple of 2 for every integer n, so 2n is always even.'
  },
  {
    section: 'Odd/Even (Q2)', prompt: '2b. Why is 2n + 1 always an odd number when n is an integer?',
    options: ['Because 2n is even, and one more than an even number is odd', 'Because n is always odd', 'Because 2n is always positive', 'Because 1 is the smallest odd number'], correctIndex: 0,
    explanation: 'Solution: 2n is even; adding 1 to any even number gives an odd number.\nStep 1: 2n is a multiple of 2, so it is even.\nStep 2: An even number + 1 is odd, so 2n + 1 is odd.'
  },
  {
    section: 'Odd/Even (Q2)', prompt: '2c. Every positive odd number p can be written p = 2n + 1. Write an expression, in terms of n, for the next largest odd number after p.',
    options: ['2n + 3', '2n + 2', '2n', '2n − 1'], correctIndex: 0,
    explanation: 'Solution: 2n + 3\nStep 1: Consecutive odd numbers differ by 2.\nStep 2: So the next odd number after p = 2n + 1 is (2n + 1) + 2 = 2n + 3.'
  },
  {
    section: 'Odd/Even (Q2)', prompt: '2d. Show that any two consecutive odd numbers always add up to an even number. What is (2n + 1) + (2n + 3)?',
    options: ['4n + 4 = 4(n + 1), which is even', '4n + 3, which is odd', '2n + 4, which could be odd', '4n + 2, which is even but not always'], correctIndex: 0,
    explanation: 'Solution: 4n + 4 = 4(n + 1)\nStep 1: Add the two consecutive odd numbers: (2n + 1) + (2n + 3) = 4n + 4.\nStep 2: Factor: 4n + 4 = 4(n + 1), which is a multiple of 4, hence a multiple of 2, hence even.'
  },

  {
    section: 'Brick walls (Q3)', prompt: '3a. In a three-brick wall where each brick is the sum of the two beneath it, the bottom row is p, q, r and the middle row is p+q, q+r. What is the expression on the top brick?',
    options: ['p + 2q + r', 'p + q + r', '2p + q + r', 'p + q + 2r'], correctIndex: 0,
    explanation: 'Solution: p + 2q + r\nStep 1: The top brick = (middle-left) + (middle-right).\nStep 2: (p + q) + (q + r) = p + 2q + r.'
  },
  {
    section: 'Brick walls (Q3)', prompt: '3b. In the next wall the middle row shows 3r+6q and 2q−3r, and the bottom row shows ?, 2q, −3r. What is the top brick?',
    options: ['8q', '8q + 6r', '8q − 6r', '6q − 3r'], correctIndex: 0,
    explanation: 'Solution: Top brick = 8q\nStep 1: Top = (3r + 6q) + (2q − 3r).\nStep 2: Combine: 3r − 3r + 6q + 2q = 0 + 8q = 8q.'
  },
  {
    section: 'Brick walls (Q3)', prompt: '3c. A six-brick wall has bottom bricks 2h, j, 2k, where h, j, k are integers. Why does the top brick always contain an even number?',
    options: ['Top = 2(h + j + k), which is a multiple of 2', 'Top = h + j + k, which is always even', 'Top = 2hjk, which is always even', 'Top = 2h + j + 2k, which is always even'], correctIndex: 0,
    explanation: 'Solution: Top = 2h + 2j + 2k = 2(h + j + k), always even\nStep 1: Middle bricks are (2h + j) and (j + 2k).\nStep 2: Top = (2h + j) + (j + 2k) = 2h + 2j + 2k.\nStep 3: Factor: 2(h + j + k), which is a multiple of 2, hence always even.'
  },

  // ───── Page 68-69: Simplification and indices (Q4–17) ─────────
  {
    section: 'Simplify (Q4)', prompt: '4a. Simplify 9xy + 3x + 6xy − 2x.',
    options: ['15xy + x', '15xy − x', '15xy + 5x', '18xy + x'], correctIndex: 0,
    explanation: 'Solution: 15xy + x\nStep 1: Group like terms: (9xy + 6xy) + (3x − 2x).\nStep 2: 15xy + x.'
  },
  {
    section: 'Simplify (Q4)', prompt: '4b. Simplify 6xy − xy + 3y.',
    options: ['5xy + 3y', '5xy − 3y', '5xy + 3xy', '6xy + 3y'], correctIndex: 0,
    explanation: 'Solution: 5xy + 3y\nStep 1: 6xy − xy = 5xy.\nStep 2: Add the +3y term: 5xy + 3y.'
  },

  {
    section: 'Indices (Q5)', prompt: '5a. Simplify a³b⁴ ÷ (ab³).',
    options: ['a²b', 'a²b³', 'a⁴b', 'ab'], correctIndex: 0,
    explanation: 'Solution: a²b\nStep 1: Subtract indices for a: 3 − 1 = 2.\nStep 2: Subtract indices for b: 4 − 3 = 1.\nStep 3: Result: a²b.'
  },
  {
    section: 'Indices (Q5)', prompt: '5b. Simplify 2(x³)².',
    options: ['2x⁶', '2x⁵', '4x⁶', '2x⁹'], correctIndex: 0,
    explanation: 'Solution: 2x⁶\nStep 1: (x³)² = x^(3×2) = x⁶.\nStep 2: Multiply by 2: 2x⁶.'
  },
  {
    section: 'Indices (Q5)', prompt: '5c. Simplify 3x × 2x³y².',
    options: ['6x⁴y²', '6x³y²', '5x⁴y²', '6x⁴y³'], correctIndex: 0,
    explanation: 'Solution: 6x⁴y²\nStep 1: Multiply coefficients: 3 × 2 = 6.\nStep 2: Add x indices: 1 + 3 = 4.\nStep 3: y² stays: 6x⁴y².'
  },
  {
    section: 'Indices (Q5)', prompt: '5d. Simplify (4ax²)⁰.',
    options: ['1', '0', '4ax²', '4'], correctIndex: 0,
    explanation: 'Solution: 1\nStep 1: Anything (except 0) raised to the power 0 equals 1.\nStep 2: So (4ax²)⁰ = 1.'
  },
  {
    section: 'Indices (Q5)', prompt: '5e. Simplify 4x²y × x³y².',
    options: ['4x⁵y³', '4x⁶y²', '4x⁵y²', '5x⁵y³'], correctIndex: 0,
    explanation: 'Solution: 4x⁵y³\nStep 1: Coefficient: 4 × 1 = 4.\nStep 2: x: 2 + 3 = 5; y: 1 + 2 = 3.\nStep 3: Result: 4x⁵y³.'
  },
  {
    section: 'Indices (Q5)', prompt: '5f. Simplify 3x⁻⁴ × 5x⁶.',
    options: ['15x²', '15x⁻²⁴', '8x²', '15x¹⁰'], correctIndex: 0,
    explanation: 'Solution: 15x²\nStep 1: Multiply coefficients: 3 × 5 = 15.\nStep 2: Add indices: −4 + 6 = 2.\nStep 3: Result: 15x².'
  },
  {
    section: 'Indices (Q5)', prompt: '5g. Simplify (3x⁵ ÷ 7x⁴) ÷ (6x⁻⁶ ÷ 14x⁻⁴).',
    options: ['x³', 'x²', 'x⁵', '2x³'], correctIndex: 0,
    explanation: 'Solution: x³\nStep 1: Rewrite as (3x⁵/7x⁴) × (14x⁻⁴/6x⁻⁶).\nStep 2: Coefficients: (3×14)/(7×6) = 42/42 = 1.\nStep 3: Indices of x: 5 − 4 + (−4) − (−6) = 3.\nStep 4: Result: x³.'
  },
  {
    section: 'Indices (Q5)', prompt: '5h. Simplify (4x⁻⁵)².',
    options: ['16x⁻¹⁰ (= 16/x¹⁰)', '8x⁻¹⁰', '16x⁻²⁵', '4x⁻¹⁰'], correctIndex: 0,
    explanation: 'Solution: 16x⁻¹⁰ or 16/x¹⁰\nStep 1: Square the coefficient: 4² = 16.\nStep 2: Multiply indices: (−5) × 2 = −10.\nStep 3: Result: 16x⁻¹⁰ = 16/x¹⁰.'
  },
  {
    section: 'Indices (Q5)', prompt: '5i. Simplify (3x ÷ 4y)³.',
    options: ['27x³/(64y³)', '9x³/(16y³)', '27x/(64y)', '27x³/64y'], correctIndex: 0,
    explanation: 'Solution: 27x³/(64y³)\nStep 1: Cube numerator: (3x)³ = 27x³.\nStep 2: Cube denominator: (4y)³ = 64y³.\nStep 3: Result: 27x³/(64y³).'
  },
  {
    section: 'Indices (Q5)', prompt: '5j. Simplify (4x¹²y⁻³)/(12x⁻⁷y⁹), with positive indices.',
    options: ['x¹⁹/(3y¹²)', 'x⁵/(3y¹²)', 'x¹⁹/(3y⁶)', '3x¹⁹/y¹²'], correctIndex: 0,
    explanation: 'Solution: x¹⁹/(3y¹²)\nStep 1: Coefficient: 4/12 = 1/3.\nStep 2: x: 12 − (−7) = 19.\nStep 3: y: −3 − 9 = −12 → y⁻¹² = 1/y¹².\nStep 4: Combine: x¹⁹/(3y¹²).'
  },
  {
    section: 'Indices (Q5)', prompt: '5k. Simplify (14p⁵q⁻⁴)/(30p⁴q⁴) × (5pq⁻⁷)/(2p⁻⁴q⁵).',
    options: ['7p⁶/(6q²⁰)', '6p⁶/(7q²⁰)', '7p⁵/(6q²⁰)', '7p⁶q⁻²⁰'], correctIndex: 0,
    explanation: 'Solution: 7p⁶/(6q²⁰)\nStep 1: Coefficients: (14 × 5)/(30 × 2) = 70/60 = 7/6.\nStep 2: p: 5 − 4 + 1 − (−4) = 6.\nStep 3: q: −4 − 4 + (−7) − 5 = −20.\nStep 4: Combine: (7/6) p⁶ q⁻²⁰ = 7p⁶/(6q²⁰).'
  },

  {
    section: 'Simplify (Q6)', prompt: '6. Simplify 7x³y² × (2x)³ − (4x³y)² − 4xy² × 10x⁵.',
    options: ['0', '16x⁶y²', '40x⁶y²', '56x⁶y²'], correctIndex: 0,
    explanation: 'Solution: 0\nStep 1: 7x³y² × (2x)³ = 7x³y² × 8x³ = 56x⁶y².\nStep 2: (4x³y)² = 16x⁶y².\nStep 3: 4xy² × 10x⁵ = 40x⁶y².\nStep 4: 56x⁶y² − 16x⁶y² − 40x⁶y² = 0.'
  },

  {
    section: 'Substitution (Q7)', prompt: '7a. Find the value of (x + 5) − (x − 5) when x = 1.',
    options: ['10', '12', '6', '2'], correctIndex: 0,
    explanation: 'Solution: 10\nStep 1: Simplify the expression first: (x + 5) − (x − 5) = x + 5 − x + 5 = 10.\nStep 2: The value is 10 for any x, including x = 1.'
  },
  {
    section: 'Substitution (Q7)', prompt: '7b. Find the value of (x + 5) − (x − 5) when x = 0.',
    options: ['10', '5', '−10', '0'], correctIndex: 0,
    explanation: 'Solution: 10\nStep 1: The simplified form is 10 for all x.\nStep 2: The x terms cancel, so the answer is 10.'
  },
  {
    section: 'Substitution (Q7)', prompt: '7c. Find the value of (x + 5) − (x − 5) when x = 5.',
    options: ['10', '20', '15', '5'], correctIndex: 0,
    explanation: 'Solution: 10\nStep 1: The simplified expression is 10 regardless of x.\nStep 2: For x = 5, still 10.'
  },

  {
    section: 'Substitution (Q8)', prompt: '8. If s = ½(u + v)t with u = 2/5, v = 4½ and t = 3, find s as a simplified fraction.',
    options: ['147/20', '49/20', '29/10', '147/10'], correctIndex: 0,
    explanation: 'Solution: 147/20\nStep 1: u + v = 2/5 + 9/2 = 4/10 + 45/10 = 49/10.\nStep 2: Multiply by t = 3: (49/10) × 3 = 147/10.\nStep 3: Multiply by ½: (147/10) × (1/2) = 147/20.'
  },

  {
    section: 'Expand (Q9)', prompt: '9a. Expand and simplify 5(x − 2) + 3(x + 2).',
    options: ['8x − 4', '8x + 4', '2x − 4', '8x + 12'], correctIndex: 0,
    explanation: 'Solution: 8x − 4\nStep 1: Expand: 5x − 10 + 3x + 6.\nStep 2: Combine like terms: (5x + 3x) + (−10 + 6) = 8x − 4.'
  },
  {
    section: 'Expand (Q9)', prompt: '9b. Expand and simplify 5x(x + 7y) − 2x(2x − y).',
    options: ['x² + 37xy', 'x² + 33xy', '5x² + 33xy', 'x² + 35xy'], correctIndex: 0,
    explanation: 'Solution: x² + 37xy\nStep 1: 5x(x + 7y) = 5x² + 35xy.\nStep 2: 2x(2x − y) = 4x² − 2xy.\nStep 3: Subtract: (5x² − 4x²) + (35xy − (−2xy)) = x² + 37xy.'
  },

  {
    section: 'Expand (Q10)', prompt: '10a. Expand and simplify m(m − n) − n(n − m).',
    options: ['m² − n²', 'm² + n²', 'm² − 2mn − n²', 'm² − n² − 2mn'], correctIndex: 0,
    explanation: 'Solution: m² − n²\nStep 1: m(m − n) = m² − mn.\nStep 2: n(n − m) = n² − mn, so −n(n − m) = −n² + mn.\nStep 3: Combine: m² − mn − n² + mn = m² − n².'
  },
  {
    section: 'Expand (Q10)', prompt: '10b. Expand and simplify x(y − z) + y(z − x) + z(x − y).',
    options: ['0', 'xyz', '2xyz', 'x² + y² + z²'], correctIndex: 0,
    explanation: 'Solution: 0\nStep 1: Expand each term: xy − xz + yz − xy + xz − yz.\nStep 2: All terms cancel in pairs: xy − xy = 0, −xz + xz = 0, yz − yz = 0.\nStep 3: Total = 0.'
  },

  {
    section: 'Positive indices (Q11)', prompt: '11a. Simplify x⁵ × x⁻² (positive indices only).',
    options: ['x³', 'x⁻¹⁰', 'x⁷', '1/x³'], correctIndex: 0,
    explanation: 'Solution: x³\nStep 1: Add indices: 5 + (−2) = 3.\nStep 2: Result: x³.'
  },
  {
    section: 'Positive indices (Q11)', prompt: '11b. Simplify 8x²/(2x⁴) (positive indices only).',
    options: ['4/x²', '4x²', '4x⁶', '4x⁻²'], correctIndex: 0,
    explanation: 'Solution: 4/x²\nStep 1: Coefficient: 8/2 = 4.\nStep 2: Index: x² ÷ x⁴ = x^(2−4) = x⁻².\nStep 3: Write with a positive index: 4/x².'
  },
  {
    section: 'Positive indices (Q11)', prompt: '11c. Simplify (2x⁻²)⁻³ (positive indices only).',
    options: ['x⁶/8', '8x⁶', '8/x⁶', 'x⁶/6'], correctIndex: 0,
    explanation: 'Solution: x⁶/8\nStep 1: Apply the −3 to each factor: 2⁻³ × (x⁻²)⁻³.\nStep 2: 2⁻³ = 1/8; (x⁻²)⁻³ = x⁶.\nStep 3: Combine: x⁶/8.'
  },

  {
    section: 'Index equations (Q12)', prompt: '12a. Find x such that 4^x = 64.',
    options: ['x = 3', 'x = 4', 'x = 2', 'x = 16'], correctIndex: 0,
    explanation: 'Solution: x = 3\nStep 1: Write 64 as a power of 4: 64 = 4³.\nStep 2: Equate indices: x = 3.'
  },
  {
    section: 'Index equations (Q12)', prompt: '12b. Find x such that 3^x − 5 = 22.',
    options: ['x = 3', 'x = 9', 'x = 2', 'x = 4'], correctIndex: 0,
    explanation: 'Solution: x = 3\nStep 1: Add 5: 3^x = 27.\nStep 2: 27 = 3³, so x = 3.'
  },
  {
    section: 'Index equations (Q12)', prompt: '12c. Find p such that 4 × 6^p = 864.',
    options: ['p = 3', 'p = 216', 'p = 2', 'p = 4'], correctIndex: 0,
    explanation: 'Solution: p = 3\nStep 1: Divide by 4: 6^p = 216.\nStep 2: 216 = 6³, so p = 3.'
  },

  {
    section: 'Substitution (Q13)', prompt: '13. If a = 3, b = 2, c = −1, find the value of a^b − c^a + b^a.',
    options: ['18', '16', '20', '0'], correctIndex: 0,
    explanation: 'Solution: 18\nStep 1: a^b = 3² = 9.\nStep 2: c^a = (−1)³ = −1.\nStep 3: b^a = 2³ = 8.\nStep 4: 9 − (−1) + 8 = 9 + 1 + 8 = 18.'
  },

  {
    section: 'Fractional indices (Q14)', prompt: '14a. Simplify 3x^(1/2) × 5x^(1/2).',
    options: ['15x', '15x^(1/4)', '8x', '15√x'], correctIndex: 0,
    explanation: 'Solution: 15x\nStep 1: Coefficients: 3 × 5 = 15.\nStep 2: Indices: 1/2 + 1/2 = 1.\nStep 3: Result: 15x.'
  },
  {
    section: 'Fractional indices (Q14)', prompt: '14b. Simplify (81y⁶)^(1/2).',
    options: ['9y³', '9y⁶', '81y³', '9y²'], correctIndex: 0,
    explanation: 'Solution: 9y³\nStep 1: √81 = 9.\nStep 2: (y⁶)^(1/2) = y³.\nStep 3: Result: 9y³.'
  },
  {
    section: 'Fractional indices (Q14)', prompt: '14c. Simplify (64x³)^(1/3).',
    options: ['4x', '4x³', '8x', '4x²'], correctIndex: 0,
    explanation: 'Solution: 4x\nStep 1: ³√64 = 4.\nStep 2: (x³)^(1/3) = x.\nStep 3: Result: 4x.'
  },

  {
    section: 'Find x (Q15)', prompt: '15a. Find x such that (1/2)^x = 8.',
    options: ['x = −3', 'x = 3', 'x = 4', 'x = −4'], correctIndex: 0,
    explanation: 'Solution: x = −3\nStep 1: (1/2)^x = 2^(−x).\nStep 2: 8 = 2³, so 2^(−x) = 2³.\nStep 3: −x = 3 → x = −3.'
  },
  {
    section: 'Find x (Q15)', prompt: '15b. Find x such that 3^x = 1/27.',
    options: ['x = −3', 'x = 3', 'x = 9', 'x = −9'], correctIndex: 0,
    explanation: 'Solution: x = −3\nStep 1: 1/27 = 3⁻³.\nStep 2: Equate indices: x = −3.'
  },
  {
    section: 'Find x (Q15)', prompt: '15c. Find x such that 125^x = 5.',
    options: ['x = 1/3', 'x = 1/5', 'x = 5', 'x = 3'], correctIndex: 0,
    explanation: 'Solution: x = 1/3\nStep 1: 125 = 5³, so (5³)^x = 5.\nStep 2: 5^(3x) = 5¹ ⇒ 3x = 1.\nStep 3: x = 1/3.'
  },
  {
    section: 'Find x (Q15)', prompt: '15d. Find x such that 125^x = 1/5.',
    options: ['x = −1/3', 'x = −1/5', 'x = −5', 'x = −3'], correctIndex: 0,
    explanation: 'Solution: x = −1/3\nStep 1: 125 = 5³, 1/5 = 5⁻¹.\nStep 2: 5^(3x) = 5⁻¹ ⇒ 3x = −1.\nStep 3: x = −1/3.'
  },

  {
    section: 'In terms of p and q (Q16)', prompt: '16a. If p = 2^x and q = 2^y, write 2^(x+y) in terms of p and q.',
    options: ['pq', 'p + q', 'p/q', 'p − q'], correctIndex: 0,
    explanation: 'Solution: pq\nStep 1: 2^(x + y) = 2^x × 2^y.\nStep 2: Substitute: p × q = pq.'
  },
  {
    section: 'In terms of p and q (Q16)', prompt: '16b. Write 2^(x+y−2) in terms of p and q.',
    options: ['pq/4', 'pq − 2', 'pq/2', '4pq'], correctIndex: 0,
    explanation: 'Solution: pq/4\nStep 1: 2^(x + y − 2) = 2^x × 2^y × 2⁻².\nStep 2: 2⁻² = 1/4.\nStep 3: Combine: pq × (1/4) = pq/4.'
  },
  {
    section: 'In terms of p and q (Q16)', prompt: '16c. Write 2^(3x) in terms of p (and q if needed).',
    options: ['p³', '3p', '3p²', '2p³'], correctIndex: 0,
    explanation: 'Solution: p³\nStep 1: 2^(3x) = (2^x)³.\nStep 2: Substitute p = 2^x: p³.'
  },

  {
    section: 'Find n (Q17)', prompt: '17a. Find n such that n⁻¹ = 2⁻².',
    options: ['n = 4', 'n = 2', 'n = 1/4', 'n = −2'], correctIndex: 0,
    explanation: 'Solution: n = 4\nStep 1: 2⁻² = 1/4.\nStep 2: n⁻¹ = 1/n, so 1/n = 1/4.\nStep 3: n = 4.'
  },
  {
    section: 'Find n (Q17)', prompt: '17b. Find n such that 4^n = (⁴√32)³.',
    options: ['n = 15/8', 'n = 15/4', 'n = 5/4', 'n = 3'], correctIndex: 0,
    explanation: 'Solution: n = 15/8\nStep 1: ⁴√32 = 32^(1/4) = (2⁵)^(1/4) = 2^(5/4).\nStep 2: Cube it: (2^(5/4))³ = 2^(15/4).\nStep 3: 4^n = 2^(2n), so 2n = 15/4 ⇒ n = 15/8.'
  },

  // ───── Pages 105-106: Geometry (Q1–14) ─────────
  {
    section: 'Constructions (Q1)', prompt: '1a. Which tools are used to construct a line segment AB of a given length?',
    options: ['Ruler and compasses', 'Protractor only', 'Set square', 'Calculator'], correctIndex: 0,
    explanation: 'Solution: Ruler and compasses\nStep 1: Measure the given length with the ruler.\nStep 2: Use compasses set to that length to transfer the distance and mark B from A.'
  },
  {
    section: 'Constructions (Q1)', prompt: '1b. Which instrument is used to measure and draw an angle of exactly 75°?',
    options: ['Protractor', 'Ruler', 'Compass', 'Set square'], correctIndex: 0,
    explanation: 'Solution: Protractor\nStep 1: A protractor measures angles directly in degrees.\nStep 2: Align the base with the existing line, mark 75°, draw the ray.'
  },
  {
    section: 'Constructions (Q1)', prompt: '1c. An angle of 125° is best described as which type?',
    options: ['Obtuse', 'Acute', 'Right', 'Reflex'], correctIndex: 0,
    explanation: 'Solution: Obtuse\nStep 1: Acute angles are < 90°, right = 90°, obtuse is between 90° and 180°, reflex > 180°.\nStep 2: 125° is between 90° and 180°, so it is obtuse.'
  },

  {
    section: 'Find x (Q2)', prompt: '2a. Two parallel lines AB and CD are cut by a transversal; the angle on AB is 81°. What is the matching alternate angle x on CD?',
    options: ['81°', '99°', '180°', '90°'], correctIndex: 0,
    explanation: 'Solution: x = 81°\nStep 1: Alternate angles formed by a transversal cutting two parallel lines are equal.\nStep 2: Therefore x equals the 81° angle on AB.'
  },
  {
    section: 'Find x (Q2)', prompt: '2b. Two lines MN and PQ are parallel; the angle at S is 65° and x is the corresponding angle at T. Find x.',
    options: ['65°', '115°', '180°', '90°'], correctIndex: 0,
    explanation: 'Solution: x = 65°\nStep 1: Corresponding angles on parallel lines cut by a transversal are equal.\nStep 2: x = 65°.'
  },
  {
    section: 'Find x (Q2)', prompt: '2c. Triangle ABC has angle A = 30° and AB = AC. If x is the exterior angle at C (along BCD extended), find x.',
    options: ['105°', '75°', '150°', '30°'], correctIndex: 0,
    explanation: 'Solution: x = 105°\nStep 1: Isosceles triangle with AB = AC ⇒ base angles equal: (180 − 30)/2 = 75° each.\nStep 2: Exterior angle at C = 180° − 75° = 105°.\nStep 3: Alternative check: exterior = sum of remote interior = 30° + 75° = 105°.'
  },
  {
    section: 'Find x (Q2)', prompt: '2d. In a parallelogram with adjacent angles x and 112°, find x.',
    options: ['68°', '112°', '180°', '90°'], correctIndex: 0,
    explanation: 'Solution: x = 68°\nStep 1: Adjacent (co-interior) angles in a parallelogram sum to 180°.\nStep 2: x = 180° − 112° = 68°.'
  },
  {
    section: 'Find x (Q2)', prompt: '2e. A quadrilateral has two right angles, a 110° angle, and angle x. Find x.',
    options: ['70°', '110°', '90°', '80°'], correctIndex: 0,
    explanation: 'Solution: x = 70°\nStep 1: Interior angles of a quadrilateral sum to 360°.\nStep 2: x = 360° − 90° − 90° − 110° = 70°.'
  },
  {
    section: 'Find x (Q2)', prompt: '2f. Triangle PQR is isosceles with PR = QR; MN is drawn through R parallel to PQ. If angle PQR = 35°, the angle x between line RM and line RP equals what?',
    options: ['35°', '110°', '145°', '70°'], correctIndex: 0,
    explanation: 'Solution: x = 35°\nStep 1: Isosceles ⇒ angle RPQ = angle RQP = 35°.\nStep 2: MN ∥ PQ, so angle MRP = angle RPQ = 35° (alternate angles).'
  },

  {
    section: 'Right triangle (Q3)', prompt: '3a. In a right-angled triangle, the two non-right angles are x and y. Why does x + y = 90°?',
    options: ['Angles in a triangle sum to 180°; 180° − 90° = 90°', 'Angles on a straight line sum to 180°', 'The triangle is isosceles', 'Pythagoras theorem says so'], correctIndex: 0,
    explanation: 'Solution: Angles in a triangle sum to 180°\nStep 1: Triangle angle sum is 180°.\nStep 2: The third angle is 90°, so x + y = 180° − 90° = 90°.'
  },
  {
    section: 'Right triangle (Q3)', prompt: '3b. Find y if x = 37° in that right-angled triangle.',
    options: ['53°', '43°', '37°', '63°'], correctIndex: 0,
    explanation: 'Solution: y = 53°\nStep 1: x + y = 90°.\nStep 2: y = 90° − 37° = 53°.'
  },

  {
    section: 'Shapes (Q4)', prompt: '4. In a parallelogram with an angle of 110° at the top, what is angle a (the adjacent bottom-left angle)?',
    options: ['70°', '110°', '80°', '180°'], correctIndex: 0,
    explanation: 'Solution: a = 70°\nStep 1: Adjacent angles of a parallelogram are co-interior angles between parallel sides.\nStep 2: They sum to 180°: a = 180° − 110° = 70°.'
  },
  {
    section: 'Shapes (Q4)', prompt: '4. In the same parallelogram, what is angle b (the angle opposite 110°)?',
    options: ['110°', '70°', '180°', '90°'], correctIndex: 0,
    explanation: 'Solution: b = 110°\nStep 1: Opposite angles of a parallelogram are equal.\nStep 2: b = 110°.'
  },
  {
    section: 'Shapes (Q4)', prompt: '4. In a kite with angles 100°, 60°, c and a fourth angle equal to 100° by symmetry, find c.',
    options: ['100°', '60°', '120°', '200°'], correctIndex: 0,
    explanation: 'Solution: c = 100°\nStep 1: Kite angle-sum = 360°.\nStep 2: The two angles either side of the axis of symmetry are equal (both 100° here).\nStep 3: c + 60° + 100° + 100° = 360° ⇒ c = 100°.'
  },

  {
    section: 'Polygons (Q5)', prompt: '5. What is the sum of the interior angles of a regular hexagon?',
    options: ['720°', '540°', '900°', '360°'], correctIndex: 0,
    explanation: 'Solution: 720°\nStep 1: Use (n − 2) × 180° with n = 6.\nStep 2: (6 − 2) × 180° = 4 × 180° = 720°.'
  },

  {
    section: 'Prove (Q6)', prompt: '6. In the figure of Q6, if angle MQN = 15°, what is angle NMQ (given angle NMQ = 3 × angle MQN)?',
    options: ['45°', '30°', '60°', '75°'], correctIndex: 0,
    explanation: 'Solution: 45°\nStep 1: Given angle NMQ = 3 × angle MQN.\nStep 2: 3 × 15° = 45°.'
  },

  {
    section: 'Regular 15-gon (Q7)', prompt: '7a. What is the sum of the exterior angles of a convex regular polygon with 15 sides?',
    options: ['360°', '180°', '540°', '720°'], correctIndex: 0,
    explanation: 'Solution: 360°\nStep 1: The sum of exterior angles of any convex polygon is 360°.\nStep 2: This is independent of the number of sides.'
  },
  {
    section: 'Regular 15-gon (Q7)', prompt: '7b. What is the size of each exterior angle in the regular 15-gon?',
    options: ['24°', '15°', '36°', '45°'], correctIndex: 0,
    explanation: 'Solution: 24°\nStep 1: Regular polygons have equal exterior angles: 360°/n.\nStep 2: 360°/15 = 24°.'
  },
  {
    section: 'Regular 15-gon (Q7)', prompt: '7c. What is the size of each interior angle of the regular 15-gon?',
    options: ['156°', '150°', '160°', '144°'], correctIndex: 0,
    explanation: 'Solution: 156°\nStep 1: Interior + exterior = 180°.\nStep 2: 180° − 24° = 156°.'
  },

  {
    section: 'Explain x = y (Q8)', prompt: '8a. A triangle with base angles x/2, x/2 and an exterior angle y at the apex (on the extended side). Why is x = y?',
    options: ['Exterior angle of a triangle equals the sum of the two opposite interior angles', 'Alternate angles are equal', 'Isosceles triangle has equal base angles', 'Angles on a straight line sum to 180°'], correctIndex: 0,
    explanation: 'Solution: Exterior angle theorem\nStep 1: The exterior angle y equals the sum of the two remote interior angles.\nStep 2: Sum = x/2 + x/2 = x, so y = x.'
  },
  {
    section: 'Explain x = y (Q8)', prompt: '8b. Two parallel lines are cut by two transversals; angle y is on one line and x is on the other at corresponding positions. Why is x = y?',
    options: ['Corresponding angles between parallel lines are equal', 'Vertically opposite angles are equal', 'Alternate angles are equal', 'Angles on a straight line sum to 180°'], correctIndex: 0,
    explanation: 'Solution: Corresponding angles\nStep 1: When parallel lines are cut by a transversal, corresponding angles are equal.\nStep 2: Hence x = y.'
  },

  {
    section: 'Triangle inequality (Q9)', prompt: '9. Is a triangle with sides 4.5 cm, 5 cm and 7 cm possible to construct?',
    options: ['Yes — the sum of any two sides exceeds the third (triangle inequality)', 'No — the sides are incompatible', 'Only if it is right-angled', 'Only isosceles triangles are constructible'], correctIndex: 0,
    explanation: 'Solution: Yes\nStep 1: 4.5 + 5 = 9.5 > 7 ✓\nStep 2: 5 + 7 = 12 > 4.5 ✓\nStep 3: 4.5 + 7 = 11.5 > 5 ✓\nStep 4: All three conditions hold, so the triangle is possible.'
  },

  {
    section: 'Triangle centres (Q10)', prompt: '10a. Is a triangle with sides 5, 7 and 9 cm possible?',
    options: ['Yes — all side-pair sums exceed the third side', 'No', 'Only if right-angled', 'Only with compass'], correctIndex: 0,
    explanation: 'Solution: Yes\nStep 1: 5 + 7 = 12 > 9 ✓.\nStep 2: 5 + 9 = 14 > 7 ✓.\nStep 3: 7 + 9 = 16 > 5 ✓.'
  },
  {
    section: 'Triangle centres (Q10)', prompt: '10b. The three perpendicular bisectors of the sides of any triangle meet at which point?',
    options: ['Circumcentre', 'Incentre', 'Centroid', 'Orthocentre'], correctIndex: 0,
    explanation: 'Solution: Circumcentre\nStep 1: The perpendicular bisector of a segment is the locus of points equidistant from its endpoints.\nStep 2: Their common intersection is equidistant from all vertices — this is the circumcentre.'
  },
  {
    section: 'Triangle centres (Q10)', prompt: '10c. A circle that passes through all three vertices of a triangle is called…',
    options: ['The circumcircle', 'The incircle', 'The inner circle', 'The midcircle'], correctIndex: 0,
    explanation: 'Solution: Circumcircle\nStep 1: Its centre is the circumcentre (intersection of perpendicular bisectors).\nStep 2: Its radius is the distance from the circumcentre to any vertex.'
  },
  {
    section: 'Triangle centres (Q10)', prompt: '10d. Does this result about perpendicular bisectors hold for all triangles?',
    options: ['Yes — every triangle has a unique circumcentre', 'Only for right-angled triangles', 'Only for equilateral triangles', 'Only for isosceles triangles'], correctIndex: 0,
    explanation: 'Solution: Yes — every triangle\nStep 1: The perpendicular bisectors of any two sides intersect.\nStep 2: That intersection is equidistant from all three vertices, so the third perpendicular bisector also passes through it.'
  },

  {
    section: 'Polygon from angle sum (Q11)', prompt: '11. The sum of the interior angles of a convex polygon is 5400°. How many sides does it have?',
    options: ['32', '30', '35', '34'], correctIndex: 0,
    explanation: 'Solution: 32\nStep 1: (n − 2) × 180° = 5400°.\nStep 2: n − 2 = 30.\nStep 3: n = 32.'
  },

  {
    section: 'Regular pentagon (Q12)', prompt: '12a. A regular pentagon ABCDE has a diagonal drawn from A to C, forming isosceles triangle ABC. If x is angle BAC (or equivalently BCA), find x.',
    options: ['36°', '72°', '108°', '60°'], correctIndex: 0,
    explanation: 'Solution: x = 36°\nStep 1: Each interior angle of a regular pentagon = (5−2)·180°/5 = 108°, so angle ABC = 108°.\nStep 2: Triangle ABC is isosceles (AB = BC = side of pentagon).\nStep 3: Base angles: (180° − 108°)/2 = 36°.'
  },
  {
    section: 'Regular pentagon (Q12)', prompt: '12b. In the same pentagon with a second diagonal from A to D, what is angle y = angle CAD (between the two diagonals at A)?',
    options: ['36°', '72°', '108°', '60°'], correctIndex: 0,
    explanation: 'Solution: y = 36°\nStep 1: Interior angle at A = 108°. The two diagonals from A split this into angle BAC, angle CAD, angle DAE.\nStep 2: By symmetry each of these three angles is equal.\nStep 3: 108°/3 = 36°.'
  },

  {
    section: 'Two regular polygons (Q13)', prompt: '13. Regular polygon A has 10 sides and exterior angle 3x; regular polygon B has exterior angle (5/3)x. How many sides does polygon B have?',
    options: ['18', '15', '20', '24'], correctIndex: 0,
    explanation: 'Solution: 18\nStep 1: Polygon A exterior angle = 360°/10 = 36°, so 3x = 36° ⇒ x = 12°.\nStep 2: Polygon B exterior angle = (5/3)·12° = 20°.\nStep 3: Number of sides = 360°/20° = 18.'
  },

  {
    section: 'Angle proofs (Q14)', prompt: '14a. Two parallel lines UW and PR, with triangle PVQ between them (V on UW). Which statement about angles UVP and WVQ is correct?',
    options: ['UVP = a and WVQ = c (alternate angles with PQ)', 'UVP = b and WVQ = b', 'UVP = 180° − a and WVQ = 180° − c', 'UVP = c and WVQ = a'], correctIndex: 0,
    explanation: 'Solution: UVP = a, WVQ = c\nStep 1: UW ∥ PR so VP is a transversal; alternate angles ⇒ UVP = angle VPQ = a.\nStep 2: Similarly VQ is a transversal; alternate angles ⇒ WVQ = angle VQP = c.'
  },
  {
    section: 'Angle proofs (Q14)', prompt: '14b. Using UVP = a, angle PVQ = b, WVQ = c and the fact UVW is a straight line, what is a + b + c?',
    options: ['180°', '90°', '360°', 'Depends on the triangle'], correctIndex: 0,
    explanation: 'Solution: 180°\nStep 1: On the straight line UVW: angle UVP + angle PVQ + angle QVW = 180°.\nStep 2: That is a + b + c = 180°, proving the triangle angle sum.'
  },
  {
    section: 'Angle proofs (Q14)', prompt: '14c. In the same figure, write the exterior angle RQV in terms of c.',
    options: ['180° − c', 'c + 90°', '180° + c', 'c'], correctIndex: 0,
    explanation: 'Solution: 180° − c\nStep 1: PQR is a straight line, so angle PQV + angle RQV = 180°.\nStep 2: angle PQV = c, so angle RQV = 180° − c.'
  },
  {
    section: 'Angle proofs (Q14)', prompt: '14d. Which statement expresses the exterior-angle theorem shown by parts (b) and (c)?',
    options: ['The exterior angle of a triangle equals the sum of the two opposite interior angles', 'The exterior angle equals the adjacent interior angle', 'The exterior angle is always > 180°', 'The exterior angle is always a right angle'], correctIndex: 0,
    explanation: 'Solution: Exterior angle = sum of two opposite interior angles\nStep 1: From (b), a + b + c = 180°, so a + b = 180° − c.\nStep 2: From (c), angle RQV = 180° − c.\nStep 3: So angle RQV = a + b.'
  },

  // ───── Pages 142-144: Statistics (Q1–6) ─────────
  {
    section: 'Biscuits data (Q1)', prompt: '1a. Salma personally counts broken biscuits in 40 packets. Is this primary or secondary data?',
    options: ['Primary — she collected it herself', 'Secondary — from another source', 'Both', 'Neither'], correctIndex: 0,
    explanation: 'Solution: Primary data\nStep 1: Data gathered first-hand by the person using it is primary.\nStep 2: Salma is the quality-control inspector collecting the data, so it is primary.'
  },
  {
    section: 'Biscuits data (Q1)', prompt: '1b. Is the number of broken biscuits discrete or continuous?',
    options: ['Discrete — counted in whole numbers', 'Continuous — measured on a scale', 'Categorical', 'Ordinal'], correctIndex: 0,
    explanation: 'Solution: Discrete\nStep 1: You count broken biscuits; there are no fractional values between 2 and 3 biscuits.\nStep 2: Count data is discrete.'
  },
  {
    section: 'Biscuits data (Q1)', prompt: '1c. From the 40-value data set, what is the frequency of packets with 0 broken biscuits?',
    options: ['12', '10', '14', '8'], correctIndex: 0,
    explanation: 'Solution: 12\nStep 1: Tally the 40 data values for "0": row-by-row counts give 4 + 1 + 6 + 1 = 12.\nStep 2: Total frequency check: 12 + 10 + 11 + 6 + 1 = 40 ✓.'
  },
  {
    section: 'Biscuits data (Q1)', prompt: '1d. Which chart is most appropriate for displaying the broken-biscuit counts?',
    options: ['Bar chart (discrete categories)', 'Line graph (trend of a continuous variable)', 'Scatter plot', 'Pictogram without a key'], correctIndex: 0,
    explanation: 'Solution: Bar chart\nStep 1: Discrete data with distinct categories (0, 1, 2, 3, 4 broken biscuits) is best shown with separated bars.\nStep 2: Line graphs suit continuous trends, not category frequencies.'
  },

  {
    section: 'Airports (Q2)', prompt: '2a. Which London airport handled the most aircraft movements (Gatwick 23,696; Heathrow 39,660; London City 6,380; Luton 10,697; Stansted 15,397)?',
    options: ['Heathrow', 'Gatwick', 'Stansted', 'Luton'], correctIndex: 0,
    explanation: 'Solution: Heathrow (39,660)\nStep 1: Compare totals: 39,660 is the largest.\nStep 2: Heathrow therefore handled the most movements.'
  },
  {
    section: 'Airports (Q2)', prompt: '2b. How many aircraft moved through Stansted Airport?',
    options: ['15,397', '10,697', '15,937', '6,380'], correctIndex: 0,
    explanation: 'Solution: 15,397\nStep 1: Read the Stansted column directly from the table.'
  },
  {
    section: 'Airports (Q2)', prompt: '2c. Rounded to the nearest thousand, Gatwick\'s 23,696 flights becomes…',
    options: ['24,000', '23,000', '23,700', '25,000'], correctIndex: 0,
    explanation: 'Solution: 24,000\nStep 1: The hundreds digit is 6, so round the thousands up.\nStep 2: 23,696 → 24,000.'
  },
  {
    section: 'Airports (Q2)', prompt: '2c. Rounded to the nearest thousand, Heathrow\'s 39,660 flights becomes…',
    options: ['40,000', '39,000', '39,700', '30,000'], correctIndex: 0,
    explanation: 'Solution: 40,000\nStep 1: Hundreds digit is 6, round the thousands up.\nStep 2: 39,660 → 40,000.'
  },
  {
    section: 'Airports (Q2)', prompt: '2c. Rounded to the nearest thousand, London City\'s 6,380 flights becomes…',
    options: ['6,000', '7,000', '6,400', '6,500'], correctIndex: 0,
    explanation: 'Solution: 6,000\nStep 1: Hundreds digit is 3 (<5), so round down.\nStep 2: 6,380 → 6,000.'
  },
  {
    section: 'Airports (Q2)', prompt: '2d. Pictograms are most useful when values are…',
    options: ['Rounded, so each symbol represents a fixed quantity', 'Exact to several decimal places', 'Percentages of a whole', 'Continuous measurements'], correctIndex: 0,
    explanation: 'Solution: Rounded\nStep 1: Symbols represent a fixed number of items (e.g. 1 symbol = 1000 flights).\nStep 2: Rounding makes whole or half symbols natural, avoiding awkward fractions.'
  },

  {
    section: 'Districts (Q3)', prompt: '3a. District A has 6000 people; 83% own a mobile phone. How many mobile-phone owners?',
    options: ['4980', '5000', '4800', '4000'], correctIndex: 0,
    explanation: 'Solution: 4980\nStep 1: 83% of 6000 = 0.83 × 6000.\nStep 2: 0.83 × 6000 = 4980.'
  },
  {
    section: 'Districts (Q3)', prompt: '3b. Laptop-ownership rates are A 45%, B 32%, C 61%, D 22%. Which district most likely hosts the University of Technology and software firms?',
    options: ['District C (highest laptop ownership)', 'District A', 'District B', 'District D'], correctIndex: 0,
    explanation: 'Solution: District C\nStep 1: Tech workers and students tend to own laptops.\nStep 2: District C has the highest laptop ownership (61%), suggesting a tech-heavy area.'
  },
  {
    section: 'Districts (Q3)', prompt: '3c. A dual bar chart is best for…',
    options: ['Comparing two related measurements across the same groups', 'Showing data over time', 'Displaying pie-chart proportions', 'Continuous trend lines'], correctIndex: 0,
    explanation: 'Solution: Comparing two measurements across groups\nStep 1: Two bars side-by-side per category let you compare laptop and mobile ownership in each district at a glance.'
  },

  {
    section: 'Pie chart (Q4)', prompt: '4a. A pie chart of sports played by 200 students shows data of what type?',
    options: ['Categorical (qualitative) data', 'Numerical continuous', 'Numerical discrete', 'Ordinal time data'], correctIndex: 0,
    explanation: 'Solution: Categorical data\nStep 1: The sports (baseball, cricket, football, netball, hockey) are categories, not numbers.'
  },
  {
    section: 'Pie chart (Q4)', prompt: '4b. How many different categories of sport are in the chart (Baseball, Cricket, Football, Netball, Hockey)?',
    options: ['5', '4', '6', '200'], correctIndex: 0,
    explanation: 'Solution: 5\nStep 1: Count the labels in the legend: Baseball, Cricket, Football, Netball, Hockey — five categories.'
  },
  {
    section: 'Pie chart (Q4)', prompt: '4c. The largest slice in the pie chart corresponds to which sport?',
    options: ['Baseball', 'Cricket', 'Football', 'Netball'], correctIndex: 0,
    explanation: 'Solution: Baseball\nStep 1: Baseball occupies the largest angular slice of the pie.\nStep 2: Visual inspection: the orange (Baseball) slice is biggest in this chart.'
  },
  {
    section: 'Pie chart (Q4)', prompt: '4d. If Cricket\'s slice spans a quarter of the pie, what fraction of the 200 students play cricket?',
    options: ['1/4', '1/5', '3/10', '1/3'], correctIndex: 0,
    explanation: 'Solution: 1/4\nStep 1: A quarter of the pie = 90°.\nStep 2: Fraction = 90°/360° = 1/4.'
  },
  {
    section: 'Pie chart (Q4)', prompt: '4e. If the netball slice is 1/8 of the pie, how many students (out of 200) play netball?',
    options: ['25', '20', '30', '40'], correctIndex: 0,
    explanation: 'Solution: 25\nStep 1: 1/8 of 200 = 200/8 = 25.'
  },
  {
    section: 'Pie chart (Q4)', prompt: '4f. If Baseball accounts for 70 students and Hockey 15, how many students play Baseball or Hockey?',
    options: ['85', '70', '50', '100'], correctIndex: 0,
    explanation: 'Solution: 85\nStep 1: Add the two counts: 70 + 15 = 85.'
  },

  {
    section: 'Population pictogram (Q5)', prompt: '5a. What type of graph uses repeated human icons to represent populations?',
    options: ['Pictogram (pictograph)', 'Bar chart', 'Line graph', 'Histogram'], correctIndex: 0,
    explanation: 'Solution: Pictogram\nStep 1: Pictograms use pictures/icons, with a key stating each symbol\'s value.'
  },
  {
    section: 'Population pictogram (Q5)', prompt: '5b. On this chart each full human symbol represents…',
    options: ['1 billion people', '1 million people', '100 million people', '10 billion people'], correctIndex: 0,
    explanation: 'Solution: 1 billion people\nStep 1: The key in the diagram states: 1 symbol = 1 billion.'
  },
  {
    section: 'Population pictogram (Q5)', prompt: '5c. The row for 1650 shows half a human figure. What was the world population in 1650?',
    options: ['About 0.5 billion (500 million)', 'About 1 billion', 'About 100 million', 'About 2 billion'], correctIndex: 0,
    explanation: 'Solution: 0.5 billion\nStep 1: Half a symbol × 1 billion each = 0.5 billion.'
  },
  {
    section: 'Population pictogram (Q5)', prompt: '5d. From 0.5 billion (1650) to 1 billion (1850), how long did it take the population to double?',
    options: ['200 years', '100 years', '300 years', '350 years'], correctIndex: 0,
    explanation: 'Solution: 200 years\nStep 1: 1850 − 1650 = 200 years.\nStep 2: Population doubled from ~0.5 bn to ~1 bn in that span.'
  },
  {
    section: 'Population pictogram (Q5)', prompt: '5e. When did the world population reach 7 billion according to the pictogram?',
    options: ['2012', '1999', '2005', '2020'], correctIndex: 0,
    explanation: 'Solution: 2012\nStep 1: 2012 shows 7 full symbols × 1 billion = 7 billion.'
  },
  {
    section: 'Population pictogram (Q5)', prompt: '5f. If each symbol is 1 billion, how would 9.2 billion in 2050 be shown?',
    options: ['9 full symbols plus a small partial (~1/5) symbol', '10 full symbols', '92 symbols', '9.2 separate icons'], correctIndex: 0,
    explanation: 'Solution: ~9 full symbols plus a small partial\nStep 1: 9.2 ÷ 1 = 9.2 symbols total.\nStep 2: Represent as 9 whole symbols and about a fifth of another.'
  },

  {
    section: 'Villages table (Q6)', prompt: '6a. Complete: Packthorpe Football = 35 (team total) − Tennis 5 − Bowling ? = 35 (row total). Given Rainbridge Football = 21 and Football total = 35, Packthorpe Football is…',
    options: ['14', '11', '16', '17'], correctIndex: 0,
    explanation: 'Solution: 14\nStep 1: Football total = 35 and Rainbridge Football = 21.\nStep 2: Packthorpe Football = 35 − 21 = 14.'
  },
  {
    section: 'Villages table (Q6)', prompt: '6a. With Tennis total = 18 and Packthorpe Tennis = 5, Rainbridge Tennis is…',
    options: ['13', '5', '18', '12'], correctIndex: 0,
    explanation: 'Solution: 13\nStep 1: Rainbridge Tennis = Tennis total − Packthorpe Tennis = 18 − 5 = 13.'
  },
  {
    section: 'Villages table (Q6)', prompt: '6a. With overall total 80, Football 35 and Tennis 18, how many played Bowling in total?',
    options: ['27', '20', '30', '25'], correctIndex: 0,
    explanation: 'Solution: 27\nStep 1: Bowling total = 80 − 35 − 18 = 27.'
  },
  {
    section: 'Villages table (Q6)', prompt: '6b. A composite (stacked) bar chart is best for showing…',
    options: ['The contribution of subgroups within each category', 'Two separate pies', 'Continuous measurements', 'Proportions only'], correctIndex: 0,
    explanation: 'Solution: Contribution of subgroups within each category\nStep 1: Each bar represents one category (sport) split into village segments.\nStep 2: Segment lengths show how each village contributes to that sport\'s total.'
  },

  // ───── Pages 145-147: Past paper questions ─────────
  {
    section: 'Past paper (Q1)', prompt: 'P1. Find the highest odd number that is a factor of both 60 and 90.',
    options: ['15', '5', '9', '30'], correctIndex: 0,
    explanation: 'Solution: 15\nStep 1: Odd factors of 60: 1, 3, 5, 15.\nStep 2: Odd factors of 90: 1, 3, 5, 9, 15, 45.\nStep 3: Common odd factors: 1, 3, 5, 15. Highest = 15.'
  },
  {
    section: 'Past paper (Q2)', prompt: 'P2. Round each value to 1 s.f. and estimate (38.7 × 3.115) / (20.3 − 4.1²).',
    options: ['30', '15', '60', '40'], correctIndex: 0,
    explanation: 'Solution: 30\nStep 1: Round: 38.7 → 40, 3.115 → 3, 20.3 → 20, 4.1 → 4 so 4² = 16.\nStep 2: Numerator: 40 × 3 = 120.\nStep 3: Denominator: 20 − 16 = 4.\nStep 4: 120 / 4 = 30.'
  },
  {
    section: 'Past paper (Q3)', prompt: 'P3a. What is the mathematical name for a polygon with 5 sides?',
    options: ['Pentagon', 'Hexagon', 'Square', 'Quadrilateral'], correctIndex: 0,
    explanation: 'Solution: Pentagon\nStep 1: Penta- = 5 in Greek, so a 5-sided polygon is a pentagon.'
  },
  {
    section: 'Past paper (Q3)', prompt: 'P3b. What is each interior angle of a regular 18-sided polygon?',
    options: ['160°', '150°', '162°', '156°'], correctIndex: 0,
    explanation: 'Solution: 160°\nStep 1: Exterior angle = 360°/18 = 20°.\nStep 2: Interior angle = 180° − 20° = 160°.'
  },
  {
    section: 'Past paper (Q4)', prompt: 'P4a. Write 1/(2·2·2·2·2) as a power of 2.',
    options: ['2⁻⁵', '2⁵', '−2⁵', '1/2'], correctIndex: 0,
    explanation: 'Solution: 2⁻⁵\nStep 1: The denominator 2·2·2·2·2 = 2⁵.\nStep 2: 1/2⁵ = 2⁻⁵.'
  },
  {
    section: 'Past paper (Q4)', prompt: 'P4b(i). 3¹⁸ ÷ 3^r = 3⁶. Find r.',
    options: ['12', '6', '24', '3'], correctIndex: 0,
    explanation: 'Solution: r = 12\nStep 1: When dividing powers of the same base, subtract indices: 18 − r = 6.\nStep 2: r = 12.'
  },
  {
    section: 'Past paper (Q4)', prompt: 'P4b(ii). Simplify 8w¹⁰ × 6w⁵.',
    options: ['48w¹⁵', '48w⁵⁰', '14w¹⁵', '48w⁵'], correctIndex: 0,
    explanation: 'Solution: 48w¹⁵\nStep 1: Coefficients: 8 × 6 = 48.\nStep 2: Indices: 10 + 5 = 15.\nStep 3: Result: 48w¹⁵.'
  },

  {
    section: 'Past paper (Q5)', prompt: 'P5. Two parallel lines are cut by two transversals meeting above the top parallel, forming angles 59°, 37° at the top vertex and a° between the transversals. Find a.',
    options: ['84°', '96°', '90°', '104°'], correctIndex: 0,
    explanation: 'Solution: a = 84°\nStep 1: Angles on a straight line (the top parallel) sum to 180°: 59° + a° + 37° = 180°.\nStep 2: a = 180° − 59° − 37° = 84°.'
  },
  {
    section: 'Past paper (Q5)', prompt: 'P5. Using the same diagram, find b — the angle between the first transversal and the lower parallel line (corresponding to the 59° angle above).',
    options: ['59°', '121°', '37°', '118°'], correctIndex: 0,
    explanation: 'Solution: b = 59°\nStep 1: Corresponding angles between parallel lines cut by a transversal are equal.\nStep 2: b corresponds to the 59° angle, so b = 59°.'
  },
  {
    section: 'Past paper (Q5)', prompt: 'P5. And find c — the angle between the second transversal and the lower parallel line (corresponding to the 37° angle above).',
    options: ['37°', '143°', '59°', '74°'], correctIndex: 0,
    explanation: 'Solution: c = 37°\nStep 1: Corresponding angles ⇒ c = 37°.'
  },

  {
    section: 'Past paper (Q6)', prompt: 'P6. Zachary recorded 30 students\' favourite sport: Netball 7, Football 12, Hockey 6, Tennis 5. With 1 symbol = 4 people, how many full symbols represent Football?',
    options: ['3', '4', '2', '12'], correctIndex: 0,
    explanation: 'Solution: 3\nStep 1: Football = 12 students.\nStep 2: 12 ÷ 4 = 3 symbols exactly.'
  },

  {
    section: 'Past paper (Q7)', prompt: 'P7. Triangle ABC has AB = AC and angle BAC = 38°. BCD is a straight line. Find angle ACD.',
    options: ['109°', '71°', '142°', '38°'], correctIndex: 0,
    explanation: 'Solution: 109°\nStep 1: AB = AC ⇒ base angles equal: angle ABC = angle ACB = (180° − 38°)/2 = 71°.\nStep 2: BCD straight ⇒ angle ACD = 180° − 71° = 109°.'
  },

  {
    section: 'Past paper (Q8)', prompt: 'P8. Simplify 4p⁵q³ × p²q⁻⁴.',
    options: ['4p⁷/q', '4p¹⁰q⁻¹²', '4p⁷q', '4p³q⁷'], correctIndex: 0,
    explanation: 'Solution: 4p⁷/q\nStep 1: Coefficient stays 4.\nStep 2: p: 5 + 2 = 7.\nStep 3: q: 3 + (−4) = −1 → 1/q.\nStep 4: Result: 4p⁷/q.'
  },

  {
    section: 'Past paper (Q9)', prompt: 'P9a(i). Using integers 60 to 75 only, find a multiple of 17.',
    options: ['68', '17', '51', '85'], correctIndex: 0,
    explanation: 'Solution: 68\nStep 1: Multiples of 17 near 60–75: 17·3 = 51 (too low), 17·4 = 68 (in range), 17·5 = 85 (too high).'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9a(ii). How many prime numbers are there in the range 60–75 inclusive?',
    options: ['4 (61, 67, 71, 73)', '3', '5', '2'], correctIndex: 0,
    explanation: 'Solution: 4\nStep 1: Check each integer for primality.\nStep 2: Primes in [60, 75]: 61, 67, 71, 73.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9b(i). Find √4489.',
    options: ['67', '63', '71', '73'], correctIndex: 0,
    explanation: 'Solution: 67\nStep 1: 67² = 4489 (check: 70² = 4900, 60² = 3600).\nStep 2: So √4489 = 67.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9b(ii). Find 4³.',
    options: ['64', '12', '16', '81'], correctIndex: 0,
    explanation: 'Solution: 64\nStep 1: 4³ = 4 × 4 × 4 = 64.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9b(iii). Find ³√274625.',
    options: ['65', '55', '75', '85'], correctIndex: 0,
    explanation: 'Solution: 65\nStep 1: 60³ = 216000 and 70³ = 343000, so the answer is between.\nStep 2: 65³ = 65·65·65 = 4225·65 = 274625 ✓.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9b(iv). Find 2⁻³ × 24².',
    options: ['72', '144', '288', '36'], correctIndex: 0,
    explanation: 'Solution: 72\nStep 1: 2⁻³ = 1/8.\nStep 2: 24² = 576.\nStep 3: (1/8) × 576 = 72.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9c. Write down the reciprocal of 7.',
    options: ['1/7', '7', '−7', '70'], correctIndex: 0,
    explanation: 'Solution: 1/7\nStep 1: The reciprocal of x is 1/x, assuming x ≠ 0.\nStep 2: Reciprocal of 7 = 1/7.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9d. Write 3.72194 correct to 3 decimal places.',
    options: ['3.722', '3.721', '3.720', '3.72'], correctIndex: 0,
    explanation: 'Solution: 3.722\nStep 1: Identify 4th decimal = 9.\nStep 2: 9 ≥ 5, so round the 3rd decimal up: 1 → 2.\nStep 3: Answer 3.722.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9e. Find the LCM of 8 and 14.',
    options: ['56', '28', '112', '14'], correctIndex: 0,
    explanation: 'Solution: 56\nStep 1: 8 = 2³, 14 = 2 × 7.\nStep 2: LCM = 2³ × 7 = 8 × 7 = 56.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9f(i). The January average at the North Pole is −23°C; March is −11°C. What is the temperature difference?',
    options: ['12°C', '−34°C', '34°C', '−12°C'], correctIndex: 0,
    explanation: 'Solution: 12°C\nStep 1: Difference = −11 − (−23) = −11 + 23 = 12°C.'
  },
  {
    section: 'Past paper (Q9)', prompt: 'P9f(ii). July average is 28°C higher than March (−11°C). Find the July average.',
    options: ['17°C', '−39°C', '28°C', '39°C'], correctIndex: 0,
    explanation: 'Solution: 17°C\nStep 1: July = March + 28 = −11 + 28 = 17°C.'
  },

  {
    section: 'Past paper (Q10)', prompt: 'P10a. Simplify (81y¹⁶)^(3/4).',
    options: ['27y¹²', '27y¹⁶', '81y¹²', '81y¹⁹'], correctIndex: 0,
    explanation: 'Solution: 27y¹²\nStep 1: 81^(3/4) = (3⁴)^(3/4) = 3³ = 27.\nStep 2: (y¹⁶)^(3/4) = y^(16·3/4) = y¹².\nStep 3: Combine: 27y¹².'
  },
  {
    section: 'Past paper (Q10)', prompt: 'P10b. 2³ = 4^p. Find p.',
    options: ['p = 3/2', 'p = 3', 'p = 2', 'p = 2/3'], correctIndex: 0,
    explanation: 'Solution: p = 3/2\nStep 1: 8 = 2³ and 4^p = 2^(2p).\nStep 2: 2³ = 2^(2p) ⇒ 2p = 3.\nStep 3: p = 3/2.'
  },
]

/* ── Tatsavit1 Component ─────────────────────────────────
 * One MCQ at a time: Submit checks the answer, Explanation reveals a stepped
 * timeline via renderFeedback, Next advances. Finishes with a results summary.
 */
function Tatsavit1App({ onBack, isGoalMode = false }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [showSolve, setShowSolve] = useState(false)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])
  const [finished, setFinished] = useState(false)
  const [sessionGoal, setSessionGoal] = useState(isGoalMode ? 'speed' : 'standard')
  useEffect(() => {
    if (!isGoalMode) {
      setSessionGoal('standard');
    }
  }, [isGoalMode]);

  const total = TATSAVIT1_QUESTIONS.length
  const q = TATSAVIT1_QUESTIONS[idx]

  const handleSubmit = () => {
    if (selected === null || revealed) return
    const ok = selected === q.correctIndex
    setRevealed(true)
    if (ok) setScore(s => s + 1)
    setResults(r => [...r, {
      question: q.prompt.replace(/\s+/g, ' ').slice(0, 90),
      userAnswer: q.options[selected],
      correctAnswer: q.options[q.correctIndex],
      correct: ok,
      time: 0,
    }])
  }

  const handleNext = () => {
    if (idx + 1 >= total) { setFinished(true); return }
    setIdx(i => i + 1)
    setSelected(null); setRevealed(false); setShowSolve(false)
  }

  const handleRestart = () => {
    setIdx(0); setSelected(null); setRevealed(false); setShowSolve(false)
    setScore(0); setResults([]); setFinished(false)
  }

  const handleJumpPrev = () => {
    if (idx === 0) return
    setIdx(i => i - 1)
    setSelected(null); setRevealed(false); setShowSolve(false)
  }

  if (finished) {
    return (
      <QuizLayout title="Tatsavit 1 — Results" subtitle={`Score: ${score} / ${total} (${Math.round(100 * score / total)}%)`} onBack={onBack}>
        <div style={{ textAlign: 'center', marginTop: 16, marginBottom: 16 }}>
          <button className="submit-btn" onClick={handleRestart}>Play Again</button>
        </div>
        {results.length > 0 && <ResultsTable results={results} />}
      </QuizLayout>
    )
  }

  const isCorrect = selected === q.correctIndex

  return (
    <QuizLayout title="Tatsavit 1 — IGCSE Practice" subtitle={`Question ${idx + 1} of ${total} · ${q.section}`} onBack={onBack}>
      <div className="progress-pill center" style={{ marginBottom: 12 }}>
        Score: {score} · Answered: {results.length}
      </div>
      <div className="question-box" style={{ whiteSpace: 'pre-wrap', textAlign: 'center', marginBottom: 16 }}>
        <GlossaryText text={q.prompt || ''} />
      </div>
      <div className="options-list">
        {q.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i)
          const isSel = selected === i
          const isRight = revealed && i === q.correctIndex
          const isWrongPick = revealed && isSel && i !== q.correctIndex
          let extra = ''
          if (isRight) extra = 'selected'
          else if (isSel && !revealed) extra = 'selected'
          return (
            <label key={i} className={`option-card ${extra}`} style={{
              borderColor: isRight ? 'var(--clr-correct)' : isWrongPick ? 'var(--clr-wrong)' : undefined,
              background: isRight ? 'var(--clr-correct-bg)' : isWrongPick ? 'var(--clr-wrong-bg)' : undefined,
              opacity: revealed && !isRight && !isWrongPick ? 0.7 : 1,
            }}>
              <input type="radio" name="tatsavit1" checked={isSel}
                onChange={() => !revealed && setSelected(i)} disabled={revealed} />
              <span><strong>{letter})</strong> {opt}</span>
            </label>
          )
        })}
      </div>
      {revealed && !showSolve && (
        <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`} style={{ marginTop: 14, textAlign: 'center' }}>
          {isCorrect
            ? '✓ Correct!'
            : `✗ Correct answer: ${String.fromCharCode(65 + q.correctIndex)}) ${q.options[q.correctIndex]}`}
        </div>
      )}
      {showSolve && renderFeedback(q.explanation, false)}
      <div className="button-row" style={{ marginTop: 16 }}>
        {!revealed
          ? <button onClick={handleSubmit} disabled={selected === null}>Submit</button>
          : <button onClick={handleNext}>{idx + 1 >= total ? 'Finish Quiz' : 'Next →'}</button>}
        <button onClick={() => setShowSolve(s => !s)}
          style={{ background: 'transparent', border: '1px solid var(--clr-accent)', color: 'var(--clr-accent)' }}>
          {showSolve ? 'Hide Explanation' : 'Explanation'}
        </button>
        {idx > 0 && !revealed && (
          <button onClick={handleJumpPrev}
            style={{ background: 'transparent', border: '1px solid var(--clr-text-soft)', color: 'var(--clr-text-soft)' }}>
            ← Previous
          </button>
        )}
      </div>
    </QuizLayout>
  )
}
export default Tatsavit1App


