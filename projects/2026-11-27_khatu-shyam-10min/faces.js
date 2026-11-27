// faces.js — distinct, parameterised faces per character (overrides proFace)
const FACE={
 barbarik:{cheek:1.02,jw:1.12,jl:1.0,chin:'square',eyeS:1.08,eyeT:-.05,brow:1.5,browA:.12,noseL:1,noseW:1.05,lipW:1,lipT:1.1,mous:'thin',age:0},
 krishna:{cheek:1.0,jw:.88,jl:.96,chin:'round',eyeS:1.22,eyeT:.1,brow:.8,browA:-.08,arch:1.3,noseL:.9,noseW:.9,lipW:.95,lipT:1.2,smile:1,lid:.12,age:0},
 brahmin:{cheek:.92,jw:.86,jl:1.04,chin:'pointed',eyeS:1.12,eyeT:.08,brow:.9,browA:-.05,arch:1.2,noseL:1.05,noseW:.9,lipW:.9,lipT:.9,smile:1,age:.25,hollow:1},
 bhima:{cheek:1.14,jw:1.3,jl:1.06,chin:'square',eyeS:.86,eyeT:-.1,brow:2.0,browA:.22,noseL:1.05,noseW:1.35,lipW:1.15,lipT:1.2,mous:'thick',age:.15},
 ghatotkacha:{cheek:1.2,jw:1.35,jl:1.1,chin:'square',eyeS:1.18,eyeT:-.18,brow:2.4,browA:.3,noseL:.95,noseW:1.55,lipW:1.25,lipT:1.4,mous:'thick',age:.1},
 maurvi:{cheek:.96,jw:.82,jl:.94,chin:'round',eyeS:1.12,eyeT:.12,brow:.7,browA:-.04,arch:1.5,noseL:.88,noseW:.82,lipW:.9,lipT:1.45,lash:1,age:.12},
 hidimba:{cheek:1.04,jw:.9,jl:.95,chin:'pointed',eyeS:1.0,eyeT:.22,brow:1.0,browA:.06,arch:1.1,noseL:.92,noseW:1.0,lipW:1.0,lipT:1.4,lash:1,age:0},
 shiva:{cheek:1.02,jw:1.0,jl:1.05,chin:'round',eyeS:1.05,eyeT:.02,brow:1.0,browA:0,arch:.9,noseL:1.05,noseW:1.0,lipW:1,lipT:1.1,lid:.48,smile:.5,age:0},
 agni:{cheek:1.1,jw:1.1,jl:1.0,chin:'square',eyeS:1.15,eyeT:-.12,brow:1.6,browA:.2,noseL:1,noseW:1.15,lipW:1.05,lipT:1.1,age:.2},
 bhishma:{cheek:1.0,jw:1.0,jl:1.08,chin:'square',eyeS:.92,eyeT:-.02,brow:2.2,browA:.04,arch:.7,noseL:1.18,noseW:1.05,lipW:.95,lipT:.8,age:1,hollow:1},
 drona:{cheek:.94,jw:.94,jl:1.1,chin:'pointed',eyeS:.9,eyeT:-.08,brow:1.8,browA:.24,noseL:1.22,noseW:.95,hook:1,lipW:.9,lipT:.7,age:.85,hollow:1},
 karna:{cheek:1.08,jw:1.02,jl:1.02,chin:'square',eyeS:1.02,eyeT:-.1,eyeDown:1,brow:1.2,browA:-.06,noseL:1.1,noseW:.95,lipW:1,lipT:1,age:.05},
 arjuna:{cheek:.98,jw:.94,jl:1.0,chin:'round',eyeS:1.0,eyeT:.02,brow:1.1,browA:.08,noseL:1.08,noseW:.88,lipW:.95,lipT:1,mous:'none',age:0},
 shyam:{cheek:1.06,jw:.9,jl:.95,chin:'round',eyeS:1.45,eyeT:.0,brow:1.1,browA:0,arch:1.2,noseL:.9,noseW:.95,lipW:1,lipT:1.3,smile:.7,bigEye:1,age:0},
 king:{cheek:1.08,jw:1.1,jl:1.0,chin:'round',eyeS:.95,eyeT:0,brow:1.4,browA:.05,noseL:1.05,noseW:1.15,lipW:1,lipT:1,mous:'curl',age:.4},
 villager:{cheek:.94,jw:.92,jl:1.02,chin:'pointed',eyeS:.95,eyeT:.05,brow:1.1,browA:-.05,noseL:1.05,noseW:1.1,lipW:.95,lipT:.9,mous:'thick',age:.7,hollow:1,smile:.6},
};
Object.keys(FACE).forEach(k=>{if(CH[k])CH[k].face=FACE[k]});
function proEye2(ex,ey,op,look,C,mir,F){x.save();x.translate(ex,ey);if(mir)x.scale(-1,1);const s=F.eyeS||1;x.rotate(-(F.eyeT||0));x.scale(s,s);
 const big=F.bigEye?1.35:1;const lidTop=(k)=>{x.moveTo(-18,2);x.bezierCurveTo(-10,-11*k*big,8,-12*k*big,20,-2-(F.eyeDown?-2:0))};
 const lowerC=(k)=>{x.bezierCurveTo(10,(F.bigEye?11:7)*k,-8,(F.bigEye?12:8)*k,-18,2)};
 const o=op*(1-(F.lid||0));
 x.fillStyle='#fffaf2';x.beginPath();lidTop(Math.max(o,.05));lowerC(Math.max(op,.05));x.fill();
 if(o>.12){x.save();x.beginPath();lidTop(o);lowerC(op);x.clip();const lx=(mir?-1:1)*look[0]*5+2,ly=look[1]*3+(F.lid?2:0),ir=F.bigEye?10.5:8.5;
  const ig=x.createRadialGradient(lx,ly,1,lx,ly,ir);ig.addColorStop(0,shade(C.iris||'#4a2a12',50));ig.addColorStop(1,C.iris||'#3a1a08');x.fillStyle=ig;x.beginPath();x.arc(lx,ly,ir,0,6.28);x.fill();
  x.fillStyle='#0a0402';x.beginPath();x.arc(lx,ly,ir*.45,0,6.28);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(lx+2.5,ly-3,2.4,0,6.28);x.fill();x.beginPath();x.arc(lx-2.5,ly+2.5,1.1,0,6.28);x.fill();
  x.fillStyle='rgba(60,20,5,.25)';x.beginPath();lidTop(o);x.lineTo(20,3);x.lineTo(-18,7);x.fill();x.restore()}
 x.strokeStyle='#120602';x.lineWidth=3.8;x.lineCap='round';x.beginPath();lidTop(Math.max(o,.05));if(!F.eyeDown)x.quadraticCurveTo(25,-5,30,-9);else x.quadraticCurveTo(24,0,28,2);x.stroke();
 if(F.lid){x.strokeStyle='rgba(30,10,2,.6)';x.lineWidth=1.5;x.beginPath();x.moveTo(-17,-1);x.bezierCurveTo(-8,-12,10,-12,19,-4);x.stroke()}
 x.lineWidth=1.6;x.strokeStyle='rgba(30,10,2,.7)';x.beginPath();x.moveTo(-14,3);lowerC(op);x.stroke();
 x.strokeStyle='rgba(60,20,5,.4)';x.lineWidth=1.4;x.beginPath();x.moveTo(-14,-8*op-2-(F.bigEye?4:0));x.bezierCurveTo(-4,-15-(F.bigEye?4:0),10,-15-(F.bigEye?4:0),18,-8);x.stroke();
 if(F.lash){x.strokeStyle='#120602';x.lineWidth=1.8;for(let i=0;i<5;i++){const u=.35+i*.14,px=-18+38*u,py=-11*o*Math.sin(u*Math.PI)+1;x.beginPath();x.moveTo(px,py);x.lineTo(px+5,py-7);x.stroke()}}
 if((F.age||0)>.3){x.strokeStyle='rgba(60,20,5,.4)';x.lineWidth=1.3;for(let i=0;i<3;i++){x.beginPath();x.moveTo(24,-2+i*5);x.lineTo(32,-6+i*7);x.stroke()}x.beginPath();x.moveTo(-12,10);x.quadraticCurveTo(2,16,16,10);x.stroke()}
 x.lineCap='butt';x.restore()}
