"""Water SFX pack (new for this video): lake ambience + birds, plops, splash, dive, bubbles, drain gurgle,
rain, soft thud, pops, ticks, riser, bass hit, sparkle. All synthesized locally."""
import numpy as np, wave, sys
from scipy.signal import lfilter, butter
SR = 44100; DUR = float(sys.argv[2]); N = int(SR * DUR); L = np.zeros(N); R = np.zeros(N); rng = np.random.default_rng(14)
def add(s, t, g=1.0, pan=0.0):
    i = int(t * SR)
    if i < 0: s = s[-i:]; i = 0
    n = min(len(s), N - i)
    if n > 0: L[i:i+n] += s[:n] * g * (1 - max(0, pan)); R[i:i+n] += s[:n] * g * (1 + min(0, pan))
def lp(x, f): b, a = butter(2, f / (SR / 2)); return lfilter(b, a, x)
def hp(x, f): b, a = butter(2, f / (SR / 2), 'high'); return lfilter(b, a, x)
def bp(x, lo, hi): b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], 'band'); return lfilter(b, a, x)
def T(d): return np.arange(int(d * SR)) / SR
def noise(d): return rng.uniform(-1, 1, int(d * SR))
def mix(s, b, i):
    n = min(len(b), len(s) - i)
    if n > 0: s[i:i+n] += b[:n]
    return s
def plop(f0=420, d=0.22):
    t = T(d); f = f0 * (1 + 1.8 * np.exp(-t * 40)); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.05) * 0.8 + bp(noise(d), 800, 3000) * np.exp(-t / 0.02) * 0.25
def drop(): return plop(900, 0.15) * 0.7
def splash(d=0.9):
    t = T(d); s = bp(noise(d), 500, 6000) * (np.exp(-t / 0.18) + 0.3 * np.exp(-((t - 0.25) / 0.12) ** 2))
    for k in range(6): mix(s, plop(500 + 300 * rng.random(), d - 0.05 - 0.08 * k) * 0.3, int((0.05 + 0.08 * k) * SR))
    return s * 0.9
def dive(d=1.1):
    t = T(d); s = lp(noise(d), 900) * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.2 * 3.0
    s += np.sin(2 * np.pi * (60 + 40 * np.exp(-t * 3)) * t) * np.exp(-t / 0.5) * 0.5
    return s
def bubbles(d=1.4, n=16):
    s = np.zeros(int(d * SR))
    for k in range(n):
        st = rng.random() * (d - 0.15); b = plop(700 + 900 * rng.random(), 0.1) * 0.35; mix(s, b, int(st * SR))
    return s
def gurgle(d=1.6):
    s = np.zeros(int(d * SR))
    for k in range(22):
        st = rng.random() * (d - 0.2); b = plop(200 + 250 * rng.random(), 0.18) * 0.45; mix(s, b, int(st * SR))
    return lp(s, 1500) + lp(noise(d), 300) * 0.4 * np.sin(np.pi * T(d) / d)
def rain(d):
    t = T(d); s = bp(noise(d), 1500, 7000) * 0.35 + lp(noise(d), 600) * 0.4
    for k in range(int(d * 40)):
        st = rng.random() * (d - 0.1); b = drop() * 0.12; mix(s, b, int(st * SR))
    return s * np.minimum(1, np.minimum(t / 0.4, (d - t) / 0.6))
def thud(): t = T(0.6); return np.sin(2 * np.pi * (45 + 50 * np.exp(-t * 14)) * t) * np.exp(-t / 0.16) + lp(noise(0.6), 200) * np.exp(-t / 0.06) * 0.6
def pop(): t = T(0.12); return np.sin(2 * np.pi * (520 + 500 * np.exp(-t * 60)) * t) * np.exp(-t / 0.03) * 0.6
def tick(): t = T(0.04); return np.sin(2 * np.pi * 1800 * t) * np.exp(-t / 0.005) * 0.35
def whoosh(d=0.45):
    t = T(d); s = noise(d); y = np.zeros_like(s); c = 0.
    a = 0.03 + 0.22 * np.sin(np.pi * t / d)
    for i in range(len(s)): c += a[i] * (s[i] - c); y[i] = c
    return y * np.sin(np.pi * t / d) ** 1.5 * 2.0
def riser(d=0.9): t = T(d); return bp(noise(d), 300, 4000) * (t / d) ** 2 * 0.7 + np.sin(2 * np.pi * (200 + 600 * (t / d) ** 2) * t) * (t / d) ** 3 * 0.15
def hit(): t = T(1.4); return np.sin(2 * np.pi * (40 + 45 * np.exp(-t * 5)) * t) * np.exp(-t / 0.55) * 1.1 + lp(noise(1.4), 250) * np.exp(-t / 0.1) * 0.5
def sparkle(d=0.9):
    t = T(d); s = np.zeros_like(t)
    for k, f in enumerate([1568, 1976, 2349, 2637, 3136]): st = int(k * 0.06 * SR); mix(s, np.sin(2 * np.pi * f * t) * np.exp(-t / 0.35) * 0.05, st)
    return s
