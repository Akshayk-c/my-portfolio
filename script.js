// Intersection Observer for animations
const animationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px'
    }
);

// Function to stagger animations
function animateWithDelay(elements, baseDelay = 100) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, baseDelay * index);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-up');
        animationObserver.observe(section);
    });

    // Animate project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-up');
        animationObserver.observe(card);
    });

    // Animate skill tags with stagger
    const skillTags = document.querySelectorAll('.skill-tags span');
    skillTags.forEach(tag => {
        tag.classList.add('fade-up');
        animationObserver.observe(tag);
    });

    // Animate about text
    const aboutText = document.querySelector('.about-text p');
    if (aboutText) {
        aboutText.classList.add('slide-in');
        animationObserver.observe(aboutText);
    }
});

// Existing scroll handling for hero name
const heroName = document.querySelector('.hero-text h1');
const heroSection = document.querySelector('.hero');
const tagLine = document.querySelector('.tagline');

if (heroName && heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const triggerPoint = window.innerHeight * 0.3;

        if (scrollPosition > triggerPoint) {
            heroName.classList.add('fixed-header');
            tagLine.style.display = 'none';
        } else {
            heroName.classList.remove('fixed-header');
            tagLine.style.display = 'block';
        }
    });
}

// Smooth scrolling
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

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };
        console.log('Form submitted:', formData);
        this.reset();
        alert('Thank you for your message! I will get back to you soon.');
    });
}
