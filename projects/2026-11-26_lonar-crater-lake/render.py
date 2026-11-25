import sys,base64,subprocess,pathlib,threading,http.server,functools,json
from playwright.sync_api import sync_playwright
root=pathlib.Path(__file__).parent.resolve();FPS=30
DUR=json.load(open(root/'timing.json'))['dur']
H=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(root));H.log_message=lambda *a:None
srv=http.server.ThreadingHTTPServer(('127.0.0.1',8771),lambda *a,**k:H(*a,**k) if False else http.server.SimpleHTTPRequestHandler(*a,directory=str(root),**k))
http.server.SimpleHTTPRequestHandler.log_message=lambda *a:None
threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
  b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
  pg=b.new_page(viewport={"width":1080,"height":1920});pg.on("pageerror",lambda e:print("ERR",e));pg.on("console",lambda m:print("LOG",m.text))
  pg.goto("http://127.0.0.1:8771/scene.html");pg.wait_for_function("window.ready!==undefined");pg.evaluate("window.ready.then(()=>1)")
  grab="t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.92)}"
  if sys.argv[1]=="stills":
    (root/'stills').mkdir(exist_ok=True)
    for t in map(float,sys.argv[2:]):(root/f"stills/s_{t:05.2f}.jpg").write_bytes(base64.b64decode(pg.evaluate(grab,t).split(",")[1]))
  else:
    ff=subprocess.Popen(["ffmpeg","-y","-v","error","-f","image2pipe","-c:v","mjpeg","-framerate","30","-i","-","-c:v","libx264","-preset","veryfast","-crf","19","-pix_fmt","yuv420p",str(root/"video_noaudio.mp4")],stdin=subprocess.PIPE)
    n=int(DUR*FPS)
    for i in range(n):
      ff.stdin.write(base64.b64decode(pg.evaluate(grab,i/FPS).split(",")[1]))
      if i%300==0:print(i,'/',n,flush=True)
    ff.stdin.close();ff.wait()
  b.close()
srv.shutdown()
