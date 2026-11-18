# wayang

Wayang kulit hand puppetry di browser: kamera melacak tanganmu, dua wayang tampil di kelir dengan bayangan dari blencong.

Jalankan dengan server statis apa pun dari folder ini, misalnya `python -m http.server 8000`, lalu buka `http://localhost:8000`.
(Lewat `file://` tidak bisa, karena memakai ES modules.)

## Bahasa

Buka **Pengaturan → Bahasa** untuk memilih Bahasa Indonesia atau English. Pilihan disimpan di browser. Antarmuka, kuis, ensiklopedia, dan subtitle cerita mengikuti bahasa yang dipilih; audio narator tetap berbahasa Indonesia.

## Karakter

Semua karakter didaftarkan di satu tempat: **`characters.js`**. Saat ini ada Arjuna, Hanoman, Gatot Kaca, Werkudara, Yudistira, Rahwana, Dewi Sinta, Semar, dan Petruk.

- Pilih karakter di **Settings → Left puppet / Right puppet**.
- Atau lewat alamat: `index.html?left=arjuna&right=wayang-baru`.
- Pasangan awal diatur di `DEFAULT_PAIR` (bagian bawah `characters.js`).

Aset Semar dan Petruk dibuat dari foto badan dan foto potongan lengan yang diberikan pengguna; posisi bahu Semar mengikuti foto contoh wayang yang belum dipotong.

## Latar dan musik

Pilih **Background** dan **Music** dari Settings. Background satu dan Musik satu menjadi pilihan awal; pilihan lainnya berurutan dari sana. Kiprahan mengikuti ketukan stabil karena musik pilihan tidak memiliki berkas grid ketukan.

## Pratinjau kamera

Saat kamera aktif, jendela pratinjau dapat digeser dengan mouse atau sentuhan, atau dipindah memakai tombol panah saat pratinjau terfokus.

## Cerita

Cerita Rahwana–Sinta memakai empat rekaman narator yang sudah ada. Cerita baru **Perang Tanding Gatotkaca vs Anoman** memakai dua belas potongan suara di `assets/story-gatot-hanoman-*.mp3`; subtitle dibagi menjadi frasa pendek yang berganti beberapa kali selama tiap potongan narasi.

Buka **Menu → Cerita Wayang**, lalu pilih judul untuk memulai pertunjukan otomatis dengan tokoh, gerak, dan latar yang sesuai. Gerakan tangan mengikuti suasana adegan; kiprahan juga dipakai saat perang Rahwana. Empat rekaman narator di `assets/narasi-scene-1.mp3` sampai `narasi-scene-4.mp3` menjadi jam pemutaran, sehingga subtitle, gerak, jeda, dan pergantian adegan mengikuti suara. Subtitle hanya menampilkan teks narator. Kontrol cerita memakai ikon di bawah, lalu bersembunyi saat jeda interaksi; ikon kembali saat layar disentuh, mouse digerakkan, atau keyboard digunakan. Kontrol aplikasi juga bersembunyi saat kamera mulai.

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
   - `arms.L` dan `arms.R`: tiap potongan `{ src, size, prox, dist }` (tangan: `{ src, size, prox, grip }`).
   - `rest`: posisi tangan saat santai, sebagai selisih dari bahu (piksel gambar badan).
   - `armBend` (opsional): arah siku tiap sisi (`-1` atau `1`).
   - `armsOnTop` (opsional): `true` jika lengan harus digambar di depan badan.
   - `faceDirection` (opsional): arah wajah pada gambar asli (`-1` ke kiri, `1` ke kanan; bawaan `-1`).
4. Tambahkan profil karakter di `CHARACTER_PROFILES` dalam `main.js` agar tokoh tampil di Ensiklopedia.
5. Tekstur, menu Settings, dan rig membaca daftar karakter secara otomatis. Cek di browser dengan `?left=<id>&right=<id>`: lengan harus menempel di bahu dan ujung tangan ada di ujung tongkat (tuding).

Tips pivot: lengan atas boleh punya `prox` sedikit di luar tepi atas gambar (mis. `[7, -4]` pada Arjuna) agar pakunya terletak di dalam bahu dan lengan tidak "lepas" saat berayun.

## Berkas bantu

`png_*.py`, `probe_*.py`, `build_arjuna.py`, `arjuna_geom.py`, dll. adalah skrip sekali pakai untuk memotong/membersihkan gambar Arjuna (path-nya masih Windows). Yang dipakai saat menambah karakter hanya `measure_pieces.py`.
