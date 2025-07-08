class Carousel3D {
  constructor() {
    this.currentIndex = 0;
    this.cards = document.querySelectorAll(".card");
    this.indicators = document.querySelectorAll(".indicator-dot");
    this.carouselWrapper = document.querySelector(
      ".card-container .carousel-wrapper"
    );
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

    // Inicializa atributos de acessibilidade
    this.initAccessibility();
  }

  initDesktop() {
    this.updateCarousel3D();
  }

  initMobile() {
    this.updateCarouselMobile();
  }

  initAccessibility() {
    // Define atributos iniciais para os cards
    this.cards.forEach((card, index) => {
      card.setAttribute(
        "aria-selected",
        index === this.currentIndex ? "true" : "false"
      );
      card.setAttribute("tabindex", index === this.currentIndex ? "0" : "-1");
    });

    // Define atributos iniciais para os indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.setAttribute(
        "aria-pressed",
        index === this.currentIndex ? "true" : "false"
      );
      indicator.setAttribute("tabindex", "0");
    });

    // Configura o carrossel como uma região landmark
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    if (carouselWrapper) {
      carouselWrapper.setAttribute(
        "aria-label",
        "Carrossel de benefícios do programa de afiliação"
      );
    }
  }

  updateCarousel3D() {
    const angleStep = 360 / this.totalCards;
    const radius = 675;

    this.cards.forEach((card, index) => {
      const angle = (index - this.currentIndex) * angleStep;
      const radians = (angle * Math.PI) / 180;

      // Posição no círculo
      const x = Math.sin(radians) * radius;
      const z = Math.cos(radians) * radius;

      // Scale baseado na posição Z
      const scale = index === this.currentIndex ? 1 : 0.7;

      card.style.transform = `
                translate(-50%, -50%) 
                translate3d(${x}px, 0, ${z}px) 
                rotateY(${-angle}deg) 
                scale(${scale})
            `;
      card.style.zIndex = index === this.currentIndex ? 10 : Math.round(z);

      // Classes ativas e inativas para styling
      card.classList.toggle("active", index === this.currentIndex);
      card.classList.toggle("inactive", index !== this.currentIndex);
      
      // Desabilita pointer events para cards inativos
      card.style.pointerEvents = index === this.currentIndex ? "auto" : "none";
    });
  }

  updateCarouselMobile() {
    // Obtém dimensões atuais do card e container
    const cardWidth = this.cards[0].offsetWidth;
    const cardMargin = parseInt(getComputedStyle(this.cards[0]).marginRight) || 0;
    const gap = cardMargin * 2; // Margem dos dois lados
    const containerWidth = this.carouselWrapper.parentElement.offsetWidth;
    
    // Centraliza o card ativo considerando o número total de cards
    // Ajuste para mover um pouco mais para a esquerda
    const centerPosition = (containerWidth - cardWidth) / 2 - 10;
    const cardOffset = this.currentIndex * (cardWidth + gap);
    const translateX = centerPosition - cardOffset;

    this.carouselWrapper.style.transform = `translateX(${translateX}px)`;
    this.carouselWrapper.style.transition = 'transform 0.5s ease-in-out';

    // Atualiza classes ativas
    this.cards.forEach((card, index) => {
      card.classList.toggle("active", index === this.currentIndex);
    });
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentIndex);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalCards) % this.totalCards;
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
    this.updateAriaAttributes();
  }

  updateAriaAttributes() {
    // Atualiza aria-selected nos cards
    this.cards.forEach((card, index) => {
      card.setAttribute(
        "aria-selected",
        index === this.currentIndex ? "true" : "false"
      );
      card.setAttribute("tabindex", index === this.currentIndex ? "0" : "-1");
    });

    // Atualiza aria-pressed nos indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.setAttribute(
        "aria-pressed",
        index === this.currentIndex ? "true" : "false"
      );
    });

    // Atualiza aria-live para anunciar mudanças
    const currentCard = this.cards[this.currentIndex];
    if (currentCard) {
      const cardTitle = currentCard.querySelector("h3")?.textContent || "";
      this.announceChange(
        `Benefício ${this.currentIndex + 1} de ${this.totalCards}: ${cardTitle}`
      );
    }
  }

  announceChange(message) {
    // Cria ou atualiza o elemento para screen readers
    let announcer = document.getElementById("carousel-announcer");
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.id = "carousel-announcer";
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      announcer.style.position = "absolute";
      announcer.style.left = "-10000px";
      announcer.style.width = "1px";
      announcer.style.height = "1px";
      announcer.style.overflow = "hidden";
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
  }

  bindEvents() {
    // Navigation arrows (desktop)
    document
      .querySelector(".prev")
      ?.addEventListener("click", () => this.prev());
    document
      .querySelector(".next")
      ?.addEventListener("click", () => this.next());

    // Navigation arrows (mobile)
    document
      .querySelector(".prev-mobile")
      ?.addEventListener("click", () => this.prev());
    document
      .querySelector(".next-mobile")
      ?.addEventListener("click", () => this.next());

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goTo(index));
    });

    // Card clicks (desktop only)
    if (!this.isMobile) {
      this.cards.forEach((card, index) => {
        card.addEventListener("click", (e) => {
          // Desabilita clique se não for o card ativo
          if (index !== this.currentIndex) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
      });
    }

    // Navegação por teclado
    document.addEventListener("keydown", (e) => {
      // Verifica se o foco está no carrossel ou seus elementos
      const carouselContainer = document.querySelector(".benefits-section");
      if (!carouselContainer.contains(document.activeElement)) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          this.prev();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.next();
          break;
        case "Home":
          e.preventDefault();
          this.goTo(0);
          break;
        case "End":
          e.preventDefault();
          this.goTo(this.totalCards - 1);
          break;
      }
    });

    // Focus management para indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault();
            this.goTo(index);
            break;
        }
      });
    });

    // Touch events for mobile
    if (this.isMobile && this.carouselWrapper) {
      let startX = 0;
      let startY = 0;
      let isDragging = false;

      this.carouselWrapper.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          isDragging = true;
        },
        { passive: true }
      );

      this.carouselWrapper.addEventListener(
        "touchmove",
        (e) => {
          if (!isDragging) return;

          const currentX = e.touches[0].clientX;
          const currentY = e.touches[0].clientY;
          const diffX = Math.abs(currentX - startX);
          const diffY = Math.abs(currentY - startY);

          // Se movimento horizontal é maior que vertical, previne scroll vertical
          if (diffX > diffY) {
            e.preventDefault();
          }
        },
        { passive: false }
      );

      this.carouselWrapper.addEventListener(
        "touchend",
        (e) => {
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
        },
        { passive: true }
      );
    }

    // Window resize
    window.addEventListener("resize", () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 1024;

      if (wasMobile !== this.isMobile) {
        // Para autoplay se mudou para mobile
        if (this.isMobile) {
          clearInterval(this.autoPlayInterval);
        }
        this.init();
      } else if (this.isMobile) {
        // Se ainda está no mobile, recalcula a posição
        this.updateCarouselMobile();
      }
    });
  }

  startAutoPlay() {
    // Só inicia autoplay no desktop
    if (!this.isMobile) {
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, 15000); // 15 segundos por card
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
document.addEventListener("DOMContentLoaded", () => {
  // Verificar se estamos na página que tem o carousel
  if (document.querySelector(".benefits-section")) {
    new Carousel3D();
  }
});
