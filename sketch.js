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
    // actor.velocity = createVector(5, 5);
    actor.applyForce(p5.Vector.random2D().limit(0.5))
    actor.move(boundary);

    // actor.grow(size=5);
    actor.show();

    // Check collision
    // actors.forEach(otherActor => {
    //   if (actor.name != otherActor.name){
    //     if (actor.isOverlapping(otherActor)) {
    //       actor.strokeColor = color(0, 0, 0);
    //       actor.color = color(59, 19, 168, 20);
    //     }
    //   }
    // })

  });
}

function start() {
  actors.splice(0, actors.length);
  createActors(nb = 10, r = 20);
}

function windowResized() {
  boundary = {
    width: document.getElementById("canvasContainer").offsetWidth,
    height: document.getElementById("canvasContainer").offsetHeight
  };
  resizeCanvas(boundary.width, boundary.height);
}

function createActors(nb, r) {
  for (let i = 1; i < nb + 1; i++) {
    let x = random((boundary.width/8), (boundary.width/1.5));
    let y = random((boundary.height/8), (boundary.height/1.5));
    actors.push(
      new Actor(
        x,
        y,
        r,
        i,
        color(59, 19, 168, 200),
        color(59, 19, 168, 255),
        p5.Vector.random2D().limit(1),
        createVector(0, 0)
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