const voiceClip = (file, duration, captions) => ({
  audio: `assets/${file}.mp3`,
  duration,
  lines: captions.map(([at, text, textEn]) => ({ at, text, textEn })),
});

export const STORIES = [
  {
    id: 'rahwana-sinta',
    title: 'Kisah Cinta Tragis Rahwana & Dewi Sinta',
    titleEn: 'The Tragic Love Story of Rahwana & Dewi Sinta',
    description: 'Kisah obsesi Rahwana, penculikan Dewi Sinta, hingga perang Alengka.',
    descriptionEn: 'Rahwana’s obsession, the abduction of Dewi Sinta, and the war of Alengka.',
    characters: ['dewi-sinta', 'rahwana'],
    scenes: [
      {
        title: 'Pendahuluan & Awal Mula Obsesi',
        titleEn: 'The Beginning of an Obsession',
        background: 'background-2',
        motion: 'obsession',
        audio: 'assets/narasi-scene-1.mp3',
        duration: 35.08,
        lines: [
          {
            at: 0,
            text: 'Pernahkah kau membayangkan?',
            textEn: 'Have you ever wondered?',
          },
          {
            at: 1.8,
            text: 'Kehancuran kerajaan besar berawal dari satu nama—',
            textEn: 'The fall of a great kingdom began with a single name—',
          },
          {
            at: 4.7,
            text: 'yang terdengar di telinga Rahwana?',
            textEn: '—heard by Rahwana.',
          },
          {
            at: 8.5,
            text: 'Raja angkara ditakuti di tiga jagad dan tak pernah kalah perang,',
            textEn: 'A feared king of the three worlds, undefeated in war,',
          },
          {
            at: 13.2,
            text: 'namun runtuh oleh cinta yang tak pernah ia miliki: Dewi Sinta.',
            textEn: 'was undone by a love he could never possess: Dewi Sinta.',
          },
          {
            at: 18.6,
            text: 'Semua bermula dari kepedihan Surpanaka, adiknya, yang terluka di Hutan Dandaka.',
            textEn: 'It began with the grief of his sister Surpanaka, wounded in the Dandaka Forest.',
          },
          {
            at: 24.65,
            text: 'Dari situlah nama Sinta meluncur ke telinga Rahwana bagai anak panah beracun—',
            textEn: 'Sinta’s name reached Rahwana like a poisoned arrow—',
          },
          {
            at: 30.05,
            text: 'menumbuhkan hasrat terlarang yang menyeret sang raja ke jurang kehancuran.',
            textEn: 'awakening a forbidden desire that would lead the king to ruin.',
          },
        ],
      },
      {
        title: 'Hutan Dandaka & Penculikan Dewi Sinta',
        titleEn: 'The Dandaka Forest & Sinta’s Abduction',
        background: 'background-3',
        motion: 'abduction',
        audio: 'assets/narasi-scene-2.mp3',
        duration: 35.16,
        lines: [
          {
            at: 0,
            text: 'Di Hutan Dandaka, Sinta mendampingi Rama, bening bagai telaga suci.',
            textEn: 'In the Dandaka Forest, Sinta lived with Rama, pure as a sacred lake.',
          },
          {
            at: 4.7,
            text: 'Namun takdir bergerak lewat tipu daya.',
            textEn: 'But fate moved through deception.',
          },
          {
            at: 7.05,
            text: 'Kijang emas jelmaan Marica memikat hati Sinta.',
            textEn: 'A golden deer, Marica in disguise, captivated Sinta.',
          },
          {
            at: 9.9,
            text: 'Saat Rama dan Laksmana menjauh, Rahwana datang—',
            textEn: 'As Rama and Laksmana left, Rahwana arrived—',
          },
          {
            at: 13.55,
            text: 'menyamar dengan penuh kepalsuan.',
            textEn: 'hiding behind a false appearance.',
          },
          {
            at: 15.8,
            text: 'Begitu wujud aslinya tersingkap, semuanya terlambat.',
            textEn: 'When his true form emerged, it was too late.',
          },
          {
            at: 19.25,
            text: 'Sinta berteriak memanggil Rama,',
            textEn: 'Sinta cried out for Rama,',
          },
          {
            at: 21.2,
            text: 'namun hutan membisu.',
            textEn: 'but the forest fell silent.',
          },
          {
            at: 22.95,
            text: 'Di atas angkasa luas, air mata Sinta jatuh—',
            textEn: 'High above, Sinta’s tears fell—',
          },
          {
            at: 27.35,
            text: 'menjadi saksi awal mula tragedi cinta',
            textEn: 'bearing witness to a tragedy of love',
          },
          {
            at: 30.8,
            text: 'yang dimulai dengan paksaan.',
            textEn: 'that began with force.',
          },
        ],
      },
      {
        title: 'Taman Argasoka & Pergulatan Batin Rahwana',
        titleEn: 'Argasoka Garden & Rahwana’s Inner Struggle',
        background: 'background-4',
        motion: 'argasoka',
        audio: 'assets/narasi-scene-3.mp3',
        duration: 36.36,
        lines: [
          {
            at: 0,
            text: 'Di istana Alengka, Sinta ditahan di Taman Argasoka.',
            textEn: 'In Alengka’s palace, Sinta was held in the Argasoka Garden.',
          },
          {
            at: 4.5,
            text: 'Segala kemewahan disuguhkan,',
            textEn: 'Every luxury was offered,',
          },
          {
            at: 6.9,
            text: 'namun baginya tak lebih dari sangkar emas.',
            textEn: 'yet to her it was no more than a gilded cage.',
          },
          {
            at: 10.35,
            text: 'Hatinya tetap terikat pada Rama.',
            textEn: 'Her heart remained with Rama.',
          },
          {
            at: 13.15,
            text: 'Rahwana sering datang menemui Sinta,',
            textEn: 'Rahwana often came to see Sinta,',
          },
          {
            at: 15.6,
            text: 'bukan sebagai raja angkara,',
            textEn: 'not as a fearsome king,',
          },
          {
            at: 17.5,
            text: 'melainkan pria yang dilanda cinta tersiksa.',
            textEn: 'but as a man tormented by love.',
          },
          {
            at: 21.35,
            text: 'Setiap penolakan Sinta menjadi sayatan luka baru.',
            textEn: 'Each rejection by Sinta cut him anew.',
          },
          {
            at: 25.85,
            text: 'Rahwana menyadari',
            textEn: 'Rahwana realized',
          },
          {
            at: 27.15,
            text: 'bahwa cinta tidak bisa dipaksa,',
            textEn: 'that love cannot be forced,',
          },
          {
            at: 29.65,
            text: 'namun egonya menolak menyerah—',
            textEn: 'but his pride would not let him surrender—',
          },
          {
            at: 32.3,
            text: 'menciptakan penderitaan batin yang menggerogoti jiwanya dari dalam.',
            textEn: 'creating an inner torment that consumed him.',
          },
        ],
      },
      {
        title: 'Pecahnya Perang Alengka & Akhir Tragedi',
        titleEn: 'The War of Alengka & The Tragic End',
        background: 'background-5',
        motion: 'war',
        audio: 'assets/narasi-scene-4.mp3',
        duration: 44.43,
        lines: [
          {
            at: 0,
            text: 'Fajar menyingsing. Terompet perang menggema di Alengka.',
            textEn: 'Dawn broke. War trumpets echoed across Alengka.',
          },
          {
            at: 4.35,
            text: 'Rahwana mengenakan busana kebesarannya,',
            textEn: 'Rahwana put on his royal armor,',
          },
          {
            at: 7.15,
            text: 'melangkah ke medan laga dengan sadar',
            textEn: 'stepping onto the battlefield, knowing',
          },
          {
            at: 9.65,
            text: 'bahwa ujungnya adalah kematian.',
            textEn: 'that death awaited him.',
          },
          {
            at: 12.4,
            text: 'Ia bertempur bukan lagi demi kejayaan,',
            textEn: 'He no longer fought for glory,',
          },
          {
            at: 15.15,
            text: 'melainkan demi mempertahankan cinta yang telanjur ia genggam terlalu erat.',
            textEn: 'but to defend the love he had held too tightly.',
          },
          {
            at: 20.45,
            text: 'Di tengah kekacauan itu,',
            textEn: 'Amid the chaos,',
          },
          {
            at: 22.15,
            text: 'Dewi Sinta tetap duduk tenang dalam doanya,',
            textEn: 'Dewi Sinta sat calmly in prayer,',
          },
          {
            at: 25,
            text: 'memohon kekuatan agar dharma tetap tegak.',
            textEn: 'praying for dharma to prevail.',
          },
          {
            at: 28.4,
            text: 'Alengka runtuh terbakar,',
            textEn: 'Alengka fell to flames,',
          },
          {
            at: 30.4,
            text: 'dan Rahwana gugur sebagai penebusan.',
            textEn: 'and Rahwana died in atonement.',
          },
          {
            at: 33.45,
            text: 'Cinta Rahwana dan Sinta berakhir sebagai tragedi abadi—',
            textEn: 'Rahwana and Sinta’s love became an eternal tragedy—',
          },
          {
            at: 37.55,
            text: 'menjadi cerminan bahwa cinta tanpa kebijaksanaan dan dharma',
            textEn: 'a reminder that love without wisdom and dharma',
          },
          {
            at: 41.6,
            text: 'hanya akan menjadi api yang membakar segalanya.',
            textEn: 'becomes a fire that consumes all.',
          },
        ],
      },
    ],
  },
  {
    id: 'gatotkaca-hanoman',
    title: 'Perang Tanding Gatotkaca vs Anoman',
    titleEn: 'Gatotkaca vs Anoman: The Duel in the Sky',
    description: 'Salah paham mempertemukan ksatria Pandawa dan sesepuh sakti; pertarungan berakhir dengan persatuan.',
    descriptionEn: 'A misunderstanding pits a Pandawa knight against a mighty elder, until their duel gives way to unity.',
    characters: ['wayang-emas', 'wayang-baru'],
    scenes: [
      {
        title: 'Pembukaan: Dua Zaman Bertemu',
        titleEn: 'Opening: Two Eras Meet',
        chapter: 'opening',
        background: 'background-2',
        motion: 'reveal',
        ...voiceClip('story-gatot-hanoman-opening-1', 25.0775, [
          [0, 'Bayangkan... ketika dua kekuatan agung dari zaman yang berbeda,', 'Imagine... when two great powers from different eras'],
          [8.2, 'ditakdirkan untuk saling berbenturan di langit Nusantara!', 'are destined to clash in the skies of Nusantara!'],
          [16.3, 'Di satu sisi, sang kera putih sakti mandraguna', 'On one side, the mighty white monkey'],
          [21.1, 'dari wiracarita Ramayana—panutan keabadian, Anoman!', 'from the Ramayana epic—an eternal exemplar, Anoman!'],
        ]),
      },
      {
        title: 'Pembukaan: Dua Zaman Bertemu',
        titleEn: 'Opening: Two Eras Meet',
        chapter: 'opening',
        background: 'background-2',
        motion: 'reveal',
        ...voiceClip('story-gatot-hanoman-opening-2', 22.595875, [
          [0, 'Bukan sekadar adu kesaktian, ini adalah benturan dua kehebatan terbang tanpa tanding.', 'Not merely a contest of power, but the collision of two unequaled airborne strengths.'],
          [8.2, 'Kesalahpahaman memicu amarah di medan laga.', 'A misunderstanding sparks anger on the battlefield.'],
          [12.4, 'Langit bergemuruh!', 'The sky roars!'],
          [15.2, 'Angin puyuh berputar kencang setiap kali pukulan dan jurus mematikan dilepaskan.', 'A whirlwind spins fiercely whenever blows and deadly techniques are unleashed.'],
          [20.2, 'Siapa yang akan unggul? Sang kera sepuh yang melintasi zaman,', 'Who will prevail? The elder monkey who crossed the ages,'],
        ]),
      },
      {
        title: 'Pembukaan: Dua Zaman Bertemu',
        titleEn: 'Opening: Two Eras Meet',
        chapter: 'opening',
        background: 'background-2',
        motion: 'reveal',
        ...voiceClip('story-gatot-hanoman-opening-3', 16.509375, [
          [0, 'atau sang ksatria muda berzirah Antakusuma?', 'or the young knight in the Antakusuma armor?'],
          [3.2, 'Saksikan kedahsyatan olah sabet legendaris', 'Witness the legendary prowess'],
          [6.2, 'dari sang maestro wayang kulit, mendiang Ki Manteb Soedarsono.', 'of the late shadow-puppet master Ki Manteb Soedarsono.'],
          [10.8, 'Sebuah pertunjukan adiluhung yang memukau, mendebarkan,', 'An exceptional performance that captivates and thrills'],
          [13.6, 'dan penuh nilai kepahlawanan.', 'and is filled with heroic values.'],
          [15.2, 'Inilah Perang Tanding Anoman lan Gatotkaca!', 'This is the Duel of Anoman and Gatotkaca!'],
        ]),
      },
      {
        title: 'Pangkal Cerita: Kabar di Perbatasan',
        titleEn: 'The Beginning: Rumours at the Border',
        chapter: 'border',
        background: 'background-2',
        motion: 'boundary',
        ...voiceClip('story-gatot-hanoman-origin-1', 14.106063, [
          [0, 'Cerita bermula di tengah situasi politik yang memanas.', 'The story begins amid mounting political tension.'],
          [4.1, 'Terjadi salah paham besar atau kesimpangsiuran berita', 'A grave misunderstanding or confusing report'],
          [8.2, 'di perbatasan wilayah antara pasukan sekutu Pandawa', 'arose at the border between the Pandava alliance'],
          [11.3, 'dengan pihak luar atau para ksatria mandiri.', 'and outsiders or independent knights.'],
        ]),
      },
      {
        title: 'Pangkal Cerita: Kabar di Perbatasan',
        titleEn: 'The Beginning: Rumours at the Border',
        chapter: 'border',
        background: 'background-2',
        motion: 'boundary',
        ...voiceClip('story-gatot-hanoman-origin-2', 20.271, [
          [0, 'Anoman hadir untuk memastikan keamanan atau menjalankan titah suci.', 'Anoman appeared to ensure safety or carry out a sacred command.'],
          [7.1, 'Namun, kehadirannya disalahartikan oleh para penjaga', 'But his presence was misinterpreted by the guards'],
          [12.1, 'atau ksatria muda Pandawa sebagai ancaman', 'or by young Pandava knights as a threat'],
          [16.4, 'atau penyusup.', 'or as an intruder.'],
        ]),
      },
      {
        title: 'Konflik: Gatotkaca Turun Tangan',
        titleEn: 'Conflict: Gatotkaca Steps In',
        chapter: 'confrontation',
        background: 'background-3',
        motion: 'confrontation',
        ...voiceClip('story-gatot-hanoman-conflict-1', 14.8375, [
          [0, 'Mendengar ada tokoh sakti tak dikenal yang mengamuk atau masuk tanpa izin,', 'Upon hearing of a mysterious powerful figure causing trouble or entering uninvited,'],
          [6.2, 'ksatria andalan pimpinan angkatan udara Pandawa—Prabu Gatotkaca', 'the chief knight of the Pandava air forces—Prabu Gatotkaca'],
          [10.5, 'berbusana Kotang Antakusuma—maju ke medan laga', 'clad in the Kotang Antakusuma—advanced to the battlefield'],
          [13.2, 'untuk menghadang dan menyelidiki.', 'to confront and investigate.'],
        ]),
      },
      {
        title: 'Konflik: Gatotkaca Turun Tangan',
        titleEn: 'Conflict: Gatotkaca Steps In',
        chapter: 'confrontation',
        background: 'background-3',
        motion: 'confrontation',
        ...voiceClip('story-gatot-hanoman-conflict-2', 17.86775, [
          [0, 'Gatotkaca meminta Anoman menghentikan langkah dan menunjukkan identitasnya.', 'Gatotkaca asked Anoman to stop and reveal his identity.'],
          [6.2, 'Namun, karena sama-sama memiliki wibawa tinggi', 'But, as both possessed great dignity'],
          [10.3, 'dan rasa penasaran, kesalahpahaman komunikasi menimbulkan ketegangan.', 'and curiosity, miscommunication led to tension.'],
          [14.9, 'Itu berujung pada tantangan prang tandhing!', 'It ended in a challenge for a duel!'],
        ]),
      },
      {
        title: 'Puncak Lakon: Perang di Angkasa',
        titleEn: 'Climax: A Battle in the Sky',
        chapter: 'battle',
        background: 'background-4',
        motion: 'battle',
        danceTrigger: true,
        ...voiceClip('story-gatot-hanoman-battle-1', 8.045688, [
          [0, 'Anoman dengan kesaktian angin dan kekuatan kera putih legendaris,', 'Anoman with the power of the wind and the strength of the legendary white monkey,'],
          [4.2, 'serta pengalaman hidup ratusan tahun sejak zaman Rama.', 'with centuries of life since the age of Rama.'],
        ]),
      },
      {
        title: 'Puncak Lakon: Perang di Angkasa',
        titleEn: 'Climax: A Battle in the Sky',
        chapter: 'battle',
        background: 'background-4',
        motion: 'battle',
        ...voiceClip('story-gatot-hanoman-battle-2', 8.124063, [
          [0, 'Gatotkaca dengan julukan otot kawat tulang besi,', 'Gatotkaca, called “iron muscle and steel bone,”'],
          [3.8, 'kebal senjata dan berkecepatan kilat berkat Kotang Antakusuma.', 'weapons-proof and lightning-fast through the Kotang Antakusuma.'],
        ]),
      },
      {
        title: 'Penyelesaian: Klarifikasi dan Damai',
        titleEn: 'Resolution: Truth and Peace',
        chapter: 'resolution',
        background: 'background-5',
        motion: 'peace',
        ...voiceClip('story-gatot-hanoman-resolution-1', 23.640813, [
          [0, 'Di tengah sengitnya pertarungan, kedua ksatria menyadari', 'At the height of the battle, both knights realized'],
          [5.8, 'bahwa tenaga dan ketangguhan lawan sama-sama luar biasa.', 'that their opponent’s strength and resilience were extraordinary.'],
          [11.4, 'Siapa sebenarnya anak muda atau kakek sakti ini?', 'Who could this young warrior or mighty elder be?'],
          [17.2, 'Pihak penengah atau sesepuh kahyangan dan Pandawa datang meluruskan masalah.', 'Mediators or the elders of heaven and the Pandavas came to clarify the matter.'],
        ]),
      },
      {
        title: 'Penyelesaian: Klarifikasi dan Damai',
        titleEn: 'Resolution: Truth and Peace',
        chapter: 'resolution',
        background: 'background-5',
        motion: 'peace',
        ...voiceClip('story-gatot-hanoman-resolution-2', 9.560813, [
          [0, 'Terungkaplah bahwa pertarungan terjadi murni karena salah paham informasi.', 'It was revealed that the duel arose purely from misinformation.'],
          [5.1, 'Keduanya sama-sama berada di pihak kebenaran dan dharma.', 'Both stood on the side of truth and dharma.'],
        ]),
      },
      {
        title: 'Penyelesaian: Klarifikasi dan Damai',
        titleEn: 'Resolution: Truth and Peace',
        chapter: 'resolution',
        background: 'background-5',
        motion: 'peace',
        ...voiceClip('story-gatot-hanoman-resolution-3', 15.725688, [
          [0, 'Pertarungan ditutup dengan rasa saling menghormati yang tinggi.', 'The battle ended with profound mutual respect.'],
          [5.2, 'Anoman sebagai sesepuh memberikan restu dan petuah kepada Gatotkaca.', 'As the elder, Anoman gave Gatotkaca his blessing and teachings.'],
          [11.2, 'Mereka menjadi simbol persatuan kekuatan masa lalu dan masa kini.', 'They became symbols of unity between the strength of past and present.'],
        ]),
      },
    ],
  },
];

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smooth = (value) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

