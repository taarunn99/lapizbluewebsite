import LocationButton from "./contact/LocationButton.client";
import PhoneButton from "./contact/PhoneButton.client";
import EmailButton from "./contact/EmailButton.client";

export default function ContactDetails() {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Visit Us */}
        <div className="flex flex-col items-center text-center md:border-r md:border-black/20 px-4 sm:px-6 lg:px-8">
          {/* Client Island: Interactive Location Button */}
          <LocationButton />

          {/* Server-rendered content for SEO */}
          <h3 className="font-manrope font-medium text-2xl sm:text-3xl lg:text-[40px] lg:leading-[55px] text-[#BFD7EA] mb-4 sm:mb-6">
            Visit Us
          </h3>

          <p className="font-manrope font-light text-lg sm:text-xl lg:text-[32px] lg:leading-[44px] text-[#161925] max-w-md">
            Conveniently located in three key UAE locations for faster service.
          </p>
        </div>

        {/* Call Us */}
        <div className="flex flex-col items-center text-center md:border-r md:border-black/20 px-4 sm:px-6 lg:px-8">
          {/* Client Island: Interactive Phone Button */}
          <PhoneButton />

          {/* Server-rendered content for SEO */}
          <h3 className="font-manrope font-semibold text-2xl sm:text-3xl lg:text-[36px] lg:leading-[49px] text-[#BFD7EA] mb-3 sm:mb-4">
            Call Us
          </h3>

          <p className="font-manrope font-light text-lg sm:text-xl lg:text-[32px] lg:leading-[44px] text-[#161925] mb-3 sm:mb-4">
            We're just a call away.
          </p>

          <a
            href="tel:+97148855257"
            className="font-manrope font-semibold text-xl sm:text-2xl lg:text-[36px] lg:leading-[49px] text-[#161925] hover:text-[#23395B] transition-colors"
          >
            +971 4 8855257
          </a>
        </div>

        {/* Mail Us */}
        <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
          {/* Client Island: Interactive Email Button */}
          <EmailButton />

          {/* Server-rendered content for SEO */}
          <h3 className="font-manrope font-semibold text-2xl sm:text-3xl lg:text-[36px] lg:leading-[49px] text-[#BFD7EA] mb-3 sm:mb-4">
            Mail Us
          </h3>

          <p className="font-manrope font-light text-lg sm:text-xl lg:text-[32px] lg:leading-[44px] text-[#161925] mb-3 sm:mb-4">
            Email us your queries at
          </p>

          <a
            href="mailto:info@lapizblue.com"
            className="font-manrope font-semibold text-xl sm:text-2xl lg:text-[36px] lg:leading-[49px] text-[#161925] break-all hover:text-[#23395B] transition-colors"
          >
            info@lapizblue.com
          </a>
        </div>
      </div>
    </section>
  );
}
