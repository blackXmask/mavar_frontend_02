import { ChevronRight } from "lucide-react";
import type { Mission } from "../data/types";
import { ProgressBar, StatusBadge } from "./primitives";
import { STATUS_MAP } from "../data/missions";

export function MissionCard({ mission }: { mission: Mission }) {
  const st = STATUS_MAP[mission.status];
  return (
    <button className="group w-full rounded-xl border border-line bg-base-800/40 p-3 text-left transition-all duration-200 hover:border-accent-blue/35 hover:bg-base-800/70">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-semibold text-text-primary">
            {mission.title}{" "}
            <span className="font-normal text-text-muted">— {mission.target}</span>
          </p>
          <p className="mt-0.5 truncate text-[11px] text-text-muted">{mission.scope}</p>
        </div>
        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-text-secondary" />
      </div>

      <div className="mt-2.5 flex items-center gap-2.5">
        <StatusBadge {...st} pulse={mission.status === "running"} />
        <span className="font-mono text-[11px] text-text-secondary">{mission.progress}%</span>
        <span className="ml-auto min-w-0 truncate text-[10.5px] text-text-muted">{mission.meta}</span>
      </div>
      <ProgressBar value={mission.progress} className="mt-2" />
    </button>
  );
}
