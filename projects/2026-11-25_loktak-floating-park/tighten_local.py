import json,subprocess,numpy as np,wave
segs=json.load(open('segs.json'))
SR=44100;T=1.08
subprocess.run(["ffmpeg","-y","-v","error","-i","voice_raw.mp3","-ac","1","-ar",str(SR),"raw.wav"],check=True)
w=wave.open("raw.wav");x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32);w.close()
# trim trailing silence of last segment
env=np.abs(x);thr=10**(-38/20)*32768
nz=np.where(env>thr)[0];last=nz[-1]/SR
segs[-1]['e']=min(segs[-1]['e'],last+0.05)
out=[];pos=0.0;st=[]
for i,g in enumerate(segs):
    if i>0:
        gap=0.32 if g['lines'][0]!=segs[i-1]['lines'][-1] else 0.16
        out.append(np.zeros(int(gap*SR)));pos+=gap
    a=max(0,g['s']-0.06);b=g['e']+0.06;c=x[int(a*SR):int(b*SR)].copy();n=int(0.01*SR);c[:n]*=np.linspace(0,1,n);c[-n:]*=np.linspace(1,0,n)
    out.append(c);st.append((pos+0.06,pos+len(c)/SR-0.06));pos+=len(c)/SR
y=np.concatenate(out+[np.zeros(int(0.3*SR))])
w=wave.open("cat.wav","wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(np.clip(y,-32767,32767).astype(np.int16).tobytes());w.close()
subprocess.run(["ffmpeg","-y","-v","error","-i","cat.wav","-af",f"atempo={T},highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-15:TP=-2","-ar",str(SR),"voice.wav"],check=True)
# words with line ids (line by phrase membership: recompute by splitting text, assign line via phrase table)
import importlib.util
P=open('phrases.txt').read().strip().split('\n')
phr=[];pl=[]
for i,l in enumerate(P):
    for q in l.split('|'): phr+=q.split(); pl+=[i]*len(q.split())
words=[];wi=0
for (s,e),g in zip(st,segs):
    s/=T;e/=T;ws=g['text'].split();L=[len(q.strip('.,!?।'))+1 for q in ws];tot=sum(L);t=s
    for q,l in zip(ws,L):
        d=(e-s)*l/tot;words.append({"w":q,"s":round(t,3),"e":round(t+d,3),"line":pl[wi]});wi+=1;t+=d
lines=[]
for Lx in range(len(P)):
    ww=[q for q in words if q["line"]==Lx];lines.append({"s":ww[0]["s"],"e":ww[-1]["e"]})
w=wave.open("voice.wav");v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768;sr=w.getframerate();w.close()
dur=len(v)/sr
json.dump({"dur":dur,"words":words,"lines":lines},open("timing.json","w"),ensure_ascii=False)
print(round(dur,2));[print(i,round(l["s"],2),round(l["e"],2)) for i,l in enumerate(lines)]
