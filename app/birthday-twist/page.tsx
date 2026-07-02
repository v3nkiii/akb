"use client";

import { useEffect, useRef, useState } from "react";
import { dares } from "@/data/dares";
import Link from "next/link";

export default function BirthdayTwistPage() {
  const [finalDare, setFinalDare] = useState("");
  const [spinning, setSpinning] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);

  const musicRef = useRef<HTMLAudioElement | null>(null);

  // 🔥 SIMPLE RELIABLE ROLLER (NO GUARDS, NO BREAKAGE)
  useEffect(() => {
    const stored = localStorage.getItem("darePool");
    let remaining = stored ? JSON.parse(stored) : [...dares];

    if (remaining.length === 0) remaining = [...dares];

    let count = 0;

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * remaining.length);
      setFinalDare(remaining[index]);

      count++;

      if (count > 10) {
        clearInterval(interval);

        const selected = remaining[index];
        remaining.splice(index, 1);

        localStorage.setItem("darePool", JSON.stringify(remaining));

        setFinalDare(selected);
        setSpinning(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // 🎵 MUSIC
  function startMusic() {
    if (!musicRef.current) {
      musicRef.current = new Audio("/sounds/twist.mp3");
      musicRef.current.loop = true;
      musicRef.current.volume = 1;
    }

    musicRef.current.play().catch(() => {});
    setMusicStarted(true);
  }

  function stopMusic() {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  }

  return (
    <main style={pageStyle}>

      {/* BACKGROUND */}
      <div style={bgStyle} />
      <div style={overlayStyle} />

      {/* ONLY ONE BUTTON POSSIBLE */}
      {!musicStarted && (
        <div style={musicBtnWrap}>
          <button onClick={startMusic} style={musicBtn}>
            Start Music
          </button>
        </div>
      )}

      {/* CONTENT */}
      <div style={center}>

        <h1 style={title}>
          🎉 BIRTHDAY TWIST
        </h1>

        <div style={dareBox}>
          {finalDare}
        </div>

        {!spinning && (
          <Link
            href="/gift"
            onClick={stopMusic}
            style={btn}
          >
            COMPLETE →
          </Link>
        )}

      </div>

    </main>
  );
}

/* ================= STYLES ================= */

const pageStyle: any = {
  height: "100vh",
  width: "100vw",
  position: "relative",
  overflow: "hidden",
};

const bgStyle: any = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/backgrounds/akb-stage.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(6px) brightness(0.4)",
  transform: "scale(1.05)",
};

const overlayStyle: any = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.55)",
};

const center: any = {
  position: "relative",
  zIndex: 2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "25px",
};

const title: any = {
  fontSize: "42px",
  color: "#FFD54A",
};

const dareBox: any = {
  width: "900px",
  padding: "30px",
  borderRadius: "25px",
  border: "2px solid #FFD54A",
  background: "#0b1d3a",
  color: "white",
  fontSize: "24px",
  textAlign: "center",
};

const btn: any = {
  padding: "12px 22px",
  borderRadius: "18px",
  background: "#FFD54A",
  border: "none",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#111",
};

const musicBtnWrap: any = {
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: 50,
};

const musicBtn: any = {
  padding: "10px 14px",
  borderRadius: "20px",
  background: "#FFD54A",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};