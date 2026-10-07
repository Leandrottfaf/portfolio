// Real-time player for the film: play / pause, scrub, fullscreen, and "Record",
// which plays the film once and saves the browser tab as a video file.
// Skipped when the page is driven by render.mjs (headless, navigator.webdriver).

if (!navigator.webdriver) {
  const loading = document.getElementById("loading");
  loading.hidden = false;
  addEventListener("error", (e) => { loading.textContent = `Could not load the film: ${e.message}`; });
  addEventListener("unhandledrejection", (e) => { loading.textContent = `Could not load the film: ${e.reason?.message || e.reason}`; });
  while (!window.film?.ready) await new Promise((r) => setTimeout(r, 50));
  loading.remove();
  const { render, duration, poster = 0 } = window.film;
  const stage = document.getElementById("stage");

  // Fit the 1920×1080 stage to the window
  document.body.classList.add("player");
  Object.assign(document.documentElement.style, { width: "100vw", height: "100vh" });
  const fit = () => {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `translate(${(innerWidth - 1920 * s) / 2}px, ${(innerHeight - 1080 * s) / 2}px) scale(${s})`;
  };
  addEventListener("resize", fit);
  fit();

  const bar = document.createElement("div");
  bar.id = "controls";
  bar.innerHTML = `
    <button data-act="play" title="Play / pause (space)">▶</button>
    <input type="range" min="0" max="${duration}" step="0.01" value="0" aria-label="Time">
    <span class="time">0.0 / ${duration.toFixed(1)} s</span>
    <a class="lang" href="?lang=en">EN</a><a class="lang" href="?lang=fr">FR</a>
    <button data-act="full" title="Fullscreen (f)">⛶</button>
    <button data-act="rec" class="rec" title="Play once and save as a video">● Record</button>`;
  document.body.appendChild(bar);
  const playBtn = bar.querySelector('[data-act="play"]');
  const slider = bar.querySelector("input");
  const label = bar.querySelector(".time");

  let t = 0, playing = false, startedAt = 0, startT = 0, onEnd = null;

  function show(time) {
    t = Math.min(duration, Math.max(0, time));
    render(t);
    slider.value = t;
    label.textContent = `${t.toFixed(1)} / ${duration.toFixed(1)} s`;
  }
  let startFromTop = false;
  function play(from = t, done = null) {
    if (from >= duration || startFromTop) from = 0;
    startFromTop = false;
    startT = from;
    startedAt = performance.now();
    playing = true;
    onEnd = done;
    playBtn.textContent = "❚❚";
    wake();
    requestAnimationFrame(tick);
  }
  function pause() {
    playing = false;
    playBtn.textContent = "▶";
    bar.classList.remove("idle");
  }
  function tick(now) {
    if (!playing) return;
    const time = startT + (now - startedAt) / 1000;
    show(time);
    if (time >= duration) {
      pause();
      onEnd?.();
      return;
    }
    requestAnimationFrame(tick);
  }

  // Controls stay visible, and fade only while playing with the mouse idle
  let idle;
  const wake = () => {
    bar.classList.remove("idle");
    clearTimeout(idle);
    idle = setTimeout(() => playing && bar.classList.add("idle"), 2500);
  };
  addEventListener("mousemove", wake);

  slider.addEventListener("input", () => { pause(); show(+slider.value); });
  playBtn.addEventListener("click", () => (playing ? pause() : play()));
  bar.querySelector('[data-act="full"]').addEventListener("click", () =>
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen());
  addEventListener("keydown", (e) => {
    if (e.code === "Space") { e.preventDefault(); playing ? pause() : play(); }
    if (e.key === "f") bar.querySelector('[data-act="full"]').click();
    if (e.key === "ArrowRight") { pause(); show(t + 1 / 30); }
    if (e.key === "ArrowLeft") { pause(); show(t - 1 / 30); }
  });

  // Record: capture this tab (cropped to the stage where the browser supports it)
  // while the film plays once from the start, then download the file.
  bar.querySelector('[data-act="rec"]').addEventListener("click", async () => {
    pause();
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 60, displaySurface: "browser" }, audio: false,
        preferCurrentTab: true, selfBrowserSurface: "include",
      });
    } catch {
      return; // cancelled
    }
    const [track] = stream.getVideoTracks();
    try {
      if (window.CropTarget && track.cropTo) await track.cropTo(await CropTarget.fromElement(stage));
    } catch { /* full tab, then */ }
    const mime = ["video/mp4;codecs=avc1.640028", "video/mp4", "video/webm;codecs=vp9", "video/webm"].find((m) => MediaRecorder.isTypeSupported(m));
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 24_000_000 });
    const chunks = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    rec.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      document.body.classList.remove("recording");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob(chunks, { type: mime }));
      a.download = `bim-to-cad-${new URLSearchParams(location.search).get("lang") || "en"}.${mime.startsWith("video/mp4") ? "mp4" : "webm"}`;
      a.click();
    };
    document.body.classList.add("recording");
    show(0);
    await new Promise((r) => setTimeout(r, 600)); // let the sharing banner settle
    rec.start(250);
    play(0, () => setTimeout(() => rec.stop(), 300));
  });

  // Open on a poster frame rather than the black first frame; play starts from 0
  const tParam = new URLSearchParams(location.search).get("t");
  show(tParam === null ? poster : Number(tParam));
  if (tParam === null) startFromTop = true;
}
