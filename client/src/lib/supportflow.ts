/**
 * SupportFlow integration: pre-sales support portal + editable pricing packages.
 * Override with VITE_SUPPORTFLOW_URL / VITE_SUPPORTFLOW_WORKSPACE at build time.
 */
import { useEffect, useState } from "react";
import { Crown, Flame, Gem, Gift, Rocket, Server, Shield, Sparkles, Star, Zap } from "lucide-react";

export const SUPPORTFLOW_URL = (import.meta.env.VITE_SUPPORTFLOW_URL as string | undefined) ?? "https://supportflow-two-ashy.vercel.app";
export const SUPPORTFLOW_WORKSPACE = (import.meta.env.VITE_SUPPORTFLOW_WORKSPACE as string | undefined) ?? "gokturk-inc";

/** Customer support panel (portal): where existing customers follow their requests. */
export const PORTAL_URL = `${SUPPORTFLOW_URL}/portal/${SUPPORTFLOW_WORKSPACE}`;
/** Pre-sales: bottom-right button on every page. */
export const PRESALES_URL = `${PORTAL_URL}/tickets/new?type=pre`;
/** Post-sales: contact section, for customers who already bought. */
export const POSTSALES_URL = `${PORTAL_URL}/tickets/new?type=post`;

const API = `${SUPPORTFLOW_URL}/api/public/${SUPPORTFLOW_WORKSPACE}`;

export const PACKAGE_ICONS = { gift: Gift, zap: Zap, flame: Flame, crown: Crown, star: Star, rocket: Rocket, shield: Shield, server: Server, sparkles: Sparkles, gem: Gem } as const;
export type PackageIcon = keyof typeof PACKAGE_ICONS;

export type SitePackage = {
  key: string;
  name: string;
  badge: string | null;
  description: string;
  price: string;
  period: string;
  color: string;
  icon: PackageIcon;
  features: string[];
  orderText: string;
  highlight: boolean;
  isVisible: boolean;
};

/** Shown until the API answers, and whenever it can't be reached. */
export const DEFAULT_PACKAGES: SitePackage[] = [
  { key: "baslangic", icon: "gift", badge: "Ücretsiz", name: "Başlangıç (Topluluk)", price: "0", period: "ömür boyu", color: "#10B981", highlight: false, isVisible: true,
    description: "Discord topluluğunuza profesyonel bir ilk adım. Temel komutlar ve hazır modüller.",
    features: ["En az 30–35 üye şartı","Duyuru kanalında duyurma zorunluluğu","Temel komutlar & karşılama","3 + 1 modül hakkı","7/24 Göktürk Labs VDS","'By Göktürk Labs' ibaresi zorunlu"],
    orderText: "Merhaba, Göktürk Labs Başlangıç (Ücretsiz) paketini talep etmek istiyorum." },
  { key: "dengeli", icon: "zap", badge: "Fiyat / Performans", name: "Dengeli", price: "50", period: "aylık", color: "#38BDF8", highlight: false, isVisible: true,
    description: "Gelişmiş moderasyon, loglama ve 5 modül kapasitesiyle sunucunuzun güvenliği tam kontrol.",
    features: ["Başlangıç paketindeki özellikler","5 modül tanımlama hakkı","Gelişmiş moderasyon & log","Bot ismi & logo özelleştirme","7/24 Kesintisiz VDS","'Powered by' bağlantısı"],
    orderText: "Merhaba, Göktürk Labs Dengeli (₺50/ay) paketini satın almak istiyorum." },
  { key: "gelismis", icon: "flame", badge: "En Çok Tercih Edilen", name: "Gelişmiş (Custom)", price: "150", period: "aylık", color: "#7C3AED", highlight: true, isVisible: true,
    description: "Özel ticket motoru, sunucuya özel komutlar ve 7/24 izole VDS barındırma.",
    features: ["Dengeli paketindeki özellikler","Sınırsız modül hakkı","Butonlu & kategorili ticket sistemi","Sunucuya özel terzi usulü komutlar","Özel bot kodu müşteriyle paylaşılır","'Powered by' ibaresi kaldırılabilir"],
    orderText: "Merhaba, Göktürk Labs Gelişmiş/Custom (₺150/ay) paketini satın almak istiyorum." },
  { key: "pro", icon: "crown", badge: "Kurumsal Seviye", name: "Pro (Enterprise)", price: "350", period: "aylık", color: "#F59E0B", highlight: false, isVisible: true,
    description: "Şifreli Web Panel, Yetkili Mülakat Masası, HIBP kalkanı ve VIP öncelikli destek.",
    features: ["Şifreli Web Yönetim Paneli (PBKDF2 + HIBP)","Yetkili Başvuru & Mülakat Motoru","Sınırsız modül + yüksek VDS kaynağı","Gelişmiş paketindeki tüm sistemler","Birebir VIP teknik destek","Tüm marka ibareleri kaldırılabilir"],
    orderText: "Merhaba, Göktürk Labs Pro/Enterprise (₺350/ay) paketini satın almak istiyorum." },
];

function normalise(list: unknown): SitePackage[] | null {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list
    .filter((p): p is SitePackage => typeof p?.key === "string" && typeof p?.name === "string")
    .map((p) => ({ ...p, icon: p.icon in PACKAGE_ICONS ? p.icon : "star", features: Array.isArray(p.features) ? p.features : [] }));
}

/** Visible packages for the public site; falls back to DEFAULT_PACKAGES. */
export function usePackages() {
  const [packages, setPackages] = useState<SitePackage[]>(DEFAULT_PACKAGES);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/packages`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const list = normalise(data?.packages)?.filter((p) => p.isVisible);
        if (list?.length) setPackages(list);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  return packages;
}

// ───────────── Admin API ─────────────

export class AdminApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function call<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers },
    });
  } catch {
    throw new AdminApiError("SupportFlow'a ulaşılamadı. İnternet bağlantını kontrol et.", 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new AdminApiError(data?.error ?? `İstek başarısız (${res.status}).`, res.status);
  return data as T;
}

export const adminApi = {
  login: (password: string) => call<{ token: string; expiresAt: number }>("/admin/session", { method: "POST", body: JSON.stringify({ password }) }),
  list: (token: string) => call<{ packages: SitePackage[] }>("/packages", {}, token).then((d) => normalise(d.packages) ?? []),
  save: (token: string, packages: SitePackage[]) =>
    call<{ packages: SitePackage[] }>("/packages", { method: "PUT", body: JSON.stringify({ packages }) }, token).then((d) => normalise(d.packages) ?? []),
};
