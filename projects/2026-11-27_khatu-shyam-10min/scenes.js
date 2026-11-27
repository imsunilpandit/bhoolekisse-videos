// scenes.js — हारे का सहारा (16:9, ~9.5 min)
let TNOW=0;const GY=985;let RY=0;
function Tm(sub,from=0){for(let i=0;i<CUES.length;i++){const p=CUES[i];if(p[1]<from-1e-3)continue;const j=p[0]+' '+((CUES[i+1]||[''])[0]);if(p[0].includes(sub)||(j.includes(sub)&&p[0].includes(sub.split(' ')[0])&&j.indexOf(sub)<p[0].length))return p[1]}console.log('MISS',sub);return from}
function TEm(sub,from=0){for(const p of CUES){if(p[1]>=from-1e-3&&p[0].includes(sub))return p[2]}return from}
function activePhrase(t){for(const p of CUES){if(t>=p[1]-.05&&t<=p[2]+.15)return p}return null}
function speakingAmp(spk,t){const p=activePhrase(t);if(!p||p[3]!==spk)return 0;const e=ENV[Math.floor(t*30)]||0;return Math.min(1,e*1.25)}
function blinkAuto(t,o=0){const p=(t+o*1.7)%3.3;return p<.12?Math.sin(p/.12*Math.PI):0}
// pose: char key, speaker key, position
function Pz(c,spk,px,dir,s,t,ex={}){const m=speakingAmp(spk,t),talk=m>.05?1:0,br=Math.sin(t*1.8+px)*.03;const P={t,x:px,dir,s,mouth:m,blink:blinkAuto(t,px*.01),look:[1,0],
 upF:.12+br,loF:.28,upN:.1-br,loN:.3,tilt:Math.sin(t*1.3+px)*.02+(talk?Math.sin(t*5)*.025:0),brow:talk?2:0};
 if(talk&&!ex.noGesture){P.upN=.75+Math.sin(t*3)*.12;P.loN=1.15+Math.sin(t*4)*.15;P.hmN='open'}Object.assign(P,ex);return P}
function walkP(lt,t0,t1,x0,x1){const k=cl((lt-t0)/(t1-t0)),on=lt>t0&&lt<t1,ph=(lt-t0)*7.5,amp=on?Math.min(1,(lt-t0)/.3,(t1-lt)/.3):0;return {x:lerp(x0,x1,k),thF:.36*Math.sin(ph)*amp,thN:-.36*Math.sin(ph)*amp,knF:Math.max(0,-Math.sin(ph))*.7*amp,knN:Math.max(0,Math.sin(ph))*.7*amp,bob:Math.abs(Math.sin(ph))*12*amp,sw:Math.sin(ph)*amp}}
function draw(c,spk,px,dir,s,t,ex){return character(Pz(c,spk,px,dir,s,t,ex),CH[c],ex&&ex.gy||GY)}
function cam(z,cx,cy,fn){x.save();x.translate(W/2,H/2);x.scale(z,z);x.translate(-cx,-cy);fn();x.restore()}
function nameTag(n,col){const p=activePhrase(TNOW);if(!p)return}
// ---------------- scenes ----------------
const S=[];function sc(mark,title,f,from){S.push({mark,title,f,from})}
// 1 HOOK — truck
sc('आपने गाड़ियों','',(lt,t,D)=>{plainBG(t,0);cam(1+.05*lt/D,W/2,H/2,()=>{x.fillStyle='#6a6a70';x.fillRect(0,850,W,240);x.strokeStyle='#fff';x.lineWidth=10;x.setLineDash([60,50]);x.beginPath();x.moveTo(0,1000);x.lineTo(W,1000);x.stroke();x.setLineDash([]);
 truckBack(W/2,560+Math.sin(t*8)*3,1,t,lt/.5)});sparkles(W/2,420,500,t,16,.6)});
