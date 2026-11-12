/* Çanakkale'nin Pusulası — 5 test: içerik ve motor.
   Kaynak: Uysal Şahin, Ö. ve Şahin, M. (2026). Çanakkale'nin Pusulası. Holistence Publications. DOI 10.55094/holistence.603
   Tip testleri: en çok çıkan tip sonuçtur. Bilgi testi (rakam-tuzagi): her soruda tek doğru cevap. */
(function () {
  'use strict';
  var ST = window.ST, $ = ST.$, esc = ST.esc;
  var T = {};

  // 1 — Bölüm 14, Tablo 22 -------------------------------------------
  T['senaryo'] = {
    dagilim: { S: 'Süreklilik', B: 'Baskıların Birikmesi', Y: 'Yönlendirilmiş Dönüşüm' },
    sorular: [
      ['2035’te Çanakkale’de yaşlanma ve bakım için ne bekliyorsun?', [
        ['S', 'Yaşlanma sürer, bakım hizmetleri bugünkü gibi devam eder'], ['B', 'Yaşlanma sürer ve bakım açığı büyür'], ['Y', 'Yaşlanma sürer, ama bakıma erişim ölçülebilir biçimde genişler']]],
      ['Merkez’in suyu için?', [
        ['S', 'Atikhisar ana kaynak olarak kalır'], ['B', 'Tek kaynağa bağımlılığın baskısı ağırlaşır'], ['Y', 'Atikhisar’ın yanında güvenilir alternatif kapasite oluşur']]],
      ['Kepez’in içme suyu hizmeti için?', [
        ['S', 'Yeni altyapı devreye girer, ama sonucu izlenmez'], ['B', 'Kesinti ve arızalar sürer'], ['Y', 'Hizmet performansı kalıcı olarak iyileşir']]],
      ['Barınma için?', [
        ['S', 'Kiraların gelire göre ne durumda olduğu belirsiz kalır'], ['B', 'Kira ile gelir arasındaki baskı büyür'], ['Y', 'Konutun erişilebilirliği ölçülür ve hedeflenir']]],
      ['ÇOMÜ ve kent için?', [
        ['S', 'Üniversite büyüklüğünü korur, kente etkisi bilinmez'], ['B', 'Mezunların Çanakkale ile bağı zayıf kalır'], ['Y', 'Mezunların kentte kalması ve işle eşleşmesi izlenir']]],
      ['Turizm için?', [
        ['S', 'Ziyaret ve geceleme büyür'], ['B', 'Yoğunluk hizmetlere baskı yaratır'], ['Y', 'Kalış süresi, sezon ve yerel harcama iyileşir']]],
      ['On iki ilçe arasındaki farklar için?', [
        ['S', 'İlçeler arasındaki farklılaşma sürer'], ['B', 'Erişim farkları derinleşir'], ['Y', 'Yere özgü politikalar erişim göstergelerine bağlanır']]],
      ['Belediyelerin mali yapısı için?', [
        ['S', 'Merkezi transferlerin ağırlığı sürer'], ['B', 'Yerel hareket alanı daralır'], ['Y', 'Öz gelir, yatırım ve şeffaflık güçlenir']]]
    ],
    sonuclar: {
      S: ['Süreklilik', 'Senin beklediğin Çanakkale, 2035’e bugünkünden daha yüksek bir kapasiteyle ulaşıyor, ama baskılar bütünüyle ortadan kalkmıyor. Kitap bu senaryoda temel meselenin kapasite eksikliğinden çok, kapasite artışının sonuçlarla ne ölçüde ilişkilendirilebildiği olduğunu söyler. Süreklilik gerileme anlamına gelmez. Ama il düzeyindeki güçlü ortalamalar, bazı ilçelerin ve nüfus gruplarının farklı koşullarını gizleyebilir.', 'Bölüm 14.1 · Süreklilik'],
      B: ['Baskıların Birikmesi', 'Senin beklediğin Çanakkale’de sorunlar tek tek değil, aynı anda geliyor. Kitaba göre bu senaryoda temel sorun, tek tek yönetilebilir görünen ihtiyaçların aynı dönemde üst üste gelerek aynı hizmet ve yatırım kapasitesini zorlamasıdır. Yaşlanma bakım talebini, küçülen haneler konut ihtiyacını, yeni yerleşimler su ve ulaşım yükünü artırır. Bunlar aynı dönemde olursa yerel mali hareket alanı daralır.', 'Bölüm 14.2 · Baskıların Birikmesi'],
      Y: ['Yönlendirilmiş Dönüşüm', 'Senin beklediğin Çanakkale, değişimi ölçen ve yönünü düzeltebilen bir kent. Kitabın cümlesiyle: Başarı, daha fazla büyüklük üretmekten çok mevcut ve yeni varlıkları yerel değere dönüştürürken kırılganlıkları azaltabilmektir. Ama kitap bir uyarı da ekler: Yönlendirilmiş dönüşüm, 2035’te bütün sorunların çözülmüş olduğu ideal bir Çanakkale tasviri değildir.', 'Bölüm 14.3 · Yönlendirilmiş Dönüşüm']
    },
    not: 'Kitaba göre üç senaryo birer kesin gelecek öngörüsü değildir. Asıl işlevleri, hangi göstergelerin yön değiştirdiğini zamanında görmektir. 2030, bu yönün ilk kez sınanacağı kontrol noktasıdır.'
  };

  // 2 — Bölüm 15, A/B/C uygulama kapıları -------------------------------
  T['kapi'] = {
    sorular: [
      ['Kepez’de içme suyu sık sık kesiliyor. İlk adımın ne olur?', [
        ['A', 'Kesinti, arıza ve basınç verisini düzenli toplamaya başlarım'], ['B', 'Belediyeyi, su idaresini ve muhtarları aynı masaya toplarım'],
        ['C', 'Yeni isale hattı ve depo seçeneklerini maliyetleriyle karşılaştırırım'], ['H', 'Hemen yeni bir hat döşetirim']]],
      ['Yazın Bozcaada’da su, atık ve sağlık hizmetleri zorlanıyor.', [
        ['A', 'Sezonda adadaki fiilî nüfusu ve hizmet yükünü ölçerim'], ['B', 'Ada belediyesi, sağlık ve ulaşım kurumlarıyla ortak sezon planı yaparım'],
        ['C', 'Kalıcı yeni altyapının fizibilitesini yaptırırım'], ['H', 'Ziyaretçi sayısını hemen sınırlarım']]],
      ['Kiralar hızla artıyor.', [
        ['A', 'Önce kira ile hane geliri arasındaki ilişkiyi ölçen bir gözlem sistemi kurarım'], ['B', 'Belediye, üniversite ve emlak sektörüyle düzenli veri paylaşımı kurarım'],
        ['C', 'Belediye arsasında hedef haneler için sosyal konut fizibilitesi yaptırırım'], ['H', 'Hemen sosyal konut inşaatına başlarım']]],
      ['Üniversite mezunları kentte kalmıyor gibi görünüyor.', [
        ['A', 'Mezunların 1., 3. ve 5. yılda nerede yaşayıp çalıştığını izlerim'], ['B', 'ÇOMÜ’yü, sanayiyi ve kamuyu ortak projelerde buluştururum'],
        ['C', 'Büyük bir yatırım fikrinin fizibilitesini yaptırırım'], ['H', 'Mezunlara hemen bir teşvik paketi açıklarım']]],
      ['Yaşlı nüfus artıyor, bakım talebi büyüyor.', [
        ['A', 'İlçe ilçe bakım ihtiyacını, başvuruları ve bekleme sürelerini ölçerim'], ['B', 'Sosyal hizmet, sağlık ve belediye hizmetlerini ortak bir erişim düzenine bağlarım'],
        ['C', 'Yeni bakım tesisi seçeneklerini alternatifleriyle karşılaştırırım'], ['H', 'Hemen yeni bir bakımevi yaptırırım']]],
      ['Orman ile köylerin iç içe olduğu yerlerde yangın riski var.', [
        ['A', 'Riskli yerleşimleri ve tahliye yollarını envanterlerim'], ['B', 'AFAD’ı, orman idaresini, belediyeleri ve köyleri ortak bir hazırlık planında buluştururum'],
        ['C', 'Yeni müdahale noktaları için yatırım analizi yaptırırım'], ['H', 'Hemen yeni araç ve ekipman alırım']]]
    ],
    sonuclar: {
      A: ['Kapı A: Önce ölçen', 'Sen bir soruna önce büyüklüğünü, dağılımını ve veri açığını görerek giriyorsun. Kitap bunu Kapı A, yani “ölç ve hazırla” diye adlandırır ve bir önem sırası olmadığını vurgular: Kapı A’daki düşük maliyetli bir ölçüm politikası, gelecekte pahalı ve yanlış ölçekli bir yatırım kararını önleyebilir. Riskin şu: Ölçmek bir başlangıçtır, sonuç değil. Veri, bir karara bağlanmazsa arşivde kalır.', 'Bölüm 15 · A, B ve C uygulama kapıları'],
      B: ['Kapı B: Masayı kuran', 'Sen sorunları kurumları bir araya getirerek çözüyorsun. Kitap bunu Kapı B, yani “koordine et” diye tanımlar: Uygulama birden fazla kurumun veri, yetki veya hizmet kapasitesini birlikte kullanmasını gerektirir. Kitaba göre bazı alanlarda asıl ihtiyaç, kurumların aynı sorun tanımı ve aynı göstergeler üzerinde buluşmasıdır. Riskin şu: Ortak bir veri yoksa masa, herkesin kendi rakamını savunduğu bir toplantıya dönüşür.', 'Bölüm 15 · A, B ve C uygulama kapıları'],
      C: ['Kapı C: Hesabı yapan', 'Sen büyük kararları alternatifleri karşılaştırmadan vermiyorsun. Kitap bunu Kapı C, yani “fizibilite ve yatırım kararı” diye adlandırır: Büyük ölçekli, yüksek maliyetli veya geri dönüşü zor bir müdahaleden önce alternatifler karşılaştırılmalıdır. Kitabın önemli bir notu var: Fizibilitenin “yatırım gerekli değildir” sonucuna ulaşması da değerli bir karar çıktısıdır.', 'Bölüm 15 · A, B ve C uygulama kapıları'],
      H: ['Hemen yapan', 'Sen sorunu görünce harekete geçiyorsun. Bu kararlılık bir güç, ama kitap tam bu refleks için uyarır: Bir sorunun önemli olması, ilk akla gelen çözümün uygulanması gerektiği anlamına gelmez. Kitaba göre büyük yatırım gerektiren alanlarda karar, fizibilite, alternatifler, maliyet, çevresel etkiler ve uzun dönemli işletme koşulları görülmeden verilmemelidir. Hızın bedeli, yanlış ölçekte ve geri dönüşü zor bir yatırım olabilir.', 'Bölüm 15 · Politika listesi değil, uygulama portföyü']
    }
  };

  // 3 — Kapak: Bu kitap kime yazıldı? -------------------------------------
  T['okur'] = {
    sorular: [
      ['Bir rakama baktığında ilk sorduğun soru ne?', [
        ['V', 'Bu benim gündelik hayatımı nasıl etkiler?'], ['I', 'Burada hangi fırsat var?'],
        ['S', 'Kim geride kalıyor ve bunu kim izliyor?'], ['Y', 'Hangi kararın bu bilgiye dayanması gerekir?']]],
      ['“Barajın doluluğu düştü” haberini okudun.', [
        ['V', 'Kesinti olacak mı, evde suyu nasıl idareli kullanırım?'], ['I', 'İşletmem için su riski ne kadar?'],
        ['S', 'Kamuoyunu bilgilendirir, şeffaf veri isterim'], ['Y', 'Talebi ve alternatif kaynak planını gözden geçiririm']]],
      ['Turizmde rekor bir yaz geçti.', [
        ['V', 'Sokaklar, trafik ve fiyatlar ne olacak?'], ['I', 'Konuklar nasıl daha uzun kalır?'],
        ['S', 'Adalardaki hizmet yükünü kim takip ediyor?'], ['Y', 'Su, atık ve sağlık kapasitesini sezona göre ayarlarız']]],
      ['ÇOMÜ hakkında aklındaki soru?', [
        ['V', 'Çocuğum burada okuyup burada çalışabilir mi?'], ['I', 'Burada nitelikli eleman bulabilir miyim?'],
        ['S', 'Gençler kentin karar süreçlerine nasıl katılır?'], ['Y', 'Mezunlar kentte kalıyor mu, bunu ölçüyor muyuz?']]],
      ['Belediye bütçesine bakınca?', [
        ['V', 'Ödediğim verginin karşılığını alıyor muyum?'], ['I', 'Altyapı yatırımları işimi nasıl etkiler?'],
        ['S', 'Belediyeler karşılaştırılabilir veri yayımlıyor mu?'], ['Y', 'Öz gelir ile transfer dengesi hareket alanımızı nasıl belirliyor?']]],
      ['Bu kitabı nereye koyarsın?', [
        ['V', 'Evdeki kitaplığa'], ['I', 'Ofiste masamın üstüne'], ['S', 'Dernek toplantısına'], ['Y', 'Kurum arşivine değil, karar masasına']]]
    ],
    sonuclar: {
      V: ['Çanakkale’de yaşayan vatandaş', 'Sen rakamlara gündelik hayatın gözüyle bakıyorsun: su, kira, trafik, okul, sağlık. Kitabın kapağı ilk okur olarak seni sayar: Çanakkale’de yaşayan ve yaşamak isteyen her vatandaş. Bölüm sonlarındaki “Bu bölüm kime ne anlatıyor?” kutularında sana ayrılmış bir “Halk için” notu var. Senin için portföyde öne çıkan seçenek, Politika 28: Mahalle düzeyinde katılım ve geri bildirim sistemi. Kitaba göre göstergelerde görülen değişimin sahada karşılık bulup bulmadığını en iyi sen söylersin.', 'Kapak · Bu kitap kime yazıldı?'],
      I: ['Girişimci, iş insanı ve esnaf', 'Sen rakamlarda fırsat ve risk arıyorsun. Kitap senin için ekonomik hareketin kentte ne kadar üretim, beceri ve tedarik bağlantısı bıraktığını sorar. Sana en yakın seçenekler: destinasyon yönetimi ve konaklama süresi (17), coğrafi işaretli zeytinyağları (19), yatırımcı ve proje hazırlığı (20) ve mavi ekonomi analizi (22). Bölüm sonlarındaki kutularda “İş dünyası için” notlarını bulursun.', 'Kapak · Bu kitap kime yazıldı?'],
      S: ['Sivil toplum ve aktivist', 'Sen rakamın arkasında kimin görünmez kaldığını soruyorsun. Kitap sivil topluma izleme ve savunuculuk gündemi kurmayı önerir: hizmet erişimi, çevre, barınma ve veri açıklığı. Sana en yakın seçenekler: il genelinde karşılaştırmalı mali şeffaflık panosu (3), ilçe bazlı hizmet erişimi izleme panosu (7) ve mahalle düzeyinde katılım ve geri bildirim sistemi (28).', 'Kapak · Bu kitap kime yazıldı?'],
      Y: ['Kamu yöneticisi ve siyasetçi', 'Sen rakama bir karar sorusu olarak bakıyorsun. Kitabın sana önerisi, politikayı bir liste değil bir portföy olarak görmek: Önce neyi bilmeli, hangi kurumlar birlikte hareket etmeli, hangi müdahale geri dönüşü zor bir yatırım gerektiriyor? Sana en yakın seçenek, bütün portföyün omurgası olan Politika 27: Çanakkale Gösterge ve Karar İzleme Platformu ve 2030 Ara Değerlendirmesi.', 'Kapak · Bu kitap kime yazıldı?']
    }
  };

  // 4 — Bölüm 1, 5, 7 ve 15: stratejik varlıklar -------------------------
  T['varlik'] = {
    sorular: [
      ['Çanakkale denince aklına ilk ne gelir?', [
        ['D', 'Boğaz ve önünden geçen gemiler'], ['T', 'Zeytinlikler ve köyler'], ['U', 'Üniversite ve gençler'], ['M', 'Troya, tarih ve adalar']]],
      ['Şehre bir misafirin geldi. Onu nereye götürürsün?', [
        ['D', 'Kordona, gemileri izlemeye'], ['T', 'Bir zeytinyağı fabrikasına ve köy kahvaltısına'], ['U', 'Kampüse ve öğrenci mekânlarına'], ['M', 'Ören yerine ya da adaya']]],
      ['Çanakkale’de bir iş kuracak olsan?', [
        ['D', 'Denizcilik ve liman hizmetleri'], ['T', 'Markalı ve ambalajlı zeytinyağı'], ['U', 'Bir teknoloji girişimi'], ['M', 'Uzun konaklamalı bir butik otel']]],
      ['2035’te Çanakkale ne ile anılsın?', [
        ['D', 'Boğaz’ın lojistik ve deniz ekonomisi merkezi'], ['T', 'Yerel ürünleri markalaşmış bir tarım ili'], ['U', 'Mezunlarını tutabilen bir üniversite kenti'], ['M', 'Ziyaretçisi daha uzun kalan bir miras ve ada ili']]],
      ['Hangi haber seni en çok sevindirir?', [
        ['D', 'Limana yeni bir hizmet zinciri kuruldu'], ['T', 'Yerel zeytinyağı ihracata açıldı'], ['U', 'ÇOMÜ mezunları kendi şirketlerini burada kurdu'], ['M', 'Turizm sezonu bahardan sonbahara yayıldı']]],
      ['Seni en çok ne endişelendirir?', [
        ['D', 'Boğaz’dan geçen tehlikeli yük'], ['T', 'Ürünün değerinin şehir dışında kalması'], ['U', 'Gençlerin mezun olup gitmesi'], ['M', 'Adalarda yazın suyun ve hizmetlerin yetmemesi']]]
    ],
    sonuclar: {
      D: ['Boğaz’ın insanı', 'Senin Çanakkale’n Boğaz’la başlıyor: gemiler, liman, lojistik. Kitap bu varlığı tek başına bir avantaj olarak değil, yerel değere dönüşmesi gereken bir potansiyel olarak okur. Senin için öne çıkan seçenekler: Boğaz, liman ve üretimi bağlayan lojistik değer zinciri fizibilitesi (21) ve mavi ekonomi ile denizcilik hizmetleri analizi (22). Kitabın sorusu şu: Ekonomik hareket kentte ne kadar üretim, beceri ve tedarik bağlantısı bırakıyor?', 'Bölüm 15 · Yerel değer ve ekonomik dönüşüm'],
      T: ['Toprağın insanı', 'Senin Çanakkale’n zeytinlikler, köyler ve yerel ürünler. Kitap Geyikli ve Bayramiç zeytinyağları gibi tescilli ürünlerin yerel değer zincirinde zaten önemli bir yeri olduğunu yazar. Kitaba göre zeytinin dökme olarak satılması ile yağ, dolum, ambalaj ve marka aşamalarının Çanakkale’de gerçekleşmesi aynı ekonomik sonucu yaratmaz. Senin için öne çıkan seçenek: coğrafi işaretli zeytinyağlarında değer zinciri ve yan ürünlerde katma değer programı (19).', 'Bölüm 5 · Üretim ve yerel değer'],
      U: ['Bilginin insanı', 'Senin Çanakkale’n bir üniversite kenti. Kitap ÇOMÜ’nün geleceğini yalnız öğrenci sayısıyla tanımlamaz. Asıl soru, yetiştirdiği insan kaynağının ne kadarının Çanakkale ile bağını sürdürdüğü ve kentte iş ya da girişim fırsatı bulup bulamadığıdır. Senin için öne çıkan seçenekler: ÇOMÜ mezun izleme ve yerel yetenek tutunma programı (8) ile ÇOMÜ, sanayi ve kamu arasında uygulamalı yenilik platformu (9).', 'Bölüm 7 · Bilgi ve bellek'],
      M: ['Mirasın ve adaların insanı', 'Senin Çanakkale’n Troya, tarihî alanlar, Bozcaada ve Gökçeada. Kitaba göre turizmde asıl soru yalnızca kaç kişinin geldiği değil, ziyaretçinin ne kadar kaldığı, harcamasının yerel ekonomiye nasıl yayıldığı ve adalarda yarattığı dönemsel hizmet yükünün nasıl karşılandığıdır. Senin için öne çıkan seçenekler: destinasyon yönetimi ve konaklama süresi stratejisi (17) ile adalar için mevsimsel hizmet kapasitesi planı (18).', 'Bölüm 14.3 · Kapasiteden yerel değere']
    }
  };

  // 5 — Bilgi testi: kitabın okuma uyarıları ------------------------------
  T['rakam-tuzagi'] = {
    bilgi: true,
    sorular: [
      ['Çanakkale’de 2025’te hanelerin %26,8’i tek kişilik. Bu ne demek?', [
        [1, 'Her 100 haneden yaklaşık 27’sinde tek bir kişi yaşıyor'], [0, 'Nüfusun %26,8’i tek başına yaşıyor'],
        [0, 'Her 4 kişiden biri yalnız'], [0, 'Evlerin %26,8’i boş duruyor']],
        'Kitap bu tuzağı açıkça yazar: %26,8 oranı, nüfusun %26,8’inin tek başına yaşadığı anlamına gelmez. Gösterge, toplam hane sayısı içinde yalnızca bir kişinin yaşadığı hanelerin payıdır.'],
      ['2025’te Çanakkale’deki kütüphanelerde 294.124 okuyucu kaydı var. Bu ne demek?', [
        [1, 'Yıl içinde kayda geçen okuyucu ya da kullanım hareketi sayısı'], [0, 'Kütüphaneye giden farklı kişi sayısı'],
        [0, 'Kütüphanelerdeki kitap sayısı'], [0, 'Kütüphane üyesi sayısı']],
        'Kitaba göre bu sayı 294.124 farklı kişiyi göstermez. Aynı kişinin birden fazla kullanımı toplamın içindedir. Üye sayısı ayrıca 58.882’dir.'],
      ['ÇOMÜ’nün öğrenci sayısı 2023’te 48.071. Bundan hangisi çıkar?', [
        [1, 'Üniversitenin yükseköğretim ölçeği'], [0, 'Çanakkale’de yaşayan 48 bin genç olduğu'],
        [0, 'Mezunların ne kadarının kentte kaldığı'], [0, 'İl nüfusunun eğitim düzeyi']],
        'Kitap bu sayının ÇOMÜ’ye kayıtlı öğrenci büyüklüğünü gösterdiğini, Çanakkale’nin yerleşik nüfusunun bir parçası olarak doğrudan yorumlanmaması gerektiğini vurgular. Mezunların kentte kalıp kalmadığı ise bugün bilinmiyor.'],
      ['Çanakkale SEGE-2025’te 81 il içinde 15. sırada. Bu ne demek?', [
        [1, 'Çok sayıda ekonomik ve sosyal göstergeye göre görece gelişmiş illerden biri'], [0, 'Su, konut ve bakım kapasitesinin yeterli olduğu'],
        [0, 'Çanakkale’nin her alanda ilk 15’te olduğu'], [0, 'Bütün ilçelerin aynı gelişmişlik düzeyinde olduğu']],
        'Kitaba göre SEGE sırası bir “genel başarı puanı” değildir. Üst sıralarda bulunmak su güvenliği, konut erişilebilirliği veya bakım kapasitesinin yeterli olduğu anlamına gelmez. İlçeler de farklı kademelerdedir.'],
      ['2025’te Çanakkale feribot hatlarında 5.778.000 yolcu taşındı. Bu ne demek?', [
        [1, 'Toplam yolculuk sayısı. Aynı kişi her geçişinde yeniden sayılır'], [0, '5,8 milyon farklı kişi Boğaz’ı geçti'],
        [0, 'Boğaz’dan 5,8 milyon gemi geçti'], [0, 'Çanakkale’ye 5,8 milyon turist geldi']],
        'Kitaba göre feribot verileri hizmetteki toplam kullanım hareketini gösterir. Aynı kişinin ya da aracın birden fazla yolculuğu ayrı kaydedilir. Transit gemi trafiği ise bambaşka bir göstergedir.'],
      ['Çanakkale’de yaşayanların yaklaşık %40’ı il dışında doğmuş. Bu ne demek?', [
        [1, 'Geçmiş yıllardaki yer değiştirmelerin bugünkü nüfusta bıraktığı birikim'], [0, 'Nüfusun %40’ı 2025’te başka ilden geldi'],
        [0, 'Her yıl nüfusun %40’ı yenileniyor'], [0, 'Gelenlerin çoğu öğrenci']],
        'Kitap göçü dört ayrı ölçüyle okur. Doğum yeri bir stoktur. 2025’te gerçekleşen göçü değil, geçmişteki taşınmaların bugünkü nüfustaki izini gösterir. 2025’in net göçü ayrı bir göstergedir.']
    ]
  };

  // ================= MOTOR =================
  var slug = document.body.dataset.slug, t = T[slug], kok = $('#uygulama');
  if (!t || !kok) return;
  var o = ST.bul(slug), sec = [], dogru = 0;
  var sorular = t.sorular.map(function (q) { return [q[0], ST.karistir(q[1]), q[2]]; });

  function ilerleme(i) { var h = '<div class="ilerleme">'; for (var k = 0; k < sorular.length; k++) h += '<i' + (k <= i ? ' class="on"' : '') + '></i>'; return h + '</div>'; }
  function ciz(i) {
    if (i >= sorular.length) return bitir();
    var q = sorular[i];
    kok.innerHTML = '<div class="kart">' + ilerleme(i) + '<p class="adim">Soru ' + (i + 1) + ' / ' + sorular.length + '</p><p class="soru">' + esc(q[0]) + '</p><div class="secenekler">' +
      q[1].map(function (s, j) { return '<button class="secenek" data-j="' + j + '">' + esc(s[1]) + '</button>'; }).join('') + '</div><div id="aciklama"></div></div>';
    kok.querySelectorAll('.secenek').forEach(function (b) {
      b.onclick = function () {
        var s = q[1][+b.dataset.j];
        if (!t.bilgi) { sec.push(s[0]); ciz(i + 1); ustGit(); return; }
        if (s[0]) dogru++;
        kok.querySelectorAll('.secenek').forEach(function (x, k) { x.disabled = true; if (q[1][k][0]) x.classList.add('dogru'); });
        if (!s[0]) b.classList.add('yanlis');
        $('#aciklama').innerHTML = '<p style="margin-top:14px"><b class="' + (s[0] ? 'ok' : 'uyari') + '">' + (s[0] ? 'Doğru.' : 'Tuzağa düştün.') + '</b> ' + esc(q[2]) + '</p><div class="dugmeler"><button class="btn" id="ileri">' + (i < sorular.length - 1 ? 'Sonraki' : 'Sonucu gör') + '</button></div>';
        $('#ileri').onclick = function () { ciz(i + 1); ustGit(); };
      };
    });
  }
  function bitir() {
    if (t.bilgi) return bilgiSonuc(dogru, true);
    var say = {}, en = null;
    sec.forEach(function (k, i) { say[k] = (say[k] || 0) + 1 + (i === sec.length - 1 ? 0.1 : 0); });
    Object.keys(say).forEach(function (k) { if (!en || say[k] > say[en]) en = k; });
    ST.kaydet(slug, t.sonuclar[en][0]);
    sonucGoster(en, true, sec);
  }
  function unvan(n) { return n >= 6 ? 'Pusula okuru' : n >= 4 ? 'Dikkatli okur' : n >= 2 ? 'Tuzağa yakın' : 'Rakamlara temkinle yaklaş'; }
  function bilgiSonuc(n, kendi) {
    var u = unvan(n);
    if (kendi) ST.kaydet(slug, n + '/6');
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">' + (kendi ? 'Sonucun' : 'Arkadaşının sonucu') + '</p><div class="puan">' + n + ' <span class="kucuk">/ 6</span></div><h2>' + u + '</h2>' +
      '<p>Kitabın yöntem ilkesi şu: Bir göstergenin ne ölçtüğü ile neyi ölçmediği birlikte okunmalı. Aynı rakam hangi referansa, hangi yıla ve hangi kapsama göre okunduğunda farklı bir anlam kazanır.</p>' +
      '<p class="kitapta">Kitaptan: “Çanakkale nerede?” sorusunun tek bir cevabı yoktur.</p><div id="sonucPaylas"></div>' + dugmeler(kendi) + '</div>';
    if (kendi) ST.paylas($('#sonucPaylas'), { url: ST.url(slug) + '?p=' + n, mesaj: 'Çanakkale’nin Pusulası’nın rakam tuzağı testinde 6 sorudan ' + n + ' doğru yaptım. Sen kaç tuzağa düşersin?',
      hikaye: { ust: o.ad, etiket: 'Doğru cevap', baslik: n + ' / 6', ek: u, alt: 'Sen kaç tuzağa düşersin?' } });
    sonrasi();
  }
  function sonucGoster(k, kendi, secimler) {
    var s = t.sonuclar[k]; if (!s) return ciz(0);
    var dag = '';
    if (t.dagilim && secimler) {
      var c = {}; secimler.forEach(function (x) { c[x] = (c[x] || 0) + 1; });
      dag = '<div class="dagilim">' + Object.keys(t.dagilim).map(function (x) { var n = c[x] || 0; return '<div class="cubuk' + (x === k ? ' sen' : '') + '"><span>' + esc(t.dagilim[x]) + '</span><span class="yol"><i style="width:' + (n / secimler.length * 100) + '%"></i></span><b>' + n + ' alan</b></div>'; }).join('') + '</div>';
    }
    kok.innerHTML = '<div class="kart sonuc"><p class="adim">' + (kendi ? 'Sonucun' : 'Arkadaşının sonucu') + '</p><h2>' + esc(s[0]) + '</h2>' + dag + '<p>' + esc(s[1]) + '</p>' +
      (t.not ? '<p class="kucuk">' + esc(t.not) + '</p>' : '') + '<p class="kitapta">Kitapta: ' + esc(s[2]) + '</p><div id="sonucPaylas"></div>' + dugmeler(kendi) + '</div>';
    if (kendi) ST.paylas($('#sonucPaylas'), { url: ST.url(slug) + '?s=' + k, mesaj: 'Çanakkale’nin Pusulası testinde “' + s[0] + '” çıktım. Sen?',
      hikaye: { ust: o.ad, baslik: s[0], alt: 'Seninki ne?' } });
    sonrasi();
  }
  function dugmeler(kendi) {
    return '<div class="dugmeler">' + (kendi ? '<button class="btn ghost" id="yeniden">Testi yeniden çöz</button>' : '<button class="btn" id="yeniden">Sen de çöz</button>') +
      '<a class="btn terra" href="' + ST.KITAP + '" target="_blank" rel="noopener">Kitabı Kitapyurdu’ndan al</a></div>';
  }
  function sonrasi() {
    $('#yeniden').onclick = function () { sec = []; dogru = 0; history.replaceState(null, '', location.pathname); ciz(0); ustGit(); };
    var dg = $('#diger'); if (dg) dg.innerHTML = ST.digerleri(slug);
  }
  function ustGit() { var u = $('#uygulama'); if (u && u.getBoundingClientRect().top < 0) u.scrollIntoView({ behavior: 'smooth' }); }

  var qs = new URLSearchParams(location.search);
  if (t.bilgi && qs.get('p') && /^[0-6]$/.test(qs.get('p'))) bilgiSonuc(+qs.get('p'), false);
  else if (qs.get('s') && t.sonuclar && t.sonuclar[qs.get('s')]) sonucGoster(qs.get('s'), false);
  else ciz(0);
})();
