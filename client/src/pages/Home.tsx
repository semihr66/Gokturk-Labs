import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { 
  ShieldCheck, 
  Terminal, 
  Code2, 
  Headphones, 
  Sparkles, 
  Lock, 
  Check, 
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
  Radio, 
  Copy, 
  CheckCircle2, 
  ExternalLink,
  Send,
  Boxes,
  Compass,
  ChevronDown,
  Layers,
  MonitorCheck,
  Disc,
  Play,
  RotateCcw
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

// GSAP ScrollTrigger registration
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  features: string[];
  notice?: string;
}

const plans: PlanItem[] = [
  {
    id: "free",
    name: "Başlangıç (Topluluk)",
    price: "₺0",
    period: "ömür boyu",
    badge: "🎁 Topluluk Hediyesi",
    badgeType: "free",
    label: "TOPLULUK · ÜCRETSİZ",
    description: "Discord topluluğunuza profesyonel bir ilk adım. Temel komutlar ve hazır modüller.",
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
    a: "Ödemeler sipariş aşamasında mutabık kalınarak güvenli Türk ödeme sağlayıcıları veya havale/EFT üzerinden gerçekleştirilir. Web sitemizde kredi kartı bilgisi saklanmaz veya talep edilmez."
  }
];

// Interactive Pinned Services Data
const servicesList = [
  {
    num: "01",
    tag: "DISCORD CORE & BOT ARCHITECTURE",
    title: "Discord Botları & Altyapı",
    subtitle: "Sunucunuzun omurgasını oluşturan reaktif bot motoru.",
    desc: "discord.js v14 ve TypeScript ile sıfırdan derlenen, yüksek hacimli sunucularda bile sıfır gecikmeyle yanıt veren kurumsal bot mimarisi.",
    spec: ["Debian 12 VDS", "TypeScript v5.6", "PM2 Cluster", "Shard Ready"],
    gradient: "from-purple-900/40 via-indigo-950/20 to-black/60",
    glowColor: "rgba(168, 85, 247, 0.25)",
    icon: Terminal
  },
  {
    num: "02",
    tag: "SECURE WEB DASHBOARD & CONTROL",
    title: "Şifreli Web Yönetim Paneli",
    subtitle: "Discord komut karmaşasına son veren modern kontrol merkezi.",
    desc: "PBKDF2 256-Bit şifreleme ve Have I Been Pwned sızıntı korumasıyla donatılmış web konsolundan roller, biletler, mülakatlar ve AutoMod canlı yönetilir.",
    spec: ["PBKDF2 Kripto", "HIBP Shield", "Canlı Webhook", "Rol Matrisi"],
    gradient: "from-emerald-950/40 via-teal-950/20 to-black/60",
    glowColor: "rgba(52, 211, 153, 0.25)",
    icon: Lock
  },
  {
    num: "03",
    tag: "TAILORED CODE & INTEGRATION",
    title: "Özel Yazılım & Entegrasyon",
    subtitle: "Standart paketlerin ötesinde terzi usulü yazılım geliştirme.",
    desc: "Özel oyun sunucuları (FiveM, Minecraft), kurumsal veritabanları (MongoDB, PostgreSQL) ve harici REST API servisleriyle iki yönlü canlı senkronizasyon.",
    spec: ["Custom REST API", "MongoDB / SQL", "WebSocket", "Webhook Hub"],
    gradient: "from-blue-950/40 via-cyan-950/20 to-black/60",
    glowColor: "rgba(56, 189, 248, 0.25)",
    icon: Code2
  },
  {
    num: "04",
    tag: "TELEMETRY & AUTO DEFENSE",
    title: "Canlı Sentinel & Koruma",
    subtitle: "Milisaniyelik sunucu sağlığı izleme ve Anti-Raid kalkanı.",
    desc: "Sunucu kaynaklarını, bot gecikme sürelerini ve anormal kullanıcı akınlarını anında tespit eden 0-kesinti güvenlik kalkanı ve denetim kayıt defteri.",
    spec: ["Anti-Raid AutoMod", "Milisaniye Telemetri", "Audit Logs", "0-Downtime"],
    gradient: "from-amber-950/40 via-orange-950/20 to-black/60",
    glowColor: "rgba(251, 191, 36, 0.25)",
    icon: Activity
  }
];

