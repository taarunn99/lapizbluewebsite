/*
  Per-category spec field maps for TDS extraction. Three hero fields per
  category are mandatory for a page to ship; everything else is optional.
  A field not found in the TDS is simply omitted, never filled with filler.
  Patterns run against the TDS full text; the first matching pattern wins.
*/
import type { TdsCategory } from '../../src/lib/tds';

export interface FieldMatcher {
  field: string;
  hero?: boolean;
  label: string;
  patterns: RegExp[];
  clean?: (value: string) => string;
}

const trim = (v: string) =>
  v.replace(/\s+/g, ' ').replace(/[.,;:]+$/, '').trim().slice(0, 160);

const VALUE = '([^\\n]{2,140})';

function row(label: string): RegExp {
  return new RegExp(label + '\\s*[:.]?\\s*' + VALUE, 'i');
}

const common: FieldMatcher[] = [
  {
    field: 'pot_life',
    label: 'Pot life',
    patterns: [row('Pot life(?: of mix)?'), row('Working time(?: of mix)?')],
  },
  {
    field: 'open_time',
    label: 'Open time',
    patterns: [row('Open time(?: \\(EN 1346\\))?')],
  },
  {
    field: 'adjustment_time',
    label: 'Adjustment time',
    patterns: [row('Adjust(?:ability|ment) time'), row('Time for adjustments?')],
  },
  {
    field: 'set_time',
    label: 'Set to light foot traffic',
    patterns: [row('Set to (?:light )?foot traffic'), row('Foot traffic'), row('Ready for use')],
  },
  {
    field: 'grouting_time',
    label: 'Waiting time before grouting',
    patterns: [row('(?:Waiting time before )?[Gg]routing(?: joints)?(?: after)?')],
  },
  {
    field: 'colours',
    label: 'Colours',
    patterns: [row('Colou?rs? available'), row('Colou?rs?')],
  },
  {
    field: 'mixing_ratio',
    label: 'Mixing ratio',
    patterns: [row('Mixing ratio'), row('Ratio of (?:the )?mix')],
  },
  {
    field: 'bond_strength',
    label: 'Bond strength',
    patterns: [row('(?:Tensile adhesion|Bond(?:ing)? strength|Adhesion to concrete)(?: \\(EN 1348\\))?(?: after 28 days)?')],
  },
  {
    field: 'application_temperature',
    label: 'Application temperature',
    patterns: [row('Application temperature(?: range)?(?: permitted)?')],
  },
  {
    field: 'storage_shelf_life',
    label: 'Storage and shelf life',
    patterns: [row('Storage'), row('Shelf life')],
  },
  {
    field: 'consistency',
    label: 'Consistency',
    patterns: [row('Consistency(?: of mix)?')],
  },
  {
    field: 'emicode',
    label: 'EMICODE',
    patterns: [row('EMICODE')],
  },
];

const adhesiveHero: FieldMatcher[] = [
  {
    field: 'classification',
    hero: true,
    label: 'Classification',
    patterns: [
      /(?:EN 12004|ISO 13007)[^\n]*?\b(C\d[A-Z0-9 ]{0,10}|R\d[A-Z0-9 ]{0,6})\b/,
      /classified(?: as)?\s+(C\d[A-Z0-9 ]{0,10}|R\d[A-Z0-9 ]{0,6})/i,
      /\b(C[12][EFTS0-9 ]{0,8}(?:S[12])?)\s+(?:according|in accordance|class)/i,
    ],
  },
  {
    field: 'coverage',
    hero: true,
    label: 'Coverage',
    patterns: [row('Coverage(?: \\(depending[^)]*\\))?'), row('Consumption')],
  },
  {
    field: 'pack_size',
    hero: true,
    label: 'Pack size',
    patterns: [row('Packaging'), row('Pack(?:s| size)')],
  },
];

