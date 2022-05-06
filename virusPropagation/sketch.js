var affected = []
var healthy = []
var population = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    frameRate(30)
    initPopulation(5)
    // healthy.push(
    //         new Body(
    //             1,
    //             createVector(40, 200),
    //             40,
    //             createVector(-1, 0),
    //             color(0, 0, 255, 200),
    //             color(0, 0, 255, 200)
    //     ))
    // healthy.push(
    //         new Body(
    //             2,
    //             createVector(-40, 200),
    //             40,
    //             createVector(1, 0),
    //             color(255, 0, 0, 200),
    //             color(0, 0, 255, 200)
    //         ))

}

function draw() {
    background(0)
    translate(width/2, height/2)
    population.forEach(p => {
        population.forEach(op => {
            p.collideOther(op)
        })
        p.draw()
    })
    // healthy.forEach(p => {
    //     healthy.forEach(op => {
    //         p.collideOther(op)
    //     })
    //     p.draw()
    // })
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}


function initPopulation(nb) {
    for (let i = 0; i < nb; i++) {
        let pColor = color(
            random(100, 255), random(100, 255), random(100, 255), random(200, 255))
        let pR = random(10, 50)
        let pVel = p5.Vector.random2D().mult(100).div(pR)
        population.push(
            new Body(
                i,
                createVector(random(-width / 4, width / 4), random(-height / 4, height / 4)),
                pR,
                pVel,
                pColor,
                pColor
            ))
        
    }
}