var layers = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    frameRate(30)
    layers.push(new Layer(3, 2, 1))
    // layers.push(new Layer(4, 2, 2))

    for (let layer of layers) {
        layer.init()
    }
}

function draw() {
    background(0)
    translate(width / 2, height / 2)
    let x = tf.randomNormal([1, 3])
    let y = x
    for (let layer of layers){
        y = layer.forward(y)
        fill(255)
        textSize(18)
        text("x = " + x.arraySync(), - width / 3, -height / 3)
        text("y = " + y.arraySync(), - width / 3, -height / 4)
        layer.backward()
        layer.draw(x, y)
        // noLoop()
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}