import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardPage } from "@/components/pages/DashboardPage";
import { FinancePage } from "@/components/pages/FinancePage";
import { CalculatorPage } from "@/components/pages/CalculatorPage";
import { PercentagePage } from "@/components/pages/PercentagePage";
import { DateCalcPage } from "@/components/pages/DateCalcPage";
import { BMIPage } from "@/components/pages/BMIPage";
import { UnitConverterPage } from "@/components/pages/UnitConverterPage";
import { FuelPage } from "@/components/pages/FuelPage";
import { TimeConverterPage } from "@/components/pages/TimeConverterPage";

const pages: Record<string, React.FC> = {
  dashboard: DashboardPage,
  finance: FinancePage,
  calculator: CalculatorPage,
  percentage: PercentagePage,
  date: DateCalcPage,
  bmi: BMIPage,
  unit: UnitConverterPage,
  fuel: FuelPage,
  time: TimeConverterPage,
};

const Index = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const ActiveComponent = pages[activePage] || DashboardPage;

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
