"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GiftPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const startVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // REQUIRED FOR iOS
      video.muted = false;
      video.currentTime = 0;

      await video.play();
      setPlaying(true);
    } catch (err) {
      console.log("Video play blocked:", err);
    }
  };

  return (
    <main className="relative w-screen h-screen bg-black flex items-center justify-center">

      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/videos/gift.mp4"
        className="w-full h-full object-cover"
        playsInline
        controls={false}
        preload="auto"
      />

      {/* PLAY BUTTON (iOS SAFE TRIGGER) */}
      {!playing && (
        <button
          onClick={startVideo}
          className="
            absolute
            z-10
            px-8 py-4
            bg-yellow-400
            text-black
            font-bold
            rounded-full
            shadow-lg
          "
        >
          ▶ Play Gift
        </button>
      )}

      {/* BACK BUTTON AFTER PLAY */}
      {playing && (
        <button
          onClick={() => router.push("/episode")}
          className="
            absolute
            bottom-10
            z-10
            px-8 py-3
            bg-white
            text-black
            font-bold
            rounded-full
          "
        >
          Next Episode →
        </button>
      )}

    </main>
  );
}
