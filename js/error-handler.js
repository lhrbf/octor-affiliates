// Error Handler Global para capturar erros de terceiros
window.addEventListener('error', function(e) {
  // Ignora erros de scripts externos (ads, analytics, etc.)
  if (e.filename && (
    e.filename.includes('inspector.') ||
    e.filename.includes('ads.') ||
    e.filename.includes('analytics') ||
    e.filename.includes('gtag') ||
    e.filename.includes('facebook') ||
    e.filename.includes('google') ||
    e.filename.includes('doubleclick')
  )) {
    e.preventDefault();
    return false;
  }
  
  // Log apenas erros do nosso código
  if (e.filename && e.filename.includes(window.location.origin)) {
    console.warn('Erro interno:', e.message, 'em', e.filename, 'linha', e.lineno);
  }
  
  return false;
});

// Captura erros de promises rejeitadas
window.addEventListener('unhandledrejection', function(e) {
  // Ignora rejeições de terceiros
  const stack = e.reason?.stack || '';
  if (stack.includes('inspector.') || 
      stack.includes('ads.') || 
      stack.includes('analytics') ||
      stack.includes('gtag')) {
    e.preventDefault();
    return false;
  }
});

// Sobrescreve console.error para filtrar erros de terceiros
const originalConsoleError = console.error;
console.error = function(...args) {
  const message = args.join(' ');
  
  // Filtra erros conhecidos de terceiros
  if (message.includes('inspector.') ||
      message.includes('ads.') ||
      message.includes('SecurityError: Failed to read') ||
      message.includes('Minified React error') ||
      message.includes('third-party cookies')) {
    return; // Suprime o erro
  }
  
  // Mostra apenas erros relevantes
  originalConsoleError.apply(console, args);
};

// Melhora o tratamento de CSS rules
try {
  // Verifica se podemos acessar as regras CSS
  document.styleSheets.forEach(sheet => {
    try {
      if (sheet.cssRules) {
        // Tenta acessar as regras para detectar problemas
      }
    } catch (e) {
      // Ignora erros de CORS em stylesheets externos
      if (e.name === 'SecurityError') {
        return;
      }
    }
  });
} catch (e) {
  // Ignora completamente erros de stylesheet
}
