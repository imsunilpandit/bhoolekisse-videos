V=video_silent.mp4;VO=voice.wav;MU=music.wav;EC=BhooleKisse_Endcard_Final.mp4;OUT=final.mp4
ffmpeg -y -v error -i "$VO" -i "$MU" -filter_complex "[0:a]aformat=channel_layouts=stereo,aresample=44100,apad,asplit=2[vo][sc];[1:a]volume=0.6[mu];[mu][sc]sidechaincompress=threshold=0.015:ratio=12:attack=15:release=400[duck];[duck]asplit=2[d1][d2];[d1][vo]amix=inputs=2:duration=first:normalize=0,highshelf=f=7000:g=-3,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=44100[a]" -map "[a]" -t 47.34 mixed.wav -map "[d2]" -t 47.34 duck_only.wav
ffmpeg -y -v error -i "$V" -i mixed.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 44100 -ac 2 -shortest _main.mp4
ffmpeg -y -v error -i "$EC" -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 44100 -ac 2 _ec.mp4
printf "file '_main.mp4'\nfile '_ec.mp4'\n" > _list.txt
ffmpeg -y -v error -f concat -safe 0 -i _list.txt -c copy "$OUT"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of compact "$OUT"
ffmpeg -nostats -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
ffmpeg -nostats -t 2 -i "$OUT" -af volumedetect -f null - 2>&1 | grep max_volume
ffmpeg -nostats -i "$OUT" -af volumedetect -f null - 2>&1 | grep max_volume
ffmpeg -nostats -i "$OUT" -af "highpass=f=6000,volumedetect" -f null - 2>&1 | grep mean_volume
echo silences: $(ffmpeg -nostats -i "$OUT" -af silencedetect=noise=-45dB:d=1.2 -f null - 2>&1 | grep -c silence_start)
for f in voice.wav duck_only.wav; do echo $f $(ffmpeg -nostats -i $f -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1); done
