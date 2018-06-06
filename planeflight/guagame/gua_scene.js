class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(element) {
        element.scene = this
        this.elements.push(element)
    }
    draw() {
        this.elements.map(x => this.game.drawGuaimg(x))
    }
    update() {
        this.elements.map(x => x.update())
    }
}