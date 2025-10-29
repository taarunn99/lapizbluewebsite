'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import CareersForm from '@/components/CareersForm.client';
import { Toaster } from '@/components/ui/sonner';

export default function CareersSection() {
  useEffect(() => {
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/contactus/contactuspageimages/careers-1920.png"
        bgImageSrc="/images/meshgradientbase.png"
        title="JOIN US"
        subtitle="Collaborate Like You Mean It"
        tagline="Different chairs, same table — even the cat's got ideas."
        scrollToExpand="Scroll to expand"
        textBlend={false}
      >
        <div className="w-full py-10 md:py-16 lg:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#23395B]">
              Ready to Join Our Team?
            </h2>
            <p className="text-lg md:text-xl text-[#161925] max-w-2xl mx-auto">
              We're looking for talented individuals who are passionate about making a difference.
              Fill out the form below to start your journey with us.
            </p>
          </div>

          <CareersForm />
        </div>
      </ScrollExpandMedia>
    </>
  );
}
