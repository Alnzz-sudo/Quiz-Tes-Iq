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
  },
  {
  pertanyaan: "6. Seorang ayah berumur 40 tahun, anaknya 10 tahun. Berapa tahun lagi umur ayah akan tiga kali lipat dari umur anak?",
  pilihan: ["10", "15", "5", "20"],
  jawaban: "5"
},
{
  pertanyaan: "7. Dalam satu kotak terdapat 5 bola merah, 3 bola biru, dan 2 bola kuning. Jika kamu mengambil 1 bola tanpa melihat, peluang paling besar kamu dapat warna apa?",
  pilihan: ["Merah", "Biru", "Kuning", "Semua sama"],
  jawaban: "Merah"
},
{
  pertanyaan: "8. Seseorang masuk ke rumah gelap, hanya ada satu korek dan di dalam ada lilin, lampu minyak, dan kompor. Apa yang harus dinyalakan terlebih dahulu?",
  pilihan: ["Lilin", "Lampu minyak", "Kompor", "Korek"],
  jawaban: "Korek"
},
{
  pertanyaan: "9. Jika semua burung bisa terbang, dan ayam adalah burung, tapi ayam tidak bisa terbang tinggi. Maka pernyataan yang benar adalah?",
  pilihan: [
    "Ayam bukan burung",
    "Semua burung bisa terbang tinggi",
    "Ayam bisa terbang sedikit tapi tetap burung",
    "Ayam sama sekali tidak bisa terbang"
  ],
  jawaban: "Ayam bisa terbang sedikit tapi tetap burung"
},
{
  pertanyaan: "10. Ibu Ani punya 4 anak. Tiga di antaranya adalah Nana, Nini, dan Nene. Siapa nama anak keempat?",
  pilihan: ["Nono", "Nunu", "Ani", "Nana"],
  jawaban: "Ani"
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

async function tampilkanHasil() {
  const persen = Math.round((skor / soalIQ.length) * 100);
  const nama = prompt("Masukkan Nama Kamu:") || "Anonim";

  try {
    const response = await fetch("simpan.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nama: nama, skor: persen })
    });

    const result = await response.text();
    console.log("Respon server:", result);

    const leaderboardHTML = await tampilkanLeaderboard();

    document.getElementById("quiz-container").innerHTML = `
      <div class="hasil">
        <h3>Skor Kamu: ${persen}</h3>
        <p>${persen <= 40 ? "Perlu latihan lagi 😅" : persen <= 80 ? "Mantap, kamu cukup cerdas! 💡" : "Wihh Jenius! 🤯"}</p>
        <p>Skor kamu telah disimpan ke leaderboard global!</p>
        <hr>
        <h3>🏆 Leaderboard</h3>
        ${leaderboardHTML}
        <a href="quiz.html"><button>Coba Lagi</button></a>
      </div>
    `;
  } catch (error) {
    console.error("Gagal kirim skor:", error);
    alert("Gagal menyimpan skor. Coba lagi nanti.");
  }
}

function tampilkanLeaderboard() {
  return fetch("leaderboard.json")
    .then(response => response.json())
    .then(data => {
      let html = "<ol>";
      data
        .sort((a, b) => b.skor - a.skor)
        .slice(0, 5)
        .forEach(item => {
          html += `<li>${item.nama} - ${item.skor}%</li>`;
        });
      html += "</ol>";

      // Tambahin tombol admin DI DALAM sini
      html += `
        <button onclick="adminResetLeaderboard()" style="margin-top:10px; background:red; color:white;">
          🔒 Refresh Leaderboard (Admin)
        </button>
      `;
      
      return html;
    })
    .catch(error => {
      console.error("Gagal ambil leaderboard:", error);
      return "<p>Leaderboard tidak dapat dimuat.</p>";
    });
}

// Penting: Panggil soal pertama saat halaman dimuat
tampilkanSoal();
