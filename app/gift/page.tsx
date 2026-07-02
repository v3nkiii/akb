"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GiftPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    try {
      await videoRef.current?.play();
      setPlaying(true);
    } catch {}
  };

  return (
    <main className="w-screen h-screen bg-black relative overflow-hidden">

      <video
        ref={videoRef}
        src="/animations/finalvideo.mp4"
        className="w-full h-full object-cover"
        playsInline
      />

      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={play}
            className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full"
          >
            🎁 Open Gift
          </button>
        </div>
      )}

      {playing && (
        <button
          onClick={() => router.push("/episode")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black rounded-full"
        >
          Next Question →
        </button>
      )}

    </main>
  );
}
