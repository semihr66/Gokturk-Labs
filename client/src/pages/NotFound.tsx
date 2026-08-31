/* Göktürk Labs 404: signal lost screen, amber diagnostics, clear return path. */
import { ArrowLeft, Compass, Home, SearchX } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return <main className="not-found-page min-h-screen bg-[#08080b] text-[#f7f7fb]"><div className="not-found-grid" /><div className="not-found-orbit not-found-orbit-one" /><div className="not-found-orbit not-found-orbit-two" /><header className="policy-nav"><a href="/" className="flex items-center gap-3" aria-label="Göktürk Labs ana sayfa"><img src="/gokturk-labs-logo.png" alt="Göktürk Labs logosu" className="h-9 w-9 object-contain" /><span className="font-display text-sm font-semibold">Göktürk <em>Labs</em></span></a><span className="not-found-status"><span /> sinyal aranıyor</span></header><section className="not-found-content"><div className="not-found-icon"><SearchX className="h-7 w-7" /></div><p className="policy-kicker">GÖKTÜRK LABS / 404</p><h1>Bu rota boşta<br /><span>kalmış.</span></h1><p>Aradığın sayfa bu istasyonda bulunamadı. Ana merkeze dönerek paketleri ve destek akışını inceleyebilirsin.</p><div className="not-found-actions"><button type="button" onClick={() => setLocation("/")}><Home className="h-4 w-4" /> Ana sayfaya dön</button><a href="/hizmet-sartlari"><Compass className="h-4 w-4" /> Politikaları gör</a></div><div className="not-found-code">ERR_ROUTE_NOT_FOUND <span>•</span> 0x404</div></section><div className="not-found-corner">GÖKTÜRK LABS <span>/</span> SIGNAL LOST</div></main>;
}
