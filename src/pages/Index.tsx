import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { FinancePage } from "@/components/pages/FinancePage";
import { DashboardPage } from "@/components/pages/DashboardPage";
import { NetSalaryPage } from "@/components/pages/NetSalaryPage";
import { GrossSalaryPage } from "@/components/pages/GrossSalaryPage";
import { PensionPage } from "@/components/pages/PensionPage";
import { BenefitsPage } from "@/components/pages/BenefitsPage";
import { FuelPage } from "@/components/pages/FuelPage";
import { CurrencyPage } from "@/components/pages/CurrencyPage";
import { NewsPage } from "@/components/pages/NewsPage";
import { User, LogOut, Settings } from "lucide-react";
import logo from "@/assets/logos4.png";

const pages: Record<string, React.FC> = {
  finance: FinancePage,
  dashboard: DashboardPage,
  "net-salary": NetSalaryPage,
  "gross-salary": GrossSalaryPage,
  pension: PensionPage,
  benefits: BenefitsPage,
  fuel: FuelPage,
  currency: CurrencyPage,
  news: NewsPage,
};

const Index = () => {
  const [activePage, setActivePage] = useState("finance");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const ActiveComponent = pages[activePage] || FinancePage;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar activeItem={activePage} onItemClick={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-end gap-4 px-6 py-3 border-b border-border bg-card">
          <img src={logo} alt="Logo" className="h-9 object-contain" />
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Conta</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-40 rounded-lg border border-border bg-popover shadow-lg py-1 z-50">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors">
                  <Settings className="h-4 w-4" /> Editar
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 lg:pl-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
