import { useEffect, useRef, useState } from "react";
import { ChevronDown, Plus, Play, Square } from "lucide-react";
import { useStore } from "../store/useStore";
import type { ExecMode } from "../data/types";

const MODES: ExecMode[] = ["Autonomous", "Supervised", "Planning Only"];

export function MissionComposer() {
  const composer = useStore((s) => s.composer);
  const setComposer = useStore((s) => s.setComposer);
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const runMission = useStore((s) => s.runMission);
  const phase = useStore((s) => s.phase);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      runMission();
    }
  };

  return (
    <div
      ref={ref}
      className={`panel group relative flex flex-col gap-3 p-3 transition-shadow duration-300 focus-within:shadow-glow sm:flex-row sm:items-end ${
        open ? "shadow-glow" : ""
      }`}
    >
      <span className="mb-0 flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-lg border border-line bg-base-800/70 sm:mb-3 sm:self-auto">
        <Plus className="h-4 w-4 text-accent-cyan" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1 py-1">
        <textarea
          ref={taRef}
          rows={1}
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Describe your mission..."
          className="max-h-32 w-full resize-none bg-transparent text-[14px] text-text-primary outline-none placeholder:text-text-muted"
        />
        <p className="mt-1 truncate text-[12px] text-text-faint">
          e.g. Scan target.com, map the attack surface, find exposed APIs, analyze risks...
        </p>
      </div>

      <div className="relative flex w-full shrink-0 items-center sm:mb-1 sm:w-auto">
        <button
          onClick={runMission}
          className="flex items-center gap-2 rounded-lg rounded-r-none border border-accent-blue/50 bg-gradient-to-b from-accent-blue/90 to-accent-indigo/80 px-4 py-2 text-[13px] font-semibold text-white shadow-glow transition-all hover:brightness-110"
        >
          {phase === "running" ? (
            <Square className="h-3.5 w-3.5" strokeWidth={2} />
          ) : (
            <Play className="h-3.5 w-3.5" strokeWidth={2} />
          )}
          {phase === "running" ? "Mission Running" : "Run Mission"}
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-[36px] items-center rounded-lg rounded-l-none border border-l-0 border-accent-blue/50 bg-gradient-to-b from-accent-blue/90 to-accent-indigo/80 px-2 text-white transition-all hover:brightness-110"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>
        {open && (
          <div className="absolute bottom-full right-0 z-30 mb-2 w-44 overflow-hidden rounded-lg border border-line bg-base-800 shadow-lift">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-[12px] transition-colors hover:bg-white/[0.05] ${
                  m === mode ? "text-accent-cyan" : "text-text-secondary"
                }`}
              >
                {m}
                {m === mode && <span className="h-1 w-1 rounded-full bg-accent-cyan" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
