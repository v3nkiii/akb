"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { dares } from "@/data/dares";

export default function BirthdayTwist() {
  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [showPopup, setShowPopup] = useState(true);
  const [rolling, setRolling] = useState(false);
  const [dare, setDare] = useState("");
  const [finalDare, setFinalDare] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // ✅ SAFE: read query param WITHOUT useSearchParams
  const getQ = () => {
    if (typeof window === "undefined") return 1;
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("q") || "1");
  };

  const q = getQ();

  // 🎬 STEP 1: popup → auto start roller
  useEffect(() => {
    const t = setTimeout(() => {
      setShowPopup(false);
      startRoll();
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  const startRoll = () => {
    setRolling(true);

    let count = 0;

    const interval = setInterval(() => {
      const random = dares[Math.floor(Math.random() * dares.length)];
      setDare(random);

      count++;

      if (count > 25) {
        clearInterval(interval);
        setRolling(false);
        setFinalDare(true);
      }
    }, 70);
  };

  // 🔊 MUSIC
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio("/audio/twist.mp3");
    audioRef.current = audio;
    audio.play();
    setMusicPlaying(true);
  };

  // 🎬 COMPLETE FLOW → back to gift
  const complete = () => {
    router.push(`/gift?q=${q}`);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* POPUP IMAGE */}
      {showPopup && (
        <div className="absolute inset-0 z-20">
          <img
            src="/birthday-twist.png"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      {!showPopup && (
        <div className="text-center z-10">

          {/* DARE BOX */}
          <div className="w-[85%] max-w-xl p-8 border border-pink-500 rounded-2xl bg-white/5 backdrop-blur-md text-xl">
            {dare || "Loading Dare..."}
          </div>

          {/* MUSIC BUTTON */}
          {!musicPlaying && (
            <button
              onClick={playMusic}
              className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full"
            >
              🎵 Start Music
            </button>
          )}

          {/* COMPLETE BUTTON */}
          {finalDare && (
            <button
              onClick={complete}
              className="mt-6 px-6 py-3 bg-white text-black rounded-full font-bold"
            >
              Complete →
            </button>
          )}

        </div>
      )}

    </main>
  );
}
