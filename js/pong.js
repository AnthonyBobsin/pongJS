
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
  this.xSpeed = 0
  this.ySpeed = 0
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