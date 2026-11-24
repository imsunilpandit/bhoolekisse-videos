// ---------- motion layer: makes every image "alive" (overrides img/rot/cam) ----------
let T=0,DARKBG=false;
const _hash=s=>{let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))%9973;return h/9973*6.283};
const _off=document.createElement('canvas');_off.width=1700;_off.height=1700;const _ox=_off.getContext('2d');
// handheld camera: tiny continuous drift + breathing zoom on every scene
function cam(s,fx,fy){const k=1+0.022*Math.sin(T*0.55);x.setTransform(s*k,0,0,s*k,W/2-(fx+14*Math.sin(T*0.7))*s*k,H/2-(fy+11*Math.sin(T*0.93+1))*s*k)}
// light sweep across the object, clipped to its own alpha
function _shine(I,w,h,ph,strength=0.42){if(ph<=0||ph>=1)return;const sc=Math.min(1,1700/Math.max(w,h)),ww=w*sc,hh=h*sc;
 _ox.setTransform(1,0,0,1,0,0);_ox.globalCompositeOperation='source-over';_ox.clearRect(0,0,ww+2,hh+2);_ox.drawImage(I,0,0,ww,hh);_ox.globalCompositeOperation='source-atop';
 const bx=lerp(-0.5*ww,1.5*ww,ph),g=_ox.createLinearGradient(bx-ww*0.18,0,bx+ww*0.18,hh*0.35);g.addColorStop(0,'rgba(255,236,190,0)');g.addColorStop(0.5,`rgba(255,246,220,${strength})`);g.addColorStop(1,'rgba(255,236,190,0)');
 _ox.fillStyle=g;_ox.fillRect(0,0,ww,hh);_ox.globalCompositeOperation='source-over';x.drawImage(_off,0,0,ww,hh,-w/2,-h/2,w,h)}
// 2.5D parallax for full photos: background drifts slowly, a soft-masked foreground band moves more
function _parallax(I,w,h,k,a){const z=1.06+0.05*Math.sin(T*0.45+k),dx=16*Math.sin(T*0.5+k);
 x.save();x.beginPath();x.rect(-w/2,-h/2,w,h);x.clip();x.drawImage(I,-w/2*z+dx*0.4,-h/2*z,w*z,h*z);
 const sc=Math.min(1,1700/Math.max(w,h)),ww=w*sc,hh=h*sc,z2=z*1.07,dx2=dx*2.6+16*Math.sin(T*0.62+k);
 _ox.setTransform(1,0,0,1,0,0);_ox.globalCompositeOperation='source-over';_ox.clearRect(0,0,ww+2,hh+2);
 _ox.drawImage(I,(ww-ww*z2)/2+dx2*sc,(hh-hh*z2)/2+hh*0.02,ww*z2,hh*z2);
 _ox.globalCompositeOperation='destination-in';const g=_ox.createLinearGradient(0,hh*0.45,0,hh*0.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,1)');_ox.fillStyle=g;_ox.fillRect(0,0,ww,hh);_ox.globalCompositeOperation='source-over';
 x.drawImage(_off,0,0,ww,hh,-w/2,-h/2,w,h);x.restore()}
