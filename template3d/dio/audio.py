import json,numpy as np,wave,sys
SR=44100;E=json.load(open('events.json'));T=E['T'];DUR=T['end']
V=sys.argv[1] if len(sys.argv)>1 else '1'
CFG={'1':dict(roots=(57,60,62),bpm=(80,92,86),seed=3,bed=0,tab=1.0),
     '2':dict(roots=(52,55,57),bpm=(70,82,80),seed=5,bed=1,tab=.6),
     '3':dict(roots=(55,58,60),bpm=(88,98,92),seed=7,bed=0,tab=1.35),
     '4':dict(roots=(50,53,55),bpm=(78,90,86),seed=11,bed=.6,tab=1.1)}[V]
N=int(SR*DUR);rng=np.random.default_rng(CFG['seed'])
M=np.zeros((N,2));S=np.zeros((N,2))
def add(buf,s,t,g=1.,pan=0.):
    i=int(t*SR)
    if i>=N or i<0:return
    n=min(len(s),N-i);buf[i:i+n,0]+=s[:n]*g*(1-pan*.5);buf[i:i+n,1]+=s[:n]*g*(1+pan*.5)
def env(n,a,d):tt=np.arange(n)/SR;return np.clip(tt/max(a,1e-4),0,1)*np.exp(-tt/d)
def lp(x,a):
    from scipy.signal import lfilter
    return lfilter([a],[1,a-1],x)
