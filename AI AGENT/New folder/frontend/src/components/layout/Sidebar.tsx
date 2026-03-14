import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/projects/new", label: "New Project" },
  { href: "/workflows", label: "Workflow" },
  { href: "/agents", label: "Agents" },
  { href: "/outputs", label: "Outputs" }
];

function NavLink({ href, label }: NavItem) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses =
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
  const activeClasses = "bg-primary-600 text-white shadow";
  const inactiveClasses =
    "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar(): ReactNode {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950/80 px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-lg font-bold">
            AI
          </span>
          <div>
            <p className="text-sm font-semibold">Multi-Agent Builder</p>
            <p className="text-xs text-slate-400">Orchestrate project creation</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <div className="mt-4 border-t border-slate-800 pt-4 text-xs text-slate-500">
        <p>Next.js • Tailwind • FastAPI</p>
      </div>
    </aside>
  );
}

