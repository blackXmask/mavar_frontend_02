import {
  BrainCircuit,
  ChevronRight,
  Crosshair,
  FolderSearch,
  Globe,
  History,
  LayoutDashboard,
  ListChecks,
  Radio,
  Rocket,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Waypoints,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useStore, NavId } from "../store/useStore";
import type { AgentStatus } from "../data/types";

type NavIcon = LucideIcon;

const WORKSPACE: { label: string; icon: NavIcon; active?: boolean }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Missions", icon: ListChecks, active: true },
  { label: "History", icon: History },
  { label: "Agents", icon: Radio },
  { label: "Intelligence", icon: BrainCircuit },
];

const TOOLS: { label: string; icon: NavIcon }[] = [
  { label: "Recon", icon: Crosshair },
  { label: "Deep Search", icon: FolderSearch },
  { label: "Deep Crawl", icon: Globe },
  { label: "Security", icon: ShieldCheck },
  { label: "Development", icon: Terminal },
];

const STATUS_DOT: Record<AgentStatus, string> = {
  active: "bg-accent-green shadow-[0_0_6px_rgba(52,211,153,0.8)]",
  idle: "bg-text-faint",
  preparing: "bg-accent-amber shadow-[0_0_6px_rgba(245,158,11,0.7)]",
  failed: "bg-accent-red",
};

function Divider() {
  return <div className="my-3 border-t border-line" />;
}

function Group({ title }: { title: string }) {
  return <p className="label mb-1.5 px-3 text-[10px]">{title}</p>;
}

export function Sidebar() {
  const agents = useStore((s) => s.agents);
  const mobileNavOpen = useStore((s) => s.mobileNavOpen);
  const setMobileNav = useStore((s) => s.setMobileNav);
  const setNav = useStore((s) => s.setNav);

  const agentIcons = [Crosshair, Waypoints, Radio, Shield];

  return (
    <>
      {/* mobile scrim */}
      <div
        onClick={() => setMobileNav(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] shrink-0 flex-col border-r border-line bg-base-900 transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-3">
          <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-accent-blue/40 bg-gradient-to-b from-accent-blue/20 to-accent-indigo/10 py-2 text-[13px] font-semibold text-text-primary shadow-glow transition-all hover:from-accent-blue/30 hover:to-accent-indigo/20">
            <Sparkles className="h-3.5 w-3.5 text-accent-cyan" strokeWidth={1.75} />
            New Mission
          </button>
          <button
            onClick={() => setMobileNav(false)}
            className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted hover:text-text-primary lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          <Group title="Workspace" />
          {WORKSPACE.map((it) => (
            <a
              key={it.label}
              onClick={() => setNav(it.label.toLowerCase() as NavId)}
              className={`nav-item ${it.active ? "nav-item-active" : ""}`}
            >
              <it.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
              {it.label}
            </a>
          ))}

          <Divider />
          <Group title="Tools" />
          {TOOLS.map((it) => (
            <a
              key={it.label}
              onClick={() => {
                const map: Record<string, NavId> = {
                  Recon: "tool-recon",
                  "Deep Search": "tool-deepsearch",
                  "Deep Crawl": "tool-deepcrawl",
                  Security: "tool-security",
                  Development: "tool-development",
                };
                setNav(map[it.label] ?? "missions");
              }}
              className="nav-item"
            >
              <it.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
              {it.label}
              <ChevronRight className="ml-auto h-3 w-3 text-text-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}

          <Divider />
          <Group title="Agents" />
          {agents.map((a, i) => {
            const Icon = agentIcons[i] ?? Rocket;
            return (
              <a key={a.id} className="nav-item">
                <Icon className="h-3.5 w-3.5 shrink-0 text-text-muted" strokeWidth={1.5} />
                <span className="min-w-0 truncate">{a.name}</span>
                <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[10px] text-text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[a.status]} ${a.status === "active" ? "animate-pulse-dot" : ""}`} />
                  {a.taskCount} active
                </span>
              </a>
            );
          })}

          <Divider />
          <Group title="System" />
          <a className="nav-item" onClick={() => setNav("logs")}>
            <ScrollText className="h-3.5 w-3.5" strokeWidth={1.5} />
            Logs
          </a>
          <a className="nav-item" onClick={() => setNav("settings")}>
            <Settings className="h-3.5 w-3.5" strokeWidth={1.5} />
            Settings
          </a>
        </nav>

        <div className="border-t border-line p-3">
          <div className="flex items-center justify-between rounded-lg border border-line bg-base-800/60 px-3 py-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-text-muted">Orchestrator</p>
              <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-accent-cyan">
                <span className="h-1 w-1 animate-pulse-dot rounded-full bg-accent-cyan" />
                v2.4.1 · online
              </p>
            </div>
            <Waypoints className="h-4 w-4 text-text-faint" strokeWidth={1.5} />
          </div>
        </div>
      </aside>
    </>
  );
}
