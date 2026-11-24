// ---------------- Hampi musical pillars scenes ----------------
const _hat=document.createElement('canvas');_hat.width=_hat.height=64;{const g=_hat.getContext('2d');g.strokeStyle='rgba(50,30,15,0.55)';g.lineWidth=1.3;for(let i=0;i<64;i+=5){g.beginPath();g.moveTo(0,i);g.lineTo(64,i+2);g.stroke()}}
const HP=x.createPattern(_hat,'repeat');
function ring(cx,cy,t,col=GOLD,n=3){if(t<0||t>1.4)return;x.save();for(let k=0;k<n;k++){const q=t-k*0.18;if(q<0||q>1)continue;x.strokeStyle=col;x.globalAlpha=(1-q)*0.9;x.lineWidth=6*(1-q)+1;x.beginPath();x.arc(cx,cy,30+q*220,0,7);x.stroke()}x.restore()}
function noteIcon(X,Y,s,a,col=INK){if(a<=0)return;x.save();x.globalAlpha=cl(a);x.translate(X,Y);x.scale(s,s);x.fillStyle=col;x.strokeStyle=col;x.lineWidth=6;x.beginPath();x.ellipse(0,0,16,12,-0.4,0,7);x.fill();x.beginPath();x.moveTo(14,-4);x.lineTo(14,-70);x.quadraticCurveTo(30,-60,40,-40);x.stroke();x.restore()}
function floatNotes(t,cx,cy,col=INK){for(let i=0;i<5;i++){const q=(t-i*0.25);if(q<0||q>2)continue;noteIcon(cx+Math.sin(i*2.1+q*2)*120,cy-q*260,0.9+0.2*(i%2),1-q/2,col)}}
const NOTES=[['सा',4.8],['रे',5.45],['गा',6.35],['मा',6.9]];
// A 0-4.82: hook
function A_hook(t){sbPapercut(t);cam(lerp(1.0,1.05,cl(t/4.8)),540,930);img('bg_papercut',540,900,1000,cl(t/0.45+0.3),cl((t-0.3)/0.7));
 headline('पत्थर का संगीत?',540,385,cl(t/0.35+0.7),100);
 if(t>2.5){ring(560,820,(t-2.55)/1.0);label('थप-थप',760,700,0.05,(t-2.6)/0.3,46)}
 if(t>3.4)floatNotes(t-3.45,560,780,'#FFF3D6')}
// B 4.82-7.74: Sa Re Ga Ma, each colonnette lights up
function B_notes(t){sbStained(t);cam(lerp(1.06,1.0,eo(t/0.5)),540,930);const h=980,cy=900;img('pillar_stained',540,cy,h,1,cl(t/0.35));
 const I=IM.pillar_stained;const w=I?I.width*h/I.height:420;const xs=[0.24,0.4,0.6,0.76];
 NOTES.forEach(([nm,at],i)=>{const tt=t-(at-4.82);if(tt<0)return;const X=540-w/2+w*xs[i];
  x.save();x.globalAlpha=Math.max(0.25,1-tt*0.8);x.strokeStyle=GOLD;x.shadowColor=GOLD;x.shadowBlur=30;x.lineWidth=14;x.beginPath();x.moveTo(X,cy-h*0.32);x.lineTo(X,cy+h*0.3);x.stroke();x.restore();
  ring(X,cy,tt/0.9,GOLD,2);pill(nm,X,cy-h*0.42+ (i%2)*70,tt/0.25,'#fff',RED,56)});
 headline('सा रे गा मा',540,385,(t-0.05)/0.4,104,'#FFE7B0')}
// C 7.74-11.96: question
function C_q(t){sbAnime(t);cam(1,540,930);img('pillar_anime',540,740,560,1,1,0.95);headline('कहाँ है?',540,385,cl(t/0.3+0.3),120,RED);
 commentBox(540,1030,(t-1.5)/0.4,'मुझे पता है...');const r=(t-2.4)/0.4;if(r>0){x.save();x.fillStyle='rgba(30,25,22,0.9)';x.fillRect(0,1190,W,220*eo(r));x.restore();headline('असली राज़',540,1345,(t-2.6)/0.45,120,'#E8C26A')}}
// D 11.96-17.62: Hampi, Vittala temple, Vijayanagara
function D_temple(t){sbMiniature(t);cam(lerp(1.0,1.05,cl(t/5.6)),540,930);const rise=eo(cl(t/0.6));
 x.save();x.translate(0,lerp(240,0,rise));img('temple_miniature',540,760,520,cl(t/0.6),cl((t-0.5)/0.9));x.restore();
 headline('विजय विट्ठल मंदिर',540,385,(t-2.1)/0.5,92,'#F3D58A');label('हम्पी, कर्नाटक',540,470,0.03,(t-0.6)/0.35,48);
 if(t>3.4){const p=eo(cl((t-3.5)/0.6));rot('chariot_miniature',lerp(1300,560,p),1080,420,lerp(0.2,0,p));dust(560,1260,(t-4.0)/0.8)}
 pill('विजयनगर साम्राज्य',540,1350,(t-3.6)/0.35,'#fff',BLUE,44)}
