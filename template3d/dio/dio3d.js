import * as THREE from './three/build/three.module.js';
const W=1080,H=1920,FOV=30,D0=(19.2/2)/Math.tan(FOV/2*Math.PI/180);
const cv=document.createElement('canvas');cv.width=W;cv.height=H;
const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,preserveDrawingBuffer:true});
R.setPixelRatio(1);R.setSize(W,H,false);R.outputColorSpace=THREE.SRGBColorSpace;
R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const S=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(FOV,W/H,1,300);
const amb=new THREE.HemisphereLight(0xffffff,0xd8c8b0,2.1);S.add(amb);
const dir=new THREE.DirectionalLight(0xfff0dc,1.5);dir.position.set(-9,16,24);dir.castShadow=true;
dir.shadow.mapSize.set(2048,2048);Object.assign(dir.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:1,far:80});dir.shadow.bias=-0.0008;dir.shadow.radius=4;
S.add(dir);S.add(dir.target);
const spring=t=>t<=0?0:1-Math.exp(-7*t)*Math.cos(11*t);
const cl=v=>Math.max(0,Math.min(1,v));
function tex(img){const t=new THREE.Texture(img);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;t.needsUpdate=true;return t}
const f=z=>(D0-z)/D0;
const EM={};function edgeMat(map,k){const key=map.uuid+k;if(!EM[key])EM[key]=new THREE.MeshLambertMaterial({map,color:new THREE.Color().setHSL(.08,.35,.55-.07*k),transparent:true,alphaTest:.45,side:THREE.DoubleSide});return EM[key]}
let BLOBT=null;function blobTex(){if(BLOBT)return BLOBT;const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');const r=g.createRadialGradient(128,128,10,128,128,128);r.addColorStop(0,'rgba(0,0,0,.55)');r.addColorStop(.6,'rgba(0,0,0,.25)');r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(0,0,256,256);BLOBT=new THREE.CanvasTexture(c);return BLOBT}
const SEG=12;
function bend(m,l,lag,dur=.6){const pos=m.geometry.attributes.position,h=m.userData.h,tw=m.userData.tw;
  let y=0,zz=0;const pts=[[0,0]];
  for(let i=0;i<SEG;i++){const s=(i+.5)/SEG;const p=spring((l-s*lag)/dur);const a=-(1-p)*Math.PI/2;y+=Math.cos(a)*h/SEG;zz+=-Math.sin(a)*h/SEG;pts.push([y,zz])}
  for(let i=0;i<pos.count;i++){const row=SEG-Math.floor(i/2);const [yy,z2]=pts[row];pos.setY(i,yy);pos.setZ(i,z2);pos.setX(i,(i%2?.5:-.5)*tw*1.004)}
  pos.needsUpdate=true;m.geometry.computeVertexNormals();m.geometry.computeBoundingSphere()}
function tiled(par,img,wpx,z,cols,opt={}){
  const k=f(z),W0=wpx/100*k,H0=W0*img.height/img.width,map=tex(img),tw=W0/cols;
  const root=new THREE.Group();root.userData={w:W0,h:H0,k,z,tiles:[],tiled:1};
  const mat=new THREE.MeshLambertMaterial({map,transparent:true,alphaTest:.45,side:THREE.DoubleSide});
  const dm=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,map,alphaTest:.45});
  for(let c=0;c<cols;c++){
    const geo=new THREE.PlaneGeometry(tw*1.004,H0,1,SEG);const uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++)uv.setX(i,(c+uv.getX(i))/cols);
    const m=new THREE.Mesh(geo,mat);m.castShadow=opt.cast!==false;m.receiveShadow=true;m.customDepthMaterial=dm;
    if(opt.thick!==false){for(let k=1;k<=4;k++){const e=new THREE.Mesh(geo,edgeMat(map,k));e.position.z=-.028*k;e.castShadow=false;e.receiveShadow=true;m.add(e)}}
    m.position.x=-W0/2+tw*(c+.5);m.userData={c,h:H0,tw};root.add(m);root.userData.tiles.push(m);bend(m,0,0)}
  // paper back (darker) for thickness
  par.add(root);return root}
function animTiled(g,l,mode,o={}){const T=g.userData.tiles,n=T.length,mid=(n-1)/2,st=o.st??.06,lag=o.lag??.16;
  T.forEach(m=>{const d=Math.abs(m.userData.c-mid)*st,ll=l-d;
    if(mode==='drop'){m.visible=ll>0;const p=spring(ll/.5);bend(m,9,0);m.position.y=(1-p)*(3.6+m.userData.c%2*.5);m.rotation.z=(1-p)*.3*(m.userData.c<mid?1:-1);m.rotation.x=0}
    else{const show=ll>0||g.userData.flat;m.visible=show;m.position.y=0;m.rotation.z=0;bend(m,ll,lag)}});
  g.visible=true}
