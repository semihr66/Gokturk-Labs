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
  Music,
  FileText,
  Coins,
  Calendar,
  BarChart3,
  UserCheck,
  Eye,
  Image as ImageIcon
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
    description: "Yeni açılan veya küçük topluluklar için masrafsız başlangıç. Bot bizden, sunucu sizden.",
    performance: "Standart VDS",
    score: 1,
    features: [
      "Temel genel komutlar ve karşılama mesajları",
      "Hazır altyapı modülleriyle hızlı entegrasyon",
      "3 + 1 modül hakkı (Seçtiğiniz 4 modül)",
      "7/24 Göktürk Labs VDS barındırma dahil",
      "İzole kod mimarisi (Kesintisiz uptime)",
      "İsim/logo/kapak özelleştirmesi kapalıdır",
      "Zorunlu: Sunucu açıklamasında '— By Göktürk Labs' ibaresi"
    ],
    notice: "Topluluk paketinde sunucunuzda Göktürk Labs hakkında destekleyici bir tanıtım mesajı yer almalıdır."
  },
  {
    id: "dengeli",
    name: "Dengeli",
    price: "₺50",
    period: "aylık",
    badge: "⚡ En İyi Fiyat / Performans",
    badgeType: "fp",
    label: "DENGELİ · SINIRSIZ MODÜL",
    description: "Orta büyüklükteki sunucular için tam teşekküllü moderasyon, resimli log ve sınırsız modül esnekliği.",
    performance: "Yüksek Hızlı PM2",
    score: 2,
    features: [
      "Başlangıç paketindeki tüm temel özellikler",
      "16 modül arasından sınırsız kullanım hakkı",
      "Gelişmiş moderasyon ve silinen resim/dosya logu",
      "7/24 Kesintisiz VDS barındırma dahil",
      "Bot ismi, logosu ve Discord profili tamamen size özel",
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
    description: "Kendi özel bilet destek sistemini kurmak, açık kaynak koda erişmek ve tam yetkiyle yönetmek isteyenler için.",
    performance: "Öncelikli VDS Kaynağı",
    score: 3,
    features: [
      "Dengeli paketindeki tüm özellikler",
      "Sınırsız modül hakkı ve öncelikli işlem gücü",
      "Butonlu, HTML dökümlü bilet (ticket) destek motoru",
      "Custom Bot Opsiyonu: TypeScript kaynak kod teslimi",
      "Kendi VDS'inizde veya bizim sunucumuzda çalıştırma",
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
    description: "Web yönetim paneli, otomatik yetkili mülakat masası, HIBP sızıntı kalkanı ve doğrudan Discord VIP destek.",
    performance: "Dedicated Tahsis",
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
    a: "Botunuz Debian 12 kurulu VDS sunucumuzda PM2 süreci altında sürekli çalışır. Bilgisayarınızı açık bırakmanıza, elektrik veya sunucu faturası ödemenize gerek kalmaz."
  },
  {
    q: "Sipariş ve kurulum ne kadar sürer?",
    a: "Discord DM'den bana ulaştığınızda sunucunuzun ihtiyaçlarını konuşuruz. Hazır modüller ortalama 1-2 saat içinde sunucunuza eklenip teslim edilir."
  },
  {
    q: "Botun kodlarını teslim alabilir miyim?",
    a: "Gelişmiş ve Pro paketlerde botun TypeScript kaynak kodlarını temiz şekilde GitHub reposu veya ZIP olarak teslim alabilirsiniz."
  },
  {
    q: "Web Yönetim Paneli neleri kapsıyor?",
    a: "Pro paketteki panel tarayıcı üzerinden açılır; PBKDF2 şifreleme ve sızıntı kontrolü içerir. Mülakat masasını, AutoMod kurallarını ve bilet kanallarını canlı yönetirsiniz."
  },
  {
    q: "Kişisel verilerim veya sunucu bilgileri güvende mi?",
    a: "Kesinlikle evet. Mesaj içerikleri satılmaz, üçüncü taraflarla paylaşılmaz. Loglar yalnızca belirlediğiniz Discord log kanalına iletilir."
  },
  {
    q: "Ödemeyi nasıl yapabilirim?",
    a: "Sipariş onayından sonra güvenli Türk ödeme aracıları (Shopier vb.) veya IBAN/Havale ile ödeme yapabilirsiniz. Web sitemizde kart bilgisi istenmez."
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
  id: string;
  category: string;
  title: string;
  detail: string;
  command: string;
  specs: string[];
  icon: any;
  emoji: string;
  coverGradient: string;
  coverImage?: string;
  badge?: string;
  statusText: string;
}> = [
  { 
    id: "welcome",
    category: "ONBOARDING",
    title: "Karşılama & Uğurlama", 
    detail: "Dinamik görsel kartlar ve özelleştirilebilir hoş geldin mesajı otomasyonu. Üye katıldığında anında rol atar.",
    command: "/welcome set [kanal] [afis_modu]",
    specs: ["Canvas 2D Avatar Render", "Otomatik Karşılama Rolü", "DM veya Kanal Seçimi"],
    icon: MessageCircle,
    emoji: "🖼️",
    coverGradient: "from-purple-600 via-indigo-500 to-pink-500",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    statusText: "Aktif Entegrasyon"
  },
  { 
    id: "level",
    category: "ENGAGEMENT",
    title: "Seviye & XP Sistemi", 
    detail: "Aktiviteye dayalı seviye atlama, kişiselleştirilebilir rank kartı ve liderlik tablosu.",
    command: "/rank [kullanici] | /top10",
    specs: ["Ses & Metin Çift XP Havuzu", "Özel SVG/PNG Rank Kartı", "Kademeli Rol Ödülleri"],
    icon: Zap,
    emoji: "📊",
    coverGradient: "from-cyan-600 via-blue-600 to-indigo-900",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    statusText: "Canlı Hesaplama"
  },
  { 
    id: "invite",
    category: "TELEMETRY",
    title: "Davet Takip Sistemi", 
    detail: "Gelişmiş davet analitiği, sahte üye filtresi ve otomatik sayaç sistemi. Ayrılanları ve gelenleri kaydeder.",
    command: "/invites [kullanici] | /vanity stats",
    specs: ["Sahte Hesap (Fake) Algılama", "Bonus / Eksilen Davet Kaydı", "Canlı Log Kanalı"],
    icon: ArrowUpRight,
    emoji: "📩",
    coverGradient: "from-emerald-700 via-teal-800 to-zinc-900",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    statusText: "Gerçek Zamanlı"
  },
  { 
    id: "giveaway",
    category: "EVENTS",
    title: "Çekiliş Sistemi", 
    detail: "Zaman ayarlı, kriter destekli ve otomatize edilmiş çekiliş motoru. Rol şartı ve yedek talihli seçer.",
    command: "/cekilis baslat [sure] [odul] [kazanan]",
    specs: ["Kriptografik RNG Seçim", "Rol & Katılım Şartı Filtresi", "Yedek Kazanan (Reroll)"],
    icon: Sparkles,
    emoji: "🎉",
    coverGradient: "from-blue-600 via-cyan-500 to-teal-400",
    coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    statusText: "Otomasyon"
  },
  { 
    id: "entertainment",
    category: "COMMUNITY",
    title: "Eğlence Modülleri", 
    detail: "Topluluk etkileşimini artıran interaktif komut setleri, mini oyunlar ve kullanıcı eğlence araçları.",
    command: "/eglence zar-at | /eglence duello",
    specs: ["İnteraktif Oyun Menüsü", "Şans ve Zar Komutları", "Özelleştirilebilir Yanıtlar"],
    icon: Coins,
    emoji: "🎲",
    coverGradient: "from-fuchsia-600 via-purple-700 to-zinc-900",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
    statusText: "Aktif Modül"
  },
  { 
    id: "ai",
    category: "INTELLIGENCE",
    title: "Gemini AI Entegrasyonu", 
    detail: "Üyelerin sorularına yanıt veren akıllı yapay zeka asistanı. Sunucu kurallarını öğrenip 7/24 rehberlik eder.",
    command: "/ai sor [soru] | /ai rehber",
    specs: ["Google Gemini 2.5 Flash", "Sunucu Dokümantasyonu Hafızası", "Doğal Türkçe Yanıtlama"],
    icon: Bot, 
    emoji: "🤖",
    coverGradient: "from-indigo-600 via-purple-600 to-pink-500",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    badge: "YAKINDA!",
    statusText: "Geliştirme Aşamasında"
  },
  { 
    id: "ticket",
    category: "SUPPORT",
    title: "Destek & Talep (Ticket)", 
    detail: "Buton tabanlı özel destek kanalları ve log transkript altyapısı. Departmanlara göre ayrılmış hızlı bilet masası.",
    command: "/ticket panel kur [kategori]",
    specs: ["Çoklu Departman Seçimi", "Şifreli HTML Transkript", "Kilit ve Arşiv Akışı"],
    icon: Headphones, 
    emoji: "🎫",
    coverGradient: "from-zinc-700 via-zinc-800 to-black",
    coverImage: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80",
    badge: "BUTONLU TICKET",
    statusText: "Kurumsal Altyapı"
  },
  { 
    id: "autorole",
    category: "AUTOMATION",
    title: "Otomatik Rol Yönetimi", 
    detail: "Yeni katılan üye ve botlara anlık yetki ve rol tanımlaması. Menülü veya butonlu rol dağıtımı.",
    command: "/rolmenu olustur [mesaj_id]",
    specs: ["0.1s Gecikmesiz Atama", "Seçimli Buton Menüleri", "Bot & Üye Ayrımı"],
    icon: Settings2,
    emoji: "🎴",
    coverGradient: "from-blue-700 via-indigo-900 to-zinc-950",
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    statusText: "Yüksek Hızlı"
  },
  { 
    id: "defense",
    category: "SECURITY",
    title: "Güvenlik & Moderasyon", 
    detail: "Spam, reklam, küfür ve zararlı linklere karşı 7/24 aktif koruma filtresi. Anti-raid ve karantina kalkanı.",
    command: "/defense mod [katı|orta] | /karantina",
    specs: ["Discord AutoMod v2 Entegre", "Anti-Raid & Karantina Kalkanı", "Sağ Tık / Yetki İhlal Alarmı"],
    icon: ShieldCheck,
    emoji: "🛡️",
    coverGradient: "from-sky-700 via-slate-800 to-black",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    badge: "GÖKTÜRK DEFENSE",
    statusText: "Tam Kalkan"
  },
  { 
    id: "games",
    category: "INTERACTION",
    title: "İnteraktif Oyun Sistemleri", 
    detail: "Kelime türetme, sayı tahmini ve oyun kanalı modülleri. Sunucu içi rekabeti canlı tutan puan tablosu.",
    command: "/oyun kelime-turet | /oyun sayi-tahmin",
    specs: ["Kelime Zinciri & Sözlük", "Sayı Tahmin Motoru", "Günlük & Haftalık Skor"],
    icon: Bot,
    emoji: "🎮",
    coverGradient: "from-purple-800 via-violet-900 to-black",
    coverImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
    statusText: "Topluluk Oyunları"
  },
  { 
    id: "backup",
    category: "MANAGEMENT",
    title: "Otomatik Sunucu Mimarisi", 
    detail: "Tek komutla profesyonel kanal, kategori ve rol yapısı şablonlaması. Emojili ve izinleri hazır kurulum.",
    command: "/backup al | /sablon kur [kod]",
    specs: ["JSON Şifreli Tam Yedek", "17 Kanal Kurumsal Şablon", "Sıfır İzin Kaybı Güvencesi"],
    icon: Layers3, 
    emoji: "🛠️",
    coverGradient: "from-amber-700 via-orange-900 to-zinc-950",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    badge: "1. SINIF ŞABLON",
    statusText: "Korumalı Veri"
  },
  {
    id: "audit-log",
    category: "AUDIT & SECURITY",
    title: "Görsel Denetim & Resimli Audit Log",
    detail: "Silinen ve düzenlenen mesajları kaydeder. Silinen resim, gif ve dosya eklerini görsel olarak log kanalına iletir.",
    command: "/log kanal-ayarla [kanal] | /log filtre",
    specs: ["Silinen Görsel & GIF Kaydı", "Düzenlenen Mesaj Karşılaştırma", "Ses & Rol Hareket Günlüğü"],
    icon: Eye,
    emoji: "📸",
    coverGradient: "from-rose-800 via-red-950 to-black",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    badge: "GÖRSEL LOG DESTEĞİ",
    statusText: "7/24 Canlı Kayıt"
  },
  {
    id: "recruitment",
    category: "RECRUITMENT",
    title: "Yetkili Başvuru & Mülakat Motoru",
    detail: "Aday formlarını modal arayüzle toplar; onaylandığında otomatik özel sesli/yazılı mülakat odası açar.",
    command: "/basvuru panel-kur | /mulakat baslat",
    specs: ["Modal Başvuru Formu", "Geçici Özel Mülakat Odası", "Tek Tıkla Kabul / Ret"],
    icon: UserCheck,
    emoji: "👤",
    coverGradient: "from-indigo-800 via-violet-950 to-black",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    badge: "MÜLAKAT MASASI",
    statusText: "Otomatik Akış"
  },
  {
    id: "web-panel",
    category: "MANAGEMENT",
    title: "Şifreli Web Yönetim Paneli",
    detail: "Tarayıcı üzerinden Discord sunucunuzun tüm bot ayarlarını, loglarını ve rollerini güvenle yönetin.",
    command: "/panel giris-linki | /panel yetki",
    specs: ["PBKDF2 256-Bit Kriptolama", "HIBP Şifre Sızıntı Kalkanı", "Mobil Uyumlu Canlı Kontrol"],
    icon: Lock,
    emoji: "🔒",
    coverGradient: "from-purple-900 via-zinc-900 to-black",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    badge: "PRO WEB PANEL",
    statusText: "Tam Şifreli"
  },
  {
    id: "stats-voice",
    category: "ANALYTICS",
    title: "Canlı Sunucu İstatistik Sayaçları",
    detail: "Toplam üye, çevrimiçi kullanıcılar, seste olanlar ve sunucu boost seviyesini güncelleyen kilitli ses sayaçları.",
    command: "/sayac kur [stil] | /sayac guncelle",
    specs: ["Kilitli Ses Kanal Sayaçları", "5 Farklı İstatistik Modu", "10 Dk Otomatik Senkron"],
    icon: BarChart3,
    emoji: "📈",
    coverGradient: "from-cyan-800 via-sky-950 to-black",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    statusText: "Sürekli Canlı"
  },
  {
    id: "voice",
    category: "AUDIO",
    title: "Özel Ses Odaları & HD Müzik", 
    detail: "Odaya girince otomatik kilitli özel oda kurma ve Spotify/YouTube destekli 128 kbps kristal netliğinde ses iletimi.",
    command: "/ses oda-kilitle | /play [parca]",
    specs: ["Tıkla-Oluşsun Dinamik Oda", "Kullanıcı Panel Arayüzü", "128 kbps Ultra HD Müzik"],
    icon: Music, 
    emoji: "🎵",
    coverGradient: "from-pink-700 via-purple-900 to-zinc-950",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    badge: "128K ULTRA HD",
    statusText: "Düşük Gecikme"
  }
];



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

  const getOrderMessage = (plan: PlanItem) => {
    return plan.price === "₺0"
      ? `Merhaba, Göktürk Labs ${plan.name} ücretsiz başlangıç paketi için başvurmak istiyorum.`
      : `Merhaba, Göktürk Labs ${plan.name} (${plan.price}/${plan.period}) paketi için sipariş başlatmak istiyorum.`;
  };

  const handleCopyPlanText = (plan: PlanItem) => {
    if (!acceptedTerms[plan.id]) {
      toast.error("Lütfen önce Hizmet Şartları ve Gizlilik bildirimini onaylayın.");
      return;
    }
    const orderMsg = getOrderMessage(plan);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(orderMsg).then(() => {
        setCopiedPlan(plan.id);
        toast.success(`"${plan.name}" sipariş metni panonuza kopyalandı!`);
        setTimeout(() => setCopiedPlan(null), 3500);
      }).catch(() => {
        toast.error("Panoya kopyalama başarısız oldu.");
      });
    }
  };

  const handleOpenDiscordDM = (plan: PlanItem) => {
    if (!acceptedTerms[plan.id]) {
      toast.error("Lütfen önce Hizmet Şartları ve Gizlilik bildirimini onaylayın.");
      return;
    }
    // Also copy to clipboard seamlessly so it's ready in clipboard when DM opens
    const orderMsg = getOrderMessage(plan);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(orderMsg).then(() => {
        setCopiedPlan(plan.id);
        setTimeout(() => setCopiedPlan(null), 3500);
      }).catch(() => {});
    }
    toast.success("Sipariş metni kopyalandı ve Discord DM açılıyor!");
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
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded border border-purple-500/30">16</span>
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
                    <span>Modüller (16 Özel Sistem)</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">16</span>
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
                <span>GÖKTÜRK LABS · BAĞIMSIZ GELİŞTİRİCİ ATÖLYESİ</span>
              </div>

              {/* H1 Başlık */}
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
                Sunucunuz İçin Özel <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent">Discord Botları</span> ve Yönetim Altyapısı
              </h1>

              {/* Alt Metin */}
              <p className="mt-6 text-base text-zinc-300 sm:text-lg leading-relaxed">
                Yıllardır Discord topluluklarının içinde kod yazıyorum. Kendi VDS sunucumuzda 7/24 kesintisiz çalışan, resimli log tutan, bilet ve mülakat odalarını otomatik yöneten botunuzu birkaç saat içinde yayına alalım.
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

          </div>
        </section>

        {/* 3. GELİŞMİŞ MODÜLLER & SİSTEMLER VİTRİNİ */}
        <section id="moduller" className="extra-systems-section relative overflow-hidden border-b border-white/[0.06] bg-[#09090d] py-20">
          {/* Kenar Atmosferik Elipsler (Sağ ve Sol Kenar Çift Katmanlı Orbitler) */}
          <div className="ambient-orbit ambient-orbit-right top-[12%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right-inner top-[16%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right top-[65%]" aria-hidden="true" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                  <Boxes className="h-4 w-4" /> BOT SİSTEMLERİ &amp; EKLENTİLER
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Sunucunuzu Güçlendiren Modüller
                </h2>
              </div>
              <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
                İhtiyacınıza uygun modülü seçerek projenize entegre edebilirsiniz.
              </p>
            </div>


            {/* ParsBot Birebir Kart Yapısı: Sadece Üst Görsel + Emoji + Başlık + Temiz Açıklama */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {extraSystems.map((item) => {
                return (
                  <div 
                    key={item.id}
                    className="group rounded-2xl border border-white/10 bg-[#0e0e14] hover:border-purple-500/40 hover:bg-[#12121c] transition-all duration-300 overflow-hidden flex flex-col shadow-xl shadow-black/40"
                  >
                    {/* Üst Görsel / Banner Alanı */}
                    <div className="relative w-full h-40 overflow-hidden bg-zinc-950">
                      {item.coverImage ? (
                        <img 
                          src={item.coverImage} 
                          alt={item.title} 
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${item.coverGradient}`} />
                      )}
                    </div>

                    {/* Alt Bilgi & İçerik Alanı: Sadece Emoji, Başlık ve Açıklama */}
                    <div className="p-4 flex-1 flex flex-col justify-start">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base select-none shrink-0">{item.emoji}</span>
                        <h3 className="font-display text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Özel Modül Çağrısı */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-950/40 via-[#101017] to-indigo-950/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <strong className="text-white font-display text-base block">Sunucunuza özel spesifik bir mimari veya bot mu lazım?</strong>
                <span className="text-xs text-zinc-400 block">Kendi slash komutlarınızı, harici API entegrasyonlarınızı (Webhooks, MongoDB, Rest API) sıfırdan TypeScript ile kodluyoruz.</span>
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

        {/* 4. NASIL ÇALIŞIR? (GELİŞTİRME & KURULUM SÜRECİ) */}
        <section id="nasil" className="relative overflow-hidden py-20 border-b border-white/[0.06]">
          {/* Sağ Kenar Atmosferik Elips */}
          <div className="ambient-orbit ambient-orbit-right top-[25%]" aria-hidden="true" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">İŞLEYİŞ &amp; ÇALIŞMA BİÇİMİ</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Bürokrasi Yok, Doğrudan Geliştirici Masası
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Ticket botlarının otomatik cevaplarıyla değil, doğrudan botunuzu yazan ve derleyen kişiyle Discord DM üzerinden konuşursunuz.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-6 space-y-4 hover:border-purple-500/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm font-mono">
                  01
                </div>
                <h3 className="font-display text-lg font-bold text-white">İhtiyaçları Konuşuyoruz</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sunucunda ne eksik? Resimli log mu lazım, mülakat motoru mu, yoksa özel bir komut mu? Bütçene ve sunucu kitlene göre en mantıklı paketi ve modülleri seçiyoruz.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-6 space-y-4 hover:border-purple-500/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm font-mono">
                  02
                </div>
                <h3 className="font-display text-lg font-bold text-white">VDS Ortamında Derleme &amp; Test</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Botu Debian 12 sunucumuzda izole bir servis olarak kuruyoruz. Sunucu logoların, yetki kademelerin ve hoş geldin afişlerin test edilip onayına sunuluyor.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-6 space-y-4 hover:border-purple-500/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm font-mono">
                  03
                </div>
                <h3 className="font-display text-lg font-bold text-white">Yetki Teslimi &amp; Sürekli Destek</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Botunu sunucuna davet ediyoruz, gerekiyorsa web yönetim paneli girişini iletiyoruz. Herhangi bir sorunda veya yeni modül eklemek istediğinde Discord'dan bir mesaj uzağındayım.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PAKETLER & FİYATLANDIRMA */}
        <section id="paketler" className="relative overflow-hidden py-20 border-b border-white/[0.06] bg-[#09090d]">
          {/* Kenar Atmosferik Elipsler (Sağ ve Sol Kenar) */}
          <div className="ambient-orbit ambient-orbit-left top-[35%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right top-[15%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right-inner top-[20%]" aria-hidden="true" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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

                      <div className="flex flex-col gap-2 pt-1">
                        {/* 1. Buton: Doğrudan Discord DM Aç (Native Link + Kopyalama) */}
                        <a
                          href={DISCORD_ORDER_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!acceptedTerms[p.id]) {
                              e.preventDefault();
                              toast.error("Lütfen önce Hizmet Şartları ve Gizlilik bildirimini onaylayın.");
                              return;
                            }
                            handleCopyPlanText(p);
                          }}
                          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                            isVip
                              ? "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/25"
                              : isPopular
                              ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25"
                              : "bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-lg shadow-[#5865F2]/20"
                          }`}
                        >
                          <DiscordMark className="h-4 w-4" />
                          <span>Discord DM'den İletişime Geç</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
                        </a>

                        {/* 2. Buton: Hazır Sipariş Metnini Kopyala */}
                        <button
                          type="button"
                          onClick={() => handleCopyPlanText(p)}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-medium border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer"
                        >
                          {copiedPlan === p.id ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Sipariş Metni Kopyalandı!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 text-purple-400" />
                              <span>Sipariş Metnini Kopyala</span>
                            </>
                          )}
                        </button>
                      </div>

                      {copiedPlan === p.id && (
                        <p className="text-[10px] text-emerald-400 font-mono text-center flex items-center justify-center gap-1 mt-1">
                          <CheckCircle2 className="h-3 w-3" /> Metin panoya alındı, Discord DM'ye yapıştırabilirsiniz.
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
        <section id="hakkimizda" className="relative overflow-hidden py-20 border-b border-white/[0.06]">
          {/* Sağ Kenar Çift Katmanlı Atmosferik Elipsler */}
          <div className="ambient-orbit ambient-orbit-right top-[18%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right-inner top-[24%]" aria-hidden="true" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
        <section id="iletisim" className="relative overflow-hidden py-20 border-b border-white/[0.06] bg-[#09090d]">
          {/* Sağ ve Sol Kenar Atmosferik Elipsler */}
          <div className="ambient-orbit ambient-orbit-left top-[30%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right top-[20%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right-inner top-[25%]" aria-hidden="true" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
        <section id="sss" className="relative overflow-hidden py-20 border-b border-white/[0.06]">
          {/* Sağ ve Sol Kenar Atmosferik Elipsler */}
          <div className="ambient-orbit ambient-orbit-right top-[20%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-right-inner top-[26%]" aria-hidden="true" />
          <div className="ambient-orbit ambient-orbit-left top-[35%]" aria-hidden="true" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
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
