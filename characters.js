// Character registry. To add a puppet, drop its PNGs in assets/ and add ONE entry to CHARACTERS below
// (see "Adding a character" in README.md). Everything else (texture loading, rig, settings menus) reads from here.
//
// Every character is a body plus two arms of three pieces each (upper arm, forearm, hand):
//
//   id      unique key; also namespaces the GPU textures, so two characters never share a texture
//   name    shown in the settings menu
//   scale   stage pixels per body-image pixel, tuned around a standard body height of about 1377 px
//   body    { src, size, anchor, shoulder:{L,R}, stickTop, stickFoot, ties }       (all in body-image pixels)
//             anchor     the point the dalang holds (the puppet's position follows it)
//             shoulder   where each upper arm is riveted on; "L" is the arm on the side the face looks toward
//             stickTop/stickFoot  the gapit (body stick) line; ties = y positions of the binding wraps
//   arms    { L: {upper, fore, hand}, R: {...} }, each piece { src, size, prox, dist | grip } in that PNG's own pixels
//             prox   the rivet toward the body  ·  dist   the rivet toward the hand  ·  grip   where the rod holds the hand
//   armDamping optional multiplier for arm spring damping (defaults to 1)
//   jointDamping optional multiplier for shoulder, elbow, and wrist hinge damping (defaults to armDamping)
//   armPartScale optional {upper, fore, hand} scaling for each PNG and its pivots
//   armLengthRatios optional {upper, fore, hand} body-relative proportions (used only when specified)
//   armReach optional {min, max} limits for hand distance as ratios of the combined arm reach
//   rest    where each hand hangs when not steered: offsets from its shoulder, in body-image pixels
//   armBend optional elbow bend sign for each side: -1 or 1
//   rigidHand optional flag to make the palm follow the forearm without wrist flex
//   armsOnTop optional flag to draw both articulated arms over the body image
//   faceDirection optional direction the unflipped artwork faces on stage: -1 left, 1 right (defaults to -1)

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
    hand: { src: 'assets/hand-wayang-emas-l-flipped.png', size: [251, 126], prox: [223, 55], grip: [223, 55] },
  },
  R: {
    upper: { src: 'assets/upper-arm-wayang-emas-r.png', size: [103, 266], prox: [43, 19], dist: [41, 247] },
    fore: { src: 'assets/forearm-wayang-emas-r.png', size: [62, 264], prox: [30, 18], dist: [30, 247] },
    hand: { src: 'assets/hand-wayang-emas-r.png', size: [253, 128], prox: [27, 59], grip: [27, 59] },
  },
};

const WERKUDARA_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-werkudara-l.png', size: [424, 76], prox: [392, 36], dist: [30, 36] },
    fore: { src: 'assets/forearm-werkudara-l.png', size: [249, 113], prox: [194, 56], dist: [20, 57] },
    hand: { src: 'assets/hand-werkudara-l.png', size: [136, 200], prox: [62, 180], grip: [67, 103] },
  },
  R: {
    upper: { src: 'assets/upper-arm-werkudara-r.png', size: [428, 78], prox: [35, 34], dist: [399, 33] },
    fore: { src: 'assets/forearm-werkudara-r.png', size: [186, 76], prox: [20, 29], dist: [168, 29] },
    hand: { src: 'assets/hand-werkudara-r.png', size: [207, 132], prox: [22, 94], grip: [112, 90] },
  },
};

// Cut from the user-provided reference; pivots are centered on the visible rivets.
const YUDISTIRA_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-yudistira-l.png', size: [175, 452], prox: [142, 419], dist: [32, 32] },
    fore: { src: 'assets/forearm-yudistira-l.png', size: [543, 62], prox: [514, 29], dist: [29, 33] },
    hand: { src: 'assets/hand-yudistira-l.png', size: [155, 310], prox: [47, 18], grip: [64, 116] },
  },
  R: {
    upper: { src: 'assets/upper-arm-yudistira-r.png', size: [197, 443], prox: [33, 410], dist: [164, 31] },
    fore: { src: 'assets/forearm-yudistira-r.png', size: [556, 66], prox: [29, 37], dist: [527, 29] },
    hand: { src: 'assets/hand-yudistira-r.png', size: [158, 315], prox: [112, 16], grip: [96, 124] },
  },
};

