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
  <main className="w-screen h-screen relative flex items-center justify-center text-white overflow-hidden">

    {/* BACKGROUND IMAGE */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url('/backgrounds/akb-stage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.35) blur(6px)",
        transform: "scale(1.05)",
      }}
    />

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/70" />

    {/* GLASS CARD */}
    <div className="relative z-10 w-[92%] max-w-3xl text-center">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-lg">
        Question {q + 1}
      </h1>

      <p className="mt-4 text-xl text-white/90">
        {question.question}
      </p>

      {/* OPTIONS GRID */}
      <div className="grid grid-cols-2 gap-5 mt-8">

        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`py-4 px-6 rounded-xl border transition-all duration-200 text-lg font-semibold ${
              selected === i
                ? "bg-yellow-400 text-black border-yellow-300 scale-105"
                : "bg-white/5 border-yellow-400 hover:bg-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* LIFELINES AREA */}
      <div className="mt-6 flex justify-center gap-4">
        {/* lifelines already added earlier will render here */}
      </div>

      {/* CONTINUE */}
      {selected !== null && (
        <button
          onClick={handleContinue}
          className="mt-8 px-10 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:scale-105 transition"
        >
          Continue →
        </button>
      )}

    </div>

  </main>
);
}
