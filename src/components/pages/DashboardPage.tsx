import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { luna: "Sep", vizite: 1200 },
  { luna: "Oct", vizite: 1800 },
  { luna: "Nov", vizite: 2400 },
  { luna: "Dec", vizite: 2100 },
  { luna: "Ian", vizite: 3200 },
  { luna: "Feb", vizite: 4100 },
];

const stats = [
  { label: "Vizitatori Azi", value: "1.247", change: "+12%", up: true, icon: Users },
  { label: "Pagini Vizualizate", value: "4.832", change: "+8%", up: true, icon: Activity },
  { label: "Timp Mediu", value: "3m 24s", change: "+5%", up: true, icon: BarChart3 },
  { label: "Rata de Revenire", value: "42%", change: "-2%", up: false, icon: TrendingUp },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Panou de Control</h2>
        <p className="text-muted-foreground mt-1">Rezumatul activității pe site-ul tău.</p>
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
              {stat.up ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">față de ieri</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-1">Vizitatori pe Lună</h3>
        <p className="text-sm text-muted-foreground mb-6">Ultimele 6 luni</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="viziteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
              <XAxis dataKey="luna" tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(210, 20%, 90%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area
                type="monotone"
                dataKey="vizite"
                stroke="hsl(187, 100%, 50%)"
                strokeWidth={2}
                fill="url(#viziteGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Tools */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Instrumente Populare</h3>
        <div className="space-y-3">
          {["Calculator", "Convertor Unități", "Calculator IMC", "Procente", "Finanțe Personale"].map(
            (tool, i) => (
              <div key={tool} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{tool}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${100 - i * 18}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {(500 - i * 90).toLocaleString()}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
