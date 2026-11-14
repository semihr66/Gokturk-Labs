import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { TextEffect } from "../components/core/text-effect";
import { PACKAGE_ICONS, usePackages, type SitePackage } from "../lib/supportflow";
import Footer from "../components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Shield, FileText, Server, UserCheck, Bell, Users,
  ClipboardList, BarChart3, Lock, Globe, Music, Youtube,
  Star, Gift, Gamepad2, Brain, Pickaxe,
  ChevronDown, Plus, Minus, Check, Copy, ArrowRight,
  ExternalLink, MessageCircle, Menu, X, Zap, Activity,
  Flame, Crown, Ban, Headphones, Lightbulb,
} from "lucide-react";

/* ─── LINKS ─── */
const DC = "https://discord.gg/Y5CTNskKCG";
const DM = "https://discord.com/users/937079326149595147";

/* ─── COLORS ─── */
const P = "#7C3AED"; // purple
const PL = "#A78BFA"; // purple light
const G = "#10B981"; // green
const A = "#F59E0B"; // amber
const BG = "#000000";
const S1 = "#070709";
const CARD = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";
const GLASS: React.CSSProperties = { background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" };
const GLASS_P: React.CSSProperties = { background: "rgba(124,58,237,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" };
const TEXT = "#FFFFFF";
const SUB = "#94A3B8";
const MUT = "#4B5563";

/* ─── SCROLL ANIMATION v2 — set SCROLL_V2=false to revert ─── */
const SCROLL_V2 = true;
const SPRING_S = SCROLL_V2
  ? { type: "spring" as const, stiffness: 60, damping: 22 }
  : { type: "spring" as const, stiffness: 38, damping: 18, mass: 1.3 };
const SPRING_C = SCROLL_V2
  ? { type: "spring" as const, stiffness: 72, damping: 24 }
  : { type: "spring" as const, stiffness: 52, damping: 22 };

/* ─── TYPES ─── */
type Mod = { tag: string; name: string; desc: string; icon: React.ElementType; feats: string[]; isNew?: boolean; isSoon?: boolean; badge?: string };
type Pkg = { id: string; icon: React.ElementType; name: string; desc: string; price: string; period: string; color: string; feats: string[]; copyText: string; highlight?: boolean; badge?: string };

/* ─── DATA ─── */
const MODS: Mod[] = [
  { tag: "SECURITY", name: "Güvenlik & Moderasyon", icon: Shield, desc: "Spam, reklam, küfür filtresi. Anti-raid ve karantina ile 7/24 aktif koruma.", feats: ["Discord AutoMod v2","Anti-Raid Kalkanı"] },
  { tag: "LOGGING", name: "Log Tutma", icon: FileText, desc: "Silinen mesajlar, düzenlemeler ve tüm hareketler resimli olarak kayıt altına alınır.", feats: ["Resimli & Görsel Log","Düzenlenen Mesaj Takibi"] },
  { tag: "MANAGEMENT", name: "Sunucu Mimarisi & Yedek", icon: Server, desc: "Tek komutla 17 kanallı kurumsal şablon ve JSON şifreli tam yedek sistemi.", feats: ["JSON Şifreli Tam Yedek","17 Kanal Kurumsal Şablon"] },
  { tag: "ONBOARDING", name: "Butonlu Kayıt & Doğrulama", icon: UserCheck, isNew: true, desc: "Yeni üyeleri kayıtsız rolüyle karşılar; tek tıkla buton veya modal formla doğrular.", feats: ["Tek Tık Doğrulama","Kayıtsız / Üye Rol Ayrımı"] },
  { tag: "ONBOARDING", name: "Karşılama & Uğurlama", icon: Bell, desc: "Canvas 2D avatar renderli dinamik afiş ve özelleştirilebilir hoş geldin mesajları.", feats: ["Canvas 2D Avatar","Otomatik Karşılama Rolü"] },
  { tag: "AUTOMATION", name: "Otomatik Rol Yönetimi", icon: Users, desc: "Yeni katılan üye ve botlara anlık yetki tanımlaması. Menülü veya butonlu rol.", feats: ["0.1s Gecikmesiz Atama","Seçimli Buton Menüleri"] },
  { tag: "SUPPORT", name: "Destek & Talep (Ticket)", icon: ClipboardList, desc: "Buton tabanlı özel destek kanalları ve şifreli HTML log transkript sistemi.", feats: ["Çoklu Departman Seçimi","Şifreli HTML Transkript"] },
  { tag: "RECRUITMENT", name: "Yetkili Başvuru & Mülakat", icon: UserCheck, desc: "Modal formla aday toplar; onayda özel sesli/yazılı mülakat odası otomatik açılır.", feats: ["Modal Başvuru Formu","Geçici Özel Mülakat Odası"] },
  { tag: "ANALYTICS", name: "Canlı Ses Sayaçları", icon: BarChart3, badge: "GELİŞMİŞ", desc: "10 kilitli ses kanalında canlı üye, bot, çevrimiçi ve ses sayaçları.", feats: ["10 Kilitli Ses Sayacı","Otomatik 10 Dk Senkron"] },
  { tag: "MANAGEMENT", name: "Şifreli Web Yönetim Paneli", icon: Lock, badge: "PRO", desc: "Tarayıcıdan bot ayarlarını, logları ve rolleri PBKDF2 256-bit güvenliğiyle yönet.", feats: ["PBKDF2 256-Bit","HIBP Şifre Sızıntı Kalkanı"] },
  { tag: "TELEMETRY", name: "Davet Takip Sistemi", icon: Globe, desc: "Gelişmiş davet analitiği, sahte üye filtresi ve otomatik davet sayacı.", feats: ["Sahte Hesap Tespiti","Canlı Log Kanalı"] },
  { tag: "AUDIO", name: "Özel Ses Odaları & HD Müzik", icon: Music, desc: "Odaya girince otomatik kilitli özel oda + 128 kbps Spotify/YouTube müzik.", feats: ["Tıkla-Oluşsun Oda","128 kbps Ultra HD Müzik"] },
  { tag: "MEDIA", name: "YouTube & Canlı Yayın Bildirim", icon: Youtube, isNew: true, desc: "Kanal bağla; yeni video ve canlı yayınlarda anlık Discord bildirimleri al.", feats: ["Sıfır Gecikme RSS Motoru","Özel Rol Etiketi"] },
  { tag: "ENGAGEMENT", name: "Seviye & XP Sistemi", icon: Star, desc: "Aktiviteye dayalı XP, kişiselleştirilebilir SVG rank kartı ve liderlik tablosu.", feats: ["Ses & Metin Çift XP","Özel SVG Rank Kartı"] },
  { tag: "EVENTS", name: "Çekiliş Sistemi", icon: Gift, desc: "Zaman ayarlı, kriter destekli çekiliş motoru. Rol şartı ve yedek talihli seçer.", feats: ["Kriptografik RNG Seçim","Rol & Katılım Şartı"] },
  { tag: "COMMUNITY", name: "Eğlence Modülleri", icon: Gamepad2, desc: "Mini oyunlar, şans komutları ve interaktif araçlarla topluluk etkileşimini artır.", feats: ["İnteraktif Oyun Menüsü","Şans ve Zar Komutları"] },
  { tag: "INTELLIGENCE", name: "Gemini AI Entegrasyonu", icon: Brain, desc: "Çok katmanlı Google Gemini 2.5 Flash ile sunucu hafızalı AI sohbet asistanı.", feats: ["Google Gemini 2.5 Flash","Sunucu Hafızası"] },
  { tag: "MINECRAFT", name: "Minecraft Sunucu Sistemleri", icon: Pickaxe, isSoon: true, desc: "Discord ile entegre Minecraft yönetimi — gerçek zamanlı konsol, oyuncu takibi.", feats: ["Canlı Konsol Logları","Discord'dan Yönetim"] },
];

/* Paketler yönetici panelinden (/yonetim) düzenlenir; SupportFlow API'sinden okunur.
   API'ye ulaşılamazsa lib/supportflow.ts içindeki DEFAULT_PACKAGES gösterilir. */
const toPkg = (p: SitePackage): Pkg => ({
  id: p.key, icon: PACKAGE_ICONS[p.icon] ?? Star, name: p.name, desc: p.description, price: p.price, period: p.period,
  color: p.color, feats: p.features, copyText: p.orderText, highlight: p.highlight, badge: p.badge ?? undefined,
});

const FAQS = [
  { q: "Botumu başkası kendi sunucusunda kullanabilir mi?", a: "Hayır. Her bot, sunucunuzun kimliğine bağlı bir lisansla çalışır. Lisansı olmayan bir sunucuya eklenirse sunucu sahibine uyarı gönderir ve birkaç saniye içinde o sunucudan ayrılır. Lisanslar her 30 saniyede bir otomatik olarak denetlenir." },
  { q: "Bot teslim edilmeden önce test ediliyor mu?", a: "Evet. Botunuzu sizin sunucunuza eklemeden önce kendi test sunucumuzda kurup çalıştırıyoruz. Komutlar, yetkiler ve log kanalları gerçek Discord ortamında denendikten sonra teslim ediliyor." },
  { q: "Abonelik ve 7/24 barındırma nasıl işliyor?", a: "Aylık ödeme karşılığında botunuz Göktürk Labs VDS sunucusunda kesintisiz çalıştırılır. Abonelik süresi dolduğunda bota erişim durdurulur, önceki veriler silinmez." },
  { q: "Sipariş ve kurulum ne kadar sürer?", a: "Çoğu sipariş Discord DM üzerinden 24 saat içinde tamamlanır. Kurumsal veya çok modüllü projeler 2–3 gün alabilir." },
  { q: "Botun kodlarını alabilir miyim?", a: "Gelişmiş (Custom) ve Pro paketlerde özel yazılan kodlar sizinle paylaşılır. Bot, Göktürk Labs VDS sunucusunda izole çalışır; ayrıca sunucu kiralamanız gerekmez." },
  { q: "Web Yönetim Paneli neleri kapsıyor?", a: "Pro paket kapsamında bot ayarlarını, log kayıtlarını ve rol yönetimini tarayıcı üzerinden PBKDF2 şifreleme ile güvenle yönetebilirsiniz." },
  { q: "Sunucu verilerim güvende mi?", a: "Göktürk Labs hiçbir sunucu verisini üçüncü taraflarla paylaşmaz veya satmaz. Tüm veriler şifreli depolanır." },
  { q: "Ödemeyi nasıl yapabilirim?", a: "Ödeme yöntemi Discord DM üzerinden geliştiriciyle birlikte netleştirilir. Genellikle havale/EFT veya dijital ödeme yöntemleri kabul edilir." },
  { q: "Başlangıç paketi için 30–35 üye şartı nasıl doğrulanıyor?", a: "Discord sunucunuzun üye sayısını birlikte kontrol ederiz. Üye sayısı 30'un altındaysa temel modülleri kurabilir, 30–35 üyeye ulaştığınızda ücretsiz pakete geçiş yapılır. Ayrıca sunucunuzda bir duyuru kanalı bulunması ve kurulum ile önemli güncellemelerin bu kanalda duyurulması zorunludur." },
  { q: "Birden fazla sunucu için aynı botu kullanabilir miyim?", a: "Her sunucu ayrı bir izole bot servisi alır; ancak 2–3 sunucuda tolerans gösterilmektedir. Bununla birlikte, lisans sistemi nedeniyle yetki verebilmemiz için ek sunucuları beyan etmeniz ve guild ID iletmeniz gerekmektedir. Daha fazla sunucu için indirimli çoklu sunucu teklifleri konusunda Discord DM'den iletişime geçebilirsiniz." },
];

const MARQUEE1 = ["Güvenlik & Moderasyon","Log Tutma","Butonlu Ticket","Yetkili Başvuru","Seviye & XP","Karşılama Sistemi","HD Müzik","Çekiliş Motoru","Gemini AI","YouTube Bildirim","Davet Takip","Ses Sayaçları"];
const MARQUEE2 = ["DISCORD.JS v14","TYPESCRIPT","NODE.JS v20","PM2 CLUSTER","SQLITE","AES-256","PBKDF2","VDS 7/24","GOOGLE GEMINI","CANVAS 2D","RSS ENGINE","WEBHOOK API"];

const NAV = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Modüller", href: "#moduller" },
  { label: "Nasıl Çalışır?", href: "#nasil" },
  { label: "Paketler", href: "#paketler" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "SSS", href: "#sss" },
];

