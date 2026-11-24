const HEAD=['ब्रह्मा के मंदिर इतने कम?','पुष्कर · आज पूर्णिमा','पुष्कर का महायज्ञ','सावित्री नहीं पहुँचीं','गायत्री से विवाह','सावित्री का श्राप!','पूजा सिर्फ पुष्कर में?','गर्भगृह: सिर्फ संन्यासी','श्राप बना नियम?','आपकी क्या राय है?'];
const LAB=['01 · सवाल','02 · पुष्कर, राजस्थान','03 · कथा','04 · मुहूर्त','05 · छाया-कथा','06 · श्राप','07 · सिर्फ पुष्कर','08 · आज भी','09 · रहस्य','10 · कमेंट करें'];
const TAGS=['ब्रह्मा-मंदिर','पुष्कर','महायज्ञ','मुहूर्त','विवाह','श्राप','सिर्फ-पुष्कर','गर्भगृह','रहस्य','आपकी-राय'];
const HITS=[wt(0,'गिनती'),wt(5,'श्राप'),wt(7,'नहीं')];
function lotus(X,Y,s,t){x.save();x.translate(X,Y);x.scale(s,s);for(let i=-3;i<=3;i++){x.save();x.rotate(i*0.32+Math.sin(t*2)*0.02);x.fillStyle=i%2?'#ff8fb1':'#ffb3c9';x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(-26,-50,0,-92);x.quadraticCurveTo(26,-50,0,0);x.fill();x.restore()}x.fillStyle='#2f7d32';x.beginPath();x.ellipse(0,6,90,14,0,0,7);x.fill();x.restore()}
function brahma(X,Y,s,t){x.save();x.translate(X,Y);x.scale(s,s);
 const gl=x.createRadialGradient(0,-150,10,0,-150,190);gl.addColorStop(0,'rgba(255,210,120,0.6)');gl.addColorStop(1,'rgba(255,150,40,0)');x.fillStyle=gl;x.beginPath();x.arc(0,-150,190,0,7);x.fill();
 x.fillStyle='#e8a33c';rr(-70,-110,140,120,40);x.fill();x.fillStyle='#c2410c';x.fillRect(-70,-60,140,18);
 [-62,0,62].forEach((hx,i)=>{x.fillStyle='#f2c38b';x.beginPath();x.arc(hx,-150,i===1?40:32,0,7);x.fill();x.fillStyle=GOLD;x.beginPath();x.moveTo(hx-(i===1?30:24),-178);x.lineTo(hx,-(i===1?232:220));x.lineTo(hx+(i===1?30:24),-178);x.fill();
  x.fillStyle='#fff';x.fillRect(hx-14,-140,28,i===1?36:28);x.fillStyle='#1a0508';[-10,10].forEach(e=>{x.beginPath();x.arc(hx+e,-156,4,0,7);x.fill()})});
 x.restore()}
function figure(X,Y,s,col,crown,hair){x.save();x.translate(X,Y);x.scale(s,s);x.fillStyle=col;x.beginPath();x.arc(0,-170,30,0,7);x.fill();
 if(crown){x.beginPath();x.moveTo(-24,-190);x.lineTo(0,-240);x.lineTo(24,-190);x.fill()}if(hair){x.beginPath();x.ellipse(22,-160,18,40,0.3,0,7);x.fill()}
 x.beginPath();x.moveTo(-40,-135);x.lineTo(40,-135);x.lineTo(60,0);x.lineTo(-60,0);x.closePath();x.fill();x.restore()}
