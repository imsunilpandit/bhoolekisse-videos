// Roopkund — recipe: icy blue Himalaya, snowfall, hail storm; transitions blinds/iris/tear/slide; explainer worlds: teal lab + DNA, 38-dot grid, timeline
const ASSETS=['bg.jpg','lake.png','bones.png','rocks.png','travellers.png','hail.png','ship.png','lab.png'];
KEYW=['हिमालय','पाँच','झील,','झील','कंकाल','कंकालों','रूपकुंड','आठ','तूफ़ान','ओलों','उन्नीस','डीएनए','हैरान','समुद्र','अड़तीस','तेईस','चौदह','भूमध्य','ग्रीस','सातवीं','दसवीं','हज़ार','अठारह','रहस्य'];
const RAAZ=P[19],OUTRO=P[33];
WAVECOLS=['#9fb4cc','#bccbdc','#d7e1ec','#f1f5fa'];
function setup(){
  D3.addSet('roop',{bg:IM.bg,floorY:1520,groundBy:1350,layers:[
    {k:'lake',img:IM.lake,w:780,x:540,by:1350,z:-.3,cols:7,t0:.15},
    {k:'trav',img:IM.travellers,w:600,x:640,by:1360,z:.4,cols:6,t0:9},
    {k:'bones',img:IM.bones,w:640,x:330,by:1450,z:1.25,cols:5,t0:9},
    {k:'rocks',img:IM.rocks,w:1350,x:540,by:1600,z:1.7,cols:8,t0:0,flat:1},
    {k:'hail',img:IM.hail,w:520,x:540,by:560,z:-1,mode:'card',anim:'pop',t0:9,snap:false,flat:1}]});
}
function snow(t,n=70,sp=60,a=.8){x.save();x.fillStyle='#fff';for(let i=0;i<n;i++){const y=(hash(i)*H+t*sp*(.6+hash(i+2)))%H,xx=(hash(i+5)*W+Math.sin(t+i)*30)%W;x.globalAlpha=a*(.4+.6*hash(i+7));x.beginPath();x.arc(xx,y,2+hash(i+3)*3,0,6.28);x.fill()}x.restore()}
function cold(a){x.fillStyle=`rgba(20,40,80,${a})`;x.fillRect(0,0,W,H)}
function S1(lt,t){const bl=lt-(P[3]-.1);d3('roop',lt*1.3,t,{el:.22-.15*eio(lt/2.2),dist:1.1-.1*eio(lt/2.2),ly:.6},{over:{bones:{l:bl},trav:{hide:1},hail:{hide:1}}});cold(.1);snow(t);
  tape('कंकालों वाली झील!',470,250,76,1,{seed:5});chip('🏔️ 5,000 मीटर ऊँचाई',470,375,44,(lt-P[1])/.3,'#111','#fff',.03);
  if(bl>.4){const [px,py]=D3.project('roop','bones',.5);redCircle(px,py-30,230,110,(bl-.4)/.6)}}
function S2(lt,t){const k=eio(lt/(P[8]-P[6]));d3('roop',99,t,{el:.1+.12*k,dist:1.0-.1*k,az:-.2+.35*k,ly:.6},{over:{trav:{hide:1},hail:{hide:1}}});snow(t,50);
  tape('रूपकुंड झील',470,250,84,cl((lt-.1)/.3),{seed:9});chip('📍 उत्तराखंड',470,375,44,(lt-.3)/.3,'#9fd0f0','#111',.03);
  const c=lt-(P[7]-P[6]);if(c>0){const n=Math.round(800*eio(c/1.4));chip('💀 ~'+n+' लोगों के अवशेष',470,1180,52,c/.3,'#FFD43B','#111',-.02)}}
function hailFall(t,a){x.save();x.fillStyle='#fff';x.globalAlpha=a;for(let i=0;i<55;i++){const y=(hash(i)*H+t*900)%H,xx=hash(i+4)*W+(y*.15);x.beginPath();x.arc(xx%W,y,5+hash(i+2)*7,0,6.28);x.fill()}x.restore()}
function S3(lt,t){const hl=lt-.2,tw=eio(lt/(P[11]-P[8]));d3('roop',99,t,{el:.12,dist:.98,az:.1,ly:.8},{over:{hail:{l:hl,dy:Math.sin(t*1.5)*.1},trav:{l:9,dx:.7-1.4*tw},bones:{hide:1}},shake:lt>P[9]-P[8]?.35:0});
  cold(.3*cl(lt/.6));if(lt>P[9]-P[8])hailFall(t,cl((lt-(P[9]-P[8]))/.5));
  chip('⛈️ एक ही तूफ़ान?',470,300,52,(lt-.1)/.3,'#fff','#111',-.03);chip('कहते हैं: बड़े ओले 🧊',470,420,48,(lt-(P[10]-P[8]))/.3,'#9fd0f0','#111',.03)}
