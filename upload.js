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
          uploadText.innerHTML = `<span class="click-text">Selected:</span> ${file.name}`;
          analyzeBtn.disabled = false;
        } else {
          uploadText.innerHTML = `<span style="color:red">Please select a valid image file.</span>`;
          analyzeBtn.disabled = true;
        }
      }
    }
  }

  // Logout pop-up confirmation
  const logoutBtn = document.querySelector('a[aria-label="Logout"]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to log out?')) {
        window.location.href = 'index.html';
      }
    });
  }
});
