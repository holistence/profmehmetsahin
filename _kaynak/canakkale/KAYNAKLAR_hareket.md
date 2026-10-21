# Çanakkale ilçeleri: sınır geometrisi ve nüfus hareketleri, kaynak notları

Derleme tarihi: 21.10.2026. Bulunamayan değerler boş bırakıldı. Hiçbir değer tahmin edilmedi ya da hesapla türetilmedi.

## 1. ilceler.json (ilçe sınırları)

- **Kaynak:** OpenStreetMap, admin_level=6 (ilçe) sınır ilişkileri. Overpass ile 30.05.2020'de alınmış ve GeoJSON'a çevrilmiş.
  Depo: https://github.com/izzetkalic/geojsons-of-turkey, dosya `geojsons/turkey-admin-level-6.geojson`. Dosya Git LFS'te (45,2 MB). `media.githubusercontent.com` üzerinden indirildi ve SHA-256 değeri LFS işaretçisindeki oid ile eşleşti (6defd527…).
- **Lisans:** ODbL (Open Database License), © OpenStreetMap katkıcıları. Dosyanın içinde de bu not var. Yayında "© OpenStreetMap katkıcıları, ODbL" atfı gerekir. Deponun kendisinde ayrı bir lisans dosyası yok.
- **İşleme:** 12 ilçe ada göre ayıklandı. OSM'deki "Çanakkale merkez" adı "Merkez", "Ayvacik" adı da "Ayvacık" yapıldı. Koordinatlar Web Mercator'a (küresel) çevrildi ve 1000 birim genişliğe ölçeklendi (10 birim kenar boşluğuyla), viewBox `0 0 1000 907`. Her ilçe shapely `simplify(0.25, preserve_topology=True)` ile ayrı ayrı sadeleştirildi. 4 px²'den küçük adacıklar çıkarıldı (Biga ve Lapseki çok-poligonlarındaki küçük adacıklar ile Tavşan Adaları gibi). `cx` ve `cy` alanları, ilçe adının yazılacağı yer için representative_point değeridir.
- **Kontrol:** Bozcaada ve Gökçeada ayrı adalar olarak çiziliyor, Gelibolu ve Eceabat Avrupa yakasında. Görsel: `ilceler_kontrol.png`. Dosya boyutu yaklaşık 33 KB.
- **Uyarılar:** Veri 2020 tarihli. Çanakkale'de bu tarihten sonra ilçe değişikliği olmadı, ancak OSM sınırları resmî HGM/TKGM sınırı değildir. İlçeler ayrı ayrı sadeleştirildiği için komşu sınırlarda 1 px'in altında boşluk ya da bindirme olabilir.

## 2. ilce_hareket.csv (ilçe düzeyinde nüfus hareketleri)

| değişken | yıl | durum |
|---|---|---|
| evlenme | 2025 | 12 ilçenin tamamı |
| bosanma | 2025 | 12 ilçenin tamamı |
| dogum | 2025 | 12 ilçenin tamamı |
| evlenme, bosanma, dogum | 2014–2024 | bulunamadı |
| olum | tüm yıllar | bulunamadı |
| goc_alinan, goc_verilen, goc_net | tüm yıllar | bulunamadı |
| hane_sayisi, hane_buyuklugu | tüm yıllar | bulunamadı |

- **Kaynak:** nufusune.com ilçe sayfaları (`https://www.nufusune.com/{ilce}-ilce-nufusu-canakkale`). Sayfaların belirttiği kaynak "TÜİK Doğum, Evlenme ve Boşanma İstatistikleri", 2025. Değerler sayfadaki cümlelerden aynen alındı, örneğin "2025 yılında 212 evlenme ve 73 boşanma kaydedildi". Her ilçe iki ayrı okumayla doğrulandı. Sayfalardaki "her 100 evlenmeye karşılık N boşanma" oranları da değerlerle tutarlı.
- **Okuma notu:** WebFetch ilk denemede Lapseki, Yenice ve Gökçeada sayfalarında bu bölümü göremedi. Sayfalar önbellek dışı yeniden okununca bölüm göründü.
- **Bir yıllık veri:** nufusune ilçe sayfaları yalnızca 2025 yılını veriyor. Sayfaların kendi notuna göre "İlçe düzeyinde yaş, hanehalkı ve doğurganlık verisi TÜİK tarafından yayımlanmıyor."

### Tutarlılık (12 ilçe toplamı ile il toplamı, 2025)

| değişken | 12 ilçe toplamı | il toplamı | fark |
|---|---|---|---|
| evlenme | 3424 | 3424 (TÜİK il tablosu `_l_ve__l_e_Evlenme_Say_s__TRDF_EVLENME_IL_ILCE1.0.xlsx`) | 0 |
| dogum | 4229 | 4229 (nufusune Çanakkale il sayfası, TÜİK 2025) | 0 |
| bosanma | 1563 | 1524 (TÜİK il tablosu `_l_ve__l_e_Bo_anma_Say_s__TRDF_BOSANMA_IL_ILCE1.0.xlsx`) | +39 (%2,6) |

Boşanmadaki farkın nedeni belirlenemedi. TÜİK'in ilçe dağılımı ile il toplamının farklı bir esasa dayanması mümkün, ancak doğrulanmadı. Her ilçenin boşanma/evlenme oranı sayfadaki yüzdeyle tutarlı olduğundan bir okuma hatası olası görünmüyor. Yayında bu not belirtilmeli ya da TÜİK portalından ilçe tablosu kontrol edilmeli.

## 3. Denenip sonuç alınamayanlar

- **TÜİK veri portalı** (veriportali.tuik.gov.tr, data.tuik.gov.tr, biruni MEDAS): WebFetch sayfaları JavaScript olmadan boş döndürüyor. Shell'den erişim yok (HTTP 000). Elimizdeki TÜİK "İl ve İlçe Evlenme/Boşanma Sayısı" dışa aktarımları yalnızca il satırlarını içeriyor (81 il). İlçe kırılımı portalda ayrıca seçilip yeniden indirilmeli; 2014–2024 ilçe serileri ancak bu yolla alınabilir.
- **nufusu.com, endeksa.com:** ilçe sayfalarında hareket verisi yok, endeksa ise JavaScript gerektiriyor.
- **İŞKUR Çanakkale 2024 faaliyet raporu** (https://media.iskur.gov.tr/101235/canakkale.pdf): ilçe nüfusu var (ADNKS 2023), göç verisi yalnızca il düzeyinde.
- **Çan Belediyesi plan açıklama raporu 2026** (https://www.can.bel.tr/wp-content/uploads/2026/06/Plan-Aciklama-Raporu_5000.pdf): yalnızca nüfus var.
- Haber, GMKA ve İl Sağlık Müdürlüğü aramaları ilçe düzeyinde ölüm, göç ya da hane tablosu vermedi.
- **Öneri:** ilçe göçü (ADNKS "ilçelerin aldığı/verdiği göç"), ölüm ve 2014–2024 evlenme/boşanma ilçe serileri için TÜİK veri portalına tarayıcıdan girilip ilçe kırılımıyla Excel indirilmeli.
