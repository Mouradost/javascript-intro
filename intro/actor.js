class Actor {
  constructor(
    x, 
    y, 
    r, 
    index, 
    initialVelocity = new Force(0, 0, "velocity"),
    acceleration = new Force(0, 0, "acceleration"),
    mColor = color(177, 177, 177, 200), 
    strokeColor = color(0, 0, 0, 100)
  ) {
    this.pos = createVector(x, y);
    this.r = r;
    this.velocity = initialVelocity;
    this.acc = acceleration;
    this.name = "Actor " + index;
    this.strokeColor = strokeColor;
    this.color = mColor;
    this.mass = sqrt(this.r);
    this.forces = [];
  }

  updateMass() {
    this.mass = sqrt(this.r);
  }

  move() {
    this.velocity.add(this.acc).limit(10);
    this.pos.add(this.velocity);
  }
  update(boundary) {
    this.wallCollide(boundary);
    this.acc.mult(0);
  }

  grow(size=1) {
    this.r += size;
    this.updateMass();
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
    if (this.pos.x - this.r <= 0) {
      this.pos.x = this.r;
      this.velocity.x *= -1;
    }else if (this.pos.x + this.r >= boundary.width) {
      this.pos.x = boundary.width - this.r;
      this.velocity.x *= -1;
    }
    if (this.pos.y - this.r <= 0) {
      this.pos.y = this.r;
      this.velocity.y *= -1;
    }else if (this.pos.y + this.r >= boundary.height) {
      this.pos.y = boundary.height - this.r;
      this.velocity.y *= -1;
    }
  }

  isOverlapping(actor) {
    return (dist(this.pos.x, this.pos.y, actor.pos.x, actor.pos.y) < (actor.r + this.r))
  }

  applyForce(force) {
    this.acc.add(force.div(this.mass));
    this.forces.push(force.copy());
  }

  showForces(force, mColor = color(0, 0, 0)) {
    console.log(force.name)
    force.mult(100).limit(this.r * 2);
    push();
    stroke(mColor);
    strokeWeight(3);
    fill(mColor);
    translate(this.pos.x, this.pos.y);
    line(0, 0, force.x, force.y);
    rotate(force.heading());
    let arrowSize = 7;
    translate(force.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

  show() {
    fill(this.color);
    stroke(this.strokeColor);
    strokeWeight(3);
    
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

    this.forces.forEach(force => {
      this.showForces(force);
    })
    this.forces.splice(0, this.forces.length);
    
    // this.showForces(this.acc, color(120, 12, 0));
    this.showForces(this.velocity.copy(), color(12, 120, 120));
  }
}
