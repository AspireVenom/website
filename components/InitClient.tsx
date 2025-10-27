'use client';

import { useEffect } from 'react';
import AOS from 'aos';

function isHTMLElement<T extends HTMLElement = HTMLElement>(el: Element | null): el is T {
  return !!el && el instanceof HTMLElement;
}

export default function InitClient() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, easing: 'ease-out-cubic', offset: 100, once: true });

    // Typing intro and mobile variant
    const intro = document.querySelector('.intro');
    const cursor = document.getElementById('cursor');

    const isMobile = window.innerWidth <= 768;

    function moveCursorTo(el: Element) {
      if (!isHTMLElement(cursor) || !isHTMLElement(intro)) return;
      const rect = (el as HTMLElement).getBoundingClientRect();
      const introRect = intro.getBoundingClientRect();
      cursor.style.top = `${rect.top - introRect.top}px`;
      cursor.style.left = `${rect.left - introRect.left + rect.width + 2}px`;
    }

    const timeouts: number[] = [];

    if (!isMobile) {
      const line1 = document.getElementById('line1');
      const line2 = document.getElementById('line2');
      const line1Text = 'Douglas Alvarino';
      const line2Text = 'Engineer || Developer || Explorer';
      let i = 0;
      let j = 0;
      // Reset any pre-existing content to avoid doubled characters on HMR/remount
      if (line1) line1.textContent = '';
      if (line2) line2.textContent = '';
      function typeLine1() {
        if (!line1) return;
        if (i < line1Text.length) {
          line1.textContent = (line1.textContent || '') + line1Text.charAt(i);
          moveCursorTo(line1);
          i++;
          timeouts.push(window.setTimeout(typeLine1, 80));
        } else {
          timeouts.push(window.setTimeout(typeLine2, 400));
        }
      }
      function typeLine2() {
        if (!line2) return;
        if (j < line2Text.length) {
          line2.textContent = (line2.textContent || '') + line2Text.charAt(j);
          moveCursorTo(line2);
          j++;
          timeouts.push(window.setTimeout(typeLine2, 80));
        }
      }
      timeouts.push(window.setTimeout(typeLine1, 350));
    }
    if (isMobile && isHTMLElement(intro) && isHTMLElement(cursor)) {
        document.getElementById('line1-container')?.remove();
        document.getElementById('line2-container')?.remove();
        const mobileLines = ['Douglas Alvarino', 'Engineer', 'Developer', 'Explorer'];
        let currentLine = 0;
        let charIndex = 0;
        const lineSpans: HTMLSpanElement[] = [];
        const promptSpans: HTMLSpanElement[] = [];
        for (let i = 0; i < mobileLines.length; i++) {
          const lineDiv = document.createElement('div');
          lineDiv.className = 'terminal-line';
          const promptSpan = document.createElement('span');
          promptSpan.className = 'prompt';
          promptSpan.textContent = '';
          promptSpans.push(promptSpan);
          const span = document.createElement('span');
          span.id = `mobile-line-${i}`;
          lineSpans.push(span);
          lineDiv.appendChild(promptSpan);
          lineDiv.appendChild(span);
          intro.insertBefore(lineDiv, cursor);
        }
        function typeMobileLine() {
          if (currentLine >= mobileLines.length) return;
          const prompt = promptSpans[currentLine];
          const span = lineSpans[currentLine];
          const text = mobileLines[currentLine];
          function typePrompt() {
            prompt.textContent = '> ';
            moveCursorTo(prompt);
            timeouts.push(window.setTimeout(typeWord, 180));
          }
          function typeWord() {
            if (charIndex < text.length) {
              span.textContent = (span.textContent || '') + text.charAt(charIndex);
              moveCursorTo(span);
              charIndex++;
              timeouts.push(window.setTimeout(typeWord, 80));
            } else {
              currentLine++;
              charIndex = 0;
              timeouts.push(window.setTimeout(typeMobileLine, 300));
            }
          }
          typePrompt();
        }
        timeouts.push(window.setTimeout(typeMobileLine, 350));
      }

    // Scroll cue
    const cue = document.getElementById('scroll-cue');
    const aboutSection = document.getElementById('about');
    let scrolled = false;
    function scrollToAbout() {
      if (!scrolled && isHTMLElement(aboutSection)) {
        scrolled = true;
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    cue?.addEventListener('click', scrollToAbout);
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 0) scrollToAbout(); };
    window.addEventListener('wheel', onWheel, { passive: true });

    // Navbar hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const onHamburger = () => {
      hamburger?.classList.toggle('active');
      navLinks?.classList.toggle('show');
    };
    hamburger?.addEventListener('click', onHamburger);
    navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('show');
          hamburger?.classList.remove('active');
        }
      });
    });

    // Skills carousel and filters
    const skillsCarousel = document.getElementById('skills-carousel');
    const skillsCategories = document.getElementById('skills-categories');
    const carouselWrapper = document.querySelector<HTMLElement>('.carousel-skill-card-wrapper');
    const leftArrow = document.getElementById('carousel-left');
    const rightArrow = document.getElementById('carousel-right');
    const filterBar = document.getElementById('skills-filter');
    const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.filter-btn'));
    let allSkillCards = Array.from(document.querySelectorAll<HTMLElement>('.skill-card')).map(card => card.cloneNode(true) as HTMLElement);
    let carouselIndex = 0;
    function showCarouselSkill(idx: number) {
      if (!carouselWrapper) return;
      carouselWrapper.innerHTML = '';
      const card = allSkillCards[idx];
      if (card) {
        carouselWrapper.appendChild(card);
        const progressBar = card.querySelector<HTMLElement>('.progress-bar');
        if (progressBar) {
          const progress = card.dataset.level || '0';
          progressBar.style.setProperty('--progress-width', `${progress}%`);
          card.classList.add('animate');
          setTimeout(() => { progressBar.style.width = `${progress}%`; }, 100);
        }
      }
      leftArrow?.toggleAttribute('disabled', idx === 0);
      rightArrow?.toggleAttribute('disabled', idx === allSkillCards.length - 1);
    }
    function activateCarousel() {
      allSkillCards = Array.from(document.querySelectorAll<HTMLElement>('.skill-card')).map(card => card.cloneNode(true) as HTMLElement);
      if (skillsCarousel) skillsCarousel.style.display = '';
      skillsCategories?.classList.add('hide');
      carouselIndex = 0;
      showCarouselSkill(carouselIndex);
    }
    function deactivateCarousel() {
      if (skillsCarousel) skillsCarousel.style.display = 'none';
      skillsCategories?.classList.remove('hide');
    }
    leftArrow?.addEventListener('click', () => {
      if (carouselIndex > 0) { carouselIndex--; showCarouselSkill(carouselIndex); }
    });
    rightArrow?.addEventListener('click', () => {
      if (carouselIndex < allSkillCards.length - 1) { carouselIndex++; showCarouselSkill(carouselIndex); }
    });
    let skillsStartX = 0;
    let skillsSwiping = false;
    carouselWrapper?.addEventListener('touchstart', (e: TouchEvent) => { skillsStartX = e.touches[0].clientX; skillsSwiping = true; });
    carouselWrapper?.addEventListener('touchmove', (e: TouchEvent) => {
      if (!skillsSwiping) return;
      const diffX = e.touches[0].clientX - skillsStartX;
      if (Math.abs(diffX) > 50) {
        if (diffX < 0 && carouselIndex < allSkillCards.length - 1) { carouselIndex++; showCarouselSkill(carouselIndex); }
        else if (diffX > 0 && carouselIndex > 0) { carouselIndex--; showCarouselSkill(carouselIndex); }
        skillsSwiping = false;
      }
    });
    carouselWrapper?.addEventListener('touchend', () => { skillsSwiping = false; });
    function animateSkillCardProgress(card: HTMLElement) {
      const progressBar = card.querySelector<HTMLElement>('.progress-bar');
      if (!progressBar) return;
      const progress = card.dataset.level || '0';
      progressBar.style.width = '0%';
      progressBar.style.setProperty('--progress-width', `${progress}%`);
      card.classList.remove('animate');
      progressBar.getBoundingClientRect();
      card.classList.add('animate');
      setTimeout(() => { progressBar.style.width = `${progress}%`; }, 100);
    }

    function animateCategory(cat: HTMLElement) {
      cat.querySelectorAll<HTMLElement>('.skill-card').forEach(animateSkillCardProgress);
    }

    filterBar?.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('filter-btn')) return;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');

      const filter = target.dataset.filter;
      if (filter === 'all') {
        activateCarousel();
        return;
      }

      deactivateCarousel();

      const categories = Array.from(document.querySelectorAll<HTMLElement>('.skill-category'));
      const visible: HTMLElement[] = [];
      const hidden: HTMLElement[] = [];
      categories.forEach(cat => {
        if (cat.dataset.category === filter) visible.push(cat);
        else hidden.push(cat);
      });
      hidden.forEach(cat => { cat.style.display = 'none'; });
      visible.forEach(cat => { cat.style.display = ''; animateCategory(cat); });
    });
    const programmingBtn = filterButtons.find(btn => btn.dataset.filter === 'programming');
    if (programmingBtn) setTimeout(() => programmingBtn.click(), 0);

    // Highlight projects carousel
    const track = document.querySelector<HTMLElement>('.carousel-track');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.highlight-node'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentIndex = 0;
    let slideWidth = 0;
    let gapPx = 0;
    function measureSlides() {
      if (!track || nodes.length === 0) return;
      slideWidth = nodes[0].getBoundingClientRect().width;
      const styles = window.getComputedStyle(track);
      // gap may be like "16px"
      const parsed = parseFloat(styles.gap || '0');
      gapPx = Number.isNaN(parsed) ? 0 : parsed;
    }
    function applySlideClasses() {
      nodes.forEach((node, idx) => {
        const isActive = idx === currentIndex;
        const isNear = idx === currentIndex - 1 || idx === currentIndex + 1;
        const isFar = Math.abs(idx - currentIndex) > 1;
        node.classList.toggle('slide--active', isActive);
        node.classList.toggle('slide--near', isNear);
        node.classList.toggle('slide--far', isFar);
      });
    }
    function updateCarousel() {
      if (!track) return;
      const offsetPx = -(slideWidth + gapPx) * currentIndex;
      track.style.transform = `translateX(${offsetPx}px)`;
      applySlideClasses();
    }
    prevBtn?.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateCarousel(); } });
    nextBtn?.addEventListener('click', () => { if (currentIndex < nodes.length - 1) { currentIndex++; updateCarousel(); } });
    let projectStartX = 0;
    let projectSwiping = false;
    track?.addEventListener('touchstart', (e: TouchEvent) => { projectStartX = e.touches[0].clientX; projectSwiping = true; });
    track?.addEventListener('touchmove', (e: TouchEvent) => {
      if (!projectSwiping) return;
      const diffX = e.touches[0].clientX - projectStartX;
      if (Math.abs(diffX) > 50) {
        if (diffX < 0 && currentIndex < nodes.length - 1) currentIndex++;
        else if (diffX > 0 && currentIndex > 0) currentIndex--;
        updateCarousel();
        projectSwiping = false;
      }
    });
    track?.addEventListener('touchend', () => { projectSwiping = false; });
    activateCarousel();
    measureSlides();
    updateCarousel();
    const onResizeCarousel = () => { measureSlides(); updateCarousel(); };
    window.addEventListener('resize', onResizeCarousel);

    // Navbar hide/show on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) navbar?.classList.add('navbar-hidden');
      else navbar?.classList.remove('navbar-hidden');
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Matrix background canvas under #landing
    const landingEl = document.getElementById('landing') as HTMLDivElement | null;
    if (landingEl) {
      const matrixCanvas = document.createElement('canvas');
      const landing = landingEl; // narrow for inner closures
      landing.style.position = 'relative';
      landing.appendChild(matrixCanvas);
      const ctx = matrixCanvas.getContext('2d');
      if (!ctx) {
        // Cleanup fallback
        return () => {
          window.removeEventListener('wheel', onWheel);
          window.removeEventListener('scroll', onScroll);
          hamburger?.removeEventListener('click', onHamburger);
        };
      }
      const context: CanvasRenderingContext2D = ctx;
      // Style assignments
      matrixCanvas.style.position = 'absolute';
      matrixCanvas.style.top = '0';
      matrixCanvas.style.left = '0';
      matrixCanvas.style.width = '100%';
      matrixCanvas.style.height = '100%';
      matrixCanvas.style.zIndex = '0';
      matrixCanvas.style.pointerEvents = 'none';
      matrixCanvas.style.opacity = '0.08';
      matrixCanvas.style.transition = 'opacity 0.3s ease';

      const letters = '01アカサタナハマヤラ0123456789';
      const fontSize = 14;
      let drops: number[] = [];
      let lastWidth = 0;
      let lastHeight = 0;
      function resizeMatrixCanvas(force = false) {
        const width = landing.clientWidth;
        const height = window.innerHeight;
        if (!force && width === lastWidth && height === lastHeight) return;
        const oldColumns = drops.length;
        const newColumns = Math.floor(width / fontSize);
        if (matrixCanvas.width !== width) matrixCanvas.width = width;
        if (matrixCanvas.height !== height) matrixCanvas.height = height;
        if (newColumns !== oldColumns) {
          const oldDrops = [...drops];
          drops.length = newColumns;
          for (let i = 0; i < newColumns; i++) {
            drops[i] = oldDrops[i] || 1;
          }
        }
        context.font = "14px 'Courier New', monospace";
        lastWidth = width;
        lastHeight = height;
      }
      function drawMatrix() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        context.fillStyle = '#0f0';
        for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          context.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > matrixCanvas.height || Math.random() > 0.975) { drops[i] = 0; }
          drops[i]++;
        }
      }
      resizeMatrixCanvas(true);
      const interval = window.setInterval(drawMatrix, 50);
      let resizeTimeout: number | undefined;
      const onResize = () => {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => resizeMatrixCanvas(), 200) as unknown as number;
      };
      window.addEventListener('resize', onResize);
      // Cleanup canvas listeners/interval
      return () => {
      timeouts.forEach(id => window.clearTimeout(id));
      window.removeEventListener('resize', onResize);
      window.removeEventListener('resize', onResizeCarousel);
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('scroll', onScroll);
        hamburger?.removeEventListener('click', onHamburger);
        window.clearInterval(interval);
      };
    }
    // Cleanup for non-canvas case
    return () => {
      timeouts.forEach(id => window.clearTimeout(id));
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResizeCarousel);
      hamburger?.removeEventListener('click', onHamburger);
    };
  }, []);

  return null;
}