const RAHWANA_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-rahwana-r.png', size: [186, 47], prox: [7, 24], dist: [178, 24] },
    fore: { src: 'assets/forearm-rahwana-r.png', size: [188, 33], prox: [9, 17], dist: [179, 17] },
    hand: { src: 'assets/hand-rahwana-r.png', size: [111, 48], prox: [13, 24], grip: [105, 22] },
  },
  R: {
    upper: { src: 'assets/upper-arm-rahwana-l.png', size: [190, 44], prox: [180, 22], dist: [10, 22] },
    fore: { src: 'assets/forearm-rahwana-l.png', size: [191, 37], prox: [181, 18], dist: [10, 18] },
    hand: { src: 'assets/hand-rahwana-l.png', size: [107, 51], prox: [96, 25], grip: [5, 25] },
  },
};

const DEWI_SINTA_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-dewi-sinta-l.png', size: [33, 235], prox: [16, 10], dist: [17, 224] },
    fore: { src: 'assets/forearm-dewi-sinta-l.png', size: [49, 255], prox: [22, 10], dist: [23, 246] },
    hand: { src: 'assets/hand-dewi-sinta-l.png', size: [60, 134], prox: [24, 10], grip: [35, 131] },
  },
  R: {
    upper: { src: 'assets/upper-arm-dewi-sinta-r.png', size: [30, 231], prox: [16, 9], dist: [16, 220] },
    fore: { src: 'assets/forearm-dewi-sinta-r.png', size: [46, 264], prox: [16, 9], dist: [23, 249] },
    hand: { src: 'assets/hand-dewi-sinta-r.png', size: [59, 133], prox: [25, 10], grip: [34, 130] },
  },
};

// Semar: pivots are measured from the rivet holes in the user's cut-parts photo.
const SEMAR_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-semar-l.png', size: [161, 218], prox: [142.1, 17.7], dist: [40, 196.3] },
    fore: { src: 'assets/forearm-semar-l.png', size: [60, 233], prox: [29.7, 19.7], dist: [31.3, 224.6] },
    hand: { src: 'assets/hand-semar-l.png', size: [139, 159], prox: [68.6, 25.2], grip: [66.8, 83.8] },
  },
  R: {
    upper: { src: 'assets/upper-arm-semar-r.png', size: [180, 66], prox: [14.4, 36.8], dist: [165, 28.1] },
    fore: { src: 'assets/forearm-semar-r.png', size: [151, 174], prox: [138, 170], dist: [76.8, 53.9] },
    hand: { src: 'assets/hand-semar-r.png', size: [104, 116], prox: [15.6, 106.9], grip: [89.7, 13] },
  },
};

const PETRUK_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-petruk-l.png', size: [339, 55], prox: [312, 23.5], dist: [23.8, 29.8] },
    fore: { src: 'assets/forearm-petruk-l.png', size: [109, 284], prox: [21.7, 22], dist: [82, 259.8] },
    hand: { src: 'assets/hand-petruk-l.png', size: [66, 215], prox: [33.1, 17.7], grip: [34, 118] },
  },
  R: {
    upper: { src: 'assets/upper-arm-petruk-r.png', size: [345, 61], prox: [24.7, 31], dist: [321.6, 23] },
    fore: { src: 'assets/forearm-petruk-r.png', size: [48, 268], prox: [25.4, 20.3], dist: [26.6, 245.4] },
    hand: { src: 'assets/hand-petruk-r.png', size: [97, 192], prox: [66, 12], grip: [56, 109] },
  },
};

const DEWA_RUCI_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-dewa-ruci-l.png', size: [130, 348], prox: [28, 24], dist: [106, 315] },
    fore: { src: 'assets/forearm-dewa-ruci-l.png', size: [408, 69], prox: [387, 22], dist: [22, 34] },
    hand: { src: 'assets/hand-dewa-ruci-l.png', size: [117, 260], prox: [85, 55], grip: [78, 14] },
  },
  R: {
    upper: { src: 'assets/upper-arm-dewa-ruci-r.png', size: [53, 330], prox: [27, 23], dist: [28, 298] },
    fore: { src: 'assets/forearm-dewa-ruci-r.png', size: [417, 71], prox: [30, 37], dist: [392, 25] },
    hand: { src: 'assets/hand-dewa-ruci-r-straight.png', size: [230, 114], prox: [110, 52], grip: [17, 55] },
  },
};

