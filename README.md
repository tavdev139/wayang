# wayang

Wayang kulit hand puppetry di browser: kamera melacak tanganmu, dua wayang tampil di kelir dengan bayangan dari blencong.

Jalankan dengan server statis apa pun dari folder ini, misalnya `python -m http.server 8000`, lalu buka `http://localhost:8000`.
(Lewat `file://` tidak bisa, karena memakai ES modules.)

## Bahasa

Pilih ikon globe di baris atas untuk beralih antara Bahasa Indonesia dan English. Pilihan disimpan di browser. Antarmuka, kuis, dan subtitle cerita mengikuti bahasa yang dipilih; audio cerita yang tersedia tetap berbahasa Indonesia.

## Karakter

Semua karakter didaftarkan di satu tempat: **`characters.js`**. Saat ini ada Arjuna, Hanoman, Gatot Kaca, Werkudara, Yudistira, Rahwana, Dewi Sinta, Semar, Petruk, Dewa Ruci, dan Drona.

- Pilih karakter di **Settings → Left puppet / Right puppet**.
- Atau lewat alamat: `index.html?left=arjuna&right=wayang-baru`.
- Pasangan awal diatur di `DEFAULT_PAIR` (bagian bawah `characters.js`).

Aset Semar dan Petruk dibuat dari foto badan dan foto potongan lengan yang diberikan pengguna; posisi bahu Semar mengikuti foto contoh wayang yang belum dipotong. Aset lengan Dewa Ruci dan Drona dipisah dari lembar potongan referensi; `assets/ruci.jpg` dan `assets/drona.jpg` disimpan sebagai acuan pemasangan lengan.

## Latar dan musik

Pilih **Background** dan **Music** dari Settings. Background satu dan Musik satu menjadi pilihan awal; pilihan lainnya berurutan dari sana. Kiprahan mengikuti ketukan stabil karena musik pilihan tidak memiliki berkas grid ketukan.

## Pratinjau kamera

Saat kamera aktif, jendela pratinjau dapat digeser dengan mouse atau sentuhan, atau dipindah memakai tombol panah saat pratinjau terfokus.

## Cerita

Cerita Rahwana–Sinta memakai empat rekaman narator yang sudah ada. Cerita **Perang Tanding Gatotkaca vs Anoman** memakai dua belas potongan suara di `assets/story-gatot-hanoman-*.mp3`; subtitle dibagi menjadi frasa pendek yang berganti beberapa kali selama tiap potongan narasi. **Werkudara dan Dewa Ruci** memakai suara untuk dialog Werkudara, Resi Durna, dan Dewa Ruci; keterangan adegan tampil sebagai subtitle suasana tanpa suara narator. Subtitle tersedia dalam dua bahasa, sedangkan rekaman dialog berbahasa Indonesia. Cerita berakhir saat Werkudara bersujud di hadapan Dewa Ruci. Setelah cerita selesai, tombol akhir membuka kuis tiga soal yang isinya sesuai dengan cerita yang baru ditonton; kuis tokoh umum tetap tersedia dari menu.

Buka **Menu → Cerita Wayang**, lalu pilih judul. Latar cerita berubah langsung tanpa transisi gunungan. Musik 3 diputar otomatis selama cerita; volumenya diturunkan saat dialog bersuara dan musik pilihanmu dipulihkan saat kamu keluar dari cerita. Cerita dengan audio menggerakkan tokoh otomatis dan menyelaraskan subtitle dengan suara; napas, ayunan badan, dan gerak lengan kecil yang tidak serempak menjaga tokoh yang sedang diam tetap hidup, dan ikut berhenti saat cerita dijeda. Cerita Rahwana–Sinta dan Gatotkaca–Anoman memberi gestur menunjuk tegas berupa tarikan singkat, sabetan cepat, lalu pose tahan pada tokoh yang menjadi fokus. Cerita Werkudara–Dewa Ruci bergerak otomatis mengikuti dialog dan adegan tanpa meminta akses kamera; latar berpindah dari pendopo ke tepi pantai, dasar samudra, lalu alam batin Dewa Ruci. Pose berubah saat Werkudara berbicara, menyelam, bertemu Dewa Ruci, dan bersujud di hadapan Dewa Ruci. Tombol di bawah dapat menjeda atau melangkah antarbaris. Tokoh di sisi kanan berganti antara Resi Durna dan Dewa Ruci mengikuti adegan. Kontrol cerita bersembunyi saat jeda; ikon kembali saat layar disentuh, mouse digerakkan, atau keyboard digunakan.

