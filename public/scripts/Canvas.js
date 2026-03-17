import { InputHandler } from "./Classes.js";

//declarations
const canvasWidth = 1200;
const canvasHeight = 600;

var canvas = document.querySelector("canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var zoomIn = document.querySelector(".zoomIn");
var zoomOut = document.querySelector(".zoomOut");

let drawPosnX = 0;
let drawPosnY = 0;
let drawSize = 256;
let drawScale = 1;

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
canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (event.deltaY > 0) input.hasZoomedIn = true;
  else if (event.deltaY < 0) input.hasZoomedOut = true;
}, { passive: false });

zoomIn.onclick = () => {
  input.hasZoomedIn = true;
};
zoomOut.onclick = () => {
  input.hasZoomedOut = true;
};

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

  if (input.hasZoomedIn) {
    drawPosnX = 2 * drawPosnX - (input.mouseX - (innerWidth-canvasWidth)/2);
    drawPosnY = 2 * drawPosnY - (input.mouseY - (innerHeight-canvasHeight)/2);
    drawScale++;
    input.hasZoomedIn = false;
  }
  if (input.hasZoomedOut) {
    if (drawScale > 1) {
      drawPosnX = (drawPosnX + input.mouseX - (innerWidth-canvasWidth)/2) / 2;
      drawPosnY = (drawPosnY + input.mouseY - (innerHeight-canvasHeight)/2) / 2;
      drawScale--;
    }
    input.hasZoomedOut = false;
  }

  c.drawImage(img, 0, 0, 256, 256, drawPosnX, drawPosnY, drawSize*drawScale, drawSize*drawScale);
  requestAnimationFrame(updateCanvas);
}
requestAnimationFrame(updateCanvas);
