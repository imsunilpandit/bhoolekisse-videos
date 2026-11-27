// Bhoole Kisse – rigged code characters (v2). All drawing in canvas, every part animatable.
// Angle convention: 0 = limb points down, +PI/2 = forward (+x when dir=1), PI = up.
const OL='#2e1204',GOLD='#e8b04a',GOLD2='#ffe08a',GOLDD='#a8741e';
function pt(p,a,L){return [p[0]+Math.sin(a)*L,p[1]+Math.cos(a)*L]}
function shade(col,amt){const n=parseInt(col.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;r=Math.max(0,Math.min(255,r+amt));g=Math.max(0,Math.min(255,g+amt));b=Math.max(0,Math.min(255,b+amt));return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
function limb(p,q,w0,w1,col){const a=Math.atan2(q[1]-p[1],q[0]-p[0]),nx=-Math.sin(a),ny=Math.cos(a);
 const g=x.createLinearGradient(p[0]+nx*w0,p[1]+ny*w0,p[0]-nx*w0,p[1]-ny*w0);g.addColorStop(0,shade(col,22));g.addColorStop(.55,col);g.addColorStop(1,shade(col,-28));
 x.fillStyle=g;x.strokeStyle=OL;x.lineWidth=3.5;x.beginPath();x.moveTo(p[0]+nx*w0,p[1]+ny*w0);x.lineTo(q[0]+nx*w1,q[1]+ny*w1);x.arc(q[0],q[1],w1,a+Math.PI/2,a-Math.PI/2,true);x.lineTo(p[0]-nx*w0,p[1]-ny*w0);x.arc(p[0],p[1],w0,a-Math.PI/2,a+Math.PI/2,true);x.closePath();x.fill();x.stroke()}
function band(p,q,k,w,col=GOLD){const bx=p[0]+(q[0]-p[0])*k,by=p[1]+(q[1]-p[1])*k,a=Math.atan2(q[1]-p[1],q[0]-p[0]);x.save();x.translate(bx,by);x.rotate(a);const g=x.createLinearGradient(0,-w,0,w);g.addColorStop(0,GOLD2);g.addColorStop(1,GOLDD);x.fillStyle=g;x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.rect(-6,-w,12,w*2);x.fill();x.stroke();x.fillStyle='#c8321e';x.beginPath();x.arc(0,0,3.5,0,6.28);x.fill();x.restore()}
function hand(h,a,sk,mode){x.save();x.translate(h[0],h[1]);x.rotate(-a);x.fillStyle=sk;x.strokeStyle=OL;x.lineWidth=3;
 if(mode==='open'){x.beginPath();x.ellipse(0,10,17,22,0,0,6.28);x.fill();x.stroke();for(let i=-1;i<=2;i++){x.beginPath();x.ellipse(i*8-2,32,4,11,0,0,6.28);x.fill();x.stroke()}x.beginPath();x.ellipse(-17,10,5,11,.6,0,6.28);x.fill();x.stroke()}
 else{x.beginPath();x.ellipse(0,10,17,19,0,0,6.28);x.fill();x.stroke()}x.restore()}
function arm(sh,up,lo,C,far,hm){const L1=150*C.lw,L2=135*C.lw,e=pt(sh,up,L1),h=pt(e,up+lo,L2);const sk=far?C.skinD:C.skin;const w=C.aw;
 limb(sh,e,24*w,19*w,sk);limb(e,h,19*w,14*w,sk);if(C.armband!==false){band(sh,e,.32,20*w);band(e,h,.88,15*w)}hand(h,up+lo,sk,hm||'fist');return [e,h]}
function leg(hp,th,kn,C,far){const k=pt(hp,th,205*C.lh),f=pt(k,th-kn,200*C.lh);const sk=far?C.skinD:C.skin;limb(k,f,21*C.aw,15*C.aw,sk);
 x.fillStyle=GOLD;x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.ellipse(f[0],f[1]-8,16*C.aw,6,0,0,6.28);x.fill();x.stroke();
 x.fillStyle=sk;x.lineWidth=3.5;x.beginPath();x.ellipse(f[0]+16,f[1]+8,32*C.aw,12,0,0,6.28);x.fill();x.stroke();return [k,f]}
function eyeShape(ex,ey,op,look,C,blinkL){x.fillStyle='#fffaf0';x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(ex-17,ey);x.quadraticCurveTo(ex,ey-13*op,ex+19,ey-1);x.quadraticCurveTo(ex,ey+9*op,ex-17,ey);x.fill();x.stroke();
 if(op>.25){x.save();x.clip();x.fillStyle=C.iris||'#3a1a08';x.beginPath();x.arc(ex+look[0]*6,ey+look[1]*3,7,0,6.28);x.fill();x.fillStyle='#000';x.beginPath();x.arc(ex+look[0]*6,ey+look[1]*3,3.5,0,6.28);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(ex+look[0]*6+2,ey+look[1]*3-2,1.8,0,6.28);x.fill();x.restore()}
 // kohl line (mural style elongated)
 x.strokeStyle=OL;x.lineWidth=3.5;x.beginPath();x.moveTo(ex-17,ey);x.quadraticCurveTo(ex,ey-13*op,ex+19,ey-1);x.lineTo(ex+27,ey-5);x.stroke()}
function head(hc,P,C){const m=Math.max(0,Math.min(1,P.mouth||0)),op=1-(P.blink||0),look=P.look||[1,0];x.save();x.translate(hc[0],hc[1]);x.rotate(P.tilt||0);x.scale(C.hs||1,C.hs||1);
 const sk=C.skin;
 // hair back
 if(C.hair!=='none'&&C.hair!=='bald'){x.fillStyle=C.hairCol||'#140804';x.strokeStyle=OL;x.lineWidth=3.5;x.beginPath();x.moveTo(-60,-36);x.bezierCurveTo(-110,40,-100,140,-70+Math.sin(P.t*2)*4,190);x.lineTo(-10,150);x.bezierCurveTo(30,100,62,40,58,-36);x.closePath();x.fill();x.stroke();
  x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=3;for(let i=0;i<5;i++){x.beginPath();x.moveTo(-50+i*8,-20);x.bezierCurveTo(-90+i*10,50,-80+i*10,120,-62+i*12+Math.sin(P.t*2)*4,170);x.stroke()}x.strokeStyle='rgba(0,0,0,.3)';x.lineWidth=2;for(let i=0;i<4;i++){x.beginPath();x.moveTo(-44+i*10,0);x.bezierCurveTo(-80+i*10,60,-74+i*10,120,-56+i*10,160);x.stroke()}
  if(C.hair==='wild'){for(let i=0;i<7;i++){x.beginPath();const a=-2.6+i*.45;x.moveTo(Math.cos(a)*60,Math.sin(a)*70);x.lineTo(Math.cos(a)*112+Math.sin(P.t*2+i)*4,Math.sin(a)*112);x.lineTo(Math.cos(a+.2)*64,Math.sin(a+.2)*72);x.fill();x.stroke()}}}
 // neck
 const ng=x.createLinearGradient(-22,0,22,0);ng.addColorStop(0,shade(sk,-30));ng.addColorStop(1,sk);x.fillStyle=ng;x.strokeStyle=OL;x.lineWidth=3.5;x.beginPath();x.moveTo(-20*C.nw,46);x.lineTo(-26*C.nw,116);x.lineTo(34*C.nw,116);x.lineTo(30*C.nw,46);x.closePath();x.fill();x.stroke();
 if(window.proFace){x.fillStyle='rgba(60,20,5,.35)';x.beginPath();x.ellipse(8,86,30,10,0,0,6.28);x.fill();proFace(P,C);proMarks(C)}else{
 // face
 const fg=x.createRadialGradient(14,-6,10,4,0,90);fg.addColorStop(0,shade(sk,26));fg.addColorStop(.7,sk);fg.addColorStop(1,shade(sk,-30));x.fillStyle=fg;x.beginPath();
 x.moveTo(-58,-30);x.quadraticCurveTo(-64,40,-30,70);x.quadraticCurveTo(6,92,40,72);x.quadraticCurveTo(70,40,66,-30);x.quadraticCurveTo(64,-80,4,-84);x.quadraticCurveTo(-56,-80,-58,-30);x.fill();x.stroke();
 if(C.rakshasa){x.fillStyle='#fff';x.beginPath();x.moveTo(-6,64);x.lineTo(0,80);x.lineTo(6,64);x.moveTo(26,62);x.lineTo(32,78);x.lineTo(38,62);x.fill()}
 // cheek blush
 x.fillStyle='rgba(220,80,60,.18)';x.beginPath();x.ellipse(40,30,14,9,0,0,6.28);x.fill();x.beginPath();x.ellipse(-30,30,12,8,0,0,6.28);x.fill();
 // ear + kundal
 x.fillStyle=sk;x.beginPath();x.ellipse(-56,8,11,19,0,0,6.28);x.fill();x.stroke();
 if(C.kundal){const g=x.createRadialGradient(-56,48,2,-56,48,22);g.addColorStop(0,'#fff6c0');g.addColorStop(.5,GOLD);g.addColorStop(1,'rgba(255,200,80,0)');x.fillStyle=g;x.beginPath();x.arc(-56,48+Math.sin(P.t*3)*2,22,0,6.28);x.fill();x.fillStyle=GOLD2;x.beginPath();x.arc(-56,48+Math.sin(P.t*3)*2,10,0,6.28);x.fill();x.stroke()}
 else{x.fillStyle=GOLD;x.beginPath();x.arc(-56,40+Math.sin(P.t*3)*2,9,0,6.28);x.fill();x.stroke()}
 // eyes + brows
 const ey=-8,br=P.brow||0;eyeShape(-16,ey,op,look,C);eyeShape(34,ey,op,look,C);
 x.strokeStyle=C.browCol||OL;x.lineWidth=C.browW||5;x.lineCap='round';[[-16,1],[34,-1]].forEach(([ex,s])=>{x.beginPath();x.moveTo(ex-18,ey-16-br+(P.angry?s*-5:0));x.quadraticCurveTo(ex,ey-26-br,ex+20,ey-18-br+(P.angry?s*5:0));x.stroke()});x.lineCap='butt';
 if(C.thirdEye){x.fillStyle='#fffaf0';x.beginPath();x.ellipse(9,-40,5,10,0,0,6.28);x.fill();x.stroke();x.fillStyle='#c8321e';x.beginPath();x.arc(9,-40,3,0,6.28);x.fill()}
 // nose
 x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(12,-2);x.quadraticCurveTo(28,26,18,32);x.quadraticCurveTo(12,34,8,30);x.stroke();
 // moustache / beard
 if(C.beard){x.fillStyle=C.beardCol;x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(-44,30);x.quadraticCurveTo(-40,C.beard==='long'?170:110,10,C.beard==='long'?200:120);x.quadraticCurveTo(60,C.beard==='long'?170:110,62,30);x.quadraticCurveTo(40,70,12,64);x.quadraticCurveTo(-20,70,-44,30);x.fill();x.stroke();
  x.strokeStyle='rgba(0,0,0,.15)';for(let i=0;i<5;i++){x.beginPath();x.moveTo(-20+i*16,80);x.lineTo(-24+i*17,C.beard==='long'?180:110);x.stroke()}}
 if(C.mous){x.fillStyle=C.beardCol||'#140804';x.beginPath();x.moveTo(12,40);x.quadraticCurveTo(-14,38,-24,52);x.quadraticCurveTo(-4,46,12,46);x.quadraticCurveTo(28,46,46,50);x.quadraticCurveTo(38,38,12,40);x.fill()}
 // mouth (open amount m)
 x.strokeStyle=OL;x.lineWidth=3;const my=C.beard?54:50;
 if(m<.08){x.beginPath();x.moveTo(-2,my);x.quadraticCurveTo(13,my+(P.smile?7:3),28,my-1);x.stroke()}else{x.fillStyle='#5a0e10';x.beginPath();x.ellipse(13,my+2,12+m*3,2+m*11,0,0,6.28);x.fill();x.stroke();x.fillStyle='#fff';x.fillRect(5,my-1-m*6,16,3);x.fillStyle='#d0505a';x.beginPath();x.ellipse(13,my+6+m*6,7,3*m,0,0,6.28);x.fill()}
 // tilak
 if(C.tilak==='vaishnav'){x.strokeStyle='#f6efe0';x.lineWidth=4;x.beginPath();x.moveTo(2,-28);x.lineTo(-2,-62);x.moveTo(16,-28);x.lineTo(20,-62);x.stroke();x.fillStyle='#d8261c';x.fillRect(7,-56,4,26)}
 else if(C.tilak==='shaiva'){x.strokeStyle='#f6efe0';x.lineWidth=3.5;for(let i=0;i<3;i++){x.beginPath();x.moveTo(-14,-36-i*8);x.lineTo(32,-36-i*8);x.stroke()}x.fillStyle='#d8261c';x.beginPath();x.arc(9,-44,4,0,6.28);x.fill()}
 else if(C.tilak){x.fillStyle=C.tilak;x.beginPath();x.ellipse(9,-40,4,11,0,0,6.28);x.fill()}
 }
 // headgear
 const hg=C.head;x.strokeStyle=OL;x.lineWidth=3.5;
 const gg=(y0,y1)=>{const g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,GOLD2);g.addColorStop(1,GOLDD);return g};
 if((hg==='crown')&&C.crownStyle){const cs=C.crownStyle;const silver=cs==='silver';const g2=(y0,y1)=>{const g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,silver?'#ffffff':GOLD2);g.addColorStop(1,silver?'#9a9aa8':GOLDD);return g};
  if(cs==='tall'){x.fillStyle=g2(-230,-50);x.beginPath();x.moveTo(-56,-52);x.lineTo(-40,-120);x.quadraticCurveTo(8,-250,56,-120);x.lineTo(70,-52);x.closePath();x.fill();x.stroke();for(let i=0;i<4;i++){x.strokeStyle='rgba(120,70,10,.6)';x.lineWidth=3;x.beginPath();x.moveTo(-44+i*6,-80-i*30);x.lineTo(60-i*6,-80-i*30);x.stroke()}x.strokeStyle=OL;x.lineWidth=3.5;x.fillStyle='#1a4fb0';x.beginPath();x.arc(8,-100,10,0,6.28);x.fill();x.stroke();x.fillStyle=GOLD2;x.beginPath();x.arc(8,-226,8,0,6.28);x.fill();x.stroke()}
  else if(cs==='sun'){const g=x.createRadialGradient(8,-128,4,8,-128,70);g.addColorStop(0,'rgba(255,240,170,.9)');g.addColorStop(1,'rgba(255,190,60,0)');x.fillStyle=g;x.beginPath();x.arc(8,-128,70,0,6.28);x.fill();x.fillStyle=g2(-170,-50);x.beginPath();x.moveTo(-60,-52);x.lineTo(-56,-104);x.lineTo(72,-104);x.lineTo(68,-52);x.closePath();x.fill();x.stroke();
   x.fillStyle=GOLD2;for(let i=0;i<12;i++){const a=Math.PI+i/11*Math.PI;x.beginPath();x.moveTo(8+Math.cos(a-.1)*30,-118+Math.sin(a-.1)*30);x.lineTo(8+Math.cos(a)*58,-118+Math.sin(a)*58);x.lineTo(8+Math.cos(a+.1)*30,-118+Math.sin(a+.1)*30);x.fill();x.stroke()}x.fillStyle='#ff9a1a';x.beginPath();x.arc(8,-118,28,0,6.28);x.fill();x.stroke();x.fillStyle='#ffd23a';x.beginPath();x.arc(8,-118,16,0,6.28);x.fill()}
  else if(cs==='war'){x.save();x.translate(8,-112);x.rotate(-.25+Math.sin(P.t*2)*.05);x.fillStyle='#c8261c';x.beginPath();x.moveTo(0,0);x.bezierCurveTo(-30,-40,-50,-90,-20,-130);x.bezierCurveTo(-10,-90,10,-50,12,0);x.fill();x.stroke();x.strokeStyle='rgba(255,180,140,.6)';x.lineWidth=2;for(let i=0;i<6;i++){x.beginPath();x.moveTo(-4,-14-i*18);x.lineTo(-22-i*2,-20-i*18);x.stroke()}x.restore();x.strokeStyle=OL;x.lineWidth=3.5;
   x.fillStyle=g2(-130,-50);x.beginPath();x.moveTo(-62,-52);x.quadraticCurveTo(-60,-118,8,-126);x.quadraticCurveTo(76,-118,72,-52);x.closePath();x.fill();x.stroke();x.strokeStyle='rgba(120,70,10,.6)';x.lineWidth=2;for(let i=0;i<3;i++){x.beginPath();x.arc(8,-52,30+i*20,Math.PI+.2,-.2);x.stroke()}x.strokeStyle=OL;x.fillStyle='#1a4fb0';x.beginPath();x.moveTo(8,-110);x.lineTo(20,-90);x.lineTo(8,-70);x.lineTo(-4,-90);x.closePath();x.fill();x.stroke()}
  else if(cs==='band'){x.fillStyle=g2(-110,-50);x.beginPath();x.moveTo(-64,-50);x.lineTo(-62,-92);for(let i=0;i<7;i++){x.lineTo(-52+i*20,-108);x.lineTo(-42+i*20,-92)}x.lineTo(74,-92);x.lineTo(72,-50);x.closePath();x.fill();x.stroke();x.fillStyle='#c8321e';for(let i=0;i<5;i++){x.beginPath();x.arc(-40+i*24,-74,6,0,6.28);x.fill();x.stroke()}}
  else if(cs==='silver'){x.fillStyle=g2(-150,-50);x.beginPath();x.moveTo(-60,-52);x.lineTo(-54,-110);x.lineTo(-20,-96);x.lineTo(8,-150);x.lineTo(36,-96);x.lineTo(70,-110);x.lineTo(68,-52);x.closePath();x.fill();x.stroke();x.fillStyle='#f4efe0';x.beginPath();x.arc(8,-110,9,0,6.28);x.fill();x.stroke()}
  x.fillStyle=g2(-66,-48);x.fillRect(-62,-66,132,16);x.strokeRect(-62,-66,132,16)}
 else if(hg==='crown'||hg==='mukut'){x.fillStyle=gg(-170,-50);x.beginPath();x.moveTo(-60,-52);x.lineTo(-58,-112);x.lineTo(-34,-98);x.lineTo(-24,-140);x.lineTo(-6,-108);x.lineTo(8,-170);x.lineTo(24,-108);x.lineTo(42,-140);x.lineTo(50,-98);x.lineTo(70,-112);x.lineTo(68,-52);x.closePath();x.fill();x.stroke();
  x.fillStyle='#c8321e';[[8,-120,9],[-24,-112,6],[42,-112,6]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,6.28);x.fill();x.stroke()});x.fillStyle='#2a8a6a';x.beginPath();x.arc(8,-78,7,0,6.28);x.fill();x.stroke();
  x.fillStyle=gg(-66,-48);x.fillRect(-62,-66,132,16);x.strokeRect(-62,-66,132,16);x.fillStyle='#f4efe0';for(let i=0;i<9;i++){x.beginPath();x.arc(-54+i*15,-58,3,0,6.28);x.fill()}
  if(hg==='mukut'){x.save();x.translate(34,-150);x.rotate(.35+Math.sin(P.t*2)*.04);const pg=x.createLinearGradient(0,-130,0,0);pg.addColorStop(0,'#2bb08a');pg.addColorStop(1,'#145c46');x.fillStyle=pg;x.beginPath();x.moveTo(0,0);x.bezierCurveTo(-34,-40,-26,-110,0,-136);x.bezierCurveTo(26,-110,34,-40,0,0);x.fill();x.stroke();
   x.strokeStyle='rgba(255,230,140,.6)';x.lineWidth=1.5;for(let i=0;i<8;i++){x.beginPath();x.moveTo(0,-10-i*14);x.lineTo(-18,-20-i*14);x.moveTo(0,-10-i*14);x.lineTo(18,-20-i*14);x.stroke()}
   x.fillStyle='#e8c84a';x.beginPath();x.ellipse(0,-98,14,19,0,0,6.28);x.fill();x.fillStyle='#1a4fb0';x.beginPath();x.ellipse(0,-98,9,13,0,0,6.28);x.fill();x.fillStyle='#0a1a40';x.beginPath();x.ellipse(0,-98,4,6,0,0,6.28);x.fill();x.restore()}
  if(C.flowers){for(let i=0;i<7;i++){const a=-2.9+i*.36;x.fillStyle=i%2?'#f2e8d0':'#f28a2a';x.beginPath();x.arc(Math.cos(a)*74+6,Math.sin(a)*70-40,9,0,6.28);x.fill();x.strokeStyle=OL;x.lineWidth=2;x.stroke()}}}
 else if(hg==='jata'){x.fillStyle=C.hairCol||'#2a1408';x.beginPath();x.moveTo(-58,-40);x.quadraticCurveTo(-70,-150,4,-190);x.quadraticCurveTo(80,-150,66,-40);x.quadraticCurveTo(4,-70,-58,-40);x.fill();x.stroke();
  x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=2;for(let i=0;i<5;i++){x.beginPath();x.arc(4,-110,30+i*14,Math.PI*1.1,Math.PI*1.9);x.stroke()}
  // moon
  x.fillStyle='#f6f2e0';x.beginPath();x.arc(36,-150,20,.6,4.2);x.arc(44,-156,16,4.2,.6,true);x.fill();
  // ganga stream
  x.strokeStyle='rgba(160,220,255,.85)';x.lineWidth=5;x.beginPath();x.moveTo(4,-188);x.bezierCurveTo(20,-230,-10,-260,10+Math.sin(P.t*3)*6,-300);x.stroke();
  // snake around neck drawn later in torso
  }
 else if(hg==='brahmin'){x.fillStyle=C.hairCol||'#1a0a06';x.beginPath();x.ellipse(4,-62,60,26,0,Math.PI,0);x.fill();x.stroke();x.beginPath();x.moveTo(-6,-84);x.quadraticCurveTo(-30,-120,-14+Math.sin(P.t*2)*4,-128);x.lineWidth=6;x.stroke();x.lineWidth=3.5}
 else if(hg==='bun'){x.fillStyle=C.hairCol||'#140804';x.beginPath();x.ellipse(4,-60,62,30,0,Math.PI,0);x.fill();x.stroke();x.beginPath();x.arc(-40,-70,26,0,6.28);x.fill();x.stroke();x.fillStyle='#f2e8d0';for(let i=0;i<6;i++){x.beginPath();x.arc(-40+Math.cos(i)*24,-70+Math.sin(i)*24,5,0,6.28);x.fill()}
  x.fillStyle=GOLD;x.beginPath();x.arc(9,-66,7,0,6.28);x.fill();x.stroke();x.strokeStyle=GOLD;x.lineWidth=3;x.beginPath();x.moveTo(9,-60);x.lineTo(9,-48);x.stroke();
  // nose ring
  x.strokeStyle=GOLD;x.lineWidth=3;x.beginPath();x.arc(26,32,9,-1,2.5);x.stroke()}
 else if(hg==='turban'){x.fillStyle=C.turban||'#d8261c';x.beginPath();x.ellipse(4,-62,70,40,0,Math.PI,0);x.lineTo(70,-50);x.lineTo(-62,-50);x.fill();x.stroke();x.strokeStyle='rgba(0,0,0,.2)';x.lineWidth=3;for(let i=0;i<3;i++){x.beginPath();x.ellipse(4,-62+i*4,66-i*6,34-i*8,0,Math.PI+.2,-.2);x.stroke()}x.fillStyle=GOLD;x.beginPath();x.arc(10,-82,9,0,6.28);x.fill();x.strokeStyle=OL;x.stroke()}
 else if(hg==='horns'){x.fillStyle=C.hairCol||'#140804';x.beginPath();x.ellipse(4,-60,64,30,0,Math.PI,0);x.fill();x.stroke();x.fillStyle='#e8dcc0';x.beginPath();x.moveTo(-40,-74);x.quadraticCurveTo(-70,-120,-48,-140);x.quadraticCurveTo(-46,-110,-24,-80);x.fill();x.stroke();x.beginPath();x.moveTo(48,-74);x.quadraticCurveTo(80,-120,58,-140);x.quadraticCurveTo(56,-110,32,-80);x.fill();x.stroke();
  x.fillStyle=gg(-66,-50);x.fillRect(-60,-66,128,14);x.strokeRect(-60,-66,128,14)}
 else if(hg==='flame'){for(let i=0;i<7;i++){const fx=-50+i*17,fh=70+Math.sin(P.t*8+i)*14+(i%2)*20;const g=x.createLinearGradient(0,-50,0,-50-fh);g.addColorStop(0,'#ff6a1a');g.addColorStop(1,'rgba(255,220,80,.2)');x.fillStyle=g;x.beginPath();x.moveTo(fx-12,-50);x.quadraticCurveTo(fx,-50-fh*1.2,fx+12,-50);x.fill()}}
 else if(hg==='bald'){x.fillStyle=C.beardCol||'#eee';x.beginPath();x.ellipse(-50,-30,10,20,0,0,6.28);x.fill()}
 if(C.hair==='side'&&hg!=='jata'){x.fillStyle=C.hairCol||'#140804';x.beginPath();x.moveTo(-60,-50);x.quadraticCurveTo(-70,0,-58,30);x.lineTo(-50,-40);x.fill()}
 x.restore()}
