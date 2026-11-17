import type { Metadata } from 'next';
import { QuoteListPanel } from '@/components/quote/quote-list.client';

export const metadata: Metadata = {
  title: 'Your quote list | Lapiz Blue',
  description:
    'The products you have collected across the site, ready to send to Lapiz Blue for a quotation in one message.',
  // The list lives in the visitor's browser, so there is nothing here for a
  // crawler to index and nothing that would be the same twice.
  robots: { index: false, follow: true },
};

export default function QuotePage() {
  return (
    <main className="bg-white text-[#161925]">
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="label-sh text-[#161925]/70">Quotation</p>
          <h1 className="mt-3 font-outfit text-3xl font-bold tracking-tight text-[#161925] sm:text-4xl lg:text-5xl">
            Your quote list.
          </h1>
          <div className="mt-10 sm:mt-14">
            <QuoteListPanel />
          </div>
        </div>
      </section>
    </main>
  );
}
