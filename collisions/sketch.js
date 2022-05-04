var actors = [];
var boundary;
var sketchHeight;
let button;

function setup() {
  boundary = {
    width: document.getElementById("canvasContainer").offsetWidth,
    height: document.getElementById("canvasContainer").offsetHeight
  };

  var canvas = createCanvas(boundary.width, boundary.height);
  canvas.parent("canvasContainer");

  button = createButton('Restart (R)');
  button.mousePressed(start);

  frameRate(30);
  start();
}

function draw() {
  background(94, 94, 94);
  actors.forEach(actor => {
    // Take action

    // Gravity
    actor.applyForce(new Force(0, 0.2, "gravity").mult(actor.mass))

    // Wind
    actor.applyForce(createVector(0.2, -0.5))

    actor.move();
    actor.update(boundary);
    actor.show();

  });
}

function start() {
  actors.splice(0, actors.length);
  createActors(nb = 5);
}

function windowResized() {
  boundary = {
    width: document.getElementById("canvasContainer").offsetWidth,
    height: document.getElementById("canvasContainer").offsetHeight
  };
  resizeCanvas(boundary.width, boundary.height);
}

function createActors(nb) {
  for (let i = 1; i < nb + 1; i++) {
    let x = random((boundary.width/8), (boundary.width/1.5));
    let y = random((boundary.height/8), (boundary.height/1.5));
    actors.push(
      new Actor(
        x=x,
        y=y,
        r=random(10, 40),
        index = i
      ));
  }
}

// Add new actor on mouse pressed
function mousePressed() {
  // actors.push(new Actor(mouseX, mouseY, random(10), random(0, 10000), color(59, 19, 168, 200), color(59, 19, 168)));
}

// Restart on key pressed (R)
function keyPressed() {
  console.log(keyCode);
  if (keyCode == 82) {
    start();
  }
}