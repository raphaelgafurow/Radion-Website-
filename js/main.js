// Mobile nav toggle
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    burger.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Scroll-activated header shadow
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });
}

// Contact form – basic UX (no backend)
const form = document.querySelector('.kontakt__form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Nachricht gesendet ✓';
    btn.disabled = true;
    btn.style.background = '#2a7a4b';
    btn.style.borderColor = '#2a7a4b';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Nachricht senden';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 4000);
  });
}
