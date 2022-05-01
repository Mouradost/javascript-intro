class Actor {
  constructor(
    x, 
    y, 
    r, 
    index, 
    color, 
    strokeColor,
    velocity,
    acceleration
  ) {
    this.pos = createVector(x, y);
    this.r = r;
    this.velocity = velocity;
    this.acc = acceleration;
    this.name = "Actor " + index;
    this.strokeColor = color;
    this.color = strokeColor;
  }

  move(boundary) {
    this.wallCollide(boundary);
    this.velocity.add(this.acc);
    this.pos.add(this.velocity);
    this.acc = createVector();
  }

  grow(size=1) {
    if (!this.isOut(size, size)) {
      this.r += size;
    }
  }

  isOut(boundary) {
    return (
      (this.pos.x - this.velocity.x) - this.r < 0
      || (this.pos.x + this.velocity.x) + this.r > boundary.width
      || (this.pos.y - this.velocity.y) - this.r < 0
      || (this.pos.y + this.velocity.y) + this.r > boundary.height
    )
  }

  wallCollide(boundary) {
    if (this.pos.x - this.r <= 0 || this.pos.x + this.r >= boundary.width) {
      this.velocity.x *= -1;
    }
    if (this.pos.y - this.r <= 0 || this.pos.y + this.r >= boundary.height) {
      this.velocity.y *= -1;
    }
  }

  isOverlapping(actor) {
    return (dist(this.pos.x, this.pos.y, actor.pos.x, actor.pos.y) < (actor.r + this.r))
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    noStroke();
    fill(this.color);

    // stroke(this.strokeColor);
    // strokeWeight(5);
    // noFill();
    
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
}