def bp(x,lo,hi):
    from scipy.signal import butter,sosfilt
    return sosfilt(butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
midi=lambda m:440*2**((m-69)/12)
# ---------------- music ----------------
def marimba(f,d=.6):
    n=int(d*SR);tt=np.arange(n)/SR
    return (np.sin(2*np.pi*f*tt)+.35*np.sin(2*np.pi*f*4*tt)*np.exp(-tt*30))*env(n,.002,.22)
def pizz(f,d=.4):
    n=int(d*SR);tt=np.arange(n)/SR;return sum(np.sin(2*np.pi*f*k*tt)/k**1.5 for k in range(1,6))*env(n,.003,.09)
def bass(f,d=.5):
    n=int(d*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*f*tt)*env(n,.01,.25)
def pad(fs,d):
    n=int(d*SR);tt=np.arange(n)/SR;s=sum(np.sin(2*np.pi*f*tt+np.sin(2*np.pi*.3*tt))*.5+np.sin(2*np.pi*f*1.003*tt)*.5 for f in fs)
    e=np.minimum(1,np.minimum(tt/.8,(d-tt)/.8));return lp(s,.06)*np.clip(e,0,1)
def tabla_dha():
    n=int(.3*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*(80+70*np.exp(-tt*20))*tt)*np.exp(-tt/.1)
def tabla_na():
    n=int(.1*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*700*tt)*np.exp(-tt/.025)*.5+rng.uniform(-1,1,n)*np.exp(-tt/.008)*.12
secs=[(0,T['raaz'],'myst',CFG['bpm'][0]),(T['raaz'],T['outro'],'play',CFG['bpm'][1]),(T['outro'],DUR,'lift',CFG['bpm'][2])]
for a,b,mood,bpm in secs:
    beat=60/bpm;root={'myst':CFG['roots'][0],'play':CFG['roots'][1],'lift':CFG['roots'][2]}[mood]
    scale=[0,2,4,7,9,12,14,16] if mood!='myst' else [0,2,3,7,8,12,14,15]
    prog=[[0,4,7],[5,9,12],[-3,0,4],[7,11,14]] if mood!='myst' else [[0,3,7],[-4,0,3],[-2,2,5],[-5,-1,2]]
    bar=beat*4;k=0;t=a
    while t<b-.05:
        ch=prog[(k//1)%4];L=min(bar,b-t)
        add(M,pad([midi(root-12+i) for i in ch],L+.4)*.045,t)
        for j in range(4):
            tb=t+j*beat
            if tb>=b:break
            add(M,bass(midi(root-24+ch[0]),beat*.9)*.20,tb)
            if mood!='myst' or j%2==0:add(M,tabla_dha()*.13*CFG['tab'],tb)
            add(M,tabla_na()*.06*CFG['tab'],tb+beat/2,pan=.4)
        # melody
        mel=[0,2,4,2,5,4,2,1] if mood!='myst' else [4,3,1,0,1,3,2,0]
        for j,dg in enumerate(mel):
            tb=t+j*beat/2
            if tb>=b or (j+k)%4==3:continue
            f=midi(root+12+scale[(dg+(k%2))%len(scale)])
            add(M,(marimba(f) if mood!='myst' else pizz(f,.5))*(.09 if mood!='myst' else .08),tb,pan=(j%2-.5)*.5)
        t+=bar;k+=1
fade=np.ones(N);tt=np.arange(N)/SR;fade*=np.clip(tt/.4,0,1)*np.clip((DUR-tt)/1.2,0,1)
# dip music around section changes slightly (breath)
sea=lp(rng.uniform(-1,1,N),.012)*1.4;sea*= (0.6+0.4*np.sin(2*np.pi*tt/7.0))
M[:,0]+=sea*.05*CFG['bed'];M[:,1]+=np.roll(sea,400)*.05*CFG['bed']
M*=fade[:,None]
# ---------------- SFX ----------------
noise=lambda n:rng.uniform(-1,1,n)
def s_pop():
    n=int(.13*SR);tt=np.arange(n)/SR;f=bp(noise(n),900,3500)*np.exp(-tt/.025)
    th=np.sin(2*np.pi*(140+90*np.exp(-tt*40))*tt)*np.exp(-tt/.05)*.8;return (f*.7+th)*.9
def s_slap():
    n=int(.09*SR);tt=np.arange(n)/SR;return bp(noise(n),1200,5000)*np.exp(-tt/.012)*.9+np.sin(2*np.pi*220*tt)*np.exp(-tt/.02)*.4
def s_tick():
    n=int(.06*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*1500*tt)*np.exp(-tt/.012)*.35
def s_tape():
    n=int(.28*SR);tt=np.arange(n)/SR;return bp(noise(n),1500,6000)*np.exp(-tt/.06)*(1+.6*np.sin(2*np.pi*60*tt))*.6+np.sin(2*np.pi*120*tt)*np.exp(-tt/.04)*.5
def s_rip():
    n=int(.35*SR);tt=np.arange(n)/SR;g=(rng.uniform(0,1,n)>.6)*1.;return bp(noise(n)*g,1800,7000)*np.minimum(1,tt/.05)*np.exp(-tt/.15)*.7
def s_page():
    n=int(.55*SR);tt=np.arange(n)/SR;e=np.sin(np.pi*np.clip(tt/.5,0,1))**2;return bp(noise(n),400,4000)*e*.45
def s_whoosh():
    n=int(.5*SR);tt=np.arange(n)/SR;e=np.sin(np.pi*np.clip(tt/.48,0,1))**3;x=noise(n);return lp(x,.08)*e*1.6
def s_splash():
    n=int(.6*SR);tt=np.arange(n)/SR;s=bp(noise(n),300,2500)*np.exp(-tt/.15)*.7
    for k in range(5):s+=np.sin(2*np.pi*(600+k*230)*tt*(1+tt*2))*np.exp(-(tt-.05*k)**2/.0008)*.15
    return s
def s_scribble():
    n=int(.55*SR);tt=np.arange(n)/SR;return bp(noise(n),2000,6000)*(.5+.5*np.sin(2*np.pi*9*tt))*np.minimum(1,(.55-tt)/.1)*.3
def s_riser():
    n=int(1.2*SR);tt=np.arange(n)/SR;return bp(noise(n),300,5000)*(tt/1.2)**2*.45+np.sin(2*np.pi*(200+400*tt)*tt)*(tt/1.2)**2*.12
def s_rumble():
    n=int(2.8*SR);tt=np.arange(n)/SR;e=np.sin(np.pi*np.clip(tt/2.8,0,1));return lp(noise(n),.004)*e*9+np.sin(2*np.pi*42*tt)*e*.35
def s_stamp():
    n=int(.4*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*(90+60*np.exp(-tt*30))*tt)*np.exp(-tt/.12)+bp(noise(n),500,3000)*np.exp(-tt/.02)*.6
def s_fold():
    return np.concatenate([s_pop()*.6 for _ in range(1)])
def s_flip():
    n=int(.25*SR);tt=np.arange(n)/SR;return bp(noise(n),800,5000)*np.sin(np.pi*np.clip(tt/.25,0,1))**2*.5
def s_fire():
    n=int(2.6*SR);tt=np.arange(n)/SR;cr=(rng.uniform(0,1,n)>.9985)*rng.uniform(.3,1,n);s=lp(noise(n),.03)*.6+bp(cr,1000,6000)*3
    return s*np.minimum(1,np.minimum(tt/.3,(2.6-tt)/.5))*.6
def s_sparkle():
    n=int(1.*SR);tt=np.arange(n)/SR;s=np.zeros(n)
    for k in range(7):
        st=k*.09;f=midi(84+[0,4,7,12,16,19,24][k]);m=tt>=st;s[m]+=np.sin(2*np.pi*f*(tt[m]-st))*np.exp(-(tt[m]-st)/.18)*.18
    return s
def s_book():
    n=int(1.4*SR);tt=np.arange(n)/SR;cr=bp(noise(n),300,1200)*(.5+.5*np.sin(2*np.pi*14*tt))*np.exp(-tt/.4)*.4
    sw=pad([midi(60),midi(64),midi(67),midi(72)],1.4)*.25;return cr+sw
def s_bell():
    n=int(1.*SR);tt=np.arange(n)/SR;return (np.sin(2*np.pi*1046*tt)+.5*np.sin(2*np.pi*1568*tt))*np.exp(-tt/.25)*.25
def s_stone():
    n=int(.3*SR);tt=np.arange(n)/SR;k=np.sin(2*np.pi*(110+50*np.exp(-tt*35))*tt)*np.exp(-tt/.07)
    return k*.9+bp(noise(n),600,3000)*np.exp(-tt/.03)*.5+bp(noise(n),2500,7000)*np.exp(-tt/.012)*.25
def s_flap():
    n=int(.16*SR);tt=np.arange(n)/SR;e=np.sin(np.pi*np.clip(tt/.15,0,1))**2
    return bp(noise(n),700,4200)*e*.55+np.sin(2*np.pi*(180+60*np.exp(-tt*30))*tt)*np.exp(-tt/.04)*.35
def s_click():
    n=int(.08*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*2200*tt)*np.exp(-tt/.006)*.6+bp(noise(n),2000,6000)*np.exp(-tt/.004)*.4
def s_wave():
    n=int(1.8*SR);tt=np.arange(n)/SR;e=np.sin(np.pi*np.clip(tt/1.75,0,1))**1.5
    return lp(noise(n),.05)*e*2.2+bp(noise(n),300,1800)*e*.35
def s_rewind():
    n=int(1.4*SR);tt=np.arange(n)/SR;e=np.sin(np.pi*np.clip(tt/1.35,0,1))
    return (bp(noise(n),500,4000)*.5+np.sin(2*np.pi*(150+500*tt**2)*tt)*.18)*e
def s_shankh():
    n=int(2.0*SR);tt=np.arange(n)/SR;f=233*(1+.006*np.sin(2*np.pi*5*tt));e=np.clip(tt/.35,0,1)*np.clip((2.0-tt)/.6,0,1)
    s=sum((1/k**1.3)*np.sin(2*np.pi*f*k*tt) for k in range(1,7));return lp(s,.25)*e*.5
def s_boom():
    n=int(1.6*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*(42+50*np.exp(-tt*5))*tt)*np.exp(-tt/.55)*1.1+lp(noise(n),.02)*np.exp(-tt/.3)*1.5
def s_pull():
    n=int(1.3*SR);tt=np.arange(n)/SR;e=np.clip(tt/1.2,0,1)**2*np.clip((1.3-tt)/.1,0,1)
    return (np.sin(2*np.pi*(180+320*tt)*tt)*.3+bp(noise(n),400,2500)*.4)*e
def s_swell():
    n=int(2.2*SR);tt=np.arange(n)/SR;e=np.sin(np.pi*np.clip(tt/2.1,0,1))**2
    return pad([midi(57),midi(64),midi(69)],2.2)*e*.8
FX={'wave':(s_wave,.5),'rewind':(s_rewind,.45),'shankh':(s_shankh,.5),'boom':(s_boom,.6),'pull':(s_pull,.45),'swell':(s_swell,.5),'click':(s_click,.45),'flap':(s_flap,.42),'stone':(s_stone,.5),'pop':(s_pop,.45),'slap':(s_slap,.38),'tick':(s_tick,.16),'tape':(s_tape,.4),'rip':(s_rip,.4),'page':(s_page,.5),'whoosh':(s_whoosh,.4),
 'splash':(s_splash,.5),'scribble':(s_scribble,.4),'riser':(s_riser,.4),'rumble':(s_rumble,.55),'stamp':(s_stamp,.55),'fold':(s_fold,.4),
 'flip':(s_flip,.45),'fire':(s_fire,.35),'sparkle':(s_sparkle,.45),'book':(s_book,.5),'bell':(s_bell,.25)}
for i,e in enumerate(E['ev']):
    fn,g=FX[e['type']];s=fn();gg=g*e['v']*(.85+.3*rng.uniform())
    add(S,s,e['t'],gg,pan=(rng.uniform()-.5)*.6)
def wr(fn,a):
    a=a/(np.abs(a).max()+1e-9)*.9 if np.abs(a).max()>1 else a
    w=wave.open(fn,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(a,-1,1)*32767).astype(np.int16).tobytes());w.close()
wr('music.wav',M);wr('sfx.wav',S);print('ok',DUR)
