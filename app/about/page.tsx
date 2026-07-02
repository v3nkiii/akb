"use client";

import Typography from "@/components/Typography";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-center"
      style={{
        backgroundImage: "url('/backgrounds/akb-stage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-3xl">
        
        <Typography variant="h1" className="mb-4">
          The AKB Show 🎬
        </Typography>

        <Typography variant="p" className="mb-8">
          Welcome to the most chaotic birthday game ever.
          Answer correctly, survive the twists, and unlock the final surprise.
        </Typography>

        <Link
          href="/episode"
          className="
            inline-flex
            items-center
            justify-center
            rounded-full
            border-[3px]
            border-yellow-400
            bg-[#07183D]/90
            px-10 sm:px-14
            py-3 sm:py-5
            text-lg sm:text-2xl
            font-bold
            text-yellow-300
            shadow-[0_0_35px_rgba(212,175,55,.45)]
            transition-all
            hover:scale-105
          "
        >
          ▶ START EPISODES
        </Link>

      </div>
    </main>
  );
}
