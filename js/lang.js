// Sistema de tradução dinâmica - Octor Affiliates
// Baseado no sistema do Grupo Octor
const langSelect = document.getElementById('lang-select');

// Função para aplicar traduções via data-translate
function applyDataTranslateElements(data) {
  const elementsWithDataTranslate = document.querySelectorAll('[data-translate]');
  
  elementsWithDataTranslate.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (data[key]) {
      
      // Se o valor contém quebra de linha (\n), trata conforme o tipo de elemento
      if (data[key].includes('\n')) {
        const lines = data[key].split('\n');
        
        // Para títulos de carousel ou headings, usa apenas a primeira linha
        if (element.classList.contains('carousel-title') || 
            /^h[1-6]$/i.test(element.tagName) ||
            element.classList.contains('title')) {
          element.textContent = lines[0];
          console.log(`📝 Título aplicado: "${lines[0]}"`);
        } 
        // Para descrições de carousel ou parágrafos, usa o resto do texto (SEM o primeiro elemento que é o título)
        else if (element.classList.contains('carousel-description') || 
                 element.tagName.toLowerCase() === 'p' ||
                 element.classList.contains('description')) {
          const description = lines.slice(1).join(' ').trim();
          element.textContent = description;
          console.log(`📄 Descrição aplicada: "${description}"`);
        } 
        // Para outros elementos, preserva formatação com quebras de linha
        else if (element.innerHTML.includes('<br')) {
          element.innerHTML = data[key].replace(/\n/g, '<br />');
        }
        // Para outros elementos, usa texto completo
        else {
          element.textContent = data[key];
        }
      } else {
        // Para valores sem quebra de linha, usa diretamente
        if (element.innerHTML.includes('<br') && data[key].includes('br')) {
          element.innerHTML = data[key];
        } else {
          element.textContent = data[key];
        }
      }
    } else {
      console.log(`❌ Chave não encontrada: ${key}`);
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
  console.log('🌐 Aplicando idioma:', lang);
  
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
  
  console.log('✅ Idioma aplicado com sucesso');
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
