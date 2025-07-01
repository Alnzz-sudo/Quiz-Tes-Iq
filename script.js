const soalIQ = [
  {
    pertanyaan: "1. Jika 2 + 3 = 13, 3 + 4 = 25, 4 + 5 = 41, maka 5 + 6 = ?",
    pilihan: ["61", "51", "49", "55"],
    jawaban: "61"
  },
  {
    pertanyaan: "2. Temukan angka berikutnya: 1, 4, 9, 16, 25, ?",
    pilihan: ["36", "30", "32", "35"],
    jawaban: "36"
  },
  {
    pertanyaan: "3. Mana yang berbeda dari yang lain?",
    pilihan: ["Segitiga", "Persegi", "Lingkaran", "Kubus"],
    jawaban: "Kubus"
  },
  {
    pertanyaan: "4. Jika TOMORROW dikodekan menjadi RQKNMPPU, maka TODAY menjadi?",
    pilihan: ["RQBYWU", "RQAZXT", "RQBXWT", "RQAXWT"],
    jawaban: "RQBXWT"
  },
  {
    pertanyaan: "5. Jika semua Burung bisa terbang, dan Elang adalah Burung, maka...",
    pilihan: [
      "Elang tidak bisa terbang",
      "Elang bisa terbang",
      "Burung tidak bisa terbang",
      "Elang adalah Mamalia"
    ],
    jawaban: "Elang bisa terbang"
  }
];

let indeksSoal = 0;
let skor = 0;

function tampilkanSoal() {
  const soal = soalIQ[indeksSoal];
  document.getElementById("soal").textContent = soal.pertanyaan;

  const pilihanContainer = document.getElementById("pilihan");
  pilihanContainer.innerHTML = "";

  soal.pilihan.forEach(pilihan => {
    const btn = document.createElement("button");
    btn.textContent = pilihan;
    btn.onclick = () => cekJawaban(pilihan);
    pilihanContainer.appendChild(btn);
  });
}

function cekJawaban(pilihanUser) {
  const jawabanBenar = soalIQ[indeksSoal].jawaban;
  if (pilihanUser === jawabanBenar) {
    skor++;
  }
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
  simpanLeaderboard(nama, persen);

  const leaderboardHTML = tampilkanLeaderboard();

  document.getElementById("quiz-container").innerHTML = `
    <div class="hasil">
      <h3>Skor Kamu: ${persen}</h3>
      <p>${persen <= 40 ? "Perlu latihan lagi 😅" : persen <= 80 ? "Mantap, kamu cukup cerdas! 💡" : "Wihh Jenius! 🤯"}</p>
      <hr>
      <h3>🏆 Leaderboard</h3>
      ${leaderboardHTML}
      <a href="quiz.html"><button>Coba Lagi</button></a>
    </div>
  `;
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
  return html;
}

// Penting: Panggil soal pertama saat halaman dimuat
tampilkanSoal();
