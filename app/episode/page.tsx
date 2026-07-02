"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { questions } from "@/data/questions";

export default function EpisodePage() {
  const router = useRouter();
  const params = useSearchParams();

  const q = Number(params.get("q") || "1") - 1;
  const question = questions[q];

  const [selected, setSelected] = useState<number | null>(null);
  const [stage, setStage] = useState<
    "question" | "gift" | "twist"
  >("question");

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setSelected(null);
    setStage("question");
    setShowPopup(false);
  }, [q]);

  if (!question) {
    router.replace("/final-video");
    return null;
  }

  const next = q + 1;
  const isLast = next >= 14;
  const correct = selected === question.correctAnswer;

  /* ================= STEP 1: ANSWER ================= */
  const handleAnswer = () => {
    if (selected === null) return;

    if (isLast) {
      router.push("/final-video");
      return;
    }

    if (correct) {
      setStage("gift");
      return;
    }

    setStage("twist");
    setShowPopup(true);
  };

  /* ================= STEP 2: CONTINUE FROM GIFT ================= */
  const goFromGift = () => {
    router.push(`/episode?q=${next + 1}`);
  };

  /* ================= STEP 3: CONTINUE FROM TWIST ================= */
  const goFromTwist = () => {
    setShowPopup(false);
    setStage("gift");
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black text-white relative">

      {/* ================= POPUP ================= */}
      {showPopup && stage === "twist" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <img
            src="/birthday-twist.png"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ================= QUESTION ================= */}
      {stage === "question" && (
        <div className="text-center w-[90%] max-w-2xl">

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
              onClick={handleAnswer}
              className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-full"
            >
              Continue
            </button>
          )}

        </div>
      )}

      {/* ================= GIFT PAGE ================= */}
      {stage === "gift" && (
        <div className="text-center">
          <h1 className="mb-6 text-xl">🎁 Gift Unlocked</h1>

          <button
            onClick={goFromGift}
            className="px-6 py-3 bg-yellow-400 text-black rounded-full"
          >
            Next Question →
          </button>
        </div>
      )}

      {/* ================= TWIST CONTINUE ================= */}
      {stage === "twist" && showPopup && (
        <button
          onClick={goFromTwist}
          className="absolute bottom-10 px-6 py-3 bg-white text-black rounded-full z-50"
        >
          Continue →
        </button>
      )}

    </main>
  );
}
