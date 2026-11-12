/* Oyun 3 — Yokuş hesabı. Tobler’in yürüyüş formülü (1993) ve yaşa göre yürüme hızı ortalamalarıyla yaklaşık süreler. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok) return;
  var EGIM = [['Düz', 0], ['Hafif yokuş (%4)', 0.04], ['Yokuş (%8)', 0.08], ['Dik yokuş (%12)', 0.12]];
  var KISI = [['Genç bir yetişkin', 1], ['75 yaşında biri', 0.7], ['Bebek arabası iten ebeveyn', 0.88], ['Ağır pazar filesi taşıyan', 0.85]];
  var km = 2, eg = 2;
  function hiz(s, carpan) { return 6 * Math.exp(-3.5 * Math.abs(s + 0.05)) * carpan; } // km/sa
  function dk(km, s, c) { return Math.round(km / hiz(s, c) * 60); }

  function ayar() {
    kok.innerHTML = '<div class="kart"><p class="adim">Önce yolu kur</p><p class="soru">Evinden gideceğin yer ne kadar uzakta, yol ne kadar dik?</p>' +
      '<label class="etiket">Mesafe: <span id="kmG"></span></label><input type="range" id="km" min="0.5" max="4" step="0.25" value="' + km + '">' +
      '<label class="etiket" style="margin-top:14px">Eğim</label><div class="segment" id="eg">' + EGIM.map(function (e, j) { return '<button type="button" data-j="' + j + '"' + (j === eg ? ' class="on"' : '') + '>' + e[0] + '</button>'; }).join('') + '</div>' +
      '<div class="dugmeler"><button class="btn" id="ileri">Devam</button></div></div>';
    var k = $('#km'); function g() { $('#kmG').textContent = ST.sayi(+k.value, 2).replace(/,?0+$/, '') + ' km'; } k.oninput = g; g();
    $('#eg').querySelectorAll('button').forEach(function (b) { b.onclick = function () { eg = +b.dataset.j; $('#eg').querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    $('#ileri').onclick = function () { km = +k.value; tahmin(); };
  }
  function tahmin() {
    var genc = dk(km, EGIM[eg][1], 1);
    kok.innerHTML = '<div class="kart"><p class="adim">' + ST.sayi(km, 2).replace(/,?0+$/, '') + ' km · ' + EGIM[eg][0] + '</p><p class="soru">Genç bir yetişkin bu yolu yaklaşık ' + genc + ' dakikada çıkar. Sence 75 yaşında biri kaç dakikada çıkar?</p>' +
      '<div class="deger" id="tG"></div><input type="range" id="t" min="' + genc + '" max="' + Math.max(genc * 3, 60) + '" step="1" value="' + Math.round(genc * 1.2) + '">' +
      '<div class="dugmeler"><button class="btn" id="goster">Tahminim bu</button></div></div>';
    var t = $('#t'); function g() { $('#tG').textContent = t.value + ' dk'; } t.oninput = g; g();
    $('#goster').onclick = function () { sonuc(+t.value); };
  }
  function sonuc(tah) {
    var s = EGIM[eg][1], sureler = KISI.map(function (p) { return dk(km, s, p[1]); }), donus = KISI.map(function (p) { return dk(km, -s, p[1]); });
    var enb = Math.max.apply(null, sureler), yasli = sureler[1], fark = Math.abs(tah - yasli);
    ST.kaydet('yokus', yasli + ' dk');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">' + ST.sayi(km, 2).replace(/,?0+$/, '') + ' km · ' + EGIM[eg][0] + '</p><div class="puan">' + yasli + ' <span class="kucuk">dakika</span></div><h2>75 yaşında biri için</h2>' +
      '<p>Senin tahminin <b>' + tah + ' dakika</b>' + (fark <= 3 ? ', çok yakın.' : fark <= 8 ? ', fena değil.' : ', gerçeğe göre ' + fark + ' dakika ' + (tah < yasli ? 'az' : 'fazla') + '.') + '</p>' +
      '<div class="kiyas">' + KISI.map(function (p, i) { return '<div class="cubuk' + (i === 1 ? ' sen' : '') + '"><span>' + esc(p[0]) + '</span><span class="yol"><i style="width:' + (sureler[i] / enb * 100) + '%"></i></span><b>' + sureler[i] + ' dk</b></div>'; }).join('') + '</div>' +
      (s ? '<p class="kucuk">Dönüşte yol iner: genç biri için ' + donus[0] + ', 75 yaşında biri için ' + donus[1] + ' dakika. Ama inişte düşme riski artar.</p>' : '') +
      '<p class="kitapta">Kitaptan: Düz bir ovada iki kilometre yürümek ile bir yamaca tırmanarak iki kilometre yürümek aynı yorgunluğu vermez. Bu katman hiçbir yerleşim istatistiğinde yer almaz, oysa bir insanın kaç yaşına kadar kendi başına markete yürüyebileceğini belirleyen etkenlerden biri olabilir.</p>' +
      '<p class="kucuk">Süreler yaklaşıktır. Eğim etkisi Tobler’in yürüyüş formülüyle (1993) hesaplandı. Yaşa ve yüke göre çarpanlar ortalama yürüme hızlarına dayanan varsayımlardır, kişiden kişiye değişir.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Başka bir yol dene</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('yokus'), mesaj: 'Evimden ' + ST.sayi(km, 2).replace(/,?0+$/, '') + ' km, ' + EGIM[eg][0].toLowerCase() + ': Genç biri ' + sureler[0] + ', 75 yaşında biri ' + yasli + ' dakikada çıkıyor. Senin yolun?',
      hikaye: { ust: 'Yokuş hesabı', etiket: ST.sayi(km, 2).replace(/,?0+$/, '') + ' km · ' + EGIM[eg][0], baslik: yasli + ' dakika', ek: '75 yaşında biri için. Genç biri için ' + sureler[0] + ' dakika.', alt: 'Senin yolun kaç dakika?' } });
    $('#yeniden').onclick = ayar;
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('yokus');
  }
  ayar();
})();
