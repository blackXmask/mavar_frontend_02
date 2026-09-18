import type { ReactNode } from "react";

export function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div>
        <h2 className="label text-[11px] text-text-secondary">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-[12px] text-text-muted">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}

export function StatusBadge({
  label,
  text,
  dot,
  bg,
  pulse,
}: {
  label: string;
  text: string;
  dot: string;
  bg: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-[3px] text-[11px] font-medium ${text} ${bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot} ${pulse ? "animate-pulse-dot" : ""}`} />
      {label}
    </span>
  );
}

export function ProgressBar({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={`h-1 w-full overflow-hidden rounded-full bg-white/[0.06] ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-violet transition-all duration-700 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function Sparkline({ data }: { data: number[] }) {
  const w = 72;
  const h = 20;
  const max = Math.max(...data, 1);
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 2) - 1}`)
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke="#4D7CFE"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}
