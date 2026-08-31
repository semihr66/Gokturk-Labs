# Discord Bot Hosting Araştırma Notları

## VisiHost
Kaynak: https://visihost.in/free-bot-hosting

Ücretsiz Zero-Tier planı sayfada 256 MB DDR4 RAM, 20% vCPU, 1 GB NVMe SSD, Pterodactyl panel ve SFTP içeriyor. Sayfa “background sleep mode” olmadığını ve Discord/Telegram botlarının 24/7 çalıştırılabildiğini belirtiyor. 800 MB değil; ancak küçük botlar için ücretsiz bir seçenek olarak değerlendirilebilir. Plan sayfasında ayrıca Live Web Console ve kaynak izleme gibi panel özellikleri listeleniyor.

## HidenCloud
Kaynak: https://www.hidencloud.com/service/free-discord-hosting

Ücretsiz Discord bot hosting sayfası 2 vCPU, 3 GB RAM, 15 GB depolama, veritabanı ve büyük bot framework’leri desteği belirtiyor. Ücretsiz hizmet haftalık yenileme gerektiriyor; süre sınırı olmadan yenilenebileceği ifade ediliyor. Kaynak limitleri nedeniyle küçük botlar, öğrenme ve test için uygun; daha yüksek kullanım için ücretli plan öneriliyor. Ücretsiz planda temel destek, dokümantasyon ve topluluk erişimi bulunuyor.

## İlk değerlendirme
800 MB’a yakın özel bir ücretsiz planı şu iki sayfada doğrulayamadım. HidenCloud kaynak miktarı bakımından 800 MB’ın üzerinde olsa da haftalık yenileme şartı var. VisiHost kesintisiz uyku olmadan çalışma iddiası sunuyor ancak yalnızca 256 MB RAM veriyor. Her iki sağlayıcıda da gerçek kullanım koşulları ve hesap onay şartları ayrıca kontrol edilmeli.

## Bot-Hosting.net
Kaynak: https://bot-hosting.net/

Site Discord botlarına özel bir platform olduğunu, Node.js ve Python dahil çeşitli runtime’ları desteklediğini belirtiyor. Ücretsiz plan 256 MB RAM, 20% CPU, 1 GB depolama ve tek deployment sunuyor; ücretsiz planda manuel olarak 4 günde bir yenileme gerekiyor. Sayfa ayrıca ücretsiz planda 24/7 uptime, sleep olmaması, otomatik yeniden başlatma, dosya yöneticisi/SFTP ve log/metrics özelliklerini listeliyor. Ücretli Starter+ planı 2 GB RAM ve 4 deployment olarak gösteriliyor.

## FPS.ms
Kaynak: https://fps.ms/free-discord-bot-hosting/

Ücretsiz plan 128 MB RAM, 25% CPU ve 250 MB depolama ile 24/7 uptime iddiası sunuyor; ancak her 24 saatte bir yenileme gerekiyor ve ücretsiz kullanım kişisel amaçla sınırlı. Ücretli kademelerde 256 MB, 512 MB, 1 GB ve 2 GB RAM planları var. Sayfa 1 GB planı için €0.99/ay, 2 GB için €1.49/ay gösteriyor; ücretli planlarda yenileme gerekmiyor, SFTP ve dosya yöneticisi bulunuyor. Ücretli planlar için minimum €10 yükleme şartı da belirtilmiş.

## Güncellenmiş değerlendirme
800 MB tam kapasite planı doğrulanmadı; fakat 512 MB veya 1 GB seviyesinde yakın planlar var. 7/24 ve yenilemesiz kullanım için FPS.ms’in ücretli 1 GB/2 GB kademeleri veya Bot-Hosting.net’in ücretli 2 GB kademesi daha net görünüyor. Ücretsiz seçeneklerde 128–256 MB ve manuel yenileme şartları yaygın. HidenCloud sayfası daha yüksek ücretsiz RAM belirtiyor ancak haftalık yenileme istiyor.

## WispByte
Kaynak: https://wispbyte.com/free-discord-bot-hosting

