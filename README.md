# wayang

Wayang kulit hand puppetry di browser: kamera melacak tanganmu, dua wayang tampil di kelir dengan bayangan dari blencong.

Jalankan dengan server statis apa pun dari folder ini, misalnya `python -m http.server 8000`, lalu buka `http://localhost:8000`.
(Lewat `file://` tidak bisa, karena memakai ES modules.)

## Karakter

Semua karakter didaftarkan di satu tempat: **`characters.js`**. Saat ini ada `original` dan `arjuna`.

- Pilih karakter di **Settings → Left puppet / Right puppet**.
- Atau lewat alamat: `index.html?left=arjuna&right=original`.
- Pasangan awal diatur di `DEFAULT_PAIR` (bagian bawah `characters.js`).

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
   Hasilnya berupa baris siap tempel (`prox`, `dist`, `grip`). Untuk lengan model T-pose (seperti `original`), baca titiknya langsung dari gambar.
3. **Tambah satu entri** di `RAW` dalam `characters.js`. Salin entri `arjuna` sebagai contoh; isinya:
   - `id`, `name`: kunci unik dan nama di menu.
   - `scale`: berapa piksel panggung per piksel gambar, dibanding `original` (=1). Gambar kecil diberi angka besar agar tingginya sama di kelir (tinggi gambar original ÷ tinggi gambarmu, sekitar).
   - `body`: `src`, `size`, `anchor` (titik yang dipegang dalang), `shoulder.L/R` (tempat lengan atas dipaku), `stickTop`/`stickFoot` (garis gapit di tengah badan), `ties` (posisi y ikatan gapit).
   - `arms.L` dan `arms.R`: tiap potongan `{ src, size, prox, dist }` (tangan: `{ src, size, prox, grip }`).
   - `rest`: posisi tangan saat santai, sebagai selisih dari bahu (piksel gambar badan).
4. **Selesai.** Tekstur, menu Settings, dan rig membaca daftar ini, jadi tidak ada file lain yang perlu diubah.
   Cek di browser dengan `?left=<id>&right=<id>`: lengan harus menempel di bahu dan ujung tangan ada di ujung tongkat (tuding).

Tips pivot: lengan atas boleh punya `prox` sedikit di luar tepi atas gambar (mis. `[7, -4]` pada Arjuna) agar pakunya terletak di dalam bahu dan lengan tidak "lepas" saat berayun.

## Berkas bantu

`png_*.py`, `probe_*.py`, `build_arjuna.py`, `arjuna_geom.py`, dll. adalah skrip sekali pakai untuk memotong/membersihkan gambar Arjuna (path-nya masih Windows). Yang dipakai saat menambah karakter hanya `measure_pieces.py`.