const DRONA_ARMS = {
  L: {
    upper: { src: 'assets/upper-arm-drona-l.png', size: [86, 220], prox: [18, 14], dist: [69, 203] },
    fore: { src: 'assets/forearm-drona-l.png', size: [247, 33], prox: [19, 16], dist: [228, 16] },
    hand: { src: 'assets/hand-drona-l.png', size: [70, 134], prox: [20, 12], grip: [61, 130] },
  },
  R: {
    upper: { src: 'assets/upper-arm-drona-r.png', size: [86, 218], prox: [68, 13], dist: [14, 202] },
    fore: { src: 'assets/forearm-drona-r.png', size: [246, 34], prox: [228, 17], dist: [19, 17] },
    hand: { src: 'assets/hand-drona-r.png', size: [62, 142], prox: [42, 15], grip: [32, 108] },
  },
};

const TOTAL_ARM_LENGTH = 0.5;

const RAW = [
  {
    id: 'arjuna',
    name: 'Arjuna',
    scale: 2.55, // 482 px tall source -> stands close to the 1377 px standard
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
    name: 'Hanoman',
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
    jointDamping: 3,
    rest: { L: [-12, 520], R: [-25, 520] },
  },
  {
    id: 'wayang-emas',
    name: 'Gatot Kaca',
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
    jointDamping: 3,
    rest: { L: [-30, 390], R: [30, 390] },
  },
  {
    id: 'werkudara',
    name: 'Werkudara',
    scale: 1.075,
    body: {
      src: 'assets/body-werkudara.png',
      size: [661, 1281],
      anchor: [335, 690],
      shoulder: { L: [162, 405], R: [572, 376] },
      stickTop: [340, 300],
      stickFoot: [340, 1260],
      ties: [430, 940, 1170],
    },
    arms: WERKUDARA_ARMS,
    armDamping: 1.5,
    jointDamping: 3,
    rest: { L: [-20, 430], R: [20, 490] },
  },
  {
    id: 'yudistira',
    name: 'Yudistira',
    scale: 1.26,
    body: {
      src: 'assets/body-yudistira.png',
      size: [723, 1096],
      anchor: [360, 560],
      shoulder: { L: [205, 282], R: [640, 273] },
      stickTop: [360, 235],
      stickFoot: [360, 1080],
      ties: [315, 720, 990],
    },
    arms: YUDISTIRA_ARMS,
    armLengthRatios: { upper: 1, fore: 1.35, hand: 0.6 },
    armDamping: 1.5,
    jointDamping: 3,
    armReach: { min: 0.4, max: 0.96 },
  },
  {
    id: 'rahwana',
    name: 'Rahwana',
    scale: 1.24,
    faceDirection: 1,
    body: {
      src: 'assets/body-rahwana.png',
      size: [601, 1113],
      anchor: [300, 610],
      shoulder: { L: [418, 437], R: [44, 420] },
      stickTop: [300, 310],
      stickFoot: [300, 1080],
      ties: [420, 760, 1020],
    },
    arms: RAHWANA_ARMS,
    armDamping: 1.5,
    jointDamping: 3,
    armReach: { min: 0.4, max: 0.96 },
    armBend: { L: 1, R: -1 },
    armsOnTop: false,
    rest: { L: [0, 360], R: [0, 360] },
  },
  {
    id: 'dewi-sinta',
    name: 'Dewi Sinta',
    scale: 1.16,
    body: {
      src: 'assets/body-dewi-sinta.png',
      size: [715, 1183],
      anchor: [357, 690],
      shoulder: { L: [168, 315], R: [580, 307] },
      stickTop: [357, 390],
      stickFoot: [357, 1150],
      ties: [400, 840, 1080],
    },
    arms: DEWI_SINTA_ARMS,
    armDamping: 1.5,
    jointDamping: 3,
    armReach: { min: 0.4, max: 0.9 },
    armBend: { L: 1, R: -1 },
    armsOnTop: true,
    rest: { L: [-18, 520], R: [18, 520] },
  },
  {
    id: 'semar',
    name: 'Semar',
    scale: 1.59,
    body: {
      src: 'assets/body-semar.png',
      size: [642, 866],
      anchor: [321, 505],
      shoulder: { L: [256, 315], R: [323, 302] },
      stickTop: [321, 264],
      stickFoot: [321, 852],
      ties: [350, 660, 820],
    },
    arms: SEMAR_ARMS,
    armDamping: 1.5,
    jointDamping: 2.8,
    armReach: { min: 0.4, max: 0.96 },
    armBend: { L: 1, R: -1 },
    armsOnTop: true,
    rigidHand: true,
    rest: { L: [-90, 420], R: [250, -90] },
  },
  {
    id: 'petruk',
    name: 'Petruk',
    scale: 1,
    body: {
      src: 'assets/body-petruk.png',
      size: [605, 1377],
      anchor: [300, 760],
      shoulder: { L: [222, 470], R: [422, 465] },
      stickTop: [300, 390],
      stickFoot: [300, 1355],
      ties: [500, 960, 1270],
    },
    arms: PETRUK_ARMS,
    armDamping: 1.5,
    jointDamping: 3,
    armBend: { L: -1, R: 1 },
    armsOnTop: true,
    rigidHand: true,
    rest: { L: [-500, 330], R: [500, 330] },
  },
  {
    id: 'dewa-ruci',
    name: 'Dewa Ruci',
    scale: 1.29,
    faceDirection: 1,
    body: {
      src: 'assets/body-dewa-ruci.png',
      size: [674, 1069],
      anchor: [324, 550],
      shoulder: { L: [479, 277], R: [120, 277] },
      stickTop: [334, 330],
      stickFoot: [334, 1055],
      ties: [370, 730, 990],
    },
    arms: {
      L: DEWA_RUCI_ARMS.R,
      R: DEWA_RUCI_ARMS.L,
    },
    armDamping: 1.5,
    jointDamping: 2.8,
    armBend: { L: 1, R: -1 },
    armsOnTop: true,
    rigidHand: true,
    rest: { L: [350, 275], R: [-350, 275] },
  },
  {
    id: 'drona',
    name: 'Drona',
    scale: 1.77,
    faceDirection: 1,
    body: {
      src: 'assets/body-drona.png',
      size: [543, 779],
      anchor: [272, 454],
      shoulder: { L: [390, 190], R: [210, 178] },
      stickTop: [277, 229],
      stickFoot: [277, 769],
      ties: [284, 619, 749],
    },
    arms: DRONA_ARMS,
    armPartScale: { upper: 0.8, fore: 0.8, hand: 0.9 },
    armDamping: 1.5,
    jointDamping: 2.8,
    armReach: { min: 0.4, max: 1 },
    armBend: { L: -1, R: 1 },
    armsOnTop: true,
    rigidHand: true,
    rest: { L: [340, 80], R: [-340, 80] },
  },
  {
    id: 'rama',
    name: 'Rama',
    scale: 1.37,
    body: {
      src: 'assets/body-rama.png',
      size: [544, 1008],
      anchor: [266, 539],
      shoulder: { L: [132, 349], R: [502, 349] },
      stickTop: [266, 309],
      stickFoot: [266, 1006],
      ties: [399, 729, 949],
    },
    arms: {
      L: {
        upper: { src: 'assets/upper-arm-rama-l.png', size: [150, 236], prox: [18, 21], dist: [134, 220] },
        fore: { src: 'assets/forearm-rama-l.png', size: [296, 40], prox: [279, 20], dist: [16, 20] },
        hand: { src: 'assets/hand-rama-l.png', size: [181, 95], prox: [163, 43], grip: [87, 43] },
      },
      R: {
        upper: { src: 'assets/upper-arm-rama-r.png', size: [150, 234], prox: [131, 18], dist: [18, 219] },
        fore: { src: 'assets/forearm-rama-r.png', size: [296, 40], prox: [16, 20], dist: [279, 20] },
        hand: { src: 'assets/hand-rama-r.png', size: [181, 89], prox: [17, 36], grip: [98, 36] },
      },
    },
    armDamping: 1.5,
    jointDamping: 2.8,
    armLengthRatios: { upper: 0.36, fore: 0.4, hand: 0.24 },
    armReach: { min: 0.4, max: 1 },
    armBend: { L: -1, R: 1 },
    armsOnTop: true,
    rigidHand: true,
    rest: { L: [-45, 310], R: [45, 310] },
  },
  {
    id: 'bagong',
    name: 'Bagong',
    scale: 1.54,
    body: {
      src: 'assets/body-bagong.png',
      size: [652, 893],
      anchor: [326, 530],
      shoulder: { L: [160, 300], R: [485, 300] },
      stickTop: [326, 315],
      stickFoot: [326, 882],
      ties: [390, 650, 850],
    },
    arms: {
      L: {
        upper: { src: 'assets/upper-arm-bagong-l.png', size: [563, 144], prox: [56, 79], dist: [510, 54] },
        fore: { src: 'assets/forearm-bagong-l.png', size: [570, 122], prox: [510, 48], dist: [56, 60] },
        hand: { src: 'assets/hand-bagong-l.png', size: [416, 187], prox: [360, 83], grip: [205, 87] },
      },
      R: {
        upper: { src: 'assets/upper-arm-bagong-r.png', size: [563, 144], prox: [510, 79], dist: [56, 54] },
        fore: { src: 'assets/forearm-bagong-r.png', size: [570, 122], prox: [56, 48], dist: [510, 60] },
        hand: { src: 'assets/hand-bagong-r.png', size: [416, 187], prox: [56, 83], grip: [211, 87] },
      },
    },
    armDamping: 1.5,
    jointDamping: 2.8,
    armPartScale: { upper: 0.3, fore: 0.34, hand: 0.36 },
    armReach: { min: 0.4, max: 1 },
    armBend: { L: -1, R: 1 },
    armsOnTop: true,
    rigidHand: true,
    rest: { L: [166, 240], R: [-160, 240] },
  },
];

