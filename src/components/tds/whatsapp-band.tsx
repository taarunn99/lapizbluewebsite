import { TdsWhatsAppCta } from './tds-whatsapp-cta';

interface WhatsAppBandProps {
  productName: string;
  brandName: string;
}

/**
 * The enquiry, closing the page.
 *
 * A card filled with the manufacturer's colour rather than a full bleed dark
 * band. The band read as a footer and people stopped at it; a card sits inside
 * the page and belongs to the product above it.
 *
 * It is placed low on purpose. The page's job is the data sheet and the
 * figures; the enquiry is what happens once the reader has them.
 */
export function WhatsAppBand({ productName, brandName }: WhatsAppBandProps) {
  return (
    <section className="bg-white py-16 sm:py-20 print:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[var(--brand-ink)] px-6 py-12 sm:px-12 sm:py-14">
          <p className="label-sh text-white/70">{productName} in the UAE</p>
          <h2 className="mt-4 max-w-[22ch] font-outfit text-3xl font-bold leading-tight text-white sm:text-4xl">
            Tell us the area. We will quote the job.
          </h2>
          <p className="mt-5 max-w-[62ch] font-manrope text-base leading-relaxed text-white/85">
            Lapiz Blue supplies {brandName} from Dubai, Abu Dhabi and Sharjah. Send the
            quantity of {productName} you need, or describe the job and we will work it
            out with you.
          </p>
          <div className="mt-8">
            <TdsWhatsAppCta productName={productName} brandName={brandName} />
          </div>
        </div>
      </div>
    </section>
  );
}
