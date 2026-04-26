// ================= DEBUG =================
console.log("SCRIPT RUNNING");

document.addEventListener("DOMContentLoaded", () => {

  // ================= SMOOTH SCROLL =================
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ================= NAVBAR SCROLL =================
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // ================= MOBILE MENU =================
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  console.log("hamburger:", hamburger);
  console.log("menu:", mobileMenu);

  if (!hamburger || !mobileMenu) {
    console.error("Hamburger or menu not found");
    return;
  }

  // TOGGLE MENU
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();

    console.log("CLICKED");

    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // CLOSE WHEN CLICKING LINK
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // CLOSE WHEN CLICKING OUTSIDE
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

// ================= MENU TABS (FIXED - NO UI CHANGE) =================
const tabs = document.querySelectorAll(".tab");
const menuImage = document.getElementById("menuImage");

if (tabs.length > 0 && menuImage) {

  // PRELOAD IMAGES (fix lag)
  const images = ["menu1.jpg", "menu2.jpg", "menu3.jpg", "menu4.jpg"];

  images.forEach(src => {
    const img = new Image();
    img.src = `images/${src}`;
  });

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // KEEP YOUR STYLE — just smoother
      menuImage.style.opacity = 0;

      requestAnimationFrame(() => {
        setTimeout(() => {
          menuImage.src = `images/${tab.dataset.menu}.jpg`;
          menuImage.style.opacity = 1;
        }, 120);
      });

    });
  });
}
  // ================= SECTION FADE-IN =================
  const sections = document.querySelectorAll(".section");

  if (sections.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => {
      section.style.opacity = 0;
      section.style.transform = "translateY(30px)";
      section.style.transition = "all 0.8s ease";
      observer.observe(section);
    });
  }

});