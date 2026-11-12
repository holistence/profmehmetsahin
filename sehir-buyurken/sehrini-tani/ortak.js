/* Şehrini ne kadar tanıyorsun? — ortak yardımcılar, liste, paylaşım ve hikâye görseli */
(function () {
  'use strict';
  var SITE = 'https://profmehmetsahin.com', KOK = '/sehir-buyurken/sehrini-tani/';
  var LISTE = [
    { slug: 'hayat-evresi', tur: 'test', ad: 'Şehrinde hangi hayat evresindesin?', kisa: 'Aynı şehir aynı anda öğrenciyi, genç aileyi, yorgun yetişkini ve yaşlıyı taşır. Sen hangisisin?', sure: '6 soru' },
    { slug: 'sokagin-degisti', tur: 'test', ad: 'Sokağın ne kadar değişti?', kisa: 'Binalar yerinde duruyor. Peki sokağının temposu, sesi ve insanları?', sure: '6 soru' },
    { slug: 'yerli-mi-gelen-mi', tur: 'test', ad: 'Bu şehrin neresindesin?', kisa: 'Yerli, yeni gelen, dönen ya da yolcu. Şehrinle bağın hangi hikâyeden?', sure: '6 soru' },
    { slug: 'zamanin-nereye', tur: 'test', ad: 'Şehirde zamanın nereye gidiyor?', kisa: 'Yolda, durakta, kuyrukta ya da direksiyonda. Günün hangi parçası şehre gidiyor?', sure: '6 soru' },
    { slug: 'mahallen-tasiyor-mu', tur: 'test', ad: 'Mahallen seni taşıyor mu?', kisa: 'Zor bir günde kime dayanırsın? Yakın, köprü ve kurumsal bağlarını tart.', sure: '6 soru' },
    { slug: 'tahmin', tur: 'oyun', ad: 'İlini tahmin et: 6 rakam', kisa: 'İlini seç, nüfusunu, yaşlanmasını, göçünü ve hanelerini tahmin et. TÜİK verisiyle karşılaştır.', sure: '3 dk' },
    { slug: 'kac-dakika', tur: 'oyun', ad: 'Senin şehrin kaç dakika?', kisa: 'Eczane, okul, market, durak. Yürüyerek kaç dakikadalar ve 80 yaşında biri için bu ne demek?', sure: '2 dk' },
    { slug: 'yokus', tur: 'oyun', ad: 'Yokuş hesabı', kisa: 'Aynı iki kilometre bir gence, bir yaşlıya ve bebek arabalı bir ebeveyne aynı gelmez. Önce tahmin et.', sure: '2 dk' },
    { slug: 'yolda-kac-saat', tur: 'oyun', ad: 'Yılda kaç saat yoldasın?', kisa: 'Günlük yolculuğunu gir, yılda kaç gününün yolda geçtiğini gör. On dakika ne değiştirir?', sure: '1 dk' },
    { slug: 'ayni-apartman', tur: 'oyun', ad: 'Aynı apartman, yirmi yıl', kisa: 'Bir apartmanın yirmi yılını sen yönet. Bina aynı kalır, sokağın temposu değişir.', sure: '3 dk' }
  ];
  var KITAP = 'https://www.kitapyurdu.com/kitap/sehir-buyurken-canakkalede-buyuyen-kent-ve-gundelik-hayat/774348.html';

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function utm(url, k) { return url + (url.indexOf('?') > -1 ? '&' : '?') + 'utm_source=' + k; }
  function kopyala(s) { try { navigator.clipboard.writeText(s); return true; } catch (e) { return false; } }
  function karistir(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sayi(n, d) { return Number(n).toLocaleString('tr-TR', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
  function bul(slug) { for (var i = 0; i < LISTE.length; i++) if (LISTE[i].slug === slug) return LISTE[i]; return null; }
  function url(slug) { return SITE + KOK + (slug ? slug + '/' : ''); }

  // ---- ilerleme (yalnızca bu tarayıcıda) ----
  var AN = 'sehriniTani';
  function kayitlar() { try { return JSON.parse(localStorage.getItem(AN)) || {}; } catch (e) { return {}; } }
  function kaydet(slug, ozet) { var r = kayitlar(); r[slug] = { o: ozet, t: Date.now() }; try { localStorage.setItem(AN, JSON.stringify(r)); } catch (e) {} }

  // ---- liste kartları ----
  function ogeHTML(o) {
    var r = kayitlar()[o.slug];
    return '<a class="oge" href="' + KOK + o.slug + '/"><span class="tur"><span>' + (o.tur === 'test' ? 'Test' : 'Oyun') + ' · ' + o.sure + '</span>' + (r ? '<b>✓ ' + esc(r.o) + '</b>' : '') + '</span><h3>' + esc(o.ad) + '</h3><p>' + esc(o.kisa) + '</p></a>';
  }
  function digerleri(slug) {
    var l = LISTE.filter(function (o) { return o.slug !== slug && !kayitlar()[o.slug]; });
    if (l.length < 2) l = LISTE.filter(function (o) { return o.slug !== slug; });
    l = karistir(l).slice(0, 4);
    return '<h2 class="bolum-b">Sıradaki</h2><div class="liste">' + l.map(ogeHTML).join('') + '</div><p><a href="' + KOK + '">Tüm testler ve oyunlar (' + Object.keys(kayitlar()).length + '/10) →</a></p>';
  }

  // ---- hikâye görseli 1080×1920 ----
  function satirla(c, m, w) { var k = String(m).split(' '), o = [], s = ''; k.forEach(function (x) { var d = s ? s + ' ' + x : x; if (c.measureText(d).width <= w) s = d; else { if (s) o.push(s); s = x; } }); if (s) o.push(s); return o; }
  function hikayeCiz(o) {
    var cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1920;
    var c = cv.getContext('2d'), N = '#1e2b3c', T = '#b4532f', S = '#5b6b70';
    c.fillStyle = '#f3ede2'; c.fillRect(0, 0, 1080, 1920);
    c.strokeStyle = 'rgba(180,83,47,.22)'; c.lineWidth = 2;
    for (var r = 90; r < 1900; r += 95) { c.beginPath(); c.arc(860, 1500, r, 0, Math.PI * 2); c.stroke(); }
    c.textAlign = 'center';
    function yaz(m, f, renk, y, w, lh) { c.font = f; c.fillStyle = renk; lh = lh || Math.round(parseInt(f.match(/(\d+)px/)[1], 10) * 1.18); var l = satirla(c, m, w || 880); l.forEach(function (s, i) { c.fillText(s, 540, y + i * lh); }); return y + l.length * lh; }
    yaz('Ş E H İ R   B Ü Y Ü R K E N', '600 32px Figtree, sans-serif', T, 250);
    var y = yaz(o.ust, 'italic 400 56px Newsreader, Georgia, serif', N, 360, 880);
    y = Math.max(y + 170, 760);
    y = yaz(o.etiket || 'Sonucum', '500 40px Figtree, sans-serif', S, y);
    y = yaz(o.baslik, '500 104px Newsreader, Georgia, serif', T, y + 60, 900, 112);
    if (o.ek) y = yaz(o.ek, '400 44px Figtree, sans-serif', N, y + 30, 860, 58);
    yaz(o.alt || 'Seninki ne?', '600 58px Figtree, sans-serif', N, Math.max(y + 100, 1450));
    yaz('profmehmetsahin.com/sehir-buyurken', '600 40px Figtree, sans-serif', N, 1610);
    yaz('Şehir Büyürken · Prof. Dr. Mehmet Şahin', '400 32px Figtree, sans-serif', S, 1662);
    return cv;
  }

  // ---- paylaşım çubuğu ----
  // kutu: eleman; p: {url, mesaj, hikaye:{ust,etiket,baslik,ek,alt}}
  function paylas(kutu, p) {
    var u = p.url, m = p.mesaj, blob = null;
    var h = '<div class="serit"><span>Paylaş</span>' +
      '<a class="wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(m + ' ' + utm(u, 'whatsapp')) + '">WhatsApp</a>' +
      (p.hikaye ? '<button class="ig" type="button">Instagram Hikâye</button>' : '<button class="ig" type="button">Instagram</button>') +
      '<a target="_blank" rel="noopener" href="https://x.com/intent/tweet?text=' + encodeURIComponent(m + ' ' + utm(u, 'x')) + '">X</a>' +
      '<a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(utm(u, 'facebook')) + '">Facebook</a>' +
      '<a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(utm(u, 'linkedin')) + '">LinkedIn</a>' +
      '<button class="kp" type="button">Bağlantıyı kopyala</button></div>' +
      '<p class="not ig-not" hidden>Bağlantı kopyalandı. Instagram’da <b>Hikâye</b>’yi seç, <b>bağlantı etiketine</b> yapıştır.</p>';
    var d = document.createElement('div'); d.innerHTML = h; kutu.appendChild(d);
    if (p.hikaye) {
      var fl = ['600 32px Figtree', '400 44px Figtree', '600 58px Figtree', 'italic 400 56px Newsreader', '500 104px Newsreader'];
      var bekle = document.fonts && document.fonts.load ? Promise.all(fl.map(function (f) { return document.fonts.load(f).catch(function () {}); })) : Promise.resolve();
      bekle.then(function () { hikayeCiz(p.hikaye).toBlob(function (b) { blob = b; }, 'image/png'); });
    }
    $('.ig', d).onclick = function () {
      var iu = utm(u, 'instagram'); kopyala(iu); $('.ig-not', d).hidden = false;
      if (p.hikaye && blob) {
        var f = null; try { f = new File([blob], 'sehir-buyurken.png', { type: 'image/png' }); } catch (e) {}
        if (f && navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f] }).catch(function () {}); return; }
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'sehir-buyurken.png'; document.body.appendChild(a); a.click(); setTimeout(function () { a.remove(); }, 1000);
        $('.ig-not', d).innerHTML = 'Görsel indirildi, bağlantı kopyalandı. Telefonda Instagram’da <b>Hikâye</b> olarak paylaş, <b>bağlantı etiketine</b> yapıştır.';
      } else if (navigator.share && /Android|iPhone|iPad/i.test(navigator.userAgent)) navigator.share({ title: m, url: iu }).catch(function () {});
    };
    $('.kp', d).onclick = function (e) { e.target.textContent = kopyala(u) ? 'Kopyalandı' : u; };
    return d;
  }

  // ---- sayfa başı paylaşım şeridi (oynamadan önce) ----
  function serit() {
    var yer = $('#serit'); if (!yer) return;
    var slug = document.body.dataset.slug, o = bul(slug);
    var m = o ? 'Şehir Büyürken · ' + o.ad + ' ' + o.kisa : 'Şehrini ne kadar tanıyorsun? Şehir Büyürken kitabından 5 test ve 5 oyun, herkes kendi şehri için:';
    paylas(yer, { url: url(o ? slug : ''), mesaj: m });
  }

  // merkez sayfa
  function merkez() {
    var t = $('#testler'), g = $('#oyunlar'); if (!t) return;
    t.innerHTML = LISTE.filter(function (o) { return o.tur === 'test'; }).map(ogeHTML).join('');
    g.innerHTML = LISTE.filter(function (o) { return o.tur === 'oyun'; }).map(ogeHTML).join('');
    var n = Object.keys(kayitlar()).length, s = $('#sayac'); if (s) s.textContent = n ? n + ' / 10 tamamlandı' : '';
  }

  window.ST = { SITE: SITE, KOK: KOK, LISTE: LISTE, KITAP: KITAP, $: $, esc: esc, utm: utm, karistir: karistir, sayi: sayi, bul: bul, url: url, kayitlar: kayitlar, kaydet: kaydet, digerleri: digerleri, paylas: paylas, hikayeCiz: hikayeCiz };
  serit(); merkez();
  var dg = $('#diger'); if (dg) dg.innerHTML = digerleri(document.body.dataset.slug);
})();
