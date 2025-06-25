document.addEventListener("DOMContentLoaded", function () {
  // --- Alternância de imagens no hero ---
  const heroImg = document.querySelector(".hero-image img");
  const images = [
    "/assets/images/LEO-SANTANA.webp",
    "/assets/images/carlinhos-maia.webp",
  ];
  let current = 0;

  if (heroImg) {
    setInterval(() => {
      heroImg.classList.add("fade-out");
      setTimeout(() => {
        current = (current + 1) % images.length;
        heroImg.src = images[current];
        heroImg.classList.remove("fade-out");
      }, 300); 
    }, 3000);
  }

  // --- Configuração dos botões "Fale Conosco" ---
  const whatsappNumber = '5581995332328'; // Mesmo número do grupo-octor
  const whatsappMessage = 'Olá! Tenho interesse no programa de afiliados da Octor.';
  
  // Selecionar todos os botões "Fale Conosco"
  const contactButtons = document.querySelectorAll('button.btn:not(.lang-btn)');
  
  contactButtons.forEach(button => {
    const buttonText = button.textContent.trim().toLowerCase();
    
    // Verificar se é um botão "Fale Conosco"
    if (buttonText.includes('fale conosco') || buttonText.includes('contact')) {
      
      // Adicionar ícone do WhatsApp ao botão
      if (!button.querySelector('.fa-whatsapp')) {
        button.innerHTML = `
          ${button.textContent}
          <i class="fab fa-whatsapp" style="margin-left: 4px; font-size: 0.9em;"></i>
        `;
      }
      
      // Adicionar evento de clique para WhatsApp
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
      });
      
      // Adicionar cursor pointer se não tiver
      button.style.cursor = 'pointer';
    }
  });
});
