"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GiftPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const getQ = () => {
    if (typeof window === "undefined") return 1;
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("q") || "1");
  };

  const q = getQ();

  const play = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      await v.play();
      setPlaying(true);
    } catch {}
  };

 return (
  <main className="w-screen h-screen bg-black relative overflow-hidden">

    {/* VIDEO BACKDROP */}
    <video
      ref={videoRef}
      src="/videos/gift.mp4"
      className="w-full h-full object-cover"
      playsInline
    />

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/40" />

    {/* CENTER CTA */}
    {!playing && (
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={play}
          className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full shadow-2xl hover:scale-105 transition"
        >
          🎁 Open Your Gift
        </button>
      </div>
    )}

    {/* NEXT BUTTON */}
    {playing && (
      <button
        onClick={() => router.push(`/episode?q=${q}`)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-white text-black font-bold rounded-full shadow-lg"
      >
        Next Question →
      </button>
    )}

  </main>
);
}
