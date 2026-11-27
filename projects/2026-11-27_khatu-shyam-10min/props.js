// props.js — scene props, all code-drawn, comic style
const INK='#1a0a02';
function eio(v){v=Math.max(0,Math.min(1,v));return v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2}
function eo(v){v=Math.max(0,Math.min(1,v));return 1-Math.pow(1-v,3)}
function cl(v){return Math.max(0,Math.min(1,v))}
function lerp(a,b,k){return a+(b-a)*k}
function backE(v){v=cl(v);const s=1.7;return 1+(s+1)*Math.pow(v-1,3)+s*Math.pow(v-1,2)}
function glowAt(x0,y0,r,a,col='255,225,150'){if(a<=0)return;const g=x.createRadialGradient(x0,y0,0,x0,y0,r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);x.save();x.globalCompositeOperation='lighter';x.fillStyle=g;x.beginPath();x.arc(x0,y0,r,0,6.28);x.fill();x.restore()}
function sparkles(cx,cy,R,t,n=24,a=1){x.save();x.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const an=hash(i)*6.28+t*(.4+hash(i+2)),rr=R*(.3+.7*hash(i+5)),px=cx+Math.cos(an)*rr,py=cy+Math.sin(an)*rr*.8-((t*40+i*30)%120)*hash(i+9);const s=(2+hash(i+3)*5)*(.6+.4*Math.sin(t*6+i));x.fillStyle=`rgba(255,240,180,${a*.9})`;x.beginPath();x.moveTo(px,py-s*2);x.lineTo(px+s*.5,py);x.lineTo(px,py+s*2);x.lineTo(px-s*.5,py);x.fill();x.beginPath();x.moveTo(px-s*2,py);x.lineTo(px,py+s*.5);x.lineTo(px+s*2,py);x.lineTo(px,py-s*.5);x.fill()}x.restore()}
function petals(t,a=1,n=40){x.save();x.globalAlpha=a;for(let i=0;i<n;i++){const px=(hash(i)*W+Math.sin(t+i)*60)%W,py=((hash(i+4)*H+t*(60+hash(i+1)*80))%(H+40))-20;x.save();x.translate(px,py);x.rotate(t*2+i);x.fillStyle=i%3?'#ff8a1e':'#ffd23a';x.beginPath();x.ellipse(0,0,10,5,0,0,6.28);x.fill();x.restore()}x.restore()}
// ---- environments ----
function forestBG(t,dark=0){comicSky(t,dark?'#1a3a5a':'#58b8e8','#d8f2ff',dark?null:[1560,200]);comicHills(t,[[640,80,'#4a9a4a',2],[700,50,'#2f7a3a',5]]);comicGround(780,'#5aa046','#2f6a24');
 for(let i=0;i<9;i++){const tx=60+i*240+(i%2)*60,ty=800+(i%3)*30;x.fillStyle='#5a3618';x.strokeStyle=INK;x.lineWidth=4;x.fillRect(tx-16,ty-240,32,250);x.strokeRect(tx-16,ty-240,32,250);x.fillStyle=i%2?'#2f8a3a':'#3aa046';x.beginPath();x.arc(tx,ty-280,110,0,6.28);x.arc(tx-70,ty-220,70,0,6.28);x.arc(tx+70,ty-220,70,0,6.28);x.fill();x.stroke()}
 if(dark){x.fillStyle='rgba(10,20,50,.35)';x.fillRect(0,0,W,H)}}
function plainBG(t,sunset){comicSky(t,sunset?'#e8642a':'#3aa0e8',sunset?'#ffd28a':'#c8ecff',[1500,sunset?560:220]);comicHills(t,[[700,90,sunset?'#b85a3a':'#7fbf6a',1],[760,60,sunset?'#8a3a2a':'#5aa64e',3]]);comicGround(800,sunset?'#c8964a':'#a8c94a',sunset?'#7a5a2a':'#6a8a2a')}
function nightBG(t){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0a1030');g.addColorStop(1,'#2a3a6a');x.fillStyle=g;x.fillRect(0,0,W,H);for(let i=0;i<120;i++){x.fillStyle=`rgba(255,255,255,${.4+.6*Math.abs(Math.sin(t*2+i))})`;x.beginPath();x.arc(hash(i)*W,hash(i+3)*H*.6,1+hash(i+7)*2,0,6.28);x.fill()}
 x.fillStyle='#fff6d0';x.beginPath();x.arc(1600,170,70,0,6.28);x.fill();x.fillStyle='#0a1030';x.beginPath();x.arc(1630,150,62,0,6.28);x.fill()}
