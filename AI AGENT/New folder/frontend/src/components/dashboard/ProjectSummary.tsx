"use client";

import { ReactNode } from "react";
import { useOrchestrator } from "../../context/OrchestratorContext";

export function ProjectSummary(): ReactNode {
  const { currentProject } = useOrchestrator();

  if (!currentProject) {
    return (
      <div className="card">
        <h2 className="mb-2 text-sm font-semibold text-slate-100">
          No active project
        </h2>
        <p className="text-sm text-slate-400">
          Create a new project to start the multi-agent workflow.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-1 text-sm font-semibold text-slate-100">
            {currentProject.name}
          </h2>
          <p className="text-xs text-slate-400">
            Created {new Date(currentProject.createdAt).toLocaleString()}
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
          {currentProject.status}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-300 line-clamp-3">
        {currentProject.idea}
      </p>
    </div>
  );
}

