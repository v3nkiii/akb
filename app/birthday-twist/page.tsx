"use client";

import { Suspense } from "react";
import BirthdayTwistInner from "./twist-inner";

export default function BirthdayTwistPage() {
  return (
    <Suspense fallback={null}>
      <BirthdayTwistInner />
    </Suspense>
  );
}
