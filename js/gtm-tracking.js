// GTM DataLayer Tracking - Octor Affiliates
// Sistema de rastreamento integrado ao GTM do Grupo Octor

// Inicialização do dataLayer
window.dataLayer = window.dataLayer || [];

// Função para identificar a localização do botão
function getButtonLocation(button) {
  // Verifica se o botão está no header
  if (button.closest('header')) {
    return button.classList.contains('mobile') || button.closest('.menu') ? 'header_mobile' : 'header_desktop';
  }
  
  // Verifica se o botão está na seção hero
  if (button.closest('.hero-section')) {
    return 'hero_section';
  }
  
  // Verifica se o botão está na seção bet
  if (button.closest('.bet-section')) {
    return 'bet_section';
  }
  
  // Verifica se o botão está na seção how-to
  if (button.closest('.how-it-works-section')) {
    return 'how_to_section';
  }
  
  // Localização genérica
  return 'unknown';
}

// Função para obter o idioma atual
function getCurrentLanguage() {
  const langSelect = document.getElementById('lang-select');
  return langSelect ? langSelect.value : 'pt-BR';
}

// Função principal de tracking para botões "Fale Conosco"
function trackWhatsAppClick(button) {
  const location = getButtonLocation(button);
  const language = getCurrentLanguage();
  const buttonText = button.textContent.trim().replace(/\s+/g, ' ');
  
  // Push do evento para o dataLayer
  window.dataLayer.push({
    'event': 'whatsapp_click_affiliates',
    'page_type': 'affiliates',
    'button_location': location,
    'button_text': buttonText,
    'language': language,
    'phone_number': '5581995332328',
    'page_url': window.location.href,
    'page_title': document.title,
    'timestamp': new Date().toISOString(),
    'user_agent': navigator.userAgent,
    'screen_resolution': `${screen.width}x${screen.height}`,
    'viewport_size': `${window.innerWidth}x${window.innerHeight}`
  });
}

// Função para rastrear carregamento da página
function trackPageLoad() {
  window.dataLayer.push({
    'event': 'page_loaded_affiliates',
    'page_type': 'affiliates',
    'page_url': window.location.href,
    'page_title': document.title,
    'language': getCurrentLanguage(),
    'timestamp': new Date().toISOString(),
    'user_agent': navigator.userAgent,
    'screen_resolution': `${screen.width}x${screen.height}`,
    'viewport_size': `${window.innerWidth}x${window.innerHeight}`
  });
}

// Função para rastrear mudança de idioma
function trackLanguageChange(newLanguage, oldLanguage) {
  window.dataLayer.push({
    'event': 'language_change_affiliates',
    'page_type': 'affiliates',
    'new_language': newLanguage,
    'old_language': oldLanguage,
    'page_url': window.location.href,
    'timestamp': new Date().toISOString()
  });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  
  // Rastreia carregamento da página
  trackPageLoad();
  
  // Configura tracking para todos os botões "Fale Conosco"
  function setupWhatsAppTracking() {
    // Seleciona todos os botões que podem ser "Fale Conosco"
    const contactButtons = document.querySelectorAll('button[data-translate*="contact_button"], .btn');
    
    contactButtons.forEach(button => {
      const buttonText = button.textContent.trim();
      
      // Verifica se é um botão de contato (em português ou inglês)
      if (buttonText.includes('Fale Conosco') || buttonText.includes('Contact Us')) {
        
        // Remove listeners anteriores para evitar duplicação
        button.removeEventListener('click', button._whatsappTracker);
        
        // Cria novo listener
        const tracker = function(e) {
          // Rastreia o clique
          trackWhatsAppClick(button);
          
          // Abre o WhatsApp após um pequeno delay para garantir que o evento seja enviado
          setTimeout(() => {
            window.open('https://wa.me/5581995332328', '_blank');
          }, 100);
        };
        
        // Armazena referência do listener no botão
        button._whatsappTracker = tracker;
        
        // Adiciona o listener
        button.addEventListener('click', tracker);
      }
    });
  }
  
  // Configura tracking inicial
  setupWhatsAppTracking();
  
  // Reconfigura tracking após mudanças de idioma
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    let currentLanguage = langSelect.value;
    
    langSelect.addEventListener('change', function() {
      const newLanguage = this.value;
      trackLanguageChange(newLanguage, currentLanguage);
      currentLanguage = newLanguage;
      
      // Reconfigura tracking após tradução
      setTimeout(() => {
        setupWhatsAppTracking();
      }, 500);
    });
  }
  
  // Observer para detectar mudanças dinâmicas no DOM (caso os botões sejam atualizados)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        setupWhatsAppTracking();
      }
    });
  });
  
  // Observa mudanças nos botões
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-translate']
  });
});
