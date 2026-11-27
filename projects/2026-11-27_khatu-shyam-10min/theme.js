// theme.js — "Chitra Katha" bright comic theme for 16:9 (high contrast, reads on TV + phone)
function halftone(x0,y0,w,h,col,maxR,dir){x.save();x.beginPath();x.rect(x0,y0,w,h);x.clip();x.fillStyle=col;const st=14;for(let yy=y0;yy<y0+h;yy+=st)for(let xx=x0+((yy/st)%2)*st/2;xx<x0+w;xx+=st){const k=dir==='down'?(yy-y0)/h:1-(yy-y0)/h;const r=maxR*k;if(r>.4){x.beginPath();x.arc(xx,yy,r,0,6.28);x.fill()}}x.restore()}
function comicSky(t,top,bot,sun){const g=x.createLinearGradient(0,0,0,H*.62);g.addColorStop(0,top);g.addColorStop(1,bot);x.fillStyle=g;x.fillRect(0,0,W,H);
 if(sun){x.save();x.translate(sun[0],sun[1]);x.rotate(t*.04);for(let i=0;i<24;i++){x.fillStyle=i%2?'rgba(255,255,255,.18)':'rgba(255,240,180,.10)';x.beginPath();x.moveTo(0,0);x.arc(0,0,2200,i/24*6.28,(i+1)/24*6.28);x.fill()}x.restore();
  const sg=x.createRadialGradient(sun[0],sun[1],10,sun[0],sun[1],200);sg.addColorStop(0,'rgba(255,255,230,1)');sg.addColorStop(.35,'rgba(255,236,150,.9)');sg.addColorStop(1,'rgba(255,220,120,0)');x.fillStyle=sg;x.beginPath();x.arc(sun[0],sun[1],200,0,6.28);x.fill();
  x.fillStyle='#fff6c8';x.strokeStyle='#2a1406';x.lineWidth=5;x.beginPath();x.arc(sun[0],sun[1],62,0,6.28);x.fill();x.stroke()}
 halftone(0,0,W,H*.35,'rgba(255,255,255,.22)',4,'up')}
function comicCloud(cx,cy,s){x.save();x.translate(cx,cy);x.scale(s,s);const B=[[-110,10,46],[-60,-22,58],[0,-36,70],[66,-18,56],[116,10,42]];
 x.strokeStyle='#2a1406';x.lineWidth=10/s;x.fillStyle='#fff';B.forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,6.28);x.stroke()});x.beginPath();x.roundRect(-150,0,300,42,20);x.stroke();
 B.forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,6.28);x.fill()});x.beginPath();x.roundRect(-150,0,300,42,20);x.fill();
 x.fillStyle='rgba(120,170,220,.35)';x.beginPath();x.ellipse(0,30,130,12,0,0,6.28);x.fill();x.restore()}
function comicHills(t,layers){layers.forEach(([base,amp,col,seed,par])=>{x.fillStyle=col;x.strokeStyle='#2a1406';x.lineWidth=4;x.beginPath();x.moveTo(-50,H);for(let xx=-50;xx<=W+50;xx+=30){x.lineTo(xx,base-amp*(.55+.45*Math.sin(xx*.0035+seed)+.25*Math.sin(xx*.011+seed*3)))}x.lineTo(W+50,H);x.closePath();x.fill();x.stroke();
  x.save();x.clip();x.fillStyle='rgba(0,0,0,.12)';for(let xx=-50;xx<=W+50;xx+=30){const yy=base-amp*(.55+.45*Math.sin(xx*.0035+seed)+.25*Math.sin(xx*.011+seed*3));x.fillRect(xx,yy+30,30,6)}x.restore()})}
