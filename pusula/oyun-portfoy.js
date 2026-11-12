/* Oyun — 2035 portföyünü sen kur. Politikalar, kapılar, maliyet sınıfları ve zincirler: Çanakkale'nin Pusulası, Bölüm 15, Tablo 23 ve 24. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc, kok = $('#uygulama');
  if (!kok) return;
  var K = ['Mali Kapasite ve Şeffaflık', 'Demografi, Bakım ve Erişim', 'İnsan Sermayesi ve Yenilik', 'Temel Kentsel Sistemler ve Hizmet Kapasitesi', 'Yerel Değer ve Ekonomik Dönüşüm', 'Afet, İklim ve Hizmet Sürekliliği', 'Veri, Katılım ve Uyarlanabilir Yönetim'];
  // [no, ad, kapı, maliyet(D/O/Y), süre, küme]
  var P = [
    [1, 'Emlak vergisi değerleme, tahakkuk ve tahsilat izleme sistemi', 'A', 'D', 'Kısa', 0],
    [2, 'Yerel vergilerde sınıflandırma, kayıt ve tahsilat denetimi', 'A', 'D', 'Kısa', 0],
    [3, 'İl genelinde karşılaştırmalı mali şeffaflık panosu', 'B', 'D', 'Kısa', 0],
    [4, 'Yaşlanma ve bakım ihtiyaç analizi ile kademeli bakım modeli', 'A', 'D', 'Kısa', 1],
    [5, 'Çocuk bakımı ve ailelerin hizmet erişimi analizi', 'A', 'D', 'Kısa', 1],
    [6, 'Ada ve kırsal sağlık erişimi ve sevk modeli', 'B', 'O', 'Orta', 1],
    [7, 'İlçe bazlı hizmet erişimi izleme panosu', 'B', 'O', 'Kısa', 1],
    [8, 'ÇOMÜ mezun izleme ve yerel yetenek tutunma programı', 'B', 'O', 'Orta', 2],
    [9, 'ÇOMÜ–sanayi–kamu uygulamalı yenilik ve proje platformu', 'B', 'O', 'Orta', 2],
    [10, 'Atikhisar havza koruma ve su kalitesi izleme programı', 'B', 'O', 'Uzun', 3],
    [11, 'Çanakkale Merkez su kaynaklarını çeşitlendirme master planı', 'C', 'Y', 'Uzun', 3],
    [12, 'Kepez içme suyu hizmet güvenilirliği ve isale hattı sonuç izleme', 'B', 'O', 'Orta', 3],
    [13, 'Çanakkale konut erişilebilirliği gözlemevi', 'A', 'D', 'Kısa', 3],
    [14, 'Hedef hane odaklı sosyal konut ve belediye arsası fizibilitesi', 'C', 'O', 'Orta', 3],
    [15, 'Hareketlilik ve trafik güvenliği izleme ve müdahale programı', 'A', 'O', 'Kısa', 3],
    [16, 'Atık akışları ve döngüsel kaynak yönetimi programı', 'A', 'O', 'Orta', 3],
    [17, 'Destinasyon yönetimi ve konaklama süresini geliştirme stratejisi', 'B', 'O', 'Orta', 4],
    [18, 'Bozcaada ve Gökçeada mevsimsel hizmet kapasitesi ve turizm baskısı izleme', 'B', 'O', 'Kısa', 4],
    [19, 'Coğrafi işaretli zeytinyağlarında değer zinciri ve yan ürünlerde katma değer', 'B', 'O', 'Orta', 4],
    [20, 'Yerel kalkınma için yatırımcı ve proje hazırlık programı', 'B', 'O', 'Orta', 4],
    [21, 'Boğaz–liman–üretim lojistik değer zinciri ve fizibilite', 'C', 'Y', 'Uzun', 4],
    [22, 'Mavi ekonomi ve denizcilik hizmetleri değer zinciri analizi', 'A', 'D', 'Kısa', 4],
    [23, 'Deniz üstü rüzgâr için yerel tedarik, insan kaynağı ve etki hazırlığı', 'B', 'O', 'Orta', 4],
    [24, 'Bina stoku ön tarama ve deprem kırılganlığı envanteri', 'B', 'O', 'Orta', 5],
    [25, 'Tarım–orman arayüzünde yangın önleme ve tahliye hazırlığı', 'B', 'O', 'Orta', 5],
    [26, 'İklim ve mevsimsel hizmet baskısı erken uyarı çerçevesi', 'A', 'O', 'Kısa', 5],
    [27, 'Gösterge ve karar izleme platformu ve 2030 ara değerlendirmesi', 'B', 'O', 'Uzun', 6],
    [28, 'Mahalle düzeyinde katılım ve geri bildirim sistemi', 'A', 'D', 'Kısa', 6]
  ];
  var MAL = { D: 4, O: 8, Y: 16 }, MAD = { D: 'Düşük', O: 'Orta', Y: 'Yüksek' }, BUTCE = 60;
  // Tablo 24'teki zincirlerden türetilen ön koşul uyarıları: [politika, gereken (biri yeterli), açıklama]
  var Z = [
    [11, [10, 12], 'Yeni su kaynağı kararı, havza ve hizmet güvenilirliği bilgisi üzerine kurulur (10 + 12 → 11).'],
    [14, [13], 'Önce konutun ekonomik erişilebilirliği ölçülür, sonra hedef hane ve uygun araç belirlenir (13 → 14).'],
    [3, [1, 2], 'Kayıt ve tahsilat kalitesi, karşılaştırılabilir mali bilgiye dönüşür (1 → 2 → 3).'],
    [7, [4, 5], 'Bakım ve çocuk hizmeti ihtiyacı, ilçe düzeyindeki gerçek erişimle birlikte değerlendirilir (4 + 5 → 7).'],
    [9, [8], 'Mezun ve beceri verisi ortak projelerle eşleştirilir (8 → 9).'],
    [21, [20], 'Lojistik yatırımı, proje hazırlığı ve insan kaynağıyla aynı kararın ön koşullarıdır (8/9 + 20 + 21 + 23).']
  ];
  var sec = {};
  function harcanan() { return Object.keys(sec).reduce(function (a, n) { return a + MAL[P[n - 1][3]]; }, 0); }
  function ciz() {
    var h = '<div class="kart"><p class="adim">Bütçen ' + BUTCE + ' puan</p><p class="soru">Çanakkale 2035 için hangi politika seçeneklerini başlatırsın?</p>' +
      '<p class="kucuk">Maliyet puanları kitabın maliyet sınıflarına dayanır: düşük 4, orta 8, yüksek 16. Gerçek bütçe değil, oyun değeridir. Harf, politikanın ilk kapısıdır: A ölç ve hazırla, B koordine et, C fizibilite ve yatırım kararı.</p>' +
      '<div class="butce"><span id="harc"></span><span class="yol"><i id="bar"></i></span></div>';
    K.forEach(function (k, ki) {
      h += '<p class="kume-b">' + esc(k) + '</p>';
      P.filter(function (p) { return p[5] === ki; }).forEach(function (p) {
        h += '<label class="politika"><input type="checkbox" data-n="' + p[0] + '"' + (sec[p[0]] ? ' checked' : '') + '><span><b>' + p[0] + '.</b> ' + esc(p[1]) + '<small>Kapı ' + p[2] + ' · ' + MAD[p[3]] + ' maliyet · ' + p[4] + ' süre</small></span><span class="rozet">' + MAL[p[3]] + '</span></label>';
      });
    });
    h += '<div class="dugmeler"><button class="btn" id="degerlendir">Portföyümü değerlendir</button></div><p class="kucuk" id="uyar"></p></div>';
    kok.innerHTML = h; guncel();
    kok.querySelectorAll('.politika input').forEach(function (c) {
      c.onchange = function () {
        var n = +c.dataset.n;
        if (c.checked) { if (harcanan() + MAL[P[n - 1][3]] > BUTCE) { c.checked = false; $('#uyar').textContent = 'Bütçe yetmiyor. Önce başka bir seçeneği bırak.'; return; } sec[n] = 1; }
        else delete sec[n];
        $('#uyar').textContent = ''; guncel();
      };
    });
    $('#degerlendir').onclick = function () { if (!Object.keys(sec).length) { $('#uyar').textContent = 'En az bir politika seç.'; return; } sonuc(); };
  }
  function guncel() { var hh = harcanan(); $('#harc').textContent = hh + ' / ' + BUTCE + ' · ' + Object.keys(sec).length + ' politika'; $('#bar').style.width = (hh / BUTCE * 100) + '%'; }
  function sonuc() {
    var ns = Object.keys(sec).map(Number).sort(function (a, b) { return a - b; });
    var kume = {}, kapi = { A: 0, B: 0, C: 0 };
    ns.forEach(function (n) { var p = P[n - 1]; kume[p[5]] = 1; kapi[p[2]]++; });
    var kumeN = Object.keys(kume).length, omurga = sec[27] || sec[28];
    var uyari = Z.filter(function (z) { return sec[z[0]] && !z[1].some(function (r) { return sec[r]; }); });
    var tip;
    if (uyari.length >= 2) tip = ['Erken yatırımcı', 'Portföyün sonuca hızlı ulaşmak istiyor, ama birkaç adım kendi ön koşulu olmadan atılıyor. Kitabın politika zincirlerine göre bir politikanın çıktısı başka bir politikanın girdisine dönüşebilir. Ön koşulu seçilmeden atılan adım, eksik bilgiyle verilmiş bir karar olur.'];
    else if (kumeN >= 6 && omurga && !uyari.length) tip = ['Dengeli portföy', 'Yedi kümenin ' + kumeN + '’sine dokunuyorsun, zincirleri doğru sırayla kuruyorsun ve portföyün bir izleme omurgası var. Kitabın ifadesiyle portföy, sabit bir plan değil, sonuçlara göre kendisini güncelleyebilen bir karar sistemi olarak çalışır.'];
    else if (kapi.A >= ns.length / 2) tip = ['Önce ölçen portföy', 'Seçimlerinin çoğu Kapı A’dan başlıyor. Ölçüm portföyün temelini kurar, ama kitabın zincirlerinde ölçüm hep bir sonraki halkaya bağlanır: konut gözlemevi sosyal konut kararına, mezun izleme ortak projelere. Bir sonraki adım, ölçtüğünü hangi kararla buluşturacağın.'];
    else if (kapi.B >= ns.length / 2) tip = ['Masayı kuran portföy', 'Seçimlerinin çoğu Kapı B’de. Kitap politika kümelerini birbirini besleyen karar alanları olarak görür ve senin portföyün bu bağları kurmaya odaklanıyor. Eksik kalabilecek olan, koordinasyonun dayanacağı ölçüm halkası.'];
    else tip = ['Odaklı portföy', 'Belirli alanlara yoğunlaşıyorsun. Kitap kümelerin birbirinden bağımsız olmadığını hatırlatır: Konut ulaşımla, turizm su ve atıkla, yatırım insan kaynağıyla, afet hazırlığı hizmet sürekliliğiyle bağlantılıdır.'];
    ST.kaydet('portfoy', tip[0]);
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">Portföyün · ' + ns.length + ' politika · ' + harcanan() + ' / ' + BUTCE + ' puan</p><h2>' + esc(tip[0]) + '</h2><p>' + esc(tip[1]) + '</p>' +
      '<table class="tablo"><tr><td>Dokunduğun stratejik küme</td><td class="s"><b>' + kumeN + ' / 7</b></td></tr><tr><td>Kapı A · B · C</td><td class="s"><b>' + kapi.A + ' · ' + kapi.B + ' · ' + kapi.C + '</b></td></tr><tr><td>İzleme ve katılım omurgası (27 veya 28)</td><td class="s"><b class="' + (omurga ? 'ok' : 'uyari') + '">' + (omurga ? 'Var' : 'Yok') + '</b></td></tr></table>' +
      (uyari.length ? '<p><b class="uyari">Zincir uyarısı</b></p><ul>' + uyari.map(function (z) { return '<li><b>' + z[0] + '. ' + esc(P[z[0] - 1][1]) + '</b>: ' + esc(z[2]) + '</li>'; }).join('') + '</ul>' : '<p class="ok"><b>Zincir uyarısı yok.</b> Seçtiğin büyük adımların ön koşulları da portföyünde.</p>') +
      (omurga ? '' : '<p class="kucuk">Kitaba göre Politika 27 ve 28 bütün portföyün veri, öğrenme ve geri bildirim omurgasını oluşturur.</p>') +
      '<p class="kucuk">Seçtiklerin: ' + ns.join(', ') + '</p>' +
      '<p class="kitapta">Kitaptan: 2030 ara değerlendirmesinde temel soru “28 politikanın kaçı uygulandı?” değil, “Hangi sorun değişti, hangi politika sonuç verdi, hangi araç yeniden tasarlanmalı ve hangi yeni karar artık gerekli?” olmalıdır.</p>' +
      '<div id="sonucPaylas"></div><div class="dugmeler"><button class="btn ghost" id="yeniden">Portföyü değiştir</button><a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div></div>';
    ST.paylas($('#sonucPaylas'), { url: ST.url('portfoy'), mesaj: 'Çanakkale 2035 için ' + ns.length + ' politikalık portföyümü kurdum: “' + tip[0] + '”. Sen hangilerini seçerdin?',
      hikaye: { ust: '2035 portföyünü sen kur', etiket: 'Benim portföyüm', baslik: tip[0], ek: ns.length + ' politika · ' + kumeN + ' / 7 küme', alt: 'Sen hangilerini seçerdin?' } });
    $('#yeniden').onclick = ciz;
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri('portfoy');
  }
  ciz();
})();
