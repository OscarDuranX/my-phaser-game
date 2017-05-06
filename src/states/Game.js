/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.load.spritesheet('player','./assets/images/player.png',28,22)
    this.game.load.spritesheet('ground','./assets/images/ground.png')
    this.game.load.spritesheet('wall','./assets/images/wall.png')
    this.game.load.spritesheet('enemy','./assets/images/enemy.png')
    this.game.load.spritesheet('coin','./assets/images/coin.png')

    this.game.load.audio('soundjump','./assets/images/jump.mp3','./assets/images/jump.wav')
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = this.game.add.sprite(350,50,'player')
    this.ground = this.game.add.sprite(700/2-160,400/2,'ground')
    this.wall1  = this.game.add.sprite(700/2-160,400/2-80,'wall')
    this.wall2  = this.game.add.sprite(700/2+140,400/2-80,'wall')
    this.enemy  = this.game.add.sprite(700/2+120,400/2-20,'enemy')
    this.coin1  = this.game.add.sprite(700/2-120,400/2-20,'coin')
    this.coin2  = this.game.add.sprite(700/2-80,400/2-20,'coin')
    this.coin3  = this.game.add.sprite(700/2-40,400/2-20,'coin')

    this.jump = this.game.add.audio('soundjump')

    game.physics.arcade.enable(this.player)
    game.physics.arcade.enable(this.ground)
    game.physics.arcade.enable(this.wall1)
    game.physics.arcade.enable(this.wall2)
    game.physics.arcade.enable(this.enemy)
    game.physics.arcade.enable(this.coin1)
    game.physics.arcade.enable(this.coin2)
    game.physics.arcade.enable(this.coin3)

    this.player.body.gravity.y=600
    this.player.body.setSize(20,20,0,0);

    this.ground.body.immovable = true
    this.wall1.body.immovable = true
    this.wall2.body.immovable = true
    this.enemy.body.immovable = true


    this.player.animations.add('idle',[3,4,5,4],5,true)
    this.player.animations.play('idle')
    this.cursor = game.input.keyboard.createCursorKeys()
    this.hasJumped= false
  }

  update(){
    this.game.physics.arcade.collide(this.player, this.ground)
    this.game.physics.arcade.collide(this.player, this.wall1)
    this.game.physics.arcade.collide(this.player, this.wall2)
    this.game.physics.arcade.collide(this.player, this.enemy)
    this.game.physics.arcade.collide(this.player, this.coin1)
    this.game.physics.arcade.collide(this.player, this.coin2)
    this.game.physics.arcade.collide(this.player, this.coin3)

    this.inputs()
  }

  inputs(){
      if (this.cursor.left.isDown) {
          this.player.body.velocity.x= -100
          this.player.frame = 2
      }else if(this.cursor.right.isDown) {
          this.player.body.velocity.x= +100
          this.player.frame = 2
      }
      else  {
        this.player.body.velocity.x= 0
      }

      if(this.cursor.up.isDown){
        this.jumpPlayer()
      }
  }

  jumpPlayer(){
      this.player.body.velocity.y= -220
      this.hasJumped = true
      this.jump.play()
  }

  render () {
    if (__DEV__) {

    }
  }
}