sc('पर क्या आप जानते','',(lt,t,D)=>{cosmicBG(t,'#1a0a3a','#ff9a2a');const B=draw('barbarik','barbarik',W/2,1,1.0*(1+.04*lt),t,{gy:1080,upF:Math.PI/2,loF:0,post:(hf)=>bow(hf,0,0)});
 x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(30,10,60,'+(.75-.75*cl((lt-1.5)/1.5))+')';x.fillRect(0,0,W,H);x.restore();bigTitle('कौन था?',W/2,200,110,(lt-.4)/.4,'#ffe14a')});
sc('एक ऐसा योद्धा','एक मिनट का योद्धा',(lt,t,D)=>{plainBG(t,1);army(80,880,700,3,'#e8462a','#ffd23a',t);army(1140,880,700,3,'#2a6ad8','#ffffff',t,1,-1);
 draw('barbarik','barbarik',W/2,1,.8,t,{upF:Math.PI/2+.5,loF:0,upN:Math.PI/2+.3,loN:-2.3,post:(hf,hn)=>bow(hf,-.5,1)});
 // clock
 const cx=W/2+420,cy=300,p=cl((lt-1)/.5);if(p>0){x.save();x.translate(cx,cy);x.scale(backE(p),backE(p));x.fillStyle='#fff';x.strokeStyle=INK;x.lineWidth=8;x.beginPath();x.arc(0,0,120,0,6.28);x.fill();x.stroke();const a=cl((lt-1.5)/3)*6.28;x.fillStyle='rgba(232,50,30,.5)';x.beginPath();x.moveTo(0,0);x.arc(0,0,110,-Math.PI/2,-Math.PI/2+a);x.fill();x.lineWidth=6;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(a)*95,-Math.cos(a)*95);x.stroke();x.restore();chip('1 मिनट',cx,cy+170,48,p,'#ffe14a')}});
sc('जिसके पास न कोई','',(lt,t,D)=>{cosmicBG(t,'#0a1a3a','#4ab0ff');cam(1.25,W/2,560,()=>{bow([W/2-60,560],0,0,300);for(let i=0;i<3;i++){const p=cl((lt-.8-i*.5)/.4);if(p<=0)continue;const y=420+i*140;x.save();x.translate(W/2+40,y);x.scale(backE(p),1);x.strokeStyle='#8a5a2a';x.lineWidth=10;x.beginPath();x.moveTo(-260,0);x.lineTo(240,0);x.stroke();x.fillStyle=GOLD2;x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.moveTo(240,-26);x.lineTo(300,0);x.lineTo(240,26);x.closePath();x.fill();x.stroke();x.restore();glowAt(W/2+330,y,90,.7)}});
 chip('न सेना',360,260,52,(lt-.1)/.3,'#fff');chip('न रथ',360,380,52,(lt-.6)/.3,'#fff');chip('3 बाण',1560,820,64,(lt-1.8)/.3,'#ffe14a')});
sc('फिर भी उसने','',(lt,t,D)=>{cosmicBG(t,'#3a0a2a','#ffc85a');petals(t,cl(lt/1));sheesh(W/2,700,1.25,t,cl(lt/1.5));bigTitle('शीश दान',W/2,170,100,(lt-2)/.4,'#ffe14a')});
sc('आज उसी योद्धा','',(lt,t,D)=>{desertBG(t);temple(1500,860,.55,t,1);walkerCrowd(t,850,26,1,true);chip('हर साल लाखों भक्त',560,200,56,(lt-.4)/.3,'#ffe14a');chip('📍 राजस्थान',560,320,46,(lt-1.2)/.3,'#fff')});
sc('ये कहानी है','',(lt,t,D)=>{cosmicBG(t,'#1a0a3a','#ffb84a');sparkles(W/2,450,420,t,30);draw('shyam','x',W/2,1,.92*(1+.03*lt),t,{gy:1070,upN:1.3,loN:1.35,hmN:'open',smile:1});
 bigTitle('बर्बरीक',W/2-520,330,96,(lt-.3)/.4,'#ffffff');bigTitle('= खाटू श्याम',W/2+500,330,96,(lt-1.8)/.4,'#ffe14a')});
sc('तो चलिए','',(lt,t,D)=>{cosmicBG(t,'#2a0a1a','#ff7a2a');bigTitle('हारे का सहारा',W/2,470,190,lt/.5,'#ffe14a');chip('बर्बरीक से खाटू श्याम तक',W/2,660,56,(lt-.6)/.3,'#fff')});
// 2 ORIGINS
sc('कहानी शुरू होती','पांडवों का वनवास',(lt,t,D)=>{forestBG(t);const w=walkP(lt,0,D*.8,-200,700);draw('bhima','x',w.x,1,.78,t,Object.assign({},w,{upN:.5,loN:1.6,post:(hf,hn)=>gada(hn,-.2,.9)}));
 draw('arjuna','x',w.x-260,1,.72,t,Object.assign({},walkP(lt,0,D*.8,-460,440),{upF:Math.PI/2,loF:0,post:(hf)=>bow(hf,0,0)}))});
sc('वन में भीम','भीम और हिडिम्बा',(lt,t,D)=>{forestBG(t);draw('bhima','x',640,1,.8,t,{upN:.5,loN:1.6,post:(hf,hn)=>gada(hn,-.2,.9)});const w=walkP(lt,0,1.6,2100,1260);draw('hidimba','x',w.x,-1,.76,t,Object.assign({},w,{upN:.6,loN:1.4,hmN:'open'}));
 const g=cl((lt-Tm('घटोत्कच',Tm('वन में भीम'))+Tm('वन में भीम')-.2)/.6);if(g>0){x.save();x.globalAlpha=g;draw('ghatotkacha','x',960,1,.95*(.6+.4*backE(g)),t,{gy:1040});x.restore();chip('घटोत्कच',960,140,60,g,'#ffe14a')}});
sc('घटोत्कच का विवाह','विवाह',(lt,t,D)=>{plainBG(t,1);petals(t,.8,30);draw('ghatotkacha','x',760,1,.86,t,{upN:1.2,loN:.6});draw('maurvi','maurvi',1180,-1,.8,t,{upN:1.2,loN:.6,hmN:'open'});
 // garlands
 x.strokeStyle='#ff8a1e';x.lineWidth=14;x.setLineDash([3,16]);x.lineCap='round';[[760,520],[1180,560]].forEach(([gx,gy])=>{x.beginPath();x.arc(gx,gy,60,0,Math.PI);x.stroke()});x.setLineDash([]);chip('माँ मौरवी (अहिलावती)',1180,180,44,(lt-.8)/.3,'#fff')});
sc('और इन्हीं के घर','बर्बरीक का जन्म',(lt,t,D)=>{cosmicBG(t,'#2a0a3a','#ffd27a');sparkles(W/2,520,300,t,40);glowAt(W/2,520,300,.8);const p=cl(lt/1.2);x.save();x.globalAlpha=p;x.translate(W/2,600);x.scale(.5+.5*p,.5+.5*p);head([0,0],{t,mouth:0,blink:blinkAuto(t),look:[.3,0],smile:1},CH.barbarik);x.restore();bigTitle('बर्बरीक',W/2,180,110,(lt-.6)/.4,'#ffe14a')});
sc('यानी बर्बरीक, महाबली','परिवार',(lt,t,D)=>{plainBG(t,0);x.fillStyle='rgba(255,255,255,.55)';x.fillRect(560,80,800,900);familyTree(W/2-120,540,lt/2.2,t)});
sc('कहते हैं, जन्म से','',(lt,t,D)=>{forestBG(t);draw('barbarik','x',780,1,.84,t,{upN:.4,loN:1.8});lion(1340,420,1.1,cl((lt-1.4)/.5));chip('शेर की अयाल जैसे बाल',1340,720,48,(lt-1.8)/.3,'#ffe14a');bigTitle('बर्बर = घने बाल',W/2,140,70,(lt-3.5)/.4,'#fff')});
sc('बचपन से ही बर्बरीक','माँ से शिक्षा',(lt,t,D)=>{forestBG(t);draw('maurvi','maurvi',620,1,.8,t,{upN:1.3,loN:1.3,hmN:'open'});const a=Math.sin(t*3);draw('barbarik','x',1240,-1,.72,t,{upN:1.6+a*.6,loN:.4,upF:Math.PI/2,loF:0,post:(hf,hn)=>{x.save();x.translate(hn[0],hn[1]);x.rotate(-1.2+a*.6);x.fillStyle='#c8ccd8';x.strokeStyle=INK;x.lineWidth=3;x.fillRect(-5,-150,10,150);x.strokeRect(-5,-150,10,150);x.restore()}})});
sc('तलवार, गदा','',(lt,t,D)=>{plainBG(t,0);['sword','gada','bow'].forEach((k,i)=>weaponIcon(k,520+i*440,460,1.4,cl((lt-.3-i*.8)/.35)));chip('हर हथियार में बेजोड़',W/2,800,60,(lt-2.6)/.3,'#ffe14a')});
// 3 TAPASYA + BOONS
sc('पर बर्बरीक सिर्फ़','तपस्या',(lt,t,D)=>{nightBG(t);const sit=1;draw('barbarik','x',W/2,1,.8,t,{upN:1.9,loN:1.3,upF:1.9,loF:1.3,blink:1,thF:1.2,knF:2.4,thN:1.2,knN:2.4,hmN:'open',hmF:'open'});glowAt(W/2,520,260,.3+.2*Math.sin(t*2));
 for(let i=0;i<3;i++){const r=((t*30+i*80)%240)+80;x.strokeStyle=`rgba(255,220,140,${.5*(1-r/320)})`;x.lineWidth=3;x.beginPath();x.ellipse(W/2,960,r*1.6,r*.3,0,0,6.28);x.stroke()}chip('वर्षों की कठोर तपस्या',W/2,150,52,(lt-Tm('मान्यता है, उन्होंने')+Tm('पर बर्बरीक सिर्फ़'))/.3,'#ffe14a')});
sc('उनकी भक्ति से','भगवान शिव का वरदान',(lt,t,D)=>{cosmicBG(t,'#0a1a4a','#9ad8ff');const sp=cl(lt/1);x.save();x.globalAlpha=sp;draw('shiva','x',560,1,.86,t,{upF:.3,loF:.9,post:(hf,hn)=>{trishul(hf,0);for(let i=0;i<3;i++){const p=cl((lt-1.5-i*.3)/.5);const ax=lerp(hn[0],1260,eio(p)),ay=lerp(hn[1],520+i*50,eio(p))-Math.sin(p*Math.PI)*80;x.strokeStyle='#ffe08a';x.lineWidth=7;x.beginPath();x.moveTo(ax-70,ay);x.lineTo(ax+60,ay);x.stroke();glowAt(ax+60,ay,50,.9)}},upN:1.5,loN:1.4,hmN:'open'});x.restore();
 draw('barbarik','x',1360,-1,.76,t,{upN:1.6,loN:1.0,hmN:'open',upF:1.6,loF:1.0,hmF:'open',look:[1,-.2]});chip('तीन दिव्य बाण',W/2,140,58,(lt-2.2)/.3,'#ffe14a')});
sc('अग्निदेव ने','अग्निदेव का वरदान',(lt,t,D)=>{cosmicBG(t,'#4a0a0a','#ff9a2a');for(let i=0;i<20;i++){const fx=hash(i)*W,fy=H-((t*120+hash(i+3)*H)%H);glowAt(fx,fy,30,.5,'255,140,40')}draw('agni','x',600,1,.86,t,{upN:1.4,loN:1.2,hmN:'open',post:(hf,hn)=>{const p=cl((lt-1)/1.2);bow([lerp(hn[0]+40,1180,eio(p)),lerp(hn[1],520,eio(p))],0,0,170);glowAt(lerp(hn[0],1180,eio(p)),lerp(hn[1],520,eio(p)),120,.6,'255,160,60')}});
 draw('barbarik','x',1340,-1,.76,t,{upN:1.6,loN:1.0,hmN:'open'});chip('दिव्य धनुष',W/2,140,58,(lt-1.6)/.3,'#ffe14a')});
sc('इसीलिए उन्हें कहा गया','',(lt,t,D)=>{cosmicBG(t,'#1a0a3a','#ffb84a');draw('barbarik','x',W/2,1,.95,t,{gy:1060,upF:Math.PI/2+.2,loF:0,post:(hf)=>bow(hf,-.2,0)});bigTitle('तीन बाण धारी',W/2,170,120,(lt-.5)/.4,'#ffe14a')});
// arrows explainer
function battlefieldTop(t,marksRed,marksGreen,kill){x.fillStyle='#c8a86a';x.fillRect(0,0,W,H);halftone(0,0,W,H,'rgba(0,0,0,.08)',3,'down');for(let i=0;i<160;i++){const px=200+(i%20)*76,py=230+Math.floor(i/20)*84,enemy=(i%20)<10;if(kill&&enemy&&marksRed>i/160)continue;x.fillStyle=enemy?'#e8462a':'#2a6ad8';x.strokeStyle=INK;x.lineWidth=2;x.beginPath();x.arc(px,py,14,0,6.28);x.fill();x.stroke();
 if(enemy&&marksRed>hash(i)){x.strokeStyle='#ff1e1e';x.lineWidth=4;x.beginPath();x.arc(px,py,22,0,6.28);x.stroke()}if(!enemy&&marksGreen>hash(i)){x.strokeStyle='#1ec85a';x.lineWidth=4;x.beginPath();x.arc(px,py,22,0,6.28);x.stroke()}}}
sc('अब ज़रा इन तीन','तीन बाणों की शक्ति',(lt,t,D)=>{battlefieldTop(t,0,0,0);chip('कौरव सेना',560,140,48,lt/.3,'#e8462a','#fff');chip('पांडव सेना',1360,140,48,lt/.3,'#2a6ad8','#fff')});
sc('पहला बाण','पहला बाण',(lt,t,D)=>{const m=cl((lt-.6)/2);battlefieldTop(t,m,0,0);x.save();const ax=lerp(-100,W+100,cl((lt-.3)/2.2));x.strokeStyle='#ff4a2a';x.lineWidth=8;x.beginPath();x.moveTo(ax-160,120);x.lineTo(ax,120);x.stroke();glowAt(ax,120,70,.9,'255,90,60');x.restore();chip('1  नष्ट करने वाले चिह्नित',W/2,1000,50,lt/.3,'#ff4a2a','#fff')});
sc('दूसरा बाण','दूसरा बाण',(lt,t,D)=>{const m=cl((lt-.6)/2);battlefieldTop(t,1,m,0);const ax=lerp(-100,W+100,cl((lt-.3)/2.2));x.strokeStyle='#1ec85a';x.lineWidth=8;x.beginPath();x.moveTo(ax-160,120);x.lineTo(ax,120);x.stroke();glowAt(ax,120,70,.9,'60,255,120');chip('2  बचाने वाले चिह्नित',W/2,1000,50,lt/.3,'#1ec85a','#fff')});
sc('और तीसरा बाण','तीसरा बाण',(lt,t,D)=>{const k=cl((lt-1.5)/2.5);battlefieldTop(t,k,1,1);const ax=lerp(-100,W+100,cl((lt-.6)/3));x.strokeStyle='#ffd23a';x.lineWidth=10;x.beginPath();x.moveTo(ax-180,120);x.lineTo(ax,120);x.stroke();glowAt(ax,120,90,1);
 if(lt>D-2.5){const p=cl((lt-(D-2.5))/1.5);chip('↩ वापस तरकश में',W/2,560,64,p,'#ffe14a')}chip('3  सब चिह्नित दुश्मन ख़त्म',W/2,1000,50,lt/.3,'#ffd23a')});
sc('यानी एक बाण चलाओ','',(lt,t,D)=>{cosmicBG(t,'#2a0a0a','#ff6a2a');bigTitle('1 बाण = पूरी सेना ख़त्म',W/2,H/2,110,lt/.4,'#ffe14a')});
sc('कुछ विद्वान कहते','',(lt,t,D)=>{nightBG(t);['दैहिक','दैविक','भौतिक'].forEach((n,i)=>{const p=cl((lt-.6-i*.6)/.4);chip(n+' ताप',480+i*480,520,60,p,['#ff8a1e','#ffe14a','#8ad0ff'][i])});bigTitle('तीन ताप',W/2,240,90,lt/.4,'#fff')});
// 4 WAR DECIDED + PROMISE
sc('अब आता है वो समय','कुरुक्षेत्र',(lt,t,D)=>{plainBG(t,1);army(40,780,840,4,'#e8462a','#ffd23a',t);army(1060,780,840,4,'#2a6ad8','#ffffff',t,1,-1);chip('कौरव',440,200,60,(lt-Tm('एक तरफ़ पांडव')+Tm('अब आता है वो समय'))/.3,'#e8462a','#fff');chip('पांडव',1480,200,60,(lt-Tm('एक तरफ़ पांडव')+Tm('अब आता है वो समय')-.4)/.3,'#2a6ad8','#fff');bigTitle('धर्म  vs  अधर्म',W/2,420,90,(lt-Tm('और बीच में',Tm('एक तरफ़ पांडव'))+Tm('अब आता है वो समय'))/.4,'#ffe14a')});
sc('ये ख़बर बर्बरीक','',(lt,t,D)=>{forestBG(t);const w=walkP(lt,.5,D-.5,500,900);draw('barbarik','x',w.x,1,.82,t,Object.assign({},w,{look:[1,-.1]}));chip('मैं भी युद्ध में जाऊँगा!',1300,300,50,(lt-1)/.3,'#fff')});
sc('जाने से पहले वो माँ','माँ को वचन',(lt,t,D)=>{plainBG(t,1);draw('maurvi','maurvi',620,1,.84,t,{look:[1,-.1]});draw('barbarik','barbarik',1300,-1,.84,t,{tilt:speakingAmp('barbarik',t)>0?.08:0})});
sc('यही वचन','',(lt,t,D)=>{cosmicBG(t,'#1a0a3a','#ffb84a');draw('barbarik','x',W/2-360,1,.86,t,{upN:2.3,loN:.3,hmN:'open'});bigTitle('हारे का सहारा',W/2+300,440,130,(lt-1)/.4,'#ffe14a')});
sc('माँ का आशीर्वाद','नीले घोड़े का असवार',(lt,t,D)=>{plainBG(t,0);const ox=-((lt*500)%W);x.save();x.translate(ox,0);for(let k=0;k<2;k++){x.translate(k*W,0);for(let i=0;i<6;i++)hut(100+i*360,800,.5)}x.restore();
 const hx=lerp(-300,W*.55,eo(lt/2.5));horse(hx,GY,1,t,1);character(Object.assign(Pz('barbarik','x',hx-20,1,.62,t),{thF:1.3,knF:1.2,thN:1.3,knN:1.2,upF:1.2,loF:.5,upN:1.0,loN:.6}),CH.barbarik,GY+RY);
 for(let i=0;i<8;i++){x.fillStyle='rgba(200,170,120,.5)';x.beginPath();x.arc(hx-240-i*40,GY-20-hash(i)*30,20+i*4,0,6.28);x.fill()}});
// 5 KRISHNA'S QUESTION
sc('उधर कुरुक्षेत्र में','कृष्ण का सवाल',(lt,t,D)=>{plainBG(t,0);draw('krishna','krishna',W/2,1,.82,t,{smile:1,upN:speakingAmp('krishna',t)?1.1:.1});['bhishma','drona','karna','arjuna'].forEach((k,i)=>draw(k,k,260+i*170+(i>1?1060:0)-(i>1?340:0),i<2?1:-1,.62,t))});
function warriorsScene(lt,t,D){plainBG(t,0);const ks=['bhishma','drona','karna','arjuna'],days=['20','25','24','28'];ks.forEach((k,i)=>{const px=300+i*440;const on=speakingAmp(k,t)>0;draw(k,k,px,1,on?.76:.66,t,{upN:on?1.2:.1,loN:on?1.2:.3});const st=Tm(days[i]==='20'?'बीस दिन':days[i]==='25'?'पच्चीस दिन':days[i]==='24'?'चौबीस दिन':'अट्ठाईस दिन',Tm('कहते हैं, भीष्म'))-Tm('कहते हैं, भीष्म');chip(days[i]+' दिन',px,180,64,(lt-st)/.3,['#f2f0ea','#ff8a1e','#ffd23a','#8ad0ff'][i])})}
sc('कहते हैं, भीष्म','',warriorsScene);
sc('तभी कृष्ण को ख़बर','',(lt,t,D)=>{plainBG(t,1);const hx=lerp(W+300,W*.62,eo(lt/3));horse(hx,GY,.9,t,1);character(Object.assign(Pz('barbarik','x',hx+10,-1,.56,t),{thF:1.3,knF:1.2,thN:1.3,knN:1.2,upF:1.2,loF:.5}),CH.barbarik,GY+RY*.9);draw('krishna','x',420,1,.78,t,{look:[1,0],smile:1});chip('एक अकेला योद्धा... 3 बाण',700,180,50,(lt-1)/.3,'#ffe14a')});
sc('कृष्ण ने ब्राह्मण','ब्राह्मण का वेश',(lt,t,D)=>{forestBG(t);const m=cl((lt-.8)/.8);glowAt(560,560,320,Math.sin(m*Math.PI)*.9);x.save();x.globalAlpha=1-m;draw('krishna','x',560,1,.8,t);x.restore();x.save();x.globalAlpha=m;draw('brahmin','x',560,1,.8,t,{smile:1});x.restore();
 const w=walkP(lt,1.5,D-.5,2100,1340);draw('barbarik','x',w.x,-1,.82,t,w)});
function dialogScene(lt,t,D,bg){(bg||forestBG)(t);draw('brahmin','krishna',560,1,.82,t,{smile:1});draw('barbarik','barbarik',1340,-1,.84,t)}
sc('ब्राह्मण ने हँसकर','',(lt,t,D)=>dialogScene(lt,t,D));
sc('कृष्ण मुस्कुराए','',(lt,t,D)=>dialogScene(lt,t,D));
// 6 PEEPAL
sc('पास ही एक विशाल','पीपल की परीक्षा',(lt,t,D)=>{plainBG(t,0);peepal(W/2,GY-10,1,t,0,0);draw('brahmin','krishna',420,1,.74,t,{smile:1,upN:speakingAmp('krishna',t)?1.6:.1,loN:1.2,hmN:'open'});draw('barbarik','barbarik',1500,-1,.76,t)});
sc('बर्बरीक ने आँखें','',(lt,t,D)=>{plainBG(t,0);peepal(W/2,GY-10,1,t,0,0);const hide=cl((lt-Tm('और इसी बीच',Tm('बर्बरीक ने आँखें'))+Tm('बर्बरीक ने आँखें'))/2);
 draw('brahmin','x',420,1,.74,t,{smile:1,look:[1,.5],upN:hide>0&&hide<1?.6:.1,loN:hide>0&&hide<1?1.2:.3});draw('barbarik','x',1500,-1,.76,t,{blink:1,upN:1.9,loN:1.3,hmN:'open'});
 if(hide>0){const lx=lerp(560,440,eio(hide)),ly=lerp(560,GY-6,eio(hide));x.save();x.translate(lx,ly);x.rotate(hide*6);x.fillStyle='#3aa046';x.strokeStyle=INK;x.lineWidth=2.5;x.beginPath();x.moveTo(0,-18);x.bezierCurveTo(16,-16,18,4,0,20);x.bezierCurveTo(-18,4,-16,-16,0,-18);x.fill();x.stroke();x.restore()}
 if(hide>.6){x.strokeStyle='#ff1e1e';x.lineWidth=5;x.beginPath();x.ellipse(440,GY,70,24,0,0,6.28);x.stroke()}});
sc('बर्बरीक ने बाण छोड़ा','',(lt,t,D)=>{plainBG(t,0);const mk=cl((lt-.8)/1.5);speedLines(W/2,500,t,cl(1-lt/1.5)*.8);peepal(W/2,GY-10,1,t,1,mk);draw('brahmin','x',420,1,.74,t,{smile:1,look:[1,-.4]});draw('barbarik','x',1500,-1,.76,t,{upF:Math.PI/2+.5,loF:0,upN:Math.PI/2+.25,loN:lt<.3?-2.3:-1.1,post:(hf)=>bow(hf,-.5,lt<.3?1:0)})});
sc('पर फिर, वो बाण','',(lt,t,D)=>{plainBG(t,0);peepal(W/2,GY-10,1,t,1,1);draw('brahmin','x',420,1,.74,t,{look:[.3,1],brow:4});const fx=440,fy=GY-10;for(let i=0;i<14;i++){const a=t*6-i*.2;glowAt(fx+Math.cos(a)*90,fy+Math.sin(a)*22,24,.9*(1-i/14))}
 x.save();const a=t*6;x.translate(fx+Math.cos(a)*90,fy+Math.sin(a)*22);x.rotate(a+Math.PI/2);x.strokeStyle='#ffd23a';x.lineWidth=6;x.beginPath();x.moveTo(-50,0);x.lineTo(30,0);x.stroke();x.restore();draw('barbarik','barbarik',1500,-1,.76,t)});
sc('बर्बरीक बोले','',(lt,t,D)=>{plainBG(t,0);peepal(W/2,GY-10,1,t,1,1);const fx=440,fy=GY-10;for(let i=0;i<10;i++){const a=t*6-i*.2;glowAt(fx+Math.cos(a)*90,fy+Math.sin(a)*22,22,.8*(1-i/10))}draw('brahmin','x',420,1,.74,t,{smile:1});draw('barbarik','barbarik',1400,-1,.8,t)},Tm('बर्बरीक बोले',250));
sc('उस पल कृष्ण समझ','',(lt,t,D)=>{cosmicBG(t,'#0a1a3a','#7ab0ff');cam(1.7,W/2,430,()=>{character(Object.assign(Pz('brahmin','x',W/2,1,.82,t),{look:[1,-.1],brow:5}),CH.brahmin,GY)});chip('ये बाण कभी चूकते नहीं',W/2,160,60,(lt-1)/.3,'#ffe14a')});
// 7 PARADOX
sc('अब कृष्ण ने पूछा','',(lt,t,D)=>dialogScene(lt,t,D,(t)=>plainBG(t,1)));
sc('तब कृष्ण ने वो बात','वचन की पहेली',(lt,t,D)=>{plainBG(t,1);draw('brahmin','krishna',400,1,.74,t,{smile:0});const d0=Tm('बर्बरीक, ज़रा',Tm('तब कृष्ण ने वो'))-Tm('तब कृष्ण ने वो'),k=lt-d0;
 // seesaw: side switching
 const sw=Math.floor(Math.max(0,k)/3.2),ph=(Math.max(0,k)%3.2)/3.2;const tilt=k<0?0:(sw%2?-1:1)*.18*Math.sin(Math.min(1,ph*2)*Math.PI/2);const shrink=cl(k/18);
 scale2(1200,420,tilt,()=>army(-90,110,180,2,'#e8462a','#ffd23a',t,1-shrink*.95),()=>army(-90,110,180,2,'#2a6ad8','#fff',t,1-shrink*.95));
 if(k>0){const side=sw%2?-1:1;const bx=1200+side*340;character(Object.assign(Pz('barbarik','x',bx,-side,.32,t),{noShadow:1}),CH.barbarik,420+(side>0?1:-1)*tilt*340+90)}
 if(k>16){bigTitle('बचोगे सिर्फ़ तुम... अकेले',1200,880,70,(k-16)/.4,'#ffe14a')}});
sc('यानी बर्बरीक का वचन','',(lt,t,D)=>{cosmicBG(t,'#1a0a2a','#ff8a5a');bigTitle('सबसे बड़ी पहेली',W/2,H/2-60,120,lt/.4,'#ffe14a');chip('वचन ⚖ युद्ध',W/2,H/2+130,60,(lt-.8)/.3,'#fff')});
// 8 SHEESH DAAN
sc('कुछ देर चुप रहने','दान',(lt,t,D)=>{forestBG(t,1);draw('brahmin','krishna',560,1,.82,t,{smile:0});draw('barbarik','barbarik',1340,-1,.84,t)});
sc('ब्राह्मण ने धीरे से','',(lt,t,D)=>{cosmicBG(t,'#0a0a1a','#6a2a5a');cam(1.35+.1*lt/D,560,520,()=>{draw('brahmin','krishna',560,1,.82,t,{smile:0,brow:-2})});x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,0,W,H)});
sc('बर्बरीक एक पल','',(lt,t,D)=>{forestBG(t,1);cam(1.3,1340,520,()=>{draw('barbarik','barbarik',1340,-1,.84,t,{look:[1,0],smile:speakingAmp('barbarik',t)?0:1,brow:3})})});
sc('तब कृष्ण अपने असली','विराट रूप',(lt,t,D)=>{cosmicBG(t,'#2a0a4a','#ffd27a');const m=cl(lt/1.2);glowAt(700,520,500,.9*Math.sin(m*Math.PI)+.4);x.save();x.globalAlpha=1-m;draw('brahmin','x',700,1,.86,t);x.restore();x.save();x.globalAlpha=m;draw('krishna','krishna',700,1,.9*(1+.06*m),t,{smile:1,upN:2.2,loN:.6,hmN:'open',post:(hf,hn)=>chakra(hn[0]+4,hn[1]-60,34,t)});x.restore();sparkles(700,500,500,t,40,m);
 draw('barbarik','barbarik',1400,-1,.82,t,{upN:1.75,loN:1.45,hmN:'open',upF:1.75,loF:1.45,hmF:'open',noGesture:1,tilt:.06})});