function cosmicBG(t,col1='#2a0a4a',col2='#ff9a2a'){const g=x.createRadialGradient(W/2,H/2,50,W/2,H/2,W*.8);g.addColorStop(0,col2);g.addColorStop(.35,'#c83a6a');g.addColorStop(1,col1);x.fillStyle=g;x.fillRect(0,0,W,H);x.save();x.translate(W/2,H/2);x.rotate(t*.1);for(let i=0;i<36;i++){x.fillStyle=i%2?'rgba(255,255,255,.08)':'rgba(255,220,140,.06)';x.beginPath();x.moveTo(0,0);x.arc(0,0,1800,i/36*6.28,(i+1)/36*6.28);x.fill()}x.restore();halftone(0,0,W,H,'rgba(255,255,255,.08)',3,'up')}
function desertBG(t){comicSky(t,'#4ab0ec','#fff0c8',[300,180]);comicHills(t,[[720,60,'#e0b46a',2],[760,40,'#d09a52',4]]);comicGround(800,'#f0c87a','#c89a4a')}
// ---- props ----
function army(x0,y0,w,rows,col,flag,t,alpha=1,dir=1){x.save();x.globalAlpha=alpha;for(let r=0;r<rows;r++)for(let i=0;i<Math.floor(w/26);i++){const px=x0+i*26+(r%2)*13,py=y0+r*24,b=Math.sin(t*6+i+r)*1.5;x.fillStyle=col;x.strokeStyle=INK;x.lineWidth=1.5;x.beginPath();x.arc(px,py-30+b,6,0,6.28);x.fill();x.stroke();x.fillRect(px-6,py-24+b,12,20);x.strokeRect(px-6,py-24+b,12,20);
 x.strokeStyle='#8a8a90';x.lineWidth=2;x.beginPath();x.moveTo(px+8*dir,py-4);x.lineTo(px+8*dir,py-46);x.stroke();if(i%5===0&&r===0){x.fillStyle=flag;x.strokeStyle=INK;x.lineWidth=1.5;x.beginPath();x.moveTo(px+8*dir,py-46);x.lineTo(px+8*dir+22*dir+Math.sin(t*5+i)*3,py-40);x.lineTo(px+8*dir,py-32);x.fill();x.stroke()}}x.restore()}
