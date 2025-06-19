// Funcionalidade do Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const mobileButton = document.querySelector('.nav-links .btn-secondary');
    
    // Função para controlar visibilidade do header baseado na direção do scroll
    let lastScrollY = 0;
    let isInHeroSection = true;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const heroSection = document.querySelector('#hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        // Verifica se está na seção hero
        isInHeroSection = currentScrollY < heroHeight;
        
        // Aplica blur baseado no scroll (independente da seção)
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (isInHeroSection) {
            // Na seção hero, header sempre visível
            header.classList.remove('hidden');
        } else {
            // Fora da seção hero, controla visibilidade baseado na direção do scroll
            if (currentScrollY > lastScrollY) {
                // Scrolling down - esconde header
                header.classList.add('hidden');
            } else {
                // Scrolling up - mostra header
                header.classList.remove('hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Event listener para o scroll
    window.addEventListener('scroll', handleScroll);
    
    if (hamburger && navLinks) {
        // Toggle do menu quando clica no hambúrguer
        hamburger.addEventListener('click', function() {
            const isMenuOpen = navLinks.classList.contains('menu-open');
            
            if (!isMenuOpen) {
                navLinks.classList.add('menu-open');
            } else {
                navLinks.classList.remove('menu-open');
            }
        });
        
        // Fecha o menu quando clica em um link (mobile)
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 810) {
                    navLinks.classList.remove('menu-open');
                }
            });
        });
        
        // Fecha o menu quando redimensiona para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 810) {
                navLinks.classList.remove('menu-open');
            }
        });
        
        // Fecha o menu quando clica no botão close dentro do menu
        navLinks.addEventListener('click', function(event) {
            const rect = navLinks.getBoundingClientRect();
            const clickX = event.clientX;
            const clickY = event.clientY;
            
            // Área do botão close (canto superior direito)
            const closeButtonArea = {
                left: rect.right - 60,
                right: rect.right - 20,
                top: rect.top + 20,
                bottom: rect.top + 60
            };
            
            if (clickX >= closeButtonArea.left && clickX <= closeButtonArea.right &&
                clickY >= closeButtonArea.top && clickY <= closeButtonArea.bottom) {
                navLinks.classList.remove('menu-open');
            }
        });
        
        // Fecha o menu quando clica fora dele (mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 810) {
                const isMenuOpen = navLinks.classList.contains('menu-open');
                if (isMenuOpen && !hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                    navLinks.classList.remove('menu-open');
                }
            }
        });
    }
});