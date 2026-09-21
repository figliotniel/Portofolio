/* ==========================================================================
   PORTFOLIO SCRIPT 2.0 - FIGLIO OTNIEL SULIKTYONO
   Features:
   - Theme Switcher with meta theme-color sync
   - Interactive Mouse Spotlight Effect (Linear/Raycast style)
   - 3D Tilt Developer Pass
   - One-Click Copy Email with Floating Toast Notification
   - Bilingual Terminal Typing Animation
   - Accessible Carousel with Pause-on-Hover (WCAG 2.2)
   - Scrollspy & Smooth Scrolling
   ========================================================================== */

// 1. THEME SWITCHER WITH META THEME-COLOR SYNC
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const htmlEl      = document.documentElement;

function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Ganti ke tema terang / Switch to light mode');
    } else {
        themeIcon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Ganti ke tema gelap / Switch to dark mode');
    }

    // Sync mobile address bar theme-color
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = theme === 'dark' ? '#070a12' : '#f8fafc';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// 2. NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
function handleNavbarScroll() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// 3. SCROLL PROGRESS BAR
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
    const scrollTop   = window.scrollY;
    const docHeight   = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrolledPct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// 4. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let targetId = entry.target.id;
            if (targetId === 'credentials') {
                targetId = 'home';
            }
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + targetId) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

// 5. MOBILE MENU (HAMBURGER) WITH ACCESSIBILITY
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
}

function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
}

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
    }
});

// 6. TERMINAL TYPING ANIMATION (BILINGUAL)
const typingEl = document.getElementById('typingText');
const rolesId = [
    'figlio.role = "Web Developer";',
    'figlio.role = "Laravel Specialist";',
    'figlio.role = "Systems Architecture";',
    'figlio.role = "Mhs. Sistem Informasi";',
    'figlio.status = "Open For Collaboration";'
];
const rolesEn = [
    'figlio.role = "Web Developer";',
    'figlio.role = "Laravel Specialist";',
    'figlio.role = "Systems Architecture";',
    'figlio.role = "Information Systems Student";',
    'figlio.status = "Open For Collaboration";'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeWriter() {
    const isId = document.documentElement.getAttribute('data-lang') === 'id';
    const typingRoles = isId ? rolesId : rolesEn;
    roleIndex = roleIndex % typingRoles.length;
    const currentRole = typingRoles[roleIndex];

    if (isDeleting) {
        charIndex--;
        typingEl.textContent = currentRole.substring(0, charIndex);
    } else {
        charIndex++;
        typingEl.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % typingRoles.length;
        delay = 400;
    }

    typingTimeout = setTimeout(typeWriter, delay);
}
setTimeout(typeWriter, 600);

// 7. SCROLL REVEAL (.reveal -> .visible)
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObserver.observe(el));

// 8. SMOOTH SCROLLING WITH NAVBAR OFFSET
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        
        e.preventDefault();
        const offset = navbar.offsetHeight + 14;
        const top    = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// 9. LANGUAGE TOGGLE
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const isId = htmlEl.getAttribute('data-lang') === 'id';
        const nextLang = isId ? 'en' : 'id';
        
        htmlEl.setAttribute('data-lang', nextLang);
        htmlEl.setAttribute('lang', nextLang);
        langToggle.textContent = isId ? 'ID' : 'EN';
        langToggle.setAttribute('aria-label', isId ? 'Ubah bahasa ke Indonesia' : 'Switch language to English');
        
        if (!isDeleting) {
            isDeleting = true;
        }
    });
}

// 10. ACCESSIBLE CAROUSEL (UGM DOCUMENTATION)
document.querySelectorAll('.exp-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const imgs  = carousel.querySelectorAll('.carousel-img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prev  = carousel.querySelector('.prev');
    const next  = carousel.querySelector('.next');
    let index = 0;
    let interval = null;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create accessible button dots
    imgs.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Slide ${i + 1} of ${imgs.length}`);
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');

    function goTo(i) {
        index = i;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach((d, idx) => {
            if (idx === index) {
                d.classList.add('active');
                d.setAttribute('aria-current', 'true');
            } else {
                d.classList.remove('active');
                d.removeAttribute('aria-current');
            }
        });
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

    if (next) next.addEventListener('click', nextSlide);
    if (prev) prev.addEventListener('click', prevSlide);

    function startInterval() {
        if (isReducedMotion) return;
        clearInterval(interval);
        interval = setInterval(nextSlide, 3800);
    }

    function stopInterval() {
        clearInterval(interval);
    }

    function resetInterval() {
        stopInterval();
        startInterval();
    }

    carousel.addEventListener('mouseenter', stopInterval);
    carousel.addEventListener('mouseleave', startInterval);
    carousel.addEventListener('focusin', stopInterval);
    carousel.addEventListener('focusout', startInterval);

    startInterval();
});

const spotlightTargets = document.querySelectorAll('.bento-card, .credential-card, .skill-card, .connect-hub-card');
if (window.matchMedia('(hover: hover)').matches) {
    spotlightTargets.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// 12. 3D TILT EFFECT ON HERO PORTRAIT STAGE
const heroPortrait = document.getElementById('heroPortrait');
if (heroPortrait && window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroPortrait.addEventListener('mousemove', (e) => {
        const rect = heroPortrait.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        heroPortrait.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    heroPortrait.addEventListener('mouseleave', () => {
        heroPortrait.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
}

// 13. ONE-CLICK COPY EMAIL TO CLIPBOARD WITH TOAST
const emailStr = 'otnielfiglio@gmail.com';
const toast = document.getElementById('copyToast');
const toastMsg = document.getElementById('toastMsg');
let toastTimer;

function showToast(msg) {
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

function copyEmailAction() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailStr).then(() => {
            const isId = htmlEl.getAttribute('data-lang') === 'id';
            showToast(isId ? 'Email berhasil disalin ke clipboard! ✨' : 'Email copied to clipboard! ✨');
        }).catch(() => {
            window.location.href = `mailto:${emailStr}`;
        });
    } else {
        window.location.href = `mailto:${emailStr}`;
    }
}

const btnCopyEmail = document.getElementById('btnCopyEmail');
if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', copyEmailAction);
}

const navCopyEmail = document.getElementById('navCopyEmail');
if (navCopyEmail) {
    navCopyEmail.addEventListener('click', copyEmailAction);
}
