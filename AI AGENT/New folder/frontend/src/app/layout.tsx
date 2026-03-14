import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { TopBar } from "../components/layout/TopBar";
import { OrchestratorProvider } from "../context/OrchestratorContext";

export const metadata: Metadata = {
  title: "AI Multi-Agent Project Builder",
  description: "Orchestrate AI agents to build full software projects."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <OrchestratorProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <TopBar />
              <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                {children}
              </main>
            </div>
          </div>
        </OrchestratorProvider>
      </body>
    </html>
  );
}

