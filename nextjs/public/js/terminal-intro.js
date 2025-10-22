function initTerminalIntro() {
  const isMobile = window.innerWidth <= 768;
  const intro = document.querySelector(".intro");
  const cursor = document.getElementById("cursor");

  function moveCursorTo(el) {
    const rect = el.getBoundingClientRect();
    const introRect = intro.getBoundingClientRect();
    cursor.style.top = `${rect.top - introRect.top}px`;
    cursor.style.left = `${rect.left - introRect.left + rect.width + 2}px`;
  }

  if (!isMobile) {
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line1Text = "Douglas Alvarino";
    const line2Text = "Engineer | Developer | Explorer";
    let i = 0, j = 0;

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
      }
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
    // Define the four lines
    const mobileLines = ["Douglas Alvarino", "Engineer", "Developer", "Explorer"];
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
          currentLine++;
          charIndex = 0;
          setTimeout(typeMobileLine, 300);
        }
      }
      typePrompt();
    }
    setTimeout(typeMobileLine, 350);
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


