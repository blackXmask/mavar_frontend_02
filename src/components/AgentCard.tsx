import { Crosshair, Radio, Network, Shield, Terminal, Loader2 } from "lucide-react";
import type { Agent, AgentIcon } from "../data/types";
import { Sparkline, StatusBadge } from "./primitives";

const ICONS: Record<AgentIcon, typeof Crosshair> = {
  radar: Crosshair,
  terminal: Terminal,
  network: Network,
  shield: Shield,
};

const STATUS: Record<
  Agent["status"],
  { label: string; text: string; dot: string; bg: string }
> = {
  active: { label: "Active", text: "text-accent-green", dot: "bg-accent-green", bg: "bg-accent-green/10" },
  idle: { label: "Idle", text: "text-text-muted", dot: "bg-text-faint", bg: "bg-white/[0.04]" },
  preparing: { label: "Preparing", text: "text-accent-amber", dot: "bg-accent-amber", bg: "bg-accent-amber/10" },
  failed: { label: "Failed", text: "text-accent-red", dot: "bg-accent-red", bg: "bg-accent-red/10" },
};

export function AgentCard({ agent }: { agent: Agent }) {
  const Icon = ICONS[agent.icon];
  const st = STATUS[agent.status];
  const active = agent.status === "active";
  return (
    <div className="panel group flex h-full flex-col p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift md:p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${active ? "border-accent-blue/40 bg-accent-blue/10" : "border-line bg-base-800/70"}`}>
            <Icon className={`h-4 w-4 ${active ? "text-accent-blue" : "text-text-muted"}`} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-text-primary">{agent.name}</p>
            <p className="text-[11px] text-text-muted">{agent.role}</p>
          </div>
        </div>
        <StatusBadge {...st} pulse={active} />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-md border border-line bg-base-800/40 px-3 py-1.5">
        <span className="text-[10px] uppercase tracking-wider text-text-muted">Target</span>
        <span className="font-mono text-[11px] text-accent-cyan">{agent.target}</span>
      </div>

      <div className="mt-3 flex-1 space-y-1.5">
        {agent.tasks.slice(0, 3).map((t, i) => (
          <div key={t} className="flex items-center gap-2 text-[12px] text-text-secondary">
            {active ? (
              <Loader2 className={`h-3 w-3 shrink-0 animate-spin text-accent-blue ${i > 0 ? "opacity-60" : ""}`} strokeWidth={2} />
            ) : (
              <span className="h-1 w-1 shrink-0 rounded-full bg-text-faint" />
            )}
            <span className="min-w-0 truncate">{t}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <div className="flex items-center gap-2">
          <span className={`text-[12px] font-medium ${active ? "text-accent-green" : "text-text-muted"}`}>
            {agent.taskCount} tasks {active ? "running" : "running"}
          </span>
          <span className="hidden items-center gap-1 rounded border border-line px-1.5 py-px font-mono text-[9px] uppercase text-text-muted xl:inline-flex">
            {agent.tools[0]}
          </span>
        </div>
        <Sparkline data={agent.spark} />
      </div>
    </div>
  );
}
