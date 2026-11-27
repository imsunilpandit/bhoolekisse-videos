import os,re,subprocess,json,sys
vid,script,raw,out=sys.argv[1:5];TEMPO=1.07
txt=open(script).read()
lines=[re.sub(r'\[[^\]]+\]','',l).strip() for l in txt.split('\n') if l.strip()]
ph=[];lend=[]
for l in lines:
    ps=[p.strip() for p in re.split(r'(?<=[,।!?])\s+|\.\.\.\s*',l) if p.strip()]
    ps=[p for p in ps if re.search(r'[ऀ-ॿ]',p)]
    ph+=ps;lend.append(len(ph)-1)
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',raw]))
def det(d):
    o=subprocess.run(['ffmpeg','-i',raw,'-af','silencedetect=noise=-36dB:d=%s'%d,'-f','null','-'],capture_output=True,text=True).stderr
    ss=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',o)];se=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',o)]
    ch=[];cur=0
    for a,b in zip(ss,se):
        if a>cur+.05:ch.append((cur,a))
        cur=b
    if cur<dur-.1:ch.append((cur,dur))
    return ch
chunks=det(os.environ.get('SD_D','0.13'));CT=det(0.25)
L=lambda p:len(re.sub(r'[^ऀ-ॿ\w]','',p))
rate=sum(b-a for a,b in chunks)/sum(L(p) for p in ph)
n,m=len(ph),len(chunks);INF=1e18
D=[[INF]*(m+1) for _ in range(n+1)];B=[[None]*(m+1) for _ in range(n+1)];D[0][0]=0
for i in range(n+1):
  for j in range(m+1):
    if D[i][j]>=INF:continue
    for di in (1,2,3):
      for dj in (1,2,3):
        if i+di>n or j+dj>m or (di>1 and dj>1):continue
        c=sum(L(p) for p in ph[i:i+di])*rate;d=sum(b-a for a,b in chunks[j:j+dj])
        cost=D[i][j]+(c-d)**2/(max(d,.3))+(0.15 if di+dj>2 else 0)
        if cost<D[i+di][j+dj]:D[i+di][j+dj]=cost;B[i+di][j+dj]=(i,j)
i,j=n,m;groups=[]
while (i,j)!=(0,0):
    pi,pj=B[i][j];groups.append((pi,i,pj,j));i,j=pi,pj
groups.reverse();res=[]
for pi,i2,pj,j2 in groups:
    st,en=chunks[pj][0],chunks[j2-1][1]
    if i2-pi==1:res.append([ph[pi],st,en])
    else:
        tc=sum(L(p) for p in ph[pi:i2]);t=st
        for p in ph[pi:i2]:
            d=(en-st)*L(p)/tc;res.append([p,t,t+d]);t+=d
LB=[res[k][2] for k in lend]
sp=[[max(0,a-.06),min(dur,b+.06)] for a,b in CT]
mp=[];t=0
for k,(a,b) in enumerate(sp):
    if k>0:
        pe=CT[k-1][1]
        t+=0.34 if any(abs(pe-lb)<.12 for lb in LB) else 0.17
    mp.append((a,b,t));t+=b-a
fl=''.join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,adelay={int(nt*1000)}|{int(nt*1000)}[s{k}];" for k,(a,b,nt) in enumerate(mp))
fl+=''.join(f'[s{k}]' for k in range(len(mp)))+f"amix=inputs={len(mp)}:normalize=0:duration=longest,atempo={TEMPO},aresample=44100[o]"
subprocess.run(['ffmpeg','-y','-v','error','-i',raw,'-filter_complex',fl,'-map','[o]','-ac','2',out+'/voice_tight.wav'],check=True)
def conv(x):
    for a,b,nt in mp:
        if x<=b+.01:return (nt+max(0,x-a))/TEMPO
    return t/TEMPO
cues=[[p,round(conv(a),3),round(conv(b),3)] for p,a,b in res]
lines_t=[cues[k][2] for k in lend]
json.dump({'phrases':cues,'line_end_idx':lend,'total':round(t/TEMPO,3)},open(out+'/cues.json','w'),ensure_ascii=False,indent=0)
for k,(p,a,b) in enumerate(cues):print(k,f"{a:6.2f}{'*' if k in lend else ' '}",p)
print(vid,'phrases',n,'chunks',m,'total',round(t/TEMPO,2))
