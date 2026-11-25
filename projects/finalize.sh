#!/bin/bash
# run inside a project dir: mux, end card, QA numbers, 0.5 s frame sheets
set -e
EC=../../template/common/BhooleKisse_Endcard_Final.mp4
ffmpeg -y -v error -i video_noaudio.mp4 -i audio_mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 44100 -ac 2 -shortest _main.mp4
ffmpeg -y -v error -i $EC -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 44100 -ac 2 _ec.mp4
printf "file '_main.mp4'\nfile '_ec.mp4'\n" > _list.txt
ffmpeg -y -v error -f concat -safe 0 -i _list.txt -c copy final.mp4
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration,size -of compact final.mp4
ffmpeg -i final.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
echo -n "first2s "; ffmpeg -t 2 -i final.mp4 -af volumedetect -f null - 2>&1 | grep max_volume
echo -n "all "; ffmpeg -i final.mp4 -af volumedetect -f null - 2>&1 | grep max_volume
echo -n ">6k "; ffmpeg -i final.mp4 -af "highpass=f=6000,volumedetect" -f null - 2>&1 | grep mean_volume
echo -n "silences>1.2s: "; ffmpeg -i final.mp4 -af silencedetect=noise=-45dB:d=1.2 -f null - 2>&1 | grep -c silence_start || true
rm -rf rv && mkdir rv && ffmpeg -v error -i final.mp4 -vf "fps=2,scale=216:384" rv/f_%03d.jpg
python3 - <<'PY'
import glob
from PIL import Image,ImageDraw
fs=sorted(glob.glob('rv/f_*.jpg'));w,h=216,384;cols=10
for part in range(0,len(fs),40):
  sub=fs[part:part+40];S=Image.new('RGB',(cols*w,((len(sub)+cols-1)//cols)*(h+18)),(20,20,20));d=ImageDraw.Draw(S)
  for i,f in enumerate(sub):
    k=part+i;X,Y=(i%cols)*w,(i//cols)*(h+18);S.paste(Image.open(f),(X,Y+18));d.text((X+4,Y+3),f"{k*0.5:.1f}s",fill=(255,255,0))
  S.save(f'rv_{part//40}.jpg',quality=82)
PY
ls rv_*.jpg
