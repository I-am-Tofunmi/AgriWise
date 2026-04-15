document.addEventListener("DOMContentLoaded", () => {
  const resultsArea = document.getElementById("resultsArea");
  
  // Scrape data from memory
  const rawData = sessionStorage.getItem("agriwise_result");
  const imgData = sessionStorage.getItem("agriwise_img");

  if (!rawData || !resultsArea) {
    if (resultsArea) {
      resultsArea.innerHTML = `
        <div style="text-align:center; padding: 4rem 2rem;">
          <h2>No Data Found</h2>
          <p>Please upload an image first.</p>
          <a href="upload.html" class="btn btn-primary" style="margin-top: 2rem;">Go to Analysis</a>
        </div>
      `;
    }
    return;
  }

  const predictions = JSON.parse(rawData);
  const topPrediction = predictions[0];
  const rawClass = topPrediction.class || "Unknown";
  const diseaseName = rawClass.replace(" (Mocked)", "");
  const confidence = (topPrediction.confidence * 100).toFixed(0);
  
  const imgUrl = imgData || "placeholder.jpg"; // fallback

  const html = `
    <div class="result-header">
      <div class="breadcrumb"><a href="dashboard.html">Dashboard</a> / <a href="upload.html">Crops</a> / <span>Disease Detection</span></div>
      <h2>Disease Detection Results</h2>
      <p>Analysis results for your crop, identifying potential diseases.</p>
    </div>
    
    <div class="result-grid">
      <div class="result-image-wrapper">
        <img src="${imgUrl}" alt="Crop Analysis" class="result-image" />
      </div>
      
      <div class="result-card">
        <h3>${diseaseName}</h3>
        <div class="severity">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none"><path stroke-width="2" d="M12 2L2 22h20L12 2z"/><line x1="12" y1="16" x2="12" y2="16"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
          Severity: <strong>Moderate</strong>
        </div>
        <div class="detected-area">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="transparent"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M8 12l3 3 5-8" stroke-width="2"/></svg>
          Detected on <strong>${confidence}% of the crop</strong>
        </div>
      </div>
    </div>

    <div class="treatments-section">
      <h3>Recommended Treatments</h3>
      
      <div class="treatment-item">
        <div class="treatment-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary-color)" fill="none" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="treatment-text">
          <h4>Fungicide Application</h4>
          <p>Apply a fungicide containing chlorothalonil or mancozeb every 7-10 days to control the spread.</p>
        </div>
      </div>
      
      <div class="treatment-item">
        <div class="treatment-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary-color)" fill="none" stroke-width="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
        </div>
        <div class="treatment-text">
          <h4>Improve Ventilation</h4>
          <p>Ensure proper spacing between plants to improve air circulation and reduce humidity levels.</p>
        </div>
      </div>

      <div class="treatment-item">
        <div class="treatment-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary-color)" fill="none" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
        </div>
        <div class="treatment-text">
          <h4>Pruning and Removal</h4>
          <p>Remove and destroy infected plant parts immediately to prevent the disease from spreading.</p>
        </div>
      </div>
      
      <div class="result-actions">
        <button class="btn btn-primary treated-btn" onclick="window.location.href='dashboard.html'">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2" style="margin-right: 8px; vertical-align: middle;"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-8"/></svg>
          Mark as Treated
        </button>
      </div>
    </div>
  `;
  
  resultsArea.innerHTML = html;
});
