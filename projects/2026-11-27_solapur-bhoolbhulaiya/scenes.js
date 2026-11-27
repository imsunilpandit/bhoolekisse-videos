// Labyrinth — recipe: golden-hour savanna, warm sand + sea blue explainers, route map; transitions page/wave/slide/iris/blinds/tear
const ASSETS=['bg.jpg','labflat.png','labyrinth.png','grass.png','ship.png','gold.png','spices.png','cart.png','coin.png'];
KEYW=['भूलभुलैया!','भूलभुलैया','हज़ार','पचास','पंद्रह','सोलापुर','बोरामणी','सबसे','बड़ी','क्रीट','सिक्कों','किसने','क्यों?','रोम','व्यापार!','सातवाहन','सोना,','शराब','गहने','रेशम,','नील','मसाले।','निशान','सांगली,','सातारा','कोल्हापुर','नक्शा।'];
const RAAZ=P[19],OUTRO=P[35];
WAVECOLS=['#e7a34a','#f2c26b','#f7dc9a','#fbeccb'];
function setup(){
  D3.addSet('lab',{bg:IM.bg,floorY:1540,groundBy:1380,layers:[
    {k:'maze',img:IM.labflat,w:860,x:540,by:1430,z:.2,cols:8,t0:.15},
    {k:'cart',img:IM.cart,w:470,x:820,by:1350,z:-.9,cols:6,t0:9},
    {k:'grass',img:IM.grass,w:1400,x:540,by:1620,z:1.7,cols:8,t0:0,flat:1}]});
}
function dust(t,n=40){x.save();x.fillStyle='#ffe2a6';for(let i=0;i<n;i++){const xx=(hash(i)*W+t*20*(.5+hash(i+3)))%W,yy=600+hash(i+6)*900+Math.sin(t+i)*20;x.globalAlpha=.25+.4*hash(i+1);x.beginPath();x.arc(xx,yy,2+hash(i+2)*3,0,6.28);x.fill()}x.restore()}
function warm(a){x.fillStyle=`rgba(255,150,50,${a})`;x.fillRect(0,0,W,H)}
function S1(lt,t){d3('lab',lt*1.2,t,{el:.35-.1*eio(lt/3),dist:1.1-.12*eio(lt/3),ly:.7},{over:{cart:{hide:1}}});warm(.06);dust(t);
  tape('पत्थरों की भूलभुलैया!',470,250,72,1,{seed:3});chip('⏳ 2,000 साल पुरानी',470,375,46,(lt-P[2])/.3,'#111','#fff',.03);
  if(lt>P[2]+.4){const [px,py]=D3.project('lab','maze',.5);redCircle(px,py-60,380,120,(lt-P[2]-.4)/.6)}}
function S2(lt,t){dots('#c9a46a','#f6ecd8');const cx=470,cy=750,s=680;img(IM.labyrinth,cx,cy,s*back(lt/.4),{rot:lt*.06});
  tape('कितनी बड़ी?',470,230,70,cl(lt/.3),{seed:7});const a=lt-(P[3]-P[3]-.05);
  if(a>0){x.save();x.strokeStyle='#E23B3B';x.lineWidth=7;x.setLineDash([16,10]);const p=eio(a/.6);x.beginPath();x.moveTo(cx-s/2,cy+s/2+40);x.lineTo(cx-s/2+s*p,cy+s/2+40);x.stroke();x.restore();chip('↔ 50 फ़ुट चौड़ी',cx,cy+s/2+110,48,(a-.3)/.3,'#FFD43B','#111',-.02)}
  const b=lt-(P[4]-P[3]);if(b>0){const n=Math.min(15,Math.floor(b/.08)+1);for(let i=0;i<n;i++){x.strokeStyle=`rgba(255,180,40,${.75-i*.03})`;x.lineWidth=5;x.beginPath();x.arc(cx,cy,s*.47-i*s*.03,0,6.28);x.stroke()}chip('⭕ '+n+' घेरे',cx,cy-s/2-50,50,b/.25,'#111','#fff',.02)}}
