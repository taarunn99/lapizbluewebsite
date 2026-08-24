/*
  TDS verification gate. Full-string Levenshtein ratio between the product name
  and the best-matching line of page 1 of the PDF. Token-set matching is
  deliberately NOT used: it scores KERASET vs KERASET MAXI at 100, which is the
  exact trap this gate exists to catch. A best line that equals the product name
  plus a known variant suffix forces needs_review regardless of score.
*/
import { distance } from 'fastest-levenshtein';

export const VARIANT_SUFFIXES = [
  'MAXI', 'S1', 'S2', 'ZERO', 'PLUS', 'QUICK', 'FLEX', 'EASY', 'DESIGN', 'CQ',
  'T', 'FF', 'SP', 'EXPRESS', 'ADHESIVE',
];

export function normalize(s: string): string {
  return s.toUpperCase().replace(/[^A-Z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function ratio(a: string, b: string): number {
  if (!a || !b) return 0;
  const d = distance(a, b);
  return Math.round(100 * (1 - d / Math.max(a.length, b.length)));
}

export interface VerifyResult {
  score: number;
  bestLine: string;
  suffixTrap: boolean;
}

function ligatureVariants(target: string): string[] {
  // PDF extraction can drop fl/fi/ff ligature glyphs, so "KERAFLEX" reads as
  // "KERA EX". Generate degraded variants of the target to match against.
  const variants = new Set<string>([target]);
  for (const lig of ['FL', 'FI', 'FF']) {
    if (target.includes(lig)) {
      variants.add(normalize(target.split(lig).join(' ')));
    }
  }
  return [...variants];
}

export function verifyNameInPageText(productName: string, pageText: string): VerifyResult {
  const targets = ligatureVariants(normalize(productName));
  let out: VerifyResult = { score: 0, bestLine: '', suffixTrap: false };
  for (const t of targets) {
    const r = verifyOneTarget(t, pageText);
    if (r.score > out.score || (r.suffixTrap && !out.suffixTrap && out.score < 90)) out = r;
    if (out.score >= 100) break;
  }
  return out;
}

function verifyOneTarget(target: string, pageText: string): VerifyResult {
  const whole = normalize(pageText);

  // Whole-page substring pass. PDF text runs often concatenate or split the
  // title ("KERABOND TKERABOND T"), so an exact bounded occurrence of the full
  // name counts as a match UNLESS it is immediately followed by a variant
  // suffix that is not part of the name (the KERASET vs KERASET MAXI trap).
  let suffixTrap = false;
  let substringHit = false;
  let idx = whole.indexOf(target);
  while (idx >= 0) {
    const before = idx === 0 ? ' ' : whole[idx - 1];
    const afterText = whole.slice(idx + target.length).trimStart();
    const nextToken = afterText.split(' ')[0] ?? '';
    const boundedStart = before === ' ' || !/[A-Z0-9]/.test(before);
    if (boundedStart) {
      if (VARIANT_SUFFIXES.includes(nextToken)) {
        suffixTrap = true;
      } else {
        substringHit = true;
        suffixTrap = false;
        break;
      }
    }
    idx = whole.indexOf(target, idx + 1);
  }

  const lines = pageText
    .split(/\n+/)
    .flatMap((l) => l.split(/ {3,}/))
    .map(normalize)
    .filter((l) => l.length > 0 && l.length < 120);

  let best = { score: 0, line: '' };
  for (const line of lines) {
    const s = ratio(target, line);
    if (s > best.score) best = { score: s, line };
  }

  if (substringHit) {
    return { score: 100, bestLine: target, suffixTrap: false };
  }
  if (suffixTrap) {
    return { score: best.score, bestLine: best.line, suffixTrap: true };
  }
  return { score: best.score, bestLine: best.line, suffixTrap: false };
}

export function extractRevisionDate(fullText: string): string {
  const footer = fullText.match(/\d{1,6}-(\d{1,2}-\d{4})\s*\((?:GB|UAE|EN|IN)\)/);
  if (footer) return footer[1];
  const patterns = [
    /Revision[:\s]+([A-Za-z0-9 .,/-]{4,30}?)(?:\n|$)/i,
    /Edition[:\s]+([A-Za-z0-9 .,/-]{4,30}?)(?:\n|$)/i,
  ];
  for (const p of patterns) {
    const m = fullText.match(p);
    if (m) return m[1].trim();
  }
  return '';
}
