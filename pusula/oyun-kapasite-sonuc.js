/* Oyun — Kapasite mi, sonuç mu? Ayrım: Çanakkale'nin Pusulası, Bölüm 14.3 ve Bölüm 12. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok) return;
  // [gösterge, 'K' kapasite | 'S' sonuç, açıklama]
  var G = [
    ['Hastane yatak sayısı', 'K', 'Kapasite. Kitaba göre il geneli kapasite göstergeleri sevk, seyahat süresi, bekleme ve kullanım verileriyle tamamlandığında gerçek erişim izlenebilir.'],
    ['İlçeler arası sağlık sevk süreleri', 'S', 'Sonuç. Kitap bunu bugün düzenli üretilmeyen ama karar için gereken göstergeler arasında sayar.'],
    ['Bakım tesisi ve hizmet sayısı', 'K', 'Kapasite. Kitaba göre yaşlanan nüfus için yalnız tesis sayısı değil, başvuru, erişim, bekleme ve kullanım önemlidir.'],
    ['Bakım başvurusu, bekleme ve kullanım', 'S', 'Sonuç. Yeni bir bakım hizmetinin açılması tek başına yeterli değildir. Hedef nüfusun hizmete ulaşıp ulaşmadığı izlenmelidir.'],
    ['Üretilen konut sayısı', 'K', 'Kapasite. Kitaba göre barınmada yalnız konut üretimi değil, kira ile hane geliri arasındaki ilişki önemlidir.'],
    ['Kira ile hane geliri arasındaki oran', 'S', 'Sonuç. Kitap bunu ölçmek için bir konut erişilebilirliği gözlemevi önerir (Politika 13).'],
    ['Ziyaretçi ve geceleme sayısı', 'K', 'Kapasite. Kitaba göre turizmde asıl soru yalnızca kaç kişinin geldiği değildir.'],
    ['Ortalama kalış süresi, sezonun yayılması ve yerel harcama', 'S', 'Sonuç. Ziyaretçinin ne kadar kaldığı ve harcamasının yerel ekonomiye nasıl yayıldığı, turizmin kentte bıraktığı değeri gösterir.'],
    ['ÇOMÜ öğrenci sayısı', 'K', 'Kapasite. Üniversitenin ölçeğini gösterir, kente etkisini göstermez.'],
    ['Mezunların 1., 3. ve 5. yılda Çanakkale’de kalma oranı', 'S', 'Sonuç. Kitaba göre bu oran bugün bilinmiyor ve mezun izleme programı (Politika 8) bunu ölçmeyi hedefliyor.'],
    ['Tamamlanan yeni isale hattı', 'K', 'Kapasite. Kitaba göre yeni bir altyapının yapılmış olması önemli bir çıktıdır, ama asıl sonuç bu değildir.'],
    ['Hizmet kesintilerinin sıklığı', 'S', 'Sonuç. Asıl soru, kesintilerin azalıp azalmadığı ve kullanıcının karşılaştığı koşulların iyileşip iyileşmediğidir.']
  ];
  var sira, i, puan;
  function basla() { sira = ST.karistir(G); i = 0; puan = 0; ciz(); }
  function ciz() {
    if (i >= sira.length) return bitir();
    var g = sira[i];
    kok.innerHTML = '<div class="kart"><div class="ilerleme">' + sira.map(function (_, k) { return '<i' + (k <= i ? ' class="on"' : '') + '></i>'; }).join('') + '</div><p class="adim">Gösterge ' + (i + 1) + ' / ' + sira.length + '</p>' +
      '<div class="kartcik">' + esc(g[0]) + '</div><div class="secenekler" style="grid-template-columns:1fr 1fr"><button class="secenek" data-v="K">Kapasite<br><span class="kucuk">Ne kadar var?</span></button><button class="secenek" data-v="S">Sonuç<br><span class="kucuk">Hayatta ne değişti?</span></button></div><div id="geri"></div></div>';
    kok.querySelectorAll('.secenek').forEach(function (b) {
      b.onclick = function () {
        var ok = b.dataset.v === g[1]; if (ok) puan++;
        kok.querySelectorAll('.secenek').forEach(function (x) { x.disabled = true; if (x.dataset.v === g[1]) x.classList.add('dogru'); });
        if (!ok) b.classList.add('yanlis');
        $('#geri').innerHTML = '<p style="margin-top:12px"><b class="' + (ok ? 'ok' : 'uyari') + '">' + (ok ? 'Doğru.' : 'Değil.') + '</b> ' + esc(g[2]) + '</p><div class="dugmeler"><button class="btn" id="ileri">' + (i < sira.length - 1 ? 'Sonraki' : 'Sonucu gör') + '</button></div>';
        $('#ileri').onclick = function () { i++; ciz(); };
      };
    });
  }
  function bitir() {
    var u = puan >= 11 ? 'Sonuca bakan göz' : puan >= 8 ? 'Farkı görüyorsun' : 'Kapasiteye kanmaya yakın';
    ST.kaydet('kapasite-sonuc', puan + ' / 12');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">On iki gösterge</p><div class="puan">' + puan + ' <span class="kucuk">/ 12</span></div><h2>' + u + '</h2>' +
      '<p>Kapasite, bir kentin neye sahip olduğunu söyler: yatak, konut, otel, öğrenci, boru hattı. Sonuç ise bu kapasitenin insanların hayatında neyi değiştirdiğini. Kitabın 2035 bakışında yönlendirilmiş dönüşümü öbür senaryolardan ayıran şey, bu ikisini birlikte izlemektir.</p>' +
      '<p class="kitapta">Kitaptan: Başarı ölçüsü kapasitenin kendisinden sonuçlarına doğru genişler.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Yeniden oyna</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('kapasite-sonuc'), mesaj: 'Kapasite mi, sonuç mu? On iki göstergeden ' + puan + ' tanesini doğru ayırdım. Sen dene:',
      hikaye: { ust: 'Kapasite mi, sonuç mu?', etiket: 'Doğru ayırdığım', baslik: puan + ' / 12', ek: u, alt: 'Sen kaç doğru yaparsın?' } });
    $('#yeniden').onclick = basla;
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('kapasite-sonuc');
  }
  basla();
})();
