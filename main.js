import { Renderer, STAGE_W, STAGE_H } from './renderer.js';
import { Puppet } from './rig.js';
import { CHARACTERS, CHARACTER_LIST, DEFAULT_CHARACTER, DEFAULT_PAIR, characterTextures } from './characters.js';
import { HandTracker } from './tracking.js';
import { Controller } from './controller.js';
import { BackgroundMusic, BeatClock } from './audio.js';
import { clamp, noise1 } from './math.js';

const $ = (id) => document.getElementById(id);
const canvas = $('stage');
const video = $('video');
const preview = $('preview');
const previewBox = $('preview-box');
const pctx = preview.getContext('2d');

const BACKGROUNDS = [
  { label: 'Background satu', key: 'background', src: 'assets/background.png' },
  { label: 'Background dua', key: 'background-2', src: 'assets/background-2.png' },
  { label: 'Background tiga', key: 'background-3', src: 'assets/background-3.png' },
  { label: 'Background empat', key: 'background-4', src: 'assets/background-4.png' },
  { label: 'Background lima', key: 'background-5', src: 'assets/background-5.jpg' },
];
const MUSIC_TRACKS = [
  { id: 'music-1', label: 'Musik satu', src: 'assets/backsound.mp3', beats: 'assets/backsound-beats.json' },
  { id: 'music-2', label: 'Musik dua', src: 'assets/music-2.mp3' },
  { id: 'music-3', label: 'Musik tiga', src: 'assets/music-3.mp3' },
  { id: 'music-4', label: 'Musik empat', src: 'assets/music-4.mp3' },
];
const QUIZ_QUESTIONS = [
  {
    question: 'Siapakah Pandawa yang terkenal sebagai pemanah ulung?',
    options: ['Arjuna', 'Werkudara', 'Yudistira', 'Hanoman'],
    answer: 'Arjuna',
    fact: 'Arjuna dikenal sebagai Pandawa yang mahir memanah.',
  },
  {
    question: 'Werkudara juga dikenal dengan nama siapa?',
    options: ['Bima', 'Nakula', 'Arjuna', 'Gatot Kaca'],
    answer: 'Bima',
    fact: 'Werkudara adalah salah satu nama lain Bima.',
  },
  {
    question: 'Siapakah Pandawa tertua?',
    options: ['Yudistira', 'Arjuna', 'Sadewa', 'Werkudara'],
    answer: 'Yudistira',
    fact: 'Yudistira adalah putra tertua di antara Pandawa.',
  },
  {
    question: 'Gatot Kaca adalah putra dari siapa?',
    options: ['Bima dan Arimbi', 'Arjuna dan Subadra', 'Yudistira dan Drupadi', 'Nakula dan Sembadra'],
    answer: 'Bima dan Arimbi',
    fact: 'Dalam kisah wayang Jawa, Gatot Kaca adalah putra Bima dan Arimbi.',
  },
  {
    question: 'Siapakah tokoh kera putih yang membantu Rama mencari Sinta?',
    options: ['Hanoman', 'Gareng', 'Werkudara', 'Gatot Kaca'],
    answer: 'Hanoman',
    fact: 'Hanoman membantu Rama dalam kisah pencarian Dewi Sinta.',
  },
  {
    question: 'Hanoman dikenal sebagai putra siapa dalam pewayangan?',
    options: ['Batara Bayu', 'Batara Guru', 'Batara Surya', 'Batara Indra'],
    answer: 'Batara Bayu',
    fact: 'Dalam pewayangan, Hanoman dikenal sebagai putra Batara Bayu.',
  },
];

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const HAND_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
];

function fail(message) {
  const el = $('error');
  el.textContent = message;
  el.hidden = false;
}

let renderer;
try {
  renderer = new Renderer(canvas);
  await Promise.all([
    ...BACKGROUNDS.map(({ key, src }) => renderer.loadTexture(key, src)),
    // every character in characters.js, each under its own "<id>/<part>" key
    ...characterTextures().map(([key, src]) => renderer.loadTexture(key, src)),
  ]);
} catch (err) {
  console.error(err);
  fail(`Could not start the renderer: ${err.message}`);
  throw err;
}

