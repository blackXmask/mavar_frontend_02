export type AgentStatus = "active" | "idle" | "preparing" | "failed";

export type MissionStatus =
  | "running"
  | "analyzing"
  | "queued"
  | "preparing"
  | "completed"
  | "failed";

export type AgentIcon = "radar" | "terminal" | "network" | "shield";

export interface Agent {
  id: string;
  name: string;
  role: string;
  icon: AgentIcon;
  target: string;
  status: AgentStatus;
  tasks: string[];
  taskCount: number;
  spark: number[];
  tools: string[];
}

export interface Mission {
  id: string;
  title: string;
  target: string;
  scope: string;
  status: MissionStatus;
  progress: number;
  meta: string;
}

export interface RecentMission {
  id: string;
  mission: string;
  target: string;
  agents: number;
  status: MissionStatus;
  time: string;
}

export interface TerminalLine {
  t: string;
  tag: "sys" | "ok" | "run" | "net" | "warn" | "err";
  text: string;
}

export type ExecMode = "Autonomous" | "Supervised" | "Planning Only";

export type OutputTab = "terminal" | "logs" | "graph";

export type AppPhase = "idle" | "running";
