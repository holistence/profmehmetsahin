# Çanakkale Belediyesi 2014–2024 bütçe serisi → canakkale/belediye.js (window.CKLB)
# Girdi: A.csv (Sayıştay, çift okuma), ../tufe_yillik.csv, ../../../canakkale/veri.js (Merkez ilçe nüfusu)
import csv, json, os
K = os.path.dirname(os.path.abspath(__file__)); D = os.path.abspath(os.path.join(K, '..', '..', '..'))
tufe = {int(r['yil']): float(r['tufe_ort_2003_100']) for r in csv.DictReader(open(os.path.join(K, '..', 'tufe_yillik.csv')))}
s = open(os.path.join(D, 'canakkale', 'veri.js'), encoding='utf-8').read(); V = json.loads(s[s.index('=') + 1:].rstrip().rstrip(';'))
M = [o for o in V['ilceler'] if o['ad'] == 'Merkez'][0]; nuf = dict(zip(V['yillar'], M['nufus']))
rows = sorted([r for r in csv.DictReader(open(os.path.join(K, 'A.csv'), encoding='utf-8')) if r['belediye'].startswith('Çanakkale')], key=lambda r: int(r['yil']))
out = {'yillar': [], 'gelir': [], 'gider': [], 'tahmin': [], 'nufus': [], 'carpan': []}
for r in rows:
    y = int(r['yil']); out['yillar'].append(y)
    out['gelir'].append(float(r['net_gelir'])); out['gider'].append(float(r['gider'])); out['tahmin'].append(float(r['gelir_tahmini']))
    out['nufus'].append(nuf[y]); out['carpan'].append(round(tufe[2024] / tufe[y], 4))
yol = os.path.join(D, 'canakkale', 'belediye.js')
open(yol, 'w', encoding='utf-8').write('/* otomatik: _kaynak/canakkale/belediye/isle.py — Sayıştay düzenlilik denetim raporları; TÜFE 2003=100 yıllık ort.; 2024 fiyatları */\nwindow.CKLB=' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
for i, y in enumerate(out['yillar']):
    print(y, round(out['gelir'][i] * out['carpan'][i] / out['nufus'][i]), round(out['gider'][i] * out['carpan'][i] / out['nufus'][i]))
