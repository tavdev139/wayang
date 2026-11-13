// Character registry. To add a puppet, drop its PNGs in assets/ and add ONE entry to CHARACTERS below
// (see "Adding a character" in README.md). Everything else (texture loading, rig, settings menus) reads from here.
//
// Every character is a body plus two arms of three pieces each (upper arm, forearm, hand):
//
//   id      unique key; also namespaces the GPU textures, so two characters never share a texture
//   name    shown in the settings menu
//   scale   stage pixels per body-image pixel, relative to the original puppet. The original is 1; a smaller
//           source image gets a bigger number so every puppet stands about the same height on the kelir
//   body    { src, size, anchor, shoulder:{L,R}, stickTop, stickFoot, ties }       (all in body-image pixels)
//             anchor     the point the dalang holds (the puppet's position follows it)
//             shoulder   where each upper arm is riveted on; "L" is the arm on the side the face looks toward
//             stickTop/stickFoot  the gapit (body stick) line; ties = y positions of the binding wraps
//   arms    { L: {upper, fore, hand}, R: {...} }, each piece { src, size, prox, dist | grip } in that PNG's own pixels
//             prox   the rivet toward the body  ·  dist   the rivet toward the hand  ·  grip   where the rod holds the hand
//   rest    where each hand hangs when you are not steering it: offsets from its shoulder, in body-image pixels
//   armDamping optional multiplier for arm spring damping (defaults to 1)
//   rigidHand optional flag to make the palm follow the forearm without wrist flex

// A pair of arm pieces that are the same art turned 180 degrees (the original puppet draws its right arm that way).
const rot180 = (p, size) => [size[0] - p[0], size[1] - p[1]];
const turned = (piece, src) => {
  const out = { src, size: piece.size };
  for (const k of ['prox', 'dist', 'grip']) if (piece[k]) out[k] = rot180(piece[k], piece.size);
  return out;
};

// ---- Wayang original: a T-pose figure, arms are broad ornamented pieces (right = left turned 180 degrees) ----
const ORIGINAL_LEFT = {
  upper: { src: 'assets/upper-arm-l.png', size: [231, 89], prox: [211, 44], dist: [22, 28] },
  fore: { src: 'assets/forearm-l.png', size: [195, 109], prox: [172, 58], dist: [13, 53] },
  hand: { src: 'assets/hand-l.png', size: [108, 124], prox: [91.7, 67.5], grip: [52, 76] },
};

// ---- Arjuna: arms hang straight down from the ends of the shoulder bar, so each side has its own art ----
// Pivots were measured from the alpha of the cut-out pieces (run `python measure_pieces.py` on new ones). The upper arm's rivet sits 4 px
// above its top edge, i.e. inside the shoulder bar, so the arm stays attached to the bar while it swings.
const ARJUNA_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-arjuna-l.png', size: [42, 139], prox: [19, 8], dist: [21, 126] },
    fore: { src: 'assets/forearm-arjuna-l.png', size: [43, 136], prox: [20, 12], dist: [26, 123] },
    hand: { src: 'assets/hand-arjuna-l.png', size: [80, 59], prox: [62.5, 12], grip: [14, 45] },
  },
  R: {
    upper: { src: 'assets/upper-arm-arjuna-r.png', size: [43, 139], prox: [19.5, 8], dist: [21, 126] },
    fore: { src: 'assets/forearm-arjuna-r.png', size: [45, 141], prox: [21, 12], dist: [27.5, 128] },
    hand: { src: 'assets/hand-arjuna-r.png', size: [82, 63], prox: [64.5, 12], grip: [16, 50] },
  },
};

// Wayang Baru: proportions and rivet points measured from the supplied puppet photos.
const WAYANG_BARU_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-wayang-baru-l.png', size: [155, 382], prox: [110, 31], dist: [89, 341] },
    fore: { src: 'assets/forearm-wayang-baru-l.png', size: [83, 276], prox: [40, 37], dist: [36, 252] },
    hand: { src: 'assets/hand-wayang-baru-l.png', size: [196, 403], prox: [62, 30], grip: [62, 142] },
  },
  R: {
    upper: { src: 'assets/upper-arm-wayang-baru-r.png', size: [110, 378], prox: [45, 35], dist: [59, 331] },
    fore: { src: 'assets/forearm-wayang-baru-r.png', size: [84, 277], prox: [43, 32], dist: [39, 247] },
    hand: { src: 'assets/hand-wayang-baru-r.png', size: [232, 292], prox: [157, 33], grip: [168, 112] },
  },
};

