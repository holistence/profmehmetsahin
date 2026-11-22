"use strict";
// --- saf fonksiyonlar ---
// Sira: toplam, personel, mal-hizmet, yatirim, cari transfer, sosyal guvenlik, gelir, denge
const KALEM = [["Mal ve hizmet alımı", 2, "var(--c1)"], ["Yatırım", 3, "var(--c2)"], ["Personel", 1, "var(--c3)"], ["Cari transfer", 4, "var(--c4)"], ["Sosyal güvenlik primi", 5, "var(--c5)"]];
function yilTablo(V, yi) {
  const t = Object.entries(V.d).map(([il, s]) => { const r = s[yi]; return { il, top: r[0], gel: r[6], den: r[7], yatPay: (r[3] / r[0]) * 100, r }; });
  sirala(t, "top", "sT"); sirala(t, "gel", "sG"); sirala(t, "den", "sD"); sirala(t, "yatPay", "sY");
  return t;
}
function dagilim(r) {
  const p = KALEM.map(([ad, i, renk]) => ({ ad, renk, pay: (r[i] / r[0]) * 100 }));
  const diger = 100 - p.reduce((a, x) => a + x.pay, 0);
  if (diger > 0.5) p.push({ ad: "Diğer", renk: "var(--c6)", pay: diger });
  return p;
}
const GRUP = { new_metro_2014: "2014'te büyükşehir oldu", old_metro_pre2013: "2014 öncesinden büyükşehir", non_metro_control: "Büyükşehir değil" };
// --- ekran ---
const iller = Object.keys(VERI.d).sort(trSira.compare);
let sonMetin = "";
function ciz() {
  const il = $("il").value, yi = VERI.yillar.indexOf(Number($("yil").value)), yil = VERI.yillar[yi], kAd = $("kiyas").value;
  const t = yilTablo(VERI, yi), k = t.find((x) => x.il === il), c = kAd ? t.find((x) => x.il === kAd) : null, n = t.length;
  const med = ortanca(t.map((x) => x.top));
  $("etiket").textContent = il + ", " + yil; $("grup").textContent = GRUP[VERI.grup[il]] || "";
  const cumle = il + ": yerel yönetimler " + yil + " yılında kişi başına " + tl(k.top) + " harcadı. Ortanca ilde bu tutar " + tl(med) + ".";
  $("hukum").textContent = cumle;
  $("g1").textContent = tl(k.top); $("s1").textContent = n + " il içinde " + k.sT + ". sırada";
  $("g2").textContent = tl(k.gel); $("s2").textContent = n + " il içinde " + k.sG + ". sırada";
  $("g3").textContent = tl(Math.abs(k.den)); $("g3a").textContent = k.den >= 0 ? "kişi başına bütçe fazlası" : "kişi başına bütçe açığı"; $("s3").textContent = "gelir ile harcama arasındaki fark";
  $("g4").textContent = "%" + sayi(k.yatPay, 1); $("s4").textContent = n + " il içinde " + k.sY + ". sırada";
  const d = dagilim(k.r), yigin = $("yigin"), lej = $("yigin-l"); yigin.replaceChildren(); lej.replaceChildren();
  for (const x of d) {
    const b = document.createElement("i"); b.style.width = x.pay + "%"; b.style.background = x.renk; b.title = x.ad + ": %" + sayi(x.pay, 1); yigin.append(b);
    const s = document.createElement("span"); s.style.setProperty("--k", x.renk); s.textContent = x.ad + " %" + sayi(x.pay, 0); lej.append(s);
  }
  if (c) {
    $("kiyas-baslik").textContent = il + " ve " + c.il + ", " + yil;
    const sat = (a, x, y) => "<tr><td>" + a + "</td><td>" + x + "</td><td>" + y + "</td></tr>";
    $("kiyas-tablo").innerHTML = "<thead><tr><th>Kişi başına</th><th>" + il + "</th><th>" + c.il + "</th></tr></thead><tbody>" +
      sat("Toplam harcama", tl(k.top), tl(c.top)) + sat("Gelir", tl(k.gel), tl(c.gel)) +
      KALEM.map(([ad, i]) => sat(ad, tl(k.r[i]), tl(c.r[i]))).join("") + sat("Yatırım payı", "%" + sayi(k.yatPay, 1), "%" + sayi(c.yatPay, 1)) + "</tbody>";
  }
  $("kiyas-kart").hidden = !c;
  const seriler = [{ renk: "var(--muted)", kesik: true, d: VERI.yillar.map((_, i) => ortanca(Object.values(VERI.d).map((s) => s[i][0]))) }];
  if (c) seriler.push({ renk: "var(--a)", d: VERI.d[c.il].map((r) => r[0]) });
  seriler.push({ renk: "var(--b)", d: VERI.d[il].map((r) => r[0]) });
  const yeni = VERI.grup[il] === "new_metro_2014";
  cizgi($("seyir"), VERI.yillar, seriler, { sifir: true, dikey: yeni ? 2014 : undefined });
  $("l1").textContent = il; $("l2").hidden = !c; if (c) $("l2").textContent = c.il;
  const ilk = VERI.d[il][0][0], son = VERI.d[il][VERI.yillar.length - 1][0];
  $("seyir-not").textContent = VERI.yillar[0] + " yılından " + VERI.yillar[VERI.yillar.length - 1] + " yılına kişi başına reel harcama " + sayi(son / ilk, 1) + " katına çıktı." + (yeni ? " Dikey çizgi, ilin büyükşehir olduğu 2014 yılını gösterir." : "");
  sonMetin = cumle + " " + n + " il içinde " + k.sT + ". sırada.";
  $("kopya").textContent = "";
}
doldur($("il"), iller); doldur($("yil"), [...VERI.yillar].reverse()); doldur($("kiyas"), iller, "Seçilmedi");
$("il").value = "Çanakkale";
for (const id of ["il", "yil", "kiyas"]) $(id).addEventListener("change", ciz);
kopyaBagla($("kopyala"), $("kopya"), () => sonMetin);
ciz();
