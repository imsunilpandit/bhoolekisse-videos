# Bhoole Kisse — topics log

>>> LATEST (user, 2026-11-24 10:21 UK): NO AUTOMATION — scheduled video tasks are switched off; make videos only when the user asks in chat. Visuals = user's real photos cut out + pencil sketch -> real wipe (template/vox/make_cutouts.py, scene_photos.html).
>>> STYLE + UPLOAD OVERRIDE (user, 2026-11-24, older) — this beats any older instruction in the scheduled-task prompt or skill:
>>> - Style = 3D + 2.5D from template3d/ (three.js 3D shots + 2.5D parallax, everything enters on the word that names it). NO Kissa Diya mascot, no Hasanamba card style. Full rules: template3d/SKILL_bhoole-kisse-shorts.md + template3d/README.md.
>>> - Voice with emotion: eleven_v4 audio tags ([excited], [curious], [softly], [dramatically], [pause], [warmly]); tighten gently (atempo 1.03).
>>> - Script = KNOWLEDGE FIRST: hook -> "क्या आपको पता है...? कमेंट में लिखिए... और अब सुनिए असली राज़" -> kissa -> RAAZ reveal (sourced answer) -> takeaway -> CTA "क्या आपको ये पहले से पता था?". Never end on an unanswered question.
>>> - User will NOT upload manually. If Zapier fails, try Windsor once; else mark "pending upload" here (never send files for manual upload). Upload pending videos first at the next free slot; never two videos in one slot. Use the commit-SHA raw URL.

UPLOAD METHOD: Zapier YouTube upload_video (selected_api YouTubeV4CLIAPI, video = GitHub raw URL, privacy private + publish_at works). Windsor upload was rate-limited on 2026-11-23; use it only as the one fallback try after a Zapier failure (see override above).

Hosting: push final mp4 to videos/ in imsunilpandit/bhoolekisse-videos (main); public URL = https://raw.githubusercontent.com/imsunilpandit/bhoolekisse-videos/main/videos/<file>
Slots: 12:30 IST and 19:30 IST daily.

| date (IST) | slot | topic | style/mood | video id | notes |
|---|---|---|---|---|---|
| 2026-11-24 | 12:30 | Kailasa Mandir, Ellora (Maharashtra) | 2.5D paper cut-out + blueprint + miniature / mystery | (pending) | first video |

| 2026-11-24 | Hasanamba Temple, Hassan (new style) | 09:30 IST | bZFW422j8Jw (uploaded via Zapier) |

