# Tasarım Yönü: Discord Hosting Sipariş Sitesi

## Üç Stil Yaklaşımı

### Theme Name: Terminal Atelier
**Very Brief Intro:** Komut satırı estetiğini premium servis vitriniyle birleştiren, koyu mürekkep zeminli ve fosfor yeşili vurgulu bir yön. Teknik güven ve kurucu enerjisi verir.
**Probability:** 0.07

### Theme Name: Cloud Utility
**Very Brief Intro:** Açık arka plan, kobalt mavi ve sıcak turuncu ile sade ama karakterli bir altyapı hizmeti görünümü. Hızlı tarama ve kolay satın alma hissi öne çıkar.
**Probability:** 0.04

### Theme Name: Signal Harbor
**Very Brief Intro:** Gece denizi, sisli mavi yüzeyler ve amber sinyal ışıklarıyla güvenilir bir kontrol merkezi duygusu. Hosting hizmetini “botlarının güvenli limanı” olarak konumlandırır.
**Probability:** 0.08

## Seçilen Yaklaşım: Signal Harbor

### Design Movement
Contemporary editorial infrastructure design: teknik panel disiplinini, gece limanı metaforunun yön bulma ve güven duygusuyla birleştirir.

### Core Principles
1. Her bölüm bir “sinyal” gibi net bir hiyerarşiye sahip olacak; kullanıcı nereye bakacağını ilk bakışta anlayacak.
2. Koyu lacivert yüzeyler, açık metin ve amber vurgu yüksek kontrastlı ama gösterişsiz bir güven hissi üretecek.
3. Paketler yalnızca fiyat kartları değil, farklı yoğunluktaki botlar için yönlendirme istasyonları gibi sunulacak.
4. Tasarım masaüstünde editoryal/asimetrik, mobilde ise akışkan ve tek başına okunabilir olacak.

### Color Philosophy
Ana zemin gece vardiyasındaki sakinliği ve sürekliliği temsil eden koyu deniz laciverti olacak. Sis mavisi yüzeyler katmanları ve altyapı derinliğini ayıracak. Amber, yalnızca eylem ve yönlendirme anlarında kullanılacak; böylece “Sipariş Ver” kararı görsel olarak tek bir sinyal gibi öne çıkacak. İmzalı marka rengi: **Signal Amber `#FFB547`**.

### Layout Paradigm
Geniş bir merkez kartı yerine, sol tarafta dikey marka anlatısı ve sağ tarafta paket/eylem alanı olan “harbor console” düzeni kullanılacak. Hero bölümünde metin sola yaslı, atmosfer görseli sağa taşan bir kompozisyon oluşturacak. Paketler yatay ritimde sıralanacak; öne çıkan paket normal akışı bozan amber bir işaretle ayrışacak.

### Signature Elements
- Amber “signal dot” ve kısa sinyal çizgileri: bölüm başlıkları, durum göstergeleri ve butonlarda tekrar eden marka motifi.
- İnce grid/harbor-line dokusu: arka planlarda çok düşük opaklıkta altyapı hissi.
- Paket kartlarında küçük “deployment profile” etiketi: RAM bilgisini kuru teknik sayı olmaktan çıkarıp kullanım senaryosuna bağlar.

### Interaction Philosophy
Etkileşimler hızlı, doğrudan ve güven verici olacak. Sipariş butonuna basıldığında yeni sekmede kullanıcının doğrudan Discord profil/DM adresi açılacak; buton metni bu hedefi açıkça söyleyecek. Hover durumları amber ışığın yükselmesi gibi çalışacak, kartlar yalnızca hafifçe yukarı kalkacak. Kullanıcıdan sitede form doldurması istenmeyecek; sohbet üzerinden sipariş verme akışı korunacak.

### Animation
Sayfa açılışında başlık, alt metin ve paketler 40–60 ms aralıklarla kısa bir yukarı hareket ve opacity geçişiyle görünecek. Hover geçişleri 180 ms ease-out ile sınırlı tutulacak. Dekoratif sinyal çizgileri yalnızca düşük yoğunlukta pulse edecek ve `prefers-reduced-motion` açık olduğunda duracak. Butonlar tıklamada 0.97 scale ile fiziksel tepki verecek.

