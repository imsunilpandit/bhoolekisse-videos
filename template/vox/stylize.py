"""Make art-style variants of cut-out assets (alpha preserved).
usage: python3 stylize.py assets name:style[,style...] ...
styles: ink, puppet, papercut, stained, anime, madhubani, warli, ukiyo, miniature"""
import sys, numpy as np, cv2
from PIL import Image
D = sys.argv[1]
rng = np.random.default_rng(5)

def load(n):
    a = np.array(Image.open(f'{D}/{n}.png').convert('RGBA'))
    return a[..., :3].copy(), a[..., 3].copy()

def save(n, s, rgb, al):
    Image.fromarray(np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), al]), 'RGBA').save(f'{D}/{n}_{s}.png')

def edges(rgb, lo=60, hi=140, th=2):
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    e = cv2.Canny(cv2.GaussianBlur(g, (0, 0), 1.6), lo, hi)
    return cv2.dilate(e, np.ones((th, th), np.uint8)) > 0

def quant(rgb, pal):
    pal = np.array(pal, np.float32)
    f = rgb.reshape(-1, 3).astype(np.float32)
    d = ((f[:, None, :] - pal[None]) ** 2).sum(-1)
    return pal[d.argmin(1)].reshape(rgb.shape)

def lum(rgb):
    return cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2GRAY).astype(np.float32) / 255

def ink(rgb, al):
    g = lum(cv2.bilateralFilter(rgb, 9, 60, 9))
    wash = 1 - (1 - g) ** 1.2
    wash = cv2.GaussianBlur(wash, (0, 0), 2.2)
    e = edges(rgb, 40, 110, 2)
    v = wash * 235 + 10
    v[e] = 25
    bleed = cv2.GaussianBlur((1 - wash) * 255, (0, 0), 6) / 255 * 30
    out = np.dstack([v - bleed * 0.2, v - bleed * 0.25, v - bleed * 0.1]) * np.array([0.98, 0.96, 0.92])
    return out, al

def puppet(rgb, al):
    a2 = cv2.erode(al, np.ones((3, 3), np.uint8))
    out = np.zeros_like(rgb, np.float32) + np.array([28, 16, 10])
    # carved holes: light leaks where the image is bright, like punched leather
    g = lum(rgb); holes = (cv2.GaussianBlur(g, (0, 0), 1.2) > 0.78) & (a2 > 200)
    out[holes] = [235, 150, 60]
    rim = (al > 30) & (a2 < 200)
    out[rim] = [255, 170, 70]
    return out, al

def papercut(rgb, al):
    s = cv2.bilateralFilter(rgb, 9, 80, 9)
    q = quant(s, [[245, 232, 205], [214, 176, 120], [168, 118, 70], [110, 70, 40], [60, 38, 25]])
    # layered paper: each tone band gets a soft inner shadow on its top edge
    g = lum(q)
    sh = cv2.GaussianBlur((g < cv2.GaussianBlur(g, (0, 0), 3) - 0.02).astype(np.float32), (0, 0), 3)
    q = q * (1 - 0.35 * sh[..., None])
    q += rng.normal(0, 3, q.shape)
    return q, al

