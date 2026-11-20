/* Göktürk Labs: bağımsız Vite yapılandırması; harici preview/runtime katmanı yoktur. */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
import { defineConfig, type Plugin } from "vite";

const SITE = "https://www.gokturklabs.tech";

/*
 * Alt sayfalar için ayrı HTML: her biri kendi başlığı, açıklaması ve canonical adresiyle.
 * Yoksa Google hepsini ana sayfanın kopyası sayıp dizine eklemiyor.
 * vercel.json bu dosyaları ilgili adrese bağlar.
 */
const STATIC_PAGES = [
  {
    path: "/hizmet-sartlari",
    title: "Hizmet Şartları — Göktürk Labs",
    description: "Göktürk Labs Discord bot ve yazılım hizmetlerinin kullanım şartları: hizmetler, kullanım kuralları, ödeme, iade ve sorumluluklar.",
  },
  {
    path: "/gizlilik-politikasi",
    title: "Gizlilik Politikası — Göktürk Labs",
    description: "Göktürk Labs hangi bilgileri topluyor, nasıl kullanıyor ve nasıl koruyor: kişisel veriler, ödeme bilgileri ve veri güvenliği.",
  },
];

function staticPageHtml(): Plugin {
  const swap = (html: string, re: RegExp, value: string, name: string) => {
    if (!re.test(html)) throw new Error(`staticPageHtml: ${name} etiketi bulunamadı`);
    return html.replace(re, `$1${value}$2`);
  };
  return {
    name: "gokturk-static-page-html",
    apply: "build",
    writeBundle(options) {
      const dir = options.dir!;
      const base = fs.readFileSync(path.join(dir, "index.html"), "utf8");
      for (const page of STATIC_PAGES) {
        const url = SITE + page.path;
        let html = base;
        html = swap(html, /(<title>)[^<]*(<\/title>)/, page.title, "title");
        html = swap(html, /(<link rel="canonical" href=")[^"]*(")/, url, "canonical");
        html = swap(html, /(<meta name="description" content=")[^"]*(")/, page.description, "description");
        html = swap(html, /(<meta property="og:url" content=")[^"]*(")/, url, "og:url");
        html = swap(html, /(<meta property="og:title" content=")[^"]*(")/, page.title, "og:title");
        html = swap(html, /(<meta property="og:description" content=")[^"]*(")/, page.description, "og:description");
        html = swap(html, /(<meta name="twitter:title" content=")[^"]*(")/, page.title, "twitter:title");
        html = swap(html, /(<meta name="twitter:description" content=")[^"]*(")/, page.description, "twitter:description");
        fs.writeFileSync(path.join(dir, `${page.path.slice(1)}.html`), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticPageHtml()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 1212,
    strictPort: true,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