proFace=function(P,C){const F=C.face||{},sk=C.skin,m=Math.max(0,Math.min(1,P.mouth||0)),op=1-(P.blink||0),look=P.look||[1,0];
 const W=60*(F.cheek||1),Jw=42*(F.jw||1),cy=86*(F.jl||1),cx=8;
 const chin=F.chin||'round';
 const facePath=()=>{x.beginPath();x.moveTo(cx-W+2,-36);x.bezierCurveTo(cx-W-4,-4,cx-W+2,22,cx-Jw,cy*.62);
  if(chin==='square'){x.lineTo(cx-Jw*.75,cy*.88);x.quadraticCurveTo(cx-Jw*.4,cy+2,cx,cy+2);x.quadraticCurveTo(cx+Jw*.4,cy+2,cx+Jw*.75,cy*.88);x.lineTo(cx+Jw,cy*.62)}
  else if(chin==='pointed'){x.bezierCurveTo(cx-Jw*.7,cy*.85,cx-10,cy+2,cx,cy+6);x.bezierCurveTo(cx+10,cy+2,cx+Jw*.7,cy*.85,cx+Jw,cy*.62)}
  else{x.bezierCurveTo(cx-Jw*.8,cy*.92,cx-Jw*.4,cy+4,cx,cy+4);x.bezierCurveTo(cx+Jw*.4,cy+4,cx+Jw*.8,cy*.92,cx+Jw,cy*.62)}
  x.bezierCurveTo(cx+W-2,22,cx+W+6,-4,cx+W+2,-36);x.bezierCurveTo(cx+W-4,-80,cx+24,-90,cx,-90);x.bezierCurveTo(cx-26,-90,cx-W+4,-80,cx-W+2,-36);x.closePath()};
 facePath();const fg=x.createLinearGradient(cx-W,0,cx+W,0);fg.addColorStop(0,shade(sk,-20));fg.addColorStop(.45,sk);fg.addColorStop(1,shade(sk,14));x.fillStyle=fg;x.fill();
 x.save();facePath();x.clip();
 x.fillStyle=shade(sk,-20);x.beginPath();x.moveTo(cx-W-10,-92);x.lineTo(cx-W+16,-92);x.bezierCurveTo(cx-W+6,-30,cx-W+12,30,cx-Jw+20,cy+10);x.lineTo(cx-W-10,cy+10);x.fill();
 if(F.hollow){x.fillStyle='rgba(70,22,8,.2)';x.beginPath();x.ellipse(cx+W-18,30,12,22,-.2,0,6.28);x.fill();x.beginPath();x.ellipse(cx-W+20,30,10,20,.2,0,6.28);x.fill()}
 if(chin==='square'){x.fillStyle='rgba(70,22,8,.14)';x.beginPath();x.moveTo(cx-Jw,cy*.62);x.lineTo(cx-Jw*.75,cy*.88);x.lineTo(cx-Jw*.6,cy*.6);x.fill();x.beginPath();x.moveTo(cx+Jw,cy*.62);x.lineTo(cx+Jw*.75,cy*.88);x.lineTo(cx+Jw*.6,cy*.6);x.fill()}
 x.fillStyle='rgba(255,240,210,.33)';x.beginPath();x.ellipse(cx+22,-48,18,11,-.3,0,6.28);x.fill();x.beginPath();x.ellipse(cx+16,12,5,14,0,0,6.28);x.fill();x.beginPath();x.ellipse(cx+W-22,8,12,8,0,0,6.28);x.fill();
 x.fillStyle=C.fem?'rgba(235,80,85,.3)':'rgba(220,80,60,.14)';x.beginPath();x.ellipse(cx+36,26,14,9,0,0,6.28);x.fill();x.beginPath();x.ellipse(cx-30,26,10,7,0,0,6.28);x.fill();
 // age lines
 const ag=F.age||0;if(ag>.2){x.strokeStyle=`rgba(70,22,8,${.25+ag*.25})`;x.lineWidth=1.6;for(let i=0;i<Math.round(1+ag*2);i++){x.beginPath();x.moveTo(cx-30,-58-i*8);x.quadraticCurveTo(cx+4,-63-i*8,cx+40,-58-i*8);x.stroke()}
  x.beginPath();x.moveTo(cx+26,26);x.quadraticCurveTo(cx+34,48,cx+30,62);x.stroke();x.beginPath();x.moveTo(cx-14,28);x.quadraticCurveTo(cx-20,48,cx-16,60);x.stroke()}
 if((F.browA||0)>.15){x.strokeStyle='rgba(70,22,8,.35)';x.lineWidth=1.6;x.beginPath();x.moveTo(cx-2,-32);x.lineTo(cx+2,-44);x.moveTo(cx+10,-32);x.lineTo(cx+12,-44);x.stroke()}
 x.restore();facePath();x.strokeStyle=OL;x.lineWidth=3.2;x.stroke();
 // ear
 x.fillStyle=shade(sk,-14);x.strokeStyle=OL;x.lineWidth=3;x.beginPath();x.moveTo(cx-W+4,-8);x.bezierCurveTo(cx-W-16,-12,cx-W-18,28,cx-W+2,30);x.closePath();x.fill();x.stroke();x.strokeStyle='rgba(60,20,5,.5)';x.lineWidth=1.5;x.beginPath();x.arc(cx-W-4,10,7,-1.8,1.6);x.stroke();
 // eyes
 const ey=-10,gap=(F.eyeGap||1);proEye2(cx-22*gap,ey,op,look,C,1,F);proEye2(cx+28*gap,ey-1,op,look,C,0,F);
 // brows
 const br=(P.brow||0),bt=(F.brow||1),ba=(F.browA||0)+(P.angry?.15:0),arch=F.arch||1;x.fillStyle=C.browCol||'#140804';
 [[cx-22*gap,1],[cx+28*gap,0]].forEach(([bx,mir])=>{x.save();x.translate(bx,ey-22*(F.eyeS||1)-br-(F.bigEye?6:0));if(mir)x.scale(-1,1);x.rotate(ba);x.beginPath();x.moveTo(-20,6);x.bezierCurveTo(-10,-4*bt*arch,8,-6*bt*arch-2,22,-2);x.bezierCurveTo(10,-2+2.5*bt,-8,2+2.5*bt,-20,6+bt*2);x.closePath();x.fill();x.restore()});
 if(C.thirdEye){x.save();x.translate(cx+3,-50);x.rotate(Math.PI/2);x.fillStyle='#fffaf2';x.beginPath();x.ellipse(0,0,10,4.5,0,0,6.28);x.fill();x.strokeStyle=OL;x.lineWidth=2;x.stroke();x.fillStyle='#c8321e';x.beginPath();x.arc(0,0,3,0,6.28);x.fill();x.restore()}
 // nose
 const nl=F.noseL||1,nw=F.noseW||1,nx=cx+8,ny0=-8,ny1=ny0+38*nl;
 x.fillStyle='rgba(80,25,10,.2)';x.beginPath();x.moveTo(nx-2,ny0);x.quadraticCurveTo(nx,ny1-12,nx+4,ny1-4);x.lineTo(nx-8*nw,ny1-2);x.quadraticCurveTo(nx-6,ny0+16,nx-8,ny0+4);x.fill();
 x.strokeStyle='rgba(60,20,5,.55)';x.lineWidth=2;x.beginPath();x.moveTo(nx+2,ny0);if(F.hook)x.bezierCurveTo(nx+14,ny0+8,nx+16,ny1-14,nx+12*nw,ny1-6);else x.quadraticCurveTo(nx+6,ny1-18,nx+12*nw,ny1-8);x.stroke();
 x.strokeStyle=OL;x.lineWidth=2.6;x.beginPath();x.moveTo(nx+12*nw,ny1-8);x.quadraticCurveTo(nx+18*nw,ny1,nx+10*nw,ny1+4);x.quadraticCurveTo(nx+2,ny1+7,nx-8*nw,ny1+2);x.stroke();
 x.fillStyle='rgba(40,10,2,.55)';x.beginPath();x.ellipse(nx-1,ny1+2,3.5*nw,2,0,0,6.28);x.fill();
 // mouth
 const my=ny1+20,lw=(F.lipW||1),lt=(F.lipT||1),mx=cx+8,hw=16*lw,smile=Math.max(F.smile||0,P.smile?1:0);
 x.strokeStyle='rgba(60,20,5,.3)';x.lineWidth=1.3;x.beginPath();x.moveTo(mx,ny1+6);x.lineTo(mx,my-4);x.stroke();
 const mo=F.mous||(C.mous?'thick':(C.beard?'thick':'none'));
 const lipC=C.fem?'#a82a34':shade(sk,-58),lipL=C.fem?'#d04a56':shade(sk,-32);
 if(m<.08){x.fillStyle=lipC;x.beginPath();x.moveTo(mx-hw,my);x.bezierCurveTo(mx-hw*.5,my-5*lt,mx-3,my-3*lt,mx,my-1);x.bezierCurveTo(mx+3,my-3*lt,mx+hw*.5,my-5*lt,mx+hw,my-smile*2);x.bezierCurveTo(mx+hw*.5,my+2+smile*2,mx-hw*.5,my+2+smile*2,mx-hw,my);x.fill();
  x.fillStyle=lipL;x.beginPath();x.moveTo(mx-hw+3,my+1);x.bezierCurveTo(mx-hw*.5,my+9*lt,mx+hw*.5,my+9*lt,mx+hw-3,my+1-smile);x.bezierCurveTo(mx+hw*.4,my+4,mx-hw*.4,my+4,mx-hw+3,my+1);x.fill();
  x.strokeStyle=OL;x.lineWidth=2;x.beginPath();x.moveTo(mx-hw-1,my-smile*1.5);x.bezierCurveTo(mx-hw*.4,my+2+smile*4,mx+hw*.4,my+2+smile*4,mx+hw+1,my-smile*3);x.stroke();
  if(smile>.4){x.lineWidth=1.4;x.beginPath();x.arc(mx-hw-3,my-3,4,.2,1.4);x.stroke();x.beginPath();x.arc(mx+hw+3,my-5,4,1.6,2.9);x.stroke()}}
 else{const oh=2+m*13;x.fillStyle='#3a0808';x.beginPath();x.moveTo(mx-hw,my);x.bezierCurveTo(mx-hw*.5,my-4,mx+hw*.5,my-4,mx+hw,my);x.bezierCurveTo(mx+hw*.6,my+oh,mx-hw*.6,my+oh,mx-hw,my);x.fill();
  x.fillStyle='#fff8f0';x.fillRect(mx-hw*.75,my-1,hw*1.5,3.5);x.fillStyle='#c04850';x.beginPath();x.ellipse(mx,my+oh*.7,hw*.5,oh*.28,0,0,6.28);x.fill();
  x.strokeStyle=lipC;x.lineWidth=3*lt;x.beginPath();x.moveTo(mx-hw,my);x.bezierCurveTo(mx-hw*.5,my-4,mx+hw*.5,my-4,mx+hw,my);x.stroke();x.strokeStyle=lipL;x.lineWidth=4*lt;x.beginPath();x.moveTo(mx-hw+2,my+oh*.85);x.bezierCurveTo(mx-hw*.4,my+oh+3,mx+hw*.4,my+oh+3,mx+hw-2,my+oh*.85);x.stroke()}
 // moustache styles
 const bc=C.beardCol||'#140804';x.fillStyle=bc;
 if(mo==='thin'){x.beginPath();x.moveTo(mx,my-7);x.bezierCurveTo(mx-8,my-10,mx-hw,my-8,mx-hw-6,my-2);x.bezierCurveTo(mx-hw+2,my-6,mx-6,my-5,mx,my-4);x.bezierCurveTo(mx+6,my-5,mx+hw-2,my-6,mx+hw+6,my-2);x.bezierCurveTo(mx+hw,my-8,mx+8,my-10,mx,my-7);x.fill()}
 else if(mo==='thick'){x.beginPath();x.moveTo(mx,my-9);x.bezierCurveTo(mx-12,my-14,mx-hw-6,my-10,mx-hw-12,my+4);x.bezierCurveTo(mx-hw,my-3,mx-8,my-3,mx,my-4);x.bezierCurveTo(mx+8,my-3,mx+hw,my-3,mx+hw+12,my+4);x.bezierCurveTo(mx+hw+6,my-10,mx+12,my-14,mx,my-9);x.fill()}
 else if(mo==='curl'){x.beginPath();x.moveTo(mx,my-9);x.bezierCurveTo(mx-14,my-14,mx-hw-10,my-8,mx-hw-16,my-14);x.bezierCurveTo(mx-hw-22,my-20,mx-hw-24,my-8,mx-hw-14,my-4);x.bezierCurveTo(mx-hw,my-2,mx-8,my-3,mx,my-4);x.bezierCurveTo(mx+8,my-3,mx+hw,my-2,mx+hw+14,my-4);x.bezierCurveTo(mx+hw+24,my-8,mx+hw+22,my-20,mx+hw+16,my-14);x.bezierCurveTo(mx+hw+10,my-8,mx+14,my-14,mx,my-9);x.fill()}
 // chin crease
 x.strokeStyle='rgba(60,20,5,.3)';x.lineWidth=1.4;x.beginPath();x.moveTo(mx-8,my+18);x.quadraticCurveTo(mx,my+22,mx+8,my+18);x.stroke();
 if(C.beard){x.fillStyle=bc;x.strokeStyle=OL;x.lineWidth=2.5;const bl=C.beard==='long'?cy+110:cy+40;x.beginPath();x.moveTo(cx-W+12,20);x.bezierCurveTo(cx-W+8,bl*.6,cx-24,bl,cx+4,bl+10);x.bezierCurveTo(cx+36,bl,cx+W-2,bl*.6,cx+W-4,20);x.bezierCurveTo(cx+W-14,56,mx+18,my+12,mx,my+12);x.bezierCurveTo(mx-18,my+12,cx-W+22,56,cx-W+12,20);x.fill();x.stroke();
  x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=2;for(let i=0;i<7;i++){x.beginPath();x.moveTo(cx-34+i*12,my+20);x.quadraticCurveTo(cx-38+i*13,bl*.7,cx-30+i*12,bl);x.stroke()}x.strokeStyle='rgba(255,255,255,.25)';for(let i=0;i<4;i++){x.beginPath();x.moveTo(cx-18+i*14,my+30);x.lineTo(cx-20+i*14,bl*.8);x.stroke()}}
 if(C.rakshasa){x.fillStyle='#fffaf0';x.strokeStyle=OL;x.lineWidth=1.5;[mx-hw+4,mx+hw-4].forEach(tx=>{x.beginPath();x.moveTo(tx-4,my+1);x.lineTo(tx,my+15);x.lineTo(tx+4,my+1);x.fill();x.stroke()})}
};

CH.barbarik.crownStyle='war';CH.bhima.crownStyle='band';CH.karna.crownStyle='sun';CH.arjuna.crownStyle='tall';CH.bhishma.crownStyle='silver';
