
var animate = window.requestAnimationFrame || 
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) },
              canvas = document.createElement('canvas'),
              width = 400,
              height = 600

canvas.width = width
canvas.height = height
var context = canvas.getContext('2d')

var player = new Player(),
    computer = new Computer(),
    ball = new Ball(200, 300)

var render = function() {
  context.fillStyle = "#000000"
  context.fillRect(0, 0, width, height)
  player.render()
  computer.render()
  ball.render()
}

var update = function() {
  ball.update(player.paddle, computer.paddle)
}

var step = function() {
  update()
  render()
  animate(step)
}

window.onload = function() {
  document.body.appendChild(canvas)
  animate(step)
}

function Paddle(x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.xSpeed = 0
  this.ySpeed = 0
}

function Ball(x, y) {
  this.x = x
  this.y = y
  this.xSpeed = 4
  this.ySpeed = 3
  this.radius = 5
}

Paddle.prototype.render = function() {
  context.fillStyle = "#0000cc"
  context.fillRect(this.x, this.y, this.width, this.height)
}

Ball.prototype.render = function() {
  context.beginPath()
  context.arc(this.x, this.y, this.radius, Math.PI * 2, false)
  context.fillStyle = "#00abc0"
  context.fill()
}

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.xSpeed
  this.y += this.ySpeed
  var topX = this.x - 5,
      topY = this.y - 5
      bottomX = this.x + 5,
      bottomY = this.y + 5

  if (this.x - 5 < 0) { // Hitting the left wall
    this.x = 5
    this.xSpeed = -this.xSpeed
  } else if (this.x + 5 > 400) { // Hitting right wall
    this.x = 395
    this.xSpeed = -this.xSpeed
  }

  if (topY > 300) {
    if (topY < (paddle1.y + paddle1.height) && bottomY > paddle1.y && topX < (paddle1.x + paddle1.width) && bottomX > paddle1.x) {
      // Hit the player's paddle
      this.ySpeed = -3
      this.xSpeed += (paddle1.xSpeed / 2)
      this.y += this.ySpeed
    }
  }

}

function Player() {
  this.paddle = new Paddle(175, 580, 50, 10)
}

function Computer() {
  this.paddle = new Paddle(175, 10, 50, 10)
}

Player.prototype.render = function() {
  this.paddle.render()
}

Computer.prototype.render = function() {
  this.paddle.render()
}