WispByte resmi sayfası ücretsiz katmanda yenileme, kredi ve kredi kartı olmadığını; 7/24 çevrimiçi çalışma ve Node.js, Python, Java ve C# desteği sunduğunu belirtiyor. Sayfada ücretsiz katman RAM miktarı açıkça sayısal olarak verilmemiş; “free tier limits” ifadesi kullanılıyor. Ücretsiz katmanın yan projeler/öğrenme için, üretim botları için ise ücretli planların uygun olduğu yazıyor. Ücretli yükseltmeler €3,99/yıl seviyesinden başlıyor.

## HeavenCloud
Kaynak: https://heavencloud.in/service/free-discord-bot-hosting

Sayfa içeriği tarayıcıda yeterince yüklenmediği için 715 MB RAM, 7/24 ve yenilemesiz kullanım iddiaları resmi metinle doğrulanamadı. Bu nedenle sağlayıcı kesin öneri listesine alınmamalı; yalnızca ayrıca panel/şartlar görülüp doğrulanırsa değerlendirilmeli.

## Kritik sonuç
WispByte şu an kullanıcının “₺0 + yenileme yok + 7/24 + bot hosting” kriterlerine metinsel olarak en çok uyan seçenek. Ancak ücretsiz RAM sınırı sayfada net yazmadığı için 800 MB veya 1 GB olduğu söylenemez. Ücretsiz planda kaynak limiti ve yoğunluk politikası kayıt olmadan kesinleşmiyor. Tam 800 MB civarı yenilemesiz ücretsiz plan doğrulanmış değil.

## WispByte kaynak doğrulaması
Kaynak: https://wispbyte.com/kb/server-management

WispByte bilgi bankası ücretsiz sunucu başına varsayılan RAM miktarını 512 MB olarak belirtiyor. Startup komutu olarak `node index.js` örneği veriliyor; panelden paketler ve environment variables yönetilebiliyor. Her Discord botu için ayrı sunucu gerektiği, ücretsiz hesap başına tek hesap kuralı ve kaynak kullanımı sürekli dolarsa yükseltme gerekebileceği yazıyor. Ücretsiz botların 7/24 erişilebilir olduğu bilgisi de başlangıç rehberinde belirtilmiş.

## NexCloud kontrolü
Kaynak: https://nexcloud.in/free

Verilen ücretsiz plan URL’si 404 sayfasına yönlendi. Bu nedenle NexCloud’un yenilemesiz, ücretsiz ve 7/24 planı doğrulanamadı; öneri listesine alınmadı.

## Kesinleşen aday
WispByte, resmi sayfaları ve bilgi bankası birlikte değerlendirildiğinde şu an en güçlü aday: 512 MB varsayılan RAM, ücretsiz 7/24 erişim, yenileme yok, Node.js/Python desteği ve panel üzerinden startup/env ayarları. Kullanıcı kriterindeki 800 MB’a yakın ve başlangıç için yeterli; ancak hesap yoğunluğu ve ücretsiz kaynak limitleri nedeniyle garanti verilmemeli.

## Güncel aday taraması

Yeni aramada WispByte, HeavenCloud, Bot-Hosting.net, HidenCloud, VisiHost, HYEHOST ve Pella öne çıktı. WispByte resmi sayfası ücretsiz, yenilemesiz ve 7/24 iddiasını sürdürüyor; bilgi bankası ücretsiz sunucu başına 512 MB varsayılan RAM belirtiyor. HeavenCloud arama sonucu 715 MB RAM ve yenilemesiz 7/24 iddiası gösterse de sayfa daha önce tarayıcıda içerik yüklemediği için kesin doğrulanmış sayılmamalı. HYEHOST arama sonucu 256 MB RAM ve 0.1 CPU belirtiyor. Humbleservers 512/768/1024 MB kademeleri ve düşük ücretli 7/24 planlar sunuyor ancak ücretsiz değil. Pella ücretsiz ve premium bot hosting iddiası taşıyor; ücretsiz RAM/yenileme şartı henüz doğrulanmadı.

## Pella
Kaynak: https://www.pella.app/

