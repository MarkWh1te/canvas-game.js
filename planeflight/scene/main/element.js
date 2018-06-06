class BaseElement {
    constructor(game, name) {
        this.game = game
        this.texture = this.game.imageByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.cooldown = 0
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {}
    update() {}
}
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
        this.x = 100
        this.y = 300
        this.w = 100
        this.h = 80
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
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = 3
            let x = this.x
            let y = this.y
            let bullet = Bullet.new(this.game)
            bullet.x = x
            bullet.y = y
            this.scene.addElement(bullet)
        }
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
}

class Enemy extends BaseElement {
    constructor(game) {
        let type = randomRange(0, 4)
        name = "enemy" + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomRange(1, 3)
        this.x = randomRange(0, 400 - this.w)
        this.y = -randomRange(300, 500)
        this.w = randomRange(120, 140)
        this.h = randomRange(100, 120)
    }
    update() {
        if (this.y > 700) {
            this.setup()
        }
        this.y += this.speed
    }
}

class Bullet extends BaseElement {
    constructor(game) {
        name = "bullet"
        super(game, name)
        this.setup()
        this.w = 30
        this.h = 30
    }
    setup() {
        this.speed = 1
    }
    update() {
        this.y -= this.speed
    }
}