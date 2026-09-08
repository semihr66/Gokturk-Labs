/* Göktürk Labs / Signal Harbor: amber signal, quiet dark Discord bot studio, crafted motion and direct Discord flow. */
import { useEffect, useId, useState, type CSSProperties } from "react";
import { ArrowRight, HelpCircle, Package, Blocks as BlocksIcon, LifeBuoy, ArrowUpRight, Blocks, Check, ChevronDown, ClipboardCopy, Code2, Crown, Flame, Headphones, Image as ImageIcon, Layers3, LockKeyhole, Megaphone, MessageCircle, Palette, Play, Settings2, ShieldCheck, Sparkles, SlidersHorizontal, Terminal, WandSparkles, X, Zap } from "lucide-react";

const DISCORD_ORDER_URL = "https://discord.com/users/937079326149595147";
const COMMUNITY_URL = "https://discord.gg/CFrwUThhE";
const LOGO_URL = "/gokturk-labs-logo.png";

const plans = [
  { name: "Başlangıç (Free)", price: "₺0", note: "başlangıç", badge: "🎁 Ücretsiz Başlangıç", badgeType: "free", label: "FREE PLAN · KAMPANYA!", detail: "Temel komutlar ve hazır modüllerle sade bir bot başlangıcı.", performance: "Temel", score: 1, tone: "plain", icon: Terminal, notice: "Zorunlu: Sunucumuzda hakkımızda bir duyuru geçmeniz gerekmektedir (Örn: 'Göktürk Labs Discord botunu kullanıyorum, çok iyi, size de tavsiye ederim' tarzında destekleyici bir mesaj).", features: ["Temel komutlar", "Temel otomasyon özellikleri", "Hazır modüllerle kurulum", "3 + 1 modül hakkı · KAMPANYA!", "Modüllü seçenek: Kod paylaşılmaz, Göktürk Labs sunucusunda çalışır", "İsim/logo/kapak düzenleme yok", "Zorunlu: Sunucu adı/açıklamasında \"— By Göktürk Labs\" + link, ayrıca banner'da da \"Powered by Göktürk Labs\" + link (ikisi de kaldırılamaz)"] },
  { name: "Dengeli", price: "₺50", note: "ay", badge: "⚡ En İyi Fiyat / Performans", badgeType: "fp", label: "DENGELİ · SINIRSIZ MODÜL", detail: "Başlangıç kapsamını moderasyon, loglama ve sınırsız modül çalışma alanıyla büyütür.", performance: "Dengeli", score: 2, tone: "plain", icon: Code2, features: ["Başlangıç paketindeki tüm özellikler", "Sınırsız modül hakkı", "7/24 Kesintisiz VDS barındırma dahil", "Moderasyon ve loglama", "Gelişmiş otomasyon sistemleri", "Modüllü seçenek: Kod paylaşılmaz, Göktürk Labs sunucusunda çalışır", "Custom bot seçeneği yok (Sadece modüllü)", "İsim, logo, kapak görseli düzenleme var", "Açıklama + banner'da zorunlu: \"Powered by Göktürk Labs\" + link (kaldırılamaz)"] },
  { name: "Gelişmiş", price: "₺150", note: "ay", badge: "🔥 En Çok Tercih Edilen", badgeType: "popular", label: "GELİŞMİŞ · SINIRSIZ MODÜL", detail: "Dengeli paketinin üzerine özel komutlar, sınırsız modül desteği ve custom seçeneği eklenir.", performance: "Yüksek", score: 3, tone: "featured", icon: Sparkles, features: ["Dengeli paketindeki tüm özellikler", "Sınırsız modül hakkı", "7/24 Kesintisiz VDS barındırma dahil", "Ticket ve özel komutlar", "Custom seçenek: Kod paylaşılır, sizin veya Göktürk Labs sunucusunda çalışır", "Gelişmiş sunucu sistemleri", "Modüllü seçenek: Kod paylaşılmaz, Göktürk Labs sunucusunda çalışır", "İsim, logo, kapak görseli düzenleme", "\"Powered by\" ibaresi sorunsuz kaldırılabilir"] },
  { name: "Pro", price: "₺350", note: "ay", badge: "👑 Maksimum VIP Seviye", badgeType: "vip", label: "PRO / ÖNCELİKLİ · SINIRSIZ MODÜL", detail: "Gelişmiş kapsamına sınırsız modül, web paneli ve öncelikli destek eklenir.", performance: "Öncelikli", score: 4, tone: "warm", icon: WandSparkles, features: ["Web panel desteği ve öncelikli teknik destek", "Sınırsız modül hakkı", "7/24 Öncelikli VDS barındırma dahil", "Gelişmiş paketindeki tüm özellikler", "Custom seçenek: Kod paylaşılır, sizin veya Göktürk Labs sunucusunda çalışır", "Modüllü seçenek: Kod paylaşılmaz, Göktürk Labs sunucusunda çalışır", "İleri seviye özel sistemler", "İsim, logo, kapak görseli düzenleme", "\"Powered by\" ibaresi sorunsuz kaldırılabilir"] },
];

