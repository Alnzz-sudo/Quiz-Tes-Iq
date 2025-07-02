document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const loadingScreen = document.getElementById("loading-screen");

  console.log("Script jalan...");

  if (startBtn && loadingScreen) {
    startBtn.addEventListener("click", () => {
      console.log("Tombol diklik");

      loadingScreen.classList.remove("hidden");

      setTimeout(() => {
        console.log("Redirect ke quiz.html...");
        window.location.href = "quiz.html";
      }, 1600); // 1.6 detik
    });
  } else {
    console.warn("Tombol atau loading screen gak ditemukan!");
  }
});