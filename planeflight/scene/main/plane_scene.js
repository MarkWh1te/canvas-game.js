class PlaneScene extends GuaScene {
    constructor(game) {
        super(game)
        // this.background = GuaImage.new(game, 'ball')
        this.numberOfEnimies = 13
        this.setup()
    }
    setup() {
        this.setupElements()
        this.setupEvents()
    }
    setupEvents() {
        // TODO: delete this
        // add the way to next scene
        this.game.registerAction('k', function() {
            log('you put k')
        })
        this.game.registerAction('t', function() {
            var s = SceneEnd.new(this.game)
            game.replaceScene(s)
        })

        this.game.registerAction('a', () => {
            this.player.moveLeft()
        })

        this.game.registerAction('d', () => {
            this.player.moveRight()
        })

        this.game.registerAction('w', () => {
            this.player.moveUp()
        })

        this.game.registerAction('s', () => {
            this.player.moveDown()
        })
        this.game.registerAction(' ', () => {
            this.player.fire()
        })
    }
    setupElements() {
        // order matters!!
        this.background1 = Background.new(this.game, 'background')
        this.addElement(this.background1)
        this.background2 = Background.new(this.game, 'background')
        this.background2.y = -this.background2.h
        this.addElement(this.background2)

        this.player = Player.new(this.game, 'player')
        this.addElement(this.player)
        this.addEnymies()

        // test ParticleSystem
        let ps = ParticleSystem.new(this.game)
        ps.scene = this
        this.addElement(ps)
    }
    addEnymies() {
        for (var i = 0; i < this.numberOfEnimies; i++) {
            this.addElement(Enemy.new(this.game))
        }
    }
}