// E 17.62-23.02: blueprint 56 pillars + 12 ft scale
function E_count(t){bpBG();cam(1,540,930);
 if(t<3.0){const n=Math.floor(cl((t-1.5)/1.3)*56+0.0001);
  for(let i=0;i<56;i++){const r=Math.floor(i/8),c=i%8,X=190+c*100,Y=520+r*100;const on=i<n;x.save();x.strokeStyle=on?GOLD:'rgba(234,242,255,0.35)';x.lineWidth=on?4:2;if(on){x.shadowColor=GOLD;x.shadowBlur=10}x.beginPath();x.arc(X,Y,26,0,7);x.stroke();x.beginPath();x.arc(X,Y,10,0,7);x.stroke();x.restore()}
  x.save();x.strokeStyle=BPW;x.lineWidth=3;x.strokeRect(130,460,820,820);x.restore();
  headline('रंग मंडप',540,385,(t-0.1)/0.4,104,BPW);if(t>1.5)pill(`${n} / 56 खंभे`,540,1365,(t-1.5)/0.3,'#123466',GOLD,48);return}
 const tt=t-3.0,top=480,bot=1260,AX=860,ft=(bot-top)/12;
 const S=IM.pillar_sk;if(S){const h=bot-top,w=S.width*h/S.height;x.save();x.globalAlpha=0.85;x.filter='invert(1) brightness(1.15)';x.drawImage(S,450-w/2,top,w,h);x.filter='none';x.restore()}
 x.save();x.strokeStyle=BPW;x.lineWidth=3;x.beginPath();x.moveTo(AX,bot);x.lineTo(AX,lerp(bot,top,eo(cl(tt/0.7))));x.stroke();for(let f=0;f<=12;f+=2){const y=bot-f*ft;if(y<lerp(bot,top,eo(cl(tt/0.7))))continue;x.beginPath();x.moveTo(AX,y);x.lineTo(AX-20,y);x.stroke()}x.restore();
 const c=count(0,12,(tt-0.2)/0.9);pill(`${c} फ़ुट`,AX-40,top-50,(tt-0.2)/0.3,'#123466',GOLD,46);
 const hh=5.6*ft,X=700;if(tt>0.9){x.save();x.globalAlpha=cl((tt-0.9)*3);x.fillStyle=BPW;x.beginPath();x.arc(X,bot-hh+12,12,0,7);x.fill();x.fillRect(X-9,bot-hh+26,18,hh*0.45);x.fillRect(X-9,bot-hh*0.5,7,hh*0.5);x.fillRect(X+2,bot-hh*0.5,7,hh*0.5);x.restore();pill('इंसान',X,bot-hh-40,(tt-0.9)/0.3,'#123466',SKY,34)}
 headline('बारह फ़ुट',540,385,cl(tt/0.4+0.4),104,BPW)}
// F 23.02-29.19: cluster top view, each slender pillar a different note
function F_cluster(t){sbMadhubani(t);cam(1,540,930);const cx=540,cy=880,R=230,N=8;
 x.save();x.strokeStyle='#B8262B';x.lineWidth=10;x.beginPath();x.arc(cx,cy,110*eo(cl(t/0.5)),0,7);x.stroke();x.strokeStyle='#1E1A18';x.lineWidth=3;x.beginPath();x.arc(cx,cy,128*eo(cl(t/0.5)),0,7);x.stroke();x.restore();
 const fr=[262,294,330,349,392,440,494,523];
 for(let i=0;i<N;i++){const q=cl((t-1.9-i*0.1)/0.3);if(q<=0)continue;const a=-Math.PI/2+i*2*Math.PI/N,X=cx+Math.cos(a)*R,Y=cy+Math.sin(a)*R;
  const lt=t-(3.9+i*0.27);x.save();x.fillStyle=lt>0&&lt<0.5?'#F2B731':'#2E7A4A';x.beginPath();x.arc(X,Y,40*q,0,7);x.fill();x.strokeStyle='#1E1A18';x.lineWidth=4;x.beginPath();x.arc(X,Y,44*q,0,7);x.stroke();x.restore();
  if(lt>0)ring(X,Y,lt/0.8,'#B8262B',2)}
 label('मोटा खंभा',cx,cy,0,(t-0.3)/0.3,38);headline('हर खंभा = अलग सुर',540,385,(t-0.1)/0.45,88,'#1E1A18');
 if(t>3.9)floatNotes(t-3.9,cx,cy-280,'#1E1A18')}
// G 29.19-31.93: all from solid stone
function G_solid(t){sbUkiyo(t);cam(lerp(1.0,1.06,cl(t/2.7)),540,930);img('pillar_ukiyo',540,880,900,cl(t/0.5),cl((t-0.4)/0.7));
 headline('ठोस पत्थर',540,385,(t-0.7)/0.4,110);label('एक ही पत्थर से',540,1340,-0.02,(t-1.1)/0.35,46)}
