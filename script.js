const menuButton = document.querySelector('.menu-toggle'); const nav = document.querySelector('.navlinks'); if (menuButton && nav) { menuButton.addEventListener('click', () => { const opened = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(opened)); menuButton.textContent = opened ? '×' : '☰' }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '☰' })) }
document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active')); btn.classList.add('active'); const filter = btn.dataset.filter; document.querySelectorAll('[data-category]').forEach(card => { card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter) }) }));
const year = document.querySelector('[data-year]'); if (year) year.textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form'); if (form) { form.addEventListener('submit', e => { e.preventDefault(); const data = new FormData(form); const name = data.get('name') || ''; const email = data.get('email') || ''; const service = data.get('service') || 'General enquiry'; const message = data.get('message') || ''; const subject = encodeURIComponent('Website enquiry — ' + service); const body = encodeURIComponent('Name: ' + name + '\\nEmail: ' + email + '\\nService: ' + service + '\\n\\nProject details:\\n' + message); const status = document.querySelector('#form-status'); if (status) { status.textContent = 'Opening your email app with your message. If it does not open, email zzzzjuttzone@gmail.com directly.'; status.classList.add('show') } window.location.href = 'mailto:zzzzjuttzone@gmail.com?subject=' + subject + '&body=' + body }) }


// Simple one-time transition when navigating to another internal page.
// No animation on page load, so it does not repeat on arrival.
(function () {
   const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   const overlay = document.createElement('div');
   overlay.id = 'page-transition';
   overlay.setAttribute('aria-hidden', 'true');
   document.body.appendChild(overlay);

   let navigating = false;
   document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 ||
         event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
         link.target === '_blank' || link.hasAttribute('download') || reduceMotion) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
         href.startsWith('tel:') || href.startsWith('javascript:')) return;
      let destination;
      try { destination = new URL(href, window.location.href) } catch { return }
      if (destination.origin !== window.location.origin ||
         !/\.html?$/i.test(destination.pathname) ||
         (destination.pathname === window.location.pathname &&
            destination.search === window.location.search) || navigating) return;

      event.preventDefault();
      navigating = true;
      overlay.style.visibility = 'visible';
      overlay.classList.add('is-leaving');
      window.setTimeout(function () { window.location.href = destination.href }, 260);
   });
})();


document.getElementById('contact-form').addEventListener('submit', function (event) {
   event.preventDefault(); // Page refresh hone se rokay ga

   // Button ka text change kar sakte hain loading dikhane ke liye (Optional)
   const submitBtn = this.querySelector('button[type="submit"]');
   const originalText = submitBtn.innerText;
   submitBtn.innerText = "Sending...";
   submitBtn.disabled = true;

   // EmailJS se email bhejna (Apni Service ID aur Template ID yahan dalein)
   emailjs.sendForm('service_qxkkiic', 'template_5y3m78p', this)
      .then(() => {
         document.getElementById('form-status').innerText = "Message sent successfully!";
         document.getElementById('form-status').style.color = "green";
         this.reset(); // Form clear kar dega
         submitBtn.innerText = originalText;
         submitBtn.disabled = false;
      }, (error) => {
         document.getElementById('form-status').innerText = "Failed to send message. Please try again.";
         document.getElementById('form-status').style.color = "red";
         console.log('FAILED...', error);
         submitBtn.innerText = originalText;
         submitBtn.disabled = false;
      });
});
