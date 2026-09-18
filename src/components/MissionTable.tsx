import { Bot, Clock3 } from "lucide-react";
import { RECENT_MISSIONS } from "../data/missions";
import { STATUS_MAP } from "../data/missions";
import { StatusBadge } from "./primitives";

export function MissionTable() {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-line">
              {["Mission", "Target", "Agents", "Status", "Time"].map((h) => (
                <th key={h} className="label px-4 py-2.5 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_MISSIONS.map((r) => {
              const st = STATUS_MAP[r.status];
              return (
                <tr
                  key={r.id}
                  className="border-b border-line/60 transition-colors last:border-0 hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-2.5 text-[12.5px] font-medium text-text-primary">
                    {r.mission}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11.5px] text-accent-cyan">{r.target}</td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-text-secondary">
                      <Bot className="h-3.5 w-3.5 text-text-muted" strokeWidth={1.5} />
                      {r.agents}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge {...st} pulse={r.status === "running"} />
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-text-muted">
                      <Clock3 className="h-3 w-3" strokeWidth={1.5} />
                      {r.time}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
