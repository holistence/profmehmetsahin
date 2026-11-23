"use strict";
// --- saf fonksiyonlar ---
// cins: "t" toplam, "e" erkek, "k" kadin. Oran, o gruptaki hic evlenmemisler icinde ebeveyniyle yasayanlarin payi.
function olc(s, cins) {
  const p = cins === "e" ? s[0] : cins === "k" ? s[1] : s[0] + s[1];
  const y = cins === "e" ? s[2] : cins === "k" ? s[3] : s[2] + s[3];
  return { p, y, o: (100 * y) / p };
}
function tablo(V, cins) {
  const t = Object.entries(V.d).map(([il, s]) => Object.assign({ il }, olc(s, cins)));
  sirala(t, "o", "sira");
  return t;
}
const yuzde = (x) => "%" + sayi(x, 1);
const GRUP = { t: "hiç evlenmemiş kişi", e: "hiç evlenmemiş erkek", k: "hiç evlenmemiş kadın" };
// --- ekran ---
const iller = Object.keys(VERI.d).sort(trSira.compare);
let sonMetin = "";
function ciz() {
  const il = $("il").value, cins = $("cins").value, kAd = $("kiyas").value;
  const t = tablo(VERI, cins), k = t.find((x) => x.il === il), c = kAd ? t.find((x) => x.il === kAd) : null, n = t.length;
  const tr = olc(VERI.tr, cins), s = VERI.d[il], e = olc(s, "e"), ka = olc(s, "k");
  $("etiket").textContent = il + ", " + VERI.yil + ", 25-29 yaş";
  const cumle = il + ": 25-29 yaşındaki " + GRUP[cins] + " sayısı " + sayi(k.p) + ". Anne ve/veya babasıyla yaşayan " + sayi(k.y) + ", yani " + yuzde(k.o) + ".";
  $("hukum").textContent = cumle;
  $("g1").textContent = yuzde(k.o); $("s1").textContent = n + " il içinde " + k.sira + ". sırada (1. = en yüksek)";
  $("g2").textContent = yuzde(tr.o); $("s2").textContent = k.o >= tr.o ? il + " bunun " + sayi(k.o - tr.o, 1) + " puan üstünde" : il + " bunun " + sayi(tr.o - k.o, 1) + " puan altında";
  $("g3").textContent = yuzde(e.o); $("s3").textContent = sayi(e.p) + " kişiden " + sayi(e.y);
  $("g4").textContent = yuzde(ka.o); $("s4").textContent = sayi(ka.p) + " kişiden " + sayi(ka.y);
  $("okuma").textContent = ka.o > e.o ? "Bu ilde hiç evlenmemiş kadınlar, erkeklere göre daha yüksek oranda aile evinde." : "Bu ilde hiç evlenmemiş erkekler, kadınlara göre daha yüksek oranda aile evinde.";
  const sr = [...t].sort((a, b) => a.o - b.o), serit = $("serit"); serit.replaceChildren();
  for (const x of sr) { const b = document.createElement("i"); b.style.height = x.o + "%"; b.title = x.il + ": " + yuzde(x.o); if (x.il === il) b.className = "sel"; else if (c && x.il === c.il) b.className = "cmp"; serit.append(b); }
  $("l1").textContent = il; $("l2").hidden = !c; if (c) $("l2").textContent = c.il;
  $("uc-not").textContent = "En düşük: " + sr[0].il + " (" + yuzde(sr[0].o) + "). En yüksek: " + sr[n - 1].il + " (" + yuzde(sr[n - 1].o) + ").";
  const sat = (x) => "<tr><td>" + x.sira + ".</td><td>" + x.il + "</td><td>" + yuzde(x.o) + "</td><td>" + sayi(x.y) + "</td></tr>";
  const ust = sr.slice(-5).reverse(), alt = sr.slice(0, 5).reverse(), sec = [k].concat(c ? [c] : []).filter((x) => !ust.includes(x) && !alt.includes(x)).sort((a, b) => a.sira - b.sira);
  $("liste").innerHTML = "<thead><tr><th>Sıra</th><th>İl</th><th>Oran</th><th>Kişi</th></tr></thead><tbody>" + ust.map(sat).join("") + sec.map(sat).join("") + alt.map(sat).join("") + "</tbody>";
  sonMetin = cumle + " Türkiye geneli " + yuzde(tr.o) + "; " + il + " " + n + " il içinde " + k.sira + ". sırada.";
  $("kopya").textContent = "";
}
doldur($("il"), iller); doldur($("kiyas"), iller, "Seçilmedi");
$("il").value = "Çanakkale";
for (const id of ["il", "cins", "kiyas"]) $(id).addEventListener("change", ciz);
kopyaBagla($("kopyala"), $("kopya"), () => sonMetin);
ciz();
