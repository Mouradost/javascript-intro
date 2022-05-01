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
