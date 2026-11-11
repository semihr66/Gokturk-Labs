import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowDown, ArrowLeft, ArrowUp, Check, Eye, EyeOff, LogOut, Lock, Plus, Save, Star, Trash2 } from "lucide-react";
import Footer from "../components/Footer";
import { AdminApiError, adminApi, PACKAGE_ICONS, type PackageIcon, type SitePackage } from "../lib/supportflow";

const P = "#7C3AED";
const BG = "#000000";
const SUB = "#94A3B8";
const MUT = "#64748B";
const BORDER = "rgba(255,255,255,0.09)";
const FONT = "'Space Grotesk','Plus Jakarta Sans','Inter',sans-serif";
const TOKEN_KEY = "gtl-admin-token";

const input: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 10,
  padding: "0.6rem 0.75rem", color: "#fff", fontSize: "0.86rem", fontFamily: FONT, outline: "none",
};

type Draft = SitePackage & { featuresText: string };
const toDraft = (p: SitePackage): Draft => ({ ...p, featuresText: p.features.join("\n") });
const fromDraft = ({ featuresText, ...p }: Draft): SitePackage => ({
  ...p,
  badge: p.badge?.trim() ? p.badge.trim() : null,
  features: featuresText.split("\n").map((f) => f.trim()).filter(Boolean),
});

