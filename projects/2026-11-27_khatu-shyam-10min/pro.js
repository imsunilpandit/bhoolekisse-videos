// pro.js — overrides for a more polished, professional character look (loaded after chars.js)
function smoothPath(pts,close){x.beginPath();x.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length-1;i++){const mx=(pts[i][0]+pts[i+1][0])/2,my=(pts[i][1]+pts[i+1][1])/2;x.quadraticCurveTo(pts[i][0],pts[i][1],mx,my)}const l=pts[pts.length-1];x.lineTo(l[0],l[1]);if(close)x.closePath()}
// muscular limb with width profile, cel shading and rim light
function mlimb(p,q,w,prof,col){const dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux;const N=prof.length;const left=[],right=[];
 for(let i=0;i<N;i++){const u=i/(N-1),cx=p[0]+dx*u,cy=p[1]+dy*u,ww=w*prof[i];left.push([cx+nx*ww,cy+ny*ww]);right.push([cx-nx*ww,cy-ny*ww])}
 const wE=w*prof[N-1],wS=w*prof[0];const a=Math.atan2(dy,dx);
 const draw=()=>{x.beginPath();x.moveTo(left[0][0],left[0][1]);for(let i=1;i<N;i++){const m=[(left[i-1][0]+left[i][0])/2,(left[i-1][1]+left[i][1])/2];x.quadraticCurveTo(left[i-1][0],left[i-1][1],m[0],m[1])}x.lineTo(left[N-1][0],left[N-1][1]);
  x.arc(q[0],q[1],wE,a+Math.PI/2,a-Math.PI/2,true);for(let i=N-1;i>0;i--){const m=[(right[i][0]+right[i-1][0])/2,(right[i][1]+right[i-1][1])/2];x.quadraticCurveTo(right[i][0],right[i][1],m[0],m[1])}x.lineTo(right[0][0],right[0][1]);x.arc(p[0],p[1],wS,a-Math.PI/2,a+Math.PI/2,true);x.closePath()};
 draw();x.fillStyle=col;x.fill();
 // cel shadow on one side
 x.save();draw();x.clip();x.fillStyle=shade(col,-34);x.beginPath();x.moveTo(right[0][0],right[0][1]);right.forEach(r=>x.lineTo(r[0],r[1]));for(let i=N-1;i>=0;i--){const u=i/(N-1),cx=p[0]+dx*u,cy=p[1]+dy*u,ww=w*prof[i]*.25;x.lineTo(cx-nx*ww,cy-ny*ww)}x.closePath();x.fill();
 // rim light
 x.strokeStyle='rgba(255,236,190,.55)';x.lineWidth=3;x.beginPath();left.forEach((l,i)=>{const lx=l[0]-nx*3,ly=l[1]-ny*3;i?x.lineTo(lx,ly):x.moveTo(lx,ly)});x.stroke();x.restore();
 draw();x.strokeStyle=OL;x.lineWidth=3;x.stroke()}
