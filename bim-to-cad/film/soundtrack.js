// The film's score, synthesized with the Web Audio API so it follows the film's
// cues exactly and needs no licensed track. renderSoundtrack(cues) renders the
// whole score offline into an AudioBuffer (the player plays it in sync, render.mjs
// muxes it into the MP4 via toWav). Same input, same output: noise is seeded.
//
// D minor, 100 BPM. A dark pad from the start, a soft pulse once the linework
// starts, glassy arpeggios as the model builds, risers into each transformation
// (build, flatten, drawing) landing on low impacts, whooshes as the sheets slide,
// a swell into the pull-back, and an open chord that rings out under the logo.

const BEAT = 0.6;
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
// Chords as MIDI notes, each held for 8 beats
const CHORDS = [
  [38, 45, 50, 53, 57], // Dm
  [34, 41, 46, 50, 53], // Bb
  [41, 48, 53, 57, 60], // F
  [36, 43, 48, 52, 55], // C
];

export async function renderSoundtrack(cue, sampleRate = 48000) {
  const dur = cue.duration;
  const ctx = new OfflineAudioContext(2, Math.ceil(dur * sampleRate), sampleRate);
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

  // Buses: everything → (dry + reverb) → compressor → master fade
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, 0);
  master.gain.linearRampToValueAtTime(1.2, 0.8);
  master.gain.setValueAtTime(1.2, dur - 2.5);
  master.gain.linearRampToValueAtTime(0, dur);
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 3;
  comp.attack.value = 0.01;
  comp.release.value = 0.25;
  comp.connect(master).connect(ctx.destination);
  const dry = ctx.createGain();
  dry.connect(comp);
  const verb = ctx.createConvolver();
  verb.buffer = impulse(ctx, 3.2, rand);
  const verbIn = ctx.createGain();
  verbIn.gain.value = 0.55;
  verbIn.connect(verb).connect(comp);
  const delay = ctx.createDelay(1);
  delay.delayTime.value = BEAT * 0.75;
  const fb = ctx.createGain();
  fb.gain.value = 0.38;
  delay.connect(fb).connect(delay);
  delay.connect(verbIn);
  delay.connect(dry);

  const noise = noiseBuffer(ctx, 4, rand);
  const out = (node, wet = 0.3, pan = 0) => {
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    node.connect(p);
    p.connect(dry);
    if (wet) { const s = ctx.createGain(); s.gain.value = wet; p.connect(s).connect(verbIn); }
    return p;
  };
  const chordAt = (t) => CHORDS[Math.floor(t / (8 * BEAT)) % CHORDS.length];

  // Pad: detuned saws through a lowpass that opens as the film goes on
  for (let t0 = 0; t0 < dur; t0 += 8 * BEAT) {
    const t1 = Math.min(dur, t0 + 8 * BEAT);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 0.7;
    lp.frequency.setValueAtTime(380 + 900 * Math.min(1, t0 / cue.ortho), t0);
    lp.frequency.linearRampToValueAtTime(500 + 1100 * Math.min(1, t1 / cue.ortho), t1);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.05, t0 + 1.2);
    g.gain.setValueAtTime(0.05, t1 - 0.4);
    g.gain.linearRampToValueAtTime(0, t1 + 1.2);
    lp.connect(g);
    out(g, 0.6);
    for (const n of chordAt(t0)) {
      for (const cents of [-8, 7]) {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = midi(n);
        o.detune.value = cents;
        o.connect(lp);
        o.start(t0);
        o.stop(t1 + 1.3);
      }
    }
  }

  // Sub pulse on every beat from the linework to the end card, a little stronger
  // on the downbeat
  for (let t = cue.lines; t < cue.end; t += BEAT) {
    const n = Math.round((t - cue.lines) / BEAT);
    const root = midi(chordAt(t)[0] + (chordAt(t)[0] < 36 ? 12 : 0));
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(root * 2.2, t);
    o.frequency.exponentialRampToValueAtTime(root, t + 0.09);
    const g = ctx.createGain();
    const level = (n % 4 === 0 ? 0.32 : 0.2) * Math.min(1, (t - cue.lines) / 2);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(level, 0.0002), t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    o.connect(g);
    out(g, 0.05);
    o.start(t);
    o.stop(t + 0.45);
  }

  // Scanning: soft high blips while the scan appears
  for (let t = cue.scan + 0.3; t < cue.lines + 2; t += 0.07 + rand() * 0.11) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = 2400 + rand() * 2600;
    const g = ctx.createGain();
    const level = 0.018 * Math.min(1, (t - cue.scan) / 1.2) * Math.min(1, (cue.lines + 2 - t) / 1.2);
    g.gain.setValueAtTime(level, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(g);
    out(g, 0.5, rand() * 1.6 - 0.8);
    o.start(t);
    o.stop(t + 0.06);
  }

  // Arpeggio: glassy plucks in eighths from the build to the end card, brightening
  const pattern = [2, 3, 4, 3, 2, 4, 3, 1];
  for (let t = cue.build, i = 0; t < cue.end + 1; t += BEAT / 2, i++) {
    const chord = chordAt(t);
    const f = midi(chord[pattern[i % pattern.length]] + 12);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1400 + 3000 * Math.min(1, (t - cue.build) / (cue.pull - cue.build));
    const g = ctx.createGain();
    const level = 0.07 * Math.min(1, (t - cue.build) / 1.5) * (t > cue.end ? Math.max(0, 1 - (t - cue.end)) : 1);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(level, 0.0002), t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    for (const [type, mult, amp] of [["triangle", 1, 1], ["sine", 2, 0.35]]) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = f * mult;
      const a = ctx.createGain();
      a.gain.value = amp;
      o.connect(a).connect(lp);
      o.start(t);
      o.stop(t + 0.35);
    }
    lp.connect(g);
    const p = out(g, 0.35, i % 2 ? 0.35 : -0.35);
    p.connect(delay);
  }

  // Risers into each transformation, landing on an impact
  const riser = (t1, len, level = 0.16) => {
    const t0 = t1 - len;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 3;
    bp.frequency.setValueAtTime(250, t0);
    bp.frequency.exponentialRampToValueAtTime(6000, t1);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(level, t1 - 0.02);
    g.gain.linearRampToValueAtTime(0, t1 + 0.03);
    src.connect(bp).connect(g);
    out(g, 0.4);
    src.start(t0);
    src.stop(t1 + 0.05);
    // a rising tone under the noise
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(110, t0);
    o.frequency.exponentialRampToValueAtTime(440, t1);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(300, t0);
    lp.frequency.exponentialRampToValueAtTime(2500, t1);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t0);
    og.gain.exponentialRampToValueAtTime(level * 0.35, t1 - 0.02);
    og.gain.linearRampToValueAtTime(0, t1 + 0.03);
    o.connect(lp).connect(og);
    out(og, 0.3);
    o.start(t0);
    o.stop(t1 + 0.05);
  };
  const impact = (t, level = 0.75) => {
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(90, t);
    o.frequency.exponentialRampToValueAtTime(34, t + 0.6);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2);
    o.connect(g);
    out(g, 0.25);
    o.start(t);
    o.stop(t + 2.1);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2500, t);
    lp.frequency.exponentialRampToValueAtTime(200, t + 0.8);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(level * 0.35, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    src.connect(lp).connect(ng);
    out(ng, 0.8);
    src.start(t, rand() * 2);
    src.stop(t + 1);
  };
  riser(cue.build, 1.6, 0.12);
  impact(cue.build, 0.55);
  riser(cue.flatten, 2.2);
  impact(cue.flatten);
  riser(cue.ortho, 1.4, 0.12);
  impact(cue.ortho, 0.6);
  riser(cue.pull, 2, 0.12);
  impact(cue.pull, 0.5);

  // Whooshes as the sheets slide
  const whoosh = (t, len = 1.1, level = 0.09) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(350, t);
    bp.frequency.exponentialRampToValueAtTime(2800, t + len * 0.45);
    bp.frequency.exponentialRampToValueAtTime(500, t + len);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + len * 0.45);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    const p = ctx.createStereoPanner();
    p.pan.setValueAtTime(0.7, t);
    p.pan.linearRampToValueAtTime(-0.7, t + len);
    src.connect(bp).connect(g).connect(p);
    p.connect(dry);
    const s = ctx.createGain();
    s.gain.value = 0.3;
    p.connect(s).connect(verbIn);
    src.start(t, rand() * 2);
    src.stop(t + len);
  };
  whoosh(cue.sheets);
  whoosh(cue.section - 0.2);
  whoosh(cue.plan - 0.2);

  // Final chord: open Dm(add9), ringing out under the logo
  const t0 = cue.end;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(2400, t0);
  lp.frequency.exponentialRampToValueAtTime(700, dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.06, t0 + 0.05);
  g.gain.setValueAtTime(0.06, t0 + 1);
  g.gain.exponentialRampToValueAtTime(0.0001, dur);
  lp.connect(g);
  out(g, 0.8);
  for (const n of [38, 45, 50, 52, 53, 57, 64]) {
    for (const cents of [-6, 6]) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = midi(n);
      o.detune.value = cents;
      o.connect(lp);
      o.start(t0);
      o.stop(dur);
    }
  }
  impact(cue.end, 0.45);

  return ctx.startRendering();
}

