"use client";

import { useEffect, useRef } from "react";
import { initCycleScene } from "@/lib/cycleScene";

export default function CycleSceneDriver({ counts }: { counts: number[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest(".act") as HTMLElement | null;
    if (!root) return;
    return initCycleScene(root, counts);
  }, [counts]);
  return <span ref={ref} hidden />;
}
