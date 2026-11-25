#!/bin/bash
# usage: mix.sh MUSIC_VOL SFX_VOL
set -e
MV=${1:-0.5}; FV=${2:-0.5}; D=$3
ffmpeg -y -v error -i voice.wav -i music.wav -i sfx.wav -filter_complex "\
[0:a]aformat=channel_layouts=stereo,aresample=44100,apad=whole_dur=$D,asplit=4[vo][sc1][sc2][vo2];\
[1:a]volume=${MV}[m0];[m0][sc1]sidechaincompress=threshold=0.015:ratio=12:attack=15:release=400[mu];\
[2:a]volume=${FV}[f0];[f0][sc2]sidechaincompress=threshold=0.03:ratio=4:attack=10:release=250[fx];\
[mu]asplit=2[mu1][mu2];[fx]asplit=2[fx1][fx2];\
[vo][mu1][fx1]amix=inputs=3:duration=first:normalize=0,highshelf=f=7000:g=-3,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=44100[a]" \
 -map "[a]" -t $D audio_mix.wav \
 -map "[mu2]" -t $D stem_music.wav -map "[fx2]" -t $D stem_sfx.wav -map "[vo2]" -t $D stem_voice.wav
for f in stem_voice stem_music stem_sfx audio_mix; do printf "%-12s " $f; ffmpeg -i $f.wav -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+I:" | tail -1; done
