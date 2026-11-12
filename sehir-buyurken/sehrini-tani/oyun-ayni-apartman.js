/* Oyun 5 — Aynı apartman, yirmi yıl. Sekiz daireli bir apartmanın 2005–2025 arasını kararlarla yönet. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok) return;
  // kişi: yaş sayısı; daire: {ad, kisiler:[yaş], tur:'aile'|'yasli'|'ogrenci'|'genc'|'bos'}
  function basla() {
    return [
      { ad: 'Zemin 1', tur: 'yasli', kisiler: [66, 63] },
      { ad: 'Zemin 2', tur: 'aile', kisiler: [44, 41, 15, 12] },
      { ad: '1. kat 1', tur: 'aile', kisiler: [38, 35, 9, 5] },
      { ad: '1. kat 2', tur: 'aile', kisiler: [52, 49, 17] },
      { ad: '2. kat 1', tur: 'genc', kisiler: [29, 27] },
      { ad: '2. kat 2', tur: 'yasli', kisiler: [71] },
      { ad: '3. kat 1', tur: 'aile', kisiler: [47, 45, 19, 14] },
      { ad: '3. kat 2', tur: 'aile', kisiler: [40, 37, 11, 8, 3] }
    ];
  }
  var OLAYLAR = [
    { yil: 2010, s: '3. kattaki ailenin büyük çocuğu üniversiteyi başka bir şehirde kazandı. Zemin kattaki ailenin oğlu da evlenmek üzere.', c: [
      ['Çocuklar gider, aileler kalır', function (D) { cikar(D[6], 1); cikar(D[1], 1); }],
      ['Bütün aile çocukla birlikte taşınır, ev öğrencilere kiralanır', function (D) { D[6] = ogrenci(3); cikar(D[1], 1); }],
      ['Çocuk aynı şehirdeki üniversiteye yazılır, evden çıkmaz', function (D) { cikar(D[1], 1); }]] },
    { yil: 2015, s: 'Zemin kattaki yaşlı çiftin çocukları onları kendi şehirlerine almak istiyor.', c: [
      ['Kalırlar, apartmanda yaşlanırlar', function () {}],
      ['Çocuklarının yanına taşınırlar, ev öğrencilere kiralanır', function (D) { D[0] = ogrenci(2); }],
      ['Ev satılır, küçük çocuklu genç bir aile gelir', function (D) { D[0] = { ad: D[0].ad, tur: 'aile', kisiler: [31, 29, 2] }; }]] },
    { yil: 2020, s: 'Mahalleye yeni bir fakülte açıldı. Kiralar yükseliyor, ev sahiplerine teklif yağıyor.', c: [
      ['İki daire öğrencilere kiralanır, sahipleri çepere taşınır', function (D) { var n = 0; [3, 4, 2].forEach(function (i) { if (n < 2 && D[i].tur !== 'ogrenci') { D[i] = ogrenci(D[i].tur === 'genc' ? 2 : 3); n++; } }); }],
      ['Kimse kiralamaz, aileler kalır', function () {}],
      ['İki daire satışa çıkar, alıcı bulunamaz, ikisi de boş kalır', function (D) { D[3] = { ad: D[3].ad, tur: 'bos', kisiler: [] }; D[5] = { ad: D[5].ad, tur: 'bos', kisiler: [] }; }]] },
    { yil: 2025, s: 'Bir müteahhit binayı kentsel dönüşüme sokmak istiyor. Karar kat malikleri toplantısında.', c: [
      ['Kabul edilir: Bina yıkılır, yerine 16 daireli yeni bir bina yapılır', function (D, S) { S.yikildi = true; }],
      ['Reddedilir: Bina olduğu gibi kalır', function () {}],
      ['Karar ertelenir, ev sahiplerinin yarısı satıp çepere taşınır', function (D) { [1, 2, 7].forEach(function (i) { if (D[i].tur === 'aile') D[i] = { ad: D[i].ad, tur: 'genc', kisiler: [27, 26] }; }); }]] }
  ];
  function cikar(d, n) { var c = d.kisiler.filter(function (y) { return y < 25; }).sort(function (a, b) { return b - a; }); for (var i = 0; i < n && i < c.length; i++) d.kisiler.splice(d.kisiler.indexOf(c[i]), 1); }
  function ogrenci(n) { var k = []; for (var i = 0; i < n; i++) k.push(19 + i); return { tur: 'ogrenci', kisiler: k, ad: '' }; }
  var D, S, adim;

  function yaslandir(D, yil) {
    D.forEach(function (d) {
      if (d.tur === 'ogrenci') { d.kisiler = d.kisiler.map(function (y, i) { return 19 + i; }); return; } // öğrenciler değişir, yaş aynı kalır
      d.kisiler = d.kisiler.map(function (y) { return y + yil; });
      // yaşlı tek kişi 90'ı geçerse daire boşalır
      d.kisiler = d.kisiler.filter(function (y) { return y < 92; });
      if (!d.kisiler.length && d.tur !== 'bos') d.tur = 'bos';
      if (d.tur === 'aile' && d.kisiler.every(function (y) { return y >= 60; })) d.tur = 'yasli';
      if (d.tur === 'genc' && d.kisiler.every(function (y) { return y >= 35; })) d.tur = 'aile';
    });
  }
  function ozet(D) {
    var o = { kisi: 0, cocuk: 0, ogr: 0, yasli: 0, yalniz: 0, bos: 0, yasT: 0 };
    D.forEach(function (d) {
      if (d.tur === 'bos') { o.bos++; return; }
      d.kisiler.forEach(function (y) { o.kisi++; o.yasT += y; if (y < 15) o.cocuk++; if (y >= 65) o.yasli++; });
      if (d.tur === 'ogrenci') o.ogr += d.kisiler.length;
      if (d.kisiler.length === 1 && d.kisiler[0] >= 65) o.yalniz++;
    });
    o.ort = o.kisi ? Math.round(o.yasT / o.kisi) : 0; return o;
  }
  var RENK = { aile: 'var(--strait)', yasli: 'var(--mustard)', ogrenci: 'var(--terra)', genc: 'var(--ok)', bos: 'var(--line)' };
  function binaSVG(D) {
    var w = 420, h = 360, s = '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="Apartmanın daireleri">';
    s += '<rect x="40" y="20" width="340" height="320" fill="var(--surface)" stroke="var(--ink)" stroke-width="3"/><line x1="20" y1="340" x2="400" y2="340" stroke="var(--ink)" stroke-width="3"/>';
    D.forEach(function (d, i) {
      var kat = Math.floor(i / 2), sag = i % 2, x = 60 + sag * 170, y = 260 - kat * 78;
      var isik = d.tur !== 'bos';
      s += '<rect x="' + x + '" y="' + y + '" width="150" height="62" rx="4" fill="' + (isik ? 'var(--mustard-soft)' : 'var(--bg)') + '" stroke="' + RENK[d.tur] + '" stroke-width="3"/>';
      d.kisiler.forEach(function (yas, k) {
        var cx = x + 18 + k * 26, by = y + 54, ht = yas < 15 ? 22 : 34, bk = yas >= 70 ? 6 : 0;
        s += '<g stroke="' + RENK[d.tur] + '" stroke-width="3" stroke-linecap="round" fill="none"><circle cx="' + (cx + bk) + '" cy="' + (by - ht - 6) + '" r="5"/><line x1="' + (cx + bk) + '" y1="' + (by - ht) + '" x2="' + cx + '" y2="' + (by - 10) + '"/><line x1="' + cx + '" y1="' + (by - 10) + '" x2="' + (cx - 5) + '" y2="' + by + '"/><line x1="' + cx + '" y1="' + (by - 10) + '" x2="' + (cx + 5) + '" y2="' + by + '"/>' +
          (yas >= 75 ? '<line x1="' + (cx + 12) + '" y1="' + (by - 22) + '" x2="' + (cx + 14) + '" y2="' + by + '"/>' : '') + '</g>';
      });
      if (d.tur === 'ogrenci') s += '<rect x="' + (x + 118) + '" y="' + (y + 36) + '" width="18" height="18" rx="3" fill="none" stroke="var(--terra)" stroke-width="2.5"/>';
    });
    return s + '</svg><p class="kucuk" style="text-align:center"><span style="color:var(--strait)">■</span> aile · <span style="color:var(--mustard)">■</span> yaşlı hane · <span style="color:var(--terra)">■</span> öğrenci · <span style="color:var(--ok)">■</span> genç çift · <span style="color:var(--muted)">□</span> boş</p>';
  }
  function durumHTML(o) {
    return '<table class="tablo"><tr><td>Apartmanda yaşayan</td><td class="s"><b>' + o.kisi + '</b> kişi</td></tr><tr><td>Ortalama yaş</td><td class="s"><b>' + o.ort + '</b></td></tr><tr><td>15 yaş altı çocuk</td><td class="s"><b>' + o.cocuk + '</b></td></tr><tr><td>Öğrenci</td><td class="s"><b>' + o.ogr + '</b></td></tr><tr><td>65 yaş ve üzeri</td><td class="s"><b>' + o.yasli + '</b></td></tr><tr><td>Boş daire</td><td class="s"><b>' + o.bos + '</b></td></tr></table>';
  }
  function ilk() {
    D = basla(); S = {}; adim = 0;
    kok.innerHTML = '<div class="kart"><p class="adim">2005</p><p class="soru">Sekiz daireli bir apartman. Bina yirmi yıl boyunca aynı kalacak. Değişecek olan içindekiler.</p>' + binaSVG(D) + durumHTML(ozet(D)) +
      '<div class="dugmeler"><button class="btn" id="ileri">Beş yıl ileri sar</button></div></div>';
    $('#ileri').onclick = olay;
  }
  function olay() {
    if (adim >= OLAYLAR.length) return son();
    var o = OLAYLAR[adim];
    yaslandir(D, 5);
    kok.innerHTML = '<div class="kart"><div class="ilerleme">' + OLAYLAR.map(function (x, k) { return '<i' + (k <= adim ? ' class="on"' : '') + '></i>'; }).join('') + '</div><p class="adim">' + o.yil + '</p>' + binaSVG(D) +
      '<p class="soru" style="margin-top:12px">' + esc(o.s) + '</p><div class="secenekler">' + o.c.map(function (c, j) { return '<button class="secenek" data-j="' + j + '">' + esc(c[0]) + '</button>'; }).join('') + '</div></div>';
    kok.querySelectorAll('.secenek').forEach(function (b) { b.onclick = function () { o.c[+b.dataset.j][1](D, S); adim++; if (S.yikildi) return son(); olay(); }; });
  }
  function tip(o) {
    if (S.yikildi) return ['Yeniden yazılan apartman', 'Bina yıkıldı, yerine iki katı daire geldi. Yeni komşuların çoğu birbirini tanımayacak. Kitaba göre şehrin kıyısında yükselen her yeni konut dizisi, birkaç yüz hanenin gündelik coğrafyasını başka bir noktadan başlatır.'];
    if (o.ogr >= 6) return ['Öğrenci apartmanı', 'Apartmanın merdiveni hep kalabalık, ama komşuluk her eylül sıfırdan başlıyor. Kitabın cümlesiyle: “Apartmanın merdiveni aynıdır, fakat her eylül üç kata bavul taşıyan yeni bir öğrenci belirir.”'];
    if (o.bos >= 2) return ['Boşalan apartman', 'Işıklar tek tek sönüyor. Bina yerinde, ama içi seyreliyor. Kitap, haneler seyreldiğinde ve eski komşular gittiğinde bir sokağın başka bir tempoda yaşanmaya başladığını söyler.'];
    if (o.yasli >= 5 || o.ort >= 46) return ['Yaşlanan apartman', 'Çocuk sesi azaldı, asansör ve merdiven her yıl daha önemli. Kitabın cümlesiyle: “Kaldırımın yüksekliği değişmemiştir, fakat artık her sabah onu bastonla inen biri vardır.”'];
    return ['Karma apartman', 'Çocuklar, yaşlılar, öğrenciler ve genç çiftler aynı merdiveni paylaşıyor. Sabah okul servisi, öğle pazar dönüşü, gece geç saatte dönen bir öğrenci. Apartmanın günü tek bir ritimle değil, üst üste binen birkaç ritimle akıyor. Bu, büyüyen şehirlerde giderek azalan bir karışım.'];
  }
  function son() {
    var o = ozet(D), t = tip(o), ilkO = ozet(basla());
    ST.kaydet('ayni-apartman', t[0]);
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">2025</p><h2>' + esc(t[0]) + '</h2>' + (S.yikildi ? '' : binaSVG(D)) + '<p>' + esc(t[1]) + '</p>' +
      (S.yikildi ? '' : '<table class="tablo"><tr><th></th><th class="s">2005</th><th class="s">2025</th></tr><tr><td>Yaşayan</td><td class="s">' + ilkO.kisi + '</td><td class="s"><b>' + o.kisi + '</b></td></tr><tr><td>Ortalama yaş</td><td class="s">' + ilkO.ort + '</td><td class="s"><b>' + o.ort + '</b></td></tr><tr><td>Çocuk</td><td class="s">' + ilkO.cocuk + '</td><td class="s"><b>' + o.cocuk + '</b></td></tr><tr><td>Öğrenci</td><td class="s">' + ilkO.ogr + '</td><td class="s"><b>' + o.ogr + '</b></td></tr><tr><td>65 yaş ve üzeri</td><td class="s">' + ilkO.yasli + '</td><td class="s"><b>' + o.yasli + '</b></td></tr><tr><td>Tek başına yaşayan yaşlı</td><td class="s">' + ilkO.yalniz + '</td><td class="s"><b>' + o.yalniz + '</b></td></tr></table>') +
      '<p class="kitapta">Kitaptan: Bir sokak yerli yerinde durabilir. Orada oturanlar yaşlandığında, haneler seyreldiğinde, eski komşular gidip yerlerine öğrenciler geldiğinde o sokak başka bir tempoda yaşanmaya başlar.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Yirmi yılı yeniden oyna</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('ayni-apartman'), mesaj: 'Bir apartmanın yirmi yılını yönettim, sonunda “' + t[0] + '” çıktı. Seninki ne olur?',
      hikaye: { ust: 'Aynı apartman, yirmi yıl', etiket: 'Benim apartmanım', baslik: t[0], ek: S.yikildi ? '' : o.kisi + ' kişi · ortalama yaş ' + o.ort, alt: 'Seninki ne olur?' } });
    $('#yeniden').onclick = ilk;
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('ayni-apartman');
  }
  ilk();
})();