sc('कृष्ण ने कहा','',(lt,t,D)=>{cosmicBG(t,'#2a0a4a','#ffd27a');draw('krishna','krishna',700,1,.92,t,{smile:1,upN:1.7,loN:1.4,hmN:'open',noGesture:1});draw('barbarik','x',1400,-1,.82,t,{upN:1.75,loN:1.45,hmN:'open',upF:1.75,loF:1.45,hmF:'open',tilt:.1,blink:1})},Tm('कृष्ण ने कहा',340));
sc('मान्यता है, फाल्गुन','शीश के दानी',(lt,t,D)=>{cosmicBG(t,'#3a0a2a','#ffc85a');petals(t,1,60);const m=cl(lt/2);glowAt(W/2,520,600,.6+.3*Math.sin(t*2));if(lt<2.2){x.save();x.globalAlpha=1-m;draw('barbarik','x',W/2,1,.84,t,{upN:1.75,loN:1.45,hmN:'open',upF:1.75,loF:1.45,hmF:'open',blink:1});x.restore()}
 x.save();x.globalAlpha=m;sheesh(W/2,760,1.25,t,m);x.restore();chip('फाल्गुन शुक्ल द्वादशी',W/2,140,52,(lt-1.5)/.3,'#ffe14a');bigTitle('शीश के दानी',W/2,970,90,(lt-Tm('इसीलिए उन्हें कहते हैं',Tm('मान्यता है, फाल्गुन'))+Tm('मान्यता है, फाल्गुन'))/.4,'#ffe14a')});
