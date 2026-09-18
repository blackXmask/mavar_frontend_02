import { Crosshair, Code2, Radar, BrainCircuit, Zap, Globe } from "lucide-react";
import { QUICK_MISSIONS } from "../data/agents";
import { useStore } from "../store/useStore";

const ICONS: Record<string, typeof Crosshair> = {
  recon: Radar,
  subdomain: Crosshair,
  api: Code2,
  intel: BrainCircuit,
  deploy: Zap,
};

export function QuickMissions() {
  const setComposer = useStore((s) => s.setComposer);
  return (
    <div>
      <p className="label mb-2.5">Quick Missions</p>
      <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {QUICK_MISSIONS.map((q) => {
          const Icon = ICONS[q.icon] ?? Globe;
          return (
            <button
              key={q.id}
              onClick={() => setComposer(q.text)}
              className="flex shrink-0 snap-start items-center gap-2 rounded-lg border border-line bg-base-800/50 px-3 py-1.5 text-[12px] text-text-secondary transition-all duration-150 hover:border-accent-blue/40 hover:bg-accent-blue/10 hover:text-text-primary md:snap-none"
            >
              <Icon className="h-3.5 w-3.5 text-accent-blue" strokeWidth={1.5} />
              {q.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