function newPackage(index: number): Draft {
  return toDraft({
    key: `paket-${index + 1}`, name: "Yeni paket", badge: null, description: "Kısa açıklama", price: "0", period: "aylık",
    color: "#38BDF8", icon: "star", features: ["Özellik 1"], orderText: "Merhaba, Göktürk Labs paketini satın almak istiyorum.",
    highlight: false, isVisible: true,
  });
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [drafts, setDrafts] = useState<Draft[] | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    document.title = "Yönetici paneli · Göktürk Labs";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  function signOut(message?: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setDrafts(null);
    setDirty(false);
    if (message) setStatus({ kind: "error", text: message });
  }

  function handleError(error: unknown) {
    if (error instanceof AdminApiError && error.status === 401) signOut("Oturumun sona erdi, tekrar giriş yap.");
    else setStatus({ kind: "error", text: error instanceof Error ? error.message : "Bir hata oluştu." });
  }

  useEffect(() => {
    if (!token) return;
    adminApi.list(token).then((list) => setDrafts(list.map(toDraft))).catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update(index: number, patch: Partial<Draft>) {
    setDrafts((list) => list && list.map((d, i) => (i === index ? { ...d, ...patch } : d)));
    setDirty(true);
    setStatus(null);
  }

  function move(index: number, dir: -1 | 1) {
    setDrafts((list) => {
      if (!list) return list;
      const next = [...list];
      const target = index + dir;
      if (target < 0 || target >= next.length) return list;
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });
    setDirty(true);
  }

  async function save() {
    if (!token || !drafts) return;
    setBusy(true);
    setStatus(null);
    try {
      const saved = await adminApi.save(token, drafts.map(fromDraft));
      setDrafts(saved.map(toDraft));
      setDirty(false);
      setStatus({ kind: "ok", text: "Kaydedildi. Sitedeki paketler birkaç saniye içinde güncellenir." });
    } catch (error) {
      handleError(error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", fontFamily: FONT }}>
      <header style={{ borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, zIndex: 10, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(14px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0.9rem 1.25rem", display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: SUB, fontSize: "0.82rem", textDecoration: "none" }}>
            <ArrowLeft size={15} /> Siteye dön
          </Link>
          <div style={{ fontWeight: 800, fontSize: "0.95rem", marginLeft: 8 }}>Göktürk Labs · Yönetici paneli</div>
          {token && (
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button onClick={save} disabled={busy || !dirty || !drafts}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, background: dirty ? P : "rgba(255,255,255,0.06)", color: dirty ? "#fff" : MUT, border: "none", borderRadius: 10, padding: "0.55rem 0.95rem", fontWeight: 700, fontSize: "0.84rem", cursor: dirty && !busy ? "pointer" : "default", fontFamily: FONT }}>
                <Save size={15} /> {busy ? "Kaydediliyor…" : dirty ? "Değişiklikleri kaydet" : "Kaydedildi"}
              </button>
              <button onClick={() => signOut()} aria-label="Çıkış yap" title="Çıkış yap"
                style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, padding: "0.55rem 0.7rem", color: SUB, cursor: "pointer", display: "flex" }}>
                <LogOut size={15} />
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
        {status && (
          <div role={status.kind === "error" ? "alert" : "status"}
            style={{ marginBottom: 18, borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.86rem", background: status.kind === "ok" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)", color: status.kind === "ok" ? "#6EE7B7" : "#FCA5A5", display: "flex", alignItems: "center", gap: 8 }}>
            {status.kind === "ok" && <Check size={15} />} {status.text}
          </div>
        )}

        {!token ? (
          <LoginForm onSuccess={(t) => { sessionStorage.setItem(TOKEN_KEY, t); setStatus(null); setToken(t); }} />
        ) : !drafts ? (
          <p style={{ color: SUB }}>Paketler yükleniyor…</p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em" }}>Paketler</h1>
                <p style={{ color: SUB, fontSize: "0.86rem", marginTop: 4 }}>Sıralama burada nasılsa sitede de öyle görünür. Gizlenen paketler sitede gösterilmez.</p>
              </div>
              <button onClick={() => { setDrafts([...drafts, newPackage(drafts.length)]); setDirty(true); }} disabled={drafts.length >= 12}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, color: "#fff", borderRadius: 10, padding: "0.55rem 0.95rem", fontWeight: 700, fontSize: "0.84rem", cursor: "pointer", fontFamily: FONT }}>
                <Plus size={15} /> Paket ekle
              </button>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {drafts.map((d, i) => (
                <PackageEditor key={i} draft={d} index={i} count={drafts.length}
                  onChange={(patch) => update(i, patch)}
                  onMove={(dir) => move(i, dir)}
                  onDelete={() => { if (confirm(`"${d.name}" paketi silinsin mi? Kaydedene kadar geri alabilirsin (sayfayı yenile).`)) { setDrafts(drafts.filter((_, j) => j !== i)); setDirty(true); } }} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
          onSuccess((await adminApi.login(password)).token);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Giriş başarısız.");
        } finally {
          setBusy(false);
        }
      }}
      style={{ maxWidth: 380, margin: "8vh auto 0", background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 18, padding: "1.75rem" }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${P}22`, display: "flex", alignItems: "center", justifyContent: "center", color: "#A78BFA" }}>
        <Lock size={20} />
      </div>
      <h1 style={{ fontSize: "1.35rem", fontWeight: 800, marginTop: 14 }}>Yönetici girişi</h1>
      <p style={{ color: SUB, fontSize: "0.84rem", marginTop: 4 }}>Paketleri düzenlemek için şifreni gir.</p>
      <label htmlFor="admin-password" style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: SUB, marginTop: 18, marginBottom: 6 }}>Şifre</label>
      <input id="admin-password" type="password" autoComplete="current-password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} style={input} />
      {error && <p role="alert" style={{ color: "#FCA5A5", fontSize: "0.8rem", marginTop: 8 }}>{error}</p>}
      <button type="submit" disabled={busy || !password}
        style={{ width: "100%", marginTop: 16, background: P, color: "#fff", border: "none", borderRadius: 11, padding: "0.75rem", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", opacity: busy || !password ? 0.6 : 1, fontFamily: FONT }}>
        {busy ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
    </form>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: SUB, marginBottom: 5 }}>{label}</span>
      {children}
      {hint && <span style={{ display: "block", fontSize: "0.68rem", color: MUT, marginTop: 4 }}>{hint}</span>}
    </label>
  );
}

function PackageEditor({ draft: d, index, count, onChange, onMove, onDelete }: {
  draft: Draft; index: number; count: number;
  onChange: (patch: Partial<Draft>) => void; onMove: (dir: -1 | 1) => void; onDelete: () => void;
}) {
  const Icon = PACKAGE_ICONS[d.icon] ?? Star;
  const iconBtn: React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 8, padding: 7, color: SUB, cursor: "pointer", display: "flex" };
  return (
    <section style={{ border: `1px solid ${d.highlight ? d.color + "66" : BORDER}`, background: `${d.color}0A`, borderRadius: 16, padding: "1.1rem", opacity: d.isVisible ? 1 : 0.6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ background: `${d.color}22`, borderRadius: 10, padding: 8, display: "flex" }}><Icon size={17} color={d.color} /></div>
        <div style={{ fontWeight: 800 }}>{d.name || "İsimsiz paket"}</div>
        <div style={{ color: d.color, fontWeight: 900 }}>₺{d.price}</div>
        {d.highlight && <span style={{ fontSize: "0.62rem", fontWeight: 800, color: "#F59E0B" }}>ÖNE ÇIKAN</span>}
        {!d.isVisible && <span style={{ fontSize: "0.62rem", fontWeight: 800, color: MUT }}>GİZLİ</span>}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button type="button" style={{ ...iconBtn, opacity: index === 0 ? 0.3 : 1 }} disabled={index === 0} onClick={() => onMove(-1)} aria-label="Yukarı taşı"><ArrowUp size={14} /></button>
          <button type="button" style={{ ...iconBtn, opacity: index === count - 1 ? 0.3 : 1 }} disabled={index === count - 1} onClick={() => onMove(1)} aria-label="Aşağı taşı"><ArrowDown size={14} /></button>
          <button type="button" style={iconBtn} onClick={() => onChange({ isVisible: !d.isVisible })} aria-label={d.isVisible ? "Sitede gizle" : "Sitede göster"} title={d.isVisible ? "Sitede gizle" : "Sitede göster"}>
            {d.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
          <button type="button" style={{ ...iconBtn, color: "#FCA5A5" }} disabled={count <= 1} onClick={onDelete} aria-label="Paketi sil"><Trash2 size={14} /></button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
        <Field label="Paket adı"><input style={input} value={d.name} onChange={(e) => onChange({ name: e.target.value })} /></Field>
        <Field label="Rozet" hint="Boş bırakılabilir"><input style={input} value={d.badge ?? ""} onChange={(e) => onChange({ badge: e.target.value })} /></Field>
        <Field label="Fiyat (₺)"><input style={input} value={d.price} onChange={(e) => onChange({ price: e.target.value })} /></Field>
        <Field label="Dönem"><input style={input} value={d.period} onChange={(e) => onChange({ period: e.target.value })} placeholder="aylık" /></Field>
        <Field label="Renk">
          <div style={{ display: "flex", gap: 6 }}>
            <input type="color" value={d.color} onChange={(e) => onChange({ color: e.target.value.toUpperCase() })} style={{ width: 40, height: 38, border: "none", background: "none", padding: 0, cursor: "pointer" }} aria-label="Renk seç" />
            <input style={input} value={d.color} onChange={(e) => onChange({ color: e.target.value })} />
          </div>
        </Field>
        <Field label="İkon">
          <select style={input} value={d.icon} onChange={(e) => onChange({ icon: e.target.value as PackageIcon })}>
            {Object.keys(PACKAGE_ICONS).map((k) => <option key={k} value={k} style={{ background: "#111" }}>{k}</option>)}
          </select>
        </Field>
        <Field label="Kısa kimlik" hint="Küçük harf, rakam, tire">
          <input style={input} value={d.key} onChange={(e) => onChange({ key: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })} />
        </Field>
        <Field label="Öne çıkar">
          <button type="button" onClick={() => onChange({ highlight: !d.highlight })}
            style={{ ...input, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: d.highlight ? "#F59E0B" : SUB }}>
            <Star size={14} /> {d.highlight ? "Öne çıkan paket" : "Normal"}
          </button>
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginTop: 12 }}>
        <Field label="Açıklama"><textarea style={{ ...input, minHeight: 70, resize: "vertical" }} value={d.description} onChange={(e) => onChange({ description: e.target.value })} /></Field>
        <Field label="Özellikler" hint="Her satıra bir özellik"><textarea style={{ ...input, minHeight: 70, resize: "vertical" }} value={d.featuresText} onChange={(e) => onChange({ featuresText: e.target.value })} /></Field>
      </div>
      <div style={{ marginTop: 12 }}>
        <Field label="Sipariş mesajı" hint="Ziyaretçi kopyala butonuna basınca panoya alınan metin">
          <input style={input} value={d.orderText} onChange={(e) => onChange({ orderText: e.target.value })} />
        </Field>
      </div>
    </section>
  );
}
