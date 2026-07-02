"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GiftPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setStarted(true);
    } catch (e) {
      console.log("Video blocked:", e);
    }
  };

  return (
    <main className="w-screen h-screen bg-black flex items-center justify-center relative">

      <video
        ref={videoRef}
        src="/videos/gift.mp4"
        className="w-full h-full object-cover"
        playsInline
        controls={false}
      />

      {!started && (
        <button
          onClick={playVideo}
          className="absolute z-10 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full"
        >
          Open Gift 🎁
        </button>
      )}

      {started && (
        <button
          onClick={() => router.push("/birthday-twist")}
          className="absolute bottom-10 z-10 px-6 py-3 bg-white text-black rounded-full"
        >
          Next →
        </button>
      )}

    </main>
  );
}
