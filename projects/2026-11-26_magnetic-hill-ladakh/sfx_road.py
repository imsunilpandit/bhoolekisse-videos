"""Road SFX pack (Magnetic Hill): lake ambience + birds, plops, splash, dive, bubbles, drain gurgle,
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


def engine(d): t = T(d); f = 42 + 3 * np.sin(2 * np.pi * 0.5 * t); s = sum(np.sin(2 * np.pi * f * h * t) / h for h in range(1, 6)) * 0.12; return lp(s * (1 + 0.2 * np.sin(2 * np.pi * 9 * t)), 900)
def roll(d): t = T(d); return lp(noise(d), 700) * 0.35 * np.minimum(1, np.minimum(t / 0.4, (d - t) / 0.4)) + bp(noise(d), 1500, 4000) * 0.03
def shutter(): t = T(0.12); s = hp(noise(0.12), 2000) * np.exp(-t / 0.012) * 0.8; mix(s, hp(noise(0.07), 2000) * np.exp(-T(0.07) / 0.01) * 0.6, int(0.05 * SR)); return s
def zip_(d=0.3): t = T(d); f = 600 + 2400 * (t / d); return np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.15 * np.sin(np.pi * t / d)
def boing(): t = T(0.6); f = 180 + 120 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 4); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.25) * 0.5
def slamh(): t = T(0.5); return np.sin(2 * np.pi * (60 + 90 * np.exp(-t * 20)) * t) * np.exp(-t / 0.12) * 0.9 + hp(noise(0.5), 1500) * np.exp(-t / 0.02) * 0.3
def ding(): t = T(1.0); return (np.sin(2 * np.pi * 1318 * t) + 0.4 * np.sin(2 * np.pi * 2636 * t)) * np.exp(-t / 0.3) * 0.12
def buzz(): t = T(0.4); return np.sign(np.sin(2 * np.pi * 110 * t)) * 0.12 * np.exp(-t / 0.2)
cuts = [5.54, 10.28, 14.99, 27.87, 34.13, 46.12, 50.39]
for k, tc in enumerate(cuts): add(whoosh(0.3), tc - 0.12, 0.45); add(shutter(), tc + 0.17, 0.6)
add(slamh(), 0.05, 0.6); add(engine(5.2), 0.2, 0.5); add(roll(5.0), 0.3, 0.5); add(zip_(), 1.0, 0.5)
add(slamh(), 5.6, 0.5); add(pop(), 6.45, 0.6); add(slamh(), 6.6, 0.5); add(zip_(0.5), 6.9, 0.4); add(boing(), 8.4, 0.7); add(roll(1.5), 8.35, 0.4); add(pop(), 8.4, 0.5)
add(slamh(), 10.35, 0.5); add(pop(), 10.4, 0.5); add(pop(), 12.0, 0.6); add(riser(0.7), 12.2, 0.5); add(hit(), 12.93, 0.7)
add(slamh(), 15.05, 0.5); add(zip_(1.3), 16.6, 0.4)
for k in range(14): add(tick(), 16.65 + 1.4 * (1 - (1 - k / 14) ** (1 / 3)), 0.5)
add(pop(), 16.0, 0.5); add(pop(), 17.9, 0.5); add(pop(), 18.3, 0.5)
add(slamh(), 20.45, 0.5); add(zip_(), 20.6, 0.4); add(pop(), 22.85, 0.6); add(engine(4.0), 22.9, 0.25)
add(slamh(), 24.75, 0.5); add(roll(3.2), 24.9, 0.6); add(zip_(), 25.0, 0.4)
add(slamh(), 27.95, 0.5); add(buzz(), 29.25, 0.8); add(slamh(), 29.3, 0.5)
add(whoosh(0.8), 30.8, 0.5); add(pop(), 32.1, 0.5); add(ding(), 32.4, 0.8); add(slamh(), 32.9, 0.6); add(zip_(0.5), 32.9, 0.4)
add(pop(), 34.25, 0.4); add(pop(), 34.4, 0.4); add(pop(), 34.55, 0.4); add(slamh(), 36.55, 0.6); add(sparkle(), 38.4, 0.6); add(pop(), 38.45, 0.5)
add(pop(), 40.2, 0.6); add(slamh(), 40.6, 0.5); add(zip_(0.5), 41.1, 0.4); add(pop(), 41.3, 0.5)
add(slamh(), 43.45, 0.5); add(roll(2.2), 43.4, 0.4); add(pop(), 43.5, 0.5); add(pop(), 43.9, 0.5)
add(slamh(), 46.2, 0.5)
for k in range(6): add(pop(), 47.72 + k * 0.18, 0.5)
add(pop(), 47.9, 0.5)
add(sparkle(), 50.4, 0.6); add(slamh(), 51.3, 0.6); add(pop(), 53.15, 0.7); add(pop(), 55.8, 0.7); add(tick(), 55.95, 0.8)
st = np.stack([L, R], 1); st = st / (np.abs(st).max() + 1e-9) * 0.8
w = wave.open(sys.argv[1], 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close(); print('ok')
