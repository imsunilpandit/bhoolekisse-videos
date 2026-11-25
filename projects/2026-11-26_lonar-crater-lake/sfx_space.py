"""Space SFX pack (Lonar): lake ambience + birds, plops, splash, dive, bubbles, drain gurgle,
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


def meteor(d=1.7):
    t = T(d); f = 2400 * np.exp(-t * 1.6) + 150; s = bp(noise(d), 200, 3000) * (t / d) ** 1.5 * 1.2
    s += np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.08 * (t / d)
    return s
def boom(): t = T(2.2); return np.sin(2 * np.pi * (32 + 50 * np.exp(-t * 4)) * t) * np.exp(-t / 0.7) * 1.3 + lp(noise(2.2), 400) * np.exp(-t / 0.25) * 0.9
def debris(d=1.4):
    s = np.zeros(int(d * SR))
    for k in range(40): b = tick() * (0.5 + rng.random()); mix(s, b, int(rng.random() * (d - 0.05) * SR))
    return lp(s, 3000) * np.exp(-T(d) / 0.6)
def shimmer(d=1.2):
    t = T(d); s = np.zeros_like(t)
    for k, f in enumerate([880, 1320, 1760, 2217]): s += np.sin(2 * np.pi * f * t + np.sin(2 * np.pi * 5 * t) * 2) * 0.03
    return s * np.sin(np.pi * t / d)
def plip(): return plop(900 + 500 * rng.random(), 0.1) * 0.35
def sizzle(d=1.5): t = T(d); return hp(noise(d), 3500) * 0.12 * np.sin(np.pi * t / d)
def drone(d): t = T(d); return (np.sin(2 * np.pi * 55 * t) * 0.15 + lp(noise(d), 150) * 0.2) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.07 * t))
add(drone(DUR), 0, 0.5)
add(shimmer(), 0.1, 0.5); add(meteor(1.7), 2.6, 0.8); add(boom(), 4.3, 0.9); add(debris(), 4.5, 0.6)
add(whoosh(0.4), 5.3, 0.4); add(shimmer(1.4), 6.9, 0.7); add(pop(), 7.4, 0.6)
add(riser(0.9), 11.2, 0.6); add(hit(), 12.05, 0.7); add(pop(), 10.9, 0.6)
add(whoosh(0.45), 13.65, 0.45); add(pop(), 14.2, 0.6)
add(meteor(2.5), 16.2, 0.8); add(boom(), 18.85, 1.0); add(debris(1.8), 19.0, 0.7)
for k in range(18): add(tick(), 20.1 + k * 0.05, 0.5)
add(pop(), 20.2, 0.6); add(pop(), 20.5, 0.5)
add(whoosh(0.4), 23.35, 0.45); add(sparkle(), 24.9, 0.5); add(pop(), 25.75, 0.6)
add(whoosh(0.4), 28.3, 0.4); add(hit(), 28.85, 0.6); add(pop(), 28.95, 0.6)
for k in range(3): add(pop(), 31.05 + k * 0.25, 0.6)
add(whoosh(0.45), 32.95, 0.45); add(sizzle(2.0), 34.9, 0.7); add(pop(), 35.0, 0.5); add(pop(), 35.5, 0.5)
add(gurgle(1.8), 35.6, 0.5); add(sparkle(1.2), 37.0, 0.5); add(pop(), 37.2, 0.5)
add(whoosh(0.5), 38.85, 0.4); add(pop(), 39.5, 0.4)
for k in range(30): add(plip(), 40.5 + 1.8 * (k / 30) ** 0.7, 0.5)
add(pop(), 41.05, 0.6); add(riser(0.8), 42.2, 0.5); add(shimmer(1.6), 43.3, 0.8); add(hit(), 43.5, 0.6)
add(whoosh(0.4), 46.35, 0.4); add(shimmer(1.2), 47.9, 0.5); add(pop(), 48.1, 0.5); add(pop(), 48.7, 0.5)
add(whoosh(0.5), 49.6, 0.45); add(meteor(1.0), 50.0, 0.3); add(sparkle(), 50.6, 0.6)
add(pop(), 53.3, 0.7); add(pop(), 56.2, 0.7); add(tick(), 56.35, 0.8)
st = np.stack([L, R], 1); st = st / (np.abs(st).max() + 1e-9) * 0.8
w = wave.open(sys.argv[1], 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close(); print('ok')
