function initNavbarAndSnake() {
  // Navbar hide on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    // Ensure visible on load
    navbar.classList.remove('navbar-hidden');
  }
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Mobile hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('show');
    });
    // Close menu when a link is clicked (on mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('show');
          hamburger.classList.remove('active');
        }
      });
    });
    // Ensure proper state on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
      }
    });
  }

  // Snake Game Easter Egg
  const logo = document.getElementById('navbar-logo');
  const modal = document.getElementById('snake-modal');
  const closeBtn = document.getElementById('snake-close');
  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  let clickCount = 0;
  let clickTimer = null;
  let gameInterval = null;
  let snake, direction, food, score, pendingDir;

  function showModal() {
    modal.classList.add('active');
    modal.style.display = 'flex';
    startGame();
    document.body.style.overflow = 'hidden';
  }
  function hideModal() {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
    stopGame();
    document.body.style.overflow = '';
  }

  logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) {
      clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
    }
    if (clickCount === 3) {
      clearTimeout(clickTimer);
      clickCount = 0;
      showModal();
    }
  });
  closeBtn.addEventListener('click', hideModal);
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
      hideModal();
    }
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // --- Swipe gesture support ---
  let touchStartX = null, touchStartY = null;
  canvas.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  });
  canvas.addEventListener('touchend', function(e) {
    if (touchStartX === null || touchStartY === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) pendingDir = {x: 1, y: 0};
      else if (dx < -30) pendingDir = {x: -1, y: 0};
    } else {
      if (dy > 30) pendingDir = {x: 0, y: 1};
      else if (dy < -30) pendingDir = {x: 0, y: -1};
    }
    touchStartX = null;
    touchStartY = null;
  });

  function startGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 1, y: 0};
    pendingDir = null;
    food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
    score = 0;
    draw();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
    window.addEventListener('keydown', handleKey);
  }
  function stopGame() {
    clearInterval(gameInterval);
    window.removeEventListener('keydown', handleKey);
  }
  function handleKey(e) {
    const key = e.key.toLowerCase();
    if (key === 'arrowup' || key === 'w') pendingDir = {x: 0, y: -1};
    if (key === 'arrowdown' || key === 's') pendingDir = {x: 0, y: 1};
    if (key === 'arrowleft' || key === 'a') pendingDir = {x: -1, y: 0};
    if (key === 'arrowright' || key === 'd') pendingDir = {x: 1, y: 0};
  }
  function gameLoop() {
    if (pendingDir) {
      if (!(pendingDir.x === -direction.x && pendingDir.y === -direction.y)) {
        direction = pendingDir;
      }
      pendingDir = null;
    }
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) return endGame();
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) return endGame();
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
    } else {
      snake.pop();
    }
    draw();
  }
  function endGame() {
    clearInterval(gameInterval);
    ctx.fillStyle = '#111';
    ctx.globalAlpha = 0.85;
    ctx.fillRect(0, 0, 400, 400);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 2rem monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', 200, 180);
    ctx.fillStyle = '#00ff00';
    ctx.font = '1.2rem monospace';
    ctx.fillText('Score: ' + score, 200, 220);
    ctx.font = '1rem monospace';
    ctx.fillText('Press Esc or × to close', 200, 260);
  }
  function draw() {
    ctx.clearRect(0, 0, 400, 400);
    ctx.strokeStyle = '#222';
    for (let i = 0; i <= 20; i++) {
      ctx.beginPath();
      ctx.moveTo(i*20, 0); ctx.lineTo(i*20, 400);
      ctx.moveTo(0, i*20); ctx.lineTo(400, i*20);
      ctx.stroke();
    }
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(food.x*20, food.y*20, 20, 20);
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? '#fff' : '#00b300';
      ctx.fillRect(snake[i].x*20, snake[i].y*20, 20, 20);
    }
    ctx.fillStyle = '#b6fcd5';
    ctx.font = '1rem monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Score: ' + score, 10, 25);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbarAndSnake);
} else {
  initNavbarAndSnake();
}


