---
name: "bhoole-kisse-shorts"
description: "Use when making, checking, fixing or uploading a Bhoole Kisse (भूले किस्से) Hindi YouTube Short: research, script, ElevenLabs voice with emotion tags, three.js 3D + 2.5D animation synced to the script, original music, self-QA, metadata, upload."
---

# Bhoole Kisse Shorts

Channel: **भूले किस्से / Bhoole Kisse** (@BhooleKisse, bhoolekisse@gmail.com). Hindi Shorts on forgotten stories from all over India (temples, lost cities, kings & legends, nature mysteries) in random mix, not only Gujarat. Talk to the user in Hinglish. Brand: deep purple/maroon + gold, logo = open book with a flame. Brand assets (logo, banner, watermark, 2.5 s end card) were made in an earlier chat; if missing, rebuild them locally in the same style.

## One-command automation
When the user says "video banao" (or a scheduled run fires), do everything end to end without stopping: pick topic -> research -> script -> voice -> 2.5D video -> music -> self-QA + fixes -> SEO title/description/tags -> thumbnail frame -> host file -> upload to YouTube scheduled at the next peak slot -> report the link and schedule. Target: 2 videos per day.
- Peak slots (audience is India, IST): 12:30 IST and 19:30 IST. Each video is uploaded as private with publish_at set to the next free slot, so YouTube makes it public at that time. Once Windsor analytics show different peak hours, use those instead.
- Keep a log file topics_done.md (topic, date, slot, video id, views later) so topics never repeat and styles/moods rotate.
- Credits: about 450-650 per voice; 2 per day is about 36k/month on the Creator plan.

## Hard rules
- ElevenLabs: ONLY the narration voice. generations_count = 1 always (default is 2, override). Never retry a generation. Say the credit cost after.
- Never generate images/video/music/SFX in ElevenLabs. All visuals and all music/SFX are made locally in code.
- In automation mode (user said "video banao" or a scheduled run), do not stop for script approval; otherwise show the script first.
- Uploads are always private + scheduled publish_at (never instantly public). Facts must be sourced; if a topic cannot be verified, pick another topic instead of guessing.

## 0. CURRENT STYLE: 3D + 2.5D (user-approved direction 2026-11-24; replaces the Hasanamba card style)
User feedback 2026-11-24: wants real 3D (three.js) mixed with 2.5D animation, visuals that follow the script word by word (things appear and animate exactly when they are said), NO talking diya mascot, and a voice with emotion/tone.
Working template: repo imsunilpandit/bhoolekisse-videos, folder template3d/ (scene3d_src.html, render3d.py, tighten.py, three/ = three.js r160, README.md). Reuse musicgen.py, logo and end card from template/. Worked example: the Bali Jatra content inside scene3d_src.html and videos/2026-11-24_bali-jatra-3d-demo.mp4.
Per video, edit only the TOPIC CONTENT block of scene3d_src.html: HEAD (headline per line), HITS (2-3 impact words for shake), G.* 3D groups, SHOTS (one per script line).
- Mix: at least 4 three.js 3D shots per video (low-poly original models built from primitives: boats, temples, mountains, maps with extruded land, globes, doors, lamps, rivers with moving water, coins, scrolls...) with a moving camera (dolly, orbit, crane, follow); the other shots are 2.5D parallax (D(depth,fn) layers) incl. one pattern-interrupt style (shadow puppet, miniature, blueprint, ukiyo-e...). Never two identical shot types in a row.
- Word-sync rule: every object, label, number, pin, stamp or icon enters at at(line,'word') of the word that names it (pop/rise/draw-on/count-up), and something new must happen every 1-2 s. Labels can be pinned on 3D objects with scr()/mscr().
- Frame: thin progress bar (one segment per line), big gold headline per line at y~330, full-bleed 3D/2.5D visual, word-by-word Hindi caption pill at y~1400 (current word gold), small @BhooleKisse pill with logo bottom-right inside the safe zone. NO mascot, no terminal tag line, no boxed card panel.
- Frame 0 = thumbnail: hook headline + strong 3D visual already visible at t=0.
- Vary 3D models, colours, camera moves, pattern-interrupt style and music mood between videos (inauthentic-content rule).
- Rendering: python3 render3d.py stills <times> (contact sheet) then python3 render3d.py video. Chrome flags --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist; WebGLRenderer needs preserveDrawingBuffer:true. About 2-3 min for 45 s. Fonts: npm pack @fontsource/baloo-2@5.3.0 @fontsource/poppins@5.3.0 into fonts/.
- The old paper cut-out style (Kailasa) and the Hasanamba card+mascot style are retired.

