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
    draw() {
        this.game.drawGuaimg(this)
    }
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
        this.life = 1
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
            let x = this.x + (this.w / 2)
            let y = this.y
            let bullet = Bullet.new(this.game)
            bullet.x = x
            bullet.y = y
            bullet.scene = this.scene
            this.scene.bullets.push(bullet)
            this.scene.addElement(bullet)
        }
    }
    update() {
        if (this.die()) {
            var s = SceneEnd.new(this.game)
            this.game.replaceScene(s)
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }

    die() {
        for (var i = 0; i < this.scene.enemies.length; i++) {
            let e = this.scene.enemies[i]
            if (rectIntersects(this, e)) {
                this.life -= 1
            }
        }
        return this.life <= 0
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
        this.life = 2
    }
    update() {
        if (this.y > 700 || this.explosion()) {
            this.setup()
        }
        this.y += this.speed
    }
    explosion() {
        for (var i = 0; i < this.scene.bullets.length; i++) {
            let b = this.scene.bullets[i]
            if (rectIntersects(this, b) && this.y > 0) {
                this.life -= 1
                // bullet explod when hit the enemy
                b.die()
                let ps = ParticleSystem.new(this.game)
                ps.x = this.x + (this.w / 2)
                ps.y = this.y + (this.h / 2)
                ps.scene = this.scene
                log(ps.x)
                this.scene.addElement(ps)
            }
        }
        return this.life <= 0
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
        this.speed = 23
    }
    update() {
        this.y -= this.speed
        if (this.out_of_range()) {
            this.die()
        }
    }
    die() {
        this.scene.bullets = this.scene.bullets.filter(x => x != this)
        this.scene.elements = this.scene.elements.filter(x => x != this)
    }
    out_of_range() {
        let h = this.y + this.scene.player.y
        if (this.y < 10) {
            return true
        }
        return false
    }
}

class Particle extends BaseElement {
    constructor(game) {
        name = "particle"
        super(game, name)
        this.setup()
    }
    setup() {
        this.life = 10
        this.x = 200
        this.y = 200
        this.a = 0.001
        this.w = 7
        this.h = 7
        this.speed = 2
        this.vx = randomRange(-this.speed, this.speed)
        this.vy = randomRange(-this.speed, this.speed)
    }
    update() {
        this.life -= 1
        this.vx += this.a * this.vx
        this.vy += this.a * this.vy
        this.x += this.vx
        this.y += this.vy
    }
}