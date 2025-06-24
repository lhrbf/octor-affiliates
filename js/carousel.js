class Carousel3D {
    constructor() {
        this.currentIndex = 0;
        this.cards = document.querySelectorAll('.card');
        this.indicators = document.querySelectorAll('.indicator-dot');
        this.carouselWrapper = document.querySelector('.card-container .carousel-wrapper');
        this.totalCards = this.cards.length;
        this.isMobile = window.innerWidth <= 1024; // mudando para 1024px para pegar tablet também
        
        this.init();
        this.bindEvents();
        
        // Auto-play
        this.startAutoPlay();
    }

    init() {
        if (this.isMobile) {
            this.initMobile();
        } else {
            this.initDesktop();
        }
    }

    initDesktop() {
        this.updateCarousel3D();
    }

    initMobile() {
        this.updateCarouselMobile();
    }

    updateCarousel3D() {
        const angleStep = 360 / this.totalCards;
        const radius = 550;

        this.cards.forEach((card, index) => {
            const angle = (index - this.currentIndex) * angleStep;
            const radians = (angle * Math.PI) / 180;
            
            // Posição no círculo
            const x = Math.sin(radians) * radius;
            const z = Math.cos(radians) * radius;
            
            // Scale baseado na posição Z
            const scale = index === this.currentIndex ? 1 : 0.7;
            const opacity = index === this.currentIndex ? 1 : 0.6;
            
            card.style.transform = `
                translate(-50%, -50%) 
                translate3d(${x}px, 0, ${z}px) 
                rotateY(${-angle}deg) 
                scale(${scale})
            `;
            card.style.opacity = opacity;
            card.style.zIndex = index === this.currentIndex ? 10 : Math.round(z);
            
            // Classes ativas
            card.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateCarouselMobile() {
        // Detecta automaticamente o tamanho do card
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 20;
        const containerWidth = this.carouselWrapper.parentElement.offsetWidth;
        const isMobileSmall = window.innerWidth <= 768;
        
        if (isMobileSmall) {
            // Cálculo para mobile (≤768px) - mais restritivo
            const centerPosition = (containerWidth - cardWidth) / 2;
            const cardOffset = this.currentIndex * (cardWidth + gap);
            let translateX = centerPosition - cardOffset;
            
            // Limites mais conservadores para mobile
            const totalWidth = this.totalCards * (cardWidth + gap);
            const minTranslate = containerWidth - totalWidth + 40;
            const maxTranslate = 40;
            
            translateX = Math.max(minTranslate, Math.min(maxTranslate, translateX));
            
            this.carouselWrapper.style.transform = `translateX(${translateX}px)`;
        } else {
            // Cálculo para tablet (769px-1024px) - centraliza sempre
            const centerPosition = (containerWidth - cardWidth) / 2;
            const cardOffset = this.currentIndex * (cardWidth + gap);
            let translateX = centerPosition - cardOffset;
            
            // Para tablet, permite centralização mas limita apenas no final
            if (this.currentIndex <= 2) {
                // Primeiros 3 cards: centraliza normalmente
                translateX = centerPosition - cardOffset;
            } else {
                // Últimos cards: limita para não sair muito da tela
                const totalWidth = this.totalCards * (cardWidth + gap);
                const minTranslate = containerWidth - totalWidth + 20;
                translateX = Math.max(minTranslate, translateX);
            }
            
            this.carouselWrapper.style.transform = `translateX(${translateX}px)`;
        }
        
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    updateCarousel() {
        if (this.isMobile) {
            this.updateCarouselMobile();
        } else {
            this.updateCarousel3D();
        }
        this.updateIndicators();
    }

    bindEvents() {
        // Navigation arrows
        document.querySelector('.prev')?.addEventListener('click', () => this.prev());
        document.querySelector('.next')?.addEventListener('click', () => this.next());

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });

        // Card clicks (desktop only)
        if (!this.isMobile) {
            this.cards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    if (index !== this.currentIndex) {
                        this.goTo(index);
                    }
                });
            });
        }

        // Touch events for mobile
        if (this.isMobile && this.carouselWrapper) {
            let startX = 0;
            let startY = 0;
            let isDragging = false;

            this.carouselWrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isDragging = true;
            }, { passive: true });

            this.carouselWrapper.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = Math.abs(currentX - startX);
                const diffY = Math.abs(currentY - startY);
                
                // Se movimento horizontal é maior que vertical, previne scroll vertical
                if (diffX > diffY) {
                    e.preventDefault();
                }
            }, { passive: false });

            this.carouselWrapper.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;
                
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Window resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 1024;
            
            if (wasMobile !== this.isMobile) {
                // Para autoplay se mudou para mobile
                if (this.isMobile) {
                    clearInterval(this.autoPlayInterval);
                }
                this.init();
            }
        });
    }

    startAutoPlay() {
        // Só inicia autoplay no desktop
        if (!this.isMobile) {
            this.autoPlayInterval = setInterval(() => {
                this.next();
            }, 6000);
        }
    }

    resetAutoPlay() {
        // Só reseta autoplay no desktop
        if (!this.isMobile) {
            clearInterval(this.autoPlayInterval);
            this.startAutoPlay();
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se estamos na página que tem o carousel
    if (document.querySelector('.benefits-section')) {
        new Carousel3D();
    }
});