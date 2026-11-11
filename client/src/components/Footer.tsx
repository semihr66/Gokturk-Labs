import { useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";

/* Sitenin tek footer'ı: ana sayfa, destek, yönetim, politika ve 404 sayfalarında aynı. */

const LOGO_URL = "/gokturk-labs-logo.png";
const COMMUNITY_URL = "https://discord.gg/Y5CTNskKCG";
const PL = "#A78BFA";
const TEXT = "#FFFFFF";
const SUB = "#94A3B8";
const MUT = "#4B5563";
const BORDER = "rgba(255,255,255,0.08)";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  { title: "HIZLI LİNKLER", links: [["Ana Sayfa", "/#top"], ["Modüller", "/#moduller"], ["Nasıl Çalışır?", "/#nasil"], ["Paketler", "/#paketler"]] },
  { title: "HİZMETLER", links: [["Discord Bot Hosting", "/#paketler"], ["Özel Bot Geliştirme", "/#iletisim"], ["Web Yönetim Paneli", "/#moduller"], ["Yetkili Başvuru", "/#moduller"]] },
  { title: "PLATFORM", links: [["Hakkımızda", "/#hakkimizda"], ["İletişim", "/#iletisim"], ["Destek merkezi", "/destek"], ["SSS", "/#sss"], ["Topluluk", COMMUNITY_URL], ["Yönetici paneli", "/yonetim"]] },
  { title: "YASAL", links: [["Gizlilik Politikası", "/gizlilik-politikasi"], ["Hizmet Şartları", "/hizmet-sartlari"], ["Sitemap", "/sitemap.xml"]] },
];

function DiscordMark({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.54 5.47A16.86 16.86 0 0 0 15.44 4l-.5 1.02a15.6 15.6 0 0 0-5.88 0L8.56 4a16.91 16.91 0 0 0-4.1 1.47C1.86 9.38 1.15 13.2 1.5 16.96A16.93 16.93 0 0 0 6.54 19l1.22-1.67a10.28 10.28 0 0 1-1.9-.92l.46-.35a11.98 11.98 0 0 0 11.36 0l.47.35a10.2 10.2 0 0 1-1.9.92L17.46 19a16.94 16.94 0 0 0 5.04-2.04c.4-4.36-.68-8.15-2.96-11.49ZM8.7 14.7c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Zm6.6 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Z" />
    </svg>
  );
}

const hover = {
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEXT),
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = MUT),
};

export default function Footer() {
  const isMobile = useIsMobile();
  const [brandHover, setBrandHover] = useState(false);

  return (
    <footer style={{ background: "#000000", borderTop: `1px solid ${BORDER}`, color: TEXT, fontFamily: "'Space Grotesk','Plus Jakarta Sans','Inter',sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3.5rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <a href="/#top" style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem", textDecoration: "none", color: TEXT }}>
              <img src={LOGO_URL} alt="Göktürk Labs logosu" style={{ width: 28, height: 28 }} />
              <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Göktürk <span style={{ color: PL }}>Labs</span></span>
            </a>
            <p style={{ color: MUT, fontSize: "0.78rem", lineHeight: 1.65, maxWidth: 220 }}>
              Discord sunucuları için geliştirilmiş, performanslı ve bağımsız bot altyapısı.
            </p>
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" {...hover}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: MUT, fontSize: "0.77rem", marginTop: "0.85rem", transition: "color .15s", textDecoration: "none" }}>
              <DiscordMark /> Discord Topluluğu
            </a>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: "0.67rem", fontWeight: 800, letterSpacing: "0.1em", color: SUB, marginBottom: "0.85rem" }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.42rem" }}>
                {col.links.map(([label, href]) => {
                  const external = href.startsWith("http");
                  return (
                    <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...hover}
                      style={{ color: MUT, fontSize: "0.78rem", transition: "color .15s", textDecoration: "none" }}>
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem", textAlign: "center" }}>
          <div style={{ color: MUT, fontSize: "0.73rem" }}>
            © 2026 Göktürk Labs. Tüm hakları saklıdır. —{" "}
            <a href="https://github.com/semihr66" target="_blank" rel="noopener noreferrer" style={{ color: PL, textDecoration: "none" }}>semihr66</a>
            {" "}· Bağımsız Discord Bot & Web Sistemleri
          </div>
          <div style={{ color: MUT, fontSize: "0.72rem" }} title="Mustafa Kemal Atatürk (1881-193∞)">
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>Mustafa Kemal Atatürk</span>{" "}
            <span style={{ opacity: 0.38 }}>(1881–193∞) · Saygı ve minnetle...</span>
          </div>
        </div>
      </div>

      {/* Büyük marka yazısı: noktalı piksel efekti */}
      <div
        style={{ borderTop: `1px solid ${BORDER}`, padding: "2rem 1.5rem 1.5rem", overflow: "hidden", cursor: "default" }}
        onMouseEnter={() => setBrandHover(true)}
        onMouseLeave={() => setBrandHover(false)}
      >
        <div style={{
          maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: "clamp(0.5rem, 2vw, 2rem)",
          filter: brandHover ? "brightness(1) drop-shadow(0 0 48px rgba(124,58,237,0.45))" : "brightness(0.38)",
          transition: "filter 0.5s cubic-bezier(0.23,1,0.32,1)", userSelect: "none",
        }}>
          <img src={LOGO_URL} alt="" aria-hidden style={{ width: "clamp(2rem,5vw,5rem)", height: "clamp(2rem,5vw,5rem)", flexShrink: 0 }} />
          <div style={{ fontSize: "clamp(2.2rem,9vw,9rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, minWidth: 0, overflow: "hidden" }}>
            <div style={{ backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)", backgroundSize: "10px 10px", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", whiteSpace: "nowrap" }}>GÖKTÜRK</div>
            <div style={{ backgroundImage: `radial-gradient(circle, ${PL} 1.5px, transparent 1.5px)`, backgroundSize: "10px 10px", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", whiteSpace: "nowrap" }}>LABS</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
