// captions
let CH=null;function chunks(){CH=[];let cur=[];TM.words.forEach((w,i)=>{cur.push(w);const end=/[.,!?।]$/.test(w.w)||cur.length>=4||i===TM.words.length-1;if(end){CH.push(cur);cur=[]}})}
function captions(t){if(!TM)return;if(!CH)chunks();const ch=CH.find(c=>t>=c[0].s-0.05&&t<c[c.length-1].e+0.15);if(!ch)return;x.save();x.font='50px Tiro';const txt=ch.map(w=>w.w.replace(/\.\.\.$/,'')),ws=txt.map(s=>x.measureText(s+' ').width),tw=ws.reduce((a,b)=>a+b,0);
 const Y=1500,p=eo((t-ch[0].s+0.05)/0.15);x.globalAlpha=p;x.shadowColor='rgba(40,25,10,0.3)';x.shadowBlur=12;x.shadowOffsetY=5;x.fillStyle='rgba(248,244,234,0.97)';x.beginPath();x.roundRect(480-tw/2-26,Y-46,tw+52,88,14);x.fill();x.shadowColor='transparent';
 let X=480-tw/2;x.textBaseline='middle';ch.forEach((w,i)=>{const on=t>=w.s;x.fillStyle=on?(t<w.e+0.05?RED:INK):'rgba(42,36,32,0.38)';x.fillText(txt[i],X,Y);X+=ws[i]});x.restore()}
function drawScene(fn,t,off){x.save();x.setTransform=(a,b,cc,d,e,f)=>ORIG(a,b,cc,d,e+off,f);try{fn(t)}finally{x.setTransform=ORIG}x.restore()}
window.render=function(t){T=t;DARKBG=false;x.setTransform(1,0,0,1,0,0);x.drawImage(paper,0,0);
 let i=0;for(let k=0;k<SC.length;k++)if(t>=SC[k][0])i=k;const tt=t-SC[i][0],TR=0.25;
 if(i>0&&tt<TR){const q=eio(tt/TR),off=W*(1-q);drawScene(SC[i-1][1],SC[i][0]-SC[i-1][0],-W*q);
  x.save();x.setTransform(1,0,0,1,0,0);x.beginPath();x.rect(off,0,W,H);x.clip();x.drawImage(paper,off,0);drawScene(SC[i][1],tt,off);x.restore();
  x.setTransform(1,0,0,1,0,0);x.save();x.fillStyle='#F8F4EA';x.shadowColor='rgba(40,25,10,0.3)';x.shadowBlur=14;x.beginPath();x.moveTo(off-10,0);for(let y=0;y<=H;y+=40)x.lineTo(off-10+((y*7919)%23)-6,y);x.lineTo(off+8,H);x.lineTo(off+8,0);x.closePath();x.fill();x.restore()}
 else SC[i][1](tt);
 x.setTransform(1,0,0,1,0,0);const v=x.createRadialGradient(540,960,700,540,960,1250);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(60,40,20,0.22)');x.fillStyle=v;x.fillRect(0,0,W,H);
 const bp=isBP(SC[i][1],tt);
 fxOverlay(t,bp);
 captions(t);

 if(IM.logo){x.save();x.globalAlpha=0.85;x.drawImage(IM.logo,70,236,64,64);x.restore()}x.save();x.font='34px Rozha';x.fillStyle=bp?'rgba(234,242,255,0.85)':'rgba(42,36,32,0.75)';x.textBaseline='middle';x.fillText('भूले किस्से',144,270);x.restore()};
window.ready=Promise.all([...loads,...['118px Rozha','46px TiroI','34px Tiro','700 20px Inter'].map(f=>document.fonts.load(f,'रहस्य 1'))]);
</script></body></html>
