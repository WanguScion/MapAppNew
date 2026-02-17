export class InputHandler {
  mouseX;
  mousePrevX;
  mouseY;
  mousePrevY;
  canPan;
  constructor() {
    this.mouseX = 0;
    this.mousePrevX = 0;
    this.mouseY = 0;
    this.mousePrevY = 0;
    this.canPan = false;
  }
}
