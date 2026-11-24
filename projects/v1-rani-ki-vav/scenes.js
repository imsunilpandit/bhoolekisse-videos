// ---------------- Rani ki Vav scenes ----------------
const LAV='#9B8CC9';
const _hat=document.createElement('canvas');_hat.width=_hat.height=64;{const g=_hat.getContext('2d');g.strokeStyle='rgba(50,30,15,0.55)';g.lineWidth=1.3;for(let i=0;i<64;i+=5){g.beginPath();g.moveTo(0,i);g.lineTo(64,i+2);g.stroke()}}
const HP=x.createPattern(_hat,'repeat');
const GUJ=[[68.2,23.6],[68.6,24.3],[70.0,24.6],[71.1,24.6],[72.3,24.5],[73.0,24.4],[73.4,23.9],[74.3,23.4],[74.0,22.7],[74.2,22.3],[73.6,21.7],[73.9,21.2],[73.5,20.6],[72.9,20.3],[72.8,20.9],[72.6,21.6],[72.5,22.2],[72.1,21.9],[72.2,21.2],[71.6,20.8],[70.9,20.7],[70.0,21.0],[69.2,21.7],[68.95,22.3],[69.7,22.7],[70.3,22.6],[70.5,23.0],[69.7,22.9],[68.9,23.0],[68.4,23.3]];
const gp=(lo,la)=>[120+(lo-68)*118,1080-(la-20)*118];
function pin(X,Y,p){if(p<=0)return;x.save();x.translate(X,Y-60*(1-back(p)));x.fillStyle=RED;x.beginPath();x.arc(0,-34,22,0,7);x.fill();x.beginPath();x.moveTo(-16,-22);x.lineTo(16,-22);x.lineTo(0,4);x.closePath();x.fill();x.fillStyle='#fff';x.beginPath();x.arc(0,-34,8,0,7);x.fill();x.restore()}
function groundLine(Y,p,col='rgba(42,36,32,0.7)'){if(p<=0)return;x.save();x.strokeStyle=col;x.lineWidth=5;x.beginPath();x.moveTo(40,Y);x.lineTo(lerp(40,1040,eo(p)),Y);x.stroke();x.lineWidth=2;for(let X=50;X<lerp(40,1040,eo(p));X+=26){x.beginPath();x.moveTo(X,Y);x.lineTo(X-14,Y+16);x.stroke()}x.restore()}
// A 0-6.71: ₹100 note -> stepwell sinks below ground
function A_hook(t){cam(lerp(1.0,1.04,cl(t/6.7)),540,930);
 headline('₹100 के नोट पर...',540,360,cl(t/0.35+0.7),96);
 const out=eo(cl((t-2.9)/0.5));note10(540,lerp(980,640,out),lerp(1.12,0.6,out),lerp(-0.05,-0.1,out),cl(t/0.4),LAV,'₹100','१००');
 if(t>2.9){const GY=1080;groundLine(GY,(t-3.0)/0.5);const sink=eo(cl((t-4.2)/1.6));
  x.save();x.beginPath();x.rect(0,0,W,GY);x.clip();img('stepwell',540,lerp(830,830+520,sink),520,cl((t-3.0)/0.4),cl((t-3.2)/0.6));x.restore();
  x.save();x.globalAlpha=0.35*sink;x.setLineDash([12,10]);x.strokeStyle=INK;x.lineWidth=3;x.strokeRect(330,GY+40,420,300*sink);x.restore();
  if(t>4.2)label('ज़मीन के नीचे!',540,1270,0.03,(t-4.4)/0.35,48)}}
// B 6.71-9.22: not a palace... a well!
function B_well(t){const z=lerp(1.08,1.0,eo(t/0.5));cam(z,540,930);img('bg',540,880,980,cl(t/0.5),cl((t-0.3)/0.7));
 headline('महल नहीं...',540,300,(t-0.2)/0.4,100);if(t>1.55){headline('कुआँ!',540,1300,(t-1.6)/0.3,150,RED)}}
// C 9.22-13.16: question
function C_q(t){cam(1,540,930);img('stepwell',540,720,520,1,1,0.95);headline('नाम बताइए?',540,330,cl(t/0.3+0.3),104,RED);
 commentBox(540,1030,(t-1.25)/0.4,'मुझे पता है...');const r=(t-2.25)/0.4;if(r>0){x.save();x.fillStyle='rgba(30,25,22,0.9)';x.fillRect(0,1190,W,220*eo(r));x.restore();headline('असली राज़',540,1345,(t-2.5)/0.45,120,'#E8C26A')}}
