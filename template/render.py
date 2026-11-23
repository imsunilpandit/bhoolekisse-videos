import sys, base64, subprocess, pathlib
from playwright.sync_api import sync_playwright

mode = sys.argv[1]  # "stills" or "video"
root = pathlib.Path(__file__).parent
FPS, DUR = 30, 44.63

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width": 1080, "height": 1920})
    pg.goto((root / "scene.html").as_uri())
    pg.evaluate("window.ready")
    grab = "t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.92)}"
    if mode == "stills":
        for t in [float(x) for x in sys.argv[2:]]:
            d = pg.evaluate(grab, t)
            (root / f"still_{t:05.1f}.jpg").write_bytes(base64.b64decode(d.split(",")[1]))
    else:
        out = root / "video_tmp.mp4"
        ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", str(FPS), "-i", "-",
                               "-c:v", "libx264", "-preset", "medium", "-crf", "14", "-pix_fmt", "yuv420p", str(out)], stdin=subprocess.PIPE)
        n = int(DUR * FPS)
        for i in range(n):
            d = pg.evaluate(grab, i / FPS)
            ff.stdin.write(base64.b64decode(d.split(",")[1]))
        ff.stdin.close()
        if ff.wait() == 0:
            out.rename(root / "video_silent.mp4")
    b.close()