sc('कृष्ण ने उनका शीश','पहाड़ी से महाभारत',(lt,t,D)=>{plainBG(t,1);army(100,900,760,3,'#e8462a','#ffd23a',t);army(1060,900,760,3,'#2a6ad8','#fff',t,1,-1);for(let i=0;i<12;i++){const ax=(t*400+i*170)%W;x.strokeStyle='rgba(60,30,10,.6)';x.lineWidth=3;x.beginPath();x.moveTo(ax,620+i%3*20);x.lineTo(ax+60,600+i%3*20);x.stroke()}
 x.fillStyle='#7a5a3a';x.strokeStyle=INK;x.lineWidth=5;x.beginPath();x.moveTo(1500,H);x.quadraticCurveTo(1640,380,1780,H);x.fill();x.stroke();sheesh(1640,420,.7,t,1);const day=Math.min(18,1+Math.floor(cl((lt-Tm('और वहाँ से',Tm('कृष्ण ने उनका शीश'))+Tm('कृष्ण ने उनका शीश'))/5)*17));chip('दिन '+day+' / 18',420,160,60,(lt-1)/.3,'#ffe14a')});
// 9 AFTER WAR
sc('युद्ध ख़त्म हुआ','असली हीरो कौन?',(lt,t,D)=>{plainBG(t,1);draw('arjuna','arjuna',520,1,.74,t,{upN:1.2+Math.sin(t*4)*.2,loN:1.0,hmN:'open',upF:Math.PI/2,loF:0,post:(hf)=>bow(hf,0,0)});draw('bhima','x',920,-1,.78,t,{upN:1.2+Math.sin(t*4+1)*.2,loN:1.0,mouth:Math.abs(Math.sin(t*9))*.7,angry:1});
 chip('अर्जुन!',520,160,56,(lt-Tm('कोई बोला अर्जुन',Tm('युद्ध ख़त्म हुआ'))+Tm('युद्ध ख़त्म हुआ'))/.3,'#8ad0ff');chip('भीम!',920,160,56,(lt-Tm('कोई बोला भीम',Tm('युद्ध ख़त्म हुआ'))+Tm('युद्ध ख़त्म हुआ'))/.3,'#ff8a1e');draw('krishna','krishna',1460,-1,.8,t,{smile:1})});
