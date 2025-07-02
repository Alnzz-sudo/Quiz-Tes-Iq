const soalIQ = [
  {
    pertanyaan:" Jika 2 + 3 = 13, 3 + 4 = 25, 4 + 5 = 41, maka 5 + 6 = ?",
    pilihan: ["61", "51", "49", "55"],
    jawaban: "61"
  },
  {
    pertanyaan: " Temukan angka berikutnya: 1, 4, 9, 16, 25, ?",
    pilihan: ["36", "30", "32", "35"],
    jawaban: "36"
  },
  {
    pertanyaan: " Mana yang berbeda dari yang lain?",
    pilihan: ["Segitiga", "Persegi", "Lingkaran", "Kubus"],
    jawaban: "Kubus"
  },
  {
    pertanyaan: " Jika TOMORROW dikodekan menjadi RQKNMPPU, maka TODAY menjadi?",
    pilihan: ["RQBYWU", "RQAZXT", "RQBXWT", "RQAXWT"],
    jawaban: "RQBXWT"
  },
  {
    pertanyaan: " Jika semua Burung bisa terbang, dan Elang adalah Burung, maka...",
    pilihan: [
      "Elang tidak bisa terbang",
      "Elang bisa terbang",
      "Burung tidak bisa terbang",
      "Elang adalah Mamalia"
    ],
    jawaban: "Elang bisa terbang"
  },
  {
  pertanyaan: " Seorang ayah berumur 40 tahun, anaknya 10 tahun. Berapa tahun lagi umur ayah akan tiga kali lipat dari umur anak?",
  pilihan: ["10", "15", "5", "20"],
  jawaban: "5"
},
{
  pertanyaan: " Dalam satu kotak terdapat 5 bola merah, 3 bola biru, dan 2 bola kuning. Jika kamu mengambil 1 bola tanpa melihat, peluang paling besar kamu dapat warna apa?",
  pilihan: ["Merah", "Biru", "Kuning", "Semua sama"],
  jawaban: "Merah"
},
{
  pertanyaan: " Seseorang masuk ke rumah gelap, hanya ada satu korek dan di dalam ada lilin, lampu minyak, dan kompor. Apa yang harus dinyalakan terlebih dahulu?",
  pilihan: ["Lilin", "Lampu minyak", "Kompor", "Korek"],
  jawaban: "Korek"
},
{
  pertanyaan: " Jika semua burung bisa terbang, dan ayam adalah burung, tapi ayam tidak bisa terbang tinggi. Maka pernyataan yang benar adalah?",
  pilihan: [
    "Ayam bukan burung",
    "Semua burung bisa terbang tinggi",
    "Ayam bisa terbang sedikit tapi tetap burung",
    "Ayam sama sekali tidak bisa terbang"
  ],
  jawaban: "Ayam bisa terbang sedikit tapi tetap burung"
},
{
  pertanyaan: " Ibu Ani punya 4 anak. Tiga di antaranya adalah Nana, Nini, dan Nene. Siapa nama anak keempat?",
  pilihan: ["Nono", "Nunu", "Ani", "Nana"],
  jawaban: "Ani"
}
];

let waktu = 20;
let timerInterval;
let indeksSoal = 0;
let skor = 0;

// Fungsi shuffle array (Fisher-Yates)
function acakArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Acak soal pas awal
acakArray(soalIQ);

