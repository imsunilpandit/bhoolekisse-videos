#!/bin/bash
# usage: qa.sh <projdir> <final.mp4>
cd "$1";F="$2";mkdir -p qa
echo "== probe";ffprobe -v error -show_entries stream=width,height,r_frame_rate -show_entries format=duration,size -of compact "$F"
echo "== loudness";ffmpeg -i "$F" -af ebur128=peak=true -f null - 2>&1 | grep -A12 "Summary" | grep -E "I:|Peak|LRA:"
echo "== voice vs ducked music";for f in vo_n.wav duck_only.wav;do echo -n "$f ";ffmpeg -i $f -af ebur128 -f null - 2>&1 | grep -A3 Summary | grep "I:" ;done
echo "== first2s max";ffmpeg -t 2 -i "$F" -af volumedetect -f null - 2>&1 | grep max_volume
echo "== rest max";ffmpeg -ss 2 -i "$F" -af volumedetect -f null - 2>&1 | grep max_volume
echo "== >6k mean";ffmpeg -i "$F" -af highpass=f=6000,volumedetect -f null - 2>&1 | grep mean_volume
echo "== silences>1.2";ffmpeg -i "$F" -af silencedetect=noise=-45dB:d=1.2 -f null - 2>&1 | grep -o "silence_start: [0-9.]*\|silence_duration: [0-9.]*"
ffmpeg -y -v error -i "$F" -vf "fps=2,scale=216:384,tile=10x4" qa/sheet_%02d.jpg;ls qa
