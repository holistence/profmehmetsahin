# Şehrini ne kadar tanıyorsun? — Veri kaynakları

Derleme: 12.11.2026. Dosyalar: `il_verisi.csv` (okunur tablo), `../../sehir-buyurken/sehrini-tani/il-veri.js` (sitede kullanılan).

| Sütun | Gösterge | Yıl | Kaynak |
|---|---|---|---|
| nufus | Toplam nüfus | 2025 | Prof. Dr. Mehmet Şahin, "Türkiye Araştırma Master Veri Arşivi v1" (TÜİK ADNKS) |
| degisim | Nüfus değişimi, % | 2015→2025 | aynı arşiv (2015 ve 2025 nüfusu) |
| yasli | 65 yaş ve üzeri nüfusun payı, % | 2024 | aynı arşiv (TÜİK ADNKS). 2025 il serisi arşivde yok. |
| hane | Ortalama hanehalkı büyüklüğü | 2025 | aynı arşiv (DEM_ORT_HANE_BUYUKLUGU) |
| netgoc | Net göç hızı, ‰ (net göç ÷ 2025 nüfusu × 1000) | 2025 | TÜİK İç Göç İstatistikleri 2025, il tablosu; ikincil aktarım: habertürk, "İstanbul'dan kaçış: 5 yılın 4'ünde net göç kaybı yaşadı" |
| gelen / giden | İlin aldığı / verdiği göç ÷ nüfus, % | 2025 | aynı tablo |

## Doğrulama
- Göç tablosundaki 81 ilin "toplam nüfus" sütunu, arşivdeki 2025 nüfusuyla 81/81 il birebir aynı.
- 81 ilin aldığı göç toplamı 2.475.019 = TÜİK bülteninin Türkiye toplamı. Net göçlerin toplamı 0.
- Hız formülü: İstanbul −41.346 ÷ 15.754.053 × 1000 = −2,62 ‰, haberde aktarılan TÜİK değeriyle aynı.
- Türkiye geneli 65+ payı (81 ilin nüfus ağırlıklı ortalaması, 2024) %10,6 = TÜİK 2024 değeri.
- Türkiye geneli gelen oranı %2,9; TÜİK "iller arası göç eden nüfus oranı" 2025: %2,87.
- Çanakkale: 573.976 kişi (kitaptaki 2025 değeriyle aynı), 65+ %17,2 (2024), hane 2,51.

## Yayın öncesi önerilen
- Net göç tablosunun TÜİK'in kendi il tablosuyla (İç Göç İstatistikleri 2025) bir kez daha karşılaştırılması.
- TÜİK 2025 il düzeyinde 65+ payı yayımlandığında `yasli` sütununun güncellenmesi.
