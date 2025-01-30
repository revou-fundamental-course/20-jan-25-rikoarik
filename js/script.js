
// Fungsi untuk mengontrol auto-hide navbar
function setAutoHide() {
  const navbar = document.getElementById("navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
          // Scroll ke bawah -> sembunyikan navbar
          navbar.classList.add("hidden");
      } else {
          // Scroll ke atas -> tampilkan navbar
          navbar.classList.remove("hidden");
      }

      lastScrollTop = st <= 0 ? 0 : st;
  });
}

// Panggil fungsi setelah halaman dimuat
document.addEventListener("DOMContentLoaded", setAutoHide);

// Function untuk mengaktifkan atau menonaktifkan dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Event listener untuk tombol dark mode
darkModeToggle.addEventListener('click', toggleDarkMode);

// Function untuk mereset form
function resetForm() {
  document.getElementById("age").value = "";
  document.querySelectorAll('input[name="gender"]').forEach(el => el.checked = false);
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("result").innerHTML = "Hasil BMI akan muncul di sini...";
  
  // Menghapus chart jika sudah ada
  if (window.bmiChart instanceof Chart) {
    window.bmiChart.destroy();
  }
  createOrUpdateChart(null);
  displayInformation(null);
}

// Event listener untuk tombol reset
document.getElementById("resetBtn").addEventListener("click", resetForm);


// Function untuk validasi input
function validateInputs() {
  const ageInput = document.getElementById("age");
  const genderInput = document.querySelector('input[name="gender"]:checked');
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");

  let isValid = true;

  // Validasi usia
  if (!ageInput.value || ageInput.value <= 0 || ageInput.value > 120) {
    isValid = false;
  }

  // Validasi jenis kelamin
  if (!genderInput) {
    isValid = false;
  }

  // Validasi berat badan
  if (!weightInput.value || weightInput.value <= 0) {
    isValid = false;
  }

  // Validasi tinggi badan
  if (!heightInput.value || heightInput.value <= 0) {
    isValid = false;
  }

  // Menonaktifkan atau mengaktifkan tombol berdasarkan hasil validasi
  document.getElementById("calculateBmiBtn").disabled = !isValid;
  document.getElementById("resetBtn").disabled = !isValid;

  return isValid;
}

// Fungsi untuk menambahkan semua event listeners
function addEventListeners() {
  // Event listener untuk input form, memeriksa validasi input setiap kali ada perubahan
  document.getElementById("age").addEventListener("input", validateInputs);
  document.getElementById("weight").addEventListener("input", validateInputs);
  document.getElementById("height").addEventListener("input", validateInputs);
  document.querySelectorAll('input[name="gender"]').forEach(el => el.addEventListener("change", validateInputs));

  // Event listener untuk tombol hitung BMI
  document.getElementById("calculateBmiBtn").addEventListener("click", function () {
    if (validateInputs()) {
      calculateBMI(
        document.getElementById("age").value,
        document.getElementById("weight").value,
        document.getElementById("height").value
      );
    }
  });
}

// Panggil fungsi addEventListeners setelah halaman dimuat
document.addEventListener("DOMContentLoaded", addEventListeners);


// Function untuk menghitung BMI
function calculateBMI(age, weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBMI = Math.round(bmi * 10) / 10;
  
  // Menentukan kategori BMI
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
  
  // Menampilkan hasil BMI
  document.getElementById("result").innerHTML = `
    <p>Hasil BMI kamu: ${roundedBMI}</p>
    <p>Kategori: ${category}</p>
  `;
  
  // Memperbarui chart
  createOrUpdateChart(roundedBMI);
  displayInformation(category);
}

// Function untuk membuat atau memperbarui chart BMI
function createOrUpdateChart(bmi) {
  const ctx = document.getElementById('bmiChart').getContext('2d');
  if (window.bmiChart instanceof Chart) {
    window.bmiChart.destroy();
  }
  window.bmiChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Your BMI', 'Underweight', 'Normal', 'Overweight', 'Obese'],
      datasets: [{
        label: 'BMI',
        data: [bmi, 18.5, 24.9, 29.9, 30],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: true, position: 'top' } }
    }
  });
}

// Function untuk menampilkan informasi berdasarkan kategori BMI
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
  infoElement.innerHTML = `<p>${info}</p>`;
}