// Horizontal Scroll Case Studies Data
const caseStudies = [
  {
    id: "case-1",
    tag: "CASE 01 · GÜVENLİK & YÖNETİM",
    title: "Yetkili Başvuru & Mülakat Motoru",
    summary: "Sunucudaki aday yetkililer için sesli ve yazılı otomatik izolasyon odaları oluşturan, oylama ve değerlendirme sürecini tek tıkla tamamlayan motor.",
    stack: ["discord.js v14", "Audio API", "Role Engine", "Audit Trail"],
    accent: "purple",
    stats: "Otomatik Oda İzolasyonu"
  },
  {
    id: "case-2",
    tag: "CASE 02 · ÇOKLU DEPARTMAN",
    title: "Butonlu Bilet (Ticket) Sistemi",
    summary: "Farklı departmanlara özel bilet açılışı, HTML transkript dışa aktarımı ve bilet içi özel yetkili rollendirmesi sunan yüksek hızlı destek modülü.",
    stack: ["Components API", "HTML Export", "SQLite / Memory", "Instant Ping"],
    accent: "emerald",
    stats: "Departman Bazlı Yönlendirme"
  },
  {
    id: "case-3",
    tag: "CASE 03 · DONANIM SAĞLIĞI",
    title: "Göktürk Sentinel Telemetri",
    summary: "Debian 12 VDS üzerindeki RAM, CPU, disk ve süreç yükünü gerçek zamanlı işleyen, anormal yüklerde Discord webhook bildirimi yollayan izleme masası.",
    stack: ["Linux OS Metric", "Node.js Process", "PM2 SDK", "Real-time"],
    accent: "cyan",
    stats: "Milisaniyelik Canlı Veri"
  },
  {
    id: "case-4",
    tag: "CASE 04 · SEVİYE & SOSYALLEŞME",
    title: "Dinamik Rank Kartı & Seviye",
    summary: "Kullanıcıların metin ve ses kanallarındaki aktivitelerini hesaplayarak özelleştirilebilir afişler üzerinde seviye rozetleri üreten oyunlaştırma mimarisi.",
    stack: ["Canvas 2D", "Voice State", "Dynamic XP Curve", "Custom Badge"],
    accent: "amber",
    stats: "Görsel Afiş Sentezi"
  }
];

function DiscordMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.54 5.47A16.86 16.86 0 0 0 15.44 4l-.5 1.02a15.6 15.6 0 0 0-5.88 0L8.56 4a16.91 16.91 0 0 0-4.1 1.47C1.86 9.38 1.15 13.2 1.5 16.96A16.93 16.93 0 0 0 6.54 19l1.22-1.67a10.28 10.28 0 0 1-1.9-.92l.46-.35a11.98 11.98 0 0 0 11.36 0l.47.35a10.2 10.2 0 0 1-1.9.92L17.46 19a16.94 16.94 0 0 0 5.04-2.04c.4-4.36-.68-8.15-2.96-11.49ZM8.7 14.7c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Zm6.6 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Z" />
    </svg>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBackdropRef = useRef<HTMLDivElement>(null);
  const videoScrubRef = useRef<HTMLDivElement>(null);
  const scrubberCanvasRef = useRef<HTMLCanvasElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const pinnedServicesRef = useRef<HTMLDivElement>(null);

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrubberFrame, setScrubberFrame] = useState(1);

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
    document.title = "Göktürk Labs — Sinematik Discord Botları, Web Paneli ve Altyapı Stüdyosu";
  }, []);

  // 1. Lenis Smooth Scroll Setup & GSAP ScrollTrigger Integration
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    });

    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      if (e.animatedScroll > 80) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // 2. GSAP Scroll Animations Setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // A. HERO CINEMATIC SCENE TRANSITION
      if (heroRef.current && heroContentRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2
          }
        })
        .to(heroContentRef.current, {
          y: 160,
          scale: 0.9,
          opacity: 0.15,
          filter: "blur(8px)",
          ease: "none"
        }, 0)
        .to(heroBackdropRef.current, {
          scale: 1.25,
          opacity: 0.4,
          ease: "none"
        }, 0);
      }

      // B. PINNED SERVICES SHOWCASE (Scrubbed step timeline)
      if (pinnedServicesRef.current) {
        const serviceCards = gsap.utils.toArray<HTMLElement>(".service-slide-target");
        
        ScrollTrigger.create({
          trigger: pinnedServicesRef.current,
          start: "top top",
          end: `+=${servicesList.length * 900}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (servicesList.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power1.inOut"
          },
          onUpdate: (self) => {
            const index = Math.min(
              servicesList.length - 1,
              Math.floor(self.progress * servicesList.length)
            );
            setActiveServiceIndex(index);
          }
        });
      }

      // C. HORIZONTAL CASE STUDIES SCROLL (Only on desktop screens >= 1024px)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (horizontalSectionRef.current && horizontalTrackRef.current) {
          const totalScrollWidth = horizontalTrackRef.current.scrollWidth - window.innerWidth + 120;
          
          gsap.to(horizontalTrackRef.current, {
            x: () => -totalScrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSectionRef.current,
              start: "top top",
              end: () => `+=${totalScrollWidth + 300}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true
            }
          });
        }
      });

      // D. SECTION REVEAL CLIP-PATHS & FADES
      const revealBlocks = gsap.utils.toArray<HTMLElement>(".cinematic-reveal");
      revealBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // E. VIDEO / FRAME SCRUBBER CANVAS ANIMATION (Simulated 60 frames high-FPS telemetry flow)
      if (videoScrubRef.current && scrubberCanvasRef.current) {
        const canvas = scrubberCanvasRef.current;
        const ctx2d = canvas.getContext("2d");
        
        const renderFrame = (progress: number) => {
          if (!ctx2d) return;
          const width = canvas.width;
          const height = canvas.height;
          ctx2d.clearRect(0, 0, width, height);

          const frameNum = Math.floor(progress * 60) + 1;
          setScrubberFrame(frameNum);

          // Dark tech background
          const bgGrad = ctx2d.createLinearGradient(0, 0, width, height);
          bgGrad.addColorStop(0, "#08080c");
          bgGrad.addColorStop(1, "#12101a");
          ctx2d.fillStyle = bgGrad;
          ctx2d.fillRect(0, 0, width, height);

          // Grid wireframe
          ctx2d.strokeStyle = "rgba(147, 51, 234, 0.08)";
          ctx2d.lineWidth = 1;
          const gridSize = 40;
          for (let x = 0; x < width; x += gridSize) {
            ctx2d.beginPath();
            ctx2d.moveTo(x, 0);
            ctx2d.lineTo(x, height);
            ctx2d.stroke();
          }
          for (let y = 0; y < height; y += gridSize) {
            ctx2d.beginPath();
            ctx2d.moveTo(0, y);
            ctx2d.lineTo(width, y);
            ctx2d.stroke();
          }

          // Dynamic Circular Particle / Radar Pulse connected to scroll
          const centerX = width / 2;
          const centerY = height / 2;
          const maxRadius = Math.min(width, height) * 0.38;
          const currentRadius = (progress * maxRadius) + 30;

          // Pulse waves
          for (let i = 1; i <= 3; i++) {
            ctx2d.beginPath();
            const rad = ((currentRadius * i * 0.45) % maxRadius) + 20;
            ctx2d.arc(centerX, centerY, rad, 0, Math.PI * 2);
            ctx2d.strokeStyle = `rgba(168, 85, 247, ${Math.max(0, 0.6 - rad / maxRadius)})`;
            ctx2d.lineWidth = 1.5;
            ctx2d.stroke();
          }

          // Rotating telemetry coordinate lines
          const angle = progress * Math.PI * 4;
          ctx2d.save();
          ctx2d.translate(centerX, centerY);
          ctx2d.rotate(angle);

          ctx2d.strokeStyle = "rgba(192, 132, 252, 0.45)";
          ctx2d.lineWidth = 2;
          ctx2d.beginPath();
          ctx2d.arc(0, 0, 70, 0, Math.PI * 1.5);
          ctx2d.stroke();

          // Core node
          ctx2d.fillStyle = "#9333ea";
          ctx2d.shadowColor = "#a855f7";
          ctx2d.shadowBlur = 24;
          ctx2d.beginPath();
          ctx2d.arc(0, 0, 16, 0, Math.PI * 2);
          ctx2d.fill();
          ctx2d.restore();

          // Soundwave / signal frequency line on bottom
          ctx2d.beginPath();
          ctx2d.strokeStyle = "rgba(56, 189, 248, 0.6)";
          ctx2d.lineWidth = 2;
          const waveY = height - 60;
          for (let x = 0; x < width; x += 10) {
            const wave = Math.sin((x * 0.04) + (progress * 18)) * (20 * progress);
            if (x === 0) ctx2d.moveTo(x, waveY + wave);
            else ctx2d.lineTo(x, waveY + wave);
          }
          ctx2d.stroke();
        };

        // Render initial frame
        renderFrame(0);

        ScrollTrigger.create({
          trigger: videoScrubRef.current,
          start: "top top",
          end: "+=1600",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            renderFrame(self.progress);
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
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
    <div ref={containerRef} className="relative min-h-screen bg-[#07070a] text-[#f7f7fb] selection:bg-purple-600/40 selection:text-white overflow-x-hidden font-sans">
      
      {/* 1. CINEMATIC ADAPTIVE NAVBAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled 
            ? "py-3 bg-[#08080c]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/80" 
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="group flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl">
            <div className="relative">
              <img src={LOGO_URL} alt="Göktürk Labs" className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#08080c]" />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                GÖKTÜRK <span className="text-purple-400 font-black">LABS</span>
              </span>
              <span className="text-[9px] font-mono-code text-zinc-400 uppercase tracking-widest -mt-0.5">
                CREATIVE DISCORD STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-400 lg:flex" aria-label="Ana Gezinti">
            <a href="#hizmetler" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-purple-400 after:absolute after:bottom-0 after:left-0 after:transition-all">01. Hizmetler</a>
            <a href="#hikaye" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-purple-400 after:absolute after:bottom-0 after:left-0 after:transition-all">02. Mimari</a>
            <a href="#projeler" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-purple-400 after:absolute after:bottom-0 after:left-0 after:transition-all">03. Projeler</a>
            <a href="#telemetri" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-purple-400 after:absolute after:bottom-0 after:left-0 after:transition-all">04. Telemetri</a>
            <a href="#paketler" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-purple-400 after:absolute after:bottom-0 after:left-0 after:transition-all">05. Fiyatlar</a>
            <a href="#iletisim" className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-purple-400 after:absolute after:bottom-0 after:left-0 after:transition-all">06. İletişim</a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center gap-4 sm:flex">
            <a 
              href={COMMUNITY_URL} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-mono font-medium text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white hover:border-purple-500/30"
            >
              <DiscordMark className="h-4 w-4 text-[#5865F2]" />
              <span>Topluluk</span>
            </a>
            <a 
              href="#paketler"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-purple-600/30 transition-all hover:brightness-110 active:scale-95"
            >
              <span>Başlat</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button 
                  type="button" 
                  aria-label="Menüyü aç" 
                  className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm bg-[#09090e] border-white/10 p-6 flex flex-col justify-between">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <img src={LOGO_URL} alt="Logo" className="h-8 w-8 object-contain" />
                    <span className="font-editorial text-base font-bold text-white tracking-wide">
                      GÖKTÜRK <span className="text-purple-400">LABS</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="my-8 flex flex-col gap-4 text-sm font-mono uppercase tracking-wider text-zinc-300">
                  <a href="#hizmetler" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1.5 border-b border-white/5">01. Hizmetler &amp; Motor</a>
                  <a href="#hikaye" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1.5 border-b border-white/5">02. Mimari &amp; Hikaye</a>
                  <a href="#projeler" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1.5 border-b border-white/5">03. Proje Vitrini</a>
                  <a href="#telemetri" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1.5 border-b border-white/5">04. Canlı Telemetri</a>
                  <a href="#paketler" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1.5 border-b border-white/5">05. Paket Seçimi</a>
                  <a href="#sss" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1.5 border-b border-white/5">06. Sık Sorulanlar</a>
                  <a href="#iletisim" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-400 transition-colors py-1.5">07. Doğrudan İletişim</a>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs font-mono text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>7/24 Kesintisiz VDS Çevrimiçi</span>
                  </div>
                  <a 
                    href={COMMUNITY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] py-2.5 text-xs font-semibold text-white"
                  >
                    <DiscordMark className="h-4 w-4 text-[#5865F2]" />
                    <span>Discord Topluluğuna Katıl</span>
                  </a>
                  <a 
                    href="#paketler"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-600/25"
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

      {/* 2. CINEMATIC HERO SECTION */}
      <section 
        ref={heroRef} 
        id="top" 
        className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-20 overflow-hidden"
      >
        {/* Parallax Subtle Mesh Backdrop */}
        <div 
          ref={heroBackdropRef} 
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-70"
        >
          <div className="h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-purple-700/20 via-indigo-900/15 to-transparent blur-[140px]" />
          <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[130px] translate-x-1/3 translate-y-1/4" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div ref={heroContentRef} className="mx-auto max-w-5xl text-center flex flex-col items-center">
          
          {/* Signal Indicator */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono-code text-purple-300 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            <span className="font-semibold tracking-wider">GÖKTÜRK LABS · EST. 2026</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">DISCORD ENGINE &amp; STUDIO</span>
          </div>

          {/* Main Cinematic Title with High Typography Contrast */}
          <h1 className="mt-8 font-editorial text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.02] uppercase">
            Topluluğunuzu <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Sanata &amp; Güce
            </span> Dönüştürün.
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            Sıradan bot şablonlarını unutun. Göktürk Labs; yüksek performanslı VDS altyapısı, 
            kriptografik web yönetim paneli ve terzi usulü Discord mimarisi inşa eden yeni nesil bir teknoloji stüdyosudur.
          </p>

          {/* Magnetic CTA Controls */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a 
              href="#hizmetler"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-white text-zinc-950 px-7 py-4 text-xs font-mono font-bold uppercase tracking-wider shadow-2xl shadow-white/10 transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span>Deneyimi Başlat</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a 
              href="#paketler"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-purple-500/40"
            >
              <span>Paket &amp; Fiyat Tablosu</span>
              <Compass className="h-4 w-4 text-purple-400" />
            </a>
          </div>

          {/* Live System Signal Bar */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 border-y border-white/[0.08] py-4 px-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>UPTIME: %99.98 (PM2 CLUSTER)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>STACK: DISCORD.JS V14 + TYPESCRIPT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>SECURITY: PBKDF2 256-BIT</span>
            </div>
          </div>

          {/* Scroll Down Prompter */}
          <div className="mt-12 flex flex-col items-center gap-2 text-zinc-500 text-[11px] font-mono tracking-widest uppercase animate-bounce">
            <span>AŞAĞI KAYDIRIN</span>
            <ChevronDown className="h-4 w-4 text-purple-400" />
          </div>

        </div>
      </section>

      {/* 3. PINNED INTERACTIVE SERVICES (SCENE TRANSITION) */}
      <section 
        ref={pinnedServicesRef} 
        id="hizmetler" 
        className="relative h-screen w-full bg-[#0a0a0f] flex flex-col justify-center border-t border-b border-white/[0.08] overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full h-full flex flex-col justify-between py-12">
          
          {/* Top Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
                SCENE 01 · INTERACTIVE SERVICE STACK
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                Hizmet &amp; Mühendislik Çözümleri
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span>AŞAMA: {servicesList[activeServiceIndex].num} / 04</span>
              <div className="flex gap-1.5">
                {servicesList.map((_, i) => (
                  <span 
                    key={i} 
                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                      activeServiceIndex === i ? "bg-purple-400" : "bg-white/10"
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Stage Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-xs text-purple-300">
                <span>{servicesList[activeServiceIndex].tag}</span>
              </div>

              <h3 className="font-editorial text-4xl sm:text-5xl font-black text-white leading-tight uppercase transition-all duration-300">
                {servicesList[activeServiceIndex].title}
              </h3>

              <p className="text-lg text-purple-200 font-medium leading-relaxed">
                {servicesList[activeServiceIndex].subtitle}
              </p>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                {servicesList[activeServiceIndex].desc}
              </p>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono text-[11px]">
                {servicesList[activeServiceIndex].spec.map((sp, idx) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-center text-zinc-300">
                    {sp}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a 
                  href="#paketler"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/30 transition-all hover:bg-purple-500"
                >
                  <span>Bu Hizmeti Seç</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Cinematic Graphical Visualizer Box */}
            <div className="lg:col-span-6">
              <div 
                className={`relative rounded-3xl border border-white/15 bg-gradient-to-br ${servicesList[activeServiceIndex].gradient} p-8 sm:p-12 shadow-2xl transition-all duration-700 overflow-hidden min-h-[380px] flex flex-col justify-between`}
                style={{
                  boxShadow: `0 20px 80px ${servicesList[activeServiceIndex].glowColor}`
                }}
              >
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                    {(() => {
                      const IconComp = servicesList[activeServiceIndex].icon;
                      return <IconComp className="h-6 w-6 text-purple-300" />;
                    })()}
                  </div>
                  <span className="font-editorial text-4xl font-black text-white/30">
                    {servicesList[activeServiceIndex].num}
                  </span>
                </div>

                <div className="relative z-10 space-y-4 pt-10">
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl font-mono text-xs text-zinc-300 space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 pb-2 border-b border-white/5">
                      <span>TERMINAL_OUTPUT</span>
                      <span className="text-emerald-400">STATUS: HEALTHY</span>
                    </div>
                    <div className="text-purple-300">
                      &gt; execute service_{servicesList[activeServiceIndex].num.toLowerCase()} --cluster=production
                    </div>
                    <div className="text-zinc-400">
                      [OK] Module initialized with 0 latency. Webhook listening on Debian 12.
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-6 text-xs font-mono text-zinc-400">
                  <span>SCROLL İLE İLERLEYİN</span>
                  <span className="text-purple-400">GÖKTÜRK LABS AUTOMATION</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Stage Progress Hint */}
          <div className="text-center font-mono text-[11px] text-zinc-500 uppercase tracking-widest pt-4">
            AŞAĞI DOĞRU SCROLL ETMEYE DEVAM EDİN · BİR SONRAKİ SAHNEYE GEÇİLİYOR
          </div>

        </div>
      </section>

      {/* 4. BRAND STORY & PHILOSOPHY (CINEMATIC TEXT STORYTELLING) */}
      <section id="hikaye" className="relative py-32 px-6 lg:px-10 bg-[#07070b] border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl">
          
          <div className="cinematic-reveal">
            <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
              SCENE 02 · STUDIO PHILOSOPHY
            </span>
            <h2 className="mt-4 font-editorial text-4xl sm:text-6xl font-black text-white uppercase leading-[1.05]">
              Hazır Şablonlar <br />
              <span className="text-zinc-600">Topluluğunuzu Sıradanlaştırır.</span>
            </h2>
          </div>

          <div className="mt-14 space-y-12 text-zinc-300 text-lg sm:text-2xl font-light leading-relaxed">
            <p className="cinematic-reveal">
              İnternet; birbirinin aynı logolarla çalışan, sık sık çöken ve kullanıcının güvenliğini önemsemeyen 
              <strong className="text-white font-medium"> hazır bot şablonlarıyla</strong> dolup taştı.
            </p>

            <div className="cinematic-reveal border-l-2 border-purple-500 pl-6 sm:pl-8 py-2">
              <p className="text-purple-200 font-normal">
                Göktürk Labs, Discord topluluklarını birer organizasyon olarak görür. 
                Her sunucunun kuralları, hiyerarşisi ve yetkili işleyişi farklıdır. 
                Bu yüzden her sistem, sunucunun gerçek ihtiyaçlarına göre terzi usulü yapılandırılmalıdır.
              </p>
            </div>

            <p className="cinematic-reveal text-zinc-400 text-base sm:text-xl">
              Geliştirici <strong className="text-purple-400 font-mono">semihr66</strong> tarafından kurulan stüdyomuz; 
              şişirilmiş istatistikler veya sahte vaatler olmadan, doğrudan kod ve donanım gücüyle çalışır.
            </p>
          </div>

          {/* Three Architecture Pillars */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 cinematic-reveal">
            <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 space-y-3">
              <span className="font-mono text-purple-400 text-xs font-bold block">01 / DOKUNULMAZLIK</span>
              <h4 className="font-editorial text-xl font-bold text-white uppercase">Sıfır Veri Satışı</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Sunucunuzun mesajları, rolleri veya kullanıcı kayıtları ticari amaçlarla asla işlenmez veya üçüncü partilere satılmaz.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 space-y-3">
              <span className="font-mono text-purple-400 text-xs font-bold block">02 / DONANIM GÜCÜ</span>
              <h4 className="font-editorial text-xl font-bold text-white uppercase">İzole Debian 12</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Ev tipi bilgisayarlar yerine, profesyonel veri merkezlerinde barındırılan Debian 12 VDS sunucularında PM2 ile 7/24 kesintisiz hizmet.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 space-y-3">
              <span className="font-mono text-purple-400 text-xs font-bold block">03 / ŞEFFAF İLETİŞİM</span>
              <h4 className="font-editorial text-xl font-bold text-white uppercase">Birebir Geliştirici</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Otomatik destek robotları yerine, Discord üzerinden botu yazan geliştiriciyle birebir sesli veya yazılı iletişim.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. HORIZONTAL SCROLL CASE STUDIES SHOWCASE */}
      <section 
        ref={horizontalSectionRef} 
        id="projeler" 
        className="relative min-h-screen bg-[#09090d] border-b border-white/[0.08] overflow-hidden flex flex-col justify-center py-20 lg:py-0"
      >
        <div className="w-full">
          
          {/* Header before horizontal sweep */}
          <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-10">
            <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
              SCENE 03 · PROJECT CASE STUDIES
            </span>
            <div className="flex flex-wrap items-end justify-between gap-4 mt-2">
              <h2 className="font-editorial text-3xl sm:text-5xl font-black text-white uppercase">
                Geliştirdiğimiz Sistemler &amp; Çözümler
              </h2>
              <span className="hidden lg:block text-xs font-mono text-zinc-500 uppercase tracking-widest">
                [ YATAY KAYDIRMA DENEYİMİ — SCROLL EDİN ]
              </span>
            </div>
          </div>

          {/* Horizontal Track for Desktop / Vertical Stack on Mobile */}
          <div 
            ref={horizontalTrackRef} 
            className="flex flex-col lg:flex-row gap-6 px-6 lg:px-10 w-full lg:w-max items-stretch"
          >
            {caseStudies.map((cs, i) => (
              <div 
                key={cs.id}
                className="w-full lg:w-[480px] shrink-0 rounded-3xl border border-white/10 bg-[#111118] p-8 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="font-mono text-xs font-bold text-purple-400 tracking-wider">
                      {cs.tag}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-white mt-6 group-hover:text-purple-300 transition-colors">
                    {cs.title}
                  </h3>

                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-light">
                    {cs.summary}
                  </p>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-300 flex items-center justify-between">
                    <span className="text-zinc-500">ÖNE ÇIKAN:</span>
                    <span className="text-purple-300 font-semibold">{cs.stats}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
                    {cs.stack.map((st, si) => (
                      <span key={si} className="rounded-md bg-white/[0.04] px-2 py-1 border border-white/5">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. VIDEO / FRAME-BASED SCROLL SCRUBBER (TELEMETRY SEQUENCE) */}
      <section 
        ref={videoScrubRef} 
        id="telemetri" 
        className="relative h-screen w-full bg-[#060609] border-b border-white/[0.08] flex flex-col justify-between p-6 lg:p-12 overflow-hidden"
      >
        {/* Top Info Header */}
        <div className="mx-auto max-w-7xl w-full flex items-center justify-between border-b border-white/[0.08] pb-4 z-10">
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              SCENE 04 · FRAME-CONTROLLED TELEMETRY SEQUENCE
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white uppercase mt-1">
              Canlı Sinyal &amp; Donanım Rezonansı
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-zinc-500">FRAME:</span>
            <span className="px-2.5 py-1 rounded bg-purple-600/20 border border-purple-500/30 text-purple-300 font-bold">
              #{String(scrubberFrame).padStart(2, "0")} / 60
            </span>
          </div>
        </div>

        {/* Center Frame Canvas Stage */}
        <div className="relative my-auto mx-auto max-w-5xl w-full aspect-video rounded-3xl border border-white/15 overflow-hidden shadow-2xl shadow-purple-950/40 bg-black flex items-center justify-center">
          <canvas 
            ref={scrubberCanvasRef} 
            width={960} 
            height={540} 
            className="w-full h-full object-contain pointer-events-none" 
          />

          {/* Floating UI overlay elements */}
          <div className="absolute top-6 left-6 font-mono text-xs text-zinc-400 space-y-1 pointer-events-none bg-black/60 p-3 rounded-xl border border-white/10 backdrop-blur-md">
            <div className="text-white font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              DEBIAN 12 KERNEL 6.1
            </div>
            <div>CPU_LOAD: 0.14 | RAM: 1.2 GB / 8.0 GB</div>
            <div>STATUS: OPTIMAL REACTION TIME</div>
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-xs text-purple-300 pointer-events-none bg-black/60 px-3.5 py-2 rounded-xl border border-purple-500/30 backdrop-blur-md">
            SCROLL SCRUB ETKİSİ AKTİF
          </div>
        </div>

        {/* Bottom Sequence Guide */}
        <div className="mx-auto max-w-7xl w-full flex items-center justify-between text-xs font-mono text-zinc-500 pt-4 border-t border-white/[0.08] z-10">
          <span>KULLANICI SCROLL ETTİKÇE KARELER CANLI İŞLENİR</span>
          <span className="text-zinc-400">60 FPS DONANIM HIZLANDIRMA</span>
        </div>
      </section>

      {/* 7. TRANSPARENT 4-TIER PRICING SECTION */}
      <section id="paketler" className="py-28 px-6 lg:px-10 bg-[#09090d] border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl">
          
          <div className="max-w-3xl cinematic-reveal">
            <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
              SCENE 05 · TRANSPARENT PRICING
            </span>
            <h2 className="mt-3 font-editorial text-4xl sm:text-5xl font-black text-white uppercase">
              Net &amp; Şeffaf Paket Seçenekleri
            </h2>
            <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
              Gizli ücretler veya sürpriz faturalar yok. Tüm paketlerimiz 7/24 kesintisiz VDS barındırma dahil sunulur.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cinematic-reveal">
            {plans.map((p) => {
              const isVip = p.badgeType === "vip";
              const isPopular = p.badgeType === "popular";
              const isFree = p.badgeType === "free";

              return (
                <div 
                  key={p.id}
                  className={`rounded-3xl border p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    isVip
                      ? "border-amber-500/40 bg-gradient-to-b from-amber-500/[0.08] via-[#121218] to-[#0e0e14] shadow-2xl shadow-amber-500/10"
                      : isPopular
                      ? "border-purple-500/50 bg-gradient-to-b from-purple-500/[0.08] via-[#121218] to-[#0e0e14] shadow-2xl shadow-purple-500/10"
                      : "border-white/10 bg-[#0f0f15] hover:border-white/20"
                  }`}
                >
                  <div>
                    {/* Badge */}
                    {p.badge && (
                      <div className="mb-4">
                        <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 ${
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

                    <h3 className="font-editorial text-xl font-bold text-white uppercase">{p.name}</h3>
                    <p className="text-xs text-zinc-400 mt-2 min-h-[36px] font-light leading-relaxed">{p.description}</p>

                    <div className="mt-5 flex items-baseline gap-1.5 pb-5 border-b border-white/[0.08]">
                      <span className="font-editorial text-4xl font-black text-white">{p.price}</span>
                      <span className="text-xs text-zinc-400 font-mono">/ {p.period}</span>
                    </div>

                    <div className="mt-5 space-y-3 text-xs text-zinc-300">
                      {p.features.map((f, fi) => (
                        <div key={fi} className="flex items-start gap-2.5">
                          <Check className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>

                    {p.notice && (
                      <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-snug">
                        {p.notice}
                      </div>
                    )}
                  </div>

                  {/* Order & Legal Consent */}
                  <div className="mt-8 pt-5 border-t border-white/[0.08] space-y-3">
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
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all active:scale-95 ${
                        isVip
                          ? "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30"
                          : isPopular
                          ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
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

          <p className="mt-10 text-center text-xs text-zinc-500 font-mono">
            💡 Ödemeler ve özel kapsam Discord DM üzerinden geliştiriciyle birlikte netleştirilir. Web sitemiz üzerinden kredi kartı veya ödeme bilgisi toplanmaz.
          </p>

        </div>
      </section>

      {/* 8. INTERACTIVE CONTACT & INQUIRY FORM */}
      <section id="iletisim" className="py-28 px-6 lg:px-10 bg-[#07070b] border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 cinematic-reveal">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
                SCENE 06 · DIRECT CHANNEL
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl font-black text-white uppercase">
                Geliştiriciye <br />Doğrudan Ulaşın
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Bot siparişi, sunucu danışmanlığı veya özel yazılım ihtiyaçlarınız için doğrudan geliştiriciyle iletişime geçebilirsiniz.
              </p>

              <div className="space-y-3 pt-4">
                <a 
                  href={DISCORD_ORDER_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-[#0f0f16] hover:border-purple-500/50 hover:bg-[#13131c] transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] flex items-center justify-center">
                    <DiscordMark className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="text-xs font-semibold text-white block group-hover:text-purple-300 transition-colors">Geliştirici Discord DM</strong>
                    <span className="text-[11px] text-zinc-400 font-mono">semih1231 (937079326149595147)</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 ml-auto text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a 
                  href={COMMUNITY_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-[#0f0f16] hover:border-purple-500/50 hover:bg-[#13131c] transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="text-xs font-semibold text-white block group-hover:text-purple-300 transition-colors">Topluluk Sunucusu</strong>
                    <span className="text-[11px] text-zinc-400 font-mono">discord.gg/CFrwUThhE</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 ml-auto text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Interactive Form Box */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0f0f16] p-8 sm:p-10 shadow-2xl">
              {contactSuccess ? (
                <div className="space-y-5 text-center py-10">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-white uppercase">Talebiniz Hazırlandı!</h3>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed font-light">
                    Mesajınız derlendi. Geliştiriciye hemen iletmek için mesajınızı kopyalayabilir veya doğrudan Discord DM penceresini açabilirsiniz.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyContactMessage}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/30"
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
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-xs font-mono font-medium text-zinc-300 hover:text-white"
                    >
                      <span>Yeni Form Doldur</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block font-medium text-zinc-300 mb-1.5 font-mono">
                        Adınız / Takma Adınız <span className="text-purple-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Örn: Ahmet veya Rex"
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 font-sans"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-discord" className="block font-medium text-zinc-300 mb-1.5 font-mono">
                        Discord Kullanıcı Adınız <span className="text-purple-400">*</span>
                      </label>
                      <input
                        id="contact-discord"
                        type="text"
                        required
                        value={contactDiscord}
                        onChange={(e) => setContactDiscord(e.target.value)}
                        placeholder="Örn: semih1231"
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block font-medium text-zinc-300 mb-1.5 font-mono">
                      İletişim / Talep Konusu
                    </label>
                    <select
                      id="contact-topic"
                      value={contactTopic}
                      onChange={(e) => setContactTopic(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-sans"
                    >
                      <option value="Paket Siparişi">Paket Siparişi (Dengeli / Gelişmiş / Pro)</option>
                      <option value="Ücretsiz Başlangıç Paketi">Ücretsiz Başlangıç Paketi Talebi</option>
                      <option value="Özel Bot Geliştirme">Sunucuma Özel Bot Geliştirme</option>
                      <option value="Teknik Destek">Teknik Destek &amp; Soru</option>
                      <option value="Öneri / Geri Bildirim">Öneri veya Geri Bildirim</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-medium text-zinc-300 mb-1.5 font-mono">
                      Mesajınız &amp; İstekleriniz <span className="text-purple-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Botunuzdan beklentileriniz, sunucunuzun içeriği veya aklınıza takılan sorular..."
                      className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 leading-relaxed font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider py-3.5 transition-all active:scale-95 shadow-xl shadow-purple-600/30 disabled:opacity-50"
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

      {/* 9. FAQ ACCORDION SECTION */}
      <section id="sss" className="py-24 px-6 lg:px-10 bg-[#09090d] border-b border-white/[0.08]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center max-w-xl mx-auto cinematic-reveal">
            <span className="text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
              SSS
            </span>
            <h2 className="mt-3 font-editorial text-3xl sm:text-4xl font-bold text-white uppercase">
              Sıkça Sorulan Sorular
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light">
              Merak ettiğiniz konuları derledik. Özel sorularınız için doğrudan Discord'dan bağlanabilirsiniz.
            </p>
          </div>

          <div className="mt-12 cinematic-reveal">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem 
                  key={i} 
                  value={`faq-${i}`}
                  className="rounded-2xl border border-white/10 bg-[#0f0f16] px-5 py-1.5"
                >
                  <AccordionTrigger className="text-left font-editorial font-semibold text-sm text-white hover:text-purple-300 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-zinc-400 leading-relaxed pt-1 pb-4 font-light">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 10. CINEMATIC STUDIO FOOTER */}
      <footer className="bg-[#050508] py-16 px-6 lg:px-10 text-xs text-zinc-400">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-white/[0.08]">
            <a href="#top" className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Göktürk Labs" className="h-9 w-9 object-contain" />
              <div className="flex flex-col">
                <span className="font-editorial text-lg font-bold text-white uppercase tracking-tight">
                  GÖKTÜRK <span className="text-purple-400">LABS</span>
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">INDEPENDENT DISCORD STUDIO</span>
              </div>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider">
              <a href="#hizmetler" className="hover:text-white transition-colors">Hizmetler</a>
              <a href="#hikaye" className="hover:text-white transition-colors">Mimari</a>
              <a href="#projeler" className="hover:text-white transition-colors">Projeler</a>
              <a href="#paketler" className="hover:text-white transition-colors">Paketler</a>
              <a href="#iletisim" className="hover:text-white transition-colors">İletişim</a>
              <a href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik</a>
              <a href="/hizmet-sartlari" className="hover:text-white transition-colors">Şartlar</a>
              <a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors">Sitemap</a>
            </div>

            <a 
              href={COMMUNITY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 px-4 py-2.5 text-xs font-semibold text-[#8a94fd] hover:text-white transition-all"
            >
              <DiscordMark className="h-4 w-4" />
              <span>Discord Topluluğu</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono">
            <div>
              <p>© 2026 Göktürk Labs. Tüm hakları saklıdır.</p>
              <p className="text-[11px] text-zinc-500 mt-1">
                Geliştirici: <span className="text-purple-400">semihr66</span> · Bağımsız Discord Yazılım Stüdyosu
              </p>
            </div>

            {/* Mustafa Kemal Atatürk Saygı Anması */}
            <div className="flex flex-col items-center sm:items-end justify-center gap-0.5 select-none" title="Mustafa Kemal Atatürk (1881-193∞)">
              <span className="font-editorial text-sm font-bold tracking-[0.2em] text-zinc-300">1881-193∞</span>
              <span className="text-[11px] text-zinc-500 tracking-wider">Saygı ve minnetle...</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
