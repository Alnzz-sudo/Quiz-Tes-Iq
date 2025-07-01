function adminResetLeaderboard() {
  const username = prompt("Masukkan username admin:");
  const password = prompt("Masukkan password admin:");

  // Ubah ini sesuai keinginan lo
  const adminUsername = "admin";
  const adminPassword = "aldy120808";

  if (username === adminUsername && password === adminPassword) {
    const konfirmasi = confirm("Yakin ingin menghapus semua data leaderboard?");
    if (konfirmasi) {
      localStorage.removeItem("leaderboard");
      alert("Leaderboard berhasil di-reset!");
      location.reload(); // refresh halaman
    }
  } else {
    alert("Akses ditolak! Username atau password salah.");
  }
}
