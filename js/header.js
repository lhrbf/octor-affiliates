// Funcionalidade do Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    // Função para adicionar/remover blur no header baseado no scroll
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Event listener para o scroll
    window.addEventListener('scroll', handleScroll);
    
    if (hamburger && navLinks) {
        // Toggle do menu quando clica no hambúrguer
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            
            // Alterna o estado aria-expanded
            hamburger.setAttribute('aria-expanded', !isExpanded);
            
            // Alterna a visibilidade do menu
            if (!isExpanded) {
                navLinks.style.display = 'flex';
                navLinks.classList.add('menu-open');
            } else {
                navLinks.classList.remove('menu-open');
                // Pequeno delay para a animação antes de esconder
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            }
        });
        
        // Fecha o menu quando clica em um link (mobile)
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 810) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('menu-open');
                    setTimeout(() => {
                        navLinks.style.display = 'none';
                    }, 300);
                }
            });
        });
        
        // Fecha o menu quando redimensiona para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 810) {
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.style.display = 'flex';
                navLinks.classList.remove('menu-open');
            } else {
                // No mobile, esconde o menu se não está expandido
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                if (!isExpanded) {
                    navLinks.style.display = 'none';
                }
            }
        });
        
        // Fecha o menu quando clica fora dele (mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 810) {
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                if (isExpanded && !hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('menu-open');
                    setTimeout(() => {
                        navLinks.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
});