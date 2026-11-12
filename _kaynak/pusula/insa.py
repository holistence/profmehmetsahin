# -*- coding: utf-8 -*-
"""Çanakkale'nin Pusulası: oyun ve test sayfalarını ve OG görsellerini üretir.
Çalıştır: python3 _kaynak/pusula/insa.py  (depo kökünden)"""
import os, json, re, datetime, html
from PIL import Image, ImageDraw, ImageFont

KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HED = os.path.join(KOK, 'pusula')
SURUM = datetime.datetime.now().strftime('%Y%m%d%H%M')
SITE = 'https://profmehmetsahin.com'

# LISTE'yi ortak.js'ten oku (tek kaynak)
js = open(os.path.join(HED, 'ortak.js'), encoding='utf-8').read()
LISTE = []
for m in re.finditer(r"\{ slug: '([^']+)', tur: '([^']+)', ad: '([^']+)', kisa: '([^']+)', sure: '([^']+)' \}", js):
    LISTE.append(dict(slug=m.group(1), tur=m.group(2), ad=m.group(3), kisa=m.group(4), sure=m.group(5)))
assert len(LISTE) == 10, len(LISTE)

FONT = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Figtree:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">')

def e(s): return html.escape(s, quote=True)

def sayfa(slug, baslik, aciklama, govde, betikler, og):
    url = SITE + '/pusula/' + (slug + '/' if slug else '')
    return f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(baslik)} · Çanakkale'nin Pusulası</title>
<meta name="description" content="{e(aciklama)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website"><meta property="og:locale" content="tr_TR">
<meta property="og:title" content="{e(baslik)}"><meta property="og:description" content="{e(aciklama)}">
<meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}/pusula/og/{og}.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
{FONT}
<link rel="stylesheet" href="/pusula/st.css?v={SURUM}">
</head>
<body data-slug="{slug or 'merkez'}">
<div class="wrap">
<header class="top"><a href="/pusula/">← Çanakkale'nin Pusulası</a><nav aria-label="Bölüm"><a href="/pusula/#oyunlar-testler">Oyunlar ve testler</a><a href="/canakkale/">12 ilçe haritası</a><a href="/">Ana sayfa</a></nav></header>
<main>
{govde}
<div class="kitap"><img src="/img/canakkalenin-pusulasi-v2.webp" width="600" height="831" alt="Çanakkale'nin Pusulası kapağı" loading="lazy"><div><b>Çanakkale'nin Pusulası</b><p>Prof. Dr. Özge Uysal Şahin ve Prof. Dr. Mehmet Şahin. 25 yıllık il verisi, üç 2035 senaryosu ve 28 politika seçeneği. Bu testler ve oyunlar kitabın tablolarından doğdu.</p><a class="btn" href="https://www.kitapyurdu.com/kitap/canakkalenin-pusulasi-bugunu-anlamak-degisimi-izlemek-gelecegi-dusunmek/774341.html" target="_blank" rel="noopener">Kitapyurdu’ndan satın al</a></div></div>
</main>
<footer>© 2026 Prof. Dr. Mehmet Şahin · profmehmetsahin.com · Testler ve oyunlar kitabı tanıtmak ve tartışmaya açmak içindir. Cevapların hiçbir sunucuya gönderilmez, yalnızca bu tarayıcıda tutulur.</footer>
</div>
<script src="/pusula/ortak.js?v={SURUM}"></script>
{betikler}
</body>
</html>
'''

def betik(ad): return f'<script src="/pusula/{ad}?v={SURUM}"></script>'

# ---- merkez ----
govde = '''<div class="bas" style="display:grid;grid-template-columns:minmax(0,180px) 1fr;gap:26px;align-items:start">
<img src="/img/canakkalenin-pusulasi-v2.webp" width="600" height="831" alt="Çanakkale'nin Pusulası ön kapak" style="width:100%;height:auto;border-radius:4px;box-shadow:0 16px 36px rgba(19,33,61,.3)">
<div><span class="eyebrow">Veri · Politika · Holistence Publications</span>
<h1>Çanakkale'nin Pusulası</h1>
<p class="lede" style="font-family:var(--f-display);font-style:italic;font-size:1.2rem">Bugünü Anlamak, Değişimi İzlemek, Geleceği Düşünmek</p>
<p style="margin:0 0 10px"><b>Prof. Dr. Özge Uysal Şahin · Prof. Dr. Mehmet Şahin</b></p>
<p class="lede">Demografiden ekonomiye, sudan sağlığa, üniversiteden afete on iki ilçeli bir ili resmî verilerle okuyan bir başvuru kitabı. 2035 için üç senaryo ve yedi stratejik kümede 28 politika seçeneği sunuyor. Daha yaşanabilir bir Çanakkale için.</p>
<div class="dugmeler" style="margin-top:12px"><a class="btn" href="https://www.kitapyurdu.com/kitap/canakkalenin-pusulasi-bugunu-anlamak-degisimi-izlemek-gelecegi-dusunmek/774341.html" target="_blank" rel="noopener">Kitapyurdu’ndan satın al</a><a class="btn ghost" href="#oyunlar-testler">5 test, 5 oyun</a><a class="btn ghost" href="/canakkale/">12 ilçe haritası</a></div>
<p class="kucuk" style="margin-top:10px">e-ISBN 978-625-5626-83-7 · Basılı ISBN 978-625-5626-84-4 · DOI <a href="https://doi.org/10.55094/holistence.603">10.55094/holistence.603</a></p>
</div></div>
<div id="serit"></div>
<h2 class="bolum-b" id="oyunlar-testler">Testler</h2><p class="kucuk">Kitabın senaryolarına, uygulama kapılarına ve okuma uyarılarına kendi bakışınla gir. <span id="sayac"></span></p>
<div class="liste" id="testler"></div>
<h2 class="bolum-b">Oyunlar</h2><p class="kucuk">Kitabın verileri, 28 politika seçeneği ve erken uyarı eşikleriyle oyna.</p>
<div class="liste" id="oyunlar"></div>
<style>@media(max-width:560px){.bas[style]{grid-template-columns:1fr!important}.bas[style] img{max-width:180px}}</style>'''
os.makedirs(HED, exist_ok=True)
open(os.path.join(HED, 'index.html'), 'w', encoding='utf-8').write(
    sayfa('', "Çanakkale'nin Pusulası", "Çanakkale'nin Pusulası: 25 yıllık il verisi, üç 2035 senaryosu, 28 politika seçeneği. Kitaptan 5 test ve 5 oyun.", govde, '', 'merkez'))

# ---- öğeler ----
for o in LISTE:
    g = f'''<div class="bas"><span class="eyebrow">{"Test" if o["tur"] == "test" else "Oyun"} · {e(o["sure"])}</span>