// Parts get a texture key of the form "<id>/<part>"; Arm and Puppet read the same names ("upperL", "handR", ...).
function finalize(c) {
  const parts = { body: { ...c.body } };
  const scalePoint = (point, scale) => point?.map((coordinate) => coordinate * scale);
  // A hand's grip can sit at the wrist, so normalize its cropped visual reach instead.
  const handExtent = (part) => {
    const [width, height] = part.size;
    const [x, y] = part.prox;
    return Math.max(
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y),
    );
  };
  const bodyHeight = c.body.size[1];
  const ratios = c.armLengthRatios;
  const ratioTotal = ratios ? ratios.upper + ratios.fore + ratios.hand : 0;
  if (ratios && (
    !Number.isFinite(ratioTotal) ||
    ratioTotal <= 0 ||
    ![ratios.upper, ratios.fore, ratios.hand].every((ratio) => Number.isFinite(ratio) && ratio > 0)
  )) {
    throw new Error(`Invalid arm length ratios for ${c.id}`);
  }
  for (const side of ['L', 'R']) {
    for (const slot of ['upper', 'fore', 'hand']) {
      const source = c.arms[side][slot];
      let renderScale = c.armPartScale?.[slot] ?? 1;
      if (ratios) {
        const sourceLength = slot === 'hand'
          ? handExtent(source)
          : Math.hypot(source.dist[0] - source.prox[0], source.dist[1] - source.prox[1]);
        if (!Number.isFinite(bodyHeight) || bodyHeight <= 0 || !Number.isFinite(sourceLength) || sourceLength <= 0) {
          throw new Error(`Invalid ${c.id}/${side}/${slot} dimensions or pivots`);
        }
        const targetLength = bodyHeight * TOTAL_ARM_LENGTH * ratios[slot] / ratioTotal;
        renderScale = targetLength / sourceLength;
      }
      parts[slot + side] = {
        ...source,
        size: scalePoint(source.size, renderScale),
        prox: scalePoint(source.prox, renderScale),
        ...(source.dist ? { dist: scalePoint(source.dist, renderScale) } : {}),
        ...(source.grip ? { grip: scalePoint(source.grip, renderScale) } : {}),
        renderScale,
        sourceSize: source.size,
        sourceProx: source.prox,
      };
    }
  }
  for (const [name, part] of Object.entries(parts)) part.key = `${c.id}/${name}`;
  return { ...c, parts };
}

export const CHARACTERS = Object.fromEntries(RAW.map((c) => [c.id, finalize(c)]));
export const CHARACTER_LIST = Object.values(CHARACTERS);
export const DEFAULT_CHARACTER = 'arjuna';
// who stands on the kelir at start: [left puppet, right puppet]; a name that isn't in CHARACTERS falls back to DEFAULT_CHARACTER
export const DEFAULT_PAIR = ['arjuna', 'wayang-baru'];

// [textureKey, url] for everything the renderer must load
export function characterTextures(chars = CHARACTER_LIST) {
  return chars.flatMap((c) => Object.values(c.parts).map((p) => [p.key, p.src]));
}
