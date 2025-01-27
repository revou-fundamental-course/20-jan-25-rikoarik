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