## 0b. Topic research like viral channels
Before writing: check vidIQ pages (vidiq.com/youtube-stats/channel/@<handle>/videos/index.md) of niche channels like @mysterioushindu and @dailydecoding, find high outlier-score titles, and copy the FORMULA, not the content: weird specific number + "क्यों/कैसे" question + once-a-year/hidden mystery, "99% लोग नहीं जानते" style curiosity. Prefer timely topics (festival or event that just happened). Only pick a topic whose "raaz" (the answer/explanation) can be told from sources - the video must answer its own hook. Structure: see section 2 (hook -> kya aapko pata hai? comment -> kissa -> RAAZ reveal -> takeaway -> CTA).

## 1. Topic & facts
- Random pan-India mix; first frame must be a strong curiosity hook. Check analytics (Windsor youtube connector) when available and lean toward what retained best.
- Research with web search; every fact needs a source. Legends phrased "कहते हैं". Avoid unverifiable claims, politics, communal angles, gore, medical claims.

## 2. Script (Hindi, Devanagari, target 35-50 s spoken) - KNOWLEDGE FIRST
User rule 2026-11-24: the channel is "Bhoole Kisse", so every video must TELL the forgotten story and REVEAL the secret, so the viewer learns something. Never end on an unanswered question (the Bali Jatra video did that - wrong).
Fixed structure (one script line each, blank line between lines):
1. Hook (line 1): the weird specific fact/number, no slow intro. "35 मिनट में 22,000 नावें!"
2. Engagement question (line 2-3, early, drives comments): "क्या आपको पता है ऐसा क्यों होता है? / क्या आप ये जानते थे? अपना जवाब कमेंट में लिखिए... और अब सुनिए असली राज़।"
3. The kissa (2-3 lines): place, era, who, what happened - the forgotten story with sourced facts.
4. RAAZ reveal (2-3 lines): "राज़ ये है कि..." - the actual answer/explanation (history, science, engineering, tradition) from sources. Legends stay "कहते हैं", but always also give the sourced explanation; if experts disagree, say so in one line ("इतिहासकार मानते हैं...").
5. Takeaway (1 line): the one knowledge nugget to remember / share.
6. CTA: "क्या आपको ये पहले से पता था? कमेंट में बताइए... और ऐसे ही भूले किस्सों के लिए, अभी सब्सक्राइब करें!"
- Visuals: the RAAZ lines get the strongest explainer shots (3D diagram/cutaway/route/mechanism showing HOW), headline "राज़: ..." style.
- Description: include the raaz in 1-2 lines too, with sources.
- Numbers: normal written form is fine for eleven_v4; use words where Hindi reading could be ambiguous.

## 3. Voice (with tone)
- Voice "Vikas - Cinematic Documentary Narrator" (voice_id RKDbtFhfwlGmWOOvIXyK), model eleven_v4, generations_count 1, never retry.
- Write the script WITH eleven_v4 audio tags so the delivery has emotion. A tag holds until the next one, so change tags only where the mood changes (3-6 tags per script): hook [excited] or [surprised]; facts [curious] or [warmly]; legend lines [softly] or [whispers]; engagement question [curious] + [pause]; kissa [softly] or [warmly]; RAAZ reveal [dramatically]; takeaway [warmly]; CTA [warmly]. Use ... and — for pauses and CAPITALS sparingly for one key word. Tags describe how it is spoken, never actions. Remove the tags from the caption texts in tighten.py.
- Wait ~25 s, one creative_get_flow_run_status call (poll again only if still generating), curl the content_url.
- Tighten gently so the tone survives: silencedetect (noise -38dB, d 0.3), cut segments (+-0.06 s pad), rejoin with 0.22 s gaps inside a line and 0.42 s between lines, atempo 1.03 (template3d/tighten.py). Keep a deliberate [pause] after the engagement question and before "राज़ ये है". Record each line's start time; these drive the shots.

