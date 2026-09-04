"""Re-télécharge les photos sources dans src-photos/.
Le dépôt ne versionne que ce manifeste, pas les fichiers.
"""
import os, subprocess, sys, time

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
    "1572116469696-31de0f17cc34",   # comptoir de bar, ampoules chaudes
    "1543007630-9710e4a00a20",      # salle de bar, nappe d'ampoules
    "1470337458703-46ad1756a187",   # cocktail verse a la passoire
    "1560512823-829485b8bf24",      # spritz, fumee legere
    "1536935338788-846bb9981813",   # cocktail sombre, fruits seches
    "1546171753-97d7676e4602",      # mojito, guirlande floue
    "1485686531765-ba63b07845a7",   # salle chaleureuse, tables bois
    "1551218808-94e220e084d2",      # preparation des garnitures
    "1517457373958-b7bdd4587205",   # guirlandes, evenement exterieur
    "1533777857889-4be7c70b33f7",   # convive attablee
    "1544148103-0773bf10d330",      # table dressee
    "1436076863939-06870fe779c2",   # bouteilles au couchant
]

NAMES = {
    "1572116469696-31de0f17cc34": "n_bar_counter.jpg",
    "1543007630-9710e4a00a20":    "n_bar_room.jpg",
    "1470337458703-46ad1756a187": "n_bar_pour.jpg",
    "1560512823-829485b8bf24":    "n_bar_spritz.jpg",
    "1536935338788-846bb9981813": "n_bar_glass.jpg",
    "1546171753-97d7676e4602":    "n_bar_mojito.jpg",
    "1485686531765-ba63b07845a7": "n_mob_room.jpg",
    "1551218808-94e220e084d2":    "n_anim_prep.jpg",
    "1517457373958-b7bdd4587205": "n_event_lights.jpg",
    "1533777857889-4be7c70b33f7": "n_temoin_table.jpg",
}


def get(url, dest):
    """Wikimedia limite les requetes rapprochees : on retente avant d'abandonner."""
    for attempt in range(3):
        if attempt:
            time.sleep(2 * attempt)
        r = subprocess.run(["curl", "-sS", "-m", "120", "-L", "-A", UA, "-o", dest, "-w", "%{http_code}", url],
                           capture_output=True, text=True)
        if r.stdout.strip() == "200" and os.path.exists(dest) and os.path.getsize(dest) > 20000:
            print("  ok    " + os.path.basename(dest))
            return True
    print("  ECHEC " + os.path.basename(dest))
    return False

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    bad = 0
    for name, path in COMMONS.items():
        if not get("https://upload.wikimedia.org/wikipedia/commons/thumb/" + path, os.path.join(OUT, name)):
            bad += 1
    for pid in UNSPLASH:
        if not get(f"https://images.unsplash.com/photo-{pid}?w=1600&q=80&fm=jpg",
                   os.path.join(OUT, NAMES.get(pid, f"u_{pid}.jpg"))):
            bad += 1
    print("\nSources manquantes :", bad)
    print("Puis : python3 grade.py && python3 build_artifact.py")
    sys.exit(1 if bad else 0)