function horse(cx,gy,s,t,run,col='#3a6ad8'){x.save();x.translate(cx,gy);x.scale(s,s);const ph=t*(run?9:2),bob=run?Math.abs(Math.sin(ph))*10:Math.sin(ph)*2;x.translate(0,-bob);
 const L=(lx,a)=>{x.save();x.translate(lx,-150);x.rotate(a);x.fillStyle=shade(col,-20);x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.roundRect(-11,0,22,95,10);x.fill();x.stroke();x.translate(0,90);x.rotate(-a*.6+.1);x.beginPath();x.roundRect(-9,0,18,60,8);x.fill();x.stroke();x.fillStyle='#2a1a0a';x.fillRect(-11,55,22,12);x.restore()};
 const A=run?.6:0;L(-90,Math.sin(ph)*A);L(70,Math.sin(ph+1.5)*A);
 // body
 const g=x.createLinearGradient(0,-260,0,-120);g.addColorStop(0,shade(col,30));g.addColorStop(1,shade(col,-25));x.fillStyle=g;x.strokeStyle=INK;x.lineWidth=5;x.beginPath();x.ellipse(-10,-185,130,62,0,0,6.28);x.fill();x.stroke();
 // neck+head
 x.beginPath();x.moveTo(70,-220);x.quadraticCurveTo(120,-300,150,-330);x.lineTo(200,-300);x.quadraticCurveTo(170,-250,120,-170);x.closePath();x.fill();x.stroke();x.beginPath();x.ellipse(185,-310,48,26,.5,0,6.28);x.fill();x.stroke();
 x.fillStyle='#fff';x.beginPath();x.arc(178,-322,6,0,6.28);x.fill();x.fillStyle=INK;x.beginPath();x.arc(180,-322,3,0,6.28);x.fill();x.beginPath();x.moveTo(150,-345);x.lineTo(160,-372);x.lineTo(170,-340);x.fill();
 // mane + tail
 x.fillStyle='#f2f0ea';x.strokeStyle=INK;x.lineWidth=3;for(let i=0;i<6;i++){x.beginPath();x.moveTo(90+i*12,-240-i*14);x.quadraticCurveTo(70+i*10+Math.sin(t*6+i)*6,-226-i*12,74+i*12,-206-i*14);x.lineTo(100+i*12,-222-i*14);x.fill();x.stroke()}
 x.beginPath();x.moveTo(-135,-200);x.quadraticCurveTo(-200+Math.sin(t*5)*12,-160,-180+Math.sin(t*4)*16,-90);x.lineTo(-150,-110);x.quadraticCurveTo(-160,-160,-128,-180);x.fill();x.stroke();
 // saddle cloth + bridle
 x.fillStyle='#c8321e';x.beginPath();x.roundRect(-70,-250,100,70,10);x.fill();x.stroke();x.fillStyle=GOLD;x.fillRect(-70,-195,100,10);x.strokeStyle=GOLD;x.lineWidth=4;x.beginPath();x.moveTo(150,-300);x.lineTo(205,-300);x.stroke();
 L(-60,Math.sin(ph+3)*A);L(100,Math.sin(ph+4.5)*A);x.restore()}
function cow(cx,gy,s,t,dir=1){x.save();x.translate(cx,gy);x.scale(s*dir,s);const legs=[-80,-50,60,90];x.fillStyle='#f4efe6';x.strokeStyle=INK;x.lineWidth=4;legs.forEach(l=>{x.beginPath();x.roundRect(l-9,-110,18,110,8);x.fill();x.stroke()});
 x.beginPath();x.ellipse(0,-140,130,58,0,0,6.28);x.fill();x.stroke();x.fillStyle='#c89a6a';x.beginPath();x.ellipse(-30,-150,30,22,0,0,6.28);x.fill();x.beginPath();x.ellipse(50,-130,22,16,0,0,6.28);x.fill();
 x.fillStyle='#f4efe6';x.beginPath();x.ellipse(150,-180,40,52,.3,0,6.28);x.fill();x.stroke();x.fillStyle='#f0b8a8';x.beginPath();x.ellipse(170,-140,26,18,.3,0,6.28);x.fill();x.stroke();x.fillStyle=INK;x.beginPath();x.arc(150,-195,5,0,6.28);x.fill();
 x.fillStyle='#e8dcc0';x.beginPath();x.moveTo(130,-225);x.quadraticCurveTo(110,-260,120,-275);x.lineTo(138,-228);x.fill();x.stroke();x.beginPath();x.moveTo(165,-228);x.quadraticCurveTo(185,-262,175,-276);x.lineTo(158,-226);x.fill();x.stroke();
 x.fillStyle='#ffd23a';x.beginPath();x.arc(140,-150,10,0,6.28);x.fill();x.stroke();x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.moveTo(-130,-150);x.quadraticCurveTo(-160+Math.sin(t*3)*10,-100,-150,-60);x.stroke();
 x.fillStyle='#f0b8a8';x.beginPath();x.ellipse(10,-88,28,16,0,0,6.28);x.fill();x.stroke();x.restore()}
