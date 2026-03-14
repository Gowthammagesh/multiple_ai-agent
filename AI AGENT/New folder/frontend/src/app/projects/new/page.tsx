"use client";

import { FormEvent, useState } from "react";
import { OrchestratorProvider, useOrchestrator } from "../../../context/OrchestratorContext";

function NewProjectFormInner() {
  const { setCurrentProject, setAgentRuns } = useOrchestrator();
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = `proj_${Date.now()}`;
    const project = {
      id,
      name: name || "Untitled Project",
      idea,
      createdAt: new Date().toISOString(),
      status: "idle" as const
    };
    setCurrentProject(project);
    setAgentRuns([]);
    // In a later step, we will call the FastAPI backend here to start the pipeline.
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="card">
        <h2 className="mb-2 text-sm font-semibold text-slate-100">
          Create new project
        </h2>
        <p className="text-xs text-slate-400">
          Describe your idea and let the agents plan, design, code, test, and
          deploy it automatically.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="card space-y-4"
      >
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-200">
            Project name
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none"
            placeholder="AI SaaS for multi-agent workflows"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-200">
            Project idea
          </label>
          <textarea
            className="h-40 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none"
            placeholder="Describe what you want the platform to build. Include target users, core features, and any constraints."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Save project (mock)
        </button>
      </form>
    </div>
  );
}

export default function NewProjectPage() {
  // Already wrapped by OrchestratorProvider in layout, but keep component simple and client-only here.
  return <NewProjectFormInner />;
}

