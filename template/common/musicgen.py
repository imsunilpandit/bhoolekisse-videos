"""Copyright-free cinematic Indian background score, generated from scratch.
usage: python3 musicgen.py OUT.wav DURATION "cut1,cut2,..." "hit1,hit2,..." [mood]
mood: mystery (default, D Bhairavi-ish) | devotional (D major-ish) | epic
"""
import sys, numpy as np, wave
SR = 44100
out, DUR = sys.argv[1], float(sys.argv[2])
cuts = [float(x) for x in sys.argv[3].split(',') if x] if len(sys.argv) > 3 else []
hits = [float(x) for x in sys.argv[4].split(',') if x] if len(sys.argv) > 4 else []
mood = sys.argv[5] if len(sys.argv) > 5 else 'mystery'
N = int(SR * DUR); t = np.arange(N) / SR; rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)
def midi(m): return 440 * 2 ** ((m - 69) / 12)
ROOT = 50  # D3
SCALE = {'mystery': [0, 1, 3, 5, 7, 8, 10], 'devotional': [0, 2, 4, 5, 7, 9, 11], 'epic': [0, 2, 3, 5, 7, 8, 10]}[mood]
CHORDS = {'mystery': [[0, 3, 7], [-4, 0, 3], [-2, 2, 5], [0, 3, 7]], 'devotional': [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]],
          'epic': [[0, 3, 7], [-4, 0, 3], [-5, -2, 2], [-2, 2, 5]]}[mood]
BPM = 84; beat = 60 / BPM; bar = beat * 4
def env(n, a, r):
    e = np.ones(n); ai = int(a * SR); ri = int(r * SR)
    if ai: e[:ai] = np.linspace(0, 1, ai)
    if ri: e[-ri:] *= np.linspace(1, 0, ri)
    return e
def add(sig, start, gl=1.0, gr=1.0):
    i = int(start * SR)
    if i >= N: return
    n = min(len(sig), N - i); L[i:i + n] += sig[:n] * gl; R[i:i + n] += sig[:n] * gr
def lowpass(x, a):
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
    return y
# 1) tanpura-like drone (soft, plucked Pa-Sa-Sa-Sa' cycle)
def tanpura_note(f, dur=3.0):
    n = int(dur * SR); tt = np.arange(n) / SR
    s = sum((0.5 / k) * np.sin(2 * np.pi * f * k * tt + k) * (1 + 0.25 * np.sin(2 * np.pi * 0.6 * k * tt)) for k in range(1, 7))
    return s * np.exp(-tt / 2.4)
for k, st in enumerate(np.arange(0, DUR, 0.8)):
    f = [midi(ROOT - 5), midi(ROOT), midi(ROOT), midi(ROOT - 12)][k % 4]
    add(tanpura_note(f) * 0.045, st, 0.9 if k % 2 else 1.0, 1.0 if k % 2 else 0.9)
# 2) warm pad chords (detuned saw-ish, slow swell)
for bi, st in enumerate(np.arange(0, DUR, bar * 2)):
    ch = CHORDS[bi % len(CHORDS)]; n = int(bar * 2 * SR); tt = np.arange(n) / SR; s = np.zeros(n)
    for iv in ch:
        f = midi(ROOT + 12 + iv)
        for det in (-0.12, 0.12):
            ff = f * 2 ** (det / 12)
            s += sum((0.6 / h) * np.sin(2 * np.pi * ff * h * tt) for h in range(1, 6))
    s = lowpass(s * env(n, 1.2, 1.2), 0.08) * 0.022
    add(s, st, 1.0, 0.95)
# 3) santoor/sitar-like plucked melody (Karplus-Strong), sparse motif, varies per phrase
def pluck(f, dur=1.2, bright=0.5):
    p = int(SR / f); buf = rng.uniform(-1, 1, p); n = int(dur * SR); o = np.zeros(n)
    for i in range(n):
        o[i] = buf[i % p]; buf[i % p] = 0.996 * (bright * buf[i % p] + (1 - bright) * buf[(i + 1) % p])
    return o * env(n, 0.002, 0.3)
motif = [0, 2, 3, 2, 4, 3, 1, 0]
for ph, st in enumerate(np.arange(bar, DUR - bar, bar * 2)):
    shift = [0, 2, -1, 3][ph % 4]
    for j, deg in enumerate(motif):
        if (j + ph) % 3 == 2: continue  # leave space
        d = (deg + shift) % len(SCALE); octv = 12 if deg + shift >= len(SCALE) else 0
        f = midi(ROOT + 12 + SCALE[d] + octv)
        add(pluck(f, 1.0, 0.45) * 0.10, st + j * beat / 2, 0.8 + 0.2 * (j % 2), 1.0 - 0.2 * (j % 2))
# 4) soft tabla-like groove (dha on 1, na on off-beats), enters after hook
def dha():
    n = int(0.35 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * (70 + 60 * np.exp(-tt * 18)) * tt) * np.exp(-tt / 0.12)
def na():
    n = int(0.12 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * 620 * tt) * np.exp(-tt / 0.03) * 0.6 + rng.uniform(-1, 1, n) * np.exp(-tt / 0.01) * 0.15
for k, st in enumerate(np.arange(bar, DUR - 0.5, beat / 2)):
    pos = k % 8
    if pos in (0, 5): add(dha() * 0.16, st)
    if pos in (2, 3, 6, 7): add(na() * 0.07, st, 0.85, 1.0)
# 5) transitions: gentle riser into each cut + soft low impact
noise = rng.uniform(-1, 1, N)
for c in cuts:
    n = int(0.6 * SR); s = int((c - 0.6) * SR)
    if s < 0: continue
    seg = lowpass(noise[s:s + n], 0.05) * np.linspace(0, 1, n) ** 2 * 0.35
    add(seg, c - 0.6, 0.9, 1.0)
for h in hits:
    n = int(1.2 * SR); tt = np.arange(n) / SR
    add(np.sin(2 * np.pi * (48 + 40 * np.exp(-tt * 6)) * tt) * np.exp(-tt / 0.5) * 0.35, h)
# master: fade in/out, soft clip, normalize to -3 dBFS peak
fade = np.clip(t / 0.3, 0, 1) * np.clip((DUR - t) / 1.5, 0, 1)
L *= fade; R *= fade
st = np.stack([L, R], 1); st = np.tanh(st * 1.4) / np.tanh(1.4)
st = st / (np.abs(st).max() + 1e-9) * 0.7
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
print('wrote', out, DUR)
