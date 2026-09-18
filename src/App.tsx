import { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { RightPanel } from "./components/RightPanel";
import { useStore } from "./store/useStore";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1280
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export default function App() {
  const tick = useStore((s) => s.tick);
  const rightPanelOpen = useStore((s) => s.rightPanelOpen);
  const setMobileNav = useStore((s) => s.setMobileNav);
  const isDesktop = useIsDesktop();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(tick, 2400);
    return () => window.clearInterval(id);
  }, [tick]);

  const showPanel = isDesktop ? rightPanelOpen : drawerOpen;

  return (
    <div className="flex h-screen flex-col overflow-hidden overflow-x-hidden bg-base-950">
      <TopBar onMenu={() => setMobileNav(true)} />

      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <Dashboard />
        {!isDesktop && !showPanel && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="fixed bottom-5 right-5 z-30 flex h-10 items-center gap-2 rounded-full border border-accent-blue/40 bg-base-800 px-4 text-[12px] font-medium text-text-primary shadow-lift lg:hidden"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-green" />
            Intelligence
          </button>
        )}
        {showPanel && (
          <>
            {!isDesktop && (
              <div
                onClick={() => setDrawerOpen(false)}
                className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
              />
            )}
            <div
              className={`fixed inset-y-0 right-0 z-40 shadow-lift transition-transform duration-300 xl:static xl:z-auto xl:shadow-none ${
                showPanel ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <RightPanel onClose={() => setDrawerOpen(false)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}