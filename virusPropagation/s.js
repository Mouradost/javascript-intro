let v1
let v2

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    frameRate(30)
    v1 = new Test(200, 200, 300, 300, color(255, 0, 0))
    v2 = new Test(200, 200, 400, 400, color(255, 255, 0))
}

class Test {
    constructor(c_x, c_y, x, y, color) {
        this.center = createVector(c_x, c_y)
        this.pos = createVector(x, y)
        this.color = color
    }

    draw() {
        stroke(this.color)
        line(this.center.x, this.center.y, this.pos.x, this.pos.y)
    }

    dot(other) {
        let d = this.pos.copy().dot(other.pos)
        let theta = acos(d / (this.pos.mag() * other.pos.mag()))
        return theta
    }

    sub(other) {
        push()
        stroke(color(255))
        translate(other.pos)
        let c = this.pos.copy().sub(other.pos)
        line(0, 0, c.x, c.y)
        textSize(16);
        text("C", 10+c.x/2, 10+c.y/2)
        pop()
    }

    drawAngle(other) {
        for (let i = 0; i < PI; i++) {
            let x = i * cos(i)
            let y = i * sin(i)
            push()
            translate(400, 400)
            stroke(255)
            strokeWeight(5)
            point(x, y)
            pop()
        }
    }
}

function draw() {
    background(0)
    v2.pos = createVector(mouseX, mouseY)
    
    v1.draw()
    v2.draw()
    v1.sub(v2)
    v1.drawAngle(v2)

    noStroke()
    fill(255)
    textSize(48);
    text("theta = " + round(v1.dot(v2), 4), 550, 200)
    text("theta = " + round(v1.pos.copy().angleBetween(v2.pos), 4), 550, 250)
}