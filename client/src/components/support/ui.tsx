import { useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, LogOut, Paperclip, X } from "lucide-react";
import { STATUS_TR, UPLOAD, type TicketStatus } from "../../lib/support-api";
import Footer from "../Footer";

export const C = {
  P: "#7C3AED",
  PL: "#A78BFA",
  BG: "#000000",
  CARD: "rgba(255,255,255,0.035)",
  BORDER: "rgba(255,255,255,0.09)",
  TEXT: "#FFFFFF",
  SUB: "#94A3B8",
  MUT: "#64748B",
  FONT: "'Space Grotesk','Plus Jakarta Sans','Inter',sans-serif",
};

export const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.BORDER}`, borderRadius: 11,
  padding: "0.72rem 0.85rem", color: C.TEXT, fontSize: "0.88rem", fontFamily: C.FONT, outline: "none",
};

export function primaryButton(disabled = false): React.CSSProperties {
  return {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, background: C.P, color: "#fff", border: "none",
    borderRadius: 11, padding: "0.72rem 1.1rem", fontWeight: 700, fontSize: "0.88rem", cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.6 : 1, fontFamily: C.FONT, boxShadow: `0 6px 22px ${C.P}44`, textDecoration: "none",
  };
}

export const ghostButton: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, background: "rgba(255,255,255,0.05)",
  border: `1px solid ${C.BORDER}`, color: "#E2E8F0", borderRadius: 10, padding: "0.5rem 0.8rem", fontWeight: 600,
  fontSize: "0.78rem", cursor: "pointer", fontFamily: C.FONT, textDecoration: "none",
};

export function SupportShell({ children, back, user, onLogout }: {
  children: React.ReactNode;
  back?: { href: string; label: string };
  user?: string | null;
  onLogout?: () => void;
}) {
  return (
    <div style={{ minHeight: "100vh", background: C.BG, color: C.TEXT, fontFamily: C.FONT }}>
      <header style={{ borderBottom: `1px solid ${C.BORDER}`, position: "sticky", top: 0, zIndex: 20, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(14px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0.85rem 1.25rem", display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: "1rem", color: C.TEXT, textDecoration: "none" }}>
            Göktürk <span style={{ color: C.PL }}>Labs</span>
          </Link>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: C.MUT }}>DESTEK MERKEZİ</span>
          {user && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "0.82rem", color: C.SUB }}>{user}</span>
              {onLogout && (
                <button onClick={onLogout} style={{ ...ghostButton, padding: "0.45rem 0.6rem" }} aria-label="Çıkış yap" title="Çıkış yap">
                  <LogOut size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </header>
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
        {back && (
          <Link href={back.href} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.PL, fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textDecoration: "none", marginBottom: 14 }}>
            <ArrowLeft size={13} /> {back.label.toUpperCase()}
          </Link>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function StatusPill({ status }: { status: TicketStatus }) {
  const s = STATUS_TR[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.7rem", fontWeight: 700, color: s.color, background: `${s.color}1A`, border: `1px solid ${s.color}44`, borderRadius: 999, padding: "0.18rem 0.6rem", whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: s.color }} /> {s.label}
    </span>
  );
}

export function Alert({ kind = "error", children }: { kind?: "error" | "ok"; children: React.ReactNode }) {
  return (
    <div role={kind === "error" ? "alert" : "status"}
      style={{ borderRadius: 11, padding: "0.65rem 0.9rem", fontSize: "0.84rem", background: kind === "ok" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)", color: kind === "ok" ? "#6EE7B7" : "#FCA5A5" }}>
      {children}
    </div>
  );
}

/** File picker with a removable list and client-side limits (server validates again). */
export function FilePicker({ files, onChange }: { files: File[]; onChange: (files: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
      <button type="button" onClick={() => ref.current?.click()} style={{ ...ghostButton, padding: "0.45rem 0.7rem" }}>
        <Paperclip size={13} /> Dosya ekle
      </button>
      <input ref={ref} type="file" multiple accept={UPLOAD.accept} hidden
        onChange={(e) => {
          const next = [...files, ...Array.from(e.target.files ?? [])].slice(0, UPLOAD.maxFiles);
          e.target.value = "";
          if (next.reduce((s, f) => s + f.size, 0) > UPLOAD.maxTotal) { setError("Dosyalar toplam 4 MB'ı geçemez."); return; }
          setError(null);
          onChange(next);
        }} />
      {files.map((f, i) => (
        <span key={`${f.name}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.74rem", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.BORDER}`, borderRadius: 8, padding: "0.25rem 0.5rem", color: C.SUB }}>
          {f.name}
          <button type="button" aria-label={`${f.name} kaldır`} onClick={() => onChange(files.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: C.MUT, cursor: "pointer", display: "flex" }}>
            <X size={12} />
          </button>
        </span>
      ))}
      {error && <span style={{ fontSize: "0.74rem", color: "#FCA5A5" }}>{error}</span>}
    </div>
  );
}

/** Renders message text; lines starting with "> " become a quote block. */
export function MessageBody({ text }: { text: string }) {
  const blocks: { quote: boolean; lines: string[] }[] = [];
  for (const line of text.split("\n")) {
    const quote = line.startsWith("> ") || line === ">";
    const last = blocks[blocks.length - 1];
    const content = quote ? line.replace(/^> ?/, "") : line;
    if (last && last.quote === quote) last.lines.push(content);
    else blocks.push({ quote, lines: [content] });
  }
  return (
    <div style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#E2E8F0", overflowWrap: "anywhere" }}>
      {blocks.map((b, i) =>
        b.quote ? (
          <div key={i} style={{ borderLeft: `3px solid ${C.P}`, background: "rgba(124,58,237,0.08)", borderRadius: "0 8px 8px 0", padding: "0.4rem 0.7rem", margin: "0.25rem 0 0.5rem", color: C.SUB, fontSize: "0.82rem", whiteSpace: "pre-wrap" }}>
            {b.lines.join("\n")}
          </div>
        ) : (
          <div key={i} style={{ whiteSpace: "pre-wrap" }}>{b.lines.join("\n")}</div>
        ),
      )}
    </div>
  );
}
