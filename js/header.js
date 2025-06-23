// Menu responsivo: alterna ícones e exibe/esconde menu mobile

document.addEventListener('DOMContentLoaded', function () {
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

  // --- Header blur, opacity e esconder/mostrar ao scroll ---
  const header = document.querySelector('header');
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

    // Esconde header ao passar da primeira seção e rolando para baixo
    const firstSectionBottom = firstSection.offsetTop + firstSection.offsetHeight;
    if (scrollY > firstSectionBottom && scrollY > lastScroll) {
      header.classList.add('header-hide');
    } else if (scrollY > firstSectionBottom && scrollY < lastScroll) {
      header.classList.remove('header-hide');
    } else if (scrollY <= firstSectionBottom) {
      header.classList.remove('header-hide');
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
});
