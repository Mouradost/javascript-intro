class Force extends p5.Vector{
    constructor(
        x,
        y,
        name,
        mColor = color(0, 0, 0, 255),
        mStroke = color(0, 0, 0, 255)
    ) {
        super(x, y)
        this.name = name;
        this.color = mColor;
        this.stroke = mStroke;
    }
}