## 4. Visuals
See section 0 (3D + 2.5D, template3d/). General rules that still apply:
- Shorts safe zone: keep all text and key art between y 220 and y 1500 and x 60-900 (YouTube UI covers the bottom ~380 px and right ~150 px).
- Text: Baloo2 800 with dark stroke, pop-in; first text visible from frame 1. Avoid glyphs outside Baloo2 (e.g. arrows) - they fall back to another font.
- Original art only: no copyrighted characters, logos, film/TV stills, real-person likeness, or copies of real artworks. Deities as simple original figures. No brand logos (e.g. draw a generic "विश्व रिकॉर्ड" certificate, not the Guinness logo).

## 5. Music & SFX (original, copyright-free)
- Generate with the musicgen.py recipe below: tanpura drone + warm pad chords + santoor/sitar-like Karplus-Strong melody + soft tabla groove + gentle risers into cuts + soft low impacts on reveal moments. Moods: mystery (default), devotional, epic.
- NO loud bells/chimes at the start (user found them harsh). Keep high frequencies soft.
- Mix with sidechain ducking under the voice, loudnorm -14 LUFS, true peak -1.5 dB (mix_qa.sh below).
- Music must stay LOW so the narration is always clear (user complained he could only hear the music). Proven settings: voice loudnorm -15 LUFS first; music volume 0.5 into sidechaincompress threshold 0.015 ratio 12 attack 15 release 400; final loudnorm -14. QA: export the ducked music alone and measure it; it must be 20-24 LU below the voice (Hasanamba: voice -16.0, music -38.6). Never ship without this measurement.

## 6. Self-QA loop (watch + listen + fix before delivering)
Watch:
- Render stills at the busiest moment of every scene into one contact sheet and Read it. Check: text not overlapping art, Devanagari shaping correct, nothing outside the safe zone, hook text visible at t=0.3 s, transitions not glitchy, end card present.
Listen (numbers from mix_qa.sh):
- Integrated loudness -13 to -16 LUFS; true peak <= -1.0 dB.
- First 2 s max_volume should not jump above the rest (no harsh hit at start).
- >6 kHz mean below about -38 dB (no shrill sound).
- No silence > 1.2 s.
- Final duration = voice + end card; resolution 1080x1920, 30 fps.
If any check fails, fix the scene/mix and re-run only that part, then QA again. Report what was checked.

## 7. YouTube rules
- Inauthentic content: vary topics, art styles, special moments, music moods and structure between videos; every video needs real researched info. Template clones with little variation can lose monetization.
- AI disclosure: stylized animation does not need it, but the narration is an AI-generated realistic voice, so tick "Altered or synthetic content / AI use: Yes" to be safe.
- Made for kids: No. No misleading titles/thumbnails; hook must match the content.
- Description: credit sources line; Poly Haven assets are CC0 (credit optional), fonts are OFL.

