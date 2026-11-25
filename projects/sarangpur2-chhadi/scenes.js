// ---------------- Sarangpur part 2: छड़ी छूते ही हिल उठी मूर्ति ----------------
function ring(cx,cy,t,col=GOLD,n=3,R=220){if(t<0||t>1.4)return;x.save();for(let k=0;k<n;k++){const q=t-k*0.18;if(q<0||q>1)continue;x.strokeStyle=col;x.globalAlpha=(1-q)*0.9;x.lineWidth=6*(1-q)+1;x.beginPath();x.arc(cx,cy,30+q*R,0,7);x.stroke()}x.restore()}
function sparks(cx,cy,t,col=GOLD,n=16){if(t<0||t>1.2)return;x.save();for(let i=0;i<n;i++){const a=i/n*6.283+0.3,r=40+t*260;x.globalAlpha=(1-t/1.2);x.fillStyle=col;x.beginPath();x.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,6*(1-t/1.2)+2,0,7);x.fill()}x.restore()}
function glowAt(cx,cy,r,a,col='255,214,90'){if(a<=0)return;x.save();x.globalCompositeOperation='lighter';const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${col},${0.55*a})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.fillRect(cx-r,cy-r,2*r,2*r);x.restore()}
function shakeOff(t,amp){return amp>0?Math.sin(t*47)*amp+Math.sin(t*31+1)*amp*0.5:0}

// A 0-6.06 hook (Shadow Puppet): saint's staff touches murti, murti trembles
function A_hook(t){sbPuppet(t);cam(lerp(1.0,1.05,cl(t/6)),540,930);
 const tr=t>5.0?Math.exp(-(t-5.0)*0.9)*10:0,sx=shakeOff(t,tr);
 img('murti',600+sx,900,860,1,cl((t+0.3)/0.7));
 rot('lamp_puppet',190,1180,430,0,cl(t/0.4));glowAt(190,990,260,0.7+0.2*Math.sin(t*9));
 const sp=eo(cl((t-2.3)/0.8));rot('staff_ink',lerp(-150,330,sp),lerp(520,760,sp),640,lerp(-1.1,-0.62,sp),cl((t-2.2)/0.3));
 if(t>3.15){ring(470,820,(t-3.15)/0.9,'#FFF0C0',3);sparks(470,820,(t-3.15),'#FFE7A0')}
 if(t>5.0){ring(600,900,(t-5.0)/0.8,'#FFF0C0',2,320)}
 headline('छड़ी का चमत्कार?',540,385,cl(t/0.35+0.7),98,'#FFE7B0');
 if(t>5.05)label('मूर्ति हिल उठी!',740,1330,-0.04,(t-5.05)/0.3,48)}
// B 6.06-9.93 Sarangpur, Kashtabhanjan Hanuman (Vox paper)
function B_place(t){cam(lerp(1.04,1.0,eo(t/0.6)),540,930);ground(1220,cl(t/0.5));
 img('mandir',540,900,560,cl(t/0.35+0.3),cl((t-0.35)/0.7));
 headline('सारंगपुर',540,385,cl(t/0.35+0.4),118);
 label('बोटाद, गुजरात',300,560,-0.05,(t-0.9)/0.3,44);
 if(t>2.2){pill('कष्टभंजन हनुमान',540,1330,(t-2.2)/0.3,'#fff',BLUE,48);circ(540,820,330,220,(t-2.4)/0.7)}}
// C 9.93-14.92 question: what happened to that staff?
function C_q(t){cam(1,540,930);const fl=Math.sin(t*2.2)*14;
 rot('staff',540,820+fl,680,0.18+Math.sin(t*1.3)*0.04,cl(t/0.3));
 headline('छड़ी का क्या हुआ?',540,385,cl(t/0.3+0.3),96,RED);
 label('?',800,640,0.12,(t-0.6)/0.3,120);label('?',290,760,-0.12,(t-0.9)/0.3,90);
 commentBox(540,1080,(t-2.1)/0.4,'मुझे पता है...');
 const r=(t-3.9)/0.4;if(r>0){x.save();x.fillStyle='rgba(30,25,22,0.9)';x.fillRect(0,1190,W,220*eo(r));x.restore();headline('असली राज़',540,1345,(t-4.05)/0.4,120,'#E8C26A')}}
