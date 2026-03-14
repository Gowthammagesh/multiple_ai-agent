"use client";

import { useOrchestrator } from "../../context/OrchestratorContext";

export default function OutputsPage() {
  const { currentProject } = useOrchestrator();

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="mb-1 text-sm font-semibold text-slate-100">
          Output viewer
        </h2>
        <p className="text-xs text-slate-400">
          This page will surface generated code artifacts, documentation,
          presentation decks, and deployment links from the backend agents.
        </p>
      </div>
      <div className="card">
        <h3 className="mb-1 text-sm font-semibold text-slate-100">
          Current project
        </h3>
        <p className="text-sm text-slate-300">
          {currentProject
            ? currentProject.name
            : "No active project. Create one to see outputs here."}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="card">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Project code
          </h4>
          <p className="text-xs text-slate-300">
            Once the coding and testing agents run, you&apos;ll see a link to
            the generated repository or code bundle here.
          </p>
        </div>
        <div className="card">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Documentation
          </h4>
          <p className="text-xs text-slate-300">
            API references, architecture diagrams, and usage guides from the
            documentation agent will appear here.
          </p>
        </div>
        <div className="card">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Presentation & deployment
          </h4>
          <p className="text-xs text-slate-300">
            Presentation decks, marketing copy, and deployed app links from the
            hosting agent will be listed here.
          </p>
        </div>
      </div>
    </div>
  );
}

