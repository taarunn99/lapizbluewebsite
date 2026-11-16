import type { ManifestRecord } from './tds';
import { consumptionModel, TDS_CATEGORY_LABELS } from './tds';

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

  const model = consumptionModel(rec);
  if (model) {
    const rate =
      model.max > model.min ? `${model.min.toFixed(2)} to ${model.max.toFixed(2)}` : model.min.toFixed(2);
    const unit = model.unit === 'litre' ? 'litres' : 'kg';
    const per = model.kind === 'per_mm' ? ' per millimetre of thickness' : '';
    parts.push(`Allow ${rate} ${unit} per square metre${per}, as published by the manufacturer.`);
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
  const model = consumptionModel(rec);
  const rows: string[][] = [['Field', 'Value']];
  rows.push(['Product', rec.name]);
  rows.push(['Manufacturer', brandName]);
  rows.push(['Type', TDS_CATEGORY_LABELS[rec.category]]);
  if (rec.classification) rows.push(['Classification', rec.classification]);
  if (model) {
    const rate = model.max > model.min ? `${model.min.toFixed(2)}-${model.max.toFixed(2)}` : model.min.toFixed(2);
    const unit = model.unit === 'litre' ? 'L/m2' : 'kg/m2';
    rows.push(['Consumption', `${rate} ${unit}${model.kind === 'per_mm' ? ' per mm' : ''}`]);
  }
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
