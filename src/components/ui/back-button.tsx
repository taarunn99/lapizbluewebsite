"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href = "/brands", label = "Back" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the specified href
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center text-gray-600 hover:text-[#406E8E] transition-colors"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </button>
  );
}
