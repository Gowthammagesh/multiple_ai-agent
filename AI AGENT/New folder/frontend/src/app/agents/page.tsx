"use client";

import { useOrchestrator } from "../../context/OrchestratorContext";

const agents = [
  "Planning Agent",
  "Research Agent",
  "Design Agent",
  "Coding Agent",
  "Testing Agent",
  "Debugging Agent",
  "DevOps Agent",
  "Documentation Agent",
  "Content Writing Agent",
  "Presentation Agent",
  "Hosting Agent"
];

export default function AgentsPage() {
  const { agentRuns } = useOrchestrator();

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="mb-1 text-sm font-semibold text-slate-100">
          Agent status monitoring
        </h2>
        <p className="text-xs text-slate-400">
          Once connected to the backend, each agent&apos;s status, last run, and
          logs will be reflected here.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((name) => {
          const run = agentRuns.find((r) =>
            name.toLowerCase().includes(r.stage)
          );
          const status = run?.status ?? "idle";
          return (
            <div
              key={name}
              className="card space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-100">
                  {name}
                </h3>
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
              </div>
              <p className="text-xs text-slate-400">
                Status: <span className="font-mono">{status}</span>
              </p>
              <p className="text-xs text-slate-500">
                Last summary will appear here after the backend executes this
                agent.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