def bird(f0=3200):
    d = 0.35; s = np.zeros(int(d * SR))
    for k in range(3):
        tt = T(0.08); f = f0 * (1 + 0.25 * np.sin(np.pi * tt / 0.08)); ph = 2 * np.pi * np.cumsum(f) / SR; c = np.sin(ph) * np.sin(np.pi * tt / 0.08) * 0.12
        mix(s, c, int(k * 0.1 * SR))
    return s
def ambience(d):
    t = T(d); s = lp(noise(d), 500) * 0.25 * (0.7 + 0.3 * np.sin(2 * np.pi * 0.13 * t)) + bp(noise(d), 2000, 5000) * 0.015
    return s

# ---- cue sheet (seconds, synced to timing.json) ----
add(ambience(DUR), 0, 0.5)
for tb, pan in [(1.2, -0.4), (6.0, 0.5), (13.5, 0.3), (24.5, -0.5), (48.0, 0.4), (66.0, -0.3), (69.5, 0.5)]: add(bird(2800 + 900 * rng.random()), tb, 0.8, pan)
add(sparkle(), 0.15, 0.7); add(splash(), 3.95, 0.8)
for k, tl in enumerate([6.26, 6.95, 7.52]): add(whoosh(0.3), tl - 0.32, 0.35); add(plop(330 + 40 * k), tl, 0.9)
# scene transitions: alternate drop / whoosh so it is not the same sound every cut
for k, tc in enumerate([5.4, 8.1, 12.3, 22.65, 54.65, 61.15, 64.45]): add(drop() if k % 2 == 0 else whoosh(0.4), tc - (0 if k % 2 == 0 else 0.15), 0.6)
add(riser(0.9), 9.75, 0.8); add(hit(), 10.6, 0.8); add(sparkle(), 10.62, 0.6)
add(whoosh(0.6), 12.35, 0.5); add(pop(), 13.75, 0.6); add(pop(), 15.99, 0.7)
for k in range(40): add(tick(), 18.08 + 1.3 * (1 - (1 - k / 40) ** (1 / 3)), 0.6)
add(whoosh(0.7), 19.5, 0.55); add(hit(), 20.3, 0.6); add(pop(), 21.2, 0.6)
add(sparkle(), 23.9, 0.6)
for tp in [24.68, 25.0, 26.2]: add(pop(), tp, 0.7)
add(whoosh(0.4), 27.0, 0.45)
for k in range(10): add(tick(), 27.35 + k * 0.1, 0.45)
add(pop(), 28.2, 0.6)
add(dive(), 30.05, 0.9); add(bubbles(1.6), 30.4, 0.8)
add(pop(), 32.35, 0.7); add(pop(), 35.15, 0.7); add(pop(), 36.5, 0.5)
add(gurgle(1.7), 38.8, 0.8); add(thud(), 41.3, 0.8); add(sparkle(1.2), 42.0, 0.6); add(sparkle(1.0), 42.9, 0.5); add(pop(), 42.6, 0.5)
add(rain(2.6), 43.8, 0.7); add(splash(0.8), 45.35, 0.6); add(pop(), 45.3, 0.5)
add(splash(0.7), 46.45, 0.6); add(sparkle(), 47.0, 0.6); add(pop(), 48.6, 0.6); add(pop(), 49.05, 0.5)
tt = 49.95
while tt < 53.2: add(plop(300 + 60 * rng.random(), 0.2), tt + 0.55, 0.6); add(whoosh(0.25), tt + 0.15, 0.25); tt += 0.6
add(sparkle(1.0), 53.3, 0.7)
add(pop(), 54.75, 0.7); add(whoosh(0.5), 56.1, 0.3); add(pop(), 57.9, 0.7)
for k in range(14): add(pop(), 59.85 + k * 1.0 / 14, 0.4)
add(riser(2.0), 61.9, 0.6)
for k in range(24): add(tick(), 61.75 + 2.1 * (1 - (1 - k / 24) ** (1 / 3)), 0.45)
add(hit(), 63.99, 0.9); add(sparkle(), 64.0, 0.8)
add(pop(), 67.2, 0.7); add(pop(), 68.3, 0.7); add(tick(), 68.45, 0.8)
st = np.stack([L, R], 1); st = st / (np.abs(st).max() + 1e-9) * 0.8
w = wave.open(sys.argv[1], 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close(); print('ok')
