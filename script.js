// let x = 0; // Starting x position of the line
// let lineLength = 0; // Initial length of the line


// function setup() {
//     // Set canvas size based on window size, with 25% of window height
//     let canvas = createCanvas(windowWidth, windowHeight * 0.25);
//     canvas.parent('p5-container'); // Attach canvas to the div
//     background(255); // Set the background to white
// }

// function draw() {
//     background(255); // Set the background to white each frame
    
//     // Set the line color (black)
//     stroke(0);
    
//   // Draw the line from (x, height / 2) to (x + lineLength, height / 2)
//   line(x, height / 2, x + lineLength, height / 2);

//   // Increase the length of the line over time
//   if (lineLength < (width*0.8)) {
//     lineLength += 2; // You can adjust the speed by changing the value here
//   }
// }

// // Adjust the canvas size when the window is resized
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight * 0.25); // Recalculate 25% of window height
// }


let permissionGranted = false;
let cx, cy;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-motion-container'); // Attach canvas to the div

  
  cx = width/2;
  cy = height/2;
  
  // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device
    text('requesting permission', 50, 50);
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
        
      })
  } else {
    text('not requesting permission', 50, 50);
    // non ios 13 device
    textSize(48);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);
  
  this.remove();
}

function draw() {
  if (!permissionGranted) return;
  
  // background(255);
  
  // rotationX, rotationY
  const dx = constrain(rotationY, -3, 3);
  const dy = constrain(rotationX, -3, 3);
  cx += dx*2;
  cy += dy*2;
  cx = constrain(cx, 0, width);
  cy = constrain(cy, 0, height);
  
  ellipse(cx, cy, 200, 200);
  
}