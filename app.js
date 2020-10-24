const canvas = document.querySelector("#jsCanvas"),
  ctx = canvas.getContext("2d"),
  vh = window.innerHeight / 100,
  colors = Array.from(document.querySelectorAll(".jsColor")),
  range = document.querySelector("#jsRange");

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

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function init() {
  colors.forEach((color) => color.addEventListener("click", handleColorClick));
}

init();
