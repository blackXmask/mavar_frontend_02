import { Crosshair, Terminal, Network, Shield, Pause, Settings2, RefreshCw, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useStore } from "../../store/useStore";
import type { AgentIcon } from "../../data/types";
import { StatusBadge, Sparkline } from "../primitives";

const ICONS: Record<AgentIcon, LucideIcon> = {
  radar: Crosshair,
  terminal: Terminal,
  network: Network,
  shield: Shield,
};

const STATUS: Record<string, { label: string; text: string; dot: string; bg: string }> = {
  active: { label: "Active", text: "text-accent-green", dot: "bg-accent-green", bg: "bg-accent-green/10" },
  idle: { label: "Idle", text: "text-text-muted", dot: "bg-text-faint", bg: "bg-white/[0.04]" },
  preparing: { label: "Preparing", text: "text-accent-amber", dot: "bg-accent-amber", bg: "bg-accent-amber/10" },
  failed: { label: "Failed", text: "text-accent-red", dot: "bg-accent-red", bg: "bg-accent-red/10" },
};

const TOTAL_RUNS: Record<string, number> = { recon: 128, webhunter: 94, osint: 76, security: 41 };

export function AgentsPage() {
  const agents = useStore((s) => s.agents);

  return (
    <div className="space-y-4 px-4 py-5 md:px-6">
      <div>
        <h1 className="font-sans text-lg font-bold text-text-primary md:text-xl">Agents</h1>
        <p className="mt-0.5 text-[12.5px] text-text-muted">
          Specialized autonomous workers registered with the orchestrator
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {agents.map((a) => {
          const Icon = ICONS[a.icon];
          const st = STATUS[a.status];
          const active = a.status === "active";
          return (
            <div key={a.id} className="panel p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                      active ? "border-accent-blue/40 bg-accent-blue/10" : "border-line bg-base-800/70"
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 h-5 w-5 ${active ? "text-accent-blue" : "text-text-muted"}`} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold text-text-primary">{a.name}</p>
                    <p className="truncate text-[11.5px] text-text-muted">{a.role}</p>
                  </div>
                </div>
                <StatusBadge {...st} pulse={active} />
              </div>

              <div className="mt-3 flex items-center justify-between rounded-md border border-line bg-base-800/40 px-3 py-1.5">
                <span className="text-[10px] uppercase tracking-wider text-text-muted">Target</span>
                <span className="truncate font-mono text-[11px] text-accent-cyan">{a.target}</span>
              </div>

              <div className="mt-3 space-y-1.5">
                {a.tasks.map((t) => (
                  <div key={t} className="flex items-center gap-2 text-[12px] text-text-secondary">
                    {active ? (
                      <RefreshCw className="h-3 w-3 shrink-0 animate-spin text-accent-blue" strokeWidth={2} />
                    ) : (
                      <span className="h-1 w-1 shrink-0 rounded-full bg-text-faint" />
                    )}
                    <span className="min-w-0 truncate">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <Layers className="h-3 w-3 text-text-faint" strokeWidth={1.5} />
                {a.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-line bg-base-800/60 px-1.5 py-px font-mono text-[9.5px] uppercase tracking-wide text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <div className="flex items-center gap-4 text-[11.5px] text-text-muted">
                  <span>
                    <span className={active ? "text-accent-green" : "text-text-primary"}>{a.taskCount}</span> running
                  </span>
                  <span>
                    <span className="text-text-primary">{TOTAL_RUNS[a.id] ?? 0}</span> total runs
                  </span>
                  <span>99.7% uptime</span>
                </div>
                <Sparkline data={a.spark} />
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  disabled={!active}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-base-800/60 px-3 py-1.5 text-[11.5px] text-text-secondary transition-colors hover:border-accent-amber/40 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Pause className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Pause
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-base-800/60 px-3 py-1.5 text-[11.5px] text-text-secondary transition-colors hover:border-accent-blue/40 hover:text-text-primary">
                  <Settings2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Configure
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
