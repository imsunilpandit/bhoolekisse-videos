import json,subprocess,numpy as np,wave
segs=[(0, 2.29), (2.62, 4.03), (4.62, 8.09), (8.7, 10.45), (10.81, 12.98), (13.6, 17.23), (17.88, 20.64), (21.29, 25.45), (25.96, 26.97), (27.56, 29.27), (29.78, 31.24), (31.66, 34.28), (34.77, 35.6), (35.9, 39.31), (39.82, 41.94), (42.48, 43.7), (44.21, 47.36), (47.86, 48.73), (49.14, 49.99), (50.33, 52.09), (52.43, 53.6)]
texts=["सृष्टि बनाने वाले ब्रह्मा जी के...", "मंदिर गिनती के क्यों हैं?", "राजस्थान के पुष्कर में है उनका सबसे मशहूर मंदिर,", "और आज कार्तिक पूर्णिमा पर,", "यहीं होता है सबसे बड़ा स्नान।", "कहते हैं, ब्रह्मा जी ने पुष्कर में एक महायज्ञ रखा।", "पर उनकी पत्नी सावित्री, समय पर नहीं पहुँचीं।", "मुहूर्त न निकल जाए, इसलिए ब्रह्मा जी ने गायत्री से विवाह कर लिया।", "सावित्री लौटीं...", "और गुस्से में श्राप दे दिया!", "कहते हैं, श्राप था...", "ब्रह्मा जी की पूजा, सिर्फ पुष्कर में होगी।", "और आज भी,", "शादीशुदा पुरुष इस मंदिर के गर्भगृह में नहीं जाते,", "वहाँ पूजा सिर्फ संन्यासी करते हैं।", "पर सवाल ये है...", "क्या एक श्राप, सदियों तक नियम बन सकता है?", "आपको क्या लगता है?", "कमेंट में बताइए...", "और ऐसे ही भूले किस्सों के लिए,", "अभी सब्सक्राइब करें!"]
line_of=[0, 0, 1, 1, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 9]
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