// Two characters facing each other: left one mirrored (looking right), right one as drawn (looking left).
// Which figure each puppet plays comes from characters.js; pick them in Settings, or with ?left=arjuna&right=original.
const tracker = new HandTracker(video);
const controller = new Controller(tracker);
let facingMode = 'target';
const params = new URLSearchParams(location.search);
const pick = (name, i) => [params.get(name), DEFAULT_PAIR[i], DEFAULT_CHARACTER].find((id) => CHARACTERS[id]);
const puppets = [
  new Puppet({ x: 640, facing: -1, character: CHARACTERS[pick('left', 0)] }),
  new Puppet({ x: 1280, facing: 1, character: CHARACTERS[pick('right', 1)] }),
];
// handy for poking at from devtools
window.wayang = {
  puppets,
  controller,
  tracker,
  renderer,
  characters: CHARACTERS,
  setCharacter(index, id) {
    if (!CHARACTERS[id]) throw new Error(`Unknown character "${id}" (have: ${Object.keys(CHARACTERS).join(', ')})`);
    puppets[index].setCharacter(CHARACTERS[id]);
  },
};

function applyFacing() {
  const two = controller.puppetCount === 2;
  for (const p of puppets) p.facingMode = facingMode === 'target' && !two ? 'manual' : facingMode;
}
applyFacing();

// Visible part of the 1920×1080 stage ("cover" fit).
let view = { x: 0, y: 0, w: STAGE_W, h: STAGE_H };
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(innerWidth * dpr));
  const h = Math.max(1, Math.round(innerHeight * dpr));
  renderer.resize(w, h);
  const aspect = w / h;
  if (aspect > STAGE_W / STAGE_H) {
    const vh = STAGE_W / aspect;
    view = { x: 0, y: (STAGE_H - vh) * 0.5, w: STAGE_W, h: vh };
  } else {
    const vw = STAGE_H * aspect;
    view = { x: (STAGE_W - vw) * 0.5, y: 0, w: vw, h: STAGE_H };
  }
}
addEventListener('resize', resize);
resize();

// ---------- UI ----------
const intro = $('intro');
const introStatus = $('intro-status');
const startBtn = $('start-camera');
const statusPill = $('status');
const statusText = $('status-text');
let showPreview = true;

startBtn.addEventListener('click', async () => {
  startBtn.disabled = true;
  introStatus.classList.remove('err');
  try {
    await tracker.start((msg) => (introStatus.textContent = msg));
    controller.source = 'camera';
    controller.recalibrate();
    introStatus.textContent = '';
    intro.classList.add('gone');
    preview.height = Math.round(preview.width / tracker.aspect);
    preview.style.aspectRatio = `${preview.width} / ${preview.height}`;
    syncPreview();
  } catch (err) {
    console.error(err);
    introStatus.classList.add('err');
    introStatus.textContent =
      err?.name === 'NotAllowedError'
        ? 'Camera permission was blocked. Allow it in the address bar, or play with the mouse.'
        : `Camera unavailable (${err?.message || err}). You can still play with the mouse.`;
    startBtn.disabled = false;
  }
});

$('use-mouse').addEventListener('click', () => {
  controller.source = 'mouse';
  intro.classList.add('gone');
});

canvas.addEventListener('pointermove', (e) => {
  controller.mouse.x = view.x + (e.clientX / innerWidth) * view.w;
  controller.mouse.y = view.y + (e.clientY / innerHeight) * view.h;
  controller.mouse.seen = true;
});
canvas.addEventListener(
  'wheel',
  (e) => {
    controller.mouse.depth = clamp(controller.mouse.depth - e.deltaY * 0.0015, -0.3, 1);
    e.preventDefault();
  },
  { passive: false },
);

const settings = $('settings');
const settingsToggle = $('settings-toggle');
const menuToggle = $('menu-toggle');
const appMenu = $('app-menu');
const quizModal = $('quiz-modal');
const quizGame = $('quiz-game');
const quizResults = $('quiz-results');
const quizProgress = $('quiz-progress');
const quizScore = $('quiz-score');
const quizQuestion = $('quiz-question');
const quizOptions = $('quiz-options');
const quizFeedback = $('quiz-feedback');
const quizNext = $('quiz-next');
const quizResultScore = $('quiz-result-score');
let quizQuestions = [];
let quizIndex = 0;
let quizPoints = 0;
let quizAnswered = false;

