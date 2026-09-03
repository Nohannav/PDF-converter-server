"""Re-télécharge les photos sources dans src-photos/.
Le dépôt ne versionne que ce manifeste, pas les fichiers.
"""
import os, subprocess, sys

OUT = "src-photos"
UA = "Mozilla/5.0 (compatible; le-combi-build/1.0)"

# Volkswagen T1 — Wikimedia Commons, CC BY 2.0 (voir CREDITS.md)
COMMONS = {
    "t1_1.jpg": "f/fa/1953_Volkswagen_Kombi_T1.jpg/1920px-1953_Volkswagen_Kombi_T1.jpg",
    "t1_2.jpg": "5/50/1964_Volkswagen_T1_Transporter_Kombi_bus_%286105785703%29.jpg/1920px-1964_Volkswagen_T1_Transporter_Kombi_bus_%286105785703%29.jpg",
    "t1_3.jpg": "4/43/1964_Volkswagen_T1_Transporter_Kombi_bus_%286105917315%29.jpg/1920px-1964_Volkswagen_T1_Transporter_Kombi_bus_%286105917315%29.jpg",
    "t1_8.jpg": "4/4a/Volkswagen_Kombi_%2815287229944%29.jpg/1920px-Volkswagen_Kombi_%2815287229944%29.jpg",
}
# Ambiances — Unsplash
UNSPLASH = [
    "1544148103-0773bf10d330", "1514933651103-005eec06c04b",
    "1566417713940-fe7c737a9ef2", "1551024709-8f23befc6f87",
    "1516450360452-9312f5e86fc7", "1519671482749-fd09be7ccebf",
    "1436076863939-06870fe779c2", "1492684223066-81342ee5ff30",
    "1527786356703-4b100091cd2c",
]

def get(url, dest):
    r = subprocess.run(["curl", "-sS", "-m", "120", "-L", "-A", UA, "-o", dest, "-w", "%{http_code}", url],
                       capture_output=True, text=True)
    ok = r.stdout.strip() == "200" and os.path.getsize(dest) > 20000
    print(("  ok   " if ok else "  ECHEC ") + os.path.basename(dest))
    return ok

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    bad = 0
    for name, path in COMMONS.items():
        if not get("https://upload.wikimedia.org/wikipedia/commons/thumb/" + path, os.path.join(OUT, name)):
            bad += 1
    for pid in UNSPLASH:
        if not get(f"https://images.unsplash.com/photo-{pid}?w=1600&q=80&fm=jpg",
                   os.path.join(OUT, f"u_{pid}.jpg")):
            bad += 1
    print("\nSources manquantes :", bad)
    print("Puis : python3 grade.py && python3 build_artifact.py")
    sys.exit(1 if bad else 0)
