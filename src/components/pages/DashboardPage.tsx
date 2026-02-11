import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const MONTHS = [
  "Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
  "Iul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const monthlyData = [
  { luna: "Sep", cheltuieli: 3200, venituri: 5000 },
  { luna: "Oct", cheltuieli: 3800, venituri: 5200 },
  { luna: "Nov", cheltuieli: 4100, venituri: 5000 },
  { luna: "Dec", cheltuieli: 5200, venituri: 6500 },
  { luna: "Ian", cheltuieli: 3600, venituri: 5000 },
  { luna: "Feb", cheltuieli: 2900, venituri: 5000 },
];

const currentMonth = monthlyData[monthlyData.length - 1];
const prevMonth = monthlyData[monthlyData.length - 2];

const economii = currentMonth.venituri - currentMonth.cheltuieli;
const prevEconomii = prevMonth.venituri - prevMonth.cheltuieli;
const cheltuieliChange = ((currentMonth.cheltuieli - prevMonth.cheltuieli) / prevMonth.cheltuieli * 100);
const economiiChange = ((economii - prevEconomii) / Math.abs(prevEconomii) * 100);

const stats = [
  { label: "Cheltuieli Luna Curentă", value: `${currentMonth.cheltuieli.toLocaleString("ro-RO")} RON`, change: `${cheltuieliChange > 0 ? "+" : ""}${cheltuieliChange.toFixed(0)}%`, up: cheltuieliChange <= 0, icon: Activity },
  { label: "Venituri Luna Curentă", value: `${currentMonth.venituri.toLocaleString("ro-RO")} RON`, change: "+0%", up: true, icon: TrendingUp },
  { label: "Economii Luna Curentă", value: `${economii.toLocaleString("ro-RO")} RON`, change: `${economiiChange > 0 ? "+" : ""}${economiiChange.toFixed(0)}%`, up: economiiChange >= 0, icon: BarChart3 },
  { label: "Media Cheltuieli/Lună", value: `${Math.round(monthlyData.reduce((s, m) => s + m.cheltuieli, 0) / monthlyData.length).toLocaleString("ro-RO")} RON`, change: "6 luni", up: true, icon: Activity },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Panou de Control</h2>
        <p className="text-muted-foreground mt-1">Comparație lunară a cheltuielilor și veniturilor tale.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {stat.up ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
              <span className={`text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>{stat.change}</span>
              <span className="text-xs text-muted-foreground">vs. luna trecută</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart: Cheltuieli vs Venituri */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-1">Cheltuieli vs. Venituri</h3>
        <p className="text-sm text-muted-foreground mb-6">Ultimele 6 luni</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
              <XAxis dataKey="luna" tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px", fontSize: "13px" }} />
              <Legend />
              <Bar dataKey="venituri" name="Venituri" fill="hsl(145, 63%, 42%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cheltuieli" name="Cheltuieli" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Comparison Table */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detalii pe Luni</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Luna</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Venituri</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Cheltuieli</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Economii</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m) => (
                <tr key={m.luna} className="border-b border-border last:border-0">
                  <td className="py-2 px-3 font-medium text-foreground">{m.luna}</td>
                  <td className="py-2 px-3 text-right text-success">{m.venituri.toLocaleString("ro-RO")} RON</td>
                  <td className="py-2 px-3 text-right text-destructive">{m.cheltuieli.toLocaleString("ro-RO")} RON</td>
                  <td className={`py-2 px-3 text-right font-semibold ${m.venituri - m.cheltuieli >= 0 ? "text-success" : "text-destructive"}`}>
                    {(m.venituri - m.cheltuieli).toLocaleString("ro-RO")} RON
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signup CTA */}
      <div className="stat-card bg-accent/30 border-primary/20">
        <div className="text-center py-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">📊 Salvează datele tale</h3>
          <p className="text-sm text-muted-foreground mb-4">Creează un cont gratuit pentru a salva cheltuielile și a le accesa de oriunde.</p>
          <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Creează Cont Gratuit
          </button>
        </div>
      </div>
    </div>
  );
}
