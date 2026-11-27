import sys,json,shutil,pathlib,os
v=sys.argv[1];E=pathlib.Path(__file__).parent;D=pathlib.Path(f'/home/claude/four/p{v}')
tpl=(E/'page_tpl.html').read_text()
html=tpl.replace('/*HELPERS*/',(E/'helpers.js').read_text()).replace('/*CUES*/',json.dumps(json.load(open(D/'cues.json')),ensure_ascii=False)).replace('/*SCENES*/',(D/'scenes.js').read_text())
(D/'scene.html').write_text(html)
for n in ['dio3d.js','render.py']:shutil.copy(E/n,D/n)
for n in ['fonts','three']:
  if not (D/n).exists():os.symlink(E/n if n=='fonts' else '/home/claude/rp/scene/three',D/n)
im=D/'img';im.mkdir(exist_ok=True);shutil.copy(E/'logo.png',im/'logo.png')
for f in pathlib.Path(f'/home/claude/four/cut{v}').glob('*.png'):shutil.copy(f,im/f.name)
from PIL import Image
Image.open(f'/home/claude/four/img/v{v}_bg.png').convert('RGB').resize((1080,1920),Image.LANCZOS).save(im/'bg.jpg',quality=93)
print('built',D/'scene.html')
