import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronRight, MessageSquare, Plus } from "lucide-react";
import { ApiError, CATEGORY_TR, formatDate, supportApi, token, type TicketSummary } from "../lib/support-api";
import { Alert, C, inputStyle, primaryButton, StatusPill, SupportShell } from "../components/support/ui";

/** /destek — post-sales support: sign in, then the customer's tickets. */
export default function Support() {
  const [signedIn, setSignedIn] = useState(() => Boolean(token.get()));
  const [account, setAccount] = useState<{ customer: { name: string }; tickets: TicketSummary[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { document.title = "Destek · Göktürk Labs"; }, []);

  useEffect(() => {
    if (!signedIn) return;
    supportApi.account().then(setAccount).catch((e) => {
      if (e instanceof ApiError && e.status === 401) setSignedIn(false);
      else setError(e.message);
    });
  }, [signedIn]);

  if (!signedIn) return <SupportShell><AuthCard onDone={() => setSignedIn(true)} /></SupportShell>;

  return (
    <SupportShell user={account?.customer.name} onLogout={async () => { await supportApi.logout(); setAccount(null); setSignedIn(false); }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", color: C.PL }}>SATIŞ SONRASI DESTEK</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", marginTop: 4 }}>Taleplerim</h1>
        </div>
        <Link href="/destek/yeni" style={primaryButton()}><Plus size={16} /> Yeni talep</Link>
      </div>
      {error && <Alert>{error}</Alert>}
      {!account ? (
        <p style={{ color: C.SUB }}>Yükleniyor…</p>
      ) : account.tickets.length === 0 ? (
        <div style={{ border: `1px dashed ${C.BORDER}`, borderRadius: 16, padding: "3rem 1.5rem", textAlign: "center" }}>
          <MessageSquare size={26} color={C.MUT} />
          <p style={{ fontWeight: 700, marginTop: 10 }}>Henüz talebin yok</p>
          <p style={{ color: C.SUB, fontSize: "0.86rem", marginTop: 4 }}>Bir sorun, soru ya da istek için talep aç; yanıtlar burada görünür.</p>
          <Link href="/destek/yeni" style={{ ...primaryButton(), marginTop: 16 }}><Plus size={16} /> Talep aç</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {account.tickets.map((t) => (
            <Link key={t.number} href={`/destek/${t.number}`}
              style={{ display: "flex", alignItems: "center", gap: 14, background: C.CARD, border: `1px solid ${t.awaitingYou ? C.P + "66" : C.BORDER}`, borderRadius: 14, padding: "1rem 1.1rem", color: C.TEXT, textDecoration: "none" }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.72rem", color: C.MUT }}>
                  <span style={{ fontFamily: "monospace", color: C.SUB }}>#{t.ref}</span> · {CATEGORY_TR[t.category] ?? t.category}
                </div>
                <div style={{ fontWeight: 700, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.subject}</div>
                <div style={{ fontSize: "0.74rem", color: C.MUT, marginTop: 3 }}>{t.messages} mesaj · son hareket {formatDate(t.lastMessageAt)}</div>
              </div>
              <StatusPill status={t.status} />
              <ChevronRight size={16} color={C.MUT} />
            </Link>
          ))}
        </div>
      )}
    </SupportShell>
  );
}

function AuthCard({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [, navigate] = useLocation();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = mode === "login" ? await supportApi.login(form.email, form.password) : await supportApi.register(form.name, form.email, form.password);
      token.set(res.token);
      onDone();
      navigate("/destek");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setBusy(false);
    }
  }

  const field = (label: string, key: keyof typeof form, type = "text", auto?: string) => (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.SUB, marginBottom: 6 }}>{label}</span>
      <input type={type} required autoComplete={auto} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={inputStyle}
        minLength={key === "password" && mode === "register" ? 10 : undefined} />
    </label>
  );

  return (
    <div style={{ maxWidth: 420, margin: "6vh auto 0" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", color: C.PL }}>SATIŞ SONRASI DESTEK</div>
      <h1 style={{ fontSize: "1.9rem", fontWeight: 900, letterSpacing: "-0.02em", marginTop: 6 }}>Destek merkezi</h1>
      <p style={{ color: C.SUB, fontSize: "0.88rem", lineHeight: 1.6, marginTop: 6 }}>
        Botunla ilgili her konuda talep aç, ekibimizle yazış ve talebinin durumunu buradan takip et.
      </p>
      <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", border: `1px solid ${C.BORDER}`, borderRadius: 12, padding: 4, marginTop: 22 }}>
        {(["login", "register"] as const).map((m) => (
          <button key={m} type="button" onClick={() => { setMode(m); setError(null); }}
            style={{ flex: 1, border: "none", borderRadius: 9, padding: "0.55rem", fontWeight: 700, fontSize: "0.84rem", cursor: "pointer", fontFamily: C.FONT, background: mode === m ? C.P : "transparent", color: mode === m ? "#fff" : C.SUB }}>
            {m === "login" ? "Giriş yap" : "Hesap oluştur"}
          </button>
        ))}
      </div>
      <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 18 }}>
        {error && <Alert>{error}</Alert>}
        {mode === "register" && field("Ad soyad", "name", "text", "name")}
        {field("E-posta", "email", "email", "email")}
        {field(mode === "register" ? "Şifre (en az 10 karakter)" : "Şifre", "password", "password", mode === "login" ? "current-password" : "new-password")}
        <button type="submit" disabled={busy} style={primaryButton(busy)}>
          {busy ? "Bekle…" : mode === "login" ? "Giriş yap" : "Hesabı oluştur"}
        </button>
      </form>
      <p style={{ color: C.MUT, fontSize: "0.76rem", marginTop: 16, lineHeight: 1.6 }}>
        Henüz satın almadıysan sağ alttaki <strong style={{ color: C.SUB }}>Satış öncesi destek</strong> butonunu kullan.
      </p>
    </div>
  );
}
