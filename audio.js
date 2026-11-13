// Beat clock for the dance (wirama). The gamelan changes tempo (irama) through the track, so instead of a fixed
// BPM we follow a beat grid precomputed from the recording (assets/backsound-beats.json) against the audio's
// playback position. Without music playing it falls back to a steady pulse.
export class BeatClock {
  constructor(audioEl, fallbackPeriod = 0.68) {
    this.el = audioEl;
    this.beats = null;
    this.loadToken = 0;
    this.fallback = fallbackPeriod;
    this.mt = 0; // smoothed music time
    this.pos = 0;
    this.period = fallbackPeriod;
  }

  async load(url) {
    const token = ++this.loadToken;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (token !== this.loadToken) return;
      if (Array.isArray(data.beats) && data.beats.length > 2) this.setBeats(data.beats);
      else {
        this.setBeats(null);
        console.warn('Beat grid unavailable, dancing to a steady pulse');
      }
    } catch (err) {
      if (token !== this.loadToken) return;
      this.setBeats(null);
      console.warn('Beat grid unavailable, dancing to a steady pulse', err);
    }
  }

  setBeats(beats) {
    this.loadToken++;
    this.beats = Array.isArray(beats) && beats.length > 2 ? beats : null;
    this.mt = this.el.currentTime || 0;
    this.pos = this.beats ? this.posAt(this.mt) : 0;
    this.period = this.beats ? this.periodAt(this.mt) : this.fallback;
  }

  // continuous beat index at music time t
  posAt(t) {
    const B = this.beats;
    const n = B.length;
    if (t <= B[0]) return (t - B[0]) / (B[1] - B[0]);
    if (t >= B[n - 1]) return n - 1 + (t - B[n - 1]) / (B[n - 1] - B[n - 2]);
    let lo = 0, hi = n - 1;
    while (hi - lo > 1) {
      const m = (lo + hi) >> 1;
      if (B[m] <= t) lo = m;
      else hi = m;
    }
    return lo + (t - B[lo]) / (B[hi] - B[lo]);
  }

  periodAt(t) {
    const i = Math.max(1, Math.min(this.beats.length - 1, Math.floor(this.posAt(t)) + 1));
    return this.beats[i] - this.beats[i - 1];
  }

  get synced() {
    return !!this.beats && !this.el.paused && this.el.volume > 0.01;
  }

  // Advance by dt seconds; returns how many beats passed plus the current position and period.
  tick(dt) {
    if (this.synced) {
      const ct = this.el.currentTime;
      this.mt += dt;
      // currentTime can update coarsely — follow it gently, snap on loops/seeks
      if (Math.abs(ct - this.mt) > 0.15) this.mt = ct;
      else this.mt += (ct - this.mt) * 0.1;
      const pos = this.posAt(this.mt);
      this.period = this.periodAt(this.mt);
      let db = pos - this.pos;
      if (db < -0.5 || db > 4) db = dt / this.period; // wrapped around the loop
      this.pos = pos;
      return { db: Math.max(0, db), pos, period: this.period, synced: true };
    }
    this.period = this.fallback;
    this.pos += dt / this.fallback;
    return { db: dt / this.fallback, pos: this.pos, period: this.fallback, synced: false };
  }
}

// Looping gamelan backsound. Browsers only allow audible playback after a user gesture,
// so start() is called from the first click / key press, and the track fades in.
const STORE_KEY = 'wayang.audio';

export class BackgroundMusic {
  constructor(src) {
    this.el = new Audio(src);
    this.el.loop = true;
    this.el.preload = 'auto';
    this.el.volume = 0;
    this.started = false;
    this.fadeRaf = 0;
    this.trackVersion = 0;
    const saved = this.load();
    this.volume = saved.volume ?? 0.6;
    this.muted = saved.muted ?? false;
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch {
      return {};
    }
  }

  save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ volume: this.volume, muted: this.muted }));
    } catch {
      /* storage unavailable (private mode) — preference just won't persist */
    }
  }

  get target() {
    return this.muted ? 0 : this.volume;
  }

  fadeTo(value, seconds) {
    cancelAnimationFrame(this.fadeRaf);
    const from = this.el.volume;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / (seconds * 1000));
      this.el.volume = from + (value - from) * k * k * (3 - 2 * k);
      if (k < 1) this.fadeRaf = requestAnimationFrame(step);
      else if (value === 0 && this.muted) this.el.pause();
    };
    this.fadeRaf = requestAnimationFrame(step);
  }

  async start() {
    if (this.started) return;
    this.started = true;
    if (this.muted) return;
    const version = this.trackVersion;
    try {
      await this.el.play();
      if (version !== this.trackVersion) return;
      this.fadeTo(this.target, 3);
    } catch (err) {
      // still blocked (no real gesture yet) — try again on the next one
      if (version === this.trackVersion) this.started = false;
      console.warn('Backsound could not start yet:', err?.message || err);
    }
  }

  async setTrack(src) {
    const url = new URL(src, document.baseURI).href;
    if (this.el.src === url) {
      if (!this.muted) await this.start();
      return;
    }

    const version = ++this.trackVersion;
    const shouldPlay = !this.muted;
    const previousSrc = this.el.src;
    const previousTime = this.el.currentTime;
    const wasPlaying = !this.el.paused;
    cancelAnimationFrame(this.fadeRaf);
    this.el.pause();
    this.el.volume = 0;
    this.el.src = src;
    this.el.load();
    if (!shouldPlay) return;

    this.started = true;
    try {
      await this.el.play();
      if (version === this.trackVersion) this.fadeTo(this.target, wasPlaying ? 0.8 : 3);
    } catch (err) {
      if (version === this.trackVersion) {
        this.started = false;
        this.el.pause();
        this.el.src = previousSrc;
        this.el.load();
        if (wasPlaying) {
          try {
            await this.el.play();
            this.el.currentTime = previousTime;
            this.started = true;
            this.fadeTo(this.target, 0.4);
          } catch (restoreErr) {
            console.warn('Previous music could not resume:', restoreErr?.message || restoreErr);
          }
        }
      }
      console.warn('Selected music could not start:', err?.message || err);
      throw err;
    }
  }

  setMuted(muted) {
    this.muted = muted;
    this.save();
    if (!this.started) return;
    if (muted) {
      this.fadeTo(0, 0.4);
    } else {
      this.el.play().catch(() => {});
      this.fadeTo(this.target, 0.8);
    }
  }

  setVolume(v) {
    this.volume = v;
    this.save();
    if (this.started && !this.muted) {
      cancelAnimationFrame(this.fadeRaf);
      this.el.volume = v;
    }
  }
}
