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
      K: ['Şehri yeni keşfeden', 'Sen şehrin en hareketli evresindesin. Şehir senin için bir başlangıç, belki de bir durak. Kira, ulaşım ve gece açık bir yer bulmak gündeminde. Kitap, aynı kentin aynı yıl içinde öğrencileri, genç aileleri, çalışma hayatının ortasındaki yetişkinleri ve yaşlıları birlikte ağırladığını anlatır. Bu evrelerin şehirden beklediği çoğu zaman birbirini tutmaz. Bedeli şu: Şehir seni geçici sayabilir. Kalıp kalmayacağına çoğu zaman iş ve konut karar verir.', 'Yan yana duran hayat evreleri'],
      Y: ['Yuva kuran', 'Senin şehrin çocuk ölçeğinde: okul yolu, park, güvenli bir kaldırım. Aynı mesafe senin için başka bir yolculuktur. Kitap bunu açıkça söyler: Yaşlı biri, bebek arabası iten bir ebeveyn ya da gece vardiyasından dönen bir işçi için aynı güzergâh başka bir yolculuğa dönüşür. Bedeli şu: Şehri çocuğunun adımlarıyla ölçtüğün için onun eksiklerini herkesten önce sen görürsün.', 'Gidebilmek ile rahat gidebilmek'],
      D: ['Denge kuran', 'İş, ev ve büyüklerinin ihtiyaçları arasında gidip geliyorsun. Günün tek tek önemsiz görünen yolculuklardan oluşuyor. Kitaba göre işe gitmek, okula yetişmek, hastaneye uğramak, çocuğu bırakıp almak tek başına önemsiz görünür. Gün içinde birbirine eklendiklerinde ise zamanın nasıl kullanıldığını belirleyen sıkı bir örgü kurarlar. Bedeli şu: Bu örgüde en önce senin kendi zamanın kaybolur.', 'Gidebilmek ile rahat gidebilmek'],
      A: ['Şehri yavaş yaşayan', 'Senin için şehir artık metreyle değil eğimle, kaldırımla, bankla ve durağın yeriyle ölçülüyor. Kitap bunu şöyle anlatır: Gençken birkaç yüz metre diye geçiştirilen bir mesafe, ileri yaşlarda yolun eğimi, kaldırımın hâli, soluklanacak bir bankın varlığı ve durağın yeriyle birlikte başka bir deneyime dönüşür. Bedeli şu: Şehir genişledikçe sana yakın olan şeyler azalabilir.', 'Yan yana duran hayat evreleri']
    }
  };

  // 2 -----------------------------------------------------------------
  T['sokagin-degisti'] = {
    sorular: [
      ['Sokağındaki en eski komşunun durumu ne?', [
        ['S', 'Hâlâ orada, her sabah selamlaşıyoruz'], ['Y', 'Orada, ama artık pek dışarı çıkamıyor'],
        ['O', 'Gitti, evini kiraya verdi'], ['D', 'Bina yıkıldı, yerine yenisi yapıldı']]],
      ['Sokakta en çok duyduğun ses ne?', [
        ['S', 'Her zamanki çocuk ve satıcı sesleri'], ['Y', 'Sessizlik, arada bir açık kalan televizyon'],
        ['O', 'Bavul tekerlekleri ve gece müziği'], ['D', 'İnşaat makineleri']]],
      ['Köşedeki dükkânın hâli ne?', [
        ['S', 'Aynı esnaf, aynı tabela'], ['Y', 'Kapandı, kepengi yıllardır inik'],
        ['O', 'Yerinde bir kafe ya da ucuz yemek yeri var'], ['D', 'Yerinde bir zincir market var']]],
      ['Apartmanındakileri tanıyor musun?', [
        ['S', 'Hepsini, adlarıyla'], ['Y', 'Tanırım, çoğu artık tek başına yaşıyor'],
        ['O', 'Her yıl yeni yüzler geliyor, tanıyamıyorum'], ['D', 'Yan bloktakileri hiç görmedim']]],
      ['Sokaktaki çocuklar?', [
        ['S', 'Eskisi kadar var'], ['Y', 'Çok azaldı'],
        ['O', 'Çocuk yok, gençler var'], ['D', 'Var ama site bahçesinde oynuyorlar']]],
      ['Sokağına yeni bir ad koysan?', [
        ['S', 'Bildik Sokak'], ['Y', 'Sessiz Sokak'], ['O', 'Bavul Sokağı'], ['D', 'Vinç Sokağı']]]
    ],
    sonuclar: {
      S: ['Direnen sokak', 'Senin sokağın hâlâ tanıdık. Aynı esnaf, aynı yüzler, aynı sesler. Bu, büyüyen şehirlerde giderek azalan bir şey. Kitap, bir sokağın yerli yerinde durabileceğini, ama orada yaşayanlar değiştiğinde başka bir tempoda yaşanmaya başlayacağını söyler. Bedeli şu: Bu dengeyi sokağın kendisi değil, oradaki insanlar taşıyor. Biri gidince fark daha hızlı hissedilir.', 'Bir sokak yerli yerinde durabilir'],
      Y: ['Yaşlanan sokak', 'Senin sokağın sessizleşiyor. Haneler seyreliyor, çocuk sesleri azalıyor, komşular evde daha uzun kalıyor. Kitabın cümlesiyle: “Kaldırımın yüksekliği değişmemiştir, fakat artık her sabah onu bastonla inen biri vardır.” Bedeli şu: Sokak aynı göründüğü için ihtiyaçları değişen insanlar görünmez kalabilir.', 'Yaşlanma ve gündelik mesafe'],
      O: ['Döner kapılı sokak', 'Senin sokağın her yıl yenileniyor. Kiracılar, öğrenciler, kısa süre kalanlar geliyor ve gidiyor. Kitabın cümlesiyle: “Apartmanın merdiveni aynıdır, fakat her eylül üç kata bavul taşıyan yeni bir öğrenci belirir.” Bedeli şu: Herkesin geçici olduğu yerde komşuluk kurulmaya fırsat bulamaz.', 'Gelen ve giden insanlar'],
      D: ['Yeniden yazılan sokak', 'Senin sokağın fiziksel olarak değişiyor. Eski binalar gidiyor, siteler ve zincir dükkânlar geliyor. Kitaba göre şehrin kıyısında yükselen her yeni konut dizisi, birkaç yüz hanenin gündelik coğrafyasını başka bir noktadan başlatır. Bedeli şu: Yeni binalar yeni insanlar getirir, ama eski bağlar binayla birlikte yıkılabilir.', 'Hafıza ile harita arasında']
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
      Y: ['Kök', 'Sen şehrin hafızasısın. Göç istatistiklerinde görünmezsin, ama şehri gelenlere anlatan sensin. TÜİK’e göre 2025’te Türkiye’de 2 milyon 475 bin kişi il değiştirdi. Bu, nüfusun yaklaşık yüzde üçü demek. Kalanların gözünden şehir her yıl biraz yeni yüzle dolar. Bedeli şu: Şehrin hep tanıdığın hâliyle kalmasını beklemek seni yeni gelenlerden uzaklaştırabilir.', 'Ne zaman gelip ne zaman gittikleri'],
      G: ['Yeni gelen', 'Sen şehre sonradan katıldın ve şehri kendi bağlarınla yeniden kuruyorsun. TÜİK’in 2025 verisine göre iller arası göçün en sık nedenleri hanedeki birine bağlı taşınma, daha iyi konut ve yaşam koşulları ve eğitimdi. Kitap da bir şehrin gündelik nabzını, insanların nerede doğduğu ve ne zaman gelip gittiğinin yeniden ayarladığını söyler. Bedeli şu: Kök salmak zaman ister ve ilk yıllarda şehir sana ait değilmiş gibi gelebilir.', 'Ne zaman gelip ne zaman gittikleri'],
      D: ['Dönen', 'Sen gidip geri gelenlerdensin. Şehri iki kez tanıdın: ayrılırken ve dönerken. Bu yüzden değişimi en net sen görürsün. Kitap bir şehrin değiştiğini çoğu zaman haritaya bakınca değil, hafızamızı bugünle yüz yüze getirince fark ettiğimizi söyler. Bedeli şu: Hatırladığın şehir ile döndüğün şehir aynı değil. Bu fark bazen bir yabancılık duygusu bırakır.', 'Hafıza ile harita arasında'],
      U: ['Yolcu', 'Sen bu şehirde yoldasın. Okul, iş ya da bir dönem için buradasın ve geleceğini başka yerde tasarlıyor olabilirsin. TÜİK’e göre 2025’te en çok göç eden yaş grubu 20–24’tü. Kitap insanların geleceklerini nerede tasarladıklarının da şehrin nabzını değiştirdiğini anlatır. Bedeli şu: Geçici olduğunu düşündüğün şehre yatırım yapmazsın, şehir de sana yatırım yapmaz.', 'Geleceklerini nerede tasarladıkları']
    }
  };

  // 4 -----------------------------------------------------------------
  T['zamanin-nereye'] = {
    sorular: [
      ['Sabah evden çıkınca ilk ne yaparsın?', [
        ['Y', 'Otobüse ya da dolmuşa yetişmeye çalışırım'], ['B', 'Durakta beklerim, gelmesini umarım'],
        ['K', 'Yürürüm, gideceğim yer yakın'], ['D', 'Arabaya binip trafiğe girerim']]],
      ['Haftanın en çok nerede kayboluyor?', [
        ['Y', 'Aktarmalarda'], ['B', 'Hastane ya da resmî daire kuyruğunda'],
        ['K', 'Pek kaybolmuyor, mesafeler kısa'], ['D', 'Park yeri ararken']]],
      ['Bir uzman doktora gitmek senin için ne demek?', [
        ['Y', 'Yarım gün: gidiş, dönüş, aktarma'], ['B', 'En zoru randevu bulmak'],
        ['K', 'Kısa bir yolculuk'], ['D', 'Hastanenin otoparkında yer bulmak']]],
      ['“Yakın” kelimesi senin için ne demek?', [
        ['Y', 'Tek otobüsle gidilen yer'], ['B', 'Beklemeden ulaşılan yer'],
        ['K', 'Yürüme mesafesi'], ['D', 'Arabayla on dakika']]],
      ['Şehirde en çok neyin değişmesini isterdin?', [
        ['Y', 'Daha sık sefer'], ['B', 'Daha az kuyruk, daha çok çevrim içi işlem'],
        ['K', 'Daha iyi kaldırım, daha çok gölge'], ['D', 'Daha az trafik']]],
      ['Akşam eve geldiğinde?', [
        ['Y', 'Yolun yorgunluğu işin yorgunluğunu geçiyor'], ['B', 'Bütün gün bir şey beklemiş gibiyim'],
        ['K', 'Hâlâ enerjim var'], ['D', 'Trafiğin sinirini atmaya çalışıyorum']]]
    ],
    sonuclar: {
      Y: ['Yolcu', 'Senin günün yolda bölünüyor. Kitap bunu şöyle anlatır: Özel aracı olan biri için on dakikalık bir geçiş, toplu taşımaya bağlı biri için durağa yürümek, beklemek, belki aktarma yapmak ve yeniden yürümekle birlikte bir saate yaklaşır. Yolun uzunluğu sabittir, yolculuğun hayattaki ağırlığı kişiden kişiye değişir. Bedeli şu: Bu zaman hiçbir istatistikte senin adınla görünmez.', 'Gidebilmek ile rahat gidebilmek'],
      B: ['Bekleyen', 'Senin zamanın yolda değil, beklerken gidiyor: durakta, kuyrukta, randevu sırasında. Kitap üç şeyi ayırır: bir yere varabilmek, o yolculuğun niteliği ve güvenliği. Bir hizmet birkaç kilometre ötede olabilir. Oraya düzenli ve makul bir bedelle ulaşamıyorsan fiziksel yakınlık kâğıt üzerinde kalır. Bedeli şu: Bekleme süresi görünmez olduğu için şikâyet de çoğu zaman kimseye ulaşmaz.', 'Yakınlık ve erişim'],
      K: ['Yakın yaşayan', 'Sen şanslı olanlardansın. Günün yürüme mesafesinde dönüyor. Kitaba göre bir yere yakın olmak coğrafi konumla sınırlı değildir. Oraya ne kadar sürede, ne kadar güvenilir biçimde ve ne kadar yorularak varılabildiği de hesaba girer. Bedeli şu: Kent büyüdükçe bu ayrıcalık çepere taşınanların elinden ilk giden şeydir.', 'Yakınlık ve erişim'],
      D: ['Direksiyondaki', 'Senin zamanın trafikte ve park yeri ararken eriyor. Kitap küçük gecikmelerin nasıl biriktiğini hesaplar: Bir yolculuğun on dakika uzaması devede kulak sayılır. Her gün gidiş ve dönüşte tekrarlandığında haftaya yüz dakika, yıla seksen saati aşkın bir süre ekler. Bedeli şu: Bu zaman küçük lokmalar hâlinde gittiği için farkına varmazsın.', 'Gidebilmek ile rahat gidebilmek']
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
      I: ['İnce bağlı', 'Sen işlerini çoğunlukla tek başına görüyorsun. Bu bir tercih de olabilir, şehrin sana bıraktığı bir durum da. Kitap kira, uzayan yollar ve bakım yükü üst üste bindiğinde bir hayatın tek bir kırılgan çizgiye sıkışabileceğini anlatır. Bedeli şu: Her şey yolundayken bağımsızlık gibi görünen şey, zor bir günde yalnızlığa dönüşebilir. Bir komşuyla selamlaşmak bile bir başlangıçtır.', 'Yakın, köprü ve kurumsal bağlar']
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
