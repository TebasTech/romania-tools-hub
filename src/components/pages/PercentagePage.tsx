import { useState } from "react";

export function PercentagePage() {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");

  const result = value && percent ? (parseFloat(value) * parseFloat(percent)) / 100 : null;
  const increase = value && percent ? parseFloat(value) + (parseFloat(value) * parseFloat(percent)) / 100 : null;
  const decrease = value && percent ? parseFloat(value) - (parseFloat(value) * parseFloat(percent)) / 100 : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator Procente</h2>
        <p className="text-muted-foreground mt-1">Calculează rapid procentaje, creșteri și scăderi.</p>
      </div>
      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Valoare</label>
            <input
              type="number"
              placeholder="ex: 500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Procent (%)</label>
            <input
              type="number"
              placeholder="ex: 15"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        {result !== null && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">{percent}% din {value}</span>
              <span className="text-lg font-bold text-foreground">{result.toLocaleString("ro-RO", { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-success/10">
              <span className="text-sm text-muted-foreground">Creștere cu {percent}%</span>
              <span className="text-lg font-bold text-success">{increase!.toLocaleString("ro-RO", { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-destructive/10">
              <span className="text-sm text-muted-foreground">Scădere cu {percent}%</span>
              <span className="text-lg font-bold text-destructive">{decrease!.toLocaleString("ro-RO", { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
