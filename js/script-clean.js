// Octor Affiliates - Main Script

// Footer year update
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Contact buttons functionality - scroll only
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.btn');
    
    contactButtons.forEach(button => {
        if (button.textContent.includes('Fale Conosco') || button.textContent.includes('Contact Us')) {
            button.addEventListener('click', function(e) {
                // Remove comportamento padrão para permitir que o GTM tracking funcione
                e.preventDefault();
                
                // O GTM tracking será responsável por abrir o WhatsApp
                // Este script apenas faz scroll se necessário
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
});

// Hero image loop functionality with smooth transition
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        const images = [
            'assets/images/LEO-SANTANA.webp',
            'assets/images/carlinhos-maia.webp'
        ];
        
        let currentIndex = 0;
        
        // Preload images for smooth transition
        const preloadedImages = [];
        images.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            preloadedImages[index] = img;
        });
        
        // Function to change image with smooth fade transition
        function changeImage() {
            // Start fade out
            heroImage.style.opacity = '0';
            
            // After fade out completes, change image and fade in
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                heroImage.src = images[currentIndex];
                
                // Fade in new image
                heroImage.style.opacity = '1';
            }, 300); // Wait for fade out to complete (matches CSS transition)
        }
        
        // Change image every 4 seconds (increased to allow for transition)
        setInterval(changeImage, 4000);
    }
});

// Link functionality for affiliate and contact links in how-to section
document.addEventListener('DOMContentLoaded', function() {
    // Function to simulate button click
    function simulateButtonClick(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.click();
        }
    }

    // Add event listeners for affiliate links
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('affiliate-link')) {
            e.preventDefault();
            // Simulate click on the "Torne-se um afiliado" button
            simulateButtonClick('.btn.btn-secondary[data-translate="hero.affiliate_button"]');
        }
        
        if (e.target.classList.contains('contact-link')) {
            e.preventDefault();
            // Simulate click on the "Fale Conosco" button
            simulateButtonClick('.btn.btn-outline[data-translate="hero.contact_button"]');
        }
    });
});
