// Menu responsivo: alterna ícones e exibe/esconde menu mobile

document.addEventListener('DOMContentLoaded', function () {
  // Fix para Safari - força redesenho do header para garantir backdrop-filter correto
  const header = document.querySelector('header');
  
  if (header) {
    // Detecta Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isSafari) {
      // Força repaint mais robusto no Safari
      window.addEventListener('load', () => {
        setTimeout(() => {
          header.style.display = 'none';
          void header.offsetHeight; // força reflow
          header.style.display = '';
          // Garante que o header inicie sem classe header-bg-blur
          header.classList.remove('header-bg-blur');
        }, 50);
      });
    }
  }
  
  // --- Menu responsivo ---
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const barsIcon = menuToggle.querySelector('.fa-bars');
  const xmarkIcon = menuToggle.querySelector('.fa-xmark');

  function closeMenu() {
    menu.classList.remove('open');
    barsIcon.style.display = '';
    xmarkIcon.style.display = 'none';
  }

  function openMenu() {
    menu.classList.add('open');
    barsIcon.style.display = 'none';
    xmarkIcon.style.display = '';
  }

  // Inicialmente, mostra só o ícone de barras
  closeMenu();

  menuToggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha o menu ao clicar em um link (mobile)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeMenu();
      }
    });
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  // --- Scroll suave para seções sem alterar URL ---
  
  // Função para scroll suave sem alterar o hash na URL
  function scrollToSectionByText(text) {
    text = text.trim().toLowerCase();
    let targetSection = null;
    
    // Mapear texto dos links para seções correspondentes (usando IDs primeiro, depois classes)
    if (text.includes('benefícios') || text.includes('benefits')) {
      targetSection = document.querySelector('#benefits') || document.querySelector('.benefits-section');
    } else if (text.includes('seja afiliado') || text.includes('afiliado') || text.includes('affiliate')) {
      targetSection = document.querySelector('#affiliate') || document.querySelector('.how-it-works-section');
    }
    
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  // Função para scroll usando seletor de seção diretamente
  function scrollToSection(sectionSelector) {
    const targetSection = document.querySelector(sectionSelector);
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  // Aplica o scroll suave para todos os links do menu (desktop e mobile)
  function setupMenuLinks() {
    // Selecionar todos os links do menu, incluindo mobile e desktop
    const allMenuLinks = document.querySelectorAll('nav .menu ul li a, .menu ul li a');
    
    allMenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Se for um link externo (tem target="_blank") ou link para o grupo-octor
        if (link.hasAttribute('target') && link.getAttribute('target') === '_blank' || 
            href === 'https://octor.pro' || href === 'https://octor.pro/') {
          // Close mobile menu after clicking external link
          if (menu && menu.classList.contains('open')) {
            closeMenu();
          }
          return; // Permite navegação normal para links externos
        }
        
        // Para links internos, previne o comportamento padrão
        e.preventDefault();
        
        scrollToSectionByText(link.textContent);
        
        // Close mobile menu after clicking a link
        if (menu && menu.classList.contains('open')) {
          closeMenu();
        }
      });
    });

    // Footer links com data-scroll-to
    const footerScrollLinks = document.querySelectorAll('a[data-scroll-to]');
    footerScrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-scroll-to');
        
        // Mapear IDs para seletores de seção
        let sectionSelector = null;
        if (sectionId === 'about') {
          sectionSelector = '#hero'; // Scroll para o topo/hero
        } else if (sectionId === 'contact') {
          sectionSelector = '#contact'; // Scroll para footer/contato
        }
        
        if (sectionSelector) {
          scrollToSection(sectionSelector);
        }
      });
    });
  }

  // --- Header blur, opacity e esconder/mostrar ao scroll ---
  const firstSection = document.querySelector('main > section');
  let lastScroll = window.scrollY;
  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;
    
    // Blur e opacity
    if (scrollY > 50) {
      header.classList.add('header-bg-blur');
    } else {
      header.classList.remove('header-bg-blur');
    }

    // Proteção: só aplica lógica de esconder/mostrar se firstSection existir
    if (firstSection) {
      // Esconde header ao passar da primeira seção e rolando para baixo
      const firstSectionBottom = firstSection.offsetTop + firstSection.offsetHeight;
      if (scrollY > firstSectionBottom && scrollY > lastScroll) {
        header.classList.add('header-hide');
      } else if (scrollY > firstSectionBottom && scrollY < lastScroll) {
        header.classList.remove('header-hide');
      } else if (scrollY <= firstSectionBottom) {
        header.classList.remove('header-hide');
      }
    }
    
    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  // Inicializar links com scroll suave
  setupMenuLinks();
  
  // Garantir que os event listeners sejam aplicados mesmo se houver delay
  setTimeout(() => {
    setupMenuLinks();
  }, 100);
});
