// v2 Kedarnath — recipe: cold Himalayan blue + muddy flood, transitions wave(mud)/blinds/slide/flash, explainer world: top-down paper map with flowing arrows
const ASSETS=['bg.jpg','temple.png','shila.png','flood.png','houses.png'];
KEYW=['सोलह','जून','तेरह','सैलाब','बह','बच','केदारनाथ','हिमालय','बारह','चट्टान','विशाल','सब्सक्राइब','लुढ़काता','अटक','दोनों','ढाल','भीम','शिला','पूजा','केदार','हैरान'];
const RAAZ=P[20],OUTRO=P[37];
WAVECOLS=['#4a3b2c','#6b5640','#8c7458','#b59c7c'];
function setup(){
  D3.addSet('ked',{bg:IM.bg,floorY:1500,slab:{color:'#7d7a72',top:'#a7a39a',by:1300,w:8,d:2.6},layers:[
    {k:'houses',img:IM.houses,w:1300,x:540,by:1290,z:-1.2,cols:8,t0:.05},
    {k:'shila',img:IM.shila,w:780,x:540,by:1300,z:-.7,cols:6,t0:0,anim:'drop'},
    {k:'temple',img:IM.temple,mode:'band',bands:7,rise:.3,w:520,x:540,by:1300,z:0,cols:7,t0:.25,step:.26,flat:1},
    {k:'flood',img:IM.flood,w:1500,x:540,by:1560,z:1.5,cols:8,t0:0,fx:'flow'}]});
}
function mud(level,t,a=1){x.save();x.globalAlpha=a;['#5a4632','#7a6046','#9a7d5c'].forEach((c2,i)=>waveLayer(level+i*45,c2,22,i*1.7,t*1.6));x.restore()}
function S1(lt,t){const fp=eio((lt-(P[2]-.3))/1.6);
  const over={shila:{hide:1},flood:{l:fp>0?9:-1,dx:-(1-fp)*14,dy:-.6+fp*.6}};
  d3('ked',lt*1.3,t,{el:.24-.18*eio(lt/2.2),dist:1.12-.1*eio(lt/2.2),ly:.5},{over,shake:fp>0&&fp<1?.6:0});
  if(fp>0)mud(1820-260*fp,t,fp);
  tape('16 जून 2013',470,250,80,1,{seed:5});
  chip('🌊 सैलाब!',470,380,50,(lt-P[2])/.3,'#9a7d5c','#fff',.03);
}
function S2(lt,t){const hp=eio((lt-.6)/2.2);
  const over={shila:{hide:1},flood:{l:9},houses:{l:9,dx:hp*7,dy:-hp*2.8,rz:-hp*.35,hide:hp>=1}};
  d3('ked',99,t,{el:.06,dist:1.02-.06*eio(lt/3),ly:.6},{over,shake:hp<1?.5:.15});mud(1560+Math.sin(t)*10,t,1);
  chip('🏚️ लगभग हर इमारत बह गई',470,380,46,(lt-.3)/.3,'#fff','#111',-.03);
  const bp=lt-(P[5]-P[3]);if(bp>0){redCircle(540,960,330,470,bp/.6);tape('मंदिर बच गया!',470,250,80,cl(bp/.3),{seed:9,fill:'#7fe08a'})}
  else tape('16 जून 2013',470,250,80,1,{seed:5});
}
function S3(lt,t){const over={shila:{hide:1},flood:{l:9},houses:{hide:1}};d3('ked',99,t,{el:.08,dist:.98,ly:.6},{over});mud(1600,t*.4,1);dark(.5*cl(lt/.5));
  chip('🕯️ हज़ारों लोगों ने जान गंवाई',470,700,48,(lt-.3)/.4,'#111','#fff',0);
}
function S4(lt,t){const k=eio(lt/(P[10]-P[7]));const over={shila:{hide:1},flood:{hide:1}};
  d3('ked',lt*1.4,t,{el:.2-.12*k,dist:1.1-.12*k,az:-.25+.4*k,ly:.6+.4*k},{over});
  chip('📍 उत्तराखंड',470,380,46,(lt-.2)/.3,'#9fd0f0','#111',.03);
  chip('🏔️ हिमालय की गोद में',300,1150,44,(lt-(P[8]-P[7]))/.3,'#fff','#111',-.03);
  tape('केदारनाथ धाम',470,250,84,cl((lt-(P[8]-P[7])-.3)/.3),{seed:13});
  chip('🔱 12 ज्योतिर्लिंगों में से 1',640,1240,44,(lt-(P[9]-P[7]))/.3,'#FFD43B','#111',.03);
}
function S5(lt,t){const k=eio(lt/2.5),sl=lt-(P[12]-P[10]);const over={houses:{hide:1},flood:{hide:1},shila:{l:sl}};
  d3('ked',99,t,{el:.1+.22*k,dist:1.0-.05*k,az:.15+.5*k,ly:.6},{over,shake:sl>.3&&sl<.8?.5:0});
  chip('बाढ़ के बाद...',470,380,48,(lt-.1)/.3,'#111','#fff',-.03);
  if(sl>.5){const [px,py]=D3.project('ked','shila',.5);redCircle(px,py-60,260,140,(sl-.5)/.6);chip('🪨 विशाल चट्टान!',470,250,56,(sl-.4)/.3,'#FFD43B','#111',.02)}
}
function S6(lt,t){dots('#2c4a8a','#14244e');
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-280,y0-260,1080*1.05,1920*1.05);img(IM.temple,x0+w/2+40,y0+h-260,300,{});img(IM.shila,x0+w/2-60,y0+h-150,380,{rot:Math.sin(lt*1.4)*.03})},320,940);
  tape('कहाँ से आई?',470,200,76,cl(lt/.3),{seed:21});
  qmarks(lt,[[700,520,.2],[860,700,-.25],[760,920,.1]]);
  chip('🛕 कैसे बचाया?',790,1130,46,(lt-(P[14]-P[13]))/.3,'#fff','#111',.03);
  tape('कमेंट में लिखो!',470,1290,54,cl((lt-(P[15]-P[13]))/.3),{fill:'#fff',seed:23,rot:.03});
  const a=P[17]-P[13]-.25,b=P[19]-P[13];if(lt>a&&lt<b+.2)subCTA(lt-a,470,1180);
  chip('जवाब 👇',760,1180,48,(lt-b)/.3,'#FFD43B','#111',-.02);
}
function S7(lt,t){const rp=eio((lt-(P[21]-P[20])+.3)/((P[24]-P[21])+.6));const land=rp>=1;
  const over={houses:{hide:1},shila:{l:9,dx:-(1-rp)*9,dz:(1-rp)*2.2,rz:(1-rp)*7,dy:land?0:Math.abs(Math.sin(lt*3))*.25},flood:{l:9}};
  d3('ked',99,t,{el:.22,dist:1.02,az:.35,ly:.6},{over,shake:land&&lt-(P[24]-P[20])<.6?.7:0});mud(1600,t,1);
  tape('राज़: चट्टान खुद बहकर आई!',470,250,60,cl(lt/.3),{seed:31});
  chip('🌊 पानी लुढ़काता लाया',470,380,46,(lt-(P[23]-P[20]))/.3,'#9a7d5c','#fff',.03);
  if(land)chip('📌 ठीक पीछे अटकी!',470,1180,50,(lt-(P[24]-P[20])-.2)/.3,'#FFD43B','#111',-.03);
}
function mapScene(lt,split,shield){x.fillStyle='#d8cfb8';x.fillRect(0,0,W,H);
  // paper mountains top
  for(let i=0;i<6;i++){x.fillStyle=['#8a9bb0','#a5b4c6','#c3cfdc'][i%3];x.beginPath();const cx=i*200+40;x.moveTo(cx-220,560);x.lineTo(cx,300+hash(i)*80);x.lineTo(cx+220,560);x.closePath();x.fill()}
  x.fillStyle='#eef3f8';for(let i=0;i<6;i++){const cx=i*200+40,ty=300+hash(i)*80;x.beginPath();x.moveTo(cx-50,ty+55);x.lineTo(cx,ty);x.lineTo(cx+50,ty+55);x.closePath();x.fill()}
  // valley floor
  x.fillStyle='#b9c99a';x.fillRect(0,560,W,900);
  const TX=470,TY=1110,RX=470,RY=930;
  // flow arrows
  for(let k=0;k<27;k++){const ph=(lt*.45+k/27+(k%9)*.037)%1;const lane=(k%9-4)*62;let px=TX+lane,py=600+ph*700;
    if(split>0&&py>RY-120){const side=lane<0||(lane===0&&k%2)?-1:1;const dd=cl((py-(RY-120))/260)*split;px+=side*dd*(230-Math.abs(lane)*.4)}
    x.save();x.globalAlpha=Math.sin(ph*3.14)*.95;x.strokeStyle='#4f7fb0';x.lineWidth=13;x.lineCap='round';x.beginPath();x.moveTo(px-30,py-34);x.lineTo(px,py);x.lineTo(px+30,py-34);x.stroke();x.restore()}
  // temple square
  x.save();x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=14;x.fillStyle='#9b958a';rr(TX-80,TY-80,160,160,10);x.fill();x.restore();x.fillStyle='#c8b06a';x.beginPath();x.arc(TX,TY,30,0,6.28);x.fill();x.fillStyle='#111';x.font=F(800,34);x.textAlign='center';x.fillText('मंदिर',TX,TY+130);
  // rock
  if(split>0){x.save();x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=14;x.translate(RX,RY);x.scale(back(cl(split*2)),back(cl(split*2)));x.fillStyle='#6d6a66';x.beginPath();x.ellipse(0,0,200,62,0,0,6.28);x.fill();x.restore();
    x.fillStyle='#fff';x.font=F(800,32);x.textAlign='center';x.fillText('भीम शिला',RX,RY+10)}
  if(shield>0){x.save();x.globalAlpha=cl(shield)*.85;x.strokeStyle='#FFD43B';x.lineWidth=12;x.beginPath();x.arc(RX,RY+120,300,-2.6,-.54);x.stroke();x.restore()}}
