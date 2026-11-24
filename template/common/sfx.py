import numpy as np,wave,sys
SR=44100;DUR=float(sys.argv[2]);N=int(SR*DUR);L=np.zeros(N);rng=np.random.default_rng(3)
def lp(x,a):
    y=np.zeros_like(x);c=0.
    for i in range(len(x)):c+=a*(x[i]-c);y[i]=c
    return y
def add(s,t,g=1.0):
    i=int(t*SR);n=min(len(s),N-i)
    if n>0:L[i:i+n]+=s[:n]*g
def env(n,a,r):
    e=np.ones(n);ai,ri=int(a*SR),int(r*SR)
    if ai:e[:ai]=np.linspace(0,1,ai)
    if ri:e[-ri:]*=np.linspace(1,0,ri)
    return e
def rumble(d,rate=6):  # stone wheel rolling
    n=int(d*SR);t=np.arange(n)/SR;s=lp(rng.uniform(-1,1,n),0.02)*6
    s*=0.6+0.4*np.abs(np.sin(2*np.pi*rate*t));s+=0.25*np.sin(2*np.pi*(55+10*np.sin(2*np.pi*rate*t))*t)
    return s*env(n,0.15,0.2)
def thud(f0=70,d=0.6,g=1):
    n=int(d*SR);t=np.arange(n)/SR;return g*np.sin(2*np.pi*(f0*0.6+f0*np.exp(-t*12))*t)*np.exp(-t/0.14)+0.3*lp(rng.uniform(-1,1,n),0.08)*np.exp(-t/0.05)
def whoosh(d=0.45):
    n=int(d*SR);t=np.linspace(0,1,n);s=rng.uniform(-1,1,n);a=0.02+0.25*np.sin(np.pi*t)
    y=np.zeros(n);c=0.
    for i in range(n):c+=a[i]*(s[i]-c);y[i]=c
    return y*np.sin(np.pi*t)**1.5*2.2
def shimmer(d=0.9):
    n=int(d*SR);t=np.arange(n)/SR;s=sum(np.sin(2*np.pi*f*t+k)*np.exp(-t/0.5) for k,f in enumerate([1320,1760,2217,2637]))*0.06
    return s*env(n,0.1,0.3)
def clop():
    n=int(0.09*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*380*t)*0.6+lp(rng.uniform(-1,1,n),0.3))*np.exp(-t/0.018)
def sea(d):
    n=int(d*SR);t=np.arange(n)/SR;return lp(rng.uniform(-1,1,n),0.04)*3*(0.5+0.5*np.sin(2*np.pi*0.45*t))*env(n,0.4,0.6)
def tick():
    n=int(0.04*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*2400*t)*np.exp(-t/0.004)*0.5+np.sin(2*np.pi*900*t)*np.exp(-t/0.008)*0.3
def boom():
    n=int(1.6*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*(38+50*np.exp(-t*5))*t)*np.exp(-t/0.6)*1.2+lp(rng.uniform(-1,1,n),0.05)*np.exp(-t/0.12)
cues=sys.argv[3]
for c in cues.split(';'):
    if not c:continue
    k,a=c.split('@');a=[float(v) for v in a.split(',')]
    t=a[0]
    if k=='rumble':add(rumble(a[1]),t,0.9)
    elif k=='thud':add(thud(),t,1.0)
    elif k=='whoosh':add(whoosh(),t-0.2,0.7)
    elif k=='shimmer':add(shimmer(),t,0.9)
    elif k=='hooves':
        tt=t
        while tt<t+a[1]:add(clop(),tt,0.8);add(clop(),tt+0.09,0.6);tt+=0.32
    elif k=='sea':add(sea(a[1]),t,0.7)
    elif k=='drop':add(thud(120,0.4),t,0.8)
    elif k=='spin':
        tt=t
        while tt<t+a[1]:add(tick(),tt,0.6);tt+=0.05+0.12*(tt-t)/a[1]
    elif k=='boom':add(boom(),t,1.0)
    elif k=='stamp':add(thud(90,0.35),t,0.9)
    elif k=='note':
        f=a[1];n=int(1.6*SR);tt=np.arange(n)/SR
        tone=sum((0.6/h)*np.sin(2*np.pi*f*h*tt+h)*np.exp(-tt*(1.8+h*0.9)) for h in (1,2,3,4.2,5.4))
        tone+=0.25*np.sin(2*np.pi*f*0.5*tt)*np.exp(-tt*3)
        add(tone*np.minimum(1,tt/0.004),t,0.8)
    elif k=='ticks':
        tt=t
        while tt<t+a[1]:add(tick(),tt,0.7);tt+=0.5
L=L/(np.abs(L).max()+1e-9)*0.9
w=wave.open(sys.argv[1],'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((L*32767).astype(np.int16).tobytes());w.close();print('sfx ok')
