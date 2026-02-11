import { useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

const defaultTransactions: Transaction[] = [
  { id: "1", description: "Salariu", amount: 5000, type: "income", category: "Salariu", date: "2026-02-01" },
  { id: "2", description: "Chirie", amount: 1500, type: "expense", category: "Locuință", date: "2026-02-01" },
  { id: "3", description: "Cumpărături", amount: 800, type: "expense", category: "Mâncare", date: "2026-02-03" },
  { id: "4", description: "Freelance", amount: 2000, type: "income", category: "Venituri extra", date: "2026-02-05" },
  { id: "5", description: "Utilități", amount: 400, type: "expense", category: "Locuință", date: "2026-02-05" },
];

export function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const addTransaction = () => {
    if (!desc || !amount || !category) return;
    const newT: Transaction = {
      id: Date.now().toString(),
      description: desc,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newT, ...transactions]);
    setDesc("");
    setAmount("");
    setCategory("");
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Finanțe Personale</h2>
        <p className="text-muted-foreground mt-1">Gestionează veniturile și cheltuielile tale.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground mb-1">Sold Total</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-success" : "text-destructive"}`}>
            {balance.toLocaleString("ro-RO")} RON
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-success" />
            <p className="text-sm text-muted-foreground">Venituri</p>
          </div>
          <p className="text-2xl font-bold text-success">{totalIncome.toLocaleString("ro-RO")} RON</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <p className="text-sm text-muted-foreground">Cheltuieli</p>
          </div>
          <p className="text-2xl font-bold text-destructive">{totalExpense.toLocaleString("ro-RO")} RON</p>
        </div>
      </div>

      {/* Add Transaction */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Adaugă Tranzacție</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input
            placeholder="Descriere"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            placeholder="Sumă (RON)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            placeholder="Categorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="expense">Cheltuială</option>
            <option value="income">Venit</option>
          </select>
          <button
            onClick={addTransaction}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Adaugă
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tranzacții Recente</h3>
        <div className="space-y-2">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg bg-background border border-border"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${t.type === "income" ? "bg-success" : "bg-destructive"}`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.category} · {t.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}
                >
                  {t.type === "income" ? "+" : "-"}{t.amount.toLocaleString("ro-RO")} RON
                </span>
                <button
                  onClick={() => removeTransaction(t.id)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
