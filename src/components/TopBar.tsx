import { ChevronDown, Hexagon, Menu, PanelRight } from "lucide-react";
import { useStore } from "../store/useStore";

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const toggleRightPanel = useStore((s) => s.toggleRightPanel);
  return (
    <header className="flex h-12 w-full shrink-0 items-center justify-between gap-3 border-b border-line bg-base-900/70 px-3 backdrop-blur md:px-4">
      <div className="flex min-w-0 items-center gap-3 md:gap-6">
        <button
          onClick={onMenu}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-text-secondary transition-colors hover:text-text-primary lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <div className="flex shrink-0 items-center gap-2">
          <div className="relative flex h-6 w-6 items-center justify-center">
            <Hexagon className="h-6 w-6 text-accent-blue" strokeWidth={1.5} />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
          </div>
          <span className="font-sans text-[15px] font-bold tracking-[0.18em] text-text-primary">
            MAVAR
          </span>
        </div>
        <div className="hidden min-w-0 items-center gap-3 border-l border-line pl-3 md:flex lg:pl-6">
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-text-secondary">
            The Mavar Ecosystem
          </span>
          <span className="hidden truncate text-[10px] uppercase tracking-[0.12em] text-text-faint lg:block">
            One Platform · Multiple Intelligence Systems
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <div className="mr-1 hidden items-center gap-2 rounded-md border border-line bg-base-800/60 px-2.5 py-1 md:flex">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-green shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          <span className="text-[11px] font-medium text-accent-green">System Ready</span>
        </div>
        <div className="hidden items-center gap-3 border-r border-line pr-4 md:flex">
          <div className="text-right leading-tight">
            <p className="text-[11px] font-medium text-text-primary">MAVAR Studio</p>
            <p className="text-[10px] text-text-muted">Personal Workspace</p>
          </div>
        </div>
        <button
          onClick={toggleRightPanel}
          className="hidden h-7 w-7 items-center justify-center rounded-md border border-line text-text-muted transition-colors hover:text-text-primary lg:flex"
          title="Toggle intelligence panel"
        >
          <PanelRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        <button className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-base-800/60 py-1 pl-1 pr-2 transition-colors hover:border-line-strong">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-accent-blue to-accent-indigo text-[10px] font-semibold text-white">
            AA
          </span>
          <span className="hidden text-[12px] font-medium text-text-primary sm:block">
            Ayaz Ahmad
          </span>
          <ChevronDown className="h-3 w-3 text-text-muted" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