sc('सब बर्बरीक के शीश','',(lt,t,D)=>{plainBG(t,1);x.fillStyle='#7a5a3a';x.strokeStyle=INK;x.lineWidth=5;x.beginPath();x.moveTo(1180,H);x.quadraticCurveTo(1420,300,1660,H);x.fill();x.stroke();sheesh(1420,380,.85,t,1);draw('krishna','x',360,1,.72,t,{look:[1,-.4]});draw('arjuna','x',620,1,.68,t,{look:[1,-.4]});draw('bhima','x',860,1,.7,t,{look:[1,-.4]})});
sc('कहते हैं, बर्बरीक ने','सुदर्शन चक्र',(lt,t,D)=>{cosmicBG(t,'#2a0a1a','#ff9a3a');army(60,1000,1800,3,'rgba(232,70,42,.6)','#ffd23a',t,.6);for(let i=0;i<3;i++){const a=t*1.2+i*2.1;chakra(W/2+Math.cos(a)*560,560+Math.sin(a)*220,60,t)}chakra(W/2,520,110,t);x.save();x.translate(1650,260);sheesh(0,0,.45,t,1);x.restore()});
sc('यानी जीत का असली','',(lt,t,D)=>{cosmicBG(t,'#2a0a4a','#ffd27a');draw('krishna','x',W/2,1,.92,t,{gy:1060,smile:1,upN:2.2,loN:.6,hmN:'open',post:(hf,hn)=>chakra(hn[0]+4,hn[1]-60,34,t)});bigTitle('स्वयं श्री कृष्ण',W/2,160,100,(lt-.8)/.4,'#ffe14a')});
sc('बर्बरीक के इस त्याग','कलियुग का वरदान',(lt,t,D)=>{cosmicBG(t,'#1a0a3a','#ffc85a');draw('krishna','krishna',560,1,.86,t,{smile:1,upN:1.6,loN:1.0,hmN:'open',noGesture:1});const k=cl((lt-Tm('और यहीं से बर्बरीक',Tm('बर्बरीक के इस त्याग'))+Tm('बर्बरीक के इस त्याग'))/1.5);sheesh(1360,640,1.0+.15*k,t,1);if(k>0){sparkles(1360,560,300,t,40,k);bigTitle('श्याम',1360,180,130,k,'#ffe14a')}});
// 10 KHATU
sc('सदियाँ बीत गईं','',(lt,t,D)=>{const p=lt/D;const sky=x.createLinearGradient(0,0,0,H);const day=.5+.5*Math.sin(p*12);sky.addColorStop(0,`rgb(${30+day*40|0},${40+day*120|0},${90+day*140|0})`);sky.addColorStop(1,'#ffe0a0');x.fillStyle=sky;x.fillRect(0,0,W,H);
 const a=p*12;x.fillStyle='#fff3a0';x.beginPath();x.arc(W/2+Math.cos(a)*700,700-Math.abs(Math.sin(a))*500,60,0,6.28);x.fill();comicGround(820,'#d8b46a','#a07a3a');bigTitle('सदियाँ बीत गईं...',W/2,300,110,lt/.4,'#fff')});
