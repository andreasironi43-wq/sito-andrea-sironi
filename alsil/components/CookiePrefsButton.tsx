"use client";

import { OPEN_PREFS_EVENT } from "@/lib/consent";

export default function CookiePrefsButton({ className, label = "Preferenze cookie" }: { className?: string; label?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}>
      {label}
    </button>
  );
}