const PROF={up:[1.0,1.1,1.14,1.04,.9,.82],fore:[1.0,1.12,1.06,.88,.74,.68],shin:[1.0,1.18,1.12,.9,.72,.62]};
function hand(h,a,sk,mode){x.save();x.translate(h[0],h[1]);x.rotate(-a);const d=shade(sk,-34);x.strokeStyle=OL;x.lineWidth=2.6;x.lineJoin='round';
 if(mode==='open'){ // palm facing viewer, fingers along +y
  x.fillStyle=sk;x.beginPath();x.moveTo(-15,0);x.quadraticCurveTo(-19,18,-15,30);x.lineTo(15,30);x.quadraticCurveTo(19,18,15,0);x.closePath();x.fill();x.stroke();
  [[-10.5,30,13],[-3.5,31,16],[3.5,31,15],[10.5,30,11.5]].forEach(([fx,fy,L])=>{x.fillStyle=sk;x.beginPath();x.moveTo(fx-3.4,fy-2);x.lineTo(fx-3.2,fy+L);x.arc(fx,fy+L,3.2,Math.PI,0,true);x.lineTo(fx+3.4,fy-2);x.fill();x.stroke();x.strokeStyle='rgba(60,20,5,.4)';x.lineWidth=1;x.beginPath();x.moveTo(fx-2,fy+L*.5);x.lineTo(fx+2,fy+L*.5);x.stroke();x.strokeStyle=OL;x.lineWidth=2.6});
  x.fillStyle=sk;x.beginPath();x.ellipse(-18,12,5,13,.7,0,6.28);x.fill();x.stroke();x.strokeStyle='rgba(60,20,5,.45)';x.lineWidth=1.4;x.beginPath();x.moveTo(-8,8);x.quadraticCurveTo(0,16,10,8);x.stroke();
  // hennna dot
  x.fillStyle='rgba(180,40,30,.6)';x.beginPath();x.arc(0,16,3,0,6.28);x.fill()}
 else{ x.fillStyle=sk;x.beginPath();x.moveTo(-15,-2);x.quadraticCurveTo(-20,14,-15,26);x.quadraticCurveTo(0,33,15,26);x.quadraticCurveTo(20,12,15,-2);x.closePath();x.fill();x.stroke();
  x.fillStyle=d;x.beginPath();x.moveTo(-15,20);x.quadraticCurveTo(0,30,15,22);x.quadraticCurveTo(0,34,-15,26);x.fill();
  x.strokeStyle='rgba(60,20,5,.55)';x.lineWidth=1.4;for(let i=0;i<3;i++){x.beginPath();x.moveTo(-9+i*7,18);x.lineTo(-9+i*7,27);x.stroke()}
  x.fillStyle=sk;x.strokeStyle=OL;x.lineWidth=2.4;x.beginPath();x.ellipse(-12,12,6,10,.5,0,6.28);x.fill();x.stroke()}
 x.restore()}
function arm(sh,up,lo,C,far,hm){const L1=138*C.lw,L2=124*C.lw,e=pt(sh,up,L1),h=pt(e,up+lo,L2);const sk=far?C.skinD:C.skin;const w=C.aw*(C.fem?.8:1);
 x.fillStyle=sk;x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.arc(sh[0],sh[1]+4,31*w,0,6.28);x.fill();x.stroke();
 mlimb(sh,e,28*w,PROF.up,sk);mlimb(e,h,21*w,PROF.fore,sk);
 // elbow crease
 x.strokeStyle='rgba(60,20,5,.35)';x.lineWidth=1.5;x.beginPath();x.arc(e[0],e[1],6,0,Math.PI);x.stroke();
 if(C.armband!==false){band(sh,e,.3,22*w);band(e,h,.9,13*w)}hand(h,up+lo,sk,hm||'fist');return [e,h]}
function leg(hp,th,kn,C,far){const k=pt(hp,th,205*C.lh),f=pt(k,th-kn,200*C.lh);const sk=far?C.skinD:C.skin;mlimb(k,f,19*C.aw,PROF.shin,sk);
 // anklet
 x.fillStyle=GOLD;x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.ellipse(f[0],f[1]-6,15*C.aw,5.5,0,0,6.28);x.fill();x.stroke();x.fillStyle=GOLD2;for(let i=-2;i<=2;i++){x.beginPath();x.arc(f[0]+i*6,f[1]-1,2.2,0,6.28);x.fill()}
 // foot (shaped, toes forward +x)
 const fw=C.aw;x.fillStyle=sk;x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(f[0]-14*fw,f[1]-6);x.quadraticCurveTo(f[0]-20*fw,f[1]+14,f[0]-6*fw,f[1]+16);x.lineTo(f[0]+40*fw,f[1]+16);x.quadraticCurveTo(f[0]+52*fw,f[1]+12,f[0]+44*fw,f[1]+3);x.quadraticCurveTo(f[0]+22*fw,f[1]-4,f[0]+10*fw,f[1]-8);x.closePath();x.fill();x.stroke();
 x.strokeStyle='rgba(60,20,5,.45)';x.lineWidth=1.3;for(let i=0;i<3;i++){x.beginPath();x.moveTo(f[0]+(32+i*5)*fw,f[1]+8);x.lineTo(f[0]+(34+i*5)*fw,f[1]+15);x.stroke()}
 x.fillStyle='rgba(200,40,30,.55)';x.beginPath();x.moveTo(f[0]-6*fw,f[1]+15);x.lineTo(f[0]+40*fw,f[1]+15);x.lineTo(f[0]+40*fw,f[1]+17);x.lineTo(f[0]-6*fw,f[1]+17);x.fill();return [k,f]}
