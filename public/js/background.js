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

// 🖱️ Mouse tracking (global)
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

// 🟢 Scoped Matrix Rain in #landing
const matrixCanvas = document.createElement("canvas");
const landing = document.getElementById("landing");
landing.style.position = "relative";
landing.appendChild(matrixCanvas);

const mtx = matrixCanvas.getContext("2d");

matrixCanvas.style.position = "absolute";
matrixCanvas.style.top = "0";
matrixCanvas.style.left = "0";
matrixCanvas.style.width = "100%";
matrixCanvas.style.height = "100%";
matrixCanvas.style.zIndex = "0";
matrixCanvas.style.pointerEvents = "none";
matrixCanvas.style.opacity = "0.08";
matrixCanvas.style.transition = "opacity 0.3s ease"; // Smooth fade

function resizeMatrixCanvas() {
  matrixCanvas.width = landing.offsetWidth;
  matrixCanvas.height = landing.offsetHeight;
}
resizeMatrixCanvas();
window.addEventListener("resize", resizeMatrixCanvas);

// 🧠 Scroll Fade Logic
function updateMatrixOpacity() {
  const rect = landing.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const landingTop = rect.top + scrollTop;
  const landingHeight = landing.offsetHeight;

  const fadeStart = 0;
  const fadeEnd = landingHeight / 1.2;

  const scrolled = Math.min(Math.max(0, scrollTop - landingTop), fadeEnd);
  const fade = 1 - scrolled / fadeEnd;
  const baseOpacity = 0.08;

  matrixCanvas.style.opacity = (fade * baseOpacity).toFixed(3);
}

window.addEventListener("scroll", updateMatrixOpacity);
updateMatrixOpacity(); // initial call

// ⌨️ Matrix Animation
const letters = "01アカサタナハマヤラ0123456789";
const fontSize = 14;
let drops = [];

function initMatrix() {
  const columns = Math.floor(matrixCanvas.width / fontSize);
  drops = Array(columns).fill(1);
}
initMatrix();
window.addEventListener("resize", initMatrix);

function drawMatrix() {
  mtx.fillStyle = "rgba(0, 0, 0, 0.05)";
  mtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  mtx.fillStyle = "#0f0";
  mtx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    mtx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > matrixCanvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}
setInterval(drawMatrix, 50);
