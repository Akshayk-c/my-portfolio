// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

function initializeNavigation() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu li > a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // Initialize navigation active states
    setupNavigationActiveStates();
}

function setupNavigationActiveStates() {
    // Track if user clicked a menu item (to prevent scroll from overriding)
    let isUserClick = false;
    let clickTimeout = null;
    let lastActiveHash = '#home';

    // Function to update active navigation item
    function updateActiveNav(hash) {
        if (!hash) return;
        
        // Select all nav menu links (li>a)
        const navLinks = document.querySelectorAll('.nav-menu li > a');
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the matching link
        navLinks.forEach(link => {
            const linkHash = link.getAttribute('href');
            if (linkHash === hash || linkHash === `#${hash}`) {
                link.classList.add('active');
                lastActiveHash = hash;
            }
        });
    }

    // Smooth Scrolling with immediate active class update - specifically for nav menu
    const navMenuLinks = document.querySelectorAll('.nav-menu li > a[href^="#"]');
    
    navMenuLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            const hash = this.getAttribute('href');
            const target = document.querySelector(hash);
            
            if (target) {
                // Immediately update active class on click - BEFORE scrolling
                isUserClick = true;
                updateActiveNav(hash);
                
                // Force a reflow to ensure class is applied
                void anchor.offsetWidth;
                
                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Clear the user click flag after scroll completes
                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => {
                    isUserClick = false;
                }, 2000); // Wait 2 seconds after click before allowing scroll to update
            }
        });
    });

    // Also handle other anchor links (like buttons) but don't update nav
    document.querySelectorAll('a[href^="#"]:not(.nav-menu a)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            const target = document.querySelector(hash);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active menu item based on scroll position (only if user didn't click)
    function setActiveNavOnScroll() {
        // Don't update if user just clicked a menu item
        if (isUserClick) {
            return;
        }
        
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu li > a');
        
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // Only update if we found a current section
        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                    lastActiveHash = `#${current}`;
                }
            });
        }
        
        // Handle home section when at top
        if (scrollY < 150) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                    lastActiveHash = '#home';
                }
            });
        }
    }

    // Debounced scroll handler to improve performance
    let scrollTimeout;
    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            setActiveNavOnScroll();
        }, 150); // Debounce scroll events
    }

    // Update active nav on scroll
    window.addEventListener('scroll', handleScroll);
    // Set initial active state
    window.addEventListener('load', () => {
        setActiveNavOnScroll();
    });
    
    // Also set initial state on DOM ready
    setTimeout(() => {
        setActiveNavOnScroll();
    }, 100);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission (you can replace this with actual API call)
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Enhanced Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }, index * 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe work cards with stagger animation
document.querySelectorAll('.work-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Observe skill tags with stagger animation
document.querySelectorAll('.skill-tag').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px) scale(0.9)';
    el.style.transition = `opacity 0.4s ease ${index * 0.03}s, transform 0.4s ease ${index * 0.03}s`;
    observer.observe(el);
});

// Observe section titles
document.querySelectorAll('.section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Observe about content
document.querySelectorAll('.about-content, .about-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero && scrolled < hero.offsetHeight) {
        // Parallax for floating shapes
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add cursor trail effect (optional, can be disabled for performance)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        cursorTrail.push(trail);
        
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (trail && trail.parentNode) {
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0)';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 300);
            }
        }, 100);
    }
});

// Add cursor trail CSS
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translate(-50%, -50%);
    }
`;
document.head.appendChild(cursorStyle);

// Animate skill tags on hover with random delay
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'bounce 0.5s ease';
        }, 10);
    });
});

// Smooth reveal animation for work cards
document.querySelectorAll('.work-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

