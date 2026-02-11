import { useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
}

const CATEGORIES = [
  "Chirie", "Energie Electrică", "Gaz", "Apă", "Internet & TV",
  "Telefon", "Mâncare", "Transport", "Abonamente", "Asigurări",
  "Educație", "Sănătate", "Îmbrăcăminte", "Divertisment", "Altele",
];

const MONTHS = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

type MonthData = Record<string, Expense[]>;

const now = new Date();

export function FinancePage() {
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [data, setData] = useState<MonthData>({});
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const key = `${year}-${month}`;
  const expenses = data[key] || [];
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const addExpense = () => {
    if (!desc || !amount) return;
    const newE: Expense = { id: Date.now().toString(), description: desc, amount: parseFloat(amount), category };
    setData({ ...data, [key]: [newE, ...expenses] });
    setDesc(""); setAmount("");
  };

  const removeExpense = (id: string) => {
    setData({ ...data, [key]: expenses.filter((e) => e.id !== id) });
  };

  const grouped = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Finanțe Personale</h2>
        <p className="text-muted-foreground mt-1">Gestionează cheltuielile lunare. Selectează luna și adaugă cheltuielile.</p>
      </div>

      {/* Month Selector */}
      <div className="stat-card flex items-center justify-between">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h3 className="text-lg font-semibold text-foreground">{MONTHS[month]} {year}</h3>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground mb-1">Total Cheltuieli - {MONTHS[month]}</p>
          <p className="text-2xl font-bold text-destructive">{total.toLocaleString("ro-RO")} RON</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground mb-1">Categorii Folosite</p>
          <p className="text-2xl font-bold text-foreground">{Object.keys(grouped).length}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(grouped).length > 0 && (
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Cheltuieli pe Categorii</h3>
          <div className="space-y-2">
            {Object.entries(grouped).sort((a, b) => b[1] - a[1]).map(([cat, val]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{cat}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(val / total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-20 text-right">{val.toLocaleString("ro-RO")} RON</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Expense */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Adaugă Cheltuială</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input placeholder="Descriere" value={desc} onChange={(e) => setDesc(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          <input placeholder="Sumă (RON)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={addExpense}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Adaugă
          </button>
        </div>
      </div>

      {/* Expense List */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Cheltuieli - {MONTHS[month]}</h3>
        {expenses.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nicio cheltuială adăugată pentru această lună.</p>
        ) : (
          <div className="space-y-2">
            {expenses.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-3 px-4 rounded-lg bg-background border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{e.description}</p>
                  <p className="text-xs text-muted-foreground">{e.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-destructive">-{e.amount.toLocaleString("ro-RO")} RON</span>
                  <button onClick={() => removeExpense(e.id)} className="p-1 rounded hover:bg-muted transition-colors">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
