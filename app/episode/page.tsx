"use client";

import { useEffect, useRef, useState } from "react";
import { questions } from "@/data/questions";
import { useRouter } from "next/navigation";
import Typography from "@/components/Typography";

const MAX_EPISODES = 14;

export default function EpisodePage() {
  const router = useRouter();

  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [transition, setTransition] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lockRef = useRef(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    // always start fresh session
    sessionStorage.removeItem("episodeIndex");

    setEpisodeIndex(0);
    setSelected(null);
    setRevealed(false);
    setShowPopup(false);
    lockRef.current = false;

    setTransition(true);
    const t = setTimeout(() => setTransition(false), 800);

    return () => clearTimeout(t);
  }, []);

  const question = questions[episodeIndex];

  /* ================= SAFETY ================= */
  if (!question) {
    router.replace("/final-video");
    return null;
  }

  /* ================= AUDIO ================= */
  const playSound = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  /* ================= CHOOSE ================= */
  function chooseAnswer(i: number) {
    if (selected !== null) return;

    setSelected(i);
    playSound("/sounds/answer-locked.mp3");
  }

  /* ================= REVEAL ================= */
  function revealAnswer() {
    if (selected === null) return;
    if (lockRef.current) return;

    lockRef.current = true;
    setRevealed(true);

    const next = episodeIndex + 1;
    const isCorrect = selected === question.correctAnswer;
    const goFinal = next >= MAX_EPISODES;

    if (isCorrect) {
      playSound("/sounds/correct.mp3");

      setTimeout(() => {
        if (goFinal) {
          router.push("/final-video");
        } else {
          setEpisodeIndex(next);
          setSelected(null);
          setRevealed(false);
          lockRef.current = false;
        }
      }, 900);

      return;
    }

    playSound("/sounds/cheers.mp3");

    setTimeout(() => {
      setShowPopup(true);

      setTimeout(() => {
        if (goFinal) {
          router.push("/final-video");
        } else {
          setEpisodeIndex(next);
          setSelected(null);
          setRevealed(false);
          setShowPopup(false);
          lockRef.current = false;
        }
      }, 2000);
    }, 1000);
  }

  return (
    <main style={pageStyle}>
      <div style={bgImage} />
      <div style={overlay} />
      {transition && <div style={fadeOverlay} />}

      {showPopup && (
        <div style={popupOverlay}>
          <img
            src="/birthday-twist.png"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <div style={center}>
        <div style={container}>

          {/* ================= TITLE ================= */}
          <Typography variant="h2">
            EPISODE {episodeIndex + 1} / 14
          </Typography>

          {/* ================= PROGRESS BAR (RESTORED) ================= */}
          <div
            style={{
              height: "6px",
              background: "#222",
              borderRadius: "10px",
              marginTop: "10px",
              marginBottom: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((episodeIndex + 1) / 14) * 100}%`,
                background: "#FFD54A",
                transition: "width 0.5s ease",
              }}
            />
          </div>

          {/* ================= QUESTION ================= */}
          <div style={questionBox}>
            <Typography variant="p">
              {question.question}
            </Typography>
          </div>

          {/* ================= OPTIONS ================= */}
          <div style={grid}>
            {question.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = revealed && i === question.correctAnswer;
              const isWrong = revealed && isSelected && i !== question.correctAnswer;

              return (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => chooseAnswer(i)}
                  style={{
                    ...option,
                    ...(isSelected && !revealed ? selectedStyle : {}),
                    ...(isCorrect ? correctStyle : {}),
                    ...(isWrong ? wrongStyle : {}),
                  }}
                >
                  <b>{["A", "B", "C", "D"][i]}</b> {opt}
                </button>
              );
            })}
          </div>

          {!revealed && selected !== null && (
            <button onClick={revealAnswer} style={btn}>
              🎙 Reveal Answer
            </button>
          )}

        </div>
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const pageStyle: any = {
  height: "100vh",
  width: "100vw",
  position: "relative",
  overflow: "hidden",
};

const bgImage: any = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/backgrounds/akb-stage.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(7px) brightness(0.35)",
  transform: "scale(1.05)",
};

const overlay: any = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
};

const fadeOverlay: any = {
  position: "absolute",
  inset: 0,
  background: "black",
  animation: "fadeOut 0.8s forwards",
  zIndex: 2,
};

const popupOverlay: any = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
};

const center: any = {
  position: "relative",
  zIndex: 3,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const container: any = {
  width: "90%",
  maxWidth: "900px",
  textAlign: "center",
  color: "white",
};

const questionBox: any = {
  padding: "20px",
  background: "#0b1d3a",
  borderRadius: "25px",
  border: "2px solid #FFD54A",
  marginBottom: "25px",
};

const grid: any = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
};

const option: any = {
  padding: "14px",
  borderRadius: "22px",
  border: "2px solid #FFD54A",
  background: "#0b1d3a",
  color: "white",
  cursor: "pointer",
};

const selectedStyle: any = {
  background: "#F7D54A",
  color: "#111",
};

const correctStyle: any = {
  background: "#2ecc71",
  color: "#111",
};

const wrongStyle: any = {
  background: "#ff4d4d",
  color: "#fff",
};

const btn: any = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "#FFD54A",
  borderRadius: "18px",
  border: "none",
  fontWeight: "bold",
};
