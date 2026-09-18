import { useState } from "react";
import { Check, Globe, Zap, Shield, Monitor } from "lucide-react";
import type { Setting } from "../../data/extras";
import { SETTINGS } from "../../data/extras";

export function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const activeCount = settings.length;
  const totalCount = SETTINGS.length;

  return (
    <div className="space-y-4 px-4 py-5 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-sans text-lg font-bold text-text-primary md:text-xl">Settings</h1>
          <p className="mt-0.5 text-[12.5px] text-text-muted">
            {activeCount} of {totalCount} active — configure platform behavior
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {SETTINGS.map((s) => {
          const enabled = settings.includes(s.id);
          const statusLabel = enabled
            ? "Enabled"
            : s.default
            ? "Default"
            : "Disabled";

          return (
            <div
              key={s.id}
              className={`panel flex items-start gap-3 p-4 transition-all ${
                enabled
                  ? "border border-accent-green/40 bg-base-800/60 shadow-glow"
                  : "border border-line bg-base-800/40"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                  enabled ? "bg-accent-green/20" : "bg-base-800/70"
                }`}
              >
                {s.icon === "globe" && <Globe className="h-4 w-4 text-accent-teal" strokeWidth={1.5} />}
                {s.icon === "zap" && <Zap className="h-4 w-4 text-accent-amber" strokeWidth={1.5} />}
                {s.icon === "shield" && <Shield className="h-4 w-4 text-accent-red" strokeWidth={1.5} />}
                {s.icon === "monitor" && <Monitor className="h-4 w-4 text-accent-violet" strokeWidth={1.5} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="text-[13px] font-semibold text-text-primary">{s.title}</h2>
                  <span className="label text-[10px] uppercase tracking-wider text-text-muted">{statusLabel}</span>
                </div>
                <p className="mt-1 text-[11.5px] text-text-muted line-clamp-2">{s.description}</p>
              </div>

              <button
                onClick={() => toggleSetting(s.id)}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  enabled
                    ? "border-accent-green/50 bg-accent-green/15"
                    : "border-line bg-base-800 hover:border-accent-green/30"
                }`}
              >
                {enabled && (
                  <Check className="h-3.5 w-3.5 text-accent-green" strokeWidth={2.5} />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="panel p-4">
        <div className="flex flex-wrap items-start gap-3">
          <Globe className="mt-0.5 h-3.5 w-3.5 text-accent-teal shrink-0" strokeWidth={1.5} />
          <div className="min-w-0">
            <label className="text-[11px] uppercase tracking-wider text-text-muted mb-1.5 block">Platform Region</label>
            <div className="flex gap-2">
              {REGION_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {}}
                  className="rounded-lg border border-line px-3 py-1.5 text-[11.5px] text-text-secondary hover:text-text-primary hover:border-accent-blue/30"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const REGION_OPTIONS = [
  { id: "us", label: "United States" },
  { id: "eu", label: "European Union" },
  { id: "apac", label: "APAC" },
  { id: "mea", label: "MEA" },
];
