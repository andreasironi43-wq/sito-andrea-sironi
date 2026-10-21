import type { DropStatus } from "@/lib/commerce";

export default function StatusTag({ status, label }: { status: DropStatus; label: string }) {
  const on = status === "open";
  return (
    <p className={`mono inline-flex items-center gap-2 ${on ? "text-signal" : "text-muted"}`}>
      <span aria-hidden="true" className={`inline-block size-1.5 ${on ? "bg-signal" : "border border-muted"}`} />
      {label}
    </p>
  );
}
