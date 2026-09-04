"""Pipeline photo : recadrage a point focal, etalonnage unifie, grain, export."""
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import os, random, math

SRC = "src-photos"; OUT = "photos"
os.makedirs(OUT, exist_ok=True)

INK   = (0x0C, 0x0D, 0x0F)   # noir neutre profond, jamais #000
PAPER = (0xEC, 0xEA, 0xE6)   # creme neutre

# nom_sortie : (fichier, ratio l/h, focale x, focale y, zoom)
PLAN = {
  # le vehicule : verite de la marque
  "hero-combi":   ("t1_1.jpg", 2.0,   0.50, 0.52, 1.02),
  "hero-2":       ("t1_2.jpg", 2.0,   0.47, 0.60, 1.05),
  "hero-3":       ("t1_8.jpg", 2.0,   0.46, 0.56, 1.18),
  "veh-bar":      ("t1_8.jpg", 4/5,   0.42, 0.56, 1.02),
  "veh-vide":     ("t1_3.jpg", 4/5,   0.52, 0.55, 1.38),
  # le bar de nuit : c'est d'ici que vient la chaleur
  "bar-counter":  ("n_bar_counter.jpg", 3/2, 0.50, 0.50, 1.04),
  "bar-pour":     ("n_bar_pour.jpg",    4/5, 0.52, 0.50, 1.06),
  "bar-spritz":   ("n_bar_spritz.jpg",  4/5, 0.50, 0.48, 1.04),
  "bar-glass":    ("n_bar_glass.jpg",   1/1, 0.50, 0.52, 1.06),
  "bar-mojito":   ("n_bar_mojito.jpg",  1/1, 0.48, 0.52, 1.06),
  "bar-room":     ("n_bar_room.jpg",    3/2, 0.50, 0.50, 1.04),
  # mobilier, animation, ambiance
  "mob-room":     ("n_mob_room.jpg",    3/2, 0.50, 0.52, 1.04),
  "mob-table":    ("u_1544148103-0773bf10d330.jpg", 3/2, 0.50, 0.55, 1.05),
  "anim-prep":    ("n_anim_prep.jpg",   4/5, 0.52, 0.50, 1.04),
  "event-lights": ("n_event_lights.jpg", 16/9, 0.50, 0.50, 1.05),
  "temoin-table": ("n_temoin_table.jpg", 1/1, 0.52, 0.50, 1.06),
  "cta-couchant": ("u_1436076863939-06870fe779c2.jpg", 16/9, 0.50, 0.50, 1.05),
}

def focal_crop(im, ratio, fx, fy, zoom):
    w, h = im.size
    cw, ch = (h*ratio, h) if w/h > ratio else (w, w/ratio)
    cw, ch = cw/zoom, ch/zoom
    cx, cy = w*fx, h*fy
    l = max(0, min(w-cw, cx-cw/2)); t = max(0, min(h-ch, cy-ch/2))
    return im.crop((int(l), int(t), int(l+cw), int(t+ch)))

def duotone_blend(im, amount):
    """Melange vers un duoton ink->paper, dose faible : unifie sans tuer la photo."""
    g = ImageOps.grayscale(im)
    duo = ImageOps.colorize(g, INK, PAPER)
    return Image.blend(im, duo, amount)

def grain(im, strength):
    w, h = im.size
    n = Image.effect_noise((w, h), strength).convert("L")
    n = n.filter(ImageFilter.GaussianBlur(0.4))
    return Image.blend(im, Image.merge("RGB", (n, n, n)), 0.055)

def vignette(im, power):
    w, h = im.size
    m = Image.new("L", (w, h), 0)
    px = m.load()
    cx, cy = w/2, h/2; mx = math.hypot(cx, cy)
    step = max(1, min(w, h)//220)
    for y in range(0, h, step):
        for x in range(0, w, step):
            d = math.hypot(x-cx, y-cy)/mx
            v = int(255*(1-power*d**2.4))
            for yy in range(y, min(y+step, h)):
                for xx in range(x, min(x+step, w)):
                    px[xx, yy] = max(0, v)
    m = m.filter(ImageFilter.GaussianBlur(step*2))
    dark = Image.new("RGB", (w, h), INK)
    return Image.composite(im, dark, m)

def process(src, ratio, fx, fy, zoom, width, duo=0.22, sat=0.74):
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    im = focal_crop(im, ratio, fx, fy, zoom)
    im = im.resize((width, int(width/ratio)), Image.LANCZOS)
    im = ImageEnhance.Color(im).enhance(sat)       # desature
    im = duotone_blend(im, duo)                    # unifie les origines
    im = ImageEnhance.Contrast(im).enhance(1.12)
    im = ImageEnhance.Brightness(im).enhance(0.98)
    im = vignette(im, 0.22)
    im = grain(im, 26)
    return im

# dose de duoton par image : le magenta des neons doit ceder davantage
DUO = {"bar-counter":0.34, "bar-room":0.30}   # neons magenta : les ramener dans la charte
SAT = {"bar-counter":0.62, "bar-room":0.66}

if __name__ == "__main__":
    for name, (src, ratio, fx, fy, zoom) in PLAN.items():
        if not os.path.exists(os.path.join(SRC, src)):
            print("MANQUE", src); continue
        w = 1700 if ratio >= 1.4 else 1150
        im = process(src, ratio, fx, fy, zoom, w, DUO.get(name, 0.14), SAT.get(name, 0.86))
        p = os.path.join(OUT, name + ".jpg")
        im.save(p, quality=78, optimize=True, progressive=True)
        print(f"{name:16s} {im.size[0]}x{im.size[1]}  {os.path.getsize(p)//1024}KB")
