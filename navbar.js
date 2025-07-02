document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("nav-menu");

  // Toggle saat klik hamburger
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // biar ga ikut kena event body
    menu.classList.toggle("menu-hidden");
    menu.classList.toggle("menu-visible");
  });

  // Cegah klik di dalam menu menutup menu
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Kalau klik di luar menu, sembunyikan
  document.addEventListener("click", () => {
    if (menu.classList.contains("menu-visible")) {
      menu.classList.remove("menu-visible");
      menu.classList.add("menu-hidden");
    }
  });
  function setupNavbar() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("nav-menu");

  if (!hamburger || !menu) return;

  // Cegah duplikat listener
  hamburger.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle("menu-hidden");
    menu.classList.toggle("menu-visible");
  };

  menu.onclick = (e) => e.stopPropagation();

  document.addEventListener("click", () => {
    if (menu.classList.contains("menu-visible")) {
      menu.classList.remove("menu-visible");
      menu.classList.add("menu-hidden");
    }
  });
}

// Jalanin saat awal
document.addEventListener("DOMContentLoaded", setupNavbar);
});
                            
