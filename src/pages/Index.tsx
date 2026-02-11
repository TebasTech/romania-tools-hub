import { useState } from "react";
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
  const ActiveComponent = pages[activePage] || FinancePage;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar activeItem={activePage} onItemClick={setActivePage} />
      <main className="flex-1 p-6 lg:p-8 lg:pl-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default Index;
