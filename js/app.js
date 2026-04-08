  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const submitBtn = document.getElementById('submitBtn');
  const countryCodeSelect = document.getElementById('countryCode');
  const phoneInput = document.getElementById('phoneNumber');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const fullPhone = countryCodeSelect.value + " " + phoneInput.value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    errorMessage.style.display = 'none';

    const formData = new FormData(form);
    formData.set('Celular', fullPhone);

    try {
      const response = await fetch('https://formspree.io/f/xnjorlgz', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        successMessage.style.display = 'block';
        setTimeout(() => successMessage.style.display = 'none', 8000);
      } else {
        errorMessage.style.display = 'block';
      }
    } catch (err) {
      errorMessage.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitud →';
    }
  });