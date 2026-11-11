import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Send } from "lucide-react";
import { ApiError, CATEGORY_TR, POST_SALES_TOPICS, supportApi, token } from "../lib/support-api";
import { Alert, C, FilePicker, inputStyle, primaryButton, SupportShell } from "../components/support/ui";

/** /destek/yeni — open a post-sales request on any topic. */
export default function SupportNew() {
  const [, navigate] = useLocation();
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [form, setForm] = useState({ category: "", productId: "", subject: "", description: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Yeni talep · Göktürk Labs";
    if (!token.get()) { navigate("/destek"); return; }
    supportApi.options().then((o) => setProducts(o.products)).catch((e) => {
      if (e instanceof ApiError && e.status === 401) navigate("/destek");
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => v && data.append(k, v));
    files.forEach((f) => data.append("attachments", f));
    try {
      const res = await supportApi.create(data);
      navigate(`/destek/${res.number}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) navigate("/destek");
      setError(err instanceof Error ? err.message : "Talep oluşturulamadı.");
      setBusy(false);
    }
  }

  const label = (text: string) => <span style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.SUB, marginBottom: 6 }}>{text}</span>;

  return (
    <SupportShell back={{ href: "/destek", label: "Taleplere dön" }}>
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em" }}>Yeni destek talebi</h1>
        <p style={{ color: C.SUB, fontSize: "0.88rem", marginTop: 6 }}>Her konuda yazabilirsin. Ne kadar ayrıntı verirsen o kadar hızlı çözeriz.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 16, marginTop: 24, background: C.CARD, border: `1px solid ${C.BORDER}`, borderRadius: 18, padding: "1.5rem" }}>
          {error && <Alert>{error}</Alert>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <label>
              {label("Konu")}
              <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                <option value="" style={{ background: "#111" }}>Seç…</option>
                {POST_SALES_TOPICS.map((k) => <option key={k} value={k} style={{ background: "#111" }}>{CATEGORY_TR[k]}</option>)}
              </select>
            </label>
            {products.length > 0 && (
              <label>
                {label("Ürün / paket (isteğe bağlı)")}
                <select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })} style={inputStyle}>
                  <option value="" style={{ background: "#111" }}>Genel</option>
                  {products.map((p) => <option key={p.id} value={p.id} style={{ background: "#111" }}>{p.name}</option>)}
                </select>
              </label>
            )}
          </div>
          <label>
            {label("Başlık")}
            <input required minLength={4} maxLength={160} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={inputStyle} placeholder="Örn: Ticket komutu yanıt vermiyor" />
          </label>
          <label>
            {label("Açıklama")}
            <textarea required minLength={10} rows={7} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} placeholder="Ne oldu, ne bekliyordun, sunucu adı / hata mesajı gibi ayrıntılar…" />
          </label>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", borderTop: `1px solid ${C.BORDER}`, paddingTop: 14 }}>
            <FilePicker files={files} onChange={setFiles} />
            <button type="submit" disabled={busy} style={primaryButton(busy)}><Send size={15} /> {busy ? "Gönderiliyor…" : "Talebi gönder"}</button>
          </div>
        </form>
      </div>
    </SupportShell>
  );
}
