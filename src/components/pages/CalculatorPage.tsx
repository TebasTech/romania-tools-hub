import { useState } from "react";
import { Delete, Equal } from "lucide-react";

export function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(parseFloat(result.toFixed(8))));
      setEquation("");
    } catch {
      setDisplay("Eroare");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  const opMap: Record<string, string> = { "÷": "/", "×": "*" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Calculator</h2>
        <p className="text-muted-foreground mt-1">Calculator simplu pentru operații de bază.</p>
      </div>
      <div className="max-w-sm mx-auto">
        <div className="stat-card">
          <div className="bg-background rounded-lg p-4 mb-4 text-right border border-border">
            <p className="text-xs text-muted-foreground h-5">{equation}</p>
            <p className="text-3xl font-bold text-foreground">{display}</p>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-2">
            <button
              onClick={handleClear}
              className="col-span-3 py-3 rounded-lg bg-destructive/10 text-destructive font-semibold text-sm hover:bg-destructive/20 transition-colors"
            >
              Șterge Tot
            </button>
            <button
              onClick={() => setDisplay((p) => (p.length > 1 ? p.slice(0, -1) : "0"))}
              className="py-3 rounded-lg bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <Delete className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {buttons.flat().map((btn) => {
              const isOp = ["÷", "×", "-", "+"].includes(btn);
              const isEq = btn === "=";
              return (
                <button
                  key={btn}
                  onClick={() => {
                    if (isEq) handleEqual();
                    else if (isOp) handleOperator(opMap[btn] || btn);
                    else handleNumber(btn);
                  }}
                  className={`py-3 rounded-lg font-semibold text-sm transition-colors ${
                    isEq
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : isOp
                      ? "bg-accent text-accent-foreground hover:bg-accent/80"
                      : "bg-muted text-foreground hover:bg-muted/70"
                  }`}
                >
                  {isEq ? <Equal className="h-4 w-4 mx-auto" /> : btn}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