function place(g,xpx,bypx,z){const k=f(z);g.position.set((xpx-540)/100*k,(960-bypx)/100*k,z);g.userData.base=g.position.clone()}
function slice(img,y0,y1){const c=document.createElement('canvas');c.width=img.width;c.height=Math.max(2,Math.round(y1-y0));c.getContext('2d').drawImage(img,0,y0,img.width,y1-y0,0,0,img.width,y1-y0);return c}
const SETS={};
function snapTo(gs,GY,G){const d=GY-gs[0].userData.base.y;gs.forEach(g=>{g.position.y+=d;g.userData.base.y+=d});
  const g0=gs[0],w=(g0.userData.w||2)*1.15;const b=new THREE.Mesh(new THREE.PlaneGeometry(w,Math.max(.9,w*.28)),new THREE.MeshBasicMaterial({map:blobTex(),transparent:true,depthWrite:false}));
  b.rotation.x=-Math.PI/2;b.position.set(g0.position.x,GY+.012,g0.position.z+.15);G.add(b);g0.userData.blob=b}
function floorTex(bg,y,hh){const c=document.createElement('canvas');c.width=1080;c.height=hh;c.getContext('2d').drawImage(bg,0,y,1080,hh,0,0,1080,hh);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.MirroredRepeatWrapping;t.repeat.set(3,6);return t}
// cfg: {bg:img, floorY, slab:{color,top,y}, layers:[{k,img,w,x,by,z,cols,mode,t0,bands,flat,fx}]}
function addSet(name,cfg){const G=new THREE.Group();S.add(G);const L={};
  const bgk=f(-9)*1.25,bgw=10.8*bgk,bgh=19.2*bgk;
  const bt=tex(cfg.bg);bt.wrapS=THREE.MirroredRepeatWrapping;bt.repeat.set(3,1);bt.offset.set(-1,0);const bg=new THREE.Mesh(new THREE.PlaneGeometry(bgw*3,bgh),new THREE.MeshBasicMaterial({map:bt}));bg.position.set(0,cfg.bgY??-0.6,-9);G.add(bg);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshLambertMaterial({map:floorTex(cfg.bg,cfg.floorY??1500,420)}));fl.rotation.x=-Math.PI/2;const GY=cfg.groundBy!==undefined?(960-cfg.groundBy)/100*f(0):-6.4;fl.position.set(0,GY,12);fl.receiveShadow=true;G.add(fl);
  if(cfg.slab){const s=cfg.slab,k0=f(0),by=(960-s.by)/100*k0;const top=new THREE.MeshLambertMaterial({color:s.top||s.color}),side=new THREE.MeshLambertMaterial({color:s.color});
    const land=new THREE.Mesh(new THREE.BoxGeometry(s.w||13,0.22,s.d||3.4),[side,side,top,side,side,side]);land.position.set(0,by-0.11,s.z??0.2);land.receiveShadow=true;land.castShadow=true;G.add(land);L._slab=land}
  for(const o of cfg.layers){
    if(o.mode==='band'){ // hero split into horizontal bands: lower rise, upper drop
      const n=o.bands||6,ih=o.img.height,rise=o.rise??.45,px=o.w/o.img.width,parts=[];
      const cuts=o.cuts||[...Array(n+1)].map((_,i)=>ih*(1-i/n));
      for(let i=0;i<n;i++){const y1=cuts[i],y0=cuts[i+1],cv2=slice(o.img,y0,y1);const isRise=(i/n)<rise;
        const zz=(o.z||0)+(isRise?.0:.02*i)-(isRise?.0:0);
        const g=tiled(G,cv2,o.w,zz,isRise?(o.cols||7):Math.max(1,(o.cols||7)-2-(i===n-1?3:0)));
        place(g,o.x,o.by-(ih-y1)*px,zz);g.userData.t0=(o.t0||0)+i*(o.step||.28);g.userData.mode=isRise?'rise':'drop';if(i===0&&o.flat)g.userData.flat=1;parts.push(g)}
      if(cfg.groundBy!==undefined&&o.snap!==false)snapTo(parts,GY,G);L[o.k]={band:1,parts,o};continue}
    if(o.mode==='card'||o.mode==='spr'){const k=f(o.z),w=o.w/100*k,h=w*o.img.height/o.img.width,map=tex(o.img);
      const g=new THREE.Group(),m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map,transparent:true,alphaTest:.4,side:THREE.DoubleSide}));
      m.position.y=o.mode==='spr'?0:h/2;m.castShadow=o.cast!==false;for(let k=1;k<=3;k++){const e=new THREE.Mesh(m.geometry,edgeMat(map,k));e.position.z=-.03*k;m.add(e)}m.customDepthMaterial=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,map,alphaTest:.4});g.add(m);g.userData={w,h,k,z:o.z};G.add(g);place(g,o.x,o.by,o.z);
      if(o.mode==='spr'){g.position.y+=0;}
      if(cfg.groundBy!==undefined&&o.snap!==false)snapTo([g],GY,G);L[o.k]={g,o};continue}
    const g=tiled(G,o.img,o.w,o.z,o.cols||6);place(g,o.x,o.by,o.z);if(o.flat)g.userData.flat=1;if(cfg.groundBy!==undefined&&o.snap!==false)snapTo([g],GY,G);L[o.k]={g,o}}
  SETS[name]={G,L,cfg}}
