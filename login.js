document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const submitBtn = loginForm.querySelector('button[type="submit"]');

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;

      // Simulate login process visually
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Signing In...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      try {
        const response = await fetch(`http://127.0.0.1:8000/users/${email}`);
        if (response.ok) {
          const userData = await response.json();
          // Assuming user exists, store details and redirect
          localStorage.setItem("user_id", userData.id);
          localStorage.setItem("user_name", userData.name);
          window.location.href = "upload.html";
        } else {
          // User not found or server error
          const errorData = await response.json();
          alert(`Login failed: ${errorData.detail || 'Invalid credentials'}`);
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Could not connect to the server.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }
    });
  }
});