const groutHero: FieldMatcher[] = [
  {
    field: 'classification',
    hero: true,
    label: 'Classification',
    patterns: [
      /(?:EN 13888|ISO 13007)[^\n]*?\b(CG\d?[A-Z]{0,3}|RG\d?)\b/,
      /classified(?: as)?\s+(CG\d?[A-Z]{0,3}|RG\d?)/i,
    ],
  },
  {
    field: 'joint_width',
    hero: true,
    label: 'Joint width',
    patterns: [row('(?:Width of )?[Jj]oints?(?: width)?(?: from)?'), /joints? (?:up to|from) ([^\n]{2,60})/i],
  },
  {
    field: 'pack_size',
    hero: true,
    label: 'Pack size',
    patterns: [row('Packaging'), row('Pack(?:s| size)')],
  },
];

const groutExtra: FieldMatcher[] = [
  {
    field: 'water_resistance',
    label: 'Water resistance',
    patterns: [row('Water absorption[^\\n]{0,30}'), row('Water repellen(?:t|cy)[^\\n]{0,20}')],
  },
];

const repairHero: FieldMatcher[] = [
  {
    field: 'classification',
    hero: true,
    label: 'Classification',
    patterns: [/(?:EN 1504-?\d?)[^\n]*?\b(R\d)\b/, /class\s+(R\d)\b/i],
  },
  {
    field: 'coverage',
    hero: true,
    label: 'Consumption',
    patterns: [row('Consumption'), row('Coverage')],
  },
  {
    field: 'pack_size',
    hero: true,
    label: 'Pack size',
    patterns: [row('Packaging'), row('Pack(?:s| size)')],
  },
];

export const specMaps: Record<TdsCategory, FieldMatcher[]> = {
  tile_adhesive: [...adhesiveHero, ...common],
  epoxy_grout: [...groutHero, ...groutExtra, ...common],
  cementitious_grout: [...groutHero, ...groutExtra, ...common],
  repair_mortar: [...repairHero, ...common],
};

export function heroFields(category: TdsCategory): string[] {
  return specMaps[category].filter((f) => f.hero).map((f) => f.field);
}

export function labelFor(category: TdsCategory, field: string): string {
  const m = specMaps[category].find((f) => f.field === field);
  if (m) return m.label;
  return field.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
}

const HEADING_RE = /^[A-Z][A-Z ()&,'.-]{6,70}$/;

function technicalDataRegion(fullText: string): string {
  let start = fullText.search(/TECHNICAL DATA \(typical values\)/i);
  if (start < 0) start = fullText.search(/TECHNICAL DATA(?!\s+[Ss]heet)/);
  if (start < 0) return '';
  const slice = fullText.slice(start, start + 7000);
  const end = slice.search(/IMPORTANT NOTES|LEGAL NOTICE|SAFETY INSTRUCTIONS|WARNING\b|CAUTIONS/i);
  return end > 200 ? slice.slice(0, end) : slice;
}

export function sectionText(fullText: string, heading: RegExp): string {
  const lines = fullText.split('\n');
  const startIdx = lines.findIndex((l) => heading.test(l.trim()));
  if (startIdx < 0) return '';
  const out: string[] = [];
  for (let i = startIdx + 1; i < lines.length && out.join(' ').length < 400; i++) {
    const line = lines[i].trim();
    if (HEADING_RE.test(line) && line.length > 6) break;
    if (line) out.push(line);
  }
  return out.join(' ').replace(/\s+/g, ' ').trim();
}

const LIGATURE_FIXES: [RegExp, string][] = [
  [/\u0000oor/g, 'floor'], [/\u0000ne/g, 'fine'], [/speci\u0000c/g, 'specific'],
  [/\u0000rst/g, 'first'], [/\u0000ll/g, 'fill'], [/traf\u0000c/g, 'traffic'],
  [/\u0000nal/g, 'final'], [/\u0000nish/g, 'finish'], [/\u0000exib/g, 'flexib'],
  [/\u0000at/g, 'flat'], [/\u0000ow/g, 'flow'], [/\u0000x/g, 'fix'],
  [/ef\u0000c/g, 'effic'], [/dif\u0000c/g, 'diffic'], [/\u0000re/g, 'fire'],
  [/\u0000/g, 'fi'],
];

export function fixLigatures(text: string): string {
  let out = text;
  for (const [re, rep] of LIGATURE_FIXES) out = out.replace(re, rep);
  return out;
}

function looksLikeValue(value: string): boolean {
  if (value.length < 2 || /^[-.,:]+$/.test(value)) return false;
  if (/^\W*\(?\s*(mm|cm|kg|g|%|h|min)\s*\)?\W*$/i.test(value)) return false;
  if (/^\d{1,2}$/.test(value)) return false;
  // Reject prose fragments: a good table value is short or contains a number,
  // unit, colon-free measurement, or an enumeration.
  if (value.length <= 40) return true;
  return /\d/.test(value);
}

const SENTENCE_FALLBACKS: Record<string, RegExp[]> = {
  pack_size: [/supplied in ([^\n.;]{5,120})/i, /Packaging[:\s]+([^\n]{4,120})/i],
  storage_shelf_life: [/shelf life of ([^\n.;]{2,80})/i, /stored[^\n.]{0,60}for (\d+ months[^\n.;]{0,40})/i],
  colours: [/available in (\d+\s?colou?rs?[^\n.;]{0,60})/i, /(\d+)\s?colou?rs? available/i, /range of (\d+ colou?rs?)/i],
  coverage: [/[Cc]onsumption[:\s]+([^\n]{3,100})/, /[Cc]overage[:\s]+([^\n]{3,100})/],
  joint_width: [/joints? (?:up to|of up to|from|between) ([^\n.;)]{2,50})/i, /grouting joints? [^\n.;]{0,20}?(\d+[^\n.;)]{1,40}mm[^\n.;)]{0,20})/i],
};

