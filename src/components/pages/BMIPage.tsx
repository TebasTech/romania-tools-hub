import { useState } from "react";

export function BMIPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const bmi = weight && height ? parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2) : null;

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Subponderal", color: "text-warning" };
    if (bmi < 25) return { label: "Normal", color: "text-success" };
    if (bmi < 30) return { label: "Supraponderal", color: "text-warning" };
    return { label: "Obezitate", color: "text-destructive" };
  };

  const getBarWidth = (bmi: number) => Math.min(Math.max((bmi / 40) * 100, 5), 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator IMC</h2>
        <p className="text-muted-foreground mt-1">Calculează Indicele de Masă Corporală.</p>
      </div>
      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Greutate (kg)</label>
            <input type="number" placeholder="ex: 75" value={weight} onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Înălțime (cm)</label>
            <input type="number" placeholder="ex: 175" value={height} onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        {bmi && bmi > 0 && bmi < 100 && (
          <div className="pt-4 border-t border-border space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{bmi.toFixed(1)}</p>
              <p className={`text-lg font-semibold mt-1 ${getCategory(bmi).color}`}>{getCategory(bmi).label}</p>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${getBarWidth(bmi)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subponderal</span><span>Normal</span><span>Supraponderal</span><span>Obezitate</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