Pella ücretsiz Discord bot hosting sunduğunu belirtiyor, ancak ücretsiz genel plan 0.1 CPU, 100 MB RAM ve 5 GB disk olarak listeleniyor. 7/24 ve yenilemesiz bot çalışma koşulları bu ana sayfada net olarak belirtilmiyor. Bu nedenle 800 MB–1 GB ücretsiz ve yenilemesiz kriterine uymuyor.

## HYEHOST
Kaynak: https://hyehost.org/free-bot-hosting

Ücretsiz plan 128 MB RAM, 0.05 CPU, 512 MB depolama, 10 Mbps ağ, bir NAT portu ve IPv6 sunuyor. Aktif bot hizmetinde uyku uygulanmadığı ve 7/24 çalışabildiği belirtiliyor; ancak ücretsiz hizmetin her 30 günde panelden manuel yenilenmesi gerekiyor. Node.js, Python, Java, Bun, Deno ve Go destekleniyor. Bu nedenle yenilemesiz şartına uymuyor.

## En güncel kısa sonuç
WispByte ücretsiz katmanı şu an en güçlü aday: ücretsiz, yenilemesiz, 7/24 ve varsayılan 512 MB RAM; ancak hesap başına kaynak ve kullanım politikaları var. HeavenCloud arama sonucu 715 MB ve yenilemesiz 7/24 iddiası taşıyor fakat resmi sayfa içeriği yüklenmediği için doğrulanamadı. Tamamen ücretsiz, yenilemesiz ve yaklaşık 800 MB–1 GB kaynak sunan seçenekler arasında yalnızca WispByte güvenilir biçimde doğrulanabildi; onun da RAM’i 512 MB.

## Ücretli sağlayıcı doğrulaması

### Mamba Host
Kaynak: https://www.mambahost.com/plans/discord/

Mamba Host Discord bot hosting sayfası Node.js ve Python desteği, 7/24 çalışma, otomatik yeniden başlatma ve FTP/SFTP erişimi belirtiyor. Sayfada görünen bir plan 1 GB RAM için $5,49/ay olarak listelenmiş. Arama sonucu başlangıç planını 512 MB RAM ve $1,99/ay olarak gösteriyor; ödeme öncesi panelde güncel fiyat doğrulanmalı.

### Space-Node
Kaynak: https://space-node.net/discord-bot-hosting

Space-Node ücretsiz Starter planında no sleep ve auto-restart olduğunu, ancak destek olmadığını belirtiyor. Ücretli Growth planı 512 MB DDR5 RAM, 10 GB NVMe, no sleep, auto-restart, environment variables ve Node.js/Python desteğiyle €0,50/ay; 6 ay için €3,00 + €0,50 kurulum olarak listelenmiş. Pro planı 1 GB DDR5 RAM, 20 GB NVMe ve aynı temel özelliklerle €1,00/ay; 6 ay için €6,00 + €0,50 kurulum olarak listelenmiş. Ödeme dönemi ve kurulum ücretini hesaba katmak gerekiyor.

## Ücretli model değerlendirmesi

Çok kademeli satış için en uygun görünen plan yapısı Space-Node: 512 MB için €0,50/ay ve 1 GB için €1,00/ay; ikisi de Node.js/Python, no sleep ve auto-restart içeriyor. Mamba Host daha köklü/kurumsal bir alternatif gibi görünse de doğrulanmış fiyatı daha yüksek. Space-Node’un 7/24 iddiası sağlayıcı beyanıdır; müşterilere satmadan önce hizmet şartları, instance sayısı, trafik limiti, destek ve iptal koşulları yazılı olarak kontrol edilmeli.

## Türkiye lokasyonlu Türk sağlayıcılar

### DeHost
Kaynak: https://dehost.com.tr/vps-kirala

DeHost Türkçe müşteri paneli, Türkçe destek iletişimi ve Türkiye lokasyonlu VPS/VDS kategorileri sunuyor. Sayfa 1 GB VPS için kampanyalı 94,99 TL gibi bir arama sonucu fiyatı gösterse de sayfanın taranan ana metninde 1 GB paket detayları net biçimde ayrıştırılamadı; ödeme öncesi fiyat ve lokasyon panelde doğrulanmalı. VPS Linux/Windows ve sanal sunucu kategorileri mevcut. Discord botu için root/SSH, işletim sistemi ve 7/24 süreç ayrıca sorulmalı.

