// v1 Virupaksha — recipe: golden-hour papercraft, transitions iris/flash/page/tear, explainer world: dark stone mandapa + light rays
const ASSETS=['bg.jpg','gopuram.png','palms.png','hall.png','camera.png'];
KEYW=['उल्टी','शिखर','दरवाज़ा','हम्पी','विरुपाक्ष','सातवीं','पचास','नौ','अंधेरे','बल्ब','शीशा','कैमरे','छेद','सीधी','पलट','पिनहोल','महादेव','सब्सक्राइब','रोशनी'];
const RAAZ=P[21],OUTRO=P[36];
WAVECOLS=['#8a5a2b','#b07a3c','#d3a15a','#efd29a'];
function setup(){
  D3.addSet('hampi',{bg:IM.bg,floorY:1500,groundBy:1330,layers:[
    {k:'gopuram',img:IM.gopuram,mode:'band',bands:7,rise:.3,w:600,x:540,by:1330,z:0,cols:7,t0:.15,step:.27,flat:1},
    {k:'palms',img:IM.palms,w:1300,x:540,by:1560,z:1.7,cols:8,t0:.05,flat:1}]});
}
const CAM1=lt=>({el:.28-.22*eio(lt/2.6),dist:1.14-.12*eio(lt/2.6),az:-.05*eio(lt/3),ly:.4});
function S1(lt,t){const fl=lt<P[3]-.25?0:lt<P[3]+.35?(lt-(P[3]-.25))/.6:lt<P[5]-.75?1:1-cl((lt-(P[5]-.75))/.5);
  const sy=Math.cos(Math.PI*eio(fl));x.save();x.translate(540,960);x.scale(1,sy||.001);x.translate(-540,-960);d3('hampi',lt*1.25,t,CAM1(lt));x.restore();
  if(fl>0&&fl<1){x.fillStyle=`rgba(255,240,210,${Math.sin(fl*3.14)*.25})`;x.fillRect(0,0,W,H)}
  tape('उल्टी परछाई!',470,250,84,1,{seed:5});
  chip('🌄 हम्पी, कर्नाटक',470,375,40,(lt-.4)/.3,'#111','#fff',.03);
  if(fl>.5){chip('शिखर ⬇ नीचे',300,1150,50,(lt-P[3])/.3,'#FFD43B','#111',-.04);chip('दरवाज़ा ⬆ ऊपर',700,560,50,(lt-P[4])/.3,'#fff','#111',.03)}
}
function S2(lt,t){const k=eio(lt/(P[8]-P[5]));d3('hampi',99,t,{el:.06+.06*k,dist:1.02-.1*k,az:-.05+.22*k,ly:.6+.6*k});
  tape('विरुपाक्ष मंदिर',470,250,82,cl((lt-.1)/.3),{seed:9});
  chip('📍 हम्पी, कर्नाटक',470,375,44,(lt-.25)/.3,'#F5B841','#111',.03);
  chip('⏳ 7वीं सदी से',300,1160,48,(lt-(P[6]-P[5]))/.3,'#fff','#111',-.03);
  chip('🙏 आज भी पूजा',720,1160,48,(lt-(P[7]-P[5]))/.3,'#FFD43B','#111',.03);
}
function S3(lt,t){dots('#c9a46a','#f6ecd8');
  card(lt,(x0,y0,w,h)=>{x.drawImage(IM.bg,-260,y0-200,1080*1.02,1920*1.02);x.fillStyle='rgba(255,230,180,.15)';x.fillRect(x0,y0,w,h);pop(IM.gopuram,x0+w/2,y0+h-40,400,lt*1.2+.2,{})},300,980);
  numSticker('1',780,320,(lt-.1)/.3);
  const top=420,base=1220,p=eio((lt-.5)/2.2),hh=(base-top)*p;
  x.save();x.strokeStyle='#E23B3B';x.lineWidth=8;x.lineCap='round';x.beginPath();x.moveTo(700,base);x.lineTo(700,base-hh);x.stroke();
  for(let i=0;i<=10;i++){const yy=base-(base-top)*i/10;if(yy<base-hh-1)break;x.beginPath();x.moveTo(686,yy);x.lineTo(714,yy);x.stroke()}x.restore();
  if(p>0){x.save();x.font=F(800,64);x.fillStyle='#111';x.textAlign='left';x.fillText(Math.round(50*p)+' मीटर',728,base-hh+20);x.restore()}
  const fl=Math.floor(cl((lt-(P[9]-P[8]))/1.0)*9);for(let i=0;i<fl;i++){const yy=base-(i+1)*((base-top)/9);x.save();x.fillStyle=['#f5b841','#ffd98a'][i%2];x.strokeStyle='#5a3b17';x.lineWidth=3;x.fillRect(820,yy,70,(base-top)/9-6);x.strokeRect(820,yy,70,(base-top)/9-6);x.fillStyle='#4b6a8a';x.fillRect(832,yy+20,16,26);x.fillRect(862,yy+20,16,26);x.restore()}
  chip('= 9 मंज़िल!',770,1300,50,(lt-(P[9]-P[8])-.9)/.3,'#FFD43B','#111',-.03);
  tape('गोपुरम ≈ 50 मीटर',470,170,58,cl((lt-.2)/.3),{seed:13});
}
function hallBg(lt,z=1,dim=0){x.save();x.translate(540,900);x.scale(z,z);x.translate(-540,-900);x.drawImage(IM.hall,-10,-20,1100,1955);x.restore();dark(dim)}
function invImg(cx,cy,w,a){x.save();x.globalAlpha=a;x.globalCompositeOperation='screen';x.translate(cx,cy);x.scale(1,-1);x.filter='sepia(.7) brightness(1.1) blur(2.2px)';const h=w*IM.gopuram.height/IM.gopuram.width;x.drawImage(IM.gopuram,-w/2,-h/2,w,h);x.restore()}
function S4(lt,t){const z=1+.12*eio(lt/(P[13]-P[10]));hallBg(lt,z,.15);
  const a=cl((lt-(P[12]-P[10]))/1.2);if(a>0){invImg(520,850,270*z,a*.55);redCircle(520,850,210,270,(lt-(P[12]-P[10])-1)/.6)}
  chip('🕯️ अंधेरा मंडप',470,300,50,(lt-.2)/.3,'#111','#fff',-.03);
  tape('उल्टी तस्वीर!',470,420,78,cl((lt-(P[12]-P[10])-.3)/.3),{seed:17});
}
function S5(lt,t){hallBg(lt,1.12,.35+.1*cl(lt/1));invImg(520,850,302,.55);
  if(lt<P[20]-P[13])chip('💡 बल्ब?',300,1120,52,(lt-.05)/.3,'#fff','#111',-.03,(lt-.5)/.35);
  if(lt<P[20]-P[13])chip('🪞 शीशा?',720,1120,52,(lt-(P[14]-P[13]))/.3,'#fff','#111',.03,(lt-(P[14]-P[13])-.45)/.35);
  tape('तो आई कहाँ से?',470,300,74,cl((lt-(P[15]-P[13]))/.3),{seed:21});
  qmarks(lt-(P[15]-P[13]),[[170,640,-.3],[880,600,.25],[820,1000,.15]]);
  if(lt>P[16]-P[13])tape('कमेंट में लिखो!',470,440,54,cl((lt-(P[16]-P[13]))/.3),{fill:'#fff',seed:23,rot:.03});
  const a=P[18]-P[13]-.25,b=P[20]-P[13];if(lt>a&&lt<b+.2)subCTA(lt-a,470,1235);
  if(lt>b){pop(IM.camera,470,1290,360,(lt-b)*1.2,{});chip('जवाब: 📷 कैमरा',470,1000,50,(lt-b)/.3,'#FFD43B','#111',-.02)}
}
function stoneWall(){x.fillStyle='#3b2f25';x.fillRect(0,0,W,H);for(let i=0;i<90;i++){x.fillStyle=`rgba(${hash(i)>.5?255:0},${hash(i)>.5?230:0},${hash(i)>.5?190:0},.05)`;rr(hash(i+1)*W-60,hash(i+2)*H-40,120+hash(i+3)*140,60+hash(i+4)*60,8);x.fill()}
  x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=4;for(let r=0;r<16;r++){const yy=r*124;x.beginPath();x.moveTo(0,yy);x.lineTo(W,yy);x.stroke();for(let c2=0;c2<5;c2++){const xx=(c2*240+(r%2)*120);x.beginPath();x.moveTo(xx,yy);x.lineTo(xx,yy+124);x.stroke()}}}
