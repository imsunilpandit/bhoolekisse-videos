"""Make Vox-style assets from the user's photos: cut-out (colour, engraved hatching, white sticker
border, shadow-ready alpha) + matching pencil-sketch layer for the sketch->real wipe."""
import sys, os, numpy as np, cv2
from PIL import Image, ImageFilter
from rembg import remove, new_session

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
sess = new_session('isnet-general-use')

def up(img, target_h):
    s = target_h / img.height
    return img.resize((int(img.width * s), target_h), Image.LANCZOS) if s > 1 else img

def engrave(rgba):
    a = np.array(rgba).astype(np.float32)
    rgb, al = a[..., :3], a[..., 3]
    h, w = al.shape
    # warm print grading: slight desaturate, lift blacks, warm paper tint
    g = rgb.mean(2, keepdims=True)
    rgb = rgb * 0.78 + g * 0.22
    rgb = rgb * np.array([1.04, 1.0, 0.9]) + np.array([10, 6, 0])
    # local contrast
    lab = cv2.cvtColor(np.clip(rgb, 0, 255).astype(np.uint8), cv2.COLOR_RGB2LAB)
    lab[..., 0] = cv2.createCLAHE(2.0, (8, 8)).apply(lab[..., 0])
    rgb = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB).astype(np.float32)
    # engraved hatching: diagonal lines whose thickness follows darkness
    lum = cv2.GaussianBlur(rgb.mean(2), (0, 0), 1.2) / 255.0
    yy, xx = np.mgrid[0:h, 0:w]
    period = max(5, w // 140)
    phase = ((xx + yy) % period) / period
    line = (np.abs(phase - 0.5) * 2) < (1 - lum) * 0.9
    phase2 = ((xx - yy) % period) / period
    line2 = ((np.abs(phase2 - 0.5) * 2) < (0.55 - lum) * 1.2) & (lum < 0.45)
    ink = (line | line2).astype(np.float32)[..., None]
    rgb = rgb * (1 - 0.32 * ink) + np.array([40, 28, 20]) * 0.32 * ink
    # grain
    rgb += np.random.default_rng(3).normal(0, 4, rgb.shape)
    out = np.dstack([np.clip(rgb, 0, 255), al]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')

def sticker(rgba, border):
    al = np.array(rgba)[..., 3]
    pad = border * 2
    big = Image.new('RGBA', (rgba.width + pad * 2, rgba.height + pad * 2), (0, 0, 0, 0))
    big.paste(rgba, (pad, pad), rgba)
    a = np.array(big)[..., 3]
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (border * 2 + 1, border * 2 + 1))
    dil = cv2.dilate((a > 40).astype(np.uint8) * 255, k)
    dil = cv2.GaussianBlur(dil, (0, 0), 1.0)
    base = Image.new('RGBA', big.size, (255, 253, 246, 0))
    base.putalpha(Image.fromarray(dil))
    base.alpha_composite(big)
    return base

def sketch(rgba):
    """graphite pencil drawing of the same image, same canvas size, on transparent."""
    a = np.array(rgba)
    g = cv2.cvtColor(a[..., :3], cv2.COLOR_RGB2GRAY)
    inv = 255 - g
    blur = cv2.GaussianBlur(inv, (0, 0), 6)
    dodge = cv2.divide(g, 255 - blur, scale=256)
    edges = cv2.Canny(cv2.GaussianBlur(g, (0, 0), 1.4), 40, 110)
    edges = cv2.dilate(edges, np.ones((2, 2), np.uint8))
    dark = np.clip((255 - dodge.astype(np.float32)) * 0.8 + edges * 0.9, 0, 255)
    al = dark * (a[..., 3] / 255.0)
    # outline of the silhouette
    sil = cv2.Canny((a[..., 3] > 40).astype(np.uint8) * 255, 50, 150)
    sil = cv2.dilate(sil, np.ones((3, 3), np.uint8))
    al = np.maximum(al, sil)
    out = np.zeros_like(a)
    out[..., 0], out[..., 1], out[..., 2] = 58, 58, 66
    out[..., 3] = np.clip(al, 0, 255).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')

def save_set(name, rgba, border=14):
    rgba = rgba.crop(rgba.getbbox())
    eng = sticker(engrave(rgba), border)
    sk = sticker(sketch(rgba), border)
    # sketch keeps no white border fill, only the lines
    skn = np.array(sk); skn[..., 3] = np.array(sketch(Image.new('RGBA', (1, 1))).resize((1, 1)))[..., 3][0, 0] if False else skn[..., 3]
    sk_lines = sketch(rgba)
    padded = Image.new('RGBA', eng.size, (0, 0, 0, 0)); padded.paste(sk_lines, (border * 2, border * 2))
    eng.save(f'{OUT}/{name}.png'); padded.save(f'{OUT}/{name}_sketch.png')
    print(name, eng.size)

def cut(img):
    return remove(img, session=sess, post_process_mask=True)

# 1) 54 ft statue (clean sky photo)
im = up(Image.open(f'{SRC}/03_statue_sky.jpg').convert('RGB'), 1500)
save_set('statue54', cut(im))

# 2) statue on pedestal with clock tower context (crowd photo) - statue+pedestal only, crowd cut away
im = Image.open(f'{SRC}/04_statue_crowd.jpg').convert('RGB')
im = up(im.crop((170, 0, 470, 405)), 1500)
save_set('statue54_pedestal', cut(im))

# 3) mandir building: crop above crowd/tent, remove sky
im = Image.open(f'{SRC}/05_mandir.jpg').convert('RGB').crop((170, 60, 1900, 1080))
m = np.array(cut(im))
al = (m[..., 3] > 40).astype(np.uint8)
n, lab, st, _ = cv2.connectedComponentsWithStats(al)
keep = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])
m[..., 3] = np.where(lab == keep, m[..., 3], 0)
H = m.shape[0]; cutoff = int(H * 0.86)   # drop tent/crowd edge at the very bottom
m[cutoff:, :, 3] = 0
save_set('mandir', Image.fromarray(m, 'RGBA'), border=16)

# 4) garbhagriha: rectangular photo card (no bg removal; it is the sanctum) + Shani close-up
im = Image.open(f'{SRC}/02_garbhagriha.jpg').convert('RGB')
card = up(im.crop((20, 20, 460, 640)), 1500).convert('RGBA')
save_set('garbhagriha', card, border=18)
# Shani (stri roop) figure at Hanuman ji's feet - close-up crop for the reveal
shani = up(im.crop((200, 340, 320, 438)), 900).convert('RGBA')
save_set('shani_closeup', shani, border=18)
# Hanuman ji face/murti close-up
murti = up(im.crop((150, 160, 340, 470)), 1300).convert('RGBA')
save_set('murti_closeup', murti, border=18)