function torso(hip,P,C){const tw=C.tw,nk=[hip[0]+(P.lean||0)*30,hip[1]-300*C.th];const sk=C.skin;
 const g=x.createLinearGradient(nk[0]-90*tw,0,nk[0]+90*tw,0);g.addColorStop(0,shade(sk,-34));g.addColorStop(.6,sk);g.addColorStop(1,shade(sk,14));x.fillStyle=g;x.strokeStyle=OL;x.lineWidth=3.5;
 x.beginPath();x.moveTo(hip[0]-50*tw,hip[1]-20);x.quadraticCurveTo(hip[0]-62*tw,hip[1]-160*C.th,nk[0]-92*tw,nk[1]+30);x.quadraticCurveTo(nk[0],nk[1]-6,nk[0]+92*tw,nk[1]+30);x.quadraticCurveTo(hip[0]+62*tw,hip[1]-160*C.th,hip[0]+50*tw,hip[1]-20);x.closePath();x.fill();x.stroke();
if(!C.fem){ // chest muscle lines
 x.strokeStyle='rgba(60,20,5,.35)';x.lineWidth=2.5;x.beginPath();x.moveTo(nk[0]-50*tw,nk[1]+95);x.quadraticCurveTo(nk[0],nk[1]+110,nk[0]+50*tw,nk[1]+95);x.moveTo(nk[0],nk[1]+110);x.lineTo(hip[0],hip[1]-60);x.stroke();}
 if(C.top){x.fillStyle=C.top;x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(nk[0]-88*tw,nk[1]+34);x.quadraticCurveTo(nk[0],nk[1]+10,nk[0]+88*tw,nk[1]+34);x.lineTo(nk[0]+70*tw,nk[1]+130);x.quadraticCurveTo(nk[0],nk[1]+145,nk[0]-70*tw,nk[1]+130);x.closePath();x.fill();x.stroke();x.strokeStyle=GOLD;x.lineWidth=4;x.stroke()}
 if(C.kavach){const kg=x.createLinearGradient(0,nk[1],0,hip[1]);kg.addColorStop(0,GOLD2);kg.addColorStop(1,GOLDD);x.fillStyle=kg;x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(nk[0]-80*tw,nk[1]+36);x.quadraticCurveTo(nk[0],nk[1]+14,nk[0]+80*tw,nk[1]+36);x.lineTo(hip[0]+48*tw,hip[1]-40);x.lineTo(hip[0]-48*tw,hip[1]-40);x.closePath();x.fill();x.stroke();
  x.strokeStyle='rgba(120,70,10,.6)';x.lineWidth=2;for(let r=0;r<6;r++)for(let i=0;i<5;i++){x.beginPath();x.arc(nk[0]-56*tw+i*28*tw,nk[1]+60+r*34,12,0,Math.PI);x.stroke()}
  const gl=x.createRadialGradient(nk[0],nk[1]+120,10,nk[0],nk[1]+120,190);gl.addColorStop(0,`rgba(255,230,140,${.25+.1*Math.sin(P.t*3)})`);gl.addColorStop(1,'rgba(255,200,80,0)');x.save();x.globalCompositeOperation='lighter';x.fillStyle=gl;x.beginPath();x.arc(nk[0],nk[1]+120,190,0,6.28);x.fill();x.restore()}
 if(C.sash){x.strokeStyle=C.sash;x.lineWidth=20;x.beginPath();x.moveTo(nk[0]-62*tw,nk[1]+30);x.lineTo(hip[0]+46*tw,hip[1]-40);x.stroke();x.strokeStyle=GOLD;x.lineWidth=2.5;x.setLineDash([6,6]);x.stroke();x.setLineDash([])}
 if(C.janeu){x.strokeStyle='#f6efe0';x.lineWidth=4;x.beginPath();x.moveTo(nk[0]-60*tw,nk[1]+30);x.lineTo(hip[0]+40*tw,hip[1]-30);x.stroke()}
 if(C.rudraksha){x.fillStyle='#6a2a10';for(let i=0;i<14;i++){const a=.25+i*(Math.PI-.5)/13;x.beginPath();x.arc(nk[0]+Math.cos(a)*58,nk[1]+14+Math.sin(a)*70,6,0,6.28);x.fill()}}
 else{x.strokeStyle=GOLD;x.lineWidth=7;x.beginPath();x.arc(nk[0],nk[1]+8,56*tw,.3,Math.PI-.3);x.stroke();x.fillStyle='#c8321e';x.beginPath();x.arc(nk[0],nk[1]+62*tw,9,0,6.28);x.fill();x.strokeStyle=OL;x.lineWidth=2;x.stroke()}
 if(C.garland){x.lineCap='round';x.strokeStyle='#2a6a2a';x.lineWidth=5;x.beginPath();for(let i=0;i<=40;i++){const u=i/40,gx=nk[0]-60*tw+u*120*tw,gy=nk[1]+30+Math.sin(u*Math.PI)*(hip[1]-nk[1]-50);i?x.lineTo(gx,gy):x.moveTo(gx,gy)}x.stroke();for(let i=0;i<40;i++){const u=i/39,gx=nk[0]-60*tw+u*120*tw,gy=nk[1]+30+Math.sin(u*Math.PI)*(hip[1]-nk[1]-50);x.fillStyle=i%4===0?'#e8462a':(i%2?'#f6f0e0':'#f2c230');x.beginPath();x.arc(gx,gy,8,0,6.28);x.fill();x.strokeStyle='rgba(0,0,0,.3)';x.lineWidth=1;x.stroke()}x.lineCap='butt'}
 if(C.snake){x.strokeStyle='#4a7a3a';x.lineWidth=12;x.beginPath();x.arc(nk[0],nk[1]+4,62,.2,Math.PI-.2);x.stroke();x.fillStyle='#4a7a3a';x.beginPath();x.ellipse(nk[0]+62,nk[1]+30,14,10,.4,0,6.28);x.fill();x.strokeStyle=OL;x.lineWidth=2;x.stroke()}
 // belt
 const bg=x.createLinearGradient(0,hip[1]-40,0,hip[1]-10);bg.addColorStop(0,GOLD2);bg.addColorStop(1,GOLDD);x.fillStyle=bg;x.strokeStyle=OL;x.lineWidth=3.5;x.fillRect(hip[0]-58*tw,hip[1]-40,116*tw,30);x.strokeRect(hip[0]-58*tw,hip[1]-40,116*tw,30);x.fillStyle='#c8321e';x.beginPath();x.arc(hip[0],hip[1]-25,10,0,6.28);x.fill();x.stroke();
 if(C.flute){x.save();x.translate(hip[0]+40*tw,hip[1]-30);x.rotate(.5);x.fillStyle='#8a4a14';x.fillRect(-6,-90,12,170);x.strokeRect(-6,-90,12,170);x.fillStyle=GOLD;x.fillRect(-7,-80,14,8);x.fillRect(-7,60,14,8);x.restore()}
 return nk}