function S6(lt,t){stoneWall();dark(.25);const hx=470,hy=760,hp=back((lt-(P[22]-P[21]))/.4);
  if(hp>0){x.save();const g=x.createRadialGradient(hx,hy,4,hx,hy,90*hp);g.addColorStop(0,'#fffbe6');g.addColorStop(.4,'rgba(255,220,140,.9)');g.addColorStop(1,'rgba(255,200,120,0)');x.fillStyle=g;x.beginPath();x.arc(hx,hy,90*hp,0,6.28);x.fill();x.restore()}
  const rp=eio((lt-(P[23]-P[21]))/1.6);if(rp>0){x.save();x.globalCompositeOperation='screen';for(let i=0;i<7;i++){const a=.75+i*.13,L=1000*rp;x.strokeStyle=`rgba(255,226,150,${.35+.15*Math.sin(lt*3+i)})`;x.lineWidth=10+i%3*6;x.beginPath();x.moveTo(hx,hy);x.lineTo(hx+Math.cos(a)*L,hy+Math.sin(a)*L);x.stroke()}x.restore()}
  const sp=eio((lt-(P[24]-P[21]))/.8);if(sp>0){x.save();x.strokeStyle='#FFD43B';x.lineWidth=10;x.setLineDash([26,18]);x.lineDashOffset=-lt*90;x.beginPath();x.moveTo(140,1180);x.lineTo(140+660*sp,1180);x.stroke();x.setLineDash([]);x.restore();chip('रोशनी = सीधी रेखा ➝',470,1080,48,(lt-(P[24]-P[21])-.4)/.3,'#FFD43B','#111',-.02)}
  tape('राज़: एक छोटा छेद!',470,300,72,cl(lt/.3),{seed:31});
  chip('🕳️ दीवार का छेद',470,560,44,(lt-(P[22]-P[21])-.4)/.3,'#fff','#111',.03);
}
function rayDiag(lt,t,tb,tf,tn){stoneWall();dark(.45);
  const gx=200,gb=1080,gh=400,gw=gh*IM.gopuram.width/IM.gopuram.height,hx=480,hy=830,sx=760;
  x.save();x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=14;x.drawImage(IM.gopuram,gx-gw/2,gb-gh,gw,gh);x.restore();
  x.fillStyle='#1f1812';x.fillRect(hx-18,330,36,hy-330-22);x.fillRect(hx-18,hy+22,36,1250-hy-22);x.fillStyle='#fff3c4';x.beginPath();x.arc(hx,hy,12,0,6.28);x.fill();
  x.fillStyle='rgba(246,239,224,.12)';x.fillRect(sx+110,420,16,640);
  const ray=(x1,y1,col,p)=>{if(p<=0)return;const x2=sx,y2=hy+(hy-y1)*(sx-hx)/(hx-x1);const L=p;const ex=x1+(x2-x1)*L,ey=y1+(y2-y1)*L;x.save();x.strokeStyle=col;x.lineWidth=7;x.shadowColor=col;x.shadowBlur=14;x.beginPath();x.moveTo(x1,y1);x.lineTo(ex,ey);x.stroke();
    if(L>=1){x.fillStyle=col;x.beginPath();x.arc(x2,y2,12,0,6.28);x.fill()}x.restore()};
  ray(gx,gb-gh,'#FFD43B',eio((lt-tb)/1.4));ray(gx,gb,'#5fd3ff',eio((lt-tf)/1.4));
  const ip=cl((lt-tn)/.8);if(ip>0)invImg(sx,hy,gw,ip*.95);
  chip('ऊपर ➘ नीचे',300,500,44,(lt-tb-.6)/.3,'#FFD43B','#111',-.03);chip('नीचे ➚ ऊपर',300,1180,44,(lt-tf-.6)/.3,'#5fd3ff','#111',.03);
}
function S7(lt,t){rayDiag(lt,t,.2,P[26]-P[25],P[28]-P[25]);tape('तस्वीर पलट गई!',470,240,68,cl((lt-(P[28]-P[25]))/.3),{seed:41})}
function S8(lt,t){dots('#c9a46a','#f6ecd8');numSticker('2',780,320,(lt-.1)/.3);
  pop(IM.camera,400,1000,600,lt*1.1+.1,{});
  const ap=eio((lt-(P[30]-P[29]))/.8);if(ap>0){x.save();x.strokeStyle='#E23B3B';x.lineWidth=8;x.setLineDash([16,12]);x.beginPath();x.moveTo(640,820);x.lineTo(640+140*ap,700);x.stroke();x.restore()}
  card(lt-(P[30]-P[29]),(x0,y0,w,h)=>{x.fillStyle='#2a2119';x.fillRect(x0,y0,w,h);invImg(x0+w/2,y0+h/2,170,1)},460,360,620,270);
  chip('पुराना कैमरा 📷',400,1150,48,(lt-(P[30]-P[29]))/.3,'#fff','#111',-.03);
  tape('पिनहोल कैमरा!',470,180,76,cl((lt-(P[32]-P[29]))/.3),{seed:47});
  if(lt>P[32]-P[29])sparkles(780,600,180,lt,10);
}
function S9(lt,t){const k=eio(lt/(OUTRO-P[33]));d3('hampi',99,t,{el:.1-.06*k,dist:.95-.1*k,az:.2-.3*k,ly:1.2});
  x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(820,330,20,820,330,700);g.addColorStop(0,`rgba(255,200,110,${.45+.1*Math.sin(lt*2)})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore();
  sparkles(540,720,300,lt,14);chip('☀️ सदियों से, हर दिन',470,300,52,(lt-(P[34]-P[33]))/.3,'#FFD43B','#111',-.02);
}
const OAT=P[36]-.1,OC={c:P[37]-OAT,n:P[38]-OAT,s:P[39]-OAT-.3,e:P[41]-OAT,cmt:'हर हर महादेव'};
function S10(lt,t){outroCTA(lt,t,f=>d3('hampi',99,t,{el:.12,dist:1.05,az:.15*Math.sin(lt*.3),ly:.8},{fold:f}),OC)}
const SCN=[{at:0,f:S1},{at:P[5]-.1,f:S2,tr:'flash',d:.4},{at:P[8]-.1,f:S3,tr:'page'},{at:P[10]-.1,f:S4,tr:'iris',d:.7},{at:P[13]-.1,f:S5,tr:'cut',d:0},
  {at:P[21]-.1,f:S6,tr:'tear',d:.6},{at:P[25]-.1,f:S7,tr:'flash',d:.4},{at:P[29]-.1,f:S8,tr:'page'},{at:P[33]-.1,f:S9,tr:'iris',d:.7},{at:P[36]-.1,f:S10,tr:'flash',d:.4}];
function events(){
  ev(.02,'swell',.5);buildEv('hampi',0,1/1.25);ev(.1,'tape');ev(.45,'slap');ev(P[3]-.25,'whoosh');ev(P[3]-.2,'flip');ev(P[3]+.1,'slap');ev(P[4],'slap');ev(P[5]-.75,'flip');
  ev(P[5]-.3,'whoosh',.6);ev(P[5],'tape');ev(P[5]+.2,'slap');ev(P[6],'slap');ev(P[7],'slap');
  ev(P[8]-.6,'page');ev(P[8],'tape');ev(P[8]+.1,'pop');ev(P[8]+.4,'riser',.6);for(let i=0;i<9;i++)ev(P[9]+i*.11,'tick',.7);ev(P[9]+.9,'stamp',.6);
  ev(P[10]-.8,'whoosh');ev(P[10]+.1,'slap');ev(P[12],'swell',.5);ev(P[12]+.3,'tape');ev(P[12]+1,'scribble',.6);
  ev(P[13],'slap');ev(P[13]+.5,'scribble',.5);ev(P[14],'slap');ev(P[14]+.45,'scribble',.5);ev(P[15],'tape');[.4,.6,.8].forEach(d=>ev(P[15]+d,'pop'));ev(P[16],'tape');ev(P[18]-.25,'click');ev(P[18],'bell');ev(P[20]-.6,'riser');ev(P[20],'pop');
  ev(P[21]-.7,'rip');ev(P[21],'tape');ev(P[22]-.05,'boom',.7);ev(P[22],'sparkle');ev(P[23],'swell',.4);ev(P[24],'whoosh',.5);ev(P[24]+.4,'slap');
  ev(P[25]-.5,'whoosh',.6);ev(P[25]+.2,'pull',.6);ev(P[26],'pull',.6);ev(P[28],'sparkle');ev(P[28],'tape');
  ev(P[29]-.6,'page');ev(P[29],'pop');ev(P[30],'slap');ev(P[32],'tape');ev(P[32]+.05,'sparkle');
  ev(P[33]-.8,'whoosh');ev(P[33],'swell',.5);ev(P[34],'slap');
  outroEv(OAT,OC);
}
