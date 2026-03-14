import { AgentTimeline } from "../components/dashboard/AgentTimeline";
import { ProjectSummary } from "../components/dashboard/ProjectSummary";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <ProjectSummary />
          <AgentTimeline />
        </div>
        <div className="space-y-3">
          <div className="card">
            <h2 className="mb-2 text-sm font-semibold text-slate-100">
              Quick actions
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Create a new project</li>
              <li>• Resume last run</li>
              <li>• Inspect agent logs</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="mb-2 text-sm font-semibold text-slate-100">
              System status
            </h2>
            <p className="text-xs text-slate-400">
              Backend API and orchestrator health checks will appear here once
              connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

