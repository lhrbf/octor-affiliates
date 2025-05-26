// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon();
  updateThemeLogo();
  updateThemeIconFloating();
}

function updateThemeLogo() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  // Header logo
  const logoImg = document.querySelector('.header .logo img');
  if (logoImg) {
    logoImg.src = isDark
      ? 'assets/icons/LOGO-OCTOR-BRANCO.svg'
      : 'assets/icons/LOGO-OCTOR-ROXO.svg';
  }
  // Footer logo
  const footerLogoImg = document.querySelector('.footer .logo img');
  if (footerLogoImg) {
    footerLogoImg.src = isDark
      ? 'assets/icons/LOGO-OCTOR-BRANCO.svg'
      : 'assets/icons/LOGO-OCTOR-ROXO.svg';
  }
}

function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (themeToggle) {
    themeToggle.innerHTML = isDark
      ? // Lua (dark)
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path></svg>'
      : // Sol (light)
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>';
  }
}

function updateThemeIconFloating() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeToggleFloating = document.getElementById('themeToggleFloating');
  if (themeToggleFloating) {
    // Sempre atualiza o SVG, mesmo se estiver oculto
    themeToggleFloating.innerHTML = isDark
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>';
  }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleFloating = document.getElementById('themeToggleFloating');
  setTheme(
    localStorage.getItem('theme') ||
      (prefersDarkScheme.matches ? 'dark' : 'light')
  );

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }

  if (themeToggleFloating) {
    themeToggleFloating.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }

  window.addEventListener('resize', updateThemeIconFloating);

  // Benefits Section Animation
  const benefitItems = document.querySelectorAll('.benefit-item');

  function checkBenefits() {
    const triggerBottom = window.innerHeight * 0.8;

    benefitItems.forEach((benefit) => {
      const benefitTop = benefit.getBoundingClientRect().top;

      if (benefitTop < triggerBottom) {
        benefit.classList.add('active');
      } else {
        benefit.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', checkBenefits);
  window.addEventListener('resize', checkBenefits);
  checkBenefits();

  // Testimonials Slider
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const dotsContainer = document.querySelector('.testimonials-dots');
  let currentSlide = 0;
  let interval;

  // Create dots
  testimonialItems.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
    resetInterval();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    goToSlide(currentSlide);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  updateDots();
  resetInterval();

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq-answer').style.height = '0';
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('active');
        answer.style.height = answer.scrollHeight + 'px';
      }
    });
  });

  // Update copyright year
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Hamburger menu logic (mover para cá, não precisa de outro DOMContentLoaded)
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav when clicking outside (mobile only)
    document.addEventListener('click', (e) => {
      if (
        window.innerWidth <= 900 &&
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close nav on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header background on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    // Só aplica o efeito se não for mobile (largura maior que 900px)
    if (window.innerWidth > 900) {
      if (window.scrollY > 25) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    } else {
      // Garante que no mobile nunca fica com cor
      header.classList.remove('header-scrolled');
    }
  });

  // Também remove a cor se redimensionar para mobile estando rolado
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 900) {
      header.classList.remove('header-scrolled');
    }
  });
});
