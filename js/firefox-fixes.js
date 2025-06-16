// Firefox-specific fixes for octor-affiliates
document.addEventListener('DOMContentLoaded', function() {
  // Detectar se é Firefox
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  
  if (isFirefox) {
    console.log('Firefox detectado no octor-affiliates, aplicando correções...');
    
    // Corrigir vídeos - remover controles no Firefox
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.removeAttribute('controls');
      video.setAttribute('controlslist', 'nodownload noplaybackrate nofullscreen');
      
      // Forçar remoção de controles específica do Firefox
      video.style.pointerEvents = 'none';
      
      // Garantir que o vídeo toque automaticamente
      video.addEventListener('loadeddata', function() {
        if (video.hasAttribute('autoplay')) {
          video.play().catch(e => {
            console.log('Erro ao reproduzir vídeo no Firefox:', e);
          });
        }
      });
    });
    
    // Se houver cards com flip, aplicar correções similares
    const cards = document.querySelectorAll('.card-flip');
    if (cards.length > 0) {
      cards.forEach(card => {
        card.style.perspective = '1200px';
        
        const flipInner = card.querySelector('.card-flip-inner');
        if (flipInner) {
          flipInner.style.transformStyle = 'preserve-3d';
          flipInner.style.WebkitTransformStyle = 'preserve-3d';
          flipInner.style.MozTransformStyle = 'preserve-3d';
        }
        
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');
        
        if (cardFront) {
          cardFront.style.backfaceVisibility = 'hidden';
          cardFront.style.WebkitBackfaceVisibility = 'hidden';
          cardFront.style.MozBackfaceVisibility = 'hidden';
        }
        
        if (cardBack) {
          cardBack.style.backfaceVisibility = 'hidden';
          cardBack.style.WebkitBackfaceVisibility = 'hidden';
          cardBack.style.MozBackfaceVisibility = 'hidden';
          cardBack.style.transform = 'rotateY(180deg)';
          cardBack.style.WebkitTransform = 'rotateY(180deg)';
          cardBack.style.MozTransform = 'rotateY(180deg)';
        }
      });
    }
  }
});
