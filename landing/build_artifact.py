"""Produit la version autonome : la CSP des artefacts bloque toute image
externe, les photos doivent donc voyager dans le fichier en data URI."""
import base64, os, re, pathlib

src = pathlib.Path("index.html").read_text()
out = pathlib.Path("dist"); out.mkdir(exist_ok=True)

# 1. photos -> data URI
used, total = [], 0
def inline(m):
    global total
    p = pathlib.Path(m.group(1))
    if not p.exists():
        raise SystemExit("photo manquante : " + str(p))
    b = p.read_bytes(); total += len(b); used.append(p.name)
    return 'src="data:image/jpeg;base64,' + base64.b64encode(b).decode() + '"'
doc = re.sub(r'src="(photos/[^"]+)"', inline, src)

# 2. retirer l'enveloppe : l'outil Artifact fournit doctype/html/head/body
head = re.search(r"<head>(.*?)</head>", doc, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", doc, re.S).group(1)
keep = "\n".join(
    m.group(0) for m in re.finditer(
        r"<title>.*?</title>|<link[^>]+fonts\.googleapis[^>]*>|<style>.*?</style>", head, re.S))

pathlib.Path(out / "artifact.html").write_text(keep + "\n" + body)
size = (out / "artifact.html").stat().st_size
print(f"photos integrees : {len(used)}  ({total//1024} Ko bruts)")
print(f"dist/artifact.html : {size//1024} Ko  ({size/16/1024/1024*100:.1f} % du plafond de 16 Mo)")
assert size < 16*1024*1024, "depasse le plafond de l'artefact"
