import { useStore } from "../store/useStore";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  status: "done" | "active" | "idle";
  meta?: string;
}

export function AgentGraph() {
  const agents = useStore((s) => s.agents);
  const phase = useStore((s) => s.phase);

  const agentNodes: Node[] = agents.map((a, i) => ({
    id: a.id,
    label: a.name,
    x: 24 + (i % 2) * 150,
    y: 150 + Math.floor(i / 2) * 52,
    w: 132,
    status: a.status === "active" ? "active" : "idle",
    meta: `${a.taskCount} tasks`,
  }));

  const nodes: Node[] = [
    { id: "mission", label: "Mission", x: 105, y: 8, w: 132, status: "done" },
    { id: "planner", label: "Planner", x: 105, y: 62, w: 132, status: phase === "running" ? "active" : "done" },
    { id: "graph", label: "Task Graph", x: 105, y: 112, w: 132, status: phase === "running" ? "active" : "done", meta: "9 tasks" },
    ...agentNodes,
    { id: "intel", label: "Intelligence", x: 105, y: 268, w: 132, status: phase === "running" ? "active" : "idle" },
    { id: "results", label: "Results", x: 105, y: 320, w: 132, status: "idle", meta: "partial" },
  ];

  const links: [string, string][] = [
    ["mission", "planner"],
    ["planner", "graph"],
    ["graph", "recon"],
    ["graph", "webhunter"],
    ["graph", "osint"],
    ["graph", "security"],
    ["recon", "intel"],
    ["webhunter", "intel"],
    ["osint", "intel"],
    ["security", "intel"],
    ["intel", "results"],
  ];

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const cx = (n: Node) => n.x + n.w / 2;

  return (
    <div className="terminal-scroll h-full overflow-auto">
      <svg
        viewBox="0 0 330 370"
        className="mx-auto h-auto w-full max-w-[330px]"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="rgba(99,125,180,0.5)" />
          </marker>
        </defs>
        {links.map(([a, b]) => {
          const na = byId[a];
          const nb = byId[b];
          if (!na || !nb) return null;
          const active = na.status === "active" && nb.status === "active";
          const fromBottom = na.y + 22;
          const toTop = nb.y;
          const midY = (fromBottom + toTop) / 2;
          return (
            <path
              key={`${a}-${b}`}
              d={`M ${cx(na)} ${fromBottom} C ${cx(na)} ${midY}, ${cx(nb)} ${midY}, ${cx(nb)} ${toTop}`}
              fill="none"
              stroke={active ? "rgba(77,124,254,0.7)" : "rgba(99,125,180,0.25)"}
              strokeWidth="1"
              markerEnd="url(#arrow)"
              strokeDasharray={active ? "4 4" : undefined}
              className={active ? "animate-flow-line" : undefined}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
            <rect
              width={n.w}
              height="34"
              rx="8"
              fill={
                n.status === "active"
                  ? "rgba(77,124,254,0.12)"
                  : n.status === "done"
                  ? "rgba(52,211,153,0.06)"
                  : "rgba(12,18,34,0.9)"
              }
              stroke={
                n.status === "active"
                  ? "rgba(77,124,254,0.55)"
                  : n.status === "done"
                  ? "rgba(52,211,153,0.3)"
                  : "rgba(99,125,180,0.22)"
              }
            />
            {n.status === "active" && (
              <circle cx={n.w - 10} cy={10} r="2.5" fill="#4D7CFE" className="animate-pulse-dot" />
            )}
            {n.status === "done" && (
              <circle cx={n.w - 10} cy={10} r="2.5" fill="rgba(52,211,153,0.8)" />
            )}
            <text x="10" y="15" fontSize="10" fill="#E6ECF8" fontFamily="Space Grotesk, sans-serif" fontWeight="500">
              {n.label}
            </text>
            {n.meta && (
              <text x="10" y="26" fontSize="8.5" fill="#5B6A8F" fontFamily="JetBrains Mono, monospace">
                {n.meta}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