// Wayang Emas: separate gold arm pieces cut from the supplied reference photos.
const WAYANG_EMAS_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-wayang-emas-l.png', size: [129, 258], prox: [96, 19], dist: [80, 239] },
    fore: { src: 'assets/forearm-wayang-emas-l.png', size: [62, 257], prox: [31, 17], dist: [31, 240] },
    hand: { src: 'assets/hand-wayang-emas-l.png', size: [251, 126], prox: [27, 55], grip: [27, 55] },
  },
  R: {
    upper: { src: 'assets/upper-arm-wayang-emas-r.png', size: [103, 266], prox: [43, 19], dist: [41, 247] },
    fore: { src: 'assets/forearm-wayang-emas-r.png', size: [62, 264], prox: [30, 18], dist: [30, 247] },
    hand: { src: 'assets/hand-wayang-emas-r.png', size: [253, 128], prox: [27, 59], grip: [27, 59] },
  },
};

const RAW = [
  {
    id: 'original',
    name: 'Wayang original',
    scale: 1,
    body: {
      src: 'assets/body.png',
      size: [706, 1377],
      anchor: [345, 760],
      shoulder: { L: [247.5, 432.5], R: [442.5, 432.5] },
      stickTop: [346, 318],
      stickFoot: [346, 1334],
      ties: [470, 1010, 1262],
    },
    arms: {
      L: ORIGINAL_LEFT,
      R: {
        upper: turned(ORIGINAL_LEFT.upper, 'assets/upper-arm-r.png'),
        fore: turned(ORIGINAL_LEFT.fore, 'assets/forearm-r.png'),
        hand: turned(ORIGINAL_LEFT.hand, 'assets/hand-r.png'),
      },
    },
    rest: { L: [-150, 250], R: [70, 330] },
  },
  {
    id: 'arjuna',
    name: 'Arjuna',
    scale: 2.55, // 482 px tall source -> stands as tall as the 1377 px original
    body: {
      src: 'assets/body-arjuna.png',
      size: [262, 482],
      anchor: [138, 262],
      shoulder: { L: [79, 163], R: [248.5, 163] },
      stickTop: [136, 178], // starts under the collar ornament, runs down between the legs
      stickFoot: [146, 470],
      ties: [222, 377, 450],
    },
    arms: ARJUNA_ARMS,
    rest: { L: [-38, 238], R: [-36, 244] },
  },
  {
    id: 'wayang-baru',
    name: 'Wayang baru',
    scale: 1,
    body: {
      src: 'assets/body-wayang-baru.png',
      size: [768, 1376],
      anchor: [384, 760],
      shoulder: { L: [151, 438], R: [649, 428] },
      stickTop: [384, 325],
      stickFoot: [384, 1358],
      ties: [470, 1010, 1260],
    },
    arms: WAYANG_BARU_ARMS,
    armDamping: 2,
    rigidHand: true,
    rest: { L: [-12, 520], R: [-25, 520] },
  },
  {
    id: 'wayang-emas',
    name: 'Wayang emas',
    scale: 1.38,
    body: {
      src: 'assets/body-wayang-emas.png',
      size: [768, 1029],
      anchor: [384, 564],
      shoulder: { L: [274, 292], R: [596, 292] },
      stickTop: [384, 205],
      stickFoot: [384, 1012],
      ties: [333, 720, 947],
    },
    arms: WAYANG_EMAS_ARMS,
    armDamping: 2,
    rigidHand: true,
    rest: { L: [-30, 390], R: [30, 390] },
  },
];

// Parts get a texture key of the form "<id>/<part>"; Arm and Puppet read the same names ("upperL", "handR", ...).
function finalize(c) {
  const parts = { body: { ...c.body } };
  for (const side of ['L', 'R']) {
    for (const slot of ['upper', 'fore', 'hand']) parts[slot + side] = { ...c.arms[side][slot] };
  }
  for (const [name, part] of Object.entries(parts)) part.key = `${c.id}/${name}`;
  return { ...c, parts };
}

export const CHARACTERS = Object.fromEntries(RAW.map((c) => [c.id, finalize(c)]));
export const CHARACTER_LIST = Object.values(CHARACTERS);
export const DEFAULT_CHARACTER = 'original';
// who stands on the kelir at start: [left puppet, right puppet]; a name that isn't in CHARACTERS falls back to DEFAULT_CHARACTER
export const DEFAULT_PAIR = ['original', 'arjuna'];

// [textureKey, url] for everything the renderer must load
export function characterTextures(chars = CHARACTER_LIST) {
  return chars.flatMap((c) => Object.values(c.parts).map((p) => [p.key, p.src]));
}
