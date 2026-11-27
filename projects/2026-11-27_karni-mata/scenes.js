// v4 Karni Mata — recipe: desert gold + royal marble, transitions page/iris/wave(sand)/flash/blinds, explainer worlds: Rajasthani miniature frame + green chalk lab
const ASSETS=['bg.jpg','temple.png','rats.png','white_rat.png','silver_rat.png'];
KEYW=['मंदिर...','बीस','हज़ार','चूहे','दूध','अनाज','देशनोक','करणी','काबा','चाँदी','सफ़ेद','शुभ','पवित्र','माँ','वरदान','दुर्गा','लक्ष्मण','सरोवर','यमराज','वचन','जीन','दर्शन','सब्सक्राइब'];
const RAAZ=P[19],OUTRO=P[37];
WAVECOLS=['#a8692a','#c98a3c','#e3ad5a','#f5d08a'];
function setup(){
  D3.addSet('karni',{bg:IM.bg,floorY:1500,groundBy:1300,layers:[
    {k:'temple',img:IM.temple,mode:'band',bands:6,rise:.34,w:660,x:540,by:1300,z:0,cols:7,t0:.2,step:.26,flat:1},
    {k:'rats',img:IM.rats,w:430,x:300,by:1312,z:1.2,cols:4,t0:9,anim:'pop',mode:'card'},
    {k:'white',img:IM.white_rat,w:230,x:800,by:1315,z:1.5,t0:9,anim:'pop',mode:'card'}]});
}
function counter(lt,cx,cy){const p=eio(lt/1.6);if(lt<=0)return;const n=Math.round(20000*p);chip('🐀 '+n.toLocaleString('en-IN')+(p>=1?'+':''),cx,cy,64,lt/.3,'#FFD43B','#111',-.03)}
function S1(lt,t){const rl=lt-(P[2]-.1);d3('karni',lt*1.25,t,{el:.24-.18*eio(lt/2.2),dist:1.12-.1*eio(lt/2.2),ly:.6},{over:{rats:{l:rl},white:{hide:1}}});
  tape('चूहों का मंदिर!',470,250,82,1,{seed:5});
  chip('🙏 भगवान के साथ...',470,380,44,(lt-P[1])/.3,'#111','#fff',.03);
  counter(lt-P[2],620,1150);
}
function S2(lt,t){const k=eio(lt/2.2);d3('karni',99,t,{el:.06+.1*k,dist:1.02-.3*k,az:-.18*k,lx:-1.7*k,ly:.6-2.0*k},{over:{white:{hide:1}}});
  chip('🦶 भक्तों के पैरों के पास',470,380,46,(lt-.2)/.3,'#fff','#111',-.03);
  chip('🥛 दूध',300,560,56,(lt-(P[4]-P[3])-.4)/.3,'#fff','#111',-.04);chip('🌾 अनाज',700,560,56,(lt-(P[4]-P[3])-.9)/.3,'#F5B841','#111',.04);
}
function S3(lt,t){const k=eio(lt/(P[7]-P[5]));d3('karni',99,t,{el:.16-.08*k,dist:.98+.04*k,az:.25-.4*k,ly:.8},{over:{white:{hide:1}}});
  chip('📍 बीकानेर के पास, राजस्थान',470,380,44,(lt-.15)/.3,'#F5B841','#111',.03);
  tape('करणी माता मंदिर',470,250,80,cl((lt-(P[6]-P[5]))/.3),{seed:9});
  chip('देशनोक',470,1180,50,(lt-(P[6]-P[5]))/.3,'#fff','#111',-.03);
}
function S4(lt,t){dots('#9a2f2f','#f7ecd6');numSticker('1',780,330,(lt-.1)/.3);
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-280,y0-300,1080*1.05,1920*1.05);img(IM.rats,x0+w/2,y0+h-260,440,{})},300,980);
  tape('चूहे = "काबा"',470,200,72,cl(lt/.3),{seed:13});
  chip('🦶 गलती से पैर पड़ा?',470,1330,48,(lt-(P[8]-P[7]))/.3,'#fff','#111',-.02);
  const s=lt-(P[9]-P[7]);if(s>0){x.save();x.fillStyle='rgba(30,10,10,.35)';x.fillRect(0,0,W,H);x.restore();pop(IM.silver_rat,540,1120,620,s*1.1,{});sparkles(540,900,280,lt,14,'#ffffff');tape('चाँदी का चूहा चढ़ाओ!',470,560,64,cl(s/.3),{seed:17,fill:'#e8e8ee'})}
}
function goldGlow(cx,cy,r,lt,a=.4,col='255,196,90'){x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(cx,cy,10,cx,cy,r);g.addColorStop(0,`rgba(${col},${a+.1*Math.sin(lt*2)})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore()}
function S5(lt,t){const wl=lt-(P[11]-P[10]);d3('karni',99,t,{el:.12,dist:.95-.2*eio(lt/2.5),az:.18*eio(lt/2.5),lx:.9*eio(lt/2.5),ly:-.2},{over:{white:{l:wl}}});
  if(wl>0){const [px,py]=D3.project('karni','white',.5);goldGlow(px,py,300,lt,.45,'255,255,235');sparkles(px,py,200,lt,12)}
  chip('पर सबसे खास...',470,380,48,(lt-.1)/.3,'#111','#fff',-.03);
  tape('सफ़ेद चूहे!',470,250,86,cl(wl/.3),{seed:21,fill:'#fff'});
  chip('✨ देखना बहुत शुभ',470,520,50,(lt-(P[12]-P[10]))/.3,'#FFD43B','#111',.03);
}
function S6(lt,t){dots('#c45a2c','#5a1414');
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-280,y0-300,1080*1.05,1920*1.05);img(IM.white_rat,x0+w/2,y0+h-300,360,{})},330,900);
  tape('इतने पवित्र क्यों?',470,210,70,cl(lt/.3),{seed:25});
  qmarks(lt,[[720,520,.2],[870,700,-.25],[760,900,.1]]);
  tape('कमेंट में लिखो!',470,1300,54,cl((lt-(P[14]-P[13]))/.3),{fill:'#fff',seed:23,rot:.03});
  const a=P[16]-P[13]-.25,b=P[18]-P[13];if(lt>a&&lt<b+.2)subCTA(lt-a,470,1180);
  chip('जवाब: माँ की कहानी 👇',620,1180,46,(lt-b)/.3,'#FFD43B','#111',-.02);
}
function S7(lt,t){d3('karni',lt*1.3,t,{el:.2-.14*eio(lt/2),dist:1.08-.1*eio(lt/2),ly:.7},{over:{white:{hide:1},rats:{hide:1}}});goldGlow(540,900,600,lt,.3);
  tape('राज़: करणी माता का वरदान!',470,250,60,cl((lt-(P[20]-P[19]))/.3),{seed:31});
  chip('🔱 माँ दुर्गा का अवतार',470,380,48,(lt-(P[21]-P[19]))/.3,'#E23B3B','#fff',.02);
}
function mini(lt,night){x.fillStyle=night?'#2a1d3a':'#7a1f1f';x.fillRect(0,0,W,H);
  // ornate border
  x.save();x.strokeStyle='#e8b64a';x.lineWidth=10;x.strokeRect(60,240,960,1180);x.lineWidth=4;x.strokeRect(84,264,912,1132);
  for(let i=0;i<38;i++){const px=84+i*24.6;x.fillStyle=i%2?'#e8b64a':'#2f7a5a';x.beginPath();x.arc(px,252,6,0,6.28);x.fill();x.beginPath();x.arc(px,1408,6,0,6.28);x.fill()}x.restore();
  x.fillStyle=night?'#3b4a7a':'#f3dfb0';x.fillRect(96,276,888,1108);
  if(night){for(let i=0;i<40;i++){x.fillStyle='#ffe9a8';x.globalAlpha=.5+.5*Math.sin(lt*2+i);x.beginPath();x.arc(110+hash(i)*860,290+hash(i+4)*500,2+hash(i+2)*2,0,6.28);x.fill()}x.globalAlpha=1}
  // dunes + sarovar
  x.fillStyle=night?'#6b5a4a':'#e0b56a';x.beginPath();x.moveTo(96,1000);x.quadraticCurveTo(400,860,700,980);x.quadraticCurveTo(880,1040,984,960);x.lineTo(984,1384);x.lineTo(96,1384);x.closePath();x.fill();
  x.fillStyle=night?'#2c4f7a':'#4a9ad0';x.beginPath();x.ellipse(540,1180,330,120,0,0,6.28);x.fill();
  x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=4;for(let i=0;i<3;i++){x.beginPath();x.ellipse(540,1180,80+i*80,30+i*28,0,0,6.28);x.stroke()}}
function S8(lt,t){mini(lt,false);
  chip('📜 कहते हैं...',470,330,52,(lt-.1)/.3,'#111','#fff',-.03);
  tape('परिवार का बेटा: लक्ष्मण',470,520,58,cl((lt-(P[23]-P[22]))/.3),{seed:41});
  const d=lt-(P[25]-P[22]);if(d>0){x.save();x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=6;for(let i=0;i<3;i++){const r=((d*.8+i/3)%1);x.globalAlpha=1-r;x.beginPath();x.ellipse(540,1180,40+r*260,14+r*90,0,0,6.28);x.stroke()}x.restore();chip('🌊 सरोवर में डूब गया',470,700,48,d/.3,'#fff','#111',.02)}
}
function S9(lt,t){mini(lt,true);
  chip('🙏 करणी माता की विनती',470,330,48,(lt-.1)/.3,'#F5B841','#111',-.02);
  tape('यमराज का वचन!',470,520,70,cl((lt-(P[27]-P[26]))/.3),{seed:45});
  const r=lt-(P[28]-P[26]);if(r>0){pop(IM.rats,540,1260,480,r*1.1,{});chip('वंश ➜ चूहों के रूप में',470,700,48,(r-.3)/.3,'#fff','#111',.02)}
}
function S10(lt,t){const k=eio(lt/(P[33]-P[29]));d3('karni',99,t,{el:.14,dist:.9-.08*k,az:-.15+.3*k,ly:.2},{});
  chip('👨‍👩‍👦 माँ का परिवार',470,380,50,(lt-(P[30]-P[29]))/.3,'#fff','#111',-.03);
  const w=lt-(P[31]-P[29]);if(w>0){const [px,py]=D3.project('karni','white',.5);goldGlow(px,py,280,lt,.45,'255,255,235');sparkles(px,py,190,lt,12);
    tape('सफ़ेद = करणी माता और बेटे',470,250,54,cl((lt-(P[32]-P[29]))/.3),{seed:51,fill:'#fff'})}
}
function helix(lt,cx,cy,hgt,hi){for(let i=0;i<26;i++){const yy=cy-hgt/2+i*hgt/25,a=i*.5+lt*1.6,dx=Math.sin(a)*120,z=Math.cos(a);
  x.strokeStyle=(hi&&i===13)?'#FFD43B':'rgba(255,255,255,.55)';x.lineWidth=(hi&&i===13)?12:5;x.beginPath();x.moveTo(cx-dx,yy);x.lineTo(cx+dx,yy);x.stroke();
  x.fillStyle=z>0?'#ff9ec7':'#9ec9ff';x.beginPath();x.arc(cx+dx,yy,10,0,6.28);x.fill();x.fillStyle=z>0?'#9ec9ff':'#ff9ec7';x.beginPath();x.arc(cx-dx,yy,10,0,6.28);x.fill()}}
function S11(lt,t){dots('#3d6b52','#1f3a2c');tape('विज्ञान कहता है 🔬',470,230,66,cl(lt/.3),{seed:61});
  const hi=lt>P[34]-P[33]+.5;helix(lt,330,820,760,hi);
  if(hi)chip('🧬 दुर्लभ जीन',330,1260,48,(lt-(P[34]-P[33])-.5)/.3,'#FFD43B','#111',-.03);
  const b=lt-(P[35]-P[33]);if(b>0){pop(IM.white_rat,740,1060,300,b*1.1,{});goldGlow(740,900,240,lt,.35,'255,255,235')}
  chip('भक्तों के लिए: माँ के दर्शन 🙏',470,1360-40,44,(lt-(P[36]-P[33]))/.3,'#fff','#111',.02);
}
const OAT=P[37]-.1,OC={c:P[38]-OAT,n:P[39]-OAT,s:P[40]-OAT-.3,e:P[42]-OAT,cmt:'जय करणी माता'};
function S12(lt,t){outroCTA(lt,t,f=>d3('karni',99,t,{el:.14,dist:1.05,az:.25*Math.sin(lt*.3),ly:.7},{fold:f}),OC)}
const SCN=[{at:0,f:S1},{at:P[3]-.1,f:S2,tr:'cut',d:0},{at:P[5]-.1,f:S3,tr:'flash',d:.4},{at:P[7]-.1,f:S4,tr:'page'},{at:P[10]-.1,f:S5,tr:'iris',d:.7},{at:P[13]-.1,f:S6,tr:'blinds',d:.6},
  {at:P[19]-.1,f:S7,tr:'wave',d:.7},{at:P[22]-.1,f:S8,tr:'page'},{at:P[26]-.1,f:S9,tr:'flash',d:.5},{at:P[29]-.1,f:S10,tr:'iris',d:.7},{at:P[33]-.1,f:S11,tr:'blinds',d:.6},{at:P[37]-.1,f:S12,tr:'flash',d:.4}];
function events(){
  ev(.02,'swell',.45);buildEv('karni',0,1/1.25);ev(.1,'tape');ev(P[1],'slap');ev(P[2]-.1,'pop');for(let i=0;i<10;i++)ev(P[2]+i*.15,'tick',.6);ev(P[2]+1.6,'stamp',.6);
  ev(P[3]+.2,'slap');ev(P[3]+.3,'whoosh',.5);ev(P[4]+.4,'slap');ev(P[4]+.9,'slap');
  ev(P[5]-.4,'whoosh',.6);ev(P[5]+.05,'slap');ev(P[6],'tape');ev(P[6]+.05,'bell',.6);
  ev(P[7]-.6,'page');ev(P[7],'tape');ev(P[7]+.1,'pop');ev(P[8],'slap');ev(P[9],'pop');ev(P[9]+.1,'sparkle');ev(P[9]+.05,'tape');
  ev(P[10]-.7,'whoosh');ev(P[10],'slap');ev(P[11],'pop');ev(P[11]+.05,'sparkle');ev(P[11],'tape');ev(P[12],'slap');
  ev(P[13]-.6,'flip');ev(P[13],'tape');[.4,.6,.8].forEach(d=>ev(P[13]+d,'pop'));ev(P[14],'tape');ev(P[16]-.25,'click');ev(P[16],'bell');ev(P[18]-.6,'riser');ev(P[18],'slap');
  ev(P[19]-.7,'wave',.6);buildEv('karni',P[19]-.1,1/1.3);ev(P[20]-.05,'boom',.5);ev(P[20],'tape');ev(P[20]+.1,'shankh',.45);ev(P[21],'slap');
  ev(P[22]-.6,'page');ev(P[22],'slap');ev(P[23],'tape');ev(P[25],'splash',.5);ev(P[25]+.1,'slap');
  ev(P[26]-.5,'whoosh');ev(P[26],'slap');ev(P[27],'tape');ev(P[27]+.05,'boom',.4);ev(P[28],'pop');ev(P[28]+.3,'slap');
  ev(P[29]-.7,'whoosh');ev(P[30],'slap');ev(P[31],'sparkle');ev(P[32],'tape');
  ev(P[33]-.6,'flip');ev(P[33],'tape');ev(P[34]+.5,'pop');ev(P[34]+.5,'slap');ev(P[35],'pop');ev(P[35]+.1,'sparkle');ev(P[36],'slap');
  outroEv(OAT,OC);
}
