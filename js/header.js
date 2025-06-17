document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  
  let lastScrollY = window.scrollY;
  let scrollTimeout = null;
  let isScrollingUp = false;

  function handleHeaderVisibility() {
    const heroSection = document.querySelector('.hero');
    const currentScrollY = window.scrollY;
    
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      
      // Se o menu mobile estiver aberto, sempre mostra o header
      if (navLinks && navLinks.classList.contains('open')) {
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
        return;
      }
      
      // Se estamos na hero section, sempre mostra o header
      if (currentScrollY <= heroBottom - 100) {
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
        lastScrollY = currentScrollY;
        return;
      }
      
      // Detecta direção do scroll
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Clear timeout anterior
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      if (scrollDirection === 'up' && !isScrollingUp) {
        // Scroll para cima - mostrar com delay
        isScrollingUp = true;
        scrollTimeout = setTimeout(() => {
          if (isScrollingUp) { // Só mostra se o último movimento foi para cima
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
          }
        }, 800); // Delay de ~1 segundo
        
      } else if (scrollDirection === 'down' && isScrollingUp) {
        // Scroll para baixo - esconder imediatamente e cancelar timeout
        isScrollingUp = false;
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
          scrollTimeout = null;
        }
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
      }
    }
    
    lastScrollY = currentScrollY;
  }

  function handleHeaderBg() {
    if (window.scrollY > 120 || (navLinks && navLinks.classList.contains('open'))) {
      header.style.background = 'rgba(24, 47, 152, 0.4)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.webkitBackdropFilter = 'blur(10px)';
      header.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.07)';
      if (navLinks && navLinks.classList.contains('open')) {
        // Aplica background sólido apenas no mobile/tablet
        if (window.innerWidth <= 919) {
          navLinks.style.background = '#11164d';
        } else {
          navLinks.style.background = 'transparent';
        }
      } else {
        if (navLinks) navLinks.style.background = 'transparent';
      }
    } else {
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.webkitBackdropFilter = 'none';
      header.style.boxShadow = 'none';
      if (navLinks) navLinks.style.background = 'transparent';
    }
  }

  // Função para scroll suave para seções
  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId) || document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Aplica o scroll suave para todos os links do menu (desktop e mobile)
  function setupMenuLinks() {
    const allMenuLinks = document.querySelectorAll('.nav-links a');
    allMenuLinks.forEach(link => {
      link.onclick = (e) => {
        // Se for um link externo (tem target="_blank"), não previne o comportamento padrão
        if (link.hasAttribute('target') && link.getAttribute('target') === '_blank') {
          // Close mobile menu after clicking external link
          if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            if (hamburger) {
              hamburger.classList.remove('active');
              hamburger.setAttribute('aria-expanded', 'false');
            }
            handleHeaderBg();
            handleHeaderVisibility();
          }
          return; // Permite navegação normal para links externos
        }
        
        // Para links internos, verifica se é um link para âncora
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          scrollToSection(href);
        } else if (href && !href.startsWith('http')) {
          // Para seções como "benefits", trata como ID
          e.preventDefault();
          scrollToSection(`#${href}`);
        }
        
        // Close mobile menu after clicking a link
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
          }
          handleHeaderBg();
          handleHeaderVisibility();
        }
      };
    });
  }

  if (hamburger && navLinks) {
    hamburger.onclick = () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      
      // Aplica imediatamente o background correto ao header/nav
      if (navLinks.classList.contains('open')) {
        header.style.background = 'rgba(24, 47, 152, 0.65)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.webkitBackdropFilter = 'blur(10px)';
        // Aplica background sólido apenas no mobile/tablet
        if (window.innerWidth <= 919) {
          navLinks.style.background = '#11164d';
        } else {
          navLinks.style.background = 'transparent';
        }
      } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.webkitBackdropFilter = 'none';
        header.style.boxShadow = 'none';
        navLinks.style.background = 'transparent';
      }
      
      // Atualiza a visibilidade do header quando o menu é aberto/fechado
      handleHeaderVisibility();
    };

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        handleHeaderBg();
        handleHeaderVisibility();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        handleHeaderBg();
        handleHeaderVisibility();
      }
    });
  }

  const btnContact = document.querySelector('.btn-primary');
  if (btnContact) {
    btnContact.onclick = () => {
      window.open('https://wa.me/559885582845', '_blank');
    };
  }

  window.addEventListener('scroll', () => {
    handleHeaderBg();
    handleHeaderVisibility();
  });
  
  handleHeaderBg();
  handleHeaderVisibility();
  setupMenuLinks();
});
