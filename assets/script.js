const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const scrollTopButton = document.querySelector('.scroll-top');
const revealItems = document.querySelectorAll('[data-reveal]');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = document.querySelectorAll('section[id]');
const quoteForm = document.getElementById('quote-form');
const formStatus = document.getElementById('form-status');

const setHeaderState = () => {
  const scrolled = window.scrollY > 12;
  header?.classList.toggle('is-scrolled', scrolled);
  scrollTopButton?.classList.toggle('is-visible', window.scrollY > 420);
};

const closeNav = () => {
  if (!nav || !menuToggle) return;
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeNav));
window.addEventListener('resize', () => { if (window.innerWidth > 980) closeNav(); });
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

if (revealItems.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
    });
  }, { threshold: 0.55, rootMargin: '-10% 0px -35% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

scrollTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const requiredFields = quoteForm ? Array.from(quoteForm.querySelectorAll('input[required], textarea[required], select[required]')) : [];
const validateField = (field) => {
  const value = field.value.trim();
  const isValid = field.type === 'email' ? field.validity.valid && value.length > 0 : value.length > 0;
  field.classList.toggle('invalid', !isValid);
  return isValid;
};
requiredFields.forEach((field) => {
  field.addEventListener('input', () => validateField(field));
  field.addEventListener('blur', () => validateField(field));
});

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const isFormValid = requiredFields.every((field) => validateField(field));
  if (!isFormValid) {
    formStatus.textContent = 'Please complete the required fields so the quote request can be prepared.';
    return;
  }

  const formData = new FormData(quoteForm);
  const name = String(formData.get('name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const service = String(formData.get('service') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const details = String(formData.get('details') || '').trim();

  const subject = `Quote Request - ${service || 'Handyman Service'}`;
  const body = [
    'Hello Reiss Home Services,',
    '',
    'I would like to request a quote.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Service Needed: ${service || 'Not specified'}`,
    `Neighborhood / ZIP: ${location || 'Not provided'}`,
    '',
    'Project Details:',
    details || 'No additional details provided.',
    '',
    'Thank you.'
  ].join('\n');

  const mailtoUrl = `mailto:matt@reisshomeservices.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'Opening your email app with a pre-filled quote request…';
  window.location.href = mailtoUrl;
});

document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-item').forEach((other) => { if (other !== item) other.open = false; });
  });
});
