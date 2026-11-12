/* Oyun — 12 ilçeyi haritada bul. Veri: /canakkale/veri.js (TÜİK ADNKS 2007–2025; ortanca yaş 2021; 65+ payı 2020). Kaynak notları: _kaynak/canakkale/KAYNAKLAR_ilce.md */
(function () {
  'use strict';
  var ST = window.ST, D = window.CKL, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok || !D) return;
  var IL = D.ilceler, son = D.yillar.length - 1;
  function byMax(f, haric) { return IL.filter(function (x) { return !haric || haric.indexOf(x.ad) < 0; }).slice().sort(function (a, b) { return f(b) - f(a); })[0]; }
  function byMin(f) { return IL.slice().sort(function (a, b) { return f(a) - f(b); })[0]; }
  var S = [
    { s: 'Merkez’den sonra en kalabalık ilçe hangisi? (2025)', c: byMax(function (x) { return x.nufus[son]; }, ['Merkez']), d: function (x) { return ST.sayi(x.nufus[son]) + ' kişi'; } },
    { s: 'Nüfusu en küçük ilçe hangisi? (2025)', c: byMin(function (x) { return x.nufus[son]; }), d: function (x) { return ST.sayi(x.nufus[son]) + ' kişi'; } },
    { s: 'Merkez’den sonra nüfusu 2007’ye göre en hızlı artan ilçe hangisi?', c: byMax(function (x) { return x.endeks[son]; }, ['Merkez']), d: function (x) { return '2007 = 100 iken 2025’te ' + ST.sayi(x.endeks[son], 1); } },
    { s: 'Nüfusu 2007’ye göre en çok azalan ilçe hangisi?', c: byMin(function (x) { return x.endeks[son]; }), d: function (x) { return '2007 = 100 iken 2025’te ' + ST.sayi(x.endeks[son], 1); } },
    { s: 'Ortanca yaşı en yüksek ilçe hangisi? (2021)', c: byMax(function (x) { return x.medyan; }), d: function (x) { return 'Ortanca yaş ' + ST.sayi(x.medyan, 1); } },
    { s: 'Ortanca yaşı en düşük ilçe hangisi? (2021)', c: byMin(function (x) { return x.medyan; }), d: function (x) { return 'Ortanca yaş ' + ST.sayi(x.medyan, 1); } },
    { s: '65 yaş ve üzeri nüfusun payı en düşük ilçe hangisi? (2020)', c: byMin(function (x) { return x.yasli; }), d: function (x) { return '65+ payı %' + ST.sayi(x.yasli, 1); } }
  ];
  var i = 0, puan = 0;
  function harita(cevaplandi, secilen) {
    var q = S[i];
    return '<div class="harita"><svg viewBox="' + D.viewBox + '" role="img" aria-label="Çanakkale’nin 12 ilçesi">' +
      IL.map(function (x, k) {
        var cls = 'ilce' + (cevaplandi && x.ad === q.c.ad ? ' dogru' : cevaplandi && x.ad === secilen ? ' yanlis' : '');
        return '<path class="' + cls + '" data-k="' + k + '" d="' + x.d + '"><title>' + (cevaplandi ? esc(x.ad) : 'İlçe') + '</title></path>';
      }).join('') +
      (cevaplandi ? IL.map(function (x) { return '<text x="' + x.cx + '" y="' + x.cy + '" text-anchor="middle">' + esc(x.ad) + '</text>'; }).join('') : '') + '</svg></div>';
  }
  function ciz() {
    if (i >= S.length) return bitir();
    var q = S[i];
    kok.innerHTML = '<div class="kart"><div class="ilerleme">' + S.map(function (_, k) { return '<i' + (k <= i ? ' class="on"' : '') + '></i>'; }).join('') + '</div><p class="adim">Soru ' + (i + 1) + ' / ' + S.length + '</p><p class="soru">' + esc(q.s) + '</p><p class="kucuk">Haritada ilçeye dokun.</p>' + harita(false) + '<div id="geri"></div></div>';
    // küçük ilçelere (Bozcaada gibi) dokunulabilir bir halka ekle
    var svg = kok.querySelector('.harita svg'), NS = 'http://www.w3.org/2000/svg';
    kok.querySelectorAll('path.ilce').forEach(function (p) {
      var b = p.getBBox(); if (b.width > 100 || b.height > 100) return;
      var c = document.createElementNS(NS, 'circle'), x = IL[+p.dataset.k];
      c.setAttribute('cx', b.x + b.width / 2); c.setAttribute('cy', b.y + b.height / 2); c.setAttribute('r', 48);
      c.setAttribute('class', 'hedef'); c.setAttribute('data-k', p.dataset.k);
      c.onclick = function () { p.onclick(); }; svg.appendChild(c);
    });
    kok.querySelectorAll('path.ilce').forEach(function (p) {
      p.onclick = function () {
        var x = IL[+p.dataset.k], ok = x.ad === q.c.ad; if (ok) puan++;
        kok.querySelector('.harita').outerHTML = harita(true, x.ad);
        $('#geri').innerHTML = '<p><b class="' + (ok ? 'ok' : 'uyari') + '">' + (ok ? 'Doğru: ' : 'Cevap: ') + esc(q.c.ad) + '.</b> ' + esc(q.d(q.c)) + (ok ? '' : '. Senin seçtiğin ' + esc(x.ad) + ': ' + esc(q.d(x))) + '.</p><div class="dugmeler"><button class="btn" id="ileri">' + (i < S.length - 1 ? 'Sonraki soru' : 'Sonucu gör') + '</button></div>';
        $('#ileri').onclick = function () { i++; ciz(); };
      };
    });
  }
  function bitir() {
    var u = puan >= 6 ? 'İlçeleri avucunun içi gibi biliyorsun' : puan >= 4 ? 'Haritayı iyi okuyorsun' : 'İlçeler seni şaşırttı';
    ST.kaydet('ilceler', puan + ' / 7');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">12 ilçe</p><div class="puan">' + puan + ' <span class="kucuk">/ 7</span></div><h2>' + u + '</h2>' +
      '<p>Kitap Çanakkale’yi tek bir il ortalaması olarak değil, farklı nüfus yapıları, ulaşım koşulları ve hizmet ihtiyaçları olan on iki ilçe olarak okur. Aynı yatırımın farklı ilçelerdeki etkisi de aynı olmayabilir.</p>' +
      '<p class="kitapta">Kitaptan: Bu gelişme nerede gerçekleşiyor ve o yerin taşıması gereken ek hizmet yükü nedir?</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><a class="btn" href="/canakkale/">12 ilçenin etkileşimli haritası</a><button class="btn ghost" id="yeniden">Yeniden oyna</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div>' +
      '<p class="kucuk">Veri: TÜİK ADNKS ilçe nüfusu 2007–2025; ortanca yaş 2021 ve 65+ payı 2020 ikincil kaynaklardan (profmehmetsahin.com/canakkale kaynak notları).</p></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('ilceler'), mesaj: 'Çanakkale’nin 12 ilçesini haritada buldum: 7 sorudan ' + puan + ' doğru. Sen kaç bulursun?',
      hikaye: { ust: '12 ilçeyi haritada bul', etiket: 'Doğru bulduğum', baslik: puan + ' / 7', ek: u, alt: 'Sen kaç bulursun?' } });
    $('#yeniden').onclick = function () { i = 0; puan = 0; ciz(); };
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('ilceler');
  }
  ciz();
})();
