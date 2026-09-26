import { useState, useId, useEffect } from "react";
import { 
  ShieldCheck, 
  Terminal, 
  Code2, 
  Headphones, 
  Sparkles, 
  Lock, 
  Check, 
  X, 
  ArrowRight, 
  ArrowUpRight, 
  MessageSquare, 
  Cpu, 
  Activity, 
  Server, 
  Zap, 
  Crown, 
  Flame, 
  Menu, 
  Layers, 
  Radio, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  ExternalLink,
  Send,
  Boxes,
  LockKeyhole,
  MessageCircle,
  Settings2,
  Layers3,
  Bot,
  Music
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import StudioHero3D from "@/components/StudioHero3D";
import Footer from "@/components/Footer";

const DISCORD_ORDER_URL = "https://discord.com/users/937079326149595147";
const COMMUNITY_URL = "https://discord.gg/CFrwUThhE";
const GITHUB_URL = "https://github.com/semihr66/Gokturk-Labs";
const LOGO_URL = "/gokturk-labs-logo.png";

interface PlanItem {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  badgeType?: "free" | "fp" | "popular" | "vip";
  label: string;
  description: string;
  performance: string;
  score: number;
  features: string[];
  notice?: string;
}

const plans: PlanItem[] = [
  {
    id: "free",
    name: "Başlangıç (Topluluk)",
    price: "₺0",
    period: "ömür boyu",
    badge: "🎁 Ücretsiz Başlangıç",
    badgeType: "free",
    label: "TOPLULUK · ÜCRETSİZ",
    description: "Discord topluluğunuza profesyonel bir ilk adım. Temel komutlar ve hazır modüller.",
    performance: "Standart",
    score: 1,
    features: [
      "Temel genel komutlar ve karşılama mesajları",
      "Hazır altyapı modülleriyle hızlı kurulum",
      "3 + 1 modül hakkı (Kampanya dahil)",
      "7/24 Kesintisiz Göktürk Labs VDS barındırma",
      "Modüllü yapı (Kod Göktürk Labs sunucusunda izole çalışır)",
      "İsim/logo/kapak düzenleme yok",
      "Zorunlu: Sunucu adı veya açıklamasında '— By Göktürk Labs' ibaresi"
    ],
    notice: "Topluluk planında sunucunuzda Göktürk Labs hakkında destekleyici bir tanıtım mesajı yer almalıdır."
  },
  {
    id: "dengeli",
    name: "Dengeli",
    price: "₺50",
    period: "aylık",
    badge: "⚡ En İyi Fiyat / Performans",
    badgeType: "fp",
    label: "DENGELİ · SINIRSIZ MODÜL",
    description: "Gelişmiş moderasyon, loglama ve sınırsız modül kapasitesiyle sunucunuzun güvenliği tam kontrol altında.",
    performance: "Dengeli & Hızlı",
    score: 2,
    features: [
      "Başlangıç paketindeki tüm özellikler",
      "Sınırsız modül tanımlama hakkı",
      "Gelişmiş moderasyon ve detaylı denetim kayıtları",
      "7/24 Kesintisiz VDS barındırma dahil",
      "Bot ismi, logosu ve Discord profili özelleştirilebilir",
      "Otomatik rol ve gelişmiş filtre sistemleri",
      "Açıklama ve banner'da 'Powered by Göktürk Labs' bağlantısı yer alır"
    ]
  },
  {
    id: "gelismis",
    name: "Gelişmiş (Custom)",
    price: "₺150",
    period: "aylık",
    badge: "🔥 En Çok Tercih Edilen",
    badgeType: "popular",
    label: "GELİŞMİŞ · ÖZEL KOD & TICKET",
    description: "Özel bilet destek motoru, özel komutlar ve açık kaynak kod teslimi seçeneğiyle tam bağımsızlık.",
    performance: "Yüksek Kapasite",
    score: 3,
    features: [
      "Dengeli paketindeki tüm özellikler",
      "Sınırsız modül hakkı ve öncelikli işlem gücü",
      "Butonlu & kategorili bilet (ticket) destek sistemi",
      "Custom Bot Seçeneği: Açık kaynak kod paylaşılır",
      "Kendi VDS'inizde veya Göktürk Labs sunucusunda çalıştırma",
      "İsim, logo ve kapak görseli serbestçe düzenlenir",
      "'Powered by' ibaresi tamamen kaldırılabilir"
    ]
  },
  {
    id: "pro",
    name: "Pro (Enterprise)",
    price: "₺350",
    period: "aylık",
    badge: "👑 Maksimum Kurumsal Seviye",
    badgeType: "vip",
    label: "PRO · ŞİFRELİ WEB PANEL",
    description: "Şifreli Web Yönetim Paneli, Yetkili Mülakat Masası, HIBP sızıntı kalkanı ve VIP 7/24 öncelikli destek.",
    performance: "Maksimum VIP",
    score: 4,
    features: [
      "Özel Şifreli Web Yönetim Paneli (PBKDF2 256-Bit + HIBP korumalı)",
      "Yetkili Başvuru & Mülakat Motoru (Sesli/Yazılı özel odalar + Aday rolü)",
      "Sınırsız modül hakkı ve yüksek VDS kaynak tahsisi",
      "Gelişmiş paketindeki tüm özellikler ve tam kod erişimi",
      "Kendi sunucunuzda veya Göktürk Labs altyapısında çalışma",
      "Birebir öncelikli Discord VIP teknik destek",
      "Marka ibarelerinin tamamı kaldırılabilir"
    ]
  }
];

const faqs = [
  {
    q: "Abonelik ve 7/24 barındırma nasıl işliyor?",
    a: "Paketlerimiz aylık periyotta sunulur. Botunuz Göktürk Labs'ın yüksek performanslı Debian 12 VDS sunucularında (PM2 kümesiyle) 7/24 kesintisiz çalışır. Kendi bilgisayarınızı açık bırakmanıza, harici VDS kiralamanıza veya konsol ayarlarıyla uğraşmanıza gerek kalmaz."
  },
  {
    q: "Sipariş ve kurulum süreci nasıl başlıyor?",
    a: "İstediğiniz paketin altındaki şartları onaylayıp 'Discord’dan Sipariş Ver' butonuna bastığınızda, hazır sipariş metni panonuza kopyalanır ve doğrudan geliştiriciye yönlendirilirsiniz. İsteklerinizi dinler, botu hazırlar ve ortalama aynı gün içerisinde sunucunuza entegre ederiz."
  },
  {
    q: "Botun kodlarını teslim alabilir miyim?",
    a: "Gelişmiş ve Pro paketlerde 'Custom Bot' seçeneği bulunur; bu seçenekle TypeScript tabanlı temiz kaynak kodlarını teslim alabilir, dilediğiniz gibi geliştirebilir veya kendi sunucunuza aktarabilirsiniz. Başlangıç ve Dengeli paketlerde bot güvenliği için kodlar Göktürk Labs sunucusunda barındırılır."
  },
  {
    q: "Web Yönetim Paneli neleri kapsıyor?",
    a: "Pro pakette sunulan Web Yönetim Paneli; PBKDF2 şifreleme ve Have I Been Pwned sızıntı kalkanıyla korunur. Panel üzerinden yetkili başvuru/mülakat sistemini, Discord AutoMod kurallarını, seviye ve rank kartlarını, bilet kanallarını tek tıkla canlı olarak yönetebilirsiniz."
  },
  {
    q: "Kişisel verilerim veya sunucu bilgilerim saklanıyor mu?",
    a: "Göktürk Labs veri gizliliğine tam saygı duyar. Gereksiz kişisel veri toplanmaz, sunucu içi özel mesajlar üçüncü taraflarla paylaşılmaz ve reklam amaçlı veri işlenmez. Tüm detayları Gizlilik Politikası sayfamızdan inceleyebilirsiniz."
  },
  {
    q: "Ödemeler hangi kanallar üzerinden alınıyor?",
    a: "Ödemeler sipariş aşamasında mutabık kalınarak güvenli Türk ödeme sağlayıcıları (Shopier vb.) veya havale/EFT üzerinden gerçekleştirilir. Web sitemizde kredi kartı bilgisi saklanmaz veya talep edilmez."
  }
];

const products = [
  {
    id: "bot",
    title: "Göktürk Labs Bot",
    tagline: "Kurumsal Discord Yönetim & Güvenlik Motoru",
    icon: BotIcon,
    description: "Discord sunucunuzun güvenliği, başvuruları, biletleri ve seviye sistemini tek merkezden yöneten yeni nesil altyapı.",
    highlights: [
      "Şifreli Web Yönetim Paneli (PBKDF2 + Have I Been Pwned Koruması)",
      "Yetkili Başvuru & Mülakat Motoru (Sesli, metin ve kombine özel odalar)",
      "Çoklu Departman Bilet (Ticket) Sistemi ve Otomatik Arşivleme",
      "Göktürk Defense (Anti-Raid, Anti-Spam, Karantina & Native AutoMod)",
      "Ses & Metin Seviye/XP Sistemi ve Özel Rank Kartı Tasarımcısı",
      "Tıkla-Oluştur Geçici Kilitli Ses Odaları ve 128 kbps HD Müzik"
    ]
  },
  {
    id: "monitor",
    title: "Göktürk Node Sentinel",
    tagline: "Canlı VDS & Donanım Telemetri Masası",
    icon: Activity,
    description: "Sunucu kaynaklarını, bot süreçlerini ve güvenlik günlüklerini milisaniyelik hassasiyetle izleyen bağımsız telemetri sistemi.",
    highlights: [
      "Canlı CPU, RAM, Yük ve Disk Telemetrisi",
      "PM2 Süreç İzleme ve Otomatik Yeniden Başlatma Koruması",
      "IP Tabanlı İstek Hız Sınırlayıcı (Rate Limiting)",
      "Güvenlik Olay Günlükleri (Audit Trails)",
      "Şifreli Sentinel Token Kimlik Doğrulaması",
      "0-Kesinti Güvenlik Mimarisi"
    ]
  },
  {
    id: "custom",
    title: "Özel Bot & Altyapı Çözümleri",
    tagline: "Sunucunuza Özel Terzi Usulü Yazılım",
    icon: Code2,
    description: "Hazır şablonların yetmediği durumlarda, sunucunuzun iş modeline ve kurallarına özel TypeScript bot geliştirme.",
    highlights: [
      "discord.js v14 + TypeScript ile Sıfırdan Mimari",
      "Özel API ve Veritabanı Entegrasyonları (MongoDB, SQLite, REST API)",
      "Açık Kaynak Kod Teslimi veya Göktürk Labs VDS Barındırma",
      "Özel Slash Komutları, Butonlar ve Modal Arayüzler",
      "Rol, İzin ve Kategori Hiyerarşisine Özel Yapılandırma",
      "Garantili Bakım ve Doğrudan Geliştirici Desteği"
    ]
  }
];

const extraSystems: Array<{
  title: string;
  detail: string;
  icon: any;
  cover: string;
  badge?: string;
  poweredBy?: { label: string; url: string };
}> = [
  { title: "Karşılama Akışı & Afiş", detail: "Yeni üyeler için görsel karşılama afişi, otomatik rol ve yönlendirme sistemi.", icon: MessageCircle, cover: "cover-cyan" },
  { title: "Seviye & Dinamik XP", detail: "Ses ve metin kanallarında aktif üyeleri ödüllendiren dinamik seviye ve rank sistemi.", icon: Zap, cover: "cover-violet" },
  { title: "Davet Takibi & İstatistik", detail: "Sunucunuza gelen davetleri, ayrılanları ve sahte hesapları canlı takip eden motor.", icon: ArrowUpRight, cover: "cover-grid" },
  { title: "Çekiliş & Ödül Yönetimi", detail: "Süre, şart, rol zorunluluğu ve kazanan belirleme akışını kolaylaştıran modül.", icon: Sparkles, cover: "cover-purple" },
  { 
    title: "Gelişmiş Butonlu Bilet (Ticket)", 
    detail: "Farklı departmanlara özel butonlu destek talepleri, transkript ve otomatik arşivleme.", 
    icon: Headphones, 
    cover: "cover-magenta",
    badge: "BUTONLU TICKET" 
  },
  { title: "Otomatik Rol & Kayıt", detail: "Rolleri belirlediğiniz kurallara ve butonlu menülere göre anında tanımlayın.", icon: Settings2, cover: "cover-lines" },
  { title: "Göktürk Defense (Anti-Raid)", detail: "Spam, flood, karantina ve sağ tıklama saldırılarına karşı native AutoMod kalkanı.", icon: ShieldCheck, cover: "cover-signal" },
  { 
    title: "Özel Ses Odaları & HD Müzik", 
    detail: "Tıkla-oluştur geçici kilitli ses odaları ve Spotify entegreli 128 kbps HD müzik motoru.", 
    icon: Music, 
    cover: "cover-music", 
    badge: "ÖZEL ODA & 128K HD" 
  },
  { 
    title: "Sunucu Yedekleme & Şablon", 
    detail: "Sunucu kanallarını, rollerini ve izinlerini tek tıkla yedekleyin; emojili hazır şablonu kurun.", 
    icon: Layers3, 
    cover: "cover-backup", 
    badge: "1. SINIF ŞABLON" 
  },
  { 
    title: "Google Gemini AI Sohbet", 
    detail: "Google Gemini AI destekli akıllı Türkçe sohbet, soru-cevap ve 7/24 sunucu rehberi.", 
    icon: Bot, 
    cover: "cover-gemini", 
    badge: "YAKINDA!" 
  }
];

function ModuleCover({ index }: { index: number }) {
  switch (index) {
    case 0: // 01 Karşılama akışı
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-[10px] font-bold text-white shadow-sm">
                U
                <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-[#121218]" />
              </div>
              <span className="text-[11px] font-semibold text-white">Yeni Üye</span>
              <span className="rounded bg-[#5865F2] px-1 py-0.2 text-[8px] font-black text-white">BOT</span>
            </div>
            <span className="text-[9px] text-[#777682]">şimdi</span>
          </div>
          <div className="my-auto text-[10px] font-medium text-cyan-200/90 leading-tight">
            👋 Sunucuya katıldı! Hoş geldin.
          </div>
          <div className="inline-flex items-center gap-1 self-start rounded-md border border-cyan-400/30 bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Rol Verildi: @Üye
          </div>
        </div>
      );

    case 1: // 02 Seviye & XP
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1 rounded-md border border-purple-500/40 bg-purple-500/20 px-2 py-0.5 text-[10px] font-extrabold text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Zap className="h-3 w-3 text-purple-300 fill-purple-300" /> LVL 24
            </div>
            <span className="text-[10px] font-bold text-amber-300">🏆 TOP #1</span>
          </div>
          <div className="my-auto">
            <div className="flex items-center justify-between text-[9px] text-[#9795a3] mb-1 font-mono">
              <span>İlerleme (XP)</span>
              <span className="text-purple-300 font-bold">4,850 / 5,000</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
              <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-amber-400 shadow-[0_0_12px_rgba(192,132,252,0.8)] animate-pulse" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[8px] text-purple-300/90 font-mono">
            <span>+250 XP Mesaj Bonusu</span>
            <span className="text-emerald-400 font-bold">%97</span>
          </div>
        </div>
      );

    case 2: // 03 Davet takibi
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
            <span className="text-[10px] font-semibold text-white/80">🔗 Davet İstatistiği</span>
            <span className="inline-flex items-center text-[9px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded">
              ↗ %24 Artış
            </span>
          </div>
          <div className="my-auto flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-white tracking-tight">48</span>
            <span className="text-[10px] text-blue-300/90 font-semibold">Toplam Davet</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px]">
            <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-emerald-300 font-bold">✓ 42 Aktif</span>
            <span className="rounded bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 text-rose-300 font-bold">✕ 6 Ayrıldı</span>
          </div>
        </div>
      );

    case 3: // 04 Çekiliş sistemi
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded bg-fuchsia-500/20 border border-fuchsia-500/40 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-fuchsia-300">
              🎉 ÇEKİLİŞ
            </span>
            <span className="font-mono text-[10px] font-bold text-amber-300 animate-pulse">⏱ 01:24:18</span>
          </div>
          <div className="my-auto text-[11px] font-bold text-white truncate">
            1 Aylık Discord Nitro
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#9795a3]">👥 142 Katılımcı</span>
            <span className="inline-flex items-center gap-1 rounded bg-gradient-to-r from-purple-600 to-fuchsia-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-md">
              Katıl 🎉
            </span>
          </div>
        </div>
      );

    case 4: // 05 Destek & talep
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
            <span className="font-mono text-[10px] font-bold text-violet-300">🎫 #talep-0284</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 text-[8px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> AÇIK
            </span>
          </div>
          <div className="my-auto text-[10px] text-white/90 font-medium leading-tight">
            Yetkili ekibi talebe bağlandı.
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-rose-500/20 border border-rose-500/30 px-1.5 py-0.5 text-[9px] font-bold text-rose-300">
              🔒 Talebi Kapat
            </span>
            <span className="rounded bg-violet-500/20 border border-violet-500/30 px-1.5 py-0.5 text-[9px] font-bold text-violet-300">
              📄 HTML Log
            </span>
          </div>
        </div>
      );

    case 5: // 06 Otomatik rol
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
            <span className="text-[10px] font-semibold text-white/80">⚡ Oto-Rol Sistemi</span>
            <span className="text-[8px] font-extrabold text-purple-300 bg-purple-500/20 border border-purple-500/40 px-1.5 py-0.2 rounded">0.1s ANINDA</span>
          </div>
          <div className="my-auto flex items-center justify-between gap-1 text-[10px]">
            <div className="rounded bg-white/5 border border-white/10 px-2 py-1 text-white/80 font-medium">
              👤 Katılan
            </div>
            <span className="text-purple-400 font-bold">➔</span>
            <div className="rounded border border-purple-500/40 bg-purple-500/20 px-2 py-1 text-purple-200 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              🏷️ @Oyuncu
            </div>
          </div>
          <div className="text-[8px] text-emerald-400 flex items-center gap-1 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Sessizce otomatik tanımlanır
          </div>
        </div>
      );

    case 6: // 07 Güvenlik & moderasyon
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
            <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-300">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              <span>GÖKTÜRK DEFENSE</span>
            </div>
            <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 text-[8px] font-bold text-emerald-400">
              KORUMADA
            </span>
          </div>
          <div className="my-auto grid grid-cols-2 gap-1.5 text-[9px]">
            <div className="rounded bg-black/40 border border-white/5 p-1 text-center">
              <span className="text-white/50 block text-[8px]">Anti-Raid</span>
              <strong className="text-emerald-400 font-bold">✓ Aktif</strong>
            </div>
            <div className="rounded bg-black/40 border border-white/5 p-1 text-center">
              <span className="text-white/50 block text-[8px]">Spam Koruması</span>
              <strong className="text-cyan-300 font-bold">✓ Devrede</strong>
            </div>
          </div>
          <div className="text-[8px] text-cyan-300/80 font-mono">
            7/24 Filtre ve Kayıt devrede
          </div>
        </div>
      );

    case 7: // 08 Ses & Müzik
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
            <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-400">
              <Headphones className="h-3.5 w-3.5 text-emerald-400" />
              <span>GÖKTÜRK SES &amp; MÜZİK</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-1 py-0.2 text-[7.5px] font-bold text-emerald-300">
                ÖZEL ODA
              </span>
              <span className="rounded bg-[#1DB954]/20 border border-[#1DB954]/40 px-1 py-0.2 text-[7.5px] font-bold text-[#1DB954]">
                128K HD
              </span>
            </div>
          </div>

          <div className="my-auto flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1.5 rounded bg-black/40 border border-white/5 px-1.5 py-1 text-[8px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="h-4 w-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[9px] shrink-0">🔊</span>
                <div className="min-w-0">
                  <span className="text-white font-semibold block truncate leading-tight">Özel Oda Oluştur</span>
                  <span className="text-zinc-400 text-[7px] block truncate leading-tight">Kişiye özel kanal &amp; panel</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[7px] text-emerald-300/90 font-mono bg-emerald-950/60 border border-emerald-500/30 px-1 rounded shrink-0">
                <span>🔒 Kilit</span>
                <span>👥 Limit</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-1.5 rounded bg-black/40 border border-white/5 px-1.5 py-1 text-[8px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="h-4 w-4 rounded bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center font-bold text-[9px] shrink-0">🎵</span>
                <div className="min-w-0">
                  <span className="text-white font-semibold block truncate leading-tight">/play &lt;şarkı|link&gt;</span>
                  <span className="text-zinc-400 text-[7px] block truncate leading-tight">Spotify entegreli 128 kbps</span>
                </div>
              </div>
              <div className="flex items-end gap-0.5 h-2.5 px-0.5 shrink-0">
                <span className="w-0.5 h-1.5 bg-[#1DB954] rounded-full animate-pulse" />
                <span className="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" />
                <span className="w-0.5 h-1 bg-[#1DB954] rounded-full animate-pulse" />
                <span className="w-0.5 h-2.5 bg-emerald-300 rounded-full animate-bounce" />
              </div>
            </div>
          </div>

          <div className="text-[7.5px] flex items-center justify-between text-[#8f8e9c]">
            <span className="text-emerald-400 font-mono">✓ Tıkla-Oluşsun Oda</span>
            <span className="text-[#1DB954] font-semibold font-mono">🟢 Spotify Ultra HD</span>
          </div>
        </div>
      );

    case 8: // 09 Yedek & Şablon
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
            <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-violet-300">
              <Layers3 className="h-3.5 w-3.5 text-violet-400" />
              <span>GÖKTÜRK YEDEK &amp; ŞABLON</span>
            </div>
            <span className="rounded bg-violet-500/20 border border-violet-500/40 px-1 py-0.2 text-[7.5px] font-bold text-violet-300">
              EMOJİLİ ŞABLON
            </span>
          </div>

          <div className="my-auto flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1.5 rounded bg-black/40 border border-white/5 px-1.5 py-1 text-[8px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="h-4 w-4 rounded bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-[9px] shrink-0">🛡️</span>
                <div className="min-w-0">
                  <span className="text-white font-semibold block truncate leading-tight">Anlık Tam Yedek</span>
                  <span className="text-zinc-400 text-[7px] block truncate leading-tight">Rol, kanal &amp; izinler</span>
                </div>
              </div>
              <span className="text-[7px] text-violet-300 font-mono bg-violet-950/60 border border-violet-500/30 px-1 rounded shrink-0">
                GL-BK-JSON
              </span>
            </div>

            <div className="flex items-center justify-between gap-1.5 rounded bg-black/40 border border-white/5 px-1.5 py-1 text-[8px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="h-4 w-4 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[9px] shrink-0">👑</span>
                <div className="min-w-0">
                  <span className="text-white font-semibold block truncate leading-tight">/sablon kur</span>
                  <span className="text-zinc-400 text-[7px] block truncate leading-tight">17 Kanal, 7 Rol (Onaylı)</span>
                </div>
              </div>
              <span className="text-[7px] text-cyan-300 font-mono bg-cyan-950/60 border border-cyan-500/30 px-1 rounded shrink-0">
                1. Sınıf Kurumsal
              </span>
            </div>
          </div>

          <div className="text-[7.5px] flex items-center justify-between text-[#8f8e9c]">
            <span className="text-violet-300 font-mono">✓ Güvenli Onay Butonları</span>
            <span className="text-emerald-400 font-semibold font-mono">✓ Sıfır Veri Kaybı</span>
          </div>
        </div>
      );

    case 9: // 10 Google Gemini AI
      return (
        <div className="relative z-10 flex flex-col justify-between h-full select-none">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
            <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>GÖKTÜRK GEMINI AI</span>
            </div>
            <span className="rounded bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 px-1.5 py-0.2 text-[7.5px] font-black tracking-wider animate-pulse">
              YAKINDA!
            </span>
          </div>

          <div className="my-auto flex flex-col gap-1 text-[8px]">
            <div className="rounded bg-black/40 border border-white/5 px-1.5 py-1 text-zinc-300 flex items-center gap-1.5">
              <span className="h-4 w-4 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[9px] shrink-0">👤</span>
              <span className="truncate"><strong className="text-white font-medium">@Üye:</strong> Göktürk botu sunucuma nasıl davet edilir?</span>
            </div>
            <div className="rounded bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-transparent border border-amber-500/30 px-1.5 py-1 text-amber-200 flex items-center gap-1.5 shadow-[0_0_10px_rgba(251,191,36,0.15)]">
              <span className="h-4 w-4 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[9px] shrink-0">🤖</span>
              <span className="truncate"><strong className="text-amber-300 font-semibold">Gemini AI:</strong> Panelden 1 tıkla özel şablonla bağlanır!</span>
            </div>
          </div>

          <div className="text-[7.5px] flex items-center justify-between text-[#8f8e9c]">
            <span className="text-amber-400 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" /> Doğal Dil &amp; Zeka
            </span>
            <span className="text-purple-300 font-bold font-mono">⚡ Gemini 2.5 Flash</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function DiscordMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.54 5.47A16.86 16.86 0 0 0 15.44 4l-.5 1.02a15.6 15.6 0 0 0-5.88 0L8.56 4a16.91 16.91 0 0 0-4.1 1.47C1.86 9.38 1.15 13.2 1.5 16.96A16.93 16.93 0 0 0 6.54 19l1.22-1.67a10.28 10.28 0 0 1-1.9-.92l.46-.35a11.98 11.98 0 0 0 11.36 0l.47.35a10.2 10.2 0 0 1-1.9.92L17.46 19a16.94 16.94 0 0 0 5.04-2.04c.4-4.36-.68-8.15-2.96-11.49ZM8.7 14.7c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Zm6.6 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Z" />
    </svg>
  );
}

