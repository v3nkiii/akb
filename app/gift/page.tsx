"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GiftPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [playing, setPlaying] = useState(false);

  // ✅ SAFE URL PARSE (NO useSearchParams)
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

  const goNext = () => {
    router.push(`/episode?q=${q}`);
  };

  useEffect(() => {
    setPlaying(false);
  }, []);

  return (
    <main className="w-screen h-screen bg-black relative">

      <video
        ref={videoRef}
        src="/videos/gift.mp4"
        className="w-full h-full object-cover"
        playsInline
      />

      {!playing && (
        <button
          onClick={play}
          className="absolute inset-0 m-auto px-6 py-3 bg-yellow-400 text-black rounded-full"
        >
          Open Gift 🎁
        </button>
      )}

      {playing && (
        <button
          onClick={goNext}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black rounded-full"
        >
          Next Question →
        </button>
      )}

    </main>
  );
}