Note: Kailasa video rejected by user (boring, music too loud) - do not upload it.
| 2026-11-24 | Pushkar Brahma Mandir (Savitri shrap, Kartik Purnima) — new style | 12:30 IST | (not uploaded: Zapier 429) | file videos/2026-11-24_pushkar-brahma-mandir.mp4 sent to user for manual upload; 693 credits |
| 2026-11-24 | Bali Jatra, Cuttack (22,000 paper boats / sadhabas / Boita Bandana) — new style, epic mood | 12:30 IST attempted | (not uploaded: Zapier 429 x3 incl. 2 retries ~11:45 IST; user does NOT want manual uploads) | file videos/2026-11-24_bali-jatra-cuttack.mp4 sent to user for manual upload; 605 credits; voice -16.0 / music -38.1 LUFS |
Note: user (2026-11-24) will NOT upload manually. Zapier 429 seen repeatedly on 2026-11-24 after the Hasanamba upload - likely daily upload limit; pending files: pushkar + bali-jatra in videos/.
| 2026-11-25 | Lepakshi Hanging Pillar (cinematic 3D, viral edit) | 09:30 IST | sLzo4gw3LcQ (manual upload by user) |
| 2026-11-24 | Sarangpur Kashtbhanjan Hanuman (Shani stri roop, 54 ft King of Salangpur) — Vox paper style with user's own photo cut-outs | PENDING UPLOAD — approved by user 2026-11-24; target 2026-11-25 12:30 IST | (Zapier throttled + Windsor rate-limited 10:15 UK) | file videos/2026-11-24_sarangpur-hanuman-vox.mp4; 1,106 credits; voice -15.3 / music -38.9 LUFS |
| 2026-11-25 | Brihadeeswarar 80-ton stone (Vox paper style) | PENDING UPLOAD — approved by user 2026-11-24; target 2026-11-25 19:30 IST | — | file videos/2026-11-25_brihadeeswarar-80-ton-stone.mp4; metadata projects/2026-11-25_brihadeeswarar/metadata.md |
Note (2026-11-24 10:15 UK): Pushkar + Bali Jatra files use the old diya-mascot + terminal-tag style the user later banned, and say 'आज' (24 Nov) — ask user before uploading them.
| 2026-11-24 | Konark wheel = sundial (₹10 note hook, 52-ton magnet myth) — Vox paper + blueprint, ChatGPT images cut out, local SFX | not scheduled (user decides) | — | file videos/2026-11-24_konark-wheel-clock.mp4; 928 credits; voice -15.7 / music -40.0 / sfx -31.9 LUFS |
| 2026-11-24 | Rani ki Vav (₹100 note stepwell, buried in silt) — Vox paper + blueprint, ChatGPT images | not scheduled (user decides) | — | file videos/2026-11-24_rani-ki-vav.mp4; 881 credits; voice -15.6 / music -38.8 / sfx -33.7 LUFS |
Note (2026-11-24 14:40 UK, from YouTube Data API): channel has 3 uploads — Hasanamba bZFW422j8Jw (public, 04:00 UTC, 16 views), Lepakshi sLzo4gw3LcQ (private, publishAt 2026-11-25 04:00 UTC = 09:30 IST), Kailasa fycbSvUqJOI (PUBLIC since 09:30 UTC 24 Nov, 104 views, 2 likes — user decided to KEEP it). 3 uploads within ~5.5 h = likely the new channel's 24h upload cap; next free upload ~04:00 UTC 25 Nov. Upload task still set for 24 Nov 18:00 UK (moving it was not permitted); it will likely hit the cap again.
| 2026-11-24 | Hampi musical SaReGaMa pillars — Vox paper + blueprint, ChatGPT images, synthesized notes | not scheduled yet | — | file videos/2026-11-24_hampi-musical-pillars.mp4; 799 credits; voice -15.7 / music -36.2 / sfx -31.3 LUFS |
Upload run 2026-11-24 23:31 IST (18:01 UK): channel still has only 3 uploads. Zapier upload_video -> "throttled without retry"; Windsor (account 117962) -> "YouTube rate-limited the upload". Stopped (channel-wide limit), remaining 3 not attempted. Status:
| 2026-11-25 | 12:30 IST target | Sarangpur Hanuman (videos/2026-11-24_sarangpur-hanuman-vox.mp4) | PENDING UPLOAD — Zapier throttled + Windsor rate-limited (23:31 IST 24 Nov) |
| 2026-11-25 | 19:30 IST target | Brihadeeswarar 80-ton stone (videos/2026-11-25_brihadeeswarar-80-ton-stone.mp4) | PENDING UPLOAD — not attempted (channel rate limit) |
| 2026-11-26 | 12:30 IST target | Konark wheel clock (videos/2026-11-24_konark-wheel-clock.mp4) | PENDING UPLOAD — not attempted (channel rate limit) |
| 2026-11-26 | 19:30 IST target | Rani ki Vav (videos/2026-11-24_rani-ki-vav.mp4) | PENDING UPLOAD — not attempted (channel rate limit) |
| 2026-11-25 | Loktak Lake / Keibul Lamjao floating national park (phumdi 20/80, Sangai 14→260) — NEW recipe "misty lake dawn": code-drawn lake world + real lake photo, ripple / water-rise / water-fall transitions, Three.js phumdi + globe + bars, water SFX pack, lake pentatonic music | not scheduled (user decides) | — | file videos/2026-11-25_loktak-floating-park.mp4; 1,089 credits; voice -15.5 / music -37.8 / sfx -31.7 LUFS; final -14.1 LUFS, peak -2.9 |
Note (2026-11-24 21:40 UK): user's Downloads\bhoolekisse also holds iron-pillar, jantar-mantar, modhera videos made earlier today (not logged above).
Upload try 2026-11-24 21:50 UK: channel has 8 uploads (from API list): 25 Nov 09:30 Lepakshi, 12:30 Sarangpur, 19:30 Brihadeeswarar; 26 Nov 12:30 Konark, 19:30 Rani ki Vav; 27 Nov 12:30 Iron Pillar (Studio, 20:51 UTC). Loktak target 27 Nov 19:30 IST: Zapier "throttled without retry", Windsor "YouTube rate-limited"; Chrome extension not connected (user on phone) so Studio route not tried. PENDING UPLOAD: Loktak (27 Nov 19:30 IST), Modhera, Jantar Mantar.
Plan (user, 2026-11-24 21:53 UK): when the upload limit resets, upload Loktak (27 Nov 19:30 IST), Modhera (28 Nov 12:30 IST), Jantar Mantar (28 Nov 19:30 IST). Modhera + Jantar files are on the user's PC (Downloads\bhoolekisse) — stage, push to videos/, then upload; metadata in projects/batch5/upload_sheet_3.md. Reminder set for 25 Nov 21:30 UK.
| 2026-11-25 | Lonar crater lake (meteor crater in basalt, 1 of 4; pink 2020 = haloarchaea) — recipe "night sky / space": starfield + neon headlines + pink-box karaoke, shockwave + meteor-streak transitions, Three.js crater/meteor/microbes, space SFX, music "space" 76 BPM; code-only visuals | planned 29 Nov 12:30 IST | — | videos/2026-11-26_lonar-crater-lake.mp4; 957 credits; voice -15.3 / music -36.8 / sfx -34.6; final -14.1 LUFS, peak -3.1 |
| 2026-11-25 | Magnetic Hill, Ladakh (gravity hill optical illusion) — recipe "kinetic pop": colour blocks + stripes + halftone, slam headlines, sticker tags, pop captions, whip-pan + shutter transitions, Three.js road/slope/car world tilt reveal, road SFX, music "pop" 104 BPM; code-only visuals | planned 29 Nov 19:30 IST | — | videos/2026-11-26_magnetic-hill-ladakh.mp4; 939 credits; voice -15.8 / music -37.3 / sfx -34.0; final -14.2 LUFS, peak -2.5 |
Uploads 2026-11-25 15:28-15:31 UK via Zapier (private + scheduled): Loktak cuJd18XLrgM 27 Nov 19:30 IST; Modhera 9I8MElCsV6s 28 Nov 12:30; Jantar Mantar QAx1kYO6r9E 28 Nov 19:30; Lonar SCBLkcsmEGg 29 Nov 12:30. Magnetic Hill PENDING (Zapier throttled, Windsor rate-limited) — planned 29 Nov 19:30, reminder 25 Nov 21:30 UK. Channel now 12 videos. Hampi made but not uploaded (user to decide).

- 2026-11-25 | Sarangpur part 2 (छड़ी) | videos/2026-11-25_sarangpur-chhadi.mp4 | credits 966 | not uploaded yet