function milkStream(x0,y0,y1,t,a){if(a<=0)return;x.save();x.globalAlpha=a;x.strokeStyle='#ffffff';x.lineWidth=6;x.lineCap='round';for(let i=0;i<3;i++){x.beginPath();x.moveTo(x0-8+i*8,y0);x.quadraticCurveTo(x0-6+i*8+Math.sin(t*10+i)*3,(y0+y1)/2,x0-10+i*10,y1);x.stroke()}x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.ellipse(x0,y1,40,10,0,0,6.28);x.fill();x.restore()}
function hut(cx,gy,s){x.save();x.translate(cx,gy);x.scale(s,s);x.fillStyle='#d8a86a';x.strokeStyle=INK;x.lineWidth=4;x.fillRect(-90,-120,180,120);x.strokeRect(-90,-120,180,120);x.fillStyle='#8a5a2a';x.beginPath();x.moveTo(-120,-115);x.lineTo(0,-210);x.lineTo(120,-115);x.closePath();x.fill();x.stroke();x.fillStyle='#4a2a10';x.fillRect(-22,-70,44,70);x.strokeRect(-22,-70,44,70);x.restore()}
function temple(cx,gy,s,t,marble){x.save();x.translate(cx,gy);x.scale(s,s);const wall=marble?'#f4f0ea':'#e0a85a',sh=marble?'#cfc8bc':'#b0783a';x.strokeStyle=INK;x.lineWidth=5;
 x.fillStyle=sh;x.fillRect(-300,-30,600,30);x.strokeRect(-300,-30,600,30);x.fillStyle=wall;x.fillRect(-240,-260,480,230);x.strokeRect(-240,-260,480,230);
 for(let i=0;i<5;i++){x.fillStyle=sh;x.fillRect(-220+i*100,-250,22,220);x.strokeRect(-220+i*100,-250,22,220)}
 x.fillStyle='#4a2a10';x.beginPath();x.moveTo(-50,-30);x.lineTo(-50,-160);x.arc(0,-160,50,Math.PI,0);x.lineTo(50,-30);x.closePath();x.fill();x.stroke();glowAt(0,-110,90,.5);
 // shikhara
 x.fillStyle=wall;x.beginPath();x.moveTo(-180,-260);x.quadraticCurveTo(-150,-520,0,-620);x.quadraticCurveTo(150,-520,180,-260);x.closePath();x.fill();x.stroke();x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=3;for(let i=1;i<6;i++){x.beginPath();x.moveTo(-180+i*14,-260-i*55);x.quadraticCurveTo(0,-275-i*58,180-i*14,-260-i*55);x.stroke()}
 x.strokeStyle=INK;x.lineWidth=4;x.fillStyle=GOLD;x.beginPath();x.arc(0,-630,20,0,6.28);x.fill();x.stroke();x.strokeStyle=INK;x.beginPath();x.moveTo(0,-650);x.lineTo(0,-740);x.stroke();
 // flag (white surajgarh nishan / saffron)
 x.fillStyle=marble?'#ffffff':'#ff8a1e';x.beginPath();x.moveTo(0,-740);x.quadraticCurveTo(50,-730+Math.sin(t*4)*6,90,-715+Math.sin(t*4+1)*8);x.lineTo(0,-690);x.closePath();x.fill();x.stroke();
 for(let i=-1;i<=1;i+=2){x.fillStyle=wall;x.beginPath();x.moveTo(i*240,-260);x.quadraticCurveTo(i*250,-360,i*290,-380);x.quadraticCurveTo(i*330,-360,i*300,-260);x.fill();x.strokeStyle=INK;x.stroke()}x.restore()}
function sheesh(cx,cy,s,t,glow=1){ // Khatu Shyam sheesh on a lotus pedestal (symbolic, serene)
 glowAt(cx,cy-40*s,320*s,.55*glow);x.save();x.translate(cx,cy);x.scale(s,s);
 x.fillStyle='#e8507a';x.strokeStyle=INK;x.lineWidth=4;for(let i=-3;i<=3;i++){x.save();x.translate(i*34,70);x.rotate(i*.22);x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(-40,-50,0,-110);x.quadraticCurveTo(40,-50,0,0);x.fill();x.stroke();x.restore()}
 x.fillStyle='#f8a0b8';for(let i=-2;i<=2;i++){x.save();x.translate(i*40,70);x.rotate(i*.3);x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(-30,-40,0,-80);x.quadraticCurveTo(30,-40,0,0);x.fill();x.stroke();x.restore()}
 head([0,-60],{t,mouth:speakingAmp('barbarik',TNOW)*.9,blink:blinkAuto(t,.7),look:[.2,0]},CH.shyam);x.restore()}
