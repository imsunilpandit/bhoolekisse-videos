#!/bin/bash
# splice.sh <dir> <F0>
cd "$1";T=$(python3 -c "print($2/30)")
ffmpeg -y -v error -i video_noaudio.mp4 -i seg.mp4 -filter_complex "[0:v]trim=end_frame=$2,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[o]" -map "[o]" -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p -r 30 video_spliced.mp4
mv video_noaudio.mp4 video_old.mp4 && mv video_spliced.mp4 video_noaudio.mp4
ffprobe -v error -count_frames -select_streams v -show_entries stream=nb_read_frames -of csv=p=0 video_noaudio.mp4
