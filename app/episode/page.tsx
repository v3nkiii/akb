"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

const MAX = 14;

export default function EpisodePage() {
  const router = useRouter();

  const [q, setQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("q") || "1") - 1;

    setQ(Math.max(0, Math.min(index, MAX - 1)));
    setSelected(null);
    setLocked(false);
  }, []);

  const question = questions[q];

  if (!question) {
    router.replace("/final-video");
    return null;
  }

  const next = q + 1;
  const isLast = next >= MAX;
  const correct = selected === question.correctAnswer;

  const handleContinue = () => {
    if (selected === null || locked) return;

    setLocked(true);

    if (isLast) {
      router.push("/final-video");
      return;
    }

    router.push(
      correct
        ? `/gift?q=${next + 1}`
        : `/birthday-twist?q=${next + 1}`
    );
  };

  return (
    <main className="w-screen h-screen relative flex items-center justify-center text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/backgrounds/akb-stage.png')",
          backgroundSize: "cover",
          filter: "brightness(0.35) blur(5px)",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 w-[90%] max-w-2xl text-center">

        <h1 className="text-2xl text-yellow-300 mb-3">
          Question {q + 1}
        </h1>

        <p className="mb-6">{question.question}</p>

        <div className="grid grid-cols-2 gap-4">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`p-3 border rounded ${
                selected === i
                  ? "bg-yellow-400 text-black"
                  : "border-yellow-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {selected !== null && (
          <button
            onClick={handleContinue}
            className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-full"
          >
            Continue
          </button>
        )}

      </div>
    </main>
  );
}
