import { useState } from "react";
import { Calculator } from "lucide-react";

/**
 * Calculator Salariu Net România 2026
 * Contribuții angajat:
 * - CAS (pensie): 25%
 * - CASS (sănătate): 10%
 * - Impozit pe venit: 10% din (brut - CAS - CASS - deducere personală)
 *
 * Deducere personală 2026 (fără persoane în întreținere):
 * - salariu brut <= 2000 RON: 600 RON
 * - 2001–3000 RON: 600 - (brut - 2000) * 0.15 ≈ scade gradual
 * - > 3000 RON: 0 RON
 * Simplificat: deducere standard 0 pt salarii > 3000
 */

function calcDeducere(brut: number, dependents: number): number {
  // Deducere personală de bază (2026)
  let base = 0;
  if (brut <= 2000) base = 600;
  else if (brut <= 3000) base = 600 - (brut - 2000) * 0.6;
  else base = 0;

  // Supliment per dependent
  const supplement = dependents * 200;
  return Math.max(0, base + supplement);
}

export function NetSalaryPage() {
  const [brut, setBrut] = useState("");
  const [dependents, setDependents] = useState("0");

  const brutVal = parseFloat(brut) || 0;
  const depVal = parseInt(dependents) || 0;

  const cas = brutVal * 0.25;
  const cass = brutVal * 0.10;
  const deducere = calcDeducere(brutVal, depVal);
  const bazaImpozit = Math.max(0, brutVal - cas - cass - deducere);
  const impozit = bazaImpozit * 0.10;
  const net = brutVal - cas - cass - impozit;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator Salariu Net</h2>
        <p className="text-muted-foreground mt-1">Calculează salariul net din brut conform legislației României 2026.</p>
      </div>

      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Salariu Brut Lunar (RON)</label>
            <input type="number" placeholder="ex: 5000" value={brut} onChange={(e) => setBrut(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Persoane în Întreținere</label>
            <select value={dependents} onChange={(e) => setDependents(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {brutVal > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <Row label="Salariu Brut" value={brutVal} />
            <Row label="CAS (pensie 25%)" value={-cas} negative />
            <Row label="CASS (sănătate 10%)" value={-cass} negative />
            <Row label="Deducere Personală" value={deducere} info />
            <Row label="Baza Impozabilă" value={bazaImpozit} info />
            <Row label="Impozit pe Venit (10%)" value={-impozit} negative />
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-primary/10 mt-2">
              <span className="text-sm font-semibold text-foreground">Salariu Net</span>
              <span className="text-xl font-bold text-primary">{net.toFixed(0)} RON</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto stat-card bg-accent/30 border-primary/20 text-center py-4">
        <p className="text-sm text-muted-foreground mb-3">📋 Creează cont pentru a salva calculele și a le compara lunar.</p>
        <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          Înregistrează-te Gratuit
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, negative, info }: { label: string; value: number; negative?: boolean; info?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold ${negative ? "text-destructive" : info ? "text-muted-foreground" : "text-foreground"}`}>
        {negative ? "" : ""}{Math.abs(value).toFixed(0)} RON
      </span>
    </div>
  );
}