const faqs = [
  ["Abonelik ve barındırma nasıl işliyor?", "Paketlerimiz aylık periyotta sunulur. Botunuz Göktürk Labs'ın yüksek performanslı VDS sunucularında 7/24 kesintisiz çalışır; ayrıca sunucu almanıza, konsol kurmanıza veya teknik detaylarla uğraşmanıza gerek kalmaz."],
  ["Sipariş nasıl veriliyor?", "Bir paketin butonuna bastığında doğrudan Discord DM kutuma yönlenirsin. Ne istediğini anlatırsın; botu ve süreci ben hazırlarım."],
  ["Bot nasıl özelleştiriliyor?", "Botu hazır modüller üzerinden kuruyoruz. İhtiyacına göre modülleri seçiyor; botun ismini, logosunu, kapak görselini ve gerekli ayarlarını değiştiriyoruz."],
  ["Botu kim hazırlıyor?", "Botun hazırlanması, kodlanması ve kurulum süreci Göktürk Labs tarafından yürütülür. Senden yalnızca istediğin özellikleri anlatman beklenir."],
  ["Bot nerede çalışacak?", "Başlangıç, Dengeli, Gelişmiş ve Pro paketlerin modüllü seçenekleri Göktürk Labs sunucusunda çalışır. Gelişmiş ve Pro paketlerde custom seçeneği kullanılırsa kullanıcı veya Göktürk Labs sunucusu tercih edilebilir."],
  ["Kodlar hangi seçenekte paylaşılır?", "Modüllü seçeneklerde kod paylaşılmaz. Gelişmiş ve Pro paketlerde custom bot seçeneği tercih edildiğinde kod paylaşımı yapılır."],
  ["Web panel desteği hangi pakette var?", "Web panel desteği Pro paketin kapsamına dahildir. Panel ihtiyacını ve görmek istediğin özellikleri sipariş sırasında Discord DM üzerinden konuşabiliriz."],
  ["Kişisel verilerim toplanıyor mu?", "Gereksiz kişisel veri toplamıyoruz. Sipariş veya destek sırasında paylaştığın bilgiler yalnızca hizmeti sunmak ve seninle iletişim kurmak amacıyla kullanılabilir. Detaylar gizlilik politikamızda yer alır."],
];

const extraSystems = [
  { title: "Karşılama akışı", detail: "Yeni üyeler için otomatik mesaj, rol ve yönlendirme sistemi.", icon: MessageCircle, cover: "cover-cyan" },
  { title: "Seviye & XP", detail: "Aktif üyeleri ödüllendiren seviye ve ilerleme düzeni.", icon: Zap, cover: "cover-violet" },
  { title: "Davet takibi", detail: "Sunucuna gelen davetleri ve kaynaklarını takip eden sistem.", icon: ArrowUpRight, cover: "cover-grid" },
  { title: "Çekiliş sistemi", detail: "Katılım, süre ve kazanan akışını kolaylaştıran modül.", icon: Sparkles, cover: "cover-purple" },
  { title: "Destek & talep", detail: "Kullanıcı taleplerini düzenli kanallara ve akışlara ayır.", icon: Headphones, cover: "cover-magenta" },
  { title: "Otomatik rol", detail: "Rolleri belirlediğin kurallara göre otomatik yönlendir.", icon: Settings2, cover: "cover-lines" },
  { title: "Güvenlik & moderasyon", detail: "Sunucunun düzenini koruyan filtre ve kayıt katmanı.", icon: ShieldCheck, cover: "cover-signal" },
];

