// Animasi saat scroll
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Biar cuma sekali
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => {
    item.classList.add("fade-init");
    observer.observe(item);
  });
});

// Hover effect nama
const nama = document.querySelector("h1");
if (nama) {
  nama.addEventListener("mouseover", () => {
    nama.style.color = "#ff00aa";
  });
  nama.addEventListener("mouseout", () => {
    nama.style.color = "#00ffe5";
  });
}

// Typing effect (opsional)
const roleElem = document.querySelector("h2");
if (roleElem) {
  const text = roleElem.textContent;
  roleElem.textContent = "";
  let i = 0;
  const ketik = () => {
    if (i < text.length) {
      roleElem.textContent += text.charAt(i);
      i++;
      setTimeout(ketik, 60);
    }
  };
  ketik();
}