// ---------- professional face ----------
function proEye(ex,ey,op,look,C,mir){x.save();x.translate(ex,ey);if(mir)x.scale(-1,1);
 const top=(k)=>{x.moveTo(-18,2);x.bezierCurveTo(-10,-11*k,8,-12*k,20,-2)};
 // white
 x.fillStyle='#fffaf2';x.beginPath();top(op);x.bezierCurveTo(10,7*op,-8,8*op,-18,2);x.fill();
 if(op>.2){x.save();x.beginPath();top(op);x.bezierCurveTo(10,7*op,-8,8*op,-18,2);x.clip();const lx=(mir?-1:1)*look[0]*5+2,ly=look[1]*3;
  const ig=x.createRadialGradient(lx,ly,1,lx,ly,9);ig.addColorStop(0,shade(C.iris||'#4a2a12',40));ig.addColorStop(1,C.iris||'#3a1a08');x.fillStyle=ig;x.beginPath();x.arc(lx,ly,8.5,0,6.28);x.fill();
  x.fillStyle='#0a0402';x.beginPath();x.arc(lx,ly,3.8,0,6.28);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(lx+2.5,ly-3,2.2,0,6.28);x.fill();x.beginPath();x.arc(lx-2.5,ly+2.5,1,0,6.28);x.fill();
  // upper lid shadow
  x.fillStyle='rgba(60,20,5,.25)';x.beginPath();top(op);x.lineTo(20,2);x.lineTo(-18,6);x.fill();x.restore()}
 // upper lid thick line + wing (kajal)
 x.strokeStyle='#120602';x.lineWidth=3.8;x.lineCap='round';x.beginPath();top(op);x.quadraticCurveTo(25,-5,30,-9);x.stroke();
 // lower lid
 x.lineWidth=1.6;x.strokeStyle='rgba(30,10,2,.7)';x.beginPath();x.moveTo(-14,3);x.bezierCurveTo(-6,8*op+1,8,8*op+1,18,1);x.stroke();
 // crease
 x.strokeStyle='rgba(60,20,5,.4)';x.lineWidth=1.4;x.beginPath();x.moveTo(-14,-8*op-2);x.bezierCurveTo(-4,-15,10,-15,18,-8);x.stroke();
 // lashes
 x.strokeStyle='#120602';x.lineWidth=1.6;for(let i=0;i<3;i++){const u=.55+i*.18,px=-18+38*u,py=-11*op*Math.sin(u*Math.PI)+1;x.beginPath();x.moveTo(px,py);x.lineTo(px+4,py-5);x.stroke()}
 x.lineCap='butt';x.restore()}
