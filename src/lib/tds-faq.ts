import type { ManifestRecord } from './tds';

export interface TdsFaq {
  question: string;
  answer: string;
}

// The standard a class code on this kind of product is written against. Where
// a category has no single governing standard, the answer points at the sheet
// rather than naming one that may not apply.
const SHEET = "the manufacturer's technical data sheet";

const STANDARD_BY_CATEGORY: Record<ManifestRecord['category'], string> = {
  tile_adhesive: 'EN 12004 and ISO 13007',
  epoxy_grout: 'EN 13888 and ISO 13007',
  cementitious_grout: 'EN 13888 and ISO 13007',
  resilient_adhesive: SHEET,
  repair_mortar: 'EN 1504',
  precision_grout: 'EN 1504 and ASTM C1107',
  waterproofing: 'EN 14891',
  sealant: 'ISO 11600',
  flooring_system: 'EN 13813',
  self_leveling: 'EN 13813',
  microcement: SHEET,
  plaster: 'EN 998-1',
  surface_treatment: SHEET,
  bonding_agent: SHEET,
  primer: SHEET,
  accessory: SHEET,
};

// Deterministic FAQs generated only from data present in the manifest.
// A question is only included when its underlying spec field exists.
export function buildTdsFaqs(rec: ManifestRecord): TdsFaq[] {
  const faqs: TdsFaq[] = [];

  if (rec.classification) {
    faqs.push({
      question: `What is the classification of ${rec.name}?`,
      answer: `${rec.name} is classified ${rec.classification} according to ${STANDARD_BY_CATEGORY[rec.category]}, as stated in the manufacturer's technical data sheet.`,
    });
  }

  if (rec.specs.coverage) {
    faqs.push({
      question: `What is the coverage of ${rec.name}?`,
      answer: `As per the TDS: ${rec.specs.coverage}`,
    });
  } else if (rec.specs.joint_width) {
    faqs.push({
      question: `What joint widths can ${rec.name} be used for?`,
      answer: `As per the TDS: ${rec.specs.joint_width}`,
    });
  }

  if (rec.specs.pack_size) {
    faqs.push({
      question: `What pack sizes does ${rec.name} come in?`,
      answer: rec.specs.pack_size,
    });
  }

  faqs.push({
    question: `Where can I download the ${rec.name} TDS PDF?`,
    answer: `You can download the official ${rec.name} technical data sheet as a PDF directly from this page${rec.tds.revision_date ? `, revision ${rec.tds.revision_date}` : ''}, sourced from the manufacturer. For prices and stock in the UAE, contact Lapiz Blue on WhatsApp.`,
  });

  return faqs.slice(0, 4);
}
