// Safari-specific fixes for octor-affiliates
document.addEventListener('DOMContentLoaded', function() {
  // Detectar se é Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  if (isSafari) {
    
    // Corrigir vídeos - garantir que não mostrem controles no Safari
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.removeAttribute('controls');
      video.setAttribute('controlslist', 'nodownload noplaybackrate nofullscreen');
      video.setAttribute('disablepictureinpicture', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      // Forçar remoção de controles específica do Safari/WebKit
      video.style.webkitUserSelect = 'none';
      video.style.userSelect = 'none';
      video.style.webkitTouchCallout = 'none';
      video.style.webkitTapHighlightColor = 'transparent';
      
      video.addEventListener('loadeddata', function() {
        if (video.hasAttribute('autoplay')) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              document.addEventListener('touchstart', function() {
              }, { once: true });
            });
          }
        }
      });
      
      video.addEventListener('mouseenter', function() {
        video.controls = false;
      });
      
      video.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    
    // Se houver cards com flip, aplicar correções
    const cards = document.querySelectorAll('.card-flip');
    if (cards.length > 0) {
      cards.forEach(card => {
        card.style.perspective = '1200px';
        card.style.webkitPerspective = '1200px';
        
        const flipInner = card.querySelector('.card-flip-inner');
        if (flipInner) {
          flipInner.style.transformStyle = 'preserve-3d';
          flipInner.style.webkitTransformStyle = 'preserve-3d';
          flipInner.style.willChange = 'transform';
          flipInner.style.webkitWillChange = 'transform';
        }
        
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');
        
        if (cardFront) {
          cardFront.style.backfaceVisibility = 'hidden';
          cardFront.style.webkitBackfaceVisibility = 'hidden';
          cardFront.style.transform = 'translateZ(0)';
          cardFront.style.webkitTransform = 'translateZ(0)';
        }
        
        if (cardBack) {
          cardBack.style.backfaceVisibility = 'hidden';
          cardBack.style.webkitBackfaceVisibility = 'hidden';
          cardBack.style.transform = 'rotateY(180deg) translateZ(0)';
          cardBack.style.webkitTransform = 'rotateY(180deg) translateZ(0)';
        }
      });
    }
    
    // Fix específico para Safari mobile
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
      
      // Otimização de scroll
      document.body.style.webkitOverflowScrolling = 'touch';
      document.body.style.webkitTextSizeAdjust = '100%';
      document.body.style.webkitFontSmoothing = 'antialiased';
    }
    
    // Otimizações específicas para o hero image rotator no Safari
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
      // Força aceleração de hardware no Safari
      heroImage.style.webkitTransform = 'translateZ(0)';
      heroImage.style.transform = 'translateZ(0)';
      heroImage.style.webkitBackfaceVisibility = 'hidden';
      heroImage.style.backfaceVisibility = 'hidden';
      heroImage.style.willChange = 'opacity';
      heroImage.style.webkitWillChange = 'opacity';
      
      // Otimizar transições no Safari
      heroImage.style.webkitTransition = 'opacity 0.3s ease-in-out';
      heroImage.style.transition = 'opacity 0.3s ease-in-out';
    }
    
    // Otimizações para benefit items no Safari
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
      item.style.webkitTransform = 'translateZ(0)';
      item.style.transform = 'translateZ(0)';
      item.style.webkitWillChange = 'transform, opacity';
      item.style.willChange = 'transform, opacity';
    });
    
    // Otimizações para header no Safari
    const header = document.querySelector('header');
    if (header) {
      header.style.webkitTransform = 'translateZ(0)';
      header.style.transform = 'translateZ(0)';
      header.style.webkitBackfaceVisibility = 'hidden';
      header.style.backfaceVisibility = 'hidden';
    }
  }
});
