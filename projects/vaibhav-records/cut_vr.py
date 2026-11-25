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
def cutc(f,n,crop_l=0):
    im=Image.open(f'{SRC}/{f}').convert('RGB')
    if crop_l:
        a=np.array(im);a[:,:crop_l]=255;im=Image.fromarray(a)
    p=f'/tmp/_c_{n}.png';im.save(p);cut(p,n)
for f,n,c in [('01_modern_bat.png','bat',0),('02_white_ball.png','ball',0),('03_stopwatch.png','watch',0),('04_scoreboard.png','board',0),('05_village_train.png','train',0),('06_tiffin.png','tiffin',0),('07_village_field.png','field',0),('08_backyard_net.png','net',0),('09_floodlight.png','flood',0),('10_trophy.png','trophy',0),('11_batter_shot.png','batter',0)]:
    cutc(f,n,c)
