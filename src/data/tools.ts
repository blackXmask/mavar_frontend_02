import type { TerminalLine } from "./types";

export interface ToolConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  placeholder: string;
  options: string[];
  modes: string[];
  outputLines: { tag: TerminalLine["tag"]; text: string }[];
  stats: { label: string; value: string }[];
}

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  "tool-recon": {
    id: "tool-recon",
    name: "Recon",
    tagline: "OSINT and Asset Discovery",
    description: "Enumerate subdomains, DNS records, open ports, and the technology stack of a target domain.",
    placeholder: "target.com",
    options: ["Passive sources only", "Enumerate subdomains", "Port scan (top 1000)", "Technology fingerprinting", "Certificate transparency"],
    modes: ["Quick", "Standard", "Deep"],
    outputLines: [
      { tag: "sys", text: "subfinder: passive enumeration started" },
      { tag: "ok", text: "12 subdomains discovered (passive)" },
      { tag: "net", text: "dnsx: resolving A / AAAA / MX / TXT..." },
      { tag: "run", text: "httpx: probing 12 hosts - 9 alive" },
      { tag: "ok", text: "nmap: top-1000 ports - 3 open (80, 443, 22)" },
      { tag: "run", text: "whatweb: fingerprinting https://target.com..." },
      { tag: "ok", text: "Stack: Nginx 1.25 \u00b7 React 18 \u00b7 Cloudflare" },
      { tag: "warn", text: "staging.target.com resolves to internal IP range" },
    ],
    stats: [
      { label: "Subdomains", value: "12" },
      { label: "Live hosts", value: "9" },
      { label: "Open ports", value: "3" },
      { label: "Technologies", value: "7" },
    ],
  },

  "tool-deepsearch": {
    id: "tool-deepsearch",
    name: "Deep Search",
    tagline: "Deep Information Retrieval",
    description: "Search paste sites, breach dumps, public documents, and code repositories for target-related intelligence.",
    placeholder: '"@target.com" OR "target.com"',
    options: ["Paste sites", "Breach databases", "Code repositories", "Public documents", "Dark web markets"],
    modes: ["Standard", "Exhaustive"],
    outputLines: [
      { tag: "sys", text: "deep-search: query compiled (5 sources)" },
      { tag: "net", text: "Indexing 128 public documents for keywords..." },
      { tag: "ok", text: "Breach DB: 3 hits - 2 emails @target.com" },
      { tag: "warn", text: "Paste site hit: credential dump (weekly)" },
      { tag: "run", text: "Scanning GitHub/GitLab public code..." },
      { tag: "ok", text: "1 API key pattern found in public repo" },
      { tag: "ok", text: "Dark web: no mentions in last 30 days" },
    ],
    stats: [
      { label: "Documents", value: "128" },
      { label: "Credential hits", value: "2" },
      { label: "Code matches", value: "1" },
      { label: "Sources", value: "5" },
    ],
  },

  "tool-deepcrawl": {
    id: "tool-deepcrawl",
    name: "Deep Crawl",
    tagline: "Full-Site Crawling and Extraction",
    description: "Crawl an entire site, extract routes, parameters, emails, and JS-analyzed endpoints into a structured map.",
    placeholder: "https://target.com",
    options: ["Follow subdomains", "Extract emails", "Analyze JS bundles", "Capture screenshots", "Respect robots.txt"],
    modes: ["Shallow", "Standard", "Deep"],
    outputLines: [
      { tag: "sys", text: "deep-crawl: crawl started (depth: 4)" },
      { tag: "net", text: "Fetched / - 42 internal links found" },
      { tag: "run", text: "Crawling /blog (depth 2)..." },
      { tag: "ok", text: "14 emails extracted from /team and /about" },
      { tag: "run", text: "Analyzing main.js bundle (312 KB)..." },
      { tag: "ok", text: "3 API routes extracted from bundle" },
      { tag: "warn", text: "/legacy-admin returns 403 but exists" },
      { tag: "ok", text: "Sitemap complete - 187 URLs crawled" },
    ],
    stats: [
      { label: "URLs crawled", value: "187" },
      { label: "Emails", value: "14" },
      { label: "API routes", value: "3" },
      { label: "Parameters", value: "26" },
    ],
  },

  "tool-security": {
    id: "tool-security",
    name: "Security",
    tagline: "Vulnerability and Threat Analysis",
    description: "Run structured security checks: TLS hygiene, header audit, CVE matching, and misconfiguration scans.",
    placeholder: "api.target.com",
    options: ["TLS / certificate audit", "Security headers", "CVE matching", "Misconfiguration scan", "Secrets detection"],
    modes: ["Safe", "Aggressive"],
    outputLines: [
      { tag: "sys", text: "security: audit pipeline started (safe mode)" },
      { tag: "run", text: "TLS: checking certificate chain..." },
      { tag: "warn", text: "Certificate expires in 11 days" },
      { tag: "run", text: "Auditing security headers..." },
      { tag: "err", text: "Missing: Content-Security-Policy" },
      { tag: "ok", text: "HSTS enabled (max-age=31536000)" },
      { tag: "run", text: "Matching services against CVE feed..." },
      { tag: "warn", text: "2 CVEs match Nginx 1.25 (medium)" },
    ],
    stats: [
      { label: "Checks run", value: "41" },
      { label: "Passed", value: "36" },
      { label: "Warnings", value: "3" },
      { label: "Failures", value: "2" },
    ],
  },

  "tool-development": {
    id: "tool-development",
    name: "Development",
    tagline: "Agentic Development Environment",
    description: "Spin up development agents to scaffold integrations, write report tooling, and automate workflow scripts.",
    placeholder: "Describe what to build...",
    options: ["Generate report scripts", "Webhook integrations", "Custom agent plugin", "Export to JSON/CSV"],
    modes: ["Assist", "Autonomous"],
    outputLines: [
      { tag: "sys", text: "dev-agent: workspace initialized" },
      { tag: "run", text: "Scaffolding report generator module..." },
      { tag: "ok", text: "wrote src/reports/recon-summary.ts" },
      { tag: "run", text: "Adding CSV/JSON export adapters..." },
      { tag: "ok", text: "wrote src/reports/exporters.ts" },
      { tag: "ok", text: "Tests: 6 passed, 0 failed" },
      { tag: "sys", text: "dev-agent: awaiting review" },
    ],
    stats: [
      { label: "Files written", value: "2" },
      { label: "Tests", value: "6 OK" },
      { label: "Lint issues", value: "0" },
      { label: "Commits", value: "1" },
    ],
  },
};
