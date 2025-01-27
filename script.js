let x = 0; // Starting x position of the line
let lineLength = 0; // Initial length of the line


function setup() {
    // Set canvas size based on window size, with 25% of window height
    let canvas = createCanvas(windowWidth, windowHeight * 0.25);
    canvas.parent('p5-container'); // Attach canvas to the div
    background(255); // Set the background to white
}

function draw() {
    background(255); // Set the background to white each frame
    
    // Set the line color (black)
    stroke(0);
    
  // Draw the line from (x, height / 2) to (x + lineLength, height / 2)
  line(x, height / 2, x + lineLength, height / 2);

  // Increase the length of the line over time
  if (lineLength < (width*0.8)) {
    lineLength += 2; // You can adjust the speed by changing the value here
  }
}

// Adjust the canvas size when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.25); // Recalculate 25% of window height
}
