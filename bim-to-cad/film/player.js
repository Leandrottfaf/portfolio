// Real-time player for the film: play / pause, scrub, sound, fullscreen, and
// "Record", which plays the film once and saves the browser tab, with the
// soundtrack, as a video file. Skipped when the page is driven by render.mjs
// (headless, navigator.webdriver).

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
    <button data-act="sound" title="Sound on / off (m)">♪</button>
    <a class="lang" href="?lang=en">EN</a><a class="lang" href="?lang=fr">FR</a>
    <button data-act="full" title="Fullscreen (f)">⛶</button>
    <button data-act="rec" class="rec" title="Play once and save as a video">● Record</button>`;
  document.body.appendChild(bar);
  const playBtn = bar.querySelector('[data-act="play"]');
  const soundBtn = bar.querySelector('[data-act="sound"]');
  const slider = bar.querySelector("input");
  const label = bar.querySelector(".time");

  // Soundtrack: rendered once in the background, then played from the current time.
  // While it plays, the audio clock drives the picture, so the two stay in sync.
  const score = window.film.soundtrack?.().catch(() => null);
  let audio = null, source = null, muted = false;
  async function audioOut() {
    const buffer = await score;
    if (!buffer) return null;
    if (!audio) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      audio = { ctx, gain, buffer };
    }
    audio.gain.gain.value = muted ? 0 : 1;
    if (audio.ctx.state !== "running") await audio.ctx.resume();
    return audio;
  }
  soundBtn.addEventListener("click", () => {
    muted = !muted;
    soundBtn.style.opacity = muted ? 0.4 : 1;
    if (audio) audio.gain.gain.value = muted ? 0 : 1;
  });

  let t = 0, playing = false, clock = null, startT = 0, onEnd = null;

  function show(time) {
    t = Math.min(duration, Math.max(0, time));
    render(t);
    slider.value = t;
    label.textContent = `${t.toFixed(1)} / ${duration.toFixed(1)} s`;
  }
  let startFromTop = false;
  async function play(from = t, done = null) {
    if (from >= duration || startFromTop) from = 0;
    startFromTop = false;
    playing = true;
    onEnd = done;
    playBtn.textContent = "❚❚";
    wake();
    const out = await audioOut();
    if (!playing) return;
    startT = from;
    if (out) {
      source = out.ctx.createBufferSource();
      source.buffer = out.buffer;
      source.connect(out.gain);
      const at = out.ctx.currentTime + 0.05;
      source.start(at, from);
      clock = () => out.ctx.currentTime - at;
    } else {
      const at = performance.now();
      clock = () => (performance.now() - at) / 1000;
    }
    requestAnimationFrame(tick);
  }
  function pause() {
    playing = false;
    source?.stop();
    source = null;
    playBtn.textContent = "▶";
    bar.classList.remove("idle");
  }
  function tick() {
    if (!playing) return;
    const time = startT + Math.max(0, clock());
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
    if (e.key === "m") soundBtn.click();
    if (e.key === "ArrowRight") { pause(); show(t + 1 / 30); }
    if (e.key === "ArrowLeft") { pause(); show(t - 1 / 30); }
  });

  // Record: capture this tab (cropped to the stage where the browser supports it)
  // plus the soundtrack, while the film plays once from the start, then download
  // the file.
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
    const out = await audioOut();
    if (out && !muted) {
      out.recDest ??= out.ctx.createMediaStreamDestination();
      out.gain.connect(out.recDest);
      stream.addTrack(out.recDest.stream.getAudioTracks()[0]);
    }
    const hasAudio = stream.getAudioTracks().length > 0;
    const mime = (hasAudio
      ? ["video/mp4;codecs=avc1.640028,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm"]
      : ["video/mp4;codecs=avc1.640028", "video/mp4", "video/webm;codecs=vp9", "video/webm"]).find((m) => MediaRecorder.isTypeSupported(m));
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 24_000_000 });
    const chunks = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    rec.onstop = () => {
      stream.getVideoTracks().forEach((tr) => tr.stop());
      if (out?.recDest) out.gain.disconnect(out.recDest);
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
