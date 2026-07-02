"use client";

import { useRef, useState } from "react";

export default function FinalVideoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  function startVideo() {
    const video = videoRef.current;

    // 🛑 SAFETY CHECK (THIS PREVENTS YOUR ERROR)
    if (!video) return;

    try {
      video.muted = false;
      video.volume = 1;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // fallback silently (mobile/browser restrictions)
        });
      }

      setStarted(true);
    } catch (err) {
      console.log("Video failed to start", err);
    }
  }

  return (
    <main style={pageStyle}>

      {/* FULLSCREEN VIDEO */}
      <video
        ref={videoRef}
        src="/videos/final.mp4"
        style={videoStyle}
        playsInline
      />

      {/* OVERLAY BUTTON (BEFORE START) */}
      {!started && (
        <div style={overlay}>
          <button onClick={startVideo} style={btn}>
            Wishes ✨
          </button>
        </div>
      )}

    </main>
  );
}

/* ================= STYLES ================= */

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.5)",
};

const btn: any = {
  padding: "14px 26px",
  background: "#FFD54A",
  border: "none",
  borderRadius: "20px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};