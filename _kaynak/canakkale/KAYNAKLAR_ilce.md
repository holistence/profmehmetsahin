# Çanakkale ilçe serileri — kaynaklar, kontroller, eksikler

Dosya: `ilce_seri.csv` (uzun format, UTF-8, 1402 satır). Sütunlar: `ilce,yil,degisken,deger,kaynak_url`.
Derleme tarihi: 21.10.2026. Bütün sayılar web sayfalarından aktarıldı; tahmin, hafızadan değer ya da enterpolasyon yok. Bulunamayan değerler dosyada yer almıyor (satır yok = veri yok).

## Erişim durumu
- TÜİK (data.tuik.gov.tr, biruni.tuik.gov.tr/medas): WebFetch ile erişilemedi (sunucu hatası / robots engeli). Bu yüzden **birincil TÜİK tablosu doğrudan okunmadı**; aşağıdaki tüm değerler TÜİK'e dayanan **ikincil** kaynaklardan alındı.
- tr.wikipedia.org: tüm sayfalar (ilçe maddeleri, `Şablon:Türkiye ilçe nüfus/...`) WebFetch'te "URL_NOT_FOUND" döndürdü. Eski sayım tabloları bu yüzden alınamadı.
- harita.gov.tr (HGM yüzölçümü tablosu), citypopulation.de il sayfası, canakkale.kutuphane.gov.tr: robots engeli.

