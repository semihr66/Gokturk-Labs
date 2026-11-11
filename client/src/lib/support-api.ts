/** Client for SupportFlow's customer API (post-sales support inside the site). */
import { SUPPORTFLOW_URL, SUPPORTFLOW_WORKSPACE } from "./supportflow";

const API = `${SUPPORTFLOW_URL}/api/public/${SUPPORTFLOW_WORKSPACE}/me`;
const TOKEN_KEY = "gtl-support-token";

export type TicketStatus = "NEW" | "OPEN" | "IN_PROGRESS" | "WAITING_FOR_CUSTOMER" | "RESOLVED" | "CLOSED";

export type TicketSummary = {
  number: number;
  ref: string;
  subject: string;
  category: string;
  status: TicketStatus;
  createdAt: string;
  lastMessageAt: string;
  awaitingYou: boolean;
  messages: number;
};

export type Attachment = { id: string; fileName: string; mimeType: string; size: number };

export type Message = {
  id: string;
  author: "customer" | "team";
  name: string;
  mine: boolean;
  body: string;
  createdAt: string;
  editedAt: string | null;
  attachments: Attachment[];
};

export type Ticket = {
  id: string;
  number: number;
  ref: string;
  subject: string;
  category: string;
  status: TicketStatus;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  department: string;
  product: string | null;
  assignee: string | null;
  createdAt: string;
  lastMessageAt: string;
  messages: Message[];
};

export const STATUS_TR: Record<TicketStatus, { label: string; color: string }> = {
  NEW: { label: "Alındı", color: "#38BDF8" },
  OPEN: { label: "Açık", color: "#10B981" },
  IN_PROGRESS: { label: "İnceleniyor", color: "#F59E0B" },
  WAITING_FOR_CUSTOMER: { label: "Yanıtını bekliyor", color: "#A78BFA" },
  RESOLVED: { label: "Çözüldü", color: "#10B981" },
  CLOSED: { label: "Kapatıldı", color: "#64748B" },
};

export const PRIORITY_TR = { LOW: "Düşük", MEDIUM: "Normal", HIGH: "Yüksek", URGENT: "Acil" } as const;

/** Post-sales topics shown in the new-ticket form (any topic: "Diğer" covers the rest). */
export const CATEGORY_TR: Record<string, string> = {
  TECHNICAL: "Teknik sorun / hata",
  PRODUCT_SUPPORT: "Bot ayarı / modül",
  ACCOUNT: "Hesap & erişim",
  ORDER: "Sipariş / kurulum",
  SUBSCRIPTION: "Abonelik & ödeme",
  REFUND: "İade talebi",
  OTHER: "Diğer",
  PRODUCT_QUESTION: "Ürün sorusu",
  PRICING: "Fiyat",
  SALES_INQUIRY: "Satış",
  GENERAL_INFO: "Genel bilgi",
};
export const POST_SALES_TOPICS = ["TECHNICAL", "PRODUCT_SUPPORT", "ACCOUNT", "ORDER", "SUBSCRIPTION", "REFUND", "OTHER"];

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export const token = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (value: string) => localStorage.setItem(TOKEN_KEY, value),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const auth = token.get();
  const headers: Record<string, string> = { ...(init.headers as Record<string, string>) };
  if (auth) headers.Authorization = `Bearer ${auth}`;
  if (init.body && !(init.body instanceof FormData)) headers["Content-Type"] = "application/json";
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, { ...init, headers });
  } catch {
    throw new ApiError("Destek sistemine ulaşılamadı. Bağlantını kontrol edip tekrar dene.", 0);
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && auth) token.clear();
  if (!res.ok) throw new ApiError(data?.error ?? `İstek başarısız (${res.status}).`, res.status);
  return data as T;
}

export const supportApi = {
  login: (email: string, password: string) => request<{ token: string }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) =>
    request<{ token: string }>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  logout: () => request("/auth/logout", { method: "POST" }).catch(() => undefined).finally(() => token.clear()),
  account: () => request<{ customer: { name: string; email: string }; tickets: TicketSummary[] }>(""),
  options: () => request<{ products: { id: string; name: string }[] }>("/options"),
  create: (form: FormData) => request<{ number: number; ref: string }>("/tickets", { method: "POST", body: form }),
  ticket: (number: number) => request<{ ticket: Ticket }>(`/tickets/${number}`).then((d) => d.ticket),
  reply: (number: number, form: FormData) => request<{ ticket: Ticket }>(`/tickets/${number}/messages`, { method: "POST", body: form }).then((d) => d.ticket),
  edit: (number: number, id: string, body: string) =>
    request<{ ticket: Ticket }>(`/tickets/${number}/messages/${id}`, { method: "PATCH", body: JSON.stringify({ body }) }).then((d) => d.ticket),
  close: (number: number) => request<{ ticket: Ticket }>(`/tickets/${number}/close`, { method: "POST" }).then((d) => d.ticket),
  /** Downloads an attachment with the auth header and opens it. */
  async open(file: Attachment) {
    const res = await fetch(`${API}/files/${file.id}${file.mimeType.startsWith("image/") ? "" : "?download"}`, {
      headers: { Authorization: `Bearer ${token.get() ?? ""}` },
    });
    if (!res.ok) throw new ApiError("Dosya açılamadı.", res.status);
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    if (!file.mimeType.startsWith("image/")) a.download = file.fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  },
};

export const UPLOAD = { maxFiles: 5, maxTotal: 4 * 1024 * 1024, accept: ".png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.csv,.log" };

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}
