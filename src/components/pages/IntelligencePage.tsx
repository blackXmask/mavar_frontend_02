import { useMemo, useState } from "react";
import { ShieldAlert, Rss, Crosshair, Globe2, AlertTriangle } from "lucide-react";
import { FINDINGS, SEVERITY_MAP, THREAT_FEED } from "../../data/extras";
import type { Severity } from "../../data/extras";

const SEVERITIES: ("all" | Severity)[] = ["all", "critical", "high", "medium", "low"];

export function IntelligencePage() {
  const [filter, setFilter] = useState<(typeof SEVERITIES)[number]>("all");

  const rows = useMemo(
    () => (filter === "all" ? FINDINGS : FINDINGS.filter((f) => f.severity === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { critical: 0, high: 0, medium: 0, low: 0 };
    FINDINGS.forEach((f) => (c[f.severity] += 1));
    return c;
  }, []);

  return (
    <div className="space-y-4 px-4 py-5 md:px-6">
      <div>
        <h1 className="font-sans text-lg font-bold text-text-primary md:text-xl">Intelligence</h1>
        <p className="mt-0.5 text-[12.5px] text-text-muted">
          Findings, indicators, and threat intelligence collected by your agents
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(SEVERITY_MAP) as Severity[])
          .filter((s) => s !== "info")
          .map((s) => {
            const sm = SEVERITY_MAP[s];
            return (
              <div key={s} className={`panel border ${sm.border} p-3.5`}>
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${sm.dot}`} />
                  <p className={`text-[10px] font-medium uppercase tracking-wider ${sm.text}`}>{sm.label}</p>
                </div>
                <p className="mt-2 font-sans text-xl font-semibold text-text-primary">{counts[s]}</p>
                <p className="text-[10.5px] text-text-muted">findings</p>
              </div>
            );
          })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {SEVERITIES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-lg border px-2.5 py-1.5 text-[11.5px] capitalize transition-colors ${
              filter === s
                ? "border-accent-blue/40 bg-accent-blue/10 text-text-primary"
                : "border-line text-text-muted hover:text-text-secondary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-2.5">
          {rows.map((f) => {
            const sm = SEVERITY_MAP[f.severity];
            return (
              <div key={f.id} className={`panel border-l-2 p-3.5 transition-shadow hover:shadow-lift ${sm.border}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <AlertTriangle className={`h-3.5 w-3.5 shrink-0 ${sm.text}`} strokeWidth={1.5} />
                  <p className="min-w-0 flex-1 text-[13px] font-semibold text-text-primary">{f.title}</p>
                  <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-[3px] text-[10.5px] font-medium ${sm.text} ${sm.bg}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${sm.dot}`} />
                    {sm.label}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">{f.detail}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Crosshair className="h-3 w-3" strokeWidth={1.5} />
                    <span className="font-mono text-accent-cyan">{f.target}</span>
                  </span>
                  <span>source: {f.source}</span>
                  <span>{f.time}</span>
                </div>
              </div>
            );
          })}
          {rows.length === 0 && (
            <div className="panel p-8 text-center text-[12px] text-text-muted">No findings at this severity.</div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="panel p-4">
            <h2 className="label flex items-center gap-2 text-[11px] text-text-secondary">
              <Rss className="h-3.5 w-3.5 text-accent-violet" strokeWidth={1.5} />
              Threat Feed
            </h2>
            <div className="mt-3 space-y-3">
              {THREAT_FEED.map((t) => (
                <div key={t.id} className="border-b border-line/50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-accent-violet/40 bg-accent-violet/10 px-1.5 py-px font-mono text-[9px] uppercase text-accent-violet">
                      {t.tag}
                    </span>
                    <span className="text-[10px] text-text-faint">{t.time}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <h2 className="label flex items-center gap-2 text-[11px] text-text-secondary">
              <Globe2 className="h-3.5 w-3.5 text-accent-cyan" strokeWidth={1.5} />
              Attack Surface
            </h2>
            <div className="mt-3 space-y-2 text-[12px]">
              {[
                ["Subdomains", "23"],
                ["Live hosts", "9"],
                ["Open ports", "5"],
                ["Technologies", "7"],
                ["Exposed APIs", "3"],
                ["Emails found", "14"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-line/40 pb-1.5 last:border-0">
                  <span className="text-text-muted">{k}</span>
                  <span className="font-mono text-text-primary">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel flex items-center gap-3 border-accent-red/30 p-3.5">
            <ShieldAlert className="h-4 w-4 shrink-0 text-accent-red" strokeWidth={1.5} />
            <p className="text-[11.5px] leading-relaxed text-text-secondary">
              <span className="font-semibold text-accent-red">2 critical findings</span> require review. Create a
              remediation mission from the composer.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}


