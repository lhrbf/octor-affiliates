// Menu responsivo: alterna ícones e exibe/esconde menu mobile

document.addEventListener('DOMContentLoaded', function () {
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
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
