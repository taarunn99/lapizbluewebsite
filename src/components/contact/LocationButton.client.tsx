"use client";

import Image from "next/image";

/* ========= location helpers (same as footer) ========= */

type Branch = {
  name: "Dubai" | "Abu Dhabi" | "Sharjah";
  lat: number;
  lng: number;
  url: string;
};

const BRANCHES: Branch[] = [
  {
    name: "Dubai",
    lat: 25.116596,
    lng: 55.223913,
    url: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Dubai+Branch/@25.116596,55.223913,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f6bdef96a972f:0xbc00828bfb1302b1!8m2!3d25.116596!4d55.223913!16s%2Fg%2F11ky4h42vg?entry=ttu",
  },
  {
    name: "Abu Dhabi",
    lat: 24.4539,
    lng: 54.3773,
    url: "https://google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Abu+Dhabi+Branch/data=!4m2!3m1!1s0x0:0x240c2ef83a9e23d6?sa=X&ved=1t:2428&ictx=111",
  },
  {
    name: "Sharjah",
    lat: 25.3492232,
    lng: 55.6497402,
    url: "https://www.google.com/maps/place/Lapiz+Blue+General+Trading+LLC+-+Sharjah+Branch/@25.3492232,55.6497402,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef5f3e6ac46ac73:0x684ebefeb76de0ce!8m2!3d25.3492232!4d55.6497402!16s%2Fg%2F11x7xg6svq?entry=ttu",
  },
];

const DUBAI_URL = BRANCHES.find(b => b.name === "Dubai")!.url;
const WITHIN_KM = 100;

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function LocationButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!("geolocation" in navigator)) {
      window.open(DUBAI_URL, "_blank", "noopener,noreferrer");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        let nearest = BRANCHES[0];
        let min = distanceKm(user, nearest);

        for (let i = 1; i < BRANCHES.length; i++) {
          const d = distanceKm(user, BRANCHES[i]);
          if (d < min) {
            min = d;
            nearest = BRANCHES[i];
          }
        }

        const targetUrl = min <= WITHIN_KM ? nearest.url : DUBAI_URL;
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      },
      () => {
        window.open(DUBAI_URL, "_blank", "noopener,noreferrer");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  return (
    <button
      onClick={handleClick}
      className="mb-6 sm:mb-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative cursor-pointer hover:scale-105 transition-transform"
      aria-label="Visit Us - Find nearest location"
    >
      <Image
        src="/images/icons/contact/location.svg"
        alt="Find store icon"
        fill
        className="object-contain"
      />
    </button>
  );
}
