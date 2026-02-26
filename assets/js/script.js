// ============================================================
// PORTFOLIO — MAIN SCRIPT (Dark Theme Edition)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Mark body so CSS knows JS is active (enables scroll-reveal animation).
    // Without this flag, all .reveal elements stay visible (graceful fallback).
    document.body.classList.add('js-ready');

    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initContactForm();
    initButtonRipple();
    initCardGlow();

    // Safety net: force-show everything after 2.5 s in case observer never fires
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }, 2500);
});

// ────────────────────────────────────────────────────────────
// 1. NAVBAR — scrolled state + active link tracking
// ────────────────────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    let userClicked = false;
    let clickTimeout = null;

    function setActive(hash) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === hash));
    }

    function onScroll() {
        // Scrolled class
        navbar.classList.toggle('scrolled', window.scrollY > 40);

        if (userClicked) return;

        let current = '#home';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 160) {
                current = '#' + s.id;
            }
        });
        setActive(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smooth scroll on nav click
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const hash = link.getAttribute('href');
            const target = document.querySelector(hash);
            if (!target) return;
            e.preventDefault();

            userClicked = true;
            setActive(hash);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => { userClicked = false; }, 1500);
        });
    });

    // Smooth scroll for non-nav anchors
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
}

// ────────────────────────────────────────────────────────────
// 2. MOBILE MENU
// ────────────────────────────────────────────────────────────
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    const toggle = (open) => {
        hamburger.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        document.body.classList.toggle('menu-open', open);
    };

    hamburger.addEventListener('click', e => {
        e.stopPropagation();
        toggle(!navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

    document.addEventListener('click', e => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            toggle(false);
        }
    });
}

// ────────────────────────────────────────────────────────────
// 3. SCROLL REVEAL
// ────────────────────────────────────────────────────────────
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const siblings = Array.from(
                entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
            );
            const delay = siblings.indexOf(entry.target) * 70;

            setTimeout(() => entry.target.classList.add('visible'), Math.min(delay, 400));
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(el => observer.observe(el));
}

// ────────────────────────────────────────────────────────────
// 4. CONTACT FORM
// ────────────────────────────────────────────────────────────
function initContactForm() {
    const form = document.getElementById('contactForm');
    const msgBox = document.getElementById('formMessage');
    if (!form || !msgBox) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const btn = form.querySelector('[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        msgBox.className = 'form-message';
        msgBox.style.display = 'none';

        const payload = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
            to: 'akshay'
        };

        try {
            const res = await fetch('https://portfolio-backend-yq1y.onrender.com/api/contact/mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await res.json();

            if (res.ok) {
                msgBox.textContent = `✓ Message sent! I'll get back to you soon.`;
                msgBox.className = 'form-message success';
                form.reset();
            } else {
                msgBox.textContent = result.message || 'Something went wrong.';
                msgBox.className = 'form-message error';
            }
        } catch {
            msgBox.textContent = 'Network error — please try again later.';
            msgBox.className = 'form-message error';
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            msgBox.style.display = 'block';
            setTimeout(() => { msgBox.style.display = 'none'; }, 6000);
        }
    });
}

// ────────────────────────────────────────────────────────────
// 5. BUTTON RIPPLE
// ────────────────────────────────────────────────────────────
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                width:${size}px; height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top - size / 2}px;
            `;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
}

// ────────────────────────────────────────────────────────────
// 6. CARD GLOW EFFECT
// ────────────────────────────────────────────────────────────
function initCardGlow() {
    const cards = document.querySelectorAll('.work-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

window.addEventListener('load', () => document.body.classList.add('loaded'));
