import type { MissionStatus, TerminalLine } from "./types";

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export interface HistoryItem {
  id: string;
  mission: string;
  target: string;
  agents: number;
  status: MissionStatus;
  time: string;
  duration: string;
  findings: number;
}

export const HISTORY: HistoryItem[] = [
  { id: "h1", mission: "Recon & OSINT", target: "target.com", agents: 4, status: "completed", time: "Today 18:04", duration: "42m", findings: 23 },
  { id: "h2", mission: "API Discovery", target: "api.target.com", agents: 2, status: "completed", time: "Today 14:30", duration: "28m", findings: 11 },
  { id: "h3", mission: "Subdomain Enumeration", target: "target.com", agents: 1, status: "completed", time: "Yesterday 21:12", duration: "16m", findings: 8 },
  { id: "h4", mission: "Deep Crawl Marketing Site", target: "target.com", agents: 2, status: "completed", time: "Yesterday 11:47", duration: "34m", findings: 5 },
  { id: "h5", mission: "Threat Intel Sweep", target: "target.com", agents: 3, status: "failed", time: "2 days ago 09:03", duration: "6m", findings: 0 },
  { id: "h6", mission: "Web Crawl", target: "example.com", agents: 2, status: "completed", time: "2 days ago 16:20", duration: "22m", findings: 3 },
  { id: "h7", mission: "Full Attack Surface Map", target: "target.com", agents: 4, status: "completed", time: "3 days ago 13:55", duration: "1h 12m", findings: 31 },
  { id: "h8", mission: "Leak & Credential Monitoring", target: "target.com", agents: 2, status: "completed", time: "4 days ago 10:08", duration: "18m", findings: 2 },
  { id: "h9", mission: "TLS & Header Audit", target: "api.target.com", agents: 1, status: "completed", time: "5 days ago 15:41", duration: "9m", findings: 6 },
  { id: "h10", mission: "OSINT Social Footprint", target: "target.com", agents: 2, status: "failed", time: "6 days ago 19:26", duration: "4m", findings: 0 },
];

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  target: string;
  source: string;
  time: string;
  detail: string;
}

export const FINDINGS: Finding[] = [
  { id: "f1", title: "Exposed .git directory", severity: "critical", target: "staging.target.com", source: "Web Hunter", time: "26m ago", detail: "Directory listing enabled on /.git/ - source code and commit history may be retrievable." },
  { id: "f2", title: "Open S3 bucket with public read", severity: "critical", target: "assets.target.com", source: "Recon Agent", time: "1h ago", detail: "Bucket 'target-assets-prod' allows anonymous ListObjects. 1,204 objects enumerated." },
  { id: "f3", title: "Expired TLS certificate in 11 days", severity: "high", target: "api.target.com", source: "Security Agent", time: "12m ago", detail: "Leaf certificate for api.target.com expires 2026-09-29. Auto-renewal not detected." },
  { id: "f4", title: "Employee credentials in pastebin dump", severity: "high", target: "target.com", source: "OSINT Agent", time: "2h ago", detail: "2 credential pairs matching @target.com emails found in a paste site dump dated this week." },
  { id: "f5", title: "Subdomain takeover candidate", severity: "high", target: "old-crm.target.com", source: "Recon Agent", time: "4h ago", detail: "CNAME points to decommissioned Heroku app - claimable DNS record detected." },
  { id: "f6", title: "Missing CSP header", severity: "medium", target: "target.com", source: "Web Hunter", time: "1h ago", detail: "No Content-Security-Policy header on primary domain. XSS risk surface increased." },
  { id: "f7", title: "Admin panel reachable without MFA", severity: "medium", target: "admin.target.com", source: "Security Agent", time: "5h ago", detail: "Admin interface at admin.target.com requires only password authentication - MFA not enforced." },
  { id: "f8", title: "Deprecated TLS 1.0/1.1 still enabled", severity: "medium", target: "api.target.com", source: "Security Agent", time: "6h ago", detail: "Legacy TLS protocols enabled - downgrade attack surface exists." },
  { id: "f9", title: "Publicly exposed staging environment", severity: "low", target: "staging.target.com", source: "Web Hunter", time: "8h ago", detail: "Staging environment accessible without authentication - sensitive debug info visible." },
  { id: "f10", title: "Outdated jQuery version detected", severity: "low", target: "target.com", source: "Web Hunter", time: "1d ago", detail: "jQuery 1.12.4 in use - known XSS vulnerabilities in older versions." },
];



