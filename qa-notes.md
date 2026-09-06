
## Discord DM ödeme akışı QA — 2026-09-05

Paket kartları masaüstü ve 390px mobil görünümde kontrol edildi. İki ayrı onay satırı kart genişliğine uyuyor; politika metni bağlantıları okunabilir durumda. Onay verilmeden Discord sipariş butonu pasif kalıyor. Onay sonrası buton seçilen paket ve fiyatı içeren hazır Discord mesajını panoya kopyalayıp sipariş DM profilini yeni sekmede açıyor. Kart altındaki açıklama ödemenin web sitesinde alınmadığını ve Discord DM’de netleştirildiğini belirtiyor. TypeScript kontrolü ve production build başarılı.

## Google SEO ve özel domain QA — 2026-09-06

`gokturklabs.vercel.app` üretim adresinde yeni title, canonical, robots meta, Open Graph ve JSON-LD çıktıları doğrulandı. `/robots.txt` 200 ve text/plain, `/sitemap.xml` 200 ve application/xml olarak açılıyor; SPA fallback artık statik dosyaları ezmiyor. `gokturklabs.dev.tc` adresi tarayıcı ve curl kontrolünde `ERR_CERT_DATE_INVALID` veriyor. Sertifika `CN=dev.tc`, wildcard `*.dev.tc` ve geçerlilik bitişi 2026-09-05; ayrıca Vercel projesinin domain listesinde bu özel domain bulunmuyor. Bu nedenle SSL/domain sorunu koddan değil, domainin Vercel’e eklenmemesi veya DNS/sertifika sağlayıcısı yapılandırmasından kaynaklanıyor.

## Paket kuralları güncellemesi QA — 2026-09-06

Masaüstü ve 390px mobil görünüm kontrol edildi. Paketler 0/50/150/350 TL olarak görünüyor. Free kartında KAMPANYA etiketi, 3 modül ve “+1” bilgisi ile yuvarlak köşeli zorunlu duyuru paneli görünüyor. Dengeli kartta custom bot yok ve 4 modül; Gelişmiş kartta 8 modül, Pro kartta 12 modül bilgisi var. Modüllü seçeneklerde Göktürk Labs sunucusu, custom seçenekte kullanıcı veya Göktürk Labs sunucusu ve kod paylaşımı ayrımı kartlarda taşmadan okunuyor. SEO dosyaları önceki canlı kurulumdaki robots/sitemap/metadata yapısını koruyor.
