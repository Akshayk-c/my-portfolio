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

// Initialize EmailJS
(function() {
    emailjs.init("sP0Vgz9A-i57UxDc8"); // Replace with your EmailJS public key
})();

// Form submission handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (contactForm) {
        // Form handling with validation and responsive feedback
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Prepare the data for the API call
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Make the API call
        const response = await fetch('https://portfolio-backend-yq1y.onrender.com/api/contact/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        contactForm.appendChild(successMessage);
        
        // Reset the form
        contactForm.reset();
        
        setTimeout(() => successMessage.remove(), 5000);
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.textContent = 'There was an error sending your message. Please try again.';
        contactForm.appendChild(errorMessage);
        
        setTimeout(() => errorMessage.remove(), 5000);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});
    }
});