const customizationSteps = [
  { icon: Blocks, title: "Hazır modüller", text: "İhtiyacına uygun komut, moderasyon, ticket ve otomasyon modüllerini bir araya getiriyoruz." },
  { icon: Palette, title: "Markanı taşı", text: "Botun ismini, logosunu, kapak görselini ve renk hissini istediğin kimliğe göre düzenliyoruz." },
  { icon: SlidersHorizontal, title: "Ayarları incelt", text: "Yanıtları, izinleri, kanalları ve çalışma düzenini sunucunun akışına göre şekillendiriyoruz." },
  { icon: Layers3, title: "Teslim ve destek", text: "Kurulum sonrası seçtiğin pakete göre çalışma düzeni, destek ve Pro web panel sürecini sürdürüyoruz." },
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
              📄 TXT Log
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

    default:
      return null;
  }
}

function DiscordButton({ label = "Discord’dan sipariş ver", plan = "Genel talep", outline = false }: { label?: string; plan?: string; outline?: boolean }) {
  return <a href={DISCORD_ORDER_URL} target="_blank" rel="noreferrer" aria-label={`${plan} için Discord üzerinden sipariş ver`} className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${outline ? "border border-white/15 bg-white/[0.03] text-white hover:border-[#9333ea]/60 hover:bg-white/[0.07]" : "bg-[#9333ea] text-[#17120a] shadow-[0_12px_34px_rgba(255,181,71,0.2)] hover:-translate-y-0.5 hover:bg-[#c084fc]"}`}><MessageCircle className="h-4 w-4" />{label}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>;
}

function DiscordMark({ className = "h-4 w-4" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.54 5.47A16.86 16.86 0 0 0 15.44 4l-.5 1.02a15.6 15.6 0 0 0-5.88 0L8.56 4a16.91 16.91 0 0 0-4.1 1.47C1.86 9.38 1.15 13.2 1.5 16.96A16.93 16.93 0 0 0 6.54 19l1.22-1.67a10.28 10.28 0 0 1-1.9-.92l.46-.35a11.98 11.98 0 0 0 11.36 0l.47.35a10.2 10.2 0 0 1-1.9.92L17.46 19a16.94 16.94 0 0 0 5.04-2.04c.4-4.36-.68-8.15-2.96-11.49ZM8.7 14.7c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Zm6.6 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2.01.99 2 2.2c0 1.21-.89 2.2-2 2.2Z" /></svg>;
}

function CommunityButton({ label = "Topluluk & destek sunucusu" }: { label?: string }) {
  return <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#c084fc] hover:text-white"><DiscordMark className="h-4 w-4" />{label}<ArrowUpRight className="h-4 w-4" /></a>;
}

function FeatureItem({ feature }: { feature: string }) {
  const isExcluded = feature === "İsim/logo/kapak düzenleme yok" || feature === "Kod paylaşımı yok" || feature === "Custom bot seçeneği yok";
  const isMandatory = feature.startsWith("Zorunlu:") || feature.startsWith("Açıklama + banner'da zorunlu:");
  const isWebPanel = feature.includes("Web panel");
  const isUnlimitedModule = feature === "Sınırsız modül hakkı";
  const isCampaign = feature.includes("3 + 1 modül");
  const isCustomCode = feature.includes("Custom seçenek: Kod paylaşılır");
  const isTicket = feature.includes("Ticket ve özel komutlar");

  return (
    <div className={`flex items-start gap-2.5 text-sm transition-all duration-200 ${
      isWebPanel
        ? "rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-purple-900/20 to-transparent p-2.5 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        : isUnlimitedModule
        ? "rounded-lg border border-purple-500/20 bg-purple-500/[0.06] p-1.5 text-purple-100"
        : isExcluded
        ? "text-[#6b6a78]"
        : "text-[#b9b8c4]"
    }`}>
      {isWebPanel ? (
        <Crown className="mt-0.5 h-4 w-4 shrink-0 text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" aria-hidden="true" />
      ) : isUnlimitedModule ? (
        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-purple-300 fill-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]" aria-hidden="true" />
      ) : isCampaign ? (
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
      ) : isCustomCode ? (
        <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
      ) : isTicket ? (
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" aria-hidden="true" />
      ) : isExcluded ? (
        <X className="mt-0.5 h-4 w-4 shrink-0 text-[#6d6c7b]" aria-hidden="true" />
      ) : isMandatory ? (
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#9333ea]" aria-hidden="true" />
      ) : (
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9333ea]" aria-hidden="true" />
      )}

      <div className="flex flex-1 flex-wrap items-center gap-1.5 leading-snug">
        <span className={isWebPanel ? "font-bold text-amber-200" : isUnlimitedModule ? "font-semibold text-white" : ""}>
          {feature}
        </span>
        {isWebPanel && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-400/25 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]">
            <Crown className="h-3 w-3 text-amber-300 fill-amber-300" /> KRAL ÖZELLİĞİ
          </span>
        )}
        {isUnlimitedModule && (
          <span className="inline-flex items-center gap-0.5 rounded-full border border-purple-400/40 bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-purple-200">
            ⚡ SINIRSIZ
          </span>
        )}
        {isCustomCode && (
          <span className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-400/15 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">
            AÇIK KAYNAK
          </span>
        )}
        {isCampaign && (
          <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
            HEDİYE
          </span>
        )}
      </div>
    </div>
  );
}

function PlanOrder({ plan }: { plan: (typeof plans)[number] }) {
  const consentId = useId();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [copied, setCopied] = useState(false);
  const orderMessage = plan.price === "₺0" 
    ? `Merhaba, ${plan.name} ücretsiz paketi için başvurmak istiyorum.` 
    : `Merhaba, ${plan.name} (${plan.price}/ay) paketi için sipariş vermek istiyorum.`;
  const canOrder = termsAccepted && privacyAcknowledged;

  const handleOrder = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(orderMessage).then(() => setCopied(true)).catch(() => setCopied(false));
    }
    window.open(DISCORD_ORDER_URL, "_blank", "noopener,noreferrer");
  };

  return <div className="plan-order-block">
    <div className="plan-consent">
      <input id={`${consentId}-terms`} type="checkbox" checked={termsAccepted} onChange={event => setTermsAccepted(event.target.checked)} />
      <div><label htmlFor={`${consentId}-terms`}>Hizmet Şartları’nı okudum ve kabul ediyorum.</label><a className="plan-consent-link" href="/hizmet-sartlari">Metni görüntüle</a></div>
    </div>
    <div className="plan-consent">
      <input id={`${consentId}-privacy`} type="checkbox" checked={privacyAcknowledged} onChange={event => setPrivacyAcknowledged(event.target.checked)} />
      <div><label htmlFor={`${consentId}-privacy`}>Gizlilik Politikası’nı okudum ve bilgilendirildim.</label><a className="plan-consent-link" href="/gizlilik-politikasi">Metni görüntüle</a></div>
    </div>
    <button type="button" disabled={!canOrder} onClick={handleOrder} className="plan-order-button"><MessageCircle className="h-4 w-4" /> Discord’dan sipariş ver <ArrowUpRight className="h-4 w-4" /></button>
    <p className="plan-payment-note">Ödeme ve sipariş ayrıntıları Discord DM’de netleştirilir; web sitesinde ödeme alınmaz. Butona bastığında seçtiğin paket için hazır mesaj panoya kopyalanır.</p>
    {copied && <p className="plan-copy-status" role="status"><ClipboardCopy className="h-3.5 w-3.5" /> Hazır sipariş mesajı kopyalandı.</p>}
  </div>;
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const Icon = plan.icon;
  const isVip = plan.badgeType === "vip";
  const isPopular = plan.badgeType === "popular";
  const isFp = plan.badgeType === "fp";
  const isFree = plan.badgeType === "free";

  return (
    <article className={`new-plan-card relative flex flex-col ${isPopular ? "new-plan-card-featured" : ""} ${isVip ? "new-plan-card-warm" : ""}`}>
      {plan.badge && (
        <div className={`plan-badge-tag ${
          isVip 
            ? "plan-badge-vip" 
            : isPopular 
            ? "plan-badge-popular" 
            : isFp 
            ? "plan-badge-fp" 
            : "plan-badge-free"
        }`}>
          {isVip && <Crown className="h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-bounce" />}
          {isPopular && <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-pulse" />}
          {isFp && <Zap className="h-3.5 w-3.5 text-purple-300 fill-purple-300" />}
          {isFree && <Sparkles className="h-3.5 w-3.5 text-emerald-300" />}
          <span>{plan.badge}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="new-plan-label">{plan.label}</span>
        <Icon className={`h-5 w-5 ${isVip ? "text-amber-400" : "text-[#9333ea]"}`} />
      </div>
      <h3>{plan.name}</h3>
      <p className="new-plan-detail">{plan.detail}</p>
      <div className="new-plan-price">
        <strong>{plan.price}</strong>
        <span>/ {plan.note}</span>
      </div>
      <div className="plan-performance">
        <div>
          <span>Performans</span>
          <strong>{plan.performance}</strong>
        </div>
        <div className="performance-meter">
          {[1, 2, 3, 4].map(level => (
            <span key={level} className={level <= plan.score ? "is-on" : ""} />
          ))}
        </div>
      </div>
      <div className="new-plan-line" />
      <div className="space-y-2.5">
        {plan.features.map(feature => (
          <FeatureItem feature={feature} key={feature} />
        ))}
      </div>
      {plan.notice && (
        <div className="plan-mandatory-notice">
          <Megaphone className="h-4 w-4 shrink-0 text-[#9333ea]" />
          <div>
            <strong>Zorunlu sunucu duyurusu</strong>
            <p>{plan.notice}</p>
          </div>
        </div>
      )}
      <PlanOrder plan={plan} />
    </article>
  );
}

type Burst = { id: number; x: number; y: number; symbol: string; angle: number; distance: number; delay: number };
function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  useEffect(() => {
    let sequence = 0;
    const symbols = ["?", "✦", "+", "◌", "↗"];
    const handlePointerDown = (event: PointerEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const created = Array.from({ length: 5 }, (_, index) => ({ id: Date.now() + sequence++, x: event.clientX, y: event.clientY, symbol: symbols[(sequence + index) % symbols.length], angle: index * 72 - 25, distance: 30 + (index % 2) * 18, delay: index * 18 }));
      setBursts(current => [...current.slice(-20), ...created]);
      window.setTimeout(() => setBursts(current => current.filter(item => !created.some(newItem => newItem.id === item.id))), 850);
    };
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);
  return <div className="click-burst-layer" aria-hidden="true">{bursts.map(burst => <span key={burst.id} className="click-burst-particle" style={{ left: burst.x, top: burst.y, "--burst-angle": `${burst.angle}deg`, "--burst-distance": `${burst.distance}px`, "--burst-delay": `${burst.delay}ms` } as CSSProperties}>{burst.symbol}</span>)}</div>;
}


const playSound = (type: 'hover' | 'click') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {}
};
export default function Home() {

  useEffect(() => {
    let lastHoverTime = 0;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        const now = Date.now();
        if (now - lastHoverTime > 50) {
          playSound('hover');
          lastHoverTime = now;
        }
      }
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('details')) {
        playSound('click');
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".motion-reveal"));
    if (!("IntersectionObserver" in window)) { elements.forEach(element => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="new-site min-h-screen overflow-x-hidden bg-[#08080b] text-[#f7f7fb]"><ClickBurst /><header className="new-nav"><div className="new-nav-inner"><a href="#top" className="flex items-center gap-3" aria-label="Göktürk Labs ana sayfa"><img src={LOGO_URL} alt="Göktürk Labs logosu" className="h-8 w-8 object-contain" /><span className="font-display text-[15px] font-semibold tracking-[-0.02em]">Göktürk <span className="text-[#9333ea]">Labs</span></span></a><nav className="hidden items-center gap-7 text-[13px] text-[#aaa9b5] md:flex"><a href="#nasil">Nasıl çalışır?</a><a href="#moduller">Modüller</a><a href="#paketler">Paketler</a><a href="#sss">SSS</a><a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="community-nav-cta"><DiscordMark className="h-4 w-4" /><span>Topluluk &amp; destek</span><ArrowUpRight className="h-4 w-4" /></a></nav></div></header>
    <section id="top" className="new-hero"><div className="hero-glow hero-glow-violet" /><div className="hero-glow hero-glow-blue" /><div className="hero-grid" /><div className="motion-hero-copy relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-32 sm:pt-40"><div className="new-badge"><span className="new-badge-dot" /> GÖKTÜRK LABS / DISCORD BOT <span className="new-badge-divider" /> <span className="new-badge-link">Fikrini anlat <ArrowRight className="h-3.5 w-3.5" /></span></div><h1 className="mt-8 font-display text-5xl font-medium leading-[1.02] tracking-[-0.075em] text-white sm:text-7xl lg:text-[88px]">Botun sürekli<br /><span className="hero-gradient-text">çalışsın.</span></h1><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#a5a4b0] sm:text-lg">Botunu güvenilir bir çalışma düzenine al. İhtiyacını Discord’da anlat; paketi seçelim, botun seçtiğin sunucuda gece gündüz çalışsın ve desteği yanında olsun.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><a href="#paketler" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#9333ea] px-5 text-sm font-semibold text-[#17120a] shadow-[0_12px_34px_rgba(255,181,71,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c084fc]"><span>Paketini seç</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a><a href="#nasil" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 px-5 text-sm font-semibold text-white hover:bg-white/[0.05]"><Play className="h-4 w-4 fill-current" /> Nasıl çalışır?</a></div><div className="mt-6 flex justify-center"><CommunityButton label="Topluluk & destek sunucusuna kat" /></div><div className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[#777682]"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#9333ea]" /> Fikrin sende</span><span className="inline-flex items-center gap-2"><Code2 className="h-4 w-4 text-[#9333ea]" /> Üretim bizde</span><span className="inline-flex items-center gap-2"><Headphones className="h-4 w-4 text-[#9333ea]" /> Destek yanında</span></div><aside className="hero-console" aria-label="Bot çalışma durumu"><div className="hero-console-top"><span><i /> ÇALIŞMA İSTASYONU</span><small>LIVE / 24—7</small></div><div className="hero-console-main"><div className="hero-console-orbit"><div className="hero-console-core"><span>GL</span></div></div><div className="hero-console-copy"><strong>Göktürk Labs</strong><span>Bot çalışma hattı</span></div></div><div className="hero-console-stats"><div><small>Durum</small><strong><i /> Çevrimiçi</strong></div><div><small>İşlem</small><strong>Hazır modüller</strong></div><div><small>Destek</small><strong>Discord DM</strong></div></div><div className="hero-console-line"><span /><span /></div></aside></div></section>
    <section id="nasil" className="new-section"><div className="mx-auto max-w-7xl px-5"><div className="section-kicker motion-reveal">NASIL ÇALIŞIR?</div><div className="new-section-heading motion-reveal"><h2>Paketini seç.<br /><span>Botun çalışsın.</span></h2><p>Uzun formlar ve karmaşık paneller yok. Discord’dan ne istediğini anlat; doğru paketi seçip botunun çalışma düzenini birlikte netleştirelim.</p></div><div className="step-grid motion-reveal"><div className="step-card"><span>01</span><h3>Fikrini anlat</h3><p>Botunun ne yapmasını istediğini, komutlarını ve özel beklentilerini Discord DM’de paylaş.</p><div className="step-foot"><MessageCircle className="h-4 w-4" /><small>İhtiyacını dinleyelim</small></div></div><div className="step-card"><span>02</span><h3>Biz hazırlayalım</h3><p>Hazır modülleri birleştirir, botunun kimliğini ve ayarlarını senin fikrine göre düzenleriz.</p><div className="step-foot"><Code2 className="h-4 w-4" /><small>İhtiyacına göre üretelim</small></div></div><div className="step-card"><span>03</span><h3>Birlikte ilerleyelim</h3><p>Kurulum sonrası teknik destek ve Pro pakette web panel süreci için yine aynı DM akışındayız.</p><div className="step-foot"><Headphones className="h-4 w-4" /><small>Yanında kalalım</small></div></div></div></div></section>
    <section className="customization-section"><div className="mx-auto max-w-7xl px-5"><div className="customization-heading motion-reveal"><div><div className="section-kicker flex items-center gap-2"><Settings2 className="h-4 w-4" /> BOT ATÖLYESİ</div><h2>Çalışma alanını kur.<br /><span>Kimliğini sen belirle.</span></h2></div><p>Botunun çalışma düzenini, görünümünü ve sunucu akışını tek bir sakin sistemde birleştiriyoruz.</p></div><div className="customization-grid">{customizationSteps.map(({ icon: Icon, title, text }, index) => <article className="customization-card motion-reveal" style={{ "--stagger": `${index * 70}ms` } as CSSProperties} key={title}><div className="customization-icon"><Icon className="h-5 w-5" /></div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="customization-note motion-reveal"><div className="customization-note-icon"><ImageIcon className="h-5 w-5" /></div><p><strong>İsim, logo ve kapak görseli değişir.</strong> Botun yalnızca çalışan bir araç değil, sunucunun kendi yüzü gibi hissetsin.</p><Settings2 className="hidden h-5 w-5 text-[#9333ea] sm:block" /></div></div></section>
    <section id="moduller" className="extra-systems-section"><div className="mx-auto max-w-7xl px-5"><div className="extra-systems-heading motion-reveal"><div><div className="section-kicker flex items-center gap-2"><BlocksIcon className="h-4 w-4" /> MODÜLLER</div><h2>Custom ve<br /><span>modüllü seçenekler.</span></h2></div><p>Gelişmiş paketinden sonra custom bot ile daha özel bir çalışma düzenine geçebilirsin. İhtiyacına göre modülleri, akışları ve sunucu araçlarını birlikte netleştiririz.</p></div><div className="extra-systems-grid">{extraSystems.map(({ title, detail, cover }, index) => <article className={`extra-system-card motion-reveal ${cover}`} style={{ "--stagger": `${index * 45}ms` } as CSSProperties} key={title}><div className="extra-system-cover"><ModuleCover index={index} /></div><div className="extra-system-meta"><span><i /> 0{index + 1}</span><span>EK MODÜL</span></div><h3>{title}</h3><p>{detail}</p></article>)}</div><div className="extra-systems-cta motion-reveal"><div><strong>İhtiyacın olan modül listede yok mu?</strong><span>Discord’da anlat, birlikte yeni bir modül akışı tasarlayalım.</span></div><DiscordButton label="Modül sor" plan="Modül talebi" outline /></div></div></section>
    <section id="paketler" className="new-section new-section-pricing"><div className="mx-auto max-w-7xl px-5"><div className="section-kicker motion-reveal flex items-center gap-2"><Package className="h-4 w-4" /> PAKETLER</div><div className="new-section-heading motion-reveal"><h2>Botuna uygun<br /><span>bir çalışma seviyesi.</span></h2><p>Paketlerimiz aylık barındırma dahil sunulur; botun Göktürk Labs sunucularında gece gündüz kesintisiz çalışır. Ayrı VDS masrafıyla veya sunucu kurulumuyla uğraşmazsın.</p></div><div className="new-plans-grid motion-reveal">{plans.map(plan => <PlanCard key={plan.name} plan={plan} />)}</div><p className="legal-order-note">Sipariş başlatmak için ilgili paketin altındaki onay kutusunu işaretlemen gerekir. Ödeme ve son kapsam Discord DM’de netleştirilir.</p></div></section>
    <section id="sss" className="new-section new-faq"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div className="motion-reveal"><div className="section-kicker flex items-center gap-2"><HelpCircle className="h-4 w-4" /> SSS</div><h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">Aklındaki sorulara<br /><span className="hero-gradient-text">net cevaplar.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#9897a4]">Bulamadığın bir detay varsa, doğrudan Discord’dan yaz. En doğru cevabı birlikte buluruz.</p><div className="mt-8"><DiscordButton label="Discord’dan sor" plan="SSS destek" outline /></div></div><div className="faq-list motion-reveal">{faqs.map(([question, answer]) => <details className="new-faq-item" key={question}><summary>{question}<ChevronDown className="h-4 w-4 text-[#9333ea]" /></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="destek" className="new-support"><div className="support-inner motion-reveal"><div><div className="section-kicker flex items-center gap-2"><LifeBuoy className="h-4 w-4" /> TEKNİK DESTEK</div><h2>Botun hazırsa,<br /><span>ilk mesajı atalım.</span></h2><p>Bot fikrini anlatman yeterli. Paket seçemiyorsan da sorun değil; Discord’da birlikte netleştiririz.</p></div><div className="support-action"><img src={LOGO_URL} alt="" className="h-12 w-12 object-contain" /><div><strong>Göktürk Labs</strong><small>Discord DM kanalı açık</small></div><DiscordButton label="Teknik destek al" plan="Teknik destek" /></div></div></section>
    <footer className="border-t border-white/5 bg-[#08080b] py-12 mt-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center">
        <a href="#top" className="flex items-center gap-3 text-[#f0eef6] transition-colors hover:text-white">
          <img src={LOGO_URL} alt="Göktürk Labs" className="h-8 w-8 object-contain" />
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">Göktürk Labs - Discord Yazılım Çözümleri</span>
        </a>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] text-[#8f8e9c]">
          <a href="#nasil" className="transition-colors hover:text-white">Hakkımızda</a>
          <a href={DISCORD_ORDER_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Bize Ulaşın</a>
          <a href="/gizlilik-politikasi" className="transition-colors hover:text-white">Gizlilik Politikası</a>
          <a href="/hizmet-sartlari" className="transition-colors hover:text-white">Şartlar &amp; Koşullar</a>
          <a href="/sitemap.xml" target="_blank" className="transition-colors hover:text-white">XML Sitemap</a>
        </div>
        <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#5865F2]/10 px-5 py-2 text-[13px] font-medium text-[#5865F2] transition-colors hover:bg-[#5865F2]/20">
          <DiscordMark className="h-4 w-4" /> Resmi Discord Sunucumuza Katılın
        </a>
        <div className="my-1 flex flex-col items-center justify-center gap-1 text-center select-none" aria-label="Mustafa Kemal Atatürk'ü anma" title="Mustafa Kemal Atatürk (1881-193∞)">
          <span className="font-display text-[16px] font-semibold tracking-[0.25em] text-[#e2e8f0]">1881-193∞</span>
          <span className="text-[12px] font-medium tracking-[0.08em] text-[#8f8e9c]">Saygı ve minnetle...</span>
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[12px] text-[#777682] sm:flex-row">
          <p>© 2026 Göktürk Labs. Tüm hakları saklıdır. Geliştirici: <span className="text-[#9333ea] font-medium">semihr66</span></p>
        </div>
      </div>
    </footer>
  </main>;
}
