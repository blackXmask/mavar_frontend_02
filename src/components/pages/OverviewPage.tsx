import { Bot, Radar, ShieldAlert, Activity, ChevronRight } from "lucide-react";
import { useStore } from "../../store/useStore";
import { STATUS_MAP, EXECUTION_STAGES } from "../../data/missions";
import { FINDINGS } from "../../data/extras";
import { ProgressBar, StatusBadge } from "../primitives";
import type { AppPhase } from "../../data/types";

function stageOf(phase: AppPhase) {
  return phase === "running" ? 4 : 0;
}

function Metric({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: typeof Bot;
  value: string | number;
  label: string;
  tone: string;
}) {
  return (
    <div className="panel flex items-center gap-3 p-3.5">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-base-800/70 ${tone}`}>
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <p className="font-sans text-lg font-semibold leading-none text-text-primary">{value}</p>
        <p className="mt-1 truncate text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      </div>
    </div>
  );
}

export function OverviewPage() {
  const agents = useStore((s) => s.agents);
  const missions = useStore((s) => s.missions);
  const phase = useStore((s) => s.phase);
  const setNav = useStore((s) => s.setNav);
  const activeAgents = agents.filter((a) => a.status === "active").length;
  const activeMissions = missions.filter((m) => m.status === "running" || m.status === "analyzing").length;
  const stage = stageOf(phase);

  return (
    <div className="space-y-5 px-4 py-5 md:px-6">
      <div>
        <h1 className="font-sans text-lg font-bold text-text-primary md:text-xl">Workspace Overview</h1>
        <p className="mt-0.5 text-[12.5px] text-text-muted">
          Live state of your autonomous workspace · region eu-central-1
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Metric icon={Radar} value={12} label="Total Agents" tone="text-accent-blue" />
        <Metric icon={Bot} value={activeAgents} label="Agents Active" tone="text-accent-green" />
        <Metric icon={Activity} value={activeMissions} label="Missions in Flight" tone="text-accent-violet" />
        <Metric icon={ShieldAlert} value={FINDINGS.filter((f) => f.severity === "critical").length} label="Critical Findings" tone="text-accent-red" />
      </div>

      <section className="panel p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="label text-[11px] text-text-secondary">Execution Pipeline</h2>
          <StatusBadge
            label={phase === "running" ? "Mission executing" : "Standby"}
            text={phase === "running" ? "text-accent-green" : "text-text-muted"}
            dot={phase === "running" ? "bg-accent-green" : "bg-text-faint"}
            bg={phase === "running" ? "bg-accent-green/10" : "bg-white/[0.04]"}
            pulse={phase === "running"}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {EXECUTION_STAGES.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <span
                className={`rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  i < stage
                    ? "border-accent-green/40 bg-accent-green/10 text-accent-green"
                    : i === stage && phase === "running"
                    ? "border-accent-blue/50 bg-accent-blue/15 text-text-primary"
                    : "border-line text-text-muted"
                }`}
              >
                {s}
              </span>
              {i < EXECUTION_STAGES.length - 1 && (
                <span className={i < stage ? "text-accent-green/70" : "text-text-faint"}>→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="label text-[11px] text-text-secondary">Mission Progress</h2>
          <button
            onClick={() => setNav("missions")}
            className="flex items-center gap-1 text-[11px] text-text-muted transition-colors hover:text-accent-cyan"
          >
            View all <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {missions.map((m) => {
            const st = STATUS_MAP[m.status];
            return (
              <div key={m.id} className="panel p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[12.5px] font-semibold text-text-primary">
                    {m.title} <span className="font-normal text-text-muted">— {m.target}</span>
                  </p>
                  <StatusBadge {...st} pulse={m.status === "running"} />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[10.5px] text-text-muted">
                  <span>{m.scope}</span>
                  <span className="font-mono text-text-secondary">{m.progress}%</span>
                </div>
                <ProgressBar value={m.progress} className="mt-1.5" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
