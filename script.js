/* ============================================
   PORTFOLIO SCRIPT - Figlio Otniel Suliktyono
   ============================================ */

// ============================================
// 1. THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const htmlEl      = document.documentElement;

function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ============================================
// 2. NAVBAR SCROLL STATE
// ============================================
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load

// ============================================
// 3. SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPct  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrolledPct + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ============================================
// 4. ACTIVE NAV LINK (INTERSECTION OBSERVER)
// ============================================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ============================================
// 5. HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
        closeMenu();
    } else {
        hamburger.classList.add('active');
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// ============================================
// 6. TYPING ANIMATION
// ============================================
const typingEl   = document.getElementById('typingText');
const typingRoles = [
    'Web Developer',
    'Laravel Developer',
    'Sistem Informasi Student',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeWriter() {
    const currentRole = typingRoles[roleIndex];

    if (isDeleting) {
        charIndex--;
        typingEl.textContent = currentRole.substring(0, charIndex);
    } else {
        charIndex++;
        typingEl.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 1800; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % typingRoles.length;
        delay = 400;
    }

    typingTimeout = setTimeout(typeWriter, delay);
}

// Start typing after hero animation completes
setTimeout(typeWriter, 800);

// ============================================
// 7. SCROLL REVEAL (.reveal -> .visible)
// ============================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // once
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// 8. SKILL BAR ANIMATION
// ============================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill      = entry.target;
            const targetPct = fill.getAttribute('data-width');
            // Small timeout for visual stagger
            setTimeout(() => {
                fill.style.width = targetPct + '%';
            }, 200);
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ============================================
// 9. COUNTER ANIMATION (STATS)
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el, target, duration) {
    const start     = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed  = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(start + (target - start) * eased);
        el.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el     = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10);
            animateCounter(el, target, 1500);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// ============================================
// SMOOTH ANCHOR SCROLLING (OFFSET FOR NAVBAR)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        e.preventDefault();
        const offset = navbar.offsetHeight + 8;
        const top    = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ============================================
// 9. LANGUAGE TOGGLE
// ============================================
const langToggle = document.getElementById('langToggle');
if(langToggle) {
    langToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const isId = html.getAttribute('data-lang') === 'id';
        html.setAttribute('data-lang', isId ? 'en' : 'id');
        langToggle.textContent = isId ? 'ID' : 'EN';
    });
}

// ============================================
// 10. CAROUSEL LOGIC
// ============================================
document.querySelectorAll('.exp-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const imgs = carousel.querySelectorAll('.carousel-img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    let index = 0;
    let interval;

    // Create dots
    imgs.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');

    function goTo(i) {
        index = i;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
        resetInterval();
    }

    function nextSlide() {
        index = (index + 1) % imgs.length;
        goTo(index);
    }

    function prevSlide() {
        index = (index - 1 + imgs.length) % imgs.length;
        goTo(index);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 3000); // 3 seconds auto-slide
    }
    resetInterval();
});
