const API_URL = "https://agriwise-backend-7tf7.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const submitBtn = registerForm?.querySelector('button[type="submit"]');

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const pwd = document.getElementById("password").value;
      const confirmPwd = document.getElementById("confirmPassword").value;

      if (pwd !== confirmPwd) {
        alert("Passwords do not match!");
        return;
      }

      // Prepare UI for loading
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Registering...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      try {
        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: email, // Using email as ID for simplicity
            name: fullName,
            email: email
          }),
        });

        if (response.ok) {
          localStorage.setItem("user_id", email);
          localStorage.setItem("user_name", fullName);
          window.location.href = "upload.html";
        } else {
          const error = await response.json();
          alert(`Registration failed: ${error.detail || "Unknown error"}`);
        }
      } catch (err) {
        console.error("Error connecting to backend:", err);
        alert("Could not connect to the backend server. Make sure it's running.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }
    });
  }
});