function lion(cx,cy,s,a){if(a<=0)return;x.save();x.globalAlpha=a;x.translate(cx,cy);x.scale(s,s);x.fillStyle='#e8961e';x.strokeStyle=INK;x.lineWidth=4;for(let i=0;i<16;i++){const an=i/16*6.28;x.beginPath();x.moveTo(Math.cos(an)*60,Math.sin(an)*60);x.lineTo(Math.cos(an+.2)*120,Math.sin(an+.2)*120);x.lineTo(Math.cos(an+.4)*60,Math.sin(an+.4)*60);x.fill();x.stroke()}
 x.fillStyle='#f2c060';x.beginPath();x.arc(0,0,72,0,6.28);x.fill();x.stroke();x.fillStyle=INK;x.beginPath();x.arc(-24,-14,7,0,6.28);x.arc(24,-14,7,0,6.28);x.fill();x.beginPath();x.moveTo(-12,14);x.lineTo(12,14);x.lineTo(0,28);x.fill();x.restore()}
function weaponIcon(kind,cx,cy,s,a){if(a<=0)return;x.save();x.globalAlpha=a;x.translate(cx,cy);x.scale(s,s);x.fillStyle='#fff';x.strokeStyle=INK;x.lineWidth=5;x.beginPath();x.arc(0,0,80,0,6.28);x.fill();x.stroke();
 if(kind==='sword'){x.rotate(-.7);x.fillStyle='#c8ccd8';x.beginPath();x.moveTo(-6,30);x.lineTo(-6,-60);x.lineTo(0,-72);x.lineTo(6,-60);x.lineTo(6,30);x.fill();x.stroke();x.fillStyle=GOLD;x.fillRect(-26,28,52,10);x.strokeRect(-26,28,52,10);x.fillStyle='#6a3a1a';x.fillRect(-5,38,10,26)}
 if(kind==='gada'){gada([0,40],0,.42)}
 if(kind==='bow'){x.strokeStyle='#6a2e0c';x.lineWidth=8;x.beginPath();x.moveTo(-20,-60);x.quadraticCurveTo(50,0,-20,60);x.stroke();x.strokeStyle='#ddd';x.lineWidth=2;x.beginPath();x.moveTo(-20,-60);x.lineTo(-20,60);x.stroke();x.strokeStyle='#8a5a2a';x.lineWidth=4;x.beginPath();x.moveTo(-40,0);x.lineTo(50,0);x.stroke();x.fillStyle=GOLD;x.beginPath();x.moveTo(50,-8);x.lineTo(66,0);x.lineTo(50,8);x.fill()}
 x.restore()}
