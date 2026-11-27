// v3 Shani Shingnapur — recipe: dusty afternoon village + kinetic pop chips, transitions slide/tear/blinds/iris, explainer worlds: night-sky dream + saffron halftone
const ASSETS=['bg.jpg','house.png','bank.png','shila.png','flood.png'];
KEYW=['गाँव','दरवाज़े','दरवाज़ा','ताला','कुंडी','चौखट','शिंगणापुर','ग्यारह','यूको','पहली','ताले','काले','शनिदेव','भरोसा','शिला','चरवाहे','खून','सपने','छत','रक्षा','आसमान','सज़ा','सब्सक्राइब','नहीं।'];
const RAAZ=P[16],OUTRO=P[35];
WAVECOLS=['#7a3f12','#a65a1c','#d17f2e','#f0b060'];
function setup(){
  D3.addSet('vil',{bg:IM.bg,floorY:1500,groundBy:1330,layers:[
    {k:'house',img:IM.house,w:780,x:540,by:1330,z:0,cols:8,t0:.2},
    {k:'bank',img:IM.bank,w:760,x:540,by:1330,z:.1,cols:8,t0:.2}]});
  D3.addSet('shani',{bg:IM.bg,floorY:1500,groundBy:1340,layers:[
    {k:'house',img:IM.house,w:520,x:170,by:1300,z:-1.6,cols:6,t0:.05},
    {k:'bank',img:IM.bank,w:480,x:930,by:1300,z:-1.6,cols:6,t0:.12},
    {k:'shila',img:IM.shila,mode:'band',bands:6,rise:.34,w:400,x:540,by:1345,z:0,cols:5,t0:.3,step:.26,flat:1}]});
}
function S1(lt,t){d3('vil',lt*1.2,t,{el:.24-.18*eio(lt/2),dist:1.1-.1*eio(lt/2),ly:.3},{over:{bank:{hide:1}}});
  tape('दरवाज़े ही नहीं!',470,250,82,1,{seed:5});
  const dp=lt-(P[1]+.3);if(dp>0){redCircle(445,1110,95,160,dp/.6);chip('🚪?',445,880,56,dp/.3,'#FFD43B','#111',-.05)}
  chip('🔒 ताला',300,620,52,(lt-P[2])/.25,'#fff','#111',-.04,(lt-P[2]-.25)/.3);
  chip('🔩 कुंडी',740,620,52,(lt-P[3])/.25,'#fff','#111',.04,(lt-P[3]-.25)/.3);
  chip('सिर्फ़ चौखट!',470,390,56,(lt-P[4]-.2)/.3,'#E23B3B','#fff',.02);
}
function S2(lt,t){const k=eio(lt/(P[7]-P[5]));d3('vil',99,t,{el:.06+.08*k,dist:1.0-.12*k,az:-.2*k,ly:.4+.4*k},{over:{bank:{hide:1}}});
  chip('📍 महाराष्ट्र',470,380,46,(lt-.15)/.3,'#F5B841','#111',.03);
  tape('शनि शिंगणापुर',470,250,84,cl((lt-(P[6]-P[5]))/.3),{seed:9});
}
function S3(lt,t){d3('vil',lt*1.3,t,{el:.18-.12*eio(lt/2),dist:1.05-.08*eio(lt/3),az:.12,ly:.4},{over:{house:{hide:1}}});
  chip('😮 कमाल देखिए',470,380,46,(lt-.1)/.3,'#111','#fff',-.03);
  tape('2011: यूको बैंक',470,250,78,cl((lt-(P[8]-P[7]))/.3),{seed:13});
  chip('🇮🇳 देश की पहली',470,500,48,(lt-(P[8]-P[7])-1.6)/.3,'#fff','#111',-.03);
  const b=lt-(P[9]-P[7]);if(b>0){chip('🔓 बिना ताले वाली शाखा!',470,1260,52,b/.3,'#FFD43B','#111',.02);sparkles(560,1150,260,lt,12)}
}
function S4(lt,t){dots('#c9541b','#f6a43c');
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-280,y0-300,1080*1.05,1920*1.05);img(IM.house,x0+w/2,y0+h-230,440,{})},330,900);
  tape('दरवाज़ा क्यों नहीं?',470,210,70,cl(lt/.3),{seed:21});
  qmarks(lt,[[720,520,.2],[870,700,-.25],[760,900,.1]]);
  tape('कमेंट में लिखो!',470,1300,54,cl((lt-(P[11]-P[10]))/.3),{fill:'#fff',seed:23,rot:.03});
  const a=P[13]-P[10]-.25,b=P[15]-P[10];if(lt>a&&lt<b+.2)subCTA(lt-a,470,1180);
  if(lt>b){pop(IM.shila,760,1180,230,(lt-b)*1.2,{});chip('जवाब: काला पत्थर',600,860,46,(lt-b)/.3,'#111','#fff',-.02)}
}
function goldGlow(cx,cy,r,lt,a=.4){x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(cx,cy,10,cx,cy,r);g.addColorStop(0,`rgba(255,196,90,${a+.1*Math.sin(lt*2)})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore()}
function S5(lt,t){d3('shani',lt*1.3,t,{el:.22-.16*eio(lt/2.2),dist:1.08-.1*eio(lt/2.2),ly:.6},{});
  if(lt>1.4)goldGlow(540,1050,520,lt,.3);
  tape('राज़: शनिदेव पर भरोसा!',470,250,64,cl((lt-(P[17]-P[16]))/.3),{seed:31});
}
function S6(lt,t){dots('#3c6a8a','#cfe3ee');
  chip('📖 कहते हैं...',470,300,52,(lt-.1)/.3,'#111','#fff',-.03);
  const fy=950+Math.sin(lt*1.6)*14;pop(IM.flood,470,fy+260,760,(lt-(P[19]-P[18])+.4)*1.1,{});
  ['#3f7fae','#5d9ac4','#86b8da'].forEach((c2,i)=>waveLayer(1330+i*40,c2,20,i*1.5,t*.8));
  chip('🌊 बाढ़ में बहकर आई काली शिला',470,430,42,(lt-(P[19]-P[18])-.6)/.3,'#fff','#111',.02);
  const sp=lt-(P[20]-P[18]);if(sp>0){chip('🪵 चरवाहे की छड़ी',300,1210,46,sp/.3,'#F5B841','#111',-.03);const [hx,hy]=[600,fy+170];redCircle(hx,hy,90,60,sp/.5)}
  const bp=lt-(P[21]-P[18]);if(bp>0){x.save();for(let i=0;i<3;i++){const p=cl((bp-i*.25)/.5);if(p<=0)continue;x.fillStyle='#c81e1e';x.globalAlpha=.9;x.beginPath();x.arc(420+i*40,fy+90+p*30,9,0,6.28);x.fill()}x.restore();tape('खून निकलने लगा!',470,560,62,cl(bp/.3),{seed:37,fill:'#E23B3B',ink:'#fff'})}
}
function night(lt){x.fillStyle='#0d1736';x.fillRect(0,0,W,H);for(let i=0;i<70;i++){const tw=.5+.5*Math.sin(lt*2+i);x.globalAlpha=.4+.6*tw;x.fillStyle='#ffe9a8';x.beginPath();x.arc(hash(i)*W,hash(i+9)*H*.8,1.5+hash(i+3)*2.5,0,6.28);x.fill()}x.globalAlpha=1;
  x.fillStyle='#fff3c4';x.beginPath();x.arc(860,300,70,0,6.28);x.fill();x.fillStyle='#0d1736';x.beginPath();x.arc(890,285,64,0,6.28);x.fill()}
function S7(lt,t){night(lt);
  const p=back(lt/.5);x.save();x.translate(470,880);x.scale(p,p);x.fillStyle='rgba(255,255,255,.12)';for(let i=0;i<9;i++){const a=i/9*6.28;x.beginPath();x.arc(Math.cos(a)*250,Math.sin(a)*250,120,0,6.28);x.fill()}
  x.fillStyle='rgba(246,239,224,.95)';x.beginPath();x.arc(0,0,300,0,6.28);x.fill();x.restore();
  if(p>.3){x.save();x.beginPath();x.arc(470,880,290*p,0,6.28);x.clip();x.drawImage(IM.bg,-100,200,1300,2311*.75);goldGlow(470,880,320,lt,.25);img(IM.shila,470,900,300,{});x.restore()}
  [[230,1240,40],[160,1310,26],[110,1360,16]].forEach(([cx,cy,r],i)=>{if(lt>.2+i*.1){x.fillStyle='rgba(246,239,224,.9)';x.beginPath();x.arc(cx,cy-60,r,0,6.28);x.fill()}});
  tape('सपने में शनिदेव...',470,330,66,cl(lt/.3),{seed:41,fill:'#F5B841'});
  chip('🏠 छत के नीचे मत रखना',560,1200,46,(lt-(P[23]-P[22]))/.3,'#fff','#111',-.02,(lt-(P[23]-P[22])-.6)/.4);
  chip('🛡️ गाँव की रक्षा मैं करूँगा',560,1300,46,(lt-(P[24]-P[22]))/.3,'#FFD43B','#111',.02);
}
function S8(lt,t){const k=eio(lt/(P[29]-P[25]));d3('shani',99,t,{el:.12+.26*k,dist:1.0-.04*k,az:.3-.6*k,ly:.6},{});goldGlow(540,1000,500,lt,.2);
  chip('☀️ खुले आसमान के नीचे',470,300,50,(lt-(P[26]-P[25]))/.3,'#9fd0f0','#111',.02);
  chip('🚪 कोई दरवाज़ा नहीं',470,420,50,(lt-(P[28]-P[25]))/.3,'#E23B3B','#fff',-.03);
}
function stamp(text,cx,cy,p){if(p<=0)return;const s=1+1.2*(1-eo(p));x.save();x.translate(cx,cy);x.rotate(-.12);x.scale(s,s);x.globalAlpha=cl(p*3);x.strokeStyle='#d61f1f';x.lineWidth=12;x.font=F(800,84);const w=x.measureText(text).width+60;rr(-w/2,-70,w,140,20);x.stroke();x.fillStyle='#d61f1f';x.textAlign='center';x.textBaseline='middle';x.fillText(text,0,8);x.restore()}
function S9(lt,t){dots('#c9541b','#f6a43c');
  tape('मान्यता: चोर को सज़ा ⚖️',470,260,62,cl(lt/.3),{seed:51});
  chip('शनिदेव खुद देते हैं',470,390,46,(lt-(P[31]-P[29]))/.3,'#111','#fff',.02);
  const a=lt-(P[32]-P[29]);if(a<.3){const q=1-cl(a/.3);x.save();x.globalAlpha=q;goldGlow(470,900,420,lt,.35);pop(IM.shila,470,1200,300,lt*1.2+.2,{});x.restore();chip('⚖️',700,780,90,(lt-(P[31]-P[29]))/.3,'#fff','#111',.08)}
  card(a,(x0,y0,w,h)=>{x.drawImage(IM.bg,-200,y0-300,1080,1920);img(IM.house,x0+w/2,y0+h-200,520,{});x.fillStyle='rgba(200,60,60,.75)';x.fillRect(x0+w/2-80,y0+h-330,70,190)},520,640,190,700);
  chip('अब: पर्दे, हल्के दरवाज़े',470,1260,46,(a-.4)/.3,'#fff','#111',-.02);
  chip('🔒 ताला?',300,640,56,(lt-(P[33]-P[29]))/.3,'#FFD43B','#111',-.04);
  stamp('आज भी नहीं!',560,900,(lt-(P[34]-P[29]))/.35);
}
const OAT=P[35]-.1,OC={c:P[36]-OAT,n:P[37]-OAT,s:P[38]-OAT-.3,e:P[40]-OAT,cmt:'जय शनिदेव'};
function S10(lt,t){outroCTA(lt,t,f=>d3('shani',99,t,{el:.14,dist:1.05,az:.25*Math.sin(lt*.3),ly:.7},{fold:f}),OC)}
const SCN=[{at:0,f:S1},{at:P[5]-.1,f:S2,tr:'flash',d:.4},{at:P[7]-.1,f:S3,tr:'blinds',d:.6},{at:P[10]-.1,f:S4,tr:'slide',d:.5},{at:P[16]-.1,f:S5,tr:'tear',d:.6},
  {at:P[18]-.1,f:S6,tr:'page'},{at:P[22]-.1,f:S7,tr:'iris',d:.7},{at:P[25]-.1,f:S8,tr:'flash',d:.5},{at:P[29]-.1,f:S9,tr:'slide',d:.5},{at:P[35]-.1,f:S10,tr:'tear',d:.6}];
function events(){
  ev(.02,'swell',.45);buildEv('vil',0,1/1.2);ev(.1,'tape');ev(P[1]+.3,'scribble',.6);ev(P[1]+.35,'pop');ev(P[2],'slap');ev(P[2]+.25,'scribble',.5);ev(P[3],'slap');ev(P[3]+.25,'scribble',.5);ev(P[4]+.2,'stamp',.6);
  ev(P[5]-.4,'whoosh',.6);ev(P[5]+.05,'slap');ev(P[6],'tape');ev(P[6]+.05,'bell',.6);
  ev(P[7]-.6,'flip');buildEv('vil',P[7]-.1,1/1.3);ev(P[7],'slap');ev(P[8],'tape');ev(P[8]+1.6,'slap');ev(P[9],'sparkle');ev(P[9]+.05,'slap');
  ev(P[10]-.5,'whoosh');ev(P[10],'tape');[0,.2,.4].forEach(d=>ev(P[10]+.4+d,'pop'));ev(P[11],'tape');ev(P[13]-.25,'click');ev(P[13],'bell');ev(P[15]-.6,'riser');ev(P[15],'stone');
  ev(P[16]-.7,'rip');buildEv('shani',P[16]-.1,1/1.3);ev(P[17]-.05,'boom',.6);ev(P[17],'tape');ev(P[17]+.1,'shankh',.45);
  ev(P[18]-.6,'page');ev(P[18],'slap');ev(P[19]-.4,'wave',.7);ev(P[19]+.6,'slap');ev(P[20],'slap');ev(P[20]+.1,'scribble',.5);ev(P[21],'tape');ev(P[21]+.05,'boom',.4);
  ev(P[22]-.7,'whoosh');ev(P[22],'swell',.5);ev(P[22]+.1,'tape');ev(P[23],'slap');ev(P[23]+.6,'scribble',.5);ev(P[24],'slap');ev(P[24]+.1,'sparkle');
  ev(P[25]-.5,'whoosh',.6);ev(P[26],'slap');ev(P[28],'slap');
  ev(P[29]-.5,'whoosh');ev(P[29],'tape');ev(P[31],'slap');ev(P[32],'pop');ev(P[32]+.4,'slap');ev(P[33],'slap');ev(P[34],'stamp',.9);
  outroEv(OAT,OC);
}
