# -*- coding: utf-8 -*-
"""Çanakkale'nin 12 ilçesi — sayfa verisini üretir: canakkale/veri.js
Girdi: ilce_seri.csv (nüfus 2007–2025, yaş 2020, medeni durum 2020, medyan yaş 2021), ilce_hareket.csv (2025 evlenme, boşanma, doğum), ilceler.json (OSM sınırları).
Çalıştır: python3 _kaynak/canakkale/isle.py (depo kökünden)"""
import os, csv, json, collections
KOK = os.path.dirname(os.path.abspath(__file__)); DEPO = os.path.dirname(os.path.dirname(KOK))
D = collections.defaultdict(dict)
for r in csv.DictReader(open(os.path.join(KOK, 'ilce_seri.csv'), encoding='utf-8')):
    try: D[(r['ilce'], r['degisken'])][int(r['yil'])] = float(r['deger'])
    except ValueError: pass
HR = {}
for r in csv.DictReader(open(os.path.join(KOK, 'ilce_hareket.csv'), encoding='utf-8')):
    HR[(r['ilce'], r['degisken'], int(r['yil']))] = float(r['deger'])
GEO = json.load(open(os.path.join(KOK, 'ilceler.json'), encoding='utf-8'))
YIL = list(range(2007, 2026))
ILCE = [g['ilce'] for g in GEO['ilceler']]
IL = {y: sum(D[(i, 'nufus')][y] for i in ILCE) for y in YIL}
ILE = {y: sum(D[(i, 'erkek')][y] for i in ILCE) for y in YIL}
ILK = {y: sum(D[(i, 'kadin')][y] for i in ILCE) for y in YIL}
def orta(i, y): return (D[(i, 'nufus')][y] + D[(i, 'nufus')][y - 1]) / 2
out = []
for g in GEO['ilceler']:
    i = g['ilce']; n = D[(i, 'nufus')]
    o = {'ad': i, 'd': g['d'], 'cx': round(g['cx'], 1), 'cy': round(g['cy'], 1),
         'nufus': [int(n[y]) for y in YIL],
         'endeks': [round(n[y] / n[2007] * 100, 1) for y in YIL],
         'pay': [round(n[y] / IL[y] * 100, 2) for y in YIL],
         'cins': [round(D[(i, 'erkek')][y] / D[(i, 'kadin')][y] * 100, 1) for y in YIL],
         'yasli': round(D[(i, 'yas_65p')][2020] / n[2020] * 100, 1),
         'medyan': D[(i, 'medyan_yas')][2021],
         'bosEvli': round(D[(i, 'md_bosandi')][2020] / D[(i, 'md_evli')][2020] * 100, 1),
         'dogumHiz': round(HR[(i, 'dogum', 2025)] / orta(i, 2025) * 1000, 1),
         'evlenmeHiz': round(HR[(i, 'evlenme', 2025)] / orta(i, 2025) * 1000, 1),
         'bosOran': round(HR[(i, 'bosanma', 2025)] / HR[(i, 'evlenme', 2025)] * 100),
         'nDogum': int(HR[(i, 'dogum', 2025)]), 'nEvlenme': int(HR[(i, 'evlenme', 2025)]), 'nBosanma': int(HR[(i, 'bosanma', 2025)])}
    out.append(o)
def ilT(k, y=None): pass
tr = {'nufus': [int(IL[y]) for y in YIL], 'endeks': [round(IL[y] / IL[2007] * 100, 1) for y in YIL], 'pay': [100.0 for _ in YIL],
      'cins': [round(ILE[y] / ILK[y] * 100, 1) for y in YIL],
      'yasli': round(sum(D[(i, 'yas_65p')][2020] for i in ILCE) / IL[2020] * 100, 1),
      'bosEvli': round(sum(D[(i, 'md_bosandi')][2020] for i in ILCE) / sum(D[(i, 'md_evli')][2020] for i in ILCE) * 100, 1),
      'dogumHiz': round(sum(HR[(i, 'dogum', 2025)] for i in ILCE) / sum(orta(i, 2025) for i in ILCE) * 1000, 1),
      'evlenmeHiz': round(3424 / sum(orta(i, 2025) for i in ILCE) * 1000, 1),
      'bosOran': round(1524 / 3424 * 100), 'medyan': None}
H = {'viewBox': GEO['viewBox'], 'yillar': YIL, 'il': tr, 'ilceler': out}
yol = os.path.join(DEPO, 'canakkale', 'veri.js'); os.makedirs(os.path.dirname(yol), exist_ok=True)
open(yol, 'w', encoding='utf-8').write('/* otomatik: _kaynak/canakkale/isle.py — kaynaklar: _kaynak/canakkale/KAYNAKLAR_*.md */\nwindow.CKL=' + json.dumps(H, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('yazıldı', os.path.getsize(yol))
print('il pay Merkez', out[[o['ad'] for o in out].index('Merkez')]['pay'][0], '→', out[[o['ad'] for o in out].index('Merkez')]['pay'][-1])
print('il', tr)