### Typography System
Başlıklar için **Space Grotesk** kullanılacak; teknik ama sıcak geometrisi güçlü bir marka sesi verecek. Gövde ve arayüz metinleri için **DM Sans** kullanılacak; küçük boyutlarda okunaklı kalacak. H1 güçlü ve sıkı, bölüm başlıkları orta ağırlıklı, paket bilgileri ise küçük harf aralığı açık uppercase etiketlerle ayrıştırılacak.

### Brand Essence
Discord botlarını kesintisiz ve düzenli çalıştırmak isteyen topluluk sahipleri için net paketler ve doğrudan iletişim sunan, gereksiz panel karmaşası olmayan hosting vitrini.

**Personality:** güvenilir, teknik, doğrudan.

### Brand Voice
Başlıklar kısa ve iddialı; CTA’lar ne olacağını açıkça söyler. Microcopy abartılı vaatler yerine kapasite ve iletişim akışını anlatır.

Örnek satırlar:
- “Botun için sakin bir gece vardiyası.”
- “Paketini seç, doğrudan Discord’dan konuşalım.”

### Wordmark & Logo
Logoda metin yerine, üç yatay amber sinyal çizgisinin ortasında lacivert bir “node” bulunan sade bir sembol kullanılacak. Çizgiler bağlantıyı, merkez node ise botun çalıştığı güvenli çekirdeği temsil edecek. Header’da sembol, yanında özel harf aralığıyla yazılmış `NIGHTNODE` kelime işareti kullanılacak.

### Signature Brand Color
**Signal Amber — `#FFB547`**. Bu renk, navigasyon ışığı ve satın alma kararının tek net işareti olarak kullanılacak.

### Site Content Model
- Marka: NightNode Hosting
- Ana vaat: Discord botları için sade, sürekli ve doğrudan hosting.
- Paketler: Basic 800 MB, Standard 2 GB, Premium 3 GB, Pro Oracle.
- Sipariş hedefi: `https://discord.com/users/937079326149595147`
- Sipariş davranışı: Her “Sipariş Ver” bağlantısı yeni sekmede aynı Discord hedefini açar; kartın paket adı CTA çevresindeki metinle görünür kalır.
- Güven notu: “Sipariş ve kurulum detaylarını Discord DM üzerinden netleştiriyoruz.”

## Style Decisions

- Major page surfaces remain within night navy, harbor black-blue, and fog-blue materials; warm cream is not a dominant section background.
- Package cards are deployment stations with profile/status language describing bot intensity, not only RAM and CPU.
- Signal Amber `#FFB547` is reserved for active navigation signals, primary CTAs, featured-plan markers, and key status dots.
- Package presentation uses stronger station labels, signal-line dividers, and asymmetric control-center rhythm so the pricing area stays inside the harbor-console world.


## Style Decisions

- Signal Amber `#FFB547` birincil aksiyon rengi olacak; mor yalnızca düşük yoğunluklu atmosfer tonu olarak kullanılacak.
- Göktürk Labs ana marka adı olarak korunacak; kullanıcı tarafından belirlenen marka, alternatif marka önerilerinin önceliğindedir.
- Hero ve paket dili bot geliştirme ajansından çok güvenilir hosting vitrini gibi konuşacak; botun çalışması, paket seçimi ve Discord üzerinden netleştirme öne çıkacak.
- Amber sinyal noktaları, kısa çizgiler ve ince harbor-line dokusu bölümler arasında tekrar eden görsel alfabe olarak kullanılacak.
- Animasyonlar bu sinyal dilini destekleyecek; 180–700 ms aralığında, fiziksel ve kontrollü geçişler kullanılacak.

## Style Decisions

- Göktürk Labs görünür marka adı olarak korunur; sinyal dili amber ışık, koyu lacivert düğüm ve teknik istasyon etiketleriyle sürdürülür.
- Ana sayfanın birincil vaadi Discord bot hosting, çalışma sürekliliği, paket seviyesi ve teknik destektir. Özelleştirme ve ek sistemler bu hosting teklifini destekleyen ikincil katman olarak anlatılır.
- Ek sistemler bölümü, referans görselin kart ritminden ilham alan fakat birebir kopyalamayan özgün bir modül kataloğudur; CSS kapakları, amber durum noktaları ve farklı atmosferik yüzeyler kullanır.
- Amber, sipariş ve destek gibi eylemlerin ana sinyal rengidir; ikincil gezinme ve açıklama katmanları daha sakin tutulur.
