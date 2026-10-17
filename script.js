
/* =========================
   MOBILE NAVIGATION
========================= */
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navlinks');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');

    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.textContent = opened ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    });
  });
}


/* =========================
   PORTFOLIO FILTERS
========================= */
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => {
      b.classList.remove('active');
    });

    btn.classList.add('active');

    const filter = btn.dataset.filter;

    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden =
        filter !== 'all' &&
        !card.dataset.category.split(' ').includes(filter);
    });
  });
});


/* =========================
   FOOTER YEAR
========================= */
const year = document.querySelector('[data-year]');

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================
   CONTACT FORM
   EmailJS + Email fallback
========================= */
const form = document.querySelector('#contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const status = document.querySelector('#form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Send with EmailJS when its library is available.
    if (typeof emailjs !== 'undefined') {
      const originalText = submitBtn
        ? submitBtn.innerText
        : '';

      if (submitBtn) {
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
      }

      emailjs.sendForm(
        'service_qxkkiic',
        'template_5y3m78p',
        form
      ).then(() => {
        if (status) {
          status.textContent = 'Message sent successfully!';
          status.style.color = 'green';
        }

        form.reset();
      }).catch(error => {
        console.error('EmailJS failed:', error);

        if (status) {
          status.textContent =
            'Failed to send message. Please try again.';
          status.style.color = 'red';
        }
      }).finally(() => {
        if (submitBtn) {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }
      });

      return;
    }

    // Fallback: open the visitor's email application.
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const service = data.get('service') || 'General enquiry';
    const message = data.get('message') || '';

    const subject = encodeURIComponent(
      'Website enquiry — ' + service
    );

    const body = encodeURIComponent(
      'Name: ' + name +
      '\nEmail: ' + email +
      '\nService: ' + service +
      '\n\nProject details:\n' + message
    );

    if (status) {
      status.textContent =
        'Opening your email app. If it does not open, email zzzzjuttzone@gmail.com directly.';
      status.classList.add('show');
    }

    window.location.href =
      'mailto:zzzzjuttzone@gmail.com?subject=' +
      subject + '&body=' + body;
  });
}


/* =========================
   SIGNATURE RED TRANSITION
   Zzzzjutt Zone
========================= */
(function () {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Create the overlay once per page.
  let overlay = document.getElementById('page-transition');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'page-transition';
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = `
      <div class="page-transition__content">
        <span class="page-transition__symbol">Z.</span>
        <span class="page-transition__name">ZZZJUTT ZONE</span>
        <span class="page-transition__tagline">
          DESIGN WITH PURPOSE
        </span>
        <span class="page-transition__line">
          <span></span>
        </span>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  let navigating = false;
  let transitionTimer = null;

  // Hide the overlay and cancel any pending navigation timer.
  function resetTransition() {
    navigating = false;

    if (transitionTimer !== null) {
      window.clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    overlay.classList.remove('is-leaving');
    overlay.style.visibility = 'hidden';
  }

  // Initial state and browser history restoration.
  resetTransition();

  window.addEventListener('pageshow', resetTransition);
  window.addEventListener('popstate', resetTransition);

  // Animate only normal internal HTML page links.
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');

    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      reduceMotion ||
      navigating
    ) {
      return;
    }

    const href = link.getAttribute('href');

    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) {
      return;
    }

    let destination;

    try {
      destination = new URL(href, window.location.href);
    } catch {
      return;
    }

    // Ignore external links and non-HTML destinations.
    if (
      destination.origin !== window.location.origin ||
      !/\.html?$/i.test(destination.pathname) ||
      (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      )
    ) {
      return;
    }

    navigating = true;
    event.preventDefault();

    overlay.style.visibility = 'visible';

    // Restart the animation for each navigation.
    overlay.classList.remove('is-leaving');
    void overlay.offsetWidth;
    overlay.classList.add('is-leaving');

    // Navigate after the transition completes.
    transitionTimer = window.setTimeout(() => {
      window.location.href = destination.href;
    }, 800);
  });
})();
