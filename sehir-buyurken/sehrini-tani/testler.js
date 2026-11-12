/* Şehrini ne kadar tanıyorsun? — 5 test: içerik ve motor.
   Her soruda 4 seçenek, her seçenek bir sonuç tipine işaret eder. En çok çıkan tip sonuçtur. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc;
  var T = {};

  // 1 -----------------------------------------------------------------
  T['hayat-evresi'] = {
    sorular: [
      ['Şehirde bir günün en çok neye göre şekilleniyor?', [
        ['K', 'Derslerimin ya da ilk işimin saatlerine'], ['Y', 'Okul servisinin ve kreşin saatlerine'],
        ['D', 'İş, ev ve anne babamın ihtiyaçları arasındaki koşturmaya'], ['A', 'Pazar gününe, eczaneye ve doktor randevularına']]],
      ['Evden çıkınca ilk aradığın şey ne?', [
        ['K', 'Kafe, kütüphane ya da gece de açık bir yer'], ['Y', 'Çocukla güvenle yürünecek bir kaldırım ve park'],
        ['D', 'İşe en hızlı giden yol ya da bir park yeri'], ['A', 'Oturup soluklanacak bir bank']]],
      ['Taşınmayı düşünsen ilk kriterin ne olur?', [
        ['K', 'Ucuz kira ve merkeze yakınlık'], ['Y', 'Okula ve oyun alanına yakınlık'],
        ['D', 'İşe ve aileme eşit uzaklık'], ['A', 'Tanıdık komşular ve asansör']]],
      ['Seni şehirde en çok ne yorar?', [
        ['K', 'Kira ve belirsizlik'], ['Y', 'Bebek arabasıyla aşılamayan kaldırımlar'],
        ['D', 'Trafikte kaybolan saatler'], ['A', 'Yokuşlar ve uzak duraklar']]],
      ['“Bu şehir benim için…”', [
        ['K', '…bir başlangıç noktası.'], ['Y', '…çocuğumun büyüyeceği yer.'],
        ['D', '…her gün yeniden kurulan bir denge.'], ['A', '…hatıralarımın adresi.']]],
      ['Akşam saat dokuzda neredesin?', [
        ['K', 'Arkadaşlarla dışarıda'], ['Y', 'Çocukları yatırmaya çalışıyorum'],
        ['D', 'İşlerin bitmesini bekliyorum, ya da yeni bitti'], ['A', 'Evde, çoktan sakinleşmiş bir sokakta']]]
    ],
    sonuclar: {
      K: ['Şehri yeni keşfeden', 'Sen şehrin en hareketli evresindesin. Şehir senin için bir başlangıç, belki de bir durak. Kira, ulaşım ve gece açık bir yer bulmak gündeminde. Yeni insanlarla tanışmak senin için şehrin en büyük vaadi. Bedeli şu: Şehir seni geçici sayabilir. Kalıp kalmayacağına çoğu zaman iş ve konut karar verir.', 'Yan yana duran hayat evreleri'],
      Y: ['Yuva kuran', 'Senin şehrin çocuk ölçeğinde: okul, park, güvenli bir kaldırım. Kitap aynı kentin aynı yıl içinde öğrencileri, küçük çocuklu genç aileleri, çalışma hayatının ortasındaki yetişkinleri ve yaşlıları birlikte ağırladığını anlatır. Bu evrelerin şehirden beklediği çoğu zaman birbirini tutmaz. Bedeli şu: Şehri çocuğunun gözüyle ölçtüğün için onun eksiklerini herkesten önce sen görürsün.', 'Yan yana duran hayat evreleri'],
      D: ['Denge kuran', 'İş, ev ve büyüklerinin ihtiyaçları arasında gidip geliyorsun. Hem çocuklara hem anne babaya yetişmeye çalışan bir kuşağın ortasındasın. Şehir senin için bir sahne değil, her gün yeniden kurulan bir takvim. Bedeli şu: Bu takvimde en önce senin kendi zamanın kaybolur ve şehrin sunduğu şeylerin çoğunu yalnızca uzaktan görürsün.', 'Yan yana duran hayat evreleri'],
      A: ['Şehrin hafızası', 'Sen şehri en uzun tanıyanlardansın. Bugünkü sokakların altında eski sokakları da görürsün. Kitap bir şehrin değiştiğini çoğu zaman haritaya bakınca değil, hafızamızı bugünle yüz yüze getirince fark ettiğimizi söyler. Sen bu yüzleşmeyi her gün yaşıyorsun. Bedeli şu: Şehir sana göre değil, gelenlere göre değişiyor ve tanıdık yerler birer birer azalıyor.', 'Hafıza ile harita arasında']
    }
  };

  // 2 -----------------------------------------------------------------
  T['evin-nerede'] = {
    sorular: [
      ['Bütçen belli. Hangi evi seçersin?', [
        ['M', 'Merkezde eski bir binada 2+1, her yere yürüyerek'], ['C', 'Şehrin kıyısında yeni bir sitede 3+1, otoparklı'],
        ['K', 'Büyüdüğüm mahallede, tanıdık komşuların arasında'], ['G', 'Hangisi ucuzsa o, nasılsa birkaç yıl sonra taşınırım']]],
      ['Kira bu yıl çok arttı. Ne yaparsın?', [
        ['M', 'Daha küçük bir eve geçerim, ama merkezden çıkmam'], ['C', 'Daha uzağa, daha ucuza giderim'],
        ['K', 'Ev sahibimle konuşur, kalmanın yolunu ararım'], ['G', 'Ev arkadaşı bulurum ya da şehir değiştiririm']]],
      ['Ev bakarken ilk sorduğun soru ne?', [
        ['M', 'Yürüyerek nerelere gidebilirim?'], ['C', 'Kaç metrekare, otoparkı var mı?'],
        ['K', 'Komşular kimler?'], ['G', 'Depozito ne kadar, sözleşme kaç yıllık?']]],
      ['Pencereden ne görmek istersin?', [
        ['M', 'Sokağın hareketini'], ['C', 'Yeşil ve sessizlik'],
        ['K', 'Tanıdık çatıları'], ['G', 'Fark etmez, manzaraya para vermem']]],
      ['Bir çocuk bu evde büyüse nerede büyüsün isterdin?', [
        ['M', 'Okula kendi yürüyebileceği bir yerde'], ['C', 'Site bahçesinde, güvende'],
        ['K', 'Benim büyüdüğüm sokakta'], ['G', 'Nerede iş bulursam orada']]],
      ['On yıl sonra evin?', [
        ['M', 'Yine merkezde, belki yine kirada'], ['C', 'Kendi evim, şehrin kıyısında'],
        ['K', 'Aynı mahalle, belki aynı ev'], ['G', 'Bilmiyorum, bu da iyi bir şey']]]
    ],
    sonuclar: {
      M: ['Merkezde kalan', 'Sen metrekare yerine yakınlık satın alıyorsun. Evin küçük olabilir ama günün yürüme mesafesinde. Kitaba göre kentin büyümesi her şeyden önce uzaklık ve yakınlık duygusunun yeniden paylaştırılmasıdır. Sen bu paylaşımda yakın kalmayı seçenlerdensin. Bedeli şu: Bütçenin büyük kısmı konuta gider ve kira her yükseldiğinde bu seçimi yeniden savunmak zorunda kalırsın.', 'Uzaklık ve yakınlığın yeniden paylaşılması'],
      C: ['Kıyıya açılan', 'Sen daha geniş bir ev, daha sakin bir çevre için şehrin kıyısına gidiyorsun. Kitap bunun bir adres değişikliğinden fazlası olduğunu anlatır: Bir mahallenin kente katılması yeni bir sabah güzergâhı, yeni bir okul yolu, yeni bir otobüs bekleyişi, yeni bir eve dönüş süresi demektir. Bedeli şu: Metrekareyi kazanırken zamanla ödersin.', 'Genişleyen harita'],
      K: ['Mahalleye bağlı', 'Senin için ev, dört duvardan çok bir mahalle. Komşular, esnaf, tanıdık sokaklar. Daha büyük ya da daha yeni bir ev için bunları bırakmak istemiyorsun. Bedeli şu: Mahalle değiştiğinde, eski komşular gidip yerine yenileri geldiğinde, bağlı kaldığın şey de değişir. O zaman kalmanın anlamını yeniden düşünmen gerekir.', 'Mahalle ve aidiyet'],
      G: ['Esnek kiracı', 'Sen eve değil, hayatın o anki ihtiyacına göre yerleşiyorsun. Bu esneklik bir güç. Kitap ise bunun öbür yüzünü bir zincir olarak anlatır: Kira tırmanır, insanlar şehrin kıyısına taşınır, yolda geçen süre artar, bakım yükü ve yorgunluk biner. Bedeli şu: Bu zincire en açık olan, her sözleşme bittiğinde yeniden karar vermek zorunda kalandır.', 'Kira, mesafe ve daralan hayat']
    }
  };

  // 3 -----------------------------------------------------------------
  T['yerli-mi-gelen-mi'] = {
    sorular: [
      ['Bu şehirle hikâyen nasıl başladı?', [
        ['Y', 'Burada doğdum, hep buradayım'], ['G', 'Okul, iş ya da evlilikle geldim'],
        ['D', 'Burada doğdum, gittim, geri döndüm'], ['U', 'Geçici olarak buradayım']]],
      ['Bayramda “memlekete gitmek” senin için ne demek?', [
        ['Y', 'Zaten memleketteyim'], ['G', 'Başka bir şehre yolculuk'],
        ['D', 'Eskiden buraya gelmekti, artık buradayım'], ['U', 'Belli değil, birkaç adres arasında bölünüyor']]],
      ['Biri şehrin eski hâlini anlatıyor. Sen?', [
        ['Y', 'Ben de anlatırım, hatırlarım'], ['G', 'Merakla dinlerim'],
        ['D', 'Şaşırırım, ben gittiğimde böyle değildi'], ['U', 'Pek ilgilenmem, şehri bugünüyle yaşıyorum']]],
      ['Beş yıl sonra neredesin?', [
        ['Y', 'Burada'], ['G', 'Burada kök salmaya çalışıyorum'],
        ['D', 'Burada, bu sefer kalıcı olarak'], ['U', 'Büyük ihtimalle başka bir şehirde']]],
      ['Seni bu şehre en çok ne bağlıyor?', [
        ['Y', 'Ailem ve mahallem'], ['G', 'Burada kurduğum iş ve arkadaşlıklar'],
        ['D', 'Anne babam ve çocukluğum'], ['U', 'Şimdilik okulum ya da işim']]],
      ['Şehirde bir sorun yaşasan ilk kimi ararsın?', [
        ['Y', 'Bir akrabamı'], ['G', 'İş arkadaşımı ya da ev arkadaşımı'],
        ['D', 'Çocukluk arkadaşımı'], ['U', 'Başka şehirdeki ailemi']]]
    ],
    sonuclar: {
      Y: ['Kök', 'Sen şehrin hafızasısın. Göç hareketlerinde görünmezsin, ama şehri gelenlere anlatan sensin. Her yıl yeni yüzler gelip giderken sabit kalan sensin. Bedeli şu: Şehrin hep tanıdığın hâliyle kalmasını beklemek seni yeni gelenlerden uzaklaştırabilir. Bir şehrin yerlisi olmak, ona yeni gelenleri de kendi hikâyesine katabilmektir.', 'Ne zaman gelip ne zaman gittikleri'],
      G: ['Yeni gelen', 'Sen şehre sonradan katıldın ve şehri kendi bağlarınla yeniden kuruyorsun. Kitap bir şehrin gündelik nabzını, insanların nerede doğduğunun ve ne zaman gelip gittiğinin yeniden ayarladığını söyler. Sen o nabzı değiştirenlerdensin. Bedeli şu: Kök salmak zaman ister ve ilk yıllarda şehir sana ait değilmiş gibi gelebilir.', 'Ne zaman gelip ne zaman gittikleri'],
      D: ['Dönen', 'Sen gidip geri gelenlerdensin. Şehri iki kez tanıdın: ayrılırken ve dönerken. Bu yüzden değişimi en net sen görürsün. Kitabın cümlesiyle: Hafıza, haritanın yakalayamadığı bir şeyi saklar. Bir yerin nerede durduğunu değil, bir insana ne kadar uzak ya da yakın geldiğini. Bedeli şu: Hatırladığın şehir ile döndüğün şehir aynı değil.', 'Hafıza ile harita arasında'],
      U: ['Yolcu', 'Sen bu şehirde yoldasın. Okul, iş ya da bir dönem için buradasın ve geleceğini başka yerde tasarlıyor olabilirsin. Şehir senin için bir istasyon. Bedeli şu: Geçici olduğunu düşündüğün şehre yatırım yapmazsın, şehir de sana yatırım yapmaz. Bazen bir istasyon, farkına varmadan bir adrese dönüşür.', 'Geleceklerini nerede tasarladıkları']
    }
  };

  // 4 -----------------------------------------------------------------
  T['secenekler'] = {
    sorular: [
      ['Şehrinde sevdiğin bir sanatçının konseri var. Ne olur?', [
        ['Z', 'Giderim, bu tür şeylere sık giderim'], ['S', 'Bilet var ama saat, ulaşım ya da evdeki işler yüzünden gidemem'],
        ['T', 'Bizim şehre pek gelmezler, başka şehre gitmem gerekir'], ['Y', 'Gelmezse arkadaşlarla kendimiz bir şey düzenleriz']]],
      ['Bir uzman doktora görünmen gerekiyor.', [
        ['Z', 'Şehirde birkaç seçenek var, istediğimi seçerim'], ['S', 'Var, ama randevu haftalar sonraya'],
        ['T', 'Başka bir şehre gitmem gerekir'], ['Y', 'Bir tanıdık bulur, yolunu açarım']]],
      ['İş değiştirmek istesen?', [
        ['Z', 'Şehirde alternatif çok'], ['S', 'İlanlar var, ama bana uyan saatte ve yakında değil'],
        ['T', 'Şehir değiştirmem gerekir'], ['Y', 'Kendi işimi kurarım ya da uzaktan çalışırım']]],
      ['Hafta sonun nasıl geçer?', [
        ['Z', 'Seçmekte zorlanırım'], ['S', 'Yapmak istediklerim var, vakit ya da para yetmiyor'],
        ['T', 'Hep aynı birkaç yer'], ['Y', 'Kendi keşfettiğim yerlere giderim']]],
      ['Bir çocuk için kurs ya da spor?', [
        ['Z', 'Bol seçenek var'], ['S', 'Var, ama ücretli ve uzak'],
        ['T', 'Neredeyse yok'], ['Y', 'Velilerle birlikte kendimiz organize ederiz']]],
      ['“Bu şehir bana…”', [
        ['Z', '…istediğim hayatı kurma imkânı veriyor.'], ['S', '…vitrinden bakmayı öğretti.'],
        ['T', '…dar geliyor.'], ['Y', '…ne verdiyse onu büyüttüm.']]]
    ],
    sonuclar: {
      Z: ['Seçenek zengini', 'Şehir sana bir menü sunuyor ve sen o menüden gerçekten seçebiliyorsun. Kitabın sorusu tam da bu: Bir kent büyürken insanlarına kaç gerçek seçenek bırakır? Senin cevabın şimdilik “çok”. Bedeli şu: Bu seçenekler herkese aynı kolaylıkla açık değil. Senin rahatça seçtiğin şey, aynı şehirde bir başkası için yalnızca bir vitrin olabilir.', 'Kaç gerçek seçenek'],
      S: ['Vitrine bakan', 'Şehrin sahip oldukları ortada: hastane, konser salonu, kurslar, iş ilanları. Ama saat, ulaşım, ücret ya da bakım yükü araya giriyor. Kitap tam bu aralığı izler: kentin sahip oldukları ile insanların gerçekten yapabildikleri arasındaki mesafe. Bedeli şu: Seçenekler kâğıt üzerinde var olduğu için eksikliğin kimsenin gözüne çarpmaz.', 'Sahip olunan ile yapılabilen'],
      T: ['Şehri dar gelen', 'Senin şehrin sana az seçenek bırakıyor. Önemli şeyler için başka şehirlere gitmen gerekiyor: bir uzman hekim, bir konser, bir iş görüşmesi. Her gidiş bir gün, bir yol parası, bazen bir izin demek. Bedeli şu: Seçeneğin uzakta olması, onun fiilen yok olmasına yakındır. Zamanla insan istemeyi de bırakır.', 'Kaç gerçek seçenek'],
      Y: ['Kendi yolunu açan', 'Şehir sana hazır bir menü sunmuyor, ama sen kendi seçeneğini yaratıyorsun: bir dernek, bir dayanışma, bir girişim. Bu, büyüyen şehirlerin en az görünen sermayesi. Bedeli şu: Bu yolu herkes açamaz. Senin zamanın, enerjin ve bağların, başkalarının seçeneği hâline gelir. Yorulduğunda yerini dolduracak bir yapı yoksa o seçenek de kaybolur.', 'Kaç gerçek seçenek']
    }
  };

  // 5 -----------------------------------------------------------------
  T['mahallen-tasiyor-mu'] = {
    sorular: [
      ['Hastalandın, eczaneden ilaç lazım. Ne olur?', [
        ['Y', 'Komşum ya da bir akrabam getirir'], ['K', 'Mahalledeki tanıdık esnafı ararım'],
        ['R', 'Eczane ya da belediye hizmeti eve getirir'], ['I', 'Kalkıp kendim giderim']]],
      ['Bir hafta evde olmayacaksın. Anahtar kimde kalır?', [
        ['Y', 'Karşı komşuda'], ['K', 'Başka mahallede oturan bir arkadaşta'],
        ['R', 'Site yönetiminde ya da kapıcıda'], ['I', 'Kimseye bırakmam']]],
      ['Sokağında bir sorun var, örneğin bozuk bir lamba. Ne yaparsın?', [
        ['Y', 'Komşularla konuşur, birlikte hallederiz'], ['K', 'Bu işleri bilen birini tanıyorum, ona söylerim'],
        ['R', 'Muhtara ya da belediyeye başvururum'], ['I', 'Birinin halletmesini beklerim']]],
      ['Yeni bir iş ya da fırsat haberi sana nereden gelir?', [
        ['Y', 'Ailemden'], ['K', 'Pek yakın olmadığım ama selamlaştığım insanlardan'],
        ['R', 'İlanlardan ve kurumlardan'], ['I', 'İnternette tek başıma ararım']]],
      ['Mahallende adını bilen kaç kişi var?', [
        ['Y', 'Çok, çocukluğumdan beri'], ['K', 'Farklı çevrelerden epey kişi'],
        ['R', 'Muhtar, eczacı, kapıcı'], ['I', 'Neredeyse hiç kimse']]],
      ['Thoreau evinde üç sandalye olduğunu yazar: biri yalnızlık, ikisi dostluk, üçü toplum için. En çok hangisini kullanıyorsun?', [
        ['Y', 'İkincisini: dostluk'], ['K', 'Üçüncüsünü: toplum'],
        ['R', 'Hepsini, sırası gelince'], ['I', 'Birincisini: yalnızlık']]]
    ],
    sonuclar: {
      Y: ['Yakın bağlarla taşınan', 'Seni ailen ve komşuların taşıyor. Zor bir günde yalnız kalmazsın. Bu, şehirde en güçlü güvencelerden biri. Bedeli şu: Yakın bağlar sıcaktır ama dardır. Sosyolog Mark Granovetter’in klasik çalışmasına göre yeni iş ve fırsat haberleri çoğu zaman en yakınlarımızdan değil, daha uzak tanıdıklarımızdan gelir. Mahallen değişirse ya da sen taşınırsan bu güvence kolay taşınmaz.', 'Yakın, köprü ve kurumsal bağlar'],
      K: ['Köprü kuran', 'Senin gücün farklı çevreleri birbirine bağlayabilmen. Selamlaştığın esnaf, başka mahalledeki arkadaş, bir derneğin üyesi. Granovetter bu tür bağlara “zayıf bağların gücü” der: Yeni bilgi ve fırsat en çok bu köprülerden geçer. Bedeli şu: Köprüler geniştir ama ince. Gerçekten zor bir günde seni taşıyacak kadar güçlü olmayabilirler.', 'Yakın, köprü ve kurumsal bağlar'],
      R: ['Kurumlara yaslanan', 'Sen işini kurumlar aracılığıyla görüyorsun: muhtar, belediye, eczane, site yönetimi. Bu düzenli ve güvenilir bir yol. Bedeli şu: Kurumsal bağ, kurum ne kadar yakınsa o kadar işe yarar. Kitaba göre şehir büyüdükçe bir hanenin çocukları başka bir okula, yaşlıları başka bir sağlık ocağına bağlanır. Kurum uzaklaşınca bu bağ da incelir.', 'Yakın, köprü ve kurumsal bağlar'],
      I: ['İnce bağlı', 'Sen işlerini çoğunlukla tek başına görüyorsun. Bu bir tercih de olabilir, şehrin sana bıraktığı bir durum da. Thoreau’nun birinci sandalyesi, yani yalnızlık, senin en çok kullandığın sandalye. Bedeli şu: Her şey yolundayken bağımsızlık gibi görünen şey, zor bir günde yalnızlığa dönüşebilir. Bir komşuyla selamlaşmak bile bir başlangıçtır.', 'Yakın, köprü ve kurumsal bağlar']
    }
  };

  // ================= MOTOR =================
  var slug = document.body.dataset.slug, t = T[slug], kok = $('#uygulama');
  if (!t || !kok) return;
  var o = ST.bul(slug), sec = '';
  var sorular = t.sorular.map(function (q) { return [q[0], ST.karistir(q[1])]; });

  function ilerleme(i) { var h = '<div class="ilerleme">'; for (var k = 0; k < sorular.length; k++) h += '<i' + (k <= i ? ' class="on"' : '') + '></i>'; return h + '</div>'; }
  function ciz(i) {
    if (i >= sorular.length) return bitir();
    var q = sorular[i];
    kok.innerHTML = '<div class="kart">' + ilerleme(i) + '<p class="adim">Soru ' + (i + 1) + ' / ' + sorular.length + '</p><p class="soru">' + esc(q[0]) + '</p><div class="secenekler">' +
      q[1].map(function (s, j) { return '<button class="secenek" data-j="' + j + '">' + esc(s[1]) + '</button>'; }).join('') + '</div></div>';
    kok.querySelectorAll('.secenek').forEach(function (b) { b.onclick = function () { sec += q[1][+b.dataset.j][0]; ciz(i + 1); ustGit(); }; });
  }
  function bitir() {
    var say = {}, en = null;
    sec.split('').forEach(function (k, i) { say[k] = (say[k] || 0) + 1 + (i === sec.length - 1 ? 0.1 : 0); });
    Object.keys(say).forEach(function (k) { if (!en || say[k] > say[en]) en = k; });
    ST.kaydet(slug, t.sonuclar[en][0]);
    sonucGoster(en, true);
  }
  function sonucGoster(k, kendi) {
    var s = t.sonuclar[k]; if (!s) return ciz(0);
    var paylasUrl = ST.url(slug) + '?s=' + k;
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">' + (kendi ? 'Sonucun' : 'Arkadaşının sonucu') + '</p><h2>' + esc(s[0]) + '</h2><p>' + esc(s[1]) + '</p>' +
      '<p class="kitapta">Kitaptaki tema: ' + esc(s[2]) + '</p><div id="sonucPaylas"></div>' +
      '<div class="dugmeler">' + (kendi ? '<button class="btn ghost" id="yeniden">Testi yeniden çöz</button>' : '<button class="btn" id="yeniden">Sen de çöz</button>') +
      '<a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div></div>';
    if (kendi) ST.paylas($('#sonucPaylas'), { url: paylasUrl, mesaj: 'Şehir Büyürken testine göre ben “' + s[0] + '” çıktım. Sen?',
      hikaye: { ust: o.ad, baslik: s[0], alt: 'Seninki ne?' } });
    $('#yeniden').onclick = function () { sec = ''; history.replaceState(null, '', location.pathname); ciz(0); ustGit(); };
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri(slug);
  }
  function ustGit() { var u = $('#uygulama'); if (u && u.getBoundingClientRect().top < 0) u.scrollIntoView({ behavior: 'smooth' }); }

  var q = new URLSearchParams(location.search).get('s');
  if (q && t.sonuclar[q]) sonucGoster(q, false); else ciz(0);
})();