function helix(lt,cx,cy,hgt,hiIdx){for(let i=0;i<24;i++){const yy=cy-hgt/2+i*hgt/23,a=i*.5+lt*1.6,dx=Math.sin(a)*110,z=Math.cos(a);x.strokeStyle=i===hiIdx?'#FFD43B':'rgba(255,255,255,.55)';x.lineWidth=i===hiIdx?12:5;x.beginPath();x.moveTo(cx-dx,yy);x.lineTo(cx+dx,yy);x.stroke();
  x.fillStyle=z>0?'#ff9ec7':'#9ec9ff';x.beginPath();x.arc(cx+dx,yy,10,0,6.28);x.fill();x.fillStyle=z>0?'#9ec9ff':'#ff9ec7';x.beginPath();x.arc(cx-dx,yy,10,0,6.28);x.fill()}}
function S4(lt,t){dots('#3d8a8a','#123c3c');pop(IM.lab,420,1240,620,lt*1.1,{});helix(lt,800,700,620,lt>1.5?12:-1);
  tape('2019: डीएनए जाँच 🧬',470,230,66,cl(lt/.3),{seed:13});chip('😮 वैज्ञानिक हैरान!',470,1330-40,50,(lt-(P[13]-P[11]))/.3,'#FFD43B','#111',-.02)}
function S5(lt,t){dots('#3a5f8a','#0f2238');
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-260,y0-300,1080*1.05,1920*1.05);img(IM.bones,x0+w/2,y0+h-220,420,{})},330,900);
  tape('ये लोग कौन थे?',470,210,74,cl(lt/.3),{seed:21});qmarks(lt,[[720,520,.2],[870,700,-.25],[760,900,.1]]);
  tape('कमेंट में लिखो!',470,1300,54,cl((lt-(P[14]-P[14]))/.3),{fill:'#fff',seed:23,rot:.03});
  const a=P[16]-P[14]-.25,b=P[18]-P[14];if(lt>a&&lt<b+.2)subCTA(lt-a,470,1180);if(lt>b){pop(IM.ship,760,1200,300,(lt-b)*1.2,{});chip('जवाब: समुद्र पार 🌊',560,880,46,(lt-b)/.3,'#FFD43B','#111',-.02)}}
function S6(lt,t){x.fillStyle='#10213a';x.fillRect(0,0,W,H);snow(t,40,30,.5);
  tape('राज़: एक साथ नहीं मरे!',470,230,66,cl((lt-(P[20]-P[19]))/.3),{seed:31});
  const g=lt-(P[21]-P[19]),o=lt-(P[22]-P[19]),b=lt-(P[23]-P[19]);
  for(let i=0;i<38;i++){const p=back((g-i*.03)/.25);if(p<=0)continue;const cx=170+(i%8)*95,cy=430+Math.floor(i/8)*105;let col='#cfd6e0';if(o>0&&i<23)col='#ff9a3c';if(b>0&&i>=23&&i<37)col='#4fa8ff';
    x.save();x.translate(cx,cy);x.scale(p,p);x.fillStyle=col;x.beginPath();x.arc(0,-14,18,0,6.28);x.fill();rr(-22,6,44,34,12);x.fill();x.restore()}
  chip('🔢 38 कंकाल',470,1010,48,g/.3,'#fff','#111',.02);chip('🟠 23 = दक्षिण एशियाई',470,1110,46,o/.3,'#ff9a3c','#111',-.02);chip('🔵 14 = भूमध्य सागर (ग्रीस)',470,1210,46,(lt-(P[24]-P[19]))/.3,'#4fa8ff','#fff',.02)}
