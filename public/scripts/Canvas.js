import { InputHandler } from "./Classes.js";

//declarations
const canvasWidth = 1200;
const canvasHeight = 600;

var canvas = document.querySelector("canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let drawPosnX = 0;
let drawPosnY = 0;

const input = new InputHandler();
var c = canvas.getContext("2d");

// Controls Listeners
canvas.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    input.canPan = true;
  }
});
window.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    input.canPan = false;
  }
});
canvas.addEventListener("mousemove", (event) => {
  input.mousePrevX = input.mouseX;
  input.mousePrevY = input.mouseY;
  input.mouseX = event.clientX;
  input.mouseY = event.clientY;
});

// Call images from tile server
const img = new Image();
img.src = "https://tile.openstreetmap.org/0/0/0.png";

// Draw On Canvas
function updateCanvas() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  // Controls Calc
  if (input.canPan) {
    drawPosnX += input.mouseX - input.mousePrevX;
    drawPosnY += input.mouseY - input.mousePrevY;
  }
  input.mousePrevX = input.mouseX;
  input.mousePrevY = input.mouseY;
  c.drawImage(img, 0, 0, 256, 256, drawPosnX, drawPosnY, 256, 256);
  requestAnimationFrame(updateCanvas);
}
requestAnimationFrame(updateCanvas);
