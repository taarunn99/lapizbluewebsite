"use client";

import { InteractivePhotoStack, PhotoStackItem } from "@/components/ui/photo-stack";

const companies: PhotoStackItem[] = [
  {
    src: "/images/about/group-companies/lapiz-blue.svg",
    name: "Lapiz Blue General Trading LLC",
  },
  {
    src: "/images/about/group-companies/alsama-metal.svg",
    name: "Alsama Metal Coatings & Ind LLC",
  },
  {
    src: "/images/about/group-companies/global-classic.svg",
    name: "Global Classic Building Materials LLC",
  },
  {
    src: "/images/about/group-companies/montolite.svg",
    name: "Montolite Building Materials LLC",
  },
  {
    src: "/images/about/group-companies/dreambox-gcc.svg",
    name: "Dreambox GCC",
    website: "https://dreamboxgcc.com/",
  },
  {
    src: "/images/about/group-companies/sixty-newton.svg",
    name: "Sixty Newton Technical Services LLC",
  },
];

export function LapizGroupSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <InteractivePhotoStack
          items={companies}
          title={
            <>
              <span className="text-[#406E8E]">Lapiz</span> Group of Companies
            </>
          }
        />
      </div>
    </section>
  );
}