function closeAppMenu() {
  appMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
}

function renderQuizQuestion() {
  const question = quizQuestions[quizIndex];
  quizProgress.textContent = `Soal ${quizIndex + 1} dari ${quizQuestions.length}`;
  quizScore.textContent = `Skor: ${quizPoints}`;
  quizQuestion.textContent = question.question;
  quizFeedback.textContent = '';
  quizOptions.replaceChildren();
  quizNext.hidden = true;
  quizAnswered = false;

  for (const option of shuffled(question.options)) {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const correct = option === question.answer;
      if (correct) quizPoints++;
      for (const answerButton of quizOptions.children) {
        answerButton.disabled = true;
        if (answerButton.textContent === question.answer) answerButton.classList.add('correct');
        else if (answerButton === button) answerButton.classList.add('wrong');
      }
      quizScore.textContent = `Skor: ${quizPoints}`;
      quizFeedback.textContent = `${correct ? 'Benar!' : `Belum tepat. Jawabannya: ${question.answer}.`} ${question.fact}`;
      quizNext.textContent = quizIndex === quizQuestions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya';
      quizNext.hidden = false;
      quizNext.focus();
    });
    quizOptions.append(button);
  }
}

function startQuiz() {
  quizQuestions = shuffled(QUIZ_QUESTIONS);
  quizIndex = 0;
  quizPoints = 0;
  quizGame.hidden = false;
  quizResults.hidden = true;
  renderQuizQuestion();
}

function showQuizResults() {
  quizGame.hidden = true;
  quizResults.hidden = false;
  const total = quizQuestions.length;
  const message = quizPoints === total
    ? 'Hebat! Kamu mengenal tokoh wayang dengan baik.'
    : 'Coba lagi untuk menambah pengetahuanmu tentang wayang.';
  quizResultScore.textContent = `Skor kamu ${quizPoints} dari ${total}. ${message}`;
  $('quiz-restart').focus();
}

