import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import type { TerminalLine } from "../data/types";

const TAG_STYLE: Record<TerminalLine["tag"], string> = {
  sys: "text-accent-violet",
  ok: "text-accent-green",
  run: "text-accent-cyan",
  net: "text-accent-blue",
  warn: "text-accent-amber",
  err: "text-accent-red",
};

const TAG_PREFIX: Record<TerminalLine["tag"], string> = {
  sys: "»",
  ok: "✓",
  run: "▸",
  net: "·",
  warn: "!",
  err: "✗",
};

export function TerminalOutput() {
  const lines = useStore((s) => s.lines);
  const phase = useStore((s) => s.phase);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);

  return (
    <div className="relative h-full min-h-0">
      <div className="terminal-scroll h-full overflow-y-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="flex min-w-0 gap-3 animate-fadeup">
            <span className="shrink-0 text-text-faint">[{l.t}]</span>
            <span className={`shrink-0 ${TAG_STYLE[l.tag]}`}>{TAG_PREFIX[l.tag]}</span>
            <span className="min-w-0 break-words text-text-secondary">{l.text}</span>
          </div>
        ))}
        {phase === "running" && (
          <div className="flex gap-3">
            <span className="shrink-0 text-text-faint">[--:--:--]</span>
            <span className="h-4 w-2 animate-blink-caret bg-accent-cyan/80" />
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-base-900 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-base-900 to-transparent" />
    </div>
  );
}
