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
