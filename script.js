// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // You can add your form submission logic here
        console.log('Form submitted:', { name, email, message });
        
        // Clear the form
        this.reset();
        alert('Thank you for your message! I will get back to you soon.');
    });
}

// Hero name scroll transition
const heroName = document.querySelector('.hero-text h1');
const heroSection = document.querySelector('.hero');

if (heroName && heroSection) {
    window.addEventListener('scroll', () => {
        const heroRect = heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        let progress = Math.min(Math.max((0 - heroRect.top) / (windowHeight * 0.5), 0), 1);
        if (progress < 1) {
            heroName.classList.remove('fixed-left');
            heroName.style.transform = `translateX(${-progress * 40}vw)`;
            heroName.style.opacity = `${1 - progress}`;
        } else {
            heroName.classList.add('fixed-left');
            heroName.style.transform = '';
            heroName.style.opacity = '1';
        }
    });
} 