function closeQuiz() {
  quizModal.hidden = true;
  menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const open = appMenu.hidden;
  settings.hidden = true;
  settingsToggle.setAttribute('aria-expanded', 'false');
  appMenu.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('pointerdown', (e) => {
  if (!appMenu.hidden && !appMenu.contains(e.target) && !menuToggle.contains(e.target)) closeAppMenu();
});
$('open-quiz').addEventListener('click', () => {
  closeAppMenu();
  quizModal.hidden = false;
  startQuiz();
  $('quiz-close').focus();
});
$('quiz-close').addEventListener('click', closeQuiz);
$('quiz-finish').addEventListener('click', closeQuiz);
$('quiz-restart').addEventListener('click', () => {
  startQuiz();
  $('quiz-close').focus();
});
$('quiz-next').addEventListener('click', () => {
  if (quizIndex === quizQuestions.length - 1) {
    showQuizResults();
    return;
  }
  quizIndex++;
  renderQuizQuestion();
  quizOptions.querySelector('button')?.focus();
});
quizModal.addEventListener('click', (e) => {
  if (e.target === quizModal) closeQuiz();
});
settingsToggle.addEventListener('click', () => {
  closeAppMenu();
  settings.hidden = !settings.hidden;
  settingsToggle.setAttribute('aria-expanded', String(!settings.hidden));
});
$('opt-fingers').addEventListener('change', (e) => (controller.settings.fingers = e.target.value));
$('opt-bodyhand').addEventListener('change', (e) => (controller.settings.bodyHand = e.target.value));
$('opt-characters').addEventListener('change', (e) => {
  controller.settings.characters = e.target.value;
  $('bodyhand-row').hidden = e.target.value === 'two';
  $('char-right-row').hidden = e.target.value !== 'two'; // one puppet = the left one
  applyFacing();
});
// one menu per puppet, filled from the registry, so a new character shows up here without touching the HTML
[['opt-char-left', 0], ['opt-char-right', 1]].forEach(([id, i]) => {
  const select = $(id);
  for (const c of CHARACTER_LIST) select.add(new Option(c.name, c.id));
  select.value = puppets[i].char.id;
  select.addEventListener('change', (e) => window.wayang.setCharacter(i, e.target.value));
});
$('opt-facing').addEventListener('change', (e) => {
  facingMode = e.target.value;
  applyFacing();
});
const backgroundInput = $('opt-background');
for (const background of BACKGROUNDS) backgroundInput.add(new Option(background.label, background.key));
backgroundInput.value = BACKGROUNDS[0].key;
backgroundInput.addEventListener('change', (e) => renderer.setBackground(e.target.value));
$('opt-camera').addEventListener('change', (e) => {
  showPreview = e.target.checked;
  syncPreview();
});

// ---------- pop-out camera window ----------
// camera.html draws itself from this window (see src/camera-window.js), so it can sit on another
// screen. While it's open, the corner preview hides.
let cameraWin = null;
const popoutBtn = $('opt-popout');
const cameraPoppedOut = () => !!cameraWin && !cameraWin.closed;

function syncPreview() {
  const out = cameraPoppedOut();
  previewBox.hidden = !showPreview || controller.source !== 'camera' || out;
  popoutBtn.textContent = out ? 'Bring camera back' : 'Open camera in new window';
}

function toggleCameraWindow() {
  if (cameraPoppedOut()) {
    cameraWin.close();
  } else {
    const w = Math.round(Math.min(960, screen.availWidth * 0.6));
    cameraWin = window.open('camera.html', 'wayang-camera', `popup,width=${w},height=${Math.round(w / tracker.aspect)}`);
    if (!cameraWin) showToast('Pop-up blocked. Allow pop-ups for this site to open the camera window.');
  }
  syncPreview();
}
popoutBtn.addEventListener('click', toggleCameraWindow);
$('preview-popout').addEventListener('click', toggleCameraWindow);
$('opt-size').addEventListener('input', (e) => {
  for (const p of puppets) p.baseScale = parseFloat(e.target.value);
});

// ---------- backsound ----------
const music = new BackgroundMusic(MUSIC_TRACKS[0].src);
const beatClock = new BeatClock(music.el);
beatClock.load('assets/backsound-beats.json');
window.wayang.music = music;
window.wayang.beatClock = beatClock;
const musicInput = $('opt-music');
for (const track of MUSIC_TRACKS) musicInput.add(new Option(track.label, track.id));
musicInput.value = MUSIC_TRACKS[0].id;
let selectedMusic = MUSIC_TRACKS[0];
let musicSelectionVersion = 0;
musicInput.addEventListener('change', async (e) => {
  const track = MUSIC_TRACKS.find((item) => item.id === e.target.value);
  if (!track) throw new Error(`Unknown music track "${e.target.value}"`);
  const version = ++musicSelectionVersion;
  try {
    beatClock.setBeats(null);
    if (track.beats) beatClock.load(track.beats);
    await music.setTrack(track.src);
    if (version !== musicSelectionVersion) return;
    selectedMusic = track;
  } catch (err) {
    console.error(err);
    if (version !== musicSelectionVersion) return;
    musicInput.value = selectedMusic.id;
    beatClock.setBeats(null);
    if (selectedMusic.beats) beatClock.load(selectedMusic.beats);
    showToast(`Musik tidak dapat diputar: ${err?.message || err}`);
  }
});
const soundBtn = $('sound-toggle');
const volumeInput = $('opt-volume');
volumeInput.value = String(music.volume);
function syncSoundUi() {
  soundBtn.setAttribute('aria-pressed', String(music.muted));
  soundBtn.setAttribute('aria-label', music.muted ? 'Unmute music' : 'Mute music');
}
syncSoundUi();
// autoplay with sound needs a user gesture: begin on the first click / tap / key
// (the mute button and M key handle themselves, so a first "mute" press doesn't start then stop it)
const startMusic = (e) => {
  if (e.target?.closest?.('#sound-toggle') || e.key?.toLowerCase() === 'm') return;
  music.start().then(() => {
    if (music.started) {
      removeEventListener('pointerdown', startMusic, true);
      removeEventListener('keydown', startMusic, true);
    }
  });
};
addEventListener('pointerdown', startMusic, true);
addEventListener('keydown', startMusic, true);
function toggleMusic() {
  music.setMuted(!music.muted);
  if (!music.muted) music.start();
  syncSoundUi();
}
soundBtn.addEventListener('click', toggleMusic);
volumeInput.addEventListener('input', (e) => {
  music.setVolume(parseFloat(e.target.value));
  if (music.muted && music.volume > 0) toggleMusic();
});

// F / G turn the left / right character around (switches facing to manual so it sticks)
function turnPuppet(i) {
  if (i >= controller.puppetCount) return;
  if (facingMode !== 'manual') {
    facingMode = 'manual';
    $('opt-facing').value = 'manual';
    applyFacing();
  }
  puppets[i].turn();
}

addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!quizModal.hidden) {
      closeQuiz();
      return;
    }
    if (!appMenu.hidden) {
      closeAppMenu();
      return;
    }
  }
  if (!quizModal.hidden) return;
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
  const k = e.key.toLowerCase();
  if (k === 'f') turnPuppet(0);
  else if (k === 'g') turnPuppet(1);
  else if (k === 'h') document.body.classList.toggle('ui-hidden');
  else if (k === 'm') toggleMusic();
  else if (k === 'd') controller.requestDance();
  else if (k === 'c') controller.recalibrate();
  else if (k === 'p') toggleCameraWindow();
  else if (k === 'v') {
    $('opt-camera').checked = !$('opt-camera').checked;
    $('opt-camera').dispatchEvent(new Event('change'));
  }
});

