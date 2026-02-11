import { useState } from "react";
import { Fuel } from "lucide-react";

export function FuelPage() {
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [price, setPrice] = useState("");

  const consumption = distance && fuel ? (parseFloat(fuel) / parseFloat(distance)) * 100 : null;
  const costPerKm = distance && fuel && price ? (parseFloat(fuel) * parseFloat(price)) / parseFloat(distance) : null;
  const totalCost = fuel && price ? parseFloat(fuel) * parseFloat(price) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Consum Combustibil</h2>
        <p className="text-muted-foreground mt-1">Calculează consumul și costurile de combustibil.</p>
      </div>
      <div className="max-w-lg mx-auto stat-card space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Distanță parcursă (km)</label>
            <input type="number" placeholder="ex: 500" value={distance} onChange={(e) => setDistance(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Combustibil folosit (litri)</label>
            <input type="number" placeholder="ex: 40" value={fuel} onChange={(e) => setFuel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Preț per litru (RON)</label>
            <input type="number" placeholder="ex: 7.50" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        {consumption && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
              <span className="text-sm text-muted-foreground">Consum mediu</span>
              <span className="text-xl font-bold text-foreground">{consumption.toFixed(1)} l/100km</span>
            </div>
            {costPerKm && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
                <span className="text-sm text-muted-foreground">Cost per km</span>
                <span className="text-xl font-bold text-foreground">{costPerKm.toFixed(2)} RON</span>
              </div>
            )}
            {totalCost && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-primary/10">
                <span className="text-sm text-muted-foreground">Cost total</span>
                <span className="text-xl font-bold text-primary">{totalCost.toFixed(2)} RON</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
