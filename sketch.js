var actors = [];
var sketchWidth;
var sketchHeight;
let button;

function setup() {
  sketchWidth = document.getElementById("canvasContainer").offsetWidth;
  sketchHeight = document.getElementById("canvasContainer").offsetHeight;
  var canvas = createCanvas(sketchWidth, sketchHeight);
  canvas.parent("canvasContainer");
  frameRate(30);
  start();
  button = createButton('submit');
  button.mousePressed(start);
}

function draw() {
  background(10, 100, 100, 255);
  actors.forEach(actor => {
    // actor.move(velocity = 10);
    actor.grow(size=5);
    actor.show();
  });
}

function start() {
  actors = [];
  createActors(nb = 100, r = 1);
}

function windowResized() {
  sketchWidth = document.getElementById("canvasContainer").offsetWidth;
  sketchHeight = document.getElementById("canvasContainer").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function createActors(nb, r) {
  for (let i = 1; i < nb + 1; i++) {
    let x = random((sketchWidth/8), (sketchWidth/1.5));
    let y = random((sketchHeight/8), (sketchHeight/1.5));
    actors.push(new Actor(x, y, r));
  }
}

class Actor {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move(velocity) {

    if (this.isOut(velocity, velocity)) {
      velocity *= -1;
    }
    this.x = this.x + (1 * velocity);
    this.y = this.y + (1 * velocity);
  }

  grow(size) {
    if (!this.isOut(size, size)) {
      this.r = this.r + size;
    }
    
  }

  isOut(offsetX, offsetY) {
    return (
      (this.x - offsetX) - this.r < 0
      || (this.x + offsetX) + this.r > sketchWidth
      || (this.y - offsetY) - this.r < 0
      || (this.y + offsetY) + this.r > sketchHeight
    )
  }

  show() {
    stroke(177, 177, 177);
    strokeWeight(5);
    // fill(200, 200, 200);
    noFill()
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}
