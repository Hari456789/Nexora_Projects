const Jimp = require('jimp');

Jimp.read('public/images/logo.jpeg')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      // Get RGBA values
      var red = this.bitmap.data[idx + 0];
      var green = this.bitmap.data[idx + 1];
      var blue = this.bitmap.data[idx + 2];
      
      // Basic chromakey for green
      // If green is the dominant color (e.g. much higher than red and blue)
      if (green > red + 30 && green > blue + 30 && green > 100) {
        // Set alpha to 0 (transparent)
        this.bitmap.data[idx + 3] = 0;
      } else if (green > red + 10 && green > blue + 10 && green > 80) {
         // Semi-transparent for edges (anti-aliasing)
         this.bitmap.data[idx + 3] = 128;
      }
    });

    image.write('public/images/logo-transparent.png', () => {
        console.log("Done processing image");
    });
  })
  .catch(err => {
    console.error(err);
  });
