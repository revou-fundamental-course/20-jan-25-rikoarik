//Toggle darkmode
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  darkModeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

document.getElementById("calculateBmiBtn").addEventListener("click", function () {
  // Ambil elemen input
  const ageInput = document.getElementById("age");
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");

  let isValid = true;

  // Validasi Usia
  if (!ageInput.value) {
      ageInput.setCustomValidity("Masukkan usia yang valid (1-120 tahun).");
      ageInput.reportValidity();
      isValid = false;
  } else {
      ageInput.setCustomValidity("");
  }

  // Validasi Jenis Kelamin
  const genderContainer = document.querySelector('.input-container:nth-child(2)');
  if (!genderInput) {
      genderContainer.querySelector('label').textContent = "Jenis Kelamin (Wajib Dipilih):";
      isValid = false;
  } else {
      genderContainer.querySelector('label').textContent = "Jenis Kelamin:";
  }

  // Validasi Berat Badan
  if (!weightInput.value || weightInput.value <= 0) {
      weightInput.setCustomValidity("Masukkan berat badan yang valid (lebih dari 0 kg).");
      weightInput.reportValidity();
      isValid = false;
  } else {
      weightInput.setCustomValidity("");
  }

  // Validasi Tinggi Badan
  if (!heightInput.value || heightInput.value <= 0) {
      heightInput.setCustomValidity("Masukkan tinggi badan yang valid (lebih dari 0 cm).");
      heightInput.reportValidity();
      isValid = false;
  } else {
      heightInput.setCustomValidity("");
  }

  // Jika semua validasi lolos
  if (isValid) {
      calculateBMI(ageInput.value, weightInput.value, heightInput.value);
  }
});


// ... existing code

function calculateBMI(age, weight, height) {
  // Convert height from cm to m
  const heightInMeters = height / 100;
  
  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // Round BMI to 1 decimal place
  const roundedBMI = Math.round(bmi * 10) / 10;
  
  // Determine BMI category
  let category;
  if (bmi < 18.5) {
      category = "Berat badan kurang"; 
  } else if (bmi < 25) {
      category = "Berat badan normal";
  } else if (bmi < 30) {
      category = "Kelebihan berat badan";
  } else {
      category = "Obesitas";
  }
  
  // Display result
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `
      <p>Hasil BMI kamu: ${roundedBMI}</p>
      <p>Kategori: ${category}</p>
  `;
  
  // Create or update chart
  createOrUpdateChart(roundedBMI);
  
  // Display information
  displayInformation(category);
}

function createOrUpdateChart(bmi) {
  const ctx = document.getElementById('bmiChart').getContext('2d');
  
  // Destroy existing chart if it exists
  if (window.bmiChart instanceof Chart) {
      window.bmiChart.destroy();
  }
  
  // Create new chart
  window.bmiChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Your BMI', 'Underweight', 'Normal', 'Overweight', 'Obese'],
          datasets: [{
              label: 'BMI',
              data: [bmi, 18.5, 24.9, 29.9, 30],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(153, 102, 255, 0.5)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
          }]
      },
  
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,

        
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
  });
}

function displayInformation(category) {
  const infoElement = document.getElementById("information");
  let info = "";
  
  switch(category) {
      case "Berat badan kurang":
        info = "Berat badan kurang dapat menjadi tanda kekurangan gizi atau masalah kesehatan lainnya. Pertimbangkan untuk berkonsultasi dengan tenaga medis untuk saran mengenai penambahan berat badan yang sehat.";
          break;
      case "Berat badan normal":
        info = "Selamat! Berat badan Anda ideal. Pertahankan gaya hidup Anda dengan pola makan seimbang dan olahraga teratur.";
          break;
      case "Kelebihan berat badan":
        info = "Kelebihan berat badan dapat meningkatkan risiko beberapa kondisi kesehatan. Pertimbangkan untuk membuat perubahan gaya hidup seperti memperbaiki pola makan dan meningkatkan aktivitas fisik.";
          break;
      case "Obesitas":
        info = "Obesitas berhubungan dengan peningkatan risiko masalah kesehatan. Disarankan untuk berkonsultasi dengan tenaga medis untuk mendapatkan saran personal mengenai manajemen berat badan.";
          break;
  }
  
  infoElement.innerHTML = `
      <p>${info}</p>
  `;
}