// D 13.16-21.13: Patan map -> stepwell, 11th century, Queen Udayamati
function D_where(t){
 if(t<2.2){const sp=gp(72.12,23.85);cam(lerp(1,1.35,eo(cl((t-1.2)/1.0))),lerp(540,sp[0],cl((t-1.2)/1.0)),lerp(780,sp[1],cl((t-1.2)/1.0)));
  const p=cl(t/0.9);x.save();x.lineWidth=4;x.strokeStyle=INK;x.lineJoin='round';const n=GUJ.length,k=Math.floor(n*p);x.beginPath();for(let i=0;i<=k&&i<n;i++){const q=gp(...GUJ[i]);i?x.lineTo(...q):x.moveTo(...q)}if(p>=1){x.closePath();x.fillStyle='rgba(214,190,140,0.45)';x.fill()}x.stroke();x.restore();
  pill('गुजरात',380,560,(t-0.4)/0.35,'#fff',BLUE,44);pin(sp[0],sp[1],(t-0.9)/0.4);label('पाटन',sp[0]+120,sp[1]-90,-0.03,(t-1.0)/0.35,50);return}
 const tt=t-2.2;cam(lerp(1.0,1.05,cl(tt/5.8)),540,930);img('stepwell',540,820,760,cl(tt/0.6),cl((tt-0.5)/0.9));
 headline('रानी की वाव',540,300,(tt-0.0)/0.45,110);pill('11वीं सदी',260,1250,(t-3.1)/0.35,'#fff',BLUE,44);
 label('रानी उदयमती',760,1250,0.04,(t-4.3)/0.35,48);label('राजा भीमदेव प्रथम की याद में',540,1345,-0.02,(t-5.3)/0.35,40)}
// E 21.13-26.12: blueprint, inverted temple, 7 levels
function E_levels(t){bpBG();cam(1,540,930);
 // temple silhouette flips upside down
 const fl=eo(cl((t-0.4)/0.8));x.save();x.translate(540,lerp(520,760,fl));x.rotate(Math.PI*fl);x.globalAlpha=1-cl((t-1.4)/0.4);x.strokeStyle=BPW;x.lineWidth=4;x.beginPath();x.moveTo(-150,120);x.lineTo(150,120);x.lineTo(150,40);x.lineTo(60,40);x.lineTo(0,-150);x.lineTo(-60,40);x.lineTo(-150,40);x.closePath();x.stroke();x.restore();
 const GY=560;x.save();x.strokeStyle=BPW;x.lineWidth=4;x.beginPath();x.moveTo(60,GY);x.lineTo(1020,GY);x.stroke();x.restore();label('ज़मीन',900,GY-40,0.03,(t-0.2)/0.3,38);
 const n=Math.min(7,Math.floor(cl((t-1.5)/1.6)*7+0.001)+(t>1.5?1:0));
 for(let i=0;i<7;i++){if(i>=n)break;const yy=GY+i*95,w=820-i*90,q=cl((t-1.5-i*0.22)/0.3);x.save();x.strokeStyle=i%2?SKY:GOLD;x.lineWidth=4;x.shadowColor=x.strokeStyle;x.shadowBlur=12;x.strokeRect(540-w/2*q,yy,w*q,95);
  for(let c=0;c<5;c++){const X=540-w/2+w*(c+0.5)/5;x.beginPath();x.moveTo(X,yy+10);x.lineTo(X,yy+85);x.stroke()}x.restore();
  x.save();x.fillStyle=BPW;x.font='40px Rozha';x.textAlign='right';x.fillText(String(i+1),540-w/2-20,yy+62);x.restore()}
 headline('उल्टा मंदिर',540,300,(t-0.1)/0.45,110,BPW);if(t>2.6)pill(`${Math.max(1,n)} / 7 मंज़िल`,540,1365,(t-2.6)/0.3,'#123466',GOLD,48)}
// F 26.12-30.8: 500+ big and 1000+ small sculptures
function F_sculpt(t){cam(lerp(1.0,1.05,cl(t/4.7)),540,930);img('panel',540,820,720,cl(t/0.5),cl((t-0.3)/0.7));
 headline('मूर्तियाँ',540,300,(t-0.1)/0.4,110);const c=count(0,500,(t-0.6)/1.4);if(t>0.6)pill(`${hi(c)}+ बड़ी`,300,1340,(t-0.6)/0.3,'#fff',RED,46);
 if(t>2.8){const p=eo(cl((t-2.8)/0.5));rot('vishnu',820,lerp(1400,900,p),560,lerp(0.3,0.05,p));const c2=count(0,1000,(t-2.9)/1.2);pill(`${hi(c2)}+ छोटी`,760,1340,(t-2.9)/0.3,'#fff',BLUE,46)}}
