var actors = [];

function setup() {
  createCanvas(windowWidth-5, windowHeight-5);
  frameRate(30);
  createActors(nb=100, r=1);
}

function draw() {
  background(100, 100, 100, 255);
  actors.forEach(takeAction);
}

function windowResized() {
  resizeCanvas(windowWidth-5, windowHeight-5);
}

function createActors(nb, r) {
  for (let i = 1; i < nb + 1; i++) {
    let x = random((height/8), (height/1.5));
    let y = random((width/8), (width/1.5));
    actors.push(new Actor(x, y, r));
  }
}

function takeAction(item, index) {
    // console.log("Moving actor " + index + 1)
    // item.move(velocity=10);
    item.grow(size=5);
    item.show();
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
      || (this.x + offsetX) + this.r > width
      || (this.y - offsetY) - this.r < 0
      || (this.y + offsetY) + this.r > height
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
