import sys, base64, subprocess, pathlib, time, json
from playwright.sync_api import sync_playwright
root = pathlib.Path(__file__).parent
DUR = json.load(open(root/'timing.json'))['dur']; FPS = 30
srv = None if __import__("os").environ.get("NOSRV") else subprocess.Popen([sys.executable, "-m", "http.server", "8766"], cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
mode = sys.argv[1]
try:
  with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
    pg = b.new_page(viewport={"width":1080,"height":1920})
    pg.on("console", lambda m: print("console:", m.text) if m.type in ("error","warning") else None)
    pg.on("pageerror", lambda e: print("pageerror:", e))
    pg.goto("http://localhost:8766/scene.html"); pg.wait_for_function("window.ready !== undefined", timeout=60000); pg.evaluate("window.ready")
    grab = "t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.92)}"
    if mode == "stills":
      for t in [float(v) for v in sys.argv[2:]]:
        t0=time.time(); d = pg.evaluate(grab, t); print(t, round(time.time()-t0,2), "s")
        (root/f"still_{t:05.1f}.jpg").write_bytes(base64.b64decode(d.split(",")[1]))
    else:
      a, z = int(sys.argv[2]), int(sys.argv[3]); out = root/f"part_{a:05d}.tmp.mp4"
      ff = subprocess.Popen(["ffmpeg","-y","-v","error","-f","image2pipe","-c:v","mjpeg","-framerate",str(FPS),"-i","-","-c:v","libx264","-preset","medium","-crf","16","-pix_fmt","yuv420p",str(out)], stdin=subprocess.PIPE)
      for i in range(a, min(z, int(DUR*FPS))):
        d = pg.evaluate(grab, i/FPS); ff.stdin.write(base64.b64decode(d.split(",")[1]))
      ff.stdin.close()
      if ff.wait()==0: out.rename(root/f"part_{a:05d}.mp4")
    b.close()
finally:
  srv and srv.terminate()
