function updateWaktu() {
  const elemenWaktu = document.getElementById("waktu-jam");
  const sekarang = new Date();

  const tanggal = sekarang.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const jam = sekarang.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  elemenWaktu.textContent = ` ${tanggal} ${jam}`;
}

setInterval(updateWaktu, 1000);
updateWaktu(); // Panggil langsung pas halaman dimuat