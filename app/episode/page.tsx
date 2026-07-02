"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { questions } from "@/data/questions";

const MAX = 14;

export default function EpisodePage() {
  const router = useRouter();
  const params = useSearchParams();

  const q = Number(params.get("q") || "1") - 1;
  const question = questions[q];

  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /* ================= RESET ON QUESTION CHANGE ================= */
  useEffect(() => {
    setSelected(null);
    setLocked(false);
    setShowPopup(false);
  }, [q]);

  if (!question) {
    router.replace("/final-video");
    return null;
  }

  const handleContinue = () => {
    if (selected === null || locked) return;

    setLocked(true);

    const next = q + 1;
    const isLast = next >= MAX;
    const correct = selected === question.correctAnswer;

    // 🏁 FINAL QUESTION → ALWAYS GO FINAL VIDEO
    if (isLast) {
      router.push("/final-video");
      return;
    }

    // ❌ WRONG ANSWER FLOW (POPUP FIRST, THEN ROUTE)
    if (!correct) {
      setShowPopup(true);

      setTimeout(() => {
        router.push(`/birthday-twist?q=${next + 1}`);
      }, 1800);

      return; // 🚨 CRITICAL STOP (prevents double navigation)
    }

    // ✅ CORRECT ANSWER FLOW
    router.push(`/gift?q=${next + 1}`);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black text-white relative">

      {/* ================= POPUP ================= */}
      {showPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <img
            src="/birthday-twist.png"
            className="w-full h-full object-cover"
            alt="birthday twist"
          />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="w-[90%] max-w-2xl text-center">

        <h1 className="text-xl mb-4">
          Question {q + 1}
        </h1>

        <p className="mb-6">{question.question}</p>

        <div className="grid grid-cols-2 gap-4">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`p-3 border rounded ${
                selected === i ? "bg-yellow-400 text-black" : "border-yellow-400"
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
