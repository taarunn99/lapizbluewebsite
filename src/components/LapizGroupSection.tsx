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
    name: "Global Classic Building Materials Trading LLC",
    website: "https://www.gcbuae.com",
  },
  {
    src: "/images/about/group-companies/montolite.svg",
    name: "Montolite Building Materials LLC",
  },
  {
    src: "/images/about/group-companies/sixty-newton.webp",
    name: "Sixty Newton Technical Services LLC",
    website: "https://www.60newton.com",
  },
];

const timeline = [
  {
    year: "2020",
    name: "Lapiz Blue General Trading L.L.C",
    desc: "The group begins in Dubai as a construction chemicals distribution house, supplying tile adhesives, waterproofing and flooring systems across the UAE.",
  },
  {
    year: "2021",
    name: "Lapiz Blue - Abu Dhabi Branch",
    desc: "A second base opens in Mussafah Industrial 40, extending the group's distribution network to the capital.",
  },
  {
    year: "2022",
    name: "Montolite Building Materials LLC",
    desc: "A dedicated building materials trading company joins the group.",
  },
  {
    year: "2023",
    name: "Alsama Metal Coatings & Ind LLC",
    desc: "The group adds metal coatings and industrial finishing as its own licensed discipline.",
  },
  {
    year: "2024",
    name: "Sixty Newton Technical Services LLC",
    desc: "The application arm - approved applicators delivering waterproofing, flooring and installation works on site.",
  },
  {
    year: "2024",
    name: "Global Classic Building Materials Trading LLC",
    desc: "The surfaces house - stone slabs, bathware and surface care from its Sharjah showroom and warehouse.",
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

        {/* Group timeline - crawlable static content */}
        <div className="max-w-3xl mx-auto mt-14 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-[#161925] font-outfit text-center">
            One Group, <span className="text-[#406E8E]">Five Disciplines</span>
          </h3>
          <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed text-center">
            The Lapiz Group of Companies has grown from a single Dubai trading
            licence into five specialist companies, led by founder and Group
            General Manager Shariful Haque. A team of 75+ people works from
            industrial bases in Al Quoz (Dubai), Mussafah (Abu Dhabi) and
            Al Sajaa (Sharjah).
          </p>

          <ol className="mt-10 relative border-l-2 border-[#BFD7EA] ml-3 md:ml-6 space-y-8">
            {timeline.map((item) => (
              <li key={item.name} className="relative pl-6 md:pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#406E8E]"
                />
                <p className="font-outfit font-bold text-[#406E8E] text-sm tracking-wide">
                  {item.year}
                </p>
                <p className="mt-0.5 font-semibold text-[#161925] text-base md:text-lg">
                  {item.name}
                </p>
                <p className="mt-1 text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-gray-600 text-sm md:text-base leading-relaxed text-center">
            One licensed company per discipline - so specification, supply and
            application each sit with a dedicated team, under one group.
          </p>
        </div>
      </div>
    </section>
  );
}
