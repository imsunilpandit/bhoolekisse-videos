#!/bin/bash
# usage: mix.sh <projdir> <outname>
set -e;cd "$1";D=$(python3 -c "import json;print(json.load(open('events.json'))['T']['end'])")
ffmpeg -y -v error -i voice_tight.wav -af "apad,atrim=0:$D,loudnorm=I=-15:TP=-2:LRA=11,aresample=44100" -ac 2 vo_n.wav
ffmpeg -y -v error -i music.wav -i vo_n.wav -filter_complex "[0:a]volume=${MV:-1.0}[m];[m][1:a]sidechaincompress=threshold=0.015:ratio=12:attack=15:release=400[d]" -map "[d]" duck_only.wav
ffmpeg -y -v error -i sfx.wav -af "volume=0.6,highshelf=f=6000:g=-5" sfx_g.wav
ffmpeg -y -v error -i vo_n.wav -i duck_only.wav -i sfx_g.wav -filter_complex "[0:a][1:a][2:a]amix=inputs=3:normalize=0,highshelf=f=7000:g=-3,loudnorm=I=-14:TP=-2:LRA=11,alimiter=limit=0.8:level=0,aresample=44100" -ac 2 mix.wav
ffmpeg -y -v error -i video_noaudio.mp4 -i mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest _main.mp4
EC=/home/claude/bhoolekisse-videos/template/common/BhooleKisse_Endcard_Final.mp4
ffmpeg -y -v error -i $EC -vf "scale=1080:1920,fps=30,format=yuv420p" -c:v libx264 -preset veryfast -crf 19 -c:a aac -b:a 192k -ar 44100 -ac 2 _ec.mp4
printf "file '_main.mp4'\nfile '_ec.mp4'\n" > _l.txt
ffmpeg -y -v error -f concat -safe 0 -i _l.txt -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k "$2"
echo done "$2"