function temple(X,Y,s,col){x.save();x.translate(X,Y);x.scale(s,s);x.fillStyle=col;x.fillRect(-26,-30,52,30);x.beginPath();x.moveTo(-22,-30);x.quadraticCurveTo(-18,-70,0,-86);x.quadraticCurveTo(18,-70,22,-30);x.fill();x.fillRect(-2,-100,4,16);x.restore()}
const SC=[
 (lt,t)=>{brahma(190,440,0.95,t);lotus(190,450,0.9,t);
  const rows=[['शिव मंदिर','हज़ारों',1],['विष्णु मंदिर','हज़ारों',0.96],['ब्रह्मा मंदिर','गिनती के!',0.06]];
  rows.forEach(([n,v,f],i)=>{const Y=110+i*130;txt(n,390,Y,'800 38px Baloo2',CREAM,'left');const p=i<2?1:cl(0.3+lt/0.8);const w=440*f*p+(i===2?6*Math.abs(Math.sin(t*8)):0);
   rr(390,Y+16,440,40,20);x.fillStyle='rgba(255,233,208,0.12)';x.fill();rr(390,Y+16,Math.max(40,w),40,20);x.fillStyle=i===2?'#e0262e':GOLD;x.fill();
   txt(v,i===2?450:820,Y+48,'800 32px Baloo2',i===2?'#FFD27A':'#2a0a0e',i===2?'left':'right')});
  const q=back((lt-0.2)/0.3);if(q>0){x.save();x.translate(800,470);x.scale(q,q);x.rotate(0.15);x.fillStyle=ORANGE;x.beginPath();x.arc(0,0,40,0,7);x.fill();txt('?',0,22,'800 64px Baloo2','#fff');x.restore()}},
 (lt,t)=>{const ls=TM.lines[1].s,tm=wt(1,'पूर्णिमा')-ls;
  x.fillStyle='#d9853b';x.beginPath();x.moveTo(60,120);x.lineTo(220,40);x.lineTo(380,70);x.lineTo(470,180);x.lineTo(440,330);x.lineTo(330,470);x.lineTo(180,440);x.lineTo(90,330);x.closePath();x.fill();
  x.strokeStyle='#FFE9D0';x.lineWidth=4;x.stroke();txt('राजस्थान',250,200,'800 40px Baloo2','#5a1a10');
  const pp=eo(lt/0.5);const py=lerp(-60,300,pp);x.save();x.translate(300,py);x.fillStyle='#e0262e';x.beginPath();x.arc(0,-44,30,0,7);x.fill();x.beginPath();x.moveTo(-26,-30);x.lineTo(0,10);x.lineTo(26,-30);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(0,-44,11,0,7);x.fill();x.restore();
  if(pp>=1){const r=(lt*80)%60;x.strokeStyle=`rgba(224,38,46,${1-r/60})`;x.lineWidth=3;x.beginPath();x.ellipse(300,310,r,r*0.4,0,0,7);x.stroke();txt('पुष्कर',320,360,'800 40px Baloo2','#fff','left',8)}
  const mp=eo((lt-tm+0.2)/0.6);if(mp>0){const my=lerp(420,170,mp);const g=x.createRadialGradient(700,my,10,700,my,170);g.addColorStop(0,'rgba(255,245,210,0.8)');g.addColorStop(1,'rgba(255,245,210,0)');x.fillStyle=g;x.beginPath();x.arc(700,my,170,0,7);x.fill();x.fillStyle='#fff6dc';x.beginPath();x.arc(700,my,85,0,7);x.fill();x.fillStyle='rgba(220,200,160,0.5)';[[-25,-15,16],[20,20,12],[30,-30,9]].forEach(([a,b,r])=>{x.beginPath();x.arc(700+a,my+b,r,0,7);x.fill()});
   rr(560,330,280,90,20);x.fillStyle=GOLD;x.fill();txt('कार्तिक पूर्णिमा',700,368,'800 34px Baloo2','#2a0a0e');txt('24 नवंबर 2026',700,406,'800 30px Baloo2','#5a1a10');
   for(let i=0;i<5;i++){x.strokeStyle='rgba(120,200,255,0.5)';x.lineWidth=3;x.beginPath();x.arc(700,470,20+((lt*50+i*24)%110),3.4,6.0);x.stroke()}}},
 (lt,t)=>{const fp=eo(lt/1.0);x.fillStyle='#7a2a10';x.beginPath();x.moveTo(300,330);x.lineTo(600,330);x.lineTo(560,450);x.lineTo(340,450);x.closePath();x.fill();x.fillStyle='#a8461c';x.fillRect(290,318,320,24);
  for(let i=0;i<9;i++){const X=330+i*30,h=(80+60*fp)*(0.6+0.4*Math.sin(t*9+i*1.7))*(1-Math.abs(i-4)/6);const g=x.createLinearGradient(0,320,0,320-h);g.addColorStop(0,'#ff6a1f');g.addColorStop(1,'rgba(255,240,160,0.9)');x.fillStyle=g;x.beginPath();x.moveTo(X-20,322);x.quadraticCurveTo(X,320-h*1.4,X+20,322);x.fill()}
  for(let i=0;i<16;i++){const k=(t*0.8+hash(i))%1;x.fillStyle=`rgba(255,${180+hash(i+1)*60|0},80,${1-k})`;x.beginPath();x.arc(450+(hash(i+4)-0.5)*200+Math.sin(t*3+i)*20,310-k*280,3+hash(i)*3,0,7);x.fill()}
  x.save();x.globalAlpha=cl((lt-0.4)/0.4);brahma(140,440,0.62,t);x.restore();
  ['स्वाहा','ॐ'].forEach((w,i)=>{const k=((lt*0.6+i*0.5)%1);x.save();x.globalAlpha=1-k;txt(w,690+i*90,300-k*180,'800 44px Baloo2',GOLD);x.restore()});txt('महायज्ञ',760,470,'800 44px Baloo2',CREAM)},
 (lt,t)=>{const cx=270,cy=270;x.fillStyle=CREAM;x.beginPath();x.arc(cx,cy,170,0,7);x.fill();x.fillStyle='#2a0a0e';x.beginPath();x.arc(cx,cy,156,0,7);x.fill();
  for(let i=0;i<12;i++){const a=i/12*6.283;x.fillStyle=GOLD;x.fillRect(cx+Math.cos(a)*130-4,cy+Math.sin(a)*130-4,8,8)}
  const wd=cl(lt/2.5);x.fillStyle='rgba(255,122,47,0.45)';x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,140,-1.57,-1.57+wd*6.283*0.7);x.fill();
  const a=-1.57+lt*4.5;x.strokeStyle='#fff';x.lineWidth=8;x.lineCap='round';x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*120,cy+Math.sin(a)*120);x.stroke();x.lineWidth=12;x.beginPath();x.moveTo(cx,cy);const b=-1.57+lt*0.5;x.lineTo(cx+Math.cos(b)*80,cy+Math.sin(b)*80);x.stroke();
  txt('मुहूर्त',cx,cy+70,'800 36px Baloo2',GOLD);
  x.setLineDash([12,10]);x.strokeStyle='rgba(255,233,208,0.6)';x.lineWidth=4;rr(560,90,260,320,30);x.stroke();x.setLineDash([]);
  x.save();x.globalAlpha=0.35+0.15*Math.sin(t*4);figure(690,380,1.0,'rgba(255,233,208,0.5)',false,true);x.restore();txt('सावित्री ?',690,470,'800 44px Baloo2',CREAM);
  const sp=back((lt-1.2)/0.3);if(sp>0){x.save();x.translate(690,70);x.scale(sp,sp);rr(-110,-34,220,60,30);x.fillStyle='#e0262e';x.fill();txt('देर!',0,14,'800 40px Baloo2','#fff');x.restore()}},
 (lt,t)=>{const g=x.createRadialGradient(450,240,20,450,240,520);g.addColorStop(0,'#ffd27a');g.addColorStop(1,'#e2561c');x.fillStyle=g;x.fillRect(0,0,900,510);
  x.strokeStyle='#5a1a10';x.lineWidth=12;x.strokeRect(6,6,888,498);const m=eio(lt/2.2);
  figure(lerp(180,360,m),470,1.25,'#1a0508',true,false);figure(lerp(720,540,m),470,1.2,'#1a0508',false,true);
  for(let i=0;i<3;i++){x.save();x.translate(450,140);x.rotate(t*0.6+i*2.1);x.fillStyle='#1a0508';x.beginPath();x.ellipse(150*(1-m*0.4),0,16,9,0,0,7);x.fill();x.restore()}
  const gp=back((lt-1.6)/0.4);if(gp>0){x.save();x.translate(450,300);x.scale(gp,gp);x.strokeStyle='#1a0508';x.lineWidth=12;x.setLineDash([4,14]);x.lineCap='round';x.beginPath();x.arc(0,0,70,0.3,2.84);x.stroke();x.setLineDash([]);x.restore()}
  txt('ब्रह्मा',lerp(180,360,m),230,'800 34px Baloo2','#1a0508');txt('गायत्री',lerp(720,540,m),250,'800 34px Baloo2','#1a0508');txt('छाया-कथा · कहते हैं',450,60,'800 30px Baloo2','#5a1a10')},
 (lt,t)=>{const ls=TM.lines[5].s,ts=wt(5,'श्राप')-ls;const sp=cl((lt-ts+0.05)/0.2);
  x.fillStyle=sp>0?'#2a0306':'#120407';x.fillRect(0,0,900,510);const wk=eo(lt/0.8);x.save();x.globalAlpha=0.9;figure(lerp(-60,240,wk),470,1.35,sp>0?'#ff5a3c':'#d9a441',false,true);x.restore();
  if(sp>0){for(let i=0;i<10;i++){const a=i/10*6.28+t*0.4;x.strokeStyle=`rgba(255,90,60,${0.5*sp})`;x.lineWidth=5;x.beginPath();x.moveTo(300,250);x.lineTo(300+Math.cos(a)*700,250+Math.sin(a)*700);x.stroke()}
   stamp(600,250,lerp(2.4,1,eo(sp)),-0.15,'श्राप!');if(sp<1){x.fillStyle=`rgba(255,255,255,${0.5*(1-sp)})`;x.fillRect(0,0,900,510)}}
  else txt('गुस्सा...',620,260,'800 60px Baloo2',ORANGE)},
 (lt,t)=>{const ls=TM.lines[6].s,tp=wt(6,'पुष्कर')-ls;const dim=cl((lt-tp+0.3)/0.4);let k=0;
  for(let r=0;r<4;r++)for(let c2=0;c2<9;c2++){const X=60+c2*98,Y=120+r*100;const isP=(r===2&&c2===4);k++;
   if(isP){const s=1+0.5*dim;x.save();if(dim>0){const g=x.createRadialGradient(X,Y-40,5,X,Y-40,120*dim);g.addColorStop(0,'rgba(255,200,90,0.7)');g.addColorStop(1,'rgba(255,200,90,0)');x.fillStyle=g;x.beginPath();x.arc(X,Y-40,130,0,7);x.fill()}temple(X,Y,s*0.9,GOLD);x.restore()}
   else{temple(X,Y,0.8,dim>0?'rgba(255,233,208,0.18)':'rgba(255,233,208,0.55)');if(dim>0&&hash(k)<dim){x.strokeStyle='rgba(224,38,46,0.8)';x.lineWidth=5;x.beginPath();x.moveTo(X-20,Y-60);x.lineTo(X+20,Y-10);x.moveTo(X+20,Y-60);x.lineTo(X-20,Y-10);x.stroke()}}}
  if(dim>0.5){rr(300,440,300,56,28);x.fillStyle=GOLD;x.fill();txt('सिर्फ पुष्कर',450,480,'800 38px Baloo2','#2a0a0e')}txt('कहते हैं',820,60,'800 30px Baloo2','rgba(255,233,208,0.6)','right')},
 (lt,t)=>{const ls=TM.lines[7].s,tn=wt(7,'संन्यासी')-ls;
  x.fillStyle='#5b4334';rr(330,40,240,420,20);x.fill();const lg=x.createRadialGradient(450,280,10,450,280,220);lg.addColorStop(0,'rgba(255,230,160,1)');lg.addColorStop(1,'rgba(150,60,15,1)');x.fillStyle=lg;rr(360,110,180,350,90);x.fill();brahma(450,450,0.55,t);
  txt('गर्भगृह',450,90,'800 36px Baloo2',CREAM);
  const a=back((lt-0.2)/0.3);if(a>0){x.save();x.translate(150,300);x.scale(a,a);figure(0,130,0.9,'#c9b9a8',false,false);x.strokeStyle=GOLD;x.lineWidth=6;x.beginPath();x.arc(36,30,14,0,7);x.stroke();x.restore();
   const cr=cl((lt-0.9)/0.3);if(cr>0){x.strokeStyle='#e0262e';x.lineWidth=14;x.lineCap='round';x.beginPath();x.moveTo(80,160);x.lineTo(80+140*cr,160+200*cr*0.9);x.moveTo(220,160);x.lineTo(220-140*cr,160+200*cr*0.9);x.stroke()}txt('शादीशुदा',150,490,'800 34px Baloo2',CREAM)}
  const b=back((lt-tn+0.1)/0.3);if(b>0){x.save();x.translate(750,300);x.scale(b,b);figure(0,130,0.9,'#ff8a1f',false,false);x.fillStyle='#ffb547';x.fillRect(-8,-110,16,60);x.restore();tick(820,190,1.2,(lt-tn)/0.4);txt('संन्यासी',750,490,'800 34px Baloo2',GOLD)}},
 (lt,t)=>{x.fillStyle='#050102';x.fillRect(0,0,900,510);const qp=cl(lt/0.6);
  x.save();x.globalAlpha=0.2+0.4*qp;txt('?',450,480,`800 ${440+30*Math.sin(t*5)}px Baloo2`,GOLD);x.restore();
  const p1=back(lt/0.3);x.save();x.translate(230,250);x.scale(p1,p1);rr(-130,-60,260,120,24);x.fillStyle='#e0262e';x.fill();txt('श्राप',0,20,'800 60px Baloo2','#fff');x.restore();
  const ap=eo((lt-0.6)/0.6);x.strokeStyle=CREAM;x.lineWidth=10;x.lineCap='round';x.beginPath();x.moveTo(380,250);x.lineTo(380+140*ap,250);x.stroke();if(ap>0.9){x.beginPath();x.moveTo(500,225);x.lineTo(525,250);x.lineTo(500,275);x.stroke()}
  const p2=back((lt-1.1)/0.3);if(p2>0){x.save();x.translate(680,250);x.scale(p2,p2);rr(-130,-60,260,120,24);x.fillStyle=GOLD;x.fill();txt('नियम?',0,20,'800 60px Baloo2','#2a0a0e');x.restore()}
  txt('सदियों से...',450,440,'800 44px Baloo2','rgba(255,233,208,0.75)')},
 (lt,t)=>{const ls=TM.lines[9].s,tsub=wt(9,'सब्सक्राइब')-ls;
  x.fillStyle='#1d0a0d';rr(30,30,840,200,24);x.fill();x.strokeStyle='rgba(255,233,208,0.3)';x.lineWidth=3;x.stroke();
  x.drawImage(LOGO,56,62,76,76);txt('@आप',150,98,'800 34px Baloo2','rgba(255,233,208,0.6)','left');
  const msg='श्राप या परंपरा?';const n=Math.floor(cl((lt-0.4)/1.4)*msg.length);txt(msg.slice(0,n)+((Math.floor(t*3)%2)?'|':''),150,170,'800 50px Baloo2',CREAM,'left');
  rr(700,160,140,52,26);x.fillStyle=n>=msg.length?ORANGE:'rgba(255,122,47,0.35)';x.fill();txt('POST',770,196,'700 26px Pop','#fff');
  const done=lt>tsub+0.15;const bp=done?back((lt-tsub-0.15)/0.25):1;x.save();x.translate(400,380);x.scale(bp,bp);rr(-250,-56,500,112,56);x.fillStyle=done?'#555':'#e0262e';x.fill();txt(done?'SUBSCRIBED':'SUBSCRIBE',0,16,'700 46px Pop','#fff');x.restore();
  x.save();x.translate(760,380);x.rotate(done?Math.sin(t*25)*0.35*Math.max(0,1-(lt-tsub-0.15)/1.2):0);x.fillStyle=GOLD;x.beginPath();x.moveTo(-34,22);x.quadraticCurveTo(-34,-40,0,-42);x.quadraticCurveTo(34,-40,34,22);x.lineTo(44,32);x.lineTo(-44,32);x.closePath();x.fill();x.beginPath();x.arc(0,40,10,0,7);x.fill();x.restore();
  const hp=eio((lt-(tsub-0.6))/0.6);const hx=lerp(820,420,hp),hy=lerp(520,400,hp)+(lt>tsub&&lt<tsub+0.2?8:0);x.save();x.translate(hx,hy);x.fillStyle='#fff';x.strokeStyle='#000';x.lineWidth=4;x.beginPath();x.moveTo(0,0);x.lineTo(0,62);x.lineTo(16,48);x.lineTo(28,74);x.lineTo(40,68);x.lineTo(28,44);x.lineTo(48,44);x.closePath();x.fill();x.stroke();x.restore()}
];
