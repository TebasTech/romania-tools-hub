import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RateData {
  date: string;
  rate: number;
}

export function CurrencyPage() {
  const [amount, setAmount] = useState("1000");
  const [direction, setDirection] = useState<"RON_EUR" | "EUR_RON">("RON_EUR");
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [history, setHistory] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      // Current rate
      const res = await fetch("https://api.frankfurter.dev/v1/latest?from=EUR&to=RON");
      const data = await res.json();
      setCurrentRate(data.rates?.RON || null);

      // Historical rates (last 6 months)
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      const startStr = start.toISOString().split("T")[0];
      const endStr = end.toISOString().split("T")[0];

      const histRes = await fetch(`https://api.frankfurter.dev/v1/${startStr}..${endStr}?from=EUR&to=RON`);
      const histData = await histRes.json();

      if (histData.rates) {
        const entries = Object.entries(histData.rates as Record<string, { RON: number }>);
        // Sample ~30 points for chart
        const step = Math.max(1, Math.floor(entries.length / 30));
        const chartData: RateData[] = entries
          .filter((_, i) => i % step === 0 || i === entries.length - 1)
          .map(([date, rates]) => ({
            date: new Date(date).toLocaleDateString("ro-RO", { month: "short", day: "numeric" }),
            rate: rates.RON,
          }));
        setHistory(chartData);
      }
    } catch (err) {
      console.error("Failed to fetch rates:", err);
    }
    setLoading(false);
  };

  const amountVal = parseFloat(amount) || 0;
  const converted = currentRate
    ? direction === "RON_EUR"
      ? amountVal / currentRate
      : amountVal * currentRate
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Convertor RON ↔ EUR</h2>
        <p className="text-muted-foreground mt-1">Curs valutar în timp real de la Banca Centrală Europeană.</p>
      </div>

      {/* Converter */}
      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="flex gap-2">
          {(["RON_EUR", "EUR_RON"] as const).map(d => (
            <button key={d} onClick={() => setDirection(d)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                direction === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}>
              {d === "RON_EUR" ? "RON → EUR" : "EUR → RON"}
            </button>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">
            Sumă ({direction === "RON_EUR" ? "RON" : "EUR"})
          </label>
          <input type="number" placeholder="ex: 1000" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        {currentRate && amountVal > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Curs EUR/RON</span>
              <span className="text-sm font-semibold text-foreground">1 EUR = {currentRate.toFixed(4)} RON</span>
            </div>
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-primary/10">
              <span className="text-sm font-semibold text-foreground">Rezultat</span>
              <span className="text-xl font-bold text-primary">
                {converted.toFixed(2)} {direction === "RON_EUR" ? "EUR" : "RON"}
              </span>
            </div>
          </div>
        )}

        {loading && <p className="text-sm text-muted-foreground text-center py-2">Se încarcă cursul...</p>}
      </div>

      {/* Chart */}
      {history.length > 0 && (
        <div className="stat-card">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-foreground">Evoluție EUR/RON</h3>
            <button onClick={fetchRates} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Reîncarcă">
              <RefreshCw className={`h-4 w-4 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Ultimele 6 luni</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
                <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px", fontSize: "13px" }} />
                <Area type="monotone" dataKey="rate" name="EUR/RON" stroke="hsl(187, 100%, 50%)" strokeWidth={2} fill="url(#rateGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="stat-card bg-accent/30 border-primary/20 text-center py-4">
        <p className="text-sm text-muted-foreground mb-3">📈 Primește notificări când cursul se schimbă. Creează un cont gratuit!</p>
        <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          Înregistrează-te Gratuit
        </button>
      </div>
    </div>
  );
}
