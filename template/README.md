# Bhoole Kisse templates

MAIN STYLE (user decision 2026-11-24): vox/ = Vox-style editorial paper documentary. Use it for every video unless the user asks otherwise.
- vox/: paper texture + faint grid, big Rozha One headline (deep blue #1F3A85), small paper labels (Tiro Devanagari italic) with shadow, rounded value pills, dashed measurement lines and axes/maps/charts/timelines, objects that first draw as pencil sketch then wipe into a coloured engraved cut-out with white sticker border + drop shadow, red hand-drawn circle markers, slow camera push/pull between sections. Fonts referenced from fonts/fontsource-*/package/files (npm pack @fontsource/rozha-one @fontsource/tiro-devanagari-hindi @fontsource/inter).

(older, secondary)
- 3d/ : cinematic Three.js (Lepakshi). Needs three@0.170.0 (npm pack three@0.170.0, extract to ./three) + fonts + logo.png next to scene.html; render3.py serves over http and uses SwiftShader. Overlay = big title + word-by-word captions + small watermark only.
- styles/ten_styles_scene.html : the 10 illustrated styles (Paper Cut-out, Shadow Puppet, Madhubani, Warli, Miniature Painting, Ukiyo-e, Blueprint, Ink Wash, Stained Glass, Anime-style). REMOVE the on-screen style-name labels before using - user does not want any text naming the style.
- common/ : tighten.py (voice tightening + word timings), musicgen.py, logo, end card.
- NEVER use the old diya mascot, voice-waveform bubble, or terminal "~/भूले-किस्से $" tag line (removed by user).
