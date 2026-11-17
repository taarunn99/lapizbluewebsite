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
  v.replace(/[–—]/g, '-').replace(/\s+/g, ' ').replace(/[.,;:]+$/, '').trim().slice(0, 160);

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

const resilientHero: FieldMatcher[] = [
  {
    field: 'coverage',
    hero: true,
    label: 'Coverage',
    patterns: [row('Coverage'), row('Consumption')],
  },
  {
    field: 'pack_size',
    hero: true,
    label: 'Pack size',
    patterns: [row('Packaging'), row('Pack(?:s| size)')],
  },
];

/*
  Fields shared by the categories added for Vetonit and the brands after it.

  Only pack size is marked hero for these. Hero fields are what
  check-manifest.ts refuses to ship without, and pack size is the one figure
  we always hold, because it comes from the distributor's own stock list
  rather than from the manufacturer's sheet. Coverage, thickness and strength
  are extracted when the sheet states them and omitted when it does not,
  which is the existing rule: never fill a field with filler.
*/
const packHero: FieldMatcher[] = [
  {
    field: 'pack_size',
    hero: true,
    label: 'Pack size',
    patterns: [row('Packaging'), row('Pack(?:s| size)'), row('Supplied in')],
  },
];

const coverageField: FieldMatcher = {
  field: 'coverage',
  label: 'Coverage',
  patterns: [row('Consumption'), row('Coverage'), row('Theoretical coverage')],
};

const thicknessField: FieldMatcher = {
  field: 'thickness',
  label: 'Thickness',
  patterns: [
    row('(?:Application |Layer |Build[- ]?up )?Thickness'),
    row('Applied (?:at a )?thickness'),
  ],
};

const strengthFields: FieldMatcher[] = [
  {
    field: 'compressive_strength',
    label: 'Compressive strength',
    patterns: [row('Compressive strength')],
  },
  { field: 'flexural_strength', label: 'Flexural strength', patterns: [row('Flexural strength')] },
  { field: 'bond_strength', label: 'Bond strength', patterns: [row('(?:Bond|Adhesion) strength')] },
];

const membraneFields: FieldMatcher[] = [
  {
    field: 'classification',
    label: 'Classification',
    patterns: [/\b(CM\s?O[12]?P?|DM\s?O[12]?P?|AM\s?O[12]?P?)\b/, /EN\s?14891[^\n]*?\b([A-Z]{2}\s?\w{1,3})\b/],
  },
  { field: 'elongation', label: 'Elongation at break', patterns: [row('Elongation(?: at break)?')] },
  {
    field: 'crack_bridging',
    label: 'Crack bridging',
    patterns: [row('Crack[- ]bridging(?: ability)?')],
  },
  { field: 'recoat_time', label: 'Recoat time', patterns: [row('(?:Re[- ]?coat|Waiting) time')] },
];

const sealantFields: FieldMatcher[] = [
  {
    field: 'classification',
    label: 'Classification',
    patterns: [/ISO\s?11600[^\n]*?\b(F|G)\s?[-]?\s?(\d{2}(?:\.\d)?[A-Z]{0,2})\b/, row('Class')],
  },
  {
    field: 'movement_capability',
    label: 'Movement capability',
    patterns: [row('Movement (?:capability|accommodation)')],
  },
  { field: 'shore_hardness', label: 'Shore A hardness', patterns: [row('(?:Shore A|Hardness)')] },
  { field: 'tack_free_time', label: 'Tack free time', patterns: [row('Tack[- ]free time')] },
];

const screedFields: FieldMatcher[] = [
  {
    field: 'classification',
    label: 'Classification',
    patterns: [/EN\s?13813[^\n]*?\b(C\d{1,3}[- ]?F\d{1,2})\b/, /\b(CT[- ]?C\d{1,3}[- ]?F\d{1,2})\b/],
  },
  { field: 'walk_on_time', label: 'Walk on time', patterns: [row('(?:Foot|Walk)[- ]?(?:on )?traffic')] },
];