function tampilkanSoal() {
  const soal = soalIQ[indeksSoal];
  const nomor = indeksSoal + 1;
  
  document.getElementById("soal").textContent = `${nomor}. ${soal.pertanyaan}`;

  const pilihanContainer = document.getElementById("pilihan");
  pilihanContainer.innerHTML = "";

  soal.pilihan.forEach(pilihan => {
    const btn = document.createElement("button");
    btn.textContent = pilihan;
    btn.onclick = () => {
      clearInterval(timerInterval); // stop timer kalau udah jawab
      cekJawaban(pilihan);
    };
    pilihanContainer.appendChild(btn);
  });
  
  
  
  function updateProgressBar() {
  const progress = ((indeksSoal) / soalIQ.length) * 100;
  
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

 updateProgressBar(); // ← tambahin ini
  mulaiTimer(); // ⬅️ di akhir
}

function mulaiTimer() {
  clearInterval(timerInterval);

  const timerElem = document.getElementById("timer");
  const timerBar = document.getElementById("timer-bar");

  waktu = 20;
  timerElem.textContent = `Waktu: ${waktu} detik`;
  timerElem.classList.remove("timer-warn");
  timerBar.style.width = "100%";
  timerBar.style.background = "linear-gradient(to right, #00ff88, #00ccff)";

  timerInterval = setInterval(() => {
    waktu--;
    timerElem.textContent = `Waktu: ${waktu} detik`;

    // Update progress bar width
    const persentase = (waktu / 20) * 100;
    timerBar.style.width = `${persentase}%`;

    // Ganti warna kalau ≤ 5 detik
    if (waktu <= 5) {
      timerElem.classList.add("timer-warn");
      timerBar.style.background = "red";
    }

    if (waktu <= 0) {
      clearInterval(timerInterval);
      alert("Waktu habis! Ulangi dari awal");
      location.reload();
    }
  }, 1000);
}

function cekJawaban(pilihanUser) {
  const jawabanBenar = soalIQ[indeksSoal].jawaban;
  const jawabBenar = pilihanUser === jawabanBenar;
  
  if (jawabBenar) {
    skor++;
  }
  
    // 🔥 Tambahin ini:
  updateStatistik(jawabBenar, waktu); // waktu = sisa waktu saat jawab
  
  indeksSoal++;
  if (indeksSoal < soalIQ.length) {
    tampilkanSoal();
  } else {
    tampilkanHasil();
  }
}

function tampilkanHasil() {
  const persen = Math.round((skor / soalIQ.length) * 100);
  const nama = prompt("Masukkan Nama Kamu:") || "Anonim";
  
  document.getElementById("navbar").style.display = "flex"; // atau "block", tergantung style kamu

  // Simpan ke localStorage
  simpanLeaderboard(nama, persen);
  localStorage.setItem("namaUser", nama);
localStorage.setItem("waktuSelesai", new Date().toLocaleString());

localStorage.setItem("certNama", nama);
localStorage.setItem("certTanggal", new Date().toLocaleDateString("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric"
}));
  
  const statistikHTML = tampilkanStatistik();
  
  const leaderboardHTML = tampilkanLeaderboard(); // karena lokal, ini sinkron biasa

  document.getElementById("quiz-container").innerHTML = `
  <div class="hasil">
    <h3>Skor Kamu: ${persen}</h3>
    <p>${persen <= 40 ? "Perlu latihan lagi 😅" : persen <= 80 ? "Mantap, kamu cukup cerdas! 💡" : "Wihh Jenius! 🤯"}</p>
    <hr>
    <p id="waktu-jam"></p>
    <h4>Hai, ${nama}!</h4>
    ${statistikHTML}
    <h3>🏆 Leaderboard</h3>
    ${leaderboardHTML}
    
    <div style="margin-top: 20px;">
      <a href="quiz.html"><button>Coba Lagi</button></a>
      <a href="sertifikat.html"><button id="btn-sertifikat" style="margin-left:10px;">🎓 Cetak Sertifikat</button></a>
    </div>
    
    <p id="copyright">© 2025 TesIQ by Bro. All rights reserved.</p>
  </div>
  `;
  updateWaktu();
}

function simpanLeaderboard(nama, skorPersen) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ nama, skor: skorPersen });
  leaderboard.sort((a, b) => b.skor - a.skor);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));
}

function tampilkanLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  let html = "<ol>";
  leaderboard.forEach(item => {
    html += `<li>${item.nama} - ${item.skor}%</li>`;
  });
  html += "</ol>";

  html += `
    <button onclick="adminResetLeaderboard()" style="margin-top:10px; background:red; color:white;">
      🔒 Reset Leaderboard (Admin)
    </button>
  `;
  return html;
}

// Penting: Panggil soal pertama saat halaman dimuat
tampilkanSoal();