export default function Home() {
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sipariş Onay & Kopyalama Durumları
  const [acceptedTerms, setAcceptedTerms] = useState<Record<string, boolean>>({});
  const [copiedPlan, setCopiedPlan] = useState<string | null>(null);

  // İletişim Formu State'leri
  const [contactName, setContactName] = useState("");
  const [contactDiscord, setContactDiscord] = useState("");
  const [contactTopic, setContactTopic] = useState("Paket Siparişi");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    document.title = "Göktürk Labs — Güçlü Discord Botları, Web Paneli ve Altyapı Çözümleri";
  }, []);

  const handlePlanOrder = (plan: PlanItem) => {
    if (!acceptedTerms[plan.id]) {
      toast.error("Lütfen sipariş öncesinde Hizmet Şartları ve Gizlilik bildirimini onaylayın.");
      return;
    }

    const orderMsg = plan.price === "₺0"
      ? `Merhaba, Göktürk Labs ${plan.name} ücretsiz başlangıç paketi için başvurmak istiyorum.`
      : `Merhaba, Göktürk Labs ${plan.name} (${plan.price}/${plan.period}) paketi için sipariş başlatmak istiyorum.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(orderMsg).then(() => {
        setCopiedPlan(plan.id);
        toast.success("Hazır sipariş mesajı panonuza kopyalandı! Discord DM'ye aktarılıyorsunuz.");
        setTimeout(() => setCopiedPlan(null), 3000);
      }).catch(() => {});
    }

    window.open(DISCORD_ORDER_URL, "_blank", "noopener,noreferrer");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactDiscord.trim() || !contactMessage.trim()) {
      toast.error("Lütfen formdaki tüm zorunlu alanları doldurun.");
      return;
    }

    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      toast.success("Mesajınız hazırlandı! Discord üzerinden anında bağlanabilirsiniz.");
    }, 600);
  };

  const handleCopyContactMessage = () => {
    const formatted = `[Göktürk Labs İletişim]\nAd: ${contactName}\nDiscord: ${contactDiscord}\nKonu: ${contactTopic}\nMesaj: ${contactMessage}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formatted).then(() => {
        toast.success("İletişim mesajınız panoya kopyalandı! Discord DM kutumuza yapıştırabilirsiniz.");
      });
    }
    window.open(DISCORD_ORDER_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#08080b] text-[#f7f7fb] selection:bg-purple-600/30 selection:text-purple-200">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#08080b]/85 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg py-1">
            <img src={LOGO_URL} alt="Göktürk Labs Logo" className="h-9 w-9 object-contain" />
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Göktürk <span className="text-purple-400">Labs</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase -mt-0.5">Yazılım Stüdyosu</span>
            </div>
          </a>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-300 lg:flex" aria-label="Ana Gezinti">
            <a href="#moduller" className="hover:text-white transition-colors text-purple-300 font-semibold flex items-center gap-1.5">
              <span>Modüller &amp; Sistemler</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded border border-purple-500/30">10</span>
            </a>
            <a href="#nasil" className="hover:text-white transition-colors">Nasıl Çalışır?</a>
            <a href="#paketler" className="hover:text-white transition-colors">Paketler</a>
            <a href="#hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a>
            <a href="#sss" className="hover:text-white transition-colors">SSS</a>
            <a href="#iletisim" className="hover:text-white transition-colors">İletişim</a>
          </nav>

          {/* Masaüstü Butonlar */}
          <div className="hidden items-center gap-3 sm:flex">
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Canlı VDS Aktif</span>
            </div>
            <a 
              href={COMMUNITY_URL} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-200 transition-all hover:bg-white/[0.08] hover:text-white"
            >
              <DiscordMark className="h-4 w-4 text-[#5865F2]" />
              <span>Topluluk</span>
            </a>
            <a 
              href="#paketler"
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-600/20 transition-all hover:bg-purple-500 active:scale-95"
            >
              <span>Paket Seç</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button 
                  type="button" 
                  aria-label="Menüyü aç" 
                  className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm bg-[#0c0c12] border-white/10 p-6 flex flex-col justify-between">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <img src={LOGO_URL} alt="Logo" className="h-8 w-8 object-contain" />
                    <span className="font-display text-base font-bold text-white">Göktürk <span className="text-purple-400">Labs</span></span>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-8 flex flex-col gap-4 text-base font-medium text-zinc-300">
                  <a href="#moduller" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1 text-purple-300 font-semibold flex items-center justify-between">
                    <span>Modüller (10 Özel Sistem)</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">10</span>
                  </a>
                  <a href="#nasil" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1">Nasıl Çalışır?</a>
                  <a href="#paketler" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1">Paketler &amp; Fiyatlar</a>
                  <a href="#hakkimizda" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1">Hakkımızda</a>
                  <a href="#sss" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1">Sık Sorulan Sorular</a>
                  <a href="#iletisim" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1">İletişim</a>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs font-mono text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>7/24 Kesintisiz VDS Çevrimiçi</span>
                  </div>
                  <a 
                    href={COMMUNITY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-2.5 text-sm font-semibold text-white"
                  >
                    <DiscordMark className="h-4 w-4 text-[#5865F2]" />
                    <span>Discord Topluluğuna Katıl</span>
                  </a>
                  <a 
                    href="#paketler"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/25"
                  >
                    <span>Hemen Paket Seç</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="top">
        
        {/* 2. HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-white/[0.06]">
          {/* Performans Dostu Three.js 3D Sahnesi (Zero-Lag, Capped Pixel Ratio) */}
          <StudioHero3D />

          {/* Arka Plan Yumuşak Işıklar */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[800px] rounded-full bg-purple-600/10 blur-[130px]" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-1/2 h-[350px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" aria-hidden="true" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              
              {/* Kicker Rozeti */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono text-purple-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                <span>GÖKTÜRK LABS · BAĞIMSIZ DİSCORD MİMARİSİ</span>
              </div>

              {/* H1 Başlık */}
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
                Sunucunuz İçin Güçlü <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent">Discord Botları</span> ve Yönetim Paneli
              </h1>

              {/* Alt Metin */}
              <p className="mt-6 text-base text-zinc-300 sm:text-lg leading-relaxed">
                7/24 kesintisiz VDS barındırma, PBKDF2 şifreli web kontrol paneli, yetkili mülakat motoru ve kurumsal koruma modülleriyle Discord topluluğunuzu tek merkezden profesyonelce yönetin.
              </p>

              {/* Aksiyon Butonları */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a 
                  href="#paketler"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-600/25 transition-all hover:bg-purple-500 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Paketleri ve Fiyatları Gör</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#moduller"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:bg-white/[0.08] hover:text-white"
                >
                  <Boxes className="h-4 w-4 text-purple-400" />
                  <span>Sistem ve Modülleri İncele</span>
                </a>
              </div>

              {/* Hızlı Güven Sinyalleri */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-purple-400" /> Şişirilmiş / Sahte Veri Yok</span>
                <span className="flex items-center gap-1.5"><Server className="h-4 w-4 text-emerald-400" /> 7/24 VDS Kesintisiz Çalışma</span>
                <span className="flex items-center gap-1.5"><Headphones className="h-4 w-4 text-cyan-400" /> Doğrudan Geliştirici Desteği</span>
              </div>
            </div>

            {/* Canlı Sistem & Mimari Konsolu */}
            <div className="mt-12 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#0e0e14] p-5 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-semibold">GÖKTÜRK LABS TELEMETRİ KONSOLU</span>
                  <span className="text-zinc-500 hidden sm:inline">|</span>
                  <span className="text-zinc-400 hidden sm:inline">Debian 12 x86_64</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/5 text-purple-300">discord.js v14.27</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/5 text-cyan-300">Ping: 18ms</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Çalışma Modu</span>
                  <strong className="text-white font-medium mt-0.5 block flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-purple-400" /> PM2 Cluster 7/24
                  </strong>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Yönetim Paneli</span>
                  <strong className="text-emerald-400 font-medium mt-0.5 block flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-emerald-400" /> PBKDF2 + HIBP
                  </strong>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Mülakat Motoru</span>
                  <strong className="text-cyan-300 font-medium mt-0.5 block flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-cyan-400" /> Sesli / Yazılı Oda
                  </strong>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/30 p-3">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Güvenlik Kalkanı</span>
                  <strong className="text-amber-300 font-medium mt-0.5 block flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Native AutoMod
                  </strong>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. GELİŞMİŞ MODÜLLER & SİSTEMLER VİTRİNİ (10 ÇEŞİT MODÜL) */}
        <section id="moduller" className="extra-systems-section border-b border-white/[0.06] bg-[#09090d] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                  <Boxes className="h-4 w-4" /> BOT SİSTEMLERİ &amp; EKLENTİLER
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Sunucunuzu Güçlendiren 10 Özel Modül
                </h2>
              </div>
              <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
                İster topluluk, ister oyun, ister kurumsal sunucu... İstediğiniz modülleri paketinize dahil edin, botunuz tam donanımlı çalışsın.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {extraSystems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.title}
                    className={`extra-system-card ${item.cover} rounded-2xl border border-white/10 bg-[#101016] p-4 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 group`}
                  >
                    <div>
                      {/* Canlı Görsel Mockup Önizleme */}
                      <div className="extra-system-cover rounded-xl overflow-hidden h-28 p-3 mb-4 bg-[#14141e] border border-white/5">
                        <ModuleCover index={idx} />
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2">
                        <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                          MODÜL 0{idx + 1}
                        </span>
                        {item.badge ? (
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/40 text-[10px] text-purple-200 font-bold">
                            {item.badge}
                          </span>
                        ) : (
                          <span className="text-[10px] text-zinc-500 uppercase">GÖKTÜRK LABS</span>
                        )}
                      </div>

                      <h3 className="font-display text-base font-bold text-white group-hover:text-purple-300 transition-colors mt-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-mono text-[11px]">✓ Hazır Entegre</span>
                      <a 
                        href="#paketler"
                        className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>Paketle Edin</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Özel Modül Çağrısı */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-950/30 via-[#101017] to-indigo-950/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <strong className="text-white font-display text-base block">İhtiyacınız olan özel bir modül mü var?</strong>
                <span className="text-xs text-zinc-400 block">Discord DM üzerinden anlatın; sunucunuza özel yeni slash komutları ve sistemleri sıfırdan kodlayalım.</span>
              </div>
              <a 
                href={DISCORD_ORDER_URL}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-5 py-3 shadow-lg shadow-purple-600/20 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Özel Modül İste</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </section>

        {/* 4. NASIL ÇALIŞIR? (SÜREÇ) */}
        <section id="nasil" className="py-20 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">İŞLEYİŞ SÜRECİ</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Adım Adım Nasıl Çalışıyoruz?
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Karmaşık başvuru süreçleri veya bürokrasi yok. Doğrudan geliştiriciyle iletişimdesiniz.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-6 space-y-4 hover:border-purple-500/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm font-mono">
                  01
                </div>
                <h3 className="font-display text-lg font-bold text-white">İhtiyaç ve Paket Seçimi</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sunucunuzun üye sayısını, hedeflerini ve ihtiyacınız olan özellikleri konuşuruz. Bütçenize en uygun paketi birlikte netleştiririz.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-6 space-y-4 hover:border-purple-500/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm font-mono">
                  02
                </div>
                <h3 className="font-display text-lg font-bold text-white">Hızlı Kurulum &amp; Markalaşma</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Botu Göktürk Labs VDS sunucusunda ayağa kaldırır; sunucunuzun adı, logosu ve rollerine tam uyumlu şekilde yapılandırırız.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-6 space-y-4 hover:border-purple-500/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm font-mono">
                  03
                </div>
                <h3 className="font-display text-lg font-bold text-white">Teslim &amp; 7/24 Kesintisiz Destek</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Web panel şifrenizi teslim ederiz. İlerleyen süreçte modül ekleme, güncelleme ve bakım konularında Discord üzerinden 7/24 yanınızdayız.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PAKETLER & FİYATLANDIRMA */}
        <section id="paketler" className="py-20 border-b border-white/[0.06] bg-[#09090d]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">ŞEFFAF FİYATLANDIRMA</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Sunucunuza Uygun Çalışma Seviyesini Seçin
              </h2>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Tüm paketlerimiz 7/24 VDS barındırma dahil sunulur; sunucu faturası veya teknik bakım derdiniz olmaz.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((p) => {
                const isVip = p.badgeType === "vip";
                const isPopular = p.badgeType === "popular";
                const isFree = p.badgeType === "free";

                return (
                  <div 
                    key={p.id}
                    className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 relative ${
                      isVip
                        ? "border-amber-500/40 bg-gradient-to-b from-amber-500/[0.08] to-[#121218] shadow-xl shadow-amber-500/10"
                        : isPopular
                        ? "border-purple-500/50 bg-gradient-to-b from-purple-500/[0.08] to-[#121218] shadow-xl shadow-purple-500/10"
                        : "border-white/10 bg-[#0e0e14] hover:border-white/20"
                    }`}
                  >
                    <div>
                      {/* Rozet */}
                      {p.badge && (
                        <div className="mb-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 ${
                            isVip
                              ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                              : isPopular
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }`}>
                            {isVip && <Crown className="h-3 w-3" />}
                            {isPopular && <Flame className="h-3 w-3" />}
                            <span>{p.badge}</span>
                          </span>
                        </div>
                      )}

                      <h3 className="font-display text-lg font-bold text-white">{p.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 min-h-[36px]">{p.description}</p>

                      <div className="mt-4 flex items-baseline gap-1.5 pb-4 border-b border-white/[0.06]">
                        <span className="font-display text-3xl font-extrabold text-white">{p.price}</span>
                        <span className="text-xs text-zinc-400 font-mono">/ {p.period}</span>
                      </div>

                      <div className="mt-4 space-y-2.5 text-xs text-zinc-300">
                        {p.features.map((f, fi) => (
                          <div key={fi} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{f}</span>
                          </div>
                        ))}
                      </div>

                      {p.notice && (
                        <div className="mt-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-snug">
                          {p.notice}
                        </div>
                      )}
                    </div>

                    {/* Sipariş & Yasal Onay Kutusu */}
                    <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-3">
                      <div className="space-y-1.5 text-[11px] text-zinc-400">
                        <label className="flex items-start gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={!!acceptedTerms[p.id]} 
                            onChange={(e) => setAcceptedTerms({ ...acceptedTerms, [p.id]: e.target.checked })}
                            className="mt-0.5 rounded bg-zinc-900 border-white/20 text-purple-600 focus:ring-0 h-3.5 w-3.5"
                          />
                          <span>
                            <a href="/hizmet-sartlari" target="_blank" className="underline text-purple-300 hover:text-white">Hizmet Şartları</a> ve <a href="/gizlilik-politikasi" target="_blank" className="underline text-purple-300 hover:text-white">Gizlilik Politikası</a>'nı okudum.
                          </span>
                        </label>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePlanOrder(p)}
                        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all active:scale-95 ${
                          isVip
                            ? "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20"
                            : isPopular
                            ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20"
                            : "bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200"
                        }`}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Discord'dan Sipariş Ver</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                      </button>

                      {copiedPlan === p.id && (
                        <p className="text-[10px] text-emerald-400 font-mono text-center flex items-center justify-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Hazır sipariş metni kopyalandı!
                        </p>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-center text-xs text-zinc-400">
              💡 Ödemeler ve özel kapsam Discord DM üzerinden geliştiriciyle birlikte netleştirilir. Web sitemiz üzerinden kredi kartı veya ödeme bilgisi toplanmaz.
            </p>
          </div>
        </section>

        {/* 6. HAKKIMIZDA BÖLÜMÜ */}
        <section id="hakkimizda" className="py-20 border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">HAKKIMIZDA</span>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Şeffaf, Bağımsız ve Topluluk Odaklı Yazılım Geliştirme
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Göktürk Labs; geliştirici <strong className="text-purple-300">semihr66</strong> tarafından temelleri atılan, Discord sunucularına profesyonel yazılım, yönetim ve telemetri altyapısı sunan bağımsız bir girişimdir.
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Piyasadaki şişirilmiş fiyatlar, karmaşık yabancı arayüzler ve veri gizliliğini ihlal eden bot sistemlerine karşı; Türk Discord topluluklarına hızlı, güvenilir ve 7/24 kesintisiz çalışan yerli bir alternatif inşa ediyoruz.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                    <span className="text-purple-400 font-bold block text-sm">Açık İletişim</span>
                    <span className="text-zinc-400 mt-1 block">Yapay zeka robotları yerine doğrudan geliştirici ile 1-1 muhatapsınız.</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                    <span className="text-emerald-400 font-bold block text-sm">Sıfır Telemetri Satışı</span>
                    <span className="text-zinc-400 mt-1 block">Sunucunuzun özel verileri veya mesajları asla satılmaz ya da paylaşılmaz.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#0e0e14] p-6 sm:p-8 space-y-6">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-purple-400" />
                  <span>Kullandığımız Teknoloji Mimarisi</span>
                </h3>

                <div className="space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-semibold text-white">Bot Çekirdeği:</span>
                    <span className="font-mono text-purple-300">discord.js v14 + TypeScript</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-semibold text-white">İşletim &amp; Sunucu:</span>
                    <span className="font-mono text-emerald-300">Debian 12 Bookworm VDS</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-semibold text-white">Süreç Yöneticisi:</span>
                    <span className="font-mono text-cyan-300">PM2 Enterprise Cluster</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-semibold text-white">Web Güvenliği:</span>
                    <span className="font-mono text-amber-300">PBKDF2 256-Bit + HIBP API</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="font-semibold text-white">Frontend Web:</span>
                    <span className="font-mono text-purple-300">React + Vite + Tailwind CSS</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-xs">
                  <span className="text-zinc-400">Resmi Kaynak Deposu:</span>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-mono">
                    <span>semihr66/Gokturk-Labs</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. İLETİŞİM BÖLÜMÜ (CANLI VE ÇALIŞAN FORM) */}
        <section id="iletisim" className="py-20 border-b border-white/[0.06] bg-[#09090d]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">İLETİŞİM &amp; TALEP</span>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Doğrudan İletişime Geçin
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  İster paket siparişi, ister sunucunuza özel bot projesi, ister teknik bir soru... Bize formu doldurarak veya doğrudan Discord DM üzerinden ulaşabilirsiniz.
                </p>

                <div className="space-y-3 pt-3">
                  <a 
                    href={DISCORD_ORDER_URL} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-[#0e0e14] hover:border-purple-500/50 hover:bg-[#12121a] transition-all group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] flex items-center justify-center">
                      <DiscordMark className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="text-xs font-semibold text-white block group-hover:text-purple-300 transition-colors">Doğrudan Discord DM</strong>
                      <span className="text-[11px] text-zinc-400 font-mono">semih1231 (937079326149595147)</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 ml-auto text-zinc-500 group-hover:text-white transition-colors" />
                  </a>

                  <a 
                    href={COMMUNITY_URL} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-[#0e0e14] hover:border-purple-500/50 hover:bg-[#12121a] transition-all group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="text-xs font-semibold text-white block group-hover:text-purple-300 transition-colors">Göktürk Labs Topluluk Sunucusu</strong>
                      <span className="text-[11px] text-zinc-400 font-mono">discord.gg/CFrwUThhE</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 ml-auto text-zinc-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>

              {/* İnteraktif İletişim Formu */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0e0e14] p-6 sm:p-8">
                {contactSuccess ? (
                  <div className="space-y-4 text-center py-8">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">Talebiniz Hazırlandı!</h3>
                    <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Bilgileriniz başarıyla derlendi. Geliştiriciye hemen iletmek için mesajınızı kopyalayabilir veya doğrudan Discord DM penceresini açabilirsiniz.
                    </p>
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopyContactMessage}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-600/20"
                      >
                        <Copy className="h-4 w-4" />
                        <span>Kopyala &amp; Discord DM'de Aç</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSuccess(false);
                          setContactName("");
                          setContactDiscord("");
                          setContactMessage("");
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white"
                      >
                        <span>Yeni Form Doldur</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block font-medium text-zinc-300 mb-1.5">
                          Adınız / Takma Adınız <span className="text-purple-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Örn: Ahmet veya Rex"
                          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 font-sans"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-discord" className="block font-medium text-zinc-300 mb-1.5">
                          Discord Kullanıcı Adınız <span className="text-purple-400">*</span>
                        </label>
                        <input
                          id="contact-discord"
                          type="text"
                          required
                          value={contactDiscord}
                          onChange={(e) => setContactDiscord(e.target.value)}
                          placeholder="Örn: ahmet123 veya ahmet#0001"
                          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-topic" className="block font-medium text-zinc-300 mb-1.5">
                        İletişim / Talep Konusu
                      </label>
                      <select
                        id="contact-topic"
                        value={contactTopic}
                        onChange={(e) => setContactTopic(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500 font-sans"
                      >
                        <option value="Paket Siparişi">Paket Siparişi (Dengeli / Gelişmiş / Pro)</option>
                        <option value="Ücretsiz Başlangıç Paketi">Ücretsiz Başlangıç Paketi Talebi</option>
                        <option value="Özel Bot Geliştirme">Sunucuma Özel Bot Geliştirme</option>
                        <option value="Teknik Destek">Teknik Destek &amp; Soru</option>
                        <option value="Öneri / Geri Bildirim">Öneri veya Geri Bildirim</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block font-medium text-zinc-300 mb-1.5">
                        Mesajınız &amp; İstekleriniz <span className="text-purple-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Botunuzdan beklentileriniz, sunucunuzun içeriği veya aklınıza takılan sorular..."
                        className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 leading-relaxed font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 transition-all active:scale-95 shadow-lg shadow-purple-600/20 disabled:opacity-50"
                    >
                      {contactSubmitting ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Mesajınız Hazırlanıyor...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Talebi Oluştur &amp; İletişime Geç</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 8. SSS (SIKÇA SORULAN SORULAR) */}
        <section id="sss" className="py-20 border-b border-white/[0.06]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">SSS</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Aklınıza Takılan Sorular
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Merak ettiğiniz temel konuları sizin için derledik. Farklı bir sorunuz varsa doğrudan Discord'dan yanıtlamaktan memnuniyet duyarız.
              </p>
            </div>

            <div className="mt-12">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`faq-${i}`}
                    className="rounded-xl border border-white/10 bg-[#0d0d12] px-4 py-1"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-sm text-white hover:text-purple-300 hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-zinc-400 leading-relaxed pt-1 pb-3">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </main>

      {/* 9. REUSABLE STUDIO FOOTER */}
      <Footer />

    </div>
  );
}
