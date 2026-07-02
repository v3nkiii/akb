"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GiftPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;
    video.muted = false; // ✅ FIX AUDIO
    video.volume = 1;

    video.play().catch(() => {});

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  function nextEpisode() {
    const current = Number(localStorage.getItem("episodeIndex") || "0");
    const next = current + 1;

    localStorage.setItem("episodeIndex", String(next));

    router.push("/episode");
  }

  return (
    <main style={pageStyle}>

      <video
        ref={videoRef}
        src="/videos/gift.mp4"
        autoPlay
        playsInline
        style={videoStyle}
      />

      <div style={overlay} />

      {showButton && (
        <div style={btnWrap}>
          <button onClick={nextEpisode} style={btn}>
            ▶ Next Episode
          </button>
        </div>
      )}

    </main>
  );
}

/* styles */

const pageStyle: any = {
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  background: "black",
};

const videoStyle: any = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const overlay: any = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.2)",
};

const btnWrap: any = {
  position: "absolute",
  bottom: "60px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const btn: any = {
  padding: "14px 24px",
  background: "#FFD54A",
  border: "none",
  borderRadius: "20px",
  fontWeight: "bold",
};