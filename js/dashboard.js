/* ================================================
   HUMANE — Dashboard JavaScript
================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Sidebar toggle ──
    const sidebar = document.getElementById('dashSidebar');
    const overlay = document.getElementById('dashOverlay');
    const topbarHamburger = document.getElementById('topbarHamburger');

    function openSidebar() {
        sidebar && sidebar.classList.add('open');
        overlay && overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
        sidebar && sidebar.classList.remove('open');
        overlay && overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    topbarHamburger && topbarHamburger.addEventListener('click', openSidebar);
    overlay && overlay.addEventListener('click', closeSidebar);

    // Close sidebar on resize > 1024
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) closeSidebar();
    });

    // ── Notifications dropdown ──
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('open');
        });
        document.addEventListener('click', () => notifDropdown.classList.remove('open'));
    }

    // ── Animate bars ──
    const bars = document.querySelectorAll('.bar[data-height]');
    if (bars.length) {
        setTimeout(() => {
            bars.forEach(bar => {
                bar.style.height = bar.getAttribute('data-height');
            });
        }, 300);
    }

    // ── Active sidebar link ──
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === currentPage) link.classList.add('active');
    });

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../pages/login.html';
            }
        });
    }

    // Book inspection form submit
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookForm.querySelector('button[type="submit"]');
            btn.textContent = 'Booking...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ Inspection Booked!';
                btn.style.background = 'var(--success)';
                setTimeout(() => {
                    btn.textContent = 'Book Inspection';
                    btn.style.background = '';
                    btn.disabled = false;
                    bookForm.reset();
                }, 2500);
            }, 1200);
        });
    }
});
