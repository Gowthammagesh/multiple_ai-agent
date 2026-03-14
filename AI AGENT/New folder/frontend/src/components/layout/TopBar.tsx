import { ReactNode } from "react";

export function TopBar(): ReactNode {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-6 py-3 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold">AI Multi-Agent Project Builder</h1>
        <p className="text-xs text-slate-400">
          Define a project idea and let agents plan, code, test, and deploy.
        </p>
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Orchestrator online
        </span>
        <span className="rounded-full border border-slate-700 px-3 py-1">
          v0.1.0
        </span>
      </div>
    </header>
  );
}

