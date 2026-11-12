/* Oyun 1 — İlini tahmin et: 6 rakam (veri: il-veri.js, kaynaklar _kaynak/sehrini-tani/KAYNAKLAR.md) */
(function () {
  'use strict';
  var ST = window.ST, V = window.ILV, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok || !V) return;
  var IL_AN = 'sehriniTaniIl';
  function f1(x) { return ST.sayi(x, 1); }
  var SORULAR = [
    { k: 'nufus', s: 'İlinin 2025 nüfusu kaç?', birim: 'kişi', log: true, min: 50000, max: 20000000, fmt: function (x) { return ST.sayi(Math.round(x / 1000) * 1000); },
      not: function (il) { return 'Türkiye’nin toplam nüfusu ' + ST.sayi(V.tr.nufus) + '.'; }, olc: 0.45 },
    { k: 'degisim', s: '2015’ten 2025’e ilinin nüfusu yüzde kaç değişti?', birim: '%', min: -20, max: 40, adim: 0.5, fmt: function (x) { return (x > 0 ? '+' : '') + f1(x) + '%'; },
      not: function () { return 'Aynı dönemde Türkiye’nin nüfusu %' + f1(V.tr.degisim) + ' arttı.'; }, olc: 15 },
    { k: 'yasli', s: 'İlinde her 100 kişiden kaçı 65 yaş ve üzerinde?', birim: '%', min: 2, max: 25, adim: 0.5, fmt: function (x) { return f1(x) + '%'; },
      not: function () { return 'Türkiye geneli %' + f1(V.tr.yasli) + '. Veri 2024 yılına ait.'; }, olc: 6 },
    { k: 'hane', s: 'İlinde bir hanede ortalama kaç kişi yaşıyor?', birim: 'kişi', min: 2, max: 5.5, adim: 0.05, fmt: function (x) { return ST.sayi(x, 2); },
      not: function () { return 'Türkiye ortalaması ' + ST.sayi(V.tr.hane, 2) + ' kişi. Haneler küçüldükçe şehrin gündelik temposu da değişir.'; }, olc: 1 },
    { k: 'netgoc', s: '2025’te ilin göç mü aldı, göç mü verdi? Her 1000 kişiye karşılık net kaç kişi?', birim: '‰', min: -30, max: 25, adim: 0.5, fmt: function (x) { return (x > 0 ? '+' : '') + f1(x) + '‰'; },
      not: function () { return 'Artı değer ilin aldığı göçün verdiğinden fazla olduğunu, eksi değer tersini gösterir.'; }, olc: 12 },
    { k: 'gelen', s: '2025’te ilinde her 100 kişiden kaçı başka bir ilden taşınıp geldi?', birim: '%', min: 1, max: 10, adim: 0.1, fmt: function (x) { return f1(x) + '%'; },
      not: function () { return 'Türkiye’de 2025’te nüfusun yaklaşık %' + f1(V.tr.gelen) + '’ü il değiştirdi.'; }, olc: 3 }
  ];
  var il = null, i = 0, puanlar = [], tahminler = [];

  function sira(k, v) { var l = V.iller.map(function (x) { return x[k]; }).sort(function (a, b) { return b - a; }); return l.indexOf(v) + 1; }
  function puanla(q, g, v) {
    var e = q.log ? Math.abs(Math.log10(g / v)) : Math.abs(g - v);
    return Math.round(100 * Math.max(0, 1 - e / q.olc));
  }
  function sliderAyar(q) {
    if (q.log) return { min: 0, max: 1000, adim: 1, v: 500 };
    return { min: q.min, max: q.max, adim: q.adim, v: (q.min + q.max) / 2 };
  }
  function sliderDeger(q, x) { if (!q.log) return +x; var a = Math.log10(q.min), b = Math.log10(q.max); return Math.pow(10, a + (b - a) * x / 1000); }

  function secim() {
    var kayit = null; try { kayit = localStorage.getItem(IL_AN); } catch (e) {}
    var sirali = V.iller.slice().sort(function (a, b) { return a.il.localeCompare(b.il, 'tr'); });
    kok.innerHTML = '<div class="kart"><p class="adim">Başlamadan önce</p><p class="soru">Hangi ilde yaşıyorsun?</p>' +
      '<select id="ilSec"><option value="">İl seç…</option>' + sirali.map(function (x) { return '<option value="' + x.p + '"' + (String(x.p) === kayit ? ' selected' : '') + '>' + esc(x.il) + '</option>'; }).join('') + '</select>' +
      '<p class="kucuk">Altı soru soracağım. Her birinde önce tahminini yap, sonra gerçek değeri gör. Seçimin yalnızca bu tarayıcıda tutulur.</p>' +
      '<div class="dugmeler"><button class="btn" id="basla">Başla</button></div></div>';
    $('#basla').onclick = function () {
      var p = +$('#ilSec').value; if (!p) { $('#ilSec').focus(); return; }
      il = V.iller.filter(function (x) { return x.p === p; })[0];
      try { localStorage.setItem(IL_AN, String(p)); } catch (e) {}
      i = 0; puanlar = []; tahminler = []; soru();
    };
  }
  function ilerleme() { var h = '<div class="ilerleme">'; for (var k = 0; k < 6; k++) h += '<i' + (k <= i ? ' class="on"' : '') + '></i>'; return h + '</div>'; }
  function soru() {
    if (i >= SORULAR.length) return son();
    var q = SORULAR[i], a = sliderAyar(q);
    kok.innerHTML = '<div class="kart">' + ilerleme() + '<p class="adim">' + esc(il.il) + ' · Soru ' + (i + 1) + ' / 6</p><p class="soru">' + esc(q.s) + '</p>' +
      '<div class="deger" id="gost"></div><input type="range" id="kay" min="' + a.min + '" max="' + a.max + '" step="' + a.adim + '" value="' + a.v + '">' +
      '<div class="kucuk" style="display:flex;justify-content:space-between"><span>' + q.fmt(q.min) + '</span><span>' + q.fmt(q.max) + '</span></div>' +
      '<div class="dugmeler"><button class="btn" id="onay">Tahminim bu</button></div><div id="cevap"></div></div>';
    var k = $('#kay'), g = $('#gost');
    function guncel() { g.textContent = q.fmt(sliderDeger(q, k.value)); }
    k.oninput = guncel; guncel();
    $('#onay').onclick = function () {
      var t = sliderDeger(q, k.value), v = il[q.k], p = puanla(q, t, v), tr = V.tr[q.k];
      puanlar.push(p); tahminler.push(t); k.disabled = true; this.remove();
      var top = q.log ? Math.max(t, v) * 1.15 : null;
      function gen(x) { if (q.log) return Math.max(3, x / top * 100); var lo = Math.min(q.min, 0), hi = q.max; return Math.max(3, (x - lo) / (hi - lo) * 100); }
      var trSat = q.k === 'nufus' || q.k === 'netgoc' ? '' : '<div class="cubuk tr"><span>Türkiye</span><span class="yol"><i style="width:' + gen(tr) + '%"></i></span><b>' + q.fmt(tr) + '</b></div>';
      $('#cevap').innerHTML = '<div class="kiyas"><div class="cubuk sen"><span>Tahminin</span><span class="yol"><i style="width:' + gen(t) + '%"></i></span><b>' + q.fmt(t) + '</b></div>' +
        '<div class="cubuk"><span>' + esc(il.il) + '</span><span class="yol"><i style="width:' + gen(v) + '%"></i></span><b>' + q.fmt(v) + '</b></div>' + trSat + '</div>' +
        '<p><b class="' + (p >= 70 ? 'ok' : 'uyari') + '">' + p + ' puan.</b> ' + esc(il.il) + ' bu göstergede 81 il içinde <b>' + sira(q.k, v) + '.</b> sırada (büyükten küçüğe).</p><p class="kucuk">' + esc(q.not(il)) + '</p>' +
        '<div class="dugmeler"><button class="btn" id="ileri">' + (i < 5 ? 'Sonraki soru' : 'Sonucu gör') + '</button></div>';
      $('#ileri').onclick = function () { i++; soru(); };
    };
  }
  function unvan(t) { return t >= 480 ? 'Şehrinin hafızası' : t >= 360 ? 'Mahallenin muhtarı' : t >= 220 ? 'Komşu kadar' : 'Yeni gelmiş gibi'; }
  function haritaSVG() {
    return '<div class="harita"><svg viewBox="' + V.viewBox + '" role="img" aria-label="Türkiye haritasında ' + esc(il.il) + '">' +
      V.iller.map(function (x) { return '<path d="' + x.d + '"' + (x.p === il.p ? ' class="sec"' : '') + '><title>' + esc(x.il) + '</title></path>'; }).join('') + '</svg></div>';
  }
  function son() {
    var top = puanlar.reduce(function (a, b) { return a + b; }, 0), u = unvan(top);
    ST.kaydet('tahmin', il.il + ' · ' + top);
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">' + esc(il.il) + ' için sonucun</p><div class="puan">' + top + ' <span class="kucuk">/ 600</span></div><h2>' + u + '</h2>' + haritaSVG() +
      '<table class="tablo"><tr><th>Gösterge</th><th class="s">Tahmin</th><th class="s">Gerçek</th><th class="s">Puan</th></tr>' +
      SORULAR.map(function (q, k) { return '<tr><td>' + esc(q.s.replace(/\?.*$/, '?')) + '</td><td class="s">' + q.fmt(tahminler[k]) + '</td><td class="s"><b>' + q.fmt(il[q.k]) + '</b></td><td class="s">' + puanlar[k] + '</td></tr>'; }).join('') + '</table>' +
      '<p class="kitapta">Kitaptan: Kentin nüfusu artarken yalnızca toplam büyümedi; o toplamın içindeki insanların bileşimi de başkalaştı.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Başka bir il dene</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div>' +
      '<p class="kucuk">Kaynak: TÜİK ADNKS (nüfus 2015, 2025; hane 2025; 65+ payı 2024) ve TÜİK İç Göç İstatistikleri 2025. Harita: alpers/Turkey-Maps-GeoJSON (Apache-2.0).</p></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('tahmin'), mesaj: 'Şehrimi ne kadar tanıyorum? ' + il.il + ' için 600 üzerinden ' + top + ' aldım: “' + u + '”. Sen kendi ilini dene:',
      hikaye: { ust: 'İlini tahmin et: 6 rakam', etiket: il.il + ' için puanım', baslik: top + ' / 600', ek: u, alt: 'Sen ilini ne kadar tanıyorsun?' } });
    $('#yeniden').onclick = secim;
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('tahmin');
  }
  secim();
})();
