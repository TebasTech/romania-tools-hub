import { useState } from "react";

/**
 * Calculator Indemnizații România 2026
 *
 * 1. Concediu Maternitate (prenatal + postnatal = 126 zile):
 *    - 85% din media veniturilor brute din ultimele 6 luni
 *    - Plătit de FNUASS (fondul de sănătate)
 *
 * 2. Indemnizație Creștere Copil (până la 2 ani):
 *    - 85% din media veniturilor nete din ultimele 12 luni
 *    - Minim 1.352 RON, maxim 8.500 RON (2026)
 *    - Se plătește CASS 10%
 *
 * 3. Concediu Medical (boală obișnuită):
 *    - 75% din media veniturilor brute din ultimele 6 luni
 *    - Primele 5 zile: plătite de angajator
 *    - Restul: plătite de FNUASS
 *    - Maxim 183 zile/an (extensibil)
 *
 * 4. Concediu Medical Accident de Muncă:
 *    - 80% din media veniturilor brute din ultimele 6 luni
 */

const TYPES = [
  { id: "maternity", label: "Concediu Maternitate", percent: 85, basis: "brut", months: 6, description: "126 zile (63 prenatal + 63 postnatal). 85% din media salariilor brute pe ultimele 6 luni." },
  { id: "childcare", label: "Indemnizație Creștere Copil", percent: 85, basis: "net", months: 12, description: "Până la 2 ani (sau 3 ani pt copil cu handicap). 85% din media veniturilor nete pe 12 luni. Min 1.352 RON, max 8.500 RON." },
  { id: "sickleave", label: "Concediu Medical (Boală)", percent: 75, basis: "brut", months: 6, description: "75% din media salariilor brute pe ultimele 6 luni. Primele 5 zile plătite de angajator." },
  { id: "accident", label: "Concediu Medical (Accident Muncă)", percent: 80, basis: "brut", months: 6, description: "80% din media salariilor brute pe ultimele 6 luni. Plătit integral de asigurări." },
] as const;

export function BenefitsPage() {
  const [selectedType, setSelectedType] = useState<string>(TYPES[0].id);
  const [salary, setSalary] = useState("");

  const type = TYPES.find(t => t.id === selectedType)!;
  const salaryVal = parseFloat(salary) || 0;

  let indemnizatie = salaryVal * (type.percent / 100);

  // Special rules for childcare
  if (type.id === "childcare") {
    // Net salary approximation: brut * 0.585
    const netApprox = salaryVal * 0.585;
    indemnizatie = netApprox * 0.85;
    indemnizatie = Math.max(1352, Math.min(8500, indemnizatie));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator Indemnizații</h2>
        <p className="text-muted-foreground mt-1">Calculează indemnizația de maternitate, creștere copil sau concediu medical. România 2026.</p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {/* Type Selector */}
        <div className="stat-card space-y-3">
          <label className="text-sm font-medium text-foreground block">Tip Indemnizație</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TYPES.map(t => (
              <button key={t.id} onClick={() => setSelectedType(t.id)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  selectedType === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">{type.description}</p>
        </div>

        {/* Input */}
        <div className="stat-card space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Salariu Brut Mediu Lunar (RON)
            </label>
            <input type="number" placeholder="ex: 5000" value={salary} onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <p className="text-xs text-muted-foreground mt-1">
              Media salariilor brute din ultimele {type.months} luni
            </p>
          </div>
        </div>

        {/* Result */}
        {salaryVal > 0 && (
          <div className="stat-card space-y-2">
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Salariu Brut Mediu</span>
              <span className="text-sm font-semibold text-foreground">{salaryVal.toLocaleString("ro-RO")} RON</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Procent Aplicat</span>
              <span className="text-sm font-semibold text-foreground">{type.percent}%{type.id === "childcare" ? " din net" : " din brut"}</span>
            </div>
            {type.id === "childcare" && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
                <span className="text-sm text-muted-foreground">Net estimat (din brut)</span>
                <span className="text-sm font-semibold text-foreground">{(salaryVal * 0.585).toFixed(0)} RON</span>
              </div>
            )}
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-primary/10 mt-2">
              <span className="text-sm font-semibold text-foreground">Indemnizație Lunară Estimată</span>
              <span className="text-xl font-bold text-primary">{indemnizatie.toFixed(0)} RON</span>
            </div>
            {type.id === "childcare" && (
              <p className="text-xs text-muted-foreground text-center">
                Min: 1.352 RON · Max: 8.500 RON. Se reține CASS 10%.
              </p>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="stat-card bg-accent/30 border-primary/20 text-center py-4">
          <p className="text-sm text-muted-foreground mb-3">🍼 Salvează simulările tale creând un cont gratuit.</p>
          <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Înregistrează-te Gratuit
          </button>
        </div>
      </div>
    </div>
  );
}
