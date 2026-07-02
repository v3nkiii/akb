"use client";

import { Suspense } from "react";
import EpisodeInner from "./episode-inner";

export default function EpisodePage() {
  return (
    <Suspense fallback={null}>
      <EpisodeInner />
    </Suspense>
  );
}
