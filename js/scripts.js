// Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    hamburger.addEventListener('click', function() {
        // Toggle das classes
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Alternar ícones
        if (hamburger.classList.contains('active')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
        
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
            
            // Resetar ícones
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
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
            
            // Resetar ícones
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
});

// Animação de entrada lateral dos benefit-item com pausa de 10s
let lastAnimationTime = {};
const ANIMATION_COOLDOWN = 10000; // 10 segundos

function animateBenefitItems() {
  const items = document.querySelectorAll('.benefit-item');
  const triggerBottom = window.innerHeight * 0.8;
  const triggerTop = window.innerHeight * 0.2;
  const currentTime = Date.now();
  
  items.forEach((item, index) => {
    const boxTop = item.getBoundingClientRect().top;
    const boxBottom = item.getBoundingClientRect().bottom;
    const itemKey = `item-${index}`;
    
    // Se o elemento está na área visível (com margem para trigger)
    if (boxTop < triggerBottom && boxBottom > triggerTop) {
      // Verificar se passou o tempo de cooldown desde a última animação
      if (!lastAnimationTime[itemKey] || (currentTime - lastAnimationTime[itemKey]) > ANIMATION_COOLDOWN) {
        if (!item.classList.contains('visible')) {
          item.classList.add('visible');
          lastAnimationTime[itemKey] = currentTime;
        }
      }
    } else {
      // Se o elemento saiu da área visível, remove a classe após o cooldown
      if (item.classList.contains('visible') && lastAnimationTime[itemKey] && (currentTime - lastAnimationTime[itemKey]) > ANIMATION_COOLDOWN) {
        item.classList.remove('visible');
        delete lastAnimationTime[itemKey]; // Reset do tempo para permitir nova animação
      }
    }
  });
}

// Função para melhorar performance do scroll
let ticking = false;

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(() => {
      animateBenefitItems();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);
window.addEventListener('DOMContentLoaded', animateBenefitItems);
window.addEventListener('resize', animateBenefitItems);

// Header com background ao scrollar
function handleHeaderScroll() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('DOMContentLoaded', handleHeaderScroll);

// Scroll suave para seções sem âncoras na URL
function initSmoothScroll() {
    // Selecionar todos os links de navegação
    const navLinks = document.querySelectorAll('nav a, .nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se é um link externo ou se tem target="_blank"
            if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') {
                // Permitir navegação normal para links externos
                return;
            }
            
            // Verificar se é um link para seção (que tem href="...")
            if (href && href !== '#' && !href.startsWith('http')) {
                e.preventDefault();
                
                let targetSection = null;
                
                // Mapear links para seções correspondentes
                if (href.includes('benefits') || this.textContent.includes('Benefícios')) {
                    targetSection = document.getElementById('benefits');
                }
                
                // Fazer scroll suave para a seção
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Inicializar scroll suave quando o DOM carregar
document.addEventListener('DOMContentLoaded', initSmoothScroll);

// Hero Image Rotator
function initHeroImageRotator() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (!heroImage) return;
    
    const images = [
        'assets/images/LEO-SANTANA.png',
        'assets/images/carlinhos-maia.png'
    ];
    
    let currentImageIndex = 0;
    
    function changeHeroImage() {
        // Incrementar índice e voltar ao início se necessário
        currentImageIndex = (currentImageIndex + 1) % images.length;
        
        // Adicionar efeito de fade
        heroImage.style.opacity = '0';
        
        setTimeout(() => {
            heroImage.src = images[currentImageIndex];
            heroImage.style.opacity = '1';
        }, 300); // Meio segundo para o fade out/in
    }
    
    // Trocar imagem a cada 3 segundos
    setInterval(changeHeroImage, 3000);
    
    // Garantir que a transição seja suave
    heroImage.style.transition = 'opacity 0.3s ease-in-out';
}

// Inicializar rotator quando o DOM carregar
document.addEventListener('DOMContentLoaded', initHeroImageRotator);