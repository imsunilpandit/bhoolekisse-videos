import os,sys,base64,subprocess,pathlib,threading,http.server,json,functools
from playwright.sync_api import sync_playwright
root=pathlib.Path(__file__).parent.resolve();FPS=30;PORT=int(os.environ.get('PORT','8791'))
h=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(root))
http.server.SimpleHTTPRequestHandler.log_message=lambda *a:None
srv=http.server.ThreadingHTTPServer(('127.0.0.1',PORT),h);threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
  b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
  pg=b.new_page(viewport={"width":1080,"height":1920});pg.on("pageerror",lambda e:print("ERR",e));pg.on("console",lambda m:print("LOG",m.text))
  pg.goto(f"http://127.0.0.1:{PORT}/scene.html");pg.wait_for_function("window.ready!==undefined");pg.evaluate("window.ready")
  json.dump({'ev':pg.evaluate("window.EV"),'T':pg.evaluate("window.T")},open(root/'events.json','w'))
  DUR=pg.evaluate("window.T.end") if len(sys.argv)<3 or sys.argv[1]!="video" else float(sys.argv[2])
  grab="t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.92)}"
  if sys.argv[1]=="stills":
    SD=root/os.environ.get('SD','stills');SD.mkdir(exist_ok=True)
    for t in map(float,sys.argv[2:]):(SD/f"s_{t:05.2f}.jpg").write_bytes(base64.b64decode(pg.evaluate(grab,t).split(",")[1]))
  else:
    OUT=os.environ.get("OUT","video_noaudio.mp4");ff=subprocess.Popen(["ffmpeg","-y","-v","error","-f","image2pipe","-c:v","mjpeg","-framerate","30","-i","-","-c:v","libx264","-preset","veryfast","-crf","19","-pix_fmt","yuv420p",str(root/OUT)],stdin=subprocess.PIPE)
    n=int(round(DUR*FPS));F0=int(os.environ.get("F0","0"))
    for i in range(F0,n):
      ff.stdin.write(base64.b64decode(pg.evaluate(grab,i/FPS).split(",")[1]))
      if i%300==0:print(i,'/',n,flush=True)
    ff.stdin.close();ff.wait()
  b.close()
srv.shutdown()
