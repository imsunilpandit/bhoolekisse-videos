import json,subprocess,re,numpy as np
P=[l.split('|') for l in """गुजरात के एक मंदिर में...|हनुमान जी के पैरों के नीचे,|एक स्त्री है।
और कहते हैं...|वो स्त्री कोई और नहीं,|खुद शनिदेव हैं!
ये है बोटाद ज़िले का सारंगपुर...|कष्टभंजन देव हनुमान मंदिर।|कष्टभंजन,|यानी दुखों को तोड़ने वाले।
संवत उन्नीस सौ पाँच में,|संत गोपालानंद स्वामी ने यहाँ ये मूर्ति स्थापित की।
पर सवाल ये है...|जिन शनिदेव से दुनिया डरती है,|वो स्त्री बनकर हनुमान जी के चरणों में क्यों हैं?
क्या आपको पता है?|कमेंट में लिखिए...|और अब सुनिए असली राज़।
कथा कहती है,|शनिदेव का क्रोध धरती पर कहर बन गया।|भक्तों की पुकार पर,|हनुमान जी उन्हें दंड देने निकले।
शनिदेव जानते थे...|हनुमान जी बाल ब्रह्मचारी हैं।|वो किसी स्त्री पर हाथ नहीं उठाएँगे।
इसलिए शनिदेव ने स्त्री रूप धरा...|और चरणों में गिरकर क्षमा माँगी।|हनुमान जी ने उन्हें माफ़ कर दिया।
इसीलिए मान्यता है,|यहाँ दर्शन से शनि की पीड़ा कम होती है।
और दो हज़ार तेईस में यहाँ चौवन फीट ऊँची,|तीस हज़ार किलो की पंचधातु प्रतिमा बनी...|जो सात किलोमीटर दूर से दिखती है।
क्या आपको ये पहले से पता था?|कमेंट में बताइए...|और ऐसे ही भूले किस्सों के लिए,|अभी सब्सक्राइब करें!""".split('\n')]
ph=[];line=[]
for i,l in enumerate(P):
    for q in l: ph.append(q);line.append(i)
out=subprocess.run("ffmpeg -i voice_raw.mp3 -af silencedetect=noise=-38dB:d=0.3 -f null -",shell=True,capture_output=True,text=True).stderr
ss=[float(v) for v in re.findall(r'silence_start: ([\d.]+)',out)];se=[float(v) for v in re.findall(r'silence_end: ([\d.]+)',out)]
dur=78.68
segs=[];a=0.0
for s,e in zip(ss,se):
    if s-a>0.05: segs.append((a,s))
    a=e
segs.append((a,dur))
segs=[(max(0,s),e) for s,e in segs]
# first segment may start with leading silence; trim leading via onset
c=np.array([len(re.sub(r'[^ऀ-ॿ\w]','',q)) for q in ph],float)
S=np.array([e-s for s,e in segs]);n,m=len(ph),len(segs)
k=S.sum()/c.sum()
INF=1e18;D=np.full((n+1,m+1),INF);B=np.zeros((n+1,m+1),int);D[0,0]=0
for j in range(1,m+1):
    for i in range(1,n+1):
        for p in range(max(0,i-4),i):
            if D[p,j-1]<INF:
                cost=D[p,j-1]+(S[j-1]-k*c[p:i].sum())**2
                if cost<D[i,j]:D[i,j]=cost;B[i,j]=p
i=n;groups=[]
for j in range(m,0,-1):
    p=B[i,j];groups.append((p,i));i=p
groups=groups[::-1]
res=[]
for (p,i),(s,e) in zip(groups,segs):
    res.append({"s":s,"e":e,"text":" ".join(ph[p:i]),"lines":sorted(set(line[p:i]))})
    print(f"{s:6.2f}-{e:6.2f} {S[len(res)-1]:.2f} vs {k*c[p:i].sum():.2f} L{line[p]} {' '.join(ph[p:i])}")
json.dump(res,open('segs.json','w'),ensure_ascii=False)
