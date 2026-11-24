// ---------- Konark animation demo (no voice) ----------
const ORIG=x.setTransform.bind(x);
function cam(s,fx,fy){x.setTransform(s,0,0,s,W/2-fx*s,H/2-fy*s)}
function rot(n,cx,cy,h,ang=0,a=1,sx=1,sy=1){const I=IM[n];if(!I)return;const w=I.width*h/I.height;x.save();x.globalAlpha=a;x.translate(cx,cy);x.rotate(ang);x.scale(sx,sy);
 x.shadowColor='rgba(40,25,10,0.35)';x.shadowBlur=24;x.shadowOffsetY=14;x.drawImage(I,-w/2,-h/2,w,h);x.restore()}
function ground(y,p){if(p<=0)return;x.save();x.strokeStyle='rgba(42,36,32,0.55)';x.lineWidth=3;x.setLineDash([16,10]);x.beginPath();x.moveTo(60,y);x.lineTo(lerp(60,1020,eo(p)),y);x.stroke();x.restore()}
function dust(cx,cy,t,n=14){if(t<0||t>1)return;sd=7;for(let i=0;i<n;i++){const a=Math.PI+rnd()*Math.PI,v=80+rnd()*160,r=6+rnd()*14;const X=cx+Math.cos(a)*v*eo(t)*(i%2?1:-1),Y=cy-Math.abs(Math.sin(a))*v*0.5*eo(t);x.fillStyle=`rgba(150,120,85,${0.45*(1-t)})`;x.beginPath();x.arc(X,Y,r*(1+t),0,7);x.fill()}}
function stamp(s,X,Y,p,rotA=-0.18){if(p<=0)return;const sc=lerp(1.8,1,eo(p/0.6));x.save();x.globalAlpha=cl(p*3);x.translate(X,Y);x.rotate(rotA);x.scale(sc,sc);x.strokeStyle=RED;x.lineWidth=10;x.font='150px Rozha';const w=x.measureText(s).width+60;x.strokeRect(-w/2,-100,w,170);x.fillStyle=RED;x.textAlign='center';x.textBaseline='middle';x.fillText(s,0,-8);x.restore()}
function waves(t,Y){x.save();x.strokeStyle='rgba(31,58,133,0.55)';x.lineWidth=4;for(let k=0;k<4;k++){x.beginPath();for(let X=40;X<=1040;X+=10){const yy=Y+k*34+Math.sin(X*0.02+t*3+k)*10;X===40?x.moveTo(X,yy):x.lineTo(X,yy)}x.stroke()}x.restore()}
// scenes ---------------------------------------------------------------
function SW(t){ // wheel rolls in
 cam(lerp(1.0,1.06,cl((t-1.6)/1.4)),540,900);
 const Y=1120,h=760,R=h/2*0.92;ground(Y+h/2-8,t/0.6);
 const p=eo(cl(t/1.6)),X=lerp(-420,540,p),ang=(X-540)/R;
 const land=t-1.6,sq=land>0&&land<0.35?Math.sin(land/0.35*Math.PI)*0.06:0;
 rot('wheel',X,Y-sq*h*0.5,h,ang,1,1+sq,1-sq);dust(540,Y+h/2-10,(t-1.55)/0.9);
 headline('पहिया... या घड़ी?',540,380,(t-1.8)/0.5,100);
 pill('₹10 के नोट पर भी यही!',540,500,(t-2.3)/0.35,'#fff',RED,42)}
function ST(t){ // temple rises + sketch->real
 cam(lerp(1.0,1.05,cl(t/2.5)),540,900);
 const rise=eo(cl(t/0.6));x.save();x.translate(0,lerp(260,0,rise));img('temple',540,900,820,cl(t/0.6),cl((t-0.5)/0.9));x.restore();
 headline('कोणार्क सूर्य मंदिर',540,380,(t-0.3)/0.5,92);pill('लगभग 1250 ई.',540,1340,(t-1.2)/0.35,'#fff',BLUE,42)}