sc('कहते हैं, राजस्थान','खाटू गाँव',(lt,t,D)=>{desertBG(t);for(let i=0;i<5;i++)hut(200+i*380,820,.6);chip('📍 खाटू, सीकर (राजस्थान)',W/2,170,56,(lt-.6)/.3,'#ffe14a')});
sc('वहाँ एक गाय','',(lt,t,D)=>{desertBG(t);const w=cl(lt/2);cow(lerp(-200,820,eo(w)),GY,.95,t,1);milkStream(960,GY-95,GY-5,t,cl((lt-2.6)/.4));if(lt>2.8)sparkles(960,GY-20,120,t,14,.8)});
sc('गाँव वाले हैरान','खुदाई',(lt,t,D)=>{desertBG(t);cow(500,GY,.8,t,1);draw('villager','x',1060,-1,.7,t,{upN:1.4+Math.sin(t*6)*.6,loN:.6,look:[1,.4]});draw('villager','x',1400,-1,.66,t,{upN:1.4+Math.sin(t*6+2)*.6,loN:.6,look:[1,.4]});
 x.fillStyle='#8a5a2a';x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.ellipse(1240,GY,160,40,0,0,6.28);x.fill();x.stroke();const f=cl((lt-Tm('उन्होंने उस जगह',Tm('गाँव वाले हैरान'))+Tm('गाँव वाले हैरान')-1.6)/1.5);if(f>0){sheesh(1240,GY-120*f,.6,t,f)}});
