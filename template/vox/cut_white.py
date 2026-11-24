import sys,os,numpy as np,cv2
sys.path.insert(0,'/home/claude/tools')
from PIL import Image
import make_cutouts as M   # reuses engrave/sticker/sketch (module runs nothing on import? guard below)
from rembg import remove,new_session
SRC,OUT=sys.argv[1],sys.argv[2];os.makedirs(OUT,exist_ok=True);M.OUT=OUT
sess=new_session('isnet-general-use')
def cut(path,name,card=False,border=14):
    im=Image.open(path).convert('RGB')
    a=np.array(im)
    if card:
        rgba=im.convert('RGBA')
    else:
        m=np.array(remove(im,session=sess,only_mask=True,post_process_mask=True)).astype(np.float32)
        nw=(a.min(2)<236).astype(np.uint8)*255          # not near-white -> keeps holes transparent
        nw=cv2.morphologyEx(nw,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
        nw=cv2.GaussianBlur(nw,(0,0),0.8)
        al=np.minimum(cv2.dilate(m.astype(np.uint8),np.ones((5,5),np.uint8)),nw)
        n,lab,st,_=cv2.connectedComponentsWithStats((al>60).astype(np.uint8))
        big=[i for i in range(1,n) if st[i,cv2.CC_STAT_AREA]>st[1:,cv2.CC_STAT_AREA].max()*0.02]
        al=np.where(np.isin(lab,big),al,0).astype(np.uint8)
        rgba=Image.fromarray(np.dstack([a,al]),'RGBA')
    M.save_set(name,rgba,border)
for f,n,c in [('01_wheel.png','wheel',0),('02_temple.png','temple',0),('03_wheel_rim_closeup.png','rim',1),('04_horse.png','horse',0),('05_surya_chariot.png','surya',0),('06_ship.png','ship',0),('07_compass.png','compass',0),('08_lodestone.png','lodestone',0)]:
    cut(f'{SRC}/{f}',n,bool(c))
