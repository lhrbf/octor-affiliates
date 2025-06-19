// Funcionalidade do Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    // Função para adicionar/remover blur no header baseado no scroll
    function handleScroll() {
        if (window.innerWidth <= 810 && window.scrollY > 10) {
            header.classList.add('scrolled');
        } else if (window.innerWidth > 810 && window.scrollY > 100) {
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
            const isMenuOpen = navLinks.classList.contains('menu-open');
            
            if (!isMenuOpen) {
                navLinks.style.display = 'flex';
                navLinks.classList.add('menu-open');
            } else {
                navLinks.classList.remove('menu-open');
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
                navLinks.style.display = 'flex';
                navLinks.classList.remove('menu-open');
            } else {
                const isMenuOpen = navLinks.classList.contains('menu-open');
                if (!isMenuOpen) {
                    navLinks.style.display = 'none';
                }
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
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            }
        });
        
        // Fecha o menu quando clica fora dele (mobile)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 810) {
                const isMenuOpen = navLinks.classList.contains('menu-open');
                if (isMenuOpen && !hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                    navLinks.classList.remove('menu-open');
                    setTimeout(() => {
                        navLinks.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
});