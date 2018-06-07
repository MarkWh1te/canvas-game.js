class ParticleScene extends GuaScene {
    constructor(game) {
        super(game)
        // this.background = GuaImage.new(game, 'ball')
        this.numberOfParticles = 30
        this.setup()
    }
    setup() {
        this.setupElements()
        this.setupEvents()
    }
    setupEvents() {
        this.game.registerAction('n', () => {
            var s = PlaneScene.new(this.game)
            this.game.replaceScene(s)
        })

    }
    setupElements() {
        let ps = ParticleSystem.new(this.game)
        ps.scene = this
        this.addElement(ps)
    }

    draw() {
        this.elements.map(x => x.draw())
    }
}
class ParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    setup() {
        this.duration = 20
        this.numberOfParticles = 40
        this.setupElements()
        this.setupEvents()
    }
    setupEvents() {
        this.game.registerAction('n', () => {
            var s = PlaneScene.new(this.game)
            this.game.replaceScene(s)
        })
    }
    setupElements() {
        this.particles = []
    }
    update() {
        this.duration -= 1
        if (this.duration < 0) {
            // please see the link below ,my dear friend :)
            // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
            this.scene.elements = this.scene.elements.filter(x => x !== this)
        }
        if (this.particles.length < this.numberOfParticles) {
            let p = Particle.new(this.game)
            p.x = this.x
            p.y = this.y
            this.particles.push(p)
        }
        this.particles = this.particles.filter(x => x.life > 0)
        this.particles.map(x => x.update())
    }
    draw() {
        this.particles.map(x => this.game.drawGuaimg(x))
    }
}