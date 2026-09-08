const fs = require('fs');
let data = fs.readFileSync('src/data/products.js', 'utf8');

// The original file currently has `sizes: ['XXL']` for the Western and Party wear categories
data = data.replace(/sizes:\s*\['XXL'\],\s*colors:\s*\['Assorted'\],/g, `sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],\n    outOfStockSizes: ['XS', 'S', 'M', 'L', 'XL'],\n    colors: ['Assorted'],`);

fs.writeFileSync('src/data/products.js', data);
