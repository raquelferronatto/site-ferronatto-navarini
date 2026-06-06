/* ============================================================
   FERRONATTO E NAVARINI ADVOCACIA — main.js
   ============================================================ */

(function () {
    'use strict';

    // ---- NAVBAR: muda fundo ao rolar ----
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

    // ---- MENU MOBILE (hamburger) ----
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

    hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // ---- LINK ATIVO NA NAVBAR ----
    const sections   = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navAnchors.forEach(function (a) { a.removeAttribute('data-active'); });
                const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
                if (active) active.setAttribute('data-active', '');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });

    // CSS dinâmico para nav-link ativo
    const activeStyle = document.createElement('style');
    activeStyle.textContent = '.nav-link[data-active] { color: var(--gold-light); }';
    document.head.appendChild(activeStyle);

    // ---- ANIMAÇÕES DE ENTRADA (scroll reveal) ----
    const revealEls = document.querySelectorAll(
        '.reveal, .section-header, .sobre-intro, .advogada-card, .area-card, ' +
        '.contato-item, .contato-mapa, .contato-actions'
    );

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });

    // ---- HERO: anima elementos em cascata ao carregar ----
    var heroDelay = 100;
    document.querySelectorAll('.hero-content .reveal').forEach(function (el) {
        setTimeout(function () {
            el.classList.add('visible');
        }, heroDelay);
        heroDelay += 180;
    });

    // ---- SCROLL SUAVE para links âncora ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            var offset = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--nav-h')) || 80;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

})();
