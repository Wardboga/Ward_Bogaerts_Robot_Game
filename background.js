// background.js
class Background {
    constructor(imageSrc) {
      this.image = new Image();
      this.image.src = imageSrc;
    }
  
    draw() {
      // Draw the background image on the canvas
      // You can use the drawImage() method of the canvas context
      // For example:
      ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
  }
  