function lower(hip,kn1,kn2,C,t){const tw=C.tw;const a=kn1[0]>kn2[0]?kn1:kn2,b=kn1[0]>kn2[0]?kn2:kn1;
 if(C.skirt==='tiger'){x.fillStyle='#e8a030';x.strokeStyle=OL;x.lineWidth=3.5;x.beginPath();x.moveTo(hip[0]-60*tw,hip[1]-14);x.lineTo(hip[0]+60*tw,hip[1]-14);x.lineTo(a[0]+40,a[1]-30);x.lineTo(b[0]-40,b[1]-30);x.closePath();x.fill();x.stroke();x.fillStyle='#2a1406';for(let i=0;i<6;i++){x.beginPath();x.ellipse(hip[0]-40+i*16,hip[1]+40+(i%2)*40,4,18,.3,0,6.28);x.fill()}return}
 const g=x.createLinearGradient(b[0]-60,0,a[0]+60,0);g.addColorStop(0,shade(C.dhoti,-30));g.addColorStop(.5,C.dhoti);g.addColorStop(1,shade(C.dhoti,18));x.fillStyle=g;x.strokeStyle=OL;x.lineWidth=3.5;
 const long=C.skirt==='long';const ay=long?a[1]+170:a[1]+48,by=long?b[1]+170:b[1]+48;
 x.beginPath();x.moveTo(hip[0]-60*tw,hip[1]-14);x.lineTo(hip[0]+60*tw,hip[1]-14);x.quadraticCurveTo(a[0]+75*tw,(hip[1]+a[1])/2,a[0]+62*tw,ay);x.lineTo(a[0]-8,ay+10);x.lineTo(b[0]+8,by+10);x.lineTo(b[0]-62*tw,by);x.quadraticCurveTo(b[0]-75*tw,(hip[1]+b[1])/2,hip[0]-60*tw,hip[1]-14);x.closePath();x.fill();x.stroke();
 // folds
 x.strokeStyle='rgba(60,20,5,.3)';x.lineWidth=2.5;for(let i=0;i<4;i++){x.beginPath();x.moveTo(hip[0]-30+i*20,hip[1]);x.quadraticCurveTo(hip[0]-40+i*24+Math.sin(t*2+i)*4,(hip[1]+ay)/2,hip[0]-46+i*30,ay-6);x.stroke()}
 x.strokeStyle=C.border;x.lineWidth=9;x.beginPath();x.moveTo(a[0]+62*tw,ay);x.lineTo(a[0]-8,ay+10);x.moveTo(b[0]+8,by+10);x.lineTo(b[0]-62*tw,by);x.stroke();x.strokeStyle=GOLD;x.lineWidth=2;x.stroke();
 // front pleat
 x.fillStyle=C.dhoti2;x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(hip[0]-10,hip[1]-10);x.lineTo(hip[0]+18,hip[1]-10);x.lineTo(hip[0]+26+Math.sin(t*3)*4,Math.min(ay,hip[1]+200));x.lineTo(hip[0]-16,Math.min(ay,hip[1]+200)+8);x.closePath();x.fill();x.stroke()}
