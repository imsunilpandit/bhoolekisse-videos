import json,subprocess,numpy as np,wave
segs=[(0.0,1.32),(1.71,3.75),(4.31,8.44),(9.03,9.77),(10.10,12.16),(12.55,13.51),(13.85,14.78),(15.46,17.16),(17.59,18.79),(19.29,23.50),(23.99,28.48),(29.08,33.08),(33.55,35.58),(36.18,37.39),(37.75,40.51),(40.99,42.23),(42.81,43.67),(44.10,44.91),(45.34,48.62)]
texts=["पैंतीस मिनट में...","बाईस हज़ार कागज़ की नावें!","ये गिनीज़ रिकॉर्ड बना ओडिशा के कटक में, बाली जात्रा मेले पर।","और आज से,","यही बाली जात्रा फिर शुरू हुई है...","महानदी किनारे,","पूरे आठ दिन।","पर इसका नाम बाली क्यों?","इंडोनेशिया वाला बाली!","क्योंकि सदियों पहले ओडिशा के व्यापारी, जिन्हें साधब कहते थे...","बड़ी नावों में बाली, जावा, सुमात्रा और बोर्नियो तक जाते थे।","उनकी याद में लोग आज भी... नदी में छोटी-छोटी नावें बहाते हैं।","इसे कहते हैं, बोइता बंदाण।","पर सवाल ये है...","बिना इंजन के, इतना बड़ा समंदर...","वो कैसे पार करते थे?","आपको क्या लगता है?","कमेंट में बताइए...","और ऐसे ही भूले किस्सों के लिए, अभी सब्सक्राइब करें!"]
line_of=[0,0,1,2,2,2,2,3,3,4,5,6,6,7,7,7,8,8,8]
SR=44100;T=1.03  # keep the tone: light speed-up only
subprocess.run(["ffmpeg","-y","-v","error","-i","voice_raw.mp3","-ac","1","-ar",str(SR),"raw.wav"],check=True)
w=wave.open("raw.wav");x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32);w.close()
out=[];pos=0.0;segtimes=[]
for i,(a,b) in enumerate(segs):
    if i>0: g=0.42 if line_of[i]!=line_of[i-1] else 0.22; out.append(np.zeros(int(g*SR)));pos+=g
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
for L in range(9):
    ww=[q for q in words if q["line"]==L];lines.append({"s":ww[0]["s"],"e":ww[-1]["e"]})
w=wave.open("voice.wav");v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768;sr=w.getframerate();w.close()
dur=len(v)/sr;hop=sr//30;rms=[float(np.sqrt(np.mean(v[i:i+hop]**2))) for i in range(0,len(v)-hop,hop)];m=max(rms)
json.dump({"dur":dur,"words":words,"lines":lines,"rms":[round(r/m,3) for r in rms]},open("timing.json","w"),ensure_ascii=False)
print(dur);[print(L,round(l["s"],2),round(l["e"],2)) for L,l in enumerate(lines)]
