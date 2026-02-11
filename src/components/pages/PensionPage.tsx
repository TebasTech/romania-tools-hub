import { useState } from "react";

/**
 * Calculator Pensie România 2026
 * Formula: Pensie = Număr Total Puncte × Valoarea Punctului de Pensie
 * Puncte/an = Salariu Brut / Salariu Mediu Brut pe Economie
 * Valoarea punctului de pensie 2026: ~2.032 RON (actualizat anual)
 * Salariu mediu brut economie 2026: ~7.567 RON
 * Stagiu complet cotizare: 35 ani (bărbați), 33 ani (femei) - se unifică la 35
 * Vârstă pensionare: 65 ani (bărbați), 63 ani (femei) - se unifică gradual
 */

const VALOARE_PUNCT = 2032; // RON, 2026
const SALARIU_MEDIU_ECONOMIE = 7567; // RON, 2026

export function PensionPage() {
  const [salariuBrut, setSalariuBrut] = useState("");
  const [aniCotizare, setAniCotizare] = useState("");
  const [gen, setGen] = useState<"M" | "F">("M");

  const brut = parseFloat(salariuBrut) || 0;
  const ani = parseInt(aniCotizare) || 0;

  const punctePerAn = brut > 0 ? brut / SALARIU_MEDIU_ECONOMIE : 0;
  const totalPuncte = punctePerAn * ani;
  const pensie = totalPuncte * VALOARE_PUNCT;

  const stagiuComplet = gen === "M" ? 35 : 33;
  const varstaMinima = gen === "M" ? 65 : 63;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator Pensie</h2>
        <p className="text-muted-foreground mt-1">Estimează pensia lunară pe baza salariului și stagiului de cotizare. România 2026.</p>
      </div>

      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Salariu Brut Mediu Lunar (RON)</label>
            <input type="number" placeholder="ex: 5000" value={salariuBrut} onChange={(e) => setSalariuBrut(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <p className="text-xs text-muted-foreground mt-1">Salariul mediu brut pe toată cariera</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Ani de Cotizare</label>
            <input type="number" placeholder="ex: 35" value={aniCotizare} onChange={(e) => setAniCotizare(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <p className="text-xs text-muted-foreground mt-1">Stagiu complet: {stagiuComplet} ani ({gen === "M" ? "bărbați" : "femei"})</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Gen</label>
            <div className="flex gap-3">
              {(["M", "F"] as const).map(g => (
                <button key={g} onClick={() => setGen(g)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${gen === g ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
                  {g === "M" ? "Bărbat" : "Femeie"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {brut > 0 && ani > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Puncte / an</span>
              <span className="text-sm font-semibold text-foreground">{punctePerAn.toFixed(4)}</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Total Puncte ({ani} ani)</span>
              <span className="text-sm font-semibold text-foreground">{totalPuncte.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Valoare Punct Pensie</span>
              <span className="text-sm font-semibold text-foreground">{VALOARE_PUNCT} RON</span>
            </div>
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-primary/10 mt-2">
              <span className="text-sm font-semibold text-foreground">Pensie Estimată Lunară</span>
              <span className="text-xl font-bold text-primary">{pensie.toFixed(0)} RON</span>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Vârsta minimă de pensionare: {varstaMinima} ani. Estimare orientativă bazată pe legislația 2026.
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="max-w-lg mx-auto stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-2">ℹ️ Despre Calculul Pensiei</h3>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>Punctele de pensie se calculează: salariu brut ÷ salariu mediu brut pe economie</li>
          <li>Salariul mediu brut pe economie 2026: {SALARIU_MEDIU_ECONOMIE.toLocaleString("ro-RO")} RON</li>
          <li>Valoarea punctului de pensie 2026: {VALOARE_PUNCT.toLocaleString("ro-RO")} RON</li>
          <li>Stagiul complet de cotizare: 35 ani (bărbați) / 33 ani (femei)</li>
        </ul>
      </div>
    </div>
  );
}