## Menambah karakter

Satu wayang terdiri dari **badan** + **dua lengan**, tiap lengan 3 potongan (lengan atas, lengan bawah, tangan).
Semuanya PNG transparan di `assets/`.

1. **Siapkan PNG** (latar sudah transparan):
   `body-<nama>.png`, `upper-arm-<nama>-l.png`, `upper-arm-<nama>-r.png`, `forearm-<nama>-l/r.png`, `hand-<nama>-l/r.png`.
   "L" adalah lengan di sisi yang dihadapi wajah (wayang digambar menghadap kiri).
   Potongan lengan dipotong rapat (tanpa margin transparan) supaya titik pivot gampang diukur.
2. **Ukur pivot** (titik paku/rivet) tiap potongan. Untuk lengan yang menggantung lurus ke bawah seperti Arjuna:
   ```
   python measure_pieces.py assets/upper-arm-<nama>-l.png assets/forearm-<nama>-l.png assets/hand-<nama>-l.png
   ```
   Hasilnya berupa baris siap tempel (`prox`, `dist`, `grip`). Untuk lengan yang tidak menggantung lurus, baca titiknya langsung dari gambar.
3. **Tambah satu entri** di `RAW` dalam `characters.js`. Salin entri `arjuna` sebagai contoh; isinya:
   - `id`, `name`: kunci unik dan nama di menu.
   - `scale`: berapa piksel panggung per piksel gambar. Gambar kecil diberi angka besar agar wayang tingginya mendekati standar 1377 piksel (1377 ÷ tinggi gambarmu, sekitar).
   - `body`: `src`, `size`, `anchor` (titik yang dipegang dalang), `shoulder.L/R` (tempat lengan atas dipaku), `stickTop`/`stickFoot` (garis gapit di tengah badan), `ties` (posisi y ikatan gapit).
   - `arms.L` dan `arms.R`: tiap potongan `{ src, size, prox, dist }` (tangan: `{ src, size, prox, grip }`). `prox` adalah pivot bahu/siku/pergelangan dan `dist` adalah pivot berikutnya.
   - `armPartScale` (opsional): pengali `{ upper, fore, hand }` untuk skala potongan dan pivot.
   - `armLengthRatios` (opsional): hanya untuk karakter yang perlu diskalakan berdasarkan tinggi badannya. Yudistira memakai total `0.5×` tinggi badan dengan rasio lengan atas:lengan bawah:tangan `1:1.35:0.6`; karakter lain mempertahankan setelan ukuran dan pose masing-masing.
   - `armReach` (opsional): batas `{ min, max }` jarak tangan sebagai rasio jangkauan total; bawaan `0.4`–`0.96` menjaga siku tidak terlalu terlipat atau terkunci lurus.
   - `rest`: posisi tangan saat santai, sebagai selisih dari bahu (piksel gambar badan).
   - `armBend` (opsional): arah tekuk siku tiap sisi (`-1` atau `1`).
   - Pose awal `25°/50°` dan ayunan ringan diterapkan khusus untuk Yudistira.
   - `armsOnTop` (opsional): `true` jika lengan harus digambar di depan badan.
   - `faceDirection` (opsional): arah wajah pada gambar asli (`-1` ke kiri, `1` ke kanan; bawaan `-1`).
4. Tekstur, menu Settings, dan rig membaca daftar karakter secara otomatis. Cek di browser dengan `?left=<id>&right=<id>`: lengan harus menempel di bahu dan ujung tangan ada di ujung tongkat (tuding).

Tips pivot: lengan atas boleh punya `prox` sedikit di luar tepi atas gambar (mis. `[7, -4]` pada Arjuna) agar pakunya terletak di dalam bahu dan lengan tidak "lepas" saat berayun.

## Berkas bantu

`png_*.py`, `probe_*.py`, `build_arjuna.py`, `arjuna_geom.py`, dll. adalah skrip sekali pakai untuk memotong/membersihkan gambar Arjuna (path-nya masih Windows). Yang dipakai saat menambah karakter hanya `measure_pieces.py`.
