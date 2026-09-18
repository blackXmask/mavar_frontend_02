import type { Mission, MissionStatus, RecentMission, TerminalLine } from "./types";

export const MISSIONS: Mission[] = [
  {
    id: "m1",
    title: "Recon",
    target: "target.com",
    scope: "Subdomains · Endpoints · Tech Stack",
    status: "running",
    progress: 68,
    meta: "12 tasks · 4 agents",
  },
  {
    id: "m2",
    title: "API Analysis",
    target: "api.target.com",
    scope: "Endpoint discovery · Vulnerabilities",
    status: "analyzing",
    progress: 45,
    meta: "8 tasks · 2 agents",
  },
  {
    id: "m3",
    title: "OSINT",
    target: "target.com",
    scope: "Social · People · Leaks",
    status: "queued",
    progress: 0,
    meta: "0 / 15 tasks",
  },
  {
    id: "m4",
    title: "Threat Intel",
    target: "target.com",
    scope: "CVE · Indicators · TTPs",
    status: "preparing",
    progress: 0,
    meta: "0 / 12 tasks",
  },
];

export const RECENT_MISSIONS: RecentMission[] = [
  { id: "r1", mission: "Recon & OSINT", target: "target.com", agents: 4, status: "running", time: "2h ago" },
  { id: "r2", mission: "API Discovery", target: "api.target.com", agents: 2, status: "analyzing", time: "3h ago" },
  { id: "r3", mission: "Threat Intel", target: "target.com", agents: 3, status: "queued", time: "4h ago" },
  { id: "r4", mission: "Web Crawl", target: "example.com", agents: 2, status: "completed", time: "6h ago" },
];

export const BOOT_LINES: TerminalLine[] = [
  { t: "20:14:22", tag: "sys", text: "Recon Agent started for target.com" },
  { t: "20:14:22", tag: "sys", text: "Initializing reconnaissance pipeline..." },
  { t: "20:14:23", tag: "net", text: "Resolving domain: target.com" },
  { t: "20:14:25", tag: "ok", text: "Found 12 subdomains" },
  { t: "20:14:27", tag: "run", text: "Scanning for open ports..." },
  { t: "20:14:32", tag: "ok", text: "3 services detected" },
  { t: "20:14:34", tag: "run", text: "Analyzing technology stack..." },
  { t: "20:14:36", tag: "ok", text: "Detected Nginx, React, Cloudflare" },
  { t: "20:14:38", tag: "run", text: "Running vulnerability scan..." },
  { t: "20:14:42", tag: "warn", text: "2 potential issues found" },
];

export const STREAM_POOL: { tag: TerminalLine["tag"]; text: string }[] = [
  { tag: "run", text: "Probing host 104.21.x.x — checking response headers..." },
  { tag: "ok", text: "subfinder: 4 new subdomains queued for verification" },
  { tag: "net", text: "httpx: probing 16/23 hosts — 9 responded 200 OK" },
  { tag: "run", text: "dnsx: enumerating A / AAAA / MX / TXT records..." },
  { tag: "ok", text: "DNS records harvested — 2 MX, 6 TXT records" },
  { tag: "run", text: "whatweb: fingerprinting https://target.com..." },
  { tag: "warn", text: "TLS certificate expires in 11 days (api.target.com)" },
  { tag: "ok", text: "JS analysis: 3 API routes extracted from bundle" },
  { tag: "net", text: "OSINT: indexing 128 public documents for keywords" },
  { tag: "run", text: "Checking certificate transparency logs..." },
  { tag: "ok", text: "crt.sh: 7 additional subdomain candidates found" },
  { tag: "sys", text: "Orchestrator: rebalancing task queue → Web Hunter" },
  { tag: "warn", text: "Rate limit reached on passive source — backing off 5s" },
  { tag: "ok", text: "Technology stack updated: Nginx 1.25 · React 18 · CF" },
  { tag: "run", text: "gobuster: brute-forcing directories (wordlist: common.txt)..." },
];

export const EXECUTION_STAGES = [
  "User Mission",
  "Mission Planner",
  "Task Graph",
  "Agent Orchestrator",
  "Specialized Agents",
  "Tools",
  "Results",
  "Intelligence",
] as const;

export const STATUS_MAP: Record<
  MissionStatus,
  { label: string; text: string; dot: string; bg: string }
> = {
  running: { label: "Running", text: "text-accent-green", dot: "bg-accent-green", bg: "bg-accent-green/10" },
  analyzing: { label: "Analyzing", text: "text-accent-blue", dot: "bg-accent-blue", bg: "bg-accent-blue/10" },
  queued: { label: "Queued", text: "text-accent-violet", dot: "bg-accent-violet", bg: "bg-accent-violet/10" },
  preparing: { label: "Preparing", text: "text-accent-amber", dot: "bg-accent-amber", bg: "bg-accent-amber/10" },
  completed: { label: "Completed", text: "text-accent-green", dot: "bg-accent-green", bg: "bg-accent-green/10" },
  failed: { label: "Failed", text: "text-accent-red", dot: "bg-accent-red", bg: "bg-accent-red/10" },
};
