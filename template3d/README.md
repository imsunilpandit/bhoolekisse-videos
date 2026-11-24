# Bhoole Kisse 3D + 2.5D template (approved direction 2026-11-24)
Files: scene3d_src.html (three.js r160 WebGL layer + 2D canvas overlay), render3d.py (headless Chrome + SwiftShader), tighten.py (voice cut + word timings), three/ (three.js, MIT).
Reuse from template/: musicgen.py, BhooleKisse_logo_800.png, BhooleKisse_Endcard_Final.mp4. Fonts: npm pack @fontsource/baloo-2@5.3.0 @fontsource/poppins@5.3.0 into fonts/.
Workflow: copy template3d/* + template/{musicgen.py,logo,endcard} into a work dir -> voice -> edit tighten.py (segs/texts/line_of) -> python3 tighten.py -> edit the TOPIC CONTENT block of scene3d_src.html (HEAD, HITS, 3D groups G.*, SHOTS one per line) -> python3 render3d.py stills ... -> contact sheet -> python3 render3d.py video -> musicgen + mix.
Example: the Bali Jatra content inside scene3d_src.html (videos/2026-11-24_bali-jatra-3d-demo.mp4).
No mascot. NOTE: the Bali Jatra example script ends on an unanswered question - that structure is retired; follow SKILL section 2 (knowledge first, reveal the raaz). Things must enter on the word that names them: use at(L,'word').
