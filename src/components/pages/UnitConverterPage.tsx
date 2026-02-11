import { useState } from "react";

const categories = {
  "Lungime": { m: 1, km: 0.001, cm: 100, mm: 1000, mile: 0.000621371, yard: 1.09361, ft: 3.28084, in: 39.3701 },
  "Greutate": { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274, ton: 0.001 },
  "Temperatură": {},
  "Volum": { l: 1, ml: 1000, gal: 0.264172, qt: 1.05669, cup: 4.22675 },
};

type Category = keyof typeof categories;

export function UnitConverterPage() {
  const [cat, setCat] = useState<Category>("Lungime");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  const units = Object.keys(categories[cat]);

  const convert = () => {
    if (!value || cat === "Temperatură") {
      if (cat === "Temperatură") {
        const v = parseFloat(value);
        if (isNaN(v)) return "";
        if (fromUnit === "°C" && toUnit === "°F") return ((v * 9) / 5 + 32).toFixed(2);
        if (fromUnit === "°F" && toUnit === "°C") return (((v - 32) * 5) / 9).toFixed(2);
        if (fromUnit === "°C" && toUnit === "K") return (v + 273.15).toFixed(2);
        if (fromUnit === "K" && toUnit === "°C") return (v - 273.15).toFixed(2);
        if (fromUnit === toUnit) return v.toFixed(2);
        return "";
      }
      return "";
    }
    const data = categories[cat] as Record<string, number>;
    const inBase = parseFloat(value) / data[fromUnit];
    return (inBase * data[toUnit]).toFixed(6).replace(/\.?0+$/, "");
  };

  const tempUnits = ["°C", "°F", "K"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Convertor Unități</h2>
        <p className="text-muted-foreground mt-1">Convertește între diferite unități de măsură.</p>
      </div>
      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(categories) as Category[]).map((c) => (
            <button key={c} onClick={() => { setCat(c); setFromUnit(c === "Temperatură" ? "°C" : Object.keys(categories[c])[0]); setToUnit(c === "Temperatură" ? "°F" : Object.keys(categories[c])[1]); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input type="number" placeholder="Valoare" value={value} onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            {(cat === "Temperatură" ? tempUnits : units).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            {(cat === "Temperatură" ? tempUnits : units).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        {value && (
          <div className="pt-4 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">{value} {fromUnit} =</p>
            <p className="text-3xl font-bold text-foreground">{convert()} {toUnit}</p>
          </div>
        )}
      </div>
    </div>
  );
}
