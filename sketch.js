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
  button = createButton('Restart');
  button.mousePressed(start);
}

function draw() {
  background(94, 94, 94);
  actors.forEach(actor => {
    actor.move(velocity = random(0, 5));
    actor.grow(size=5);
    actor.show();
    actors.forEach(otherActor => {
      if (actor.name != otherActor.name){
      let overlap = actor.isOverlapping(otherActor.x, otherActor.y, otherActor.r);
      if (overlap) {
        actor.strokeColor = color(0, 0, 0);
        actor.color = color(59, 19, 168, 20);
      }}
    })
  });
}

function start() {
  actors = [];
  createActors(nb = 10, r = 1);
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
    actors.push(new Actor(x, y, r, i));
  }
}

class Actor {
  constructor(x, y, r, index) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.name = "Actor " + index;
    this.strokeColor = color(59, 19, 168);
    this.color = color(59, 19, 168, 200);
  }

  move(velocity) {
    if (!this.isOut(velocity, velocity)) {
      this.x += (1 * velocity);
      this.y += (1 * velocity);
    }
  }

  grow(size) {
    if (!this.isOut(size, size)) {
      this.r += size;
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

  isOverlapping(x, y, r) {
    return (dist(this.x, this.y, x, y) < (r + this.r))
  }

  show() {
    // stroke(this.strokeColor);
    // strokeWeight(5);
    noStroke();
    fill(this.color);
    // noFill();
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}
