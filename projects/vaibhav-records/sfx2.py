# extra realistic cricket SFX layered on top of sfx.py output
import sys,numpy as np,wave
SR=44100;base=sys.argv[1];out=sys.argv[2];cues=sys.argv[3]
w=wave.open(base);L=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32767;w.close()
N=len(L);rng=np.random.default_rng(9)
def lp(x,a):
    y=np.zeros_like(x);c=0.
    for i in range(len(x)):c+=a*(x[i]-c);y[i]=c
    return y
def add(s,t,g=1):
    i=int(t*SR)
    if i>=N or i<0:return
    n=min(len(s),N-i);L[i:i+n]+=s[:n]*g
def crack():  # leather on willow: sharp click + hollow wood ring
    n=int(0.35*SR);t=np.arange(n)/SR
    click=rng.uniform(-1,1,n)*np.exp(-t/0.0025)
    wood=sum(a*np.sin(2*np.pi*f*t)*np.exp(-t/d) for f,a,d in((1180,.7,.045),(2350,.35,.03),(620,.45,.06),(3400,.15,.015)))
    return click*0.9+wood
def crowd(d,peak=1.0):  # stadium roar swell
    n=int(d*SR);t=np.arange(n)/SR;x=rng.uniform(-1,1,n)
    b=lp(x,0.12)-lp(x,0.015)
    env=np.minimum(1,t/0.35)*np.exp(-np.maximum(0,t-0.6)/1.2)
    mod=1+0.25*np.sin(2*np.pi*3.1*t)*np.sin(2*np.pi*0.7*t)
    return b*env*mod*3*peak
def chug(d):  # train chug + rail clicks
    n=int(d*SR);t=np.arange(n)/SR;s=np.zeros(n);x=rng.uniform(-1,1,n);nb=lp(x,0.05)
    for k in np.arange(0,d,0.42):
        i=int(k*SR);m=min(int(0.18*SR),n-i)
        if m>0:s[i:i+m]+=nb[i:i+m]*np.exp(-np.arange(m)/SR/0.05)*2.5
    for k in np.arange(0.2,d,1.1):
        i=int(k*SR);m=min(int(0.03*SR),n-i)
        if m>0:s[i:i+m]+=np.sin(2*np.pi*900*np.arange(m)/SR)*np.exp(-np.arange(m)/SR/0.006)*0.6
    return s*np.minimum(1,t/0.4)*np.minimum(1,(d-t)/0.6)
def whistle(d=1.2):
    n=int(d*SR);t=np.arange(n)/SR
    return sum(np.sin(2*np.pi*f*t) for f in(660,830,990))*0.25*np.minimum(1,t/0.08)*np.minimum(1,(d-t)/0.2)
def swish():  # bat swing air
    n=int(0.28*SR);t=np.arange(n)/SR;x=rng.uniform(-1,1,n)
    return (lp(x,0.35)-lp(x,0.08))*np.sin(np.pi*t/0.28)**2*1.4
def clock():
    n=int(0.05*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*3000*t)*np.exp(-t/0.004)*0.5
for c in cues.split(';'):
    if not c:continue
    k,a=c.split('@');a=[float(v) for v in a.split(',')];t=a[0]
    if k=='crack':add(swish(),t-0.18,0.5);add(crack(),t,1.0)
    elif k=='crowd':add(crowd(a[1],a[2] if len(a)>2 else 1),t,0.8)
    elif k=='chug':add(chug(a[1]),t,0.7)
    elif k=='whistle':add(whistle(),t,0.5)
    elif k=='swish':add(swish(),t,0.7)
    elif k=='clock':
        tt=t
        while tt<t+a[1]:add(clock(),tt,0.6);tt+=0.5
L=L/(np.abs(L).max()+1e-9)*0.9
w=wave.open(out,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((L*32767).astype(np.int16).tobytes());w.close();print('sfx2 ok')