// H 31.93-36.13: legend, British cut two pillars
function H_cut(t){sbPuppet(t);cam(1,540,930);const h=880,cy=880,I=IM.pillar_puppet;const w=I?I.width*h/I.height:400;const sp=eo(cl((t-3.2)/0.6))*70;
 if(I){x.save();x.shadowColor='rgba(40,25,10,0.35)';x.shadowBlur=24;x.shadowOffsetY=14;
  x.save();x.beginPath();x.rect(0,0,W,cy);x.clip();x.drawImage(I,540-w/2-sp*0.2,cy-h/2-sp,w,h);x.restore();
  x.save();x.beginPath();x.rect(0,cy,W,H);x.clip();x.drawImage(I,540-w/2+sp*0.2,cy-h/2+sp,w,h);x.restore();x.restore()}
 if(t>3.1&&t<3.6){x.save();x.strokeStyle='#FFF7D6';x.shadowColor=GOLD;x.shadowBlur=30;x.lineWidth=6;x.beginPath();x.moveTo(540-w*0.7,cy);x.lineTo(540+w*0.7,cy);x.stroke();x.restore()}
 const hp=eo(cl((t-2.4)/0.5));const sw=t>2.9?Math.sin((t-2.9)*14)*0.5*Math.exp(-(t-2.9)*2):0;rot('hammer_puppet',lerp(1300,820,hp),lerp(500,760,hp),360,-0.6+sw);
 headline('कहते हैं...',540,385,cl(t/0.4+0.3),110,'#FFE2B8');if(t>2.7)pill('दो खंभे काट डाले',540,1360,(t-2.7)/0.35,'#fff',RED,46)}
// I 36.13-39.03: inside nothing, only solid stone
function I_inside(t){sbInk(t);cam(lerp(1.0,1.06,cl(t/2.9)),540,930);img('cutpillar_ink',540,860,860,cl(t/0.4),cl((t-0.3)/0.6));
 x.setTransform(1,0,0,1,0,0);const v=x.createRadialGradient(540,900,250,540,900,1100);v.addColorStop(0,'rgba(20,15,30,0)');v.addColorStop(1,`rgba(20,15,30,${0.25*eo(t/0.6)})`);x.fillStyle=v;x.fillRect(0,0,W,H);
 circ(640,860,140,300,(t-1.4)/0.8);headline('अंदर?',540,385,cl(t/0.4+0.3),120,'#1E1A18');label('बस ठोस पत्थर',540,1360,0.02,(t-1.5)/0.35,48)}
// J 39.03-45.4: wearing away -> don't touch, just feel
function J_care(t){sbWarli(t);cam(1,540,930);img('pillar_warli',400,860,860,1,1);
 for(let i=0;i<14;i++){const q=cl((t-0.6-i*0.08)/0.4);if(q<=0)continue;sd=31+i;const X=320+rnd()*170,Y=520+rnd()*700;x.save();x.globalAlpha=0.5*q;x.fillStyle='#f3ead8';x.beginPath();x.ellipse(X,Y,10+rnd()*16,5+rnd()*8,rnd()*3,0,7);x.fill();x.restore()}
 label('घिस रहे हैं',400,1340,-0.03,(t-1.6)/0.35,46);
 const np=(t-3.8)/0.35;if(np>0){x.save();x.translate(790,620);x.scale(back(np),back(np));x.strokeStyle='#FAF5EB';x.lineWidth=14;x.beginPath();x.arc(0,0,110,0,7);x.stroke();x.beginPath();x.moveTo(-78,-78);x.lineTo(78,78);x.stroke();
  x.fillStyle='#FAF5EB';x.beginPath();x.roundRect(-28,-30,56,80,20);x.fill();for(let k=0;k<4;k++){x.beginPath();x.roundRect(-30+k*16,-78,12,56,6);x.fill()}x.restore();pill('छूना नहीं',790,790,np,'#fff',RED,46)}
 if(t>4.8){const p=eo(cl((t-4.8)/0.5));rot('veena_warli',790,lerp(1500,1060,p),420,-0.4);floatNotes(t-5.0,790,980,'#FAF5EB');pill('बस महसूस करना',790,1300,(t-5.0)/0.35,'#fff',BLUE,40)}
 headline('बचाइए',540,385,(t-0.1)/0.4,120,'#FAF5EB')}
// K 45.4-52.04: CTA
function K_cta(t){cam(1,540,930);img('bg',540,720,620,1,1,0.98);floatNotes(t,540,620,'#FFF3D6');headline('पत्थर भी गाते हैं!',540,385,cl(t/0.35+0.3),92,RED);
 commentBox(480,1080,(t-2.3)/0.4,'हाँ, पता था!');subscribeBtn(480,1300,(t-5.4)/0.4,t)}
const SC=[[0,A_hook],[4.82,B_notes],[7.74,C_q],[11.96,D_temple],[17.62,E_count],[23.02,F_cluster],[29.19,G_solid],[31.93,H_cut],[36.13,I_inside],[39.03,J_care],[45.4,K_cta]];
function isBP(fn,tt){return fn===E_count||fn===B_notes||fn===H_cut||fn===J_care}