function S3(lt,t){const k=eio(lt/(P[7]-P[5]));d3('lab',99,t,{el:.3-.12*k,dist:1.02-.08*k,az:-.25+.5*k,ly:.7},{over:{cart:{hide:1}}});warm(.08);dust(t);
  tape('📍 सोलापुर, महाराष्ट्र',470,250,64,cl(lt/.3),{seed:11});chip('बोरामणी घास का मैदान',470,370,44,(lt-.6)/.3,'#fff','#111',.03);
  chip('🏆 भारत की सबसे बड़ी गोल भूलभुलैया',470,480,42,(lt-(P[6]-P[5]))/.3,'#FFD43B','#111',-.02)}
function mapPt(lon,lat){return [40+(lon-72)*195,520+(20-lat)*210]}
function S4(lt,t){dots('#3a7ca5','#e9f3f8');tape('हैरानी की बात!',470,230,70,cl(lt/.3),{seed:15});
  const sx=Math.cos(lt*1.4),cs=back((lt-(P[8]-P[7]))/.4);if(cs>0){x.save();x.translate(470,640);x.scale(Math.max(.08,Math.abs(sx))*cs,cs);img(IM.coin,0,0,460,{});x.restore();chip('🪙 वही डिज़ाइन!',470,930,46,(lt-(P[8]-P[7])-.3)/.3,'#FFD43B','#111',.02)}
  const c=lt-(P[9]-P[7]);if(c>0){const A=[170,1200],B=[790,1200],p=eio(c/1);x.save();x.strokeStyle='#E23B3B';x.lineWidth=7;x.setLineDash([14,10]);x.beginPath();for(let i=0;i<=40*p;i++){const u=i/40,xx=A[0]+(B[0]-A[0])*u,yy=A[1]+(B[1]-A[1])*u-Math.sin(u*Math.PI)*170;i?x.lineTo(xx,yy):x.moveTo(xx,yy)}x.stroke();x.restore();
    chip('🇮🇳 भारत',A[0]+30,A[1]+60,40,c/.3,'#ff9a3c','#111',0);if(p>.95)chip('🏛️ क्रीट (ग्रीस)',B[0]-40,B[1]+60,40,(c-1)/.3,'#4fa8ff','#fff',0);chip('हज़ारों km ✈️',480,1090-30,40,(c-.4)/.3,'#fff','#111',-.03)}}
function S5(lt,t){dots('#b7792f','#3a2410');
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-260,y0-300,1080*1.05,1920*1.05);img(IM.labyrinth,x0+w/2,y0+h-260,400,{rot:lt*.1})},330,900);
  tape('किसने बनाई? क्यों?',470,210,68,cl(lt/.3),{seed:19});qmarks(lt,[[720,520,.2],[870,700,-.25],[760,900,.1]]);
  tape('कमेंट में लिखो!',470,1300,54,cl((lt-(P[14]-P[11]))/.3),{fill:'#fff',seed:23,rot:.03});
  const a=P[16]-P[11]-.25,b=P[18]-P[11];if(lt>a&&lt<b+.2)subCTA(lt-a,470,1180);if(lt>b)chip('जवाब: रोम 🏛️',600,880,48,(lt-b)/.3,'#FFD43B','#111',-.02)}
function sea(t){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#ffcf8a');g.addColorStop(.45,'#f59e5b');g.addColorStop(.46,'#2f7fa8');g.addColorStop(1,'#123d5c');x.fillStyle=g;x.fillRect(0,0,W,H);
  for(let r=0;r<7;r++){x.fillStyle=`rgba(255,255,255,${.12+r*.03})`;const yy=900+r*130;x.beginPath();x.moveTo(0,H);for(let xx=0;xx<=W;xx+=30)x.lineTo(xx,yy+Math.sin(xx*.012+t*1.6+r)*14);x.lineTo(W,H);x.fill()}}
