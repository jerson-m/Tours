// TOAST
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toastIcon');
const toastTitle = document.getElementById('toastTitle');
const toastMsg = document.getElementById('toastMsg');
const toastClose = document.getElementById('toastClose');
let toastTimer;

function showToast(type, title, msg) {
  toast.className = 'toast toast-' + type + ' show';
  toastIcon.textContent = type === 'success' ? '✅' : '❌';
  toastTitle.textContent = title;
  toastMsg.textContent = msg;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => hideToast(), 6000);
}

function hideToast() {
  toast.classList.remove('show');
}

toastClose.addEventListener('click', hideToast);

// FORMULARIO
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const countryCodeSelect = document.getElementById('countryCode');
const phoneInput = document.getElementById('phoneNumber');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const fullPhone = countryCodeSelect.value + ' ' + phoneInput.value.trim();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

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
      showToast(
        'success',
        '¡Solicitud enviada!',
        'Gracias por confiar en Bogotá Viva. Te contactamos pronto por WhatsApp o correo.'
      );
    } else {
      showToast(
        'error',
        'Algo salió mal',
        'Por favor intenta de nuevo o escríbenos por WhatsApp.'
      );
    }
  } catch (err) {
    showToast(
      'error',
      'Error de conexión',
      'Revisa tu internet e intenta de nuevo.'
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar solicitud →';
  }
});


//ANIMACION
// FADE IN UP al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// CONTADOR ANIMADO
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = el.dataset.prefix +
      Math.floor(current).toLocaleString('es-CO') +
      el.dataset.suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target); // solo corre una vez
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-n[data-target]').forEach(el => {
  counterObserver.observe(el);
});