function proFace(P,C){const sk=C.skin,m=Math.max(0,Math.min(1,P.mouth||0)),op=1-(P.blink||0),look=P.look||[1,0];
 const jaw=C.fem?{cw:56,ch:70,chin:6}:C.rakshasa?{cw:66,ch:80,chin:16}:{cw:60,ch:76,chin:12};
 const facePath=()=>{x.beginPath();x.moveTo(-58,-34);x.bezierCurveTo(-62,0,-56,30,-40,52);x.bezierCurveTo(-26,70,-8,jaw.ch+12,10,jaw.ch+14);x.bezierCurveTo(28,jaw.ch+12,46,66,58,48);x.bezierCurveTo(70,28,70,-4,66,-34);x.bezierCurveTo(62,-78,28,-88,4,-88);x.bezierCurveTo(-28,-88,-56,-76,-58,-34);x.closePath()};
 facePath();const fg=x.createLinearGradient(-60,0,70,0);fg.addColorStop(0,shade(sk,-22));fg.addColorStop(.45,sk);fg.addColorStop(1,shade(sk,14));x.fillStyle=fg;x.fill();
 x.save();facePath();x.clip();
 // cel shadow far side + under cheekbone + jaw
 x.fillStyle=shade(sk,-22);x.beginPath();x.moveTo(-70,-90);x.lineTo(-44,-90);x.bezierCurveTo(-54,-30,-50,30,-24,96);x.lineTo(-70,96);x.fill();
 
 // highlights
 x.fillStyle='rgba(255,240,210,.35)';x.beginPath();x.ellipse(30,-46,18,12,-.3,0,6.28);x.fill();x.beginPath();x.ellipse(24,14,6,14,0,0,6.28);x.fill();x.beginPath();x.ellipse(14,jaw.ch+4,10,5,0,0,6.28);x.fill();
 // blush
 x.fillStyle=C.fem?'rgba(230,80,80,.28)':'rgba(220,80,60,.16)';x.beginPath();x.ellipse(44,28,14,9,0,0,6.28);x.fill();x.beginPath();x.ellipse(-24,28,10,7,0,0,6.28);x.fill();
 x.restore();facePath();x.strokeStyle=OL;x.lineWidth=3.2;x.stroke();
 // ear
 x.fillStyle=shade(sk,-14);x.beginPath();x.moveTo(-56,-8);x.bezierCurveTo(-74,-12,-76,26,-58,30);x.closePath();x.fill();x.stroke();x.strokeStyle='rgba(60,20,5,.5)';x.lineWidth=1.5;x.beginPath();x.arc(-62,10,7,-1.8,1.6);x.stroke();
 // eyes
 const ey=-10;proEye(-14,ey,op,look,C,1);proEye(36,ey-1,op,look,C,0);
 // brows (filled tapered)
 const br=P.brow||0;x.fillStyle=C.browCol||'#140804';[[-14,1],[36,0]].forEach(([bx,mir])=>{x.save();x.translate(bx,ey-22-br);if(mir)x.scale(-1,1);const ang=P.angry?.18:0;x.rotate(ang);const th=(C.browW||5)/5;
  x.beginPath();x.moveTo(-20,6);x.bezierCurveTo(-10,-4*th,8,-8*th,22,-2);x.bezierCurveTo(10,-3,-8,1,-20,8);x.closePath();x.fill();x.restore()});
 if(C.thirdEye){x.save();x.translate(11,-46);x.rotate(Math.PI/2);x.fillStyle='#fffaf2';x.beginPath();x.ellipse(0,0,10,4.5,0,0,6.28);x.fill();x.strokeStyle=OL;x.lineWidth=2;x.stroke();x.fillStyle='#c8321e';x.beginPath();x.arc(0,0,3,0,6.28);x.fill();x.restore()}
 // nose
 x.strokeStyle='rgba(60,20,5,.55)';x.lineWidth=2;x.beginPath();x.moveTo(16,-8);x.quadraticCurveTo(20,10,26,22);x.stroke();
 x.fillStyle='rgba(80,25,10,.2)';x.beginPath();x.moveTo(14,-6);x.quadraticCurveTo(16,14,20,26);x.lineTo(10,28);x.quadraticCurveTo(12,10,8,-4);x.fill();
 x.strokeStyle=OL;x.lineWidth=2.6;x.beginPath();x.moveTo(26,22);x.quadraticCurveTo(32,30,24,34);x.quadraticCurveTo(18,37,10,33);x.stroke();x.fillStyle='rgba(40,10,2,.55)';x.beginPath();x.ellipse(15,32,3.5,2,0,0,6.28);x.fill();
 // philtrum
 x.strokeStyle='rgba(60,20,5,.3)';x.lineWidth=1.3;x.beginPath();x.moveTo(15,38);x.lineTo(15,45);x.stroke();
 // moustache
 if(C.mous||C.beard){x.fillStyle=C.beardCol||'#140804';x.beginPath();x.moveTo(15,40);x.bezierCurveTo(4,36,-12,40,-22,54);x.bezierCurveTo(-8,48,4,48,15,47);x.bezierCurveTo(26,48,40,48,52,54);x.bezierCurveTo(44,40,26,36,15,40);x.fill()}
 // lips / mouth
 const my=C.beard?56:52,lipC=C.fem?'#b0303a':shade(sk,-60),lipL=C.fem?'#d0505a':shade(sk,-35);
 if(m<.08){x.fillStyle=lipC;x.beginPath();x.moveTo(-2,my);x.bezierCurveTo(6,my-5,11,my-3,15,my-1);x.bezierCurveTo(19,my-3,24,my-5,32,my);x.bezierCurveTo(22,my+(P.smile?4:2),8,my+(P.smile?4:2),-2,my);x.fill();
  x.fillStyle=lipL;x.beginPath();x.moveTo(1,my+1);x.bezierCurveTo(8,my+10,24,my+10,29,my+1);x.bezierCurveTo(20,my+4,10,my+4,1,my+1);x.fill();
  x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.moveTo(-3,my);x.bezierCurveTo(8,my+(P.smile?5:2),22,my+(P.smile?5:2),33,my-(P.smile?2:0));x.stroke();
  if(P.smile){x.lineWidth=1.4;x.beginPath();x.arc(-4,my-3,4,.2,1.4);x.stroke();x.beginPath();x.arc(35,my-4,4,1.6,2.9);x.stroke()}}
 else{const oh=2+m*13;x.fillStyle='#3a0808';x.beginPath();x.moveTo(-1,my);x.bezierCurveTo(6,my-4,24,my-4,31,my);x.bezierCurveTo(26,my+oh,4,my+oh,-1,my);x.fill();
  x.fillStyle='#fff8f0';x.beginPath();x.moveTo(3,my-1);x.lineTo(27,my-1);x.lineTo(26,my+2.5);x.lineTo(4,my+2.5);x.fill();
  x.fillStyle='#c04850';x.beginPath();x.ellipse(15,my+oh*.7,8,oh*.28,0,0,6.28);x.fill();
  x.strokeStyle=lipC;x.lineWidth=3;x.beginPath();x.moveTo(-1,my);x.bezierCurveTo(6,my-4,24,my-4,31,my);x.stroke();x.strokeStyle=lipL;x.lineWidth=4;x.beginPath();x.moveTo(1,my+oh*.85);x.bezierCurveTo(8,my+oh+3,22,my+oh+3,29,my+oh*.85);x.stroke();
  x.strokeStyle=OL;x.lineWidth=1.6;x.beginPath();x.moveTo(-1,my);x.bezierCurveTo(4,my+oh+2,26,my+oh+2,31,my);x.stroke()}
 // chin crease
 x.strokeStyle='rgba(60,20,5,.3)';x.lineWidth=1.4;x.beginPath();x.moveTo(6,my+18);x.quadraticCurveTo(15,my+22,24,my+18);x.stroke();
 if(C.beard){x.fillStyle=C.beardCol;x.strokeStyle=OL;x.lineWidth=2.5;const bl=C.beard==='long'?190:120;x.beginPath();x.moveTo(-44,24);x.bezierCurveTo(-46,bl*.6,-20,bl,12,bl+10);x.bezierCurveTo(44,bl,64,bl*.6,62,24);x.bezierCurveTo(52,60,36,my+14,15,my+14);x.bezierCurveTo(-6,my+14,-30,60,-44,24);x.fill();x.stroke();
  x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=2;for(let i=0;i<7;i++){x.beginPath();x.moveTo(-26+i*12,my+20);x.quadraticCurveTo(-30+i*13,bl*.7,-22+i*12,bl);x.stroke()}x.strokeStyle='rgba(255,255,255,.25)';for(let i=0;i<4;i++){x.beginPath();x.moveTo(-10+i*14,my+30);x.lineTo(-12+i*14,bl*.8);x.stroke()}}
 if(C.rakshasa){x.fillStyle='#fffaf0';x.strokeStyle=OL;x.lineWidth=1.5;[[2,1],[30,1]].forEach(([tx])=>{x.beginPath();x.moveTo(tx-4,my+2);x.lineTo(tx,my+16);x.lineTo(tx+4,my+2);x.fill();x.stroke()})}}