function S6(lt,t){sea(t);const sh=lt-.2;if(sh>0)img(IM.ship,-200+700*eio(sh/(P[23]-P[19]-.4)),1000+Math.sin(lt*2)*10,560,{rot:Math.sin(lt*1.5)*.035});
  tape('राज़: भारत–रोम व्यापार!',470,250,64,cl((lt-(P[20]-P[19]))/.3),{seed:27});chip('👑 सातवाहन काल',470,380,46,(lt-(P[21]-P[19]))/.3,'#111','#fff',.03);
  chip('🚢 रोम → भारत',470,480,44,(lt-(P[22]-P[19]))/.3,'#4fa8ff','#fff',-.02)}
function S7(lt,t){dots('#d39b4a','#fff4de');tape('लेन-देन ⚖️',470,230,72,cl(lt/.3),{seed:31});
  const g=lt-.05;if(g>0)pop(IM.gold,280,840,420,g*1.2,{});chip('🏛️ रोम से',280,420+80,42,g/.3,'#4fa8ff','#fff',.02);chip('सोना',280,900,44,g/.3,'#FFD43B','#111',-.02);chip('शराब, गहने',280,980,42,(lt-(P[24]-P[23]))/.3,'#fff','#111',.02);
  const e=lt-(P[25]-P[23]);if(e>0){x.save();x.strokeStyle='#E23B3B';x.lineWidth=9;x.lineCap='round';const p=eio(e/.5);x.beginPath();x.moveTo(420,620);x.lineTo(420+120*p,620);x.stroke();x.beginPath();x.moveTo(540,700);x.lineTo(540-120*p,700);x.stroke();x.restore()}
  const s=lt-(P[26]-P[23]);if(s>0)pop(IM.spices,680,840,420,s*1.2,{});chip('🇮🇳 भारत से',680,500,42,s/.3,'#ff9a3c','#111',-.02);chip('रेशम',680,900,44,s/.3,'#e84a8a','#fff',.02);chip('नील, मसाले',680,980,42,(lt-(P[27]-P[23]))/.3,'#2b4fb8','#fff',-.02)}
const SITES=[['सोलापुर',75.9,17.7,0],['सांगली',74.6,16.85,P[31]],['सातारा',74.0,17.7,P[32]],['कोल्हापुर',74.2,16.7,P[32]+.9]];
function S8(lt,t){dots('#b98a4a','#f4e3c3');const T=lt+P[28];
  x.save();x.fillStyle='#7fb8d6';x.beginPath();x.moveTo(0,300);for(let i=0;i<=20;i++){const [cx,cy]=mapPt(72.9-Math.sin(i*1.3)*.08+(i/20)*1.3,21-i*.3);x.lineTo(cx,cy)}x.lineTo(0,1500);x.fill();x.restore();
  x.fillStyle='#2f5f7a';x.font=F(700,34);x.textAlign='left';x.fillText('अरब सागर',30,700);
  const port=mapPt(72.85,19.2);x.fillStyle='#2b4fb8';x.beginPath();x.arc(port[0],port[1],14,0,6.28);x.fill();chip('⚓ बंदरगाह',port[0]+80,port[1]-50,36,(lt-.3)/.3,'#2b4fb8','#fff',0);
  const r=lt-(P[29]-P[28]);let pts=[port,mapPt(74.0,17.7),mapPt(74.6,16.85),mapPt(75.9,17.7)];
  if(r>0){const p=eio(r/2.5);x.save();x.strokeStyle='#E23B3B';x.lineWidth=7;x.setLineDash([16,10]);x.beginPath();x.moveTo(port[0],port[1]);const segs=pts.length-1,u=p*segs;for(let i=1;i<=segs;i++){const f=cl(u-(i-1));if(f<=0)break;const a=pts[i-1],b=pts[i];x.lineTo(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f)}x.stroke();x.restore();
    const ui=Math.min(segs-1e-3,u),si=Math.floor(ui),f=ui-si,a=pts[si],b=pts[si+1];img(IM.cart,a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f-50,230,{})}
  SITES.forEach(([n,lo,la,at],i)=>{const st=T-(i?at:P[29]+.3);if(st<=0)return;const [px,py]=mapPt(lo,la);x.save();x.translate(px,py);const s=back(st/.35);x.scale(s,s);img(IM.labyrinth,0,0,80,{});x.restore();chip(n,px+(i===3?-60:20),py+(i===1?70:-60),36,st/.3,i?'#FFD43B':'#E23B3B',i?'#111':'#fff',0)});
  tape('व्यापार के रास्तों के निशान?',470,230,58,cl((lt-(P[29]-P[28]))/.3),{seed:35});
  if(lt>P[33]-P[28])tape('पत्थरों में लिखा नक्शा 🗺️',470,1330,54,cl((lt-(P[33]-P[28]))/.3),{fill:'#fff',seed:37})}
