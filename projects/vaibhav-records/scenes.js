// ---------------- Vaibhav: गाँव से वर्ल्ड रिकॉर्ड तक ----------------
function ring(cx,cy,t,col=GOLD,n=3,R=220){if(t<0||t>1.4)return;x.save();for(let k=0;k<n;k++){const q=t-k*0.18;if(q<0||q>1)continue;x.strokeStyle=col;x.globalAlpha=(1-q)*0.9;x.lineWidth=6*(1-q)+1;x.beginPath();x.arc(cx,cy,30+q*R,0,7);x.stroke()}x.restore()}
function glowAt(cx,cy,r,a,col='255,214,90'){if(a<=0)return;x.save();x.globalCompositeOperation='lighter';const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${col},${0.55*a})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.fillRect(cx-r,cy-r,2*r,2*r);x.restore()}
// chunky 3D extruded text
function txt3d(s,X,Y,fs,p,col='#FFD65A',side='#8a5a00',depth=14){if(p<=0)return;const sc=back(cl(p));x.save();x.translate(X,Y);x.scale(sc,sc);x.font=`${fs}px Rozha`;x.textAlign='center';x.textBaseline='middle';
 for(let d=depth;d>0;d--){x.fillStyle=side;x.fillText(s,d*0.8,d)}x.shadowColor='rgba(0,0,0,0.35)';x.shadowBlur=20;x.shadowOffsetY=depth+6;
 const g=x.createLinearGradient(0,-fs/2,0,fs/2);g.addColorStop(0,'#fff8d8');g.addColorStop(0.45,col);g.addColorStop(1,side);x.fillStyle=g;x.fillText(s,0,0);x.shadowColor='transparent';x.lineWidth=3;x.strokeStyle='rgba(255,255,255,0.6)';x.strokeText(s,0,0);x.restore()}
// night stadium backdrop
function sbStadium(t,dim=1){DARKBG=true;x.save();x.setTransform(1,0,0,1,0,0);const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#050a1c');g.addColorStop(0.55,'#0d1f45');g.addColorStop(1,'#123a22');x.fillStyle=g;x.fillRect(0,0,W,H);
 for(const [fx,fy] of [[120,330],[960,330]]){const gg=x.createRadialGradient(fx,fy,0,fx,fy,620);gg.addColorStop(0,`rgba(255,250,220,${0.55*dim})`);gg.addColorStop(1,'rgba(255,250,220,0)');x.fillStyle=gg;x.fillRect(0,0,W,H)}
 sd=5;for(let i=0;i<520;i++){const X=rnd()*W,Y=880+rnd()*230,f=0.4+0.6*Math.abs(Math.sin(t*3+i));x.fillStyle=`rgba(${200+rnd()*55|0},${180+rnd()*70|0},${160+rnd()*90|0},${0.35*f*dim})`;x.fillRect(X,Y,4,4)}
 x.fillStyle='#1d5a2c';x.beginPath();x.ellipse(540,1500,900,330,0,0,7);x.fill();x.fillStyle='#c9b27a';x.beginPath();x.moveTo(500,1180);x.lineTo(580,1180);x.lineTo(640,1420);x.lineTo(440,1420);x.closePath();x.fill();x.restore()}
