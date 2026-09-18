import { useState } from "react";
import { ArrowRight, Activity, X } from "lucide-react";
import { useStore } from "../store/useStore";
import { MissionCard } from "./MissionCard";
import { TerminalOutput } from "./TerminalOutput";
import { AgentGraph } from "./AgentGraph";
import { SectionHeader } from "./primitives";
import type { OutputTab } from "../data/types";

const TABS: { id: OutputTab; label: string }[] = [
  { id: "terminal", label: "Terminal" },
  { id: "logs", label: "Logs" },
  { id: "graph", label: "Graph" },
];

export function RightPanel({ onClose }: { onClose?: () => void }) {
  const missions = useStore((s) => s.missions);
  const lines = useStore((s) => s.lines);
  const phase = useStore((s) => s.phase);
  const [tab, setTab] = useState<OutputTab>("terminal");
  const logLines = lines.filter((l) => l.tag !== "net").slice(-24).reverse();

  return (
    <aside className="relative flex h-full w-[min(88vw,340px)] shrink-0 flex-col gap-4 overflow-y-auto border-l border-line bg-base-900/50 p-4 backdrop-blur-sm xl:w-[360px]">
      <button
        onClick={onClose}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:text-text-primary xl:hidden"
        aria-label="Close panel"
      >
        <X className="h-4 w-4" />
      </button>
      <section>
        <SectionHeader
          title="Active Missions"
          right={
            <button className="flex items-center gap-1 text-[11px] text-text-muted transition-colors hover:text-accent-cyan">
              View all
              <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </button>
          }
        />
        <div className="mt-3 space-y-2.5">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
        </div>
      </section>

      <section className="flex min-h-[380px] flex-1 flex-col">
        <SectionHeader
          title="Live Agent Output"
          subtitle={phase === "running" ? "Streaming agent activity" : "Awaiting mission"}
          right={
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent-cyan">
              <Activity className="h-3 w-3" strokeWidth={1.5} />
              live
            </span>
          }
        />
        <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-base-950/80">
          <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-md px-2.5 py-1 text-[11px] transition-colors ${
                  tab === t.id
                    ? "bg-accent-blue/15 text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {t.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-1.5 pr-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${phase === "running" ? "bg-accent-green animate-pulse-dot" : "bg-text-faint"}`} />
              <span className="font-mono text-[9px] uppercase text-text-faint">
                {phase === "running" ? "streaming" : "standby"}
              </span>
            </div>
          </div>
          <div className="min-h-0 flex-1">
            {tab === "terminal" && <TerminalOutput />}
            {tab === "logs" && (
              <div className="h-full overflow-y-auto p-3 font-mono text-[11px] leading-relaxed">
                {logLines.map((l, i) => (
                  <div key={i} className="flex gap-2 border-b border-line/40 py-1 last:border-0">
                    <span className="shrink-0 text-text-faint">{l.t}</span>
                    <span className={`min-w-0 break-words ${l.tag === "warn" ? "text-accent-amber" : "text-text-secondary"}`}>
                      [{l.tag.toUpperCase()}] {l.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {tab === "graph" && <AgentGraph />}
          </div>
        </div>
      </section>
    </aside>
  );
}
