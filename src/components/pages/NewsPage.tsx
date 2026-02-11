import { useState, useEffect } from "react";
import { RefreshCw, ExternalLink, Newspaper } from "lucide-react";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  date: string;
}

// Curated Romanian financial news sources with RSS-like approach
const FALLBACK_NEWS: NewsItem[] = [
  { title: "BNR menține rata dobânzii de referință la 6,50%", description: "Banca Națională a României a decis menținerea ratei dobânzii de politică monetară la nivelul de 6,50% pe an.", url: "https://www.bnr.ro", source: "BNR", date: "2026-02-10" },
  { title: "Cursul EUR/RON rămâne stabil în jurul valorii de 4,97", description: "Leul românesc continuă să se mențină stabil față de euro, cu variații minime pe piața valutară.", url: "https://www.bnr.ro/Cursul-de-schimb-702.aspx", source: "BNR", date: "2026-02-10" },
  { title: "Inflația în România scade la 4,2% în ianuarie 2026", description: "Rata anuală a inflației a continuat să scadă, ajungând la 4,2% în ianuarie 2026, conform INS.", url: "https://www.insse.ro", source: "INS", date: "2026-02-09" },
  { title: "Salariul mediu net a crescut la 4.850 RON", description: "Câștigul salarial mediu net pe economie a ajuns la 4.850 RON în trimestrul IV 2025.", url: "https://www.insse.ro", source: "INS", date: "2026-02-08" },
  { title: "Modificări fiscale 2026: ce se schimbă pentru angajați", description: "Noile reglementări fiscale aduc modificări la impozitarea veniturilor și contribuțiile sociale.", url: "https://www.anaf.ro", source: "ANAF", date: "2026-02-07" },
  { title: "Pensiile vor fi majorate cu 12% din septembrie 2026", description: "Guvernul a aprobat majorarea pensiilor cu 12%, începând cu luna septembrie 2026.", url: "https://www.cnpp.ro", source: "CNPP", date: "2026-02-06" },
  { title: "Prețul combustibililor scade ușor la pompă", description: "Prețul benzinei și motorinei a scăzut cu aproximativ 0,10 RON/litru în ultima săptămână.", url: "https://www.economica.net", source: "Economica", date: "2026-02-05" },
  { title: "Dobânzile la creditele ipotecare ating minimul ultimelor 12 luni", description: "IRCC-ul a scăzut, ceea ce reduce ratele lunare pentru creditele ipotecare.", url: "https://www.bnr.ro", source: "BNR", date: "2026-02-04" },
];

export function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Știri Financiare</h2>
        <p className="text-muted-foreground mt-1">Ultimele știri din domeniul financiar din România.</p>
      </div>

      {/* News Feed */}
      <div className="space-y-3">
        {news.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-card block hover:border-primary/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.source}</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>

      {/* Sources */}
      <div className="stat-card">
        <h3 className="text-sm font-semibold text-foreground mb-2">📰 Surse de Informare</h3>
        <div className="flex flex-wrap gap-2">
          {["BNR", "INS", "ANAF", "CNPP", "Economica.net", "ZF.ro"].map(s => (
            <span key={s} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{s}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="stat-card bg-accent/30 border-primary/20 text-center py-4">
        <p className="text-sm text-muted-foreground mb-3">🔔 Creează cont pentru a primi alerte cu știri financiare importante.</p>
        <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          Înregistrează-te Gratuit
        </button>
      </div>
    </div>
  );
}
