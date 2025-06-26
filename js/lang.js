// Sistema de tradução dinâmica - Octor Affiliates
// Baseado no sistema do Grupo Octor
const langSelect = document.getElementById('lang-select');

// Função para aplicar traduções via data-translate
function applyDataTranslateElements(data) {
  const elementsWithDataTranslate = document.querySelectorAll('[data-translate]');
  
  elementsWithDataTranslate.forEach(element => {
    const key = element.getAttribute('data-translate');
    
    // Função para acessar propriedades aninhadas
    function getNestedValue(obj, path) {
      return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }
    
    const translatedValue = getNestedValue(data, key);
    
    if (translatedValue) {
      // Se o valor contém quebra de linha (\n), trata conforme o tipo de elemento
      if (translatedValue.includes('\n')) {
        const lines = translatedValue.split('\n');
        
        // Para títulos de carousel ou headings, usa apenas a primeira linha
        if (element.classList.contains('carousel-title') || 
            /^h[1-6]$/i.test(element.tagName) ||
            element.classList.contains('title')) {
          element.textContent = lines[0];
        } 
        // Para descrições de carousel ou parágrafos, usa o resto do texto (SEM o primeiro elemento que é o título)
        else if (element.classList.contains('carousel-description') || 
                 element.tagName.toLowerCase() === 'p' ||
                 element.classList.contains('description')) {
          const description = lines.slice(1).join(' ').trim();
          element.textContent = description;
        } 
        // Para outros elementos, preserva formatação com quebras de linha
        else if (element.innerHTML.includes('<br')) {
          element.innerHTML = translatedValue.replace(/\n/g, '<br />');
        }
        // Para outros elementos, usa texto completo
        else {
          element.textContent = translatedValue;
        }
      } else {
        // Para valores sem quebra de linha, usa diretamente
        if (element.innerHTML.includes('<br') && translatedValue.includes('br')) {
          element.innerHTML = translatedValue;
        } 
        // Para botões ou elementos que contêm HTML (como ícones), usa innerHTML
        else if (translatedValue.includes('<i class=') || element.tagName.toLowerCase() === 'button') {
          element.innerHTML = translatedValue;
        } else {
          element.textContent = translatedValue;
        }
      }
    } else {
      console.warn(`❌ Chave não encontrada: ${key}`);
    }
  });
}

// Sincroniza o seletor de idioma
function syncLangSelects(value) {
  if (langSelect && langSelect.value !== value) langSelect.value = value;
}

// Função para carregar traduções
async function loadTranslations(lang) {
  try {
    const response = await fetch(`assets/json/${lang}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
    return null;
  }
}

// Função principal para aplicar idioma
async function applyLanguage(lang) {
  
  // Atualiza atributo lang do HTML
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  
  // Sincroniza seletor
  syncLangSelects(lang);
  
  // Carrega e aplica traduções
  const translations = await loadTranslations(lang);
  if (translations) {
    applyDataTranslateElements(translations);
  }
  
  // Salva preferência no localStorage
  localStorage.setItem('preferred-language', lang);
}

// Inicialização do sistema de tradução
window.addEventListener('DOMContentLoaded', () => {
  // Define idioma padrão baseado no navegador ou valor do select
  const savedLang = localStorage.getItem('preferred-language');
  const browserLang = navigator.language.startsWith('en') ? 'en' : 'pt-BR';
  const defaultLang = savedLang || 
                      (langSelect && langSelect.value) || 
                      browserLang;
  
  // Configura event listener para o seletor
  if (langSelect) {
    langSelect.value = defaultLang;
    langSelect.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  }
  
  // Aplica idioma inicial
  applyLanguage(defaultLang);
});
