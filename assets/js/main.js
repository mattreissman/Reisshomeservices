document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuToggle && siteNav) {
    const closeMenu = () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      siteNav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const serviceSearch = document.querySelector('[data-service-search]');
  const serviceItems = [...document.querySelectorAll('[data-service-item]')];
  const resultsCounter = document.querySelector('[data-results-counter]');

  if (serviceSearch && serviceItems.length) {
    const updateResults = () => {
      const query = serviceSearch.value.trim().toLowerCase();
      let visibleCount = 0;

      serviceItems.forEach((item) => {
        const text = item.dataset.serviceItem.toLowerCase();
        const show = !query || text.includes(query);
        item.classList.toggle('hidden', !show);
        if (show) visibleCount += 1;
      });

      if (resultsCounter) {
        const noun = visibleCount === 1 ? 'match' : 'matches';
        resultsCounter.textContent = query ? `${visibleCount} ${noun}` : `${serviceItems.length} services listed`;
      }
    };

    updateResults();
    serviceSearch.addEventListener('input', updateResults);
  }

  const quoteForm = document.querySelector('[data-quote-form]');
  const formStatus = document.querySelector('[data-form-status]');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(quoteForm);
      const payload = {
        name: (formData.get('name') || '').toString().trim(),
        phone: (formData.get('phone') || '').toString().trim(),
        email: (formData.get('email') || '').toString().trim(),
        area: (formData.get('area') || '').toString().trim(),
        service: (formData.get('service') || '').toString().trim(),
        timeline: (formData.get('timeline') || '').toString().trim(),
        details: (formData.get('details') || '').toString().trim(),
      };

      const subjectParts = ['Quote request'];
      if (payload.area) subjectParts.push(`- ${payload.area}`);
      if (payload.service) subjectParts.push(`- ${payload.service}`);

      const body = [
        'Hello Reiss Home Services LLC,',
        '',
        'I would like to request a quote.',
        '',
        `Name: ${payload.name || '-'}`,
        `Phone: ${payload.phone || '-'}`,
        `Email: ${payload.email || '-'}`,
        `Service area: ${payload.area || '-'}`,
        `Project type: ${payload.service || '-'}`,
        `Preferred timeline: ${payload.timeline || '-'}`,
        '',
        'Project details:',
        payload.details || '-',
        '',
        'Thank you.',
      ].join('\n');

      const href = `mailto:matt@reisshomeservices.com?subject=${encodeURIComponent(subjectParts.join(' '))}&body=${encodeURIComponent(body)}`;
      window.location.href = href;

      if (formStatus) {
        formStatus.textContent = 'Your email app should open with a prefilled quote request. If it does not, call or email directly using the buttons on this page.';
      }
    });
  }
});