function SH(t){ // horse gallops in
 cam(1,540,900);ground(1290,1);
 const p=eo(cl(t/1.3)),X=lerp(1350,560,p),ph=t*13*(1-0.7*cl((t-1.3)/0.4));
 rot('horse',X,960-Math.abs(Math.sin(ph))*40*(1-cl((t-1.3)/0.4)),780,Math.sin(ph)*0.07);dust(X+120,1280,((t%0.35)/0.35),6);
 headline('सात घोड़े',540,380,(t-0.9)/0.5,104);
 const c=count(0,7,(t-1.0)/0.8);if(t>1.0)pill(`${c} / 7`,540,1400,(t-1.0)/0.3,'#fff',RED,46)}
function SS(t){ // ship sails in on waves
 cam(1,540,900);waves(t,1180);
 const p=eo(cl(t/1.6)),X=lerp(-450,520,p);rot('ship',X,940+Math.sin(t*3)*14,700,Math.sin(t*2.6)*0.05);
 headline('समंदर के जहाज़',540,380,(t-0.5)/0.5,96);label('कम्पास बिगड़ता था?',560,1420,-0.03,(t-1.2)/0.35,46)}
function SC(t){ // compass drops, needle spins
 cam(1,540,900);const p=cl(t/0.5),Y=lerp(-300,880,back(p));const h=760;
 rot('compass',540,Y,h,Math.sin(t*20)*0.03*(1-cl(t/0.8)));
 const I=IM.compass;if(I&&t>0.3){const w=I.width*h/I.height,fx=540,fy=Y-h/2+h*0.615,r=w*0.30;
  const spin=t<1.4?t*28+Math.sin(t*9)*2:(1.4*28)+Math.sin((t-1.4)*10)*0.6*Math.exp(-(t-1.4)*3);
  x.save();x.translate(fx,fy);x.rotate(spin);x.fillStyle=RED;x.beginPath();x.moveTo(0,-r);x.lineTo(14,0);x.lineTo(-14,0);x.closePath();x.fill();x.fillStyle='#F8F4EA';x.beginPath();x.moveTo(0,r);x.lineTo(14,0);x.lineTo(-14,0);x.closePath();x.fill();x.fillStyle=INK;x.beginPath();x.arc(0,0,10,0,7);x.fill();x.restore()}
 headline('सुई घूम गई?',540,380,(t-0.4)/0.5,104)}
function SM(t){ // magnet slams, MYTH stamp
 const shake=t>0.25&&t<0.7?Math.sin(t*90)*14*(0.7-t):0;cam(1,540+shake,900+shake*0.6);
 const p=cl(t/0.28),s=lerp(2.6,1,eo(p));rot('lodestone',540,980,620*s,0,cl(p*3));dust(540,1250,(t-0.25)/0.8,18);
 headline('52 टन चुंबक',540,380,(t-0.35)/0.45,104);pill('कहते हैं...',540,500,(t-0.5)/0.3,INK,'rgba(250,246,238,0.96)',42);
 stamp('MYTH',540,1000,(t-0.95)/0.6)}
