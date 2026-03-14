"use client";

import { ReactNode, useMemo } from "react";
import { AgentRun, AgentStage, useOrchestrator } from "../../context/OrchestratorContext";

const stageOrder: AgentStage[] = [
  "planning",
  "research",
  "design",
  "coding",
  "testing",
  "debugging",
  "devops",
  "documentation",
  "content",
  "presentation",
  "hosting"
];

const stageLabels: Record<AgentStage, string> = {
  planning: "Planning",
  research: "Research",
  design: "System Design",
  coding: "Coding",
  testing: "Testing",
  debugging: "Debugging",
  devops: "DevOps",
  documentation: "Documentation",
  content: "Content",
  presentation: "Presentation",
  hosting: "Hosting"
};

function getStatusForStage(runs: AgentRun[], stage: AgentStage) {
  return runs.find((run) => run.stage === stage)?.status ?? "idle";
}

export function AgentTimeline(): ReactNode {
  const { agentRuns } = useOrchestrator();

  const stagesWithStatus = useMemo(
    () =>
      stageOrder.map((stage) => ({
        stage,
        label: stageLabels[stage],
        status: getStatusForStage(agentRuns, stage)
      })),
    [agentRuns]
  );

  return (
    <div className="card">
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        Agent Workflow
      </h2>
      <div className="flex flex-wrap gap-3">
        {stagesWithStatus.map(({ stage, label, status }) => (
          <div
            key={stage}
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status === "success"
                  ? "bg-emerald-400"
                  : status === "running"
                  ? "bg-amber-400 animate-pulse"
                  : status === "error"
                  ? "bg-rose-500"
                  : "bg-slate-600"
              }`}
            />
            <span className="text-xs font-medium text-slate-100">{label}</span>
            <span className="text-[10px] uppercase tracking-wide text-slate-400">
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

