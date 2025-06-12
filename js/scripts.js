// Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        // Toggle das classes
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Atualizar aria-expanded para acessibilidade
        const isExpanded = navLinks.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Fechar menu ao clicar nos links
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Animação de entrada lateral dos benefit-item
function animateBenefitItems() {
  const items = document.querySelectorAll('.grid-itens .benefit-item');
  const triggerBottom = window.innerHeight * 0.92;
  items.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animateBenefitItems);
window.addEventListener('DOMContentLoaded', animateBenefitItems);