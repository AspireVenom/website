function initTerminalIntro() {
  const isMobile = window.innerWidth <= 768;
  const intro = document.querySelector(".intro");
  const cursor = document.getElementById("cursor");

  // Modal helpers
  const connectModal = document.getElementById('connect-modal');
  const connectBackdrop = document.getElementById('connect-backdrop');
  const connectClose = document.getElementById('connect-close');
  const connectCopyEmail = document.getElementById('connect-copy-email');
  function openConnectModal() {
    if (!connectModal) return;
    const open = () => {
      if (connectCue) connectCue.style.display = 'none';
      connectModal.style.display = 'flex';
      connectModal.classList.add('show');
      connectModal.setAttribute('aria-hidden', 'false');
    };
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        open();
      });
    } else {
      open();
    }
  }
  function closeConnectModal() {
    if (!connectModal) return;
    const close = () => {
      connectModal.classList.remove('show');
      connectModal.style.display = 'none';
      connectModal.setAttribute('aria-hidden', 'true');
      if (connectCue) connectCue.style.display = '';
    };
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        close();
      });
    } else {
      close();
    }
  }
  function wireModal() {
    if (connectBackdrop) connectBackdrop.addEventListener('click', closeConnectModal);
    if (connectClose) connectClose.addEventListener('click', closeConnectModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeConnectModal();
    });
    if (connectCopyEmail) {
      connectCopyEmail.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText('douglitandres@gmail.com');
          const prev = connectCopyEmail.textContent;
          connectCopyEmail.textContent = 'Copied!';
          setTimeout(() => (connectCopyEmail.textContent = prev), 1000);
        } catch {}
      });
    }
  }
  wireModal();

  // Reopen modal cue button
  const connectCue = document.getElementById('connect-cue');
  if (connectCue) {
    connectCue.addEventListener('click', () => {
      openConnectModal();
    });
    // Collapse the connect cue when scrolled past hero
    const landing = document.getElementById('landing');
    if (landing) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            connectCue.classList.remove('collapsed');
          } else {
            connectCue.classList.add('collapsed');
          }
        });
      }, { threshold: 0.1 });
      observer.observe(landing);
    }
  }

  // Blog cue: collapse/expand similar to connect cue
  const blogCue = document.querySelector('.blog-cue');
  if (blogCue) {
    const landing = document.getElementById('landing');
    if (landing) {
      const toggleByVisibility = (isVisible) => {
        if (isVisible) blogCue.classList.remove('collapsed');
        else blogCue.classList.add('collapsed');
      };

      // Primary: IntersectionObserver
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => toggleByVisibility(entry.isIntersecting));
        }, { threshold: 0.1 });
        observer.observe(landing);
      }

      // Fallback: scroll/resize check
      const checkLandingInView = () => {
        const rect = landing.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const inView = rect.bottom > 0 && rect.top < viewportH * 0.9;
        toggleByVisibility(inView);
      };
      window.addEventListener('scroll', checkLandingInView, { passive: true });
      window.addEventListener('resize', checkLandingInView);
      // Initial state
      checkLandingInView();
    }
  }

  function moveCursorTo(el) {
    const rect = el.getBoundingClientRect();
    const introRect = intro.getBoundingClientRect();
    cursor.style.top = `${rect.top - introRect.top}px`;
    cursor.style.left = `${rect.left - introRect.left + rect.width + 2}px`;
  }

  if (!isMobile) {
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const ctaPacmanContainer = document.getElementById("cta-pacman-container");
    const ctaPacman = document.getElementById("cta-pacman");
    const ctaContainer = document.getElementById("cta-container");
    const ctaLine = document.getElementById("cta-line");
    const ctaButtons = document.getElementById("cta-buttons");
    const line1Text = "Douglas Alvarino";
    const line2Text = "Engineer | Developer | Explorer";
    const pacmanText = "sudo pacman -S douglas-connect";
    const askText = "Let's connect? (Type Y/N)";
    let i = 0, j = 0;
    let k = 0, m = 0;

    function typeLine1() {
      if (i < line1Text.length) {
        line1.textContent += line1Text.charAt(i);
        moveCursorTo(line1);
        i++;
        setTimeout(typeLine1, 80);
      } else {
        setTimeout(typeLine2, 400);
      }
    }

    function typeLine2() {
      if (j < line2Text.length) {
        line2.textContent += line2Text.charAt(j);
        moveCursorTo(line2);
        j++;
        setTimeout(typeLine2, 80);
      } else {
        // reveal and type pacman line
        if (ctaPacmanContainer) ctaPacmanContainer.style.display = "block";
        setTimeout(typePacman, 350);
      }
    }

    function typePacman() {
      if (k < pacmanText.length) {
        ctaPacman.textContent += pacmanText.charAt(k);
        moveCursorTo(ctaPacman);
        k++;
        setTimeout(typePacman, 60);
      } else {
        // newline ask
        if (ctaContainer) ctaContainer.style.display = "block";
        setTimeout(typeAsk, 250);
      }
    }

    function typeAsk() {
      if (m < askText.length) {
        ctaLine.textContent += askText.charAt(m);
        moveCursorTo(ctaLine);
        m++;
        setTimeout(typeAsk, 60);
      } else {
        enableCtaInteractions();
      }
    }

    function enableCtaInteractions() {
      // keyboard inline input with buffer, accept y/n or yes/no (case-insensitive)
      const baseAsk = askText;
      let inputBuffer = "";
      const renderBuffer = () => {
        ctaLine.textContent = `${baseAsk} ${inputBuffer}`;
        moveCursorTo(ctaLine);
      };
      const finalize = (choice) => {
        const normalized = (choice || '').trim().toUpperCase();
        inputBuffer = normalized;
        renderBuffer();
        if (ctaButtons) ctaButtons.style.display = 'none';
        if (normalized === 'Y' || normalized === 'YES') {
          window.removeEventListener('keydown', keyListener);
          simulateInstall(openConnectModal);
        } else if (normalized === 'N' || normalized === 'NO') {
          window.removeEventListener('keydown', keyListener);
          simulateAbort();
        }
      };
      const keyListener = (e) => {
        const key = e.key;
        if (key === 'y' || key === 'Y') { finalize('Y'); return; }
        if (key === 'n' || key === 'N') { finalize('N'); return; }
        if (key === 'Backspace') { inputBuffer = inputBuffer.slice(0, -1); renderBuffer(); return; }
        if (key === 'Enter') {
          const v = inputBuffer.trim().toLowerCase();
          if (v === 'y' || v === 'yes') { finalize('YES'); return; }
          if (v === 'n' || v === 'no') { finalize('NO'); return; }
          return;
        }
        if (key.length === 1 && /[a-zA-Z]/.test(key)) { inputBuffer += key; renderBuffer(); }
      };
      window.addEventListener('keydown', keyListener);
      // optional on-screen buttons for accessibility
      if (ctaButtons) {
        ctaButtons.style.display = 'none';
        ctaButtons.addEventListener('click', (e) => {
          const target = e.target;
          if (target && target.dataset && target.dataset.answer) {
            finalize(target.dataset.answer);
          }
        }, { once: true });
      }
    }

    function createTypedLine(text, speed, cb) {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'terminal-line';
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = '> ';
      const span = document.createElement('span');
      lineDiv.appendChild(prompt);
      lineDiv.appendChild(span);
      intro.insertBefore(lineDiv, cursor);
      let idx = 0;
      (function type() {
        if (idx < text.length) {
          span.textContent += text.charAt(idx);
          moveCursorTo(span);
          idx++;
          setTimeout(type, speed);
        } else {
          if (cb) cb();
        }
      })();
    }

    function simulateInstall(done) {
      const steps = [
        'resolving dependencies...',
        'looking for conflicting packages...',
        'Packages (1) douglas-connect-1.0-1',
        'Total Installed Size: 0.0 MiB',
        'checking keys in keyring...',
        'verifying package integrity...',
        'loading package files...',
        'checking for file conflicts...',
        'installing douglas-connect...',
        'done.',
        'launching connect options...'
      ];
      let s = 0;
      (function next() {
        if (s >= steps.length) { if (done) setTimeout(done, 250); return; }
        createTypedLine(steps[s], 18, () => setTimeout(next, 120));
        s++;
      })();
    }

    function simulateAbort() {
      const steps = [
        'error: operation cancelled by user',
        'aborting...'
      ];
      let s = 0;
      (function next() {
        if (s >= steps.length) { setTimeout(() => {
          const about = document.getElementById('about');
          if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400); return; }
        createTypedLine(steps[s], 22, () => setTimeout(next, 120));
        s++;
      })();
    }

    setTimeout(typeLine1, 350);
  } else {
    const introEl = document.querySelector(".intro");
    const cursorEl = document.getElementById("cursor");
    // Remove the two static lines
    const l1 = document.getElementById("line1-container");
    const l2 = document.getElementById("line2-container");
    if (l1) l1.remove();
    if (l2) l2.remove();
    const mobileLines = [
      "Douglas Alvarino",
      "Engineer",
      "Developer",
      "Explorer",
      "sudo pacman -S douglas-connect",
      "I am open to Work!",
      "Let's connect? YES / NO"
    ];
    let currentLine = 0;
    let charIndex = 0;
    let lineSpans = [];
    let promptSpans = [];

    // Create four terminal-line elements
    for (let i = 0; i < mobileLines.length; i++) {
      const lineDiv = document.createElement("div");
      lineDiv.className = "terminal-line";
      const promptSpan = document.createElement("span");
      promptSpan.className = "prompt";
      promptSpan.textContent = ""; // Will animate in
      promptSpans.push(promptSpan);
      const span = document.createElement("span");
      span.id = `mobile-line-${i}`;
      lineSpans.push(span);
      lineDiv.appendChild(promptSpan);
      lineDiv.appendChild(span);
      introEl.insertBefore(lineDiv, cursorEl);
    }

    function typeMobileLine() {
      if (currentLine >= mobileLines.length) return;
      const prompt = promptSpans[currentLine];
      const span = lineSpans[currentLine];
      const text = mobileLines[currentLine];
      // Step 1: Animate the prompt '>'
      function typePrompt() {
        prompt.textContent = "> ";
        moveCursorTo(prompt);
        setTimeout(typeWord, 180);
      }
      // Step 2: Animate the word
      function typeWord() {
        if (charIndex < text.length) {
          span.textContent += text.charAt(charIndex);
          moveCursorTo(span);
          charIndex++;
          setTimeout(typeWord, 80);
        } else {
          // after last line, enable simple tap buttons for Y/N
          if (currentLine === mobileLines.length - 1) {
            enableMobileCTA();
          }
          currentLine++;
          charIndex = 0;
          setTimeout(typeMobileLine, 300);
        }
      }
      typePrompt();
    }
    setTimeout(typeMobileLine, 350);

    function enableMobileCTA() {
      // Replace the last line's text with inline YES/NO buttons
      const askSpan = lineSpans[lineSpans.length - 1];
      if (!askSpan) return;
      function moveCursorToEl(el) { const rect = el.getBoundingClientRect(); const introRect = introEl.getBoundingClientRect(); cursorEl.style.top = `${rect.top - introRect.top}px`; cursorEl.style.left = `${rect.left - introRect.left + rect.width + 2}px`; }
      askSpan.textContent = '';
      const textNode = document.createTextNode("Let's connect? ");
      const yesBtn = document.createElement('button');
      yesBtn.className = 'cta-btn';
      yesBtn.dataset.answer = 'YES';
      yesBtn.textContent = 'YES';
      const space = document.createTextNode(' ');
      const noBtn = document.createElement('button');
      noBtn.className = 'cta-btn';
      noBtn.dataset.answer = 'NO';
      noBtn.textContent = 'NO';
      askSpan.appendChild(textNode);
      askSpan.appendChild(yesBtn);
      askSpan.appendChild(space);
      askSpan.appendChild(noBtn);
      moveCursorToEl(askSpan);
      const finalize = (choice) => {
        const up = (choice || '').toUpperCase();
        if (up === 'Y' || up === 'YES') {
          const cue = document.getElementById('scroll-cue');
          if (cue) cue.remove();
          simulateInstallMobile(() => openConnectModal());
        } else if (up === 'N' || up === 'NO') {
          simulateAbortMobile();
        }
      };
      askSpan.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.dataset && target.dataset.answer) {
          finalize(target.dataset.answer);
        }
      }, { once: true });
    }

    function createTypedLineMobile(text, speed, cb) {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'terminal-line';
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = '> ';
      const span = document.createElement('span');
      lineDiv.appendChild(prompt);
      lineDiv.appendChild(span);
      introEl.insertBefore(lineDiv, cursorEl);
      let idx = 0;
      (function type() {
        if (idx < text.length) {
          span.textContent += text.charAt(idx);
          moveCursorToEl(span);
          idx++;
          setTimeout(type, speed);
        } else {
          if (cb) cb();
        }
      })();
      function moveCursorToEl(el) { const rect = el.getBoundingClientRect(); const introRect = introEl.getBoundingClientRect(); cursorEl.style.top = `${rect.top - introRect.top}px`; cursorEl.style.left = `${rect.left - introRect.left + rect.width + 2}px`; }
    }

    function simulateInstallMobile(done) {
      const steps = [
        'resolving dependencies...',
        'looking for conflicting packages...',
        'Packages (1) douglas-connect-1.0-1',
        'Total Installed Size: 0.0 MiB',
        'checking keys in keyring...',
        'verifying package integrity...',
        'loading package files...',
        'checking for file conflicts...',
        'installing douglas-connect...',
        'installing douglas-connect [##########] 100%',
        'done.',
        'launching connect options...'
      ];
      let s = 0;
      (function next() {
        if (s >= steps.length) { if (done) setTimeout(done, 350); return; }
        const speed = steps[s].includes('[') ? 8 : 20;
        const delay = steps[s].includes('[') ? 60 : 120;
        createTypedLineMobile(steps[s], speed, () => setTimeout(next, delay));
        s++;
      })();
    }

    function simulateAbortMobile() {
      const steps = [
        'error: operation cancelled by user',
        'aborting...'
      ];
      let s = 0;
      (function next() {
        if (s >= steps.length) { setTimeout(() => {
          const about = document.getElementById('about');
          if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400); return; }
        createTypedLineMobile(steps[s], 24, () => setTimeout(next, 120));
        s++;
      })();
    }
  }

  // Scroll cue
  const cue = document.getElementById("scroll-cue");
  const aboutSection = document.getElementById("about");
  let scrolled = false;

  function scrollToAbout() {
    if (!scrolled) {
      scrolled = true;
      aboutSection.scrollIntoView({ behavior: "smooth", block: 'start' });
    }
  }

  if (cue) {
    cue.setAttribute('role', 'button');
    cue.setAttribute('tabindex', '0');
    cue.addEventListener("click", scrollToAbout);
    cue.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') scrollToAbout();
    });
  }
  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) scrollToAbout();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTerminalIntro);
} else {
  initTerminalIntro();
}