function chip(text,cx,cy,size,p,bg='#ffe14a',fg=INK,rot=0){if(p<=0)return;const s=backE(p);x.save();x.translate(cx,cy);x.rotate(rot);x.scale(s,s);x.font=`${size}px Rozha`;const w=x.measureText(text).width+size*1.1,h=size*1.55;x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.roundRect(-w/2+6,-h/2+6,w,h,h/3);x.fill();x.fillStyle=bg;x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.roundRect(-w/2,-h/2,w,h,h/3);x.fill();x.stroke();x.fillStyle=fg;x.textAlign='center';x.textBaseline='middle';x.fillText(text,0,3);x.restore()}
function bigTitle(text,cx,cy,size,p,col='#ffe14a'){if(p<=0)return;const s=backE(p);x.save();x.translate(cx,cy);x.scale(s,s);x.font=`${size}px Rozha`;x.textAlign='center';x.textBaseline='middle';x.lineJoin='round';x.lineWidth=size*.18;x.strokeStyle=INK;x.strokeText(text,0,0);x.fillStyle=col;x.fillText(text,0,0);x.restore()}
function truckBack(cx,cy,s,t,p){if(p<=0)return;x.save();x.translate(cx,cy);x.scale(s*backE(p),s*backE(p));
 x.fillStyle='#2a6ad8';x.strokeStyle=INK;x.lineWidth=8;x.beginPath();x.roundRect(-420,-300,840,520,30);x.fill();x.stroke();
 // decorative borders
 x.fillStyle='#ffd23a';x.fillRect(-400,-280,800,40);x.strokeRect(-400,-280,800,40);x.fillStyle='#e8321e';for(let i=0;i<16;i++){x.beginPath();x.moveTo(-390+i*50,-240);x.lineTo(-365+i*50,-210);x.lineTo(-340+i*50,-240);x.fill()}
 x.fillStyle='#fff';x.beginPath();x.roundRect(-360,-170,720,190,24);x.fill();x.stroke();
 x.font='86px Rozha';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#c8261c';x.fillText('हारे का सहारा',0,-110);x.fillStyle='#1a4fb0';x.fillText('बाबा श्याम हमारा',0,-20);
 // lights + mudflaps
 [[-360,120],[360,120]].forEach(([lx,ly])=>{x.fillStyle='#ff3a1e';x.beginPath();x.roundRect(lx-40,ly-30,80,60,10);x.fill();x.stroke();glowAt(lx,ly,70,.4+.3*Math.sin(t*6),'255,80,40')});
 x.fillStyle='#1a1a1a';x.fillRect(-330,220,120,90);x.fillRect(210,220,120,90);x.fillStyle='#ffd23a';x.font='34px Rozha';x.fillText('जय श्री श्याम',-270,265);x.fillText('जय श्री श्याम',270,265);
 x.fillStyle='#ff8a1e';x.beginPath();x.arc(0,140,40,0,6.28);x.fill();x.stroke();x.fillStyle='#1a4fb0';x.font='40px Rozha';x.fillText('ॐ',0,142);x.restore()}
function dreamBubble(cx,cy,r,p,draw){if(p<=0)return;x.save();x.globalAlpha=cl(p*2);const s=backE(p);x.translate(cx,cy);x.scale(s,s);x.fillStyle='#ffffff';x.strokeStyle=INK;x.lineWidth=5;
 [[-r*.9,r*1.1,18],[-r*.7,r*.9,28]].forEach(([a,b,rr])=>{x.beginPath();x.arc(a,b,rr,0,6.28);x.fill();x.stroke()});x.beginPath();x.ellipse(0,0,r*1.3,r,0,0,6.28);x.fill();x.stroke();x.save();x.beginPath();x.ellipse(0,0,r*1.25,r*.95,0,0,6.28);x.clip();x.scale(1/s,1/s);x.translate(-cx,-cy);draw();x.restore();x.restore()}
function scale2(cx,cy,tilt,lt,rt){x.save();x.translate(cx,cy);x.strokeStyle=INK;x.lineWidth=8;x.fillStyle=GOLD;x.beginPath();x.moveTo(0,0);x.lineTo(0,300);x.stroke();x.beginPath();x.moveTo(-90,300);x.lineTo(90,300);x.stroke();x.rotate(tilt);x.beginPath();x.moveTo(-340,0);x.lineTo(340,0);x.stroke();x.beginPath();x.arc(0,0,16,0,6.28);x.fill();x.stroke();
 [[-340,lt],[340,rt]].forEach(([px,f])=>{x.save();x.translate(px,0);x.rotate(-tilt);x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.moveTo(-80,120);x.lineTo(0,0);x.lineTo(80,120);x.stroke();x.fillStyle=GOLD;x.beginPath();x.ellipse(0,124,100,22,0,0,6.28);x.fill();x.stroke();f&&f();x.restore()});x.restore()}
