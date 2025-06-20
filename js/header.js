// Funcionalidade do Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
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
        let isMenuOpen = false;
        
        // Função simples para alternar o menu
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('open', isMenuOpen);
            hamburger.classList.toggle('active', isMenuOpen);
        }
        
        // Events
        hamburger.addEventListener('click', toggleMenu);
        
        // Fecha menu ao clicar nos links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && window.innerWidth <= 810) {
                toggleMenu();
            }
        });
        
        // Fecha menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 810 && isMenuOpen) {
                toggleMenu();
            }
        });
        
        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 810 && isMenuOpen && 
                !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                toggleMenu();
            }
        });
    }
});