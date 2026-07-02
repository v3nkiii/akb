"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dares } from "@/data/dares";

export default function BirthdayTwist() {
  const router = useRouter();

  const [dare, setDare] = useState("");
  const [rolling, setRolling] = useState(false);

  const start = () => {
    setRolling(true);

    let count = 0;

    const interval = setInterval(() => {
      setDare(dares[Math.floor(Math.random() * dares.length)]);
      count++;

      if (count > 20) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 70);
  };

return (
  <main className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">

    {/* BACKDROP GLOW */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black opacity-80" />

    {/* TITLE */}
    <h1 className="text-4xl font-bold text-pink-400 z-10 drop-shadow-lg">
      🎲 Birthday Twist
    </h1>

    {/* DARE CARD */}
    <div className="mt-6 w-[85%] max-w-xl p-8 border border-pink-500 rounded-2xl bg-white/5 backdrop-blur-md text-center text-xl z-10 shadow-2xl">
      {dare || "Press Start to Reveal Dare"}
    </div>

    {/* START BUTTON */}
    {!rolling && (
      <button
        onClick={start}
        className="mt-6 px-8 py-3 bg-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition z-10"
      >
        Start Roll 🎲
      </button>
    )}

    {/* BACK BUTTON */}
    {!rolling && dare && (
      <button
        onClick={() => router.back()}
        className="mt-4 px-6 py-3 bg-white text-black font-bold rounded-full z-10"
      >
        Back →
      </button>
    )}

  </main>
);
}