function lineDuration(scene, index) {
  const line = scene.lines[index];
  return (scene.lines[index + 1]?.at ?? scene.duration) - line.at;
}

function actorInput(view, x, y, tilt, left, right, depth = 0) {
  return {
    active: true,
    body: {
      x: view.x + view.w * x,
      y: view.y + view.h * y,
    },
    tilt,
    depth,
    arms: {
      left: { type: 'rel', dx: left[0], dy: left[1] },
      right: { type: 'rel', dx: right[0], dy: right[1] },
    },
  };
}

export function storyInputs(story, lineIndex, elapsed, view) {
  let lineOffset = 0;
  let scene = story.scenes[0];
  let sceneIndex = 0;
  let sceneLine = 0;
  let sceneElapsed = 0;
  for (const [candidateIndex, candidate] of story.scenes.entries()) {
    if (lineIndex < lineOffset + candidate.lines.length) {
      scene = candidate;
      sceneIndex = candidateIndex;
      sceneLine = lineIndex - lineOffset;
      sceneElapsed = candidate.lines.slice(0, sceneLine).reduce(
        (sum, _line, index) => sum + lineDuration(candidate, index),
        0,
      ) + elapsed;
      break;
    }
    lineOffset += candidate.lines.length;
  }

  const chapterElapsed = scene.chapter
    ? story.scenes.slice(0, sceneIndex)
      .filter((candidate) => candidate.chapter === scene.chapter)
      .reduce((sum, candidate) => sum + candidate.duration, 0) + sceneElapsed
    : sceneElapsed;
  const chapterDuration = scene.chapter
    ? story.scenes
      .filter((candidate) => candidate.chapter === scene.chapter)
      .reduce((sum, candidate) => sum + candidate.duration, 0)
    : scene.duration;
  const progress = clamp01(chapterElapsed / chapterDuration);
  const pulse = Math.sin(chapterElapsed * 1.25);
  const breath = Math.sin(chapterElapsed * 0.9);
  const leftX = view.w < 900 ? 0.22 : 0.34;
  let sinta = { x: leftX, y: 0.68, tilt: 0, left: [-0.38, 0.32], right: [0.38, 0.32], depth: 0 };
  let rahwana = { x: 1 - leftX, y: 0.68, tilt: 0, left: [-0.45, 0.25], right: [0.45, 0.25], depth: 0 };

  if (story.id === 'gatotkaca-hanoman') {
    let gatot = { x: leftX, y: 0.68, tilt: 0, left: [-0.38, 0.3], right: [0.38, 0.3], depth: 0 };
    let hanoman = { ...gatot, x: 1 - leftX };

    if (scene.motion === 'reveal') {
      const arrival = smooth(progress);
      gatot.x = 0.22 + arrival * 0.12;
      hanoman.x = 0.78 - arrival * 0.12;
      gatot.y = 0.67 - Math.sin(chapterElapsed * 0.8) * 0.012;
      hanoman.y = 0.67 + Math.sin(chapterElapsed * 0.8) * 0.012;
      gatot.left = [-0.38, 0.25 + breath * 0.04];
      hanoman.right = [0.38, 0.25 - breath * 0.04];
    } else if (scene.motion === 'boundary') {
      gatot.tilt = Math.sin(chapterElapsed * 0.7) * 0.025;
      hanoman.tilt = -gatot.tilt;
      gatot.left = [-0.42, -0.12 - pulse * 0.06];
      hanoman.right = [0.42, -0.12 + pulse * 0.06];
    } else if (scene.motion === 'confrontation') {
      const approach = smooth(progress);
      gatot.x = 0.34 + approach * 0.055;
      hanoman.x = 0.66 - approach * 0.055;
      gatot.tilt = 0.035 + pulse * 0.025;
      hanoman.tilt = -0.035 - pulse * 0.025;
      gatot.left = [-0.46, 0.03];
      gatot.right = [0.48, -0.34 - breath * 0.05];
      hanoman.left = [-0.48, -0.34 + breath * 0.05];
      hanoman.right = [0.46, 0.03];
    } else if (scene.motion === 'battle') {
      const flight = Math.sin(chapterElapsed * 1.65);
      const sweep = Math.sin(chapterElapsed * 2.1);
      gatot.x = 0.38 + sweep * 0.035;
      hanoman.x = 0.62 - sweep * 0.035;
      gatot.y = 0.49 + flight * 0.065;
      hanoman.y = 0.49 - flight * 0.065;
      gatot.tilt = 0.07 + flight * 0.08;
      hanoman.tilt = -0.07 - flight * 0.08;
      gatot.left = [-0.48, -0.28 + sweep * 0.14];
      gatot.right = [0.5, -0.36 - sweep * 0.12];
      hanoman.left = [-0.5, -0.36 + sweep * 0.12];
      hanoman.right = [0.48, -0.28 - sweep * 0.14];
      gatot.depth = 0.04 + Math.max(0, flight) * 0.1;
      hanoman.depth = 0.04 + Math.max(0, -flight) * 0.1;
    } else if (scene.motion === 'peace') {
      const respect = smooth(progress);
      gatot.x = 0.36;
      hanoman.x = 0.64;
      gatot.y = 0.67 + breath * 0.006;
      hanoman.y = 0.67 - breath * 0.006;
      gatot.tilt = -0.08 * respect;
      hanoman.tilt = 0.08 * respect;
      gatot.left = [-0.36, 0.26];
      gatot.right = [0.36, 0.26 - respect * 0.08];
      hanoman.left = [-0.36, 0.26 - respect * 0.08];
      hanoman.right = [0.36, 0.26];
    }

    return [
      actorInput(view, gatot.x, gatot.y, gatot.tilt, gatot.left, gatot.right, gatot.depth),
      actorInput(view, hanoman.x, hanoman.y, hanoman.tilt, hanoman.left, hanoman.right, hanoman.depth),
    ];
  }

  if (scene.motion === 'obsession') {
    const yearning = (Math.sin(sceneElapsed * 0.72) + 1) * 0.5;
    rahwana.left = [-0.42, 0.2 + pulse * 0.15];
    rahwana.right = [0.42 + yearning * 0.16, -0.18 - yearning * 0.62];
    rahwana.tilt = -0.035 + Math.sin(sceneElapsed * 0.48) * 0.06;
    sinta.y += breath * 0.008;
    sinta.left = [-0.28, 0.28 + breath * 0.08];
    sinta.right = [0.3, 0.32 - breath * 0.08];
  } else if (scene.motion === 'abduction') {
    const approach = smooth(progress / 0.24);
    const reveal = smooth((progress - 0.2) / 0.16);
    const lift = smooth((progress - 0.38) / 0.24);
    const flight = smooth((progress - 0.62) / 0.38);
    const panic = lift * (1 - flight * 0.3);
    sinta.x += flight * 0.12;
    sinta.y -= lift * 0.12 + flight * 0.06;
    sinta.tilt = -0.08 * reveal + Math.sin(sceneElapsed * 1.8) * 0.045 * panic;
    sinta.left = [-0.58, -0.18 - panic * 0.58];
    sinta.right = [0.58, -0.15 - panic * 0.62];
    rahwana.x += -approach * 0.07 + flight * 0.05;
    rahwana.y -= lift * 0.07 + flight * 0.05;
    rahwana.tilt = 0.08 * reveal + pulse * 0.035;
    rahwana.left = [-0.72, -0.08 - pulse * 0.2];
    rahwana.right = [0.56, -0.48 - reveal * 0.18];
    rahwana.depth = 0.1 * lift;
    sinta.depth = 0.08 * lift;
  } else if (scene.motion === 'argasoka') {
    const approach = smooth(progress / 0.3) * (1 - smooth((progress - 0.66) / 0.25));
    const refusal = smooth((progress - 0.32) / 0.08) * (1 - smooth((progress - 0.62) / 0.14));
    sinta.left = [-0.16 - refusal * 0.56, 0.04 - refusal * 0.4];
    sinta.right = [0.18, 0.08 + breath * 0.06];
    sinta.tilt = Math.sin(sceneElapsed * 0.55) * 0.025;
    rahwana.x -= approach * 0.075;
    rahwana.left = [-0.3, -0.24 + pulse * 0.12];
    rahwana.right = [0.52, -0.12 - approach * 0.2];
    rahwana.tilt = 0.045 + pulse * 0.045 - refusal * 0.025;
  } else if (scene.motion === 'war') {
    const advance = smooth(progress / 0.42);
    const fallen = smooth((progress - 0.72) / 0.2);
    const battle = 1 - fallen;
    sinta.left = [-0.2, -0.28 + breath * 0.035];
    sinta.right = [0.2, -0.28 - breath * 0.035];
    sinta.y += breath * 0.004;
    rahwana.x -= advance * 0.055;
    rahwana.y += fallen * 0.075;
    rahwana.tilt = 0.035 + pulse * 0.045 + fallen * 0.34;
    rahwana.left = [-0.76 + fallen * 0.34, -0.28 + fallen * 0.58];
    rahwana.right = [0.76 - fallen * 0.34, -0.4 + fallen * 0.58];
    rahwana.depth = fallen * 0.12;
    rahwana.tilt += Math.sin(sceneElapsed * 2.4) * 0.035 * battle;
  }

  return [
    actorInput(view, sinta.x, sinta.y, sinta.tilt, sinta.left, sinta.right, sinta.depth),
    actorInput(view, rahwana.x, rahwana.y, rahwana.tilt, rahwana.left, rahwana.right, rahwana.depth),
  ];
}
