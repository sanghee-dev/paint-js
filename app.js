const canvas = document.querySelector("#jsCanvas"),
  ctx = canvas.getContext("2d"),
  vh = window.innerHeight / 100;

canvas.width = 92 * vh;
canvas.height = 92 * vh;

ctx.lineWidth = 1;
ctx.strokeStyle = "#2c2c2c";

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
