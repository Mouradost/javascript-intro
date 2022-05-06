class Body{
    constructor(id, pos, r, vel, fillColor, strokeColor) {
        this.id = id 
        this.pos = pos
        this.r = r
        this.mass = sqrt(r)
        this.vel = vel
        this.acc = createVector()
        this.fillColor = fillColor
        this.strokeColor = strokeColor
    }

    update() {
        this.collideEdges()
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc = createVector()
    }

    applyForce(force) {
        this.acc.add(force.div(this.mass))
    }

    collideEdges() {
        if ((this.pos.x + this.r) > (width / 2) || (this.pos.x - this.r) < (-width / 2)) {
            this.vel.mult(createVector(-1, 0))
            this.pos.x 
        } else if ((this.pos.y + this.r) > (height / 2) || (this.pos.y - this.r) < (-height / 2)) {
            this.vel.mult(createVector(0, -1))
        }
    }

    collideOther(other) {
        if (this.id !== other.id && this.pos.copy().dist(other.pos) <= (this.r + other.r)) {
            this.vel.mult(-1)
        }
    }

    draw() {
        this.update()
        if (this.strokeColor) {
            stroke(this.strokeColor)
        } else {
            noStroke()
        }
        if (this.fillColor) {
            fill(this.fillColor)
        } else {
            noFill()
        }
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
    }
}