## 1. Nüfus, erkek, kadın — 2007–2025 (ADNKS, 31 Aralık) — TAM
- Değişkenler: `nufus`, `erkek`, `kadin`; 12 ilçe × 19 yıl, eksik yok.
- Kaynak (ikincil, TÜİK ADNKS'e dayalı): nufusune.com ilçe sayfaları, `https://www.nufusune.com/{ilce}-ilce-nufusu-canakkale`.
- **Zorunlu tutarlılık kontrolü: 19 yılın 19'unda tutuyor.** 12 ilçenin toplamı verilen TÜİK il toplamına her yıl birebir eşit (fark = 0). Ayrıca ilçe erkek toplamı ve kadın toplamı da nufusune il sayfasındaki il erkek/kadın değerlerine her yıl birebir eşit; her satırda erkek + kadın = toplam.
- Bağımsız ikinci kaynakla karşılaştırma (hepsi birebir aynı, uyuşmazlık yok):
  - nufusu.com: 2025'te 12 ilçenin tamamı (toplam/erkek/kadın); Bozcaada'nın 2007–2025 serisinin tamamı.
  - en.wikipedia ilçe maddeleri (kaynak TÜİK ADNKS 2021): 2021'de 12 ilçenin tamamı.
  - en.wikipedia Çanakkale Province ilçe tablosu: 2022'de 12 ilçenin tamamı.
  - investincanakkale.com (GMKA), "TÜİK, 2021" tablosu: 2021'de 12 ilçenin tamamı.
  - urbistat (Fonte TURKSTAT): 2020'de 12 ilçenin tamamı, erkek/kadın dahil; Bozcaada 2015–2020.
  - citypopulation.de: Lapseki 2009, 2013, 2017, 2022.
- Not (yorum değil, gözlem): Gelibolu, Gökçeada, Ezine ve Merkez'de erkek fazlası ve yıllar arasında sıçramalar var (ör. Ezine 2010: 36.088, erkek 20.205). Bunlar kaynakta aynen böyle; büyük olasılıkla kurumsal nüfus (asker, cezaevi, öğrenci yurdu) etkisi. Düzeltme yapılmadı.

## 2. Yaş yapısı — yalnızca 2020
- Kaynak (ikincil): urbistat AdminStat, `https://ugeo.urbistat.com/AdminStat/en/tr/demografia/eta/{ilce}/{id}/4`, sayfa notu "Age Classes: Fonte TURKSTAT", yıl 2020.
- Değişkenler (toplam + `_erkek` + `_kadin`): `yas_0_2, yas_3_5, yas_6_11, yas_12_17, yas_18_24, yas_25_34, yas_35_44, yas_45_54, yas_55_64, yas_65_74, yas_75p` ve bunlardan toplanan `yas_65p` (= 65–74 + 75+). Bu sınıflar urbistat'ın sınıflarıdır, TÜİK'in 5'li grupları değil.
- Kontroller: Her ilçede yaş sınıfları toplamı = ADNKS 2020 toplamı; erkek ve kadın sütun toplamları ADNKS 2020 erkek/kadın değerleriyle birebir aynı; her satırda erkek + kadın = toplam.
- **`yas_0_14` ve `yas_15_64` (2020) TÜRETİLMİŞ:** Urbistat 0–14'ü ayrı vermiyor (12–17 sınıfı 14/15 sınırını kesiyor). Sayfadaki yaşlılık endeksi (65+ / 0–14 × 100, iki ondalık) ve 65+ sayısından, 0–11 ile 0–17 arasında kalan ve endeksi yuvarlamayla birlikte sağlayan **tek bir tamsayı** bulunduğu 11 ilçede bu değer yazıldı. `yas_15_64` = nufus − yas_0_14 − yas_65p. **Merkez'de 4 aday çıktı (30.911–30.914), bu yüzden Merkez'in yas_0_14 ve yas_15_64 değerleri boş bırakıldı.** Yayında bu iki değişken "türetilmiş" diye belirtilmeli ya da TÜİK MEDAS'tan doğrudan alınıp değiştirilmeli.
- `ort_yas`, `ort_yas_erkek`, `ort_yas_kadin` (2020, urbistat): **ortalama** yaş, medyan değil. `yaslilik_endeksi` (2020) de urbistat'ın sayfasından.
- `medyan_yas` (2021): investincanakkale.com (GMKA) "İlçeler Bazında Ortanca Yaş (TÜİK, 2021)" tablosu, 12 ilçenin tamamı. İkinci bir kaynakla karşılaştırılamadı.
- Eksik: 2020 ve 2021 dışında hiçbir yıl için ilçe yaş verisi bulunamadı. TÜİK MEDAS'ta 2007–2025 ilçe × 5'li yaş grubu var; erişilemedi.

## 3. Medeni durum — yalnızca 2020
- Kaynak (ikincil): urbistat, `.../demografia/famiglie/{ilce}/{id}/4`, "Civil Status: Fonte TURKSTAT", 2020.
- Değişkenler: `md_bekar, md_evli, md_bosandi, md_esi_oldu`, her biri ayrıca `_erkek`, `_kadin`; `md_taban = tum_yaslar`.
- **Önemli:** Urbistat'ta dört kategorinin toplamı ilçenin **toplam nüfusuna** eşit. Yani "bekar" (Bachelors/Bachelorette) 15 yaş altındaki çocukları da içeriyor. Bu bir 15+ tabanı **değil**. 15+ hiç evlenmemiş sayısı bundan çıkarılmadı, çünkü 0–14'ün cinsiyete göre dağılımı yok ve urbistat'ın yöntemi belgelenmemiş.
- Kontroller: 12 ilçenin hepsinde kategoriler toplamı = ADNKS 2020 toplamı; erkek kategorileri toplamı = ADNKS 2020 erkek; kadın kategorileri toplamı = ADNKS 2020 kadın.
- Eksik: Başka yıl yok. İkinci bağımsız kaynak bulunamadı.

## 4. Eğitim durumu — BULUNAMADI
- İlçe düzeyinde yılı ve kaynağı belli, sayı içeren bir kaynak bulunamadı. emlakjet/Endeksa ilçe demografi sayfaları yüzde veriyor ama **yıl ve kaynak belirtmiyor** (ve toplamları %100 etmiyor). Bu yüzden kullanılmadı.
- `egt_*` değişkenleri dosyada yok.

## 5. Eski genel nüfus sayımları (1927–2000) — BULUNAMADI
- tr.wikipedia erişilemedi. "Çanakkale Yerleşmesinin Durum Raporu 2003" PDF'inde ilçe tablosu (Çizelge 38, 2000 GNS) var ama metin çıkarımı tablo sayfalarına ulaşmadı. Eski sayım değeri eklenmedi.

## 6. Yüzölçümü ve idari birimler
- `alan_km2` (yıl boş): en.wikipedia ilçe maddeleri. 11 ilçede kaynak HGM "İl ve İlçe Yüz ölçümleri" (erişim 01.03.2023); **Bozcaada (39,9) farklı bir kaynaktan ("yearbook")**. 12 ilçenin toplamı 9.818,9 km²; il yüzölçümü (HGM, en.wikipedia) 9.817 km², fark 1,9 km².
  - **Uyuşmazlık uyarısı:** en.wikipedia "Çanakkale Province" sayfasındaki ilçe tablosunda farklı değerler var (Ayvacık 872, Bayramiç 1.085, Biga 1.266, Bozcaada 37, Çan 876, Merkez 1.029, Eceabat 416, Ezine 768, Gelibolu 830, Gökçeada 283, Lapseki 867, Yenice 1.476; toplam 9.804). GMKA sitesi Ayvacık için 874 diyor. Alan değerleri **doğrulanmış değil**. Yayından önce HGM tablosundan teyit edilmeli.
- `mahalle_sayisi`, `koy_sayisi`, `mahalle_koy` (2025): nufusune.com ilçe sayfaları.
  - Köy sayıları en.wikipedia (e-içişleri envanteri) ile karşılaştırıldı: Merkez 52, Ayvacık 64, Bayramiç 75, Biga 108, Çan 65, Lapseki 40, Yenice 76 aynı. Ezine'de fark var: nufusune 48, wiki 49. Bozcaada'da köy yok (0), wiki de bunu doğruluyor. Eceabat 12 köy, GMKA ile aynı. Gelibolu (26) ve Gökçeada (9) ikinci kaynakla karşılaştırılamadı.
  - Mahalle sayıları ikinci kaynakla doğrulanamadı. **Merkez için verilen 10 mahalle şüpheli**: nufusune listesi yalnızca 10 ad içeriyor (Kepez beldesininkiler dahil). Yayında kullanmadan önce teyit edilmeli.

## Birincil / ikincil ayrımı
Birincil (TÜİK'in kendisi) hiçbir değer doğrudan okunamadı. Kaynakların hepsi TÜİK'e atıf yapan ikincil kaynaklar: nufusune.com, nufusu.com, urbistat, GMKA/investincanakkale, Wikipedia ve citypopulation. Nüfus serisi, il toplamlarıyla birebir tuttuğu ve çok sayıda bağımsız kaynakla örtüştüğü için yüksek güvenilirlikte. Yaş ve medeni durum verilerinin (2020) iç toplamları ADNKS ile tutuyor, ama tek kaynaklı.

## Tamamlamak için öneri
TÜİK MEDAS'a (biruni.tuik.gov.tr/medas) tarayıcıyla girilip şu tablolar indirilirse eksikler birincil kaynaktan kapanır: "İl/ilçe, yaş grubu ve cinsiyete göre nüfus" (2007–2025), "medeni durum" (15+) ve "eğitim durumu" (ADNKS, 2008–). Eski sayımlar için TÜİK "Genel Nüfus Sayımları" yayınları ya da tr.wikipedia `Şablon:Türkiye ilçe nüfus/Çanakkale/*` sayfaları kullanılabilir.