export const specMaps: Record<TdsCategory, FieldMatcher[]> = {
  tile_adhesive: [...adhesiveHero, ...common],
  epoxy_grout: [...groutHero, ...groutExtra, ...common],
  cementitious_grout: [...groutHero, ...groutExtra, ...common],
  resilient_adhesive: [...resilientHero, ...common],
  repair_mortar: [...repairHero, ...common],
  precision_grout: [...packHero, coverageField, thicknessField, ...strengthFields, ...common],
  waterproofing: [...packHero, coverageField, thicknessField, ...membraneFields, ...common],
  sealant: [...packHero, coverageField, ...sealantFields, ...common],
  flooring_system: [...packHero, coverageField, thicknessField, ...screedFields, ...strengthFields, ...common],
  self_leveling: [...packHero, coverageField, thicknessField, ...screedFields, ...common],
  microcement: [...packHero, coverageField, thicknessField, ...common],
  plaster: [...packHero, coverageField, thicknessField, ...strengthFields, ...common],
  surface_treatment: [...packHero, coverageField, thicknessField, ...common],
  bonding_agent: [...packHero, coverageField, ...common],
  primer: [...packHero, coverageField, ...common],
  // An accessory has no mandatory figure. It is identified by what it is.
  accessory: [thicknessField, coverageField, ...common],
};

/*
  Grupo Puma label set.

  Grupo Puma names the same properties differently from the sheets the default
  maps were written against. Coverage is "Approximate yield" or "Approximate
  performance", the pot life is "Paste shelf life", the bond figure is "Initial
  adhesion" or "Adherence to concrete", and the colour row is headed "Aspect".
  The default maps run over a Puma sheet return almost nothing, so Puma's
  labels get their own set rather than being folded into the shared one, where
  they would start matching the wrong rows on the brands already shipped.
*/

/**
 * Like row(), but the label absorbs its own qualifier. Grupo Puma puts the
 * qualifier in the label cell, as in "Resistence to compression after 28 days"
 * or "Initial adhesion (at 6 hours)", so a pattern that stops at the bare
 * label returns the rest of the label as the value. A bracketed aside is part
 * of the qualifier even when it contains a colon of its own, as in "Mixing
 * Ratio (Part A : Part B)". Requiring the colon also keeps the match inside
 * the data table rather than wandering into a bullet that happens to open
 * with the same words, and tolerates the double colon Puma leaves behind when
 * the label cell already ends in one.
 */
function qualifiedRow(label: string): RegExp {
  return new RegExp(label + '(?:\\([^)\\n]*\\)|[^\\n:]){0,48}\\s*:{1,2}\\s*' + VALUE, 'i');
}

const pumaCoverage: FieldMatcher = {
  field: 'coverage',
  label: 'Coverage',
  patterns: [
    qualifiedRow('Approx(?:imate|\\.)? yield'),
    qualifiedRow('Approx(?:imate|\\.)? performance'),
    qualifiedRow('Yield'),
    qualifiedRow('Performance'),
    qualifiedRow('Consumption'),
    qualifiedRow('Coverage'),
  ],
  // Sheets that give a rate per application method bullet it; the marker is
  // layout, not data.
  clean: (v) => v.replace(/^[•·*-]\s*/, '').replace(/\s*[•·]\s*/g, '; ').trim(),
};

const pumaPack: FieldMatcher = {
  field: 'pack_size',
  hero: true,
  label: 'Pack size',
  patterns: [
    qualifiedRow('Packaging'),
    qualifiedRow('Pack(?:s| size)'),
    qualifiedRow('Presentation'),
    qualifiedRow('Supplied in'),
  ],
};

