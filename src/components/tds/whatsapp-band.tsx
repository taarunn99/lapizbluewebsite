import { TdsWhatsAppCta } from './tds-whatsapp-cta';

interface WhatsAppBandProps {
  productName: string;
  brandName: string;
}

// Enquiry band placed low on the page: the page's job is the TDS download,
// the enquiry is the follow up once the reader has the data.
export function WhatsAppBand({ productName, brandName }: WhatsAppBandProps) {
  return (
    <section className="bg-[#161925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Need price and stock for {productName}?
          </h2>
          <p className="mt-2 text-gray-400 max-w-xl">
            Lapiz Blue supplies {brandName} across Dubai, Abu Dhabi and Sharjah. Send your
            quantity and site details for a same day response.
          </p>
        </div>
        <div className="flex-shrink-0">
          <TdsWhatsAppCta productName={productName} brandName={brandName} />
        </div>
      </div>
    </section>
  );
}
