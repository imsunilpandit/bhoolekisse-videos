import json,subprocess,numpy as np,wave
segs=[(0,3.60),(4.13,6.91),(7.22,9.16),(9.74,12.07),(12.39,13.35),(13.74,14.44),(14.75,15.99),(16.57,19.06),(19.62,20.52),(20.91,22.74),(23.19,24.87),(25.45,26.62),(27.02,28.60),(29.15,32.37),(32.74,34.84),(35.45,38.28),(38.87,40.00),(40.43,41.38),(41.71,44.03),(44.53,45.45),(45.78,50.05)]
texts=["इस मंदिर के दरवाज़े... साल में सिर्फ एक बार खुलते हैं!","कर्नाटक के हासन में हसनाम्बा देवी का मंदिर,","दिवाली पर बस बारह दिन खुलता है।","बंद करने से पहले अंदर रखा जाता है...","घी का एक दीया,","ताज़े फूल,","और दो बोरी चावल।","फिर दरवाज़े पूरे एक साल के लिए बंद।","भक्त कहते हैं,","अगले साल जब दरवाज़ा खुलता है...","दीया तब भी जल रहा होता है!","फूल ताज़े मिलते हैं...","और चावल खराब नहीं होता।","कहते हैं, देवी के गहने चुराने आए चार चोर...","आज भी पत्थर बनकर वहीं खड़े हैं।","इस साल ग्यारह नवंबर को दरवाज़े फिर बंद हो गए।","पर सवाल ये है...","बंद कमरे में,","एक दीया पूरे साल कैसे जल सकता है?","आपको क्या लगता है?","कमेंट में बताइए... और ऐसे ही भूले किस्सों के लिए, अभी सब्सक्राइब करें!"]
line_of=[0,1,1,2,2,2,2,3,4,4,4,5,5,6,6,7,8,8,8,9,9]
SR=44100;T=1.08
subprocess.run(["ffmpeg","-y","-v","error","-i","voice_raw.mp3","-ac","1","-ar",str(SR),"raw.wav"],check=True)
w=wave.open("raw.wav");x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32);w.close()
out=[];pos=0.0;segtimes=[]
for i,(a,b) in enumerate(segs):
    if i>0: g=0.32 if line_of[i]!=line_of[i-1] else 0.16; out.append(np.zeros(int(g*SR)));pos+=g
    a=max(0,a-0.06);b=b+0.06;c=x[int(a*SR):int(b*SR)].copy();n=int(0.01*SR);c[:n]*=np.linspace(0,1,n);c[-n:]*=np.linspace(1,0,n)
    out.append(c);segtimes.append((pos+0.06,pos+len(c)/SR-0.06));pos+=len(c)/SR
y=np.concatenate(out+[np.zeros(int(0.3*SR))])
w=wave.open("cat.wav","wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(np.clip(y,-32767,32767).astype(np.int16).tobytes());w.close()
subprocess.run(["ffmpeg","-y","-v","error","-i","cat.wav","-af",f"atempo={T},highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,loudnorm=I=-15:TP=-2","-ar",str(SR),"voice.wav"],check=True)
words=[]
for i,(s,e) in enumerate(segtimes):
    s/=T;e/=T;ws=texts[i].split();L=[len(q.strip('.,!?।')) +1 for q in ws];tot=sum(L);t=s
    for q,l in zip(ws,L):
        d=(e-s)*l/tot;words.append({"w":q,"s":round(t,3),"e":round(t+d,3),"line":line_of[i]});t+=d
lines=[]
for L in range(10):
    ww=[q for q in words if q["line"]==L];lines.append({"s":ww[0]["s"],"e":ww[-1]["e"]})
w=wave.open("voice.wav");v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768;sr=w.getframerate();w.close()
dur=len(v)/sr;hop=sr//30;rms=[float(np.sqrt(np.mean(v[i:i+hop]**2))) for i in range(0,len(v)-hop,hop)];m=max(rms)
json.dump({"dur":dur,"words":words,"lines":lines,"rms":[round(r/m,3) for r in rms]},open("timing.json","w"),ensure_ascii=False)
print(dur);[print(L,round(l["s"],2),round(l["e"],2)) for L,l in enumerate(lines)]
