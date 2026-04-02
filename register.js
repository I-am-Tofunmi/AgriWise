// register.js

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const submitBtn = registerForm.querySelector('button[type="submit"]');

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const pwd = document.getElementById("password").value;
      const confirmPwd = document.getElementById("confirmPassword").value;

      if (pwd !== confirmPwd) {
        alert("Passwords do not match!");
        return;
      }

      // Simulate registration process
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Registering...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      setTimeout(() => {
        // Redirect to dashboard after simulated registration
        window.location.href = "upload.html";
      }, 800);
    });
  }
});