// player shadow on ground (fake 3D)
function shadowAt(cx,cy,w,a=0.45){x.save();x.fillStyle=`rgba(0,0,0,${a})`;x.filter='blur(14px)';x.beginPath();x.ellipse(cx,cy,w,w*0.18,0,0,7);x.fill();x.filter='none';x.restore()}
// batter hits a six: backlift frame -> swing -> follow-through, ball flies out
function shot(t,t0,X,Y,h,trail=true){const ph=t-t0;const pre=ph<0;const yaw=Math.sin(T*1.1)*0.04;
 shadowAt(X,Y+h*0.48,h*0.26);
 if(ph<-0.9){rot('batterb',X,Y,h,0,1,1+yaw,1)}
 else if(pre){const w=Math.sin((ph+0.9)/0.9*Math.PI)*0.012;rot('batterb',X,Y-4*(1+ph),h,-w,1,1+yaw,1)}
 else{if(ph<0.12){for(let k=3;k>0;k--)rot('batter',X,Y,h,-0.06*k*(1-ph/0.12),0.18,1,1)}const pun=ph<0.2?1+0.04*Math.sin(ph/0.2*Math.PI):1;rot('batter',X,Y,h,0,1,pun+yaw,pun)}
 const bx=X+h*0.14,by=Y+h*0.06;
 if(pre&&ph>-0.45){const q=1+ph/0.45;rot('ball',lerp(X+520,bx,q),lerp(Y-420,by,q),lerp(18,46,q),q*8)}
 if(!pre&&ph<1.6){const q=ph/1.6,ex=bx-760*q,ey=by-1250*q+900*q*q*0.0;const s=lerp(60,14,q);
  if(trail){x.save();x.strokeStyle='rgba(255,255,255,0.55)';x.lineWidth=s*0.5;x.lineCap='round';x.beginPath();x.moveTo(bx,by);x.quadraticCurveTo(bx-200*q,by-700*q,ex,ey);x.stroke();x.restore()}
  rot('ball',ex,ey,s,ph*14)}
 if(!pre&&ph<0.25){x.save();x.globalAlpha=1-ph/0.25;x.fillStyle='#fff';x.beginPath();x.arc(bx,by,30+ph*500,0,7);x.fill();x.restore()}
 if(!pre)ring(bx,by,ph/0.7,'#FFF6C8',3,300)}
// horizontal record bars: shorter = faster
function bars(t,items,y0,maxv){items.forEach((it,i)=>{const q=eo(cl((t-it.at)/0.6));if(q<=0)return;const Y=y0+i*190,L=110,wmax=800,w=wmax*it.v/maxv*q;
 x.save();x.globalAlpha=cl((t-it.at)/0.2);x.font='38px Tiro';x.fillStyle=it.tc||BPW;x.fillText(it.name,L,Y-24);x.font='28px Tiro';x.globalAlpha*=0.8;x.fillText(it.sub,L,Y+82);x.restore();
 x.save();x.fillStyle=it.col;if(it.glow){x.shadowColor=it.col;x.shadowBlur=30}x.beginPath();x.roundRect(L,Y,w,52,26);x.fill();x.restore();
 if(q>0.5){x.save();x.font='44px Rozha';x.fillStyle=it.tc||BPW;x.textBaseline='middle';x.fillText(`${count(0,it.v,(t-it.at)/0.6)} गेंद`,L+w+18,Y+28);x.restore()}})}
function likeIcon(X,Y,s,p){if(p<=0)return;const sc=back(cl(p))*s;x.save();x.translate(X,Y);x.scale(sc,sc);x.fillStyle='#2F6FED';x.shadowColor='rgba(0,0,0,0.3)';x.shadowBlur=16;x.beginPath();x.arc(0,0,92,0,7);x.fill();x.shadowColor='transparent';x.fillStyle='#fff';
 x.beginPath();x.roundRect(-52,-6,26,62,6);x.fill();x.beginPath();x.moveTo(-18,56);x.lineTo(-18,-4);x.lineTo(6,-52);x.quadraticCurveTo(22,-58,22,-38);x.lineTo(14,-10);x.lineTo(48,-10);x.quadraticCurveTo(62,-6,56,10);x.lineTo(44,48);x.quadraticCurveTo(40,58,28,58);x.closePath();x.fill();x.restore()}