function SB(t){ // blueprint wheel clock
 x.setTransform(1,0,0,1,0,0);x.fillStyle='#123466';x.fillRect(0,0,W,H);x.strokeStyle='rgba(120,170,230,0.18)';x.lineWidth=1;for(let i=0;i<W;i+=30){x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke()}for(let i=0;i<H;i+=30){x.beginPath();x.moveTo(0,i);x.lineTo(W,i);x.stroke()}
 cam(lerp(1.08,1.0,eo(t/0.6)),540,940);const cx=540,cy=960,h=760,S=IM.wheel_sk;
 const spinA=(1-eo(cl(t/1.2)))*-2.5;
 if(S){const w=S.width*h/S.height;x.save();x.translate(cx,cy);x.rotate(spinA);x.globalAlpha=0.8;x.filter='invert(1) brightness(1.1)';x.drawImage(S,-w/2,-h/2,w,h);x.filter='none';x.restore()}
 const R=h/2*0.86;
 for(let k=0;k<16;k++){const thick=k%2===0,q=cl((t-1.0-k*0.06)/0.25);if(q<=0)continue;const a=(k*22.5+2)*Math.PI/180+spinA;x.save();x.strokeStyle=thick?'#FFD65A':'#96D7FF';x.lineWidth=thick?6:3;x.shadowColor=x.strokeStyle;x.shadowBlur=14;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*R*q,cy+Math.sin(a)*R*q);x.stroke();x.restore()}
 x.save();x.strokeStyle='#EAF2FF';x.lineWidth=3;x.beginPath();x.arc(cx,cy,R,0,6.283*eo(cl((t-0.6)/0.6)));x.stroke();x.restore();
 // shadow hand sweeping
 if(t>1.8){const a=(-60+(t-1.8)*40)*Math.PI/180;x.save();x.strokeStyle='rgba(10,12,25,0.85)';x.lineWidth=12;x.lineCap='round';x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*R*0.95,cy+Math.sin(a)*R*0.95);x.stroke();x.restore()}
 x.fillStyle='#EAF2FF';x.beginPath();x.arc(cx,cy,14,0,7);x.fill();
 headline('पहिया = घड़ी',540,330,(t-0.2)/0.5,100,'#EAF2FF');
 pill('३ घंटे',300,1440,(t-1.6)/0.3,'#123466','#FFD65A',44);pill('डेढ़ घंटा',760,1440,(t-1.9)/0.3,'#123466','#96D7FF',44)}
const SCN=[[0,SW],[3.0,ST],[5.5,SH],[7.5,SS],[9.5,SC],[11.5,SM],[13.0,SB]],DUR=15.5;
function drawScene(fn,t,off){x.save();x.setTransform=(a,b,cc,d,e,f)=>ORIG(a,b,cc,d,e+off,f);try{fn(t)}finally{x.setTransform=ORIG}x.restore()}
window.render=function(t){x.setTransform(1,0,0,1,0,0);x.drawImage(paper,0,0);
 let i=0;for(let k=0;k<SCN.length;k++)if(t>=SCN[k][0])i=k;const tt=t-SCN[i][0],TR=0.25;
 if(i>0&&tt<TR){const q=eio(tt/TR),off=W*(1-q);drawScene(SCN[i-1][1],SCN[i][0]-SCN[i-1][0],-W*q);
  x.save();x.setTransform(1,0,0,1,0,0);x.beginPath();x.rect(off,0,W,H);x.clip();x.drawImage(paper,off,0);drawScene(SCN[i][1],tt,off);x.restore();
  x.setTransform(1,0,0,1,0,0);x.save();x.fillStyle='#F8F4EA';x.shadowColor='rgba(40,25,10,0.3)';x.shadowBlur=14;x.beginPath();x.moveTo(off-10,0);for(let y=0;y<=H;y+=40)x.lineTo(off-10+((y*7919)%23)-6,y);x.lineTo(off+8,H);x.lineTo(off+8,0);x.closePath();x.fill();x.restore()}
 else SCN[i][1](tt);
 x.setTransform(1,0,0,1,0,0);const v=x.createRadialGradient(540,960,700,540,960,1250);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(60,40,20,0.22)');x.fillStyle=v;x.fillRect(0,0,W,H);
 if(IM.logo){x.save();x.globalAlpha=0.85;x.drawImage(IM.logo,70,236,64,64);x.restore()}x.save();x.font='34px Rozha';x.fillStyle=i===6?'rgba(234,242,255,0.8)':'rgba(42,36,32,0.75)';x.textBaseline='middle';x.fillText('भूले किस्से',144,270);x.restore()};
window.ready=Promise.all([...loads,...['118px Rozha','46px TiroI','34px Tiro','700 20px Inter'].map(f=>document.fonts.load(f,'रहस्य 1'))]);
</script></body></html>
