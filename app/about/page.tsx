"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: "url('/backgrounds/akb-stage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(16px) brightness(0.18)",
          transform: "scale(1.04)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 -z-10" />

      <div className="flex h-full items-center justify-center px-4">

        <div className="flex flex-col items-center text-center gap-8">

          {/* Heading */}
          <p
            className="text-xl uppercase tracking-[0.25em] text-yellow-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Meet Today's Birthday Star
          </p>

          {/* PHOTO (FIXED) */}
          <img
            src="/photos/contestant.png"
            alt="Contestant"
            className="h-44 w-44 rounded-full border-[3px] border-yellow-400 object-cover shadow-xl"
          />

          {/* Name */}
          <div className="flex flex-col items-center gap-3">

            <h1
              className="text-5xl font-black text-white leading-none"
              style={{
                textShadow:
                  "0 0 8px rgba(255,255,255,0.18), 0 0 20px rgba(255,255,255,0.12), 0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              Apoorva Ashok Savant
            </h1>

            <p className="text-2xl font-semibold tracking-wide text-gray-200">
              Appu • Appy • Gundu
            </p>

          </div>

          {/* Details */}
          <div className="flex flex-col items-center gap-8">

            <Info title="Birthplace" value="Vashi, India" />
            <Info title="Profession" value="Chief Happiness Officer" />
            <Info title="Favourite Number" value="14" />
            <Info title="Favourite Colour" value="Green" />

          </div>

          {/* Mission */}
          <div className="flex flex-col items-center gap-3">

            <p className="text-3xl font-semibold text-yellow-300">
              Current Mission
            </p>

            <h2
              className="text-4xl font-bold text-emerald-400"
              style={{
                textShadow:
                  "0 0 10px rgba(16,185,129,.25), 0 2px 10px rgba(0,0,0,.8)",
              }}
            >
              Win Birthday Gifts
            </h2>

          </div>

          {/* Start Button */}
          <Link
            href="/episode"
            className="
              rounded-full
              border-2
              border-yellow-400
              bg-[#07183D]/90
              px-12
              py-4
              text-xl
              font-bold
              text-yellow-300
              shadow-[0_0_25px_rgba(212,175,55,.35)]
              transition-all
              duration-300
              hover:bg-[#0B255A]
              hover:scale-105
            "
          >
            ▶ START EPISODE
          </Link>

        </div>

      </div>

    </main>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">

      <p
        className="text-3xl font-semibold text-yellow-300"
        style={{
          textShadow: "0 0 8px rgba(212,175,55,.18)",
        }}
      >
        {title}
      </p>

      <p
        className="text-3xl font-semibold text-white leading-tight"
        style={{
          textShadow:
            "0 0 8px rgba(255,255,255,.12), 0 2px 8px rgba(0,0,0,.8)",
        }}
      >
        {value}
      </p>

    </div>
  );
}
