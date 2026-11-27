const cl=v=>Math.max(0,Math.min(1,v)),eo=v=>1-Math.pow(1-cl(v),3),eio=v=>{v=cl(v);return v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2};
const back=v=>{v=cl(v);const s=1.7;return 1+(s+1)*Math.pow(v-1,3)+s*Math.pow(v-1,2)};
const lerp=(a,b,t)=>a+(b-a)*t;
const spring=t=>t<=0?0:1-Math.exp(-7*t)*Math.cos(11*t);
function hash(n){n=Math.sin(n*127.1+311.7)*43758.5453;return n-Math.floor(n)}
// grain
const G=document.createElement('canvas');G.width=540;G.height=960;{const g=G.getContext('2d'),d=g.createImageData(540,960);for(let i=0;i<d.data.length;i+=4){const v=128+(hash(i*.37)-.5)*90;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0)}
function grain(a=.07){x.save();x.globalAlpha=a;x.globalCompositeOperation='overlay';x.drawImage(G,0,0,W,H);x.restore()}
const F=(w,s)=>`${w} ${s}px B`;

// ---------- primitives ----------
function torn(cx,cy,w,h,rot,fill,seed){ // torn tape polygon
  x.save();x.translate(cx,cy);x.rotate(rot);x.beginPath();
  const n=Math.max(8,Math.round(w/26));
  for(let i=0;i<=n;i++){x.lineTo(-w/2+w*i/n,-h/2+(hash(seed+i)-.5)*8)}
  for(let i=0;i<=6;i++){x.lineTo(w/2+(hash(seed+50+i)-.5)*14,-h/2+h*i/6)}
  for(let i=n;i>=0;i--){x.lineTo(-w/2+w*i/n,h/2+(hash(seed+90+i)-.5)*8)}
  for(let i=6;i>=0;i--){x.lineTo(-w/2+(hash(seed+150+i)-.5)*14,-h/2+h*i/6)}
  x.closePath();x.shadowColor='rgba(0,0,0,.28)';x.shadowBlur=14;x.shadowOffsetY=8;x.fillStyle=fill;x.fill();x.restore()
}
function tape(text,cx,cy,size,p,o={}){ // headline on torn tape, p=0..1 appear
  if(p<=0)return;const fill=o.fill||'#FFD43B',ink=o.ink||'#111',rot=(o.rot??-0.025);
  x.save();x.font=F(800,size);const tw=x.measureText(text).width,w=tw+size*1.1,h=size*1.45;
  const s=back(p);x.translate(cx,cy);x.scale(s,s);x.globalAlpha=cl(p*4);
  torn(0,0,w,h,rot,fill,o.seed||3);x.rotate(rot);x.fillStyle=ink;x.textAlign='center';x.textBaseline='middle';x.fillText(text,0,size*.08);
  if(o.strike){x.strokeStyle='#E23B3B';x.lineWidth=size*.1;x.beginPath();x.moveTo(-tw/2,0);x.lineTo(-tw/2+tw*cl(o.strike),0);x.stroke()}
  x.restore();return w
}
function chip(text,cx,cy,size,p,fill,ink='#111',rot=0,strike=0){
  if(p<=0)return;x.save();x.font=F(800,size);const tw=x.measureText(text).width,w=tw+size*.9,h=size*1.35;
  const s=back(p);x.translate(cx+(1-eo(p))*40,cy);x.rotate(rot);x.scale(s,s);x.globalAlpha=cl(p*4);
  x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=10;x.shadowOffsetY=6;x.fillStyle=fill;rr(-w/2,-h/2,w,h,h*.28);x.fill();x.shadowColor='transparent';
  x.fillStyle=ink;x.textAlign='center';x.textBaseline='middle';x.fillText(text,0,size*.08);
  if(strike>0){x.strokeStyle='#E23B3B';x.lineWidth=size*.12;x.lineCap='round';x.beginPath();x.moveTo(-tw/2,size*.05);x.lineTo(-tw/2+tw*cl(strike),size*.05);x.stroke()}
  x.restore()
}
function rr(a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function numSticker(n,cx,cy,p){if(p<=0)return;x.save();const s=back(p);x.translate(cx,cy);x.rotate(-.06);x.scale(s,s);
  x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=12;x.shadowOffsetY=7;x.fillStyle='#FFD43B';rr(-66,-66,132,132,10);x.fill();x.shadowColor='transparent';
  x.fillStyle='#111';x.font=F(800,92);x.textAlign='center';x.textBaseline='middle';x.fillText(n,0,8);x.restore()}
// layer that pops up from its bottom edge (paper fold)
function pop(img,cx,by,w,lt,o={}){
  const p=spring(lt/(o.dur||1));if(lt<=0)return;
  const h=w*img.height/img.width,ang=(1-p)*1.48,sy=Math.max(.02,Math.cos(Math.min(1.55,ang)));
  x.save();x.globalAlpha=cl(lt/.1)*(o.alpha??1);x.translate(cx,by+(1-cl(p))*40);x.scale(1,sy);
  x.shadowColor=`rgba(40,20,0,${.35*cl(p)})`;x.shadowBlur=18*cl(p);x.shadowOffsetY=10*cl(p);
  if(o.rot)x.rotate(o.rot);
  if(ang>.05)x.filter=`brightness(${(1-.4*Math.sin(Math.min(1.5,ang))).toFixed(3)})`;
  x.drawImage(img,-w/2,-h,w,h);x.restore()
}
function img(imgo,cx,cy,w,o={}){const h=w*imgo.height/imgo.width;x.save();x.translate(cx,cy);if(o.rot)x.rotate(o.rot);if(o.s)x.scale(o.s,o.s);x.globalAlpha=o.a??1;
  if(o.sh!==false){x.shadowColor='rgba(40,20,0,.3)';x.shadowBlur=16;x.shadowOffsetY=10}x.drawImage(imgo,-w/2,-h/2,w,h);x.restore()}
function dots(color,bgc){ // halftone paper
  x.fillStyle=bgc;x.fillRect(0,0,W,H);x.fillStyle=color;
  for(let yy=0;yy<H;yy+=26)for(let xx=(yy/26%2)*13;xx<W;xx+=26){
    const d=Math.min(xx,W-xx,yy*.55,(H-yy)*.55);const r=Math.max(0,5.2-d/42);if(r>.4){x.beginPath();x.arc(xx,yy,r,0,6.283);x.fill()}}
}
function redCircle(cx,cy,rx,ry,p){if(p<=0)return;x.save();x.strokeStyle='#E23B3B';x.lineWidth=9;x.lineCap='round';x.beginPath();
  const a0=-2.2;x.ellipse(cx,cy,rx,ry,-.08,a0,a0+6.9*eo(p));x.stroke();x.restore()}

// ---------- captions (word stickers) ----------
const CAP=[];function cap(t,s){CAP.push({t,s})}
function tok(s){const out=[];s.replace(/\*([^*]+)\*|(\S+)/g,(m,a,b)=>{out.push(a?{w:a,k:1}:{w:b,k:0})});return out}
function captions(t){
  let cur=-1;for(let i=0;i<CAP.length;i++)if(t>=CAP[i].t)cur=i;if(cur<0)return;
  const C=CAP[cur],end=CAP[cur+1]?CAP[cur+1].t-.12:C.end;if(t>end)return;
  const lt=t-C.t,tk=tok(C.s),size=60;const WD=Math.min(.32,Math.max(.1,(end-C.t)*.7/Math.max(1,tk.length)));x.save();x.font=F(800,size);
  const ws=tk.map(o=>x.measureText(o.w).width+size*.6),gap=12;
  let lines=[[]],lw=[0];ws.forEach((w,i)=>{if(lw[lw.length-1]+w>840&&lines[lines.length-1].length){lines.push([]);lw.push(0)}lines[lines.length-1].push(i);lw[lw.length-1]+=w+gap});
  const y0=C.y??1405;
  lines.forEach((ln,li)=>{let xx=480-(lw[li]-gap)/2;ln.forEach(i=>{const p=cl((lt-i*WD)/.22);const w=ws[i],cx=xx+w/2,cy=y0+li*92;xx+=w+gap;if(p<=0)return;
    const rot=(hash(i*7+cur*3)-.5)*.07;x.save();x.translate(cx,cy);x.rotate(rot);x.scale(back(p),back(p));
    x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=10;x.shadowOffsetY=6;x.fillStyle=tk[i].k?'#FFD43B':'#fff';x.fillRect(-w/2,-size*.68,w,size*1.32);x.shadowColor='transparent';
    x.fillStyle='#111';x.textAlign='center';x.textBaseline='middle';x.fillText(tk[i].w,0,size*.06);x.restore()})});
  x.restore()
}
function watermark(){x.save();x.globalAlpha=.9;x.fillStyle='rgba(40,16,48,.78)';rr(40,56,262,68,34);x.fill();x.drawImage(IM.logo,46,60,60,60);x.font=F(800,34);x.textAlign='left';x.textBaseline='alphabetic';x.fillStyle='#FFD98A';x.fillText('भूले किस्से',114,102);x.restore()}

function subArrow(l){if(l<=0)return;const p=eio(l/.5),pul=.5+.5*Math.sin(l*7);
  x.save();x.strokeStyle='#E62117';x.fillStyle='#E62117';x.lineWidth=14;x.lineCap='round';x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=10;
  const P=t=>{const a=1-t;return [a*a*640+2*a*t*640+t*t*310,a*a*1560+2*a*t*1660+t*t*1672]};
  x.beginPath();for(let i=0;i<=30*p;i++){const [px,py]=P(i/30);i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();
  if(p>.95){const [ex,ey]=P(1),[qx,qy]=P(.93),ang=Math.atan2(ey-qy,ex-qx);x.translate(ex,ey);x.rotate(ang);x.beginPath();x.moveTo(18,0);x.lineTo(-26,-22);x.lineTo(-26,22);x.closePath();x.fill();x.setTransform(1,0,0,1,0,0);
    x.globalAlpha=.55*pul;x.strokeStyle='#fff';x.lineWidth=6;x.beginPath();x.ellipse(220,1690,150+18*pul,52+8*pul,0,0,6.28);x.stroke()}
  x.restore()}
function subCTA(l,cx,cy){const p=back(l/.35),pul=1+.04*Math.sin(l*6);x.save();x.translate(cx,cy);x.scale(p*pul,p*pul);x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=16;x.shadowOffsetY=8;
  x.fillStyle='#E62117';rr(-230,-62,460,124,24);x.fill();x.shadowColor='transparent';x.fillStyle='#fff';x.font=F(800,58);x.textAlign='center';x.textBaseline='middle';x.fillText('सब्सक्राइब 🔔',0,6);x.restore();subArrow(l-.2)}
// transitions
function pageTurn(drawA,drawB,p){ // B slides in from right with curl shadow
  drawA();const e=eio(p),edge=W*(1-e);x.save();x.beginPath();x.rect(edge,0,W,H);x.clip();x.translate(edge*0.25,0);drawB();x.restore();
  const g=x.createLinearGradient(edge-60,0,edge+10,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.35)');x.fillStyle=g;x.fillRect(edge-60,0,70,H);
  x.fillStyle='rgba(255,255,255,.6)';x.fillRect(edge,0,6,H)}
function slideUp(drawA,drawB,p){drawA();const e=eio(p);x.save();x.translate(0,H*(1-e));x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=40;x.fillStyle='#000';x.fillRect(0,0,W,H);x.shadowColor='transparent';drawB();x.restore()}