<h1>{e(o["ad"])}</h1>
<p class="lede">{e(o["kisa"])}</p>
<div id="serit"></div></div>
<div id="uygulama"><noscript>Bu sayfa için JavaScript gerekiyor.</noscript></div>
<div id="diger"></div>'''
    if o['tur'] == 'test': b = betik('testler.js')
    elif o['slug'] == 'ilceler': b = f'<script src="/canakkale/veri.js?v={SURUM}"></script>\n' + betik('oyun-ilceler.js')
    else: b = betik('oyun-' + o['slug'] + '.js')
    d = os.path.join(HED, o['slug']); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(sayfa(o['slug'], o['ad'], o['kisa'], g, b, o['slug']))

# ---- OG görselleri 1200×630 ----
GF = '/usr/share/fonts/truetype/google-fonts/'
def F(p, s):
    try: return ImageFont.truetype(p, s)
    except Exception: return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf', s)
SERIF = GF + 'Lora-Variable.ttf'; SANS = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
kapak = Image.open(os.path.join(KOK, 'img', 'canakkalenin-pusulasi-v2.webp')).convert('RGB')
def satir(d, m, f, w):
    k, o, s = m.split(), [], ''
    for x in k:
        t = (s + ' ' + x).strip()
        if d.textlength(t, font=f) <= w: s = t
        else: o.append(s); s = x
    if s: o.append(s)
    return o
def og(ad, ust, alt, dosya):
    im = Image.new('RGB', (1200, 630), (19, 33, 61)); d = ImageDraw.Draw(im)
    for r in range(80, 1400, 80): d.ellipse([980 - r, 420 - r, 980 + r, 420 + r], outline=(40, 56, 88), width=2)
    kh = 470; kw = int(kapak.width * kh / kapak.height); im.paste(kapak.resize((kw, kh), Image.LANCZOS), (1200 - kw - 70, 80))
    d.text((70, 80), ust, font=F(SANS, 26), fill=(212, 174, 98))
    y = 135
    for s in satir(d, ad, F(SERIF, 64), 1200 - kw - 200)[:4]: d.text((70, y), s, font=F(SERIF, 64), fill=(241, 233, 214)); y += 78
    for s in satir(d, alt, F(SANS, 26), 1200 - kw - 200)[:3]: d.text((70, y + 20), s, font=F(SANS, 26), fill=(169, 179, 199)); y += 36
    d.text((70, 560), 'profmehmetsahin.com/pusula · Çanakkale\'nin Pusulası', font=F(SANS, 24), fill=(241, 233, 214))
    os.makedirs(os.path.join(HED, 'og'), exist_ok=True); im.save(os.path.join(HED, 'og', dosya + '.jpg'), quality=86)
og("Çanakkale'nin Pusulası: 5 test, 5 oyun", 'VERİ · POLİTİKA · 2035', 'Üç 2035 senaryosu, 28 politika seçeneği, 12 ilçe. Kitabın tablolarıyla oyna.', 'merkez')
for o in LISTE: og(o['ad'], ('TEST' if o['tur'] == 'test' else 'OYUN') + " · ÇANAKKALE'NİN PUSULASI", o['kisa'], o['slug'])
print('ok', SURUM, len(LISTE))
