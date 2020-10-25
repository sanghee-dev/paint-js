const canvas = document.querySelector("#jsCanvas"),
  ctx = canvas.getContext("2d"),
  vh = window.innerHeight / 100,
  colors = Array.from(document.querySelectorAll(".jsColor")),
  range = document.querySelector("#jsRange"),
  mode = document.querySelector("#jsMode"),
  icon = document.querySelector("#jsMode i"),
  save = document.querySelector("#jsSave");

canvas.width = 92 * vh;
canvas.height = 92 * vh;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  if (color === "rgb(255, 255, 255)") {
    icon.style.color = "rgb(180, 180, 180)";
  } else if (color === "rgb(44, 44, 44)") {
    icon.style.color = "rgb(100, 100, 100)";
  } else {
    icon.style.color = color;
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

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

function init() {
  colors.forEach((color) => color.addEventListener("click", handleColorClick));
}

init();