sc('वो जगह आज कहलाती','श्याम कुंड',(lt,t,D)=>{desertBG(t);pond(W/2,860,520,120,t);temple(1600,760,.35,t,1);walkerCrowd(t,720,8,1,false,.9);chip('श्याम कुंड',W/2,200,70,(lt-.5)/.3,'#ffe14a')});
sc('उसी समय, खाटू के','राजा का सपना',(lt,t,D)=>{nightBG(t);x.fillStyle='#6a3a1a';x.strokeStyle=INK;x.lineWidth=5;x.fillRect(360,820,900,60);x.strokeRect(360,820,900,60);
 const sleep=(k,px)=>{x.save();x.translate(px,800);x.rotate(-Math.PI/2);head([0,0],{t,mouth:0,blink:1,look:[0,0]},CH[k]);x.restore()};x.fillStyle='#c8261c';x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.roundRect(600,770,620,60,26);x.fill();x.stroke();sleep('king',560);
 dreamBubble(1320,380,240,(lt-1)/.6,()=>{cosmicBG(t,'#2a0a3a','#ffd27a');sheesh(1320,470,.55,t,1)});chip('राजा रूप सिंह चौहान & रानी नर्मदा कँवर',W/2,140,44,(lt-.4)/.3,'#ffe14a')});
sc('और सन् एक हज़ार','पहला मंदिर — 1027',(lt,t,D)=>{desertBG(t);const b=cl(lt/2.5);x.save();x.beginPath();x.rect(0,H-b*H,W,H);x.clip();temple(W/2,GY,.9,t,0);x.restore();chip('सन् 1027',W/2,140,70,(lt-.5)/.3,'#ffe14a')});
sc('बाद में, सन् सत्रह','1720 — नया रूप',(lt,t,D)=>{desertBG(t);temple(W/2,GY,.95,t,1);sparkles(W/2,500,500,t,20,.6);chip('सन् 1720 — दीवान अभय सिंह',W/2,140,56,(lt-.5)/.3,'#ffe14a')});
sc('बाबा श्याम को भक्त','बाबा के नाम',(lt,t,D)=>{cosmicBG(t,'#1a0a3a','#ffb84a');sheesh(W/2,700,1.05,t,1);const names=['तीन बाण धारी','शीश के दानी','नीले घोड़े का असवार','लखदातार','मोरवीनंदन','हारे का सहारा'];const st=Tm('तीन बाण धारी',Tm('बाबा श्याम को भक्त'))-Tm('बाबा श्याम को भक्त');
 names.forEach((n,i)=>{const q=(lt-st-i*1.55)/.3;const px=i%2?1500:420,py=230+Math.floor(i/2)*260;chip(n,px,py,i===5?62:50,q,i===5?'#ffe14a':'#fff')})});
