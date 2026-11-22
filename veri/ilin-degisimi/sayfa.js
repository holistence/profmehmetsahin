"use strict";
// --- saf fonksiyonlar ---
// tur: "kat" = oransal degisim, "puan" = fark
const GOS = [
  ["ekonomi", "Ekonominin büyüklüğü (reel)", "endeks", "kat", 0],
  ["gelir", "Kişi başına reel gelir", "TL, 2009 fiyatlarıyla", "kat", 0],
  ["nufus", "Nüfus", "kişi", "kat", 0],
  ["hekim", "Hekim sayısı", "100 bin kişiye", "kat", 0],
  ["yatak", "Hastane yatağı", "10 bin kişiye", "kat", 1],
  ["elektrik", "Kişi başına elektrik tüketimi", "kWh", "kat", 0],
  ["yasli", "65 yaş üstü nüfus payı", "%", "puan", 1],
  ["hane", "Ortalama hane büyüklüğü", "kişi", "puan", 2],
  ["yuksek", "Yükseköğretim mezunu payı", "%", "puan", 1],
  ["otomobil", "Otomobil sayısı", "bin kişiye", "kat", 0]
];
function degisim(seri, yillar, bas) {
  let i0 = -1, i1 = -1;
  for (let i = 0; i < seri.length; i++) { if (seri[i] === null) continue; if (i0 < 0 && yillar[i] >= bas) i0 = i; i1 = i; }
  if (i0 < 0 || i1 <= i0) return null;
  return { y0: yillar[i0], v0: seri[i0], y1: yillar[i1], v1: seri[i1], oran: seri[i1] / seri[i0], fark: seri[i1] - seri[i0], i0, i1 };
}
function anlat(d, tur, birim) {
  if (tur === "puan" && birim === "%") return (d.fark >= 0 ? "+" : "−") + sayi(Math.abs(d.fark), 1) + " puan";
  if (tur === "puan") return sayi(Math.abs(d.fark), 2) + " " + birim + (d.fark >= 0 ? " arttı" : " azaldı");
  if (d.oran >= 2) return sayi(d.oran, 1) + " katına çıktı";
  if (d.oran >= 1) return "yüzde " + sayi((d.oran - 1) * 100) + " arttı";
  return "yüzde " + sayi((1 - d.oran) * 100) + " azaldı";
}
function ortancaDegisim(V, anahtar, bas, tur) {
  const d = Object.values(V.d).map((s) => degisim(s[anahtar], V.yillar, bas)).filter(Boolean);
  if (!d.length) return null;
  const m = ortanca(d.map((x) => (tur === "puan" ? x.fark : x.oran)));
  return tur === "puan" ? { fark: m } : { oran: m };
}
// --- ekran ---
const iller = Object.keys(VERI.d).sort(trSira.compare);
let sonMetin = "";
function ciz() {
  const il = $("il").value, bas = Number($("bas").value), S = VERI.d[il];
  $("etiket").textContent = il + ", " + bas + " yılından bugüne";
  const e = degisim(S.ekonomi, VERI.yillar, bas), em = ortancaDegisim(VERI, "ekonomi", bas, "kat");
  const cumle = il + " ekonomisi " + e.y0 + " yılından " + e.y1 + " yılına reel olarak " + anlat(e, "kat") + ".";
  $("hukum").textContent = cumle;
  $("hukum-not").textContent = "Aynı dönemde 81 ilin ortancası: " + anlat(em, "kat") + ".";
  const kutu = $("kartlar"); kutu.replaceChildren();
  const parcalar = [];
  for (const [k, ad, birim, tur, hane] of GOS) {
    const d = degisim(S[k], VERI.yillar, bas); if (!d) continue;
    const m = ortancaDegisim(VERI, k, bas, tur);
    const kart = document.createElement("section"); kart.className = "mini";
    const h = document.createElement("h3"); h.textContent = ad;
    const deg = document.createElement("div"); deg.className = "deg"; deg.textContent = anlat(d, tur, birim);
    const ara = document.createElement("div"); ara.className = "ara"; ara.textContent = d.y0 + ": " + sayi(d.v0, hane) + "  →  " + d.y1 + ": " + sayi(d.v1, hane) + " (" + birim + ")";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("width", "100%"); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", ad + " seyri");
    const not = document.createElement("div"); not.className = "note"; not.textContent = "81 ilin ortancası: " + (tur === "puan" ? anlat({ fark: m.fark }, "puan", birim) : anlat({ oran: m.oran }, "kat"));
    kart.append(h, deg, ara, svg, not); kutu.append(kart);
    cizgi(svg, VERI.yillar.slice(d.i0, d.i1 + 1), [{ renk: "var(--b)", d: S[k].slice(d.i0, d.i1 + 1) }], { h: 120, w: 340, bicim: (v) => sayi(v, hane > 1 ? 1 : hane) });
    if (["nufus", "hekim", "yasli"].includes(k)) parcalar.push(ad.toLocaleLowerCase("tr") + " " + anlat(d, tur, birim) + " (" + d.y0 + "–" + d.y1 + ")");
  }
  sonMetin = cumle + " " + parcalar.join("; ") + ".";
  $("kopya").textContent = "";
}
doldur($("il"), iller); doldur($("bas"), VERI.yillar.filter((y) => y <= 2020));
$("il").value = "Çanakkale"; $("bas").value = "2005";
for (const id of ["il", "bas"]) $(id).addEventListener("change", ciz);
kopyaBagla($("kopyala"), $("kopya"), () => sonMetin);
ciz();
