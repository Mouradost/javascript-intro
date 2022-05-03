class Body{
    constructor(pos, r, vel, fillColor, strokeColor) {
        this.pos = pos
        this.r = r
        this.mass = sqrt(r)
        this.vel = vel
        this.acc = createVector()
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.trails = []
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)


        this.acc = createVector()
        
        this.trails.push(this.pos.copy())

        if (this.trails.length > 100) {
            this.trails.splice(0, 1)
        }
    }

    applyForce(force) {
        this.acc.add(force.div(this.mass))
    }

    drawForce(force) {
        let f = force.copy().mult(10)

        push();
        strokeWeight(3);
        translate(this.pos.x, this.pos.y);
        line(0, 0, f.x, f.y);
        rotate(f.heading());
        let arrowSize = 7;
        translate(f.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }

    drawTrail() {
        this.trails.forEach(trail => {
            point(trail.x, trail.y)
        })
    }

    attract(others) {
        others.forEach(other => {
            let r = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            let f = this.pos.copy().sub(other.pos)
            f.setMag(G * (this.mass * other.mass) / pow(r, 2))
            other.applyForce(f)
        })
    }

    draw(showForces) {
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
        ellipse(this.pos.x, this.pos.y, this.r, this.r)
        this.drawTrail()
        if (showForces) this.drawForce(this.vel)
    }
}