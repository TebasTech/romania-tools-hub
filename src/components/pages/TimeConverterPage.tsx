import { useState } from "react";

const timeUnits = {
  secunde: 1,
  minute: 60,
  ore: 3600,
  zile: 86400,
  săptămâni: 604800,
  luni: 2592000,
  ani: 31536000,
};

type TimeUnit = keyof typeof timeUnits;

export function TimeConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<TimeUnit>("ore");
  const [toUnit, setToUnit] = useState<TimeUnit>("minute");

  const result = value
    ? (parseFloat(value) * timeUnits[fromUnit]) / timeUnits[toUnit]
    : null;

  const units = Object.keys(timeUnits) as TimeUnit[];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Convertor Timp</h2>
        <p className="text-muted-foreground mt-1">Convertește între diferite unități de timp.</p>
      </div>
      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <input type="number" placeholder="Valoare" value={value} onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value as TimeUnit)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value as TimeUnit)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        {result !== null && (
          <div className="pt-4 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">{value} {fromUnit} =</p>
            <p className="text-3xl font-bold text-foreground">
              {result < 0.001 ? result.toExponential(2) : result.toLocaleString("ro-RO", { maximumFractionDigits: 4 })} {toUnit}
            </p>
          </div>
        )}
        {/* Quick conversion table */}
        {value && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-3">Conversii rapide pentru {value} {fromUnit}:</p>
            <div className="space-y-2">
              {units.filter((u) => u !== fromUnit).map((u) => {
                const r = (parseFloat(value) * timeUnits[fromUnit]) / timeUnits[u];
                return (
                  <div key={u} className="flex justify-between py-1.5 px-3 rounded-lg bg-background border border-border text-sm">
                    <span className="text-muted-foreground">{u}</span>
                    <span className="font-medium text-foreground">{r < 0.001 ? r.toExponential(2) : r.toLocaleString("ro-RO", { maximumFractionDigits: 4 })}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
