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

  mtx.font = "14px 'Courier New', monospace";
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
