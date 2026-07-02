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
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white">

      <div className="p-6 border border-yellow-400 w-[80%] text-center">
        {dare || "Press Start"}
      </div>

      {!rolling && (
        <button
          onClick={start}
          className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-full"
        >
          Start Roll
        </button>
      )}

      {!rolling && dare && (
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-3 bg-white text-black rounded-full"
        >
          Back →
        </button>
      )}

    </main>
  );
}
