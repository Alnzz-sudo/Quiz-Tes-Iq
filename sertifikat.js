window.addEventListener("DOMContentLoaded", () => {
  const nama = localStorage.getItem("certNama") || "[Nama Pengguna]";
  const tanggal = localStorage.getItem("certTanggal") || "[Tanggal]";

  document.getElementById("nama-user").textContent = nama;
  document.getElementById("tanggal-sertifikat").textContent = tanggal;
});