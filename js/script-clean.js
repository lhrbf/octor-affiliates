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

// Button functionality - contact and affiliate actions
document.addEventListener('DOMContentLoaded', function() {
    // Function to redirect to affiliate signup
    function simulateAffiliateAction() {
        window.open('http://go.onabet.com/signup/?am=113', '_blank', 'noopener,noreferrer');
    }

    // Handle all button clicks
    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if it's an affiliate button
            if (button.classList.contains('btn-secondary') && button.getAttribute('data-translate') === 'hero.affiliate_button') {
                e.preventDefault();
                simulateAffiliateAction();
            }
            // Contact buttons (Fale Conosco) are handled by GTM tracking
            // No need to preventDefault for them
        });
    });

    // Handle affiliate links in text
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('affiliate-link')) {
            e.preventDefault();
            simulateAffiliateAction();
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