function proMarks(C){
 if(C.tilak==='vaishnav'){x.strokeStyle='#fbf3e2';x.lineWidth=3.5;x.beginPath();x.moveTo(4,-32);x.quadraticCurveTo(0,-50,0,-68);x.moveTo(18,-32);x.quadraticCurveTo(22,-50,22,-68);x.stroke();x.fillStyle='#d8261c';x.beginPath();x.moveTo(9,-34);x.lineTo(13,-34);x.lineTo(12,-62);x.lineTo(10,-62);x.fill()}
 else if(C.tilak==='shaiva'){x.strokeStyle='#fbf3e2';x.lineWidth=3;for(let i=0;i<3;i++){x.beginPath();x.moveTo(-16,-38-i*7);x.quadraticCurveTo(11,-42-i*7,38,-38-i*7);x.stroke()}x.fillStyle='#d8261c';x.beginPath();x.arc(11,-46,3.5,0,6.28);x.fill()}
 else if(C.tilak&&!C.thirdEye){x.fillStyle=C.tilak;x.beginPath();x.ellipse(11,-42,3.5,10,0,0,6.28);x.fill()}
 if(C.fem){x.fillStyle='#d8261c';x.beginPath();x.arc(11,-36,4,0,6.28);x.fill();x.strokeStyle=GOLD;x.lineWidth=2.5;x.beginPath();x.arc(28,30,8,-1.2,2.2);x.stroke()}
 // kundal / earring
 if(C.kundal){const g=x.createRadialGradient(-62,44,2,-62,44,22);g.addColorStop(0,'#fff6c0');g.addColorStop(.5,GOLD);g.addColorStop(1,'rgba(255,200,80,0)');x.fillStyle=g;x.beginPath();x.arc(-62,44,22,0,6.28);x.fill();x.fillStyle=GOLD2;x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.arc(-62,44,9,0,6.28);x.fill();x.stroke()}
 else{x.fillStyle=GOLD;x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.arc(-62,38,7,0,6.28);x.fill();x.stroke();x.beginPath();x.arc(-62,50,4,0,6.28);x.fill();x.stroke()}}
