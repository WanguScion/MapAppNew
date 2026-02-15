import { InputHandler } from "./Classes.js";

var canvas = document.querySelector("canvas");
canvas.width = 0.8 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;

const input = new InputHandler();

// Controls
canvas.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    input.canPan = true;
  }
});
canvas.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    input.canPan = false;
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (input.canPan === true) {
    //updates the input object
    input.mouseX = event.clientX;
    input.mouseY = event.clientY;
  }
});

var c = canvas.getContext("2d");

// Call images from tile server
const img = new Image();
img.src = "https://tile.openstreetmap.org/0/0/0.png";

// Draw On Canvas
function updateCanvas() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.drawImage(img, 0, 0, 256, 256, input.mouseX, input.mouseY, 600, 600);
  requestAnimationFrame(updateCanvas);
}
requestAnimationFrame(updateCanvas);
