'use client';

import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import CareersForm from '@/components/CareersForm.client';
import { Toaster } from '@/components/ui/sonner';

export default function CareersSection() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/contactus/contactuspageimages/careers-1920.webp"
        bgImageSrc="/images/meshgradientbase.webp"
        title="JOIN US"
        subtitle="Collaborate Like You Mean It"
        tagline="Different chairs, same table - even the cat's got ideas."
        scrollToExpand="Scroll to expand"
        textBlend={false}
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="mb-8 max-w-2xl md:mb-12">
            <p className="label-sh mb-4 text-[#406E8E]">Join the team</p>
            <h2 className="font-outfit text-3xl font-bold leading-[1.05] text-[#161925] md:text-4xl lg:text-5xl">
              Ready to join Lapiz Blue?
            </h2>
            <p className="mt-4 font-manrope text-base text-[#23395B] md:text-lg">
              Send us your CV and a few lines about yourself, and our HR team will come back to you.
            </p>
          </div>

          <CareersForm />
        </div>
      </ScrollExpandMedia>
    </>
  );
}
