"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (pathname === "/" || pathname === "/about") {
      audio.loop = true;
      audio.volume = 0.5;

      if (started) {
        audio.play().catch(() => {});
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [pathname, started]);

  function startMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    audio.play().then(() => {
      setStarted(true);
    }).catch(() => {});
  }

  return (
    <>
      {/* AUDIO ENGINE */}
      <audio ref={audioRef} src="/sounds/intro.mp3" />

      {/* ✅ ONLY SHOW BUTTON ON LANDING PAGE */}
      {pathname === "/" && !started && (
        <button
          onClick={startMusic}
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 9999,
            padding: "10px 14px",
            borderRadius: "10px",
            background: "#FFD54A",
            fontWeight: "bold",
            border: "none",
          }}
        >
          ▶ Start Music
        </button>
      )}
    </>
  );
}