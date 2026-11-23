# Veri Araçları: kaynak ve üretim

`/veri/` altındaki üç aracın veri dosyaları (`veri.js`) araştırma veri arşivinden üretilir.
Arşiv dosyası (xlsx) bu depoda tutulmaz; yalnızca araçların kullandığı alt kümeler yayımlanır.

Üretim: `python3 insa.py <arsiv.xlsx> <cikti_klasoru>` üç JSON dosyası yazar
(`veri_A.json`, `veri_B.json`, `veri_C.json`). Bunlar `const VERI = ...;` biçiminde
ilgili aracın `veri.js` dosyasına konur.

| Araç | Kapsam | Değişkenler | Kaynak |
|---|---|---|---|
| İlin karnesi | 81 il, 2016–2024 | nüfus, vergi tahsilatı, merkezi yönetim faiz dışı harcama | HMB Muhasebat Genel Müdürlüğü, GİB, TÜİK |
| Yerel yönetimler ne harcıyor? | 81 il, 2007–2025 | yerel yönetim harcama kalemleri, gelir, denge (kişi başına, 2025 fiyatlarıyla) | HMB yerel yönetim bütçe istatistikleri, TÜİK ADNKS |
| İlin kaç yılda ne kadar değişti? | 81 il, 2000–2025 | reel GSYH endeksi, kişi başına reel gelir, nüfus, hekim, yatak, elektrik, yaşlı payı, hane büyüklüğü, yükseköğretim, otomobil | TÜİK, Sağlık Bakanlığı |

Hesaplama notları:
- Karnede harcama, illere göre kaydedilen merkezi yönetim harcamasından faiz çıkarılarak alınır.
  İllere dağıtılmayan harcamalar kapsam dışıdır; bu yüzden oranlar Türkiye ortalamasına (=1) göre verilir.

## Hâlâ aile evinde

Kaynak: TÜİK, İstatistiklerle Aile 2025, "Cinsiyete göre anne ve/veya babası ile birlikte yaşayan 25-29 yaş grubu hiç evlenmemiş kişi sayısı ve oranı" (ADNKS, 81 il). Tablodaki kişi sayıları `veri/aile-evinde/veri.js` dosyasına aktarılır; cinsiyet oranları her cinsiyetin kendi paydasıyla sayfada hesaplanır.
