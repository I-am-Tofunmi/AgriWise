document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.width = "100%";
        navLinks.style.order = "3";
        navLinks.style.backgroundColor = "var(--bg-color)";
        navLinks.style.padding = "1rem 0";
        navLinks.style.borderBottom = "1px solid var(--border-color)";
      }
    });

    // Reset styles on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = "";
        navLinks.style.flexDirection = "";
        navLinks.style.width = "";
        navLinks.style.order = "";
        navLinks.style.backgroundColor = "";
        navLinks.style.padding = "";
        navLinks.style.borderBottom = "";
      }
    });

    // Close mobile menu when a link is clicked
    const navItems = navLinks.querySelectorAll("a");
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 768 && navLinks.style.display === "flex") {
          navLinks.style.display = "none";
        }
      });
    });
  }
});
