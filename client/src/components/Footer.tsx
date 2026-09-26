import { ArrowUpRight } from "lucide-react";

const LOGO_URL = "/gokturk-labs-logo.png";
const COMMUNITY_URL = "https://discord.gg/CFrwUThhE";

function DiscordMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.54 5.47A16.86 16.86 0 0 0 15.44 4l-.5 1.02a15.6 15.6 0 0 0-5.88 0L8.56 4a16.91 16.91 0 0 0-4.1 1.47C1.86 9.38 1.15 13.2 1.5 16.96A16.93 16.93 0 0 0 6.54 19l1.22-1.67a10.28 10.28 0 0 1-1.9-.92l.46-.35a11.98 11.98 0 0 0 11.36 0l.47.35a10.2 10.2 0 0 1-1.9.92L17.46 19a16.94 16.94 0 0 0 5.04-2.04c.4-4.36-.68-8.15-2.96-11.49ZM8.7 14.7c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Zm6.6 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#060609] py-14 text-xs text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Üst Kısım: Logo, Menü Linkleri ve Discord Topluluk Butonu */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <a href="/#top" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg">
            <img src={LOGO_URL} alt="Göktürk Labs Logo" className="h-8 w-8 object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Göktürk <span className="text-purple-400">Labs</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase -mt-0.5">Yazılım Stüdyosu</span>
            </div>
          </a>

          {/* Menü Linkleri */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-400">
            <a href="/#urunler" className="hover:text-white transition-colors py-1">Ürünler</a>
            <a href="/#nasil" className="hover:text-white transition-colors py-1">Nasıl Çalışır?</a>
            <a href="/#paketler" className="hover:text-white transition-colors py-1">Paketler</a>
            <a href="/#hakkimizda" className="hover:text-white transition-colors py-1">Hakkımızda</a>
            <a href="/#iletisim" className="hover:text-white transition-colors py-1">İletişim</a>
            <a href="/#sss" className="hover:text-white transition-colors py-1">SSS</a>
            <a href="/gizlilik-politikasi" className="hover:text-white transition-colors py-1">Gizlilik Politikası</a>
            <a href="/hizmet-sartlari" className="hover:text-white transition-colors py-1">Hizmet Şartları</a>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-1 inline-flex items-center gap-1">
              <span>Sitemap</span>
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </a>
          </div>

          {/* Topluluk CTA */}
          <a 
            href={COMMUNITY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 px-4 py-2.5 text-xs font-semibold text-[#8a94fd] hover:text-white hover:bg-[#5865F2]/25 transition-all shadow-sm"
          >
            <DiscordMark className="h-4 w-4" />
            <span>Discord Topluluğu</span>
          </a>
        </div>

        {/* Alt Kısım: Telif, Geliştirici ve Mustafa Kemal Atatürk Anması */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-zinc-300">© 2026 Göktürk Labs. Tüm hakları saklıdır.</p>
            <p className="text-[11px] text-zinc-500 mt-1 font-mono">
              Geliştirici: <span className="text-purple-400 font-semibold">semihr66</span> · Bağımsız Discord Bot &amp; Web Sistemleri
            </p>
          </div>

          {/* Mustafa Kemal Atatürk Saygı Anması */}
          <div className="flex flex-col items-center sm:items-end justify-center select-none" title="Mustafa Kemal Atatürk (1881-193∞)">
            <span className="font-display text-sm font-bold tracking-[0.22em] text-zinc-300">1881-193∞</span>
            <span className="text-[11px] text-zinc-500 tracking-wider">Saygı ve minnetle...</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
