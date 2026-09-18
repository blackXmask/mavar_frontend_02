import type { Agent } from "./types";

export const AGENTS: Agent[] = [
  {
    id: "recon",
    name: "Recon Agent",
    role: "OSINT & Asset Discovery",
    icon: "radar",
    target: "target.com",
    status: "active",
    tasks: [
      "Scanning subdomains...",
      "Analyzing DNS records...",
      "Fingerprinting services...",
    ],
    taskCount: 4,
    spark: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16],
    tools: ["subfinder", "dnsx", "httpx", "amass"],
  },
  {
    id: "webhunter",
    name: "Web Hunter",
    role: "Web & API Discovery",
    icon: "terminal",
    target: "api.target.com",
    status: "active",
    tasks: [
      "Finding hidden endpoints...",
      "Analyzing JS files...",
      "Mapping parameters...",
    ],
    taskCount: 2,
    spark: [2, 3, 5, 4, 6, 8, 7, 9, 8, 11, 10, 12],
    tools: ["gobuster", "httpx", "whatweb"],
  },
  {
    id: "osint",
    name: "OSINT Agent",
    role: "Open Source Intelligence",
    icon: "network",
    target: "target.com",
    status: "active",
    tasks: [
      "Collecting public data...",
      "Analyzing social profiles...",
      "Searching for leaks...",
    ],
    taskCount: 6,
    spark: [8, 7, 9, 11, 10, 13, 12, 15, 14, 17, 16, 19],
    tools: ["deep-search", "deep-crawl"],
  },
  {
    id: "security",
    name: "Security Agent",
    role: "Threat & Vulnerability Analysis",
    icon: "shield",
    target: "target.com",
    status: "idle",
    tasks: [
      "Waiting for input...",
      "Monitoring threat feeds...",
      "Preparing scan environment...",
    ],
    taskCount: 0,
    spark: [3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2],
    tools: ["nmap", "httpx"],
  },
];

export const QUICK_MISSIONS: {
  id: string;
  icon: string;
  label: string;
  text: string;
}[] = [
  {
    id: "q1",
    icon: "recon",
    label: "Recon Target",
    text: "Perform full reconnaissance on target.com — enumerate subdomains, open ports, and the technology stack. Summarize the attack surface.",
  },
  {
    id: "q2",
    icon: "subdomain",
    label: "Discover Subdomains",
    text: "Discover all subdomains of target.com using passive and active sources, then verify which are alive and reachable.",
  },
  {
    id: "q3",
    icon: "api",
    label: "Analyze API",
    text: "Analyze api.target.com — map all endpoints, identify exposed APIs, and flag misconfigurations or security risks.",
  },
  {
    id: "q4",
    icon: "intel",
    label: "Threat Intel",
    text: "Collect threat intelligence for target.com — recent CVEs, breach indicators, and known TTPs targeting the sector.",
  },
  {
    id: "q5",
    icon: "deploy",
    label: "Deploy Agent",
    text: "Deploy a dedicated monitoring agent for target.com and continuously watch for new assets and exposed services.",
  },
];
