class BaseElement {
    constructor(game, name) {
        this.game = game
        this.texture = this.game.imageByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {}
    update() {}
}

// TODO: consider using mix-in class or not :)
class Background extends BaseElement {
    constructor(game, name) {
        super(game, name)
        this.y = 0
        this.counter = 0
        this.speed = 0.3
    }
    update() {
        if (this.counter >= this.h) {
            this.y -= this.counter
            this.counter = 0
        }
        this.y += this.speed
        this.counter += this.speed
    }
}
class Player extends BaseElement {
    constructor(game, name) {
        super(game, name)
        this.speed = 15
    }
    moveH(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - this.w) {
            x = 400 - this.w
        }
        this.x = x
    }
    moveV(y) {
        if (y < 0) {
            y = 0
        }
        if (y > 500 - this.h) {
            y = 500 - this.h
        }
        this.y = y
    }
    moveLeft() {
        this.moveH(this.x - this.speed)
    }
    moveRight() {
        this.moveH(this.x + this.speed)
    }
    moveUp() {
        this.moveV(this.y - this.speed)
    }
    moveDown() {
        this.moveV(this.y + this.speed)
    }
}