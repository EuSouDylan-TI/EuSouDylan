(function () {
      'use strict';
      // 1. Ano dinâmico no rodapé
      const yearEl = document.getElementById('currentYear');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
      // 2. Navbar com efeito glassmorphism ao rolar e destaque de seção ativa
      const navbar = document.getElementById('navbar');
      const sections = document.querySelectorAll('main section[id]');
      const navLinks = document.querySelectorAll('.nav-link');

      function handleScroll() {
        if (window.scrollY > 24) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Atualiza link ativo na barra de navegação
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach((section) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSectionId = section.getAttribute('id');
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
          }
        });
      }

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      // 3. Menu responsivo mobile
      const mobileToggle = document.getElementById('mobileToggle');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileLinks = document.querySelectorAll('.mobile-link');

      if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
          const isOpen = mobileMenu.classList.toggle('open');
          mobileToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mobileLinks.forEach((link) => {
          link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
          });
        });
      }

      // 4. Animação suave de entrada com IntersectionObserver
      const revealElements = document.querySelectorAll('.reveal');

      if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
          }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
      } else {
        // Fallback para navegadores antigos
        revealElements.forEach((el) => el.classList.add('is-visible'));
      }

      // 5. Filtro interativo de projetos
      const filterButtons = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');

      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const selectedFilter = btn.getAttribute('data-filter');

          filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          projectCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedFilter === 'all' || cardCategory === selectedFilter) {
              card.classList.remove('hidden');
              card.classList.add('is-visible');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });

      // 6. Copiar e-mail com fallback compatível com iframes (execCommand)
      const copyEmailBtn = document.getElementById('copyEmailBtn');
      const toast = document.getElementById('toast');
      let toastTimer = null;

      function showToast() {
        if (!toast) return;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('show');
        }, 3200);
      }

      if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
          const email = copyEmailBtn.getAttribute('data-email') || '';
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          tempInput.setAttribute('readonly', '');
          tempInput.style.position = 'absolute';
          tempInput.style.left = '-9999px';
          document.body.appendChild(tempInput);
          tempInput.select();

          try {
            document.execCommand('copy');
            showToast();
          } catch (err) {
            console.error('Não foi possível copiar o e-mail:', err);
          } finally {
            document.body.removeChild(tempInput);
          }
        });
      }
    })();