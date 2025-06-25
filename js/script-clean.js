// Octor Affiliates - Main Script
console.log('Octor Affiliates loaded successfully');

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

// Contact buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.btn');
    
    contactButtons.forEach(button => {
        if (button.textContent.includes('Fale Conosco')) {
            button.addEventListener('click', function() {
                // Scroll to contact section
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

// Hero image loop functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        const images = [
            'assets/images/LEO-SANTANA.webp',
            'assets/images/carlinhos-maia.webp'
        ];
        
        let currentIndex = 0;
        
        // Function to change image
        function changeImage() {
            currentIndex = (currentIndex + 1) % images.length;
            heroImage.src = images[currentIndex];
        }
        
        // Change image every 3 seconds
        setInterval(changeImage, 3000);
    }
});
