// Data statistik sementara
let statistik = {
  totalSoal: 0,
  benar: 0,
  salah: 0,
  totalWaktu: 0
};

// Panggil ini saat user jawab soal
function updateStatistik(jawabBenar, waktuSisa) {
  statistik.totalSoal++;
  if (jawabBenar) {
    statistik.benar++;
  } else {
    statistik.salah++;
  }

  // Hitung waktu dipakai (dari 20 detik default)
  const waktuDipakai = 20 - waktuSisa;
  statistik.totalWaktu += waktuDipakai;

  // Simpan ke localStorage (opsional)
  localStorage.setItem("statistik", JSON.stringify(statistik));
}

// Tampilkan statistik di akhir
function tampilkanStatistik() {
  const akurasi = Math.round((statistik.benar / statistik.totalSoal) * 100);
  const waktuRataRata = statistik.totalSoal > 0 ? (statistik.totalWaktu / statistik.totalSoal).toFixed(1) : 0;

  return `
    <h4>📊 Statistik Kamu:</h4>
    <ul>
      <li>Total Soal: ${statistik.totalSoal}</li>
      <li>Benar: ${statistik.benar}</li>
      <li>Salah: ${statistik.salah}</li>
      <li>Akurasi: ${akurasi}%</li>
      <li>Waktu Rata-Rata: ${waktuRataRata} detik/soal</li>
    </ul>
  `;
}