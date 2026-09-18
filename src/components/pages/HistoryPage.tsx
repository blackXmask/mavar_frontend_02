import { useMemo, useState } from "react";
import { Search, Download, Clock3, Bot, FileWarning } from "lucide-react";
import { HISTORY } from "../../data/extras";
import { STATUS_MAP } from "../../data/missions";
import { StatusBadge } from "../primitives";

const FILTERS = ["all", "completed", "failed"] as const;

export function HistoryPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const rows = useMemo(
    () =>
      HISTORY.filter((r) => {
        const okQ = !q || (r.mission + " " + r.target).toLowerCase().includes(q.toLowerCase());
        const okF = filter === "all" || r.status === filter;
        return okQ && okF;
      }),
    [q, filter]
  );

  return (
    <div className="space-y-4 px-4 py-5 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-sans text-lg font-bold text-text-primary md:text-xl">Mission History</h1>
          <p className="mt-0.5 text-[12.5px] text-text-muted">Every mission executed in this workspace</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-line bg-base-800/60 px-3 py-1.5 text-[12px] text-text-secondary transition-colors hover:border-accent-blue/40 hover:text-text-primary">
          <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
          Export
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-base-800/50 px-3 sm:max-w-xs">
          <Search className="h-3.5 w-3.5 shrink-0 text-text-muted" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search missions or targets..."
            className="w-full bg-transparent text-[12.5px] text-text-primary outline-none placeholder:text-text-faint"
          />
        </div>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg border px-2.5 py-1.5 text-[11.5px] capitalize transition-colors ${
              filter === f
                ? "border-accent-blue/40 bg-accent-blue/10 text-text-primary"
                : "border-line text-text-muted hover:text-text-secondary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-line">
                {["Mission", "Target", "Agents", "Duration", "Findings", "Status", "When"].map((h) => (
                  <th key={h} className="label px-4 py-2.5 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const st = STATUS_MAP[r.status];
                return (
                  <tr
                    key={r.id}
                    className="border-b border-line/60 transition-colors last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-2.5 text-[12.5px] font-medium text-text-primary">{r.mission}</td>
                    <td className="px-4 py-2.5 font-mono text-[11.5px] text-accent-cyan">{r.target}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-text-secondary">
                        <Bot className="h-3.5 w-3.5 text-text-muted" strokeWidth={1.5} />
                        {r.agents}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] text-text-muted">
                        <Clock3 className="h-3 w-3" strokeWidth={1.5} />
                        {r.duration}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-text-secondary">
                        <FileWarning className="h-3.5 w-3.5 text-text-muted" strokeWidth={1.5} />
                        {r.findings}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge {...st} pulse={r.status === "running"} />
                    </td>
                    <td className="px-4 py-2.5 text-[11.5px] text-text-muted">{r.time}</td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-[12px] text-text-muted">
                    No missions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