function charShadow(cx,w,gy){const g=x.createRadialGradient(cx,gy,0,cx,gy,w);g.addColorStop(0,'rgba(20,6,0,.5)');g.addColorStop(1,'rgba(20,6,0,0)');x.save();x.translate(cx,gy);x.scale(1,.15);x.fillStyle=g;x.beginPath();x.arc(0,0,w,0,6.28);x.fill();x.restore()}
// draw a character. P: pose; C: costume/build; gy: ground y
function character(P,C,gy){if(!P.noShadow)charShadow(P.x,170*P.s*C.tw,gy);x.save();x.translate(P.x,gy);x.scale(P.dir*P.s,P.s);const legLen=(205+200)*C.lh+8;x.translate(0,-legLen-(P.bob||0)+(P.sit||0));
 const hip=[0,0];if(C.aura){const g=x.createRadialGradient(0,-300,40,0,-300,520);g.addColorStop(0,C.aura);g.addColorStop(1,'rgba(0,0,0,0)');x.save();x.globalCompositeOperation='lighter';x.fillStyle=g;x.beginPath();x.arc(0,-300,520,0,6.28);x.fill();x.restore()}
 if(C.cape){x.fillStyle=C.cape;x.strokeStyle=OL;x.lineWidth=3.5;x.beginPath();x.moveTo(-80*C.tw,-290*C.th);x.quadraticCurveTo(-150*C.tw+Math.sin(P.t*2)*10,0,-120*C.tw+Math.sin(P.t*2.4)*16,120);x.lineTo(60*C.tw,60);x.lineTo(80*C.tw,-290*C.th);x.closePath();x.fill();x.stroke()}
 const lf=leg([-22*C.tw,0],P.thF||0,P.knF||0,C,1);
 const shy=-300*C.th+38;const af=arm([(P.lean||0)*30-68*C.tw,shy],P.upF??.15,P.loF??.25,C,1,P.hmF);
 if(P.preF)P.preF(af[1]);
 const ln=leg([22*C.tw,0],P.thN||0,P.knN||0,C,0);
 if(C.quiver){x.save();x.translate(-72*C.tw,-200*C.th);x.rotate(-.35);x.fillStyle='#7a3a14';x.strokeStyle=OL;x.lineWidth=3.5;x.fillRect(-18,-90,36,170);x.strokeRect(-18,-90,36,170);x.fillStyle=GOLD;x.fillRect(-18,-62,36,8);x.fillRect(-18,40,36,8);
  for(let i=0;i<3;i++){x.fillStyle=i===1?'#ffe08a':'#f2e6c8';x.beginPath();x.moveTo(-10+i*10,-90);x.lineTo(-15+i*10,-128);x.lineTo(-5+i*10,-128);x.closePath();x.fill();x.stroke()}x.restore()}
 lower(hip,lf[0],ln[0],C,P.t);const nk=torso(hip,P,C);
 head([nk[0]+6,nk[1]-75],P,C);
 const an=arm([nk[0]+62*C.tw,nk[1]+38],P.upN??.1,P.loN??.3,C,0,P.hmN);
 if(P.post)P.post(af[1],an[1],nk);
 x.restore();return {af:af[1],an:an[1]}}
