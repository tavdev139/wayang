import { Renderer, STAGE_W, STAGE_H } from './renderer.js';
import { Puppet } from './rig.js';
import { CHARACTERS, CHARACTER_LIST, DEFAULT_CHARACTER, DEFAULT_PAIR, characterTextures } from './characters.js';
import { HandTracker } from './tracking.js';
import { Controller } from './controller.js';
import { BackgroundMusic, BeatClock } from './audio.js';
import { Affine, clamp, noise1, smoothstep } from './math.js';
import { STORIES, storyInputs, storySpeakerInputs } from './stories.js';
import { applyTranslations, getLanguage, setLanguage, t } from './i18n.js';

const $ = (id) => document.getElementById(id);
applyTranslations();
const canvas = $('stage');
const video = $('video');
const preview = $('preview');
const previewBox = $('preview-box');
const pctx = preview.getContext('2d');

const BACKGROUNDS = [
  { label: 'background.one', key: 'background-2', src: 'assets/background-2.png' },
  { label: 'background.two', key: 'background-3', src: 'assets/background-3.png' },
  { label: 'background.three', key: 'background-4', src: 'assets/background-4.png' },
  { label: 'background.four', key: 'background-5', src: 'assets/background-5.jpg' },
];
const STORY_BACKGROUNDS = [
  { key: 'story-welgeduwelbeh-palace', src: 'assets/story-background-welgeduwelbeh.jpg' },
  { key: 'story-pendopo', src: 'assets/story-background-pendopo.jpg' },
  { key: 'story-shore', src: 'assets/story-background-shore.jpg' },
  { key: 'story-ocean-floor', src: 'assets/story-background-ocean-floor.jpg' },
  { key: 'story-inner-world', src: 'assets/story-background-inner-world.jpg' },
];
const MUSIC_TRACKS = [
  { id: 'music-1', label: 'music.one', src: 'assets/music-2.mp3' },
  { id: 'music-2', label: 'music.two', src: 'assets/music-3.mp3' },
  { id: 'music-3', label: 'music.three', src: 'assets/music-4.mp3' },
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
  {
    question: 'Siapakah raja Alengka dalam kisah Ramayana?',
    options: ['Rahwana', 'Sugriwa', 'Wibisana', 'Kumbakarna'],
    answer: 'Rahwana',
    fact: 'Rahwana, yang juga dikenal sebagai Dasamuka, adalah raja Alengka.',
  },
  {
    question: 'Siapakah istri Rama dalam kisah Ramayana?',
    options: ['Dewi Sinta', 'Dewi Anjani', 'Dewi Tara', 'Dewi Arimbi'],
    answer: 'Dewi Sinta',
    fact: 'Dewi Sinta adalah istri Rama dan tokoh penting dalam Ramayana.',
  },
];
const QUIZ_QUESTIONS_EN = [
  {
    question: 'Which Pandawa is known as a master archer?',
    options: ['Arjuna', 'Werkudara', 'Yudistira', 'Hanoman'],
    answer: 'Arjuna',
    fact: 'Arjuna is known as the Pandawa skilled in archery.',
  },
  {
    question: 'What is another name for Werkudara?',
    options: ['Bima', 'Nakula', 'Arjuna', 'Gatot Kaca'],
    answer: 'Bima',
    fact: 'Bima is also known as Werkudara.',
  },
  {
    question: 'Who is the eldest of the Pandawa?',
    options: ['Yudistira', 'Arjuna', 'Sadewa', 'Werkudara'],
    answer: 'Yudistira',
    fact: 'Yudistira is the eldest of the Pandawa brothers.',
  },
  {
    question: 'Who are Gatot Kaca’s parents?',
    options: ['Bima and Arimbi', 'Arjuna and Subadra', 'Yudistira and Drupadi', 'Nakula and Sembadra'],
    answer: 'Bima and Arimbi',
    fact: 'In Javanese wayang stories, Gatot Kaca is the son of Bima and Arimbi.',
  },
  {
    question: 'Which white monkey helped Rama search for Sinta?',
    options: ['Hanoman', 'Gareng', 'Werkudara', 'Gatot Kaca'],
    answer: 'Hanoman',
    fact: 'Hanoman helped Rama search for Dewi Sinta.',
  },
  {
    question: 'In wayang tradition, who is Hanoman’s father?',
    options: ['Batara Bayu', 'Batara Guru', 'Batara Surya', 'Batara Indra'],
    answer: 'Batara Bayu',
    fact: 'In wayang tradition, Hanoman is known as the son of Batara Bayu.',
  },
  {
    question: 'Who is the king of Alengka in the Ramayana?',
    options: ['Rahwana', 'Sugriwa', 'Wibisana', 'Kumbakarna'],
    answer: 'Rahwana',
    fact: 'Rahwana, also known as Dasamuka, is the king of Alengka.',
  },
  {
    question: 'Who is Rama’s wife in the Ramayana?',
    options: ['Dewi Sinta', 'Dewi Anjani', 'Dewi Tara', 'Dewi Arimbi'],
    answer: 'Dewi Sinta',
    fact: 'Dewi Sinta is Rama’s wife and a central character in the Ramayana.',
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
    ...STORY_BACKGROUNDS.map(({ key, src }) => renderer.loadTexture(key, src)),
    renderer.loadTexture('story-gunungan', 'assets/gunungan.png'),
    // every character in characters.js, each under its own "<id>/<part>" key
    ...characterTextures().map(([key, src]) => renderer.loadTexture(key, src)),
  ]);
  renderer.setBackground(BACKGROUNDS[0].key);
} catch (err) {
  console.error(err);
  fail(t('toast.renderer-error', { message: err.message }));
  throw err;
}

