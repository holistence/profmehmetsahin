/* Çanakkale'nin 12 ilçesi: açılış eğrisi, akan hikâye, keşif haritası.
   Hikâye t (saniye) ile belirlenir: CKLH.setT(t) aynı kareyi her seferinde aynı çizer (video için). */
(function () {
  'use strict';
  var V = window.CKL, Y = V.yillar, NY = Y.length, IL = V.il, I = V.ilceler;
  var NS = 'http://www.w3.org/2000/svg';
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, at, ebeveyn) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); if (ebeveyn) ebeveyn.appendChild(e); return e; }
  function sayi(v, b) { return v == null ? '–' : v.toLocaleString('tr-TR', { minimumFractionDigits: b || 0, maximumFractionDigits: b || 0 }); }
  function bul(ad) { for (var i = 0; i < I.length; i++) if (I[i].ad === ad) return I[i]; }

  /* Türkçe sayı ekleri: söylenişe göre (115.775'ten, 208.613'e, 23'ü) */
  var BIRLER = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'], ONLAR = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
  function sonSoz(n) { n = Math.round(Math.abs(n)); if (n === 0) return 'sıfır'; if (n % 10) return BIRLER[n % 10]; if (n % 100) return ONLAR[(n % 100) / 10]; if (n % 1000) return 'yüz'; if (n % 1e6) return 'bin'; return 'milyon'; }
  function ek(n, tur) {
    var w = sonSoz(n), sesli = w.match(/[aeıioöuü]/g), u = sesli[sesli.length - 1], ince = 'eiöü'.indexOf(u) >= 0, sonSesli = /[aeıioöuü]$/.test(w), sert = /[çfhkpsşt]$/.test(w);
    if (tur === 'den') return (sert ? 't' : 'd') + (ince ? 'en' : 'an');
    if (tur === 'e') return (sonSesli ? 'y' : '') + (ince ? 'e' : 'a');
    if (tur === 'i') { var d = { a: 'ı', ı: 'ı', o: 'u', u: 'u', e: 'i', i: 'i', ö: 'ü', ü: 'ü' }[u]; return (sonSesli ? 's' : '') + d; }
  }
  function se(n, tur, b) { return sayi(n, b) + '\'' + ek(n, tur); }

  /* ---------- renk ---------- */
  function koyuMu() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  }
  var PAL = {
    acik: { sira: ['#e4efef', '#a9cfd4', '#6aa7b0', '#2f7884', '#0e4a57'], alt: ['#b4532f', '#dca085', '#ece6de'], ust: ['#ece6de', '#8fbcc3', '#0e4a57'] },
    koyu: { sira: ['#183339', '#1f5560', '#2f7d89', '#58a8b4', '#a6d6dd'], alt: ['#e8916c', '#8a5440', '#26363a'], ust: ['#26363a', '#2f7d89', '#a6d6dd'] }
  };
  function hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function karis(a, b, t) { a = hex(a); b = hex(b); return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(a[i] + (b[i] - a[i]) * t); }).join(',') + ')'; }
  function rampa(r, t) { t = Math.max(0, Math.min(1, t)); var n = r.length - 1, i = Math.min(n - 1, Math.floor(t * n)); return karis(r[i], r[i + 1], t * n - i); }

  /* ---------- göstergeler ---------- */
  var G = {
    nufus: { ad: 'Nüfus', seri: true, b: 0, birim: 'kişi', kisa: 'Nüfus', aciklama: 'Yıl sonu nüfusu (ADNKS)' },
    endeks: { ad: 'Büyüme', seri: true, b: 0, birim: '2007 = 100', merkez: 100, kisa: 'Büyüme endeksi', aciklama: '2007 nüfusu 100 kabul edildiğinde' },
    pay: { ad: 'İldeki pay', seri: true, b: 1, birim: '% il nüfusu', kisa: 'İl nüfusundaki pay', aciklama: 'İlçe nüfusunun il toplamına oranı', ilYok: true },
    cins: { ad: 'Cinsiyet dengesi', seri: true, b: 1, birim: 'erkek / 100 kadın', merkez: 100, kisa: 'Cinsiyet oranı', aciklama: 'Her 100 kadına düşen erkek' },
    yasli: { ad: '65 yaş üstü', yil: 2020, b: 1, birim: '% nüfus', kisa: '65+ payı', aciklama: '65 yaş ve üstündekilerin nüfustaki payı' },
    medyan: { ad: 'Medyan yaş', yil: 2021, b: 1, birim: 'yaş', kisa: 'Medyan yaş', aciklama: 'Nüfusun yarısı bu yaşın altında' },
    bosEvli: { ad: 'Boşanmışlar', yil: 2020, b: 1, birim: 'boşanmış / 100 evli', kisa: 'Boşanmış / 100 evli', aciklama: 'Medeni durumu boşanmış olanların evlilere oranı' },
    dogumHiz: { ad: 'Doğum hızı', yil: 2025, b: 1, birim: '‰ (binde)', kisa: 'Kaba doğum hızı', aciklama: 'Bin kişiye düşen doğum, yıl ortası nüfusla' },
    evlenmeHiz: { ad: 'Evlenme hızı', yil: 2025, b: 1, birim: '‰ (binde)', kisa: 'Kaba evlenme hızı', aciklama: 'Bin kişiye düşen evlenme, yıl ortası nüfusla' },
    bosOran: { ad: 'Boşanma / evlilik', yil: 2025, b: 0, birim: 'boşanma / 100 evlilik', kisa: 'Boşanma / 100 evlilik', aciklama: 'Aynı yıl her 100 evliliğe düşen boşanma' }
  };
  var SIRA = ['nufus', 'endeks', 'pay', 'cins', 'yasli', 'medyan', 'bosEvli', 'dogumHiz', 'evlenmeHiz', 'bosOran'];
  function deger(o, g, yi) { var v = o[g]; return G[g].seri ? v[yi] : v; }
  function ilDeger(g, yi) { if (G[g].ilYok) return null; var v = IL[g]; return v == null ? null : (G[g].seri ? v[yi] : v); }
  var ARALIK = {};
  SIRA.forEach(function (g) {
    var hep = []; I.forEach(function (o) { if (G[g].seri) hep = hep.concat(o[g]); else hep.push(o[g]); });
    ARALIK[g] = [Math.min.apply(null, hep), Math.max.apply(null, hep)];
  });
  function renk(g, v) {
    var p = koyuMu() ? PAL.koyu : PAL.acik, a = ARALIK[g];
    if (v == null) return 'var(--empty)';
    if (G[g].merkez != null) {
      var m = G[g].merkez;
      return v < m ? rampa(p.alt, (v - a[0]) / (m - a[0])) : rampa(p.ust, (v - m) / (a[1] - m));
    }
    var t = g === 'nufus' ? (Math.log(v) - Math.log(a[0])) / (Math.log(a[1]) - Math.log(a[0])) : (v - a[0]) / (a[1] - a[0]);
    return rampa(p.sira, t);
  }
  function lejant(kutu, g) {
    var p = koyuMu() ? PAL.koyu : PAL.acik, a = ARALIK[g], r = G[g].merkez != null ? p.alt.concat(p.ust.slice(1)) : p.sira;
    kutu.innerHTML = '<span>' + sayi(a[0], G[g].b) + '</span><span class="bar">' + r.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span><span>' + sayi(a[1], G[g].b) + '</span><span>' + G[g].birim + (G[g].merkez != null ? ' · orta nokta ' + G[g].merkez : '') + '</span>';
  }

  /* ---------- harita ---------- */
  var KUCUK = { Bozcaada: 1, Eceabat: 1 };
  function harita(svg, tikla) {
    svg.setAttribute('viewBox', V.viewBox);
    var yollar = {};
    I.forEach(function (o) {
      var p = el('path', { d: o.d, 'class': 'ilce', 'data-ad': o.ad }, svg);
      if (tikla) { p.setAttribute('tabindex', '0'); p.setAttribute('role', 'button'); p.setAttribute('aria-label', o.ad); }
      yollar[o.ad] = p;
    });
    I.forEach(function (o) { var t = el('text', { x: o.cx, y: o.cy, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'class': 'etk' + (KUCUK[o.ad] ? ' k' : '') }, svg); t.textContent = o.ad; });
    return yollar;
  }
  function boya(yollar, g, yi, vurgu) {
    I.forEach(function (o) {
      var p = yollar[o.ad]; p.style.fill = renk(g, deger(o, g, yi));
      p.classList.toggle('vurgu', !!(vurgu && vurgu.indexOf(o.ad) >= 0));
    });
    // vurgulananları üste taşı ki kalın çizgi görünsün; etiketler en üstte kalsın
    if (vurgu) vurgu.forEach(function (ad) { var p = yollar[ad]; var ilkEtk = p.parentNode.querySelector('text'); p.parentNode.insertBefore(p, ilkEtk); });
  }

  /* ---------- açılış eğrisi ---------- */
  function egri() {
    var svg = $('egri'); if (!svg) return;
    var W = 560, H = 420, L = 40, R = 104, T = 16, B = 30;
    var x = function (i) { return L + (W - L - R) * i / (NY - 1); };
    var y = function (v) { return T + (H - T - B) * (1 - (v - 70) / (190 - 70)); };
    [80, 100, 120, 140, 160, 180].forEach(function (v) {
      el('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), 'class': 'izgara', 'stroke-dasharray': v === 100 ? '' : '2 4' }, svg);
      el('text', { x: L - 8, y: y(v) + 4, 'text-anchor': 'end', 'class': 'eks' }, svg).textContent = v;
    });
    [0, 6, 12, 18].forEach(function (i) { el('text', { x: x(i), y: H - 8, 'text-anchor': 'middle', 'class': 'eks' }, svg).textContent = Y[i]; });
    var ON = { Merkez: 'var(--terra)', Bozcaada: 'var(--mustard)', 'Gökçeada': 'var(--mustard)', Yenice: 'var(--strait)' };
    var cizgiler = [];
    function yol(seri) { return seri.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(''); }
    I.slice().sort(function (a, b) { return (ON[a.ad] ? 1 : 0) - (ON[b.ad] ? 1 : 0); }).forEach(function (o) {
      var p = el('path', { d: yol(o.endeks), 'class': 'cizgi', stroke: ON[o.ad] || 'var(--line)', 'stroke-width': ON[o.ad] ? 2.6 : 1.6 }, svg);
      p.appendChild(document.createElementNS(NS, 'title')).textContent = o.ad + ': ' + sayi(o.nufus[0]) + ' → ' + sayi(o.nufus[NY - 1]);
      cizgiler.push(p);
      if (ON[o.ad]) {
        var son = o.endeks[NY - 1], dy = o.ad === 'Bozcaada' ? -6 : (o.ad === 'Gökçeada' ? 6 : 0);
        var t = el('text', { x: W - R + 8, y: y(son) + 4 + dy, 'class': 'ad', fill: ON[o.ad] }, svg);
        t.textContent = o.ad + ' '; var s = el('tspan', { 'class': 'yuz' }, t); s.textContent = son > 100 ? '+%' + Math.round(son - 100) : '−%' + Math.round(100 - son);
      }
    });
    var il = el('path', { d: yol(IL.endeks), 'class': 'cizgi', stroke: 'var(--ink)', 'stroke-dasharray': '5 4', 'stroke-width': 1.8 }, svg);
    cizgiler.push(il);
    var t = el('text', { x: W - R + 8, y: y(IL.endeks[NY - 1]) + 4, 'class': 'ad', fill: 'var(--ink)' }, svg); t.textContent = 'İl '; el('tspan', { 'class': 'yuz' }, t).textContent = '+%' + Math.round(IL.endeks[NY - 1] - 100);
    var azal = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!azal) cizgiler.forEach(function (p, k) {
      var u = p.getTotalLength(); p.style.strokeDasharray = p.getAttribute('stroke-dasharray') ? '' : u; if (!p.getAttribute('stroke-dasharray')) { p.style.strokeDashoffset = u; p.style.transition = 'stroke-dashoffset 1.8s ease ' + (0.15 + k * 0.05) + 's'; requestAnimationFrame(function () { requestAnimationFrame(function () { p.style.strokeDashoffset = 0; }); }); }
    });
  }

  /* ---------- hikâye ---------- */
  var M = bul('Merkez'), YEN = bul('Yenice'), GOK = bul('Gökçeada'), BOZ = bul('Bozcaada'), BIGA = bul('Biga');
  function yuzde(o) { var d = o.endeks[NY - 1] - 100; return (d < 0 ? '−\u2060%' : '+\u2060%') + Math.abs(Math.round(d)); }
  var kuculen = I.filter(function (o) { return o.endeks[NY - 1] < 100; }).sort(function (a, b) { return a.endeks[NY - 1] - b.endeks[NY - 1]; });
  var SAHNE = [
    { g: 'pay', baslik: 'Merkez büyüyor', vurgu: ['Merkez'],
      metin: '2007\'de ilin dörtte biri Merkez\'de yaşıyordu (%' + sayi(M.pay[0], 1) + '). 2025\'te bu pay %' + sayi(M.pay[NY - 1], 1) + '. Merkez\'in nüfusu ' + se(M.nufus[0], 'den') + ' ' + se(M.nufus[NY - 1], 'e') + ' çıktı.' },
    { g: 'endeks', baslik: kuculen.length === 6 ? 'Altı ilçe küçüldü' : kuculen.length + ' ilçe küçüldü', vurgu: kuculen.map(function (o) { return o.ad; }),
      metin: 'İl %' + Math.round(IL.endeks[NY - 1] - 100) + ' büyürken ' + kuculen.map(function (o) { return o.ad + ' ' + yuzde(o); }).join(', ') + '. Adalar ise büyüdü: Bozcaada ' + yuzde(BOZ) + ', Gökçeada ' + yuzde(GOK) + '.' },
    { g: 'yasli', baslik: 'Kırsal yaşlanıyor', vurgu: ['Yenice', 'Merkez'],
      metin: 'Yenice\'de her 100 kişiden ' + se(Math.round(YEN.yasli), 'i') + ' 65 yaşın üstünde, Merkez\'de ' + se(Math.round(M.yasli), 'i') + '. Medyan yaş Yenice\'de ' + sayi(YEN.medyan, 1) + ', Merkez\'de ' + sayi(M.medyan, 1) + ' (2021).' },
    { g: 'dogumHiz', baslik: 'Doğumlar', vurgu: ['Gökçeada', 'Yenice'],
      metin: '2025\'te bin kişiye düşen doğum Gökçeada\'da ' + sayi(GOK.dogumHiz, 1) + ', Yenice\'de ' + sayi(YEN.dogumHiz, 1) + '. İl genelinde ' + sayi(IL.dogumHiz, 1) + '. İlde bir yılda ' + sayi(I.reduce(function (s, o) { return s + o.nDogum; }, 0)) + ' bebek doğdu.' },
    { g: 'bosOran', baslik: 'Evlilik ve boşanma', vurgu: ['Biga', 'Lapseki', 'Merkez'],
      metin: '2025\'te ilde her 100 evliliğe ' + IL.bosOran + ' boşanma düştü. Biga ve Lapseki\'de ' + BIGA.bosOran + ', Merkez\'de ' + M.bosOran + '. Adalarda sayılar küçük: Bozcaada\'da yılda ' + BOZ.nEvlenme + ' evlilik, ' + BOZ.nBosanma + ' boşanma.' },
    { g: 'cins', baslik: 'Kadınlar çoğunlukta', vurgu: ['Merkez', 'Gökçeada'],
      metin: '2007\'de ilde her 100 kadına ' + Math.round(IL.cins[0]) + ' erkek vardı, 2025\'te ' + Math.round(IL.cins[NY - 1]) + '. Merkez\'de ' + sayi(M.cins[NY - 1], 1) + ', Gökçeada\'da ' + sayi(GOK.cins[NY - 1], 1) + '.' }
  ];
  var SURE = 8, AKIS = 5.5, TOPLAM = SAHNE.length * SURE;
  var S = { yollar: null, son: -1, grafik: null };

  function cubuklar(svg, g, yi, vurgu) {
    // sıralı yatay çubuklar; il değeri kesik çizgi
    var W = 440, H = 300, L = 92, R = 58, T = 6, sat = (H - T) / I.length;
    if (!S.grafik || S.grafik.g !== g) {
      svg.innerHTML = '';
      var kat = { satir: {}, cizgi: null, g: g };
      I.forEach(function (o) {
        var gr = el('g', { 'class': 'sat' }, svg);
        var ad = el('text', { x: L - 8, y: 0, 'text-anchor': 'end', 'dominant-baseline': 'middle', style: 'font:500 14px var(--f-body);fill:var(--ink)' }, gr); ad.textContent = o.ad;
        var r = el('rect', { x: L, y: -sat * 0.34, height: sat * 0.68, rx: 2 }, gr);
        var v = el('text', { y: 0, 'dominant-baseline': 'middle', style: 'font:500 13px var(--f-mono);fill:var(--muted)' }, gr);
        kat.satir[o.ad] = { gr: gr, r: r, v: v, ad: ad };
      });
      kat.cizgi = el('line', { y1: T, y2: H, stroke: 'var(--ink)', 'stroke-dasharray': '4 3', 'stroke-width': 1.4 }, svg);
      kat.cizgiT = el('text', { y: H - 2, 'text-anchor': 'start', style: 'font:500 12px var(--f-mono);fill:var(--ink)' }, svg);
      S.grafik = kat;
    }
    var k = S.grafik, a = ARALIK[g], ust = a[1] * 1.02, alt = G[g].merkez != null ? Math.min(a[0], G[g].merkez) * 0.97 : 0;
    var x = function (v) { return L + (W - L - R) * (v - alt) / (ust - alt); };
    var dizi = I.slice().sort(function (p, q) { return deger(q, g, yi) - deger(p, g, yi); });
    dizi.forEach(function (o, s) {
      var v = deger(o, g, yi), r = k.satir[o.ad], on = vurgu.indexOf(o.ad) >= 0;
      r.gr.setAttribute('transform', 'translate(0,' + (T + sat * (s + 0.5)).toFixed(1) + ')');
      r.r.setAttribute('width', Math.max(1, x(v) - L).toFixed(1));
      r.r.style.fill = renk(g, v); r.r.style.stroke = on ? 'var(--ink)' : 'none'; r.r.style.strokeWidth = on ? 2 : 0;
      r.v.setAttribute('x', (x(v) + 6).toFixed(1)); r.v.textContent = sayi(v, G[g].b);
      r.v.style.fill = on ? 'var(--ink)' : 'var(--muted)'; r.ad.style.fontWeight = on ? 700 : 500;
    });
    var iv = ilDeger(g, yi);
    k.cizgi.style.display = k.cizgiT.style.display = iv == null ? 'none' : '';
    if (iv != null) { k.cizgi.setAttribute('x1', x(iv)); k.cizgi.setAttribute('x2', x(iv)); k.cizgiT.setAttribute('x', x(iv) + 4); k.cizgiT.textContent = 'İl ' + sayi(iv, G[g].b); }
  }

  function setT(t) {
    t = Math.max(0, Math.min(TOPLAM - 0.001, t));
    var si = Math.floor(t / SURE), yerel = t - si * SURE, s = SAHNE[si], g = G[s.g];
    var yi = g.seri ? Math.min(NY - 1, Math.floor((yerel / AKIS) * NY)) : 0;
    if (si !== S.son) {
      S.son = si; S.grafik = null;
      $('sNo').textContent = (si + 1) + ' / ' + SAHNE.length + ' · ' + g.kisa + ' · ' + (g.seri ? '2007–2025' : g.yil);
      $('sBaslik').textContent = s.baslik; $('sMetin').textContent = s.metin;
      lejant($('sLej'), s.g);
      document.querySelectorAll('#ilr button').forEach(function (b, k) { b.classList.toggle('simdi', k === si); });
    }
    $('sYil').textContent = g.seri ? Y[yi] : g.yil;
    boya(S.yollar, s.g, yi, s.vurgu);
    cubuklar($('sGrafik'), s.g, yi, s.vurgu);
    document.querySelectorAll('#ilr button i').forEach(function (b, k) { b.style.transition = 'none'; b.style.width = (k < si ? 100 : k > si ? 0 : yerel / SURE * 100) + '%'; });
  }

  function hikaye() {
    if (!$('sahne')) return;
    S.yollar = harita($('sSvg'), false);
    var ilr = $('ilr');
    SAHNE.forEach(function (s, k) { var b = document.createElement('button'); b.innerHTML = '<i></i><span>' + s.baslik + '</span>'; b.setAttribute('aria-label', (k + 1) + '. sahne: ' + s.baslik); b.onclick = function () { git(k * SURE); }; ilr.appendChild(b); });
    var t = 0, oynuyor = false, onceki = 0, bitti = false;
    var IKON = { oyna: '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>', dur: '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>', bas: '<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>' };
    function dugme() { var b = $('oyna'); b.innerHTML = oynuyor ? IKON.dur : (bitti ? IKON.bas : IKON.oyna); b.setAttribute('aria-label', oynuyor ? 'Duraklat' : (bitti ? 'Baştan oynat' : 'Oynat')); }
    function kare(ms) {
      if (!oynuyor) return;
      t += Math.min(0.1, (ms - onceki) / 1000); onceki = ms;
      if (t >= TOPLAM) { t = TOPLAM - 0.001; setT(t); oynuyor = false; bitti = true; dugme(); son(); return; }
      setT(t); requestAnimationFrame(kare);
    }
    function oyna() { if (bitti) { t = 0; bitti = false; } oynuyor = true; onceki = performance.now(); dugme(); requestAnimationFrame(kare); }
    function dur() { oynuyor = false; dugme(); }
    function git(yeniT) { t = Math.max(0, Math.min(TOPLAM - 0.001, yeniT)); bitti = false; setT(t); dugme(); }
    function son() {
      var p = $('perde'); p.hidden = false; p.classList.remove('kalk');
      p.innerHTML = '<div><span class="eyebrow">Hikâyenin devamı kitapta</span><h3>Şehir Büyürken</h3><p>Büyüyen bir kent, insanlarına gerçekten kaç seçenek bırakıyor? Sayıların arkasındaki gündelik hayat kitapta.</p><p style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:0"><a class="btn" href="../sehir-buyurken/">Kitabı gör</a><a class="btn ghost" href="#harita">Haritayı keşfet</a><button class="btn ghost" id="tekrar">Baştan izle</button></p></div>';
      $('tekrar').onclick = function () { p.hidden = true; oyna(); };
    }
    $('oyna').onclick = function () { $('perde').hidden = true; oynuyor ? dur() : oyna(); };
    $('basla').onclick = function () { var p = $('perde'); p.classList.add('kalk'); setTimeout(function () { p.hidden = true; }, 500); oyna(); };
    $('geri').onclick = function () { var si = Math.floor(t / SURE); git((t - si * SURE < 1.5 ? si - 1 : si) * SURE); };
    $('ileri').onclick = function () { git((Math.floor(t / SURE) + 1) * SURE); };
    $('sahne').addEventListener('keydown', function (e) {
      if (e.target.tagName === 'A') return;
      if (e.key === ' ') { e.preventDefault(); $('oyna').click(); } else if (e.key === 'ArrowRight') $('ileri').click(); else if (e.key === 'ArrowLeft') $('geri').click();
    });
    $('sahne').tabIndex = -1;
    // sayfada görünür olunca kendiliğinden başlamaz; okuyucu başlatır. Durağan kare: ilk sahnenin sonu.
    setT(AKIS); t = AKIS; dugme();
    window.CKLH = { setT: setT, SURE: SURE, TOPLAM: TOPLAM, SAHNE: SAHNE, dur: dur };
  }

  /* ---------- keşif haritası ---------- */
  function kesif() {
    if (!$('kSvg')) return;
    var q = new URLSearchParams(location.search);
    var D = { g: G[q.get('g')] ? q.get('g') : 'endeks', yi: NY - 1, sec: bul(q.get('ilce')) ? q.get('ilce') : 'Merkez' };
    var yq = Y.indexOf(+q.get('y')); if (yq >= 0) D.yi = yq;
    var yollar = harita($('kSvg'), true), ipucu = $('ipucu');
    // gösterge düğmeleri
    var gos = $('gos');
    [['Yıl yıl, 2007–2025', SIRA.filter(function (g) { return G[g].seri; })], ['Tek yıl', SIRA.filter(function (g) { return !G[g].seri; })]].forEach(function (gr) {
      var d = document.createElement('div'); d.className = 'grup'; d.innerHTML = '<small>' + gr[0] + '</small>';
      gr[1].forEach(function (g) { var b = document.createElement('button'); b.setAttribute('role', 'tab'); b.dataset.g = g; b.innerHTML = G[g].ad + (G[g].seri ? '' : '<em>' + G[g].yil + '</em>'); b.onclick = function () { D.g = g; ciz(); }; d.appendChild(b); });
      gos.appendChild(d);
    });
    var kYil = $('kYil'); kYil.max = NY - 1;
    kYil.oninput = function () { D.yi = +kYil.value; durdur(); ciz(); };
    var zam = null;
    var IK = { oyna: '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>', dur: '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>' };
    function durdur() { if (zam) { clearInterval(zam); zam = null; } $('kOyna').innerHTML = IK.oyna; $('kOyna').setAttribute('aria-label', 'Yılları oynat'); }
    $('kOyna').onclick = function () {
      if (zam) return durdur();
      if (!G[D.g].seri) { D.g = 'endeks'; }
      if (D.yi >= NY - 1) D.yi = 0;
      $('kOyna').innerHTML = IK.dur; $('kOyna').setAttribute('aria-label', 'Durdur');
      ciz(); zam = setInterval(function () { if (D.yi >= NY - 1) return durdur(); D.yi++; ciz(); }, 650);
    };
    I.forEach(function (o) {
      var p = yollar[o.ad];
      p.addEventListener('click', function () { D.sec = o.ad; ciz(); });
      p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); D.sec = o.ad; ciz(); } });
      p.addEventListener('focus', function () { D.sec = o.ad; ciz(); });
      p.addEventListener('mousemove', function (e) {
        var k = $('kSvg').parentNode.getBoundingClientRect();
        ipucu.hidden = false; ipucu.textContent = o.ad + ': ' + sayi(deger(o, D.g, D.yi), G[D.g].b) + ' ' + G[D.g].birim;
        var xx = e.clientX - k.left + 12; if (xx + ipucu.offsetWidth > k.width) xx = e.clientX - k.left - ipucu.offsetWidth - 12;
        ipucu.style.left = xx + 'px'; ipucu.style.top = (e.clientY - k.top - 34) + 'px';
      });
      p.addEventListener('mouseleave', function () { ipucu.hidden = true; });
    });
    window.addEventListener('keydown', function () {}, false);

    function kivilcim(o, g) {
      // ilçe ve il serisi (il seri değeri yoksa yalnızca ilçe)
      var W = 300, H = 70, a = o[g].slice(), b = G[g].ilYok ? null : IL[g];
      var hep = a.concat(b || []), mn = Math.min.apply(null, hep), mx = Math.max.apply(null, hep); if (mx === mn) mx = mn + 1;
      var x = function (i) { return 4 + (W - 8) * i / (NY - 1); }, y = function (v) { return 6 + (H - 18) * (1 - (v - mn) / (mx - mn)); };
      var yol = function (s) { return s.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(''); };
      return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;margin-top:12px" role="img" aria-label="' + o.ad + ' ' + G[g].kisa + ' 2007–2025">' +
        (b ? '<path d="' + yol(b) + '" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 3"/>' : '') +
        '<path d="' + yol(a) + '" fill="none" stroke="var(--terra)" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<line x1="' + x(D.yi) + '" x2="' + x(D.yi) + '" y1="2" y2="' + (H - 12) + '" stroke="var(--ink)" stroke-width="1"/>' +
        '<circle cx="' + x(D.yi) + '" cy="' + y(a[D.yi]) + '" r="4" fill="var(--terra)"/>' +
        '<text x="4" y="' + (H - 1) + '" style="font:11px var(--f-mono);fill:var(--muted)">2007</text><text x="' + (W - 4) + '" y="' + (H - 1) + '" text-anchor="end" style="font:11px var(--f-mono);fill:var(--muted)">2025</text>' +
        (b ? '<text x="' + (W / 2) + '" y="' + (H - 1) + '" text-anchor="middle" style="font:11px var(--f-body);fill:var(--muted)">— ilçe  - - il</text>' : '') + '</svg>';
    }

    function ciz() {
      var g = D.g, gg = G[g], yi = gg.seri ? D.yi : NY - 1, o = bul(D.sec);
      gos.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.g === g ? 'true' : 'false'); });
      boya(yollar, g, D.yi, [D.sec]);
      lejant($('kLej'), g);
      $('zaman').classList.toggle('kapali', !gg.seri);
      kYil.value = D.yi; $('kYilT').textContent = gg.seri ? Y[D.yi] : gg.yil;
      var dizi = I.slice().sort(function (p, r) { return deger(r, g, D.yi) - deger(p, g, D.yi); });
      var sira = dizi.indexOf(o) + 1, v = deger(o, g, D.yi), iv = ilDeger(g, D.yi);
      // kart
      var h = '<span class="eyebrow">' + gg.kisa + ' · ' + (gg.seri ? Y[D.yi] : gg.yil) + '</span><h3>' + o.ad + '</h3>' +
        '<div><span class="buyuk">' + sayi(v, gg.b) + '</span> <span class="birim">' + gg.birim + '</span></div>' +
        '<div class="sira">12 ilçe arasında ' + sira + '. sırada' + (iv != null ? ' · il: ' + sayi(iv, gg.b) : '') + '</div>';
      if (gg.seri) h += kivilcim(o, g);
      else h += '<p class="not" style="margin:10px 0 0">' + gg.aciklama + '. Bu gösterge için ilçe düzeyinde yalnızca ' + gg.yil + ' verisi bulunabildi.</p>';
      // tüm göstergelerde bu ilçe
      h += '<dl>';
      SIRA.forEach(function (k) {
        if (k === 'pay' || k === 'nufus') return;
        var gk = G[k], ov = deger(o, k, gk.seri ? D.yi : 0), il = ilDeger(k, gk.seri ? D.yi : 0), a = ARALIK[k];
        var oran = function (z) { return ((z - a[0]) / (a[1] - a[0]) * 100).toFixed(1); };
        h += '<dt>' + gk.kisa + ' <small style="font-family:var(--f-mono);font-size:.7rem">' + (gk.seri ? Y[D.yi] : gk.yil) + '</small></dt><dd><div class="cub"><i style="width:' + Math.max(2, oran(ov)) + '%;background:' + (k === g ? 'var(--terra)' : 'var(--strait)') + '"></i>' + (il != null ? '<u style="left:' + oran(il) + '%"></u>' : '') + '</div></dd><dd class="v">' + sayi(ov, gk.b) + '</dd>';
      });
      h += '</dl><p class="not" style="margin:8px 0 0">Çubuk: 12 ilçe arasındaki aralık. Dikey çizgi: il değeri.</p>';
      if (/^(Bozcaada|Eceabat|Gökçeada)$/.test(o.ad) && /^(dogumHiz|evlenmeHiz|bosOran)$/.test(g)) h += '<p class="uyari">Küçük sayı uyarısı: ' + o.ad + '\'da 2025\'te ' + o.nDogum + ' doğum, ' + o.nEvlenme + ' evlilik, ' + o.nBosanma + ' boşanma kaydedildi. Birkaç olay oranı belirgin biçimde değiştirir.</p>';
      $('kart').innerHTML = h;
      // sıralama
      var s = '<h3 style="font-size:1.3rem;margin:22px 0 0">Sıralama · ' + gg.ad + '</h3><ol>';
      var mx = Math.max.apply(null, dizi.map(function (p) { return deger(p, g, D.yi); }));
      dizi.forEach(function (p, k) {
        var pv = deger(p, g, D.yi);
        s += '<li' + (p === o ? ' class="sec"' : '') + '><span class="n">' + (k + 1) + '</span><button data-ad="' + p.ad + '">' + p.ad + '</button><div class="cub"><i style="width:' + (pv / mx * 100).toFixed(1) + '%;background:' + renk(g, pv) + '"></i></div><span class="v">' + sayi(pv, gg.b) + '</span></li>';
      });
      $('siralama').innerHTML = s + '</ol>';
      $('siralama').querySelectorAll('button').forEach(function (b) { b.onclick = function () { D.sec = b.dataset.ad; ciz(); }; });
      if (D.dokundu) { var u = new URL(location.href); u.searchParams.set('g', g); u.searchParams.set('ilce', D.sec); if (gg.seri) u.searchParams.set('y', Y[D.yi]); else u.searchParams.delete('y'); history.replaceState(null, '', u.pathname + u.search + u.hash); }
    }
    D.dokundu = !!location.search;
    durdur(); ciz(); D.dokundu = true;
  }

  /* ---------- belediye bütçesi ---------- */
  function butce() {
    var B = window.CKLB, svg = $('bSvg'); if (!B || !svg) return;
    var n = B.yillar.length, olcu = 'kb';
    function seri(k, o) { return B[k].map(function (v, i) { return o === 'cari' ? v / 1e6 : o === 'reel' ? v * B.carpan[i] / 1e6 : v * B.carpan[i] / B.nufus[i]; }); }
    function bicim(v, o) { return o === 'kb' ? sayi(v) + ' TL' : sayi(v, 0) + ' milyon TL'; }
    var W, H, L, R = 24, T = 18, Bt, fs;
    var x = function (i) { return L + (W - L - R) * i / (n - 1); };
    function ciz() {
      var dar = svg.parentNode.clientWidth < 600;
      W = dar ? 520 : 900; H = dar ? 460 : 400; L = dar ? 92 : 78; Bt = dar ? 44 : 36; fs = dar ? 20 : 13;
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      var g = seri('gelir', olcu), d = seri('gider', olcu), hep = g.concat(d);
      var mx = Math.max.apply(null, hep) * 1.08, mn = olcu === 'kb' ? 0 : 0;
      var adim = Math.pow(10, Math.floor(Math.log10(mx / 4))); var a = [1, 2, 2.5, 5, 10].map(function (k) { return k * adim; }).filter(function (k) { return mx / k <= 6; })[0];
      var y = function (v) { return T + (H - T - Bt) * (1 - (v - mn) / (mx - mn)); };
      var h = '';
      for (var i = 0; i < n; i++) if (d[i] > g[i]) h += '<rect x="' + (x(i) - (W - L - R) / (n - 1) / 2).toFixed(1) + '" y="' + T + '" width="' + ((W - L - R) / (n - 1)).toFixed(1) + '" height="' + (H - T - Bt) + '" fill="var(--mustard-soft)"/>';
      for (var v = 0; v <= mx; v += a) h += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="var(--line)"/><text class="eks" x="' + (L - 8) + '" y="' + (y(v) + fs / 3) + '" text-anchor="end" style="font-size:' + fs + 'px">' + sayi(v) + '</text>';
      B.yillar.forEach(function (yy, i) { if (i % 2 === 0 || n < 8) h += '<text class="eks" x="' + x(i) + '" y="' + (H - 10) + '" text-anchor="middle" style="font-size:' + fs + 'px">' + yy + '</text>'; });
      function yol(s) { return s.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(''); }
      h += '<path d="' + yol(g) + '" fill="none" stroke="var(--strait)" stroke-width="3" stroke-linejoin="round"/>';
      h += '<path d="' + yol(d) + '" fill="none" stroke="var(--terra)" stroke-width="3" stroke-linejoin="round" stroke-dasharray="7 5"/>';
      g.forEach(function (v, i) { h += '<circle cx="' + x(i) + '" cy="' + y(v) + '" r="4.5" fill="var(--strait)"/><circle cx="' + x(i) + '" cy="' + y(d[i]) + '" r="4" fill="var(--terra)"/>'; });
      h += '<line id="bImlec" y1="' + T + '" y2="' + (H - Bt) + '" stroke="var(--ink)" stroke-width="1" visibility="hidden"/>';
      for (i = 0; i < n; i++) h += '<rect class="bVur" data-i="' + i + '" x="' + (x(i) - (W - L - R) / (n - 1) / 2) + '" y="0" width="' + ((W - L - R) / (n - 1)) + '" height="' + H + '" fill="transparent" tabindex="0" aria-label="' + B.yillar[i] + ': gelir ' + bicim(g[i], olcu) + ', gider ' + bicim(d[i], olcu) + '"/>';
      svg.innerHTML = h;
      var ip = $('bIpucu'), im = $('bImlec');
      svg.querySelectorAll('.bVur').forEach(function (r) {
        function goster() {
          var i = +r.dataset.i, k = svg.getBoundingClientRect(), sx = k.width / W;
          im.setAttribute('x1', x(i)); im.setAttribute('x2', x(i)); im.setAttribute('visibility', 'visible');
          ip.hidden = false; ip.innerHTML = '<b>' + B.yillar[i] + '</b><br>Gelir ' + bicim(g[i], olcu) + '<br>Gider ' + bicim(d[i], olcu) + '<br>Gider/gelir %' + sayi(d[i] / g[i] * 100);
          var px = x(i) * sx + 12; if (px + ip.offsetWidth > k.width) px = x(i) * sx - ip.offsetWidth - 12;
          ip.style.left = px + 'px'; ip.style.top = (T * sx + 8) + 'px'; ip.style.whiteSpace = 'nowrap'; ip.style.lineHeight = '1.4';
        }
        r.addEventListener('mouseenter', goster); r.addEventListener('focus', goster); r.addEventListener('click', goster);
        r.addEventListener('mouseleave', function () { ip.hidden = true; im.setAttribute('visibility', 'hidden'); });
        r.addEventListener('blur', function () { ip.hidden = true; im.setAttribute('visibility', 'hidden'); });
      });
      $('bGos').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.o === olcu ? 'true' : 'false'); });
    }
    $('bGos').querySelectorAll('button').forEach(function (b) { b.onclick = function () { olcu = b.dataset.o; ciz(); }; });
    ciz();
    var sonGen = svg.parentNode.clientWidth; window.addEventListener('resize', function () { var g2 = svg.parentNode.clientWidth; if ((g2 < 600) !== (sonGen < 600)) ciz(); sonGen = g2; });
    var gr = seri('gelir', 'reel'), kb = seri('gelir', 'kb'), dk = seri('gider', 'kb'), son = n - 1;
    var bant = kb.slice(0, n - 2), acik = [];
    for (var i = 0; i < n; i++) if (B.gider[i] > B.gelir[i]) acik.push(B.yillar[i]);
    var enAcik = 0; for (i = 1; i < n; i++) if (B.gider[i] / B.gelir[i] > B.gider[enAcik] / B.gelir[enAcik]) enAcik = i;
    $('bOlgu').innerHTML =
      '<div><b>×' + sayi(gr[son] / gr[0], 1) + '</b><span>Reel net gelir, ' + B.yillar[0] + '→' + B.yillar[son] + ' (' + sayi(gr[0]) + ' → ' + sayi(gr[son]) + ' milyon TL)</span></div>' +
      '<div><b>' + sayi(Math.min.apply(null, bant)) + '–' + sayi(Math.max.apply(null, bant)) + ' TL</b><span>Kişi başı reel gelir bandı, ' + B.yillar[0] + '–' + B.yillar[n - 3] + '. ' + B.yillar[son] + ': ' + sayi(kb[son]) + ' TL</span></div>' +
      '<div><b>' + acik.length + ' yıl</b><span>Gider gelirden fazla (' + acik.join(', ') + '). En yüksek ' + B.yillar[enAcik] + ': gider gelirin %' + se(Math.round(B.gider[enAcik] / B.gelir[enAcik] * 100), 'i') + '</span></div>';
  }

  function hepsi() { egri(); hikaye(); kesif(); butce(); }
  // tema değişince yeniden boya
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (window.CKLH) setT(S.son * SURE + 0.01); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hepsi); else hepsi();
})();
