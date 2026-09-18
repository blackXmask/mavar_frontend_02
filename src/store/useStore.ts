import { create } from "zustand";
import { AGENTS, BOOT_LINES, MISSIONS, RECENT_MISSIONS, STREAM_POOL } from "../data/mock";
import type { Agent, AppPhase, ExecMode, Mission, RecentMission, TerminalLine } from "../data/types";

export type NavId =
  | "overview"
  | "missions"
  | "history"
  | "agents"
  | "intelligence"
  | "tool-recon"
  | "tool-deepsearch"
  | "tool-deepcrawl"
  | "tool-security"
  | "tool-development"
  | "logs"
  | "settings";

const poolLine = () => STREAM_POOL[Math.floor(Math.random() * STREAM_POOL.length)];
const now = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

interface StoreState {
  phase: AppPhase;
  agents: Agent[];
  missions: Mission[];
  recents: RecentMission[];
  lines: TerminalLine[];
  mode: ExecMode;
  composer: string;
  rightPanelOpen: boolean;
  mobileNavOpen: boolean;
  activeNav: NavId;
  setNav: (n: NavId) => void;
  setComposer: (v: string) => void;
  setMode: (m: ExecMode) => void;
  toggleRightPanel: () => void;
  setMobileNav: (v: boolean) => void;
  runMission: () => void;
  tick: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  phase: "idle",
  agents: AGENTS,
  missions: MISSIONS,
  recents: RECENT_MISSIONS,
  lines: BOOT_LINES,
  mode: "Autonomous",
  composer: "",
  rightPanelOpen: true,
  mobileNavOpen: false,
  activeNav: "missions",
  setNav: (n) => set({ activeNav: n, mobileNavOpen: false }),
  setComposer: (v) => set({ composer: v }),
  setMode: (m) => set({ mode: m }),
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setMobileNav: (v) => set({ mobileNavOpen: v }),
  runMission: () => {
    const { composer, phase, missions } = get();
    if (phase === "running") return;
    const text = composer.trim() || "Perform full reconnaissance on target.com and map the attack surface.";
    const lines: TerminalLine[] = [
      { t: now(), tag: "sys", text: `Mission received — "${text.slice(0, 72)}${text.length > 72 ? "…" : ""}"` },
      { t: now(), tag: "sys", text: "Mission Planner: decomposing objective into task graph..." },
    ];
    const nextMissions: Mission[] = missions.map((m, i) =>
      i === 0 ? { ...m, status: "running", progress: Math.max(m.progress, 8) } : m
    );
    set({ phase: "running", composer: "", lines, missions: nextMissions });
  },
  tick: () => {
    const s = get();
    if (s.phase !== "running") return;
    const newLines: TerminalLine[] = [...s.lines, { t: now(), ...poolLine() }].slice(-160);
    const missions = s.missions.map((m) =>
      m.status === "running" && m.progress < 97
        ? { ...m, progress: Math.min(97, m.progress + 1) }
        : m
    );
    const agents = s.agents.map((a) => {
      if (a.status !== "active") return a;
      const last = a.spark[a.spark.length - 1];
      const spark = [...a.spark.slice(1), Math.max(1, Math.round(last * (0.85 + Math.random() * 0.35)))];
      const bump = Math.random() < 0.12 ? (Math.random() < 0.5 ? -1 : 1) : 0;
      return { ...a, spark, taskCount: Math.max(0, a.taskCount + bump) };
    });
    set({ lines: newLines, missions, agents });
  },
}));