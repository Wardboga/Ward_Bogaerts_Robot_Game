// fruit.js
class Fruit {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }

  update() {
    // Update the position of the fruit based on its speed
    this.y += this.speed;
  }

  draw() {
    // Draw the fruit on the canvas using the provided x, y, radius, and color
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
