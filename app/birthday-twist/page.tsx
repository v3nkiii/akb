"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { dares } from "@/data/dares";

export default function BirthdayTwist() {
  const router = useRouter();

  const [dare, setDare] = useState("");
  const [rolling, setRolling] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🧠 SAFE URL parsing (NO useSearchParams)
  const getNextQ = () => {
    if (typeof window === "undefined") return 1;

    const params = new URLSearchParams(window.location.search);
    return Number(params.get("q") || "1");
  };

  const q = getNextQ();

  const start = () => {
    setRolling(true);

    let count = 0;

    intervalRef.current = setInterval(() => {
      const random = dares[Math.floor(Math.random() * dares.length)];
      setDare(random);

      count++;

      if (count > 20) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setRolling(false);
      }
    }, 70);
  };

  const goBack = () => {
    router.push(`/episode?q=${q}`);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
          onClick={goBack}
          className="mt-4 px-6 py-3 bg-white text-black rounded-full"
        >
          Back →
        </button>
      )}

    </main>
  );
}
