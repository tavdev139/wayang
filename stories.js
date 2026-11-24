const voiceClip = (file, duration, captions) => ({
  audio: `assets/${file}.mp3`,
  duration,
  lines: captions.map(([at, text, textEn]) => ({ at, text, textEn })),
});

export const STORIES = [
  {
    id: 'gatotkaca-petruk-welgeduwelbeh',
    title: 'Gatotkaca & Prabu Welgeduwelbeh',
    titleEn: 'Gatotkaca & Prabu Welgeduwelbeh',
    description: 'Petruk sebagai raja baru menghadapi Gatotkaca dan menyampaikan sindiran tentang kepemimpinan yang mendengar rakyat kecil.',
    descriptionEn: 'Petruk appears as a new king and confronts Gatotkaca, delivering a satire about leadership that listens to common people.',
    characters: ['wayang-emas', 'petruk'],
    actors: {
      gatotkaca: { puppet: 0, character: 'wayang-emas' },
      petruk: { puppet: 1, character: 'petruk' },
    },
    quiz: [
      {
        question: 'Gelarku apa yang digunakan Petruk saat menjadi raja baru?',
        questionEn: 'What royal title does Petruk use when he becomes the new king?',
        options: ['Prabu Welgeduwelbeh', 'Prabu Linggabuana', 'Prabu Antakusuma', 'Prabu Kresna'],
        optionsEn: ['Prabu Welgeduwelbeh', 'Prabu Linggabuana', 'Prabu Antakusuma', 'Prabu Kresna'],
        answer: 'Prabu Welgeduwelbeh',
        answerEn: 'Prabu Welgeduwelbeh',
        fact: 'Petruk tampil sebagai Prabu Welgeduwelbeh dan membuat geger kalangan ksatria.',
        factEn: 'Petruk appears as Prabu Welgeduwelbeh and shocks the warrior community.',
      },
      {
        question: 'Apa pesan utama Petruk kepada Gatotkaca?',
        questionEn: 'What is Petruk’s main message to Gatotkaca?',
        options: [
          'Seorang pemimpin harus mendengar suara rakyat kecil',
          'Kesaktian tidak boleh dimiliki oleh Punokawan',
          'Para ksatria harus menguasai seluruh kerajaan',
          'Takhta hanya boleh diwariskan kepada keluarga',
        ],
        optionsEn: [
          'A leader must listen to the voices of common people',
          'Punokawan must not possess supernatural power',
          'Warriors must control every kingdom',
          'Thrones may only pass within families',
        ],
        answer: 'Seorang pemimpin harus mendengar suara rakyat kecil',
        answerEn: 'A leader must listen to the voices of common people',
        fact: 'Sindiran Petruk menegaskan bahwa kewibawaan sejati membutuhkan kerendahan hati dan perhatian kepada rakyat.',
        factEn: 'Petruk’s satire stresses that true authority requires humility and care for the people.',
      },
      {
        question: 'Bagaimana ketegangan antara Gatotkaca dan Petruk diselesaikan?',
        questionEn: 'How is the tension between Gatotkaca and Petruk resolved?',
        options: [
          'Petruk mengundang berdamai sambil berbincang minum wedang jahe',
          'Gatotkaca langsung menghancurkan kerajaannya',
          'Petruk menyerahkan seluruh pusakanya',
          'Pertarungan berlangsung tanpa penyelesaian',
        ],
        optionsEn: [
          'Petruk proposes peace over a discussion and ginger drink',
          'Gatotkaca immediately destroys the kingdom',
          'Petruk surrenders every heirloom',
          'The contest ends without resolution',
        ],
        answer: 'Petruk mengundang berdamai sambil berbincang minum wedang jahe',
        answerEn: 'Petruk proposes peace over a discussion and ginger drink',
        fact: 'Suasana berubah cair melalui dialog jenaka yang tetap menyampaikan makna kepemimpinan.',
        factEn: 'The mood becomes light through humorous dialogue that still carries a lesson about leadership.',
      },
    ],
    scenes: [
      {
        title: 'Pertemuan Gatotkaca & Prabu Welgeduwelbeh',
        titleEn: 'Gatotkaca Meets Prabu Welgeduwelbeh',
        chapter: 'welgeduwelbeh',
        background: 'story-welgeduwelbeh-palace',
        motion: 'welgeduwelbeh',
        puppetCharacters: ['wayang-emas', 'petruk'],
        duration: 82.9,
        lines: [
          {
            at: 0,
            audio: 'assets/story-gatot-petruk-gatot-1.mp3',
            actor: 'gatotkaca',
            speaker: 'Gatotkaca',
            speakerEn: 'Gatotkaca',
            text: 'Heh! Raja baru yang menamakan diri Prabu Welgeduwelbeh! Ketenangan negeri ini terusik oleh kabar kedatanganmu dan pusaka sakti yang engkau genggam. Sebutkan maksudmu, dan tundukkan sikapmu sebelum otot kawat dan tulang besiku bertindak!',
            textEn: 'Hey! New king calling yourself Prabu Welgeduwelbeh! Your arrival and the sacred heirloom you wield have disturbed the peace of this realm. State your purpose and lower your attitude before my iron muscle and steel bone take action!',
          },
          {
            at: 15.804,
            audio: 'assets/story-gatot-petruk-petruk-1.mp3',
            actor: 'petruk',
            speaker: 'Petruk',
            speakerEn: 'Petruk',
            text: 'Waduh... Den Gatotkaca, sampun galak-galak ta, Den. Biasane nek ketemu Petruk nang Karang Kadempel ki ngajak ngopi, lha kok saiki nganggo nada kaya arep nagih utang? Aku iki saiki wis dadi raja, lho!',
            textEn: 'Oh, Master Gatotkaca, don’t be so fierce. Usually, when you meet Petruk in Karang Kadempel, you invite me for coffee. Now you speak as if you are collecting a debt? I have become a king!',
          },
          {
            at: 29.283,
            audio: 'assets/story-gatot-petruk-gatot-2.mp3',
            actor: 'gatotkaca',
            speaker: 'Gatotkaca',
            speakerEn: 'Gatotkaca',
            text: 'Raja?! Sejak kapan seorang abdi Punokawan naik takhta menjadi raja dengan kesaktian sebesar ini? Jangan main-main, Petruk! Pusaka apa yang telah engkau pakai hingga berani menantang para ksatria?',
            textEn: 'A king?! Since when did a Punokawan servant ascend the throne with such power? Do not joke, Petruk! What heirloom have you used to dare challenge the warriors?',
          },
          {
            at: 41.169,
            audio: 'assets/story-gatot-petruk-petruk-2.mp3',
            actor: 'petruk',
            speaker: 'Petruk',
            speakerEn: 'Petruk',
            text: 'Lho, kok malah gumun ta, Den? Nek wong cilik dadi raja ki pancen aneh ya? Coba takon karo awake dhewe... Saksuwene iki, sing paling akeh mbantu, ngurus, lan ngrungokake keluh kesah ki sapa? Ya wong-wong cilik kaya aku! Dadi nek saiki aku nyoba dadi raja, kudune ora usah kaget!',
            textEn: 'Why are you surprised, Master? Isn’t it strange when common people become rulers? Just ask yourself... all this time, who helps, manages, and listens to people’s troubles? Common people like me! So if I now try to become a ruler, you should not be surprised!',
          },
          {
            at: 60.735,
            audio: 'assets/story-gatot-petruk-gatot-3.mp3',
            actor: 'gatotkaca',
            speaker: 'Gatotkaca',
            speakerEn: 'Gatotkaca',
            text: 'Jadi... Ini bukan sekadar perebutan takhta, melainkan teguran untuk kami semua?',
            textEn: 'So... this is not merely a struggle for the throne, but a warning for all of us?',
          },
          {
            at: 66.456,
            audio: 'assets/story-gatot-petruk-petruk-3.mp3',
            actor: 'petruk',
            speaker: 'Petruk',
            speakerEn: 'Petruk',
            text: 'Nah, ngono kuwi, Den! Dadi raja utawa dadi ksatria ki ora cukup mung gagah lan sekti mandraguna, nanging kudu gelem ngrungokake suarane wong cilik. Yen wis paham, ayo padha rembugan apik-apik—timbang adu otot, mending padha golek wedang jahe!',
            textEn: 'Exactly, Master! Being a king or a warrior is not enough to be brave and mighty; you must also be willing to listen to common people. If you understand, let us talk properly—rather than wrestling strength, let us find ginger drinks!',
          },
        ],
      },
      {
        title: 'Makna di Balik Tawa',
        titleEn: 'The Meaning Behind the Laughter',
        chapter: 'welgeduwelbeh',
        background: 'story-welgeduwelbeh-palace',
        motion: 'welgeduwelbeh',
        puppetCharacters: ['wayang-emas', 'petruk'],
        duration: 12,
        lines: [
          {
            at: 0,
            text: 'Suasana cair diiringi gending yang riang. Semar hadir meluruskan duduk perkara dan menegaskan bahwa kepemimpinan harus adil, rendah hati, serta tidak melupakan rakyat kecil.',
            textEn: 'The atmosphere turns cordial as cheerful gamelan plays. Semar comes to settle the matter and stresses that leadership must be just, humble, and mindful of ordinary people.',
          },
        ],
      },
      {
        title: 'Gunungan Menutup Kisah',
        titleEn: 'The Gunungan Closes the Story',
        chapter: 'welgeduwelbeh',
        background: 'story-welgeduwelbeh-palace',
        motion: 'gunungan',
        puppetCharacters: ['wayang-emas', 'petruk'],
        duration: 5.5,
        lines: [
          {
            at: 0,
            text: 'Gunungan ditancepkan sebagai penutup pagelaran sebelum kisah berlanjut ke kuis.',
            textEn: 'The gunungan is raised to close the performance before the quiz begins.',
          },
        ],
      },
    ],
  },
  {
    id: 'rahwana-sinta',
    title: 'Kisah Cinta Tragis Rahwana & Dewi Sinta',
    titleEn: 'The Tragic Love Story of Rahwana & Dewi Sinta',
    description: 'Kisah obsesi Rahwana, penculikan Dewi Sinta, hingga perang Alengka.',
    descriptionEn: 'Rahwana’s obsession, the abduction of Dewi Sinta, and the war of Alengka.',
    characters: ['dewi-sinta', 'rahwana'],
    actors: {
      sinta: { puppet: 0, character: 'dewi-sinta' },
      rahwana: { puppet: 1, character: 'rahwana' },
    },
    quiz: [
      {
        question: 'Siapa yang pertama menyampaikan nama Sinta kepada Rahwana?',
        questionEn: 'Who first told Rahwana about Sinta?',
        options: ['Surpanaka', 'Wibisana', 'Marica', 'Kumbakarna'],
        optionsEn: ['Surpanaka', 'Wibisana', 'Marica', 'Kumbakarna'],
        answer: 'Surpanaka',
        answerEn: 'Surpanaka',
        fact: 'Surpanaka, adik Rahwana, terluka di Hutan Dandaka sebelum menceritakan Sinta.',
        factEn: 'Surpanaka, Rahwana’s sister, was wounded in the Dandaka Forest before telling him about Sinta.',
      },
      {
        question: 'Di mana Dewi Sinta ditahan setelah dibawa ke Alengka?',
        questionEn: 'Where was Dewi Sinta held after being taken to Alengka?',
        options: ['Taman Argasoka', 'Hutan Dandaka', 'Dasar Samudra', 'Gunung Mahendra'],
        optionsEn: ['Argasoka Garden', 'Dandaka Forest', 'The ocean floor', 'Mount Mahendra'],
        answer: 'Taman Argasoka',
        answerEn: 'Argasoka Garden',
        fact: 'Sinta ditahan di Taman Argasoka, yang terasa seperti sangkar emas baginya.',
        factEn: 'Sinta was held in Argasoka Garden, which felt like a gilded cage to her.',
      },
      {
        question: 'Apa pesan yang disampaikan melalui akhir kisah Rahwana dan Sinta?',
        questionEn: 'What lesson is conveyed by the ending of Rahwana and Sinta’s story?',
        options: [
          'Cinta tanpa kebijaksanaan dan dharma dapat menghancurkan segalanya.',
          'Kemenangan selalu ditentukan oleh kekuatan.',
          'Kemewahan dapat menggantikan kebebasan.',
          'Perang adalah satu-satunya jalan menuju kedamaian.',
        ],
        optionsEn: [
          'Love without wisdom and dharma can consume everything.',
          'Strength always determines victory.',
          'Luxury can replace freedom.',
          'War is the only path to peace.',
        ],
        answer: 'Cinta tanpa kebijaksanaan dan dharma dapat menghancurkan segalanya.',
        answerEn: 'Love without wisdom and dharma can consume everything.',
        fact: 'Kisah ini menutup dengan kehancuran akibat cinta yang dipaksakan dan tanpa kebijaksanaan.',
        factEn: 'The story ends with destruction caused by possessive love without wisdom.',
      },
    ],
    scenes: [
      {
        title: 'Pendahuluan & Awal Mula Obsesi',
        titleEn: 'The Beginning of an Obsession',
        background: 'background-2',
        motion: 'obsession',
        actor: 'rahwana',
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
        actor: 'sinta',
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
        actor: 'rahwana',
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
        actor: 'rahwana',
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
    actors: {
      gatotkaca: { puppet: 0, character: 'wayang-emas' },
      anoman: { puppet: 1, character: 'wayang-baru' },
    },
    quiz: [
      {
        question: 'Apa yang memicu pertarungan Gatotkaca dan Anoman?',
        questionEn: 'What sparked the fight between Gatotkaca and Anoman?',
        options: ['Salah paham tentang kehadiran Anoman di perbatasan', 'Perebutan takhta Alengka', 'Perintah untuk mencari Tirta Perwitasari', 'Perselisihan tentang senjata pusaka'],
        optionsEn: ['A misunderstanding about Anoman’s presence at the border', 'A struggle for Alengka’s throne', 'An order to find Tirta Perwitasari', 'A dispute over a sacred weapon'],
        answer: 'Salah paham tentang kehadiran Anoman di perbatasan',
        answerEn: 'A misunderstanding about Anoman’s presence at the border',
        fact: 'Kehadiran Anoman disangka sebagai ancaman karena kabar di perbatasan tidak jelas.',
        factEn: 'Anoman’s presence was mistaken for a threat because of confusing reports at the border.',
      },
      {
        question: 'Apa yang diminta Gatotkaca sebelum tantangan perang tanding?',
        questionEn: 'What did Gatotkaca ask before the duel?',
        options: ['Anoman berhenti dan menunjukkan identitasnya', 'Anoman menyerahkan pusakanya', 'Anoman meninggalkan Alengka', 'Anoman mencari Tirta Perwitasari'],
        optionsEn: ['Anoman to stop and identify himself', 'Anoman to surrender his heirloom', 'Anoman to leave Alengka', 'Anoman to find Tirta Perwitasari'],
        answer: 'Anoman berhenti dan menunjukkan identitasnya',
        answerEn: 'Anoman to stop and identify himself',
        fact: 'Gatotkaca ingin menyelidiki keadaan, tetapi kesalahpahaman berkembang menjadi tantangan.',
        factEn: 'Gatotkaca wanted to investigate, but the misunderstanding escalated into a challenge.',
      },
      {
        question: 'Bagaimana konflik mereka akhirnya diselesaikan?',
        questionEn: 'How was their conflict finally resolved?',
        options: ['Masalah diluruskan dan mereka saling menghormati', 'Salah satu ksatria menyerah tanpa penjelasan', 'Mereka membagi wilayah perbatasan', 'Rahwana menghentikan pertarungan'],
        optionsEn: ['The misunderstanding was cleared up and they respected each other', 'One knight surrendered without an explanation', 'They divided the border territory', 'Rahwana stopped the fight'],
        answer: 'Masalah diluruskan dan mereka saling menghormati',
        answerEn: 'The misunderstanding was cleared up and they respected each other',
        fact: 'Setelah kebenaran terungkap, Anoman memberi restu dan petuah kepada Gatotkaca.',
        factEn: 'After the truth came out, Anoman gave Gatotkaca his blessing and advice.',
      },
    ],
    scenes: [
      {
        title: 'Pembukaan: Dua Zaman Bertemu',
        titleEn: 'Opening: Two Eras Meet',
        chapter: 'opening',
        background: 'background-2',
        motion: 'reveal',
        actor: 'anoman',
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
        actor: 'anoman',
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
        actor: 'gatotkaca',
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
        actor: 'gatotkaca',
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
        actor: 'anoman',
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
        actor: 'gatotkaca',
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
        actor: 'gatotkaca',
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
        actor: 'anoman',
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
        actor: 'gatotkaca',
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
        actor: 'gatotkaca',
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
        actor: 'anoman',
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
        actor: 'anoman',
        ...voiceClip('story-gatot-hanoman-resolution-3', 15.725688, [
          [0, 'Pertarungan ditutup dengan rasa saling menghormati yang tinggi.', 'The battle ended with profound mutual respect.'],
          [5.2, 'Anoman sebagai sesepuh memberikan restu dan petuah kepada Gatotkaca.', 'As the elder, Anoman gave Gatotkaca his blessing and teachings.'],
          [11.2, 'Mereka menjadi simbol persatuan kekuatan masa lalu dan masa kini.', 'They became symbols of unity between the strength of past and present.'],
        ]),
      },
    ],
  },
  {
    id: 'werkudara-dewa-ruci',
    title: 'Werkudara dan Dewa Ruci',
    titleEn: 'Werkudara and Dewa Ruci',
    description: 'Perjalanan Werkudara mencari Tirta Perwitasari dan menemukan hakikat kehidupan.',
    descriptionEn: 'Werkudara seeks Tirta Perwitasari and discovers the meaning of life.',
    characters: ['werkudara', 'drona'],
    cast: ['werkudara', 'drona', 'dewa-ruci'],
    actors: {
      werkudara: { puppet: 0, character: 'werkudara' },
      durna: { puppet: 1, character: 'drona' },
      dewaRuci: { puppet: 1, character: 'dewa-ruci' },
    },
    quiz: [
      {
        question: 'Apa tugas yang diberikan Resi Durna kepada Werkudara?',
        questionEn: 'What task did Resi Durna give Werkudara?',
        options: ['Mencari Tirta Perwitasari di dasar Samudra Hindia', 'Menjaga Taman Argasoka', 'Menghadang Anoman di perbatasan', 'Mencari Surpanaka di Hutan Dandaka'],
        optionsEn: ['Find Tirta Perwitasari at the bottom of the Indian Ocean', 'Guard Argasoka Garden', 'Stop Anoman at the border', 'Find Surpanaka in the Dandaka Forest'],
        answer: 'Mencari Tirta Perwitasari di dasar Samudra Hindia',
        answerEn: 'Find Tirta Perwitasari at the bottom of the Indian Ocean',
        fact: 'Werkudara berangkat seorang diri untuk mencari air kehidupan yang disebut Tirta Perwitasari.',
        factEn: 'Werkudara set out alone to seek the water of life called Tirta Perwitasari.',
      },
      {
        question: 'Menurut Dewa Ruci, di manakah air kehidupan sejati berada?',
        questionEn: 'According to Dewa Ruci, where is the true water of life?',
        options: ['Di dalam diri Werkudara', 'Di gua dasar samudra', 'Di Taman Argasoka', 'Di puncak Gunung Mahendra'],
        optionsEn: ['Within Werkudara himself', 'In a cave at the ocean floor', 'In Argasoka Garden', 'At the summit of Mount Mahendra'],
        answer: 'Di dalam diri Werkudara',
        answerEn: 'Within Werkudara himself',
        fact: 'Dewa Ruci menuntun Werkudara memahami bahwa pencarian itu juga merupakan perjalanan batin.',
        factEn: 'Dewa Ruci guides Werkudara to understand that the search is also an inward journey.',
      },
      {
        question: 'Apa yang dilambangkan warna-warna yang dilihat Werkudara?',
        questionEn: 'What do the colors Werkudara sees symbolize?',
        options: ['Hawa nafsu, pikiran, dan nyawa', 'Empat kerajaan di tanah Jawa', 'Senjata para Pandawa', 'Empat penjuru lautan'],
        optionsEn: ['Desire, thought, and the spirit', 'Four kingdoms of Java', 'The Pandawa’s weapons', 'The four directions of the ocean'],
        answer: 'Hawa nafsu, pikiran, dan nyawa',
        answerEn: 'Desire, thought, and the spirit',
        fact: 'Dewa Ruci menjelaskan warna dan cahaya sebagai simbol unsur batin yang menghidupkan manusia.',
        factEn: 'Dewa Ruci explains the colors and light as symbols of the inner forces that give life.',
      },
    ],
    scenes: [
      {
        title: 'Titah Resi Durna',
        titleEn: 'Resi Durna’s Command',
        background: 'story-pendopo',
        motion: 'command',
        puppetCharacters: ['werkudara', 'drona'],
        duration: 60,
        lines: [
          {
            at: 0,
            audio: 'assets/story-werkudara-1.mp3',
            actor: 'werkudara',
            speaker: 'Werkudara',
            speakerEn: 'Werkudara',
            text: 'Romo Guru Resi Durna... hamba menghadap. Berbicaralah, tugas apa pun yang Guru kehendaki demi keselamatan dan kemuliaan negara, hamba siap melaksanakannya tanpa ragu.',
            textEn: 'Revered teacher Resi Durna... I am here. Tell me what task you require for the safety and honor of our kingdom; I will carry it out without hesitation.',
          },
          {
            at: 11.6,
            audio: 'assets/story-drona-1.mp3',
            actor: 'durna',
            speaker: 'Resi Durna',
            speakerEn: 'Resi Durna',
            text: 'Wahai muridku, Werkudara... Jika engkau benar-benar murid yang taat dan ingin mencapai derajat kesempurnaan hidup serta ilmu sejati, maka dengarkan perintahku.',
            textEn: 'My student, Werkudara... If you are truly obedient and seek perfection in life and true knowledge, then heed my command.',
          },
          {
            at: 24.1,
            audio: 'assets/story-werkudara-2.mp3',
            actor: 'werkudara',
            speaker: 'Werkudara',
            speakerEn: 'Werkudara',
            text: 'Hamba mendengarkan, Guru.',
            textEn: 'I am listening, Master.',
          },
          {
            at: 26.3,
            audio: 'assets/story-drona-2.mp3',
            actor: 'durna',
            speaker: 'Resi Durna',
            speakerEn: 'Resi Durna',
            text: 'Carilah air kehidupan yang disebut Tirta Perwitasari. Air suci itu letaknya berada di dasar Samudra Hindia yang mahaluas, di gua di mana ombak besar bergulung mematikan. Pergilah ke sana seorang diri, cari dan temukan air itu!',
            textEn: 'Seek the water of life called Tirta Perwitasari. It lies at the bottom of the vast Indian Ocean, in a cave where deadly waves surge. Go there alone and find it!',
          },
          {
            at: 43.7,
            text: 'Di sudut ruangan, para Kurawa tersenyum licik karena mengira Bima pasti akan mati tenggelam di lautan ganas.',
            textEn: 'In a corner, the Kurawa smiled slyly, certain Bima would drown in the raging sea.',
          },
          {
            at: 48.7,
            audio: 'assets/story-werkudara-3.mp3',
            actor: 'werkudara',
            speaker: 'Werkudara',
            speakerEn: 'Werkudara',
            text: 'Titah Guru adalah hukum bagi hamba. Sekalipun nyawa taruhannya, hamba akan pergi ke dasar samudra demi mendapatkan Tirta Perwitasari!',
            textEn: 'Your command is law to me. Even if my life is at stake, I will descend to the ocean floor for Tirta Perwitasari!',
          },
        ],
      },
      {
        title: 'Pertemuan di Dasar Samudra',
        titleEn: 'Meeting at the Ocean Floor',
        background: 'story-shore',
        backgroundChanges: [
          { at: 6.9, key: 'story-ocean-floor' },
        ],
        motion: 'ocean',
        puppetCharacters: ['werkudara', 'dewa-ruci'],
        duration: 60,
        lines: [
          {
            at: 0,
            text: 'Gamelan berubah syahdu dan misterius. Adegan berpindah ke tepi pantai samudra luas. Werkudara mencebur ke ombak raksasa, melawan badai, lalu terdampar di dasar samudra yang sunyi. Sesosok dewa kecil bercahaya muncul.',
            textEn: 'The gamelan turns solemn and mysterious. The scene shifts to the shore of a vast ocean. Werkudara plunges through giant waves and a storm, reaching the silent ocean floor. A small, radiant deity appears.',
          },
          {
            at: 6.9,
            audio: 'assets/story-dewa-ruci-1.mp3',
            actor: 'dewaRuci',
            speaker: 'Dewa Ruci',
            speakerEn: 'Dewa Ruci',
            text: 'Selamat datang di dasar samudra, Werkudara. Mengapa engkau mencari air suci di tempat yang kosong dari raga duniawi ini?',
            textEn: 'Welcome to the ocean floor, Werkudara. Why seek sacred water in this place, empty of worldly life?',
          },
          {
            at: 15.2,
            audio: 'assets/story-werkudara-4.mp3',
            actor: 'werkudara',
            speaker: 'Werkudara',
            speakerEn: 'Werkudara',
            text: 'Duh, makhluk mulia... Siapa engkau? Aku diutus guruku untuk mencari Tirta Perwitasari, air kehidupan sejati.',
            textEn: 'O noble being... who are you? My teacher sent me to seek Tirta Perwitasari, the true water of life.',
          },
          {
            at: 24,
            audio: 'assets/story-dewa-ruci-2.mp3',
            actor: 'dewaRuci',
            speaker: 'Dewa Ruci',
            speakerEn: 'Dewa Ruci',
            text: 'Air kehidupan yang sejati tidak terletak di lautan luar, melainkan di dalam dirimu. Masuklah ke dalam tubuhku jika engkau ingin melihat kebenaran alam semesta.',
            textEn: 'The true water of life is not in the outer ocean, but within you. Enter my body if you wish to see the truth of the universe.',
          },
          {
            at: 37.8,
            audio: 'assets/story-werkudara-5.mp3',
            actor: 'werkudara',
            speaker: 'Werkudara',
            speakerEn: 'Werkudara',
            text: 'Masuk ke dalam tubuhmu? Tubuhmu begitu kecil, sedangkan ragaku sangat besar. Mana mungkin aku bisa masuk?',
            textEn: 'Enter your body? You are so small, while my body is enormous. How could I possibly enter?',
          },
          {
            at: 45.5,
            audio: 'assets/story-dewa-ruci-3.mp3',
            actor: 'dewaRuci',
            speaker: 'Dewa Ruci',
            speakerEn: 'Dewa Ruci',
            text: 'Bukan dengan mata jasmani, melainkan dengan ketulusan batin dan keheningan jiwa.',
            textEn: 'Not with the physical eyes, but with a sincere heart and a quiet soul.',
          },
          {
            at: 51.8,
            text: 'Werkudara mengangguk, lalu dengan pasrah ia mengecilkan raga dan masuk lewat telinga Dewa Ruci. Suasana berubah menjadi hening magis, diiringi tabuhan gamelan yang lembut.',
            textEn: 'Werkudara nods, then shrinks and enters through Dewa Ruci’s ear. The scene turns magically quiet, accompanied by gentle gamelan.',
          },
        ],
      },
      {
        title: 'Hakikat Tirta Perwitasari',
        titleEn: 'The Meaning of Tirta Perwitasari',
        background: 'story-inner-world',
        motion: 'vision',
        puppetCharacters: ['werkudara', 'dewa-ruci'],
        duration: 49,
        lines: [
          {
            at: 0,
            audio: 'assets/story-dewa-ruci-batin.mp3',
            actor: 'dewaRuci',
            speaker: 'Dewa Ruci (suara batin)',
            speakerEn: 'Dewa Ruci (inner voice)',
            text: 'Wahai Werkudara, apa yang engkau lihat di dalam diriku?',
            textEn: 'Werkudara, what do you see within me?',
          },
          {
            at: 4.2,
            audio: 'assets/story-werkudara-6.mp3',
            actor: 'werkudara',
            speaker: 'Werkudara',
            speakerEn: 'Werkudara',
            text: 'Ajaib... Di dalam tubuhmu aku melihat segalanya. Ada cahaya berkilau bagai ribuan matahari, ada warna merah, hitam, kuning, dan putih yang bergejolak... Aku melihat luasnya alam semesta, hidup, dan mati.',
            textEn: 'Incredible... Within you I see everything. A brilliant light shines like a thousand suns; red, black, yellow, and white swirl... I see the vast universe, life, and death.',
          },
          {
            at: 20.7,
            audio: 'assets/story-dewa-ruci-4.mp3',
            actor: 'dewaRuci',
            speaker: 'Dewa Ruci',
            speakerEn: 'Dewa Ruci',
            text: 'Itulah Sangkan Paraning Dumadi—asal dan tujuan hidup manusia. Segala warna dan cahaya itu adalah simbol hawa nafsu, pikiran, dan nyawa yang menghidupkan ragamu. Temukan ketenangan di dalam hatimu, dan engkau telah menemukan Tirta Perwitasari yang sesungguhnya.',
            textEn: 'This is Sangkan Paraning Dumadi—the origin and destination of human life. Those colors and lights symbolize desire, thought, and the spirit that gives life to your body. Find stillness in your heart, and you will have found the true Tirta Perwitasari.',
          },
          {
            at: 40.3,
            text: 'Werkudara bersujud di hadapan Dewa Ruci, mencapai pencerahan batin yang tertinggi. Gamelan mengalun lembut dalam suasana hening dan magis.',
            textEn: 'Werkudara bows before Dewa Ruci and reaches the highest spiritual awakening. The gamelan plays softly in a magical silence.',
          },
        ],
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

function storyIdleInputs(inputs, elapsed, view) {
  return inputs.map((input, index) => {
    const phase = index * Math.PI;
    const breathe = Math.sin(elapsed * 0.88 + phase);
    const sway = Math.sin(elapsed * 0.62 + phase + 0.6);
    const nod = Math.sin(elapsed * 0.39 + phase + 1.4);
    const nudgeArm = (spec, sidePhase) => {
      if (spec.type !== 'rel') return spec;
      return {
        ...spec,
        dx: spec.dx + Math.sin(elapsed * 0.7 + phase + sidePhase) * 0.018,
        dy: spec.dy + Math.sin(elapsed * 1.05 + phase + sidePhase) * 0.045,
      };
    };

    return {
      ...input,
      body: {
        ...input.body,
        x: input.body.x + Math.sin(elapsed * 0.48 + phase + 1.1) * view.w * 0.0025,
        y: input.body.y + (breathe * 0.007 + nod * 0.002) * view.h,
      },
      tilt: input.tilt + sway * 0.018 + nod * 0.008,
      arms: {
        ...input.arms,
        left: nudgeArm(input.arms.left, 0),
        right: nudgeArm(input.arms.right, Math.PI * 0.75),
      },
    };
  });
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

  if (story.id === 'werkudara-dewa-ruci') {
    let werkudara = {
      x: leftX,
      y: 0.68,
      tilt: 0,
      left: [-0.38, 0.34],
      right: [0.38, 0.34],
      depth: 0,
    };
    let other = {
      x: 1 - leftX,
      y: 0.68,
      tilt: 0,
      left: [-0.38, 0.34],
      right: [0.38, 0.34],
      depth: 0,
    };
    const speaker = scene.lines[sceneLine]?.actor;

    if (scene.motion === 'command') {
      if (speaker === 'werkudara') {
        werkudara.tilt = 0.025 + Math.sin(sceneElapsed * 0.8) * 0.018;
        other.tilt = -0.025 + Math.sin(sceneElapsed * 0.6) * 0.01;
      } else if (speaker === 'durna') {
        other.tilt = -0.045 + Math.sin(sceneElapsed * 0.65) * 0.015;
        other.right = [0.38, -0.08];
        werkudara.tilt = 0.035;
        werkudara.left = [-0.38, 0.48];
        werkudara.right = [0.38, 0.48];
      } else {
        other.tilt = -0.06;
        other.left = [-0.42, 0.24];
        other.right = [0.42, 0.24];
      }
    } else if (scene.motion === 'ocean') {
      const descent = smooth(sceneElapsed / 8);
      const storm = 1 - smooth(sceneElapsed / 10);
      const surge = Math.sin(sceneElapsed * 2.7);
      const reveal = smooth(sceneElapsed / 8);
      werkudara.x += Math.sin(sceneElapsed * 0.9) * 0.025 * storm;
      werkudara.y = 0.68 - descent * 0.055 + surge * 0.018 * storm;
      werkudara.tilt = surge * 0.075 * storm - descent * 0.035;
      werkudara.left = [-0.48, -0.12 + surge * 0.18 * storm];
      werkudara.right = [0.48, -0.12 - surge * 0.18 * storm];
      other.x -= reveal * 0.09;
      other.y = 0.69 - reveal * 0.045 + Math.sin(sceneElapsed * 0.8) * 0.008;
      other.tilt = 0.025 + Math.sin(sceneElapsed * 0.75) * 0.012;
      if (speaker === 'dewaRuci') other.tilt -= 0.025;
    } else if (scene.motion === 'vision') {
      const wonder = smooth(sceneElapsed / 18);
      const bow = smooth((sceneElapsed - 44) / 8);
      werkudara.x += wonder * 0.035;
      werkudara.y = 0.67 + bow * 0.055 + Math.sin(sceneElapsed * 0.75) * 0.008;
      werkudara.tilt = 0.025 + Math.sin(sceneElapsed * 0.55) * 0.018 + bow * 0.25;
      werkudara.depth = -0.45;
      werkudara.left = [-0.42, 0.42 + bow * 0.18];
      werkudara.right = [0.42, 0.42 + bow * 0.18];
      other.x -= wonder * 0.025;
      other.y = 0.64 + Math.sin(sceneElapsed * 0.65 + 1) * 0.008;
      other.tilt = -0.025 + Math.sin(sceneElapsed * 0.5 + 1) * 0.014;
      other.left = [-0.3, 0.42];
      other.right = [0.3, 0.42];
      if (speaker === 'werkudara' && !bow) {
        werkudara.tilt += 0.035;
        werkudara.left = [-0.48, -0.08];
        werkudara.right = [0.48, -0.08];
      }
    } else if (scene.motion === 'return') {
      const arrival = smooth(sceneElapsed / 7);
      werkudara.x = leftX - 0.1 + arrival * 0.1;
      werkudara.y = 0.68 + Math.sin(sceneElapsed * 1.5) * 0.012 * (1 - arrival);
      werkudara.tilt = 0.025 + Math.sin(sceneElapsed * 0.7) * 0.012;
      other.tilt = speaker === 'durna' ? -0.045 : 0.015;
      if (speaker === 'werkudara') werkudara.tilt += 0.025;
    }

    return storyIdleInputs([
      actorInput(view, werkudara.x, werkudara.y, werkudara.tilt, werkudara.left, werkudara.right, werkudara.depth),
      actorInput(view, other.x, other.y, other.tilt, other.left, other.right, other.depth),
    ], sceneElapsed, view);
  }

  if (story.id === 'gatotkaca-petruk-welgeduwelbeh') {
    let gatot = {
      x: leftX,
      y: 0.68,
      tilt: 0,
      left: [-0.38, 0.26],
      right: [0.38, 0.26],
      depth: 0,
    };
    let petruk = {
      x: 1 - leftX,
      y: 0.68,
      tilt: 0,
      left: [-0.38, 0.26],
      right: [0.38, 0.26],
      depth: 0,
    };
    const speaker = scene.lines[sceneLine]?.actor;
    const tense = Math.sin(chapterElapsed * 0.9);

    if (scene.motion === 'gunungan') {
      gatot.x = 0.13;
      petruk.x = 0.87;
      gatot.y = 0.76;
      petruk.y = 0.76;
      gatot.tilt = -0.07;
      petruk.tilt = 0.07;
      gatot.left = [-0.38, 0.38];
      gatot.right = [0.38, 0.38];
      petruk.left = [-0.38, 0.38];
      petruk.right = [0.38, 0.38];
    } else if (scene.motion === 'welgeduwelbeh') {
      gatot.tilt = 0.035 + tense * 0.018;
      petruk.tilt = -0.015 + Math.sin(chapterElapsed * 0.65) * 0.02;
      gatot.left = [-0.44, -0.08 - tense * 0.08];
      gatot.right = [0.46, -0.22];
      petruk.left = [-0.44, 0.12];
      petruk.right = [0.44, 0.12 + Math.sin(chapterElapsed * 0.72) * 0.06];

      if (speaker === 'gatotkaca') {
        gatot.tilt += 0.055;
        gatot.right = [0.58, -0.34];
        petruk.tilt -= 0.025;
      } else if (speaker === 'petruk') {
        petruk.tilt -= 0.055;
        petruk.right = [0.54, -0.08];
        petruk.left = [-0.54, 0.08];
        gatot.tilt -= 0.025;
      } else {
        gatot.x = 0.36;
        petruk.x = 0.64;
        gatot.tilt = -0.055;
        petruk.tilt = 0.055;
        gatot.left = [-0.36, 0.24];
        gatot.right = [0.36, 0.24];
        petruk.left = [-0.36, 0.24];
        petruk.right = [0.36, 0.24];
      }
    }

    return storyIdleInputs([
      actorInput(view, gatot.x, gatot.y, gatot.tilt, gatot.left, gatot.right, gatot.depth),
      actorInput(view, petruk.x, petruk.y, petruk.tilt, petruk.left, petruk.right, petruk.depth),
    ], chapterElapsed, view);
  }

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

    return storyIdleInputs([
      actorInput(view, gatot.x, gatot.y, gatot.tilt, gatot.left, gatot.right, gatot.depth),
      actorInput(view, hanoman.x, hanoman.y, hanoman.tilt, hanoman.left, hanoman.right, hanoman.depth),
    ], chapterElapsed, view);
  }

  if (scene.motion === 'obsession') {
    const yearning = (Math.sin(sceneElapsed * 0.72) + 1) * 0.5;
    rahwana.left = [-0.42, 0.2 + pulse * 0.15];
    rahwana.right = [0.42 + yearning * 0.16, -0.18 - yearning * 0.62];
    rahwana.tilt = -0.035 + Math.sin(sceneElapsed * 0.48) * 0.06;
    sinta.y += breath * 0.008;
    sinta.left = [-0.12, 0.95 + breath * 0.03];
    sinta.right = [0.12, 0.95 - breath * 0.03];
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
    sinta.left = [-0.12 - refusal * 0.08, 0.95 - refusal * 0.08];
    sinta.right = [0.12, 0.95 + breath * 0.03];
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

  return storyIdleInputs([
    actorInput(view, sinta.x, sinta.y, sinta.tilt, sinta.left, sinta.right, sinta.depth),
    actorInput(view, rahwana.x, rahwana.y, rahwana.tilt, rahwana.left, rahwana.right, rahwana.depth),
  ], sceneElapsed, view);
}

export function storySpeakerInputs(inputs, story, line, scene, sceneTime) {
  const actorId = line.actor ?? scene.actor;
  if (!actorId) return inputs;

  const actor = story.actors?.[actorId];
  if (!actor) throw new Error(`Story "${story.id}" references unknown actor "${actorId}"`);
  if (actor.puppet !== 0 && actor.puppet !== 1) {
    throw new RangeError(`Story "${story.id}" has an invalid puppet index for actor "${actorId}"`);
  }
  if (!inputs[actor.puppet]) {
    throw new RangeError(`Story "${story.id}" has no input for actor "${actorId}"`);
  }

  const inward = actor.puppet === 0 ? 1 : -1;
  const lineIndex = scene.lines.indexOf(line);
  let turnStart = line.at ?? 0;
  for (let index = lineIndex - 1; index >= 0; index--) {
    const previousActor = scene.lines[index].actor ?? scene.actor;
    if (previousActor !== actorId) break;
    turnStart = scene.lines[index].at ?? turnStart;
  }
  const turnElapsed = Math.max(0, sceneTime - turnStart);
  const gesturePhase = turnElapsed % 4.2;
  const anticipation = 1 - smooth(gesturePhase / 0.18);
  const thrust = smooth((gesturePhase - 0.1) / 0.13)
    * (1 - smooth((gesturePhase - 0.4) / 0.24));
  const pointing = {
    type: 'rel',
    dx: inward * (0.68 - 0.34 * anticipation + 0.2 * thrust),
    dy: 0.12 + 0.32 * anticipation - 0.34 * thrust + Math.sin(turnElapsed * 2.4) * 0.025,
  };
  const pointingArm = actor.puppet === 0 ? 'right' : 'left';

  return inputs.map((input, index) => (
    index === actor.puppet
      ? { ...input, arms: { ...input.arms, [pointingArm]: pointing } }
      : input
  ));
}
