import sys, openpyxl, json
src, out = sys.argv[1], sys.argv[2]
wb = openpyxl.load_workbook(src, read_only=True, data_only=True)
d = [r for r in wb["PROVINCIAL_PACKED_DICT"].iter_rows(values_only=True)][1:]
pos = {r[1]: i for i, r in enumerate(d)}
P, adlar = {}, {}
for i in range(1, 10):
    for r in list(wb[f"PROV_PACK_{i:02d}"].iter_rows(values_only=True))[1:]:
        P[(int(r[0]), int(r[2]))] = json.loads(r[3]); adlar[int(r[0])] = r[1]
def al(kod, yil, ad, nd=None):
    row = P.get((kod, yil))
    if row is None: return None
    try: v = float(row[pos[ad]])
    except (TypeError, ValueError): return None
    return round(v, nd) if nd is not None else v
kodlar = sorted(adlar, key=lambda k: adlar[k])

# A) karnesi
tag = list(wb["TAG_PANEL"].iter_rows(values_only=True)); h = tag[0]
ix = {n: h.index(n) for n in ["İl Kodu", "Yıl", "Nüfus", "Vergi Tahsilatı (TL)"]}
T = {(int(r[ix["İl Kodu"]]), int(r[ix["Yıl"]])): r for r in tag[1:] if r[ix["İl Kodu"]] is not None}
yA = list(range(2016, 2025)); A = {"yillar": yA, "d": {}}
for k in kodlar:
    seri = []
    for y in yA:
        r = T[(k, y)]
        top, faiz = al(k, y, "EQ__central_total_nominal_thousand_tl"), al(k, y, "EQ__central_interest_nominal_thousand_tl") or 0
        seri.append([int(r[ix["Nüfus"]]), round(float(r[ix["Vergi Tahsilatı (TL)"]]) / 1e6, 2), round((top - faiz) / 1e3, 2)])
    A["d"][adlar[k]] = seri   # nufus, vergi (milyon TL), faiz disi harcama (milyon TL)

# B) yerel yonetim
yB = list(range(2007, 2026)); B = {"yillar": yB, "d": {}, "grup": {}}
alan = ["total_expenditure", "personnel", "goods_services", "capital_expenditure", "current_transfers", "social_security", "total_revenue", "balance"]
for k in kodlar:
    B["d"][adlar[k]] = [[al(k, y, f"METRO__local_{a}_real2025avg_per_capita_lira", 0) for a in alan] for y in yB]
    B["grup"][adlar[k]] = P[(k, 2024)][pos["METRO__metro_group"]]

# C) yirmi yil
yC = list(range(2000, 2026)); C = {"yillar": yC, "d": {}}
gos = [("ekonomi", "CANON_GDP__real_gdp_chainlinked_index_2009_100", 1), ("gelir", "ECO_KB_GSYH_CHAIN2009", 0), ("nufus", "DEM_NUFUS_TOPLAM", 0),
       ("hekim", "HEA_HEKIM_100K", 0), ("yatak", "HEA_YATAK_10K", 1), ("yasli", "DEM_YASLI_NUFUS_ORANI_65PLUS_PCT", 1),
       ("hane", "DEM_ORT_HANE_BUYUKLUGU", 2), ("elektrik", "ECO_KB_ELEKTRIK_KWH", 0), ("yuksek", "EDU_TERTIARY_EDUCATION_SHARE_PCT", 1), ("otomobil", "MOB_PASSENGER_CARS_PER_1000", 0)]
for k in kodlar:
    C["d"][adlar[k]] = {g: [al(k, y, v, nd) for y in yC] for g, v, nd in gos}

for ad, veri in (("A", A), ("B", B), ("C", C)):
    json.dump(veri, open(f"{out}/veri_{ad}.json", "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(ad, len(veri["d"]), "il", len(json.dumps(veri, ensure_ascii=False)) // 1024, "KB")
bosB = sum(1 for il in B["d"].values() for y in il for v in y if v is None)
print("B bos:", bosB, "| C ornek:", {g: sum(1 for v in C["d"]["Çanakkale"][g] if v is not None) for g, _, _ in gos})
