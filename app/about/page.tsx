"use client";

import Link from "next/link";
import Typography from "@/components/Typography";

export default function AboutPage() {
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-center relative"
      style={{
        backgroundImage: "url('/backgrounds/akb-stage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-3xl">

        {/* ================= IMAGE ================= */}
        <img
          src="/photos/contestant.png"
          alt="Contestant"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #FFD54A",
            margin: "0 auto 20px auto",
          }}
        />

        {/* ================= TITLE ================= */}
        <Typography variant="h1" className="mb-4">
          The AKB Show 🎬
        </Typography>

        {/* ================= DESCRIPTION ================= */}
        <Typography variant="p" className="mb-8">
          A birthday game built with twists, challenges, and surprises.
          Answer questions, survive the chaos, and unlock the final reveal.
        </Typography>

        {/* ================= BUTTON ================= */}
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
