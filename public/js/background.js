const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// ✅ Declare mouse BEFORE animate() uses it
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let hue = 0;

function animate() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const grad = ctx.createRadialGradient(
    mouse.x,
    mouse.y,
    0,
    mouse.x,
    mouse.y,
    Math.max(width, height) * 0.6,
  );

  hue += 0.2; // Slower hue shift

  grad.addColorStop(0, `hsla(${(hue + 0) % 360}, 70%, 40%, 0.2)`);
  grad.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 30%, 0.15)`);
  grad.addColorStop(1, `hsla(${(hue + 120) % 360}, 60%, 25%, 0.1)`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  requestAnimationFrame(animate);
}

animate();
