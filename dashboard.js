document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Simple mobile menu toggle
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

  // Fetch dashboard data
  function fetchDashboardData() {
    // 1. Fetch Market Data
    fetch("https://agriwise-backend.onrender.com/market")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length >= 2) {
          const card1 = document.getElementById("market-card-maize");
          if (card1) {
            card1.querySelector("h3").textContent = data[0].crop.charAt(0).toUpperCase() + data[0].crop.slice(1) + " Price Prediction";
            card1.querySelector("p").innerHTML = `Current: <strong>$${data[0].price}/${data[0].unit}</strong> in ${data[0].region}`;
          }
          const card2 = document.getElementById("market-card-soybean");
          if (card2) {
            card2.querySelector("h3").textContent = data[1].crop.charAt(0).toUpperCase() + data[1].crop.slice(1) + " Price Prediction";
            card2.querySelector("p").innerHTML = `Current: <strong>$${data[1].price}/${data[1].unit}</strong> in ${data[1].region}`;
          }
        }
      })
      .catch((err) => console.error("Market fetch error:", err));

    // 2. Fetch Weather Data (Using Lagos as default)
    fetch("https://agriwise-backend.onrender.com/weather?city=Lagos")
      .then((res) => {
        if (!res.ok) throw new Error("Weather API error");
        return res.json();
      })
      .then((data) => {
        const todayCard = document.getElementById("weather-today-card");
        if (todayCard && data.main) {
          todayCard.querySelector("h3").textContent = "Today in " + data.name;
          const condition = data.weather[0].description;
          const capitalizedCondition = condition.charAt(0).toUpperCase() + condition.slice(1);
          todayCard.querySelector("p").textContent = `${capitalizedCondition}. Temp: ${data.main.temp}°C`;
          todayCard.querySelector(".chance-rain").textContent = `Humidity: ${data.main.humidity}%`;
        }
      })
      .catch((err) => console.error("Weather fetch error:", err));
  }

  fetchDashboardData();
});
