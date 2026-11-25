import sys,glob
from PIL import Image,ImageDraw
fs=sorted(glob.glob(sys.argv[1]));cols=int(sys.argv[3]) if len(sys.argv)>3 else 7;w,h=270,480
S=Image.new('RGB',(cols*w,((len(fs)+cols-1)//cols)*(h+24)),(30,30,30));d=ImageDraw.Draw(S)
for i,f in enumerate(fs):
  im=Image.open(f).resize((w,h));X,Y=(i%cols)*w,(i//cols)*(h+24);S.paste(im,(X,Y+24));d.text((X+6,Y+4),f.split('/')[-1],fill=(255,255,0))
S.save(sys.argv[2],quality=85)