const pumaCommon: FieldMatcher[] = [
  {
    field: 'colours',
    label: 'Colours',
    patterns: [
      qualifiedRow('Colou?rs? available'),
      qualifiedRow('Colou?rs?'),
      qualifiedRow('Appearance'),
      qualifiedRow('Aspect'),
    ],
  },
  {
    field: 'mixing_ratio',
    label: 'Mixing ratio',
    patterns: [
      qualifiedRow('Mixing water ratio'),
      qualifiedRow('Mixing [Rr]atio'),
      qualifiedRow('Mixing (?:water|proportion)'),
      qualifiedRow('Water (?:demand|addition|required|ratio)'),
      qualifiedRow('Kneading water'),
    ],
  },
  {
    field: 'consistency',
    label: 'Consistency',
    patterns: [qualifiedRow('Mixed [Mm]aterial [Cc]onsistency'), qualifiedRow('Consistency')],
  },
  {
    field: 'density',
    label: 'Density',
    patterns: [qualifiedRow('Mixed [Dd]ensity'), qualifiedRow('(?:Apparent |Bulk )?Density')],
  },
  {
    field: 'pot_life',
    label: 'Pot life',
    patterns: [
      qualifiedRow('Pot [Ll]ife'),
      // The mixed paste's working window, which is what a pot life is.
      qualifiedRow('Paste shelf life'),
      qualifiedRow('Working time'),
      qualifiedRow('Setting starting time'),
    ],
  },
  { field: 'open_time', label: 'Open time', patterns: [qualifiedRow('Open [Tt]ime')] },
  {
    field: 'adjustment_time',
    label: 'Adjustment time',
    patterns: [qualifiedRow('Adjust(?:ability|ment time)'), qualifiedRow('Time for adjustments?')],
  },
  {
    field: 'set_time',
    label: 'Set to light foot traffic',
    patterns: [
      qualifiedRow('Set to (?:light )?foot traffic'),
      qualifiedRow('Light [Ff]oot [Tt]raffic'),
      qualifiedRow('Commissioning of pedestrian traffic'),
      qualifiedRow('(?:Foot|Pedestrian) traffic'),
      qualifiedRow('Walk[- ]?on time'),
    ],
  },
  {
    field: 'grouting_time',
    label: 'Waiting time before grouting',
    patterns: [
      qualifiedRow('Time for grouting of floorings'),
      qualifiedRow('Time for grouting'),
      qualifiedRow('Setting/ Trafficable/ Grouting Time'),
      qualifiedRow('Grouting time'),
    ],
  },
  {
    field: 'application_temperature',
    label: 'Application temperature',
    patterns: [qualifiedRow('Application [Tt]emperature'), qualifiedRow('Temperature of application')],
  },
  {
    field: 'service_temperature',
    label: 'Service temperature',
    patterns: [
      qualifiedRow('Service temperature'),
      qualifiedRow('Operating temperature'),
      qualifiedRow('Temperature of [Uu]se'),
      qualifiedRow('Resistance to temperature'),
    ],
  },
  {
    field: 'bond_strength',
    label: 'Bond strength',
    patterns: [
      qualifiedRow('Initial adheren(?:ce|sion)'),
      qualifiedRow('Initial shear adhesion strength'),
      qualifiedRow('Adheren(?:ce|sion) to (?:cement|concrete)'),
      qualifiedRow('Tensile adhesi(?:on|ve) strength'),
      qualifiedRow('Tensile strength'),
      qualifiedRow('Adherence'),
    ],
  },
  {
    field: 'compressive_strength',
    label: 'Compressive strength',
    patterns: [
      qualifiedRow('Compressive [Ss]trength'),
      qualifiedRow('Compression strength'),
      qualifiedRow('Resisten?ce to compression'),
    ],
  },
  {
    field: 'flexural_strength',
    label: 'Flexural strength',
    patterns: [qualifiedRow('Flexural [Ss]trength'), qualifiedRow('Resisten?ce to flexion')],
  },
  {
    field: 'drying_time',
    label: 'Drying time',
    patterns: [qualifiedRow('Drying time on absorbent substrates'), qualifiedRow('Drying time')],
  },
  {
    field: 'storage_shelf_life',
    label: 'Storage and shelf life',
    // Only a line that is actually labelled as the shelf life. The packaging
    // section states the pack first and the life second, and a pack size
    // landing in this field would be read as a storage period.
    patterns: [qualifiedRow('Shelf life'), qualifiedRow('Storage')],
  },
];

const pumaWaterResistance: FieldMatcher = {
  field: 'water_resistance',
  label: 'Water resistance',
  patterns: [
    qualifiedRow('Water absorption after 30 min'),
    qualifiedRow('Water absorption'),
    qualifiedRow('Water repellen(?:t|cy)'),
  ],
};