function S7(lt,t){dots('#c9a46a','#f6ecd8');tape('हज़ार साल का फ़ासला!',470,230,66,cl(lt/.3),{seed:41});
  const y=760,x0=110,x1=870,yr=v=>x0+(v-500)/(1950-500)*(x1-x0);x.strokeStyle='#5a3b17';x.lineWidth=8;x.beginPath();x.moveTo(x0,y);x.lineTo(x1,y);x.stroke();
  x.fillStyle='#5a3b17';x.font=F(800,34);x.textAlign='center';[600,1000,1400,1800].forEach(v=>{x.fillRect(yr(v)-3,y-16,6,32);x.fillText(v,yr(v),y+56)});
  const a=eio((lt-.2)/.8);if(a>0){x.fillStyle='rgba(255,154,60,.85)';rr(yr(600),y-60,(yr(1000)-yr(600))*a,40,10);x.fill();chip('🟠 7वीं–10वीं सदी',(yr(600)+yr(1000))/2,y-120,40,(lt-.5)/.3,'#ff9a3c','#111',-.02)}
  const b=lt-(P[27]-P[26]);if(b>0){x.save();x.translate(yr(1800),y-40);x.scale(back(b/.3),back(b/.3));x.fillStyle='#4fa8ff';x.beginPath();x.arc(0,0,26,0,6.28);x.fill();x.restore();chip('🔵 ~1800',yr(1800),y-120,40,b/.3,'#4fa8ff','#fff',.02)}
  const c=lt-(P[28]-P[26]);if(c>0){x.save();x.strokeStyle='#E23B3B';x.lineWidth=6;x.setLineDash([14,10]);const pe=eio(c/.8);x.beginPath();x.moveTo(yr(950),y+110);x.lineTo(yr(950)+(yr(1800)-yr(950))*pe,y+110);x.stroke();x.restore();chip('≈ 1000 साल बाद',470,y+190,46,(c-.5)/.3,'#FFD43B','#111',0)}
  const s=lt-(P[27]-P[26]);if(s>0)img(IM.ship,140+520*eio(s/3),1230+Math.sin(lt*2)*8,320,{rot:Math.sin(lt*1.6)*.03})}
function S8(lt,t){const k=eio(lt/(OUTRO-P[30]));d3('roop',99,t,{el:.16,dist:1.0-.06*k,az:.25-.35*k,ly:.6},{over:{trav:{l:9,dx:-1+2*k},hail:{hide:1}}});cold(.2);snow(t,60);
  chip('🤔 इतनी दूर से क्यों आए?',470,300,48,(lt-.2)/.3,'#fff','#111',-.03);if(lt>P[32]-P[30])tape('आज भी रहस्य ❓',470,430,70,cl((lt-(P[32]-P[30]))/.3),{seed:51})}
const OAT=P[33]-.1,OC={c:P[34]-OAT,n:P[35]-OAT,s:P[36]-OAT-.3,e:P[38]-OAT,cmt:'रूपकुंड 🏔️'};
function S9(lt,t){outroCTA(lt,t,f=>d3('roop',99,t,{el:.14,dist:1.05,az:.2*Math.sin(lt*.3),ly:.7},{over:{trav:{hide:1},hail:{hide:1}},fold:f}),OC)}
const SCN=[{at:0,f:S1},{at:P[6]-.1,f:S2,tr:'flash',d:.4},{at:P[8]-.1,f:S3,tr:'cut',d:0},{at:P[11]-.1,f:S4,tr:'blinds',d:.6},{at:P[14]-.1,f:S5,tr:'slide',d:.5},
  {at:P[19]-.1,f:S6,tr:'iris',d:.6},{at:P[26]-.1,f:S7,tr:'page'},{at:P[30]-.1,f:S8,tr:'tear',d:.6},{at:P[33]-.1,f:S9,tr:'flash',d:.4}];
function events(){
  ev(.02,'swell',.5);buildEv('roop',0,1/1.3);ev(.1,'tape');ev(P[1],'slap');ev(P[3],'stone',.8);ev(P[3]+.4,'scribble',.5);ev(P[5],'boom',.4);
  ev(P[6]-.4,'whoosh',.6);ev(P[6],'tape');ev(P[6]+.2,'slap');for(let i=0;i<9;i++)ev(P[7]+i*.15,'tick',.6);ev(P[7]+1.4,'stamp',.5);
  ev(P[8],'rumble',.7);ev(P[8]+.2,'slap');ev(P[9],'boom',.5);ev(P[10],'slap');
  ev(P[11]-.6,'flip');ev(P[11],'tape');ev(P[11]+.1,'pop');ev(P[12]+1,'sparkle');ev(P[13],'slap');
  ev(P[14]-.5,'whoosh');ev(P[14],'tape');[.4,.6,.8].forEach(d=>ev(P[14]+d,'pop'));ev(P[16]-.25,'click');ev(P[16],'bell');ev(P[18]-.6,'riser');ev(P[18],'pop');
  ev(P[19]-.6,'whoosh');ev(P[20],'tape');ev(P[20]+.05,'boom',.5);for(let i=0;i<10;i++)ev(P[21]+i*.11,'pop',.35);ev(P[22],'slap');ev(P[23],'slap');ev(P[24],'slap');
  ev(P[26]-.6,'page');ev(P[26],'tape');ev(P[26]+.2,'whoosh',.5);ev(P[27],'pop');ev(P[28],'slap');ev(P[28]+.5,'slap');
  ev(P[30]-.6,'rip');ev(P[30],'slap');ev(P[32],'tape');ev(P[32]+.05,'boom',.4);
  outroEv(OAT,OC);
}
