const gradientCanvas = document.createElement("canvas");
document.body.appendChild(gradientCanvas);
const ctx = gradientCanvas.getContext("2d");

gradientCanvas.style.position = "fixed";
gradientCanvas.style.top = "0";
gradientCanvas.style.left = "0";
gradientCanvas.style.width = "100%";
gradientCanvas.style.height = "100%";
gradientCanvas.style.zIndex = "-1";
gradientCanvas.style.pointerEvents = "none";

// Mouse tracking (global)
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function resizeGradient() {
  gradientCanvas.width = window.innerWidth;
  gradientCanvas.height = window.innerHeight;
}
resizeGradient();
window.addEventListener("resize", resizeGradient);

// 🎨 Animate Gradient
let hue = 0;
function animateGradient() {
  const width = gradientCanvas.width;
  const height = gradientCanvas.height;
  ctx.clearRect(0, 0, width, height);

  const grad = ctx.createRadialGradient(
    mouse.x,
    mouse.y,
    0,
    mouse.x,
    mouse.y,
    Math.max(width, height) * 0.6,
  );

  hue += 0.2;
  grad.addColorStop(0, `hsla(${(hue + 0) % 360}, 70%, 40%, 0.2)`);
  grad.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 30%, 0.15)`);
  grad.addColorStop(1, `hsla(${(hue + 120) % 360}, 60%, 25%, 0.1)`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  requestAnimationFrame(animateGradient);
}
animateGradient();

// Create canvas inside #landing
// Matrix Canvas Setup
const matrixCanvas = document.createElement("canvas");
const landing = document.getElementById("landing");
landing.style.position = "relative";
landing.appendChild(matrixCanvas);
const mtx = matrixCanvas.getContext("2d");

// Canvas Style
Object.assign(matrixCanvas.style, {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "0",
  pointerEvents: "none",
  opacity: "0.08",
  transition: "opacity 0.3s ease",
});

const letters = "01アカサタナハマヤラ0123456789";
const fontSize = 14;
let drops = [];

let lastWidth = 0;
let lastHeight = 0;

function resizeMatrixCanvas(force = false) {
  const width = landing.clientWidth;
  const height = window.innerHeight;

  if (!force && width === lastWidth && height === lastHeight) return;

  const oldColumns = drops.length;
  const newColumns = Math.floor(width / fontSize);

  // Resize canvas without clearing drop state by updating only if size actually changed
  if (matrixCanvas.width !== width) matrixCanvas.width = width;
  if (matrixCanvas.height !== height) matrixCanvas.height = height;

  if (newColumns !== oldColumns) {
    const oldDrops = [...drops];
    drops.length = newColumns;

    for (let i = 0; i < newColumns; i++) {
      drops[i] = oldDrops[i] || 1;
    }
  }

  mtx.font = fontSize + "px monospace";
  lastWidth = width;
  lastHeight = height;
}

function drawMatrix() {
  mtx.fillStyle = "rgba(0, 0, 0, 0.05)";
  mtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  mtx.fillStyle = "#0f0";
  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    mtx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > matrixCanvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

window.addEventListener("load", () => {
  resizeMatrixCanvas(true); // Force resize on first load
  setInterval(drawMatrix, 50);
});

// Debounced resize listener
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeMatrixCanvas();
  }, 200);
});
