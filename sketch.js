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
  button = createButton('Restart (R)');
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

function mousePressed() {
  actors.push(new Actor(mouseX, mouseY, 10, random(0, 10000)));
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 82) {
    start();
  }
}