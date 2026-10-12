# KioKio - Main, Kenal, Jadi Pintar!
Game edukasi pengenalan huruf alfabet untuk anak usia 4-5 tahun.
## Struktur file
```
kiokio-game/
├── index.html   -> struktur/markup game
├── style.css    -> semua tampilan (warna, ukuran, animasi)
├── script.js    -> semua logika game (skor, nyawa, suara, dll)
└── README.md    -> file ini
```
Ini hasil pecahan dari 1 file HTML sebelumnya menjadi 3 file terpisah
(index.html, style.css, script.js) supaya lebih enak dikembangkan di VS Code.
**Tidak ada perubahan fitur/logika sama sekali** — persis sama dengan versi
sebelumnya, cuma dipisah per jenis file.
## Cara membuka & menjalankan di VS Code
1. Buka folder `kiokio-game` ini di VS Code (`File > Open Folder...`).
2. Install extension **Live Server** (oleh Ritwick Dey) dari VS Code
   Marketplace — ini opsional tapi disarankan supaya file bisa jalan lewat
   `http://localhost` (bukan `file://`), yang bikin fitur suara (Web Speech
   API) dan font Google berjalan lebih stabil di semua browser.
3. Klik kanan pada `index.html` → pilih **"Open with Live Server"**.
   - Atau, tanpa extension: cukup klik dua kali `index.html` untuk membuka
     langsung di browser (kebanyakan fitur tetap jalan normal).
4. Game akan terbuka di browser dan siap dimainkan.
## Tips pengembangan lanjutan- Semua warna brand ada di variabel CSS `:root` paling atas `style.css`
  (`--green`, `--coral`, `--blue`, dst) — ubah di satu tempat, otomatis
  berubah di semua elemen.- Daftar huruf & kata ada di array `LETTERS` paling atas `script.js` —
  tambah/kurangi huruf tinggal edit array ini.- Ukuran tampilan didesain dalam "kanvas" tetap 430x900px (`#frame`) lalu
  di-scale otomatis oleh JS (`fitFrame()`) supaya proporsinya sama persis
  di HP maupun laptop.

  function fitFrame(){
  const frame = document.getElementById('frame');
  const scale = Math.min(window.innerWidth / 430, window.innerHeight / 900);
  frame.style.transform = `translate(-50%, -50%) scale(${scale})`;
}