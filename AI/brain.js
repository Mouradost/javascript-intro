class Layer{
    constructor(c_in, c_out, id) {
        this.id = id
        this.c_in = c_in
        this.c_out = c_out
        this.w = tf.zeros([this.c_in, this.c_out])
        this.activation = tf.layers.activation({activation: 'relu6'})
    }

    init() {
        this.w = tf.randomNormal([this.c_in, this.c_out])
    }

    backward() {
        this.w = tf.randomNormal([this.c_in, this.c_out])
    }

    forward(x) {
        if (x.shape < 2) x.expandDims(0)
        return this.activation.apply(tf.einsum("ij,jo -> io",x, this.w))
    }

    draw(_inputs, _outputs) {
        let x = _inputs.arraySync(), y = _outputs.arraySync(), w = this.w.arraySync()

        let x_min = tf.min(x).arraySync(), x_max = tf.max(x).arraySync(), y_min = tf.min(y).arraySync(), y_max = tf.max(y).arraySync(), w_min = tf.min(w).arraySync(), w_max = tf.max(w).arraySync()

        for (let i = 0; i < this.w.shape[0]; i++) {
            push()
            for (let j = 0; j < this.w.shape[1]; j++) {
            strokeWeight(map(w[i][j], w_min, w_max, 0, 4))
            stroke(color(0, map(w[i][j], w_min, w_max, 0, 255), 0))
                line(-50 * this.id, 50 * i, 50 * this.id, 50 * j)
            }
            pop()
        }

        for (let i = 0; i < _inputs.shape[0]; i++) {
            push()
            stroke(color(255, 255, 255, 255))
            strokeWeight(1)
            for (let j = 0; j < _inputs.shape[1]; j++) {
                fill(map(x[i][j], x_min, x_max, 0, 255), 0, 0)
                ellipse(-50 * this.id, 50 * j, 40, 40)
            }
            pop()
        }

        for (let i = 0; i < _outputs.shape[0]; i++) {
            push()
            stroke(color(255, 255, 255, 255))
            strokeWeight(1)
            for (let j = 0; j < _outputs.shape[1]; j++) {
                fill(0, 0, map(y[i][j], y_min, y_max, 0, 255))
                ellipse(50 * this.id, 50 * j, 40, 40)
            }
            pop()
        }
    }
}