def stained(rgb, al):
    h, w = al.shape
    sl = cv2.ximgproc.createSuperpixelSLIC(cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB), algorithm=cv2.ximgproc.SLICO, region_size=max(18, w // 28)) if hasattr(cv2, 'ximgproc') else None
    if sl is not None:
        sl.iterate(8); lab = sl.getLabels(); lines = sl.getLabelContourMask(thick_line=True) > 0
    else:
        # fallback: voronoi cells from random seeds
        n = 260; pts = np.c_[rng.integers(0, w, n), rng.integers(0, h, n)]
        yy, xx = np.mgrid[0:h, 0:w]; lab = np.zeros((h, w), int); best = np.full((h, w), 1e18)
        for i, (px, py) in enumerate(pts):
            d = (xx - px) ** 2 + (yy - py) ** 2; m = d < best; best[m] = d[m]; lab[m] = i
        lines = cv2.morphologyEx((cv2.Laplacian(lab.astype(np.float32), cv2.CV_32F) != 0).astype(np.uint8), cv2.MORPH_DILATE, np.ones((3, 3), np.uint8)) > 0
    out = np.zeros_like(rgb, np.float32)
    for l in np.unique(lab):
        m = lab == l
        c = rgb[m].mean(0)
        hsv = cv2.cvtColor(np.uint8([[c]]), cv2.COLOR_RGB2HSV)[0, 0].astype(np.float32)
        hsv[1] = min(255, hsv[1] * 1.9 + 40); hsv[2] = min(255, hsv[2] * 1.15 + 20)
        hsv[0] = (hsv[0] + (l % 5 - 2) * 6) % 180
        out[m] = cv2.cvtColor(np.uint8([[hsv]]), cv2.COLOR_HSV2RGB)[0, 0]
    yy = np.linspace(1.15, 0.85, al.shape[0])[:, None, None]
    out = out * yy
    out[lines | edges(rgb, 80, 180, 2)] = [20, 18, 22]
    return out, al

def anime(rgb, al):
    s = rgb
    for _ in range(3): s = cv2.bilateralFilter(s, 9, 60, 7)
    hsv = cv2.cvtColor(s, cv2.COLOR_RGB2HSV).astype(np.float32)
    hsv[..., 1] = np.clip(hsv[..., 1] * 1.45, 0, 255)
    hsv[..., 2] = np.round(hsv[..., 2] / 48) * 48 + 20
    out = cv2.cvtColor(np.clip(hsv, 0, 255).astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32)
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    e = cv2.adaptiveThreshold(cv2.medianBlur(g, 5), 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 9, 4) == 0
    out[e] = out[e] * 0.25
    return out, al

def madhubani(rgb, al):
    s = cv2.bilateralFilter(rgb, 9, 80, 9)
    lab = cv2.cvtColor(s, cv2.COLOR_RGB2LAB); lab[..., 0] = cv2.createCLAHE(3.0, (8, 8)).apply(lab[..., 0]); s = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
    hsv = cv2.cvtColor(s, cv2.COLOR_RGB2HSV).astype(np.float32); hsv[..., 1] = np.clip(hsv[..., 1] * 2.2 + 30, 0, 255); s = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2RGB)
    q = quant(s, [[200, 30, 35], [245, 190, 40], [30, 120, 70], [240, 228, 200], [25, 20, 20], [230, 110, 40]])
    e = edges(rgb, 50, 130, 2)
    e2 = cv2.dilate(e.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    q[e2 & ~e] = [245, 236, 214]  # double-line effect
    q[e] = [20, 15, 15]
    # dotted hatching in big flat areas
    yy, xx = np.mgrid[0:al.shape[0], 0:al.shape[1]]
    dots = ((xx % 14 < 3) & (yy % 14 < 3)) & (lum(q) > 0.55)
    q[dots] = q[dots] * 0.55
    return q, al

def warli(rgb, al):
    out = np.zeros_like(rgb, np.float32) + np.array([150, 70, 40])
    e = edges(rgb, 40, 120, 3)
    out[e] = [250, 245, 235]
    return out, al

def ukiyo(rgb, al):
    s = cv2.bilateralFilter(cv2.bilateralFilter(rgb, 9, 70, 9), 9, 70, 9)
    s = np.clip(s.astype(np.float32) * 1.25 + 25, 0, 255).astype(np.uint8)
    q = quant(s, [[234, 220, 190], [205, 170, 120], [160, 80, 50], [40, 60, 100], [90, 120, 140], [30, 28, 30]])
    q[edges(rgb, 60, 150, 2)] = [28, 26, 30]
    # woodblock grain
    h, w = al.shape; grain = cv2.resize(rng.normal(0, 1, (h // 6 + 1, 4)), (w, h))
    q = q * (1 + 0.05 * grain[..., None]) + rng.normal(0, 4, q.shape)
    return q, al

def miniature(rgb, al):
    s = cv2.bilateralFilter(rgb, 9, 70, 9)
    hsv = cv2.cvtColor(s, cv2.COLOR_RGB2HSV).astype(np.float32)
    hsv[..., 1] = np.clip(hsv[..., 1] * 1.6 + 25, 0, 255)
    q = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2RGB)
    q = np.clip(q.astype(np.float32) * 1.15 + 15, 0, 255).astype(np.uint8)
    q = quant(q, [[182, 40, 40], [30, 90, 60], [225, 175, 60], [40, 70, 140], [245, 230, 195], [150, 75, 35], [20, 20, 25], [215, 130, 70], [250, 205, 110]])
    e = edges(rgb, 60, 150, 1)
    q[e] = [60, 30, 20]
    return q, al

F = dict(ink=ink, puppet=puppet, papercut=papercut, stained=stained, anime=anime, madhubani=madhubani, warli=warli, ukiyo=ukiyo, miniature=miniature)
for spec in sys.argv[2:]:
    n, ss = spec.split(':')
    rgb, al = load(n)
    for s in ss.split(','):
        o, a = F[s](rgb, al)
        save(n, s, o, a)
        print(n, s)