function S8(lt,t){const sp=eio((lt-(P[27]-P[25]))/1.2);mapScene(lt,sp,eio((lt-(P[30]-P[25]))/.6));
  tape('ऊपर से सैलाब ⬇',470,230,62,cl(lt/.3),{seed:41});
  chip('मंदिर से सीधे नहीं टकराया',470,1315,44,(lt-(P[26]-P[25]))/.3,'#fff','#111',-.02,(lt-(P[26]-P[25])-.5)/.4);
  chip('↙ दोनों तरफ़ ↘',470,700,52,(lt-(P[28]-P[25]))/.3,'#4f7fb0','#fff',.03);
  chip('🛡️ ढाल!',760,1000,56,(lt-(P[30]-P[25]))/.3,'#FFD43B','#111',-.04);
  chip('सैलाब के 2 हिस्से',300,1000,46,(lt-(P[31]-P[25]))/.3,'#fff','#111',.03);
}
function S9(lt,t){const k=eio(lt/(OUTRO-P[32]));const over={houses:{hide:1},flood:{hide:1},shila:{l:9}};
  d3('ked',99,t,{el:.3-.1*k,dist:.92-.08*k,az:.6-.3*k,ly:.5},{over});
  x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(540,1120,20,540,1120,600);g.addColorStop(0,`rgba(255,200,110,${.35+.1*Math.sin(lt*2)})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore();
  tape('भीम शिला 🙏',470,250,84,cl((lt-(P[33]-P[32]))/.3),{seed:51});
  chip('कहते हैं: भीम ने रक्षा की',470,380,44,(lt-(P[35]-P[32]))/.3,'#fff','#111',.03);
  if(lt>P[36]-P[32]){sparkles(540,1100,320,lt,14);chip('🌼 आज भी पूजा',470,1180,50,(lt-(P[36]-P[32]))/.3,'#FFD43B','#111',-.03)}
}
const OAT=P[37]-.1,OC={c:P[38]-OAT,n:P[39]-OAT,s:P[40]-OAT-.3,e:P[42]-OAT,cmt:'जय बाबा केदार'};
function S10(lt,t){outroCTA(lt,t,f=>d3('ked',99,t,{el:.14,dist:1.05,az:.25*Math.sin(lt*.3),ly:.7},{over:{houses:{hide:1},flood:{hide:1},shila:{l:9}},fold:f}),OC)}
const SCN=[{at:0,f:S1},{at:P[3]-.1,f:S2,tr:'cut',d:0},{at:P[6]-.1,f:S3,tr:'cut',d:0},{at:P[7]-.1,f:S4,tr:'wave',d:.7},{at:P[10]-.1,f:S5,tr:'blinds',d:.6},
  {at:P[13]-.1,f:S6,tr:'slide',d:.5},{at:P[20]-.1,f:S7,tr:'wave',d:.7},{at:P[25]-.1,f:S8,tr:'page'},{at:P[32]-.1,f:S9,tr:'blinds',d:.6},{at:P[37]-.1,f:S10,tr:'flash',d:.4}];
function events(){
  ev(.02,'rumble',.5);buildEv('ked',0,1/1.3);ev(.1,'tape');ev(P[2]-.3,'wave',1.1);ev(P[2]+.1,'rumble',.8);ev(P[2]+.2,'slap');
  ev(P[3]+.5,'wave',.9);ev(P[3]+.8,'stone',.8);ev(P[3]+1.3,'stone',.6);ev(P[3]+.3,'slap');ev(P[5],'boom',.6);ev(P[5]+.05,'tape');ev(P[5]+.1,'scribble',.6);
  ev(P[6]+.2,'swell',.4);
  ev(P[7]-.7,'wave',.8);buildEv('ked',P[7]-.1,1/1.4);ev(P[7]+.1,'slap');ev(P[8],'slap');ev(P[8]+.3,'tape');ev(P[9],'slap');ev(P[9]+.1,'shankh',.45);
  ev(P[10]-.6,'flip');ev(P[10],'slap');ev(P[12]+.3,'stone',1);ev(P[12]+.35,'boom',.5);ev(P[12]+.6,'scribble',.6);ev(P[12]+.5,'tape');
  ev(P[13]-.5,'whoosh');ev(P[13],'tape');[0,.2,.4].forEach(d=>ev(P[13]+d,'pop'));ev(P[14],'slap');ev(P[15],'tape');ev(P[17]-.25,'click');ev(P[17],'bell');ev(P[19]-.6,'riser');ev(P[19],'slap');
  ev(P[20]-.7,'wave',.9);ev(P[20],'tape');ev(P[21],'wave',.8);ev(P[23],'slap');ev(P[24]-.05,'stone',1.1);ev(P[24],'boom',.6);ev(P[24]+.2,'slap');
  ev(P[25]-.6,'page');ev(P[25],'tape');ev(P[26],'slap');ev(P[26]+.5,'scribble',.5);ev(P[27],'pop');ev(P[27]+.1,'whoosh',.5);ev(P[28],'slap');ev(P[30],'stamp',.6);ev(P[31],'slap');
  ev(P[32]-.6,'flip');ev(P[32],'swell',.5);ev(P[33],'tape');ev(P[33]+.05,'shankh',.5);ev(P[35],'slap');ev(P[36],'sparkle');ev(P[36]+.1,'slap');
  outroEv(OAT,OC);
}
