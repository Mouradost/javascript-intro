var sun
var earth
var planets = []
const G = 100

function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(30)
    sun = new Body(
        createVector(),
        50,
        createVector(),
        color("#f3e5ab")
    )
    createPlanets(8, width, height)
}

function draw() {
    background(0)
    translate(width/2, height/2)
    sun.attract(planets)
    planets.forEach(p => {
        p.draw(false)
    })
    sun.draw(false)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function createPlanets(nb, w, h) {
    for (let i = 0; i < nb; i++){
        let planetPos = createVector(
            random(-w / 3, w / 3), random(-h / 3, h / 3)
        )
        let planetVel = planetPos.copy()
        planetVel.rotate(HALF_PI)
        planetVel.setMag(sqrt(G * sun.mass / planetPos.mag()))
        let pColor = color(
            random(100, 255), random(100, 255), random(100, 255), random(200, 255))
        planets.push(
            new Body(
                planetPos,
                random(10, 50),
                planetVel,
                pColor,
                pColor
            ))
    }
}