// ---- costumes ----
const CH={
 barbarik:{name:'बर्बरीक',skin:'#c47a40',skinD:'#a0602c',dhoti:'#c8321e',dhoti2:'#e8562e',border:'#e8b04a',sash:'#1a4fb0',tilak:'#d8261c',head:'crown',quiver:1,tw:1,th:1,lw:1,lh:1,aw:1,nw:1,kundal:0,hair:'long'},
 shyam:{name:'खाटू श्याम',skin:'#3a4a7a',skinD:'#2a3860',dhoti:'#f2c230',dhoti2:'#ffd95a',border:'#c8321e',sash:'#c8321e',tilak:'vaishnav',head:'mukut',flowers:1,garland:1,quiver:1,tw:1,th:1,lw:1,lh:1,aw:1,nw:1,aura:'rgba(255,210,120,.35)',iris:'#2a1408'},
 krishna:{name:'श्री कृष्ण',skin:'#3f6fb8',skinD:'#30589a',dhoti:'#f2c230',dhoti2:'#ffd95a',border:'#c8321e',sash:'#e86a1e',tilak:'vaishnav',head:'mukut',garland:1,flute:1,tw:1,th:1,lw:1,lh:1,aw:1,nw:1,kundal:1,smile:1},
 brahmin:{name:'ब्राह्मण (कृष्ण)',skin:'#c88a54',skinD:'#a46c3a',dhoti:'#f4ecd8',dhoti2:'#fff6e4',border:'#d88a2a',tilak:'vaishnav',head:'brahmin',janeu:1,rudraksha:1,armband:false,tw:.95,th:1,lw:1,lh:1,aw:.95,nw:1,cape:'#e89a3a',hair:'none',mous:0},
 bhima:{name:'भीम',skin:'#b06a34',skinD:'#8c5226',dhoti:'#6a1a8a',dhoti2:'#8a2aaa',border:'#e8b04a',sash:'#c8321e',tilak:'#d8261c',head:'crown',mous:1,beardCol:'#140804',tw:1.35,th:1.05,lw:1.05,lh:1,aw:1.35,nw:1.3,hair:'long',browW:7},
 ghatotkacha:{name:'घटोत्कच',skin:'#6a4a3a',skinD:'#523828',dhoti:'#2a6a3a',dhoti2:'#3a8a4a',border:'#e8b04a',tilak:'#e8b04a',head:'horns',rakshasa:1,mous:1,beardCol:'#140804',tw:1.45,th:1.1,lw:1.1,lh:1.05,aw:1.4,nw:1.4,hair:'wild',iris:'#c8321e',browW:8},
 maurvi:{name:'माँ मौरवी',skin:'#c88a58',skinD:'#a66c3e',dhoti:'#1e7a6a',dhoti2:'#2a9a86',border:'#e8b04a',top:'#c8321e',tilak:'#d8261c',head:'bun',skirt:'long',tw:.82,th:.95,lw:.95,lh:1,aw:.8,nw:.85,cape:'#e8b04a',hair:'long'},
 shiva:{name:'भगवान शिव',skin:'#8aa6c4',skinD:'#6e8aa8',dhoti:'#e8a030',dhoti2:'#f2b84a',border:'#2a1406',skirt:'tiger',tilak:'shaiva',head:'jata',thirdEye:1,rudraksha:1,snake:1,armband:true,tw:1.15,th:1.05,lw:1,lh:1,aw:1.1,nw:1.1,hairCol:'#3a2210',aura:'rgba(160,210,255,.28)'},
 agni:{name:'अग्निदेव',skin:'#d8481e',skinD:'#b0381a',dhoti:'#f2c230',dhoti2:'#ffd95a',border:'#c8321e',tilak:'#ffe08a',head:'flame',beard:'short',beardCol:'#ff9a2a',tw:1.1,th:1,lw:1,lh:1,aw:1.05,nw:1.1,hair:'none',aura:'rgba(255,140,40,.35)',iris:'#ffcc33'},
 bhishma:{name:'भीष्म',skin:'#d0946a',skinD:'#b07a52',dhoti:'#f4ecd8',dhoti2:'#fff6e4',border:'#c8321e',tilak:'#d8261c',head:'crown',beard:'long',beardCol:'#f2f0ea',hairCol:'#f2f0ea',tw:1.05,th:1,lw:1,lh:1,aw:1,nw:1,hair:'long',browCol:'#f2f0ea'},
 drona:{name:'द्रोणाचार्य',skin:'#c88a5a',skinD:'#a46c40',dhoti:'#e86a1e',dhoti2:'#f28a3a',border:'#f4ecd8',tilak:'shaiva',head:'bald',beard:'long',beardCol:'#d8d4cc',janeu:1,rudraksha:1,tw:1,th:1,lw:1,lh:1,aw:1,nw:1,hair:'none',browCol:'#d8d4cc'},
 karna:{name:'कर्ण',skin:'#c8864a',skinD:'#a46a34',dhoti:'#8a1a1a',dhoti2:'#aa2a2a',border:'#e8b04a',tilak:'#d8261c',head:'crown',kavach:1,kundal:1,tw:1.1,th:1,lw:1,lh:1,aw:1.05,nw:1,hair:'long'},
 arjuna:{name:'अर्जुन',skin:'#b87a46',skinD:'#946032',dhoti:'#f2f0ea',dhoti2:'#ffffff',border:'#1a4fb0',sash:'#1a4fb0',tilak:'#d8261c',head:'crown',tw:1.02,th:1,lw:1,lh:1,aw:1,nw:1,hair:'long',quiver:1},
 hidimba:{name:'हिडिम्बा',skin:'#8a5a40',skinD:'#6e4630',dhoti:'#3a6a2a',dhoti2:'#4a8a3a',border:'#e8b04a',top:'#3a6a2a',tilak:'#e8b04a',head:'bun',skirt:'long',tw:.9,th:.98,lw:1,lh:1,aw:.9,nw:.9,hair:'wild'},
 king:{name:'राजा रूप सिंह',skin:'#c88a58',skinD:'#a46c3e',dhoti:'#f4ecd8',dhoti2:'#fff6e4',border:'#c8321e',top:'#c8321e',tilak:'#d8261c',head:'turban',turban:'#e8462a',mous:1,beardCol:'#140804',skirt:'long',tw:1.05,th:1,lw:1,lh:1,aw:1,nw:1},
 villager:{name:'गाँव वाला',skin:'#a8703e',skinD:'#86562c',dhoti:'#f4ecd8',dhoti2:'#fff6e4',border:'#8a6a3a',head:'turban',turban:'#f2c230',mous:1,beardCol:'#140804',armband:false,tw:.95,th:.97,lw:1,lh:1,aw:.95,nw:1},
};
// props
function bow(h,ang,draw,len=190){x.save();x.translate(h[0],h[1]);x.rotate(ang);x.strokeStyle='#5a260a';x.lineWidth=11;x.beginPath();x.moveTo(-12,-len);x.quadraticCurveTo(80+draw*20,0,-12,len);x.stroke();x.strokeStyle=GOLD;x.lineWidth=4;x.stroke();x.restore()}
function gada(h,ang,s=1){x.save();x.translate(h[0],h[1]);x.rotate(ang);x.scale(s,s);x.fillStyle='#7a4a1a';x.strokeStyle=OL;x.lineWidth=3.5;x.fillRect(-7,-30,14,220);x.strokeRect(-7,-30,14,220);const g=x.createRadialGradient(-12,-80,6,0,-70,60);g.addColorStop(0,GOLD2);g.addColorStop(1,GOLDD);x.fillStyle=g;x.beginPath();x.arc(0,-70,52,0,6.28);x.fill();x.stroke();x.strokeStyle='rgba(120,70,10,.6)';for(let i=0;i<4;i++){x.beginPath();x.ellipse(0,-70,52,14+i*10,0,0,6.28);x.stroke()}x.fillStyle=GOLD2;x.beginPath();x.moveTo(-8,-120);x.lineTo(0,-140);x.lineTo(8,-120);x.fill();x.stroke();x.restore()}
function trishul(h,ang){x.save();x.translate(h[0],h[1]);x.rotate(ang);x.strokeStyle=OL;x.lineWidth=3;x.fillStyle='#c8c8d0';x.fillRect(-5,-260,10,420);x.strokeRect(-5,-260,10,420);x.beginPath();x.moveTo(0,-330);x.lineTo(-10,-260);x.lineTo(10,-260);x.closePath();x.fill();x.stroke();[-1,1].forEach(s=>{x.beginPath();x.moveTo(0,-260);x.quadraticCurveTo(s*50,-260,s*42,-320);x.lineTo(s*30,-280);x.quadraticCurveTo(s*24,-270,0,-268);x.fill();x.stroke()});x.fillStyle='#8a5a2a';x.beginPath();x.ellipse(0,-230,14,20,0,0,6.28);x.fill();x.stroke();x.restore()}
function chakra(cx,cy,r,t){x.save();x.translate(cx,cy);x.rotate(t*8);const g=x.createRadialGradient(0,0,r*.2,0,0,r*1.6);g.addColorStop(0,'rgba(255,240,180,.9)');g.addColorStop(1,'rgba(255,200,80,0)');x.globalCompositeOperation='lighter';x.fillStyle=g;x.beginPath();x.arc(0,0,r*1.6,0,6.28);x.fill();x.globalCompositeOperation='source-over';x.fillStyle=GOLD2;x.strokeStyle=OL;x.lineWidth=3;
 x.beginPath();for(let i=0;i<24;i++){const a=i/24*6.28;x.lineTo(Math.cos(a)*r*(i%2?1:1.18),Math.sin(a)*r*(i%2?1:1.18))}x.closePath();x.fill();x.stroke();x.fillStyle='#c8321e';x.beginPath();x.arc(0,0,r*.55,0,6.28);x.fill();x.stroke();x.fillStyle=GOLD;x.beginPath();x.arc(0,0,r*.25,0,6.28);x.fill();x.stroke();x.restore()}
