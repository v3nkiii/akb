"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      className="relative h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: "url('/backgrounds/akb-stage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* BUTTON WRAPPER */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: "clamp(65%, 72%, 78%)",
        }}
      >
        <Link
          href="/about"
          className="
            inline-flex
            items-center
            justify-center
            rounded-full
            border-[3px]
            border-yellow-400
            bg-[#07183D]/90
            px-8 sm:px-14
            py-3 sm:py-5
            text-xl sm:text-3xl
            font-bold
            text-yellow-300
            shadow-[0_0_35px_rgba(212,175,55,.45)]
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#0A255A]
            text-center
          "
        >
          ▶ START SHOW
        </Link>
      </div>
    </main>
  );
}
