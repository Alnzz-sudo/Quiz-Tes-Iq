document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const loadingScreen = document.getElementById("loading-screen");

  if (startBtn && loadingScreen) {
    startBtn.addEventListener("click", () => {
      loadingScreen.classList.remove("hidden");
      setTimeout(() => {
        window.location.href = "quiz.html";
      }, 1600);
    });
  }
});
