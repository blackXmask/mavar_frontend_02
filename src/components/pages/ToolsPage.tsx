import { useState } from "react";
import { Play, Settings2, ChevronDown, Wrench } from "lucide-react";
import { TOOL_CONFIGS } from "../../data/tools";
import { ProgressBar } from "../primitives";
import type { TerminalLine } from "../../data/types";

export function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string>("tool-recon");
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState("Quick");
  const [running, setRunning] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [progress, setProgress] = useState(0);

  const cfg = TOOL_CONFIGS[activeTool];
  if (!cfg) return null;

  const toggleOption = (opt: string) => {
    setOptions((prev) => ({ ...prev, [opt]: !prev[opt] }));
  };

  const startTool = () => {
    if (!target.trim()) return;
    setRunning(true);
    setProgress(0);
    setLines([]);

    const modeIdx = cfg.modes.indexOf(mode);
    const opCount = Object.values(options).filter(Boolean).length;
    const total = cfg.outputLines.length + (modeIdx > 0 ? 2 : 0) + (opCount > 0 ? opCount : 0);

    const newLines: TerminalLine[] = [
      { t: "20:00:00", tag: "sys", text: `${cfg.name}: tool execution started (${cfg.tagline})` },
      { t: "20:00:00", tag: "sys", text: `Target: ${target}` },
      { t: "20:00:00", tag: "sys", text: `Mode: ${mode}${opCount > 0 ? ` | ${opCount} option(s) selected` : ""}` },
    ];
    setLines(newLines);

    let i = 0;
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + Math.round((100 / total) * 1.5)));
      const idx = i % cfg.outputLines.length;
      const ts = new Date();
      const timeStr = ts.toLocaleTimeString("en-GB", { hour12: false });
      setLines((prev) => [
        ...prev,
        { t: timeStr, ...cfg.outputLines[idx] },
      ]);
      i++;
      if (i > total + 5) {
        clearInterval(interval);
        setRunning(false);
        setProgress(100);
      }
    }, 2800);
  };

return (
  <div className="space-y-4 px-4 py-5 md:px-6">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-sans text-lg font-bold text-text-primary md:text-xl">Tools</h1>
        <p className="mt-0.5 text-[12.5px] text-text-muted">Specialized intelligence engines — each with its own processing pipeline</p>
      </div>
    </div>

    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-2">
            {Object.values(TOOL_CONFIGS).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`w-full flex items-center gap-3 rounded-lg p-3 text-left transition-all ${
                  activeTool === t.id
                    ? "bg-accent-blue/10 border border-accent-blue/40 shadow-glow"
                    : "border border-line bg-base-800/40 hover:border-accent-blue/30 hover:bg-base-800/60"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                    activeTool === t.id ? "bg-accent-blue/20" : "bg-base-800/70"
                  }`}
                >
                  <Wrench className={`h-4 w-4 ${activeTool === t.id ? "text-accent-blue" : "text-text-muted"}`} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className={`text-[12.5px] font-semibold ${activeTool === t.id ? "text-text-primary" : "text-text-secondary"}`}>{t.name}</p>
                  <p className="text-[10.5px] text-text-muted line-clamp-1">{t.tagline}</p>
                </div>
                {activeTool === t.id && (
                  <div className="ml-auto">
                    <ChevronDown className="h-3.5 w-3.5 text-accent-cyan" strokeWidth={2} />
                  </div>
                )}
              </button>
            ))}
          </aside>

          <div className="space-y-4">
            <div className="panel p-4">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="h-3.5 w-3.5 text-accent-blue" strokeWidth={1.5} />
                <span className="label text-[11px] text-text-secondary">{cfg.tagline}</span>
              </div>
              <p className="text-[12px] leading-relaxed text-text-muted">{cfg.description}</p>
            </div>

<div className="panel p-4">
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-text-muted mb-2">
                <Settings2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                Target
              </label>
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={cfg.placeholder}
                onKeyDown={(e) => e.key === "Enter" && startTool()}
                className="w-full rounded-md border border-line bg-base-800/60 px-3 py-2 text-[12.5px] font-mono text-text-primary outline-none placeholder:text-text-faint focus:border-accent-blue/50"
              />
            </div>

            {cfg.options.length > 0 && (
              <div className="panel p-4">
                <label className="text-[11px] uppercase tracking-wider text-text-muted mb-2 block">Options</label>
                <div className="grid gap-2">
                  {cfg.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2.5 cursor-pointer text-[12px] text-text-secondary"
                    >
                      <input
                        type="checkbox"
                        checked={!!options[opt]}
                        onChange={() => toggleOption(opt)}
                        className="h-3.5 w-3.5 rounded border-line bg-base-800 text-accent-cyan focus:ring-accent-blue/40"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="panel p-4">
              <label className="text-[11px] uppercase tracking-wider text-text-muted mb-2 block">Execution Mode</label>
              <div className="flex gap-2">
                {cfg.modes.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-lg border px-3 py-1.5 text-[11.5px] capitalize transition-colors ${
                      mode === m
                        ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                        : "border-line text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={startTool}
                disabled={running || !target.trim()}
                className="flex items-center gap-2 rounded-lg bg-accent-blue/90 px-4 py-2 text-[12px] font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Play className="h-3.5 w-3.5" strokeWidth={2} />
                {running ? "Running..." : "Run Tool"}
              </button>
            </div>

<div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-3 py-2">
              <span className="label text-[11px] text-text-secondary">Output</span>
              <span className="font-mono text-[10px] text-text-muted">
                {Math.round(progress)}% · {lines.length} lines
              </span>
            </div>
            <ProgressBar value={progress} className="mb-3" />
            <div className="min-h-[200px] max-h-[400px] overflow-y-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed">
              {lines.map((l, i) => (
                <div key={i} className="flex gap-3 animate-fadeup">
                  <span className="shrink-0 text-text-faint">[{l.t}]</span>
                  <span className="text-text-secondary">{l.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


