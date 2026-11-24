import json,subprocess,numpy as np,wave
segs=[(0,2.23),(2.85,4.19),(4.81,9.66),(10.02,10.92),(11.51,14.49),(15.09,15.59),(15.95,21.40),(21.70,24.44),(25.04,25.83),(26.29,29.46),(30.15,34.79),(35.39,36.45),(37.13,39.76),(40.29,41.25),(41.61,45.92)]
texts=["पाँच सौ साल पुराना ये खंभा...","ज़मीन को छूता ही नहीं!","आंध्र प्रदेश के लेपाक्षी में, वीरभद्र मंदिर के सत्तर खंभों में से एक...","हवा में लटका है।","लोग इसके नीचे से, कपड़ा आर-पार निकाल देते हैं।","कहते हैं,","उन्नीस सौ दो में एक अंग्रेज़ इंजीनियर ने, इसका राज़ जानने के लिए इसे हिलाने की कोशिश की...","और तभी... आसपास के खंभे भी खिसक गए!","तब समझ आया...","पूरी छत का संतुलन, शायद इसी खंभे से जुड़ा है।","कुछ जानकार कहते हैं, ये बनाते वक्त की चूक या भूकंप का असर हो सकता है।","पर सवाल वही है...","पाँच सौ साल से ये खंभा, टिका कैसे है?","आपको क्या लगता है?","कमेंट में बताइए... और ऐसे ही भूले किस्सों के लिए, अभी सब्सक्राइब करें!"]
line_of=[0,0,1,1,2,3,3,4,5,5,6,7,7,8,8]
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
for L in range(9):
    ww=[q for q in words if q["line"]==L];lines.append({"s":ww[0]["s"],"e":ww[-1]["e"]})
w=wave.open("voice.wav");v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768;sr=w.getframerate();w.close()
dur=len(v)/sr;hop=sr//30;rms=[float(np.sqrt(np.mean(v[i:i+hop]**2))) for i in range(0,len(v)-hop,hop)];m=max(rms)
json.dump({"dur":dur,"words":words,"lines":lines,"rms":[round(r/m,3) for r in rms]},open("timing.json","w"),ensure_ascii=False)
print(dur);[print(L,round(l["s"],2),round(l["e"],2)) for L,l in enumerate(lines)]
