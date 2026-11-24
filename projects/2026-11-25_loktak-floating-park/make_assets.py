"""Cinematic cut-outs (no paper sticker): natural colour, slight warm grade, soft light rim + cream pencil sketch layer."""
import sys, os, numpy as np, cv2
from PIL import Image
from rembg import remove, new_session
SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
sess = new_session('isnet-general-use')

def biggest(rgba, keep=1):
    m = np.array(rgba); al = (m[..., 3] > 40).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(al)
    if n <= 1: return rgba
    order = 1 + np.argsort(-st[1:, cv2.CC_STAT_AREA])
    big = st[order[0], cv2.CC_STAT_AREA]
    ok = [o for o in order if st[o, cv2.CC_STAT_AREA] > big * 0.02]
    m[..., 3] = np.where(np.isin(lab, ok), m[..., 3], 0)
    return Image.fromarray(m, 'RGBA')

def grade(rgba):
    a = np.array(rgba).astype(np.float32); rgb = a[..., :3]
    rgb = rgb * np.array([1.03, 1.0, 0.95]) + np.array([6, 3, 0])
    lab = cv2.cvtColor(np.clip(rgb, 0, 255).astype(np.uint8), cv2.COLOR_RGB2LAB)
    lab[..., 0] = cv2.createCLAHE(1.6, (8, 8)).apply(lab[..., 0])
    rgb = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB).astype(np.float32)
    al = a[..., 3]
    # soft warm light rim on the silhouette edge
    edge = cv2.GaussianBlur(al, (0, 0), 3) ; inner = cv2.GaussianBlur(cv2.erode(al, np.ones((7, 7), np.uint8)), (0, 0), 3)
    rimm = np.clip((edge - inner) / 255.0, 0, 1)[..., None] * 0.35
    rgb = rgb * (1 - rimm) + np.array([255, 236, 200]) * rimm
    return Image.fromarray(np.dstack([np.clip(rgb, 0, 255), al]).astype(np.uint8), 'RGBA')

def sketch(rgba):
    a = np.array(rgba); g = cv2.cvtColor(a[..., :3], cv2.COLOR_RGB2GRAY)
    blur = cv2.GaussianBlur(255 - g, (0, 0), 6); dodge = cv2.divide(g, 255 - blur, scale=256)
    edges = cv2.dilate(cv2.Canny(cv2.GaussianBlur(g, (0, 0), 1.4), 40, 110), np.ones((2, 2), np.uint8))
    dark = np.clip((255 - dodge.astype(np.float32)) * 0.8 + edges * 0.9, 0, 255) * (a[..., 3] / 255.0)
    sil = cv2.dilate(cv2.Canny((a[..., 3] > 40).astype(np.uint8) * 255, 50, 150), np.ones((3, 3), np.uint8))
    al = np.maximum(dark, sil)
    out = np.zeros_like(a); out[..., 0], out[..., 1], out[..., 2] = 255, 244, 220; out[..., 3] = np.clip(al, 0, 255).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')

def do(name, src):
    im = Image.open(f'{SRC}/{src}').convert('RGB')
    cut = biggest(remove(im, session=sess, post_process_mask=True))
    cut = cut.crop(cut.getbbox())
    pad = 30; big = Image.new('RGBA', (cut.width + 2 * pad, cut.height + 2 * pad), (0, 0, 0, 0)); big.paste(cut, (pad, pad), cut)
    grade(big).save(f'{OUT}/{name}.png'); sketch(big).save(f'{OUT}/{name}_sketch.png'); print(name, big.size)

for n in ['phumdi', 'phumdi4', 'deer', 'deerhop', 'block', 'hut', 'boat']:
    do(n, f'bk_v14_{n}.png')
lk = Image.open(f'{SRC}/bk_v14_lake.png').convert('RGB'); lk.save(f'{OUT}/lake.jpg', quality=92); print('lake', lk.size)
