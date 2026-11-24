// ---------- Konark: wheel = clock (final, synced to voice) ----------
const ORIG=x.setTransform.bind(x);let TM=null;loads.push(fetch('timing.json').then(r=>r.json()).then(j=>TM=j));
function cam(s,fx,fy){x.setTransform(s,0,0,s,W/2-fx*s,H/2-fy*s)}
function rot(n,cx,cy,h,ang=0,a=1,sx=1,sy=1){const I=IM[n];if(!I)return;const w=I.width*h/I.height;x.save();x.globalAlpha=a;x.translate(cx,cy);x.rotate(ang);x.scale(sx,sy);
 x.shadowColor='rgba(40,25,10,0.35)';x.shadowBlur=24;x.shadowOffsetY=14;x.drawImage(I,-w/2,-h/2,w,h);x.restore()}
function ground(y,p){if(p<=0)return;x.save();x.strokeStyle='rgba(42,36,32,0.55)';x.lineWidth=3;x.setLineDash([16,10]);x.beginPath();x.moveTo(60,y);x.lineTo(lerp(60,1020,eo(p)),y);x.stroke();x.restore()}
function dust(cx,cy,t,n=14){if(t<0||t>1)return;sd=7;for(let i=0;i<n;i++){const a=Math.PI+rnd()*Math.PI,v=80+rnd()*160,r=6+rnd()*14;const X=cx+Math.cos(a)*v*eo(t)*(i%2?1:-1),Y=cy-Math.abs(Math.sin(a))*v*0.5*eo(t);x.fillStyle=`rgba(150,120,85,${0.45*(1-t)})`;x.beginPath();x.arc(X,Y,r*(1+t),0,7);x.fill()}}
function stamp(s,X,Y,p,rotA=-0.18){if(p<=0)return;const sc=lerp(1.8,1,eo(p/0.6));x.save();x.globalAlpha=cl(p*3);x.translate(X,Y);x.rotate(rotA);x.scale(sc,sc);x.strokeStyle=RED;x.lineWidth=10;x.font='130px Rozha';const w=x.measureText(s).width+60;x.strokeRect(-w/2,-95,w,160);x.fillStyle=RED;x.textAlign='center';x.textBaseline='middle';x.fillText(s,0,-8);x.restore()}
function waves(t,Y){x.save();x.strokeStyle='rgba(31,58,133,0.55)';x.lineWidth=4;for(let k=0;k<4;k++){x.beginPath();for(let X=40;X<=1040;X+=10){const yy=Y+k*34+Math.sin(X*0.02+t*3+k)*10;X===40?x.moveTo(X,yy):x.lineTo(X,yy)}x.stroke()}x.restore()}
function bpBG(){x.save();x.setTransform(1,0,0,1,0,0);x.fillStyle='#123466';x.fillRect(0,0,W,H);x.lineWidth=1;for(let i=0;i<W;i+=30){x.strokeStyle=i%150?'rgba(120,170,230,0.16)':'rgba(140,190,245,0.32)';x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke()}for(let i=0;i<H;i+=30){x.strokeStyle=i%150?'rgba(120,170,230,0.16)':'rgba(140,190,245,0.32)';x.beginPath();x.moveTo(0,i);x.lineTo(W,i);x.stroke()}x.restore()}
const BPW='#EAF2FF',GOLD='#FFD65A',SKY='#96D7FF';
// blueprint wheel: sketch inverted to white lines; spokes measured from the image (thick at 2°+45k)
function bpWheel(cx,cy,h,ang,o){const S=IM.wheel_sk;if(!S)return 0;const w=S.width*h/S.height;x.save();x.translate(cx,cy);x.rotate(ang);x.globalAlpha=o;x.filter='invert(1) brightness(1.15)';x.drawImage(S,-w/2,-h/2,w,h);x.filter='none';x.restore();return h*0.458}
function spoke(cx,cy,R,k,ang,q,glow=1){const thick=k%2===0,a=(k*22.5+2)*Math.PI/180+ang;x.save();x.strokeStyle=thick?GOLD:SKY;x.lineWidth=thick?7:3.5;x.shadowColor=x.strokeStyle;x.shadowBlur=16*glow;x.lineCap='round';x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*R*0.9*q,cy+Math.sin(a)*R*0.9*q);x.stroke();x.restore()}
function note10(cx,cy,s,ang,p,col='#8B5A3C',v1='₹10',v2='१०'){if(p<=0)return;x.save();x.translate(cx,cy);x.rotate(ang);x.scale(s,s);x.globalAlpha=cl(p*2);
 x.shadowColor='rgba(40,25,10,0.35)';x.shadowBlur=26;x.shadowOffsetY=14;x.fillStyle=col;x.beginPath();x.roundRect(-380,-195,760,390,22);x.fill();x.shadowColor='transparent';
 const g=x.createLinearGradient(-380,0,380,0);g.addColorStop(0,'rgba(255,220,180,0.18)');g.addColorStop(0.5,'rgba(255,255,255,0.0)');g.addColorStop(1,'rgba(60,30,10,0.25)');x.fillStyle=g;x.beginPath();x.roundRect(-380,-195,760,390,22);x.fill();
 x.strokeStyle='rgba(255,230,200,0.45)';x.lineWidth=3;x.strokeRect(-350,-165,700,330);
 for(let i=0;i<14;i++){x.strokeStyle=`rgba(255,225,190,${0.08+0.02*(i%3)})`;x.beginPath();x.arc(-380,-195,60+i*28,0,1.6);x.stroke()}
 x.fillStyle='#FCE9D2';x.font='700 96px Inter';x.textAlign='left';x.textBaseline='middle';x.fillText(v1,-330,-95);x.font='70px Rozha';x.textAlign='right';x.fillText(v2,335,120);
 x.restore()}
function commentBox(cx,cy,p,txt){if(p<=0)return;const s=back(p);x.save();x.translate(cx,cy);x.scale(s,s);x.shadowColor='rgba(40,25,10,0.28)';x.shadowBlur=18;x.shadowOffsetY=8;x.fillStyle='#FBF8F1';x.beginPath();x.roundRect(-380,-110,760,220,28);x.fill();x.shadowColor='transparent';
 x.fillStyle=BLUE;x.beginPath();x.arc(-290,-20,48,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(-290,-36,17,0,7);x.fill();x.beginPath();x.arc(-290,10,28,Math.PI,0);x.fill();
 x.fillStyle='rgba(42,36,32,0.25)';x.fillRect(-215,-55,260,18);x.fillStyle=INK;x.font='46px Tiro';x.textAlign='left';x.textBaseline='middle';x.fillText(txt,-215,10);x.fillStyle='rgba(42,36,32,0.45)';x.font='30px Tiro';x.fillText('कमेंट',-215,72);x.restore()}
function subscribeBtn(X,Y,p,t){if(p<=0)return;x.save();x.translate(X,Y);const s=back(p)*(1+0.04*Math.sin(t*8));x.scale(s,s);x.shadowColor='rgba(120,20,20,0.35)';x.shadowBlur=20;x.shadowOffsetY=8;x.fillStyle='#D92B2B';x.beginPath();x.roundRect(-230,-58,460,116,58);x.fill();x.shadowColor='transparent';x.fillStyle='#fff';x.font='700 52px Inter';x.textAlign='center';x.textBaseline='middle';x.fillText('SUBSCRIBE',0,4);x.restore()}
