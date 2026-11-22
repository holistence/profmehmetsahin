"use strict";
const $ = (id) => document.getElementById(id);
const sayi = (v, h = 0) => v.toLocaleString("tr-TR", { minimumFractionDigits: h, maximumFractionDigits: h });
const tl = (v) => sayi(Math.round(v)) + " TL";
const trSira = new Intl.Collator("tr");
function doldur(sel, liste, bos) {
  sel.replaceChildren();
  if (bos) { const o = document.createElement("option"); o.value = ""; o.textContent = bos; sel.append(o); }
  for (const v of liste) { const o = document.createElement("option"); o.value = v; o.textContent = v; sel.append(o); }
}
function sirala(liste, alan, sira) { [...liste].sort((a, b) => b[alan] - a[alan]).forEach((k, i) => { k[sira] = i + 1; }); }
function ortanca(d) { const s = d.filter((v) => v !== null && Number.isFinite(v)).sort((a, b) => a - b); if (!s.length) return null; const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }
function cizgi(svg, yillar, seriler, ayar = {}) {
  // seriler: [{renk, d:[...], kesik}]; ayar: {ref, dikey, h, bicim}
  const W = ayar.w || 660, H = ayar.h || 220, L = ayar.w ? 46 : 54, R = 14, T = 14, B = 26;
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  const tum = seriler.flatMap((s) => s.d).filter((v) => v !== null && Number.isFinite(v));
  if (ayar.ref !== undefined) tum.push(ayar.ref);
  let lo = Math.min(...tum), hi = Math.max(...tum); if (ayar.sifir) lo = Math.min(0, lo);
  const pay = (hi - lo || 1) * 0.08; lo -= ayar.sifir && lo === 0 ? 0 : pay; hi += pay;
  const px = (i) => L + (i * (W - L - R)) / Math.max(1, yillar.length - 1), py = (v) => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
  const bicim = ayar.bicim || ((v) => sayi(v, Math.abs(hi) < 20 ? 1 : 0));
  let h = "";
  for (const v of [lo + pay, (lo + hi) / 2, hi - pay]) h += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + py(v) + '" y2="' + py(v) + '" stroke="var(--line)" stroke-width="1"/><text x="' + (L - 6) + '" y="' + (py(v) + 4) + '" text-anchor="end">' + bicim(v) + "</text>";
  if (ayar.ref !== undefined) h += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + py(ayar.ref) + '" y2="' + py(ayar.ref) + '" stroke="var(--muted)" stroke-dasharray="4 4"/>';
  if (ayar.dikey !== undefined && yillar.includes(ayar.dikey)) { const x = px(yillar.indexOf(ayar.dikey)); h += '<line x1="' + x + '" x2="' + x + '" y1="' + T + '" y2="' + (H - B) + '" stroke="var(--muted)" stroke-dasharray="2 4"/><text x="' + (x + 4) + '" y="' + (T + 10) + '">' + ayar.dikey + "</text>"; }
  for (const s of seriler) {
    let yol = "", acik = false, son = null;
    s.d.forEach((v, i) => { if (v === null || !Number.isFinite(v)) { acik = false; return; } yol += (acik ? "L" : "M") + px(i).toFixed(1) + " " + py(v).toFixed(1) + " "; acik = true; son = i; });
    h += '<path d="' + yol + '" fill="none" stroke="' + s.renk + '" stroke-width="2.5"' + (s.kesik ? ' stroke-dasharray="6 4"' : "") + "/>";
    if (son !== null && !s.kesik) h += '<circle cx="' + px(son) + '" cy="' + py(s.d[son]) + '" r="4" fill="' + s.renk + '"/>';
  }
  const adim = Math.ceil(yillar.length / (ayar.w ? 4 : 8));
  yillar.forEach((y, i) => { if (i % adim === 0 || i === yillar.length - 1) h += '<text x="' + px(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + y + "</text>"; });
  svg.innerHTML = h;
}
function kopyaBagla(dugme, durum, metinAl) {
  dugme.addEventListener("click", async () => {
    const m = metinAl() + " " + location.href.split("#")[0];
    try { await navigator.clipboard.writeText(m); durum.textContent = "Kopyalandı."; } catch { durum.textContent = m; }
  });
}
