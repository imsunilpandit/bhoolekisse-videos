# usage: python3 render3d.py stills t1 t2 ...  |  python3 render3d.py video
# builds scene.html from scene3d_src.html + timing.json, renders WebGL(three.js)+2D canvas frames to mp4
import sys, base64, subprocess, pathlib, json
from playwright.sync_api import sync_playwright
root = pathlib.Path(__file__).parent
T = json.load(open(root/"timing.json"))
(root/"scene.html").write_text((root/"scene3d_src.html").read_text().replace("__TIMING__", json.dumps(T, ensure_ascii=False)))
FPS = 30; DUR = T["dur"]
ARGS = ["--allow-file-access-from-files", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
    pg = b.new_page(viewport={"width": 1080, "height": 1920})
    pg.on("console", lambda m: print("console:", m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: print("PAGE ERROR:", e))
    pg.goto((root / "scene.html").as_uri()); pg.evaluate("window.ready")
    grab = "t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.92)}"
    if sys.argv[1] == "stills":
        for t in [float(v) for v in sys.argv[2:]]:
            (root / f"still_{t:05.1f}.jpg").write_bytes(base64.b64decode(pg.evaluate(grab, t).split(",")[1]))
    else:
        out = root / "video_tmp.mp4"
        ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", str(FPS), "-i", "-",
                               "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p", str(out)], stdin=subprocess.PIPE)
        for i in range(int(DUR * FPS)):
            ff.stdin.write(base64.b64decode(pg.evaluate(grab, i / FPS).split(",")[1]))
        ff.stdin.close()
        if ff.wait() == 0: out.rename(root / "video_silent.mp4")
    b.close()
