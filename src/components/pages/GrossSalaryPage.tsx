import { useState } from "react";

/**
 * Calculator Salariu Brut din Net - România 2026
 * Reverse: dat net, calculează brut
 * net = brut - CAS - CASS - impozit
 * impozit = (brut - CAS - CASS - deducere) * 10%
 * Simplificat cu deducere 0 (pentru salarii > 3000):
 * net = brut - 0.25*brut - 0.10*brut - 0.10*(brut - 0.25*brut - 0.10*brut)
 * net = brut * (1 - 0.25 - 0.10 - 0.10*0.65)
 * net = brut * (0.65 - 0.065) = brut * 0.585
 * brut = net / 0.585 (aprox, fără deducere)
 */

function calcBrutFromNet(targetNet: number, dependents: number): number {
  // Iterative approach for accuracy with deducere
  let brut = targetNet / 0.585;
  for (let i = 0; i < 20; i++) {
    const cas = brut * 0.25;
    const cass = brut * 0.10;
    let deducere = 0;
    if (brut <= 2000) deducere = 600 + dependents * 200;
    else if (brut <= 3000) deducere = Math.max(0, 600 - (brut - 2000) * 0.6 + dependents * 200);
    const bazaImpozit = Math.max(0, brut - cas - cass - deducere);
    const impozit = bazaImpozit * 0.10;
    const netCalc = brut - cas - cass - impozit;
    const diff = targetNet - netCalc;
    if (Math.abs(diff) < 0.5) break;
    brut += diff / 0.585;
  }
  return Math.max(0, brut);
}

export function GrossSalaryPage() {
  const [net, setNet] = useState("");
  const [dependents, setDependents] = useState("0");

  const netVal = parseFloat(net) || 0;
  const depVal = parseInt(dependents) || 0;

  const brut = calcBrutFromNet(netVal, depVal);
  const cas = brut * 0.25;
  const cass = brut * 0.10;
  let deducere = 0;
  if (brut <= 2000) deducere = 600 + depVal * 200;
  else if (brut <= 3000) deducere = Math.max(0, 600 - (brut - 2000) * 0.6 + depVal * 200);
  const bazaImpozit = Math.max(0, brut - cas - cass - deducere);
  const impozit = bazaImpozit * 0.10;
  const costTotal = brut; // For employee perspective

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator Salariu Brut</h2>
        <p className="text-muted-foreground mt-1">Află salariul brut necesar pentru a obține un anumit net. România 2026.</p>
      </div>

      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Salariu Net Dorit (RON)</label>
            <input type="number" placeholder="ex: 3500" value={net} onChange={(e) => setNet(e.target.value)}
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

        {netVal > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-primary/10">
              <span className="text-sm font-semibold text-foreground">Salariu Brut Necesar</span>
              <span className="text-xl font-bold text-primary">{brut.toFixed(0)} RON</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">CAS (pensie 25%)</span>
              <span className="text-sm font-semibold text-destructive">-{cas.toFixed(0)} RON</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">CASS (sănătate 10%)</span>
              <span className="text-sm font-semibold text-destructive">-{cass.toFixed(0)} RON</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Impozit pe Venit (10%)</span>
              <span className="text-sm font-semibold text-destructive">-{impozit.toFixed(0)} RON</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-success/10">
              <span className="text-sm font-semibold text-foreground">Salariu Net Rezultat</span>
              <span className="text-xl font-bold text-success">{(brut - cas - cass - impozit).toFixed(0)} RON</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto stat-card bg-accent/30 border-primary/20 text-center py-4">
        <p className="text-sm text-muted-foreground mb-3">💼 Creează cont pentru a compara oferte salariale.</p>
        <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          Înregistrează-te Gratuit
        </button>
      </div>
    </div>
  );
}
