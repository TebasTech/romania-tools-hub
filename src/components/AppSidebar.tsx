import { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  Calculator,
  Receipt,
  Clock,
  Baby,
  Fuel,
  ArrowLeftRight,
  Newspaper,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

const menuItems: SidebarItem[] = [
  { id: "finance", title: "Finanțe Personale", icon: Wallet },
  { id: "dashboard", title: "Panou de Control", icon: LayoutDashboard },
  { id: "net-salary", title: "Salariu Net", icon: Calculator },
  { id: "gross-salary", title: "Salariu Brut", icon: Receipt },
  { id: "pension", title: "Calculator Pensie", icon: Clock },
  { id: "benefits", title: "Calculator Indemnizații", icon: Baby },
  { id: "fuel", title: "Consum Combustibil", icon: Fuel },
  { id: "currency", title: "Convertor RON ↔ EUR", icon: ArrowLeftRight },
  { id: "news", title: "Știri Financiare", icon: Newspaper },
];

interface AppSidebarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function AppSidebar({ activeItem, onItemClick }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {!collapsed && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setCollapsed(true)} />
      )}

      <button onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-md">
        {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      <aside className={cn(
        "fixed left-0 top-0 h-full z-40 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        "lg:relative lg:z-auto",
        collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64 translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground tracking-tight">CalcRO</h1>
                <p className="text-xs text-muted-foreground">Instrumente Financiare</p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary items-center justify-center shadow-md">
          <span className="text-primary-foreground text-xs font-bold">{collapsed ? "›" : "‹"}</span>
        </button>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button key={item.id} onClick={() => { onItemClick(item.id); if (window.innerWidth < 1024) setCollapsed(true); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive ? "bg-accent text-accent-foreground shadow-sm" : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                )}>
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
                {!collapsed && <span>{item.title}</span>}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-muted-foreground text-center">© 2026 CalcRO</p>
          </div>
        )}
      </aside>
    </>
  );
}