// image placed by centre+height: entry pop + settle, idle breathing/sway/tilt, sketch->real wipe, periodic shine
function img(n,cx,cy,h,sp,rp,a=1){const I=IM[n],S=IM[n+'_sk']||IM[n.split('_')[0]+'_sk'];if(!I)return null;const w=I.width*h/I.height,k=_hash(n.split('_')[0]);
 const isBG=n==='bg'||n.startsWith('bg');const ent=cl(sp);
 const s=(ent<1?lerp(0.86,1,back(ent)):1)*(1+0.018*Math.sin(T*1.1+k));
 const r=(1-eo(ent))*0.07*(k>3?1:-1)+(isBG?0.004:0.013)*Math.sin(T*0.8+k);
 const bob=(isBG?6:14)*Math.sin(T*1.25+k),sh=(isBG?0:0.035)*Math.sin(T*0.7+k);
 x.save();x.globalAlpha=a*cl(ent*3);x.translate(cx,cy+bob);x.rotate(r);x.transform(1,0,sh,1,0,0);x.scale(s*(isBG?1:1+0.06*Math.sin(T*0.6+k)),s);
 const X=-w/2,Y=-h/2;
 if(rp<1&&S&&sp>0){x.save();x.beginPath();x.rect(X-10,Y-10,w+20,(h+20)*eo(sp));x.clip();x.globalAlpha=a*0.9;if(DARKBG)x.filter='invert(1) brightness(1.25)';x.drawImage(S,X,Y,w,h);x.filter='none';x.restore()}
 if(rp>0){const yy=lerp(Y+h+10,Y-10,eio(rp));x.save();x.beginPath();x.rect(X-40,yy,w+80,Y+h+60-yy);x.clip();
  x.save();x.shadowColor='rgba(40,25,10,0.38)';x.shadowBlur=30;x.shadowOffsetY=16+6*Math.sin(T*1.25+k);x.shadowOffsetX=-10*Math.sin(T*0.8+k);
  if(isBG){x.fillStyle='#FBF8F1';x.fillRect(X,Y,w,h);x.restore();_parallax(I,w,h,k,a)}else{x.drawImage(I,X,Y,w,h);x.restore()}
  if(rp>=1&&!isBG)_shine(I,w,h,((T*0.5+k)%1.6),0.55);
  x.restore();
  if(rp<1){x.save();x.strokeStyle='rgba(255,250,235,0.95)';x.lineWidth=4;x.shadowColor='rgba(255,210,120,1)';x.shadowBlur=24;x.beginPath();x.moveTo(X-30,yy);x.lineTo(X+w+30,yy);x.stroke();
   for(let i=0;i<10;i++){const px=X+((i*137+Math.floor(T*30)*29)%Math.max(1,w)),py=yy+((i*53)%30)-15;x.fillStyle='rgba(255,230,160,0.9)';x.beginPath();x.arc(px,py,2.5+(i%3),0,7);x.fill()}x.restore()}}
 x.restore();return {X:cx-w/2,Y:cy-h/2,w,h}}
// moving objects: keep their motion, add gentle breathing + shine
function rot(n,cx,cy,h,ang=0,a=1,sx=1,sy=1){const I=IM[n];if(!I)return;const w=I.width*h/I.height,k=_hash(n),b=1+0.015*Math.sin(T*1.3+k);
 x.save();x.globalAlpha=a;x.translate(cx,cy+6*Math.sin(T*1.4+k));x.rotate(ang+0.01*Math.sin(T*0.9+k));x.scale(sx*b,sy*b);
 x.save();x.shadowColor='rgba(40,25,10,0.36)';x.shadowBlur=26;x.shadowOffsetY=16;x.drawImage(I,-w/2,-h/2,w,h);x.restore();
 _shine(I,w,h,((T*0.33+k+0.8)%1.7),0.36);x.restore()}
// global atmosphere: floating dust/bokeh + moving warm light leak + subtle flicker
function fxOverlay(t,bp){x.save();x.setTransform(1,0,0,1,0,0);
 for(let i=0;i<46;i++){const sp=0.15+((i*37)%10)/40,X=((i*233)%1080)+Math.sin(t*0.6+i)*30,Y=(1920-((t*60*sp+i*97)%2100))+60,r=1.5+((i*7)%5)*(i%9===0?3:0.7);
  x.globalAlpha=(i%9===0?0.16:0.5)*(0.6+0.4*Math.sin(t*2+i));x.fillStyle=bp?'#DDEBFF':'#FFE7B0';x.beginPath();x.arc(X,Y,r,0,7);x.fill()}
 x.globalAlpha=1;x.globalCompositeOperation=bp?'screen':'soft-light';const lx=540+520*Math.sin(t*0.21),ly=300+260*Math.cos(t*0.17),g=x.createRadialGradient(lx,ly,0,lx,ly,700);
 g.addColorStop(0,bp?'rgba(120,170,255,0.10)':'rgba(255,190,110,0.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.globalCompositeOperation='source-over';x.globalAlpha=0.035+0.02*Math.sin(t*23);x.fillStyle='#000';x.fillRect(0,0,W,H);x.restore()}