function animLayer(g,l,mode){if(g.userData.tiled){g.position.copy(g.userData.base);g.rotation.set(0,0,0);animTiled(g,l,mode);return}
  if(mode==='drop'){g.visible=l>0;const p=spring(l/.55);g.position.copy(g.userData.base);g.position.y+=(1-p)*4.2;g.rotation.set(0,0,(1-p)*.25)}
  else if(mode==='pop'){g.visible=l>0;const p=spring(l/.6);g.position.copy(g.userData.base);g.scale.setScalar(Math.max(.001,p));g.rotation.set(0,0,0)}
  else{g.position.copy(g.userData.base);g.scale.setScalar(1);const p=spring(l/.55);g.visible=l>0||!!g.userData.flat;g.rotation.set(-(1-p)*Math.PI/2,0,0)}}
// P: {set,lt,t,cam:{az,el,dist,lx,ly,lz},fold,sp,over:{k:{dx,dy,dz,rx,ry,rz,s,hide,l}}}
function render(P){const lt=P.lt,sp=P.sp||1,fold=P.fold||0,over=P.over||{};
  for(const n in SETS)SETS[n].G.visible=(n===P.set);const st=SETS[P.set];
  let ord=0;const all=[];
  for(const k in st.L){if(k==='_slab')continue;const it=st.L[k],o=it.o;const gs=it.band?it.parts:[it.g];
    gs.forEach((g,i)=>{const mode=it.band?g.userData.mode:(o.mode==='card'||o.mode==='spr'?(o.anim||'rise'):(o.anim||'rise'));const t0=it.band?g.userData.t0:(o.t0||0);
      let l=(lt-t0*sp)/Math.max(sp,.6);if(over[k]&&over[k].l!==undefined)l=over[k].l;
      if(fold>0){g.visible=true;if(g.userData.tiled)animTiled(g,99,mode);g.position.copy(g.userData.base);g.scale.setScalar(1);const fo=(it.band?gs.length-i:0)+(o.fo||0);const p=cl(fold*1.4-fo*.06);g.rotation.set(-p*Math.PI/2,0,0)}
      else animLayer(g,l,mode);
      if(o.fx==='bob'){g.position.y+=Math.sin(P.t*2.2+(o.x||0))*.05}
      if(o.fx==='flow'){g.position.x+=Math.sin(P.t*1.3)*.12}
      if(o.fx==='sway'){g.rotation.z+=Math.sin(P.t*1.1+(o.x||0))*.03}
      if(g.userData.blob){const b=g.userData.blob;b.visible=g.visible&&!(over[k]&&over[k].hide);b.position.x=g.position.x+((over[k]&&over[k].dx)||0);const up=fold>0?1-cl(fold*1.4):1;b.material.opacity=g.visible?Math.min(1,Math.abs(Math.cos(g.rotation.x)))*up:0;b.scale.setScalar(Math.max(.01,g.scale.x))}
      const ov=over[k];if(ov){if(ov.hide)g.visible=false;g.position.x+=ov.dx||0;g.position.y+=ov.dy||0;g.position.z+=ov.dz||0;g.rotation.x+=ov.rx||0;g.rotation.y+=ov.ry||0;g.rotation.z+=ov.rz||0;if(ov.s!==undefined)g.scale.setScalar(Math.max(.001,ov.s))}})}
  if(st.L._slab){st.L._slab.scale.set(1,1,Math.max(.01,fold>0?1-cl(fold*1.3):1))}
  const C=P.cam||{},sx=(P.shake||0)*(Math.sin(P.t*61)+Math.sin(P.t*37))*.09,sy=(P.shake||0)*Math.sin(P.t*53)*.06;
  const dist=D0*(C.dist||1),el=C.el||0,az=C.az||0,look=new THREE.Vector3(C.lx||0,C.ly||0,C.lz||0);
  cam.position.set(look.x+Math.sin(az)*Math.cos(el)*dist+sx,look.y+Math.sin(el)*dist+sy,look.z+Math.cos(az)*Math.cos(el)*dist);
  cam.lookAt(look);cam.updateProjectionMatrix();R.render(S,cam);return cv}
function project(set,k,fy=.5){const it=SETS[set].L[k];const g=it.band?it.parts[Math.floor(it.parts.length/2)]:it.g;const v=new THREE.Vector3();g.getWorldPosition(v);v.y+=(g.userData.h||0)*fy*(it.band?0:1);v.project(cam);return [(v.x+1)/2*W,(1-v.y)/2*H]}
window.D3={addSet,render,project,SETS,D0};window.dispatchEvent(new Event('d3ready'));