// D 14.92-20.77 Samvat 1905, Gopalanand Swami (Miniature)
function D_hist(t){sbMiniature(t);cam(lerp(1.0,1.05,cl(t/5.8)),540,930);
 const rise=eo(cl(t/0.6));x.save();x.translate(0,lerp(220,0,rise));img('mandir_miniature',540,760,440,cl(t/0.5),cl((t-0.4)/0.8));x.restore();
 const y=count(1800,1905,(t-0.2)/1.0);pill(`संवत ${y}`,540,1120,(t-0.2)/0.3,'#fff','#8E2A22',58);
 headline('संवत १९०५',540,385,(t-1.1)/0.45,104,'#F3D58A');
 label('संत गोपालानंद स्वामी',540,1260,0.02,(t-1.9)/0.35,46);
 if(t>4.9)label('उनके बताए रूप में मूर्ति',540,1380,-0.02,(t-4.9)/0.35,40)}
// E 20.77-27.94 Pran pratishtha: touch with staff, life enters murti (Stained Glass)
function E_life(t){sbStained(t);cam(lerp(1.0,1.06,cl(t/7)),540,930);
 const tr=t>6.05?Math.exp(-(t-6.05)*1.2)*7:0;
 img('murti',590+shakeOff(t,tr),900,880,cl(t/0.4+0.2),cl((t-0.3)/0.6));
 const sp=eo(cl((t-2.3)/0.9));rot('staff',lerp(-120,330,sp),lerp(560,800,sp),620,lerp(-1.0,-0.6,sp),cl((t-2.2)/0.3));
 if(t>3.3){ring(470,860,(t-3.3)/0.9,'#9CE6FF',3);sparks(470,860,t-3.3,'#BFF0FF')}
 const L=cl((t-6.05)/0.9);if(L>0){glowAt(590,860,620,L*(0.85+0.15*Math.sin(t*6)));ring(590,880,(t-6.05)/1.0,'#FFE7A0',3,380)}
 headline('प्राण प्रतिष्ठा',540,385,cl(t/0.4+0.2),108,'#FFE7B0');
 if(t>3.85)pill('मान्यता है',300,1330,(t-3.85)/0.3,'#fff','#5B3A8C',42);
 if(t>6.1)label('मूर्ति में जान!',760,1330,0.04,(t-6.1)/0.3,48)}
// F 27.94-35.01 staff still part of tradition; touch removes troubles (Ink Wash)
function F_staff(t){sbInk(t);cam(lerp(1.0,1.05,cl(t/7)),540,930);
 const sp=eo(cl(t/0.7));img('staff_ink',540,880,lerp(700,900,sp),cl(t/0.5+0.2),cl((t-0.3)/0.6));
 headline('आज भी परंपरा',540,385,cl(t/0.4+0.2),104,'#1E1A18');
 label('संस्था दंड',780,640,0.06,(t-1.4)/0.35,46);
 if(t>4.3){ring(560,560,(t-4.3)/0.9,'#B32A22',3);arrow(820,1000,600,600,(t-4.3)/0.4)}
 if(t>5.5){pill('कष्ट दूर',320,1240,(t-5.5)/0.3,'#fff','#B32A22',52)}}
// G 35.01-41.25 unique: Swaminarayan temple with Hanuman as main deity (Madhubani)
function G_unique(t){sbMadhubani(t);cam(lerp(1.0,1.04,cl(t/6)),540,930);
 img('garbha',540,880,820,cl(t/0.5+0.2),cl((t-0.3)/0.7));
 headline('अनोखा मंदिर',540,385,cl(t/0.4+0.2),112,'#1E1A18');
 pill('स्वामीनारायण संप्रदाय',540,560,(t-1.35)/0.3,'#fff','#2E7A4A',44);
 if(t>4.1){circ(540,850,250,330,(t-4.1)/0.7);pill('मुख्य मूर्ति: हनुमान जी',540,1340,(t-4.2)/0.3,'#fff','#B8262B',46)}}
// H 41.25-43.2 whisper: today's wonder (dark, flickering lamp)
function H_whisper(t){DARKBG=true;cam(lerp(1.0,1.08,cl(t/2)),540,930);x.save();x.setTransform(1,0,0,1,0,0);x.fillStyle='#120c08';x.fillRect(0,0,W,H);x.restore();
 const f=0.85+0.15*Math.sin(t*11)*Math.sin(t*3.7);glowAt(540,700,700,f);
 rot('lamp',540,940,760,0,cl(t/0.3));
 headline('आज का कमाल...',540,385,(t-0.6)/0.5,108,'#FFE7B0')}
