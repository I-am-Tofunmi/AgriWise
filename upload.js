document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.width = '100%';
        navLinks.style.order = '3';
        navLinks.style.backgroundColor = 'var(--bg-color)';
        navLinks.style.padding = '1rem 0';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.width = '';
        navLinks.style.order = '';
        navLinks.style.backgroundColor = '';
        navLinks.style.padding = '';
        navLinks.style.borderBottom = '';
      }
    });

    // Close mobile menu when a link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
          navLinks.style.display = 'none';
        }
      });
    });
  }

  // File Upload Logic
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const uploadText = document.querySelector('.upload-text');
  let selectedFile = null;

  if (dropZone && fileInput && analyzeBtn) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
      dropZone.classList.add('drag-active');
    }

    function unhighlight(e) {
      dropZone.classList.remove('drag-active');
    }

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
      let dt = e.dataTransfer;
      let files = dt.files;
      handleFiles(files);
    }

    // Handle file selection via click
    fileInput.addEventListener('change', function() {
      handleFiles(this.files);
    });

    function handleFiles(files) {
      if (files.length > 0) {
        const file = files[0];
        // Ensure it's an image
        if (file.type.startsWith('image/')) {
          selectedFile = file;
          uploadText.innerHTML = `<span class="click-text">Selected:</span> ${file.name}`;
          analyzeBtn.disabled = false;
        } else {
          selectedFile = null;
          uploadText.innerHTML = `<span style="color:red">Please select a valid image file.</span>`;
          analyzeBtn.disabled = true;
        }
      }
    }
    analyzeBtn.addEventListener('click', async () => {
      if (!selectedFile) return;

      const originalText = analyzeBtn.textContent;
      analyzeBtn.textContent = "Analyzing...";
      analyzeBtn.disabled = true;

      const formData = new FormData();
      formData.append("file", selectedFile);

      const userId = localStorage.getItem("user_id");
      const url = new URL("https://agriwise-backend-7tf7.onrender.com/predict");
      if (userId) {
        url.searchParams.append("user_id", userId);
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.predictions && data.predictions.length > 0) {
            const topPrediction = data.predictions[0];
            const topClass = topPrediction.class || topPrediction.label;
            const confidence = topPrediction.confidence || 0;
            
            // Validation: Must be a recognized crop label AND have a high enough confidence score
            if (topClass.includes("Not a Crop") || confidence < 0.05) {
              const uploadState = document.getElementById("uploadState");
              const uploadStatus = document.getElementById("uploadStatus");
              if(uploadState) uploadState.style.display = "block";
              if(uploadStatus) uploadStatus.style.display = "none";
              analyzeBtn.disabled = false;
              
              const warningHtml = `
                <div id="cropWarningOverlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(10px); z-index: 10000; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease-out;">
                  <div id="cropWarning" style="background: white; border-radius: 32px; padding: 40px; text-align: center; width: 90%; max-width: 450px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);">
                    <div style="background: #fee2e2; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                      <i class="fa-solid fa-camera-rotate" style="font-size: 2.5rem; color: #dc2626;"></i>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 800; color: #111827; margin-bottom: 12px; font-family: 'Outfit', sans-serif;">Image Not Recognized</h3>
                    <p style="color: #6b7280; font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; font-family: 'Inter', sans-serif;">
                      We couldn't identify a supported crop in this image. Please ensure you upload a clear, focused photo of a plant leaf.
                    </p>
                    <button onclick="document.getElementById('cropWarningOverlay').remove()" style="width: 100%; padding: 18px; background: #22c55e; color: white; border: none; border-radius: 16px; cursor: pointer; font-weight: 700; font-size: 1.1rem; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.4);" onmouseover="this.style.background='#16a34a'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#22c55e'; this.style.transform='translateY(0)'">
                      Try Again
                    </button>
                  </div>
                </div>
              `;
              document.body.insertAdjacentHTML("beforeend", warningHtml);
              return;
            }
  
            // Build thumbnail and redirect
            const fileReader = new FileReader();
            fileReader.onload = function(e) {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const maxW = 800;
                let w = img.width, h = img.height;
                if (w > maxW) { h = Math.round(h * (maxW / w)); w = maxW; }
                canvas.width = w; canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);
                const base64 = canvas.toDataURL("image/jpeg", 0.6);
                
                sessionStorage.setItem("agriwise_result", JSON.stringify(data.predictions));
                try { sessionStorage.setItem("agriwise_img", base64); } catch(ex) {}
                
                window.location.href = "results.html";
              };
              img.src = e.target.result;
            };
            fileReader.readAsDataURL(selectedFile);
          } else {
             alert("No predictions returned");
          }
        } else {
          const err = await response.json();
          alert(`Analysis failed: ${err.detail || 'Server error'}`);
        }
      } catch (err) {
        console.error("Prediction error:", err);
        alert("Could not connect to analysis server.");
      } finally {
        analyzeBtn.textContent = originalText;
        analyzeBtn.disabled = false;
      }
    });


  }

  // Logout pop-up confirmation
  const logoutTriggers = document.querySelectorAll('.logout-trigger');
  logoutTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to log out?')) {
        window.location.href = 'index.html';
      }
    });
  });
});