// muscular torso override (adds pecs/abs shading + rim light) — wrap old torso
const _oldTorso=torso;
torso=function(hip,P,C){const nk=_oldTorso(hip,P,C);if(C.top||C.kavach)return nk;const tw=C.tw;
 x.save();x.strokeStyle='rgba(60,20,5,.32)';x.lineWidth=2;
 x.beginPath();x.moveTo(nk[0]-62*tw,nk[1]+70);x.bezierCurveTo(nk[0]-40*tw,nk[1]+118,nk[0]-10,nk[1]+116,nk[0],nk[1]+100);x.bezierCurveTo(nk[0]+10,nk[1]+116,nk[0]+40*tw,nk[1]+118,nk[0]+62*tw,nk[1]+70);x.stroke();
 for(let r=0;r<2;r++){x.beginPath();x.moveTo(nk[0]-26*tw,nk[1]+150+r*40);x.quadraticCurveTo(nk[0],nk[1]+156+r*40,nk[0]+26*tw,nk[1]+150+r*40);x.stroke()}
 x.fillStyle='rgba(255,240,210,.18)';x.beginPath();x.ellipse(nk[0]+30*tw,nk[1]+82,26*tw,18,0,0,6.28);x.fill();
 x.strokeStyle='rgba(255,236,190,.5)';x.lineWidth=3;x.beginPath();x.moveTo(nk[0]+86*tw,nk[1]+40);x.quadraticCurveTo(hip[0]+58*tw,hip[1]-160*C.th,hip[0]+48*tw,hip[1]-44);x.stroke();
 x.restore();return nk};
// mark female characters
CH.maurvi.fem=1;CH.hidimba.fem=1;CH.maurvi.tilak=null;CH.hidimba.tilak=null;
