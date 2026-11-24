import sys,base64,subprocess,pathlib
from playwright.sync_api import sync_playwright
root=pathlib.Path(__file__).parent;FPS=30;DUR=10.0
with sync_playwright() as p:
  b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--allow-file-access-from-files"])
  pg=b.new_page(viewport={"width":1080,"height":1920});pg.on("pageerror",lambda e:print("ERR",e))
  pg.goto((root/"scene.html").as_uri());pg.wait_for_function("window.ready!==undefined");pg.evaluate("window.ready")
  grab="t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',0.93)}"
  if sys.argv[1]=="stills":
    for t in map(float,sys.argv[2:]):(root/f"s_{t:04.1f}.jpg").write_bytes(base64.b64decode(pg.evaluate(grab,t).split(",")[1]))
  else:
    ff=subprocess.Popen(["ffmpeg","-y","-v","error","-f","image2pipe","-c:v","mjpeg","-framerate","30","-i","-","-c:v","libx264","-preset","medium","-crf","15","-pix_fmt","yuv420p","-movflags","+faststart",str(root/"Vox_Style_Test_Brihadeeswarar.mp4")],stdin=subprocess.PIPE)
    for i in range(int(DUR*FPS)):ff.stdin.write(base64.b64decode(pg.evaluate(grab,i/FPS).split(",")[1]))
    ff.stdin.close();ff.wait()
  b.close()
