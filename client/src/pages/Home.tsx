/* Göktürk Labs / Signal Harbor: quiet dark hosting studio, amber signal, direct Discord flow. */
import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Code2, Headphones, MessageCircle, Play, ShieldCheck, Sparkles, Terminal, Zap } from "lucide-react";

const DISCORD_ORDER_URL = "https://discord.com/users/937079326149595147";
const COMMUNITY_URL = "https://discord.gg/CFrwUThhE";
const LOGO_URL = "/gokturk-labs-logo.png";

const plans = [
  { name: "Başlangıç", price: "₺0", note: "başlangıç", label: "FREE PLAN", detail: "Küçük topluluklar için temel Discord botu. Temel komutlar ve temel otomasyon özellikleri.", performance: "Temel", score: 1, tone: "plain", icon: Terminal, features: ["Temel komutlar", "Temel otomasyon özellikleri", "Kullanıcının kendi sunucusunda çalışma"] },
  { name: "Dengeli", price: "₺50", note: "tek sefer", label: "DENGELİ", detail: "Başlangıç paketindeki tüm özellikler + moderasyon, loglama ve gelişmiş otomasyon sistemleri.", performance: "Dengeli", score: 2, tone: "plain", icon: Code2, features: ["Başlangıç paketindeki tüm özellikler", "Moderasyon ve loglama", "Gelişmiş otomasyon sistemleri", "Kullanıcının veya Göktürk Labs sunucusunun seçimi"] },
  { name: "Gelişmiş", price: "₺150", note: "tek sefer", label: "EN ÇOK TERCİH EDİLEN", detail: "Dengeli paketindeki tüm özellikler + ticket, özel komutlar, gelişmiş sunucu sistemleri ve daha fazla özelleştirme.", performance: "Yüksek", score: 3, tone: "featured", icon: Sparkles, features: ["Dengeli paketindeki tüm özellikler", "Ticket ve özel komutlar", "Gelişmiş sunucu sistemleri", "Kullanıcının veya Göktürk Labs sunucusunun seçimi"] },
  { name: "Pro", price: "₺350", note: "tek sefer", label: "ÖZEL ÇÖZÜM", detail: "Gelişmiş paketindeki tüm özellikler + müşteriye özel bot geliştirme, özel sistemler, kapsamlı özelleştirme ve öncelikli destek.", performance: "Öncelikli", score: 4, tone: "warm", icon: Zap, features: ["Gelişmiş paketindeki tüm özellikler", "Müşteriye özel bot geliştirme", "Özel sistemler ve kapsamlı özelleştirme", "Öncelikli teknik destek"] },
];

const faqs = [
  ["Sipariş nasıl veriliyor?", "Bir paketin butonuna bastığında doğrudan Discord DM kutuma yönlenirsin. Ne istediğini anlatırsın; botu ve süreci ben hazırlarım."],
  ["Botu kim hazırlıyor?", "Botun hazırlanması, kodlanması ve kurulum süreci Göktürk Labs tarafından yürütülür. Senden yalnızca istediğin özellikleri anlatman beklenir."],
  ["Bot nerede çalışacak?", "Başlangıç planında bot kullanıcının kendi sunucusunda çalışır. Dengeli, Gelişmiş ve Pro planlarda kullanıcı kendi sunucusunu veya Göktürk Labs sunucusunu seçebilir."],
  ["Paket seçemezsem ne olacak?", "Sorun değil. Discord üzerinden fikrini ve istediğin özellikleri anlat; uygun planı birlikte belirleriz."],
  ["Teknik destek alabilir miyim?", "Evet. Kurulum, çalışma ve hizmet kapsamı hakkında teknik destek Discord DM üzerinden verilir."],
];