/* ─── DISCORD ICON ─── */
function Di({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillRule="evenodd">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.043.033.054a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ─── LABEL ─── */
function Label({ text, color = P }: { text: string; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", background: `${color}12`, border: `1px solid ${color}28`, borderRadius: 99, padding: "0.3rem 0.8rem 0.3rem 0.5rem" }}>
      <span style={{ width: 6, height: 6, background: color, display: "inline-block", borderRadius: "50%", boxShadow: `0 0 6px ${color}` }} />
      <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: color, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

/* ─── MARQUEE ROW ─── */
function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
      <div style={{
        display: "flex", gap: "0", width: "max-content",
        animation: `marquee${reverse ? "R" : ""} 28s linear infinite`,
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, padding: "0 2rem", whiteSpace: "nowrap" }}>
            <span style={{ width: 6, height: 6, background: P, borderRadius: "50%", marginRight: "1.2rem", display: "inline-block", opacity: 0.6 }} />
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: SUB, letterSpacing: "0.06em", textTransform: "uppercase" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── DISCORD MOCKUP ─── */
function BotMockup() {
  const lines = [
    { type: "cmd", text: "/ticket-ac" },
    { type: "ok", text: "#ticket-semih kanalı açıldı." },
    { type: "cmd", text: "/kayıt @semih1231" },
    { type: "ok", text: "semih1231 Üye rolüyle kayıt edildi." },
    { type: "cmd", text: "/log-ayar #sunucu-log" },
    { type: "ok", text: "Log kanalı #sunucu-log olarak ayarlandı." },
    { type: "sys", text: "── Göktürk Labs VDS ── Uptime: 99.98% ──" },
  ];
  return (
    <div style={{ background: "#0D0E14", border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace", fontSize: "0.82rem" }}>
      {/* Title bar */}
      <div style={{ background: "#161820", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: `1px solid ${BORDER}` }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ flex: 1, textAlign: "center", color: SUB, fontSize: "0.7rem" }}>Göktürk Labs Bot — #bot-komutlar</span>
      </div>
      {/* Lines */}
      <div style={{ padding: "1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {lines.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.18 }}
            style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
            {l.type === "cmd" && <span style={{ color: P, flexShrink: 0 }}>›</span>}
            {l.type === "ok" && <span style={{ color: G, flexShrink: 0 }}>›</span>}
            {l.type === "sys" && <span style={{ color: MUT, flexShrink: 0 }}>·</span>}
            <span style={{ color: l.type === "cmd" ? TEXT : l.type === "ok" ? G : MUT, lineHeight: 1.5 }}>{l.text}</span>
          </motion.div>
        ))}
        {/* Blinking cursor */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ color: P }}>›</span>
          <span style={{ display: "inline-block", width: 8, height: 16, background: P, opacity: 0.8, animation: "blink 1s step-end infinite" }} />
        </div>
      </div>
      {/* Status bar */}
      <div style={{ background: P, padding: "0.4rem 1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ color: "#fff", fontSize: "0.68rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Activity size={11} /> 7/24 CANLI VDS AKTİF
        </span>
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.68rem", marginLeft: "auto" }}>göktürklabs.net</span>
      </div>
    </div>
  );
}

/* ─── LOADING SCREEN ─── */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: "fixed", inset: 0, background: BG, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", fontFamily: "'Space Grotesk','Plus Jakarta Sans','Inter',sans-serif" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, background: `radial-gradient(ellipse, ${P}30 0%, transparent 70%)`, pointerEvents: "none" }} />
      <motion.img src="/gokturk-labs-logo.png" alt="Logo"
        initial={{ scale: 0.65, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        style={{ width: 76, height: 76, position: "relative" }} />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.4 }}
        style={{ fontWeight: 900, fontSize: "1.7rem", letterSpacing: "-0.03em", position: "relative" }}>
        Göktürk <span style={{ color: PL }}>Labs</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }}
        style={{ width: 220, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1, overflow: "hidden", position: "relative" }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.55, ease: "easeInOut" }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${P}, ${PL})` }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        style={{ fontSize: "0.72rem", color: MUT, letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase", position: "relative" }}>
        Discord Bot & Yazılım Atölyesi
      </motion.div>
    </motion.div>
  );
}

/* ─── HOME ─── */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tos, setTos] = useState<Record<string, boolean>>({});
  const [tosWarn, setTosWarn] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [pkgTab, setPkgTab] = useState<"all" | "baslangic" | "dengeli" | "gelismis" | "pro">("all");
  const [selectedPkg, setSelectedPkg] = useState("gelismis");
  const particles = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: (i * 61.8) % 100,
      y: (i * 38.2) % 100,
      size: 1 + (i % 2),
      dur: 4 + (i % 7),
      delay: (i % 6) * 0.5,
      opacity: 0.08 + (i % 4) * 0.05,
    })),
  []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const copy = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(id); setTimeout(() => setCopied(null), 2000); });
  }, []);

  const sitePackages = usePackages();
  const PKGS = useMemo(() => sitePackages.map(toPkg), [sitePackages]);
  const featured = PKGS.find(p => p.highlight) ?? PKGS[0]!;

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh", fontFamily: "'Space Grotesk','Plus Jakarta Sans','Inter',sans-serif", overflowX: "hidden" }}>
      <AnimatePresence>{!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}</AnimatePresence>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        a{text-decoration:none;color:inherit}
        input,textarea,select{color-scheme:dark;outline:none}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes marqueeR{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-18px) scale(1.15)}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes borderSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .mhide{display:flex;align-items:center}
        .mshow{display:none!important}
        @media(max-width:768px){.mhide{display:none!important}.mshow{display:flex!important}}
        input:focus,textarea:focus,select:focus{border-color:rgba(124,58,237,0.6)!important;box-shadow:0 0 0 3px rgba(124,58,237,0.13)!important;outline:none!important}
        .pkg-highlight{position:relative}
        .pkg-highlight::before{content:"";position:absolute;inset:-1px;border-radius:15px;background:linear-gradient(135deg,rgba(124,58,237,0.5),rgba(167,139,250,0.3));z-index:-1;animation:pulse 2s ease-in-out infinite}
        .grad-text{background:linear-gradient(135deg,#fff 0%,#C4B5FD 50%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .grad-text-2{background:linear-gradient(90deg,#A78BFA,#7C3AED,#A78BFA);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        .card-glow{transition:box-shadow .25s,border-color .25s,transform .25s}
        .card-glow:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(124,58,237,0.18),0 0 0 1px rgba(124,58,237,0.25)!important;border-color:rgba(124,58,237,0.35)!important}
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "0.5rem 1.25rem" : "0.9rem 1.25rem",
        transition: "padding .3s ease",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          minHeight: 54,
          padding: "0 0.9rem 0 1.1rem",
          background: scrolled ? "rgba(8,9,13,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(22px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
          border: `1px solid ${scrolled ? "rgba(255,255,255,0.12)" : "transparent"}`,
          borderRadius: "1.5rem",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
          transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
        }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexShrink: 0 }}>
            <img src="/gokturk-labs-logo.png" alt="Logo" style={{ width: 34, height: 34 }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.97rem", letterSpacing: "-0.01em" }}>Göktürk <span style={{ color: PL }}>Labs</span></div>
              <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.07em", fontWeight: 700, whiteSpace: "nowrap" }}>YAZILIM & YÖNETİM</div>
            </div>
          </a>

          <div className="mhide" style={{ gap: "0.05rem" }}>
            {NAV.map(n => (
              <a key={n.href} href={n.href}
                style={{ padding: "0.42rem 0.78rem", borderRadius: 8, fontSize: "0.84rem", fontWeight: 500, color: SUB, background: "transparent", transition: "color .15s, background .15s" }}
                onMouseEnter={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = SUB; e.currentTarget.style.background = "transparent"; }}>
                {n.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <a href={DC} target="_blank" rel="noopener noreferrer" className="mhide"
              style={{ gap: "0.35rem", padding: "0.42rem 0.78rem", borderRadius: 8, background: "transparent", color: SUB, fontSize: "0.84rem", fontWeight: 500, transition: "color .15s, background .15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = SUB; e.currentTarget.style.background = "transparent"; }}>
              <Di size={15} /> Topluluk
            </a>
            <a href="#paketler" className="mhide" style={{ background: P, color: "#fff", borderRadius: 9, padding: "0.5rem 1.05rem", fontSize: "0.84rem", fontWeight: 700, gap: "0.35rem", boxShadow: `0 0 20px ${P}55, 0 4px 16px ${P}44`, transition: "box-shadow .15s, transform .15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${P}80, 0 6px 20px ${P}60`; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${P}55, 0 4px 16px ${P}44`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Paket Seç <ArrowRight size={13} />
            </a>
            <button className="mshow" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT, cursor: "pointer", padding: "0.4rem 0.5rem" }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ background: S1, borderTop: `1px solid ${BORDER}`, padding: "0.5rem 1.25rem 1rem" }}>
              {NAV.map(n => (
                <a key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "block", padding: "0.75rem 0.25rem", fontSize: "0.95rem", fontWeight: 500, borderBottom: `1px solid ${BORDER}`, color: SUB }}>
                  {n.label}
                </a>
              ))}
              <a href="#paketler" onClick={() => setMobileOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "0.75rem", background: P, color: "#fff", borderRadius: 10, padding: "0.8rem", fontSize: "0.95rem", fontWeight: 700, boxShadow: `0 0 20px ${P}55` }}>
                Paket Seç <ArrowRight size={15} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="top" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "8rem 1.5rem 6rem", position: "relative", overflow: "hidden" }}>
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none", maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)" }} />
        {/* Primary glow — large top-center */}
        <div style={{ position: "absolute", top: "-5%", left: "50%", transform: "translateX(-50%)", width: "90vw", height: "70vh", background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${P}50 0%, ${P}18 40%, transparent 70%)`, pointerEvents: "none" }} />
        {/* Secondary smaller bright spot */}
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "40vw", height: "30vh", background: `radial-gradient(ellipse, ${PL}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size, borderRadius: "50%",
              background: `rgba(167,139,250,${p.opacity})`,
              animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `${P}15`, border: `1px solid ${P}35`, borderRadius: 99, padding: "0.35rem 1rem", marginBottom: "2rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: PL, textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, background: G, borderRadius: "50%", boxShadow: `0 0 8px ${G}`, animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
              7/24 Aktif · Göktürk Labs
            </div>

            <h1 style={{ fontSize: "clamp(3.2rem,7vw,6.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.045em", marginBottom: "2rem" }}>
              <span style={{ display: "block", color: TEXT }}>Sunucunuz İçin</span>
              <span className="grad-text" style={{ display: "block" }}>Özel Discord</span>
              <span style={{ display: "block", color: TEXT }}>Botları & Altyapı</span>
            </h1>

            <p style={{ fontSize: "1.1rem", color: SUB, lineHeight: 1.8, marginBottom: "2.75rem", maxWidth: 560, margin: "0 auto 2.75rem" }}>
              Kendi VDS sunucumuzda 7/24 kesintisiz çalışan, resimli log tutan, bilet ve mülakat odalarını otomatik yöneten botunuzu birkaç saat içinde yayına alalım.
            </p>

            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.75rem" }}>
              <a href="#paketler" style={{ background: P, color: "#fff", borderRadius: 12, padding: "1rem 2.2rem", fontSize: "1.05rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: `0 0 50px ${P}65, 0 8px 32px ${P}45`, transition: "box-shadow .2s, transform .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 70px ${P}85, 0 12px 40px ${P}65`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 50px ${P}65, 0 8px 32px ${P}45`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                Paketleri Gör <ArrowRight size={17} />
              </a>
              <a href="#moduller" style={{ background: "rgba(255,255,255,0.05)", color: TEXT, border: `1px solid rgba(255,255,255,0.14)`, borderRadius: 12, padding: "1rem 2.2rem", fontSize: "1.05rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", backdropFilter: "blur(12px)", transition: "border-color .2s, background .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.28)`; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.14)`; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}>
                <Zap size={15} /> Modülleri İncele
              </a>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { Icon: Ban, text: "Sahte Veri Yok", color: G },
                { Icon: Server, text: "7/24 VDS", color: PL },
                { Icon: Headphones, text: "Doğrudan Geliştirici", color: A },
              ].map(({ Icon, text, color }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: TEXT, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 99, padding: "0.42rem 0.9rem" }}>
                  <Icon size={13} color={color} /> {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bot Mockup centered below */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            style={{ marginTop: "4rem", maxWidth: 680, margin: "4rem auto 0", position: "relative" }}>
            <div style={{ position: "absolute", inset: "-20px", background: `radial-gradient(ellipse, ${P}25 0%, transparent 70%)`, pointerEvents: "none", borderRadius: 24 }} />
            <div style={{ position: "relative", border: `1px solid ${P}30`, borderRadius: 20, overflow: "hidden", boxShadow: `0 0 80px ${P}20` }}>
              <BotMockup />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ padding: "3rem 1.5rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: "0.5rem" }}>
          {[
            { n: "18+", l: "Bot Modülü", c: PL },
            { n: "7/24", l: "VDS Uptime", c: G },
            { n: "₺50", l: "Başlangıç Fiyatı", c: A },
            { n: "100%", l: "Müşteri Memnuniyeti", c: "#38BDF8" },
          ].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...SPRING_C, delay: i * 0.08 }}
              style={{ textAlign: "center", padding: "1.75rem 1rem", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16 }}>
              <div style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", color: s.c, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "0.78rem", color: SUB, fontWeight: 600, marginTop: "0.4rem", letterSpacing: "0.04em" }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{ background: S1, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 0", display: "flex", flexDirection: "column", gap: "0.9rem", overflow: "hidden" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: P, display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 1.5rem", marginBottom: "0.25rem" }}>
          <span style={{ width: 8, height: 8, background: P, borderRadius: 2 }} />
          TÜM SİSTEMLER TEK BOTTAN
        </div>
        <MarqueeRow items={MARQUEE1} />
        <MarqueeRow items={MARQUEE2} reverse />
      </div>

      {/* ── SERVICES (ek 4) ── */}
      <section id="hizmetler" style={{ padding: "9rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Label text="HİZMET KATEGORİLERİ" />
          <motion.div initial={{ opacity: 0, y: 64, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={SPRING_S}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", marginBottom: "3.5rem", alignItems: "end" }}>
            <h2 style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
              Ne istersen,<br /><span className="grad-text">tek atölyeden</span><br />tam kontrol.
            </h2>
            <p style={{ color: SUB, lineHeight: 1.8, fontSize: "0.95rem" }}>
              Discord botu, web yönetim paneli, 7/24 VDS barındırma ve özel yazılım çözümlerinin tamamı aynı geliştirici tarafından, aynı çatı altında sunulur.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1rem" }}>
            {[
              { id: "bot", icon: MessageCircle, name: "Discord Bot Geliştirme", category: "TEMEL HİZMET", desc: "TypeScript tabanlı, PM2 cluster altında çalışan Discord.js v14 botu. Kayıt, moderasyon, ticket ve daha fazlası.", feats: ["Kayıt, moderasyon, ticket sistemleri","Canvas 2D, Ses odaları, XP sistemi","Özel komutlar ve modüller"], price: "50₺", period: "aylık başlangıç", color: P, badge: "EN POPÜLER" },
              { id: "panel", icon: Lock, name: "Web Yönetim Paneli", category: "PRO ÖZELLİK", desc: "PBKDF2 256-bit şifrelemeli, HIBP korumalı, tarayıcıdan bot ayarlarını yönetebileceğin güvenli panel.", feats: ["HIBP şifre sızıntı koruması","Rol ve kanal yönetimi paneli","Log kayıtlarına tarayıcıdan erişim"], price: "350₺", period: "aylık (Pro pakette)", color: A, badge: "PRO" },
              { id: "vds", icon: Server, name: "7/24 VDS Barındırma", category: "ALTYAPI", desc: "Botun Göktürk Labs VDS sunucusunda izole servis olarak, PM2 cluster ile kesintisiz çalışır.", feats: ["PM2 cluster + otomatik yeniden başlatma","Türkiye lokasyonlu düşük gecikme","Uptime monitoring ve alert sistemi"], price: "Dahil", period: "tüm paketlerde", color: G, badge: "DAHİL" },
              { id: "ozel", icon: Brain, name: "Özel Yazılım & Otomasyon", category: "CUSTOM", desc: "Standart modüllerin dışında, sunucuna tamamen özel yazılmış sistemler ve Gemini AI entegrasyonları.", feats: ["Terzi usulü Discord entegrasyonları","Gemini AI destekli sohbet asistanı","Minecraft panel, webhook ve API köprüleri"], price: "150₺", period: "aylık başlangıç", color: "#38BDF8", badge: "CUSTOM" },
            ].map((svc, i) => {
              const SvcIcon = svc.icon;
              return (
                <motion.div key={svc.id} initial={{ opacity: 0, y: 42, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ ...SPRING_C, delay: i * 0.07 }}
                  className="card-glow"
                  style={{ ...GLASS, border: `1px solid rgba(255,255,255,0.09)`, borderRadius: 20, padding: "1.75rem", position: "relative", overflow: "hidden", cursor: "default" }}>
                  <div style={{ position: "absolute", top: 16, right: 16, background: `${svc.color}22`, color: svc.color, border: `1px solid ${svc.color}44`, borderRadius: 6, fontSize: "0.6rem", fontWeight: 800, padding: "0.2rem 0.5rem", letterSpacing: "0.08em" }}>{svc.badge}</div>
                  <div style={{ background: `${svc.color}18`, borderRadius: 12, padding: "0.75rem", display: "inline-flex", marginBottom: "1.1rem" }}>
                    <SvcIcon size={22} color={svc.color} />
                  </div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: svc.color, marginBottom: "0.4rem" }}>{svc.category}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "0.6rem" }}>{svc.name}</h3>
                  <p style={{ color: SUB, fontSize: "0.78rem", lineHeight: 1.65, marginBottom: "1.1rem" }}>{svc.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
                    {svc.feats.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.74rem", color: SUB }}>
                        <Check size={11} color={G} /> {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid rgba(255,255,255,0.06)`, paddingTop: "1rem" }}>
                    <div>
                      <div style={{ fontSize: "1.4rem", fontWeight: 900, color: svc.color, lineHeight: 1 }}>{svc.price}</div>
                      <div style={{ fontSize: "0.65rem", color: MUT, marginTop: "0.15rem" }}>{svc.period}</div>
                    </div>
                    <a href="#paketler" style={{ background: `${svc.color}22`, color: svc.color, border: `1px solid ${svc.color}44`, borderRadius: 9, padding: "0.5rem 0.9rem", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      Paket Seç <ArrowRight size={12} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section id="moduller" style={{ padding: "9rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Label text="BOT SİSTEMLERİ & EKLENTİLER" />
          <motion.div initial={{ opacity: 0, y: 64, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={SPRING_S}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", marginBottom: "3.5rem", alignItems: "end" }}>
            <h2 style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
              <TextEffect per="word" preset="fade-in-blur" onScroll as="span" style={{ display: "block" }}>
                Sunucunuzu
              </TextEffect>
              <TextEffect per="word" preset="fade-in-blur" onScroll delay={0.08} as="span" style={{ display: "block", background: "linear-gradient(135deg,#fff 0%,#C4B5FD 50%,#7C3AED 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Güçlendiren
              </TextEffect>
              <TextEffect per="word" preset="fade-in-blur" onScroll delay={0.16} as="span" style={{ display: "block" }}>
                Modüller
              </TextEffect>
            </h2>
            <div>
              <p style={{ color: SUB, lineHeight: 1.75, fontSize: "0.9rem" }}>İhtiyacınıza uygun modülü seçerek projenize entegre edebilirsiniz. Her modül bağımsız çalışır, istediğiniz kombinasyonu oluşturabilirsiniz.</p>
              <a href={DM} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "1.25rem", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "0.65rem 1.1rem", fontSize: "0.84rem", fontWeight: 600, color: TEXT }}>
                <Di size={15} color={PL} /> Özel Modül İste
              </a>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: "0.85rem" }}>
            {MODS.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div key={mod.name}
                  initial={{ opacity: 0, y: 42, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }} transition={{ ...SPRING_C, delay: i * 0.05 }}
                  whileHover={{ y: -3, boxShadow: `0 10px 32px rgba(124,58,237,0.15)`, borderColor: `${P}44` }}
                  style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "1.15rem", position: "relative", overflow: "hidden" }}>
                  {/* Renkli üst aksan çizgisi */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: mod.isSoon ? `${A}80` : mod.isNew ? `${G}80` : mod.badge ? `${P}80` : `${P}40`, borderRadius: "14px 14px 0 0" }} />
                  {mod.isSoon && <div style={{ position: "absolute", top: 10, right: 10, background: `${A}22`, color: A, border: `1px solid ${A}44`, borderRadius: 6, fontSize: "0.62rem", fontWeight: 700, padding: "0.18rem 0.42rem" }}>YAKINDA</div>}
                  {mod.isNew && <div style={{ position: "absolute", top: 10, right: 10, background: `${G}18`, color: G, border: `1px solid ${G}33`, borderRadius: 6, fontSize: "0.62rem", fontWeight: 700, padding: "0.18rem 0.42rem" }}>YENİ</div>}
                  {mod.badge && <div style={{ position: "absolute", top: 10, right: 10, background: `${P}22`, color: PL, border: `1px solid ${P}44`, borderRadius: 6, fontSize: "0.62rem", fontWeight: 700, padding: "0.18rem 0.42rem" }}>{mod.badge}</div>}
                  <div style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.08em", color: `${P}99`, marginBottom: "0.65rem", textTransform: "uppercase", marginTop: "0.3rem" }}>{mod.tag}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.55rem" }}>
                    <div style={{ background: `linear-gradient(135deg, ${P}28, ${P}10)`, border: `1px solid ${P}30`, borderRadius: 10, padding: "0.45rem", display: "flex", flexShrink: 0 }}>
                      <Icon size={16} color={PL} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.3 }}>{mod.name}</span>
                  </div>
                  <p style={{ color: SUB, fontSize: "0.77rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{mod.desc}</p>
                  {mod.feats.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.38rem", fontSize: "0.72rem", color: "rgba(148,163,184,0.75)", marginBottom: "0.28rem" }}>
                      <Check size={10} color={G} /> {f}
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="nasil" style={{ padding: "9rem 1.5rem", background: S1, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label text="İŞLEYİŞ & ÇALIŞMA BİÇİMİ" />
          <motion.div initial={{ opacity: 0, y: 64, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={SPRING_S}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "1.5rem" : "4rem", alignItems: "start", marginBottom: "3.5rem" }}>
            <div>
              <h2 style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                Bürokrasi Yok,<br /><span className="grad-text">Doğrudan</span><br />Geliştirici Masası
              </h2>
            </div>
            <p style={{ color: SUB, lineHeight: 1.75, fontSize: "0.9rem", paddingTop: "0.5rem" }}>
              Ticket botlarının otomatik cevaplarıyla değil, doğrudan botunuzu yazan ve derleyen kişiyle Discord DM'den çalışıyoruz. Üç adımda botunuz yayında.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
            {[
              { n: "01", t: "İhtiyaçları Konuşuyoruz", d: "Sunucunda ne eksik? Resimli log mu, mülakat motoru mu, özel komut mu? Bütçe ve sunucu büyüklüğüne göre en uygun mimariyi birlikte belirleriz." },
              { n: "02", t: "Önce Test Sunucusunda Çalışır", d: "Botunu senin sunucuna eklemeden önce kendi test sunucumuzda kuruyoruz. Komutları, yetki kademelerini ve logları gerçek Discord ortamında deniyor, sorunsuz çalıştığından emin olunca teslim ediyoruz." },
              { n: "03", t: "Yetki Teslimi & Sürekli Destek", d: "Botunu sunucuna davet ediyoruz, gerekirse web panel girişini iletiyoruz. Herhangi bir sorun veya güncelleme talebinde doğrudan geliştirici masası seninle." },
            ].map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 42, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 52, damping: 22, delay: i * 0.15 }}
                style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "1.6rem" }}>
                <div className="grad-text" style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "0.9rem", lineHeight: 1, opacity: 0.7 }}>{s.n}</div>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "0.6rem" }}>{s.t}</h3>
                <p style={{ color: SUB, fontSize: "0.83rem", lineHeight: 1.65 }}>{s.d}</p>
              </motion.div>
            ))}
          </div>

          {/* Lisans koruması */}
          <motion.div initial={{ opacity: 0, y: 42, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 52, damping: 22 }}
            style={{ marginTop: "1.25rem", background: `${P}12`, border: `1px solid ${P}40`, borderRadius: 16, padding: isMobile ? "1.5rem" : "1.75rem 2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr", gap: isMobile ? "1rem" : "1.5rem", alignItems: "center" }}>
            <div style={{ background: `${P}22`, borderRadius: 14, padding: "0.9rem", display: "inline-flex", width: "fit-content" }}>
              <Lock size={26} color={PL} />
            </div>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Lisans korumalı: botun sadece senin.</h3>
              <p style={{ color: SUB, fontSize: "0.86rem", lineHeight: 1.7 }}>
                Her bot, sunucunun kimliğine bağlı bir lisansla çalışır. Botun lisansı olmayan bir sunucuya eklenirse sunucu sahibine uyarı gönderir ve birkaç saniye içinde kendiliğinden ayrılır. Lisanslar her 30 saniyede bir otomatik denetlenir; botunu senden başkası kendi sunucusuna ekleyip kullanamaz.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="paketler" style={{ padding: "9rem 1.5rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Label text="ŞEFFAF FİYATLANDIRMA" />
          <motion.div initial={{ opacity: 0, y: 64, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={SPRING_S}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", marginBottom: "3.5rem", alignItems: "end" }}>
            <h2 style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
              Her ihtiyaca ve<br />bütçeye uygun,<br /><span className="grad-text">şeffaf paketler.</span>
            </h2>
            <p style={{ color: SUB, lineHeight: 1.75, fontSize: "0.9rem" }}>
              Tüm paketlerimiz 7/24 VDS barındırma dahil sunulur. Gizli ücret yok, port parası yok, kilit yok. Ödemeler Discord DM üzerinden geliştiriciyle birlikte netleştirilir.
            </p>
          </motion.div>

          {/* Sol detay + Sağ seçici */}
          {(() => {
            const sp = PKGS.find(p => p.id === selectedPkg) ?? featured;
            return (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.3fr 0.7fr", gap: "1.25rem", alignItems: "start" }}>
                {/* Sol: seçili paketin büyük detay kartı */}
                <AnimatePresence mode="wait">
                  <motion.div key={sp.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 52, damping: 22 }}
                    style={{ background: `${sp.color}10`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `2px solid ${sp.color}44`, borderRadius: 20, padding: "2rem", position: "relative" }}>
                    {sp.badge && (
                      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: sp.color, color: "#fff", fontSize: "0.65rem", fontWeight: 800, padding: "0.22rem 1.1rem", borderRadius: "0 0 9px 9px", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                        {sp.badge}
                      </div>
                    )}
                    <div style={{ marginTop: "0.75rem" }}>
                      <div style={{ fontSize: "0.68rem", color: sp.color, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        {React.createElement(sp.icon, { size: 13 })} PAKETİ SEÇTİN
                      </div>
                      <h3 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>{sp.name}</h3>
                      <p style={{ color: SUB, fontSize: "0.86rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>{sp.desc}</p>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "1.75rem" }}>
                        <span style={{ fontSize: "3rem", fontWeight: 900, color: sp.color, lineHeight: 1 }}>₺{sp.price}</span>
                        <span style={{ color: SUB, fontSize: "0.9rem" }}>/ {sp.period}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}>
                        {sp.feats.map(f => (
                          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: SUB }}>
                            <Check size={14} color={sp.color} style={{ flexShrink: 0, marginTop: "0.1rem" }} /> {f}
                          </div>
                        ))}
                      </div>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer", marginBottom: tosWarn === sp.id ? "0.4rem" : "1rem", fontSize: "0.74rem", color: SUB, lineHeight: 1.5 }}>
                        <input type="checkbox" checked={!!tos[sp.id]} onChange={e => { setTos(prev => ({ ...prev, [sp.id]: e.target.checked })); if (e.target.checked) setTosWarn(null); }} style={{ marginTop: "0.15rem", accentColor: sp.color, outline: tosWarn === sp.id ? "2px solid #ef4444" : "none", outlineOffset: 2 }} />
                        <span><a href="/hizmet-sartlari" style={{ color: sp.color }}>Hizmet Şartları</a> ve <a href="/gizlilik-politikasi" style={{ color: sp.color }}>Gizlilik Politikası</a>'nı okudum.</span>
                      </label>
                      {tosWarn === sp.id && (
                        <div role="alert" style={{ fontSize: "0.74rem", color: "#f87171", marginBottom: "0.9rem" }}>
                          Devam etmek için önce şartları okuyup kutuyu işaretlemelisin.
                        </div>
                      )}
                      <div style={{ display: "flex", gap: "0.6rem" }}>
                        <a href={DM} target="_blank" rel="noopener noreferrer" aria-disabled={!tos[sp.id]}
                          onClick={e => { if (!tos[sp.id]) { e.preventDefault(); setTosWarn(sp.id); } }}
                          style={{ flex: 1, background: tos[sp.id] ? sp.color : CARD, border: `1px solid ${tos[sp.id] ? sp.color : BORDER}`, color: tos[sp.id] ? "#fff" : SUB, borderRadius: 12, padding: "0.88rem", fontSize: "0.88rem", fontWeight: 700, textAlign: "center", transition: "background .2s", cursor: tos[sp.id] ? "pointer" : "not-allowed" }}>
                          Discord DM'den İletişime Geç
                        </a>
                        <button onClick={() => copy(sp.id, sp.copyText)}
                          style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "0.88rem 1rem", cursor: "pointer", color: copied === sp.id ? G : SUB, display: "flex", alignItems: "center" }}>
                          {copied === sp.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Sağ: plan seçici */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", position: isMobile ? "static" : "sticky", top: "6rem" }}>
                  {PKGS.map(pkg => {
                    const PkgIcon = pkg.icon;
                    const isActive = sp.id === pkg.id;
                    const isHighlight = pkg.highlight;
                    return (
                      <button key={pkg.id} onClick={() => setSelectedPkg(pkg.id)}
                        className={isHighlight && !isActive ? "pkg-highlight" : ""}
                        style={{
                          background: isActive ? `${pkg.color}18` : isHighlight ? `${pkg.color}08` : "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                          border: `1px solid ${isActive ? pkg.color + "66" : isHighlight ? pkg.color + "30" : "rgba(255,255,255,0.08)"}`,
                          borderRadius: 14, padding: "0.9rem 1rem", cursor: "pointer", textAlign: "left",
                          transition: "all 0.2s ease", width: "100%",
                          boxShadow: isHighlight && !isActive ? `0 0 20px ${pkg.color}18` : "none",
                        }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ background: `${pkg.color}1A`, borderRadius: 9, padding: "0.45rem", display: "flex", flexShrink: 0 }}>
                            <PkgIcon size={16} color={pkg.color} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "0.6rem", color: pkg.highlight ? A : pkg.color, fontWeight: 800, letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                              {pkg.highlight && <Star size={9} color={A} />}{pkg.badge}
                            </div>
                            <div style={{ fontWeight: 800, fontSize: "0.88rem", color: TEXT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pkg.name}</div>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div style={{ fontSize: "1.15rem", fontWeight: 900, color: isActive ? pkg.color : SUB, lineHeight: 1 }}>₺{pkg.price}</div>
                            <div style={{ fontSize: "0.6rem", color: MUT }}>{pkg.period}</div>
                          </div>
                        </div>
                        {isActive && (
                          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.25 }}
                            style={{ height: 2, background: pkg.color, borderRadius: 1, marginTop: "0.65rem", transformOrigin: "left" }} />
                        )}
                      </button>
                    );
                  })}
                  <p style={{ color: MUT, fontSize: "0.71rem", lineHeight: 1.6, paddingTop: "0.4rem", display: "flex", alignItems: "flex-start", gap: "0.3rem" }}>
                    <Lightbulb size={12} style={{ flexShrink: 0, marginTop: "0.1rem" }} /> Ödemeler Discord DM üzerinden geliştiriciyle netleştirilir.
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── ABOUT (ek 5+6) — MangooHost stili ── */}
      <section id="hakkimizda" style={{ padding: "10rem 1.5rem", background: S1, borderTop: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
        {/* About section bg glow */}
        <div style={{ position: "absolute", top: "30%", right: "-10%", width: "50vw", height: "50vh", background: `radial-gradient(ellipse, ${P}10 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

          {/* Merkezi büyük başlık */}
          <motion.h2 initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 38, damping: 18, mass: 1.3 }}
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, textAlign: "center", maxWidth: 900, margin: "0 auto 3.5rem" }}>
            Discord topluluklarının içinden;<br />
            <span className="grad-text">şeffaf, gerçek</span> ve dürüst bir atölye.
          </motion.h2>

          {/* Yatay çizgi */}
          <div style={{ height: 1, background: BORDER, marginBottom: "3.5rem" }} />

          {/* Sol hikaye kartı + Sağ büyük beyazlaşan metin */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.75fr 1.25fr", gap: isMobile ? "2rem" : "4rem", alignItems: "start", marginBottom: "3.5rem" }}>

            {/* Sol */}
            <div>
              <div style={{ background: `${P}18`, borderRadius: 12, padding: "0.9rem", display: "inline-flex", marginBottom: "1.25rem" }}>
                <Activity size={22} color={PL} />
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.4, marginBottom: "0.9rem" }}>
                Bizim Hikayemiz: Discord Topluluklarının Çilesini Bitirmek İçin Yola Çıktık
              </h3>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, borderRadius: 7, padding: "0.3rem 0.75rem", fontSize: "0.72rem", color: SUB, fontWeight: 600 }}>
                Göktürk Labs — Türkiye
              </div>
            </div>

            {/* Sağ — scroll ile beyazlaşan büyük paragraflar */}
            <div>
              <motion.p
                initial={{ color: "rgba(255,255,255,0.12)" }}
                whileInView={{ color: "rgba(255,255,255,0.95)" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.25 }}
                style={{ fontSize: "clamp(1.1rem,2vw,1.45rem)", fontWeight: 700, lineHeight: 1.65, marginBottom: "1.5rem" }}>
                Yıllardır Discord topluluklarının içinde kod yazıyorum. Piyasada sunulan "bot hizmetleri"ne baktığımda gördüklerim şunlardı: şişirilmiş fiyatlar, yapay zeka botlarından oluşan müşteri desteği ve sahte istatistikler üzerine kurulu tanıtımlar.
              </motion.p>
              <motion.p
                initial={{ color: "rgba(255,255,255,0.08)" }}
                whileInView={{ color: "rgba(255,255,255,0.55)" }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.1 }}
                style={{ fontSize: "clamp(1rem,1.8vw,1.25rem)", fontWeight: 600, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Karmaşık yabancı arayüzlere, gizli port paralarına ve 1000₺ üzeri fiyat etiketlerine gerek yok diyerek Göktürk Labs'ı kurdum. Sana doğrudan geliştirici olarak, gerçekten test edilmiş sistemlerle hizmet veriyorum.
              </motion.p>
              <motion.p
                initial={{ color: "rgba(255,255,255,0.05)" }}
                whileInView={{ color: "rgba(255,255,255,0.4)" }}
                transition={{ duration: 1.3, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.05 }}
                style={{ fontSize: "clamp(0.95rem,1.6vw,1.1rem)", fontWeight: 500, lineHeight: 1.75 }}>
                Göktürk Labs;{" "}
                <a href="https://github.com/semihr66" target="_blank" rel="noopener noreferrer" style={{ color: PL, fontWeight: 700 }}>semihr66</a>{" "}
                tarafından işletilen bağımsız bir yazılım atölyesidir. Birden fazla katman yok, aracı yok — sadece geliştirici ve sen.
              </motion.p>
            </div>
          </div>

          {/* Piyasa karşılaştırması */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 38, damping: 18, mass: 1.3 }}>
            <div style={{ ...GLASS, border: `1px solid ${BORDER}`, borderRadius: 20, padding: isMobile ? "1.5rem" : "2.25rem" }}>
              <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: PL, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Piyasa karşılaştırması</div>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Neden Göktürk Labs?</div>
              </div>
              {(() => {
                const rows = [
                  { l: "Bot hosting fiyatları", m: "400–1500₺/ay", g: "50–350₺/ay" },
                  { l: "Müşteri desteği", m: "Yapay zeka bot cevapları", g: "Doğrudan geliştirici" },
                  { l: "Ekstra ücretler", m: "Gizli port & slot parası", g: "Hiç yok — tamamen dahil" },
                  { l: "Şeffaflık", m: "Kaynak kodu paylaşılmıyor", g: "Gelişmiş + Pro'da tam paylaşım" },
                  { l: "Proje kanıtı", m: "Sahte demo istatistikleri", g: "Gerçek aktif çalışan sistemler" },
                ];
                const cell: React.CSSProperties = { padding: "0.95rem 1.1rem", fontSize: "0.86rem", display: "flex", alignItems: "center", gap: "0.55rem" };
                const ours = (i: number): React.CSSProperties => ({
                  ...cell, background: `${P}14`, color: TEXT, fontWeight: 600,
                  borderLeft: `1px solid ${P}40`, borderRight: `1px solid ${P}40`,
                  borderTop: `1px solid ${P}22`,
                  borderBottom: i === rows.length - 1 ? `1px solid ${P}40` : "none",
                  borderRadius: i === rows.length - 1 ? "0 0 14px 14px" : 0,
                });
                if (isMobile) {
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {rows.map(r => (
                        <div key={r.l} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: "0.9rem 1rem", background: CARD }}>
                          <div style={{ fontSize: "0.7rem", color: MUT, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.55rem" }}>{r.l}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: SUB, marginBottom: "0.35rem" }}><X size={14} color={MUT} /> {r.m}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.86rem", color: TEXT, fontWeight: 600 }}><Check size={14} color={G} /> {r.g}</div>
                        </div>
                      ))}
                    </div>
                  );
                }
                return (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1.15fr" }}>
                    <div />
                    <div style={{ ...cell, fontSize: "0.74rem", fontWeight: 700, color: MUT, letterSpacing: "0.06em", textTransform: "uppercase" }}>Piyasa geneli</div>
                    <div style={{ ...cell, fontSize: "0.74rem", fontWeight: 800, color: PL, letterSpacing: "0.06em", textTransform: "uppercase", background: `${P}26`, border: `1px solid ${P}40`, borderBottom: "none", borderRadius: "14px 14px 0 0" }}>Göktürk Labs</div>
                    {rows.map((r, i) => (
                      <React.Fragment key={r.l}>
                        <div style={{ ...cell, color: SUB, borderTop: `1px solid ${BORDER}` }}>{r.l}</div>
                        <div style={{ ...cell, color: MUT, borderTop: `1px solid ${BORDER}` }}><X size={15} style={{ flexShrink: 0 }} /> {r.m}</div>
                        <div style={ours(i)}><Check size={15} color={G} style={{ flexShrink: 0 }} /> {r.g}</div>
                      </React.Fragment>
                    ))}
                  </div>
                );
              })()}
              <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
                <a href="#paketler" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: P, color: "#fff", borderRadius: 10, padding: "0.72rem 1.5rem", fontSize: "0.88rem", fontWeight: 700 }}>
                  Şeffaf Paketleri Gör <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="iletisim" style={{ padding: "9rem 1.5rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Label text="İLETİŞİM & TALEP" />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                Doğrudan<br /><span className="grad-text">İletişime Geçin</span>
              </h2>
              <p style={{ color: SUB, lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "2rem" }}>
                Botunu aldıysan destek talebini panelden aç, yanıtı oradan takip et. Satın almadan önceki soruların için sağ alttaki butonu kullan ya da Discord'dan yaz.
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {[
                  { Icon: Ban, text: "Sahte Veri Yok", color: G },
                  { Icon: Server, text: "7/24 VDS", color: PL },
                  { Icon: Headphones, text: "Doğrudan Geliştirici", color: A },
                ].map(({ Icon, text, color }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.78rem", color: TEXT, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9, padding: "0.38rem 0.7rem" }}>
                    <Icon size={12} color={color} /> {text}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {[
                  { href: DM, t: "Doğrudan Discord DM", s: "semih1231 (937079326149595147)" },
                  { href: DC, t: "Göktürk Labs Topluluğu", s: "discord.gg/Y5CTNskKCG" },
                ].map(lnk => (
                  <a key={lnk.href} href={lnk.href} target="_blank" rel="noopener noreferrer"
                    style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 13, padding: "1rem 1.1rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div style={{ background: "rgba(88,101,242,.2)", borderRadius: 9, padding: "0.6rem", display: "flex", flexShrink: 0 }}>
                      <Di size={20} color="#7289DA" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{lnk.t}</div>
                      <div style={{ color: SUB, fontSize: "0.75rem", marginTop: "0.1rem" }}>{lnk.s}</div>
                    </div>
                    <ExternalLink size={13} color={MUT} style={{ marginLeft: "auto" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Satış sonrası destek: botu almış müşteriler destek panelinden (SupportFlow portalı) talep açar.
                Satış öncesi sorular sağ alttaki butondan gelir. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={SPRING_C}
              style={{ background: `${P}0F`, border: `1px solid ${P}40`, borderRadius: 18, padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <div style={{ background: `${P}26`, borderRadius: 11, padding: "0.65rem", display: "flex" }}>
                  <Headphones size={20} color={PL} />
                </div>
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", color: PL }}>SATIŞ SONRASI DESTEK</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, marginTop: "0.15rem" }}>Botun hazır, bir sorun mu var?</div>
                </div>
              </div>
              <p style={{ color: SUB, fontSize: "0.86rem", lineHeight: 1.7 }}>
                Paket aldıysan destek panelinden talep aç: teknik sorunlar, ayar değişiklikleri, abonelik ve fatura soruları. Talebinin durumunu ve yanıtları panelden takip edersin.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {["Teknik destek & hata bildirimi", "Bot ayarı / modül değişikliği", "Abonelik, ödeme ve iade"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.84rem", color: TEXT }}>
                    <Check size={14} color={G} /> {t}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                <a href="/destek/yeni"
                  style={{ flex: "1 1 180px", background: P, color: "#fff", borderRadius: 11, padding: "0.84rem", fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem", boxShadow: `0 6px 24px ${P}44` }}>
                  <MessageCircle size={15} /> Destek talebi aç
                </a>
                <a href="/destek"
                  style={{ flex: "1 1 160px", background: CARD, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 11, padding: "0.84rem", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem" }}>
                  Taleplerim <ArrowRight size={13} />
                </a>
              </div>
              <p style={{ fontSize: "0.72rem", color: MUT, lineHeight: 1.5 }}>
                Henüz satın almadıysan sağ alttaki <strong style={{ color: SUB }}>Satış öncesi destek</strong> butonunu kullan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="sss" style={{ padding: "9rem 1.5rem", background: S1, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? "2rem" : "4rem", alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -64 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={SPRING_S}
            style={{ position: isMobile ? "static" : "sticky", top: "6rem" }}>
            <Label text="SSS" />
            <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Aklına takılan<br />tüm sorular,<br /><span className="grad-text">şeffaf ve net</span><br />cevaplarla burada.
            </h2>
            <p style={{ color: SUB, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Farklı bir sorunuz varsa doğrudan Discord'dan yazabilirsiniz.
            </p>
            <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {[
                { Icon: Ban, text: "Sahte Veri Yok", color: G },
                { Icon: Server, text: "7/24 VDS", color: PL },
                { Icon: Headphones, text: "Doğrudan Geliştirici", color: A },
              ].map(({ Icon, text, color }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.74rem", color: TEXT, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "0.32rem 0.65rem" }}>
                  <Icon size={11} color={color} /> {text}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <a href={DC} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: P, color: "#fff", borderRadius: 10, padding: "0.7rem 1.1rem", fontSize: "0.85rem", fontWeight: 700 }}>
                <Di size={16} color="#fff" /> Discord'a Katıl
              </a>
              <a href={DM} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: CARD, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: 10, padding: "0.7rem 1.1rem", fontSize: "0.85rem", fontWeight: 600 }}>
                <MessageCircle size={15} /> Bize Ulaşın
              </a>
            </div>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: CARD, border: `1px solid ${openFaq === i ? `${P}55` : BORDER}`, borderRadius: 12, overflow: "hidden", transition: "border-color .2s" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", color: TEXT, fontSize: "0.9rem", fontWeight: 600, textAlign: "left", gap: "1rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: MUT, fontSize: "0.72rem", fontWeight: 700, minWidth: "1.5rem" }}>0{i + 1}</span>
                    {faq.q}
                  </span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.18 }} style={{ display: "flex", flexShrink: 0 }}>
                    <Plus size={18} color={openFaq === i ? PL : MUT} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div style={{ padding: "0 1.25rem 1.1rem", color: SUB, fontSize: "0.85rem", lineHeight: 1.75 }}>{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BLOCK ── */}
      <section style={{ padding: "8rem 1.5rem", borderTop: `1px solid ${BORDER}`, position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80vw", height: "60vh", background: `radial-gradient(ellipse, ${P}35 0%, ${P}10 40%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none", maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 30%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 30%, transparent 100%)" }} />
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={SPRING_S} style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `${P}15`, border: `1px solid ${P}35`, borderRadius: 99, padding: "0.35rem 1rem", marginBottom: "2rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", color: PL, textTransform: "uppercase" }}>
            <Zap size={11} color={PL} /> Hemen Başla
          </div>
          <h2 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 1.0, marginBottom: "1.5rem" }}>
            <span style={{ color: TEXT }}>Botunuzu</span>{" "}
            <span className="grad-text">Bugün</span>{" "}
            <span style={{ color: TEXT }}>Yayına Alalım</span>
          </h2>
          <p style={{ fontSize: "1.1rem", color: SUB, lineHeight: 1.75, marginBottom: "2.75rem", maxWidth: 520, margin: "0 auto 2.75rem" }}>
            İhtiyacını anlat, birlikte en uygun paketi belirleyelim. 24 saat içinde botun VDS'te çalışır durumda.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={DM} target="_blank" rel="noopener noreferrer"
              style={{ background: P, color: "#fff", borderRadius: 12, padding: "1rem 2.4rem", fontSize: "1.05rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.55rem", boxShadow: `0 0 60px ${P}70, 0 10px 40px ${P}50`, transition: "box-shadow .2s, transform .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 80px ${P}90, 0 14px 50px ${P}70`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 60px ${P}70, 0 10px 40px ${P}50`; }}>
              <Di size={18} color="#fff" /> Discord'dan Yaz
            </a>
            <a href="#paketler"
              style={{ background: "rgba(255,255,255,0.06)", color: TEXT, border: `1px solid rgba(255,255,255,0.14)`, borderRadius: 12, padding: "1rem 2.4rem", fontSize: "1.05rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.55rem", backdropFilter: "blur(12px)", transition: "border-color .2s, background .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.28)`; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.14)`; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}>
              Fiyatları Gör <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
