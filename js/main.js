/* ================================================
   HUMANE — Global JavaScript
================================================ */

// ── Theme ──
const getTheme = () => localStorage.getItem('humane-theme') || 'light';
const setTheme = (t) => { document.documentElement.setAttribute('data-theme', t); localStorage.setItem('humane-theme', t); };
const toggleTheme = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark');

// ── RTL ──
const getRTL = () => localStorage.getItem('humane-rtl') === 'true';
const setRTL = (v) => { document.documentElement.setAttribute('dir', v ? 'rtl' : 'ltr'); localStorage.setItem('humane-rtl', v); };
const toggleRTL = () => setRTL(!getRTL());

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    setTheme(getTheme());
    setRTL(getRTL());

    // Theme toggles
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => { toggleTheme(); updateThemeIcon(); });
    });

    // RTL toggles
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
        btn.addEventListener('click', () => { toggleRTL(); updateRTLIcon(); });
    });

    updateThemeIcon();
    updateRTLIcon();

    // Mobile nav
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    const mobileClose = document.getElementById('mobileNavClose');

    function openNav() {
        if (!mobileNav) return;
        mobileNav.classList.add('open');
        overlay && overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeNav() {
        if (!mobileNav) return;
        mobileNav.classList.remove('open');
        overlay && overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger && hamburger.addEventListener('click', openNav);
    mobileClose && mobileClose.addEventListener('click', closeNav);
    overlay && overlay.addEventListener('click', closeNav);

    // Active nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a, .mobile-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (revealEls.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.1 });
        revealEls.forEach(el => obs.observe(el));
    }

    // Scroll top
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Smooth number counter
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            obs.unobserve(el);
            let start = 0;
            const step = () => {
                start += Math.ceil(target / 60);
                if (start >= target) { el.textContent = target.toLocaleString() + (el.dataset.suffix || ''); return; }
                el.textContent = start.toLocaleString() + (el.dataset.suffix || '');
                requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, { threshold: 0.5 });
        obs.observe(el);
    });
});

function updateThemeIcon() {
    const isDark = getTheme() === 'dark';
    document.querySelectorAll('[data-theme-toggle] svg').forEach(svg => {
        svg.innerHTML = isDark
            ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m9.9 9.9 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m9.9-9.9 1.41-1.41"/>'
            : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    });
}

function updateRTLIcon() {
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
        btn.title = getRTL() ? 'Switch to LTR' : 'Switch to RTL';
    });
}