function DiscordButton({ label = "Discord’dan sipariş ver", plan = "Genel talep", outline = false }: { label?: string; plan?: string; outline?: boolean }) {
  return <a href={DISCORD_ORDER_URL} target="_blank" rel="noreferrer" aria-label={`${plan} için Discord üzerinden sipariş ver`} className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${outline ? "border border-white/15 bg-white/[0.03] text-white hover:border-[#ffb547]/60 hover:bg-white/[0.07]" : "bg-white text-[#101014] shadow-[0_10px_30px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:bg-[#eeeef5]"}`}><MessageCircle className="h-4 w-4" />{label}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>;
}

function DiscordMark({ className = "h-4 w-4" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.54 5.47A16.86 16.86 0 0 0 15.44 4l-.5 1.02a15.6 15.6 0 0 0-5.88 0L8.56 4a16.91 16.91 0 0 0-4.1 1.47C1.86 9.38 1.15 13.2 1.5 16.96A16.93 16.93 0 0 0 6.54 19l1.22-1.67a10.28 10.28 0 0 1-1.9-.92l.46-.35a11.98 11.98 0 0 0 11.36 0l.47.35a10.2 10.2 0 0 1-1.9.92L17.46 19a16.94 16.94 0 0 0 5.04-2.04c.4-4.36-.68-8.15-2.96-11.49ZM8.7 14.7c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Zm6.6 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Z" /></svg>;
}

function CommunityButton({ label = "Topluluk & destek sunucusu" }: { label?: string }) {
  return <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#c7baf6] hover:text-white"><DiscordMark className="h-4 w-4" />{label}<ArrowUpRight className="h-4 w-4" /></a>;
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const Icon = plan.icon;
  return <article className={`new-plan-card ${plan.tone === "featured" ? "new-plan-card-featured" : ""} ${plan.tone === "warm" ? "new-plan-card-warm" : ""}`}>
    <div className="flex items-center justify-between"><span className="new-plan-label">{plan.label}</span><Icon className="h-5 w-5 text-[#ffb547]" /></div>
    <h3>{plan.name}</h3><p className="new-plan-detail">{plan.detail}</p>
    <div className="new-plan-price"><strong>{plan.price}</strong><span>/ {plan.note}</span></div>
    <div className="plan-performance"><div><span>Performans</span><strong>{plan.performance}</strong></div><div className="performance-meter">{[1, 2, 3, 4].map(level => <span key={level} className={level <= plan.score ? "is-on" : ""} />)}</div></div>
    <div className="new-plan-line" />
    <div className="space-y-3">{plan.features.map(feature => <div className="flex items-start gap-2.5 text-sm text-[#b9b8c4]" key={feature}><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb547]" /> <span>{feature}</span></div>)}</div>
    <div className="mt-8"><DiscordButton plan={plan.name} label="Sipariş ver" /></div>
  </article>;
}

export default function Home() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".motion-reveal"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="new-site min-h-screen overflow-x-hidden bg-[#08080b] text-[#f7f7fb]">
    <header className="new-nav"><div className="new-nav-inner"><a href="#top" className="flex items-center gap-3" aria-label="Göktürk Labs ana sayfa"><img src={LOGO_URL} alt="Göktürk Labs logosu" className="h-8 w-8 object-contain" /><span className="font-display text-[15px] font-semibold tracking-[-0.02em]">Göktürk <span className="text-[#ffb547]">Labs</span></span></a><nav className="hidden items-center gap-7 text-[13px] text-[#aaa9b5] md:flex"><a href="#nasil" className="hover:text-white">Nasıl çalışır?</a><a href="#paketler" className="hover:text-white">Paketler</a><a href="#sss" className="hover:text-white">SSS</a><a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="community-nav-cta"><DiscordMark className="h-4 w-4" /><span>Topluluk &amp; destek</span><ArrowUpRight className="h-4 w-4" /></a></nav></div></header>

    <section id="top" className="new-hero"><div className="hero-glow hero-glow-violet" /><div className="hero-glow hero-glow-blue" /><div className="hero-grid" /><div className="motion-hero-copy relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-32 text-center sm:pt-40"><div className="new-badge"><span className="new-badge-dot" /> Göktürk Labs ile çalıştır <span className="new-badge-divider" /> <span className="new-badge-link">Discord’dan başla <ArrowRight className="h-3.5 w-3.5" /></span></div><h1 className="mt-8 font-display text-5xl font-medium leading-[1.02] tracking-[-0.075em] text-white sm:text-7xl lg:text-[88px]">Botun için<br /><span className="hero-gradient-text">sakin bir gece vardiyası.</span></h1><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#a5a4b0] sm:text-lg">Fikrini ve istediğin özellikleri Discord’da anlat. Paketi birlikte seçelim; botun seçtiğin sunucuda çalışsın, teknik desteğin yanında olsun.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><DiscordButton label="Botunu sipariş et" plan="Genel bot siparişi" /><a href="#nasil" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 px-5 text-sm font-semibold text-white hover:bg-white/[0.05]"><Play className="h-4 w-4 fill-current" /> Nasıl çalışır?</a></div><div className="mt-6 flex justify-center"><CommunityButton label="Topluluk & destek sunucusuna katıl" /></div><div className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[#777682]"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#ffb547]" /> Fikrin sende</span><span className="inline-flex items-center gap-2"><Code2 className="h-4 w-4 text-[#ffb547]" /> Üretim bizde</span><span className="inline-flex items-center gap-2"><Headphones className="h-4 w-4 text-[#ffb547]" /> Destek yanında</span></div></div></section>

    

    <section id="nasil" className="new-section"><div className="mx-auto max-w-6xl px-5"><div className="section-kicker motion-reveal">NASIL ÇALIŞIR?</div><div className="new-section-heading motion-reveal"><h2>Paketini seç.<br /><span>Botun çalışsın.</span></h2><p>Uzun formlar ve karmaşık paneller yok. Discord’dan ne istediğini anlat; doğru paketi seçip botunun çalışma düzenini birlikte netleştirelim.</p></div><div className="step-grid motion-reveal"><div className="step-card"><span>01</span><h3>Fikrini anlat</h3><p>Botunun ne yapmasını istediğini, komutlarını ve özel beklentilerini Discord DM’de paylaş.</p><div className="step-foot"><MessageCircle className="h-4 w-4" /><small>İhtiyacını dinleyelim</small></div></div><div className="step-card"><span>02</span><h3>Biz hazırlayalım</h3><p>Anlattığın ihtiyaçlara göre botu biz geliştirir, kurar ve seçtiğin sunucuda çalıştırırız.</p><div className="step-foot"><Code2 className="h-4 w-4" /><small>İhtiyacına göre üretelim</small></div></div><div className="step-card"><span>03</span><h3>Birlikte ilerleyelim</h3><p>Kurulum sonrası teknik destek ve yeni istekler için yine aynı DM akışındayız.</p><div className="step-foot"><Headphones className="h-4 w-4" /><small>Yanında kalalım</small></div></div></div></div></section>

    <section id="paketler" className="new-section new-section-pricing"><div className="mx-auto max-w-6xl px-5"><div className="section-kicker motion-reveal">PAKETLER</div><div className="new-section-heading motion-reveal"><h2>Botuna uygun<br /><span>bir çalışma seviyesi.</span></h2><p>Başlangıç’tan Pro’ya doğru kapsam ve performans seviyesi yükselir. İhtiyacını anlat; paketini ve çalışma yerini birlikte netleştirelim.</p></div><div className="new-plans-grid motion-reveal">{plans.map(plan => <PlanCard key={plan.name} plan={plan} />)}</div></div></section>

    <section id="sss" className="new-section new-faq"><div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div className="motion-reveal"><div className="section-kicker">SSS</div><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">Aklındaki sorulara<br /><span className="hero-gradient-text">net cevaplar.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#9897a4]">Bulamadığın bir detay varsa, doğrudan Discord’dan yaz. En doğru cevabı birlikte buluruz.</p><div className="mt-8"><DiscordButton label="Discord’dan sor" plan="SSS destek" outline /></div></div><div className="faq-list motion-reveal">{faqs.map(([question, answer]) => <details className="new-faq-item" key={question}><summary>{question}<ChevronDown className="h-4 w-4 text-[#ffb547]" /></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="destek" className="new-support"><div className="support-inner motion-reveal"><div><div className="section-kicker">TEKNİK DESTEK</div><h2>Botun hazırsa,<br /><span>ilk mesajı atalım.</span></h2><p>Bot fikrini anlatman yeterli. Paket seçemiyorsan da sorun değil; Discord’da birlikte netleştiririz.</p></div><div className="support-action"><img src={LOGO_URL} alt="" className="h-12 w-12 object-contain" /><div><strong>Göktürk Labs</strong><small>Discord DM kanalı açık</small></div><DiscordButton label="Teknik destek al" plan="Teknik destek" /></div></div></section>

    <footer className="new-footer"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between"><a href="#top" className="flex items-center gap-2 text-sm text-[#d5d4dc]"><img src={LOGO_URL} alt="" className="h-7 w-7 object-contain" /> Göktürk Labs</a><div className="flex flex-wrap gap-5 text-xs text-[#777682]"><a href="#nasil" className="hover:text-white">Nasıl çalışır?</a><a href="#paketler" className="hover:text-white">Paketler</a><a href="#sss" className="hover:text-white">SSS</a><a href={DISCORD_ORDER_URL} target="_blank" rel="noreferrer" className="text-[#c9c7d4] hover:text-white">Sipariş için DM <ArrowUpRight className="ml-1 inline h-3 w-3" /></a><a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="text-[#c9c7d4] hover:text-white">Topluluk &amp; destek <ArrowUpRight className="ml-1 inline h-3 w-3" /></a></div></div></footer>
  </main>;
}
