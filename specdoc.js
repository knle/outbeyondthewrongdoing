// Grouped texts with fixed positions
let texts = [
    { str: 'Out beyond ideas of wrongdoing and rightdoing,', x: 52, y: 52 },
    { str: 'there is a field.', x: 750, y: 100 },
    { str: 'I’ll meet you there.', x: 960, y: 130 },
    { str: 'When the soul lies down in that grass,', x: 750, y: 200 },
    { str: 'the world is too full to talk about.', x: 960, y: 230 },
    { str: 'Ideas,', x: 52, y: 430 },
    { str: 'language,', x: 590, y: 600 },
    { str: 'even the phrase "each other".', x: 960, y: 700 },
    { str: 'Doesn’t make any sense.', x: 620, y: 800 },
    { str: 'Jelaluddin Rumi', x: 1200, y: 800 }
  ];
  
  let img, img2, img3, font;
  let dotSize = 10;
  let dotGrid = []; // Store dot visibility states
  let erasedDots = new Set(); // Store erased dots (as a set for efficiency)
  
  function preload() {
      font = loadFont('/CaslonIonic-LightItalic-Trial.otf');
      img = loadImage('/girllayingongrass.jpg');  // Image that will remain visible
      img2 = loadImage('/girlongrass.png');
      img3 = loadImage('/sky.jpg');  // Background image that will be revealed
  }
  
  function setup() {
      createCanvas(windowWidth, windowHeight);
      textFont(font);
      textSize(30);
      textWrap(WORD);
      noStroke();
  
      // Initialize dot grid positions
      for (let x = 0; x < width; x += dotSize) {
          for (let y = 0; y < height; y += dotSize) {
              dotGrid.push({ x, y });
          }
      }
  }
  
  function draw() {
      background(img3); // Sky background remains intact
  
      // Draw dots only if they haven't been erased
      fill(255);
      for (let i = 0; i < dotGrid.length; i++) {
          let dot = dotGrid[i];
          let key = `${dot.x},${dot.y}`; // Create a unique key for each dot
  
          if (!erasedDots.has(key)) {  // Check if the dot is erased
              ellipse(dot.x + dotSize / 2, dot.y + dotSize / 2, dotSize);
          }
      }
  
      // Draw each text at its fixed position
      fill(251, 255, 230);
      for (let i = 0; i < texts.length; i++) {
          text(texts[i].str, texts[i].x, texts[i].y);
      }
  
      // Resize and display image (keeps your original element intact)
      img.resize(50, 100);
      image(img, width / 2, 650);
  }
  
  // Mouse erases dots **as it moves**
  function mouseMoved() {
      for (let i = 0; i < dotGrid.length; i++) {
          let dot = dotGrid[i];
          let distToMouse = dist(mouseX, mouseY, dot.x + dotSize / 2, dot.y + dotSize / 2);
  
          if (distToMouse < 30) {  // Erase dots in a small area around the cursor
              let key = `${dot.x},${dot.y}`;
              erasedDots.add(key); // Store erased dots so they don’t redraw
          }
      }
  }
  