"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GiftPage() {
  const router = useRouter();
  const params = useSearchParams();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const q = params.get("q");

  const play = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      await v.play();
      setPlaying(true);
    } catch {}
  };

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
          onClick={() => router.push(`/birthday-twist?q=${q}`)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black rounded-full"
        >
          Continue →
        </button>
      )}

    </main>
  );
}