### Turhost
Kaynak: https://www.turhost.com/sunucu/vps-server/

Turhost’un VPS Plus 1 planı 1 vCPU, 1 GB RAM, 20 GB SSD ve 1 TB havuz trafik ile listeleniyor. Sayfadaki kampanyalı fiyat $4,99/ay, normal fiyat $7,99/ay; fiyatların KDV hariç olduğu belirtiliyor. Sayfa Avrupa lokasyonlu veri merkezinden söz ediyor; aynı sayfada VPS TR seçeneği de var, ancak VPS TR’nin ayrıntıları bu taramada açılmadı. Root erişimi, işletim sistemi ve bot çalıştırma uygunluğu satın almadan önce teyit edilmeli.

## Türkiye lokasyonu değerlendirmesi

Türk firma ile Türkiye lokasyonu aynı şey değil: Turhost ve DeHost Türkçe/Türk firma tarafında güçlü görünürken gerçek veri merkezi lokasyonu ürün bazında ayrıca teyit edilmeli. Çok paketli ucuz bot hosting için Türk VPS’ler genellikle Space-Node’un Avrupa bot hosting fiyatlarından daha pahalıdır; karşılığında kaynak ve root kontrolü sağlar. Kullanıcı özellikle yerli veri merkezi istiyorsa “sunucu fiziksel olarak Türkiye’de mi, Node.js/Python botlarına izin var mı, root/SSH ve otomatik yeniden başlatma mevcut mu?” soruları yazılı olarak sorulmalı.

## Doğrudan Türk Discord Bot Hosting adayı: DeHost Discord Bot VDS

Kaynak: https://dehost.com.tr/game/discord

DeHost’un Türkçe sayfası doğrudan “Discord Bot VDS” hizmeti sunuyor. Sayfa Node.js, Python ve diğer dillerde botlar için optimize edilmiş sunucular; 7/24 çalışma; ücretsiz kontrol paneli; DDoS koruması; Türkiye lokasyonu ve ömür boyu destek iddialarını listeliyor. Paketler: Bot VDS-1 2 Core CPU, 2 GB RAM, 30 GB SSD, limitsiz trafik, 7/24 ve Türkiye lokasyonu için 80 TL/ay; Bot VDS-2 4 Core, 4 GB RAM, 50 GB SSD için 140 TL/ay; Bot VDS-3 6 Core, 8 GB RAM, 80 GB SSD için 220 TL/ay. Sayfa VDS kaynaklarını doğrudan müşteri botu için konumlandırıyor.

Kritik not: Sayfa doğrudan Discord bot VDS hizmeti olduğu için önceki genel VPS adaylarından daha uygun. Ancak çok müşterili paket satışında tek bir VDS’in kaç izole bot instance’ına bölünebileceği, root/SSH erişimi, otomatik yeniden başlatma, ticari/reseller kullanım izni, aylık trafik/fair-use ve kaynakların gerçekten ayrılmış olup olmadığı ayrıca yazılı teyit edilmeli. Paketler 512 MB/1 GB gibi küçük kademeler değil, 2 GB’tan başlıyor.

## Doğrudan Türk Discord Bot Hosting adayı: HostcuTürk

Kaynak: https://www.hostcuturk.com.tr/discord-bot-vds

HostcuTürk Türkçe sayfası doğrudan Discord Bot VDS hizmeti sunuyor. Sayfada Node.js, Python ve diğer diller, 7/24 çalışma, Türkiye lokasyonu, ücretsiz kontrol paneli, DDoS koruması ve teknik destek belirtiliyor. Paketler Bot VDS-1 için 2 Core CPU, 2 GB RAM, 30 GB SSD ve 80 TL/ay; Bot VDS-2 için 4 Core, 4 GB RAM, 50 GB SSD ve 140 TL/ay; Bot VDS-3 için 6 Core, 8 GB RAM, 80 GB SSD ve 220 TL/ay olarak listelenmiş.