// Face each other; account for characters whose source artwork faces right instead of left.
// Which figure each puppet plays comes from characters.js; pick them in Settings, or with ?left=arjuna&right=wayang-baru.
const tracker = new HandTracker(video);
const controller = new Controller(tracker);
let facingMode = 'target';
const params = new URLSearchParams(location.search);
const pick = (name, i) => [params.get(name), DEFAULT_PAIR[i], DEFAULT_CHARACTER].find((id) => CHARACTERS[id]);
const faceDirection = (character) => character.faceDirection ?? -1;
const leftCharacter = CHARACTERS[pick('left', 0)];
const rightCharacter = CHARACTERS[pick('right', 1)];
const puppets = [
  new Puppet({ x: 640, facing: faceDirection(leftCharacter), character: leftCharacter }),
  new Puppet({ x: 1280, facing: -faceDirection(rightCharacter), character: rightCharacter }),
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

async function startCamera(showProgress = false) {
  startBtn.disabled = true;
  introStatus.classList.remove('err');
  try {
    await tracker.start((msg) => {
      const statusKeys = {
        'Requesting camera…': 'toast.camera.request',
        'Loading hand-tracking model…': 'toast.camera.loading',
      };
      const status = statusKeys[msg] ? t(statusKeys[msg]) : msg;
      introStatus.textContent = status;
      if (showProgress) showToast(status);
    });
    controller.source = 'camera';
    controller.recalibrate();
    introStatus.textContent = '';
    intro.classList.add('gone');
    showChromeForActivity();
    preview.height = Math.round(preview.width / tracker.aspect);
    preview.style.aspectRatio = `${preview.width} / ${preview.height}`;
    syncPreview();
    return true;
  } catch (err) {
    console.error(err);
    introStatus.classList.add('err');
    const message = err?.name === 'NotAllowedError'
      ? t('toast.camera-denied')
      : t('toast.camera-error', { message: err?.message || err });
    introStatus.textContent = message;
    if (showProgress) showToast(message);
    startBtn.disabled = false;
    return false;
  }
}

startBtn.addEventListener('click', () => { startCamera(); });

$('use-mouse').addEventListener('click', () => {
  controller.source = 'mouse';
  intro.classList.add('gone');
  showChromeForActivity();
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
const languagePicker = $('language-picker');
const languageToggle = $('language-toggle');
const languageMenu = $('language-menu');
const menuToggle = $('menu-toggle');
const appMenu = $('app-menu');
const quizModal = $('quiz-modal');
const storyModal = $('story-modal');
const storyList = $('story-list');
const storyPlayback = $('story-playback');
const storyCaption = $('story-caption');
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
let quizSelectedOptionIndex = -1;
let activeStoryQuiz = null;
let activeStoryQuizStory = null;
let storyState = null;
const storyAudio = $('story-narration');
storyAudio.preload = 'auto';
let storyAudioToken = 0;
let chromeHideTimer = 0;
const CHROME_HIDE_DELAY = 3200;
const STORY_NARRATION_MUSIC_DUCK = 0.16;
const STORY_DIALOGUE_MUSIC_DUCK = 0.28;
const STORY_NARRATION_MUSIC_DUCK_SECONDS = 0.25;

function showChromeForActivity() {
  clearTimeout(chromeHideTimer);
  document.body.classList.remove('chrome-hidden');
  if (!storyState && controller.source !== 'camera') return;

  chromeHideTimer = setTimeout(() => {
    const overlayOpen =
      !settings.hidden ||
      !appMenu.hidden ||
      !quizModal.hidden ||
      !storyModal.hidden;
    if (!overlayOpen) document.body.classList.add('chrome-hidden');
  }, CHROME_HIDE_DELAY);
}

document.addEventListener('pointermove', showChromeForActivity, { passive: true });
document.addEventListener('pointerdown', showChromeForActivity, { passive: true });
document.addEventListener('keydown', showChromeForActivity);
document.addEventListener('focusin', showChromeForActivity);

function closeAppMenu() {
  appMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
}

function syncLanguagePicker() {
  const language = getLanguage();
  $('language-flag').textContent = language === 'en' ? '🇬🇧' : '🇮🇩';
  languageMenu.querySelectorAll('[data-language]').forEach((option) => {
    option.setAttribute('aria-pressed', String(option.dataset.language === language));
  });
}

function renderQuizQuestion() {
  const question = quizQuestions[quizIndex];
  const answerIndex = question.options.indexOf(question.answer);
  quizProgress.textContent = t('quiz.progress', { current: quizIndex + 1, total: quizQuestions.length });
  quizScore.textContent = t('quiz.score', { score: quizPoints });
  quizQuestion.textContent = question.question;
  quizFeedback.textContent = quizAnswered ? quizFeedbackText(question, answerIndex) : '';
  quizOptions.replaceChildren();
  quizNext.hidden = !quizAnswered;
  quizNext.textContent = quizIndex === quizQuestions.length - 1 ? t('quiz.results') : t('quiz.next');

  for (const { option, optionIndex } of shuffled(question.options.map((option, optionIndex) => ({ option, optionIndex })))) {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.textContent = option;
    button.disabled = quizAnswered;
    if (quizAnswered && optionIndex === answerIndex) button.classList.add('correct');
    else if (quizAnswered && optionIndex === quizSelectedOptionIndex) button.classList.add('wrong');
    button.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      quizSelectedOptionIndex = optionIndex;
      const correct = optionIndex === answerIndex;
      if (correct) quizPoints++;
      for (const answerButton of quizOptions.children) {
        answerButton.disabled = true;
        const answerButtonIndex = Number(answerButton.dataset.optionIndex);
        if (answerButtonIndex === answerIndex) answerButton.classList.add('correct');
        else if (answerButton === button) answerButton.classList.add('wrong');
      }
      quizScore.textContent = t('quiz.score', { score: quizPoints });
      quizFeedback.textContent = quizFeedbackText(question, answerIndex);
      quizNext.textContent = quizIndex === quizQuestions.length - 1 ? t('quiz.results') : t('quiz.next');
      quizNext.hidden = false;
      quizNext.focus();
    });
    button.dataset.optionIndex = String(optionIndex);
    quizOptions.append(button);
  }
}

function quizFeedbackText(question, answerIndex) {
  const correct = quizSelectedOptionIndex === answerIndex;
  const result = correct ? t('quiz.correct') : t('quiz.incorrect', { answer: question.options[answerIndex] });
  return `${result} ${question.fact}`;
}

function localizeQuizQuestion(index) {
  const english = getLanguage() === 'en' ? QUIZ_QUESTIONS_EN[index] : {};
  return { ...QUIZ_QUESTIONS[index], ...english, sourceIndex: index };
}

function localizeStoryQuizQuestion(index) {
  const question = activeStoryQuiz[index];
  const english = getLanguage() === 'en';
  return {
    question: english ? question.questionEn : question.question,
    options: english ? question.optionsEn : question.options,
    answer: english ? question.answerEn : question.answer,
    fact: english ? question.factEn : question.fact,
    sourceIndex: index,
  };
}

function startQuiz(storyQuiz = null, story = null) {
  activeStoryQuiz = storyQuiz;
  activeStoryQuizStory = storyQuiz ? story : null;
  quizQuestions = shuffled(storyQuiz
    ? storyQuiz.map((_question, index) => localizeStoryQuizQuestion(index))
    : QUIZ_QUESTIONS.map((_question, index) => localizeQuizQuestion(index)));
  quizIndex = 0;
  quizPoints = 0;
  quizAnswered = false;
  quizSelectedOptionIndex = -1;
  $('quiz-title').textContent = storyQuiz
    ? t('quiz.story-title', {
      story: getLanguage() === 'en' ? story.titleEn : story.title,
    })
    : t('quiz.title');
  quizGame.hidden = false;
  quizResults.hidden = true;
  renderQuizQuestion();
}

function renderQuizResultsText() {
  const total = quizQuestions.length;
  const message = quizPoints === total
    ? t(activeStoryQuiz ? 'quiz.story-perfect' : 'quiz.perfect')
    : t(activeStoryQuiz ? 'quiz.story-try-again' : 'quiz.try-again');
  quizResultScore.textContent = t('quiz.result-score', { score: quizPoints, total, message });
}

function showQuizResults() {
  quizGame.hidden = true;
  quizResults.hidden = false;
  renderQuizResultsText();
  $('quiz-restart').focus();
}

function closeQuiz() {
  quizModal.hidden = true;
  activeStoryQuiz = null;
  activeStoryQuizStory = null;
  menuToggle.focus();
}

function storyLineAt(story, index) {
  let offset = 0;
  for (let sceneIndex = 0; sceneIndex < story.scenes.length; sceneIndex++) {
    const scene = story.scenes[sceneIndex];
    if (index < offset + scene.lines.length) {
      const sceneLineIndex = index - offset;
      const line = scene.lines[sceneLineIndex];
      const nextLine = scene.lines[sceneLineIndex + 1];
      return {
        scene,
        sceneIndex,
        sceneLineIndex,
        line,
        duration: (nextLine?.at ?? scene.duration) - line.at,
      };
    }
    offset += scene.lines.length;
  }
  throw new RangeError(`Story line ${index} is out of range for "${story.id}"`);
}

function storyBackgroundAt(scene, time) {
  let background = scene.background;
  for (const change of scene.backgroundChanges ?? []) {
    if (change.at > time) break;
    background = change.key;
  }
  return background;
}

function syncStoryBackground(scene, time) {
  const background = storyBackgroundAt(scene, time);
  if (storyState.backgroundKey === background) return;
  storyState.backgroundKey = background;
  renderer.setBackground(background);
}

function playStoryAudio(token) {
  const playback = storyAudio.play();
  if (!playback) return;
  playback.catch((error) => {
    if (!storyState || token !== storyAudioToken || error.name === 'AbortError') return;
    storyState.paused = true;
    music.setDuck(1);
    renderStoryPlayback();
    showToast(t('toast.narration-error'));
    console.error('Story audio playback failed:', error);
  });
}

function playStoryLineAudio(line) {
  const token = ++storyAudioToken;
  storyAudio.pause();
  storyAudio.removeAttribute('src');
  if (line.audio) storyAudio.src = line.audio;
  storyAudio.load();
  music.setDuck(
    line.audio ? STORY_DIALOGUE_MUSIC_DUCK : 1,
    line.audio ? STORY_NARRATION_MUSIC_DUCK_SECONDS : 0.5,
  );
  if (line.audio) playStoryAudio(token);
}

function playStoryScene(sceneIndex, sceneLineIndex = 0) {
  const scene = storyState.story.scenes[sceneIndex];
  const token = ++storyAudioToken;
  const lineAudio = scene.lines[sceneLineIndex].audio;
  const musicDuck = lineAudio
    ? STORY_DIALOGUE_MUSIC_DUCK
    : scene.audio
      ? STORY_NARRATION_MUSIC_DUCK
      : 1;
  music.setDuck(
    musicDuck,
    musicDuck < 1 ? STORY_NARRATION_MUSIC_DUCK_SECONDS : 0.5,
  );
  storyState.audioSceneIndex = sceneIndex;
  storyState.lineIndex = storyState.story.scenes
    .slice(0, sceneIndex)
    .reduce((sum, item) => sum + item.lines.length, 0) + sceneLineIndex;
  storyState.elapsed = 0;
  storyState.textTime = scene.lines[sceneLineIndex].at;
  storyState.paused = false;
  storyState.completed = false;
  storyAudio.pause();
  storyAudio.removeAttribute('src');
  if (scene.audio) storyAudio.src = scene.audio;
  storyAudio.load();
  renderStoryPlayback();

  if (scene.lines.some((line) => line.audio)) {
    playStoryLineAudio(scene.lines[sceneLineIndex]);
    return;
  }

  if (!scene.audio) return;

  if (sceneLineIndex === 0) {
    playStoryAudio(token);
    return;
  }

  const seekAndPlay = () => {
    if (!storyState || token !== storyAudioToken) return;
    storyAudio.currentTime = scene.lines[sceneLineIndex].at;
    playStoryAudio(token);
  };
  if (storyAudio.readyState >= HTMLMediaElement.HAVE_METADATA) {
    seekAndPlay();
  } else {
    storyAudio.addEventListener('loadedmetadata', seekAndPlay, { once: true });
  }
}

function finishStory() {
  storyState.lineIndex = storyState.totalLines - 1;
  storyState.elapsed = storyLineAt(storyState.story, storyState.lineIndex).duration;
  storyState.paused = true;
  storyState.completed = true;
  music.setDuck(1);
  renderStoryPlayback();
}

function seekStoryLine(index) {
  const target = storyLineAt(storyState.story, index);
  if (target.sceneIndex !== storyState.audioSceneIndex) {
    playStoryScene(target.sceneIndex, target.sceneLineIndex);
    return;
  }

  if (target.scene.lines.some((line) => line.audio)) {
    storyState.lineIndex = index;
    storyState.elapsed = 0;
    storyState.textTime = target.line.at;
    storyState.paused = false;
    storyState.completed = false;
    renderStoryPlayback();
    playStoryLineAudio(target.line);
    return;
  }

  if (!target.scene.audio) {
    storyState.lineIndex = index;
    storyState.elapsed = 0;
    storyState.textTime = target.line.at;
    storyState.paused = false;
    storyState.completed = false;
    renderStoryPlayback();
    return;
  }

  const token = storyAudioToken;
  music.setDuck(STORY_NARRATION_MUSIC_DUCK, STORY_NARRATION_MUSIC_DUCK_SECONDS);
  storyState.lineIndex = index;
  storyState.elapsed = 0;
  storyState.paused = false;
  storyState.completed = false;
  renderStoryPlayback();

  const seekAndPlay = () => {
    if (!storyState || token !== storyAudioToken) return;
    storyAudio.currentTime = target.line.at;
    playStoryAudio(token);
  };
  if (storyAudio.readyState >= HTMLMediaElement.HAVE_METADATA) {
    seekAndPlay();
  } else {
    storyAudio.addEventListener('loadedmetadata', seekAndPlay, { once: true });
  }
}

storyAudio.addEventListener('ended', () => {
  if (!storyState || storyState.paused) return;
  const activeScene = storyState.story.scenes[storyState.audioSceneIndex];
  if (activeScene.lines.some((line) => line.audio)) {
    music.setDuck(1);
    return;
  }
  const nextSceneIndex = storyState.audioSceneIndex + 1;
  if (nextSceneIndex < storyState.story.scenes.length) {
    playStoryScene(nextSceneIndex);
    return;
  }
  finishStory();
});

function renderStoryPlayback() {
  if (!storyState) return;
  const { story, lineIndex } = storyState;
  const { scene, sceneIndex, line } = storyLineAt(story, lineIndex);
  if (scene.puppetCharacters) {
    if (scene.puppetCharacters.length !== puppets.length) {
      throw new RangeError(`Story "${story.id}" scene "${scene.title}" must assign every puppet character`);
    }
    scene.puppetCharacters.forEach((characterId, index) => {
      const character = CHARACTERS[characterId];
      if (!character) throw new Error(`Story "${story.id}" references unknown character "${characterId}"`);
      if (puppets[index].char.id !== character.id) puppets[index].setCharacter(character);
    });
  }
  if (line.actor) {
    const actor = story.actors?.[line.actor];
    if (!actor) throw new Error(`Story "${story.id}" references unknown actor "${line.actor}"`);
    const character = CHARACTERS[actor.character];
    const puppet = puppets[actor.puppet];
    if (!character || !puppet) throw new Error(`Story "${story.id}" has an invalid actor mapping for "${line.actor}"`);
    if (puppet.char.id !== character.id) puppet.setCharacter(character);
  }
  if (storyState.sceneIndex !== sceneIndex) {
    storyState.sceneIndex = sceneIndex;
  }
  syncStoryBackground(scene, scene.audio ? storyAudio.currentTime : storyState.textTime);
  const speaker = getLanguage() === 'en' ? line.speakerEn : line.speaker;
  const text = getLanguage() === 'en' ? line.textEn : line.text;
  $('story-line').textContent = speaker ? `${speaker}: ${text}` : text;
  $('story-prev').disabled = lineIndex === 0;
  const isPlaying = !storyState.paused && !storyState.completed;
  const playLabel = storyState.completed ? t('story.play-again') : storyState.paused ? t('story.resume') : t('story.pause');
  const subtitleLabel = storyState.subtitlesVisible ? t('story.subtitle.hide') : t('story.subtitle.show');
  const nextLabel = lineIndex === storyState.totalLines - 1 ? t('story.finish') : t('story.next');
  $('story-play-toggle').dataset.playing = String(isPlaying);
  $('story-play-toggle').setAttribute('aria-label', playLabel);
  $('story-play-toggle').title = playLabel;
  $('story-next').setAttribute('aria-label', nextLabel);
  $('story-next').title = nextLabel;
  $('story-subtitle-toggle').setAttribute('aria-label', subtitleLabel);
  $('story-subtitle-toggle').title = subtitleLabel;
  $('story-subtitle-toggle').setAttribute('aria-pressed', String(storyState.subtitlesVisible));
  storyCaption.hidden = !storyState.subtitlesVisible;
}

function renderStoryList() {
  storyList.replaceChildren();
  for (const story of STORIES) {
    const characters = story.characters.map((id) => {
      const character = CHARACTERS[id];
      if (!character) throw new Error(`Story "${story.id}" references unknown character "${id}"`);
      return character;
    });
    const cast = (story.cast ?? story.characters).map((id) => {
      const character = CHARACTERS[id];
      if (!character) throw new Error(`Story "${story.id}" references unknown cast member "${id}"`);
      return character;
    });
    const button = document.createElement('button');
    button.className = 'story-card';
    button.type = 'button';

    const portrait = document.createElement('img');
    portrait.className = 'story-card-portrait';
    portrait.src = characters[0].body.src;
    portrait.alt = t('story.portrait', { name: characters[0].name });

    const copy = document.createElement('span');
    copy.className = 'story-card-copy';
    const title = document.createElement('span');
    title.className = 'story-card-title';
    title.textContent = getLanguage() === 'en' ? story.titleEn : story.title;
    const description = document.createElement('span');
    description.className = 'story-card-description';
    description.textContent = getLanguage() === 'en' ? story.descriptionEn : story.description;
    const conjunction = getLanguage() === 'en' ? ' and ' : ' dan ';
    const castText = document.createElement('span');
    castText.className = 'story-card-characters';
    castText.textContent = t('story.cast', { names: cast.map((character) => character.name).join(conjunction) });
    copy.append(title, description, castText);

    const action = document.createElement('span');
    action.className = 'story-card-action';
    action.textContent = t('story.start');
    button.append(portrait, copy, action);
    button.addEventListener('click', () => startStory(story));
    storyList.append(button);
  }
}

function withGununganEnding(story) {
  const lastScene = story.scenes[story.scenes.length - 1];
  if (!lastScene) throw new RangeError(`Story "${story.id}" has no scenes`);
  if (lastScene.motion === 'gunungan') return story;
  return {
    ...story,
    scenes: [
      ...story.scenes,
      {
        title: 'Gunungan Menutup Kisah',
        titleEn: 'The Gunungan Closes the Story',
        background: storyBackgroundAt(lastScene, lastScene.duration),
        motion: 'gunungan',
        duration: 5.5,
        lines: [{
          at: 0,
          text: 'Gunungan ditancepkan untuk menutup pagelaran.',
          textEn: 'The gunungan is raised to close the performance.',
        }],
      },
    ],
  };
}

function setPuppetFacing(puppet, facing) {
  puppet.facing = facing;
  puppet.flip = { from: facing, to: facing, t: 1 };
  puppet.flipX = facing;
  puppet.facingMode = 'manual';
  puppet.turnTimer = 0;
  puppet.faceTargetX = null;
  puppet.dance = null;
  puppet.danceStarted = false;
  puppet.danceOffset = [0, 0];
  puppet.danceTilt = 0;
}

async function startStory(story) {
  story = withGununganEnding(story);
  const characters = story.characters.map((id) => {
    const character = CHARACTERS[id];
    if (!character) throw new Error(`Story "${story.id}" references unknown character "${id}"`);
    return character;
  });
  if (characters.length !== 2) throw new Error(`Story "${story.id}" must have exactly two characters`);
  const totalLines = story.scenes.reduce((sum, scene) => sum + scene.lines.length, 0);
  if (totalLines === 0) throw new Error(`Story "${story.id}" has no narration lines`);

  const storyButtons = [...storyList.querySelectorAll('button')];
  storyButtons.forEach((button) => { button.disabled = true; });
  let previousMusicTrack = selectedMusic;
  try {
    if (story.interactive && controller.source !== 'camera') {
      const cameraStarted = await startCamera(true);
      if (!cameraStarted) return;
    }
    previousMusicTrack = selectedMusic;
    await startStoryMusic();
  } finally {
    storyButtons.forEach((button) => { button.disabled = false; });
  }

  storyState = {
    story,
    lineIndex: 0,
    elapsed: 0,
    totalLines,
    paused: false,
    completed: false,
    stopping: false,
    subtitlesVisible: true,
    sceneIndex: -1,
    backgroundKey: null,
    audioSceneIndex: -1,
    motionSceneIndex: -1,
    saved: {
      characters: puppets.map((puppet) => puppet.char.id),
      settingsCharacters: controller.settings.characters,
      source: controller.source,
      musicTrack: previousMusicTrack,
      facingMode,
      facing: puppets.map((puppet) => ({
        facing: puppet.facing,
        flip: { ...puppet.flip },
        flipX: puppet.flipX,
        facingMode: puppet.facingMode,
        faceTargetX: puppet.faceTargetX,
        turnTimer: puppet.turnTimer,
        baseScale: puppet.baseScale,
      })),
      background: backgroundInput.value,
      introVisible: !intro.classList.contains('gone'),
    },
  };

  closeAppMenu();
  clearTimeout(toastTimer);
  toast.classList.remove('show');
  intro.classList.add('gone');
  settings.hidden = true;
  settingsToggle.setAttribute('aria-expanded', 'false');
  controller.settings.characters = 'two';
  $('opt-characters').value = 'two';
  puppets.forEach((puppet, index) => {
    puppet.setCharacter(characters[index]);
    puppet.baseScale = Math.min(0.53, Math.max(0.18, view.w / 1800));
    // The left puppet faces right; the right puppet faces left.
    setPuppetFacing(
      puppet,
      story.facing?.[index] ?? (index === 0 ? faceDirection(characters[index]) : -faceDirection(characters[index])),
    );
  });
  storyModal.hidden = true;
  storyPlayback.hidden = false;
  playStoryScene(0);
  showChromeForActivity();
  $('story-play-toggle').focus();
}

function stopStory() {
  const state = storyState;
  if (!state || state.stopping) return;
  state.stopping = true;
  state.paused = true;
  storyAudioToken++;
  storyAudio.pause();
  music.setDuck(1);
  if (storyState !== state) return;
  const { saved } = state;
  storyState = null;
  restoreStoryMusic(saved.musicTrack);
  storyAudio.removeAttribute('src');
  storyAudio.load();
  puppets.forEach((puppet, index) => {
    puppet.setCharacter(CHARACTERS[saved.characters[index]]);
    const prior = saved.facing[index];
    puppet.facing = prior.facing;
    puppet.flip = { ...prior.flip };
    puppet.flipX = prior.flipX;
    puppet.facingMode = prior.facingMode;
    puppet.faceTargetX = prior.faceTargetX;
    puppet.turnTimer = prior.turnTimer;
    puppet.baseScale = prior.baseScale;
    puppet.dance = null;
    puppet.danceStarted = false;
    puppet.danceOffset = [0, 0];
    puppet.danceTilt = 0;
    for (const spring of Object.values(puppet.dSpring)) spring.snap(0);
  });
  controller.settings.characters = saved.settingsCharacters;
  controller.source = saved.source;
  facingMode = saved.facingMode;
  $('opt-characters').value = saved.settingsCharacters;
  $('opt-char-left').value = saved.characters[0];
  $('opt-char-right').value = saved.characters[1];
  $('opt-facing').value = facingMode;
  applyFacing();
  backgroundInput.value = saved.background;
  renderer.setBackground(saved.background);
  intro.classList.toggle('gone', !saved.introVisible);
  storyPlayback.hidden = true;
  showChromeForActivity();
  $('open-stories').focus();
}

function finishStoryAndLaunchQuiz() {
  const story = storyState?.story;
  stopStory();
  if (!story?.quiz?.length) return;
  quizModal.hidden = false;
  startQuiz(story.quiz, story);
  $('quiz-close').focus();
}

function advanceStory(dt, nowSeconds) {
  if (!storyState) return [];
  if (storyState.completed) {
    return storyState.story.interactive ? controller.update(nowSeconds, view) : [];
  }
  const activeScene = storyState.story.scenes[storyState.audioSceneIndex];
  let time = storyAudio.currentTime;
  if (!activeScene.audio) {
    if (!storyState.paused && !storyState.completed) {
      storyState.textTime = Math.min(activeScene.duration, storyState.textTime + dt);
    }
    time = storyState.textTime;
    if (time >= activeScene.duration && !storyState.completed) {
      const nextSceneIndex = storyState.audioSceneIndex + 1;
      if (nextSceneIndex < storyState.story.scenes.length) {
        playStoryScene(nextSceneIndex);
      } else {
        finishStory();
      }
      if (storyState.story.interactive) return controller.update(nowSeconds, view);
      return [];
    }
  }
  syncStoryBackground(activeScene, time);
  let sceneLineIndex = 0;
  while (
    sceneLineIndex + 1 < activeScene.lines.length &&
    activeScene.lines[sceneLineIndex + 1].at <= time
  ) {
    sceneLineIndex++;
  }
  const lineOffset = storyState.story.scenes
    .slice(0, storyState.audioSceneIndex)
    .reduce((sum, item) => sum + item.lines.length, 0);
  const lineIndex = lineOffset + sceneLineIndex;
  const line = activeScene.lines[sceneLineIndex];
  storyState.elapsed = Math.max(0, time - line.at);
  if (lineIndex !== storyState.lineIndex || storyState.sceneIndex < 0) {
    storyState.lineIndex = lineIndex;
    renderStoryPlayback();
    if (activeScene.lines.some((item) => item.audio)) playStoryLineAudio(line);
  }
  let inputs;
  if (storyState.story.interactive) {
    inputs = controller.update(nowSeconds, view);
    inputs = inputs.map((input, index) => {
      if (input.active !== false) return input;
      const idle = controller.idleInput(time, index);
      idle.body = null;
      idle.tilt = Math.sin(time * 0.55 + index) * 0.015;
      return idle;
    });
  } else {
    inputs = storyInputs(storyState.story, storyState.lineIndex, storyState.elapsed, view);
    const { sceneIndex } = storyLineAt(storyState.story, storyState.lineIndex);
    if (storyState.motionSceneIndex !== sceneIndex) {
      storyState.motionSceneIndex = sceneIndex;
      if (activeScene.motion === 'war') inputs[1].danceTrigger = true;
      if (activeScene.danceTrigger) inputs.forEach((input) => { input.danceTrigger = true; });
    }
  }
  return storySpeakerInputs(inputs, storyState.story, line, activeScene, time);
}

menuToggle.addEventListener('click', () => {
  const open = appMenu.hidden;
  languageMenu.hidden = true;
  languageToggle.setAttribute('aria-expanded', 'false');
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
$('open-stories').addEventListener('click', () => {
  closeAppMenu();
  renderStoryList();
  storyModal.hidden = false;
  storyList.querySelector('button')?.focus();
});
$('story-close').addEventListener('click', () => {
  storyModal.hidden = true;
  $('open-stories').focus();
});
storyModal.addEventListener('click', (e) => {
  if (e.target === storyModal) {
    storyModal.hidden = true;
    $('open-stories').focus();
  }
});
$('story-prev').addEventListener('click', () => {
  if (!storyState || storyState.stopping || storyState.lineIndex === 0) return;
  seekStoryLine(storyState.lineIndex - 1);
});
$('story-next').addEventListener('click', () => {
  if (!storyState || storyState.stopping) return;
  if (storyState.lineIndex === storyState.totalLines - 1) {
    finishStoryAndLaunchQuiz();
    return;
  }
  seekStoryLine(storyState.lineIndex + 1);
});
$('story-play-toggle').addEventListener('click', () => {
  if (!storyState || storyState.stopping) return;
  if (storyState.completed) {
    storyState.sceneIndex = -1;
    playStoryScene(0);
  } else {
    const activeScene = storyState.story.scenes[storyState.audioSceneIndex];
    const activeLine = storyLineAt(storyState.story, storyState.lineIndex).line;
    storyState.paused = !storyState.paused;
    if (storyState.paused) storyAudio.pause();
    if (storyState.paused) music.setDuck(1);
    else {
      const lineAudioIsPlaying = activeLine.audio &&
        !storyAudio.ended &&
        (!Number.isFinite(storyAudio.duration) || storyAudio.currentTime < storyAudio.duration);
      const activeMusicDuck = lineAudioIsPlaying
        ? STORY_DIALOGUE_MUSIC_DUCK
        : activeScene.audio
          ? STORY_NARRATION_MUSIC_DUCK
          : 1;
      music.setDuck(
        activeMusicDuck,
        activeMusicDuck < 1 ? STORY_NARRATION_MUSIC_DUCK_SECONDS : 0.5,
      );
      if (activeScene.lines.some((line) => line.audio)) {
        if (lineAudioIsPlaying) playStoryAudio(storyAudioToken);
      } else if (activeScene.audio) {
        playStoryAudio(storyAudioToken);
      }
    }
  }
  renderStoryPlayback();
});
$('story-subtitle-toggle').addEventListener('click', () => {
  if (!storyState || storyState.stopping) return;
  storyState.subtitlesVisible = !storyState.subtitlesVisible;
  renderStoryPlayback();
});
$('story-exit').addEventListener('click', stopStory);
$('quiz-close').addEventListener('click', closeQuiz);
$('quiz-finish').addEventListener('click', closeQuiz);
$('quiz-restart').addEventListener('click', () => {
  startQuiz(activeStoryQuiz, activeStoryQuizStory);
  $('quiz-close').focus();
});
$('quiz-next').addEventListener('click', () => {
  if (quizIndex === quizQuestions.length - 1) {
    showQuizResults();
    return;
  }
  quizIndex++;
  quizAnswered = false;
  quizSelectedOptionIndex = -1;
  renderQuizQuestion();
  quizOptions.querySelector('button')?.focus();
});
quizModal.addEventListener('click', (e) => {
  if (e.target === quizModal) closeQuiz();
});
settingsToggle.addEventListener('click', () => {
  languageMenu.hidden = true;
  languageToggle.setAttribute('aria-expanded', 'false');
  closeAppMenu();
  settings.hidden = !settings.hidden;
  settingsToggle.setAttribute('aria-expanded', String(!settings.hidden));
});
languageToggle.addEventListener('click', () => {
  const open = languageMenu.hidden;
  languageMenu.hidden = !open;
  languageToggle.setAttribute('aria-expanded', String(open));
  if (open) languageMenu.querySelector('[aria-pressed="true"]')?.focus();
});
languageMenu.querySelectorAll('[data-language]').forEach((option) => {
  option.addEventListener('click', () => {
    setLanguage(option.dataset.language);
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
    languageToggle.focus();
  });
});
document.addEventListener('pointerdown', (event) => {
  if (!languagePicker.contains(event.target)) {
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }
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
for (const background of BACKGROUNDS) backgroundInput.add(new Option(t(background.label), background.key));
backgroundInput.value = BACKGROUNDS[0].key;
backgroundInput.addEventListener('change', (e) => renderer.setBackground(e.target.value));
$('opt-audience-view').addEventListener('change', (e) => renderer.setAudienceView(e.target.checked));
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
  popoutBtn.textContent = t(out ? 'settings.camera.return' : 'settings.camera.open');
  if (!previewBox.hidden && previewBox.style.left) {
    const rect = previewBox.getBoundingClientRect();
    positionPreview(rect.left, rect.top);
  }
}

function positionPreview(left, top) {
  const margin = 8;
  const maxLeft = Math.max(margin, innerWidth - previewBox.offsetWidth - margin);
  const maxTop = Math.max(margin, innerHeight - previewBox.offsetHeight - margin);
  previewBox.style.left = `${clamp(left, margin, maxLeft)}px`;
  previewBox.style.top = `${clamp(top, margin, maxTop)}px`;
  previewBox.style.right = 'auto';
  previewBox.style.bottom = 'auto';
}

let previewDrag = null;
previewBox.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.popout-btn')) return;
  const rect = previewBox.getBoundingClientRect();
  previewDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  previewBox.setPointerCapture(event.pointerId);
  previewBox.classList.add('dragging');
  event.preventDefault();
});
previewBox.addEventListener('pointermove', (event) => {
  if (!previewDrag || event.pointerId !== previewDrag.pointerId) return;
  positionPreview(event.clientX - previewDrag.offsetX, event.clientY - previewDrag.offsetY);
});
function finishPreviewDrag(event) {
  if (!previewDrag || event.pointerId !== previewDrag.pointerId) return;
  previewBox.classList.remove('dragging');
  if (previewBox.hasPointerCapture(event.pointerId)) previewBox.releasePointerCapture(event.pointerId);
  previewDrag = null;
}
previewBox.addEventListener('pointerup', finishPreviewDrag);
previewBox.addEventListener('pointercancel', finishPreviewDrag);
previewBox.addEventListener('keydown', (event) => {
  const delta = {
    ArrowLeft: [-16, 0],
    ArrowRight: [16, 0],
    ArrowUp: [0, -16],
    ArrowDown: [0, 16],
  }[event.key];
  if (!delta) return;
  const rect = previewBox.getBoundingClientRect();
  positionPreview(rect.left + delta[0], rect.top + delta[1]);
  event.preventDefault();
});
window.addEventListener('resize', () => {
  if (previewBox.hidden || !previewBox.style.left) return;
  const rect = previewBox.getBoundingClientRect();
  positionPreview(rect.left, rect.top);
});

function toggleCameraWindow() {
  if (cameraPoppedOut()) {
    cameraWin.close();
  } else {
    const w = Math.round(Math.min(960, screen.availWidth * 0.6));
    cameraWin = window.open('camera.html', 'wayang-camera', `popup,width=${w},height=${Math.round(w / tracker.aspect)}`);
    if (!cameraWin) showToast(t('toast.popup-blocked'));
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
window.wayang.music = music;
window.wayang.beatClock = beatClock;
const musicInput = $('opt-music');
for (const track of MUSIC_TRACKS) musicInput.add(new Option(t(track.label), track.id));
musicInput.value = MUSIC_TRACKS[0].id;
let selectedMusic = MUSIC_TRACKS[0];
let musicSelectionVersion = 0;
async function startStoryMusic() {
  const track = MUSIC_TRACKS.find((item) => item.id === 'music-3');
  if (!track) throw new Error('Story music track "music-3" is not configured');

  const version = ++musicSelectionVersion;
  beatClock.setBeats(null);
  if (track.beats) beatClock.load(track.beats);
  try {
    await music.setTrack(track.src);
    return version === musicSelectionVersion;
  } catch (err) {
    console.error(err);
    if (version !== musicSelectionVersion) return false;
    beatClock.setBeats(null);
    if (selectedMusic.beats) beatClock.load(selectedMusic.beats);
    showToast(t('toast.music-error', { message: err?.message || err }));
    return false;
  }
}
function restoreStoryMusic(track) {
  const version = ++musicSelectionVersion;
  beatClock.setBeats(null);
  if (track.beats) beatClock.load(track.beats);
  music.setTrack(track.src).catch((err) => {
    if (version !== musicSelectionVersion) return;
    console.error(err);
    showToast(t('toast.music-error', { message: err?.message || err }));
  });
}
function refreshLocalizedOptions() {
  const background = backgroundInput.value || BACKGROUNDS[0].key;
  const musicTrack = musicInput.value || selectedMusic.id;
  backgroundInput.replaceChildren(...BACKGROUNDS.map((item) => new Option(t(item.label), item.key)));
  backgroundInput.value = background;
  musicInput.replaceChildren(...MUSIC_TRACKS.map((item) => new Option(t(item.label), item.id)));
  musicInput.value = musicTrack;
}
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
    showToast(t('toast.music-error', { message: err?.message || err }));
  }
});
const soundBtn = $('sound-toggle');
const soundControl = $('sound-control');
const soundMenu = $('sound-menu');
const soundMuteBtn = $('sound-mute-toggle');
const volumeInput = $('opt-volume');
volumeInput.value = String(music.volume);
function syncSoundUi() {
  soundBtn.dataset.muted = String(music.muted);
  soundMuteBtn.setAttribute('aria-pressed', String(music.muted));
  soundMuteBtn.textContent = t(music.muted ? 'toast.music-unmute' : 'toast.music-mute');
}
function setSoundMenuOpen(open, restoreFocus = false) {
  if (open) {
    closeAppMenu();
    settings.hidden = true;
    settingsToggle.setAttribute('aria-expanded', 'false');
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }
  soundMenu.hidden = !open;
  soundBtn.setAttribute('aria-expanded', String(open));
  if (open) volumeInput.focus();
  else if (restoreFocus) soundBtn.focus();
}
syncSoundUi();
soundBtn.addEventListener('click', () => setSoundMenuOpen(soundMenu.hidden));
soundMuteBtn.addEventListener('click', toggleMusic);
soundControl.addEventListener('focusout', (event) => {
  if (!soundControl.contains(event.relatedTarget)) setSoundMenuOpen(false);
});
document.addEventListener('pointerdown', (event) => {
  if (!soundMenu.hidden && !soundControl.contains(event.target)) setSoundMenuOpen(false);
});
syncLanguagePicker();
document.addEventListener('app-language-change', () => {
  syncLanguagePicker();
  refreshLocalizedOptions();
  syncPreview();
  syncSoundUi();
  updateHud();
  if (!quizModal.hidden) {
    $('quiz-title').textContent = activeStoryQuiz
      ? t('quiz.story-title', {
        story: getLanguage() === 'en' ? activeStoryQuizStory.titleEn : activeStoryQuizStory.title,
      })
      : t('quiz.title');
    if (quizResults.hidden) {
      quizQuestions = quizQuestions.map((question) => activeStoryQuiz
        ? localizeStoryQuizQuestion(question.sourceIndex)
        : localizeQuizQuestion(question.sourceIndex));
      renderQuizQuestion();
    } else {
      renderQuizResultsText();
    }
  }
  if (!storyModal.hidden) renderStoryList();
  if (storyState) renderStoryPlayback();
});
// autoplay with sound needs a user gesture: begin on the first click / tap / key
// (the mute button and M key handle themselves, so a first "mute" press doesn't start then stop it)
const startMusic = (e) => {
  if (e.target?.closest?.('#sound-toggle, #sound-mute-toggle') || e.key?.toLowerCase() === 'm') return;
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
volumeInput.addEventListener('input', (e) => {
  music.setVolume(parseFloat(e.target.value));
  if (music.muted && music.volume > 0) toggleMusic();
  else syncSoundUi();
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
    if (!languageMenu.hidden) {
      languageMenu.hidden = true;
      languageToggle.setAttribute('aria-expanded', 'false');
      languageToggle.focus();
      return;
    }
    if (!soundMenu.hidden) {
      setSoundMenuOpen(false, true);
      return;
    }
    if (storyState) {
      stopStory();
      return;
    }
    if (!storyModal.hidden) {
      storyModal.hidden = true;
      $('open-stories').focus();
      return;
    }
    if (!quizModal.hidden) {
      closeQuiz();
      return;
    }
    if (!appMenu.hidden) {
      closeAppMenu();
      return;
    }
  }
  if (!quizModal.hidden || !storyModal.hidden || storyState) return;
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
    statusPill.hidden = false;
    if (status.hands === 0) {
      text = t(controller.puppetCount === 2 ? 'hud.camera-both' : 'hud.camera-one');
      cls = 'warn';
    } else {
      text = {
        'two puppets': t(status.hands === 2 ? 'hud.two-puppets' : 'hud.two-puppets-one-hand'),
        'two hands': t('hud.one-puppet-rods'),
        'one hand': t('hud.one-puppet-fingers'),
      }[status.mode] ?? status.mode;
      if (status.calibrating) text += ` · ${t('hud.calibrating')}`;
      cls = 'live';
    }
  } else if (source === 'mouse') {
    statusPill.hidden = false;
    text = t('hud.mouse');
  } else {
    statusPill.hidden = true;
    text = '';
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

function addGununganClosing(layers, elapsed) {
  const rise = smoothstep(0, 1.15, elapsed);
  const shake = Math.exp(-elapsed * 0.9);
  const width = 331;
  const height = 543;
  const scale = (view.h * 0.7 / height) * (0.92 + 0.08 * rise);
  const angle = Math.sin(elapsed * 10) * 0.14 * shake + Math.sin(elapsed * 2.8) * 0.01;
  const centerX = view.x + view.w / 2 + Math.sin(elapsed * 10) * view.w * 0.025 * shake;
  const baseY = view.y + view.h * (1.24 - 0.36 * rise)
    - Math.abs(Math.sin(elapsed * 10)) * view.h * 0.018 * shake;
  const matrix = Affine.chain(
    Affine.translate(centerX, baseY),
    Affine.rotate(angle),
    Affine.scale(scale),
    Affine.translate(-width / 2, -height),
  );
  const rodWidth = view.h * 0.008;
  const rod = {
    kind: 'stick',
    id: 'gunungan-gapit',
    style: 'gapit',
    pts: [
      { p: Affine.apply(matrix, width / 2, height * 0.91), w: rodWidth * 0.55 },
      { p: Affine.apply(matrix, width / 2, height), w: rodWidth },
      { p: Affine.apply(matrix, width / 2, height + view.h * 0.27 / scale), w: rodWidth * 1.5 },
    ],
    ties: [[view.h * 0.12, rodWidth], [view.h * 0.2, rodWidth]],
  };
  const gunungan = {
    kind: 'part',
    id: 'gunungan',
    key: 'story-gunungan',
    size: [width, height],
    m: matrix,
    alpha: 1,
  };
  const puppetAlpha = 1 - smoothstep(0.1, 1.2, elapsed);
  for (const layer of layers) {
    for (const item of layer.items) item.alpha = (item.alpha ?? 1) * puppetAlpha;
  }
  const foreground = layers[layers.length - 1];
  if (foreground) foreground.items.push(rod, gunungan);
}

// ---------- loop ----------
let last = performance.now() / 1000;
const PHYS_DT = 1 / 120;

function tick(nowMs) {
  const nowSeconds = nowMs / 1000;
  const dt = clamp(nowSeconds - last, 0, 1 / 15);
  last = nowSeconds;

  const inputs = storyState ? advanceStory(dt, nowSeconds) : controller.update(nowSeconds, view);
  const active = puppets.slice(0, storyState ? 2 : controller.puppetCount);
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
  active.forEach((puppet) => {
    if (puppet.danceStarted) puppet.danceStarted = false;
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
  const activeScene = storyState?.story.scenes[storyState.audioSceneIndex];
  if (activeScene?.motion === 'gunungan') {
    addGununganClosing(layers, storyState.textTime);
  }

  // blencong: an oil flame — flicker, and a slow sway that nudges every shadow
  const flicker = 1 + 0.03 * Math.sin(nowSeconds * 7.3) + 0.02 * Math.sin(nowSeconds * 13.7 + 1.1) + (noise1(nowSeconds * 6.5) - 0.5) * 0.07;
  const sway = (noise1(nowSeconds * 1.2 + 10) - 0.5) * 26;

  const frame = {
    view,
    layers,
    time: nowSeconds,
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