export const SEVERITY_MAP: Record<Severity, { label: string; text: string; dot: string; bg: string; border: string }> = {
  critical: { label: "Critical", text: "text-accent-red", dot: "bg-accent-red", bg: "bg-accent-red/10", border: "border-l-2 border-accent-red" },
  high: { label: "High", text: "text-accent-amber", dot: "bg-accent-amber", bg: "bg-accent-amber/10", border: "border-l-2 border-accent-amber" },
  medium: { label: "Medium", text: "text-accent-blue", dot: "bg-accent-blue", bg: "bg-accent-blue/10", border: "border-l-2 border-accent-blue" },
  low: { label: "Low", text: "text-text-muted", dot: "bg-text-faint", bg: "bg-white/[0.04]", border: "border-l-2 border-line" },
  info: { label: "Info", text: "text-accent-cyan", dot: "bg-accent-cyan", bg: "bg-accent-cyan/10", border: "border-l-2 border-accent-cyan" },
};

export interface ThreatItem {
  id: string;
  tag: string;
  text: string;
  time: string;
}

export const THREAT_FEED: ThreatItem[] = [
  { id: "t1", tag: "CVE", text: "CVE-2026-28471 - Apache Struts2 RCE (actively exploited)", time: "30m ago" },
  { id: "t2", tag: "TTP", text: "Sector targeting: credential stuffing against SaaS login portals", time: "3h ago" },
  { id: "t3", tag: "IOC", text: "New C2 IP range observed: 185.220.x.x - blocklist updated", time: "6h ago" },
  { id: "t4", tag: "BREACH", text: "Cloud CRM vendor breach - 4.2M records, includes EU companies", time: "9h ago" },
  { id: "t5", tag: "CVE", text: "CVE-2026-28870 - React Server Components RCE (patched 18.3.1)", time: "1d ago" },
];

export interface LogEntry {
  t: string;
  level: string;
  text: string;
}

export const LOGS: LogEntry[] = [
  { t: "20:02:01", level: "SYS", text: "Orchestrator boot sequence complete (v2.4.1)" },
  { t: "20:02:04", level: "OK", text: "Agent registry: 4 agents registered, health OK" },
  { t: "20:02:06", level: "NET", text: "Connected to intel-relay eu-central-1 (rtt 24ms)" },
  { t: "20:05:12", level: "RUN", text: "Mission m1 assigned -> task graph compiled (12 tasks)" },
  { t: "20:14:22", level: "SYS", text: "Recon Agent started for target.com" },
  { t: "20:14:25", level: "OK", text: "Found 12 subdomains" },
  { t: "20:14:42", level: "WARN", text: "2 potential issues found" },
  { t: "20:31:09", level: "ERR", text: "Threat Intel source timeout - retrying (1/3)" },
  { t: "20:31:14", level: "OK", text: "Source recovered - feed synchronized" },
  { t: "20:44:51", level: "SYS", text: "Orchestrator: rebalancing task queue -> Web Hunter" },
  { t: "21:02:33", level: "WARN", text: "Rate limit reached on passive source - backing off 5s" },
  { t: "21:02:39", level: "OK", text: "Backoff complete - resuming enumeration" },
  { t: "21:15:07", level: "NET", text: "httpx: probing 16/23 hosts - 9 responded 200 OK" },
  { t: "21:26:44", level: "OK", text: "crt.sh: 7 additional subdomain candidates found" },
];

export interface Setting {
  id: string;
  title: string;
  description: string;
  icon: "globe" | "zap" | "shield" | "monitor";
  default: boolean;
}

export const SETTINGS: Setting[] = [
  { id: "auto-mission", title: "Auto-Start Missions", description: "Confirm each mission before agents are dispatched, or let the orchestrator begin immediately.", icon: "zap", default: true },
  { id: "auto-scan", title: "Auto-Resume Scanning", description: "Resume interrupted scans automatically when connectivity is restored.", icon: "monitor", default: true },
  { id: "threat-intel", title: "Threat Intelligence Feed", description: "Ingest live CVE, TTP, and IOC feeds to contextualize findings automatically.", icon: "shield", default: true },
  { id: "public-fingerprinting", title: "Passive Fingerprinting", description: "Collect technology stack and hosting info from public sources without touching the target.", icon: "globe", default: true },
  { id: "active-probing", title: "Active Probing", description: "Send requests directly to targets to validate discovered services and endpoints.", icon: "globe", default: false },
  { id: "tls-auditing", title: "TLS / Certificate Auditing", description: "Monitor certificate expiry, chain validity, and cipher suite posture on every target.", icon: "shield", default: true },
  { id: "export-reports", title: "Exportable Reports", description: "Automatically generate structured PDF and JSON reports after each completed mission.", icon: "monitor", default: false },
  { id: "webhook-alerts", title: "Webhook Alerts", description: "Push critical findings and mission state changes to an external webhook endpoint.", icon: "zap", default: false },
  { id: "dark-web", title: "Dark Web Monitoring", description: "Monitor paste sites, breach forums, and dark web sources for credential and data leaks.", icon: "shield", default: true },
];
