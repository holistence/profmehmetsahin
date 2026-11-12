/* Oyun 2 — Senin şehrin kaç dakika? 15 dakikalık şehir ölçüsü, genç yetişkin ve 80 yaşında biri için. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok) return;
  var YERLER = ['Bakkal ya da market', 'Eczane', 'Aile hekimi ya da sağlık ocağı', 'İlkokul', 'Park ya da yeşil alan', 'Toplu taşıma durağı', 'Semt pazarı', 'Hastane'];
  var SEC = [['≤5 dk', 4], ['5–10', 8], ['10–15', 13], ['15–30', 22], ['30+', 40], ['Yürünmez', 99]];
  var YASLI = 1.4; // yaklaşık: rahat yürüme hızı 20–40 yaşta ~1,35 m/sn, 80 yaş üstünde ~0,95 m/sn (Bohannon ve Andrews, 2011)
  var cevap = {};

  function ciz() {
    kok.innerHTML = '<div class="kart"><p class="adim">Evinden yürüyerek</p><p class="soru">Bu yerler evinden kaç dakika uzakta?</p>' +
      YERLER.map(function (y, i) {
        return '<div class="satir"><b>' + esc(y) + '</b><div class="segment" data-i="' + i + '">' + SEC.map(function (s, j) { return '<button type="button" data-j="' + j + '"' + (cevap[i] === j ? ' class="on"' : '') + '>' + s[0] + '</button>'; }).join('') + '</div></div>';
      }).join('') + '<div class="dugmeler"><button class="btn" id="hesapla">Hesapla</button></div><p class="kucuk" id="eksik"></p></div>';
    kok.querySelectorAll('.segment').forEach(function (sg) {
      sg.querySelectorAll('button').forEach(function (b) { b.onclick = function () { cevap[sg.dataset.i] = +b.dataset.j; sg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    });
    $('#hesapla').onclick = function () {
      var eksik = YERLER.filter(function (y, i) { return cevap[i] === undefined; }).length;
      if (eksik) { $('#eksik').textContent = eksik + ' yer işaretlenmedi. Bilmiyorsan “Yürünmez”i seç.'; return; }
      sonuc();
    };
  }
  function unvan(n) { return n >= 7 ? 'Yürünebilir mahalle' : n >= 4 ? 'Yarı yürünebilir mahalle' : 'Araca bağlı mahalle'; }
  function sonuc() {
    var sen = 0, yasli = 0, satir = '';
    YERLER.forEach(function (y, i) {
      var dk = SEC[cevap[i]][1], dkY = dk >= 99 ? 99 : Math.round(dk * YASLI), a = dk <= 15, b = dkY <= 15;
      if (a) sen++; if (b) yasli++;
      satir += '<tr><td>' + esc(y) + '</td><td class="s">' + (dk >= 99 ? '–' : '~' + dk + ' dk') + '</td><td class="s ' + (b ? 'ok' : 'uyari') + '">' + (dkY >= 99 ? '–' : '~' + dkY + ' dk') + '</td></tr>';
    });
    var u = unvan(sen);
    ST.kaydet('kac-dakika', sen + '/8');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">15 dakikalık şehir puanın</p><div class="puan">' + sen + ' <span class="kucuk">/ 8</span></div><h2>' + u + '</h2>' +
      '<p>Sekiz gündelik ihtiyacın <b>' + sen + '</b> tanesi sana 15 dakikalık yürüme mesafesinde. Aynı sokakta oturan <b>80 yaşında biri</b> için bu sayı <b>' + yasli + '</b>.</p>' +
      '<table class="tablo"><tr><th>Yer</th><th class="s">Senin için</th><th class="s">80 yaşında biri için</th></tr>' + satir + '</table>' +
      '<p class="kitapta">Kitaptan: Bir yere “yakın” olmak bu yüzden coğrafi konumla sınırlı bir mesele sayılamaz. Oraya ne kadar sürede, ne kadar güvenilir biçimde, hangi bedelle ve ne kadar yorularak varılabildiği de hesaba girer.</p>' +
      '<p class="kucuk">“15 dakikalık şehir” fikri, gündelik ihtiyaçların yürüyerek ya da bisikletle 15 dakikada karşılanabilmesini savunur (Carlos Moreno). 80 yaş için süreler yaklaşık 1,4 ile çarpıldı: Rahat yürüme hızı 20–40 yaşlarda saniyede yaklaşık 1,35 metre, 80 yaş üstünde yaklaşık 0,95 metredir (Bohannon ve Andrews, 2011). Yokuş ve kaldırım koşulları farkı büyütür.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Yeniden işaretle</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('kac-dakika'), mesaj: 'Mahallem 15 dakikalık şehir ölçüsünde 8 üzerinden ' + sen + ' aldı. 80 yaşında biri için ' + yasli + '. Seninki kaç?',
      hikaye: { ust: 'Senin şehrin kaç dakika?', etiket: '15 dakikalık şehir puanım', baslik: sen + ' / 8', ek: u + ' · 80 yaşında biri için ' + yasli + ' / 8', alt: 'Seninki kaç?' } });
    $('#yeniden').onclick = ciz;
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('kac-dakika');
  }
  ciz();
})();
