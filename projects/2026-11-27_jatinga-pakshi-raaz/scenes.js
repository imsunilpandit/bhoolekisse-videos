// Jatinga — recipe: foggy night village, fog-wipe transitions (grey wave), iris/blinds; explainer worlds: night-sky checklist + compass
const ASSETS=['bg.jpg','houses.png','hut.png','lantern.png','hills.png','flock.png','heron.png','fog.png'];
KEYW=['असम','गाँव','पक्षी','गिरने','सितंबर','नवंबर','अँधेरी','जटिंगा','चौवालीस','रोशनी','आत्महत्या','कोहरे','कोहरा','हवा','चाँद','बराइल','बूंदाबांदी','भटक','दुर्लभ','बचाया'];
const RAAZ=P[17],OUTRO=P[34];
WAVECOLS=['#8d94a6','#a9afbe','#c6cad5','#e2e5ec'];
function setup(){
  D3.addSet('jat',{bg:IM.bg,floorY:1500,groundBy:1330,layers:[
    {k:'houses',img:IM.houses,w:700,x:470,by:1330,z:-.9,cols:7,t0:.1},
    {k:'hut',img:IM.hut,w:430,x:830,by:1330,z:.3,cols:5,t0:.35},
    {k:'lantern',img:IM.lantern,w:150,x:200,by:1340,z:.7,cols:2,t0:.55},
    {k:'hills',img:IM.hills,w:1350,x:540,by:1600,z:1.7,cols:8,t0:0,flat:1},
    {k:'flock',img:IM.flock,w:420,x:560,by:700,z:.2,mode:'card',anim:'pop',t0:9,snap:false,flat:1},
    {k:'heron',img:IM.heron,w:300,x:600,by:820,z:.6,mode:'card',anim:'pop',t0:9,snap:false,flat:1}]});
}
function fogLayer(t,y,a,sp=30,s=1){x.save();x.globalAlpha=a;const w=1300*s,h=w*IM.fog.height/IM.fog.width;for(let k=-1;k<2;k++){x.drawImage(IM.fog,((t*sp)%w)+k*w-150,y,w,h)}x.restore()}
function night(a){x.fillStyle=`rgba(12,10,40,${a})`;x.fillRect(0,0,W,H)}
function glow(px,py,r,a){x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(px,py,5,px,py,r);g.addColorStop(0,`rgba(255,200,110,${a})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(px-r,py-r,2*r,2*r);x.restore()}
function lanternGlow(t,a=.7){const [px,py]=D3.project('jat','lantern',.78);glow(px+40,py,260+20*Math.sin(t*3),a)}
function fallingHeron(l,x0,y0){if(l<=0||l>2.2)return;const p=eio(l/2.2);const px=x0+260*p+Math.sin(l*5)*20,py=y0+700*p*p;x.save();x.translate(px,py);x.rotate(.4+p*1.0+Math.sin(l*7)*.15);const w=260,h=w*IM.heron.height/IM.heron.width;x.globalAlpha=1-cl((l-1.8)/.4);x.drawImage(IM.heron,-w/2,-h/2,w,h);x.restore()}
function S1(lt,t){const fl=lt-(P[1]-.2);d3('jat',lt*1.3,t,{el:.2-.14*eio(lt/2.2),dist:1.1-.1*eio(lt/2.2),ly:.5},{over:{flock:{l:fl,dx:-3+Math.min(fl,3)*1.2,dy:Math.sin(t*3)*.08},heron:{hide:1}}});
  night(.25);fogLayer(t,1050,.55,25);lanternGlow(t,.5*cl((lt-.8)/.5));fallingHeron(lt-P[2],420,560);fogLayer(t+30,1250,.5,40,1.2);
  tape('आसमान से गिरते पक्षी!',470,250,70,1,{seed:5});chip('🌫️ असम का एक गाँव',470,370,42,(lt-.3)/.3,'#111','#fff',.03)}
function clockF(cx,cy,r,mins,p){if(p<=0)return;x.save();x.translate(cx,cy);x.scale(back(p),back(p));x.fillStyle='#fdf3dc';x.beginPath();x.arc(0,0,r,0,6.28);x.fill();x.strokeStyle='#c9a24a';x.lineWidth=10;x.stroke();
  x.fillStyle='#333';for(let i=0;i<12;i++){const a=i/12*6.28;x.beginPath();x.arc(Math.sin(a)*r*.8,-Math.cos(a)*r*.8,i%3?4:8,0,6.28);x.fill()}
  const ma=mins/60*6.28,ha=mins/720*6.28;x.lineCap='round';x.strokeStyle='#222';x.lineWidth=12;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(ha)*r*.48,-Math.cos(ha)*r*.48);x.stroke();x.strokeStyle='#E23B3B';x.lineWidth=8;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(ma)*r*.75,-Math.cos(ma)*r*.75);x.stroke();x.restore()}
function stars(t){for(let i=0;i<60;i++){x.globalAlpha=.4+.6*Math.abs(Math.sin(t*2+i));x.fillStyle='#ffe9a8';x.beginPath();x.arc(hash(i)*W,hash(i+9)*H*.75,1.5+hash(i+3)*2.5,0,6.28);x.fill()}x.globalAlpha=1}
function S2(lt,t){x.fillStyle='#141633';x.fillRect(0,0,W,H);stars(t);fogLayer(t,1250,.35,20);
  tape('सितंबर – नवंबर 📅',470,270,72,cl(lt/.3),{seed:9});chip('🌑 अँधेरी रातें',470,420,52,(lt-(P[4]-P[3]))/.3,'#fff','#111',-.03);
  const c=lt-(P[5]-P[3]);clockF(470,850,200,18*60+cl(c/1.6)*210,(c+.2)/.35);chip('शाम 6:00 → 9:30',470,1130,52,(c-1.4)/.3,'#FFD43B','#111',.02)}
function S3(lt,t){const k=eio(lt/(P[8]-P[6]));d3('jat',99,t,{el:.08+.1*k,dist:1.0-.1*k,az:-.25+.4*k,ly:.6},{over:{flock:{hide:1},heron:{hide:1}}});night(.2);fogLayer(t,1100,.45,25);lanternGlow(t,.5);
  chip('📍 दीमा हसाओ, असम',470,380,44,(lt-.2)/.3,'#9fd0f0','#111',.03);tape('जटिंगा',470,250,96,cl((lt-(P[7]-P[6]))/.3),{seed:13})}
function S4(lt,t){const fp=eio(lt/(P[10]-P[8]));d3('jat',99,t,{el:.12,dist:.98,az:.15,ly:.6},{over:{flock:{l:9,dx:3.5-6*fp,dy:.8-1.6*fp,rz:Math.sin(t*4)*.05},heron:{hide:1}}});night(.3);fogLayer(t,1100,.5,25);lanternGlow(t,.75);
  chip('🐦 44 तरह के पक्षी',470,300,54,(lt-.1)/.3,'#FFD43B','#111',-.03);chip('रोशनी की ओर ➜',300,1150,48,(lt-(P[9]-P[8]))/.3,'#fff','#111',.03)}
function S5(lt,t){dots('#4a3a7a','#1e1638');
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-260,y0-300,1080*1.05,1920*1.05);img(IM.heron,x0+w/2,y0+h/2,360,{rot:.5+Math.sin(lt*2)*.1})},330,900);
  tape('आत्महत्या?',470,210,80,cl(lt/.3),{seed:21});qmarks(lt-(P[11]-P[10]),[[720,520,.2],[870,700,-.25],[760,900,.1]]);
  tape('कमेंट में लिखो!',470,1300,54,cl((lt-(P[12]-P[10]))/.3),{fill:'#fff',seed:23,rot:.03});
  const a=P[14]-P[10]-.25,b=P[15]-P[10];if(lt>a&&lt<b+.2)subCTA(lt-a,470,1180);chip('जवाब: कोहरा + हवा 👇',600,1180,46,(lt-b)/.3,'#FFD43B','#111',-.02)}
function windArrow(cx,cy,len,p,col='#9fd0f0'){if(p<=0)return;x.save();x.translate(cx,cy);x.strokeStyle=col;x.fillStyle=col;x.lineWidth=14;x.lineCap='round';const L=len*eio(p);x.beginPath();x.moveTo(-len/2,0);x.lineTo(-len/2+L,0);x.stroke();if(p>.9){x.beginPath();x.moveTo(len/2+18,0);x.lineTo(len/2-22,-26);x.lineTo(len/2-22,26);x.closePath();x.fill()}x.restore()}
function S6(lt,t){x.fillStyle='#141633';x.fillRect(0,0,W,H);stars(t);
  tape('राज़: कोहरा + हवा + रोशनी',470,240,60,cl(lt/.3),{seed:31});
  const a=lt-(P[18]-P[17]),b=lt-(P[19]-P[17]),c=b-.7;
  numSticker('1',150,520,a/.3);if(a>0){x.save();x.globalAlpha=cl(a/.4);x.drawImage(IM.fog,260,430,560,560*IM.fog.height/IM.fog.width);x.restore();chip('कोहरा',780,640,46,a/.3,'#fff','#111',.03)}
  numSticker('2',150,820,b/.3);for(let i=0;i<3;i++)windArrow(520,780+i*50,460,(b-i*.12)/.6);if(b>0)chip('तेज़ हवा',780,900,46,b/.3,'#9fd0f0','#111',-.03);
  numSticker('3',150,1120,c/.3);if(c>0){pop(IM.lantern,420,1270,120,c*1.2,{});glow(450,1130,200,.7);chip('रोशनी',780,1150,46,c/.3,'#FFD43B','#111',.03)}}
function compass(cx,cy,r,lt,p){if(p<=0)return;x.save();x.translate(cx,cy);x.scale(back(p),back(p));x.fillStyle='#f6efe0';x.beginPath();x.arc(0,0,r,0,6.28);x.fill();x.strokeStyle='#c9a24a';x.lineWidth=8;x.stroke();
  x.fillStyle='#111';x.font=F(800,40);x.textAlign='center';x.textBaseline='middle';[['उ',0,-1],['द',0,1],['पू',1,0],['प',-1,0]].forEach(([s,a,b])=>x.fillText(s,a*r*.78,b*r*.78));
  const q=eio((lt-.4)/1.2);x.strokeStyle='#2f7dc4';x.lineWidth=14;x.lineCap='round';x.beginPath();x.moveTo(-r*.55,r*.55);x.lineTo(-r*.55+r*1.1*q,r*.55-r*1.1*q);x.stroke();x.restore()}
function S7(lt,t){x.fillStyle='#141633';x.fillRect(0,0,W,H);stars(t);fogLayer(t,1300,.3,20);
  tape('ये तभी होता है जब...',470,240,62,cl(lt/.3),{seed:41});
  const items=[['🌑 चाँद न हो',P[21]],['🌫️ घना कोहरा',P[22]],['🌧️ हल्की बूंदाबांदी',P[23]]];
  items.forEach(([s,tt],i)=>{const l=lt-(tt-P[20]);chip(s+'  ✓',360,430+i*130,50,l/.3,'#fff','#111',(i-1)*.02)});
  const w=lt-(P[24]-P[20]);compass(470,1050,200,w,w/.35);chip('दक्षिण-पश्चिम ➜ उत्तर-पूर्व',470,1300,44,(lt-(P[25]-P[20]))/.3,'#9fd0f0','#111',.02)}
function S8(lt,t){const hp=lt;const path=[Math.sin(hp*1.6)*2.2-(eio((hp-(P[27]-P[26]))/2)*1.8),Math.cos(hp*1.3)*.9-eio((hp-(P[27]-P[26]))/2)*2.8];
  d3('jat',99,t,{el:.14,dist:.96,az:-.1,ly:.6},{over:{flock:{hide:1},heron:{l:9,dx:path[0],dy:path[1],rz:Math.sin(hp*5)*.35}}});night(.35);fogLayer(t,950,.6,45);lanternGlow(t,.8);fogLayer(t+20,1200,.55,60,1.2);
  chip('🧭 रास्ता भटके',470,300,52,(lt-.2)/.3,'#fff','#111',-.03);chip('💡 रोशनी की ओर खिंचे',470,420,48,(lt-(P[27]-P[26]))/.3,'#FFD43B','#111',.03)}
function S9(lt,t){const up=eio(lt/(OUTRO-P[29]));d3('jat',99,t,{el:.1,dist:1.0,az:.1,ly:.6},{over:{flock:{l:9,dx:-1+3*up,dy:1+2*up},heron:{hide:1}}});night(.15*(1-up));fogLayer(t,1150,.35*(1-up),25);
  x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(540,300,20,540,300,800);g.addColorStop(0,`rgba(255,210,150,${.35*up})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore();
  chip('आत्महत्या',300,330,52,(lt-(P[30]-P[29]))/.3,'#fff','#111',-.03,(lt-(P[30]-P[29])-.4)/.4);chip('✓ दुर्लभ मौसम',720,330,52,(lt-(P[31]-P[29]))/.3,'#7fe08a','#111',.03);
  if(lt>P[32]-P[29]){chip('🤝 अब पक्षियों को बचाया जाता है',470,460,44,(lt-(P[32]-P[29]))/.3,'#FFD43B','#111',0);sparkles(540,700,300,lt,12)}}
const OAT=P[34]-.1,OC={c:P[35]-OAT,n:P[36]-OAT,s:P[37]-OAT-.3,e:P[39]-OAT,cmt:'जटिंगा 🐦'};
function S10(lt,t){outroCTA(lt,t,f=>d3('jat',99,t,{el:.14,dist:1.05,az:.2*Math.sin(lt*.3),ly:.7},{over:{flock:{hide:1},heron:{hide:1}},fold:f}),OC)}
const SCN=[{at:0,f:S1},{at:P[3]-.1,f:S2,tr:'wave',d:.7},{at:P[6]-.1,f:S3,tr:'iris',d:.6},{at:P[8]-.1,f:S4,tr:'cut',d:0},{at:P[10]-.1,f:S5,tr:'blinds',d:.6},
  {at:P[17]-.1,f:S6,tr:'wave',d:.7},{at:P[20]-.1,f:S7,tr:'page'},{at:P[26]-.1,f:S8,tr:'wave',d:.7},{at:P[29]-.1,f:S9,tr:'flash',d:.4},{at:P[34]-.1,f:S10,tr:'flash',d:.4}];
function events(){
  ev(.02,'swell',.5);buildEv('jat',0,1/1.3);ev(.1,'tape');ev(P[1]-.2,'whoosh',.6);ev(P[2],'flap',.8);ev(P[2]+.4,'flap',.6);ev(P[2]+.9,'whoosh',.5);
  ev(P[3]-.7,'whoosh');ev(P[3],'tape');ev(P[4],'slap');ev(P[5]-.2,'pop');for(let i=0;i<10;i++)ev(P[5]+i*.16,'tick',.6);ev(P[5]+1.4,'slap');
  ev(P[6]-.6,'whoosh');ev(P[6]+.2,'slap');ev(P[7],'tape');ev(P[7]+.05,'bell',.5);
  ev(P[8],'slap');ev(P[8]+.3,'flap',.7);ev(P[8]+1,'flap',.6);ev(P[9],'slap');
  ev(P[10]-.6,'flip');ev(P[10],'tape');[.4,.6,.8].forEach(d=>ev(P[11]+d,'pop'));ev(P[12],'tape');ev(P[14]-.25,'click');ev(P[14],'bell');ev(P[15]-.6,'riser');ev(P[15],'slap');
  ev(P[17]-.7,'whoosh');ev(P[17],'tape');ev(P[18],'pop');ev(P[19],'whoosh',.7);ev(P[19]+.7,'pop');ev(P[19]+.75,'sparkle');
  ev(P[20]-.6,'page');ev(P[20],'tape');ev(P[21],'slap');ev(P[22],'slap');ev(P[23],'slap');ev(P[24],'pop');ev(P[24]+.4,'whoosh',.6);ev(P[25],'slap');
  ev(P[26]-.7,'whoosh');ev(P[26],'flap',.8);ev(P[26]+.2,'slap');ev(P[27],'slap');ev(P[27]+.3,'flap',.6);
  ev(P[29]-.4,'whoosh');ev(P[30],'slap');ev(P[30]+.4,'scribble',.5);ev(P[31],'slap');ev(P[32],'sparkle');ev(P[32]+.1,'slap');
  outroEv(OAT,OC);
}
