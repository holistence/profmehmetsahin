"use strict";
// --- saf fonksiyonlar ---
function tablo(V, yi) {
  // Her il icin: kisi basi vergi/harcama, ulke ortalamasina gore vergisine oranla aldigi harcama.
  const t = Object.entries(V.d).map(([il, s]) => ({ il, n: s[yi][0], v: s[yi][1] * 1e6, h: s[yi][2] * 1e6}));
  const TV = t.reduce((a, k) => a + k.v, 0), TH = t.reduce((a, k) => a + k.h, 0);
  for (const k of t) { k.vkb = k.v / k.n; k.hkb = k.h / k.n; k.alim = (k.h / k.v) / (TH / TV); }
  sirala(t, "vkb", "sV"); sirala(t, "hkb", "sH"); sirala(t, "alim", "sA");
  return t;
}
const kat = (x) => sayi(x, x < 10 ? (x < 1 ? 2 : 1) : 0);
// --- ekran ---
const iller = Object.keys(VERI.d).sort(trSira.compare);
let sonMetin = "";
function ciz() {
  const il = $("il").value, yi = VERI.yillar.indexOf(Number($("yil").value)), yil = VERI.yillar[yi], kAd = $("kiyas").value;
  const t = tablo(VERI, yi), k = t.find((x) => x.il === il), c = kAd ? t.find((x) => x.il === kAd) : null, n = t.length;
  $("etiket").textContent = il + ", " + yil;
  const cumle = il + " " + yil + " yılında kişi başına " + tl(k.vkb) + " vergi verdi, " + tl(k.hkb) + " merkezi harcama aldı.";
  $("hukum").textContent = cumle;
  $("g1").textContent = tl(k.vkb); $("s1").textContent = n + " il içinde " + k.sV + ". sırada";
  $("g2").textContent = tl(k.hkb); $("s2").textContent = n + " il içinde " + k.sH + ". sırada";
  $("g3").textContent = kat(k.alim) + " kat"; $("s3").textContent = n + " il içinde " + k.sA + ". sırada";
  const o1 = k.alim >= 1 ? "Vergisine oranla Türkiye ortalamasından fazla harcama alıyor." : "Vergisine oranla Türkiye ortalamasından az harcama alıyor.";
  $("okuma").textContent = o1 + " Verginin tahsil edildiği il, vergiyi ödeyenin yaşadığı il olmayabilir; aşağıdaki nota bak.";
  const s = [...t].sort((a, b) => a.alim - b.alim), lo = Math.log(s[0].alim), hi = Math.log(s[s.length - 1].alim);
  const serit = $("serit"); serit.replaceChildren();
  for (const x of s) { const b = document.createElement("i"); b.style.height = (8 + 92 * (Math.log(x.alim) - lo) / (hi - lo)) + "%"; b.title = x.il + ": " + kat(x.alim) + " kat"; if (x.il === il) b.className = "sel"; else if (c && x.il === c.il) b.className = "cmp"; serit.append(b); }
  $("l1").textContent = il; $("l2").hidden = !c; if (c) $("l2").textContent = c.il;
  if (c) {
    $("kiyas-baslik").textContent = il + " ve " + c.il + ", " + yil;
    const sat = (a, x, y) => "<tr><td>" + a + "</td><td>" + x + "</td><td>" + y + "</td></tr>";
    $("kiyas-tablo").innerHTML = "<thead><tr><th></th><th>" + il + "</th><th>" + c.il + "</th></tr></thead><tbody>" +
      sat("Kişi başına vergi", tl(k.vkb), tl(c.vkb)) + sat("Kişi başına harcama", tl(k.hkb), tl(c.hkb)) +
      sat("Vergisine oranla harcama", kat(k.alim) + " kat", kat(c.alim) + " kat") +
      sat("Nüfus", sayi(k.n), sayi(c.n)) + "</tbody>";
  }
  $("kiyas-kart").hidden = !c;
  const seri = VERI.yillar.map((_, i) => tablo(VERI, i).find((x) => x.il === il));
  cizgi($("seyir"), VERI.yillar, [{ renk: "var(--b)", d: seri.map((x) => x.alim) }], { ref: 1, bicim: (v) => sayi(v, 1) });
  sonMetin = cumle + " Vergisine oranla aldığı harcama Türkiye ortalamasının " + kat(k.alim) + " katı; " + n + " il içinde " + k.sA + ". sırada.";
  $("kopya").textContent = "";
}
doldur($("il"), iller); doldur($("yil"), [...VERI.yillar].reverse()); doldur($("kiyas"), iller, "Seçilmedi");
$("il").value = "Çanakkale";
for (const id of ["il", "yil", "kiyas"]) $(id).addEventListener("change", ciz);
kopyaBagla($("kopyala"), $("kopya"), () => sonMetin);
ciz();
