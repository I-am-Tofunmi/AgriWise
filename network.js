document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const searchInput = document.querySelector(".search-input");

  // Simplify search placeholder on small screens
  const updateSearchPlaceholder = () => {
    if (searchInput) {
      if (window.innerWidth <= 350) {
        searchInput.placeholder = "Search network...";
      } else {
        searchInput.placeholder = "Search by name, specialty, or location...";
      }
    }
  };

  updateSearchPlaceholder();

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.width = "100%";
        navLinks.style.order = "3";
        navLinks.style.backgroundColor = "var(--surface-color)";
        navLinks.style.padding = "1rem 0";
        navLinks.style.borderBottom = "1px solid var(--border-color)";
      }
    });

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

  // Tabs interactions
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Logout pop-up confirmation
  const logoutTriggers = document.querySelectorAll(".logout-trigger");
  logoutTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to log out?")) {
        window.location.href = "index.html";
      }
    });
  });

  // Handle resize for search placeholder
  window.addEventListener("resize", () => {
    updateSearchPlaceholder();
  });
});
