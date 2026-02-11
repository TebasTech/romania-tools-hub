import { useState } from "react";
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, addDays, format } from "date-fns";
import { ro } from "date-fns/locale";

export function DateCalcPage() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [addDaysValue, setAddDaysValue] = useState("");
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split("T")[0]);

  const d1 = date1 ? new Date(date1) : null;
  const d2 = date2 ? new Date(date2) : null;

  const resultDate = baseDate && addDaysValue
    ? addDays(new Date(baseDate), parseInt(addDaysValue))
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator Dată</h2>
        <p className="text-muted-foreground mt-1">Calculează diferența între date sau adaugă zile.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card space-y-4">
          <h3 className="font-semibold text-foreground">Diferența între două date</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Data de început</label>
              <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Data de sfârșit</label>
              <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          {d1 && d2 && (
            <div className="space-y-2 pt-3 border-t border-border">
              <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Zile</span><span className="font-bold text-foreground">{Math.abs(differenceInDays(d2, d1))}</span></div>
              <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Săptămâni</span><span className="font-bold text-foreground">{Math.abs(differenceInWeeks(d2, d1))}</span></div>
              <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Luni</span><span className="font-bold text-foreground">{Math.abs(differenceInMonths(d2, d1))}</span></div>
              <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Ani</span><span className="font-bold text-foreground">{Math.abs(differenceInYears(d2, d1))}</span></div>
            </div>
          )}
        </div>
        <div className="stat-card space-y-4">
          <h3 className="font-semibold text-foreground">Adaugă/Scade Zile</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Data de bază</label>
              <input type="date" value={baseDate} onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Zile de adăugat (negativ = scădere)</label>
              <input type="number" placeholder="ex: 30" value={addDaysValue} onChange={(e) => setAddDaysValue(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          {resultDate && (
            <div className="pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">Rezultat:</p>
              <p className="text-xl font-bold text-foreground">{format(resultDate, "d MMMM yyyy", { locale: ro })}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
