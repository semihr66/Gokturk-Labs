import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { CheckCircle2, Clock, FileText, Hash, Pencil, Reply, Send } from "lucide-react";
import { ApiError, CATEGORY_TR, formatDate, PRIORITY_TR, supportApi, token, type Message, type Ticket } from "../lib/support-api";
import { Alert, C, FilePicker, ghostButton, inputStyle, MessageBody, primaryButton, StatusPill, SupportShell } from "../components/support/ui";

const POLL_MS = 5000;

/** /destek/:number — conversation with live updates. */
export default function SupportTicket() {
  const { number: raw } = useParams<{ number: string }>();
  const number = Number(raw);
  const [, navigate] = useLocation();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<{ id: string; text: string } | null>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const lastSeen = useRef<string | null>(null);

  const onError = useCallback((e: unknown) => {
    if (e instanceof ApiError && e.status === 401) navigate("/destek");
    else setError(e instanceof Error ? e.message : "Bir hata oluştu.");
  }, [navigate]);

  const load = useCallback(() => supportApi.ticket(number).then((t) => { setTicket(t); setError(null); }).catch(onError), [number, onError]);

  useEffect(() => {
    if (!token.get()) { navigate("/destek"); return; }
    if (!Number.isInteger(number)) { navigate("/destek"); return; }
    load();
    // Live updates: poll while the tab is visible.
    const timer = setInterval(() => document.visibilityState === "visible" && load(), POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, [number, load, navigate]);

  useEffect(() => {
    if (ticket) document.title = `#${ticket.ref} · Destek · Göktürk Labs`;
    const last = ticket?.messages.at(-1)?.id ?? null;
    if (last && lastSeen.current && last !== lastSeen.current) window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    lastSeen.current = last;
  }, [ticket]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    const data = new FormData();
    data.append("body", body);
    files.forEach((f) => data.append("attachments", f));
    try {
      setTicket(await supportApi.reply(number, data));
      setBody("");
      setFiles([]);
      setError(null);
    } catch (err) {
      onError(err);
    } finally {
      setBusy(false);
    }
  }

  async function saveEdit() {
    if (!editing) return;
    try {
      setTicket(await supportApi.edit(number, editing.id, editing.text));
      setEditing(null);
    } catch (err) {
      onError(err);
    }
  }

  function quote(m: Message) {
    const quoted = m.body.split("\n").filter((l) => !l.startsWith(">")).slice(0, 6).map((l) => `> ${l}`).join("\n");
    setBody((b) => `> ${m.name} yazdı:\n${quoted}\n\n${b}`);
    composer.current?.focus();
  }

  async function close() {
    if (!confirm("Talep çözüldü olarak kapatılsın mı? Daha sonra yazarak yeniden açabilirsin.")) return;
    try {
      setTicket(await supportApi.close(number));
    } catch (err) {
      onError(err);
    }
  }

  const done = ticket?.status === "RESOLVED" || ticket?.status === "CLOSED";

  return (
    <SupportShell back={{ href: "/destek", label: "Taleplere dön" }}>
      {!ticket ? (
        error ? <Alert>{error}</Alert> : <p style={{ color: C.SUB }}>Yükleniyor…</p>
      ) : (
        <>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            #{ticket.ref}
            <span style={{ display: "block", background: `linear-gradient(90deg, ${C.PL}, #F0ABFC)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {ticket.subject}
            </span>
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) min(300px,100%)", gap: 18, marginTop: 26, alignItems: "start" }} className="sf-ticket-grid">
            <style>{`@media (max-width: 860px){.sf-ticket-grid{grid-template-columns:1fr !important}}`}</style>
            <section style={{ background: C.CARD, border: `1px solid ${C.BORDER}`, borderRadius: 18, padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.2rem 0.3rem 0.9rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800 }}><Hash size={15} color={C.PL} /> Konuşma</div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.68rem", color: C.SUB, border: `1px solid ${C.BORDER}`, borderRadius: 999, padding: "0.2rem 0.6rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: "#10B981" }} /> Canlı güncelleniyor
                </span>
              </div>

              {error && <div style={{ marginBottom: 10 }}><Alert>{error}</Alert></div>}

              <div style={{ display: "grid", gap: 12 }}>
                {ticket.messages.map((m) => (
                  <article key={m.id} style={{ border: `1px solid ${m.author === "team" ? C.P + "40" : C.BORDER}`, background: m.author === "team" ? "rgba(124,58,237,0.06)" : "rgba(255,255,255,0.02)", borderRadius: 14, overflow: "hidden" }}>
                    <header style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.7rem 0.9rem", borderBottom: `1px solid ${C.BORDER}`, flexWrap: "wrap" }}>
                      <span style={{ width: 30, height: 30, borderRadius: 9, background: m.author === "team" ? C.P : "#1f2937", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem" }}>
                        {m.name.slice(0, 1).toUpperCase()}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: "0.86rem" }}>{m.name}</span>
                      {m.mine && <span style={{ fontSize: "0.62rem", fontWeight: 700, color: C.SUB, border: `1px solid ${C.BORDER}`, borderRadius: 6, padding: "0.05rem 0.35rem" }}>Siz</span>}
                      {m.author === "team" && <span style={{ fontSize: "0.62rem", fontWeight: 700, color: C.PL, border: `1px solid ${C.P}55`, borderRadius: 999, padding: "0.05rem 0.5rem" }}>Göktürk Labs ekibi</span>}
                      <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.7rem", color: C.MUT }}>
                        <Clock size={12} /> {formatDate(m.createdAt)}{m.editedAt ? " · düzenlendi" : ""}
                      </span>
                      <button type="button" onClick={() => quote(m)} style={{ ...ghostButton, padding: "0.25rem 0.55rem", fontSize: "0.7rem" }}><Reply size={12} /> Yanıtla</button>
                      {m.mine && !done && (
                        <button type="button" onClick={() => setEditing({ id: m.id, text: m.body })}
                          style={{ ...ghostButton, padding: "0.25rem 0.55rem", fontSize: "0.7rem", color: "#FBBF24", borderColor: "rgba(251,191,36,0.35)" }}>
                          <Pencil size={12} /> Düzenle
                        </button>
                      )}
                    </header>
                    <div style={{ padding: "0.85rem 0.95rem" }}>
                      {editing?.id === m.id ? (
                        <div style={{ display: "grid", gap: 8 }}>
                          <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={4} style={{ ...inputStyle, resize: "vertical" }} autoFocus />
                          <div style={{ display: "flex", gap: 8 }}>
                            <button type="button" onClick={saveEdit} disabled={!editing.text.trim()} style={primaryButton(!editing.text.trim())}>Kaydet</button>
                            <button type="button" onClick={() => setEditing(null)} style={ghostButton}>Vazgeç</button>
                          </div>
                        </div>
                      ) : (
                        <MessageBody text={m.body} />
                      )}
                      {m.attachments.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                          {m.attachments.map((a) => (
                            <button key={a.id} type="button" onClick={() => supportApi.open(a).catch(onError)} style={{ ...ghostButton, padding: "0.35rem 0.6rem" }}>
                              <FileText size={13} /> {a.fileName}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {ticket.status === "CLOSED" ? (
                <p style={{ marginTop: 14, color: C.SUB, fontSize: "0.84rem", border: `1px dashed ${C.BORDER}`, borderRadius: 12, padding: "0.8rem 1rem" }}>
                  Bu talep kapatıldı. Yeni bir konu için <Link href="/destek/yeni" style={{ color: C.PL }}>yeni talep aç</Link>.
                </p>
              ) : (
                <form onSubmit={send} style={{ marginTop: 14, border: `1px solid ${C.BORDER}`, borderRadius: 14, background: "rgba(255,255,255,0.02)" }}>
                  <textarea ref={composer} value={body} onChange={(e) => setBody(e.target.value)} rows={4} maxLength={10000}
                    placeholder={ticket.status === "RESOLVED" ? "Sorun devam ediyorsa yaz; talep yeniden açılır…" : "Mesajını yaz…"}
                    onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) send(e); }}
                    style={{ ...inputStyle, border: "none", background: "transparent", resize: "vertical", lineHeight: 1.6 }} aria-label="Mesajın" />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", borderTop: `1px solid ${C.BORDER}`, padding: "0.6rem 0.7rem" }}>
                    <FilePicker files={files} onChange={setFiles} />
                    <button type="submit" disabled={busy || !body.trim()} style={primaryButton(busy || !body.trim())}><Send size={14} /> {busy ? "Gönderiliyor…" : "Gönder"}</button>
                  </div>
                </form>
              )}
            </section>

            <aside style={{ background: C.CARD, border: `1px solid ${C.BORDER}`, borderRadius: 18, padding: "1.2rem", position: "sticky", top: 84 }}>
              <div style={{ fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.1em", color: C.MUT }}>TALEP ÖZETİ</div>
              <div style={{ fontWeight: 800, marginTop: 6, lineHeight: 1.35 }}>{ticket.subject}</div>
              <dl style={{ marginTop: 14, display: "grid", gap: 0, fontSize: "0.8rem" }}>
                {([
                  ["Konu", CATEGORY_TR[ticket.category] ?? ticket.category],
                  ["Departman", ticket.department],
                  ["Öncelik", PRIORITY_TR[ticket.priority]],
                  ["Durum", <StatusPill key="s" status={ticket.status} />],
                  ["İlgilenen", ticket.assignee ?? "Atanmayı bekliyor"],
                  ...(ticket.product ? [["Ürün", ticket.product] as const] : []),
                  ["Oluşturulma", formatDate(ticket.createdAt)],
                ] as const).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "0.6rem 0", borderTop: `1px solid ${C.BORDER}` }}>
                    <dt style={{ color: C.MUT }}>{k}</dt>
                    <dd style={{ fontWeight: 600, textAlign: "right" }}>{v}</dd>
                  </div>
                ))}
              </dl>
              {!done && (
                <button type="button" onClick={close} style={{ ...ghostButton, width: "100%", marginTop: 14, padding: "0.7rem" }}>
                  <CheckCircle2 size={15} /> Talebi kapat
                </button>
              )}
              <Link href="/destek" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: "0.76rem", color: C.MUT, textDecoration: "none" }}>Taleplere dön</Link>
            </aside>
          </div>
        </>
      )}
    </SupportShell>
  );
}
