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
      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute left-1/2 top-[76%] -translate-x-1/2">
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
            px-14
            py-5
            text-3xl
            font-bold
            text-yellow-300
            shadow-[0_0_35px_rgba(212,175,55,.45)]
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[#0A255A]
          "
        >
          ▶ START SHOW
        </Link>
      </div>
    </main>
  );
}