// G 30.8-35.06: flood + silt buries the stepwell
function G_flood(t){cam(1,540,930);const GY=1180;groundLine(GY,1);img('stepwell',540,880,600,1,1);
 const w=eo(cl((t-0.4)/1.4));if(w>0){x.save();x.globalAlpha=0.75;x.fillStyle='#3d6fa8';x.beginPath();const top=lerp(GY,560,w);x.moveTo(60,GY);for(let X=60;X<=1020;X+=20)x.lineTo(X,top+Math.sin(X*0.03+t*6)*14);x.lineTo(1020,GY);x.closePath();x.fill();x.restore()}
 const s=eo(cl((t-2.6)/0.7));if(s>0){x.save();x.fillStyle='#7a5a3a';x.globalAlpha=0.96;x.beginPath();const top=lerp(GY,520,s);x.moveTo(60,GY);for(let X=60;X<=1020;X+=24)x.lineTo(X,top+Math.sin(X*0.05)*18+((X*37)%11));x.lineTo(1020,GY);x.closePath();x.fill();x.globalCompositeOperation='multiply';x.fillStyle=HP;x.globalAlpha=0.4;x.fill();x.restore();
  rot('silt',540,lerp(-200,560,eo(cl((t-2.6)/0.4))),300,0,1);dust(540,600,(t-2.95)/0.8,16)}
 headline(t<2.6?'बाढ़!':'मिट्टी में दब गई',540,300,t<2.6?(t-0.3)/0.35:(t-2.65)/0.4,t<2.6?130:96,t<2.6?BLUE:INK)}
// H 35.06-39.01: centuries, nobody knew (whisper)
function H_hidden(t){cam(lerp(1.0,1.06,cl(t/4)),540,930);const GY=760;
 x.save();x.fillStyle='#7a5a3a';x.fillRect(0,GY,W,H-GY);x.globalCompositeOperation='multiply';x.fillStyle=HP;x.globalAlpha=0.35;x.fillRect(0,GY,W,H-GY);x.restore();
 x.save();x.strokeStyle='#5c8a3a';x.lineWidth=6;for(let X=20;X<1060;X+=14){x.beginPath();x.moveTo(X,GY);x.lineTo(X+4,GY-14-((X*13)%10));x.stroke()}x.restore();
 x.save();x.globalAlpha=0.35+0.15*Math.sin(t*3);x.setLineDash([12,10]);x.strokeStyle='#F3E2B3';x.lineWidth=3;for(let i=0;i<7;i++){const w=760-i*80;x.strokeRect(540-w/2,GY+60+i*80,w,80)}x.restore();
 x.setTransform(1,0,0,1,0,0);const v=x.createRadialGradient(540,900,200,540,900,1100);v.addColorStop(0,'rgba(20,15,30,0)');v.addColorStop(1,`rgba(20,15,30,${0.7*eo(t/0.6)})`);x.fillStyle=v;x.fillRect(0,0,W,H);
 headline('सदियों तक...',540,330,cl(t/0.4+0.2),110,'#F3E2B3');const q=(t-2.4)/0.4;if(q>0){x.save();x.translate(540,640);x.scale(back(q),back(q));x.font='200px Rozha';x.textAlign='center';x.fillStyle='#F3E2B3';x.fillText('?',0,60);x.restore()}}
// I 39.01-46.5: excavation 1980s, UNESCO 2014
function I_dig(t){cam(1,540,930);const GY=1180;groundLine(GY,1);img('stepwell',540,880,600,1,1);
 const r=eo(cl((t-1.4)/2.2));x.save();x.fillStyle='#7a5a3a';x.beginPath();const top=lerp(520,GY,r);x.moveTo(60,GY);for(let X=60;X<=1020;X+=24)x.lineTo(X,top+Math.sin(X*0.05)*18*(1-r));x.lineTo(1020,GY);x.closePath();x.fill();x.restore();
 if(r>0&&r<1)dust(540,top,(t*1.5)%1,10);
 const tp=eo(cl(t/0.5));rot('tools',lerp(1300,860,tp),lerp(700,520,tp)+Math.sin(t*8)*10*(r<1?1:0),420,-0.3+Math.sin(t*6)*0.12*(r<1?1:0));
 headline('खुदाई',540,300,(t-0.1)/0.4,120);pill('1980 का दशक · पुरातत्व विभाग',540,1290,(t-0.6)/0.35,'#fff',BLUE,40);
 if(t>4.2){stamp('UNESCO 2014',540,760,(t-4.25)/0.6,-0.1)}}
// J 46.5-54.04: back to ₹100 note (loop), comment, subscribe
function J_cta(t){cam(1,540,930);note10(540,700,0.66,-0.08,cl(t/0.3),LAV,'₹100','१००');rot('stepwell',560,730,300,0.06,cl((t-0.2)/0.3));
 headline('₹100 = वाव!',540,330,cl(t/0.35+0.3),110,RED);commentBox(480,1080,(t-3.5)/0.4,'हाँ, पता था!');subscribeBtn(480,1300,(t-6.2)/0.4,t)}
const SC=[[0,A_hook],[6.71,B_well],[9.22,C_q],[13.16,D_where],[21.13,E_levels],[26.12,F_sculpt],[30.8,G_flood],[35.06,H_hidden],[39.01,I_dig],[46.5,J_cta]];
function isBP(fn,tt){return fn===E_levels}
