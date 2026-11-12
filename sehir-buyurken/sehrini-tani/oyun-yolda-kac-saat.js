/* Oyun 4 — Yılda kaç saat yoldasın? */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, kok = $('#uygulama');
  if (!kok) return;
  var HAFTA = 50; // iki haftalık izin düşülmüş çalışma/okul haftası
  var d = { tek: 25, gun: 5, diger: 120 };
  function hesap(tekYon) { return (2 * tekYon * d.gun * HAFTA + d.diger * 52) / 60; }
  function ciz() {
    kok.innerHTML = '<div class="kart"><p class="adim">Bir haftan</p>' +
      '<label class="etiket">İşe ya da okula tek yön kaç dakika? <span id="tekG"></span></label><input type="range" id="tek" min="0" max="120" step="5" value="' + d.tek + '">' +
      '<label class="etiket" style="margin-top:14px">Haftada kaç gün?</label><div class="segment" id="gun">' + [3, 4, 5, 6].map(function (g) { return '<button type="button" data-g="' + g + '"' + (g === d.gun ? ' class="on"' : '') + '>' + g + ' gün</button>'; }).join('') + '</div>' +
      '<label class="etiket" style="margin-top:14px">Alışveriş, çocuk, sağlık ve diğer yolculuklar: haftada toplam kaç dakika? <span id="digG"></span></label><input type="range" id="dig" min="0" max="600" step="15" value="' + d.diger + '">' +
      '<div class="dugmeler"><button class="btn" id="hesapla">Hesapla</button></div></div>';
    var t = $('#tek'), g = $('#dig');
    function guncel() { $('#tekG').textContent = t.value + ' dk'; $('#digG').textContent = g.value + ' dk'; }
    t.oninput = g.oninput = guncel; guncel();
    $('#gun').querySelectorAll('button').forEach(function (b) { b.onclick = function () { d.gun = +b.dataset.g; $('#gun').querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    $('#hesapla').onclick = function () { d.tek = +t.value; d.diger = +g.value; sonuc(); };
  }
  function sonuc() {
    var saat = Math.round(hesap(d.tek)), gun = saat / 24, mesai = saat / 8, kitap = Math.floor(saat / 6), omur = saat * 40 / 24 / 365;
    ST.kaydet('yolda-kac-saat', saat + ' saat');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">Bir yılda yolda geçen</p><div class="puan">' + ST.sayi(saat) + ' <span class="kucuk">saat</span></div>' +
      '<h2>≈ ' + ST.sayi(gun, 1) + ' tam gün</h2>' +
      '<p>Bu, yaklaşık <b>' + ST.sayi(mesai) + ' iş günü</b> demek. Altı saatte bir kitap okusan <b>' + kitap + ' kitap</b> ederdi. Kırk yıl böyle giderse hayatının yaklaşık <b>' + ST.sayi(omur, 1) + ' yılı</b> yolda geçer.</p>' +
      '<div class="kart" style="background:var(--bg);margin:16px 0"><label class="etiket">Peki tek yön yolculuğun şu kadar değişse: <span id="farkG"></span></label><input type="range" id="fark" min="-30" max="30" step="5" value="10"><p id="farkS" style="margin:10px 0 0"></p></div>' +
      '<p class="kitapta">Kitaptan: Bir yolculuğun on dakika uzaması devede kulak sayılır. Her gün gidiş ve dönüşte tekrarlandığında haftaya yüz dakika, yıla seksen saati aşkın bir süre ekler. İnsan bu zamanın farkına varmaz, çünkü o her gün küçük lokmalar hâlinde elinden alınır.</p>' +
      '<p class="kucuk">Hesap: tek yön süre × 2 × haftalık gün × 50 hafta + diğer yolculuklar × 52 hafta.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Değerleri değiştir</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div></div>';
    var f = $('#fark');
    function farkGuncel() {
      var n = +f.value, yeni = hesap(Math.max(0, d.tek + n)), delta = Math.round(yeni - hesap(d.tek));
      $('#farkG').textContent = (n > 0 ? '+' : '') + n + ' dk';
      $('#farkS').innerHTML = n === 0 ? 'Bir değer seç.' : 'Yılda <b>' + ST.sayi(Math.abs(delta)) + ' saat</b> ' + (delta > 0 ? 'daha fazla' : 'daha az') + ' yolda olursun. Bu ' + ST.sayi(Math.abs(delta) / 24, 1) + ' tam güne eşit.';
    }
    f.oninput = farkGuncel; farkGuncel();
    ST.paylas($('#sonucPaylas'), { url: ST.url('yolda-kac-saat'), mesaj: 'Hesapladım: Yılda ' + ST.sayi(saat) + ' saat, yani ' + ST.sayi(gun, 1) + ' tam gün yoldayım. Sen?',
      hikaye: { ust: 'Yılda kaç saat yoldasın?', etiket: 'Bir yılda yolda geçen', baslik: ST.sayi(saat) + ' saat', ek: '≈ ' + ST.sayi(gun, 1) + ' tam gün', alt: 'Sen kaç saat yoldasın?' } });
    $('#yeniden').onclick = ciz;
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('yolda-kac-saat');
  }
  ciz();
})();