## 8. SEO metadata & thumbnail
- Keyword first: search the topic's common Hindi + English search phrases (e.g. "kailash mandir ellora rahasya"), put the main keyword in the first 40 characters of the title.
- Title (<70 chars): curiosity hook in Hindi + main keyword + 1 emoji + #shorts. Must be true to the video (no clickbait the video doesn't deliver; YouTube policy).
- Description: first line = keyword-rich hook; then 2-3 Hindi lines of facts with place/era; legend note; comment question; subscribe line; Sources: line; 4-6 hashtags (#भूलेकिस्से #BhooleKisse + topic tags). No tag stuffing in description.
- Tags: 10-15 mixed Hindi/English/Hinglish variants of the place, deity, era, "rahasya", "history", "bhoole kisse", "hindi shorts".
- Thumbnail: Shorts mostly use a frame, so design frame 0 as a thumbnail (big 2-4 word Hindi text, high contrast subject, gold on dark). Also export thumbnail.jpg (1080x1920) from that frame for manual use; there is no thumbnail action in the upload connector.
- Category: 27 Education. made_for_kids false. AI disclosure: Yes (AI voice) - remind the user to tick it in Studio if the API cannot set it.
## 9. Upload & schedule
- Windsor connector youtube upload_video needs a public video_url (<=100 MB). Host the final mp4 at the place the user approved (see topics_done.md header for the hosting method), then call upload_video with title, description, tags, category_id 27, made_for_kids false, privacy_status private, publish_at = next slot (ISO 8601 with +05:30).
- After upload, report: video id/link, scheduled time (IST and UK time), credits used, QA numbers.
- The user will NOT upload anything manually (said 2026-11-24). If the Zapier upload fails: try Windsor youtube upload_video once; if that also fails, keep the mp4 in videos/, mark it "pending upload" in topics_done.md and tell the user what failed (no manual-upload request). At the start of every run, first try to upload pending videos into the next free slots (oldest first), then make the new video for the next free slot; never put two videos in the same slot.
- Zapier 429 (Too Many Requests) was returned repeatedly on 2026-11-24 after one successful upload; do not loop retries inside a run.
- Known issue (2026-11-23): Windsor upload_video returned "YouTube rate-limited the upload" 6 times on the trial plan. Try once; if rate-limited, do not loop: send the file + metadata for manual upload. Never upload the old Kailasa video (user rejected it).
- Chrome file_upload is limited to ~3.8 MB, so it cannot upload a Short.

## musicgen.py
```python
import sys, numpy as np, wave
SR=44100
out,DUR=sys.argv[1],float(sys.argv[2])
cuts=[float(x) for x in sys.argv[3].split(',') if x] if len(sys.argv)>3 else []
hits=[float(x) for x in sys.argv[4].split(',') if x] if len(sys.argv)>4 else []
mood=sys.argv[5] if len(sys.argv)>5 else 'mystery'
N=int(SR*DUR);t=np.arange(N)/SR;rng=np.random.default_rng(7);L=np.zeros(N);R=np.zeros(N)
midi=lambda m:440*2**((m-69)/12);ROOT=50
SCALE={'mystery':[0,1,3,5,7,8,10],'devotional':[0,2,4,5,7,9,11],'epic':[0,2,3,5,7,8,10]}[mood]
CHORDS={'mystery':[[0,3,7],[-4,0,3],[-2,2,5],[0,3,7]],'devotional':[[0,4,7],[5,9,12],[7,11,14],[0,4,7]],'epic':[[0,3,7],[-4,0,3],[-5,-2,2],[-2,2,5]]}[mood]
beat=60/84;bar=beat*4
def env(n,a,r):
    e=np.ones(n);ai=int(a*SR);ri=int(r*SR)
    if ai:e[:ai]=np.linspace(0,1,ai)
    if ri:e[-ri:]*=np.linspace(1,0,ri)
    return e
def add(s,st,gl=1,gr=1):
    i=int(st*SR)
    if i>=N:return
    n=min(len(s),N-i);L[i:i+n]+=s[:n]*gl;R[i:i+n]+=s[:n]*gr
def lp(x,a):
    y=np.zeros_like(x);c=0.
    for i in range(len(x)):c+=a*(x[i]-c);y[i]=c
    return y
def tan(f,d=3.):
    n=int(d*SR);tt=np.arange(n)/SR
    return sum((.5/k)*np.sin(2*np.pi*f*k*tt+k)*(1+.25*np.sin(2*np.pi*.6*k*tt)) for k in range(1,7))*np.exp(-tt/2.4)
for k,st in enumerate(np.arange(0,DUR,.8)):add(tan([midi(ROOT-5),midi(ROOT),midi(ROOT),midi(ROOT-12)][k%4])*.045,st,.9 if k%2 else 1,1 if k%2 else .9)
for bi,st in enumerate(np.arange(0,DUR,bar*2)):
    n=int(bar*2*SR);tt=np.arange(n)/SR;s=np.zeros(n)
    for iv in CHORDS[bi%4]:
        for det in(-.12,.12):
            ff=midi(ROOT+12+iv)*2**(det/12);s+=sum((.6/h)*np.sin(2*np.pi*ff*h*tt) for h in range(1,6))
    add(lp(s*env(n,1.2,1.2),.08)*.022,st,1,.95)
def pluck(f,d=1.,b=.45):
    p=int(SR/f);buf=rng.uniform(-1,1,p);n=int(d*SR);o=np.zeros(n)
    for i in range(n):o[i]=buf[i%p];buf[i%p]=.996*(b*buf[i%p]+(1-b)*buf[(i+1)%p])
    return o*env(n,.002,.3)
motif=[0,2,3,2,4,3,1,0]
for ph,st in enumerate(np.arange(bar,DUR-bar,bar*2)):
    sh=[0,2,-1,3][ph%4]
    for j,dg in enumerate(motif):
        if (j+ph)%3==2:continue
        d=(dg+sh)%len(SCALE);o=12 if dg+sh>=len(SCALE) else 0
        add(pluck(midi(ROOT+12+SCALE[d]+o))*.10,st+j*beat/2,.8+.2*(j%2),1-.2*(j%2))
def dha():
    n=int(.35*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*(70+60*np.exp(-tt*18))*tt)*np.exp(-tt/.12)
def na():
    n=int(.12*SR);tt=np.arange(n)/SR;return np.sin(2*np.pi*620*tt)*np.exp(-tt/.03)*.6+rng.uniform(-1,1,n)*np.exp(-tt/.01)*.15
for k,st in enumerate(np.arange(bar,DUR-.5,beat/2)):
    p=k%8
    if p in(0,5):add(dha()*.16,st)
    if p in(2,3,6,7):add(na()*.07,st,.85,1)
noise=rng.uniform(-1,1,N)
for c in cuts:
    n=int(.6*SR);s=int((c-.6)*SR)
    if s>=0:add(lp(noise[s:s+n],.05)*np.linspace(0,1,n)**2*.35,c-.6,.9,1)
for h in hits:
    n=int(1.2*SR);tt=np.arange(n)/SR;add(np.sin(2*np.pi*(48+40*np.exp(-tt*6))*tt)*np.exp(-tt/.5)*.35,h)
f=np.clip(t/.3,0,1)*np.clip((DUR-t)/1.5,0,1);L*=f;R*=f
st=np.tanh(np.stack([L,R],1)*1.4)/np.tanh(1.4);st=st/(np.abs(st).max()+1e-9)*.7
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype(np.int16).tobytes());w.close()
```
Run: `python3 musicgen.py music.wav <voice_dur> "<scene cut times>" "<hit times>" mystery`

## mix_qa.sh
```bash
V=$1;VO=$2;MU=$3;EC=$4;OUT=$5
ffmpeg -y -v error -i "$V" -i "$VO" -i "$MU" -filter_complex "[1:a]aformat=channel_layouts=stereo,aresample=44100,apad,asplit=2[vo][sc];[2:a]volume=0.55[mu];[mu][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350[duck];[duck][vo]amix=inputs=2:duration=first:normalize=0,highshelf=f=7000:g=-3,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=44100[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 44100 -ac 2 -shortest _main.mp4
ffmpeg -y -v error -i "$EC" -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -ar 44100 -ac 2 _ec.mp4
printf "file '_main.mp4'\nfile '_ec.mp4'\n" > _list.txt
ffmpeg -y -v error -f concat -safe 0 -i _list.txt -c copy "$OUT"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of compact "$OUT"
ffmpeg -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
ffmpeg -t 2 -i "$OUT" -af volumedetect -f null - 2>&1 | grep max_volume
ffmpeg -i "$OUT" -af "highpass=f=6000,volumedetect" -f null - 2>&1 | grep mean_volume
ffmpeg -i "$OUT" -af silencedetect=noise=-45dB:d=1.2 -f null - 2>&1 | grep -c silence_start
```

## Render tips
- 3D template: use template3d/render3d.py (it adds the SwiftShader flags and builds scene.html from timing.json, so DUR always matches).
- Playwright python + /usr/bin/google-chrome: page.evaluate(render(t)) then canvas.toDataURL('image/jpeg',0.92) piped to ffmpeg image2pipe mjpeg, libx264 veryfast crf 19 yuv420p, 30 fps. Check the DUR variable really matches (a past render came out the wrong length).
- Blender photoreal is possible on the user's PC (MCP for Blender, Poly Haven CC0) but it has no GPU (~10 s/frame); use it only for a 3-5 s wow shot rendered in advance. Never call read_factory_settings: it unloads the MCP addon.