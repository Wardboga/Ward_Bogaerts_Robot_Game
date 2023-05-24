class Robot {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    // Draw the robot on the canvas using the provided x, y, width, and height
    // You can use a robot image or create a more detailed shape
    // For example, let's draw a robot with a rectangular body, rounded corners, and antennae:

    // Body
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Head
    const headWidth = this.width * 0.6;
    const headHeight = this.height * 0.4;
    const headX = this.x + (this.width - headWidth) / 2;
    const headY = this.y - headHeight;
    ctx.fillStyle = 'gray';
    ctx.fillRect(headX, headY, headWidth, headHeight);
    ctx.strokeRect(headX, headY, headWidth, headHeight);

    // Antennae
    const antennaeHeight = headHeight * 0.6;
    const antennaeWidth = headWidth * 0.1;
    const antennaeX = headX + headWidth / 2 - antennaeWidth / 2;
    const antennaeY = headY - antennaeHeight;
    ctx.fillStyle = 'gray';
    ctx.fillRect(antennaeX, antennaeY, antennaeWidth, antennaeHeight);
    ctx.strokeRect(antennaeX, antennaeY, antennaeWidth, antennaeHeight);

    // Additional details or decorations can be added here based on your desired robot design

    // Example: Eyes
    const eyeRadius = headWidth * 0.08;
    const leftEyeX = headX + headWidth * 0.25;
    const rightEyeX = headX + headWidth * 0.65;
    const eyeY = headY + headHeight * 0.4;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
    ctx.arc(rightEyeX, eyeY, eyeRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Example: Mouth
    const mouthWidth = headWidth * 0.4;
    const mouthHeight = headHeight * 0.1;
    const mouthX = headX + (headWidth - mouthWidth) / 2;
    const mouthY = headY + headHeight * 0.7;
    ctx.fillStyle = 'red';
    ctx.fillRect(mouthX, mouthY, mouthWidth, mouthHeight);
  }
}