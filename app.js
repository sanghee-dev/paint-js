const canvas = document.querySelector("#jsCanvas"),
  ctx = canvas.getContext("2d"),
  vh = window.innerHeight / 100,
  colors = Array.from(document.querySelectorAll(".jsColor")),
  range = document.querySelector("#jsRange"),
  mode = document.querySelector("#jsMode"),
  icon = document.querySelector("#jsMode i");

canvas.width = 92 * vh;
canvas.height = 92 * vh;

ctx.lineWidth = 3;
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";

let painting = false;
let filling = false;

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
  ctx.fillStyle = color;
  if (color != "rgb(255, 255, 255)") {
    icon.style.color = color;
  } else {
    icon.style.color = "rgb(100, 100, 100)";
  }
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    icon.classList.replace("fa-tint", "fa-paint-brush");
  } else {
    filling = true;
    icon.classList.replace("fa-paint-brush", "fa-tint");
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function init() {
  colors.forEach((color) => color.addEventListener("click", handleColorClick));
}

init();