function comicGround(y,col1,col2){const g=x.createLinearGradient(0,y,0,H);g.addColorStop(0,col1);g.addColorStop(1,col2);x.fillStyle=g;x.strokeStyle='#2a1406';x.lineWidth=5;x.beginPath();x.moveTo(-20,H+20);x.lineTo(-20,y+20);x.quadraticCurveTo(W*.3,y-10,W*.55,y+8);x.quadraticCurveTo(W*.8,y+24,W+20,y);x.lineTo(W+20,H+20);x.closePath();x.fill();x.stroke();halftone(0,y,W,H-y,'rgba(0,0,0,.13)',3.5,'down');
 for(let i=0;i<40;i++){const gx=hash(i)*W,gy=y+40+hash(i+7)*(H-y-40);x.strokeStyle='rgba(30,60,10,.6)';x.lineWidth=3;for(let k=-1;k<=1;k++){x.beginPath();x.moveTo(gx,gy);x.quadraticCurveTo(gx+k*6,gy-14,gx+k*10,gy-24-hash(i+k)*8);x.stroke()}}}
function hash(i){const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)}
function peepal(cx,gy,s,t,marked,markT){x.save();x.translate(cx,gy);x.scale(s,s);
 // roots + trunk
 x.fillStyle='#7a4a24';x.strokeStyle='#2a1406';x.lineWidth=6;x.beginPath();x.moveTo(-120,0);x.quadraticCurveTo(-60,-20,-50,-140);x.quadraticCurveTo(-40,-300,-70,-420);x.lineTo(70,-420);x.quadraticCurveTo(40,-300,50,-140);x.quadraticCurveTo(60,-20,130,0);x.closePath();x.fill();x.stroke();
 x.strokeStyle='rgba(40,20,5,.45)';x.lineWidth=4;for(let i=0;i<5;i++){x.beginPath();x.moveTo(-30+i*15,-10);x.bezierCurveTo(-40+i*16,-150,-20+i*12,-280,-40+i*18,-410);x.stroke()}
 // branches
 x.strokeStyle='#6a3e1c';x.lineWidth=26;x.lineCap='round';[[-40,-380,-260,-560],[30,-390,240,-580],[0,-410,-20,-660],[-20,-400,-170,-660],[20,-400,150,-680]].forEach(([a,b,c,d])=>{x.beginPath();x.moveTo(a,b);x.quadraticCurveTo((a+c)/2,b-60,c,d);x.stroke()});x.lineCap='butt';
 // leaf masses
 const leafCl=[[-300,-600,170],[-120,-720,190],[80,-740,200],[280,-620,170],[-200,-470,140],[200,-480,140],[0,-560,180]];
 leafCl.forEach(([lx,ly,r],j)=>{x.fillStyle=j%2?'#2f8a3a':'#3aa046';x.strokeStyle='#2a1406';x.lineWidth=6;x.beginPath();x.arc(lx,ly,r,0,6.28);x.fill();x.stroke();x.fillStyle='rgba(255,255,255,.12)';x.beginPath();x.arc(lx-r*.3,ly-r*.3,r*.5,0,6.28);x.fill()});
 // individual heart leaves (marked ones glow)
 for(let i=0;i<60;i++){const c=leafCl[i%leafCl.length],a=hash(i)*6.28,rr=hash(i+3)*c[2]*.9,lx=c[0]+Math.cos(a)*rr,ly=c[1]+Math.sin(a)*rr+Math.sin(t*2+i)*3;
  x.save();x.translate(lx,ly);x.rotate(hash(i+9)*6.28);const mk=marked&&hash(i+20)<Math.min(1,markT);x.fillStyle=mk?'#ffe680':(i%3?'#56c25e':'#3a9a44');x.strokeStyle='#1a3a10';x.lineWidth=2.5;x.beginPath();x.moveTo(0,-16);x.bezierCurveTo(14,-14,16,4,0,18);x.bezierCurveTo(-16,4,-14,-14,0,-16);x.fill();x.stroke();
  if(mk){x.globalCompositeOperation='lighter';const g=x.createRadialGradient(0,0,0,0,0,30);g.addColorStop(0,'rgba(255,240,150,.8)');g.addColorStop(1,'rgba(255,200,80,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,30,0,6.28);x.fill();x.globalCompositeOperation='source-over';x.fillStyle='#ff5a1a';x.beginPath();x.arc(0,0,4,0,6.28);x.fill()}x.restore()}
 x.restore()}
// narration box (top-left, Chitra-Katha yellow)
function narr(text,t0,t1,t){const a=Math.min(1,(t-t0)/.25,(t1-t)/.25);if(a<=0)return;x.save();x.globalAlpha=a;x.font='46px Rozha';x.textAlign='left';const w=x.measureText(text).width+60;const sx=60+(1-Math.min(1,(t-t0)/.3))*-40;
 x.fillStyle='rgba(0,0,0,.35)';x.fillRect(sx+8,60+8,w,78);x.fillStyle='#ffe14a';x.strokeStyle='#1a0a02';x.lineWidth=5;x.fillRect(sx,60,w,78);x.strokeRect(sx,60,w,78);x.fillStyle='#1a0a02';x.textBaseline='middle';x.fillText(text,sx+30,101);x.restore()}
// subtitles: bold, boxed, high contrast; keyword highlighted
function subtitle(txt,t0,t1,t,hi='#ffd23a'){const a=Math.min(1,(t-t0)/.2,(t1-t)/.2);if(a<=0)return;x.save();x.globalAlpha=a;x.textAlign='left';let fs=54;x.font=fs+'px Rozha';if(x.measureText(txt.replace(/\|/g,'')).width>1700){fs=Math.floor(54*1700/x.measureText(txt.replace(/\|/g,'')).width);x.font=fs+'px Rozha'}x.textBaseline='middle';const parts=txt.split('|');let tw=0;parts.forEach(p=>tw+=x.measureText(p).width);
 const bx=W/2-tw/2-34,by=H-150;x.fillStyle='rgba(10,4,0,.78)';x.beginPath();x.roundRect(bx,by,tw+68,84,18);x.fill();let xx=W/2-tw/2;parts.forEach((p,i)=>{x.fillStyle=i%2?hi:'#ffffff';x.fillText(p,xx,by+44);xx+=x.measureText(p).width});x.restore()}
function speechBubble(text,px,py,tx,ty,t0,t1,t,side=1){const a=Math.min(1,(t-t0)/.2,(t1-t)/.2);if(a<=0)return;const s=Math.min(1,.6+(t-t0)*3);x.save();x.globalAlpha=a;x.font='44px Rozha';const w=x.measureText(text).width+60,h=90;x.translate(px,py);x.scale(s,s);
 x.fillStyle='#ffffff';x.strokeStyle='#1a0a02';x.lineWidth=5;x.beginPath();x.roundRect(-w/2,-h/2,w,h,40);x.fill();x.stroke();x.beginPath();x.moveTo(-14*side,h/2-4);x.lineTo((tx-px)/s,(ty-py)/s);x.lineTo(16*side,h/2-4);x.fill();x.stroke();x.fillRect(-18,h/2-8,36,8);x.fillStyle='#1a0a02';x.textAlign='center';x.textBaseline='middle';x.fillText(text,0,2);x.restore()}
function speedLines(cx,cy,t,a){x.save();x.globalAlpha=a;x.strokeStyle='#ffffff';x.lineWidth=4;for(let i=0;i<40;i++){const an=hash(i)*6.28,r0=380+hash(i+4)*200;x.beginPath();x.moveTo(cx+Math.cos(an)*r0,cy+Math.sin(an)*r0);x.lineTo(cx+Math.cos(an)*1500,cy+Math.sin(an)*1500);x.stroke()}x.restore()}
function vignetteSoft(){const g=x.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,H*1.05);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.35)');x.fillStyle=g;x.fillRect(0,0,W,H)}