Sayfa üzerinde iletişim ve hesap bağlantılarında farklı alan adları görülmesi nedeniyle satın almadan önce firma, fatura, veri merkezi, root/SSH, otomatik yeniden başlatma ve ticari/reseller kullanım şartları yazılı olarak doğrulanmalı. Bu aday, doğrudan Discord bot VDS olarak listelendiği için genel shared hosting’den daha uygun; ancak küçük 512 MB/1 GB paket sunmuyor.

## X Host benzeri hazır paketli bot hosting

### TheXHosting
Kaynak: https://thexhosting.com/discord-bot-hosting/

TheXHosting doğrudan Discord bot hosting sunuyor; Node.js, Python ve Java desteği, panelden dosya/startup/log/restart yönetimi, 7/24 çalışma ve üç hazır paket listeleniyor: Bot Start 512 MB RAM / 1 CPU / 5 GB NVMe $1/ay; Bot Plus 1 GB RAM / 2 CPU / 10 GB NVMe $2/ay; Bot Pro 2 GB RAM / 4 CPU / 20 GB NVMe $3/ay. Sayfa firma/lokasyonun Türkiye olduğunu göstermiyor; Türk hosting kriterine uymuyor, fakat kullanıcının tarif ettiği ürün modeline en yakın örnek.

### Keyubu
Kaynak: https://keyubu.com/discord-bot-sunucusu-kirala/

Keyubu Türkçe doğrudan Discord Bot VDS sayfası sunuyor; 7/24 aktif, %99,9 uptime, NVMe ve destek vurguları var. Ancak görünen paketler 4 GB RAM’den başlıyor: 4 GB 174,90 TL/ay, 6 GB 214,90 TL/ay, 8 GB 254,90 TL/ay. Bu nedenle X Host gibi 512 MB/1 GB/2 GB çok kademeli ucuz bot hosting modeline tam uymuyor.

## Sonuç
Kullanıcının tam aradığı model (hazır panel + 512 MB/1 GB/2 GB + ucuz + Node.js/Python + 7/24) TheXHosting’de net biçimde var, fakat Türk firma/lokasyon değil. Türkçe doğrudan bot hosting olarak Keyubu var, fakat küçük paketlerden başlamıyor. Bu taramada Türk firmaya ait, X Host modeliyle aynı küçük kademeleri açıkça listeleyen doğrulanabilir bir servis bulunamadı.

## Ücretsiz Türk proje tanıtım toplulukları

### Yazılımcı Mekanı
Kaynak: https://discord.com/invite/rANTmRzuHZ

Discord arama sonucunda Türkçe yazılım, kodlama ve programlama destek topluluğu olarak listeleniyor; arama sonucu yaklaşık 19.586 üye gösteriyor. Davet sayfası tarayıcıda dinamik yüklenmediği için aktiflik ve tanıtım kanallarının güncel durumu doğrulanamadı. Katıldıktan sonra proje paylaşım/portföy kanalını ve reklam kurallarını kontrol etmek gerekir.

### DevSphere Türk Yazılım & Geliştirici
Kaynak: https://discord.com/servers/devsphere-turk-yazilim-gelistirici-sunucusu-1345735521942376540

Discord keşif sayfası topluluğu Türkçe olarak listeliyor; yaklaşık 2.284 üye ve 66 çevrimiçi kullanıcı gösteriyor. Açıklamada proje paylaşımı, teknik destek, developer kiralama ve ekip bulma fırsatları belirtiliyor. Sayfa başlığında “#KAPALI” ibaresi bulunduğu için davetin ve tanıtım kanallarının güncel olarak çalıştığı ayrıca kontrol edilmeli.

### Genel kullanım notu

Bu topluluklarda proje tanıtımı ücretsiz olabilir fakat tanıtım kanalına erişim için rol alma, doğrulama, hesap yaşı, günlük paylaşım limiti veya karşılıklı reklam şartı bulunabilir. İlk mesajda doğrudan link bırakmak yerine kuralları okuyup projeyi kısa problem/çözüm formatında paylaşmak daha güvenlidir.