const OAT=P[35]-.1,OC={c:P[36]-OAT,n:P[37]-OAT,s:P[38]-OAT-.3,e:P[40]-OAT,cmt:'सोलापुर 🌀'};
function S9(lt,t){outroCTA(lt,t,f=>d3('lab',99,t,{el:.3,dist:1.05,az:.2*Math.sin(lt*.3),ly:.7},{over:{cart:{l:9}},fold:f}),OC)}
const SCN=[{at:0,f:S1},{at:P[3]-.1,f:S2,tr:'page'},{at:P[5]-.1,f:S3,tr:'wave',d:.6},{at:P[7]-.1,f:S4,tr:'slide',d:.5},{at:P[11]-.1,f:S5,tr:'iris',d:.6},
  {at:P[19]-.1,f:S6,tr:'blinds',d:.6},{at:P[23]-.1,f:S7,tr:'tear',d:.6},{at:P[28]-.1,f:S8,tr:'page'},{at:P[35]-.1,f:S9,tr:'wave',d:.6}];
function events(){
  ev(.02,'swell',.5);buildEv('lab',0,1/1.2);ev(.1,'tape');ev(P[2],'slap');ev(P[2]+.4,'scribble',.5);
  ev(P[3]-.6,'page');ev(P[3],'pop');ev(P[3]+.2,'whoosh',.5);ev(P[3]+.4,'slap');for(let i=0;i<15;i++)ev(P[4]+i*.08,'tick',.5);ev(P[4]+1.2,'stamp',.5);
  ev(P[5]-.5,'whoosh');ev(P[5],'tape');ev(P[5]+.6,'slap');ev(P[6],'stamp',.6);
  ev(P[7]-.5,'whoosh');ev(P[7],'tape');ev(P[8],'pop');ev(P[8]+.3,'sparkle');ev(P[9],'whoosh',.6);ev(P[10],'slap');
  ev(P[11]-.6,'whoosh');ev(P[11],'tape');[.4,.6,.8].forEach(d=>ev(P[11]+d,'pop'));ev(P[14],'tape');ev(P[16]-.25,'click');ev(P[16],'bell');ev(P[18]-.6,'riser');ev(P[18],'pop');
  ev(P[19]-.6,'whoosh');ev(P[20],'tape');ev(P[20]+.05,'boom',.5);ev(P[21],'slap');ev(P[22],'slap');
  ev(P[23]-.6,'rip');ev(P[23],'tape');ev(P[23]+.1,'pop');ev(P[24],'slap');ev(P[25],'whoosh',.5);ev(P[26],'pop');ev(P[27],'slap');
  ev(P[28]-.6,'page');ev(P[28]+.3,'pop');ev(P[29],'tape');ev(P[29]+.3,'stamp',.5);ev(P[31],'stamp',.5);ev(P[32],'stamp',.5);ev(P[32]+.9,'stamp',.5);ev(P[33],'tape');ev(P[33]+.05,'boom',.4);
  outroEv(OAT,OC);
}
