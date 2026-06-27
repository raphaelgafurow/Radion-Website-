// Progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
}, { passive: true });

// Header scroll state
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Reveal on scroll
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Animated counters
function counter(el, target, duration) {
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const cntObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      counter(e.target, parseInt(e.target.dataset.count, 10), 1200);
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  });
});

// Sticky CTA
const stickyCta = document.getElementById('stickyCta');
window.addEventListener('scroll', () => {
  stickyCta.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

// Contact form
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnIconArrow = document.getElementById('btnIconArrow');
const btnIconCheck = document.getElementById('btnIconCheck');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.querySelector('#f-name').value.trim();
  const email = form.querySelector('#f-email').value.trim();
  if (!name) { form.querySelector('#f-name').focus(); return; }
  if (!email) { form.querySelector('#f-email').focus(); return; }

  submitBtn.disabled = true;
  btnText.textContent = 'Wird gesendet…';
  btnIconArrow.classList.add('icon-hidden');

  setTimeout(() => {
    submitBtn.classList.add('btn--success');
    btnText.textContent = 'Nachricht gesendet ✓';
    btnIconCheck.classList.remove('icon-hidden');
    form.reset();
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn--success');
      btnText.textContent = 'Nachricht senden';
      btnIconArrow.classList.remove('icon-hidden');
      btnIconCheck.classList.add('icon-hidden');
    }, 4000);
  }, 900);
});
