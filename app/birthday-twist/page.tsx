"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dares } from "@/data/dares";

export default function BirthdayTwist() {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(true);
  const [dare, setDare] = useState("");
  const [rolling, setRolling] = useState(false);
  const [done, setDone] = useState(false);

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
      setDare(dares[Math.floor(Math.random() * dares.length)]);
      count++;

      if (count > 25) {
        clearInterval(interval);
        setRolling(false);
        setDone(true);
      }
    }, 70);
  };

  const playMusic = () => {
    const audio = new Audio("/sounds/twist.mp3");
    audio.play();
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black text-white relative">

      {showPopup ? (
        <img
          src="/birthday-twist.png"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-center">

          <div className="p-6 border border-pink-500 rounded-xl bg-white/5">
            {dare}
          </div>

          <button
            onClick={playMusic}
            className="mt-4 px-6 py-2 bg-pink-500 rounded-full"
          >
            🎵 Play Music
          </button>

          {done && (
            <button
              onClick={() => router.push("/gift")}
              className="mt-4 px-6 py-3 bg-white text-black rounded-full"
            >
              Complete →
            </button>
          )}

        </div>
      )}

    </main>
  );
}
