"use client";

import { AgentTimeline } from "../../components/dashboard/AgentTimeline";
import { useOrchestrator } from "../../context/OrchestratorContext";

export default function WorkflowPage() {
  const { currentProject } = useOrchestrator();

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="mb-1 text-sm font-semibold text-slate-100">
          Task workflow visualization
        </h2>
        <p className="text-xs text-slate-400">
          Track the sequential execution of agents for the active project.
        </p>
      </div>
      <AgentTimeline />
      <div className="card">
        <h3 className="mb-1 text-sm font-semibold text-slate-100">
          Active project
        </h3>
        <p className="text-sm text-slate-300">
          {currentProject
            ? currentProject.name
            : "No project selected. Create one from the New Project page."}
        </p>
      </div>
    </div>
  );
}