export function extractSpecs(category: TdsCategory, fullText: string): Record<string, string> {
  const specs: Record<string, string> = {};
  const region = technicalDataRegion(fullText);
  const regionLines = region.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  for (const matcher of specMaps[category]) {
    if (matcher.field === 'classification') {
      for (const pattern of matcher.patterns) {
        const m = fullText.match(pattern);
        if (m && m[1]) {
          specs.classification = trim(m[1]);
          break;
        }
      }
      continue;
    }
    // Anchored line-by-line matching inside the technical data table.
    for (const pattern of matcher.patterns) {
      const anchored = new RegExp('^' + pattern.source, pattern.flags.replace('g', ''));
      let found = '';
      for (const line of regionLines) {
        const m = line.match(anchored);
        if (m && m[1]) {
          const value = trim(m[1].replace(/^[:.]\s*/, ''));
          if (looksLikeValue(value)) {
            found = value;
            break;
          }
        }
      }
      if (found) {
        specs[matcher.field] = matcher.clean ? matcher.clean(found) : found;
        break;
      }
    }
  }

  // Dedicated sections in the UAE-format TDS layout beat sentence scraping.
  const sections: [string, RegExp][] = [
    ['coverage', /^CONSUMPTION$|^COVERAGE$/],
    ['pack_size', /^PACKAGING$/],
    ['storage_shelf_life', /^STORAGE$/],
  ];
  for (const [field, heading] of sections) {
    if (specs[field]) continue;
    if (!specMaps[category].some((m) => m.field === field)) continue;
    const value = sectionText(fullText, heading);
    if (value && looksLikeValue(value.slice(0, 40))) {
      specs[field] = value.slice(0, 300).replace(/[;,]\s*$/, '');
    } else if (value) {
      specs[field] = value.slice(0, 300);
    }
  }

  for (const [field, patterns] of Object.entries(SENTENCE_FALLBACKS)) {
    if (specs[field]) continue;
    if (!specMaps[category].some((m) => m.field === field)) continue;
    for (const p of patterns) {
      const m = fullText.match(p);
      if (m && m[1] && looksLikeValue(trim(m[1]))) {
        specs[field] = trim(m[1]);
        break;
      }
    }
  }

  return specs;
}