function ripples(cx,cy,t,a){x.save();x.globalAlpha=a;x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=3;for(let i=0;i<4;i++){const r=((t*60+i*50)%200);x.globalAlpha=a*(1-r/200);x.beginPath();x.ellipse(cx,cy,r,r*.25,0,0,6.28);x.stroke()}x.restore()}
function pond(cx,cy,w,h,t){x.fillStyle='#3aa0d8';x.strokeStyle=INK;x.lineWidth=5;x.beginPath();x.ellipse(cx,cy,w,h,0,0,6.28);x.fill();x.stroke();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.ellipse(cx-w*.3,cy-h*.3,w*.3,h*.2,0,0,6.28);x.fill();ripples(cx,cy,t,.8);
 x.fillStyle='#c8a46a';for(let i=0;i<6;i++){x.fillRect(cx-w-20+i*12,cy-h+20+i*4,60,14)}}
function walkerCrowd(t,y,n,dir=1,flags=true,alpha=1){x.save();x.globalAlpha=alpha;for(let i=0;i<n;i++){const sp=40+hash(i)*30,px=((hash(i+2)*W*1.4+t*sp*dir)%(W*1.4)+W*1.4)%(W*1.4)-W*.2,py=y+hash(i+5)*120,b=Math.abs(Math.sin(t*7+i))*6;const sc=.55+(py-y)/120*.35;x.save();x.translate(px,py);x.scale(sc,sc);
 x.fillStyle=['#e8321e','#ffd23a','#2a8a4a','#ff8a1e','#f4efe6'][i%5];x.strokeStyle=INK;x.lineWidth=3;x.beginPath();x.roundRect(-16,-90-b,32,60,10);x.fill();x.stroke();x.fillStyle='#b07a46';x.beginPath();x.arc(0,-104-b,14,0,6.28);x.fill();x.stroke();x.fillStyle=['#e8321e','#ffd23a','#f4efe6'][i%3];x.beginPath();x.ellipse(0,-116-b,16,8,0,0,6.28);x.fill();x.stroke();
 x.strokeStyle=INK;x.lineWidth=4;x.beginPath();x.moveTo(-6,-30-b);x.lineTo(-10+Math.sin(t*7+i)*8,0);x.moveTo(6,-30-b);x.lineTo(10-Math.sin(t*7+i)*8,0);x.stroke();
 if(flags&&i%2===0){x.strokeStyle='#6a3a1a';x.lineWidth=4;x.beginPath();x.moveTo(14,-70-b);x.lineTo(20,-230-b);x.stroke();x.fillStyle=i%4?'#ff8a1e':'#ffffff';x.strokeStyle=INK;x.lineWidth=2;x.beginPath();x.moveTo(20,-230-b);x.quadraticCurveTo(60,-222+Math.sin(t*5+i)*6,90,-205+Math.sin(t*5+i+1)*8);x.lineTo(20,-185-b);x.closePath();x.fill();x.stroke()}x.restore()}x.restore()}
function familyTree(cx,cy,p,t){const nodes=[['भीम','bhima',cx,cy-230],['घटोत्कच','ghatotkacha',cx,cy],['बर्बरीक','barbarik',cx,cy+230]];
 for(let i=0;i<2;i++){const q=cl(p*3-i-.3);if(q<=0)continue;x.strokeStyle=GOLD;x.lineWidth=8;x.beginPath();x.moveTo(cx,nodes[i][3]+70);x.lineTo(cx,lerp(nodes[i][3]+70,nodes[i+1][3]-70,q));x.stroke()}
 nodes.forEach(([n,k,nx,ny],i)=>{const q=cl(p*3-i);if(q<=0)return;const s=backE(q);x.save();x.translate(nx,ny);x.scale(s,s);x.fillStyle='#fff6d8';x.strokeStyle=INK;x.lineWidth=6;x.beginPath();x.arc(0,0,78,0,6.28);x.fill();x.stroke();x.save();x.beginPath();x.arc(0,0,74,0,6.28);x.clip();x.translate(-6,40);x.scale(.62,.62);head([0,0],{t,mouth:0,blink:0,look:[.3,0]},CH[k]);x.restore();x.restore();chip(n,nx+190,ny,40,q,'#ffe14a')})}
