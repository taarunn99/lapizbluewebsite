import type { ManifestRecord } from './tds';

export interface TdsFaq {
  question: string;
  answer: string;
}

const STANDARD_BY_CATEGORY: Record<ManifestRecord['category'], string> = {
  tile_adhesive: 'EN 12004 and ISO 13007',
  epoxy_grout: 'EN 13888 and ISO 13007',
  cementitious_grout: 'EN 13888 and ISO 13007',
  repair_mortar: 'EN 1504',
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
