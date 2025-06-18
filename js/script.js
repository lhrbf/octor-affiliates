// Alternância de imagens do Hero
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        // Adiciona transição suave no CSS
        heroImage.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
        
        const images = [
            'assets/images/LEO-SANTANA.png',
            'assets/images/carlinhos-maia.png'
        ];
        
        let currentImageIndex = 0;
        
        // Função para alternar imagens com efeito mais suave
        function switchHeroImage() {
            // Fade out com leve movimento
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                // Troca a imagem
                currentImageIndex = (currentImageIndex + 1) % images.length;
                heroImage.src = images[currentImageIndex];
                
                // Fade in com movimento de volta
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
            }, 400); // Tempo aumentado para transição mais suave
        }
        
        // Inicia a alternância a cada 3 segundos
        setInterval(switchHeroImage, 3000);
        
        // Define a primeira imagem com estado inicial
        heroImage.src = images[0];
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'scale(1)';
    }
});