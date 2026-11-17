import type { ManifestRecord } from './tds';
import { TDS_CATEGORY_LABELS } from './tds';
import { calcConfig, headlineRate } from './calculator';

/**
 * A bill of quantities clause, built from what the manufacturer states.
 *
 * Quantity surveyors write these by hand from a data sheet, so the page can
 * save that step. Every sentence is conditional on the underlying field
 * existing: a clause never claims a classification, a coverage rate or a
 * thickness the record does not hold, because this text gets pasted into a
 * tender document and nobody re-checks it.
 */
export function buildBoqClause(rec: ManifestRecord, brandName: string): string {
  const parts: string[] = [];
  const kind = TDS_CATEGORY_LABELS[rec.category].toLowerCase();

  let opening = `Supply and apply ${rec.name}, a ${kind} manufactured by ${brandName}`;
  if (rec.classification) opening += `, classified ${rec.classification}`;
  opening += '.';
  parts.push(opening);

  if (rec.specs.product_type) {
    parts.push(`${rec.specs.product_type.replace(/\.$/, '')}.`);
  }

  // Straight from the transcribed sheet, so the clause pasted into a tender
  // and the calculator on the page can never state different rates.
  const headline = headlineRate(calcConfig(rec.brand, rec.slug) ?? { model: 'none', reason: '' });
  if (headline) {
    parts.push(`Allow ${headline.value.replace(/m²/g, 'm2')}, as published by the manufacturer.`);
  }

  if (rec.specs.thickness) parts.push(`Applied thickness ${rec.specs.thickness}.`);
  if (rec.specs.mixing_ratio) parts.push(`Mix at ${rec.specs.mixing_ratio.replace(/\.$/, '')}.`);
  if (rec.specs.pack_size) parts.push(`Supplied in ${rec.specs.pack_size.toLowerCase()}.`);

  parts.push(
    'Prepare the substrate and apply strictly in accordance with the manufacturer\'s current technical data sheet. Rates are for estimating and exclude wastage.',
  );

  return parts.join(' ');
}

/** The same clause as spreadsheet rows, for pasting into a BOQ. */
export function buildBoqRows(rec: ManifestRecord, brandName: string): string[][] {
  const headline = headlineRate(calcConfig(rec.brand, rec.slug) ?? { model: 'none', reason: '' });
  const rows: string[][] = [['Field', 'Value']];
  rows.push(['Product', rec.name]);
  rows.push(['Manufacturer', brandName]);
  rows.push(['Type', TDS_CATEGORY_LABELS[rec.category]]);
  if (rec.classification) rows.push(['Classification', rec.classification]);
  if (headline) rows.push([headline.label, headline.value.replace(/m²/g, 'm2')]);
  for (const [key, label] of [
    ['thickness', 'Thickness'],
    ['pack_size', 'Pack size'],
    ['mixing_ratio', 'Mixing ratio'],
    ['set_time', 'Set time'],
    ['pot_life', 'Pot life'],
    ['open_time', 'Open time'],
  ] as const) {
    if (rec.specs[key]) rows.push([label, rec.specs[key]]);
  }
  rows.push(['Unit of measurement', 'm2']);
  return rows;
}

export function rowsToCsv(rows: string[][]): string {
  return rows
    .map((r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(','))
    .join('\n');
}
