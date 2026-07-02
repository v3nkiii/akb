"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
import { useRouter } from "next/navigation";

export default function EpisodePage() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const question = questions[index];

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play().catch(() => {});
  };

  const handleContinue = () => {
    if (selected === null || locked) return;

    setLocked(true);

    const isLast = index === questions.length - 1;
    const correct = selected === question.correctAnswer;

    if (isLast) {
      router.push("/gift");
      return;
    }

    if (correct) {
      playSound("/sounds/correct.mp3");
      router.push("/gift");
    } else {
      playSound("/sounds/cheers.mp3");
      router.push("/birthday-twist");
    }
  };

  return (
    <main className="w-screen h-screen relative overflow-hidden flex items-center justify-center text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-black">
        <div
          className="w-full h-full opacity-40"
          style={{
            backgroundImage: "url('/backgrounds/akb-stage.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(6px)",
            transform: "scale(1.05)",
          }}
        />
      </div>

      {/* GLASS CARD */}
      <div className="relative z-10 w-[90%] max-w-3xl text-center">

        <h1 className="text-4xl font-bold text-yellow-300 mb-4">
          Question {index + 1}
        </h1>

        <p className="text-xl mb-8">{question.question}</p>

        <div className="grid grid-cols-2 gap-5">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`p-4 rounded-xl border transition-all ${
                selected === i
                  ? "bg-yellow-400 text-black"
                  : "border-yellow-400 bg-white/5"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {selected !== null && (
          <button
            onClick={handleContinue}
            className="mt-8 px-8 py-3 bg-yellow-400 text-black font-bold rounded-full"
          >
            Continue →
          </button>
        )}

      </div>
    </main>
  );
}
