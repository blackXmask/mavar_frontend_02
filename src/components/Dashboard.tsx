import { useMemo } from "react";
import { Sparkles, ShieldAlert, Bot, Radar, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "../store/useStore";
import { MissionComposer } from "./MissionComposer";
import { QuickMissions } from "./QuickMissions";
import { AgentCard } from "./AgentCard";
import { MissionTable } from "./MissionTable";
import { SectionHeader } from "./primitives";
import { EXECUTION_STAGES } from "../data/missions";
import {
  OverviewPage,
  HistoryPage,
  AgentsPage,
  IntelligencePage,
  ToolsPage,
  LogsPage,
  SettingsPage,
} from "./pages";

function NetworkBackdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]" aria-hidden>
      <defs>
        <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M 42 0 L 0 0 0 42" fill="none" stroke="rgba(99,125,180,0.35)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <g stroke="rgba(77,124,254,0.4)" strokeWidth="0.7">
        <line x1="18%" y1="20" x2="34%" y2="60" />
        <line x1="34%" y1="60" x2="52%" y2="26" />
        <line x1="52%" y1="26" x2="70%" y2="66" />
        <line x1="70%" y1="66" x2="86%" y2="30" />
      </g>
      <g fill="#4D7CFE">
        {[[18, 20], [34, 60], [52, 26], [70, 66], [86, 30]].map(([x, y], i) => (
          <circle key={i} cx={`${x}%`} cy={y} r="1.6" />
        ))}
      </g>
    </svg>
  );
}

function Metric({ value, label, icon: Icon, tone }: { value: number; label: string; icon: typeof Bot; tone: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-base-800/40 px-3.5 py-2.5">
      <Icon className={`h-4 w-4 ${tone}`} strokeWidth={1.5} />
      <div>
        <p className="font-sans text-lg font-semibold leading-none text-text-primary">{value}</p>
        <p className="mt-1 text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      </div>
    </div>
  );
}

function ExecutionPipeline() {
  const phase = useStore((s) => s.phase);
  const stage = phase === "running" ? 4 : 0;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
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
  );
}

function MissionDashboard() {
  const agents = useStore((s) => s.agents);
  const phase = useStore((s) => s.phase);
  const activeMissions = useStore(
    (s) => s.missions.filter((m) => m.status === "running" || m.status === "analyzing").length
  );
  const activeAgents = agents.filter((a) => a.status === "active").length;

  return (
    <main className="relative min-w-0 flex-1 overflow-y-auto">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line px-4 pb-5 pt-6 md:px-8 md:pb-6 md:pt-8">
        <NetworkBackdrop />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center justify-center">
            <span className="flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent-cyan">
              <Sparkles className="h-3 w-3" strokeWidth={1.5} />
              Mavar AI Agents
            </span>
          </div>
          <h1 className="mt-3.5 text-center font-sans text-[27px] font-bold leading-tight tracking-tight text-text-primary sm:text-[34px] md:mt-4 md:text-[40px]">
            Give MAVAR a{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-violet bg-clip-text text-transparent">
              Mission.
            </span>
          </h1>
          <p className="mt-2 text-center text-[13px] text-text-secondary md:text-[14px]">
            Recon. Agents. Intelligence. One autonomous workspace.
          </p>
          <div className="mt-5 md:mt-6">
            <MissionComposer />
          </div>
          <div className="mt-4">
            <QuickMissions />
          </div>
        </div>
      </div>

      <div className="space-y-5 px-4 py-5 md:space-y-6 md:px-8 md:py-6">
        <ExecutionPipeline />

        <section>
          <SectionHeader
            title="Active Intelligence"
            subtitle="Live agent activity across your workspace"
            right={
              <div className="hidden flex-wrap justify-end gap-2 lg:flex">
                <Metric value={12} label="Total Agents" icon={Bot} tone="text-accent-blue" />
                <Metric value={Math.max(activeMissions, 4)} label="Active Missions" icon={Radar} tone="text-accent-violet" />
                <Metric value={0} label="Critical Alerts" icon={ShieldAlert} tone="text-text-muted" />
              </div>
            }
          />
          <div className="relative mt-3.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-7 bg-gradient-to-r from-base-950 to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-7 bg-gradient-to-l from-base-950 to-transparent md:hidden" />
            <div className="hscroll items-stretch md:grid-cols-2 md:gap-4 xl:grid-cols-4">
              {agents.map((a, i) => (
                <div
                  key={a.id}
                  className="w-[80vw] max-w-[300px] shrink-0 snap-center animate-fadeup [animation-fill-mode:both] md:w-auto md:max-w-none md:shrink"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <AgentCard agent={a} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-text-muted lg:hidden">
            <span className="flex items-center gap-2">
              <Activity className="h-3 w-3 text-accent-cyan" strokeWidth={1.5} />
              {activeAgents} active · {Math.max(activeMissions, 4)} in flight · 0 critical
            </span>
            <span className="flex shrink-0 animate-pulse items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-faint">
              <ChevronLeft className="h-3 w-3" strokeWidth={1.5} />
              swipe
              <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            </span>
          </div>
        </section>

        <section>
          <SectionHeader title="Recent Missions" />
          <div className="mt-3">
            <MissionTable />
          </div>
        </section>

        <footer className="flex flex-col gap-1 border-t border-line pt-4 text-[10.5px] text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>MAVAR Autonomous Intelligence Platform · v2.4.1</span>
          <span className="hidden font-mono sm:block">
            orchestrator · 12 agents registered · region: eu-central
          </span>
        </footer>
      </div>
    </main>
  );
}

function PageRouter() {
  const activeNav = useStore((s) => s.activeNav);
  const setNav = useStore((s) => s.setNav);

  const renderPage = () => {
    switch (activeNav) {
      case "overview":
        return <OverviewPage />;
      case "missions":
        return <MissionDashboard />;
      case "history":
        return <HistoryPage />;
      case "agents":
        return <AgentsPage />;
      case "intelligence":
        return <IntelligencePage />;
      case "tool-recon":
      case "tool-deepsearch":
      case "tool-deepcrawl":
      case "tool-security":
      case "tool-development":
        return <ToolsPage />;
      case "logs":
        return <LogsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <MissionDashboard />;
    }
  };

  return renderPage();
}

export function Dashboard() {
  return <PageRouter />;
}