sc('हर महीने की ग्यारस','एकादशी & फाल्गुन मेला',(lt,t,D)=>{desertBG(t);temple(W/2,780,.6,t,1);walkerCrowd(t,760,40,1,true);walkerCrowd(t+3,850,30,-1,true);chip('ग्यारस (एकादशी)',420,170,52,(lt-.5)/.3,'#fff');chip('फाल्गुन लक्खी मेला',1500,170,52,(lt-Tm('और फाल्गुन के',Tm('हर महीने की ग्यारस'))+Tm('हर महीने की ग्यारस'))/.3,'#ffe14a')});
sc('कई भक्त, रींगस','निशान यात्रा',(lt,t,D)=>{desertBG(t);x.strokeStyle='#8a6a3a';x.lineWidth=60;x.beginPath();x.moveTo(-50,1000);x.quadraticCurveTo(900,700,W+50,760);x.stroke();walkerCrowd(t,700,34,1,true);
 x.fillStyle='#fff';x.strokeStyle=INK;x.lineWidth=4;chip('रींगस',220,320,50,(lt-.4)/.3,'#fff');chip('खाटू',1700,320,50,(lt-.9)/.3,'#ffe14a');x.setLineDash([20,16]);x.strokeStyle='#e8321e';x.lineWidth=6;x.beginPath();x.moveTo(320,320);x.lineTo(lerp(320,1600,cl((lt-1)/2)),320);x.stroke();x.setLineDash([]);chip('≈ 17 km पैदल',W/2,420,52,(lt-2.5)/.3,'#ff8a1e')});
sc('रास्ते भर भजन','',(lt,t,D)=>{cosmicBG(t,'#3a0a1a','#ff9a2a');walkerCrowd(t,820,40,1,true);petals(t,.8);bigTitle('जय श्री श्याम',W/2,360,150,(lt-1.2)/.4,'#ffe14a')});
// 11 LESSON + CTA
sc('तो आख़िर बर्बरीक की','सीख',(lt,t,D)=>{nightBG(t);draw('barbarik','x',W/2,1,.88,t,{look:[1,-.2]});glowAt(W/2,520,300,.3)});
sc('बर्बरीक के पास वो ताक़त','ताक़त या त्याग?',(lt,t,D)=>{cosmicBG(t,'#1a0a2a','#ff8a4a');const k=cl((lt-Tm('पर उन्होंने ताक़त नहीं',Tm('बर्बरीक के पास वो ताक़त'))+Tm('बर्बरीक के पास वो ताक़त'))/1.5);scale2(W/2,380,-.22*eio(k),()=>{bigTitle('ताक़त',0,60,60,1,'#ff8a1e')},()=>{bigTitle('त्याग',0,60,60,1,'#ffe14a')})});
sc('उन्होंने जीतने वाले का','',(lt,t,D)=>{plainBG(t,1);draw('barbarik','x',W/2+260,-1,.82,t,{upN:1.2,loN:.9,hmN:'open'});draw('villager','x',W/2-260,1,.7,t,{tilt:.15,look:[1,.4],sit:60});chip('हारे हुए का साथ',W/2,170,60,(lt-1)/.3,'#ffe14a')});
sc('और शायद इसीलिए','',(lt,t,D)=>{desertBG(t);temple(W/2,780,.55,t,1);walkerCrowd(t,780,36,1,true);chip('करोड़ों भक्तों का भरोसा',W/2,170,56,(lt-.6)/.3,'#ffe14a')});
sc('क्योंकि सच्ची ताक़त','',(lt,t,D)=>{cosmicBG(t,'#1a0a3a','#ffb84a');sheesh(W/2,720,1.1,t,1);bigTitle('सच्ची ताक़त = हारे का साथ',W/2,180,84,(lt-.4)/.4,'#ffe14a')});
sc('अगर आपको भी कभी','',(lt,t,D)=>{plainBG(t,0);x.fillStyle='#6a6a70';x.fillRect(0,850,W,240);truckBack(W/2,560,1,t,lt/.5)});
sc('अगर आप भी बाबा श्याम','',(lt,t,D)=>{cosmicBG(t,'#2a0a1a','#ff7a2a');sheesh(560,720,.95,t,1);x.save();x.fillStyle='#fff';x.strokeStyle=INK;x.lineWidth=6;const p=backE(cl(lt/.5));x.translate(1320,420);x.scale(p,p);x.beginPath();x.roundRect(-380,-110,760,220,30);x.fill();x.stroke();x.font='40px Rozha';x.fillStyle='#777';x.textAlign='left';x.fillText('कमेंट करें...',-330,-40);x.font='72px Rozha';x.fillStyle='#c8261c';const txt='जय श्री श्याम 🙏';const n=Math.floor(cl((lt-1)/1.5)*txt.length);x.fillText(txt.slice(0,n),-330,50);x.restore()},Tm('अगर आप भी बाबा श्याम',530));
sc('और ऐसे ही भूले','',(lt,t,D)=>{cosmicBG(t,'#2a0a1a','#ff7a2a');const p=backE(cl(lt/.4));x.save();x.translate(W/2,520);x.scale(p,p);x.fillStyle='#e8261c';x.strokeStyle=INK;x.lineWidth=8;x.beginPath();x.roundRect(-380,-90,760,180,90);x.fill();x.stroke();x.font='88px Rozha';x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';x.fillText(lt>2.6?'✓ सब्सक्राइब्ड':'सब्सक्राइब',0,6);x.restore();
 if(lt>1.4&&lt<3){const k=cl((lt-1.4)/.6);x.font='120px serif';x.fillText('👆',W/2+260-k*40,700-k*60)}bigTitle('भूले किस्से',W/2,860,90,(lt-.6)/.4,'#ffe14a')},Tm('और ऐसे ही भूले',540));
