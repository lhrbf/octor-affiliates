// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 
                  (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Benefits Section Animation
const benefitItems = document.querySelectorAll('.benefit-item');
const benefitsSection = document.querySelector('.benefits');

function checkBenefits() {
    const triggerBottom = window.innerHeight * 0.8;

    benefitItems.forEach(benefit => {
        const benefitTop = benefit.getBoundingClientRect().top;

        if (benefitTop < triggerBottom) {
            benefit.classList.add('active');
        } else {
            benefit.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', checkBenefits);
window.addEventListener('resize', checkBenefits);
checkBenefits();

// Testimonials Slider
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const dotsContainer = document.querySelector('.testimonials-dots');
let currentSlide = 0;
let interval;

// Create dots
testimonialItems.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
    resetInterval();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    goToSlide(currentSlide);
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
}

updateDots();
resetInterval();

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
            faqItem.querySelector('.faq-answer').style.height = '0';
        });

        // Open clicked item if it was closed
        if (!isOpen) {
            item.classList.add('active');
            answer.style.height = answer.scrollHeight + 'px';
        }
    });
});

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();