// I 43.2-50.46 2023, 54 ft statue built with 3D printer + CNC (Blueprint)
function I_build(t){bpBG();DARKBG=true;cam(1,540,930);
 const top=480,bot=1300,AX=900,ft=(bot-top)/54,h=bot-top;
 const S=IM.statue_sk,I=IM.statue;
 const bp=cl((t-0.6)/3.2);// layers build bottom->top
 if(S){const w=S.width*h/S.height;x.save();x.globalAlpha=0.5;x.filter='invert(1) brightness(1.2)';x.drawImage(S,430-w/2,top,w,h);x.filter='none';x.restore();
  if(I&&bp>0){const yy=bot-h*bp;x.save();x.beginPath();x.rect(0,yy,W,bot-yy+4);x.clip();x.globalAlpha=0.95;x.drawImage(I,430-w/2,top,w,h);x.restore();
   x.save();x.strokeStyle=GOLD;x.shadowColor=GOLD;x.shadowBlur=20;x.lineWidth=5;x.beginPath();x.moveTo(430-w/2-20,yy);x.lineTo(430+w/2+20,yy);x.stroke();x.restore()}}
 x.save();x.strokeStyle=BPW;x.lineWidth=3;const yt=lerp(bot,top,eo(cl((t-1.3)/0.8)));x.beginPath();x.moveTo(AX,bot);x.lineTo(AX,yt);x.stroke();for(let f=0;f<=54;f+=9){const y=bot-f*ft;if(y<yt)continue;x.beginPath();x.moveTo(AX,y);x.lineTo(AX-22,y);x.stroke()}x.restore();
 pill(`${count(0,54,(t-1.3)/1.0)} फ़ीट`,AX-30,top-45,(t-1.3)/0.3,'#123466',GOLD,44);
 pill('2023',780,620,(t-0.5)/0.3,'#123466',SKY,52);
 headline('चौवन फ़ीट',540,385,cl((t-1.4)/0.4),104,BPW);
 if(t>3.9){const p=eo(cl((t-3.9)/0.5));x.save();x.globalAlpha=0.95;rot('printer3d',lerp(-300,230,p),1100,330,0);x.restore();pill('3D प्रिंटर',230,1310,(t-4.1)/0.3,'#123466',GOLD,38)}
 if(t>4.9){const p=eo(cl((t-4.9)/0.5));rot('cnc',lerp(1400,800,p),1130,300,0);pill('CNC मशीन',800,1310,(t-5.1)/0.3,'#123466',GOLD,38);
  if(t>5.4){x.save();x.fillStyle='#FFE7A0';for(let i=0;i<6;i++){const q=((t*3+i/6)%1);x.globalAlpha=1-q;x.beginPath();x.arc(800+Math.sin(i*2)*40*q,1080-q*60,4,0,7);x.fill()}x.restore()}}}
// J 50.46-55.2 earthquake: seismograph waves, statue stands firm for 5000 years (Ukiyo-e)
function J_quake(t){sbUkiyo(t);const q=t>1.2&&t<3.3?Math.sin((t-1.2)/2.1*Math.PI):0;
 cam(1,540+shakeOff(t,q*9),930);
 img('statue_ukiyo',560,820,780,cl(t/0.4+0.3),cl((t-0.3)/0.6));
 x.save();x.strokeStyle='#C8452F';x.lineWidth=5;x.beginPath();const n=Math.floor(cl(t/3.4)*100);for(let i=0;i<=n;i++){const X=60+i*9.6,a=(i>30&&i<75?Math.sin((i-30)/45*Math.PI):0)*90,Y=1215+Math.sin(i*1.7)*a*Math.sin(i*0.6+1);i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.restore();
 rot('seismo',870,1080,250,0,cl((t-0.5)/0.3));
 headline('भूकंप में भी',540,385,cl(t/0.35+0.4),110,'#2C2420');
 const y=count(0,5000,(t-2.1)/1.1);if(t>2.1)pill(`${y} साल`,330,560,(t-2.1)/0.3,'#fff','#2C4E78',58);
 if(t>3.4)stamp('सुरक्षित',560,1350,(t-3.4)/0.6,-0.12)}
// K 55.2-end CTA
function K_cta(t){cam(1,540,930);img('statue',540,740,640,1,1,0.98);
 headline('क्या आपको पता था?',540,385,cl(t/0.35+0.3),92,RED);
 commentBox(480,1080,(t-0.9)/0.4,'हाँ, पता था!');subscribeBtn(480,1300,(t-3.9)/0.4,t)}
const SC=[[0,A_hook],[6.06,B_place],[9.93,C_q],[14.92,D_hist],[20.77,E_life],[27.94,F_staff],[35.01,G_unique],[41.25,H_whisper],[43.2,I_build],[50.46,J_quake],[55.05,K_cta]];
function isBP(fn,tt){return fn===I_build||fn===A_hook||fn===E_life||fn===D_hist||fn===H_whisper}