function triGlow(a){if(a<=0)return;x.save();x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='lighter';[['255,153,51',560],['255,255,255',960],['19,136,8',1360]].forEach(([c,y])=>{const g=x.createRadialGradient(540,y,0,540,y,700);g.addColorStop(0,`rgba(${c},${0.22*a})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(0,0,W,H)});x.restore()}

// A 0-5.9 HOOK: night stadium, batter smashes a six, 204 (53) counter
function A_hook(t){sbStadium(t);cam(lerp(1.08,1.0,eo(t/1.2)),540,930);
 rot('flood',95,760,560,0,0.9);rot('flood',985,760,560,0,0.9,-1,1);
 shot(t,1.1,520,1000,820);
 headline('15 साल का तूफ़ान!',540,385,cl(t/0.3+0.7),104,'#FFE7B0');
 if(t>1.3){txt3d(`${count(0,204,(t-1.3)/1.6)}*`,800,600,150,(t-1.3)/0.3)}
 pill('53 गेंद',800,730,(t-2.0)/0.3,'#123466',GOLD,44);
 if(t>4.6)stamp('4 वर्ल्ड रिकॉर्ड',540,1300,(t-4.6)/0.6,-0.08)}
// B 5.9-9.54 flashback: stopwatch spins backwards, sepia
function B_flash(t){sbInk(t);cam(lerp(1.0,1.06,cl(t/3.6)),540,930);
 img('watch',540,820,620,1,cl(t/0.4+0.3));const S=IM.watch;const a=-t*9;x.save();x.translate(540,860);x.rotate(a);x.strokeStyle='#C8372D';x.lineWidth=8;x.lineCap='round';x.beginPath();x.moveTo(0,0);x.lineTo(0,-170);x.stroke();x.restore();
 for(let k=0;k<3;k++){x.save();x.globalAlpha=0.15;x.strokeStyle='#1E1A18';x.lineWidth=4;x.beginPath();x.arc(540,860,260+k*40,a*0.3+k,a*0.3+k+2);x.stroke();x.restore()}
 headline('पीछे की कहानी...',540,385,cl(t/0.35+0.4),104,'#1E1A18');label('दिल छू लेगी',540,1300,-0.03,(t-2.9)/0.35,52)}
// C 9.54-15.31 village Samastipur, 9-year-old practicing in backyard net (Madhubani)
function C_village(t){sbMadhubani(t);cam(lerp(1.0,1.04,cl(t/5.8)),540,930);
 if(t<2.7){img('fieldcard',540,820,560,cl(t/0.4+0.2),cl((t-0.3)/0.6));pill('समस्तीपुर, बिहार',540,1180,(t-0.5)/0.3,'#fff','#B8262B',46)}
 else{const tt=t-2.7;img('net',600,870,860,1,1);const sw=tt>1.2;shadowAt(560,1270,130,0.35);rot(sw?'boyb':'boya',560,960,620,0,cl(tt/0.3));
  if(sw&&tt<2.2){const q=(tt-1.2);rot('ball',lerp(600,900,q),lerp(980,600,q),36,q*10);ring(620,960,q/0.7,'#B8262B',2,150)}
  label('9 साल',300,600,-0.06,(tt-0.2)/0.3,58);if(tt>1.8)pill('पिता का सपना',540,1360,(tt-1.8)/0.3,'#fff','#2E7A4A',46)}
 headline('एक छोटा सा गाँव',540,385,cl(t/0.35+0.3),100,'#1E1A18')}
// D 15.31-22.07 train to Patna, 100 km, every other day (Ukiyo-e)
function D_train(t){sbUkiyo(t);cam(1,540,930);
 const tx=lerp(1500,-700,cl(t/6.5));const by=Math.sin(t*12)*2;rot('train',tx,1180+by,230,0,1);
 x.save();x.strokeStyle='#2C2420';x.lineWidth=6;x.beginPath();x.moveTo(0,1300);x.lineTo(W,1300);x.stroke();for(let X=-((t*300)%80);X<W;X+=80){x.fillStyle='#5a3b1a';x.fillRect(X,1302,40,12)}x.restore();
 for(let i=0;i<5;i++){const q=((t*0.6+i/5)%1);x.save();x.globalAlpha=0.5*(1-q);x.fillStyle='#fff';x.beginPath();x.arc(tx-560+q*-40,1060-q*260,30+q*60,0,7);x.fill();x.restore()}
 const wb=Math.abs(Math.sin(t*5))*10;shadowAt(330,1050,120,0.3);rot('walk',330,780-wb,560,Math.sin(t*5)*0.015,cl(t/0.4));
 const kmP=cl((t-1.6)/2.2);x.save();x.strokeStyle='#C8452F';x.lineWidth=6;x.setLineDash([16,12]);x.beginPath();x.moveTo(620,700);x.lineTo(620+340*eo(kmP),700);x.stroke();x.restore();
 pill('समस्तीपुर',620,640,(t-1.4)/0.3,'#fff','#2C4E78',36);if(kmP>0.95)pill('पटना',960,640,(t-3.6)/0.3,'#fff','#2C4E78',36);
 if(t>1.6)txt3d(`${count(0,100,(t-1.6)/2.2)} km`,790,790,96,(t-1.6)/0.3,'#F4ECD8','#7a2a1a',10);
 pill('हर दूसरे दिन',790,520,(t-0.4)/0.3,'#fff','#C8452F',42);
 headline('रोज़ का सफ़र',540,385,cl(t/0.35+0.3),110,'#2C2420');
 if(t>4.5)label('दिन भर प्रैक्टिस',760,960,0.04,(t-4.5)/0.3,42)}
// E 22.07-29.15 mother up at 4 AM; father says he sold land (Ink Wash)
function E_sacrifice(t){sbInk(t);cam(lerp(1.0,1.05,cl(t/7)),540,930);
 if(t<4.6){const cx=760,cy=700,R=170,p=eo(cl(t/0.5));x.save();x.translate(cx,cy);x.scale(p,p);x.fillStyle='#FAF7F0';x.strokeStyle='#1E1A18';x.lineWidth=10;x.beginPath();x.arc(0,0,R,0,7);x.fill();x.stroke();
   for(let i=0;i<12;i++){const a=i/12*6.283;x.lineWidth=i%3?3:7;x.beginPath();x.moveTo(Math.sin(a)*R*0.82,-Math.cos(a)*R*0.82);x.lineTo(Math.sin(a)*R*0.94,-Math.cos(a)*R*0.94);x.stroke()}
   const hr=4/12*6.283,mn=(t*0.4)%6.283;x.lineCap='round';x.lineWidth=12;x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(hr)*R*0.5,-Math.cos(hr)*R*0.5);x.stroke();x.lineWidth=7;x.strokeStyle='#B32A22';x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(mn)*R*0.75,-Math.cos(mn)*R*0.75);x.stroke();x.restore();
  img('tiffin',330,900,560,cl(t/0.4+0.3),cl((t-0.3)/0.6));if(t>0.4){for(let i=0;i<3;i++){const q=((t*0.5+i/3)%1);x.save();x.globalAlpha=0.35*(1-q);x.strokeStyle='#555';x.lineWidth=5;x.beginPath();x.moveTo(300+i*30,620-q*160);x.quadraticCurveTo(330+i*30+Math.sin(q*6)*30,560-q*160,300+i*30,500-q*160);x.stroke();x.restore()}}
  pill('सुबह 4 बजे',760,930,(t-0.5)/0.3,'#fff','#1E1A18',48);headline('माँ की मेहनत',540,385,cl(t/0.35+0.3),108,'#1E1A18')}
 else{const tt=t-4.6;img('fieldcard',540,820,560,1,1);const f=eo(cl((tt-1.2)/1.2));
  if(f>0){x.save();x.fillStyle=`rgba(238,235,228,${0.55*f})`;x.fillRect(240,600,600,440);x.restore()}
  headline('ज़मीन तक बेच दी',540,385,cl(tt/0.35+0.3),100,'#B32A22');pill('पिता के मुताबिक़',540,1180,(tt-0.4)/0.3,'#fff','#1E1A18',40)}}
// F 29.15-39.91 fastest 100 history: de Villiers 31 (ODI 2015) -> Fraser-McGurk 29 (List A 2023) (Blueprint)
function F_race100(t){bpBG();DARKBG=true;cam(1,540,930);
 headline('सबसे तेज़ शतक',540,385,cl(t/0.35+0.3),104,BPW);
 rot('watch',880,610,220,0,cl(t/0.3));rot('bat',520,1320,560,1.2+Math.sin(t*1.5)*0.05,cl((t-0.5)/0.4));rot('ball',800,1250,80,t*2,cl((t-0.7)/0.4));
 bars(t,[{name:'एबी डिविलियर्स',sub:'दक्षिण अफ़्रीका · वनडे · 2015',v:31,col:'#7FA7D9',at:2.4},{name:'जेक फ्रेज़र-मैकगर्क',sub:'ऑस्ट्रेलिया · लिस्ट-ए · 2023',v:29,col:'#96D7FF',at:7.3}],760,34)}
// G 39.91-42.88 Vaibhav 28 balls! (Anime speed lines + shot)
function G_28(t){sbAnime(t);cam(lerp(1.1,1.0,eo(t/0.5)),540,930);shot(t,0.25,470,980,840);
 txt3d('28',800,640,220,(t-0.45)/0.3,'#FFD65A','#8a3a00',16);pill('गेंदों में शतक!',800,800,(t-0.8)/0.3,'#fff',RED,48);
 headline('नया वर्ल्ड रिकॉर्ड',540,385,cl(t/0.3+0.4),100,RED)}
// H 42.88-47.22 sixes: D'Arcy Short 23 (2018) vs Vaibhav 28 (stadium, ball grid)
function H_sixes(t){sbStadium(t,0.8);cam(1,540,930);
 headline('छक्कों का रिकॉर्ड',540,385,cl(t/0.35+0.3),100,'#FFE7B0');
 const grid=(n,y0,col,at)=>{for(let i=0;i<n;i++){const q=cl((t-at-i*0.05)/0.25);if(q<=0)continue;const c=i%7,r=Math.floor(i/7);x.save();x.globalAlpha=q;rot('ball',220+c*108,y0+r*96,lerp(10,74,back(q)),0);x.restore()}};
 if(t>0.3){pill('डार्सी शॉर्ट · ऑस्ट्रेलिया · 2018',540,560,(t-0.3)/0.3,'#fff','#2C4E78',38);grid(23,660,0,0.5);if(t>1.8)txt3d('23',900,920,90,(t-1.8)/0.3,'#cfd8e6','#3a4a66',8)}
 if(t>2.6){pill('वैभव सूर्यवंशी · 2026',540,1060,(t-2.6)/0.3,'#123466',GOLD,40);grid(28,1150,0,2.8);txt3d(`${count(0,28,(t-2.8)/1.4)}`,900,1420,110,(t-3.2)/0.3)}}
// I 47.22-55.38 fastest 200: Bowes 103 (List A 2024), Brook 114 (ODI Oct 2026) (Paper cut-out)
function I_race200(t){sbPapercut(t);DARKBG=false;cam(1,540,930);
 headline('सबसे तेज़ दोहरा शतक',540,385,cl(t/0.35+0.3),90,'#1E1A18');
 bars(t,[{name:'चैड बोवेस',sub:'न्यूज़ीलैंड · लिस्ट-ए · 2024',v:103,col:'#6B8F3E',at:0.9,tc:'#1E1A18'},{name:'हैरी ब्रुक',sub:'इंग्लैंड · वनडे · अक्टूबर 2026',v:114,col:'#2C4E78',at:4.5,tc:'#1E1A18'}],640,114);
 rot('watch',880,1200,240,Math.sin(t*2)*0.05,cl((t-0.5)/0.3))}
// J 55.38-58.7 whisper: only 52 (dark spotlight)
function J_52(t){DARKBG=true;cam(lerp(1.0,1.08,cl(t/3.3)),540,930);x.save();x.setTransform(1,0,0,1,0,0);x.fillStyle='#07070c';x.fillRect(0,0,W,H);x.restore();
 const sp=x.createRadialGradient(540,860,40,540,860,700);sp.addColorStop(0,'rgba(255,240,200,0.35)');sp.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=sp;x.fillRect(-200,-200,1480,2400);
 txt3d(`${count(114,52,(t-0.8)/1.4)}`,540,820,300,(t-0.6)/0.4,'#FFD65A','#7a4a00',20);
 pill('गेंद · दोहरा शतक',540,1050,(t-1.6)/0.3,'#123466',GOLD,46);
 headline('वैभव ने...',540,385,(t-0.1)/0.5,110,'#FFE7B0');if(t>2.4)label('आधे से भी कम!',540,1250,-0.03,(t-2.4)/0.3,52)}
// K 58.7-62.95 fastest 150: broke his own 59-ball record -> 40 (Stained glass)
function K_150(t){sbStained(t);cam(1,540,930);
 headline('सबसे तेज़ 150',540,385,cl(t/0.35+0.3),104,'#FFE7B0');
 const m=count(59,40,(t-1.4)/1.4);txt3d(`${m}`,540,800,260,(t-0.4)/0.4,'#FFD65A','#7a4a00',18);pill('गेंद',540,980,(t-0.6)/0.3,'#fff','#5B3A8C',46);
 if(t>1.0){x.save();x.globalAlpha=cl((t-1.0)/0.3);x.font='54px Rozha';x.fillStyle='rgba(255,231,176,0.7)';x.textAlign='center';x.fillText('पहले: 59 गेंद (उन्हीं का)',540,1140);x.restore();if(t>2.8){x.save();x.strokeStyle=RED;x.lineWidth=8;x.beginPath();x.moveTo(250,1125);x.lineTo(250+580*eo(cl((t-2.8)/0.4)),1125);x.stroke();x.restore()}}
 if(t>3.0)label('खुद को ही हराया!',540,1300,0.03,(t-3.0)/0.3,52)}
// L 62.95-66.85 emotional: son for whom land was sold, now India's pride
function L_pride(t){sbStadium(t,0.6);cam(lerp(1.0,1.05,cl(t/3.9)),540,930);
 const f=cl((t-1.4)/1.2);if(f<1){x.save();x.globalAlpha=1-f;rot('walk',540,880,600,0);x.restore()}
 if(f>0){x.save();x.globalAlpha=f;shadowAt(540,1290,170);rot('batter',540,900,760,0);x.restore();glowAt(560,700,520,f)}
 triGlow(cl((t-2.2)/1.0));
 headline('भारत की शान',540,385,cl((t-2.2)/0.4),118,'#FFE7B0');if(t<2.2)label('जिस बेटे के लिए ज़मीन बिकी...',540,1330,-0.02,(t-0.2)/0.3,40)}
// M 66.85-end CTA: like + Jai Hind + subscribe
function M_cta(t){cam(1,540,930);img('trophy',300,820,520,1,1);glowAt(300,700,320,0.6+0.2*Math.sin(t*3));
 likeIcon(760,700,1,(t-0.4)/0.35);if(t>0.8)ring(760,700,(t-0.8)/0.9,'#2F6FED',2,200);
 headline('एक लाइक वैभव के लिए!',540,385,cl(t/0.3+0.3),88,RED);
 commentBox(480,1080,(t-4.9)/0.4,'जय हिंद!');subscribeBtn(480,1300,(t-6.4)/0.4,t)}
const SC=[[0,A_hook],[5.9,B_flash],[9.54,C_village],[15.31,D_train],[22.07,E_sacrifice],[29.15,F_race100],[39.91,G_28],[42.88,H_sixes],[47.22,I_race200],[55.38,J_52],[58.7,K_150],[62.95,L_pride],[66.85,M_cta]];
function isBP(fn,tt){return fn===A_hook||fn===F_race100||fn===H_sixes||fn===J_52||fn===K_150||fn===L_pride}
