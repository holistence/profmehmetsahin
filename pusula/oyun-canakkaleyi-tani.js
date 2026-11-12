/* Oyun — Çanakkale'yi ne kadar tanıyorsun? Değerler kitaptan: Çanakkale'nin Pusulası (2026), Bölüm 3, 8 ve 11. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok) return;
  function f(x, d) { return ST.sayi(x, d || 0); }
  var S = [
    { s: '2025’te Çanakkale’nin ortanca yaşı kaç? Nüfusun yarısı bu yaştan genç, yarısı yaşlı.', v: 41.7, min: 28, max: 50, adim: 0.1, olc: 5, fmt: function (x) { return f(x, 1); },
      not: 'Türkiye’de ortanca yaş 34,9. Çanakkale’de 2013’te 37,3 idi. (Bölüm 3)' },
    { s: '2025’te Çanakkale’de bir kadın ömrü boyunca ortalama kaç çocuk doğurur? (Toplam doğurganlık hızı)', v: 1.17, min: 0.8, max: 2.5, adim: 0.01, olc: 0.5, fmt: function (x) { return f(x, 2); },
      not: 'Türkiye 1,42. Çanakkale’de 2020’de 1,40 idi. (Bölüm 3)' },
    { s: '2025’te Çanakkale’de kadınlar ilk kez ortalama kaç yaşında evleniyor?', v: 26.4, min: 20, max: 32, adim: 0.1, olc: 3, fmt: function (x) { return f(x, 1); },
      not: '2001’de 22,1 idi. Erkeklerde 2025 değeri 29,2. (Bölüm 3)' },
    { s: '1915 Çanakkale Köprüsü’nden 2024’te kaç araç geçti?', v: 2684738, min: 200000, max: 8000000, adim: 50000, olc: 1800000, fmt: function (x) { return f(Math.round(x / 1000) * 1000); },
      not: 'Köprü 18 Mart 2022’de açıldı. Aynı aracın her geçişi ayrı kayıttır. (Bölüm 8, Tablo 15)' },
    { s: 'Çanakkale Havalimanı 2025’te kaç yolcu ağırladı?', v: 192532, min: 20000, max: 800000, adim: 2000, olc: 150000, fmt: function (x) { return f(Math.round(x / 100) * 100); },
      not: 'Zirve 2018’de 229.407 idi, 2021’de 79.370’e düştü. 2025 değeri 2018’in yaklaşık %16 altında. (Bölüm 8)' },
    { s: '2025’te Çanakkale Boğazı’ndan tehlikeli madde taşıyan kaç tanker geçti?', v: 10545, min: 1000, max: 30000, adim: 100, olc: 6000, fmt: function (x) { return f(Math.round(x / 10) * 10); },
      not: '2006’da 9.567 idi. Bu sayı bütün gemileri değil, yalnız tehlikeli madde taşıyan tankerleri kapsar. (Bölüm 8, Tablo 14)' }
  ];
  var i = 0, p = [], g = [];
  function puan(q, t) { return Math.round(100 * Math.max(0, 1 - Math.abs(t - q.v) / q.olc)); }
  function ilerleme() { var h = '<div class="ilerleme">'; for (var k = 0; k < S.length; k++) h += '<i' + (k <= i ? ' class="on"' : '') + '></i>'; return h + '</div>'; }
  function soru() {
    if (i >= S.length) return son();
    var q = S[i], bas = Math.round(((q.min + q.max) / 2) / q.adim) * q.adim;
    kok.innerHTML = '<div class="kart">' + ilerleme() + '<p class="adim">Soru ' + (i + 1) + ' / ' + S.length + '</p><p class="soru">' + esc(q.s) + '</p>' +
      '<div class="deger" id="gost"></div><input type="range" id="kay" min="' + q.min + '" max="' + q.max + '" step="' + q.adim + '" value="' + bas + '">' +
      '<div class="kucuk" style="display:flex;justify-content:space-between"><span>' + q.fmt(q.min) + '</span><span>' + q.fmt(q.max) + '</span></div>' +
      '<div class="dugmeler"><button class="btn" id="onay">Tahminim bu</button></div><div id="cevap"></div></div>';
    var k = $('#kay'); function gun() { $('#gost').textContent = q.fmt(+k.value); } k.oninput = gun; gun();
    $('#onay').onclick = function () {
      var t = +k.value, pp = puan(q, t); p.push(pp); g.push(t); k.disabled = true; this.remove();
      var ust = Math.max(t, q.v) * 1.15;
      $('#cevap').innerHTML = '<div class="kiyas"><div class="cubuk sen"><span>Tahminin</span><span class="yol"><i style="width:' + (t / ust * 100) + '%"></i></span><b>' + q.fmt(t) + '</b></div>' +
        '<div class="cubuk"><span>Gerçek</span><span class="yol"><i style="width:' + (q.v / ust * 100) + '%"></i></span><b>' + q.fmt(q.v) + '</b></div></div>' +
        '<p><b class="' + (pp >= 70 ? 'ok' : 'uyari') + '">' + pp + ' puan.</b> <span class="kucuk">' + esc(q.not) + '</span></p>' +
        '<div class="dugmeler"><button class="btn" id="ileri">' + (i < S.length - 1 ? 'Sonraki soru' : 'Sonucu gör') + '</button></div>';
      $('#ileri').onclick = function () { i++; soru(); };
    };
  }
  function unvan(t) { return t >= 480 ? 'Çanakkale’nin pusulası sende' : t >= 360 ? 'Çanakkale’yi iyi tanıyorsun' : t >= 220 ? 'Tanıdık ama sürprizli' : 'Çanakkale seni şaşırttı'; }
  function son() {
    var top = p.reduce(function (a, b) { return a + b; }, 0), u = unvan(top);
    ST.kaydet('canakkaleyi-tani', top + ' / 600');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">Sonucun</p><div class="puan">' + top + ' <span class="kucuk">/ 600</span></div><h2>' + esc(u) + '</h2>' +
      '<table class="tablo"><tr><th>Soru</th><th class="s">Tahmin</th><th class="s">Gerçek</th><th class="s">Puan</th></tr>' +
      S.map(function (q, k) { return '<tr><td>' + esc(q.s.split('?')[0] + '?') + '</td><td class="s">' + q.fmt(g[k]) + '</td><td class="s"><b>' + q.fmt(q.v) + '</b></td><td class="s">' + p[k] + '</td></tr>'; }).join('') + '</table>' +
      '<p class="kitapta">Kitaptan: Bir ilin konumu, hangi göstergeye, hangi yıla ve hangi karşılaştırma ölçütüne bakıldığına göre değişebilir.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Yeniden oyna</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div>' +
      '<p class="kucuk">Kaynak: Uysal Şahin ve Şahin, Çanakkale’nin Pusulası (2026). Kitabın kaynakları: TÜİK ADNKS ve Doğum İstatistikleri 2025, DHMİ, UAB, Türk Boğazları Gemi Trafik Hizmetleri.</p></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('canakkaleyi-tani'), mesaj: 'Çanakkale’yi ne kadar tanıyorum? 600 üzerinden ' + top + ' aldım: “' + u + '”. Sen dene:',
      hikaye: { ust: 'Çanakkale’yi ne kadar tanıyorsun?', etiket: 'Puanım', baslik: top + ' / 600', ek: u, alt: 'Sen kaç alırsın?' } });
    $('#yeniden').onclick = function () { i = 0; p = []; g = []; soru(); };
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('canakkaleyi-tani');
  }
  soru();
})();
