'use client';

import { useState } from 'react';
import { trackLead } from '@/lib/track';

interface Props {
  productName: string;
  clause: string;
  rows: string[][];
  csv: string;
}

/**
 * The clause a quantity surveyor would otherwise retype out of the data
 * sheet, with copy and download beside it.
 *
 * The download is built in the browser from text already on the page rather
 * than fetched, so there is no file to keep in sync with the manifest and
 * nothing to go stale.
 */
export function BoqClause({ productName, clause, rows, csv }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    trackLead('boq_copy', { product: productName });
    try {
      await navigator.clipboard.writeText(clause);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked. The text is selectable on the page regardless.
    }
  };

  const download = (content: string, ext: string, type: string) => {
    trackLead('boq_download', { product: productName, targetHref: ext });
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${productName.replace(/\s+/g, '-').toLowerCase()}-boq.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const btn =
    'inline-flex items-center justify-center border border-[#161925]/20 bg-white px-4 py-2.5 font-manrope text-sm font-semibold text-[#161925] transition-colors hover:border-[#406E8E] hover:text-[#406E8E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E]';

  return (
    <div>
      <p className="font-manrope text-base leading-[1.75] text-[#161925]/85 max-w-[75ch]">{clause}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={copy} className={btn}>
          {copied ? 'Copied' : 'Copy clause'}
        </button>
        <button type="button" onClick={() => download(csv, 'csv', 'text/csv;charset=utf-8')} className={btn}>
          Download CSV
        </button>
        <button
          type="button"
          onClick={() => download(clause, 'txt', 'text/plain;charset=utf-8')}
          className={btn}
        >
          Download TXT
        </button>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Schedule fields for {productName}</caption>
          <tbody>
            {rows.slice(1).map(([field, value]) => (
              <tr key={field} className="border-b border-[#161925]/10">
                <th
                  scope="row"
                  className="py-3 pr-6 align-top font-manrope text-sm font-semibold text-[#161925]/60 whitespace-nowrap"
                >
                  {field}
                </th>
                <td className="py-3 font-manrope text-sm text-[#161925]">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