const pumaThickness: FieldMatcher = {
  field: 'thickness',
  label: 'Thickness',
  patterns: [
    qualifiedRow('(?:Maximum |Minimum |Recommended |Application |Layer )?[Tt]hickness(?:es)?'),
    qualifiedRow('Applied (?:at a )?thickness'),
    // Some sheets state the build only in the application procedure, as a
    // sentence. The full applied thickness is taken, never the "minimum"
    // sentence beside it, which would read as the recommended figure.
    /(?:The )?total applied thickness[^\n]{0,90}should be ([^\n]{2,40})/i,
  ],
};

const pumaJointWidth: FieldMatcher = {
  field: 'joint_width',
  hero: true,
  label: 'Joint width',
  patterns: [qualifiedRow('Joint [Ww]idth'), qualifiedRow('Width of joints?')],
};

const pumaMembrane: FieldMatcher[] = [
  {
    field: 'water_pressure_resistance',
    label: 'Water pressure resistance',
    patterns: [
      qualifiedRow('Hydrostatic \\(positive\\) water pressure resistance'),
      qualifiedRow('Hydrostatic water pressure resistance'),
      qualifiedRow('Water pressure resistance'),
    ],
  },
  { field: 'elongation', label: 'Elongation at break', patterns: [qualifiedRow('Elongation')] },
  { field: 'crack_bridging', label: 'Crack bridging', patterns: [qualifiedRow('Crack[- ]bridging')] },
  {
    field: 'recoat_time',
    label: 'Recoat time',
    patterns: [qualifiedRow('(?:Re[- ]?coat|Overcoating) time')],
  },
];

const pumaScreed: FieldMatcher[] = [
  {
    field: 'classification',
    hero: true,
    label: 'Classification',
    patterns: [/EN\s?13813[^\n]*?\b(CT[- ]?C\d{1,3}[- ]?F\d{1,2})\b/, /\b(CT[- ]?C\d{1,3}[- ]?F\d{1,2})\b/],
  },
  { field: 'sanding_time', label: 'Sanding time', patterns: [qualifiedRow('Sanding time')] },
  {
    field: 'tiling_time',
    label: 'Time before tiling',
    patterns: [
      qualifiedRow('Waiting time before subsequent bonding'),
      qualifiedRow('Cladding time tiling'),
      qualifiedRow('Time before (?:tiling|covering)'),
    ],
  },
];

export const pumaSpecMaps: Record<TdsCategory, FieldMatcher[]> = {
  tile_adhesive: [...adhesiveHero.filter((f) => f.field === 'classification'), pumaPack, pumaCoverage, ...pumaCommon],
  epoxy_grout: [...groutHero.filter((f) => f.field === 'classification'), pumaJointWidth, pumaPack, pumaCoverage, pumaWaterResistance, ...pumaCommon],
  cementitious_grout: [...groutHero.filter((f) => f.field === 'classification'), pumaJointWidth, pumaPack, pumaCoverage, pumaWaterResistance, ...pumaCommon],
  resilient_adhesive: [pumaPack, pumaCoverage, ...pumaCommon],
  repair_mortar: [...repairHero.filter((f) => f.field === 'classification'), pumaPack, pumaCoverage, pumaThickness, ...pumaCommon],
  precision_grout: [pumaPack, pumaCoverage, pumaThickness, ...pumaCommon],
  waterproofing: [pumaPack, pumaCoverage, pumaThickness, ...pumaMembrane, ...pumaCommon],
  sealant: [pumaPack, pumaCoverage, ...sealantFields, ...pumaCommon],
  flooring_system: [pumaPack, pumaCoverage, pumaThickness, ...pumaScreed, ...pumaCommon],
  self_leveling: [pumaPack, pumaCoverage, pumaThickness, ...pumaScreed, ...pumaCommon],
  microcement: [pumaPack, pumaCoverage, pumaThickness, ...pumaCommon],
  plaster: [pumaPack, pumaCoverage, pumaThickness, ...pumaCommon],
  surface_treatment: [pumaPack, pumaCoverage, pumaThickness, ...pumaCommon],
  bonding_agent: [pumaPack, pumaCoverage, ...pumaCommon],
  primer: [pumaPack, pumaCoverage, ...pumaCommon],
  accessory: [pumaThickness, pumaCoverage, ...pumaCommon],
};

