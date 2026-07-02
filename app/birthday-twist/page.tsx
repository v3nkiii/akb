"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { dares } from "@/data/dares";

export default function BirthdayTwist() {
  const router = useRouter();
  const params = useSearchParams();

  const q = params.get("q");

  const [dare, setDare] = useState("");
  const [rolling, setRolling] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
          onClick={() => router.push(`/episode?q=${q}`)}
          className="mt-4 px-6 py-3 bg-white text-black rounded-full"
        >
          Back →
        </button>
      )}

    </main>
  );
}
