// login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const submitBtn = loginForm.querySelector('button[type="submit"]');

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simulate login process
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Signing In...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      setTimeout(() => {
        // Redirect to dashboard after simulated login
        window.location.href = "upload.html";
      }, 800);
    });
  }
});
