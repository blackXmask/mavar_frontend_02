import { Terminal } from "lucide-react";
import { LOGS } from "../../data/extras";
import { ProgressBar } from "../primitives";

export function LogsPage() {
  return (
    <div className="space-y-4 px-4 py-5 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-sans text-lg font-bold text-text-primary md:text-xl">Logs</h1>
          <p className="mt-0.5 text-[12.5px] text-text-muted">Execution history — every mission, tool, and agent run, recorded</p>
        </div>
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-3 py-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-accent-cyan" strokeWidth={1.5} />
            <span className="label text-[11px] text-text-secondary">System Log</span>
          </div>
          <span className="font-mono text-[10px] text-text-muted">{LOGS.length} entries</span>
        </div>
        <div className="max-h-[70vh] p-3 overflow-y-auto">
          {LOGS.map((l, i) => (
            <div key={i} className="flex gap-3 px-2 py-1 animate-fadeup">
              <span className="shrink-0 text-text-faint">[{l.t}]</span>
              <span className={`shrink-0 font-mono font-semibold ${logLevelClasses[l.level]}`}>{l.level}</span>
              <span className="text-text-secondary line-clamp-1">{l.text}</span>
            </div>
          ))}
        </div>
      </div >
    </div >
  );
}

const logLevelClasses: Record<string, string> = {
  INFO: "text-accent-cyan",
  WARN: "text-accent-amber",
  ERROR: "text-accent-red",
  SYS: "text-accent-blue",
};
