(function () {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  document.querySelectorAll('a[data-transition]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reduceMotion) return;
      event.preventDefault();
      document.body.classList.add('page-leaving');
      window.setTimeout(() => { window.location.href = href; }, 280);
    });
  });

  const dialog = document.querySelector('.lightbox');
  if (dialog) {
    const dialogImage = dialog.querySelector('img');
    const dialogCaption = dialog.querySelector('.lightbox__caption');
    const closeButton = dialog.querySelector('.lightbox__close');
    document.querySelectorAll('[data-lightbox]').forEach((button) => {
      button.addEventListener('click', () => {
        const img = button.querySelector('img');
        if (!img) return;
        dialogImage.src = img.currentSrc || img.src;
        dialogImage.alt = img.alt || '';
        dialogCaption.textContent = button.dataset.caption || img.alt || '';
        if (typeof dialog.showModal === 'function') dialog.showModal();
      });
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickedInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!clickedInside) dialog.close();
    });
  }
})();