function noiseBuffer(ctx, seconds, rand) {
  const b = ctx.createBuffer(1, Math.ceil(seconds * ctx.sampleRate), ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = rand() * 2 - 1;
  return b;
}

// Stereo reverb tail: decaying noise, darker as it fades
function impulse(ctx, seconds, rand) {
  const n = Math.ceil(seconds * ctx.sampleRate);
  const b = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    let lp = 0;
    for (let i = 0; i < n; i++) {
      const x = i / n;
      lp += (rand() * 2 - 1 - lp) * (0.9 - 0.75 * x);
      d[i] = lp * Math.pow(1 - x, 2.2);
    }
  }
  return b;
}

// 16-bit PCM WAV, for render.mjs
export function toWav(buffer) {
  const ch = buffer.numberOfChannels, n = buffer.length, rate = buffer.sampleRate;
  const out = new DataView(new ArrayBuffer(44 + n * ch * 2));
  const str = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF"); out.setUint32(4, 36 + n * ch * 2, true); str(8, "WAVE");
  str(12, "fmt "); out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, ch, true);
  out.setUint32(24, rate, true); out.setUint32(28, rate * ch * 2, true); out.setUint16(32, ch * 2, true); out.setUint16(34, 16, true);
  str(36, "data"); out.setUint32(40, n * ch * 2, true);
  const data = [...Array(ch)].map((_, c) => buffer.getChannelData(c));
  for (let i = 0, o = 44; i < n; i++) for (let c = 0; c < ch; c++, o += 2) out.setInt16(o, Math.max(-1, Math.min(1, data[c][i])) * 32767, true);
  return new Uint8Array(out.buffer);
}
