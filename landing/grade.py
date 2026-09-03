"""Pipeline photo : recadrage a point focal, etalonnage unifie, grain, export."""
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import os, random, math

SRC = "src-photos"; OUT = "photos"
os.makedirs(OUT, exist_ok=True)

INK   = (0x14, 0x12, 0x0F)   # noir chaud
PAPER = (0xEA, 0xE7, 0xDF)   # os refroidi, accorde au fond de page

# nom_sortie : (fichier, ratio l/h, focale x, focale y, zoom)
PLAN = {
  "hero-combi":   ("t1_1.jpg", 2.0,   0.50, 0.52, 1.02),
  "veh-bar":      ("t1_8.jpg", 4/5,   0.42, 0.56, 1.02),
  "veh-vide":     ("t1_3.jpg", 4/5,   0.52, 0.55, 1.38),
  "mob-table":    ("u_1544148103-0773bf10d330.jpg", 3/2, 0.50, 0.55, 1.05),
  "mob-salle":    ("u_1514933651103-005eec06c04b.jpg", 4/5, 0.50, 0.50, 1.15),
  "anim-barman":  ("u_1566417713940-fe7c737a9ef2.jpg", 4/5, 0.55, 0.50, 1.10),
  "anim-verres":  ("u_1551024709-8f23befc6f87.jpg", 3/2, 0.50, 0.55, 1.05),
  "anim-foule":   ("u_1516450360452-9312f5e86fc7.jpg", 16/9, 0.50, 0.55, 1.10),
  "temoin-trinq": ("u_1519671482749-fd09be7ccebf.jpg", 1/1, 0.50, 0.50, 1.10),
  "cta-couchant": ("u_1436076863939-06870fe779c2.jpg", 16/9, 0.50, 0.50, 1.05),
  "gal-confetti": ("u_1492684223066-81342ee5ff30.jpg", 1/1, 0.50, 0.50, 1.10),
  "gal-combi-t2": ("u_1527786356703-4b100091cd2c.jpg", 1/1, 0.50, 0.55, 1.15),
  "hero-2":       ("t1_2.jpg", 2.0,   0.47, 0.60, 1.05),
  "hero-3":       ("t1_8.jpg", 2.0,   0.46, 0.56, 1.18),
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
    im = ImageEnhance.Contrast(im).enhance(1.16)
    im = ImageEnhance.Brightness(im).enhance(1.02)
    im = vignette(im, 0.22)
    im = grain(im, 26)
    return im

# dose de duoton par image : le magenta des neons doit ceder davantage
DUO = {"anim-barman":0.66, "anim-foule":0.46, "gal-confetti":0.42}
SAT = {"anim-barman":0.34, "anim-foule":0.52, "gal-confetti":0.50}

if __name__ == "__main__":
    for name, (src, ratio, fx, fy, zoom) in PLAN.items():
        if not os.path.exists(os.path.join(SRC, src)):
            print("MANQUE", src); continue
        w = 1700 if ratio >= 1.4 else 1150
        im = process(src, ratio, fx, fy, zoom, w, DUO.get(name, 0.22), SAT.get(name, 0.74))
        p = os.path.join(OUT, name + ".jpg")
        im.save(p, quality=78, optimize=True, progressive=True)
        print(f"{name:16s} {im.size[0]}x{im.size[1]}  {os.path.getsize(p)//1024}KB")