/** Which label set to read a sheet with. */
export type SpecVariant = 'default' | 'puma';

const VARIANTS: Record<SpecVariant, Record<TdsCategory, FieldMatcher[]>> = {
  default: specMaps,
  puma: pumaSpecMaps,
};

/**
 * A coverage figure drives the consumption calculator on the product page, so
 * it has to be a rate and never a pack size. "25 kg bags" is a pack; "1,5
 * Kg/m2 per mm of thickness" is a rate, and so is "1.5 m2 per 4 kg pack". A
 * candidate without a rate unit is dropped rather than shown, because a pack
 * size sitting in the coverage field would make the calculator lie.
 */
const COVERAGE_RATE =
  /(?:\/\s*(?:[\d.,]+\s*)?(?:m²|m2|mm|kg|pack|bag|litre|lt|l)(?![a-z])|\bper\s+(?:[\d.,]+\s*)?(?:m²|m2|mm|kg|pack|bag|litre|coat|layer|l)(?![a-z]))/i;

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
  // fl words, which have to precede the fi catch-all below or "fluid" lands
  // in the manifest as "fiuid".
  [/\u0000uid/g, 'fluid'], [/in\u0000uenc/g, 'influenc'], [/\u0000uenc/g, 'fluenc'],
  [/\u0000ush/g, 'flush'], [/\u0000oat/g, 'float'], [/\u0000ange/g, 'flange'],
  [/Mape\u0000ex/g, 'Mapeflex'], [/Mape\u0000oor/g, 'Mapefloor'],
  // No English word reads "fiex", so a dropped ligature before "ex" is
  // always "fl". Without this, Keraflex shipped to the manifest, and to the
  // page, as "Kerafiex" on every line of its sheet that named it.
  [/\u0000ex/g, 'flex'],
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

export function extractSpecs(
  category: TdsCategory,
  fullText: string,
  variant: SpecVariant = 'default',
): Record<string, string> {
  const maps = VARIANTS[variant][category];
  const specs: Record<string, string> = {};
  // The Puma text is already nothing but the technical data block followed by
  // the labelled prose sections, so there is no surrounding sheet to cut away
  // and every line is a candidate. The table rows come first, so a table value
  // still beats a prose line for the same field.
  const region = variant === 'puma' ? fullText : technicalDataRegion(fullText);
  const regionLines = region.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  for (const matcher of maps) {
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

  // Scoped to the Puma variant on purpose. The rule is right everywhere, but
  // the brands already shipped were extracted and reviewed under the old
  // behaviour, and a re-run of their registrars must not silently drop a
  // coverage line that a human already signed off.
  if (variant === 'puma' && specs.coverage && !COVERAGE_RATE.test(specs.coverage)) {
    delete specs.coverage;
  }

  // The two passes below read the UAE-format sheet's own headings and then
  // scrape prose for anything still missing. Both were written against that
  // layout and they are skipped for Puma, whose text is already a labelled
  // table followed by labelled prose: run over it they only ever rediscover
  // what the anchored pass already read, in a worse form.
  if (variant !== 'default') return specs;

  // Dedicated sections in the UAE-format TDS layout beat sentence scraping.
  const sections: [string, RegExp][] = [
    ['coverage', /^CONSUMPTION$|^COVERAGE$/],
    ['pack_size', /^PACKAGING$/],
    ['storage_shelf_life', /^STORAGE$/],
  ];
  for (const [field, heading] of sections) {
    if (specs[field]) continue;
    if (!maps.some((m) => m.field === field)) continue;
    const value = sectionText(fullText, heading).replace(/[–—]/g, '-');
    if (value && looksLikeValue(value.slice(0, 40))) {
      specs[field] = value.slice(0, 300).replace(/[;,]\s*$/, '');
    } else if (value) {
      specs[field] = value.slice(0, 300);
    }
  }

  for (const [field, patterns] of Object.entries(SENTENCE_FALLBACKS)) {
    if (specs[field]) continue;
    if (!maps.some((m) => m.field === field)) continue;
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
