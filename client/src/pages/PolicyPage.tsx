/* Göktürk Labs policy pages: calm dark reading surface, amber signal links, no form or data collection. */
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";

const LOGO_URL = "/gokturk-labs-logo.png";
const DISCORD_URL = "https://discord.gg/CFrwUThhE";

type PolicySection = { title: string; paragraphs?: string[]; bullets?: string[] };

const privacySections: PolicySection[] = [
  { title: "1. Toplanan Bilgiler", paragraphs: ["Göktürk Labs, hizmetlerin sağlanması için gerekli olmayan kişisel bilgileri toplamaz.", "Sipariş veya destek işlemleri sırasında kullanıcı tarafından paylaşılan Discord kullanıcı adı, Discord kullanıcı kimliği veya iletişim bilgileri gibi bilgiler, yalnızca ilgili hizmetin sağlanması ve kullanıcıyla iletişim kurulması amacıyla kullanılabilir.", "Göktürk Labs kullanıcıların kart bilgilerini toplamaz veya saklamaz."] },
  { title: "2. Ödeme Bilgileri", paragraphs: ["Ödemeler hizmete göre IBAN veya Google Play üzerinden gerçekleştirilebilir.", "Göktürk Labs, banka kartı veya kredi kartı bilgilerinin kendisine iletilmesini veya saklanmasını talep etmez."] },
  { title: "3. Bilgilerin Kullanılması", paragraphs: ["Kullanıcı tarafından paylaşılan bilgiler yalnızca;"] , bullets: ["Siparişleri yönetmek", "Hizmeti sağlamak", "Destek taleplerine cevap vermek", "Kullanıcıyla iletişim kurmak", "Teknik sorunları çözmek"] },
  { title: "4. Bilgilerin Paylaşılması", paragraphs: ["Göktürk Labs, kullanıcıların kişisel bilgilerini üçüncü kişilerle paylaşmaz.", "Kullanıcı bilgileri reklam, pazarlama veya başka ticari amaçlarla üçüncü taraflara aktarılmaz.", "Yasal olarak yetkili makamların kanunen geçerli bir talebi olması halinde, Göktürk Labs'in uymak zorunda olduğu yasal yükümlülükler ayrıca uygulanır."] },
  { title: "5. Veri Güvenliği", paragraphs: ["Göktürk Labs, elindeki kullanıcı bilgilerinin yetkisiz erişime karşı korunması için makul güvenlik önlemleri almaya çalışır."] },
  { title: "6. Verilerin Saklanması", paragraphs: ["Kullanıcı bilgileri yalnızca gerekli olduğu süre boyunca tutulur. Artık gerekli olmayan bilgiler uygun şekilde silinir veya imha edilir."] },
  { title: "7. Politika Değişiklikleri", paragraphs: ["Bu Gizlilik Politikası gerektiğinde güncellenebilir. Güncel sürüm web sitesinde yayımlandığı tarihten itibaren geçerlidir."] },
];

const termsSections: PolicySection[] = [
  { title: "1. Hizmetler", paragraphs: ["Göktürk Labs; Discord botları ve çeşitli yazılım hizmetleri sunmaktadır.", "Her hizmetin özellikleri, kaynakları, fiyatı ve süresi satın alma öncesinde kullanıcıya bildirilir."] },
  { title: "2. Kullanım Kuralları", paragraphs: ["Göktürk Labs hizmetleri aşağıdaki ve benzeri kötüye kullanım amaçlarıyla kullanılamaz:"], bullets: ["Yasa dışı faaliyetler", "Dolandırıcılık", "Spam", "Zararlı yazılım", "Yetkisiz erişim", "Başka sistemlere zarar verme"] },
  { title: "3. Hizmet Kesintileri", paragraphs: ["Sunucu bakımı, teknik problemler, altyapı sorunları veya Göktürk Labs'in kontrolü dışındaki nedenlerle geçici hizmet kesintileri yaşanabilir.", "Göktürk Labs, hizmetlerin mümkün olduğunca kesintisiz çalışması için gerekli özeni gösterir."] },
  { title: "4. Ödeme ve İade", paragraphs: ["Ödeme işlemleri, hizmete göre IBAN veya Google Play üzerinden gerçekleştirilebilir.", "Ödeme yöntemi ve hizmet ücreti satın alma öncesinde kullanıcıya açıkça bildirilir.", "Satın alınan hizmetlerde Göktürk Labs tarafından isteğe bağlı iade yapılmaz. Ancak yürürlükteki mevzuattan doğan ve tüketicinin vazgeçemeyeceği haklar saklıdır."] },
  { title: "5. Kullanıcının Sorumluluğu", paragraphs: ["Kullanıcı, hizmeti yürürlükteki kanunlara ve bu şartlara uygun şekilde kullanmakla sorumludur.", "Kullanıcının kendi içerikleri veya hizmeti kötüye kullanmasından kaynaklanan sorumluluk kullanıcıya aittir."] },
  { title: "6. Hizmetin Sonlandırılması", paragraphs: ["Hizmetin bu şartlara veya yürürlükteki mevzuata aykırı şekilde kullanılması durumunda Göktürk Labs hizmeti askıya alabilir veya sonlandırabilir."] },
  { title: "7. Değişiklikler", paragraphs: ["Göktürk Labs, hizmet şartlarını gerektiğinde güncelleyebilir. Güncel metin web sitesinde yayımlandığı tarihten itibaren geçerlidir."] },
  { title: "8. İletişim", paragraphs: ["Sorularınız ve destek talepleriniz için Göktürk Labs'in resmi Discord sunucusundaki destek kanallarını kullanabilirsiniz."] },
];

export default function PolicyPage({ type }: { type: "privacy" | "terms" }) {
  const isPrivacy = type === "privacy";
  const sections = isPrivacy ? privacySections : termsSections;
  const title = isPrivacy ? "Gizlilik Politikası" : "Hizmet Şartları";
  const intro = isPrivacy ? "Göktürk Labs, kullanıcıların gizliliğine önem verir ve yalnızca hizmetlerin yürütülmesi için gerekli olan bilgileri kullanır." : "Göktürk Labs hizmetlerini kullanarak aşağıdaki şartları kabul etmiş olursunuz.";

  return <main className="policy-page min-h-screen bg-[#08080b] text-[#f7f7fb]">
    <header className="policy-nav"><a href="/" className="flex items-center gap-3" aria-label="Göktürk Labs ana sayfa"><img src={LOGO_URL} alt="Göktürk Labs logosu" className="h-9 w-9 object-contain" /><span className="font-display text-sm font-semibold">Göktürk <em>Labs</em></span></a><a href="/" className="policy-back"><ArrowLeft className="h-4 w-4" /> Ana sayfaya dön</a></header>
    <div className="policy-shell"><div className="policy-kicker"><ShieldCheck className="h-4 w-4" /> GÖKTÜRK LABS / POLİTİKALAR</div><h1>{title}</h1><p className="policy-date">Son Güncelleme: 31 Ağustos 2026</p><p className="policy-intro">{intro}</p><article className="policy-content">{sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</article><div className="policy-footer"><strong>Göktürk Labs</strong><a href={DISCORD_URL} target="_blank" rel="noreferrer">Soruların mı var? Discord’dan yaz <ArrowUpRight className="h-4 w-4" /></a></div></div>
  </main>;
}