const toast = $('toast');
let toastTimer = 0;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateHud() {
  const { source, status } = controller;
  let text, cls = '';
  if (source === 'camera') {
    if (status.hands === 0) {
      text = controller.puppetCount === 2 ? 'Camera on · raise both hands' : 'Camera on · show your hand';
      cls = 'warn';
    } else {
      text = {
        'two puppets': status.hands === 2 ? 'Two puppets · one per hand' : 'Two puppets · 1 hand seen',
        'two hands': 'One puppet · gapit + tuding',
        'one hand': 'One puppet · palm + fingers',
      }[status.mode] ?? status.mode;
      if (status.calibrating) text += ' · calibrating depth';
      cls = 'live';
    }
  } else if (source === 'mouse') {
    text = 'Mouse · scroll for depth';
  } else {
    text = 'Demo';
  }
  if (statusText.textContent !== text) statusText.textContent = text;
  statusPill.className = `pill ${cls}`;
}

// Mirrored camera frame plus the hand-tracking overlay, into any 2D context (the corner preview or
// the pop-out window's canvas). Strokes grow with the canvas so they stay legible when large.
function drawCamera(ctx, W, H) {
  const s = Math.max(1, W / 480);
  ctx.save();
  ctx.translate(W, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, W, H);
  ctx.restore();
  ctx.fillStyle = 'rgba(20,10,4,0.35)';
  ctx.fillRect(0, 0, W, H);
  controller.slots.forEach((slot, i) => {
    if (!slot.active || !slot.landmarks) return;
    const P = slot.landmarks.map((l) => [(1 - l.x) * W, l.y * H]);
    // two puppets: gold = left character, blue = right; one puppet: gold = body hand
    const isBody = controller.puppetCount === 2 ? true : i === controller.bodySlot;
    const gold = controller.puppetCount === 2 ? slot.role !== 1 : isBody;
    ctx.strokeStyle = gold ? 'rgba(242,199,107,0.9)' : 'rgba(150,210,255,0.9)';
    ctx.lineWidth = 1.5 * s;
    ctx.beginPath();
    for (const [a, b] of HAND_EDGES) {
      ctx.moveTo(...P[a]);
      ctx.lineTo(...P[b]);
    }
    ctx.stroke();
    const pair = { 'thumb-index': [4, 8], 'thumb-pinky': [4, 20], 'index-pinky': [8, 20] }[controller.settings.fingers];
    ctx.fillStyle = '#ff6b4a';
    for (const t of pair) {
      ctx.beginPath();
      ctx.arc(...P[t], 4 * s, 0, Math.PI * 2);
      ctx.fill();
    }
    if (slot.pinky) {
      // little-finger sign recognised
      ctx.strokeStyle = '#ffe28a';
      ctx.lineWidth = 2.5 * s;
      ctx.beginPath();
      ctx.arc(...P[20], 8 * s, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (isBody) {
      const c = [0, 5, 9, 13, 17].reduce((acc, j) => [acc[0] + P[j][0] / 5, acc[1] + P[j][1] / 5], [0, 0]);
      ctx.strokeStyle = gold ? '#f2c76b' : '#96d2ff';
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      ctx.arc(...c, 9 * s, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

// used by the pop-out window (camera.html)
const cameraReady = () => controller.source === 'camera' && video.readyState >= 2;
Object.assign(window.wayang, {
  drawCamera,
  cameraReady,
  // the pop-out re-attaches itself if this page reloads while it stays open
  attachCameraWindow(win) {
    cameraWin = win;
    syncPreview();
  },
  cameraWindow: () => cameraWin,
});

let wasPoppedOut = false;
function drawPreview() {
  const out = cameraPoppedOut();
  if (out !== wasPoppedOut) {
    wasPoppedOut = out;
    syncPreview();
  }
  if (!previewBox.hidden && cameraReady()) drawCamera(pctx, preview.width, preview.height);
}

// ---------- loop ----------
let last = performance.now() / 1000;
const PHYS_DT = 1 / 120;

function tick(nowMs) {
  const t = nowMs / 1000;
  const dt = clamp(t - last, 0, 1 / 15);
  last = t;

  const inputs = controller.update(t, view);
  const active = puppets.slice(0, controller.puppetCount);
  // in "face each other" mode each character keeps its eyes on the other
  if (active.length === 2) {
    active[0].faceTargetX = active[1].pos.x;
    active[1].faceTargetX = active[0].pos.x;
  }
  // the dance follows the gamelan's beat (wirama)
  const beat = beatClock.tick(dt);
  const steps = Math.max(1, Math.ceil(dt / PHYS_DT));
  const rhythm = { db: beat.db / steps, pos: beat.pos, period: beat.period };
  for (let i = 0; i < steps; i++) {
    active.forEach((p, j) => p.update(dt / steps, i === 0 ? inputs[j] ?? { active: false } : { ...(inputs[j] ?? { active: false }), danceTrigger: false }, view, rhythm));
  }
  active.forEach((p, j) => {
    if (p.danceStarted) {
      p.danceStarted = false;
      showToast(active.length === 2 ? `${j === 0 ? 'Left' : 'Right'} puppet · Kiprahan` : 'Kiprahan');
    }
  });

  // back-to-front: the puppet held nearer the lamp is in front and casts the softer shadow
  const layers = active
    .map((p) => {
      const depth = Math.max(0, p.depth.x);
      return {
        depth: p.depth.x,
        items: p.frame(view),
        shadow: {
          scale: 1.03 + 0.2 * depth,
          dy: 8 + 34 * depth,
          blur: 3 + 30 * clamp(p.depth.x + 0.08, 0, 1.2),
          strength: 0.8 - 0.22 * clamp(depth, 0, 1),
        },
      };
    })
    .sort((a, b) => a.depth - b.depth);

  // blencong: an oil flame — flicker, and a slow sway that nudges every shadow
  const flicker = 1 + 0.03 * Math.sin(t * 7.3) + 0.02 * Math.sin(t * 13.7 + 1.1) + (noise1(t * 6.5) - 0.5) * 0.07;
  const sway = (noise1(t * 1.2 + 10) - 0.5) * 26;

  const frame = {
    view,
    layers,
    time: t,
    lamp: [STAGE_W / 2 + sway, -560, 1300],
    eye: [STAGE_W / 2, STAGE_H * 0.55, 2300],
    lampColor: [1.0, 0.8, 0.56],
    intensity: 1.08 * flicker,
    flicker,
    hot: [STAGE_W / 2 + sway * 0.7, 440],
  };
  renderer.render(frame);
  window.wayang.lastFrame = frame;

  drawPreview();
  updateHud();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
