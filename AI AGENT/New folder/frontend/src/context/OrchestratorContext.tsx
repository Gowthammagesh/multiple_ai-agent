\"use client\";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState
} from \"react\";

export type AgentStage =
  | \"planning\"
  | \"research\"
  | \"design\"
  | \"coding\"
  | \"testing\"
  | \"debugging\"
  | \"devops\"
  | \"documentation\"
  | \"content\"
  | \"presentation\"
  | \"hosting\";

export type AgentStatus = \"idle\" | \"queued\" | \"running\" | \"success\" | \"error\";

export type AgentRun = {
  id: string;
  stage: AgentStage;
  status: AgentStatus;
  startedAt?: string;
  finishedAt?: string;
  summary?: string;
};

export type Project = {
  id: string;
  name: string;
  idea: string;
  createdAt: string;
  status: \"idle\" | \"running\" | \"completed\" | \"failed\";
};

type OrchestratorContextValue = {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  agentRuns: AgentRun[];
  setAgentRuns: (runs: AgentRun[]) => void;
};

const OrchestratorContext = createContext<OrchestratorContextValue | undefined>(
  undefined
);

export function OrchestratorProvider({
  children
}: {
  children: ReactNode;
}): ReactNode {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [agentRuns, setAgentRuns] = useState<AgentRun[]>([]);

  const value = useMemo(
    () => ({
      currentProject,
      setCurrentProject,
      agentRuns,
      setAgentRuns
    }),
    [currentProject, agentRuns]
  );

  return (
    <OrchestratorContext.Provider value={value}>
      {children}
    </OrchestratorContext.Provider>
  );
}

export function useOrchestrator(): OrchestratorContextValue {
  const ctx = useContext(OrchestratorContext);
  if (!ctx) {
    throw new Error(\"useOrchestrator must be used within OrchestratorProvider\");
  }
  return ctx;
}

