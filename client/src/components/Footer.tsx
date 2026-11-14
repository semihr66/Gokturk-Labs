import { useIsMobile } from "@/hooks/useMobile";

/* Sitenin tek footer'ı: ana sayfa, destek, yönetim, politika ve 404 sayfalarında aynı. */

const LOGO_URL = "/gokturk-labs-logo.png";
const COMMUNITY_URL = "https://discord.gg/Y5CTNskKCG";
const PL = "#A78BFA";
const RED = "#EF4444";
const TEXT = "#FFFFFF";
const SUB = "#94A3B8";
const MUT = "#64748B";
const BORDER = "rgba(255,255,255,0.08)";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  { title: "Hızlı linkler", links: [["Ana Sayfa", "/#top"], ["Modüller", "/#moduller"], ["Nasıl Çalışır?", "/#nasil"], ["Paketler", "/#paketler"]] },
  { title: "Hizmetler", links: [["Discord Bot Hosting", "/#paketler"], ["Özel Bot Geliştirme", "/#iletisim"], ["Web Yönetim Paneli", "/#moduller"], ["Yetkili Başvuru", "/#moduller"]] },
  { title: "Platform", links: [["Hakkımızda", "/#hakkimizda"], ["İletişim", "/#iletisim"], ["Destek merkezi", "/destek"], ["SSS", "/#sss"], ["Topluluk", COMMUNITY_URL], ["Yönetici paneli", "/yonetim"]] },
  { title: "Yasal", links: [["Gizlilik Politikası", "/gizlilik-politikasi"], ["Hizmet Şartları", "/hizmet-sartlari"], ["Sitemap", "/sitemap.xml"]] },
];

function DiscordMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.54 5.47A16.86 16.86 0 0 0 15.44 4l-.5 1.02a15.6 15.6 0 0 0-5.88 0L8.56 4a16.91 16.91 0 0 0-4.1 1.47C1.86 9.38 1.15 13.2 1.5 16.96A16.93 16.93 0 0 0 6.54 19l1.22-1.67a10.28 10.28 0 0 1-1.9-.92l.46-.35a11.98 11.98 0 0 0 11.36 0l.47.35a10.2 10.2 0 0 1-1.9.92L17.46 19a16.94 16.94 0 0 0 5.04-2.04c.4-4.36-.68-8.15-2.96-11.49ZM8.7 14.7c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Zm6.6 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Z" />
    </svg>
  );
}

const hover = {
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = TEXT),
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = SUB),
};

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer style={{ background: "#000000", borderTop: `1px solid ${BORDER}`, color: TEXT, fontFamily: "'Space Grotesk','Plus Jakarta Sans','Inter',sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "3.5rem 1.5rem 0" : "5rem 2.5rem 0" }}>

        {/* Marka + bağlantılar */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1.6fr repeat(4, 1fr)", gap: isMobile ? "2.25rem 1.5rem" : "2.5rem", paddingBottom: isMobile ? "3rem" : "4rem" }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : undefined }}>
            <a href="/#top" style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", textDecoration: "none", color: TEXT }}>
              <img src={LOGO_URL} alt="Göktürk Labs logosu" style={{ width: 36, height: 36 }} />
              <span style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em" }}>Göktürk <span style={{ color: PL }}>Labs</span></span>
            </a>
            <p style={{ color: SUB, fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 340, marginTop: "1.25rem" }}>
              Discord sunucuları için geliştirilmiş, performanslı ve bağımsız bot altyapısı. Hosting, panel ve destek tek yerde.
            </p>
            <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" {...hover}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", color: SUB, fontSize: "0.9rem", marginTop: "1.25rem", transition: "color .15s", textDecoration: "none" }}>
              <DiscordMark /> Discord Topluluğu
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: "0.98rem", fontWeight: 700, color: TEXT, marginBottom: "1.1rem" }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {col.links.map(([label, href]) => {
                  const external = href.startsWith("http");
                  return (
                    <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...hover}
                      style={{ color: SUB, fontSize: "0.92rem", transition: "color .15s", textDecoration: "none" }}>
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Atatürk anma alanı */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: isMobile ? "3.5rem 0" : "4.5rem 0", textAlign: "center" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.32em", color: RED, marginBottom: "1rem" }}>
            BÜYÜK ÖNDER
          </div>
          <div style={{ fontSize: isMobile ? "1.9rem" : "2.6rem", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Mustafa Kemal Atatürk
          </div>
          <div style={{ fontSize: isMobile ? "2.2rem" : "3.1rem", fontWeight: 500, letterSpacing: "0.12em", color: "#CBD5E1", marginTop: "0.6rem", fontVariantNumeric: "tabular-nums" }}>
            1881–193<span style={{ color: RED, fontSize: "0.7em", letterSpacing: 0, marginLeft: "0.05em" }}>∞</span>
          </div>
          <div style={{ fontSize: "0.95rem", color: MUT, letterSpacing: "0.04em", marginTop: "0.9rem" }}>
            Saygı ve minnetle...
          </div>
        </div>

        {/* Alt satır */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "1.6rem 0 2rem", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: "0.6rem", textAlign: isMobile ? "center" : "left" }}>
          <div style={{ color: MUT, fontSize: "0.88rem" }}>
            © 2026 Göktürk Labs ·{" "}
            <a href="https://github.com/semihr66" target="_blank" rel="noopener noreferrer" style={{ color: PL, textDecoration: "none" }}>semihr66</a>
          </div>
          <div style={{ color: MUT, fontSize: "0.88rem" }}>
            Bağımsız Discord bot ve web sistemleri.
          </div>
        </div>
      </div>
    </footer>
  );
}
