/* Oyun — Öncelik puanını sen ver. Eşikler: Çanakkale'nin Pusulası, Bölüm 3, Tablo 3 (pilot puanlama eşikleri). Vakalar kurgusaldır. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok) return;
  var OLC = [
    ['İhtiyaç yoğunluğu', ['Hedef grup oranı ilçe ortalamasının %80’inden düşük', 'İlçe ortalamasının %80–120’si', 'İlçe ortalamasının %120’sinden yüksek']],
    ['Kapasite baskısı', ['Doluluk %80’in altında, düzenli bekleme yok', 'Doluluk %80–90 ya da dönemsel bekleme var', 'Doluluk %90’ın üstünde, sürekli bekleme ya da karşılanamayan talep var']],
    ['Erişim güçlüğü', ['Ortalama erişim 30 dakikadan kısa ve düzenli ulaşım var', '30–60 dakika ya da ulaşım seçenekleri sınırlı', '60 dakikadan uzun ya da düzenli ulaşım bağlantısı yok']],
    ['Süreklilik', ['Tek bir dönemde görülmüş', 'İki ardışık dönemde görülmüş', 'En az üç ardışık dönemde sürmüş']]
  ];
  var V = [
    { ad: 'Kıyıdaki bir ilçede evde bakım hizmeti', d: ['65 yaş ve üzeri nüfusun payı ilçe ortalamasının %135’i', 'Doluluk %92, bekleme listesi hiç boşalmıyor', 'Ortalama erişim 45 dakika', 'Durum üç dönemdir aynı'], c: [2, 2, 1, 2], kaynak: 'kapasite' },
    { ad: 'Merkezde bir mahallede kreş', d: ['0–5 yaş çocukların payı ilçe ortalamasının %95’i', 'Doluluk %85, eylülde bekleme oluşuyor', 'Ortalama erişim 20 dakika, düzenli otobüs var', 'Bekleme iki dönemdir görülüyor'], c: [1, 1, 0, 1], kaynak: 'donem' },
    { ad: 'İç kesimde bir köy grubunda yaşlı bakımı', d: ['65 yaş ve üzeri nüfusun payı ilçe ortalamasının %150’si', 'Doluluk %70, bekleme yok', 'Ortalama erişim 75 dakika, düzenli ulaşım yok', 'Sorun ilk kez bu dönemde kaydedildi'], c: [2, 0, 2, 0], kaynak: 'erisim' },
    { ad: 'Bir adada sezon dışı aile sağlığı hizmeti', d: ['Hedef grup oranı ilçe ortalamasının %70’i', 'Doluluk %60, bekleme yok', 'Ortalama erişim 25 dakika, düzenli ulaşım var', 'Tek bir dönemde şikâyet geldi'], c: [0, 0, 0, 0], kaynak: null }
  ];
  var CEVAP = { kapasite: 'Yüksek puanın kaynağı kapasite baskısı. Kitaba göre bu durumda ek kontenjan ya da yeni hizmet noktası değerlendirilir.', erisim: 'Yüksek puanın kaynağı erişim güçlüğü. Kitaba göre bu durumda mobil hizmet ya da ulaşım desteği değerlendirilir.', donem: 'Baskı belirli dönemlerde ortaya çıkıyor. Kitaba göre bu durumda mevsimsel ya da geçici kapasite düzenlemesi değerlendirilebilir.' };
  function kat(t) { return t <= 2 ? 'Rutin izleme' : t <= 5 ? 'Ayrıntılı kapasite ya da erişim incelemesi' : 'Öncelikli değerlendirme'; }
  var v = 0, dogruT = 0, katDogru = 0, cevap = [];
  function ciz() {
    var x = V[v];
    kok.innerHTML = '<div class="kart"><div class="ilerleme">' + V.map(function (_, k) { return '<i' + (k <= v ? ' class="on"' : '') + '></i>'; }).join('') + '</div><p class="adim">Kurgusal vaka ' + (v + 1) + ' / ' + V.length + '</p><p class="soru">' + esc(x.ad) + '</p>' +
      OLC.map(function (o, k) {
        return '<div class="satir"><b>' + esc(o[0]) + ': <span style="font-weight:400">' + esc(x.d[k]) + '</span></b><div class="segment" data-k="' + k + '">' + o[1].map(function (_, j) { return '<button type="button" data-j="' + j + '" title="' + esc(o[1][j]) + '">' + j + ' puan</button>'; }).join('') + '</div></div>';
      }).join('') +
      '<details class="kucuk" style="margin-top:10px"><summary>Eşikleri göster</summary>' + OLC.map(function (o) { return '<p><b>' + esc(o[0]) + '</b><br>0: ' + esc(o[1][0]) + '<br>1: ' + esc(o[1][1]) + '<br>2: ' + esc(o[1][2]) + '</p>'; }).join('') + '</details>' +
      '<div class="dugmeler"><button class="btn" id="kontrol">Puanla</button></div><p class="kucuk" id="eksik"></p><div id="geri"></div></div>';
    cevap = [];
    kok.querySelectorAll('.segment').forEach(function (sg) { sg.querySelectorAll('button').forEach(function (b) { b.onclick = function () { cevap[+sg.dataset.k] = +b.dataset.j; sg.querySelectorAll('button').forEach(function (y) { y.classList.toggle('on', y === b); }); }; }); });
    $('#kontrol').onclick = function () {
      if (cevap.filter(function (z) { return z !== undefined; }).length < 4) { $('#eksik').textContent = 'Dört ölçütün hepsini puanla.'; return; }
      this.remove(); $('#eksik').textContent = '';
      var top = x.c.reduce(function (a, b) { return a + b; }, 0), senT = cevap.reduce(function (a, b) { return a + b; }, 0), dk = 0;
      kok.querySelectorAll('.segment').forEach(function (sg, k) { sg.querySelectorAll('button').forEach(function (b, j) { b.disabled = true; if (j === x.c[k]) b.style.outline = '2px solid var(--ok)'; }); if (cevap[k] === x.c[k]) dk++; });
      dogruT += dk; if (kat(senT) === kat(top)) katDogru++;
      $('#geri').innerHTML = '<p><b class="' + (dk >= 3 ? 'ok' : 'uyari') + '">' + dk + ' / 4 ölçüt doğru.</b> Senin toplamın ' + senT + ', kitabın eşiklerine göre ' + top + ' / 8: <b>' + kat(top) + '</b>.</p>' +
        (x.kaynak ? '<p class="kucuk">' + esc(CEVAP[x.kaynak]) + '</p>' : '<p class="kucuk">Toplam puan düşük. Kitaba göre puan doğrudan yatırım kararı vermez, yalnızca hangi alanın daha ayrıntılı incelenmesi gerektiğini gösterir.</p>') +
        '<div class="dugmeler"><button class="btn" id="ileri">' + (v < V.length - 1 ? 'Sonraki vaka' : 'Sonucu gör') + '</button></div>';
      $('#ileri').onclick = function () { v++; if (v < V.length) ciz(); else son(); };
    };
  }
  function son() {
    var u = dogruT >= 14 ? 'Planlama masasına hazırsın' : dogruT >= 10 ? 'Eşikleri iyi okuyorsun' : 'Eşiklere bir daha bak';
    ST.kaydet('oncelik-puani', dogruT + ' / 16');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">Dört vaka, on altı ölçüt</p><div class="puan">' + dogruT + ' <span class="kucuk">/ 16</span></div><h2>' + u + '</h2>' +
      '<p>Dört vakanın ' + katDogru + '’ünde toplam puanın seni kitabın önerdiği karar kategorisine götürdü. Kitaba göre 0–2 puan rutin izlemeyi, 3–5 puan ayrıntılı kapasite ya da erişim incelemesini, 6–8 puan öncelikli değerlendirmeyi gerektirir. Bu aralıklar başlangıç amaçlıdır ve veriler biriktikçe yeniden ayarlanmalıdır.</p>' +
      '<p class="kitapta">Kitaptan: veriyi ölç → puanla → sorunun kaynağını belirle → uygun hizmet modelini seç → sonucu yeniden ölç.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Yeniden oyna</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div>' +
      '<p class="kucuk">Vakalar kurgusaldır, gerçek bir ilçe ya da hizmeti göstermez. Eşikler: Çanakkale’nin Pusulası, Tablo 3.</p></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('oncelik-puani'), mesaj: 'Çanakkale’nin Pusulası’nın erken uyarı eşikleriyle dört vakayı puanladım: 16 ölçütten ' + dogruT + ' doğru. Sen dene:',
      hikaye: { ust: 'Öncelik puanını sen ver', etiket: 'Doğru puanladığım ölçüt', baslik: dogruT + ' / 16', ek: u, alt: 'Sen kaç doğru yaparsın?' } });
    $('#yeniden').onclick = function () { v = 0; dogruT = 0; katDogru = 0; ciz(); };
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('oncelik-puani');
  }
  ciz();
})();
